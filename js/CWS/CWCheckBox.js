import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Represents a checkbox within the CWSYSTEM.
 *
 * @property {number} style - The style of the checkbox.
 * @property {number} length - The length of the checkbox.
 * @property {number} height - The height of the checkbox.
 * @property {number} clickableBorderWidth - The width of the clickable border around the checkbox.
 * @property {boolean} __selected - Indicates whether the checkbox is selected or not.
 * @property {number} radioID - The ID of the radio button associated with this checkbox, if any.
 * @property {number} intValue - The integer value associated with the checkbox, if any.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 * @requires CWSYSTEM.CWWindow
 * @requires CWSYSTEM.CWColor
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class CWCheckBox {
    /**
     * Creates an instance of CWCheckBox.
     *
     * @param {CWSYSTEM.CWWindow} parent - The parent window instance.
     * @param {string} name - The name of the checkbox.
     * @param {number} x - The x-coordinate of the checkbox.
     * @param {number} y - The y-coordinate of the checkbox.
     * @param {boolean} selected - The initial selected state of the checkbox.
     * @throws {Error} Will throw an error if any argument is invalid.
     */
    constructor(parent, name, x, y, selected) {
        this.style = CWCheckBox.SMALL_STYLE;
        this.length = 7;
        this.height = 7;
        this.clickableBorderWidth = 0;
        this.__selected = false;
        this.radioID = 0;
        this.intValue = 0;
        this.generalPurposeObject = null;
        this.objectContainingCheckBoxChangedMethod = null;

        const isValidParent = parent instanceof CWSYSTEM.CWWindow || parent === null;
        const isValidName = typeof name === 'string' || name === null;
        const isValidX = typeof x === 'number' || x === null;
        const isValidY = typeof y === 'number' || y === null;
        const isValidSelected = typeof selected === 'boolean' || selected === null;

        if (arguments.length === 0) {
            // Default case when no arguments are provided
            this.clickableBorderWidth = 4;
        } else if (isValidParent && isValidName && isValidX && isValidY && isValidSelected) {
            this.parentWindow = parent;
            this.name = name;
            this.x = x;
            this.y = y;
            this.__selected = selected;
            this.radioID = -1;
        } else {
            throw new Error('Invalid arguments');
        }
    }

    /**
     * Gets the bitmap for the unselected state of the checkbox.
     *
     * @returns {Array} The bitmap for the unselected state.
     */
    static bitmapUnselected_$LI$() {
        if (CWCheckBox.bitmapUnselected == null) {
            CWCheckBox.bitmapUnselected = [[0, 0, 4, 2, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 3, 3, 3, 4, 0],
                [4, 1, 1, 2, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4],
                [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 0, 0, 4, 4, 4, 0, 4, 0, 0, 0]];
        }
        return CWCheckBox.bitmapUnselected;
    }

    /**
     * Gets the bitmap for the selected state of the checkbox.
     *
     * @returns {Array} The bitmap for the selected state.
     */
    static bitmapSelected_$LI$() {
        if (CWCheckBox.bitmapSelected == null) {
            CWCheckBox.bitmapSelected = [[0, 0, 4, 2, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 3, 3, 3, 4, 0],
                [4, 1, 1, 2, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 3, 1, 3, 0, 0, 0, 4],
                [1, 2, 0, 3, 1, 1, 1, 3, 0, 0, 4], [1, 2, 0, 1, 1, 1, 1, 1, 0, 0, 4],
                [1, 3, 0, 3, 1, 1, 1, 3, 0, 0, 4], [2, 3, 0, 0, 3, 1, 3, 0, 0, 0, 0],
                [0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0],
                [0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0]];
        }
        return CWCheckBox.bitmapSelected;
    }

    /**
     * Gets the larger bitmap for the unselected state of the checkbox.
     *
     * @returns {Array} The larger bitmap for the unselected state.
     */
    static largerBitmapUnselected_$LI$() {
        if (CWCheckBox.largerBitmapUnselected == null) {
            CWCheckBox.largerBitmapUnselected = [[0, 0, 4, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
                [0, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0],
                [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
                [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0]];
        }
        return CWCheckBox.largerBitmapUnselected;
    }

    /**
     * Gets the larger bitmap for the selected state of the checkbox.
     *
     * @returns {Array} The larger bitmap for the selected state.
     */
    static largerBitmapSelected_$LI$() {
        if (CWCheckBox.largerBitmapSelected == null) {
            CWCheckBox.largerBitmapSelected = [[0, 0, 4, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
                [0, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0],
                [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 4],
                [1, 2, 0, 0, 3, 1, 1, 1, 3, 0, 0, 0, 4], [1, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 2, 0, 0, 3, 1, 1, 1, 3, 0, 0, 0, 4], [1, 3, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0],
                [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0]];
        }
        return CWCheckBox.largerBitmapSelected;
    }

    /**
     * Sets the style of the checkbox.
     *
     * @param {number} style - The style to be set.
     */
    setStyle(style) {
        this.style = style;
        switch ((style)) {
            case 1: /* ROUND_STYLE */
                this.length = 11;
                this.height = 11;
                this.clickableBorderWidth = 5;
                break;
            case 2: /* LARGER_ROUND_STYLE */
                this.length = 13;
                this.height = 13;
                this.clickableBorderWidth = 10;
                break;
            case 0: /* SMALL_STYLE */
            default:
                this.length = 7;
                this.height = 7;
                this.clickableBorderWidth = 4;
                break;
        }
    }

    /**
     * Informs the supplied object about the new checkbox value.
     *
     * @private
     */
    informSuppliedObjectAboutNewCheckBoxValue() {
        if (this.objectContainingCheckBoxChangedMethod != null) {
            try {
                const changed = ((c, p) => {
                    if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                        return {owner: c, name: p, fn: c.prototype[p]};
                    else
                        return null;
                })(this.objectContainingCheckBoxChangedMethod.constructor, "checkBoxChanged");
                const objects = [this];
                changed.fn.apply(this.objectContainingCheckBoxChangedMethod, [objects]);
            } catch (e) {
                console.error("A problem occured in CWWindow.informSuppliedObjectAboutNewCheckBoxValue() " +
                    "for check box '" + this.name + "': " + e);
            }
        }
    }

    /**
     * Inverts the selected state of the checkbox.
     */
    invertSelectedState() {
        this.__selected = !this.__selected;
        this.parentWindow.updated = false;
        this.informSuppliedObjectAboutNewCheckBoxValue();
    }

    /**
     * Gets the selected state of the checkbox.
     *
     * @returns {boolean} The selected state of the checkbox.
     */
    selected$() {
        return this.__selected;
    }

    /**
     * Sets the selected state of the checkbox.
     *
     * @param {boolean} b - The selected state to be set.
     */
    setSelected(b) {
        this.__selected = b;
        this.informSuppliedObjectAboutNewCheckBoxValue();
        this.parentWindow.updated = false;
        if (this.isRadioButton() && this.__selected) {
            this.deselectRadioCheckboxesInSameFamily();
        }
    }

    /**
     * Checks if the checkbox is a radio button.
     *
     * @returns {boolean} True if the checkbox is a radio button, false otherwise.
     */
    isRadioButton() {
        return this.radioID !== -1;
    }

    /**
     * Deselects radio checkboxes in the same family.
     */
    deselectRadioCheckboxesInSameFamily() {
        if (this.__selected) {
            for (let i = 0; i < this.parentWindow.numberOfCheckBoxes; ++i) {
                const checkBox = this.parentWindow.checkBox[i];
                if (checkBox.radioID === this.radioID) {
                    checkBox.__selected = false;
                }
            }
            this.__selected = true;
        }
    }

    /**
     * Draws the checkbox on the screen.
     */
    draw() {
        const vs = this.parentWindow.v;
        const borderWidth = this.parentWindow.borderWidth;
        const titleHeight = this.parentWindow.__titleHeight;
        const x = borderWidth + this.x;
        const y = borderWidth + titleHeight + this.y;

        if (this.style === CWCheckBox.SMALL_STYLE) {
            vs.setColor$intCWColor(this.parentWindow.titleTextColor);
            vs.CWDrawRectangle(this.parentWindow.window, x, y, this.length, this.height);
            vs.CWDrawFilledRectangle(this.parentWindow.window, x + 1, y + 1,
                this.length - 2, this.height - 2, this.parentWindow.checkBoxColor);

            if (this.__selected) {
                vs.setColor$intCWColor(this.parentWindow.titleTextColor);
                vs.CWLine(this.parentWindow.window, x + 1, y + 1,
                    x + this.length - 2, y + this.height - 2, true);
                vs.CWLine(this.parentWindow.window, x + this.length - 2, y + 1,
                    x + 1, y + this.height - 2, true);
            }
        } else if (this.style === CWCheckBox.ROUND_STYLE || this.style === CWCheckBox.LARGER_ROUND_STYLE) {
            const intArr = this.getStyleBitmap();
            this.drawBitmap(intArr, vs, x, y);
        }
    }

    /**
     * Gets the bitmap for the current style and selected state.
     *
     * @returns {Array} The bitmap array.
     */
    getStyleBitmap() {
        if (this.style === CWCheckBox.LARGER_ROUND_STYLE) {
            return this.__selected ? CWCheckBox.largerBitmapSelected_$LI$() : CWCheckBox.largerBitmapUnselected_$LI$();
        } else {
            return this.__selected ? CWCheckBox.bitmapSelected_$LI$() : CWCheckBox.bitmapUnselected_$LI$();
        }
    }

    /**
     * Draws the bitmap on the screen.
     *
     * @param {Array} intArr - The bitmap array.
     * @param {CWSYSTEM.VirtualScreen} vs - The visual system object.
     * @param {number} x - The x-coordinate for drawing.
     * @param {number} y - The y-coordinate for drawing.
     */
    drawBitmap(intArr, vs, x, y) {
        for (let i = 0; i < intArr.length; ++i) {
            for (let j = 0; j < intArr[0].length; ++j) {
                const point = intArr[i][j];
                const color = this.getPixelColor(point);
                if (color) {
                    vs.setColor$intCWColor(color);
                    vs.CWDrawPixel(this.parentWindow.window, x + j - 1, y + i - 1);
                }
            }
        }
    }

    /**
     * Gets the color for the given pixel value.
     *
     * @param {number} point - The pixel value.
     * @returns {CWSYSTEM.CWColor|null} The color object or null if the value is not mapped.
     */
    getPixelColor(point) {
        switch (point) {
            case 1:
                return CWSYSTEM.CWColor.__black();
            case 2:
                return CWSYSTEM.CWColor.__darkGrey();
            case 3:
                return CWSYSTEM.CWColor.__grey();
            case 4:
                return CWSYSTEM.CWColor.__lightGrey();
            default:
                return null;
        }
    }

    /**
     * Constant representing the small style of the checkbox.
     * @type {number}
     * @constant
     * @default
     */
    static SMALL_STYLE = 0;
    /**
     * Constant representing the round style of the checkbox.
     * @type {number}
     * @constant
     * @default
     */
    static ROUND_STYLE = 1;
    /**
     * Constant representing the larger round style of the checkbox.
     * @type {number}
     * @constant
     * @default
     */
    static LARGER_ROUND_STYLE = 2;
    /**
     * Constant representing the much larger round style of the checkbox.
     * @type {number}
     * @constant
     * @default
     */
    static MUCH_LARGER_ROUND_STYLE = 3;
}