const path = require('path')

module.exports = {
  // 入口配置
  entry: {
    main: './src/main.js'
  },
  // 出口配置
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:8085/webpack5.x/dist/',
    filename: '[name].js', // 入口文件打包出来的文件名
    chunkFilename: '[name].[hash:7].bundle.js', // 动态加载模块打包出来的文件名
  },
  // 模块（如何处理项目中的不同类型的模块）
  module: {
    rules: []
  },
  // 插件（用于以各种方式自定义 webpack 构建过程）
  plugins: [],
  // 解析（设置模块如何被解析）
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': path.join(__dirname, './'),
    }
  },
  // 外部扩展
  externals: {},
  // 性能
  performance: {},
  // 模式
  mode: 'development',
}
