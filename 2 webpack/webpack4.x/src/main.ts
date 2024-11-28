import './assets/css/style.css'

import Game from './org/Game'
import _ from 'lodash';
import moment from 'moment';
import eggHeadImage from './assets/images/eggHead.png';
import bunnyImage from './assets/images/bunny.png';

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

import('./org/message.js').then((res) => {
    console.log(res.default)

    // 由于此图片的大小是36KB，超出了配置的图片大小限制所以会被打包输出到配置的 img 目录
    var img = new Image();
    img.onload = () => {
        document.body.appendChild(img);
    }
    img.src = eggHeadImage;

    // 由于配置了图片 limit：2048，所以此图片会被打包成base64的数据来引用
    var img2 = new Image();
    img2.onload = () => {
        document.body.appendChild(img2);
    }
    img2.src = bunnyImage;
})

