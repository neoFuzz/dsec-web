(function (CWSYSTEM) {
    /**
     * Represents a button within the CWSYSTEM.
     *
     * @property {string} buttonPressedMethodName - The name of the method to be called when the button is pressed.
     * @property {CWSYSTEM.CWWindow | null} parent - The parent window of the button.
     * @property {CWSYSTEM.CWColor} textColor - The color of the text on the button.
     * @property {CWSYSTEM.CWColor} bgColor - The background color of the button.
     * @property {CWSYSTEM.CWColor} secondaryBackgroundColor - The secondary background color of the button.
     * @property {CWSYSTEM.CWColor} bgColorHighlighted - The background color of the button when highlighted.
     * @property {CWSYSTEM.CWColor} secondaryBackgroundColorHighlighted - The secondary background color of the button when highlighted.
     * @property {CWSYSTEM.CWColor} borderColor - The color of the button border.
     * @property {CWSYSTEM.CWColor} textColorHighlighted - The color of the text on the button when highlighted.
     * @property {boolean} __isPressed - Indicates whether the button is currently pressed.
     * @property {boolean} mouseIsOver - Indicates whether the mouse is over the button.
     * @property {number} type - The type of the button.
     * @property {CWSYSTEM.CWFont | null} font - The font used for the button text.
     * @property {number} borderThickness - The thickness of the button border.
     * @property {number} responds - The response type of the button.
     * @property {string} name - The name of the button.
     * @property {string} secondText - The secondary text displayed on the button (if any).
     *
     * @class
     * @since    1.0.0
     * @access   public
     *
     * @memberof CWSYSTEM
     * @requires CWSYSTEM.CWColor
     * @requires CWSYSTEM.CWWindow
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class CWButton {
        /**
         * Creates an instance of CWButton.
         *
         * @param {CWSYSTEM.CWWindow} window - The window instance to which the button belongs.
         * @param {string} name - The name of the button.
         * @param {Object} dimensions - Object with dimensions
         * @param {string} inText - The text displayed on the button.
         * @param {number} inType - The type of the button.
         * @param {number} responds - The response type of the button.
         * @throws {Error} Will throw an error if any argument is invalid.
         *
         */
        constructor(window, name, dimensions,
                    inText, inType, responds) {
            let {x, y, length, height} = dimensions;
            if (!(window instanceof CWSYSTEM.CWWindow || window === null)) {
                throw new Error('Invalid window argument');
            }

            this.buttonPressedMethodName = 'buttonPressed';
            this.parent = window;
            this.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
            this.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            this.secondaryBackgroundColor = new CWSYSTEM.CWColor(175, 175, 190, 255);
            this.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__black());
            this.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__brightBlue());
            this.borderColor = new CWSYSTEM.CWColor(CWButton.defaultBorderColor_$LI$());
            this.textColorHighlighted = this.bgColor;
            this.__isPressed = false;
            this.mouseIsOver = false;
            this.type = CWButton.TEXT_BUTTON;
            this.font = this.parent.v.serif8_font;
            this.textAlignment = CWButton.CENTERED;
            this.textLeftMargin = 5;
            this.fillStyle = CWButton.LINEAR_GRADIENT;
            this.shortcutTextRightMargin = 15;
            this.secondText = null;

            const validateAndAssign = (value, type, propertyName) => {
                if (value === null || typeof value === type) {
                    return value;
                }
                throw new Error(`Invalid ${propertyName} argument`);
            };

            this.name = validateAndAssign(name, 'string', 'name');
            this.x = validateAndAssign(x, 'number', 'x');
            this.y = validateAndAssign(y, 'number', 'y');
            this.length = validateAndAssign(length, 'number', 'length');
            this.height = validateAndAssign(height, 'number', 'height');

            if (typeof inText === 'string' || inText === null) {
                this.text = inText;
            } else if (typeof inText === 'number' && inType === undefined && responds === undefined) {
                this.intProperty = inText;
            } else {
                throw new Error('Invalid inText argument');
            }

            this.type = inType !== undefined ? validateAndAssign(inType, 'number', 'inType') : this.type;
            this.respondsTo = responds !== undefined ? validateAndAssign(responds, 'number', 'responds') : CWButton.PRESSED;
        }

        /**
         * Gets the default border color for the button.
         *
         * @returns {CWSYSTEM.CWColor} The default border color.
         */
        static defaultBorderColor_$LI$() {
            if (CWButton.defaultBorderColor == null) {
                CWButton.defaultBorderColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            }
            return CWButton.defaultBorderColor;
        }

        /**
         * Method to handle the button press event.
         */
        buttonPressed() {
            if (this.objectContainingButtonPressedMethod != null) {
                try {
                    const declaredMethod = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingButtonPressedMethod.constructor, this.buttonPressedMethodName);
                    const objects = [this];
                    declaredMethod.fn.apply(this.objectContainingButtonPressedMethod, [objects]);
                } catch (e) {
                    console.error("A problem occurred in CWButton.buttonPressed() for button '" + this.name + "': " + e);
                }
            }
            if (this.onPressedMethod != null) {
                try {
                    this.onPressedMethod.fn.apply(this.onPressedObject, [this.onPressedParameters]);
                } catch (e) {
                    console.error("Error in CWButton.buttonPressed(..) with button '" + this.name + "': " + e);
                }
            }
        }

        /**
         * Simulates pressing the button.
         */
        press() {
            CWSYSTEM.Environment.buttonLastPressed = this;
            this.__isPressed = true;
            this.parent.updated = false;
        }

        /**
         * Simulates releasing the button.
         */
        release() {
            this.__isPressed = false;
            this.parent.updated = false;
            CWSYSTEM.Environment.buttonLastPressed = null;
        }

        /**
         * Checks if the button is currently pressed.
         *
         * @returns {boolean} True if the button is pressed, false otherwise.
         */
        isPressed() {
            return this.__isPressed;
        }

        /**
         * Draws the button on the screen.
         */
        draw() {
            try {
                const vs = this.parent.v;
                let isPressedB;
                if (this.isPressed()) {
                    isPressedB = 1;
                } else {
                    isPressedB = 0;
                }
                const cBWidth = this.parent.borderWidth + this.x + isPressedB;
                const cbWnH = this.parent.borderWidth + this.parent.__titleHeight + this.y + isPressedB;
                let color1;
                let color2;
                let color3;
                switch ((this.type)) {
                    case 0: /* TEXT_BUTTON */
                        if (this.mouseIsOver) {
                            color2 = this.textColorHighlighted;
                            color1 = this.bgColorHighlighted;
                            color3 = this.secondaryBackgroundColorHighlighted;
                        } else {
                            color2 = this.textColor;
                            color1 = this.bgColor;
                            color3 = this.secondaryBackgroundColor;
                        }
                        vs.setColor$intCWColor(color2);
                        vs.CWDrawRectangle(this.parent.window, cBWidth, cbWnH, this.length, this.height);
                        if (this.fillStyle === CWButton.LINEAR_GRADIENT) {
                            vs.CWDrawFilledRectangleWithGradient(this.parent.window, cBWidth + 1, cbWnH + 1, this.length - 2, this.height - 2, color1, color3);
                        } else {
                            vs.CWDrawFilledRectangle(this.parent.window, cBWidth + 1, cbWnH + 1, this.length - 2, this.height - 2, color1);
                        }
                        if (this.text != null) {
                            vs.setColor$intCWColor(color2);
                            vs.drawString$sd$n$s$n2$n3$b(this.parent.window, this.length, this.text, cBWidth + 4, cbWnH + this.height - 3, false);
                            if (this.secondText != null) {
                                vs.drawString$sd$n$s$n2$n3$b(this.parent.window, this.length, this.secondText, cBWidth + 4 + this.secondTextHorizontalOffset, cbWnH + this.height - 3, false);
                            }
                        }
                        break;
                    case 1: /* ARROW_UP */
                    case 2: /* ARROW_DOWN */
                    case 3: /* ARROW_LEFT */
                    case 4: /* ARROW_RIGHT */
                    case 5: /* ZOOM_PLUS */
                    case 6: /* ZOOM_MINUS */
                    case 7: /* WORLD_INFO */
                    case 8: /* OFFSET_PAD */
                        this.doCase8(vs, isPressedB, cBWidth, cbWnH);
                        break;
                    case 9: /* ROUNDED_TEXT_BUTTON */
                    case 10: /* SQUARE_TEXT_BUTTON */
                        this.doCase10(vs, isPressedB, cBWidth, cbWnH)
                }
                return true;
            } catch (e) {
                console.error("Error drawing button '" + this.name + "': " + e);
                return false;
            }
        }

        /**
         * Handles the case when the button type is 9 (ROUNDED_TEXT_BUTTON) or 10 (SQUARE_TEXT_BUTTON).
         *
         * @private
         * @param {CWSYSTEM.VirtualScreen} vs The virtual screen instance.
         * @param {number} isPressedB The pressed state of the button.
         * @param {number} cBWidth The width of the button's bounding box.
         * @param {number} cbWnH The height of the button's bounding box.
         */
        doCase10(vs, isPressedB, cBWidth, cbWnH) {
            const {
                mouseIsOver, textColorHighlighted, bgColorHighlighted, secondaryBackgroundColorHighlighted,
                textColor, bgColor, secondaryBackgroundColor
            } = this;

            const [color1, color2, color3] = mouseIsOver
                ? [bgColorHighlighted, textColorHighlighted, secondaryBackgroundColorHighlighted]
                : [bgColor, textColor, secondaryBackgroundColor];

            vs.setColor$intCWColor(color2);
            vs.CWDrawRectangle(this.parent.window, cBWidth, cbWnH, this.length + 1, this.height + 1);
            if (this.fillStyle === CWButton.LINEAR_GRADIENT) {
                vs.CWDrawFilledRectangleWithGradient(this.parent.window, cBWidth + 1, cbWnH + 1,
                    this.length - 1, this.height - 1, color1, color3);
            } else {
                vs.CWDrawFilledRectangle(this.parent.window, cBWidth + 1, cbWnH + 1,
                    this.length - 1, this.height - 1, color1);
            }
            if (this.text != null) {
                vs.setColor$intCWColor(color2);
                const textHeightInPixels = CWSYSTEM.CWFontTools.textHeightInPixels(this.text, this.font);
                const tHeight = this.height;
                const lHeight = ((tHeight - textHeightInPixels) / 2 | 0);
                CWSYSTEM.CWFontTools.renderText(null, this.text, 0, 0, this.font, color2, 9999);
                let width1 = this.textAlignment === CWButton.CENTERED
                    ? ((this.length - CWSYSTEM.CWFontTools.RENDERED_WIDTH) / 2 | 0)
                    : this.textLeftMargin;
                CWSYSTEM.CWFontTools.renderText(this.parent.window, this.text, cBWidth + width1, cbWnH + this.height - lHeight - 1, this.font, color2, 999);
                if (this.secondText != null) {
                    CWSYSTEM.CWFontTools.renderText(this.parent.window, this.secondText,
                        cBWidth + width1 + this.secondTextHorizontalOffset, cbWnH + this.height - lHeight - 1,
                        this.font, color2, 999);
                }
                if (this.shortcutText != null) {
                    const textLengthInPixels = CWSYSTEM.CWFontTools.textLengthInPixels(this.shortcutText, this.font);
                    const combined = this.parent.borderWidth + this.x + isPressedB + this.length -
                        textLengthInPixels - this.shortcutTextRightMargin;
                    vs.setColor$intCWColor(color2);
                    CWSYSTEM.CWFontTools.renderText(this.parent.window, this.shortcutText, combined,
                        cbWnH + this.height - lHeight - 1, this.font, color2, 999);
                }
                if (this.type === CWButton.ROUNDED_TEXT_BUTTON) this.doCase10a(color2, vs, cBWidth, cbWnH);
            }
        }

        /**
         * Handles the case when the button type is 9 (ROUNDED_TEXT_BUTTON).
         *
         * @private
         * @param {CWSYSTEM.CWColor} color2 The color for the button text.
         * @param {CWSYSTEM.VirtualScreen} vs The virtual screen instance.
         * @param {number} cBWidth The width of the button's bounding box.
         * @param {number} cbWnH The height of the button's bounding box.
         */
        doCase10a(color2, vs, cBWidth, cbWnH) {
            const colorArray = [[9, 9, 9, 9], [9, 9, 1, 1], [9, 1, 0, 0], [9, 1, 0, 0]];
            for (let i = 0; i < colorArray.length; ++i) {
                for (let j = 0; j < colorArray[0].length; ++j) {
                    const pickedColor = colorArray[i][j];
                    let newColor = pickedColor === 9
                        ? this.parent.windowBGColor
                        : null;
                    if (pickedColor === 1) {
                        newColor = color2;
                    }
                    if (newColor != null) {
                        vs.setColor$intCWColor(newColor);
                        vs.CWDrawPixel(this.parent.window, cBWidth + j, cbWnH + i);
                        vs.CWDrawPixel(this.parent.window, cBWidth + this.length - j, cbWnH + i);
                        vs.CWDrawPixel(this.parent.window, cBWidth + j, cbWnH + this.height - i);
                        vs.CWDrawPixel(this.parent.window, cBWidth + this.length - j, cbWnH + this.height - i);
                    }
                }
            }
        }

        /**
         * Handles the case when the button type is 1-8.
         *
         * @private
         * @param {CWSYSTEM.VirtualScreen} vs The virtual screen instance.
         * @param {number} isPressedB The pressed state of the button.
         * @param {number} cBWidth The width of the button's bounding box.
         * @param {number} cbwnh The height of the button's bounding box.
         */
        doCase8(vs, isPressedB, cBWidth, cbwnh) {
            const {mouseIsOver, parent, x, y, length, height, type} = this;
            const {window, borderWidth, __titleHeight} = parent;

            const color2 = mouseIsOver ?
                new CWSYSTEM.CWColor(255, 255, 255, 180) :
                new CWSYSTEM.CWColor(200, 200, 250, 90);
            const color1 = mouseIsOver ?
                new CWSYSTEM.CWColor(90, 90, 0, 120) :
                new CWSYSTEM.CWColor(20, 20, 0, 120);

            const drawX = borderWidth + x + 1 + isPressedB;
            const drawY = borderWidth + __titleHeight + y + 1 + isPressedB;

            vs.setColor$intCWColor(color2);
            vs.CWDrawRectangle(window, drawX, drawY, length - 2, height - 2);
            vs.CWDrawFilledRectangle(window, drawX + 1, drawY + 1, length - 4, height - 4, color1);
            vs.setColor$intCWColor(color2);

            const centerX = cBWidth + Math.floor(length / 2);
            const centerY = cbwnh + Math.floor(height / 2);

            const drawArrow = (offsets) => {
                offsets.forEach(([xOffset, yOffset]) => {
                    vs.CWDrawPixel(window, centerX + xOffset, centerY + yOffset);
                });
            };

            switch (type) {
                case CWButton.ARROW_LEFT:
                    drawArrow([[-1, 0], [0, 1], [0, -1], [1, 2], [1, -2]]);
                    break;
                case CWButton.ARROW_RIGHT:
                    drawArrow([[1, 0], [0, 1], [0, -1], [-1, 2], [-1, -2]]);
                    break;
                case CWButton.ARROW_UP:
                    drawArrow([[0, -1], [1, 0], [-1, 0], [2, 1], [-2, 1]]);
                    break;
                case CWButton.ARROW_DOWN:
                    drawArrow([[0, 1], [1, 0], [-1, 0], [2, -1], [-2, -1]]);
                    break;
                case CWButton.ZOOM_PLUS:
                    vs.CWLine(window, centerX, centerY - height / 2 + 3, centerX, centerY + height / 2 - 4, false);
                    vs.CWLine(window, centerX - length / 2 + 3, centerY, centerX + length / 2 - 4, centerY, false);
                    break;
                case CWButton.ZOOM_MINUS:
                    vs.CWLine(window, centerX - length / 2 + 3, centerY, centerX + length / 2 - 4, centerY, false);
                    break;
                case CWButton.WORLD_INFO:
                    vs.CWLine(window, centerX, centerY - height / 2 + 5, centerX, centerY + height / 2 - 4, false);
                    vs.CWDrawPixel(window, centerX, centerY - height / 2 + 3);
                    break;
                case CWButton.OFFSET_PAD:
                    vs.CWLine(window, centerX - 2, centerY - height / 2 + 3, centerX - 2, centerY + height / 2 - 4, false);
                    [[-1, 3], [0, 3], [1, 3], [2, 4], [2, 5], [1, 6], [-1, 6], [0, 6]].forEach(([xOffset, yOffset]) => {
                        vs.CWDrawPixel(window, centerX + xOffset, centerY - height / 2 + yOffset);
                    });
                    break;
            }
        }
    }

    /**
     * Constant for the button click state. This works best with non-named buttons as shown in the example.
     *
     * @constant
     * @type {number}
     * @default
     * @example
     * let button = this.window.addButton("", 342, 27, 52, 15, "Cancel", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
     */
    CWButton.CLICKED = 0;
    /**
     * Constant for the button pressed state. This works best with a named button as shown in the example.
     *
     * @constant
     * @type {number}
     * @default
     * @example
     * let button = this.window.addButton("LOAD_GAME", 288, 27, 42, 15, "Load", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON,  CWSYSTEM.CWButton.PRESSED);
     */
    CWButton.PRESSED = 1;
    /**
     * Constant for the text button type.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.TEXT_BUTTON = 0;
    CWButton.ARROW_UP = 1;
    CWButton.ARROW_DOWN = 2;
    CWButton.ARROW_LEFT = 3;
    CWButton.ARROW_RIGHT = 4;
    CWButton.ZOOM_PLUS = 5;
    CWButton.ZOOM_MINUS = 6;
    CWButton.WORLD_INFO = 7;
    CWButton.OFFSET_PAD = 8;
    /**
     * Constant for the rounded text button type.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.ROUNDED_TEXT_BUTTON = 9;
    /**
     * Constant for the square text button type.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.SQUARE_TEXT_BUTTON = 10;
    /**
     * Constant for left alignment.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.LEFT = 0;
    /**
     * Constant for centered alignment.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.CENTERED = 1;
    /**
     * Constant for normal button style.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.NORMAL = 0;
    /**
     * Constant for linear gradient button style.
     * @constant
     * @type {number}
     * @default
     */
    CWButton.LINEAR_GRADIENT = 1;
    CWSYSTEM.CWButton = CWButton;
    CWButton["__class"] = "CWSYSTEM.CWButton";
})(CWSYSTEM);