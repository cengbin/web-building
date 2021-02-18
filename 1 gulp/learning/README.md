## 导出任务

* 公开任务（Public tasks） 从 gulpfile 中被导出（export），可以通过 gulp 命令直接调用。
* 私有任务（Private tasks） 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分。

## 组合任务

Gulp 提供了两个强大的组合方法： series() 和 parallel()，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以接受任意数目的任务（task）函数或已经组合的操作。series() 和 parallel() 可以互相嵌套至任意深度。

如果需要让任务（task）按顺序执行，请使用 series() 方法。

对于希望以最大并发来运行的任务（tasks），可以使用 parallel() 方法将它们组合起来。

series() 和 parallel() 可以被嵌套到任意深度。

```
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function cssTranspile(cb) {
  // body omitted
  cb();
}

function cssMinify(cb) {
  // body omitted
  cb();
}

function jsTranspile(cb) {
  // body omitted
  cb();
}

function jsBundle(cb) {
  // body omitted
  cb();
}

function jsMinify(cb) {
  // body omitted
  cb();
}

function publish(cb) {
  // body omitted
  cb();
}

exports.build = series(
  clean,
  parallel(
    cssTranspile,
    series(jsTranspile, jsBundle)
  ),
  parallel(cssMinify, jsMinify),
  publish
);
```

## 处理文件

gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件。

## 向流（stream）中添加文件

src() 也可以放在管道（pipeline）的中间，以根据给定的 glob 向流（stream）中添加文件。新加入的文件只对后续的转换可用。如果 glob 匹配的文件与之前的有重复，仍然会再次添加文件。

这对于在添加普通的 JavaScript 文件之前先转换部分文件的场景很有用，添加新的文件后可以对所有文件统一进行压缩并混淆（uglifying）。

## 分阶段输出

dest() 可以用在管道（pipeline）中间用于将文件的中间状态写入文件系统。当接收到一个文件时，当前状态的文件将被写入文件系统，文件路径也将被修改以反映输出文件的新位置，然后该文件继续沿着管道（pipeline）传输。

此功能可用于在同一个管道（pipeline）中创建未压缩（unminified）和已压缩（minified）的文件。

## 使用插件
[https://gulpjs.com/plugins/](https://gulpjs.com/plugins/)