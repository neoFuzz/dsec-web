/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    /** Static class containing all the available Window Styles for {@link CWWindow}
     * @static */
    class CWWindowStyles {
        static borderBitmapStyle0_$LI$() {
            if (CWWindowStyles.borderBitmapStyle0 == null) {
                CWWindowStyles.borderBitmapStyle0 = [[[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255],
                    [170, 170, 170, 255], [0, 0, 0, 255]]];
            }
            return CWWindowStyles.borderBitmapStyle0;
        }

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

        static borderBitmapStyle1_$LI$() {
            if (CWWindowStyles.borderBitmapStyle1 == null) {
                CWWindowStyles.borderBitmapStyle1 = [
                    [[0, 0, 0, 0], [0, 0, 0, 0], [255, 255, 255, 45],
                        [0, 0, 0, 45], [170, 170, 170, 255], [0, 0, 0, 45]]];
            }
            return CWWindowStyles.borderBitmapStyle1;
        }

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

        static borderBitmapStyle2_$LI$() {
            if (CWWindowStyles.borderBitmapStyle2 == null) {
                CWWindowStyles.borderBitmapStyle2 = [[[0, 0, 0, 0], [255, 255, 255, 45], [0, 0, 0, 255], [170, 170, 170, 255], [0, 0, 0, 255]]];
            }
            return CWWindowStyles.borderBitmapStyle2;
        }

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

        static borderBitmapStyle3_$LI$() {
            if (CWWindowStyles.borderBitmapStyle3 == null) {
                CWWindowStyles.borderBitmapStyle3 = [[[170, 170, 170, 50], [170, 170, 220, 255], [170, 170, 170, 50], [0, 0, 0, 0]]];
            }
            return CWWindowStyles.borderBitmapStyle3;
        }

        static cornerBitmapStyle3_$LI$() {
            if (CWWindowStyles.cornerBitmapStyle3 == null) {
                CWWindowStyles.cornerBitmapStyle3 = [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [170, 170, 170, 80], [170, 170, 220, 155]], [[0, 0, 0, 0], [170, 170, 170, 80], [170, 170, 220, 155], [170, 170, 220, 200]], [[0, 0, 0, 0], [170, 170, 220, 155], [170, 170, 220, 200], [0, 0, 0, 0]]];
            }
            return CWWindowStyles.cornerBitmapStyle3;
        }

        static borderBitmapStyle4_$LI$() {
            if (CWWindowStyles.borderBitmapStyle4 == null) {
                CWWindowStyles.borderBitmapStyle4 = [[[0, 0, 0, 0], [170, 170, 170, 50], [170, 170, 220, 255], [170, 170, 170, 50], [0, 0, 0, 0]]];
            }
            return CWWindowStyles.borderBitmapStyle4;
        }

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
                    return CWSYSTEM.CWColor.black_$LI$();
            }
        }
    }

    CWWindowStyles.SQUARE_RESIZE = 1;
    CWWindowStyles.SQUARE = 2;
    CWWindowStyles.ROUNDED = 3;
    CWWindowStyles.ROUNDED_RESIZE = 4;
    CWSYSTEM.CWWindowStyles = CWWindowStyles;
    CWWindowStyles["__class"] = "CWSYSTEM.CWWindowStyles";
})(CWSYSTEM || (CWSYSTEM = {}));
