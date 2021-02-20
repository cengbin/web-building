# 手写webpack模块解析器，并生成一个boundle.js

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

[https://www.youtube.com/watch?v=Gc9-7PBqOC8](https://www.youtube.com/watch?v=Gc9-7PBqOC8) 老外分享视频链接