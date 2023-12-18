const configuration = require('./pack.config.js');
const fs = require('fs');
const path = require('path');
const babylon = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 1.1、解析文件，把内容转换成AST语法树，获取相关信息
function createAsset (filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  // 代码文件转抽象语法树，https://www.tooleyes.com/embed/ast_explorer.html
  const ast = babylon.parse(content, {
    sourceType: "module"
  })

  const dependencies = [];

  // @babel/traverse 可以用来遍历更新@babel/parser生成的AST
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })

  const {code} = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"]
  })

  return {
    filename,
    dependencies,
    code
  }
}

function createGraph (entry) {
  const mainAsset = createAsset(entry)
  // console.log(mainAsset)

  const queue = [mainAsset];

  for (let i = 0; i < queue.length; i++) {
    let asset = queue[i];
    let {dependencies, filename} = asset;
    // console.log(filename, " dependencie -> ", dependencies)

    const dirname = path.dirname(filename)

    dependencies.forEach((dependRelativePath, idx) => {
      const absolutePath = path.join(dirname, dependRelativePath)

      asset.code = asset.code.replace(dependRelativePath, absolutePath)

      if (queue.find(ele => ele.filename === absolutePath)) return;

      const childAsset = createAsset(absolutePath);

      queue.push(childAsset)
    })
  }

  return queue;
}

function bundle (graph) {
  let modules = `{`

  graph.forEach(({filename, code, id, mapping}) => {
    modules += `
  '${filename}': function (module, exports, require) {
    ${code}
  },`
  })

  modules += `
  }`

  // console.log("modules:", modules)

  const result = `(function (modules) {
  var installedModules = {};

  function require (moduleId) {

    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      i: moduleId,
      exports: {}
    };

    var factory = modules[moduleId];

    factory.call(module.exports, module, module.exports, require);

    return module.exports;
  }

  require('${entry}');
})(${modules}
);`

  return result;
}

const entry = configuration.entry;

// 1、解析模块，找出依赖关系
const graph = createGraph(entry);
for (let i = 0; i < graph.length; i++) {
  let asset = graph[i];
  let {dependencies, filename} = asset;
  console.log(filename, " dependencie -> ", dependencies)
}

// 2、打包
const result = bundle(graph);
console.log('result:', result);

// 3、输出
const output = configuration.output.path + configuration.output.filename
fs.writeFile(output, result, err => {
  if (err) {
    console.error(err)
    return
  }
})


