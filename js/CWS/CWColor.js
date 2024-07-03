(function (CWSYSTEM) {
    /** Re-written from java
     * @class
     * @memberof CWSYSTEM
     */
    class CWColor {
        /**
         * Creates a new instance of CWColor.
         * @constructor
         * @param {CWColor|number} red - The red component of the color (0-255).
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

        /** @returns {CWColor} Returns the {@link CWColor} for white. */
        static white_$LI$() {
            if (CWColor.white == null) {
                CWColor.white = new CWColor(255, 255, 255, 255);
            }
            return CWColor.white;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for light grey. */
        static lightGrey_$LI$() {
            if (CWColor.lightGrey == null) {
                CWColor.lightGrey = new CWColor(200, 200, 200, 255);
            }
            return CWColor.lightGrey;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for grey. */
        static grey_$LI$() {
            if (CWColor.grey == null) {
                CWColor.grey = new CWColor(140, 140, 140, 255);
            }
            return CWColor.grey;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for dark grey. */
        static darkGrey_$LI$() {
            if (CWColor.darkGrey == null) {
                CWColor.darkGrey = new CWColor(80, 80, 80, 255);
            }
            return CWColor.darkGrey;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for silver. */
        static silver_$LI$() {
            if (CWColor.silver == null) {
                CWColor.silver = new CWColor(192, 192, 192, 255);
            }
            return CWColor.silver;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for black. */
        static black_$LI$() {
            if (CWColor.black == null) {
                CWColor.black = new CWColor(0, 0, 0, 255);
            }
            return CWColor.black;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for near black. */
        static nearBlack_$LI$() {
            if (CWColor.nearBlack == null) {
                CWColor.nearBlack = new CWColor(10, 10, 10, 255);
            }
            return CWColor.nearBlack;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for red. */
        static __red_$LI$() {
            if (CWColor.__red == null) {
                CWColor.__red = new CWColor(255, 0, 0, 255);
            }
            return CWColor.__red;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for green. */
        static __green_$LI$() {
            if (CWColor.__green == null) {
                CWColor.__green = new CWColor(0, 255, 0, 255);
            }
            return CWColor.__green;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for blue. */
        static __blue_$LI$() {
            if (CWColor.__blue == null) {
                CWColor.__blue = new CWColor(0, 0, 255, 255);
            }
            return CWColor.__blue;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for dull blue. */
        static dullBlue_$LI$() {
            if (CWColor.dullBlue == null) {
                CWColor.dullBlue = new CWColor(75, 75, 90, 255);
            }
            return CWColor.dullBlue;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for bright green. */
        static brightGreen_$LI$() {
            if (CWColor.brightGreen == null) {
                CWColor.brightGreen = new CWColor(100, 255, 100, 255);
            }
            return CWColor.brightGreen;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for bright blue. */
        static brightBlue_$LI$() {
            if (CWColor.brightBlue == null) {
                CWColor.brightBlue = new CWColor(100, 100, 255, 255);
            }
            return CWColor.brightBlue;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for navy. */
        static navy_$LI$() {
            if (CWColor.navy == null) {
                CWColor.navy = new CWColor(0, 0, 128, 255);
            }
            return CWColor.navy;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for light yellow. */
        static lightYellow_$LI$() {
            if (CWColor.lightYellow == null) {
                CWColor.lightYellow = new CWColor(255, 255, 230, 255);
            }
            return CWColor.lightYellow;
        }

        /** @returns {CWColor} Returns the {@link CWColor} for transparent black. */
        static transparentBlack_$LI$() {
            if (CWColor.transparentBlack == null) {
                CWColor.transparentBlack = new CWColor(0, 0, 0, 0);
            }
            return CWColor.transparentBlack;
        }

        /** @returns {number} Returns the alpha component (0-255) of the {@link CWColor}. */
        alpha() {
            return (((this.color & CWSYSTEM.FastColorUtilities.alphaMask) >> 24) + 256) % 256;
        }

        /** @returns {number} Returns the red component (0-255) of the {@link CWColor}. */
        red() {
            return (this.color & CWSYSTEM.FastColorUtilities.redMask) >> 16;
        }

        /** @returns {number} Returns the green component (0-255) of the {@link CWColor}. */
        green() {
            return (this.color & CWSYSTEM.FastColorUtilities.greenMask) >> 8;
        }

        /** @returns {number} Returns the blue component (0-255) of the {@link CWColor}. */
        blue() {
            return this.color & CWSYSTEM.FastColorUtilities.blueMask;
        }

        /** Set the color strictly using RGBA values.
         * @param {number} red 0..255 number value for red.
         * @param {number} blue 0..255 number value for blue.
         * @param {number} green 0..255 number value for green.
         * @param {number} alpha 0..255 number value for alpha. */
        setColor$rgba(red, green, blue, alpha) {
            this.color = (alpha << 24) + (red << 16) + (green << 8) + blue;
        }

        /** Sets the color using the specified RGBA integer values or a {@link CWColor} number.
         * @param {number|CWColor.color} red - The red component of the color (0-255). Or, a {@link CWColor} number
         * @param {number|null} [green] - The green component of the color (0-255).
         * @param {number|null} [blue] - The blue component of the color (0-255).
         * @param {number|null} [alpha] - The alpha component of the color (0-255).
         * @returns {void} - Returns nothing.
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

        /** Set the color using a {@link CWColor} number
         *  @param {number} color {@link CWColor} number */
        setColor$int(color) {
            this.color = color;
        }
    }

    CWSYSTEM.CWColor = CWColor;
    CWColor["__class"] = "CWSYSTEM.CWColor";
})(CWSYSTEM || (CWSYSTEM = {}));
