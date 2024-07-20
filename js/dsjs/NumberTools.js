/**/
(function (dsector) {
    /**
     * NumberTools class provides utility methods for working with numbers.
     * @class
     * @memberof dsector
     */
    class NumberTools {
        /**
         * Returns a large integer value (2147483647).
         * @returns {number} The large integer value.
         */
        static largeInteger_$LI$() {
            if (NumberTools.largeInteger == null) {
                NumberTools.largeInteger = 2147483647;
            }
            return NumberTools.largeInteger;
        }

        /**
         * Returns a large long value (9223372036854775807).
         * @returns {number} The large long value.
         */
        static largeLong_$LI$() {
            if (NumberTools.largeLong == null) {
                NumberTools.largeLong = 9223372036854775807;
            }
            return NumberTools.largeLong;
        }

        /**
         * Returns a small positive float value (1.4E-45).
         * @returns {number} The small positive float value.
         */
        static smallPositiveFloat_$LI$() {
            if (NumberTools.smallPositiveFloat == null) {
                NumberTools.smallPositiveFloat = 1.4E-45;
            }
            return NumberTools.smallPositiveFloat;
        }

        /**
         * Generates a random integer between 0 and the large integer value.
         * @returns {number} A random integer.
         */
        static randomInteger() {
            return ((Math.random() * NumberTools.largeInteger_$LI$()) | 0);
        }

        /**
         * Generates a random long between 0 and the large long value.
         * @returns {number} A random long.
         */
        static randomLong() {
            return (n => n < 0 ? Math.ceil(n) : Math.floor(n))((Math.random() * NumberTools.largeLong_$LI$()));
        }

        /**
         * Main method for testing purposes. Logs random integer, random long, and small positive float values to the console.
         */
        static main() {
            console.info("Random integer: " + NumberTools.randomInteger());
            console.info("Random long: " + NumberTools.randomLong());
            console.info("smallFloat: 1.401E-42 or " + NumberTools.smallPositiveFloat_$LI$());
        }
    }

    dsector.NumberTools = NumberTools;
    NumberTools["__class"] = "dsector.NumberTools";
})(dsector || (dsector = {}));
