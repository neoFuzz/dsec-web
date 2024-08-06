import {dsector} from './dsector.js';

/**
 * Represents a keyboard layout for DSector (game) controls.
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
export class DSecKeyboardLayout {
    /**
     * Constructs a new DSecKeyboardLayout object.
     * @constructor
     * @param {number|null} forwards - The key code for the forwards action. Defaults to 38 (Arrow Up).
     * @param {number|null} backwards - The key code for the backwards action. Defaults to 40 (Arrow Down).
     * @param {number|null} turnLeft - The key code for the turn left action. Defaults to 37 (Arrow Left).
     * @param {number|null} turnRight - The key code for the turn right action. Defaults to 39 (Arrow Right).
     * @param {number|null} changeWeapon - The key code for the change weapon action. Defaults to 67 (C).
     * @param {number|null} fireWeapon - The key code for the fire weapon action. Defaults to 32 (Space).
     * @throws {Error} If an invalid overload is provided.
     */
    constructor(forwards, backwards, turnLeft, turnRight,
                changeWeapon, fireWeapon) {
        if (((typeof forwards === 'number') || forwards === null) &&
            ((typeof backwards === 'number') || backwards === null) &&
            ((typeof turnLeft === 'number') || turnLeft === null) &&
            ((typeof turnRight === 'number') || turnRight === null) &&
            ((typeof changeWeapon === 'number') || changeWeapon === null) &&
            ((typeof fireWeapon === 'number') || fireWeapon === null)) {
            this.forwards = forwards || 38; // Defaults to 38 (Arrow Up)
            this.backwards = backwards || 40; // Defaults to 40 (Arrow Down)
            this.turnLeft = turnLeft || 37; // Defaults to 37 (Arrow Left)
            this.turnRight = turnRight || 39; // Defaults to 39 (Arrow Right)
            this.changeWeapon = changeWeapon || 67; // Defaults to 67 (C)
            this.fireWeapon = fireWeapon || 32; // Defaults to 32 (Space)
        } else if (forwards === undefined && backwards === undefined && turnLeft === undefined &&
            turnRight === undefined && changeWeapon === undefined && fireWeapon === undefined) {
            this.forwards = 38; // Defaults to 38 (Arrow Up)
            this.backwards = 40; // Defaults to 40 (Arrow Down)
            this.turnLeft = 37; // Defaults to 37 (Arrow Left)
            this.turnRight = 39; // Defaults to 39 (Arrow Right)
            this.changeWeapon = 67; // Defaults to 67 (C)
            this.fireWeapon = 32; // Defaults to 32 (Space)
        } else
            throw new Error('invalid overload');
    }
}