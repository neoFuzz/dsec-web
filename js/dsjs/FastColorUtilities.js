var CWSYSTEM;
(function (CWSYSTEM) {
    class FastColorUtilities {
        static color$r$g$b(red, green, blue) {
            return (red << 16) + (green << 8) + blue;
        }
        static color$r$g$b$a(red, green, blue, alpha) {
            return (alpha << 24) + (red << 16) + (green << 8) + blue;
        }
        static color(red, green, blue, alpha) {
            if (((typeof red === 'number') || red === null) && ((typeof green === 'number') || green === null) &&
                ((typeof blue === 'number') || blue === null) && ((typeof alpha === 'number') || alpha === null)) {
                return CWSYSTEM.FastColorUtilities.color$r$g$b$a(red, green, blue, alpha);
            }
            else if (((typeof red === 'number') || red === null) && ((typeof green === 'number') || green === null) &&
                ((typeof blue === 'number') || blue === null) && alpha === undefined) {
                return CWSYSTEM.FastColorUtilities.color$r$g$b(red, green, blue);
            }
            else
                throw new Error('invalid overload');
        }
        static initializeGammaCorrectionLookupTable() {
            FastColorUtilities.gammaCorrectionLookupTable = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(256);
            for (let i = 0; i < 256; ++i) {
                const value = Math.pow(Math.fround(i / 256.0), 0.8333333134651184) * 256.0;
                FastColorUtilities.gammaCorrectionLookupTable[i] = (Math.round(value) | 0);
            }
        }
        /** Return a Gamma adjusted color.
         * @param {number} red
         * @param {number} green
         * @param {number} blue */
        static colorWithGammaAdjustment(red, green, blue) {
            return (red << 16) + (green << 8) + blue;
        }
        static alpha(alpha) {
            return (((alpha & FastColorUtilities.alphaMask) >> 24) + 256) % 256;
        }
        static red(red) {
            return (red & FastColorUtilities.redMask) >> 16;
        }
        static green(green) {
            return (green & FastColorUtilities.greenMask) >> 8;
        }
        static blue(blue) {
            return blue & FastColorUtilities.blueMask;
        }
        static getColorRGB(color) {
            let red = (color >> 16) & 0xff;
            let green = (color >> 8) & 0xff;
            let blue = color & 0xff;
            let alpha = 255; // assuming alpha is not included in the original calculation

            return {red: red, green: green, blue: blue, alpha: alpha};
        }
        static getColorRGBA(color) {
            let alpha = this.alpha(color);//(color >>> 24) & 0xff;
            let red = this.red(color);// (color >> 16) & 0xff;
            let green = this.green(color);// (color >> 8) & 0xff;
            let blue = this.blue(color);// color & 0xff;

            return {red: red, green: green, blue: blue, alpha: alpha};
        }
    }
    FastColorUtilities.blueMask = 255;
    FastColorUtilities.greenMask = 65280;
    FastColorUtilities.redMask = 16711680;
    FastColorUtilities.alphaMask = -16777216;
    FastColorUtilities.gammaCorrectionLookupTable = null;
    FastColorUtilities.gammaCorrection = 1.2;
    CWSYSTEM.FastColorUtilities = FastColorUtilities;
    FastColorUtilities["__class"] = "CWSYSTEM.FastColorUtilities";
})(CWSYSTEM || (CWSYSTEM = {}));
