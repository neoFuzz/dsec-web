/* Re-written from Java */
(function (CWSYSTEM) {
    /**
     * Represents a stored line component within a window.
     * This class encapsulates the properties and behavior of a stored line,
     * such as its coordinates, color, and drawing functionality.
     * @class
     * @memberof CWSYSTEM
     */
    class CWStoredLine {
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
         * @method
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
})(CWSYSTEM || (CWSYSTEM = {}));
