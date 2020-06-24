const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')

function resolve(to) {
  return path.resolve(__dirname, to)
}

module.exports = {
  entry: {
    main: './src/main.ts'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js', // 入口文件打包出来的文件名
    chunkFilename: '[name].[id].[hash:7].bundle.js', // 动态加载模块打包出来的文件名
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],// 只在src文件夹下查找
        exclude: /node_modules/,// 不去查找的文件夹路径，node_modules下的代码是编译过得，没必要再去处理一遍
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel',
        include: [
          resolve('src'),
          resolve("node_modules/pixi.js")
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: path.posix.join('./', 'img/[name].[hash:7].[ext]'),
          publicPath: './'
        }
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threads: 4,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./static/vendor-manifest.json') //此即打包出来的json文件
    })
  ]
}
