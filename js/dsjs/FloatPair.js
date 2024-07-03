/**/
(function (dsector) {
    /**
     * Represents a pair of float values.
     * @class
     * @memberof dsector
     */
    class FloatPair {
        /**
         * Creates a new FloatPair instance.
         * @param {number} [f1=0] - The first float value.
         * @param {number} [f2=0] - The second float value.
         */
        constructor(f1 = 0, f2 = 0) {
            this.f1 = f1;
            this.f2 = f2;
        }

        /**
         * Sets new values for the FloatPair.
         * @param {number} f1 - The new value for the first float.
         * @param {number} f2 - The new value for the second float.
         */
        set(f1, f2) {
            this.f1 = f1;
            this.f2 = f2;
        }
    }

    dsector.FloatPair = FloatPair;
    FloatPair["__class"] = "dsector.FloatPair";
})(dsector || (dsector = {}));
