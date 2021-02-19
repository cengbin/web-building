/*import './assets/style.css'
import Game from './Game'
import {default as conf} from './res.json'
// let conf = require('./res.json')
console.log(conf, 1, 2)

let game = new Game({
  view: document.getElementById('pixi_canvas'),
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb
})

/// <reference path="Validation.ts" />

/!*
// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
  }
}*!/*/
import util from './util'

console.log(util('123', '123'))

/*
setTimeout(() => {
  import(/!* webpackChunkName: "jquery" *!/'./jquery.js').then(({default: $}) => {
    console.log($)
  }).catch(error => {
    console.log(error)
  });
}, 1000)*/
