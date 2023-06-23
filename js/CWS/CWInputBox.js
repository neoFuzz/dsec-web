/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWInputBox {
        constructor(parent, name, x, y, length, text) {
            if (((parent != null && parent instanceof CWSYSTEM.CWWindow) || parent === null) &&
                ((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof length === 'number') || length === null) &&
                ((typeof text === 'string') || text === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    {
                        let __args = arguments;
                        if (this.parentWindow === undefined) {
                            this.parentWindow = null;
                        }
                        if (this.name === undefined) {
                            this.name = null;
                        }
                        if (this.text === undefined) {
                            this.text = null;
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
                        if (this.textColor === undefined) {
                            this.textColor = null;
                        }
                        if (this.blinkState === undefined) {
                            this.blinkState = false;
                        }
                        if (this.objectContainingInputBoxChangedMethod === undefined) {
                            this.objectContainingInputBoxChangedMethod = null;
                        }
                        if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                            this.objectContainingInputBoxReturnTypedMethod = null;
                        }
                        if (this.generalPurposeObject === undefined) {
                            this.generalPurposeObject = null;
                        }
                        this.borderColor = new CWSYSTEM.CWColor(CWInputBox.defaultBorderColor_$LI$());
                        this.bgColor = new CWSYSTEM.CWColor(CWInputBox.defaultBGColor_$LI$());
                        this.textColor = new CWSYSTEM.CWColor(CWInputBox.defaultTextColor_$LI$());
                        this.blinkState = false;
                    }
                    if (this.parentWindow === undefined) {
                        this.parentWindow = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.text === undefined) {
                        this.text = null;
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
                    if (this.textColor === undefined) {
                        this.textColor = null;
                    }
                    if (this.blinkState === undefined) {
                        this.blinkState = false;
                    }
                    if (this.objectContainingInputBoxChangedMethod === undefined) {
                        this.objectContainingInputBoxChangedMethod = null;
                    }
                    if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                        this.objectContainingInputBoxReturnTypedMethod = null;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    (() => {
                        this.parentWindow = parent;
                        this.name = name;
                        this.x = x;
                        this.y = y;
                        this.length = length;
                        this.height = 7 + CWInputBox.inputBoxTextBorder * 2 + 1;
                        this.text = "";
                    })();
                }
                if (this.parentWindow === undefined) {
                    this.parentWindow = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
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
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.blinkState === undefined) {
                    this.blinkState = false;
                }
                if (this.objectContainingInputBoxChangedMethod === undefined) {
                    this.objectContainingInputBoxChangedMethod = null;
                }
                if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                    this.objectContainingInputBoxReturnTypedMethod = null;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                (() => {
                    this.text = text;
                })();
            }
            else if (((parent != null && parent instanceof CWSYSTEM.CWWindow) || parent === null) &&
                ((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof length === 'number') || length === null) &&
                text === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    if (this.parentWindow === undefined) {
                        this.parentWindow = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.text === undefined) {
                        this.text = null;
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
                    if (this.textColor === undefined) {
                        this.textColor = null;
                    }
                    if (this.blinkState === undefined) {
                        this.blinkState = false;
                    }
                    if (this.objectContainingInputBoxChangedMethod === undefined) {
                        this.objectContainingInputBoxChangedMethod = null;
                    }
                    if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                        this.objectContainingInputBoxReturnTypedMethod = null;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    this.borderColor = new CWSYSTEM.CWColor(CWInputBox.defaultBorderColor_$LI$());
                    this.bgColor = new CWSYSTEM.CWColor(CWInputBox.defaultBGColor_$LI$());
                    this.textColor = new CWSYSTEM.CWColor(CWInputBox.defaultTextColor_$LI$());
                    this.blinkState = false;
                }
                if (this.parentWindow === undefined) {
                    this.parentWindow = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
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
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.blinkState === undefined) {
                    this.blinkState = false;
                }
                if (this.objectContainingInputBoxChangedMethod === undefined) {
                    this.objectContainingInputBoxChangedMethod = null;
                }
                if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                    this.objectContainingInputBoxReturnTypedMethod = null;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                (() => {
                    this.parentWindow = parent;
                    this.name = name;
                    this.x = x;
                    this.y = y;
                    this.length = length;
                    this.height = 7 + CWInputBox.inputBoxTextBorder * 2 + 1;
                    this.text = "";
                })();
            }
            else if (parent === undefined && name === undefined && x === undefined && y === undefined &&
                length === undefined && text === undefined) {
                let __args = arguments;
                if (this.parentWindow === undefined) {
                    this.parentWindow = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.text === undefined) {
                    this.text = null;
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
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                if (this.blinkState === undefined) {
                    this.blinkState = false;
                }
                if (this.objectContainingInputBoxChangedMethod === undefined) {
                    this.objectContainingInputBoxChangedMethod = null;
                }
                if (this.objectContainingInputBoxReturnTypedMethod === undefined) {
                    this.objectContainingInputBoxReturnTypedMethod = null;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                this.borderColor = new CWSYSTEM.CWColor(CWInputBox.defaultBorderColor_$LI$());
                this.bgColor = new CWSYSTEM.CWColor(CWInputBox.defaultBGColor_$LI$());
                this.textColor = new CWSYSTEM.CWColor(CWInputBox.defaultTextColor_$LI$());
                this.blinkState = false;
            }
            else
                throw new Error('invalid overload');
        }
        static defaultBorderColor_$LI$() { if (CWInputBox.defaultBorderColor == null) {
            CWInputBox.defaultBorderColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
        } return CWInputBox.defaultBorderColor; }
        static defaultBGColor_$LI$() { if (CWInputBox.defaultBGColor == null) {
            CWInputBox.defaultBGColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
        } return CWInputBox.defaultBGColor; }
        static defaultTextColor_$LI$() { if (CWInputBox.defaultTextColor == null) {
            CWInputBox.defaultTextColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
        } return CWInputBox.defaultTextColor; }
        returnTyped() {
            this.informSuppliedObjectInputBoxSubmitted();
        }
        addCharacter(character) {
            if (CWSYSTEM.CWFont_SmallFont.characterExists(character)) {
                if ((this.text.length + 2) * 6 <= this.length - 4) {
                    const charString = "" + character;
                    this.text = this.text.concat(charString);
                    this.parentWindow.updated = false;
                    this.informSuppliedObjectAboutNewInputBoxValue();
                }
            }
        }
        deleteCharacter() {
            if (this.text.length !== 0) {
                this.text = this.text.substring(0, this.text.length - 1);
                this.parentWindow.updated = false;
                this.informSuppliedObjectAboutNewInputBoxValue();
            }
        }
        /** @private */ informSuppliedObjectAboutNewInputBoxValue() {
            if (this.objectContainingInputBoxChangedMethod != null) {
                const classes = [this.constructor];
                try {
                    const rtMethod = ((c, p) => { if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                        return { owner: c, name: p, fn: c.prototype[p] };
                    else
                        return null; })(this.objectContainingInputBoxChangedMethod.constructor, "inputBoxChanged");
                    const objects = [this];
                    /* invoke */ rtMethod.fn.apply(this.objectContainingInputBoxChangedMethod, [objects]);
                }
                catch (ex) {
                    console.error("A problem occured in CWWindow.informSuppliedObjectAboutNewInputBoxValue()for input box \'" + this.name + "\': " + ex);
                }
            }
        }
        /** @private */ informSuppliedObjectInputBoxSubmitted() {
            if (this.objectContainingInputBoxReturnTypedMethod != null) {
                const classes = [this.constructor];
                try {
                    const declaredMethod = ((c, p) => { if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                        return { owner: c, name: p, fn: c.prototype[p] };
                    else
                        return null; })(this.objectContainingInputBoxReturnTypedMethod.constructor, "inputBoxReturnTyped");
                    const objects = [this];
                    /* invoke */ declaredMethod.fn.apply(this.objectContainingInputBoxReturnTypedMethod, [objects]);
                }
                catch (ex) {
                    console.error("A problem occured in CWWindow.informSuppliedObjectInputBoxSubmitted()for input box \'" + this.name + "\': " + ex);
                }
            }
        }
        checkCursor() {
            if (CWSYSTEM.Environment.inputBoxSelected_$LI$() !== this) {
                if (this.blinkState) {
                    this.blinkState = false;
                    this.parentWindow.updated = false;
                    CWSYSTEM.Environment.screenHasChanged = true;
                }
            }
            else {
                const currentTime = CWSYSTEM.Environment.currentTime();
                if ((n => n < 0 ? Math.ceil(n) : Math.floor(n))(currentTime / 666) % 2 === 1 !== this.blinkState) {
                    this.blinkState = !this.blinkState;
                    this.parentWindow.updated = false;
                    CWSYSTEM.Environment.screenHasChanged = true;
                }
            }
        }
    }
    CWInputBox.inputBoxTextBorder = 2;
    CWSYSTEM.CWInputBox = CWInputBox;
    CWInputBox["__class"] = "CWSYSTEM.CWInputBox";
})(CWSYSTEM || (CWSYSTEM = {}));
