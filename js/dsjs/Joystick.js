import {dsector} from './dsector.js';

/**
 * Class to build an object representing a joystick.
 *
 * @property {string} gamePadName Name of the gamepad.
 * @property {number} internalID Internal ID of the joystick.
 * @property {dsector.FloatPair} gpTriggersScaled Trigger values stored as in FloatPair objects.
 * @property {Array<number>} gamePadAxes Array of gamepad axes values.
 * @property {Array<number>} gamePadButtons Array of gamepad button values.
 * @property {number} joystickID Gamepad API index.
 * @property {number} internalID Non-zero indexed ID internal to the game. Starts at 5 as the Keyboard players are 1 through 4.
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
export class Joystick {
    /**
     * Constructor for the Joystick class. Initializes all properties to their default values.
     */
    constructor() {
        this.gamePadName = null;
        this.internalID = 0;
        this.gpTriggersScaled = new dsector.FloatPair(0.0, 0.0);
        this.gamePadAxes = ([]);
        this.gamePadButtons = ([]);
        this.joystickID = 0;
        this.internalID = 5;
    }

    /**
     * Returns the internal ID of the joystick.
     *
     * @returns {number} The internal ID of the joystick.
     */
    getInternalID() {
        return this.internalID;
    }
}