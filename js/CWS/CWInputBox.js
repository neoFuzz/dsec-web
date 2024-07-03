/* re-written from Java */
(function (CWSYSTEM) {
    /**
     * Represents an input box within the application, allowing for text input and interaction.
     * This class manages the creation, display, and functionality of an input box, including text entry and deletion.
     * @class
     * @memberof CWSYSTEM
     */
    class CWInputBox {
        /**
         * Constructs a new CWInputBox instance.
         * @param {CWSYSTEM.CWWindow} parent - The parent window to which this input box belongs.
         * @param {string} name - The name of the input box.
         * @param {number} x - The x-coordinate of the input box within the parent window.
         * @param {number} y - The y-coordinate of the input box within the parent window.
         * @param {number} length - The length of the input box.
         * @param {string} text - The initial text to display in the input box.
         */
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

        /**
         * Returns the default border color for the input box.
         * @static
         * @returns {CWSYSTEM.CWColor} The default border color.
         */
        static defaultBorderColor_$LI$() {
            if (CWInputBox.defaultBorderColor == null) {
                CWInputBox.defaultBorderColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            }
            return CWInputBox.defaultBorderColor;
        }

        /**
         * Returns the default background color for the input box.
         * @static
         * @returns {CWSYSTEM.CWColor} The default background color. */
        static defaultBGColor_$LI$() {
            if (CWInputBox.defaultBGColor == null) {
                CWInputBox.defaultBGColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWInputBox.defaultBGColor;
        }

        /**
         * Returns the default text color for the input box.
         * @static
         * @returns {CWSYSTEM.CWColor} The default text color.
         */
        static defaultTextColor_$LI$() {
            if (CWInputBox.defaultTextColor == null) {
                CWInputBox.defaultTextColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
            }
            return CWInputBox.defaultTextColor;
        }

        returnTyped() {
            this.informSuppliedObjectInputBoxSubmitted();
        }

        /**
         * Adds a character to the input box's text.
         * This method checks if the character exists in the font and if adding it does not exceed the input box's length.
         * @param {string} char - The character to add to the input box's text.
         */
        addCharacter(char) {
            if (this.parentWindow.v.jcsmallfixed_font.characterExists(char)) {
                if ((this.text.length + 2) * 6 <= this.length - 4) {
                    const charString = "" + character;
                    this.text = this.text.concat(charString);
                    this.parentWindow.updated = false;
                    this.informSuppliedObjectAboutNewInputBoxValue();
                }
            }
        }

        /**
         * Deletes the last character from the input box's text.
         * This method is called to handle backspace functionality.
         */
        deleteCharacter() {
            if (this.text.length !== 0) {
                this.text = this.text.substring(0, this.text.length - 1);
                this.parentWindow.updated = false;
                this.informSuppliedObjectAboutNewInputBoxValue();
            }
        }

        /**
         * Notifies the associated object about the new value of the input box.
         * This method is invoked whenever the text in the input box changes, either through adding or deleting characters.
         * It serves to inform any listening objects that the input box's value has been updated.
         * @private
         */ informSuppliedObjectAboutNewInputBoxValue() {
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

        /**
         * Informs the associated object that the input box submission has been triggered.
         * This method is typically called when the user submits the input (e.g., by pressing Enter).
         * @private */ informSuppliedObjectInputBoxSubmitted() {
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

        /**
         * Manages the cursor's blink state within the input box.
         * This method checks if the input box is selected and updates the cursor's blink state based on the current time.
         * It should be called periodically to ensure the cursor's visibility is updated appropriately.
         * @private
         */
        checkCursor() {
            if (CWSYSTEM.Environment.inputBoxSelected$() !== this) {
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

    /**
     * The default border thickness for the input box.
     * @type {number}
     */
    CWInputBox.inputBoxTextBorder = 2;
    CWSYSTEM.CWInputBox = CWInputBox;
    CWInputBox["__class"] = "CWSYSTEM.CWInputBox";
})(CWSYSTEM || (CWSYSTEM = {}));
