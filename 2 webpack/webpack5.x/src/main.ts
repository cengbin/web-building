import message from './message'

console.log(message, 1)

let img = new Image();
img.onload = function () {
  document.body.appendChild(img);
}
img.src = './static/assets/bunny.png'


