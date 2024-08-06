import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Represents an inbuilt light in the dsector environment. Re-written from the Java port.
 *
 * @property {boolean} on - The state of the light (on/off).
 * @property {number} x - The x-coordinate of the light.
 * @property {number} y - The y-coordinate of the light.
 * @property {number} z - The z-coordinate of the light.
 * @property {number} red - The red component of the light color (0-1).
 * @property {number} green - The green component of the light color (0-1).
 * @property {number} blue - The blue component of the light color (0-1).
 * @property {number} id - The unique identifier of the light.
 * @property {Object} parent - The parent object of the light.
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
export class InbuiltLight {
    /**
     * Creates a new InbuiltLight instance.
     *
     * @param {Object} parent - The parent object of the light.
     * @param {string} name - The name of the light.
     * @param {boolean} on - The initial state of the light (on/off).
     * @param {number} x - The x-coordinate of the light.
     * @param {number} y - The y-coordinate of the light.
     * @param {number} z - The z-coordinate of the light.
     * @param {number} red - The red component of the light color (0-1).
     * @param {number} green - The green component of the light color (0-1).
     * @param {number} blue - The blue component of the light color (0-1).
     */
    constructor(parent, name, on, x, y, z, red, green, blue) {
        this.parent = parent || null;
        this.name = name || null;
        this.id = CWSYSTEM.NumberTools.randomLong();
        this.__on = on;
        this.__x = x;
        this.__y = y;
        this.__z = z;
        this.__red = red;
        this.__green = green;
        this.__blue = blue;
    }


    /**
     * Checks if the light is on.
     * @returns {boolean} True if the light is on, false otherwise.
     */
    isOn() {
        return this.__on;
    }

    /**
     * Checks if the light is off.
     * @returns {boolean} True if the light is off, false otherwise.
     */
    isOff() {
        return !this.__on;
    }

    /**
     * Gets or sets the light state.
     * @param {boolean} [state] - The new state of the light.
     * @returns {boolean} The current state of the light if no parameter is provided.
     */
    on(state) {
        if (state === undefined) {
            return this.__on;
        }
        this.__on = state;
        this.updateWindowsShowingLightOnStatus();
    }

    /**
     * Updates a coordinate value and refreshes the window display.
     * @param {string} co - The coordinate to update ('x', 'y', or 'z').
     * @param {number} value - The new value for the coordinate.
     * @private
     */
    _updateCoord(co, value) {
        this[`__${co}`] = value;
        this.updateWindowsShowingLightPosition();
    }

    /**
     * Gets or sets the x-coordinate of the light.
     * @param {number} [value] - The new x-coordinate value.
     * @returns {number} The current x-coordinate if no parameter is provided.
     */
    x(value) {
        return (value === undefined) ? this.__x : this._updateCoord('x', value);
    }

    /**
     * Gets or sets the y-coordinate of the light.
     * @param {number} [value] - The new y-coordinate value.
     * @returns {number} The current y-coordinate if no parameter is provided.
     */
    y(value) {
        return (value === undefined) ? this.__y : this._updateCoord('y', value);
    }

    /**
     * Gets or sets the z-coordinate of the light.
     * @param {number} [value] - The new z-coordinate value.
     * @returns {number} The current z-coordinate if no parameter is provided.
     */
    z(value) {
        return (value === undefined) ? this.__z : this._updateCoord('z', value);
    }

    /**
     * Updates a color component and refreshes the window display.
     * @param {string} color - The color component to update ('red', 'green', or 'blue').
     * @param {number} value - The new value for the color component (0-1).
     * @private
     */
    _updateColor(color, value) {
        this[`__${color}`] = value;
        this.updateWindowsShowingLightColor();
    }

    /**
     * Gets or sets the red component of the light color.
     * @param {number} [value] - The new red component value (0-1).
     * @returns {number} The current red component if no parameter is provided.
     */
    red(value) {
        return (value === undefined) ? this.__red : this._updateColor('red', value);
    }

    /**
     * Gets or sets the green component of the light color.
     * @param {number} [value] - The new green component value (0-1).
     * @returns {number} The current green component if no parameter is provided.
     */
    green(value) {
        return (value === undefined) ? this.__green : this._updateColor('green', value);
    }

    /**
     * Gets or sets the blue component of the light color.
     * @param {number} [value] - The new blue component value (0-1).
     * @returns {number} The current blue component if no parameter is provided.
     */
    blue(value) {
        return (value === undefined) ? this.__blue : this._updateColor('blue', value);
    }

    /**
     * Updates windows showing light on/off status.
     * @private
     */
    updateWindowsShowingLightOnStatus() {
        CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
    }

    /**
     * Updates windows showing light position.
     * @private
     */
    updateWindowsShowingLightPosition() {
        CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
    }

    /**
     * Updates windows showing light color.
     * @private
     */
    updateWindowsShowingLightColor() {
        CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
    }
}