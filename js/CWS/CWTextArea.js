var CWSYSTEM;
(function (CWSYSTEM) {
    class CWTextArea {
        constructor(parent, index, name, x, y, width, numOfLines, font, text) {
            if (this.parent === undefined) {
                this.parent = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.text === undefined) {
                this.text = null;
            }
            if (this.numberOfLines === undefined) {
                this.numberOfLines = 1;
            }
            if (this.font === undefined) {
                this.font = null;
            }
            this.returnKeyCausesSubmit = false;
            this.deselectionCausesSubmit = false;
            if (this.generalPurposeObject === undefined) {
                this.generalPurposeObject = null;
            }
            this.endMark = "";
            this.passwordMode = false;
            if (this.cursorPixelPositionX === undefined) {
                this.cursorPixelPositionX = 0;
            }
            if (this.cursorPixelPositionY === undefined) {
                this.cursorPixelPositionY = 0;
            }
            if (this.objectContainingTextAreaChangedMethod === undefined) {
                this.objectContainingTextAreaChangedMethod = null;
            }
            if (this.objectContainingTextAreaSubmittedMethod === undefined) {
                this.objectContainingTextAreaSubmittedMethod = null;
            }
            if (this.index === undefined) {
                this.index = 0;
            }
            if (this.width === undefined) {
                this.width = 0;
            }
            this.border = 3;
            if (this.cursorPositionInText === undefined) {
                this.cursorPositionInText = 0;
            }
            this.parent = parent;
            this.name = name;
            this.x = x;
            this.y = y;
            this.width = width;
            this.numberOfLines = numOfLines;
            this.font = font;
            this.text = text;
            this.index = index;
            this.cursorPositionInText = 0;
        }

        static deselectTextArea() {
            CWTextArea.__textAreaSelected = null;
        }

        static selectTextArea(textArea) {
            CWTextArea.__textAreaSelected = textArea;
        }

        static textAreaSelected() {
            return CWTextArea.__textAreaSelected;
        }

        /** @private */
        fontHeight() {
            return CWSYSTEM.CWFontTools.textHeightInPixels("a", this.font);
        }

        resetText() {
            this.text = "";
            this.cursorPositionInText = 0;
            this.draw();
        }

        getText() {
            return this.text;
        }

        setText(text) {
            this.text = text;
            this.cursorPositionInText = text.length;
            this.draw();
        }

        height() {
            return this.fontHeight() * this.numberOfLines + 2 * this.border;
        }

        /** @private */
        testRender(text) {
            CWSYSTEM.CWFontTools.renderText(null, text, this.parent.borderWidth + this.x + this.border,
                this.parent.borderWidth + this.parent.__titleHeight + this.y + this.fontHeight() + this.border,
                this.parent.v.serif8_font, this.parent.titleTextColor, this.width - 2 * this.border);
        }

        select(x, y) {
            CWSYSTEM.CWFontTools.CURSOR_POSITION_X_APPROX = x;
            CWSYSTEM.CWFontTools.CURSOR_POSITION_Y_APPROX = y;
            this.testRender(this.text);
            this.cursorPositionInText = CWSYSTEM.CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS;
            this.draw();
            const textArea = CWTextArea.textAreaSelected();
            CWTextArea.selectTextArea(this);
            this.parent.updated = false;
            if (textArea != null && textArea.parent != null) {
                textArea.parent.updated = false;
            }
        }

        deselect() {
            if (this.deselectionCausesSubmit) {
                this.submit();
            }
            CWTextArea.__textAreaSelected = null;
            this.parent.updated = false;
        }

        /** @private */ informSuppliedObjectAboutNewTextAreaValue() {
            if (this.objectContainingTextAreaChangedMethod != null) {
                const classes = [("").constructor, ("").constructor];
                try {
                    const method = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingTextAreaChangedMethod.constructor, "textAreaChanged");
                    const objects = [this.name, this.text];
                    /* invoke */
                    method.fn.apply(this.objectContainingTextAreaChangedMethod, [objects]);
                } catch (e) {
                    console.error("A problem occurred in CWWindow.informSuppliedObjectAboutNewTextAreaValue()for input box \'" + this.name + "\': " + e);
                }
            }
        }

        addCharacter(character) {
            const fontCharacter = this.font.getCharacter("" + character);
            if (fontCharacter !== this.font.symbolForNotFound()) {
                const substr = this.text.substring(0, this.cursorPositionInText) + character + this.text.substring(this.cursorPositionInText);
                this.testRender(this.textWithCursorAndEndMarkAdded(substr, this.cursorPositionInText + 1));
                if (CWSYSTEM.CWFontTools.RENDERED_HEIGHT < this.height()) {
                    this.text = substr;
                    ++this.cursorPositionInText;
                    this.draw();
                }
                this.parent.updated = false;
                this.informSuppliedObjectAboutNewTextAreaValue();
            }
        }

        returnTyped() {
            if (this.numberOfLines !== 1 && !this.returnKeyCausesSubmit) {
                const str = this.text.substring(0, this.cursorPositionInText) + '\n' + this.text.substring(this.cursorPositionInText);
                this.testRender(this.textWithCursorAndEndMarkAdded(str, this.cursorPositionInText + 1));
                if (CWSYSTEM.CWFontTools.RENDERED_HEIGHT < this.height()) {
                    this.text = str;
                    ++this.cursorPositionInText;
                    this.draw();
                }
            } else {
                this.submit();
            }
            this.parent.updated = false;
            this.informSuppliedObjectAboutNewTextAreaValue();
        }

        submit() {
            CWTextArea.__textAreaSelected = null;
            const classes = [this.constructor];
            const objects = [this];
            if (this.objectContainingTextAreaSubmittedMethod != null) {
                try {
                    const method = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingTextAreaSubmittedMethod.constructor, "textAreaSubmitted");
                    /* invoke */
                    method.fn.apply(this.objectContainingTextAreaSubmittedMethod, [objects]);
                } catch (e) {
                    console.error("Failed to find supplied method in CWTextArea.submit(): " + e);
                }
            }
        }

        tabTyped() {
            if (CWSYSTEM.Environment.shiftKeyPressed) {
                this.parent.textArea[(this.index + this.parent.numberOfTextAreas - 1) % this.parent.numberOfTextAreas].select(0, 9999);
            } else {
                this.parent.textArea[(this.index + 1) % this.parent.numberOfTextAreas].select(0, 9999);
            }
            this.informSuppliedObjectAboutNewTextAreaValue();
        }

        textWithCursorAndEndMarkAdded(text, mark) {
            if (CWTextArea.textAreaSelected() === this) {
                return text === ("") ? "\\C" + this.endMark : text.substring(0, mark) + "\\C" + text.substring(mark) + this.endMark;
            } else {
                return text;
            }
        }

        cursorLeft() {
            --this.cursorPositionInText;
            if (this.cursorPositionInText === -1) {
                this.cursorPositionInText = 0;
            }
            this.parent.updated = false;
        }

        cursorRight() {
            ++this.cursorPositionInText;
            if (this.cursorPositionInText === this.text.length + 1) {
                this.cursorPositionInText = this.text.length;
            }
            this.parent.updated = false;
        }

        cursorUp() {
            this.select(this.cursorPixelPositionX, this.cursorPixelPositionY - this.fontHeight());
        }

        cursorDown() {
            this.select(this.cursorPixelPositionX, this.cursorPixelPositionY + this.fontHeight());
        }

        cursorHome() {
            this.select(this.cursorPixelPositionX - 99999, this.cursorPixelPositionY);
        }

        cursorEnd() {
            this.select(this.cursorPixelPositionX + 99999, this.cursorPixelPositionY);
        }

        cursorPageUp() {
            this.select(0, -99999);
        }

        cursorPageDown() {
            this.select(0, 99999);
        }

        deleteTyped() {
            if (this.cursorPositionInText !== this.text.length) {
                this.text = this.text.substring(0, this.cursorPositionInText) +
                    this.text.substring(this.cursorPositionInText + 1);
                this.draw();
                this.parent.updated = false;
                this.informSuppliedObjectAboutNewTextAreaValue();
            }
        }

        backSpaceTyped() {
            if (this.cursorPositionInText !== 0) {
                this.cursorLeft();
                this.deleteTyped();
            }
        }

        draw() {
            const vs = this.parent.v;
            vs.setColor$intCWColor(this.parent.titleTextColor);
            vs.CWDrawRectangle(this.parent.window, this.parent.borderWidth + this.x,
                this.parent.borderWidth + this.parent.__titleHeight + this.y, this.width, this.height());
            vs.CWDrawFilledRectangleWithGradient(this.parent.window, this.parent.borderWidth + this.x + 1,
                this.parent.borderWidth + this.parent.__titleHeight + this.y + 1, this.width - 2,
                this.height() - 2, CWSYSTEM.CWColor.white_$LI$(), CWSYSTEM.CWColor.lightGrey_$LI$());
            CWSYSTEM.CWFontTools.CURSOR_POSITION_IN_TEXT = this.cursorPositionInText;
            vs.setColor$intCWColor(this.parent.titleTextColor);
            let text1 = this.text;
            if (this.passwordMode) {
                text1 = CWSYSTEM.CWStringTools.stringRepeated("*", this.text.length);
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
})(CWSYSTEM || (CWSYSTEM = {}));
