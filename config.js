'use strict';

module.exports = {
    /* Image */
    IMAGE_W: 120,
    IMAGE_H: 40,

    /* Color */
    PROB_PRIMARY_IS_WHITE: 0.4,
    PROB_SECONDARY_HUE_ROTATE: 0.5,
    DARKEN_COLOR_AMOUNT: 0.4,
    IMAGE_TINT_AMOUNT: 100,
    SECONDARY_ROTATE_MAX_ANGLE: 10,

    /* Texture */
    PROB_NO_TEXTURE: 0.1,
    TEXTURE_GRID_SIZE: 4,
    TEXTURE_USE_SECONDARY: 0.3, // Prob it will use secondary (Ie density of texture)

    /* Clothing */
    PROB_ANY_CLOTHING: 1,   // If not true logo will not wear ANY clothes
    PROB_ANY_INDIVIDUAL_PIECE_OF_CLOTHING: 0.8,

    /* Text */
    PROB_ALTERNATE_FONT: 0.1,

    /* Filters */
    PROB_NO_FILTER: 0.3,
    MIN_MAX_BRIGHTNESS: 0.2,
    MIN_MAX_CONTRAST: 0.4,
    MAX_POSTERIZE: 5,
};
