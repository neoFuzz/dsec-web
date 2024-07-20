(function (CWSYSTEM) {
    /**
     * Class representing an image element.
     *
     * @property {string} nameID - The ID of the image element.
     * @property {string} filename - The file name of the image element.
     * @property {number} x - The x-coordinate of the image element.
     * @property {number} y - The y-coordinate of the image element.
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
    class CWImageElement {
        /**
         * Create a CWImageElement.
         *
         * @param {string} nameID - The ID of the image element.
         * @param {string} fileName - The file name of the image element.
         * @param {number} x - The x-coordinate of the image element.
         * @param {number} y - The y-coordinate of the image element.
         */
        constructor(nameID, fileName, x, y) {
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            this.nameID = nameID;
            this.filename = fileName || null;
            this.x = x || 0;
            this.y = y || 0;
        }
    }

    CWSYSTEM.CWImageElement = CWImageElement;
    CWImageElement["__class"] = "CWSYSTEM.CWImageElement";
})(CWSYSTEM || (CWSYSTEM = {}));