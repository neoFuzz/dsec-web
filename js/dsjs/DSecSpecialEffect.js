import {dsector} from './dsector.js';

/**
 * Represents a DSecSpecialEffect.
 *
 * @property {Object} image - The image associated with the DSecSpecialEffect.
 * @property {number} x - The x-coordinate of the DSecSpecialEffect.
 * @property {number} y - The y-coordinate of the DSecSpecialEffect.
 * @property {number} brightness - The brightness level of the DSecSpecialEffect.
 * @property {number} type - The type of the DSecSpecialEffect.
 * @constant {number} IMAGE_COMPOSITE - The constant representing the image composite type.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class DSecSpecialEffect {
    /**
     * Creates an instance of DSecSpecialEffect.
     *
     * @param {Object} image - The image object.
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     * @param {number} brightness - The brightness level.
     */
    constructor(image, x, y, brightness) {
        this.type = 0;
        this.image = image;
        this.x = x;
        this.y = y;
        this.brightness = brightness;
    }

    /**
     * Returns the image object.
     *
     * @returns {Object}
     */
    getImage() {
        return this.image;
    }

    /**
     * Represents the image composite type.
     *
     * @constant
     * @default 0
     */
    static IMAGE_COMPOSITE = 0;
}