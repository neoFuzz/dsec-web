(function (CWSYSTEM) {
    /**
     * Represents a text block in a window.
     *
     * @property {CWSYSTEM.CWWindow} parent The parent window for the text block.
     * @property {string} nameID The unique identifier for the text block.
     * @property {string} text The text to be displayed in the text block.
     * @property {number} leftMargin The left margin for the text block.
     * @property {number} baseLine The baseline for the text block.
     * @property {CWSYSTEM.CWFont} font The font for the text block.
     * @property {CWSYSTEM.CWColor} color The color for the text block.
     * @property {number} width The width for the text block.
     * @property {boolean} bold Whether the text should be bold or not.
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
    class CWTextBlock {
        /**
         * Initializes a new instance of the CWTextBlock class.
         *
         * @param {CWSYSTEM.CWWindow} parent The parent window for the text block.
         * @param {string} nameID The unique identifier for the text block.
         * @param {string} text The text to be displayed in the text block.
         * @param {number} leftMargin The left margin for the text block.
         * @param {number} baseLine The baseline for the text block.
         * @param {CWSYSTEM.CWFont} font The font for the text block.
         * @param {CWSYSTEM.CWColor} color The color for the text block.
         * @param {number} width The width for the text block.
         */
        constructor(parent, nameID, text, leftMargin = 0,
                    baseLine = 0, font, color, width = 0) {
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

        /**
         * Draws the text block on the provided window.
         * @method
         */
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
})(CWSYSTEM);
