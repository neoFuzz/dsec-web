/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    /**
     * Class representing an image element.
     * @memberof CWSYSTEM
     */
    class CWImageElement {
        /**
         * Create a CWImageElement.
         * @param {string} nameID - The ID of the image element.
         * @param {string} fileName - The file name of the image element.
         * @param {number} x - The x-coordinate of the image element.
         * @param {number} y - The y-coordinate of the image element.
         */
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
