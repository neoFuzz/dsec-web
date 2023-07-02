/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    /**
     * Represents a DSecSpecialEffect.
     * @class
     */
    class DSecSpecialEffect {
        /**
         * Creates an instance of DSecSpecialEffect.
         * @param {Object} image - The image object.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {number} brightness - The brightness level.
         */
        constructor(image, x, y, brightness) {
            /**
             * The type of the DSecSpecialEffect.
             * @type {number}
             */
            this.type = 0;
            if (this.image === undefined) {
                /**
                 * The image associated with the DSecSpecialEffect.
                 * @type {Object}
                 */
                this.image = null;
            }
            if (this.x === undefined) {
                /**
                 * The x-coordinate of the DSecSpecialEffect.
                 * @type {number}
                 */
                this.x = 0;
            }
            if (this.y === undefined) {
                /**
                 * The y-coordinate of the DSecSpecialEffect.
                 * @type {number}
                 */
                this.y = 0;
            }
            if (this.brightness === undefined) {
                /**
                 * The brightness level of the DSecSpecialEffect.
                 * @type {number}
                 */
                this.brightness = 0;
            }
            this.image = image;
            this.x = x;
            this.y = y;
            this.brightness = brightness;
        }
    }
    DSecSpecialEffect.IMAGE_COMPOSITE = 0;
    dsector.DSecSpecialEffect = DSecSpecialEffect;
    DSecSpecialEffect["__class"] = "dsector.DSecSpecialEffect";
})(dsector || (dsector = {}));
