export function dataType(argument) {
  return Object.prototype.toString.call(argument).replace(/\[object\s/, '').replace(/\]/, '');
}