import message from './message.js'

console.log(message)

setTimeout(() => {
  import(/* webpackChunkName: "util" */'./util.js').then(({default: $}) => {
    console.log($)
  }).catch(error => {
    console.log(error)
  });
}, 1000)
