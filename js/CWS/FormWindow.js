var dsector;
(function (dsector) {
    class FormWindow {
        constructor(title) {
            this.window = null;
            this.formWindowItems = new Map();
            this.formWindowKeys = [];
            this.optionalObjectForMethodInvocation = null;
            this.submitMethod = null;
            this.submitFailedMethod = null;
            this.cancelMethod = null;
            this.objectToInvokeSubmitMethodFrom = null;
            this.objectToInvokeSubmitFailedMethodFrom = null;
            this.objectToInvokeCancelMethodFrom = null;
            this.__addCancelButton = false;
            this.generalPurposeObject = null;
            this.__centerWindow = false;
            this.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            this.windowColor = new CWSYSTEM.CWColor(100, 100, 125, 255);
            this.windowSecondaryColor = new CWSYSTEM.CWColor(120, 120, 140, 255);

            if (typeof title === 'string') {
                this.windowTitle = title;
                this.submitLabel = 'Submit';
                this.cancelLabel = 'Cancel';
            } else if (title === undefined || title === null) {
                this.windowTitle = null;
                this.submitLabel = null;
                this.cancelLabel = null;
            } else {
                throw new Error('invalid overload');
            }
        }


        addInputBox(name) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(dsector.FormWindowItem.INPUTBOX));
            this.formWindowKeys.push(name);
        }

        addCheckBox(name, state) {
            const windowItem = (new dsector.FormWindowItem(
                dsector.FormWindowItem.CHECKBOX)).setBooleanValue(state);
            this.formWindowItems.set(name, windowItem);
            this.formWindowKeys.push(name);
        }

        addText(name) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(dsector.FormWindowItem.TEXT));
            this.formWindowKeys.push(name);
        }

        addImage(name, color) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(name, color));
            this.formWindowKeys.push(name);
        }

        get(name) {
            return this.formWindowItems.get(name);
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
            this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(CWSYSTEM.Environment.mouseXLastClicked_$LI$(),
                CWSYSTEM.Environment.mouseYLastClicked_$LI$(), CWSYSTEM.CWSReference.virtualScreen.serif8_font,
                14, 14, 15, 120, 12, 17, 5);
        }

        popup$gx$gy$f$my$x1$y1$w1$x2$h$w(gX, gY, font, marginY, x1, y1, width1, x2, height, width) {
            const textArea = new CWSYSTEM.CWTextArea(null, 0, "",
                0, 0, 0, 0, font, "");
            const height1 = textArea.height();
            if (!this.isPoppedUp()) {
                let j = 0;
                const formWindowKeys1 = this.formWindowKeys;
                let index;
                let i;
                for (index = 0; index < formWindowKeys1.length; ++index) {
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
                for (i = 0; i < formWindowKeys1.length; ++i) {
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
                    if (i < formWindowKeys1.length - 1) {
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
                this.window = CWSYSTEM.CWSReference.gui.addWindow$name$style$title$x$y$w$h$v(formName, 3, this.windowTitle, gX, gY, pos, heightN, true);
                this.window.titleVisible = this.windowTitle != null;
                this.window.ignoreWhenSavingAndRestoringEnvironment = true;
                this.window.changeBackgroundColor$color$color(this.windowColor, this.windowSecondaryColor);
                const b = 0;
                let y2 = b + marginY;
                let k;
                let x3;
                for (k = 0; k < formWindowKeys1.length; ++k) {
                    const formKeys = formWindowKeys1[k];
                    const windowItem = this.get(formKeys);
                    if (windowItem.type !== 0 && windowItem.type !== 1) {
                        if (windowItem.type === 3) {
                            this.window.addImage("", x1, y2 + this.window.borderWidth + this.window.__titleHeight,
                                formKeys, windowItem.color);
                            y2 += windowItem.imageHeight;
                            if (k < formWindowKeys1.length - 1) {
                                y2 += y1;
                            }
                        } else if (windowItem.type === 2) {
                            x3 = index + x2 + width1;
                            this.window.addTextBlock(formKeys, formKeys, x1, y2 + this.window.borderWidth +
                                this.window.__titleHeight + 15, font, this.textColor, x3);
                            y2 += CWSYSTEM.CWFontTools.heightOfParagraph(formKeys, font, x3, false);
                            if (k < formWindowKeys1.length - 1) {
                                y2 += y1;
                            }
                        }
                    } else {
                        this.window.addTextBlock(formKeys, formKeys, x1, y2 + height1 + this.window.__titleHeight +
                            this.window.borderWidth + 9, font, this.textColor, 999);
                        if (windowItem.type === 0) {
                            const textArea1 = this.window.addTextArea(formKeys, x1 + index + x2 + 2, y2,
                                width1 + 2, 1, font, "");
                            textArea1.endMark = "";
                            if (k === 0) {
                                textArea1.select(0, 0);
                            }
                            textArea1.objectContainingTextAreaChangedMethod = this;
                            if (formWindowKeys1.length === 1) {
                                textArea1.objectContainingTextAreaSubmittedMethod = this;
                            }
                        } else {
                            const checkBox = this.window.addCheckBox(formKeys, x1 + index + x2 + 1, y2 + 7,
                                windowItem.booleanValue());
                            checkBox.objectContainingCheckBoxChangedMethod = this;
                        }
                        y2 += height1;
                        if (k < formWindowKeys1.length - 1) {
                            y2 += y1;
                        }
                    }
                }
                y2 += marginY;
                k = CWSYSTEM.CWFontTools.textLengthInPixels(this.submitLabel, font);
                tWidth = CWSYSTEM.CWFontTools.textLengthInPixels(this.cancelLabel, font);
                x3 = ((pos - 40 - k - tWidth) / 3 | 0);
                let button;
                if (this.__addCancelButton) {
                    const button1 = this.window.addButton$name$x$y$len$h$text$t$r(formName + "_SUBMIT", x3,
                        y2 + width, k + 20, height, this.submitLabel, 9, 0);
                    try {
                        button1.onPressedMethod = ((c, p) => {
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
                        button.onPressedMethod = ((c, p) => {
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
                        button.onPressedMethod = ((c, p) => {
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
            if (arguments.length === 0) {
                return this.popup$();
            } else if (arguments.length === 10) {
                return this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(gX, gY, font, marginY, x1, y1, width1, x2, height, width);
            } else {
                throw new Error('invalid overload');
            }
        }

        textAreaSubmitted(textArea) {
            this.submit();
        }

        submit() {
            const objects = [this];
            if (this.submitMethod != null) {
                try {
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
                    this.cancelMethod.fn.apply(this.objectToInvokeCancelMethodFrom, [null]);
                } catch (e) {
                    console.error("Error in FormWindow.cancel(): " + e);
                }
            }
            this.destroy();
        }

        textAreaChanged(s, s1) {
            this.formWindowItems.delete(s);
            this.formWindowItems.set(s, (new dsector.FormWindowItem(
                dsector.FormWindowItem.INPUTBOX)).setStringValue(s1));
        }

        checkBoxChanged(checkBox) {
            this.formWindowItems.delete(checkBox.name);
            this.formWindowItems.set(checkBox.name, (new dsector.FormWindowItem(
                dsector.FormWindowItem.CHECKBOX)).setBooleanValue(checkBox.selected$()));
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
