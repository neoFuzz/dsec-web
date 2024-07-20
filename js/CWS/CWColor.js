(function (CWSYSTEM) {
    /**
     * CWColor is a class representing a colour with red, green, blue, and alpha components.
     * It provides methods to retrieve and manipulate these colour components.
     *
     * @property {number} color - The RGBA value of the color represented as a 32-bit integer.
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
    class CWColor {
        /**
         * Creates a new instance of CWColor.
         *
         * @param {CWSYSTEM.CWColor|number} red - The red component of the color (0-255), or a [CWColor]{@link CWSYSTEM.CWColor} without green, blue and alpha components.
         * @param {number|null} [green] - The green component of the color (0-255).
         * @param {number|null} [blue] - The blue component of the color (0-255).
         * @param {number|null} [alpha] - The alpha component of the color (0-255).
         * @throws {Error} Throws an error if the provided arguments are of invalid types.
         */
        constructor(red, green, blue, alpha) {
            if (red instanceof CWSYSTEM.CWColor) {
                // Constructor with a CWColor object
                this.color = red.color;
            } else if (typeof red === 'number') {
                // Constructor with individual RGBA values
                this.color = ((alpha || 0) << 24) | ((red || 0) << 16) | ((green || 0) << 8) | (blue || 0);
            } else {
                throw new Error('Invalid arguments for CWColor constructor');
            }
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for white. */
        static __white() {
            if (CWColor.white == null) {
                CWColor.white = new CWColor(255, 255, 255, 255);
            }
            return CWColor.white;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for light grey. */
        static __lightGrey() {
            if (CWColor.lightGrey == null) {
                CWColor.lightGrey = new CWColor(200, 200, 200, 255);
            }
            return CWColor.lightGrey;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for grey. */
        static __grey() {
            if (CWColor.grey == null) {
                CWColor.grey = new CWColor(140, 140, 140, 255);
            }
            return CWColor.grey;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for dark grey. */
        static __darkGrey() {
            if (CWColor.darkGrey == null) {
                CWColor.darkGrey = new CWColor(80, 80, 80, 255);
            }
            return CWColor.darkGrey;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for silver. */
        static __silver() {
            if (CWColor.silver == null) {
                CWColor.silver = new CWColor(192, 192, 192, 255);
            }
            return CWColor.silver;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for black. */
        static __black() {
            if (CWColor.black == null) {
                CWColor.black = new CWColor(0, 0, 0, 255);
            }
            return CWColor.black;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for near black. */
        static __nearBlack() {
            if (CWColor.nearBlack == null) {
                CWColor.nearBlack = new CWColor(10, 10, 10, 255);
            }
            return CWColor.nearBlack;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for red. */
        static __red$() {
            if (CWColor.__red == null) {
                CWColor.__red = new CWColor(255, 0, 0, 255);
            }
            return CWColor.__red;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for green. */
        static __green$() {
            if (CWColor.__green == null) {
                CWColor.__green = new CWColor(0, 255, 0, 255);
            }
            return CWColor.__green;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for blue. */
        static __blue$() {
            if (CWColor.__blue == null) {
                CWColor.__blue = new CWColor(0, 0, 255, 255);
            }
            return CWColor.__blue;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for dull blue. */
        static __dullBlue() {
            if (CWColor.dullBlue == null) {
                CWColor.dullBlue = new CWColor(75, 75, 90, 255);
            }
            return CWColor.dullBlue;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for bright green. */
        static __brightGreen() {
            if (CWColor.brightGreen == null) {
                CWColor.brightGreen = new CWColor(100, 255, 100, 255);
            }
            return CWColor.brightGreen;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for bright blue. */
        static __brightBlue() {
            if (CWColor.brightBlue == null) {
                CWColor.brightBlue = new CWColor(100, 100, 255, 255);
            }
            return CWColor.brightBlue;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for navy. */
        static __navy() {
            if (CWColor.navy == null) {
                CWColor.navy = new CWColor(0, 0, 128, 255);
            }
            return CWColor.navy;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for light yellow. */
        static __lightYellow() {
            if (CWColor.lightYellow == null) {
                CWColor.lightYellow = new CWColor(255, 255, 230, 255);
            }
            return CWColor.lightYellow;
        }

        /** @returns {CWSYSTEM.CWColor} the [CWColor]{@link CWSYSTEM.CWColor} for transparent black. */
        static __transparentBlack() {
            if (CWColor.transparentBlack == null) {
                CWColor.transparentBlack = new CWColor(0, 0, 0, 0);
            }
            return CWColor.transparentBlack;
        }

        /** @returns {number} the alpha component (0-255) of the [CWColor]{@link CWSYSTEM.CWColor}. */
        alpha() {
            return (((this.color & CWSYSTEM.FastColorUtilities.alphaMask) >> 24) + 256) % 256;
        }

        /** @returns {number} the red component (0-255) of the [CWColor]{@link CWSYSTEM.CWColor}. */
        red() {
            return (this.color & CWSYSTEM.FastColorUtilities.redMask) >> 16;
        }

        /** @returns {number} the green component (0-255) of the [CWColor]{@link CWSYSTEM.CWColor}. */
        green() {
            return (this.color & CWSYSTEM.FastColorUtilities.greenMask) >> 8;
        }

        /** @returns {number} the blue component (0-255) of the [CWColor]{@link CWSYSTEM.CWColor}. */
        blue() {
            return this.color & CWSYSTEM.FastColorUtilities.blueMask;
        }

        /**
         * Set the color strictly using RGBA values.
         *
         * @param {number} red 0..255 number value for red.
         * @param {number} blue 0..255 number value for blue.
         * @param {number} green 0..255 number value for green.
         * @param {number} alpha 0..255 number value for alpha. */
        setColor$rgba(red, green, blue, alpha) {
            this.color = (alpha << 24) + (red << 16) + (green << 8) + blue;
        }

        /**
         * Sets the color using the specified RGBA integer values or a [CWColor]{@link CWSYSTEM.CWColor} number.
         *
         * @param {number|CWSYSTEM.CWColor.color} red - The red component of the color (0-255). Or, a [CWColor]{@link CWSYSTEM.CWColor} number.
         * @param {number|null} [green] - The green component of the color (0-255).
         * @param {number|null} [blue] - The blue component of the color (0-255).
         * @param {number|null} [alpha] - The alpha component of the color (0-255).
         * @throws {Error} Throws an error if the provided arguments are of invalid types.
         */
        setColor(red, green, blue, alpha) {
            if (typeof red === 'number' && typeof green === 'number' &&
                typeof blue === 'number' && typeof alpha === 'number') {
                return this.setColor$rgba(red, green, blue, alpha);
            } else if (typeof red === 'number' && green === undefined &&
                blue === undefined && alpha === undefined) {
                return this.setColor$int(red);
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Set the color using a [CWColor]{@link CWSYSTEM.CWColor} number.
         *
         * @param {number} color the [CWColor]{@link CWSYSTEM.CWColor} number.
         */
        setColor$int(color) {
            this.color = color;
        }
    }

    CWSYSTEM.CWColor = CWColor;
    CWColor["__class"] = "CWSYSTEM.CWColor";
})(CWSYSTEM || (CWSYSTEM = {}));