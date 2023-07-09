/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWImageElement {
        constructor(nameID, fileName, x, y) {
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            if (this.filename === undefined) {
                this.filename = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            this.nameID = nameID;
            this.filename = fileName;
            this.x = x;
            this.y = y;
        }
    }

    CWSYSTEM.CWImageElement = CWImageElement;
    CWImageElement["__class"] = "CWSYSTEM.CWImageElement";
})(CWSYSTEM || (CWSYSTEM = {}));
