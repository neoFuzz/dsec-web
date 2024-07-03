/**/
(function (CWSYSTEM) {
    /**
     * @class
     * @memberof CWSYSTEM
     */
    class CWTextBlock {
        constructor(parent, nameID, text, leftMargin, baseLine, font, color, width) {
            if (this.parent === undefined) {
                this.parent = null;
            }
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            if (this.text === undefined) {
                this.text = null;
            }
            if (this.leftMargin === undefined) {
                this.leftMargin = 0;
            }
            if (this.baseLine === undefined) {
                this.baseLine = 0;
            }
            if (this.font === undefined) {
                this.font = null;
            }
            if (this.color === undefined) {
                this.color = null;
            }
            if (this.width === undefined) {
                this.width = 0;
            }
            if (this.bold === undefined) {
                this.bold = false;
            }
            this.parent = parent;
            this.nameID = nameID;
            this.text = text;
            this.leftMargin = leftMargin;
            this.baseLine = baseLine;
            this.font = font;
            this.color = color;
            this.width = width;
            this.bold = false;
        }

        draw() {
            if (this.bold) {
                CWSYSTEM.CWFontTools.BOLD = true;
            }
            CWSYSTEM.CWFontTools.renderText(this.parent.window, this.text, this.leftMargin, this.baseLine,
                this.font, this.color, this.width);
            CWSYSTEM.CWFontTools.BOLD = false;
        }
    }

    CWSYSTEM.CWTextBlock = CWTextBlock;
    CWTextBlock["__class"] = "CWSYSTEM.CWTextBlock";
})(CWSYSTEM || (CWSYSTEM = {}));
