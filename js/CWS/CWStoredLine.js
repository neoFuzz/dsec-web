/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWStoredLine {
        constructor(parent, x0, y0, x1, y1, red, green, blue, alpha) {
            if (this.parentWindow === undefined) {
                this.parentWindow = null;
            }
            if (this.x0 === undefined) {
                this.x0 = 0;
            }
            if (this.y0 === undefined) {
                this.y0 = 0;
            }
            if (this.x1 === undefined) {
                this.x1 = 0;
            }
            if (this.y1 === undefined) {
                this.y1 = 0;
            }
            if (this.color === undefined) {
                this.color = null;
            }
            this.parentWindow = parent;
            this.x0 = x0;
            this.y0 = y0;
            this.x1 = x1;
            this.y1 = y1;
            this.color = new CWSYSTEM.CWColor(red, green, blue, alpha);
        }

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
