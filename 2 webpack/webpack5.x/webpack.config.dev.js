const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
// https://webpack.docschina.org/guides/code-splitting/#bundle-analysis
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './')
    },
    extensions: ['.ts', '.js', '.json']
  },
  devServer: {
    port: 9000, // 服务端口号
    compress: true, // 启动 gzip 压缩
    static: "./",
    liveReload: false // 实时刷新页面
  },
};
