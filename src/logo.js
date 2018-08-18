'use strict';

/**
 * A randomized Reddit logo. The following
 * fields are used to make variety
 */

const Jimp = require('jimp');
const config = require('../config.js');
const randomLogo = require('./rand-logo');

/* Logo images */
const images = require('./images.js');

class Logo {
    constructor() {
        /* Create an copy of the image */
        let image = new Jimp(config.IMAGE_W, config.IMAGE_H, 0x0);
        image = image.composite(images.mask, 0, 0);

        /* First we work on the "background"
         * Aka textures and colors. Then we
         * apply the reddit logo shading */

        let seed = Math.random().toString(36).substring(14);
        let rand = require('random-seed').create(seed);

        /* Alter color */
        let color_scheme = new randomLogo.color(rand);
        image = color_scheme.doImageMix(image);

        /* Generate a texture */
        let texture = new randomLogo.texture(rand, color_scheme);
        image = texture.doImageOverlay(image);

        /* Overlay shading now. After this we can add stuff
         * like filters that apply the ENTIRE image */
        image.composite(images.shades, 0, 0, Jimp.BLEND_HARDLIGHT);

        /* Clothing */
        let clothes = new randomLogo.clothes(rand);
        image = clothes.doImageOverlay(image);

        /* Apply filter */
        let filter = new randomLogo.filter(rand);
        filter.doFilter(image);

        image.write('./output/seed-' + seed + '.png'); // Save
    }
}

module.exports = Logo;
