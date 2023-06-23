/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWTextElement {
        constructor(nameID, text, x, y, textColor) {
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            if (this.text === undefined) {
                this.text = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.shadow === undefined) {
                this.shadow = false;
            }
            if (this.textColor === undefined) {
                this.textColor = null;
            }
            this.nameID = nameID;
            this.text = text;
            this.x = x;
            this.y = y;
            this.textColor = textColor;
            this.shadow = false;
        }
    }
    CWSYSTEM.CWTextElement = CWTextElement;
    CWTextElement["__class"] = "CWSYSTEM.CWTextElement";
})(CWSYSTEM || (CWSYSTEM = {}));
