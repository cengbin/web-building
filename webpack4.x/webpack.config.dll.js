const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['pixi.js'] // 需要统一打包的类库
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_library', //name必须要和output.library一致
      context: __dirname, //注意与DllReferencePlugin的context匹配一致
      path: path.join(__dirname, 'static', '[name]-manifest.json')
    })
  ]
}