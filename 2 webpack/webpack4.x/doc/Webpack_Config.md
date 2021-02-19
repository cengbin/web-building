# webpack4.x 基础配置

> ES6 + eslint + TypeScript +PixiJS 构建项目Demo

`npm install --save-dev webpack webpack-cli webpack-dev-server`

插件配置包括：

* 加载ES6模块 （详情见Webpack Config Babel.md)
* 处理css模块	(style-loader,css-loader)
* 加载图片模块 （file-loader，url-loader）
* eslint代码格式检测 (详情见Webpack Config ESlint.md)



webpack.config.js 配置参数

```js
module.exports = {
  // 入口配置
  entry: './src/main.js',
  // 出口配置
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'main.js'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './'),
    }
  },
  // 生产环境不需要打包的库
  externals: { 
      
  },
  performance: {
    hints: false
  },
  plugins: [
    //清除dist目录
    new CleanWebpackPlugin(resolve('./dist'),{
      //这个root配置项不能缺少，否则会出现如下提示，并且clean操作被跳过。
      root: resolve('./'),
      //即是否要往终端上输出log。
      verbose: true
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename:'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
 
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src'),path.resolve(__dirname,'node_modules/phaser/src/')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100
        }
      }
    ]
  }
}
```
