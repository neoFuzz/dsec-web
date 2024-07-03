/**/
(function (dsector) {
    /**
     * Represents a pair of strings with a name and a value.
     * @class
     * @memberof dsector
     */
    class StringPair {
        /**
         * Constructs a new StringPair instance with the specified name and value.
         * @param {string} name - The name part of the pair.
         * @param {string} value - The value part of the pair.
         */
        constructor(name, value) {
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.value === undefined) {
                this.value = null;
            }
            this.name = name;
            this.value = value;
        }
    }

    dsector.StringPair = StringPair;
    StringPair["__class"] = "dsector.StringPair";
})(dsector || (dsector = {}));