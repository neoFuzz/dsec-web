(function (CWSYSTEM) {
    /**
     * Static class containing all the available Window Styles for [CWWindow]{@link CWSYSTEM.CWWindow}.
     *
     * @static
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
    class CWWindowStyles {
        static borderBitmapStyle0_$LI$() {
            if (CWWindowStyles.borderBitmapStyle0 == null) {
                CWWindowStyles.borderBitmapStyle0 = [[[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255],
                    [170, 170, 170, 255], [0, 0, 0, 255]]];
            }
            return CWWindowStyles.borderBitmapStyle0;
        }

        /**
         * Returns the bitmap for corner style 0.
         *
         * @static
         * @returns {number[][][]} The bitmap for corner style 0.
         */
        static cornerBitmapStyle0_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle0 == null) {
                CWWindowStyles.cornerBitmapStyle0 = [
                    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [255, 255, 255, 45], [255, 255, 255, 45], [255, 255, 255, 45]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [175, 170, 170, 255], [170, 170, 170, 255]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [170, 170, 170, 255], [0, 0, 0, 255]]];
            }
            return CWWindowStyles.cornerBitmapStyle0;
        }

        /**
         * Returns the bitmap for border style 1.
         *
         * @static
         * @returns {*|number[][][]} The bitmap for border style 1.
         */
        static borderBitmapStyle1_$LI$() {
            if (CWWindowStyles.borderBitmapStyle1 == null) {
                CWWindowStyles.borderBitmapStyle1 = [
                    [[0, 0, 0, 0], [0, 0, 0, 0], [255, 255, 255, 45],
                        [0, 0, 0, 45], [170, 170, 170, 255], [0, 0, 0, 45]]];
            }
            return CWWindowStyles.borderBitmapStyle1;
        }

        /**
         * Returns the bitmap for corner style 1.
         *
         * @static
         * @returns {*|number[][][]} The bitmap for corner style 1.
         */
        static cornerBitmapStyle1_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle1 == null) {
                CWWindowStyles.cornerBitmapStyle1 = [
                    [[0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 0]],
                    [[0, 0, 0, 55], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 0, 0, 55], [0, 0, 0, 0]],
                    [[0, 0, 0, 55], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 0, 0, 55], [255, 255, 255, 45]],
                    [[0, 0, 0, 55], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 230], [0, 0, 0, 55], [0, 0, 0, 45]],
                    [[0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 55], [0, 0, 0, 55], [255, 255, 255, 255], [200, 200, 200, 200]],
                    [[0, 0, 0, 0], [0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 45], [200, 200, 200, 255], [0, 0, 0, 45]]];
            }
            return CWWindowStyles.cornerBitmapStyle1;
        }

        /**
         * Returns the border bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} - An array representing the border bitmap.
         */
        static borderBitmapStyle2_$LI$() {
            if (CWWindowStyles.borderBitmapStyle2 == null) {
                CWWindowStyles.borderBitmapStyle2 = [[
                    [0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [170, 170, 170, 255], [0, 0, 0, 255]
                ]];
            }
            return CWWindowStyles.borderBitmapStyle2;
        }

        /**
         * Returns the corner bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} The bitmap for Border style 2.
         */
        static cornerBitmapStyle2_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle2 == null) {
                CWWindowStyles.cornerBitmapStyle2 = [
                    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [255, 255, 255, 45], [255, 255, 255, 45], [255, 255, 255, 45]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [175, 170, 170, 255], [170, 170, 170, 255]],
                    [[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [170, 170, 170, 255], [0, 0, 0, 255]]];
            }
            return CWWindowStyles.cornerBitmapStyle2;
        }

        /**
         * Returns the border bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} The bitmap for Border style 3.
         */
        static borderBitmapStyle3_$LI$() {
            if (CWWindowStyles.borderBitmapStyle3 == null) {
                CWWindowStyles.borderBitmapStyle3 = [[
                    [170, 170, 170, 50], [170, 170, 220, 255], [170, 170, 170, 50], [0, 0, 0, 0]
                ]];
            }
            return CWWindowStyles.borderBitmapStyle3;
        }

        /**
         * Returns the corner bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} The corner bitmap style.
         */
        static cornerBitmapStyle3_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle3 == null) {
                CWWindowStyles.cornerBitmapStyle3 = [
                    [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
                    [[0, 0, 0, 0], [0, 0, 0, 0], [170, 170, 170, 80], [170, 170, 220, 155]],
                    [[0, 0, 0, 0], [170, 170, 170, 80], [170, 170, 220, 155], [170, 170, 220, 200]],
                    [[0, 0, 0, 0], [170, 170, 220, 155], [170, 170, 220, 200], [0, 0, 0, 0]]
                ];
            }
            return CWWindowStyles.cornerBitmapStyle3;
        }

        /**
         * Returns the border bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} The border bitmap style.
         */
        static borderBitmapStyle4_$LI$() {
            if (CWWindowStyles.borderBitmapStyle4 == null) {
                CWWindowStyles.borderBitmapStyle4 = [
                    [[0, 0, 0, 0], [170, 170, 170, 50], [170, 170, 220, 255], [170, 170, 170, 50], [0, 0, 0, 0]]
                ];
            }
            return CWWindowStyles.borderBitmapStyle4;
        }

        /**
         * Returns the corner bitmap style for the given window style.
         *
         * @static
         * @returns {number[][][]} The corner bitmap style.
         */
        static cornerBitmapStyle4_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle4 == null) {
                CWWindowStyles.cornerBitmapStyle4 = [
                    [[215, 215, 255, 255], [225, 225, 255, 255], [215, 215, 255, 255], [0, 0, 0, 0], [0, 0, 0, 0]],
                    [[225, 225, 255, 255], [235, 235, 255, 255], [225, 225, 255, 255], [0, 0, 0, 0], [0, 0, 0, 0]],
                    [[215, 215, 255, 255], [225, 225, 255, 255], [215, 215, 255, 255], [170, 170, 170, 80], [170, 170, 220, 155]],
                    [[0, 0, 0, 0], [0, 0, 0, 0], [170, 170, 170, 80], [170, 170, 220, 155], [170, 170, 220, 200]],
                    [[0, 0, 0, 0], [0, 0, 0, 0], [170, 170, 220, 155], [170, 170, 220, 200], [0, 0, 0, 0]]];
            }
            return CWWindowStyles.cornerBitmapStyle4;
        }

        /**
         * Returns the border width for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {number} The border width.
         */
        static getBorderWidth(mode) {
            switch (mode) {
                case 0:
                case 2:
                case 4:
                    return 5;
                case 1:
                    return 6;
                case 3:
                    return 4;
                default:
                    return -1;
            }
        }

        /**
         * Returns the border pattern thickness for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {number} The border pattern thickness.
         */
        static getBorderPatternThickness(mode) {
            switch (mode) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    return 1;
                default:
                    return -1;
            }
        }

        /**
         * Returns the title height for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {number} The title height.
         */
        static getTitleHeight(mode) {
            switch (mode) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    return 7;
                default:
                    return -1;
            }
        }

        /**
         * Returns the border bitmap for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {null|CWSYSTEM.CWWindowStyles.borderBitmapStyle3|number[][][]|CWSYSTEM.CWWindowStyles.borderBitmapStyle1|CWSYSTEM.CWWindowStyles.borderBitmapStyle0|CWSYSTEM.CWWindowStyles.borderBitmapStyle4|CWSYSTEM.CWWindowStyles.borderBitmapStyle2}
         */
        static getBorderBitmap(mode) {
            switch (mode) {
                case 0:
                    return CWWindowStyles.borderBitmapStyle0_$LI$();
                case 1:
                    return CWWindowStyles.borderBitmapStyle1_$LI$();
                case 2:
                    return CWWindowStyles.borderBitmapStyle2_$LI$();
                case 3: /* ROUNDED */
                    return CWWindowStyles.borderBitmapStyle3_$LI$();
                case 4:
                    return CWWindowStyles.borderBitmapStyle4_$LI$();
                default:
                    return null;
            }
        }

        /**
         * Returns the corner bitmap for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {CWSYSTEM.CWWindowStyles.cornerBitmapStyle4|number[][][]|CWSYSTEM.CWWindowStyles.cornerBitmapStyle1|CWSYSTEM.CWWindowStyles.cornerBitmapStyle3|CWSYSTEM.CWWindowStyles.cornerBitmapStyle0|CWSYSTEM.CWWindowStyles.cornerBitmapStyle2|null}
         */
        static getCornerBitmap(mode) {
            switch (mode) {
                case 0:
                    return CWWindowStyles.cornerBitmapStyle0_$LI$();
                case 1:
                    return CWWindowStyles.cornerBitmapStyle1_$LI$();
                case 2:
                    return CWWindowStyles.cornerBitmapStyle2_$LI$();
                case 3: /* ROUNDED */
                    return CWWindowStyles.cornerBitmapStyle3_$LI$();
                case 4:
                    return CWWindowStyles.cornerBitmapStyle4_$LI$();
                default:
                    return null;
            }
        }

        /**
         * Returns the background color for the given window style.
         *
         * @static
         * @param {number} mode The window style.
         * @returns {CWSYSTEM.CWColor} The background color.
         */
        static getBackgroundColor(mode) {
            switch (mode) {
                case 0:
                    return new CWSYSTEM.CWColor(120, 65, 65, 190);
                case 1:
                    return new CWSYSTEM.CWColor(0, 0, 10, 140);
                case 2:
                    return new CWSYSTEM.CWColor(90, 90, 90, 190);
                case 3:
                case 4:
                    return new CWSYSTEM.CWColor(90, 90, 120, 190);
                default:
                    return CWSYSTEM.CWColor.__black();
            }
        }
    }

    /**
     * Window style with square corners and resize border.
     *
     * @static
     * @constant
     * @type {number}
     */
    CWWindowStyles.SQUARE_RESIZE = 1;
    /**
     * Window style with rounded corners and no resize border.
     *
     * @static
     * @constant
     * @type {number}
     */
    CWWindowStyles.SQUARE = 2;
    /**
     * Window style with rounded corners and no resize border.
     *
     * @static
     * @constant
     * @type {number}
     */
    CWWindowStyles.ROUNDED = 3;
    /**
     * Window style with rounded corners and resize border.
     *
     * @static
     * @constant
     * @type {number}
     */
    CWWindowStyles.ROUNDED_RESIZE = 4;
    CWSYSTEM.CWWindowStyles = CWWindowStyles;
    CWWindowStyles["__class"] = "CWSYSTEM.CWWindowStyles";
})(CWSYSTEM);