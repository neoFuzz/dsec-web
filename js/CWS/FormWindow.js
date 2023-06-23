/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class FormWindow {
        constructor(title) {
            if (((typeof title === 'string') || title === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    if (this.window === undefined) {
                        this.window = null;
                    }
                    if (this.formWindowItems === undefined) {
                        this.formWindowItems = null;
                    }
                    if (this.formWindowKeys === undefined) {
                        this.formWindowKeys = null;
                    }
                    if (this.optionalObjectForMethodInvocation === undefined) {
                        this.optionalObjectForMethodInvocation = null;
                    }
                    if (this.submitMethod === undefined) {
                        this.submitMethod = null;
                    }
                    if (this.submitFailedMethod === undefined) {
                        this.submitFailedMethod = null;
                    }
                    if (this.cancelMethod === undefined) {
                        this.cancelMethod = null;
                    }
                    if (this.objectToInvokeSubmitMethodFrom === undefined) {
                        this.objectToInvokeSubmitMethodFrom = null;
                    }
                    if (this.objectToInvokeSubmitFailedMethodFrom === undefined) {
                        this.objectToInvokeSubmitFailedMethodFrom = null;
                    }
                    if (this.objectToInvokeCancelMethodFrom === undefined) {
                        this.objectToInvokeCancelMethodFrom = null;
                    }
                    if (this.__addCancelButton === undefined) {
                        this.__addCancelButton = false;
                    }
                    if (this.windowTitle === undefined) {
                        this.windowTitle = null;
                    }
                    if (this.submitLabel === undefined) {
                        this.submitLabel = null;
                    }
                    if (this.cancelLabel === undefined) {
                        this.cancelLabel = null;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    if (this.__centerWindow === undefined) {
                        this.__centerWindow = false;
                    }
                    if (this.windowColor === undefined) {
                        this.windowColor = null;
                    }
                    if (this.windowSecondaryColor === undefined) {
                        this.windowSecondaryColor = null;
                    }
                    if (this.textColor === undefined) {
                        this.textColor = null;
                    }
                    this.__addCancelButton = false;
                    this.__centerWindow = false;
                    this.formWindowItems = ({});
                    this.formWindowKeys = ([]);
                    this.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                    this.windowColor = new CWSYSTEM.CWColor(100, 100, 125, 255);
                    this.windowSecondaryColor = new CWSYSTEM.CWColor(120, 120, 140, 255);
                }
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.formWindowItems === undefined) {
                    this.formWindowItems = null;
                }
                if (this.formWindowKeys === undefined) {
                    this.formWindowKeys = null;
                }
                if (this.optionalObjectForMethodInvocation === undefined) {
                    this.optionalObjectForMethodInvocation = null;
                }
                if (this.submitMethod === undefined) {
                    this.submitMethod = null;
                }
                if (this.submitFailedMethod === undefined) {
                    this.submitFailedMethod = null;
                }
                if (this.cancelMethod === undefined) {
                    this.cancelMethod = null;
                }
                if (this.objectToInvokeSubmitMethodFrom === undefined) {
                    this.objectToInvokeSubmitMethodFrom = null;
                }
                if (this.objectToInvokeSubmitFailedMethodFrom === undefined) {
                    this.objectToInvokeSubmitFailedMethodFrom = null;
                }
                if (this.objectToInvokeCancelMethodFrom === undefined) {
                    this.objectToInvokeCancelMethodFrom = null;
                }
                if (this.__addCancelButton === undefined) {
                    this.__addCancelButton = false;
                }
                if (this.windowTitle === undefined) {
                    this.windowTitle = null;
                }
                if (this.submitLabel === undefined) {
                    this.submitLabel = null;
                }
                if (this.cancelLabel === undefined) {
                    this.cancelLabel = null;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.__centerWindow === undefined) {
                    this.__centerWindow = false;
                }
                if (this.windowColor === undefined) {
                    this.windowColor = null;
                }
                if (this.windowSecondaryColor === undefined) {
                    this.windowSecondaryColor = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                (() => {
                    this.windowTitle = title;
                    this.submitLabel = "Submit";
                    this.cancelLabel = "Cancel";
                })();
            } else if (title === undefined) {
                let __args = arguments;
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.formWindowItems === undefined) {
                    this.formWindowItems = null;
                }
                if (this.formWindowKeys === undefined) {
                    this.formWindowKeys = null;
                }
                if (this.optionalObjectForMethodInvocation === undefined) {
                    this.optionalObjectForMethodInvocation = null;
                }
                if (this.submitMethod === undefined) {
                    this.submitMethod = null;
                }
                if (this.submitFailedMethod === undefined) {
                    this.submitFailedMethod = null;
                }
                if (this.cancelMethod === undefined) {
                    this.cancelMethod = null;
                }
                if (this.objectToInvokeSubmitMethodFrom === undefined) {
                    this.objectToInvokeSubmitMethodFrom = null;
                }
                if (this.objectToInvokeSubmitFailedMethodFrom === undefined) {
                    this.objectToInvokeSubmitFailedMethodFrom = null;
                }
                if (this.objectToInvokeCancelMethodFrom === undefined) {
                    this.objectToInvokeCancelMethodFrom = null;
                }
                if (this.__addCancelButton === undefined) {
                    this.__addCancelButton = false;
                }
                if (this.windowTitle === undefined) {
                    this.windowTitle = null;
                }
                if (this.submitLabel === undefined) {
                    this.submitLabel = null;
                }
                if (this.cancelLabel === undefined) {
                    this.cancelLabel = null;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.__centerWindow === undefined) {
                    this.__centerWindow = false;
                }
                if (this.windowColor === undefined) {
                    this.windowColor = null;
                }
                if (this.windowSecondaryColor === undefined) {
                    this.windowSecondaryColor = null;
                }
                if (this.textColor === undefined) {
                    this.textColor = null;
                }
                this.__addCancelButton = false;
                this.__centerWindow = false;
                this.formWindowItems = ({});
                this.formWindowKeys = ([]);
                this.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                this.windowColor = new CWSYSTEM.CWColor(100, 100, 125, 255);
                this.windowSecondaryColor = new CWSYSTEM.CWColor(120, 120, 140, 255);
            } else
                throw new Error('invalid overload');
        }

        addInputBox(name) {
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, name, new dsector.FormWindowItem(dsector.FormWindowItem.INPUTBOX));
            /* add */
            (this.formWindowKeys.push(name) > 0);
        }

        addCheckBox(name, state) {
            const windowItem = (new dsector.FormWindowItem(dsector.FormWindowItem.CHECKBOX)).setBooleanValue(state);
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, name, windowItem);
            /* add */
            (this.formWindowKeys.push(name) > 0);
        }

        addText(name) {
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, name, new dsector.FormWindowItem(dsector.FormWindowItem.TEXT));
            /* add */
            (this.formWindowKeys.push(name) > 0);
        }

        addImage(name, color) {
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, name, new dsector.FormWindowItem(name, color));
            /* add */
            (this.formWindowKeys.push(name) > 0);
        }

        get(name) {
            return ((m, k) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        return m.entries[i].value;
                    }
                return null;
            })(this.formWindowItems, name);
        }

        setResponseMethods(parent, submitMethod, parent1, cancelMethod) {
            this.submitMethod = submitMethod;
            this.cancelMethod = cancelMethod;
            this.objectToInvokeSubmitMethodFrom = parent;
            this.objectToInvokeCancelMethodFrom = parent1;
        }

        setSecondaryMethodIfSubmitMethodFails(parent, failedMethod) {
            this.submitFailedMethod = failedMethod;
            this.objectToInvokeSubmitFailedMethodFrom = parent;
        }

        addCancelButton() {
            this.__addCancelButton = true;
        }

        setSubmitLabel(text) {
            this.submitLabel = text;
        }

        setCancelLabel(text) {
            this.cancelLabel = text;
        }

        centerWindow() {
            this.__centerWindow = true;
        }

        setWindowColor(color, secondaryColor) {
            this.windowColor = color;
            this.windowSecondaryColor = secondaryColor;
        }

        setTextColor(color) {
            this.textColor = color;
        }

        popup$() {
            this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(CWSYSTEM.Environment.mouseXLastClicked_$LI$(), CWSYSTEM.Environment.mouseYLastClicked_$LI$(), dsector.DSReference.virtualScreen.serif8_font, 14, 14, 15, 120, 12, 17, 5);
        }

        popup$gx$gy$f$my$x1$y1$w1$x2$h$w(gX, gY, font, marginY, x1, y1, width1, x2, height, width) {
            const textArea = new CWSYSTEM.CWTextArea(null, 0, "", 0, 0, 0, 0, font, "");
            const height1 = textArea.height();
            if (!this.isPoppedUp()) {
                let j = 0;
                const formWindowKeys1 = this.formWindowKeys;
                let index;
                let i;
                for (index = 0; index < /* size */ formWindowKeys1.length; ++index) {
                    const s = formWindowKeys1[index];
                    const windowItem = this.get(s);
                    if (windowItem.type === 0 || windowItem.type === 1) {
                        i = CWSYSTEM.CWFontTools.textLengthInPixels(s, font);
                        if (i > j) {
                            j = i;
                        }
                    }
                }
                index = j;
                if (j === 0) {
                    index = 80;
                }
                const pos = x1 * 2 + index + x2 + width1;
                const b1 = 0;
                let heightN = b1 + marginY;
                let tWidth;
                for (i = 0; i < /* size */ formWindowKeys1.length; ++i) {
                    const keys = formWindowKeys1[i];
                    const windowItem = this.get(keys);
                    if (windowItem.type !== 0 && windowItem.type !== 1) {
                        if (windowItem.type === 2) {
                            tWidth = index + x2 + width1;
                            heightN += CWSYSTEM.CWFontTools.heightOfParagraph(keys, font, tWidth, false);
                        } else if (windowItem.type === 3) {
                            heightN += windowItem.imageHeight;
                        }
                    } else {
                        heightN += height1;
                    }
                    if (i < /* size */ formWindowKeys1.length - 1) {
                        heightN += y1;
                    }
                }
                heightN += marginY;
                heightN += height;
                heightN += marginY;
                const formName = "FORM_" + ((Math.random() * 10000.0) | 0);
                if (this.__centerWindow) {
                    gX = ((CWSYSTEM.Global.screenResolutionX_$LI$() - pos) / 2 | 0);
                    gY = ((CWSYSTEM.Global.screenResolutionY_$LI$() - heightN) / 2 | 0);
                }
                this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(formName, 3, this.windowTitle, gX, gY, pos, heightN, true);
                this.window.titleVisible = this.windowTitle != null;
                this.window.ignoreWhenSavingAndRestoringEnvironment = true;
                this.window.changeBackgroundColor$color$color(this.windowColor, this.windowSecondaryColor);
                const b = 0;
                let y2 = b + marginY;
                let k;
                let x3;
                for (k = 0; k < /* size */ formWindowKeys1.length; ++k) {
                    {
                        const formKeys = formWindowKeys1[k];
                        const windowItem = this.get(formKeys);
                        if (windowItem.type !== 0 && windowItem.type !== 1) {
                            if (windowItem.type === 3) {
                                this.window.addImage("", x1, y2 + this.window.borderWidth + this.window.__titleHeight, formKeys, windowItem.color);
                                y2 += windowItem.imageHeight;
                                if (k < /* size */ formWindowKeys1.length - 1) {
                                    y2 += y1;
                                }
                            } else if (windowItem.type === 2) {
                                x3 = index + x2 + width1;
                                this.window.addTextBlock(formKeys, formKeys, x1, y2 + this.window.borderWidth + this.window.__titleHeight + 15, font, this.textColor, x3);
                                y2 += CWSYSTEM.CWFontTools.heightOfParagraph(formKeys, font, x3, false);
                                if (k < /* size */ formWindowKeys1.length - 1) {
                                    y2 += y1;
                                }
                            }
                        } else {
                            this.window.addTextBlock(formKeys, formKeys, x1, y2 + height1 + this.window.__titleHeight + this.window.borderWidth + 9, font, this.textColor, 999);
                            if (windowItem.type === 0) {
                                const textArea1 = this.window.addTextArea(formKeys, x1 + index + x2 + 2, y2, width1 + 2, 1, font, "");
                                textArea1.endMark = "";
                                if (k === 0) {
                                    textArea1.select(0, 0);
                                }
                                textArea1.objectContainingTextAreaChangedMethod = this;
                                if ( /* size */formWindowKeys1.length === 1) {
                                    textArea1.objectContainingTextAreaSubmittedMethod = this;
                                }
                            } else {
                                const checkBox = this.window.addCheckBox(formKeys, x1 + index + x2 + 1, y2 + 7, windowItem.booleanValue());
                                checkBox.objectContainingCheckBoxChangedMethod = this;
                            }
                            y2 += height1;
                            if (k < /* size */ formWindowKeys1.length - 1) {
                                y2 += y1;
                            }
                        }
                    }
                    ;
                }
                y2 += marginY;
                k = CWSYSTEM.CWFontTools.textLengthInPixels(this.submitLabel, font);
                tWidth = CWSYSTEM.CWFontTools.textLengthInPixels(this.cancelLabel, font);
                x3 = ((pos - 40 - k - tWidth) / 3 | 0);
                let button;
                if (this.__addCancelButton) {
                    const button1 = this.window.addButton$name$x$y$len$h$text$t$r(formName + "_SUBMIT", x3, y2 + width, k + 20, height, this.submitLabel, 9, 0);
                    try {
                        button1.onPressedMethod = /* getDeclaredMethod */ ((c, p) => {
                            if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                                return {owner: c, name: p, fn: c.prototype[p]};
                            else
                                return null;
                        })(this.constructor, "submit");
                        button1.onPressedObject = this;
                        button1.onPressedParameters = null;
                    } catch (e) {
                        console.info("Unable to obtain submit method in FormWindow.popup(..): " + e);
                    }
                    button = this.window.addButton$name$x$y$len$h$text$t$r(formName + "_CANCEL", x3 * 2 + 20 + k, y2 + width, tWidth + 20, height, this.cancelLabel, 9, 0);
                    try {
                        button.onPressedMethod = /* getDeclaredMethod */ ((c, p) => {
                            if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                                return {owner: c, name: p, fn: c.prototype[p]};
                            else
                                return null;
                        })(this.constructor, "cancel");
                        button.onPressedObject = this;
                        button.onPressedParameters = null;
                    } catch (e) {
                        console.info("Unable to obtain cancel method in FormWindow.popup(..): " + e);
                    }
                } else {
                    const posDiv = ((pos - k - 20) / 2 | 0);
                    button = this.window.addButton$name$x$y$len$h$text$t$r(formName + "_SUBMIT", posDiv, y2 + width, k + 20, height, this.submitLabel, 9, 0);
                    try {
                        button.onPressedMethod = /* getDeclaredMethod */ ((c, p) => {
                            if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                                return {owner: c, name: p, fn: c.prototype[p]};
                            else
                                return null;
                        })(this.constructor, "submit");
                        button.onPressedObject = this;
                        button.onPressedParameters = null;
                    } catch (e) {
                        console.info("Unable to obtain submit method in FormWindow.popup(..): " + e);
                    }
                }
            }
        }

        popup(gX, gY, font, marginY, x1, y1, width1, x2, height, width) {
            if (((typeof gX === 'number') || gX === null) && ((typeof gY === 'number') || gY === null) && ((font != null && font instanceof dsector.JCFont) || font === null) && ((typeof marginY === 'number') || marginY === null) && ((typeof x1 === 'number') || x1 === null) && ((typeof y1 === 'number') || y1 === null) && ((typeof width1 === 'number') || width1 === null) && ((typeof x2 === 'number') || x2 === null) && ((typeof height === 'number') || height === null) && ((typeof width === 'number') || width === null)) {
                return this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(gX, gY, font, marginY, x1, y1, width1, x2, height, width);
            } else if (gX === undefined && gY === undefined && font === undefined && marginY === undefined && x1 === undefined && y1 === undefined && width1 === undefined && x2 === undefined && height === undefined && width === undefined) {
                return this.popup$();
            } else
                throw new Error('invalid overload');
        }

        textAreaSubmitted(textArea) {
            this.submit();
        }

        submit() {
            const objects = [this];
            if (this.submitMethod != null) {
                try {
                    /* invoke */
                    this.submitMethod.fn.apply(this.objectToInvokeSubmitMethodFrom, [objects]);
                } catch (e) {
                    if (this.submitFailedMethod != null) {
                        this.submitFailed();
                    } else {
                        console.error("Error in FormWindow.submit(): " + e);
                    }
                }
            }
            this.destroy();
        }

        submitFailed() {
            const objects = [this];
            if (this.submitFailedMethod != null) {
                try {
                    /* invoke */
                    this.submitFailedMethod.fn.apply(this.objectToInvokeSubmitFailedMethodFrom, [objects]);
                } catch (e) {
                    console.error("Error in FormWindow.submitFailed(): " + e);
                }
            }
            this.destroy();
        }

        cancel() {
            if (this.cancelMethod != null) {
                try {
                    /* invoke */
                    this.cancelMethod.fn.apply(this.objectToInvokeCancelMethodFrom, [null]);
                } catch (e) {
                    console.error("Error in FormWindow.cancel(): " + e);
                }
            }
            this.destroy();
        }

        textAreaChanged(s, s1) {
            /* remove */
            ((m, k) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        return m.entries.splice(i, 1)[0];
                    }
            })(this.formWindowItems, s);
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, s, (new dsector.FormWindowItem(dsector.FormWindowItem.INPUTBOX)).setStringValue(s1));
        }

        checkBoxChanged(checkBox) {
            /* remove */
            ((m, k) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        return m.entries.splice(i, 1)[0];
                    }
            })(this.formWindowItems, checkBox.name);
            /* put */
            ((m, k, v) => {
                if (m.entries == null)
                    m.entries = [];
                for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    }
                m.entries.push({
                    key: k, value: v, getKey: function () {
                        return this.key;
                    }, getValue: function () {
                        return this.value;
                    }
                });
            })(this.formWindowItems, checkBox.name, (new dsector.FormWindowItem(dsector.FormWindowItem.CHECKBOX)).setBooleanValue(checkBox.selected$()));
        }

        isPoppedUp() {
            return this.window != null;
        }

        /** @private */
        destroy() {
            if (this.window != null) {
                this.window.destroy();
                this.window = null;
            }
        }
    }

    dsector.FormWindow = FormWindow;
    FormWindow["__class"] = "dsector.FormWindow";
})(dsector || (dsector = {}));
