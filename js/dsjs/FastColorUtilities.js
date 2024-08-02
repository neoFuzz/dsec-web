(function (CWSYSTEM) {
    /**
     * Utility class for fast color operations.
     *
     * @property {Array<number>} gammaCorrectionLookupTable - Lookup table for gamma correction.
     * @property {Array<number>} gammaCorrectionLookupTableInverted - Inverted lookup table for gamma correction.
     *
     * @todo Move to the CWSYSTEM namespace
     * @since 1.0.0
     * @access public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class FastColorUtilities {
        /**
         * Creates a color from RGB values.
         *
         * @param {number} red - Red component (0-255).
         * @param {number} green - Green component (0-255).
         * @param {number} blue - Blue component (0-255).
         * @returns {number} The color as a 32-bit integer.
         */
        static colorRGB(red, green, blue) {
            return (red << 16) | (green << 8) | blue;
        }

        /**
         * Creates a color from RGBA values.
         *
         * @param {number} red - Red component (0-255).
         * @param {number} green - Green component (0-255).
         * @param {number} blue - Blue component (0-255).
         * @param {number} alpha - Alpha component (0-255).
         * @returns {number} The color as a 32-bit integer.
         */
        static colorRGBA(red, green, blue, alpha) {
            return (alpha << 24) | (red << 16) | (green << 8) | blue;
        }

        /**
         * Creates a color from RGB or RGBA values.
         *
         * @param {number} red - Red component (0-255).
         * @param {number} green - Green component (0-255).
         * @param {number} blue - Blue component (0-255).
         * @param {number} [alpha] - Optional alpha component (0-255).
         * @returns {number} The color as a 32-bit integer.
         */
        static color(red, green, blue, alpha) {
            return alpha !== undefined ? this.colorRGBA(red, green, blue, alpha) : this.colorRGB(red, green, blue);
        }

        /**
         * Initializes the gamma correction lookup table.
         */
        static initializeGammaCorrectionLookupTable() {
            FastColorUtilities.gammaCorrectionLookupTable = Array(256).fill(0);
            for (let i = 0; i < 256; ++i) {
                const value = Math.pow(Math.fround(i / 256.0), 0.8333333134651184) * 256.0;
                FastColorUtilities.gammaCorrectionLookupTable[i] = (Math.round(value) | 0);
            }
        }

        /**
         * Returns a gamma-adjusted color.
         *
         * @param {number} red - Red component (0-255).
         * @param {number} green - Green component (0-255).
         * @param {number} blue - Blue component (0-255).
         * @returns {number} The gamma-adjusted color as a 32-bit integer.
         */
        static colorWithGammaAdjustment(red, green, blue) {
            if (!FastColorUtilities.gammaCorrectionLookupTable) {
                FastColorUtilities.initializeGammaCorrectionLookupTable();
            }
            const table = FastColorUtilities.gammaCorrectionLookupTable;
            return (table[red] << 16) | (table[green] << 8) | table[blue];
        }

        /**
         * Extracts the alpha component from a color.
         *
         * @param {number} alpha - The color as a 32-bit integer.
         * @returns {number} The alpha component (0-255).
         */
        static alpha(alpha) {
            return (((alpha & FastColorUtilities.alphaMask) >> 24) + 256) % 256;
        }

        /**
         * Extracts the red component from a color.
         *
         * @param {number} color - The color as a 32-bit integer.
         * @returns {number} The red component (0-255).
         */
        static red(color) {
            return (color & FastColorUtilities.redMask) >> 16;
        }

        /**
         * Extracts the green component from a color.
         *
         * @param {number} color - The color as a 32-bit integer.
         * @returns {number} The green component (0-255).
         */
        static green(color) {
            return (color & FastColorUtilities.greenMask) >> 8;
        }

        /**
         * Extracts the blue component from a color.
         *
         * @param {number} color - The color as a 32-bit integer.
         * @returns {number} The blue component (0-255).
         */
        static blue(color) {
            return color & FastColorUtilities.blueMask;
        }

        /**
         * Extracts RGB components from a color.
         *
         * @param {number} color - The color as a 32-bit integer.
         * @returns {{red: number, green: number, blue: number, alpha: number}} An object containing the color components.
         */
        static getColorRGB(color) {
            return {
                red: this.red(color),
                green: this.green(color),
                blue: this.blue(color),
                alpha: 255
            };
        }

        /**
         * Extracts RGBA components from a color.
         *
         * @param {number} color - The color as a 32-bit integer.
         * @returns {{red: number, green: number, blue: number, alpha: number}} An object containing the color components.
         */
        static getColorRGBA(color) {
            return {
                red: this.red(color),
                green: this.green(color),
                blue: this.blue(color),
                alpha: this.alpha(color)
            };
        }
    }

    /**
     * Mask for extracting the blue component from a color.
     *
     * @static
     * @type {number}
     */
    FastColorUtilities.blueMask = 255;
    /**
     * Mask for extracting the green component from a color.
     *
     * @static
     * @type {number}
     */
    FastColorUtilities.greenMask = 65280;
    /**
     * Mask for extracting the alpha component from a color.
     *
     * @static
     * @type {number}
     */
    FastColorUtilities.redMask = 16711680;
    /**
     * Mask for extracting the alpha component from a color.
     *
     * @static
     * @type {number}
     */
    FastColorUtilities.alphaMask = -16777216;
    FastColorUtilities.gammaCorrectionLookupTable = null;
    FastColorUtilities.gammaCorrection = 1.2;
    CWSYSTEM.FastColorUtilities = FastColorUtilities;
    FastColorUtilities["__class"] = "CWSYSTEM.FastColorUtilities";
})(CWSYSTEM);