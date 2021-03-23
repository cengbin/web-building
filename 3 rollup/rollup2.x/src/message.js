import {nikename} from './name.js'
import plus from './math.js'

console.log('message模块调用plus(2,2)=', plus(2, 2))

let a = 1;
console.log(a);

export default `hello ${nikename}`
