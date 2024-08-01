(function (CWSYSTEM) {
    /**
     * A class representing a text element in the game.
     *
     * @property {string} nameID - The name ID of the text element.
     * @property {string} text - The text to be displayed.
     * @property {number} x - The x-coordinate of the text element.
     * @property {number} y - The y-coordinate of the text element.
     * @property {boolean} shadow - Whether to display a shadow effect for the text.
     * @property {CWSYSTEM.CWColor} textColor - The color of the text.
     *
     * @see      [CWColor]{@link CWSYSTEM.CWColor} for more information on the CWColor class.
     *
     * @example
     * let textElement = new CWSYSTEM.CWTextElement("score", "Score: 0", 10, 10, "white");
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
    class CWTextElement {
        /**
         * Initializes a new instance of the CWTextElement class.
         *
         * @param {string} nameID - The name ID of the text element.
         * @param {string} text - The text to be displayed.
         * @param {number} x - The x-coordinate of the text element.
         * @param {number} y - The y-coordinate of the text element.
         * @param {CWSYSTEM.CWColor} textColor - The color of the text.
         */
        constructor(nameID, text, x, y, textColor) {
            this.nameID = nameID | null;
            this.text = text | null;
            this.x = x | 0;
            this.y = y | 0;
            this.textColor = textColor | null;
            this.shadow = false;
        }
    }

    CWSYSTEM.CWTextElement = CWTextElement;
    CWTextElement["__class"] = "CWSYSTEM.CWTextElement";
})(CWSYSTEM);
