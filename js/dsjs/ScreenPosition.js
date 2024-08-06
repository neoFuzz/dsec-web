import {dsector} from './dsector.js';

/**
 * Class representing a screen position.
 *
 * @property  {number} x - The x-coordinate.
 * @property {number} y - The y-coordinate.
 *
 * @example
 * let screenPosition = new dsector.ScreenPosition();
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
export class ScreenPosition {
    /**
     * Creates an instance of ScreenPosition.
     *
     * @param {number} [x=0] - The x-coordinate.
     * @param {number} [y=0] - The y-coordinate.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the position.
     *
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Gets the x-coordinate.
     * @returns {number} The x-coordinate.
     */
    getX() {
        return this.x;
    }

    /**
     * Gets the y-coordinate.
     *
     * @returns {number} The y-coordinate.
     */
    getY() {
        return this.y;
    }
}