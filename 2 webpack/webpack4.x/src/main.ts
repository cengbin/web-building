import './assets/css/style.css'

import Game from './org/Game'
import _ from 'lodash';
import moment from 'moment';

// console.log(_);
// console.log(moment);

import 'moment/locale/zh-cn' // 手动引入中文语言包

moment.locale('zh-cn'); // 设置语言为中文
console.log('locale: ', moment.locale())
console.log('date: ', moment().format('ll')) // 2024年11月26日

var game = new Game({
    width: 500,
    height: 400,
    backgroundColor: 0x1099bb
});
document.body.prepend(game.view)

import(/* webpackChunkName: "message" */'./org/message.js').then((res) => {
    console.log(res.default)
})
