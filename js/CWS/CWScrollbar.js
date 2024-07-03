/* */
(function (CWSYSTEM) {
    /**
     * Represents a scrollbar component within a window.
     * This class provides methods to handle the scrollbar's behavior,
     * including drawing the scrollbar, handling mouse events, and updating
     * the scrollbar's position and size based on the window's content.
     * @class
     * @memberof CWSYSTEM
     */
    class CWScrollbar {
        /**
         * Constructs a CWScrollbar instance.
         * @param {Object} window - The window object this scrollbar is associated with.
         */
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

        /**
         * Returns the appropriate arrow up bitmap.
         * @returns {*|number[][][]}
         */
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

        /**
         * Returns the appropriate arrow down bitmap.
         * @returns {*|number[][][]}
         */
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

        /**
         * Draws the scrollbar to the screen.
         */
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

        /**
         * Checks if the mouse is over the sliding bar of the scrollbar.
         *
         * The function calculates the position and size of the slider and determines if the provided
         * x and y coordinates are within the boundaries of the sliding bar of the scrollbar.
         *
         * @param {number} x - The x-coordinate of the mouse position.
         * @param {number} y - The y-coordinate of the mouse position.
         */
        mouseIsOverSlidingBar(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            const slider = Math.fround(h * this.sliderSize);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y >= this.window.yPosition + CWScrollbar.buttonHeight + size &&
                y <= this.window.yPosition + CWScrollbar.buttonHeight + size + slider;
        }

        /**
         * Checks if the mouse is over the upper space of the scrollbar.
         *
         * The function calculates the position of the slider and determines if the provided
         * x and y coordinates are within the upper space of the scrollbar, which is above the slider.
         *
         * @param {number} x - The x-coordinate of the mouse position.
         * @param {number} y - The y-coordinate of the mouse position.
         * @returns {boolean} True if the mouse is over the upper space of the scrollbar, false otherwise.
         * @method
         */
        mouseIsOverScrollbarUpperSpace(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w && y > this.window.yPosition + CWScrollbar.buttonHeight &&
                y < this.window.yPosition + CWScrollbar.buttonHeight + size;
        }

        /**
         * Checks if the mouse is over the lower space of the scrollbar.
         *
         * The function calculates the position and size of the slider and determines if the provided
         * x and y coordinates are within the lower space of the scrollbar, which is below the slider.
         *
         * @param {number} x - The x-coordinate of the mouse position.
         * @param {number} y - The y-coordinate of the mouse position.
         * @returns {boolean} True if the mouse is over the lower space of the scrollbar, false otherwise.
         * @method
         */
        mouseIsOverScrollbarLowerSpace(x, y) {
            const h = this.window.h - 26;
            const size = Math.fround((this.positionPercent * (1.0 - this.sliderSize)) * h);
            const sliderSize = Math.fround(h * this.sliderSize);
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y > this.window.yPosition + CWScrollbar.buttonHeight + size + sliderSize &&
                y < this.window.yPosition + CWScrollbar.buttonHeight + h;
        }

        /**
         * Checks if the mouse is over the upper button of the scrollbar.
         *
         * The function determines if the provided x and y coordinates are within the
         * boundaries of the upper button of the scrollbar.
         *
         * @param {number} x - The x-coordinate of the mouse position.
         * @param {number} y - The y-coordinate of the mouse position.
         * @returns {boolean} True if the mouse is over the upper button of the scrollbar, false otherwise.
         * @method
         */
        mouseIsOverScrollbarUpperButton(x, y) {
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w && y >= this.window.yPosition &&
                y <= this.window.yPosition + CWScrollbar.buttonHeight;
        }

        /**
         * Checks if the mouse is over the lower button of the scrollbar.
         *
         * The function determines if the provided x and y coordinates are within the
         * boundaries of the lower button of the scrollbar.
         *
         * @param {number} x - The x-coordinate of the mouse position.
         * @param {number} y - The y-coordinate of the mouse position.
         * @returns {boolean} True if the mouse is over the lower button of the scrollbar, false otherwise.
         * @method
         */
        mouseIsOverScrollbarLowerButton(x, y) {
            return x >= this.window.xPosition + this.window.w - CWScrollbar.width &&
                x <= this.window.xPosition + this.window.w &&
                y >= this.window.yPosition + this.window.h - CWScrollbar.buttonHeight &&
                y <= this.window.yPosition + this.window.h;
        }

        /**
         * Moves the scrollbar up slowly by adjusting its position percentage.
         *
         * The position percentage is decreased based on the height of the window,
         * the time elapsed since the last frame, and the length of the scrollable page.
         *
         * If the resulting position percentage exceeds 1.0, it is capped at 1.0.
         * If it is less than 0.0, it is set to 0.0.
         *
         * After updating the position percentage, it marks the window as not updated.
         *
         * @method
         */
        moveUpSlowly() {
            this.positionPercent -= Math.fround(((0.002 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod$()) / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        /**
         * Moves the scrollbar down slowly by adjusting its position percentage.
         *
         * The position percentage is increased based on the height of the window,
         * the time elapsed since the last frame, and the length of the scrollable page.
         *
         * If the resulting position percentage exceeds 1.0, it is capped at 1.0.
         * If it is less than 0.0, it is set to 0.0.
         *
         * After updating the position percentage, it marks the window as not updated.
         *
         * @method
         */
        moveDownSlowly() {
            this.positionPercent += Math.fround((0.002 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        /**
         * Moves the object up quickly by adjusting its position percentage.
         * The position percentage is decreased based on the height of the window,
         * the time elapsed since the last frame, and the length of the scrollable page.
         *
         * If the resulting position percentage exceeds 1.0, it is capped at 1.0.
         * If it is less than 0.0, it is set to 0.0.
         *
         * After updating the position percentage, it marks the window as not updated.
         *
         * @method
         */
        moveUpFast() {
            this.positionPercent -= Math.fround((0.01 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        /**
         * Moves the object down quickly by adjusting its position percentage.
         * The position percentage is increased based on the height of the window,
         * the time elapsed since the last frame, and the length of the scrollable page.
         *
         * If the resulting position percentage exceeds 1.0, it is capped at 1.0.
         * If it is less than 0.0, it is set to 0.0.
         *
         * After updating the position percentage, it marks the window as not updated.
         *
         * @method
         */
        moveDownFast() {
            this.positionPercent += Math.fround((0.01 * this.window.h) *
                CWSYSTEM.Environment.lastFramePeriod$() / this.window.scrollablePage.length);
            if (this.positionPercent > 1.0) {
                this.positionPercent = 1.0;
            }
            if (this.positionPercent < 0.0) {
                this.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        /**
         * Calculates the offset scrolled in pixels based on the current position percentage.
         *
         * If the window height is greater than or equal to the length of the scrollable page,
         * the position offset is set to 0. Otherwise, the position offset is calculated as
         * the product of the position percentage and the difference between the length of
         * the scrollable page and the window height, rounded to the nearest integer.
         *
         * @returns {number} The offset scrolled in pixels.
         * @method
         */
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

        /**
         * Renders the scrollable page within the window.
         *
         * If the scrollable page has not been initialized, an error message is logged.
         * Otherwise, it calculates the offset scrolled in pixels and copies the relevant
         * portion of the scrollable page to the window's display buffer.
         *
         * The function ensures that the amount of data copied does not exceed the window's
         * height or the length of the scrollable page. It also adjusts the width of the data
         * to be copied if it is smaller than the window's width.
         *
         * After rendering the scrollable page, it updates the size of the slider.
         *
         * @method
         */
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

        /**
         * Updates the size of the scrollbar slider.
         *
         * If the scrollable page has not been initialized, an error message is logged.
         * Otherwise, it calculates the size of the slider based on the ratio of the window
         * height to the length of the scrollable page.
         *
         * If the window height is greater than or equal to the length of the scrollable page,
         * the slider size is set to 1.0. Otherwise, the slider size is calculated as the
         * ratio of the window height to the length of the scrollable page.
         *
         * @method
         */
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

        /**
         * Checks if the window height is larger than or equal to the length of the scrollable content.
         *
         * If the scrollable page has not been initialized, it returns false.
         * Otherwise, it compares the window height to the length of the scrollable page and
         * returns true if the window height is greater than or equal to the length of the scrollable page.
         *
         * @returns {boolean} True if the window height is larger than or equal to the length of the scrollable content, false otherwise.
         * @method
         */
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
