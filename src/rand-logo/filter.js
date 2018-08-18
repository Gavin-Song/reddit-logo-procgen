/**
* **Filters**
* ---------------------------
* Select a random filter from the following list
* - brightness (values determined by config)
* - contrast (values determined by config)
* - dither
* - greyscale
* - posterization (values determined by config)
* - sepia
* - pixelate (value determined by config)
* - None (No filter)
*/

'use strict';

const config = require('../../config.js');

/* List of all possible filters */
const POSSIBLE_FILTERS = {
    'brightness': (im, val) => im.brightness(val),
    'contrast': (im, val) => im.contrast(val),
    'dither': im => im.dither565(),
    'greyscale': im => im.greyscale(),
    'posterize': (im, val) => im.posterize(val)
};

/**
 * A Filter for the logo.
 */
class Filter {
    /**
     * constructor - Construct a randomized filter
     * @param  {uheprng} rand  Random number generator obj
     */
    constructor(rand) {
        this.applyFilter = rand.random() > config.PROB_NO_FILTER;
        this.filter_name = Object.keys(POSSIBLE_FILTERS)[rand.range(Object.keys(POSSIBLE_FILTERS).length)];
        this.filter = POSSIBLE_FILTERS[this.filter_name];
        this.value = null;

        switch (this.filter_name) {
            case 'brightness':
                this.value = rand.floatBetween(-config.MIN_MAX_BRIGHTNESS, config.MIN_MAX_BRIGHTNESS);
                break;
            case 'contrast':
                this.value = rand.floatBetween(-config.MIN_MAX_CONTRAST, config.MIN_MAX_CONTRAST);
                break;
            case 'posterize':
                this.value = rand.range(config.MAX_POSTERIZE - 1) + 2;
                break;
        }
    }

    /**
     * doFilter - Apply an filter to an image
     *
     * @param  {Image} image JIMP Image
     * @return {Image}       JIMP Image (modified)
     */
    doFilter(image) {
        if (!this.applyFilter) return image;
        return this.filter(image, this.value);
    }
}

module.exports = Filter;
