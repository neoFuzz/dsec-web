import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Represents a visual character with width, height, and line height properties.
 *
 * @property {number} width - The width of the character.
 * @property {number} height - The height of the character.
 * @property {number} lineHeight - The line height of the character.
 * @property {Array|null} bitmap - The bitmap representation of the character.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class CWCharacter {
    /**
     * Creates an instance of CWCharacter.
     *
     * @param {number} width - The width of the character.
     * @param {number} height - The height of the character.
     * @param {number} lineHeight - The line height of the character.
     */
    constructor(width, height, lineHeight) {
        this.width = width || 0;
        this.height = height || 0;
        this.lineHeight = lineHeight || 0;
        this.bitmap = this.allocateBitmap(height, width);
    }

    /**
     * Allocates a bitmap array based on the given height and width.
     *
     * @param {number} h - The height of the bitmap.
     * @param {number} w - The width of the bitmap.
     * @returns {Array|null} The allocated bitmap or null if height or width is zero.
     */
    allocateBitmap(h, w) {
        if (h === 0 || w === 0) {
            return null;
        } else {
            let bitmap = [];
            for (let i = 0; i < h; i++) {
                bitmap.push(this.allocateBitmap(w));
            }
            return bitmap;
        }
    }

    /**
     * Converts the reversed bitmap into a string representation.
     * This method flattens and joins the reversed bitmap array.
     * Assumes `this.bitmap.toReversed()` always returns an array.
     *
     * @returns {string} The string representation of the reversed bitmap.
     *
     * @example
     * // Assuming `this.bitmap.toReversed()` returns [[1,1,1],[0,1,0]]
     * getCharacterReversed(); // "010111"
     *
     * @example
     * // Assuming `this.bitmap.toReversed()` returns an empty or zero-filled array
     * getCharacterReversed(); // E.g., "0000"
     */
    getCharacterReversed() {
        return this.bitmap.toReversed().flat().join('');
    }
}