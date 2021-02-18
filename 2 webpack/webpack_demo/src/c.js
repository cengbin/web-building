import {main} from './main.js'

export function c() {
  console.log('i am c.js')

  setTimeout(() => {
    getMain()
  })
}

export function getMain() {
  console.log("c.js main:", main)
}