/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWPulldown {
        constructor(parent, name, options, x, y, width, height) {
            if (this.parent === undefined) {
                this.parent = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.overlay === undefined) {
                this.overlay = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.width === undefined) {
                this.width = 0;
            }
            if (this.height === undefined) {
                this.height = 0;
            }
            if (this.popupWindowItemHeight === undefined) {
                this.popupWindowItemHeight = 0;
            }
            if (this.titleBoxFont === undefined) {
                this.titleBoxFont = null;
            }
            if (this.popupWindowFont === undefined) {
                this.popupWindowFont = null;
            }
            if (this.status === undefined) {
                this.status = 0;
            }
            this.CLOSED = 0;
            this.OPEN = 1;
            if (this.selectedOption === undefined) {
                this.selectedOption = 0;
            }
            if (this.options === undefined) {
                this.options = null;
            }
            if (this.optionalMethodToExecuteWhenNewValueSelected === undefined) {
                this.optionalMethodToExecuteWhenNewValueSelected = null;
            }
            if (this.objectHavingOptionalMethodToExecuteWhenNewValueSelected === undefined) {
                this.objectHavingOptionalMethodToExecuteWhenNewValueSelected = null;
            }
            if (this.objectContainingPulldownChangedMethod === undefined) {
                this.objectContainingPulldownChangedMethod = null;
            }
            if (this.generalPurposeObject === undefined) {
                this.generalPurposeObject = null;
            }
            this.parent = parent;
            this.name = name;
            this.overlay = null;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.popupWindowItemHeight = height;
            this.titleBoxFont = dsector.DSReference.virtualScreen.serif8_font;
            this.popupWindowFont = dsector.DSReference.virtualScreen.serif8_font;
            this.options = options;
            this.status = 0;
            this.selectedOption = 0;
        }

        static boxColor_$LI$() {
            if (CWPulldown.boxColor == null) {
                CWPulldown.boxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWPulldown.boxColor;
        }

        static textColor_$LI$() {
            if (CWPulldown.textColor == null) {
                CWPulldown.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$());
            }
            return CWPulldown.textColor;
        }

        selectedValue() {
            return this.options[this.selectedOption].value;
        }

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

        mousePressedOverClosedSectionOrOverlayBorder() {
            if (CWSYSTEM.Environment.activePulldownMenu_$LI$() != null &&
                CWSYSTEM.Environment.activePulldownMenu_$LI$().parent !== this.parent) {
                dsector.DSReference.gui.destroyWindow("overlay");
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
                this.overlay = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                    "overlay", 3, "", this.parent.xPosition + this.x +
                    (this.parent.borderWidth / 2 | 0), moveY, this.width - this.parent.borderWidth, cSize, true);
                this.overlay.titleVisible = false;
                this.overlay.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(255, 255, 255, 220));
                this.overlay.ignoreWhenSavingAndRestoringEnvironment = true;
                for (i = 0; i < this.options.length; ++i) {
                    let name = this.options[i].name;
                    name = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(name, "\n", "");
                    const overlayStr = "overlay_" + i;
                    this.overlay.addButton$name$x$y$len$h$text$t$r(overlayStr, 1,
                        1 + (this.popupWindowItemHeight - 1) * i, this.width - 8,
                        this.popupWindowItemHeight - 1, name, 10, 1);
                    this.overlay.getButton("overlay_" + i).intProperty = i;
                    this.overlay.getButton("overlay_" + i).font = this.popupWindowFont;
                }
            } else {
                dsector.DSReference.gui.destroyWindow("overlay");
                this.status = this.CLOSED;
                CWSYSTEM.Environment.activePulldownMenu = null;
            }
        }

        optionSelected(button) {
            this.selectedOption = button.intProperty;
            dsector.DSReference.gui.destroyWindow("overlay");
            this.status = this.CLOSED;
            CWSYSTEM.Environment.activePulldownMenu = null;
            this.parent.updated = false;
            const objects1 = [this.selectedOption];
            if (this.optionalMethodToExecuteWhenNewValueSelected != null) {
                try {
                    this.optionalMethodToExecuteWhenNewValueSelected.fn.apply(
                        this.objectHavingOptionalMethodToExecuteWhenNewValueSelected, [objects1]);
                } catch (e) {
                    console.info("Problem invoking method in CWPulldown.optionSelected(..)");
                }
            }
            if (this.objectContainingPulldownChangedMethod != null) {
                const classes = [this.constructor];
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
                    console.error("A problem occured in CWPulldown.optionSelected()for pulldown \'" +
                        this.name + "\': " + e);
                }
            }
        }
    }

    CWSYSTEM.CWPulldown = CWPulldown;
    CWPulldown["__class"] = "CWSYSTEM.CWPulldown";
})(CWSYSTEM || (CWSYSTEM = {}));
