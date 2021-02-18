// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const path = require('path')
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const PAGE_PATH = path.resolve(__dirname, '../src/pages')

var config = {
  includeVendorChunks: ['a','b'],
  entries:{},
  htmlPlugins:[]
}
var pageFolders = glob.sync(PAGE_PATH+'/*')
pageFolders.forEach((folderPath) =>{
  // console.log('folder path:',folderPath)
  var folderName = folderPath.substring(folderPath.lastIndexOf('\/') + 1)
  // console.log('folder name:',folderName)
  var fileName = folderName.substring(2)
  var jsFilePath = folderPath + '/' + fileName + '.js'
  config.entries[fileName] = jsFilePath

  var htmlFilePath = folderPath + '/' + fileName + '.html'
  let chunks = [fileName]
  let i = 0,len = config.includeVendorChunks.length
  for(i;i<len;i++){
    if(fileName === config.includeVendorChunks[i]){
      chunks.unshift('vendor')
      break;
    }
  }
  let conf = {
    template: htmlFilePath,
    filename: fileName + '.html',
    chunks: chunks,
    inject: true,
    version:packageConfig.version
  }
  // console.log(conf)
  if (process.env.NODE_ENV === 'production') {
    conf = merge(conf, {
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })
  }
  config.htmlPlugins.push(new HtmlWebpackPlugin(conf))
})

exports.config = config