/*
* **Clothing**
* ---------------------------
* Clothes is overlaid on top of a clothing sprite.
* Clothes:
*  - Head
*      - Sunglasses
*      - Regular glasses
*      - Visor hat
*      - Baseball hat
*      - Winter hat
*      - None
* - Body
*      - T-shirt
*      - Long sleeved shirt
*      - None
* - Pants
*      - Generic pants
*      - None
*/

'use strict';

const Jimp = require('jimp');
const wait = require('wait-for-stuff');
const Color = require('color');

const config = require('../../config.js');
const images = require('../images.js');

const Texture = require('./texture.js');
const ColorScheme = require('./color.js');

/**
 * A Clothes that can be overlaid
 * on top of an image.
 */
class Clothes {
    /**
     * constructor - Construct a Clothes
     *
     * @param  {uheprng} rand             Random number generator obj
     */
    constructor(rand) {
        /* Create the base image */
        this.doClothes = rand.random() < config.PROB_ANY_CLOTHING;
        if (!this.doClothes) return; // No need for additional processing

        this.clothes = {
            head: null,
            body: null
        };

        for (let part of Object.keys(this.clothes)) {
            if (rand.random() < config.PROB_ANY_INDIVIDUAL_PIECE_OF_CLOTHING) {
                let choices = images.clothes[part];
                let choice = choices[rand.range(choices.length)];

                let temp = new Jimp(config.IMAGE_W, config.IMAGE_H, 0x0);
                choice = temp.composite(choice, 0, 0);

                let color_scheme = new ColorScheme(rand);
                let texture = new Texture(rand, color_scheme, choice);

                /* Fix for too much opacity in background */
                if (part === 'body') choice = choice.mask(images.mask_dark, 0, 0);

                choice = color_scheme.doImageMix(choice);
                choice = texture.doImageOverlay(choice);
                this.clothes[part] = choice;
            }
        }
    }

    /**
     * doImageOverlay - overlay Clothes on image
     *
     * @param  {Image} image JIMP Image
     * @return {Image}       JIMP Image (modified)
     */
    doImageOverlay(image) {
        if (!this.doClothes) return image;
        for (let part of Object.keys(this.clothes)) {
            if (this.clothes[part]) {
                image = image.composite(this.clothes[part], 0, 0);
            }
        }
        return image;
    }
}

module.exports = Clothes;
