# webpack4.x

### 四个核心概念：

* 入口(entry)
	* 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。 
* 输出(output)
	* output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。 
* loader
	* loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。 
* 插件(plugins)
	* loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。 

|webpack.config.base.js|公共配置|
|---|---|
|webpack.config.dev.js|开发环境配置|
|webpack.config.build.js|生产环境配置|

* [webpack 基础配置](./Webpack_Config.md)
* [webpack babel 配置](./Webpack_Config_Babel.md)
* [webpack eslint 配置](./Webpack_Config_ESlint.md)
* [webpack TypeScript 配置](./Webpack_Config_TypeScript.md)

### 参考

* [webpack 官网](https://webpack.js.org/)
* [webpack 中文官网](https://webpack.docschina.org/configuration/)