(function (CWSYSTEM) {
    /**
     *
     * This class is used to store and manipulate an array of integers.
     * <br><br>
     * <b>Features:</b>
     * <ul>
     * <li>Add integers to the array</li>
     * <li>Remove integers from the array</li>
     * <li>Get the value of an integer at a specific index</li>
     * <li>Get the size of the array</li>
     * <li>Sort the array in ascending order</li>
     * <li>Find the index of the minimum value in the array</li>
     * <li>Get a sorted sequence of the array</li>
     * </ul>
     *
     * @example
     * const integerArray = new CWSYSTEM.IntegerArray(5);
     *
     * @property {Array} value - The array to store the integers.
     * @property {number} __size - The size of the array.
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
    class IntegerArray {
        /**
         * Constructs an IntegerArray object with the specified size.
         *
         * @param {number} value - The size of the array.
         */
        constructor(value) {
            if (this.value === undefined) {
                this.value = null;
            }
            this.value = Array(value).fill(0);
            this.__size = 0;
        }

        /**
         * Adds an integer to the array.
         *
         * @param value - The integer to add.
         */
        add(value) {
            this.value[this.__size++] = value;
        }

        /**
         * Removes an integer from the array.
         *
         * @param value - The index of the integer to remove.
         */
        remove(value) {
            for (let i = value; i < this.__size - 1; ++i) {
                this.value[i] = this.value[i + 1];
            }
            --this.__size;
        }

        /**
         * Gets the value of an integer at a specific index.
         *
         * @param value - The index of the integer to get.
         * @returns {number} The value of the integer at the specified index.
         */
        get(value) {
            return this.value[value];
        }

        /**
         * Gets the size of the array.
         *
         * @returns {number} The size of the array.
         */
        size() {
            return this.__size;
        }

        /**
         * Sorts the array in ascending order.
         */
        sort() {
            ((l) => {
                l.sort();
            })(this.value);
        }

        /**
         * Finds the index of the minimum value in the array.
         *
         * @returns {number} The index of the minimum value in the array.
         */
        indexOfMinimumValue() {
            if (this.__size === 1) {
                return 0;
            } else {
                let start = 0;
                let index = this.value[0];
                for (let i = 1; i < this.__size; ++i) {
                    if (this.value[i] < index) {
                        index = this.value[i];
                        start = i;
                    }
                }
                return start;
            }
        }

        /**
         * Gets a sorted sequence of the array.
         *
         * @returns {CWSYSTEM.IntegerArray} A sorted sequence of the array.
         */
        sortedSequence() {
            const max = 1073741824;
            const integerArray = new IntegerArray(this.__size);
            const booleans = Array(this.__size).fill(false);
            let i;
            for (i = 0; i < this.__size; ++i) {
                booleans[i] = false;
            }
            i = -1;
            for (let j = 0; j < this.__size; ++j) {
                let m = max;
                for (let k = 0; k < this.__size; ++k) {
                    if (!booleans[k] && this.value[k] < m) {
                        m = this.value[k];
                        i = k;
                    }
                }
                booleans[i] = true;
                integerArray.add(i);
            }
            return integerArray;
        }
    }

    CWSYSTEM.IntegerArray = IntegerArray;
    IntegerArray["__class"] = "CWSYSTEM.IntegerArray";
})(CWSYSTEM);