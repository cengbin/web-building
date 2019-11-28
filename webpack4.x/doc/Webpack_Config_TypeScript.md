# Webpack 项目配置 TypeScript 

 [TypeScript 中文文档][ts_website_link]
  [ts_website_link]:https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html "可选的标题在这里"
 
 ts 默认根据 [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html) 配置文件（很强大）来对 ts 进行编译。

* 1.安装依赖 `npm install --save-dev typescript ts-loader`
	- typescript
	- ts-loader

* 2.在项目工程中，新建一个tsconfig.json 配置文件，内容如下

```js
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "allowJs": true,
    "lib": [
      "es2018",
      "dom"
    ],
  },
  "include": [
    "./src/*"
  ],
  "exclude": [
    "./node_modules"
  ]
}
```

* 3.在webpack.config.js中配置

```js
module: {
	rules: [
	  {
	    test: /\.ts?$/,
	    use: 'ts-loader',
	    exclude: /node_modules/
	  }
	]
},
resolve: {
	extensions: ['.ts', '.js']
}
```

[参考链接](https://juejin.im/post/5ce8ee3c51882521ee5fc86e)


## 其他总结：
"typescript": "^2.5.2",

[error TS2304: Cannot find name 'ActiveXObject'.](https://github.com/dojo/typings/issues/124)

Another option is to add scripthost to your libs.

[Typescript: Cannot find name 'GamepadHapticActuator'.](https://github.com/photonstorm/phaser3-docs/issues/47)