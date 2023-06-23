/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWButton {
        constructor(window, name, x, y, length, height, inText, inType, responds) {
            if (((window != null && window instanceof CWSYSTEM.CWWindow) || window === null) &&
                ((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof length === 'number') || length === null) &&
                ((typeof height === 'number') || height === null) && ((typeof inText === 'string') || inText === null) &&
                ((typeof inType === 'number') || inType === null) && ((typeof responds === 'number') || responds === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    if (this.mouseIsOver === undefined) {
                        this.mouseIsOver = false;
                    }
                    if (this.parent === undefined) {
                        this.parent = null;
                    }
                    if (this.buttonPressedMethodName === undefined) {
                        this.buttonPressedMethodName = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.text === undefined) {
                        this.text = null;
                    }
                    if (this.respondsTo === undefined) {
                        this.respondsTo = 0;
                    }
                    if (this.font === undefined) {
                        this.font = null;
                    }
                    if (this.x === undefined) {
                        this.x = 0;
                    }
                    if (this.y === undefined) {
                        this.y = 0;
                    }
                    if (this.length === undefined) {
                        this.length = 0;
                    }
                    if (this.height === undefined) {
                        this.height = 0;
                    }
                    if (this.borderColor === undefined) {
                        this.borderColor = null;
                    }
                    if (this.bgColor === undefined) {
                        this.bgColor = null;
                    }
                    if (this.bgColorHighlighted === undefined) {
                        this.bgColorHighlighted = null;
                    }
                    if (this.textColor === undefined) {
                        this.textColor = null;
                    }
                    if (this.textColorHighlighted === undefined) {
                        this.textColorHighlighted = null;
                    }
                    if (this.type === undefined) {
                        this.type = 0;
                    }
                    if (this.intProperty === undefined) {
                        this.intProperty = 0;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    if (this.objectContainingButtonPressedMethod === undefined) {
                        this.objectContainingButtonPressedMethod = null;
                    }
                    if (this.secondText === undefined) {
                        this.secondText = null;
                    }
                    if (this.secondTextHorizontalOffset === undefined) {
                        this.secondTextHorizontalOffset = 0;
                    }
                    if (this.textAlignment === undefined) {
                        this.textAlignment = 0;
                    }
                    if (this.textLeftMargin === undefined) {
                        this.textLeftMargin = 0;
                    }
                    if (this.shortcutText === undefined) {
                        this.shortcutText = null;
                    }
                    if (this.shortcutTextRightMargin === undefined) {
                        this.shortcutTextRightMargin = 0;
                    }
                    if (this.onPressedMethod === undefined) {
                        this.onPressedMethod = null;
                    }
                    if (this.onPressedObject === undefined) {
                        this.onPressedObject = null;
                    }
                    if (this.onPressedParameters === undefined) {
                        this.onPressedParameters = null;
                    }
                    if (this.fillStyle === undefined) {
                        this.fillStyle = 0;
                    }
                    if (this.secondaryBackgroundColor === undefined) {
                        this.secondaryBackgroundColor = null;
                    }
                    if (this.secondaryBackgroundColorHighlighted === undefined) {
                        this.secondaryBackgroundColorHighlighted = null;
                    }
                    if (this.__isPressed === undefined) {
                        this.__isPressed = false;
                    }
                    this.buttonPressedMethodName = "buttonPressed";
                    this.parent = window;
                    this.respondsTo = CWButton.PRESSED;
                    this.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
                    this.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                    this.secondaryBackgroundColor = new CWSYSTEM.CWColor(175, 175, 190, 255);
                    this.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
                    this.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$());
                    this.borderColor = new CWSYSTEM.CWColor(CWButton.defaultBorderColor_$LI$());
                    this.textColorHighlighted = this.bgColor;
                    this.__isPressed = false;
                    this.mouseIsOver = false;
                    this.type = CWButton.TEXT_BUTTON;
                    this.font = this.parent.v.serif8_font;
                    this.textAlignment = CWButton.CENTERED;
                    this.textLeftMargin = 5;
                    this.fillStyle = CWButton.NORMAL;
                    this.shortcutTextRightMargin = 15;
                }
                if (this.mouseIsOver === undefined) {
                    this.mouseIsOver = false;
                }
                if (this.parent === undefined) {
                    this.parent = null;
                }
                if (this.buttonPressedMethodName === undefined) {
                    this.buttonPressedMethodName = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.respondsTo === undefined) {
                    this.respondsTo = 0;
                }
                if (this.font === undefined) {
                    this.font = null;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.borderColor === undefined) {
                    this.borderColor = null;
                }
                if (this.bgColor === undefined) {
                    this.bgColor = null;
                }
                if (this.bgColorHighlighted === undefined) {
                    this.bgColorHighlighted = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.textColorHighlighted === undefined) {
                    this.textColorHighlighted = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.intProperty === undefined) {
                    this.intProperty = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingButtonPressedMethod === undefined) {
                    this.objectContainingButtonPressedMethod = null;
                }
                if (this.secondText === undefined) {
                    this.secondText = null;
                }
                if (this.secondTextHorizontalOffset === undefined) {
                    this.secondTextHorizontalOffset = 0;
                }
                if (this.textAlignment === undefined) {
                    this.textAlignment = 0;
                }
                if (this.textLeftMargin === undefined) {
                    this.textLeftMargin = 0;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.shortcutTextRightMargin === undefined) {
                    this.shortcutTextRightMargin = 0;
                }
                if (this.onPressedMethod === undefined) {
                    this.onPressedMethod = null;
                }
                if (this.onPressedObject === undefined) {
                    this.onPressedObject = null;
                }
                if (this.onPressedParameters === undefined) {
                    this.onPressedParameters = null;
                }
                if (this.fillStyle === undefined) {
                    this.fillStyle = 0;
                }
                if (this.secondaryBackgroundColor === undefined) {
                    this.secondaryBackgroundColor = null;
                }
                if (this.secondaryBackgroundColorHighlighted === undefined) {
                    this.secondaryBackgroundColorHighlighted = null;
                }
                if (this.__isPressed === undefined) {
                    this.__isPressed = false;
                }
                (() => {
                    this.name = name;
                    this.x = x;
                    this.y = y;
                    this.length = length;
                    this.height = height;
                    this.font = this.parent.v.serif8_font;
                    this.fillStyle = CWButton.LINEAR_GRADIENT;
                    this.respondsTo = responds;
                })();

                if (this.mouseIsOver === undefined) {
                    this.mouseIsOver = false;
                }
                if (this.parent === undefined) {
                    this.parent = null;
                }
                if (this.buttonPressedMethodName === undefined) {
                    this.buttonPressedMethodName = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.respondsTo === undefined) {
                    this.respondsTo = 0;
                }
                if (this.font === undefined) {
                    this.font = null;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.borderColor === undefined) {
                    this.borderColor = null;
                }
                if (this.bgColor === undefined) {
                    this.bgColor = null;
                }
                if (this.bgColorHighlighted === undefined) {
                    this.bgColorHighlighted = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.textColorHighlighted === undefined) {
                    this.textColorHighlighted = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.intProperty === undefined) {
                    this.intProperty = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingButtonPressedMethod === undefined) {
                    this.objectContainingButtonPressedMethod = null;
                }
                if (this.secondText === undefined) {
                    this.secondText = null;
                }
                if (this.secondTextHorizontalOffset === undefined) {
                    this.secondTextHorizontalOffset = 0;
                }
                if (this.textAlignment === undefined) {
                    this.textAlignment = 0;
                }
                if (this.textLeftMargin === undefined) {
                    this.textLeftMargin = 0;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.shortcutTextRightMargin === undefined) {
                    this.shortcutTextRightMargin = 0;
                }
                if (this.onPressedMethod === undefined) {
                    this.onPressedMethod = null;
                }
                if (this.onPressedObject === undefined) {
                    this.onPressedObject = null;
                }
                if (this.onPressedParameters === undefined) {
                    this.onPressedParameters = null;
                }
                if (this.fillStyle === undefined) {
                    this.fillStyle = 0;
                }
                if (this.secondaryBackgroundColor === undefined) {
                    this.secondaryBackgroundColor = null;
                }
                if (this.secondaryBackgroundColorHighlighted === undefined) {
                    this.secondaryBackgroundColorHighlighted = null;
                }
                if (this.__isPressed === undefined) {
                    this.__isPressed = false;
                }
                (() => {
                    this.type = inType;
                    this.text = inText;
                    this.font = this.parent.v.serif8_font;
                })();
            } else if (((window != null && window instanceof CWSYSTEM.CWWindow) || window === null) &&
                ((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof length === 'number') || length === null) &&
                ((typeof height === 'number') || height === null) && ((typeof inText === 'number') || inText === null) &&
                inType === undefined && responds === undefined) {
                let __args = arguments;
                let responds = __args[6];
                {
                    let __args = arguments;
                    if (this.mouseIsOver === undefined) {
                        this.mouseIsOver = false;
                    }
                    if (this.parent === undefined) {
                        this.parent = null;
                    }
                    if (this.buttonPressedMethodName === undefined) {
                        this.buttonPressedMethodName = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.text === undefined) {
                        this.text = null;
                    }
                    if (this.respondsTo === undefined) {
                        this.respondsTo = 0;
                    }
                    if (this.font === undefined) {
                        this.font = null;
                    }
                    if (this.x === undefined) {
                        this.x = 0;
                    }
                    if (this.y === undefined) {
                        this.y = 0;
                    }
                    if (this.length === undefined) {
                        this.length = 0;
                    }
                    if (this.height === undefined) {
                        this.height = 0;
                    }
                    if (this.borderColor === undefined) {
                        this.borderColor = null;
                    }
                    if (this.bgColor === undefined) {
                        this.bgColor = null;
                    }
                    if (this.bgColorHighlighted === undefined) {
                        this.bgColorHighlighted = null;
                    }
                    if (this.textColor === undefined) {
                        this.textColor = null;
                    }
                    if (this.textColorHighlighted === undefined) {
                        this.textColorHighlighted = null;
                    }
                    if (this.type === undefined) {
                        this.type = 0;
                    }
                    if (this.intProperty === undefined) {
                        this.intProperty = 0;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    if (this.objectContainingButtonPressedMethod === undefined) {
                        this.objectContainingButtonPressedMethod = null;
                    }
                    if (this.secondText === undefined) {
                        this.secondText = null;
                    }
                    if (this.secondTextHorizontalOffset === undefined) {
                        this.secondTextHorizontalOffset = 0;
                    }
                    if (this.textAlignment === undefined) {
                        this.textAlignment = 0;
                    }
                    if (this.textLeftMargin === undefined) {
                        this.textLeftMargin = 0;
                    }
                    if (this.shortcutText === undefined) {
                        this.shortcutText = null;
                    }
                    if (this.shortcutTextRightMargin === undefined) {
                        this.shortcutTextRightMargin = 0;
                    }
                    if (this.onPressedMethod === undefined) {
                        this.onPressedMethod = null;
                    }
                    if (this.onPressedObject === undefined) {
                        this.onPressedObject = null;
                    }
                    if (this.onPressedParameters === undefined) {
                        this.onPressedParameters = null;
                    }
                    if (this.fillStyle === undefined) {
                        this.fillStyle = 0;
                    }
                    if (this.secondaryBackgroundColor === undefined) {
                        this.secondaryBackgroundColor = null;
                    }
                    if (this.secondaryBackgroundColorHighlighted === undefined) {
                        this.secondaryBackgroundColorHighlighted = null;
                    }
                    if (this.__isPressed === undefined) {
                        this.__isPressed = false;
                    }
                    this.buttonPressedMethodName = "buttonPressed";
                    this.parent = window;
                    this.respondsTo = CWButton.PRESSED;
                    this.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
                    this.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                    this.secondaryBackgroundColor = new CWSYSTEM.CWColor(175, 175, 190, 255);
                    this.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
                    this.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$());
                    this.borderColor = new CWSYSTEM.CWColor(CWButton.defaultBorderColor_$LI$());
                    this.textColorHighlighted = this.bgColor;
                    this.__isPressed = false;
                    this.mouseIsOver = false;
                    this.type = CWButton.TEXT_BUTTON;
                    this.font = this.parent.v.serif8_font;
                    this.textAlignment = CWButton.CENTERED;
                    this.textLeftMargin = 5;
                    this.fillStyle = CWButton.NORMAL;
                    this.shortcutTextRightMargin = 15;
                }
                if (this.mouseIsOver === undefined) {
                    this.mouseIsOver = false;
                }
                if (this.parent === undefined) {
                    this.parent = null;
                }
                if (this.buttonPressedMethodName === undefined) {
                    this.buttonPressedMethodName = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.respondsTo === undefined) {
                    this.respondsTo = 0;
                }
                if (this.font === undefined) {
                    this.font = null;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.borderColor === undefined) {
                    this.borderColor = null;
                }
                if (this.bgColor === undefined) {
                    this.bgColor = null;
                }
                if (this.bgColorHighlighted === undefined) {
                    this.bgColorHighlighted = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.textColorHighlighted === undefined) {
                    this.textColorHighlighted = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.intProperty === undefined) {
                    this.intProperty = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingButtonPressedMethod === undefined) {
                    this.objectContainingButtonPressedMethod = null;
                }
                if (this.secondText === undefined) {
                    this.secondText = null;
                }
                if (this.secondTextHorizontalOffset === undefined) {
                    this.secondTextHorizontalOffset = 0;
                }
                if (this.textAlignment === undefined) {
                    this.textAlignment = 0;
                }
                if (this.textLeftMargin === undefined) {
                    this.textLeftMargin = 0;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.shortcutTextRightMargin === undefined) {
                    this.shortcutTextRightMargin = 0;
                }
                if (this.onPressedMethod === undefined) {
                    this.onPressedMethod = null;
                }
                if (this.onPressedObject === undefined) {
                    this.onPressedObject = null;
                }
                if (this.onPressedParameters === undefined) {
                    this.onPressedParameters = null;
                }
                if (this.fillStyle === undefined) {
                    this.fillStyle = 0;
                }
                if (this.secondaryBackgroundColor === undefined) {
                    this.secondaryBackgroundColor = null;
                }
                if (this.secondaryBackgroundColorHighlighted === undefined) {
                    this.secondaryBackgroundColorHighlighted = null;
                }
                if (this.__isPressed === undefined) {
                    this.__isPressed = false;
                }
                (() => {
                    this.name = name;
                    this.x = x;
                    this.y = y;
                    this.length = length;
                    this.height = height;
                    this.font = this.parent.v.serif8_font;
                    this.fillStyle = CWButton.LINEAR_GRADIENT;
                    this.respondsTo = responds;
                })();
            } else if (((window != null && window instanceof CWSYSTEM.CWWindow) || window === null) &&
                name === undefined && x === undefined && y === undefined && length === undefined &&
                height === undefined && inText === undefined && inType === undefined && responds === undefined) {
                let __args = arguments;
                if (this.mouseIsOver === undefined) {
                    this.mouseIsOver = false;
                }
                if (this.parent === undefined) {
                    this.parent = null;
                }
                if (this.buttonPressedMethodName === undefined) {
                    this.buttonPressedMethodName = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.respondsTo === undefined) {
                    this.respondsTo = 0;
                }
                if (this.font === undefined) {
                    this.font = null;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.borderColor === undefined) {
                    this.borderColor = null;
                }
                if (this.bgColor === undefined) {
                    this.bgColor = null;
                }
                if (this.bgColorHighlighted === undefined) {
                    this.bgColorHighlighted = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.textColorHighlighted === undefined) {
                    this.textColorHighlighted = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.intProperty === undefined) {
                    this.intProperty = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingButtonPressedMethod === undefined) {
                    this.objectContainingButtonPressedMethod = null;
                }
                if (this.secondText === undefined) {
                    this.secondText = null;
                }
                if (this.secondTextHorizontalOffset === undefined) {
                    this.secondTextHorizontalOffset = 0;
                }
                if (this.textAlignment === undefined) {
                    this.textAlignment = 0;
                }
                if (this.textLeftMargin === undefined) {
                    this.textLeftMargin = 0;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.shortcutTextRightMargin === undefined) {
                    this.shortcutTextRightMargin = 0;
                }
                if (this.onPressedMethod === undefined) {
                    this.onPressedMethod = null;
                }
                if (this.onPressedObject === undefined) {
                    this.onPressedObject = null;
                }
                if (this.onPressedParameters === undefined) {
                    this.onPressedParameters = null;
                }
                if (this.fillStyle === undefined) {
                    this.fillStyle = 0;
                }
                if (this.secondaryBackgroundColor === undefined) {
                    this.secondaryBackgroundColor = null;
                }
                if (this.secondaryBackgroundColorHighlighted === undefined) {
                    this.secondaryBackgroundColorHighlighted = null;
                }
                if (this.__isPressed === undefined) {
                    this.__isPressed = false;
                }
                this.buttonPressedMethodName = "buttonPressed";
                this.parent = window;
                this.respondsTo = CWButton.PRESSED;
                this.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
                this.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                this.secondaryBackgroundColor = new CWSYSTEM.CWColor(175, 175, 190, 255);
                this.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
                this.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$());
                this.borderColor = new CWSYSTEM.CWColor(CWButton.defaultBorderColor_$LI$());
                this.textColorHighlighted = this.bgColor;
                this.__isPressed = false;
                this.mouseIsOver = false;
                this.type = CWButton.TEXT_BUTTON;
                this.font = this.parent.v.serif8_font;
                this.textAlignment = CWButton.CENTERED;
                this.textLeftMargin = 5;
                this.fillStyle = CWButton.NORMAL;
                this.shortcutTextRightMargin = 15;
            } else
                throw new Error('invalid overload');
        }

        static defaultBorderColor_$LI$() {
            if (CWButton.defaultBorderColor == null) {
                CWButton.defaultBorderColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            }
            return CWButton.defaultBorderColor;
        }

        buttonPressed() {
            if (this.objectContainingButtonPressedMethod != null) {
                const classes = [this.constructor];
                try {
                    const declaredMethod = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingButtonPressedMethod.constructor, this.buttonPressedMethodName);
                    const objects = [this];
                    /* invoke */
                    declaredMethod.fn.apply(this.objectContainingButtonPressedMethod, [objects]);
                } catch (e) {
                    console.error("A problem occurred in CWButton.buttonPressed() for button \'" + this.name + "\': " + e);
                }
            }
            if (this.onPressedMethod != null) {
                try {
                    /* invoke */
                    this.onPressedMethod.fn.apply(this.onPressedObject, [this.onPressedParameters]);
                } catch (e) {
                    console.error("Error in CWButton.buttonPressed(..) with button \'" + this.name + "\': " + e);
                }
            }
        }

        press() {
            CWSYSTEM.Environment.buttonLastPressed = this;
            this.__isPressed = true;
            this.parent.updated = false;
        }

        release() {
            this.__isPressed = false;
            this.parent.updated = false;
            CWSYSTEM.Environment.buttonLastPressed = null;
        }

        isPressed() {
            return this.__isPressed;
        }

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
                const cBWidthnH = this.parent.borderWidth + this.parent.__titleHeight + this.y + isPressedB;
                let color1;
                let color2;
                let color3;
                switch ((this.type)) {
                    case 0 /* TEXT_BUTTON */
                    :
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
                        vs.CWDrawRectangle(this.parent.window, cBWidth, cBWidthnH, this.length, this.height);
                        if (this.fillStyle === CWButton.LINEAR_GRADIENT) {
                            vs.CWDrawFilledRectangleWithGradient(this.parent.window, cBWidth + 1, cBWidthnH + 1, this.length - 2, this.height - 2, color1, color3);
                        } else {
                            vs.CWDrawFilledRectangle(this.parent.window, cBWidth + 1, cBWidthnH + 1, this.length - 2, this.height - 2, color1);
                        }
                        if (this.text != null) {
                            vs.setColor$intCWColor(color2);
                            vs.drawString$sd$n$s$n2$n3$b(this.parent.window, this.length, this.text, cBWidth + 4, cBWidthnH + this.height - 3, false);
                            if (this.secondText != null) {
                                vs.drawString$sd$n$s$n2$n3$b(this.parent.window, this.length, this.secondText, cBWidth + 4 + this.secondTextHorizontalOffset, cBWidthnH + this.height - 3, false);
                            }
                        }
                        break;
                    case 1 /* ARROW_UP */
                    :
                    case 2 /* ARROW_DOWN */
                    :
                    case 3 /* ARROW_LEFT */
                    :
                    case 4 /* ARROW_RIGHT */
                    :
                    case 5 /* ZOOM_PLUS */
                    :
                    case 6 /* ZOOM_MINUS */
                    :
                    case 7 /* WORLD_INFO */
                    :
                    case 8 /* OFFSET_PAD */
                    :
                        if (this.mouseIsOver) {
                            color2 = new CWSYSTEM.CWColor(255, 255, 255, 180);
                            color1 = new CWSYSTEM.CWColor(90, 90, 0, 120);
                        } else {
                            color2 = new CWSYSTEM.CWColor(200, 200, 250, 90);
                            color1 = new CWSYSTEM.CWColor(20, 20, 0, 120);
                        }
                        vs.setColor$intCWColor(color2);
                        vs.CWDrawRectangle(this.parent.window, this.parent.borderWidth + this.x + 1 + isPressedB, this.parent.borderWidth + this.parent.__titleHeight + this.y + 1 + isPressedB, this.length - 2, this.height - 2);
                        vs.CWDrawFilledRectangle(this.parent.window, this.parent.borderWidth + this.x + 2 + isPressedB, this.parent.borderWidth + this.parent.__titleHeight + this.y + 2 + isPressedB, this.length - 4, this.height - 4, color1);
                        vs.setColor$intCWColor(color2);
                        if (this.type === CWButton.ARROW_LEFT) {
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH - 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + 2 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH - 2 + (this.height / 2 | 0));
                        }
                        if (this.type === CWButton.ARROW_RIGHT) {
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH - 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + 2 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH - 2 + (this.height / 2 | 0));
                        }
                        if (this.type === CWButton.ARROW_UP) {
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH - 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 2 + (this.length / 2 | 0), cBWidthnH + 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 2 + (this.length / 2 | 0), cBWidthnH + 1 + (this.height / 2 | 0));
                        }
                        if (this.type === CWButton.ARROW_DOWN) {
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth + 2 + (this.length / 2 | 0), cBWidthnH - 1 + (this.height / 2 | 0));
                            vs.CWDrawPixel(this.parent.window, cBWidth - 2 + (this.length / 2 | 0), cBWidthnH - 1 + (this.height / 2 | 0));
                        }
                        if (this.type === CWButton.ZOOM_PLUS) {
                            vs.CWLine(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 3, cBWidth + (this.length / 2 | 0), cBWidthnH + this.height - 4, false);
                            vs.CWLine(this.parent.window, cBWidth + 3, cBWidthnH + (this.height / 2 | 0), cBWidth + this.length - 4, cBWidthnH + (this.height / 2 | 0), false);
                        }
                        if (this.type === CWButton.ZOOM_MINUS) {
                            vs.CWLine(this.parent.window, cBWidth + 3, cBWidthnH + (this.height / 2 | 0), cBWidth + this.length - 4, cBWidthnH + (this.height / 2 | 0), false);
                        }
                        if (this.type === CWButton.WORLD_INFO) {
                            vs.CWLine(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 5, cBWidth + (this.length / 2 | 0), cBWidthnH + this.height - 4, false);
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 3);
                        }
                        if (this.type === CWButton.OFFSET_PAD) {
                            vs.CWLine(this.parent.window, cBWidth - 2 + (this.length / 2 | 0), cBWidthnH + 3, cBWidth - 2 + (this.length / 2 | 0), cBWidthnH + this.height - 4, false);
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + 3);
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 3);
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + 3);
                            vs.CWDrawPixel(this.parent.window, cBWidth + 2 + (this.length / 2 | 0), cBWidthnH + 4);
                            vs.CWDrawPixel(this.parent.window, cBWidth + 2 + (this.length / 2 | 0), cBWidthnH + 5);
                            vs.CWDrawPixel(this.parent.window, cBWidth + 1 + (this.length / 2 | 0), cBWidthnH + 6);
                            vs.CWDrawPixel(this.parent.window, cBWidth - 1 + (this.length / 2 | 0), cBWidthnH + 6);
                            vs.CWDrawPixel(this.parent.window, cBWidth + (this.length / 2 | 0), cBWidthnH + 6);
                        }
                        break;
                    case 9 /* ROUNDED_TEXT_BUTTON */
                    :
                    case 10 /* SQUARE_TEXT_BUTTON */
                    :
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
                        vs.CWDrawRectangle(this.parent.window, cBWidth, cBWidthnH, this.length + 1, this.height + 1);
                        if (this.fillStyle === CWButton.LINEAR_GRADIENT) {
                            vs.CWDrawFilledRectangleWithGradient(this.parent.window, cBWidth + 1, cBWidthnH + 1, this.length - 1, this.height - 1, color1, color3);
                        } else {
                            vs.CWDrawFilledRectangle(this.parent.window, cBWidth + 1, cBWidthnH + 1, this.length - 1, this.height - 1, color1);
                        }
                        if (this.text != null) {
                            vs.setColor$intCWColor(color2);
                            const textHeightInPixels = CWSYSTEM.CWFontTools.textHeightInPixels(this.text, this.font);
                            const tHeight = this.height;
                            const lHeight = ((tHeight - textHeightInPixels) / 2 | 0);
                            CWSYSTEM.CWFontTools.renderText(null, this.text, 0, 0, this.font, color2, 9999);
                            const checked = false;
                            let width1;
                            if (this.textAlignment === CWButton.CENTERED) {
                                width1 = ((this.length - CWSYSTEM.CWFontTools.RENDERED_WIDTH) / 2 | 0);
                            } else {
                                width1 = this.textLeftMargin;
                            }
                            CWSYSTEM.CWFontTools.renderText(this.parent.window, this.text, cBWidth + width1, cBWidthnH + this.height - lHeight - 1, this.font, color2, 999);
                            if (this.secondText != null) {
                                CWSYSTEM.CWFontTools.renderText(this.parent.window, this.secondText, cBWidth + width1 + this.secondTextHorizontalOffset, cBWidthnH + this.height - lHeight - 1, this.font, color2, 999);
                            }
                            if (this.shortcutText != null) {
                                const textLengthInPixels = CWSYSTEM.CWFontTools.textLengthInPixels(this.shortcutText, this.font);
                                const combined = this.parent.borderWidth + this.x + isPressedB + this.length - textLengthInPixels - this.shortcutTextRightMargin;
                                vs.setColor$intCWColor(color2);
                                CWSYSTEM.CWFontTools.renderText(this.parent.window, this.shortcutText, combined, cBWidthnH + this.height - lHeight - 1, this.font, color2, 999);
                            }
                            if (this.type === CWButton.ROUNDED_TEXT_BUTTON) {
                                const colorArray = [[9, 9, 9, 9], [9, 9, 1, 1], [9, 1, 0, 0], [9, 1, 0, 0]];
                                for (let i = 0; i < colorArray.length; ++i) {
                                    for (let j = 0; j < colorArray[0].length; ++j) {
                                        const pickedColor = colorArray[i][j];
                                        let newColor;
                                        if (pickedColor === 9) {
                                            newColor = this.parent.windowBGColor;
                                        } else if (pickedColor === 1) {
                                            newColor = color2;
                                        } else {
                                            newColor = null;
                                        }
                                        if (newColor != null) {
                                            vs.setColor$intCWColor(newColor);
                                            vs.CWDrawPixel(this.parent.window, cBWidth + j, cBWidthnH + i);
                                            vs.CWDrawPixel(this.parent.window, cBWidth + this.length - j, cBWidthnH + i);
                                            vs.CWDrawPixel(this.parent.window, cBWidth + j, cBWidthnH + this.height - i);
                                            vs.CWDrawPixel(this.parent.window, cBWidth + this.length - j, cBWidthnH + this.height - i);
                                        }
                                    }
                                }
                            }
                        }
                }
                return true;
            } catch (e) {
                console.error("Error drawing button \'" + this.name + "\': " + e);
                return false;
            }
        }
    }

    CWButton.CLICKED = 0;
    CWButton.PRESSED = 1;
    CWButton.TEXT_BUTTON = 0;
    CWButton.ARROW_UP = 1;
    CWButton.ARROW_DOWN = 2;
    CWButton.ARROW_LEFT = 3;
    CWButton.ARROW_RIGHT = 4;
    CWButton.ZOOM_PLUS = 5;
    CWButton.ZOOM_MINUS = 6;
    CWButton.WORLD_INFO = 7;
    CWButton.OFFSET_PAD = 8;
    CWButton.ROUNDED_TEXT_BUTTON = 9;
    CWButton.SQUARE_TEXT_BUTTON = 10;
    CWButton.LEFT = 0;
    CWButton.CENTERED = 1;
    CWButton.NORMAL = 0;
    CWButton.LINEAR_GRADIENT = 1;
    CWSYSTEM.CWButton = CWButton;
    CWButton["__class"] = "CWSYSTEM.CWButton";
})(CWSYSTEM || (CWSYSTEM = {}));
