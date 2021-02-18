import $ from 'jquery';
import _ from 'lodash';
import * as utils from '../../utils';

console.log('app1', _.chunk(['a', 'b', 'c', 'd'], 1)); // ['a'] ['b'] ['c'] ['d']

$(function() {
  $('.app1').css('color', 'red');
});

console.log('app1', utils.dataType([])); // Array

let fun1 = ()=>{
  console.log('fun1')
}
fun1()