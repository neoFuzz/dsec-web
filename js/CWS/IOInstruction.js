/**
 * This class represents an instruction for input/output operations.
 *
 * @property {number} type - The type of instruction.
 * @property {number} x - The x coordinate of the instruction.
 * @property {number} y - The y coordinate of the instruction.
 * @property {string} key - The key of the instruction.
 * @property {number} keyCode - The key code of the instruction.
 *
 * @example
 * let instruction = new IOInstruction(IOInstruction.TYPE_MOUSE_MOVE, 100, 200);
 *
 * @since    1.0.0.
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class IOInstruction {
    /**
     * Creates a new IOInstruction object.
     *
     * @param {number} type - The type of instruction.
     * @param {number|string|undefined} x - The x coordinate of the instruction.
     * @param {number|undefined} y - The y coordinate of the instruction.
     * @throws {Error} If the constructor arguments are invalid.
     */
    constructor(type, x, y) {
        this.type = type ?? 0;
        this.x = 0;
        this.y = 0;
        this.key = null;
        this.keyCode = 0;

        if (typeof x === 'number' && typeof y === 'number') {
            this.x = x;
            this.y = y;
        } else if (typeof x === 'string') {
            this.key = x;
        } else if (typeof x === 'number') {
            this.keyCode = x;
        } else if (x !== undefined || y !== undefined) {
            throw new Error('Invalid constructor arguments');
        }
    }

    /**
     * Returns the type of the instruction.
     *
     * @public
     * @returns {number} The type of the instruction.
     */
    getType() {
        return this.type;
    }

    /**
     * Mouse entered instruction.
     * @type {number}
     * @constant
     */
    static mouseEntered = 1;
    /**
     * Mouse exited instruction.
     * @type {number}
     * @constant
     */
    static mouseExited = 2;
    /**
     * Mouse left button pressed instruction.
     * @type {number}
     * @constant
     */
    static mouseLeftPressed = 3;
    /**
     * Mouse right button pressed instruction.
     * @type {number}
     * @constant
     */
    static mouseRightPressed = 4;
    /**
     * Mouse left button released instruction.
     * @type {number}
     * @constant
     */
    static mouseLeftReleased = 5;
    /**
     * Mouse right mouse button instruction.
     * @type {number}
     * @constant
     */
    static mouseRightReleased = 6;
    /**
     * Mouse left-clicked instruction.
     * @type {number}
     * @constant
     */
    static mouseLeftClicked = 7;
    /**
     * Mouse right-clicked instruction.
     * @type {number}
     * @constant
     */
    static mouseRightClicked = 8;
    /**
     * Mouse double left clicked instruction.
     * @type {number}
     * @constant
     */
    static mouseDoubleLeftClicked = 9;
    /**
     * Mouse double right-clicked instruction.
     * @type {number}
     * @constant
     */
    static mouseDoubleRightClicked = 10;
    /**
     * Mouse dragged instruction.
     * @type {number}
     * @constant
     */
    static mouseDragged = 11;
    /**
     * Mouse moved instruction.
     * @type {number}
     * @constant
     */
    static mouseMoved = 12;
    /**
     * Key typed instruction.
     * @type {number}
     * @constant
     */
    static keyTyped = 13;
    /**
     * Key pressed instruction.
     * @type {number}
     * @constant
     */
    static keyPressed = 14;
    /**
     * Key released instruction.
     * @type {number}
     * @constant
     */
    static keyReleased = 15;
}