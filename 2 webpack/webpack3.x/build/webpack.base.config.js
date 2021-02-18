const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pages = require('./pages')

function resolve (dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  entry: pages.config.entries,
	output: {
		path: resolve('dist'),
		filename: '[name].[chunkhash].js',
	},
	plugins: [
    //清除dist目录
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist'),{
      //这个root配置项不能缺少，否则会出现如下提示，并且clean操作被跳过。
      root: path.resolve(__dirname, '../'),
      //即是否要往终端上输出log。
      verbose: true
    }),
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].[chunkhash].js'
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js',
      chunks: pages.config.includeVendorChunks
    })
	].concat(pages.config.htmlPlugins)
};