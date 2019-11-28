# webpack demo

## CommonsChunkPlugin

Options
翻译得比较简单，详见官方说明:

* options.name or options.names(string|string[]): 公共模块的名称

* options.filename (string): 公开模块的文件名（生成的文件名）
* options.minChunks (number|Infinity|function(module,count) - boolean): 为number表示需要被多少个entries依赖才会被打包到公共代码库；为Infinity 仅仅创建公共组件块，不会把任何modules打包进去。并且提供function，以便于自定义逻辑。
* options.chunks(string[]):只对该chunks中的代码进行提取。(默认是提取所有入口中的公共模块，那么每个入口页面都会引入options.name这个模块。如果配置是数组，那么a页面的入口在chucks中，那么a页面就会引入options.name这个模块，其他入口页面不会引入这个模块)
* options.children(boolean):如果为true,那么公共组件的所有子依赖都将被选择进来
* options.async(boolean|string):如果为true,将创建一个 option.name的子chunks（options.chunks的同级chunks） 异步common chunk
* options.minSize(number):所有公共module的size 要大于number，才会创建common chunk

```
new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  // (公共 chunk(commnon chunk) 的名称)

  filename: 'commons.js',
  // (公共chunk 的文件名)

  // minChunks: 3,
  // (模块必须被3个 入口chunk 共享)

  // chunks: ["pageA", "pageB"],
  // (只使用这些 入口chunk)
});
```
