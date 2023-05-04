# 手写webpack模块解析器，并生成一个bundle.js

实质是将一个文件打包成一个模块对象，而打包其实就是用一个函数包裹文件本身内容。通过分析文件的依赖关系，从而生成模块集，将模块集（执行函数）最终打包到一个或多个文件

## 整体流程分析

1、读取入口文件  
2、把内容转换成AST语法树  
3、遍历AST语法树找出模块的所有依赖，并存到一个数组中  
4、将AST语法树转换成可执行的JS代码（代码是 commonjs 语法）  
4、遍历所有依赖，然后重复第一步，解析完所有模块  
5、编写require函数（为了解析代码里的 require 方法），根据入口文件执行完所有的依赖代码  

### 参考

[https://www.tooleyes.com/embed/ast_explorer.html](https://www.tooleyes.com/embed/ast_explorer.html) 在线生成抽象语法树

[https://babeljs.io/repl](https://babeljs.io/repl) babel ES6转ES5

[https://github.com/mengsixing/diy-webpack](https://github.com/mengsixing/diy-webpack) 手写webpack模块解析器

[https://www.youtube.com/watch?v=Gc9-7PBqOC8](https://www.youtube.com/watch?v=Gc9-7PBqOC8) 实时创建一个简单打包工具(老外分享视频)
