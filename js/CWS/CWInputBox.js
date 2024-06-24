/* re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWInputBox {
        constructor(parent, name, x, y, length, text) {
            this.parentWindow = parent instanceof CWSYSTEM.CWWindow ? parent : null;
            this.name = typeof name === 'string' ? name : null;
            this.x = typeof x === 'number' ? x : 0;
            this.y = typeof y === 'number' ? y : 0;
            this.length = typeof length === 'number' ? length : 0;
            this.height = 7 + CWInputBox.inputBoxTextBorder * 2 + 1;
            this.text = typeof text === 'string' ? text : '';

            this.borderColor = new CWSYSTEM.CWColor(CWInputBox.defaultBorderColor_$LI$());
            this.bgColor = new CWSYSTEM.CWColor(CWInputBox.defaultBGColor_$LI$());
            this.textColor = new CWSYSTEM.CWColor(CWInputBox.defaultTextColor_$LI$());
            this.blinkState = false;

            this.objectContainingInputBoxChangedMethod = null;
            this.objectContainingInputBoxReturnTypedMethod = null;
            this.generalPurposeObject = null;
        }

        static defaultBorderColor_$LI$() {
            if (CWInputBox.defaultBorderColor == null) {
                CWInputBox.defaultBorderColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            }
            return CWInputBox.defaultBorderColor;
        }

        static defaultBGColor_$LI$() {
            if (CWInputBox.defaultBGColor == null) {
                CWInputBox.defaultBGColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWInputBox.defaultBGColor;
        }

        static defaultTextColor_$LI$() {
            if (CWInputBox.defaultTextColor == null) {
                CWInputBox.defaultTextColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
            }
            return CWInputBox.defaultTextColor;
        }

        returnTyped() {
            this.informSuppliedObjectInputBoxSubmitted();
        }

        addCharacter(character) {
            if (CWSYSTEM.CWSReference.virtualScreen.small_font.characterExists(character)) {
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
                    const rtMethod = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingInputBoxChangedMethod.constructor, "inputBoxChanged");
                    const objects = [this];
                    rtMethod.fn.apply(this.objectContainingInputBoxChangedMethod, [objects]);
                } catch (ex) {
                    console.error("A problem occurred in CWWindow.informSuppliedObjectAboutNewInputBoxValue() " +
                        "for input box \'" + this.name + "\': " + ex);
                }
            }
        }

        /** @private */ informSuppliedObjectInputBoxSubmitted() {
            if (this.objectContainingInputBoxReturnTypedMethod != null) {
                const classes = [this.constructor];
                try {
                    const declaredMethod = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) &&
                            typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingInputBoxReturnTypedMethod.constructor, "inputBoxReturnTyped");
                    const objects = [this];
                    declaredMethod.fn.apply(this.objectContainingInputBoxReturnTypedMethod, [objects]);
                } catch (ex) {
                    console.error("A problem occurred in CWWindow.informSuppliedObjectInputBoxSubmitted() for" +
                        " input box \'" + this.name + "\': " + ex);
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
            } else {
                const currentTime = CWSYSTEM.Environment.currentTime();
                if ((n => n < 0 ? Math.ceil(n) :
                    Math.floor(n))(currentTime / 666) % 2 === 1 !== this.blinkState) {
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
