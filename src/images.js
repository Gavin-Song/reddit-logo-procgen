'use strict';

const wait = require('wait-for-stuff');
const Jimp = require('jimp');

let shade = wait.for.promise(Jimp.read('./assets/logo-shade.png'));
let mask = wait.for.promise(Jimp.read('./assets/logo-mask.png'));
let mask_dark = wait.for.promise(Jimp.read('./assets/logo-mask-dark.png'))

module.exports = {
    shades: shade,
    mask: mask,
    mask_dark: mask_dark,
    clothes: {
        body: [
            wait.for.promise(Jimp.read('./assets/clothes/body-1.png')),
            wait.for.promise(Jimp.read('./assets/clothes/body-2.png'))
        ],
        head: [
            wait.for.promise(Jimp.read('./assets/clothes/head-1.png')),
            wait.for.promise(Jimp.read('./assets/clothes/head-2.png')),
            wait.for.promise(Jimp.read('./assets/clothes/head-3.png')),
            wait.for.promise(Jimp.read('./assets/clothes/head-4.png')),
            wait.for.promise(Jimp.read('./assets/clothes/head-5.png'))
        ]
        // pant: [wait.for.promise(Jimp.read('./assets/clothes/pant-1.png'))]
    }
}
