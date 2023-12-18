const config = require('./pack.config');
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const searequire = require('crequire');

main(config.entry)

function main (entry) {
  entry.forEach(filename => {
    babel.transformFile(filename, {
      presets: ["@babel/preset-env"]
    }, function (err, result) {
      // console.log("result:", result);
      // console.log("\nresult.code:\n", result.code);
      // console.log("result.map:", result.map);
      // console.log("result.ast:", result.ast);

      bundle(filename, result.code);
    });
  })
}

// 编译输出对应文件
function bundle (filename, code) {
  let extension = path.extname(filename);
  let file = path.basename(filename, extension);

  code = parseDependencies(filename, code);

  let result =
    `define('${config.output.path}${file}' ,function (require, exports, module) {
${code}
})
`

  fs.writeFile(`${config.output.path}${file}.js`, result, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

// 找出依赖，替换依赖的代码
function parseDependencies (filename, code) {
  var res = searequire(code);
  console.log(filename, res);
  res.forEach(ele => {
    let fileName = ele.path;
    let extension = path.extname(fileName);
    let file = path.basename(fileName, extension);

    let str = `require('build/${file}')`;
    code = code.replace(ele.string, str);
  })

  return code;
}