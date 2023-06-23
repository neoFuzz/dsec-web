var CWSYSTEM;
(function (CWSYSTEM) {
    class CWScrollbar {
        constructor(window) {
            this.sliderSize = 0.33;
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.positionPercent === undefined) {
                this.positionPercent = 0;
            }
            this.window = window;
            this.positionPercent = 0.0;
        }

        static arrowUpBitmap_$LI$() {
            if (CWScrollbar.arrowUpBitmap == null) {
                CWScrollbar.arrowUpBitmap = [[
                    [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                    [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                    [255, 255, 255], [255, 255, 255], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                        [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                        [255, 255, 255], [255, 255, 255], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 125], [120, 120, 120], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [120, 120, 120], [0, 0, 0], [120, 120, 120], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [120, 120, 120],
                        [0, 0, 0], [0, 0, 0], [0, 0, 0], [120, 120, 120], [215, 215, 125],
                        [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [120, 120, 120], [0, 0, 0],
                        [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [120, 120, 120],
                        [215, 215, 125], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [165, 165, 165], [165, 165, 165], [165, 165, 165], [165, 165, 165],
                        [165, 165, 165], [165, 165, 165], [165, 165, 165], [165, 165, 165],
                        [165, 165, 165], [165, 165, 165], [165, 165, 165], [25, 25, 25]],
                    [[25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25],
                        [25, 25, 82], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25]]];
            }
            return CWScrollbar.arrowUpBitmap;
        }

        static arrowDownBitmap_$LI$() {
            if (CWScrollbar.arrowDownBitmap == null) {
                CWScrollbar.arrowDownBitmap = [[[255, 255, 255], [255, 255, 255], [255, 255, 255],
                    [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                    [255, 255, 255], [255, 255, 255], [255, 255, 255], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                        [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                        [255, 255, 255], [255, 255, 255], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [120, 120, 120],
                        [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                        [120, 120, 120], [215, 215, 125], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215],
                        [120, 120, 120], [0, 0, 0], [0, 0, 0], [0, 0, 0], [120, 120, 120],
                        [215, 215, 125], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [120, 120, 120], [0, 0, 0], [120, 120, 120], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 125], [120, 120, 120], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215], [215, 215, 215],
                        [215, 215, 215], [215, 215, 215], [165, 165, 165], [23, 25, 25]],
                    [[255, 255, 255], [165, 165, 165], [165, 165, 165], [165, 165, 165],
                        [165, 165, 165], [165, 165, 165], [165, 165, 165], [165, 165, 165], [165, 165, 165],
                        [165, 165, 165], [165, 165, 165], [165, 165, 165], [25, 25, 25]],
                    [[25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25],
                        [25, 25, 25], [25, 25, 25], [25, 25, 82], [25, 25, 25],
                        [25, 25, 25], [25, 25, 25], [25, 25, 25], [25, 25, 25]]];
            }
            return CWScrollbar.arrowDownBitmap;
        }

        draw() {
            const vs = this.window.v;
            if (!this.windowLargerThanScrollableContent()) {
                const screenData = this.window.window;
                vs.CWDrawFilledRectangleWithGradient(screenData,
                    this.window.borderWidth + this.window.w - CWScrollbar.width,
                    this.window.borderWidth + this.window.__titleHeight + CWScrollbar.buttonHeight,
                    14, this.window.h - 26 + 1, new CWSYSTEM.CWColor(CWScrollbar.bgColorR1,
                        CWScrollbar.bgColorG1, CWScrollbar.bgColorB1, CWScrollbar.scrollbarTransparency),
                    new CWSYSTEM.CWColor(CWScrollbar.bgColorR2, CWScrollbar.bgColorG2, CWScrollbar.bgColorB2,
                        CWScrollbar.scrollbarTransparency));
                let i;
                let j;
                for (i = 0; i < CWScrollbar.buttonHeight; ++i) {
                    for (j = 0; j < CWScrollbar.width; ++j) {
                        vs.setColorVS$r$g$b$a(
                            CWScrollbar.arrowUpBitmap_$LI$()[i][j][0], CWScrollbar.arrowUpBitmap_$LI$()[i][j][1],
                            CWScrollbar.arrowUpBitmap_$LI$()[i][j][2], CWSYSTEM.CWColor.black_$LI$().alpha());
                        vs.CWDrawPixel(screenData, this.window.borderWidth + this.window.w - CWScrollbar.width + j,
                            this.window.borderWidth + this.window.__titleHeight + i);
                        vs.setColorVS$r$g$b$a(
                            CWScrollbar.arrowDownBitmap_$LI$()[i][j][0], CWScrollbar.arrowDownBitmap_$LI$()[i][j][1],
                            CWScrollbar.arrowDownBitmap_$LI$()[i][j][2], CWSYSTEM.CWColor.black_$LI$().alpha());
                        vs.CWDrawPixel(screenData, this.window.borderWidth + this.window.w - CWScrollbar.width + j,
                            this.window.borderWidth + this.window.__titleHeight + i +
                            this.window.h - CWScrollbar.buttonHeight);
                    }
                }
                i = this.window.h - 26;
                j = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * i);
                const sliderSize = Math.fround(i * this.sliderSize);
                vs.CWDrawFilledRectangleWithGradient(screenData, this.window.borderWidth + this.window.w - CWScrollbar.width,
                    this.window.borderWidth + this.window.__titleHeight + CWScrollbar.buttonHeight + j,
                    CWScrollbar.width, sliderSize, new CWSYSTEM.CWColor(CWScrollbar.sliderColorR1,
                        CWScrollbar.sliderColorG1, CWScrollbar.sliderColorB1, CWSYSTEM.CWColor.black_$LI$().alpha()),
                    new CWSYSTEM.CWColor(CWScrollbar.sliderColorR2, CWScrollbar.sliderColorG2,
                        CWScrollbar.sliderColorB2, CWSYSTEM.CWColor.black_$LI$().alpha()));
                vs.setColorVS$r$g$b$a(100, 100, 100, CWSYSTEM.CWColor.black_$LI$().alpha());
                vs.CWDrawRectangle(screenData, this.window.borderWidth + this.window.w - CWScrollbar.width,
                    this.window.borderWidth + this.window.__titleHeight + CWScrollbar.buttonHeight + j,
                    CWScrollbar.width, sliderSize + 1);
                vs.setColorVS$r$g$b$a(130, 130, 130, CWSYSTEM.CWColor.black_$LI$().alpha());
                for (let l = this.window.borderWidth + this.window.w - CWScrollbar.width + 2;
                     l < this.window.borderWidth + this.window.w - 2; l += 2) {
                    vs.CWLine(screenData, l, this.window.borderWidth + this.window.__titleHeight +
                        CWScrollbar.buttonHeight + j + (sliderSize / 3 | 0), l,
                        this.window.borderWidth + this.window.__titleHeight + CWScrollbar.buttonHeight + j +
                        (2 * sliderSize / 3 | 0), false);
                }
            }
        }

        mouseIsOverSlidingBar(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            const slider = Math.fround(h * this.sliderSize);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y >= this.window.yPosition + CWScrollbar.buttonHeight + size &&
                y <= this.window.yPosition + CWScrollbar.buttonHeight + size + slider;
        }

        mouseIsOverScrollbarUpperSpace(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w && y > this.window.yPosition + CWScrollbar.buttonHeight &&
                y < this.window.yPosition + CWScrollbar.buttonHeight + size;
        }

        mouseIsOverScrollbarLowerSpace(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            const sliderSize = Math.fround(h * this.sliderSize);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y > this.window.yPosition + CWScrollbar.buttonHeight + size + sliderSize &&
                y < this.window.yPosition + CWScrollbar.buttonHeight + h;
        }

        mouseIsOverScrollbarUpperButton(x, y) {
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w && y >= this.window.yPosition &&
                y <= this.window.yPosition + CWScrollbar.buttonHeight;
        }

        mouseIsOverScrollbarLowerButton(x, y) {
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y >= this.window.yPosition + this.window.h - CWScrollbar.buttonHeight &&
                y <= this.window.yPosition + this.window.h;
        }

        moveUpSlowly() {
            this.positionPercent -= Math.fround(((0.002 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod_$LI$()) / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        moveDownSlowly() {
            this.positionPercent += Math.fround((0.002 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod_$LI$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        moveUpFast() {
            this.positionPercent -= Math.fround((0.01 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod_$LI$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        moveDownFast() {
            this.positionPercent += Math.fround((0.01 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod_$LI$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        getOffsetScrolledInPixels() {
            const size = this.window.scrollablePage.length;
            let pos;
            if (this.window.h >= size) {
                pos = 0;
            } else {
                pos = ((Math.fround(this.positionPercent * (size - this.window.h))) | 0);
            }
            return pos;
        }

        renderScrollablePage() {
            if (this.window.scrollablePage == null) {
                CWSYSTEM.Debug.error("Error in Scrollbar.renderScrollablePage(): scrollablePage has not been initialized.");
            } else {
                const points = this.window.window.point;
                const scrollablePage = this.window.scrollablePage;
                const size = scrollablePage.length;
                const pixels = this.getOffsetScrolledInPixels();
                for (let i = 0; i < this.window.h && pixels + i < size; ++i) {
                    const ints = scrollablePage[pixels + i];
                    let w = this.window.w;
                    if (ints.length < this.window.w) {
                        w = ints.length;
                    }
                    if (w >= 0) {
                        CWSYSTEM.CWUtils.copyArray(ints, 0,
                            points[i + this.window.borderWidth + this.window.__titleHeight], this.window.borderWidth, w);
                    }
                }
                this.updateSliderSize();
            }
        }

        updateSliderSize() {
            if (this.window.scrollablePage == null) {
                CWSYSTEM.Debug.error("Error in Scrollbar.windowLargerThanScrollableContent(): " +
                    "scrollablePage has not been initialized.");
            } else {
                const size = this.window.scrollablePage.length;
                if (this.window.h >= size) {
                    this.sliderSize = 1.0;
                } else {
                    this.sliderSize = Math.fround(this.window.h / size);
                }
            }
        }

        windowLargerThanScrollableContent() {
            if (this.window.scrollablePage == null) {
                return false;
            } else {
                const size = this.window.scrollablePage.length;
                return this.window.h >= size;
            }
        }
    }

    CWScrollbar.width = 13;
    CWScrollbar.buttonHeight = 13;
    CWScrollbar.bgColorR1 = 95;
    CWScrollbar.bgColorG1 = 95;
    CWScrollbar.bgColorB1 = 135;
    CWScrollbar.bgColorR2 = 160;
    CWScrollbar.bgColorG2 = 160;
    CWScrollbar.bgColorB2 = 210;
    CWScrollbar.scrollbarTransparency = 200;
    CWScrollbar.sliderColorR1 = 150;
    CWScrollbar.sliderColorG1 = 150;
    CWScrollbar.sliderColorB1 = 150;
    CWScrollbar.sliderColorR2 = 250;
    CWScrollbar.sliderColorG2 = 250;
    CWScrollbar.sliderColorB2 = 250;
    CWSYSTEM.CWScrollbar = CWScrollbar;
    CWScrollbar["__class"] = "CWSYSTEM.CWScrollbar";
})(CWSYSTEM || (CWSYSTEM = {}));
