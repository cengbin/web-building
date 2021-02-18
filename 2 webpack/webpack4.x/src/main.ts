import './assets/style.css'
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

setTimeout(() => {
  import(/* webpackChunkName: "util" */'./util.js').then(({default: _}) => {
    console.log(_)
  }).catch(error => {
    console.log(error)
  });
}, 1000)

/// <reference path="Validation.ts" />

/*
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
}*/