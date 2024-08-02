(function (CWSYSTEM) {
    /**
     * Class representing a Canvas Window text area.
     * This class encapsulates the properties and behavior of a text area within a GUI Window.
     *
     * @property {boolean} returnKeyCausesSubmit - Indicates whether a return key press causes a submit.
     * @property {boolean} deselectionCausesSubmit - Indicates whether deselection causes a submit.
     * @property {Object} generalPurposeObject - A general-purpose object associated with the text area.
     * @property {string} endMark - The end mark for the text area.
     * @property {boolean} passwordMode - Indicates whether the text area is in password mode.
     * @property {number} cursorPixelPositionX - The x-coordinate of the cursor position in pixels.
     * @property {number} cursorPixelPositionY - The y-coordinate of the cursor position in pixels.
     * @property {Function} objectContainingTextAreaChangedMethod - The method to be called when the text area changes.
     * @property {Function} objectContainingTextAreaSubmittedMethod - The method to be called when the text area is submitted.
     * @property {number} border - The border size of the text area.
     * @property {number} cursorPositionInText - The position of the cursor in the text area's content.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class CWTextArea {
        /**
         * Create a text area.
         *
         * @param {CWSYSTEM.CWWindow} parent - The parent object.
         * @param {number} index - The index of the text area.
         * @param {string} name - The name of the text area.
         * @param {number} x - The x coordinate of the text area.
         * @param {number} y - The y coordinate of the text area.
         * @param {number} width - The width of the text area.
         * @param {number} numOfLines - The number of lines in the text area.
         * @param {CWSYSTEM.CWFont} font - The font used in the text area.
         * @param {string} text - The initial text of the text area.
         */
        constructor(parent = null, index = 0, name = null, x = 0, y = 0, width = 0, numOfLines = 1, font = null, text = null) {
            this.parent = parent;
            this.index = index;
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.numberOfLines = numOfLines;
            this.font = font;
            this.text = text;

            // Default values for other properties
            this.returnKeyCausesSubmit = false;
            this.deselectionCausesSubmit = false;
            this.generalPurposeObject = null;
            this.endMark = "";
            this.passwordMode = false;
            this.cursorPixelPositionX = 0;
            this.cursorPixelPositionY = 0;
            this.objectContainingTextAreaChangedMethod = null;
            this.objectContainingTextAreaSubmittedMethod = null;
            this.border = 3;
            this.cursorPositionInText = 0;
        }

        /**
         * Deselects the currently selected text area.
         */
        static deselectTextArea() {
            CWTextArea.__textAreaSelected = null;
        }

        /**
         * Selects a given text area.
         *
         * @param {CWTextArea} textArea - The text area to select.
         */
        static selectTextArea(textArea) {
            CWTextArea.__textAreaSelected = textArea;
        }

        /**
         * Gets the currently selected text area.
         *
         * @returns {CWTextArea} The currently selected text area.
         */
        static textAreaSelected() {
            return CWTextArea.__textAreaSelected;
        }

        /**
         * Gets the height of the font in pixels.
         *
         * @private
         * @returns {number} The height of the font in pixels.
         */
        fontHeight() {
            return CWSYSTEM.CWFontTools.textHeightInPixels("a", this.font);
        }

        /**
         * Resets the text in the text area.
         */
        resetText() {
            this.text = "";
            this.cursorPositionInText = 0;
            this.draw();
        }

        /**
         * Gets the text in the text area.
         *
         * @returns {string} The text in the text area.
         */
        getText() {
            return this.text;
        }

        /**
         * Sets the text in the text area.
         *
         * @param {string} text - The text to set.
         */
        setText(text) {
            this.text = text;
            this.cursorPositionInText = text.length;
            this.draw();
        }

        /**
         * Gets the height of the text area.
         *
         * @returns {number} The height of the text area.
         */
        height() {
            return this.fontHeight() * this.numberOfLines + 2 * this.border;
        }

        /**
         * Renders a test string in the text area.
         *
         * @private
         * @param {string} text - The text to render.
         * @method
         */
        testRender(text) {
            CWSYSTEM.CWFontTools.renderText(null, text, this.parent.borderWidth + this.x + this.border,
                this.parent.borderWidth + this.parent.__titleHeight + this.y + this.fontHeight() + this.border,
                this.parent.v.serif8_font, this.parent.titleTextColor, this.width - 2 * this.border);
        }

        /**
         * Selects the text area at a given position.
         *
         * @param {number} x - The x coordinate.
         * @param {number} y - The y coordinate.
         */
        select(x, y) {
            CWSYSTEM.CWFontTools.CURSOR_POSITION_X_APPROX = x;
            CWSYSTEM.CWFontTools.CURSOR_POSITION_Y_APPROX = y;
            this.testRender(this.text);
            // Correctly set the cursor position for Unicode text
            const approxPos = CWSYSTEM.CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS;
            this.cursorPositionInText = Array.from(this.text).slice(0, approxPos).length;
            this.draw();
            const textArea = CWTextArea.textAreaSelected();
            CWTextArea.selectTextArea(this);
            this.parent.updated = false;
            if (textArea?.parent) {
                textArea.parent.updated = false;
            }
        }

        /**
         * Deselects the text area.
         */
        deselect() {
            if (this.deselectionCausesSubmit) {
                this.submit();
            }
            CWTextArea.__textAreaSelected = null;
            this.parent.updated = false;
        }

        /**
         * Informs the supplied object about the new value of the text area.
         *
         * @private
         */
        informSuppliedObjectAboutNewTextAreaValue() {
            if (this.objectContainingTextAreaChangedMethod != null) {
                try {
                    const method = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingTextAreaChangedMethod.constructor, "textAreaChanged");
                    const objects = [this.name, this.text];
                    method.fn.apply(this.objectContainingTextAreaChangedMethod, [objects]);
                } catch (e) {
                    console.error("A problem occurred in CWWindow.informSuppliedObjectAboutNewTextAreaValue() " +
                        "for input box '" + this.name + "': " + e);
                }
            }
        }

        /**
         * Adds a character to the text area.
         *
         * @param {string} character - The character to add.
         */
        addCharacter(character) {
            const codePoint = character.codePointAt(0);
            const charStr = String.fromCodePoint(codePoint);
            const fontCharacter = this.font.getCharacter(charStr);
            if (fontCharacter !== this.font.symbolForNotFound()) {
                const beforeCursor = this.text.slice(0, this.cursorPositionInText);
                const afterCursor = this.text.slice(this.cursorPositionInText);
                const newText = beforeCursor + charStr + afterCursor;
                this.testRender(this.textWithCursorAndEndMarkAdded(newText,
                    this.cursorPositionInText + Array.from(charStr).length));
                if (CWSYSTEM.CWFontTools.RENDERED_HEIGHT < this.height()) {
                    this.text = newText;
                    this.cursorPositionInText += Array.from(charStr).length; // Adjust cursor position correctly
                    this.draw();
                }
                this.parent.updated = false;
                this.informSuppliedObjectAboutNewTextAreaValue();
            }
        }

        /**
         * Handles the return key being typed.
         */
        returnTyped() {
            if (this.numberOfLines !== 1 && !this.returnKeyCausesSubmit) {
                const beforeCursor = this.text.slice(0, this.cursorPositionInText);
                const afterCursor = this.text.slice(this.cursorPositionInText);
                const newText = beforeCursor + '\n' + afterCursor;
                this.testRender(this.textWithCursorAndEndMarkAdded(newText, this.cursorPositionInText + 1));
                if (CWSYSTEM.CWFontTools.RENDERED_HEIGHT < this.height()) {
                    this.text = newText;
                    this.cursorPositionInText += 1; // Adjust cursor position correctly
                    this.draw();
                }
            } else {
                this.submit();
            }
            this.parent.updated = false;
            this.informSuppliedObjectAboutNewTextAreaValue();
        }

        /**
         * Submits the text area.
         */
        submit() {
            CWTextArea.__textAreaSelected = null;
            const objects = [this];
            if (this.objectContainingTextAreaSubmittedMethod != null) {
                try {
                    const method = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingTextAreaSubmittedMethod.constructor, "textAreaSubmitted");
                    method.fn.apply(this.objectContainingTextAreaSubmittedMethod, [objects]);
                } catch (e) {
                    console.error("Failed to find supplied method in CWTextArea.submit(): " + e);
                }
            }
        }

        /**
         * Handles the tab key being typed.
         */
        tabTyped() {
            if (CWSYSTEM.Environment.shiftKeyPressed) {
                this.parent.textArea[(this.index + this.parent.numberOfTextAreas - 1) %
                this.parent.numberOfTextAreas].select(0, 9999);
            } else {
                this.parent.textArea[(this.index + 1) % this.parent.numberOfTextAreas].select(0, 9999);
            }
            this.informSuppliedObjectAboutNewTextAreaValue();
        }

        /**
         * Adds the cursor and end mark to the text.
         *
         * @param {string} text - The text to add the cursor and end mark to.
         * @param {number} mark - The position of the mark.
         * @returns {string} The text with the cursor and end mark added.
         */
        textWithCursorAndEndMarkAdded(text, mark) {
            if (CWTextArea.textAreaSelected() === this) {
                return text === ("") ? "\\C" + this.endMark : Array.from(text).slice(0, mark).join('') +
                    "\\C" + Array.from(text).slice(mark).join('') + this.endMark;
            } else {
                return text;
            }
        }

        /**
         * Moves the cursor left.
         */
        cursorLeft() {
            if (this.cursorPositionInText > 0) {
                const codePointSize = Array.from(this.text.slice(0, this.cursorPositionInText)).pop().length;
                this.cursorPositionInText -= codePointSize;
            }
            if (this.cursorPositionInText < 0) {
                this.cursorPositionInText = 0;
            }
            this.parent.updated = false;
        }

        /**
         * Moves the cursor right.
         */
        cursorRight() {
            if (this.cursorPositionInText < this.text.length) {
                const codePointSize = Array.from(this.text.slice(this.cursorPositionInText)).shift().length;
                this.cursorPositionInText += codePointSize;
            }
            if (this.cursorPositionInText > this.text.length) {
                this.cursorPositionInText = this.text.length;
            }
            this.parent.updated = false;
        }

        /**
         * Moves the cursor up.
         */
        cursorUp() {
            this.select(this.cursorPixelPositionX, this.cursorPixelPositionY - this.fontHeight());
        }

        /**
         * Moves the cursor down.
         */
        cursorDown() {
            this.select(this.cursorPixelPositionX, this.cursorPixelPositionY + this.fontHeight());
        }

        /**
         * Moves the cursor to the start of the line.
         */
        cursorHome() {
            this.select(this.cursorPixelPositionX - 99999, this.cursorPixelPositionY);
        }

        /**
         * Moves the cursor to the end of the line.
         */
        cursorEnd() {
            this.select(this.cursorPixelPositionX + 99999, this.cursorPixelPositionY);
        }

        /**
         * Moves the cursor up by one page.
         */
        cursorPageUp() {
            this.select(0, -99999);
        }

        /**
         * Moves the cursor down by one page.
         */
        cursorPageDown() {
            this.select(0, 99999);
        }

        /**
         * Deletes the character at the cursor position.
         */
        deleteTyped() {
            if (this.cursorPositionInText !== this.text.length) {
                const codePointSize = Array.from(this.text.slice(
                    this.cursorPositionInText, this.cursorPositionInText + 1)).length;
                const beforeCursor = this.text.slice(0, this.cursorPositionInText);
                const afterCursor = this.text.slice(this.cursorPositionInText + codePointSize);
                this.text = beforeCursor + afterCursor;
                this.draw();
                this.parent.updated = false;
                this.informSuppliedObjectAboutNewTextAreaValue();
            }
        }

        /**
         * Deletes the character before the cursor position.
         */
        backSpaceTyped() {
            if (this.cursorPositionInText !== 0) {
                this.cursorLeft();
                this.deleteTyped();
            }
        }

        /**
         * Draws the text area.
         */
        draw() {
            const vs = this.parent.v;
            vs.setColor$intCWColor(this.parent.titleTextColor);
            vs.CWDrawRectangle(this.parent.window, this.parent.borderWidth + this.x,
                this.parent.borderWidth + this.parent.__titleHeight + this.y, this.width, this.height());
            vs.CWDrawFilledRectangleWithGradient(this.parent.window, this.parent.borderWidth + this.x + 1,
                this.parent.borderWidth + this.parent.__titleHeight + this.y + 1, this.width - 2,
                this.height() - 2, CWSYSTEM.CWColor.__white(), CWSYSTEM.CWColor.__lightGrey());
            CWSYSTEM.CWFontTools.CURSOR_POSITION_IN_TEXT = this.cursorPositionInText;
            vs.setColor$intCWColor(this.parent.titleTextColor);
            let text1 = this.text;
            if (this.passwordMode) {
                text1 = CWSYSTEM.CWStringTools.stringRepeated("*", Array.from(this.text).length);
            }
            const endMark = this.textWithCursorAndEndMarkAdded(text1, this.cursorPositionInText);
            CWSYSTEM.CWFontTools.renderText(this.parent.window, endMark,
                this.parent.borderWidth + this.x + this.border,
                this.parent.borderWidth + this.parent.__titleHeight + this.y + this.fontHeight() + this.border - 1,
                vs.serif8_font, this.parent.titleTextColor, this.width - 2 * this.border);
            this.cursorPixelPositionX = CWSYSTEM.CWFontTools.LAST_CURSOR_X;
            this.cursorPixelPositionY = CWSYSTEM.CWFontTools.LAST_CURSOR_Y;
        }
    }

    CWTextArea.__textAreaSelected = null;
    CWSYSTEM.CWTextArea = CWTextArea;
    CWTextArea["__class"] = "CWSYSTEM.CWTextArea";
})(CWSYSTEM);
