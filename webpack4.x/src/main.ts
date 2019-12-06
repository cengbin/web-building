import './assets/style.css'
import Game from './Game'
import {default as variable} from './res.json'
// let conf = require('./res.json')

// console.log(conf)
console.log(variable)

let game = new Game({
  type: Phaser.AUTO,
  transparent: true,
  backgroundColor: 0x1099bb,
  width: 800,
  height: 600,
  autoFocus: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser_player",
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
})

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
