# Webpack 项目配置 Babel 

 [babel是什么(官网)][babel_website_link]
 
 [babel_website_link]:https://babel.docschina.org/docs/en/ "可选的标题在这里"
 
* 1.支持ES6,安装依赖
	- babel-core：babel的核心包
	- babel-loader：babel的loader包
	- babel-preset-env：包括支持现代 JavaScript（ES2015，ES2016 - 等）的所有插件（也可以自定义单一功能插件，详情见官网）

>注意：安装babel-loader时，需要指定7.x的版本，否则在打包过程中会报错，我安装的版本如下

>"babel-core": "^6.26.3",  
"babel-loader": "^7.1.5",  
"babel-preset-env": "^1.7.0". 

* 2.在项目工程中，新建一个.babelrc配置文件，内容如下

```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ]
}
```

* 3.在webpack.config.js中配置babel

```
module:{
    rules:[
        {
            test:'/\.js$/',
            use:['babel-loader'],
            exclude:/node_module/
        }
    ]
}
```

至此已经用 babel 在构建过程中转译语法糖，比如说将 ES7/ES6/JSX 中的语法部分（例如箭头函数）转译成 ES5。
但若要使用像 Promise 或 WeakMap 这样的新内置函数，像 Array.from 或 Object.assign 这样的静态方法，像Array.prototype.includes 这样的实例方法，以及 generator 函数等，还需要引入一个 babel-polyfill，需要注意 polyfill 则是解决原生对象的问题，比如说你的浏览器不支持 Promise，babel 就给你建一个 Promise 供你使用。所以，polyfill需要在浏览器运行的，不然怎么把原生对象插进全局变量呢？

* 4.安装 babel-polyfill

`npm install --save babel-polyfill`

>注意--save选项而不是--save-dev，因为这是一个需要在源代码之前运行的

[参考链接](https://juejin.im/post/5ca45489f265da30a11b1de7)