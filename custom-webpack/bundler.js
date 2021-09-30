const configuration = require('./pack.config.js');
const fs = require('fs');
const path = require('path');
const babylon = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

function createAsset (filename) {
  const content = fs.readFileSync(filename, 'utf-8');

  const ast = babylon.parse(content, {
    sourceType: "module"
  })

  const dependencies = [];

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

  const queue = [mainAsset];

  for (let i = 0; i < queue.length; i++) {
    let asset = queue[i];
    let {dependencies, filename} = asset;
    console.log(filename, dependencies)

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
  let modules = ``

  graph.forEach(({filename, code, id, mapping}) => {
    modules += `
  '${filename}': function (module, exports, require) {
    ${code}
  },`
  })

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
})({${modules}
});`

  return result;
}

const entry = configuration.entry;

const output = configuration.output.path + configuration.output.filename

const graph = createGraph(entry);

const result = bundle(graph);

fs.writeFile(output, result, err => {
  if (err) {
    console.error(err)
    return
  }
})


