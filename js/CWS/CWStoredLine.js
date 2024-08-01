(function (CWSYSTEM) {
    /**
     * Represents a stored line component within a window.
     * This class encapsulates the properties and behavior of a stored line,
     * such as its coordinates, color, and drawing functionality.
     *
     * @property {CWSYSTEM.CWWindow} parentWindow - The window object this stored line is associated with.
     * @property {number} x0 - The x-coordinate of the starting point of the line.
     * @property {number} y0 - The y-coordinate of the starting point of the line.
     * @property {number} x1 - The x-coordinate of the ending point of the line.
     * @property {number} y1 - The y-coordinate of the ending point of the line.
     * @property {CWSYSTEM.CWColor} color - The color of the stored line.
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
    class CWStoredLine {
        /**
         * Constructs a new CWStoredLine instance.
         *
         * @param parent {CWSYSTEM.CWWindow} - The parent window to which this stored line belongs.
         * @param {number} x0 - The x-coordinate of the starting point of the line.
         * @param {number} y0 - The y-coordinate of the starting point of the line.
         * @param {number} x1 - The x-coordinate of the ending point of the line.
         * @param {number} y1 - The y-coordinate of the ending point of the line.
         * @param {number} red - The red component of the line color.
         * @param {number} green - The green component of the line color.
         * @param {number} blue - The blue component of the line color.
         * @param {number} alpha - The alpha (transparency) component of the line color.
         */
        constructor(parent, x0, y0, x1, y1, red, green, blue, alpha) {
            this.parentWindow = parent || null;
            this.x0 = x0 || 0;
            this.y0 = y0 || 0;
            this.x1 = x1 || 0;
            this.y1 = y1 || 0;
            this.color = new CWSYSTEM.CWColor(red, green, blue, alpha);
        }

        /**
         * Draws the stored line on the provided window.
         */
        draw() {
            const vs = this.parentWindow.v;
            vs.setColor$intCWColor(this.color);
            vs.CWLine(this.parentWindow.window, this.x0 + this.parentWindow.borderWidth,
                this.y0 + this.parentWindow.borderWidth + this.parentWindow.__titleHeight,
                this.x1 + this.parentWindow.borderWidth, this.y1 + this.parentWindow.borderWidth +
                this.parentWindow.__titleHeight, true);
        }
    }

    CWSYSTEM.CWStoredLine = CWStoredLine;
    CWStoredLine["__class"] = "CWSYSTEM.CWStoredLine";
})(CWSYSTEM);