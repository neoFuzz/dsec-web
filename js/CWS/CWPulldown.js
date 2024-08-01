(function (CWSYSTEM) {
    /**
     * Represents a pulldown combo box GUI element.
     *
     * @property {number} status - The status of the pulldown (0 for closed, 1 for open).
     * @property {number} CLOSED - Constant representing the closed state of the pulldown.
     * @property {number} OPEN - Constant representing the open state of the pulldown.
     * @property {number} selectedOption - The index of the currently selected option in the pulldown.
     * @property {Array} options - The options to be displayed in the pulldown.
     * @property {Function|null} optionalMethodToExecuteWhenNewValueSelected - An optional method to execute when a new value is selected.
     * @property {Object|null} objectHavingOptionalMethodToExecuteWhenNewValueSelected - The object containing the optional method to execute when a new value is selected.
     * @property {Object|null} objectContainingPulldownChangedMethod - The object containing the method to execute when the pulldown state changes.
     * @property {Object|null} generalPurposeObject - A general-purpose object for storing any purpose.
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
    class CWPulldown {
        /**
         * Creates an instance of CWPulldown.
         *
         * @param {Object} parent - The parent object.
         * @param {string|null} name - The name of the pulldown.
         * @param {Array} opts - The options for the pulldown.
         * @param {number} x - The x-coordinate of the pulldown.
         * @param {number} y - The y-coordinate of the pulldown.
         * @param {number} width - The width of the pulldown.
         * @param {number} height - The height of the pulldown.
         */
        constructor(parent, name, opts, x, y, width, height) {
            this.parent = parent || null;
            this.name = name || null;
            this.overlay = null;
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
            this.popupWindowItemHeight = height || 0;
            this.titleBoxFont = CWSYSTEM.CWSReference.virtualScreen.serif8_font;
            this.popupWindowFont = CWSYSTEM.CWSReference.virtualScreen.serif8_font;
            this.status = 0;
            this.CLOSED = 0;
            this.OPEN = 1;
            this.selectedOption = 0;
            this.options = opts || null;
            this.optionalMethodToExecuteWhenNewValueSelected = null;
            this.objectHavingOptionalMethodToExecuteWhenNewValueSelected = null;
            this.objectContainingPulldownChangedMethod = null;
            this.generalPurposeObject = null;
        }

        /**
         * Gets the box color.
         *
         * @returns {CWSYSTEM.CWColor} The box color.
         */
        static boxColor_$LI$() {
            if (CWPulldown.boxColor == null) {
                CWPulldown.boxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWPulldown.boxColor;
        }

        /**
         * Gets the text color.
         *
         * @returns {CWSYSTEM.CWColor} The text color.
         */
        static textColor_$LI$() {
            if (CWPulldown.textColor == null) {
                CWPulldown.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__black());
            }
            return CWPulldown.textColor;
        }

        /**
         * Gets the selected value of the pulldown.
         *
         * @returns {*} The selected value.
         */
        selectedValue() {
            return this.options[this.selectedOption].value;
        }

        /**
         * Draws the pulldown menu.
         */
        draw() {
            const vs = this.parent.v;
            const intWidth = this.parent.borderWidth + this.x;
            const titleWitdth = this.parent.borderWidth + this.parent.__titleHeight + this.y;
            vs.setColor$intCWColor(CWPulldown.textColor_$LI$());
            vs.CWDrawRectangle(this.parent.window, intWidth, titleWitdth, this.width, this.height);
            vs.CWDrawFilledRectangle(this.parent.window, intWidth + 1, titleWitdth + 1,
                this.width - 2, this.height - 2, CWPulldown.boxColor_$LI$());
            if (isNaN(this.selectedOption)) {
                this.selectedOption = 0;
            }
            let spName = this.selectedOption < 0 ? this.options[0].name : this.options[this.selectedOption].name;
            spName = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(spName, "\n", "");
            CWSYSTEM.CWFontTools.renderText(this.parent.window, spName, intWidth + 4,
                titleWitdth + (this.height / 2 | 0) + 6, this.titleBoxFont, CWPulldown.textColor_$LI$(), 999);
            const cwp = [[[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                [255, 255, 255], [255, 255, 255], [255, 255, 255], [85, 85, 85]],
                [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255],
                    [255, 255, 255], [255, 255, 255], [153, 153, 153], [85, 85, 85]],
                [[255, 255, 255], [255, 255, 255], [215, 215, 215], [215, 215, 215], [125, 125, 125],
                    [215, 215, 215], [215, 215, 215], [153, 153, 153], [85, 85, 85]],
                [[255, 255, 255], [255, 255, 255], [215, 215, 215], [125, 125, 125], [0, 0, 0], [125,
                    125, 125], [215, 215, 215], [153, 153, 153], [85, 85, 85]],
                [[255, 255, 255], [255, 255, 255], [125, 125, 125], [0, 0, 0], [0, 0, 0], [0, 0, 0],
                    [125, 125, 125], [153, 153, 153], [85, 85, 85]],
                [[255, 255, 255], [125, 125, 125], [55, 55, 55], [55, 55, 55], [55, 55, 55], [55, 55, 55],
                    [55, 55, 55], [123, 123, 123], [85, 85, 85]],
                [[255, 255, 255], [225, 225, 225], [225, 225, 225], [225, 225, 225], [225, 225, 225],
                    [225, 225, 225], [225, 225, 225], [153, 153, 153], [85, 85, 85]],
                [[255, 255, 255], [173, 173, 173], [173, 173, 173], [173, 173, 173], [173, 173, 173],
                    [173, 173, 173], [173, 173, 173], [133, 133, 133], [85, 85, 85]],
                [[85, 85, 85], [85, 85, 85], [85, 85, 85], [85, 85, 85], [85, 85, 85], [85, 85, 85],
                    [85, 85, 85], [85, 85, 85], [85, 85, 85]]];
            let i;
            for (i = 0; i < 9; ++i) {
                for (let j = 0; j < 9; ++j) {
                    vs.setColorVS$r$g$b$a(cwp[i][j][0], cwp[i][j][1], cwp[i][j][2], 255);
                    vs.CWDrawPixel(this.parent.window, intWidth + j + this.width - 11,
                        titleWitdth + (this.height / 2 | 0) - i + 3);
                }
            }
        }

        /**
         * Handles the mouse pressed event for the pulldown menu.
         */
        mousePressedOverClosedSectionOrOverlayBorder() {
            if (CWSYSTEM.Environment.activePulldownMenu$() != null &&
                CWSYSTEM.Environment.activePulldownMenu$().parent !== this.parent) {
                CWSYSTEM.CWSReference.gui.destroyWindow("overlay");
                CWSYSTEM.Environment.activePulldownMenu = null;
            }
            if (this.status === this.CLOSED) {
                this.status = this.OPEN;
                CWSYSTEM.Environment.activePulldownMenu = this;
                let moveY = this.parent.yPosition + this.y + this.height + 1;
                let cSize = this.options.length * (this.popupWindowItemHeight - 1) + 3;
                let i;
                if (cSize > CWSYSTEM.Global.screenResolutionY_$LI$() - 20) {
                    i = cSize - CWSYSTEM.Global.screenResolutionY_$LI$() + 25;
                    const j = (i / (this.height - 1) | 0) + 1;
                    for (let k = 0; k < j; ++k) {
                        this.options.splice(this.options.length - 1, 1)[0];
                    }
                    cSize = this.options.length * (this.popupWindowItemHeight - 1) + 3;
                }
                if (moveY + cSize > CWSYSTEM.Global.screenResolutionY_$LI$() - 10) {
                    moveY = CWSYSTEM.Global.screenResolutionY_$LI$() - cSize - 10;
                }
                this.overlay = CWSYSTEM.CWSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                    "overlay", 3, "", this.parent.xPosition + this.x +
                    (this.parent.borderWidth / 2 | 0), moveY, this.width - this.parent.borderWidth, cSize, true);
                this.overlay.titleVisible = false;
                this.overlay.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(255, 255, 255, 220));
                this.overlay.ignoreWhenSavingAndRestoringEnvironment = true;
                for (i = 0; i < this.options.length; ++i) {
                    let name = this.options[i].name;
                    name = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(name, "\n", "");
                    const overlayStr = "overlay_" + i;
                    this.overlay.addButton(overlayStr, 1, 1 + (this.popupWindowItemHeight - 1) * i,
                        this.width - 8, this.popupWindowItemHeight - 1, name,
                        CWSYSTEM.CWButton.SQUARE_TEXT_BUTTON, CWSYSTEM.CWButton.PRESSED);
                    this.overlay.getButton("overlay_" + i).intProperty = i;
                    this.overlay.getButton("overlay_" + i).font = this.popupWindowFont;
                }
            } else {
                CWSYSTEM.CWSReference.gui.destroyWindow("overlay");
                this.status = this.CLOSED;
                CWSYSTEM.Environment.activePulldownMenu = null;
            }
        }

        /**
         * Handles the option selected event for the pulldown menu.
         *
         * @param b the option that was clicked
         */
        optionSelected(b) {
            this.selectedOption = b.intProperty;
            CWSYSTEM.CWSReference.gui.destroyWindow("overlay");
            this.status = this.CLOSED;
            CWSYSTEM.Environment.activePulldownMenu = null;
            this.parent.updated = false;
            const objects1 = [this.selectedOption];
            if (this.optionalMethodToExecuteWhenNewValueSelected != null) {
                try {
                    this.optionalMethodToExecuteWhenNewValueSelected.fn.apply(
                        this.objectHavingOptionalMethodToExecuteWhenNewValueSelected, [objects1]);
                } catch (e) {
                    CWSYSTEM.Debug.println("Problem invoking method in CWPulldown.optionSelected(..)");
                }
            }
            if (this.objectContainingPulldownChangedMethod != null) {
                try {
                    const declaredMethod = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingPulldownChangedMethod.constructor, "pulldownChanged");
                    const objects = [this];
                    declaredMethod.fn.apply(this.objectContainingPulldownChangedMethod, [objects]);
                } catch (e) {
                    CWSYSTEM.Debug.error("A problem occured in CWPulldown.optionSelected()for pulldown \'" +
                        this.name + "\': " + e);
                }
            }
        }

        /**
         * Set up some default parameters.
         *
         * @param {number} c - selected option.
         * @param {number} i - an integer.
         */
        setDefaults(c, i) {
            this.selectedOption = c;
            this.objectContainingPulldownChangedMethod = this;
            this.generalPurposeObject = i + 1;
            this.popupWindowFont = CWSYSTEM.CWSReference.virtualScreen.jcsmallfixed_font;
            this.popupWindowItemHeight = 12;
        }
    }

    CWSYSTEM.CWPulldown = CWPulldown;
    CWPulldown["__class"] = "CWSYSTEM.CWPulldown";
})(CWSYSTEM);
