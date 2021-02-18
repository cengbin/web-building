## $

##### each 
遍历数组元素或以key-value值对方式遍历对象。回调函数返回 false 时停止遍历。

##### map 
通过遍历集合中的元素，返回通过迭代函数的全部结果，（一个新数组）null 和 undefined 将被过滤掉。

## 集合类数组对象属性/方法(collection)

##### pluck
pluck() => array  
获取当前集合对象元素指定property属性值，返回属性值数组

##### slice
slice(start, [end]) => collection  
提取从从start开始到end结束的元素，但是不包含end位置的元素。

##### eq
eq([idx]) => collection  
获取指定下标的集合对象

##### filter
filter(selector) => collection  
过滤对象集合，返回对象集合中满足css选择器的项。

##### not
not(selector) => collection  
not方法是将集合中不符合条件的元素查找出来。

##### parent
parent([selector]) => collection  
获取对象集合中每个元素的直接父元素。如果css选择器参数给出。过滤出符合条件的元素。

##### index
index([element]) => number  
当element DOM参数没有给出时，返回当前元素在兄弟节点中的位置。  
当element DOM参数给出时，返回它在当前对象集合中的位置。  
如果没有找到该元素，则返回-1。

### 使用到ES5新特性
getComputedStyle

