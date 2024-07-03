/**/
(function (dsector) {
    /**
     * Class representing a screen position.
     * @class
     * @memberof dsector
     */
    class ScreenPosition {
        /**
         * Creates an instance of ScreenPosition.
         * @param {number} [x=0] - The x-coordinate.
         * @param {number} [y=0] - The y-coordinate.
         */
        constructor(x = 0, y = 0) {
            /** @type {number} */
            this.x = x;
            /** @type {number} */
            this.y = y;
        }

        /**
         * Sets the position.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        /**
         * Gets the x-coordinate.
         * @returns {number} The x-coordinate.
         */
        getX() {
            return this.x;
        }

        /**
         * Gets the y-coordinate.
         * @returns {number} The y-coordinate.
         */
        getY() {
            return this.y;
        }
    }

    dsector.ScreenPosition = ScreenPosition;
    ScreenPosition["__class"] = "dsector.ScreenPosition";
})(dsector || (dsector = {}));