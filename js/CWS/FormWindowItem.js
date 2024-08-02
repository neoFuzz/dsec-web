(function (dsector) {
    /**
     * Form window item class.
     *
     * @property {number} type - The type of the form window item.
     * @property {boolean} __booleanValue - The boolean value of the item.
     * @property {string} __stringValue - The string value of the item.
     * @property {string} fileName - The file name of the image to display.
     * @property {CWSYSTEM.CWColor} color
     * @property {number} imageHeight - The height of the image.
     *
     * @see [CWColor]{@link CWSYSTEM.CWColor} for information on colors.
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
    class FormWindowItem {
        /**
         * Constructor for FormWindowItem class.
         *
         * @param {string} fileName File name of the image to display.
         * @param {CWSYSTEM.CWColor} color (optional)
         * @throws {Error} if an invalid overload is provided
         */
        constructor(fileName, color) {
            if (arguments.length === 2) {
                this.type = FormWindowItem.IMAGE;
                this.__booleanValue = false;
                this.__stringValue = "";
                this.color = color;
                const hashMap = CWSYSTEM.CWSReference.graphics.JPGSize(fileName);
                this.imageHeight = hashMap != null ? parseInt(hashMap.get("height")) : 0;
            } else if (arguments.length === 1) {
                this.type = fileName;
                this.__booleanValue = false;
                this.__stringValue = "";
                this.color = null;
                this.imageHeight = 0;
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Sets the boolean value of the item.
         *
         * @param {boolean} b - The boolean value to set.
         * @returns {FormWindowItem} The current instance of the FormWindowItem class.
         */
        setBooleanValue(b) {
            this.__booleanValue = b;
            return this;
        }

        /**
         * Sets the string value of the item.
         *
         * @param {string} stringValue - The string value to set.
         * @returns {FormWindowItem} The current instance of the FormWindowItem class.
         */
        setStringValue(stringValue) {
            this.__stringValue = stringValue;
            return this;
        }

        /**
         * Returns the boolean value of the item.
         *
         * @returns {boolean} The boolean value of the item.
         */
        booleanValue() {
            return this.__booleanValue;
        }

        /**
         * Returns the string value of the item.
         *
         * @returns {string} The string value of the item.
         */
        stringValue() {
            return this.__stringValue;
        }
    }

    /**
     * Input box item type.
     * @public
     * @constant
     * @type {number}
     */
    FormWindowItem.INPUTBOX = 0;
    /**
     * Checkbox item type.
     * @public
     * @constant
     * @type {number}
     */
    FormWindowItem.CHECKBOX = 1;
    /**
     * Text item type.
     * @public
     * @constant
     * @type {number}
     */
    FormWindowItem.TEXT = 2;
    /**
     * Image item type.
     * @public
     * @constant
     * @type {number}
     */
    FormWindowItem.IMAGE = 3;
    dsector.FormWindowItem = FormWindowItem;
    FormWindowItem["__class"] = "dsector.FormWindowItem";
})(dsector);