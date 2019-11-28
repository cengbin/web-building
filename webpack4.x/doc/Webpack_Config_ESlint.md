# Webpack 项目配置 ESlint

 [ESlint是什么(官网)][eslint_website_link]
 
 [eslint_website_link]:http://eslint.cn/ "可选的标题在这里"
 
* 1.安装依赖 `npm install --save-dev eslint eslint-loader`
	- eslint
	- eslint-loader

* 2.webpack 配置 eslint

```
{
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: "pre",
    include: [path.resolve(__dirname, 'src')], // 指定检查的目录
    exclude:/node_module/, // 指定不检查的目录
    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }
}
```
注：formatter默认是stylish，如果想用第三方的可以安装该插件，如上方的示例中的 eslint-friendly-formatter
还需要添加另外的插件
	* eslint-config-standard
	* eslint-plugin-import
	* eslint-plugin-node
	* eslint-plugin-promise
	* eslint-plugin-standard

* 3.在项目工程中，新建一个.eslintrc配置文件，内容如下

```js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-constructor':'off',
    "no-new": "off"
  },
  globals: {
    'Phaser': true,
    'VConsole': true,
    'VKEvent': true,
    'TweenMax': true,
    'TimelineMax': true,
    'Power0': true,
    'Power1': true,
    'Power2': true,
    'Power3': true,
    'Power4': true,
    'Back': true,
    'Elastic': true,
    'Strong': true
  }
}
```

* 4.在项目工程中新建一个.eslintignore配置文件，可以忽略不检查的文件或目录，内容如下

```
/*.js
/src/Game.js

*/src/
```