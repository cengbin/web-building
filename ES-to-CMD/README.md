# ES6模块 转 CMD模块

实质是将一个文件打包成一个模块对象，而打包其实就是生成符合CMD规范的一个factory函数包裹文件本身内容的过程。通过分析文件的依赖关系，从而生成模块集，将模块集（执行函数）最终打包到一个或多个文件。

## 整体流程分析

1、读取入口文件  
2、把内容转换成AST语法树  
3、遍历AST语法树找出模块的所有依赖  
4、将代码转换成符合CMD规范的可执行的JS代码  
4、生成文件 