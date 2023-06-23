/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWCheckBox {
        constructor(parent, name, x, y, selected) {
            if (((parent != null && parent instanceof CWSYSTEM.CWWindow) || parent === null) &&
                ((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof selected === 'boolean') || selected === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    if (this.parentWindow === undefined) {
                        this.parentWindow = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.style === undefined) {
                        this.style = 0;
                    }
                    if (this.x === undefined) {
                        this.x = 0;
                    }
                    if (this.y === undefined) {
                        this.y = 0;
                    }
                    if (this.length === undefined) {
                        this.length = 0;
                    }
                    if (this.height === undefined) {
                        this.height = 0;
                    }
                    if (this.__selected === undefined) {
                        this.__selected = false;
                    }
                    if (this.radioID === undefined) {
                        this.radioID = 0;
                    }
                    if (this.intValue === undefined) {
                        this.intValue = 0;
                    }
                    if (this.clickableBorderWidth === undefined) {
                        this.clickableBorderWidth = 0;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    if (this.objectContainingCheckBoxChangedMethod === undefined) {
                        this.objectContainingCheckBoxChangedMethod = null;
                    }
                    this.style = CWCheckBox.SMALL_STYLE;
                    this.length = 7;
                    this.height = 7;
                    this.clickableBorderWidth = 4;
                    this.__selected = false;
                }
                if (this.parentWindow === undefined) {
                    this.parentWindow = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.style === undefined) {
                    this.style = 0;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.__selected === undefined) {
                    this.__selected = false;
                }
                if (this.radioID === undefined) {
                    this.radioID = 0;
                }
                if (this.intValue === undefined) {
                    this.intValue = 0;
                }
                if (this.clickableBorderWidth === undefined) {
                    this.clickableBorderWidth = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingCheckBoxChangedMethod === undefined) {
                    this.objectContainingCheckBoxChangedMethod = null;
                }
                (() => {
                    this.parentWindow = parent;
                    this.name = name;
                    this.x = x;
                    this.y = y;
                    this.__selected = selected;
                    this.radioID = -1;
                })();
            } else if (parent === undefined && name === undefined && x === undefined && y === undefined && selected === undefined) {
                let __args = arguments;
                if (this.parentWindow === undefined) {
                    this.parentWindow = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.style === undefined) {
                    this.style = 0;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.length === undefined) {
                    this.length = 0;
                }
                if (this.height === undefined) {
                    this.height = 0;
                }
                if (this.__selected === undefined) {
                    this.__selected = false;
                }
                if (this.radioID === undefined) {
                    this.radioID = 0;
                }
                if (this.intValue === undefined) {
                    this.intValue = 0;
                }
                if (this.clickableBorderWidth === undefined) {
                    this.clickableBorderWidth = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.objectContainingCheckBoxChangedMethod === undefined) {
                    this.objectContainingCheckBoxChangedMethod = null;
                }
                this.style = CWCheckBox.SMALL_STYLE;
                this.length = 7;
                this.height = 7;
                this.clickableBorderWidth = 4;
                this.__selected = false;
            } else
                throw new Error('invalid overload');
        }

        static bitmapUnselected_$LI$() {
            if (CWCheckBox.bitmapUnselected == null) {
                CWCheckBox.bitmapUnselected = [[0, 0, 4, 2, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 4, 0, 4, 0, 0, 0]];
            }
            return CWCheckBox.bitmapUnselected;
        }

        static bitmapSelected_$LI$() {
            if (CWCheckBox.bitmapSelected == null) {
                CWCheckBox.bitmapSelected = [[0, 0, 4, 2, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 3, 1, 3, 0, 0, 0, 4], [1, 2, 0, 3, 1, 1, 1, 3, 0, 0, 4], [1, 2, 0, 1, 1, 1, 1, 1, 0, 0, 4], [1, 3, 0, 3, 1, 1, 1, 3, 0, 0, 4], [2, 3, 0, 0, 3, 1, 3, 0, 0, 0, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0]];
            }
            return CWCheckBox.bitmapSelected;
        }

        static largerBitmapUnselected_$LI$() {
            if (CWCheckBox.largerBitmapUnselected == null) {
                CWCheckBox.largerBitmapUnselected = [[0, 0, 4, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0]];
            }
            return CWCheckBox.largerBitmapUnselected;
        }

        static largerBitmapSelected_$LI$() {
            if (CWCheckBox.largerBitmapSelected == null) {
                CWCheckBox.largerBitmapSelected = [[0, 0, 4, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0], [0, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 0], [4, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 4, 0], [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [1, 2, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 4], [1, 2, 0, 0, 3, 1, 1, 1, 3, 0, 0, 0, 4], [1, 2, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0], [1, 2, 0, 0, 3, 1, 1, 1, 3, 0, 0, 0, 4], [1, 3, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 0], [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0], [0, 0, 0, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0]];
            }
            return CWCheckBox.largerBitmapSelected;
        }

        setStyle(style) {
            this.style = style;
            switch ((style)) {
                default:
                case 0 /* SMALL_STYLE */
                :
                    this.length = 7;
                    this.height = 7;
                    this.clickableBorderWidth = 4;
                    break;
                case 1 /* ROUND_STYLE */
                :
                    this.length = 11;
                    this.height = 11;
                    this.clickableBorderWidth = 5;
                    break;
                case 2 /* LARGER_ROUND_STYLE */
                :
                    this.length = 13;
                    this.height = 13;
                    this.clickableBorderWidth = 10;
                    break;
            }
        }

        /** @private */
        informSuppliedObjectAboutNewCheckBoxValue() {
            if (this.objectContainingCheckBoxChangedMethod != null) {
                const classes = [this.constructor];
                try {
                    const changed = ((c, p) => {
                        if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                            return {owner: c, name: p, fn: c.prototype[p]};
                        else
                            return null;
                    })(this.objectContainingCheckBoxChangedMethod.constructor, "checkBoxChanged");
                    const objects = [this];
                    /* invoke */
                    changed.fn.apply(this.objectContainingCheckBoxChangedMethod, [objects]);
                } catch (e) {
                    console.error("A problem occured in CWWindow.informSuppliedObjectAboutNewCheckBoxValue()for check box \'" + this.name + "\': " + e);
                }
            }
        }

        invertSelectedState() {
            this.__selected = !this.__selected;
            this.parentWindow.updated = false;
            this.informSuppliedObjectAboutNewCheckBoxValue();
        }

        selected$() {
            return this.__selected;
        }

        selected$boolean(selected) {
            this.__selected = selected;
            this.informSuppliedObjectAboutNewCheckBoxValue();
            this.parentWindow.updated = false;
            if (this.isRadioButton() && this.__selected) {
                this.deselectRadioCheckboxesInSameFamily();
            }
        }

        selected(selected) {
            if (((typeof selected === 'boolean') || selected === null)) {
                return this.selected$boolean(selected);
            } else if (selected === undefined) {
                return this.selected$();
            } else
                throw new Error('invalid overload');
        }

        isRadioButton() {
            return this.radioID !== -1;
        }

        deselectRadioCheckboxesInSameFamily() {
            if (this.__selected) {
                for (let i = 0; i < this.parentWindow.numberOfCheckBoxes; ++i) {
                    {
                        const checkBox = this.parentWindow.checkBox[i];
                        if (checkBox.radioID === this.radioID) {
                            checkBox.__selected = false;
                        }
                    }
                    ;
                }
                this.__selected = true;
            }
        }

        draw() {
            const vs = this.parentWindow.v;
            if (this.style === CWCheckBox.SMALL_STYLE) {
                vs.setColor$intCWColor(this.parentWindow.titleTextColor);
                vs.CWDrawRectangle(this.parentWindow.window, this.parentWindow.borderWidth + this.x, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y, this.length, this.height);
                vs.CWDrawFilledRectangle(this.parentWindow.window, this.parentWindow.borderWidth + this.x + 1, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + 1, this.length - 2, this.height - 2, this.parentWindow.checkBoxColor);
                if (this.__selected) {
                    vs.setColor$intCWColor(this.parentWindow.titleTextColor);
                    vs.CWLine(this.parentWindow.window, this.parentWindow.borderWidth + this.x + 1, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + 1, this.parentWindow.borderWidth + this.x + this.length - 2, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + this.height - 2, true);
                    vs.CWLine(this.parentWindow.window, this.parentWindow.borderWidth + this.x + this.length - 2, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + 1, this.parentWindow.borderWidth + this.x + 1, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + this.height - 2, true);
                }
            } else if (this.style === CWCheckBox.ROUND_STYLE || this.style === CWCheckBox.LARGER_ROUND_STYLE) {
                let intArr;
                if (this.style === CWCheckBox.LARGER_ROUND_STYLE) {
                    if (this.__selected) {
                        intArr = CWCheckBox.largerBitmapSelected_$LI$();
                    } else {
                        intArr = CWCheckBox.largerBitmapUnselected_$LI$();
                    }
                } else if (this.__selected) {
                    intArr = CWCheckBox.bitmapSelected_$LI$();
                } else {
                    intArr = CWCheckBox.bitmapUnselected_$LI$();
                }
                for (let i = 0; i < intArr.length; ++i) {
                    for (let j = 0; j < intArr[0].length; ++j) {
                        const point = intArr[i][j];
                        let color;
                        if (point === 1) {
                            color = CWSYSTEM.CWColor.black_$LI$();
                        } else if (point === 2) {
                            color = CWSYSTEM.CWColor.darkGrey_$LI$();
                        } else if (point === 3) {
                            color = CWSYSTEM.CWColor.grey_$LI$();
                        } else {
                            if (point !== 4) {
                                continue;
                            }
                            color = CWSYSTEM.CWColor.lightGrey_$LI$();
                        }
                        vs.setColor$intCWColor(color);
                        vs.CWDrawPixel(this.parentWindow.window, this.parentWindow.borderWidth + this.x + j - 1, this.parentWindow.borderWidth + this.parentWindow.__titleHeight + this.y + i - 1);
                    }
                }
            }
        }
    }

    CWCheckBox.SMALL_STYLE = 0;
    CWCheckBox.ROUND_STYLE = 1;
    CWCheckBox.LARGER_ROUND_STYLE = 2;
    CWCheckBox.MUCH_LARGER_ROUND_STYLE = 3;
    CWSYSTEM.CWCheckBox = CWCheckBox;
    CWCheckBox["__class"] = "CWSYSTEM.CWCheckBox";
})(CWSYSTEM || (CWSYSTEM = {}));
