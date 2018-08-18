/**
 *  * **Color Scheme**
  * ---------------------------
  * A random color scheme, composed of a primary
  * and a secondary color is generated. The image
  * is overlaid with the primary color. Secondary
  * color saved for texturing.
  *
  * - Primary color
  *  - White
  *  - Other random light color
  * - Secondary color
  *  - Darker version of primary
  *  - Darker primary with hue rotate
  */

'use strict';

const config = require('../../config.js');
const Color = require('color');
const randomColor = require('randomcolor');

/**
 * A random primary and secondary color
 * generated for the logo.
 */
class ColorScheme {
    /**
     * constructor - Construct a randomized
     * ColorScheme
     *
     * @param  {uheprng} rand  Random number generator obj
     */
    constructor(rand) {
        this.doMix = rand.random() > config.PROB_PRIMARY_IS_WHITE;
        this.primary = this.randomLightColor(rand);
        this.secondary = this.darkenColor(this.primary);

        if (rand.random() < config.PROB_SECONDARY_HUE_ROTATE) {
            this.hueRotate(this.secondary, rand(config.SECONDARY_ROTATE_MAX_ANGLE));
        }

        /* If background is white lighten foreground */
        if (!this.doMix) {
            this.secondary = new Color(this.secondary).whiten(1).hex();
        }
    }
    
    /**
     * randomColor - Generate a random light color
     *
     * @param  {uheprng} rand  Random number generator obj
     * @return {string}        Hex color string
     */
    randomLightColor(rand) {
        return randomColor().toUpperCase();
    }

    /**
     * darkenColor - Darken a color by an amount
     * determined in the config
     *
     * @param  {string} color Hex color string
     * @return {string}       Hex color string
     */
    darkenColor(color) {
        return new Color(color).blacken(config.DARKEN_COLOR_AMOUNT).hex();
    }

    /**
     * hueRotate - Hue rotate a color
     *
     * @param  {string} color Hex color string
     * @param  {number} angle Angle (DEG) to rotate
     * @return {string}       Hex color string
     */
    hueRotate(color, angle) {
        return new Color(color).rotate(angle).hex();
    }

    /**
     * doImageMix - Tint an image with primary
     *
     * @param  {Image} image JIMP Image
     * @return {Image}       JIMP Image (modified)
     */
    doImageMix(image) {
        if (!this.doMix) return image;
        return image.color([{
            apply: 'mix',
            params: [this.primary, config.IMAGE_TINT_AMOUNT]}
        ]);
    }
}

module.exports = ColorScheme;
