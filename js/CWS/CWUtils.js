/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWUtils {
        constructor() {
            CWUtils.initialize();
        }

        static __static_initialize() {
            if (!CWUtils.__static_initialized) {
                CWUtils.__static_initialized = true;
                CWUtils.__static_initializer_0();
            }
        }

        static maxY_$LI$() {
            CWUtils.__static_initialize();
            return CWUtils.maxY;
        }

        static multiSegmentScanLine_$LI$() {
            CWUtils.__static_initialize();
            return CWUtils.multiSegmentScanLine;
        }

        static scanLineLength_$LI$() {
            CWUtils.__static_initialize();
            return CWUtils.scanLineLength;
        }

        static overlappingSegment_$LI$() {
            CWUtils.__static_initialize();
            return CWUtils.overlappingSegment;
        }

        static initialize() {
            CWUtils.maxY = CWSYSTEM.Global.screenResolutionY_$LI$() + 5;
            CWUtils.multiSegmentScanLine = (function (dims) {
                let allocate = function (dims) {
                    if (dims.length === 0) {
                        return 0;
                    } else {
                        let array = [];
                        for (let i = 0; i < dims[0]; i++) {
                            array.push(allocate(dims.slice(1)));
                        }
                        return array;
                    }
                };
                return allocate(dims);
            })([CWUtils.maxY, 80]);
            CWUtils.scanLineLength = (s => {
                let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;
            })(CWUtils.maxY);
            CWUtils.overlappingSegment = (s => {
                let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;
            })(40);
            CWUtils.resetMultiSegmentScanLine();
        }

        static resetMultiSegmentScanLine() {
            for (let i = 0; i < CWUtils.maxY_$LI$(); ++i) {
                CWUtils.scanLineLength_$LI$()[i] = 0;
            }
        }

        static addSegmentToScanLine(index, start, end) {
            if (index >= 0 && index <= CWUtils.scanLineLength_$LI$().length - 1) {
                if (CWUtils.scanLineLength_$LI$()[index] === 0) {
                    CWUtils.scanLineLength_$LI$()[index] = 2;
                    CWUtils.multiSegmentScanLine_$LI$()[index][0] = start;
                    CWUtils.multiSegmentScanLine_$LI$()[index][1] = end;
                } else {
                    let x = 0;
                    let y = 0;
                    for (let i = 0; i < CWUtils.scanLineLength_$LI$()[index]; i += 2) {
                        if (start > CWUtils.multiSegmentScanLine_$LI$()[index][i]) {
                            y = i + 2;
                        }
                        if (CWUtils.multiSegmentScanLine_$LI$()[index][i + 1] + 1 >= start && CWUtils.multiSegmentScanLine_$LI$()[index][i] - 1 <= end) {
                            CWUtils.overlappingSegment_$LI$()[x++] = i;
                        }
                    }
                    let slLength;
                    let incSeg;
                    if (x > 0) {
                        const segment = CWUtils.overlappingSegment_$LI$()[0];
                        start = Math.min(start, CWUtils.multiSegmentScanLine_$LI$()[index][segment]);
                        end = Math.max(end, CWUtils.multiSegmentScanLine_$LI$()[index][CWUtils.overlappingSegment_$LI$()[x - 1] + 1]);
                        const xm = x * 2 - 2;
                        for (incSeg = segment + 2; incSeg < CWUtils.scanLineLength_$LI$()[index] - xm; ++incSeg) {
                            CWUtils.multiSegmentScanLine_$LI$()[index][incSeg] = CWUtils.multiSegmentScanLine_$LI$()[index][incSeg + xm];
                        }
                        CWUtils.multiSegmentScanLine_$LI$()[index][segment] = start;
                        CWUtils.multiSegmentScanLine_$LI$()[index][segment + 1] = end;
                        slLength = CWUtils.scanLineLength_$LI$();
                        slLength[index] -= xm;
                    } else {
                        for (incSeg = CWUtils.scanLineLength_$LI$()[index] - 1; incSeg >= y; --incSeg) {
                            CWUtils.multiSegmentScanLine_$LI$()[index][incSeg + 2] = CWUtils.multiSegmentScanLine_$LI$()[index][incSeg];
                        }
                        CWUtils.multiSegmentScanLine_$LI$()[index][y] = start;
                        CWUtils.multiSegmentScanLine_$LI$()[index][y + 1] = end;
                        slLength = CWUtils.scanLineLength_$LI$();
                        slLength[index] += 2;
                    }
                }
            }
        }

        static displayScanLine(line) {
            CWSYSTEM.Debug.println("Line " + line + " : ");
            for (let i = 0; i < CWUtils.scanLineLength_$LI$()[line]; i += 2) {
                CWSYSTEM.Debug.println("(" + CWUtils.multiSegmentScanLine_$LI$()[line][i] + ", " + CWUtils.multiSegmentScanLine_$LI$()[line][i + 1] + ") ");
            }
            CWSYSTEM.Debug.println("");
        }

        static __static_initializer_0() {
            CWUtils.maxY = CWSYSTEM.Global.screenResolutionY_$LI$() + 5;
        }

        static roundFloat(value, places) {
            const pow = Math.pow(10, places);
            return Math.round((value + Number.EPSILON) * pow) / pow;
        }

        static fillArray(a, fromIndex, toIndex, val) {
            for (let i = fromIndex; i < toIndex; i++) {
                a[i] = val;
            }
        }

        /** Copies elements from the source array to the destination array.
         * @param {Array} srcPts - The source array from which elements will be copied.
         * @param {number} srcOff - The starting index in the source array.
         * @param {Array} dstPts - The destination array to which elements will be copied.
         * @param {number} dstOff - The starting index in the destination array.
         * @param {number} size - The number of elements to be copied.
         */
        static copyArray(srcPts, srcOff, dstPts, dstOff, size) {
            if (srcPts !== dstPts || dstOff >= srcOff + size) {
                while (--size >= 0) {dstPts[dstOff++] = srcPts[srcOff++];}
            } else {
                let tmp = srcPts.slice(srcOff, srcOff + size);
                for (let i = 0; i < size; i++){dstPts[dstOff++] = tmp[i];}
            }
        }

        multiSegmentScanLineTest() {
            CWUtils.addSegmentToScanLine(1, 40, 50);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 40, 60);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 40, 60);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 61, 62);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 64, 66);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 2, 5);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 3, 28);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 28, 29);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 100, 110);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 80, 85);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 90, 105);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 90, 110);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 150, 160);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 180, 190);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 77, 179);
            CWUtils.displayScanLine(1);
            CWUtils.addSegmentToScanLine(1, 60, 100);
            CWUtils.displayScanLine(1);
            CWSYSTEM.Debug.println("\nExtreme case time test.");
            CWSYSTEM.Debug.println("Start - now!");
            const time = (new Date()).getTime();
            for (let i = 0; i < 20000; ++i) {
                const randomNum = ((Math.random() * 600.0) | 0);
                const ran400 = randomNum + ((Math.random() * 400.0) | 0);
                for (let j = 0; j < 300; ++j) {
                    CWUtils.addSegmentToScanLine(j, randomNum, ran400);
                }
            }
            const time1 = (new Date()).getTime();
            const timeVar = Math.fround((1000.0 / (time1 - time)) * 500.0);
            CWSYSTEM.Debug.println("Finished... now!");
            CWSYSTEM.Debug.println("Without the other work for each frame, frame rate = " + timeVar + "fps.");
        }
    }

    CWUtils.__static_initialized = false;
    CWSYSTEM.CWUtils = CWUtils;
    CWUtils["__class"] = "CWSYSTEM.CWUtils";
})(CWSYSTEM || (CWSYSTEM = {}));
CWSYSTEM.CWUtils.__static_initialize();
