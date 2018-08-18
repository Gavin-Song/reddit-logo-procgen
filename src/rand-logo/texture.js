/*
* **Texturing**
* ---------------------------
* A randomized texture is generated.
* Uses secondary color.
*/

'use strict';

const Jimp = require('jimp');
const Color = require('color');

const config = require('../../config.js');
const images = require('../images.js');

/**
 * A texture that can be overlaid
 * on top of an image.
 */
class Texture {
    /**
     * constructor - Construct a Texture
     *
     * @param  {uheprng} rand             Random number generator obj
     * @param  {ColorScheme} color_scheme Color scheme for image
     * @param  {Image} mask               JIMP Image
     */
    constructor(rand, color_scheme, mask=images.mask_dark) {
        /* Create the base image */
        this.doTexture = rand.random() > config.PROB_NO_TEXTURE;

        if (!this.doTexture) return; // No need for additional processing

        this.mask = mask; // Image mask

        /* Generate a randomized texture grid.
         * True = fill with secondary
         * False = don't fill with secondary */
        let texture_grid = [];
        for (let i = 0; i < config.TEXTURE_GRID_SIZE; i++) {
            let row = [];
            for (let j = 0; j < config.TEXTURE_GRID_SIZE; j++) {
                row.push(rand.random() < config.TEXTURE_USE_SECONDARY);
            }
            texture_grid.push(row);
        }
        let rgb = new Color(color_scheme.secondary).rgb().array();

        this.texture_grid = texture_grid;
        this.image = new Jimp(config.IMAGE_W, config.IMAGE_H, 0x0);
        this.image.scan(0, 0, this.image.bitmap.width, this.image.bitmap.height, function(x, y, idx) {
            /* x, y is the position of this pixel on the image
             * idx is the position start position of this rgba tuple in the bitmap Buffer
             * this is the image
             *
             * rgba values run from 0 - 255
             * e.g. this.bitmap.data[idx] = 0; // removes red from this pixel */

            let x2 = x % config.TEXTURE_GRID_SIZE;
            let y2 = y % config.TEXTURE_GRID_SIZE;

            if (texture_grid[y2][x2]) {
                this.bitmap.data[idx + 0] = rgb[0];
                this.bitmap.data[idx + 1] = rgb[1];
                this.bitmap.data[idx + 2] = rgb[2];
                this.bitmap.data[idx + 3] = 255;
            }
        });

        this.image = this.image.mask(this.mask, 0, 0);
    }

    /**
     * doImageOverlay - overlay texture on image
     *
     * @param  {Image} image JIMP Image
     * @return {Image}       JIMP Image (modified)
     */
    doImageOverlay(image) {
        if (!this.doTexture) return image;
        return image.composite(this.image, 0, 0, Jimp.BLEND_OVERLAY);
    }
}

module.exports = Texture;
