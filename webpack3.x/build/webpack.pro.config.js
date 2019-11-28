const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseWebpackConfig,{
  plugins:[

  ]
})