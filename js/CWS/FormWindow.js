(function (dsector) {
    /**
     * FormWindow class for creating interactive form windows in a GUI environment.
     *
     * This class allows for the creation of customizable form windows with various
     * input types such as text boxes, checkboxes, and images. It handles form
     * submission, cancellation, and provides methods for adding and manipulating
     * form elements.
     *
     * @property {CWSYSTEM.CWWindow} window - The window object containing the form.
     * @property {Map<string, FormWindowItem>} formWindowItems - Map of form items.
     * @property {string[]} formWindowKeys - Array of form item keys.
     * @property {Function} submitMethod - Method to be called on form submission.
     * @property {Function} cancelMethod - Method to be called on form cancellation.
     * @property {Object} objectToInvokeSubmitMethodFrom - Object to invoke the submit method from.
     * @property {Object} objectToInvokeCancelMethodFrom - Object to invoke the cancel method from.
     * @property {boolean} __addCancelButton - Flag to indicate if a cancel button should be added.
     * @property {CWSYSTEM.CWColor} textColor - Text color for the form window.
     * @property {CWSYSTEM.CWColor} windowColor - Background color for the form window.
     * @property {CWSYSTEM.CWColor} windowSecondaryColor - Secondary background color for the form window.
     * @property {string} windowTitle - Title of the form window.
     * @property {string} submitLabel - Label for the submit button.
     * @property {string} cancelLabel - Label for the cancel button.
     * @property {Object} generalPurposeObject - General purpose object for method invocation.
     *
     * @example
     * const form = new FormWindow("User Details");
     * form.addInputBox("name");
     * form.addCheckBox("subscribe", false);
     * form.popup();
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
    class FormWindow {
        /**
         * Constructs a new FormWindow instance.
         *
         * @param {string} title - The title of the form window.
         */
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
            this.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
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

        /**
         * Adds an input box to the form window.
         *
         * @param {string} name - The name of the input box.
         */
        addInputBox(name) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(dsector.FormWindowItem.INPUTBOX));
            this.formWindowKeys.push(name);
        }

        /**
         * Adds a checkbox to the form window.
         *
         * @param {string} name - The name of the checkbox.
         * @param {boolean} state - The initial state of the checkbox.
         */
        addCheckBox(name, state) {
            const windowItem = (new dsector.FormWindowItem(
                dsector.FormWindowItem.CHECKBOX)).setBooleanValue(state);
            this.formWindowItems.set(name, windowItem);
            this.formWindowKeys.push(name);
        }

        /**
         * Adds a text area to the form window.
         *
         * @param {string} name - The name of the text area.
         */
        addText(name) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(dsector.FormWindowItem.TEXT));
            this.formWindowKeys.push(name);
        }

        /**
         * Adds an image to the form window.
         *
         * @param {string} name - The name of the image.
         * @param {CWSYSTEM.CWColor} color - The color of the image.
         */
        addImage(name, color) {
            this.formWindowItems.set(name, new dsector.FormWindowItem(name, color));
            this.formWindowKeys.push(name);
        }

        /**
         * Retrieves a form item by its name.
         *
         * @param {string} name - The name of the form item.
         * @returns {CWSYSTEM.FormWindowItem}
         * @throws {Error} If the form item is not found.
         */
        get(name) {
            return this.formWindowItems.get(name);
        }

        /**
         * Sets the response methods for the form window.
         *
         * @param {Object} parent - The parent object for the submit method.
         * @param {Function} submitMethod - The submit method to be called.
         * @param {Object} parent1 - The parent object for the cancel method.
         * @param {Function} cancelMethod - The cancel method to be called.
         * @throws {Error} If the submit method or cancel method is invalid.
         */
        setResponseMethods(parent, submitMethod, parent1, cancelMethod) {
            this.submitMethod = submitMethod;
            this.cancelMethod = cancelMethod;
            this.objectToInvokeSubmitMethodFrom = parent;
            this.objectToInvokeCancelMethodFrom = parent1;
        }

        /**
         * Sets the secondary method to be called if the submit method fails.
         * This method can be used to handle form validation or error handling.
         *
         * @param {Object} parent - The parent object for the submit failed method.
         * @param {Function} failedMethod - The submit failed method to be called.
         */
        setSecondaryMethodIfSubmitMethodFails(parent, failedMethod) {
            this.submitFailedMethod = failedMethod;
            this.objectToInvokeSubmitFailedMethodFrom = parent;
        }

        /**
         * Adds a cancel button to the form window.
         * This button will be added only if the `addCancelButton` method is called.
         */
        addCancelButton() {
            this.__addCancelButton = true;
        }

        /**
         * Sets the labels for the submit and cancel buttons.
         *
         * @param {string} text - The text for the submit button.
         */
        setSubmitLabel(text) {
            this.submitLabel = text;
        }

        /**
         * Sets the label for the cancel button.
         * This button will be added only if the `addCancelButton` method is called.
         *
         * @param {string} text - The text for the cancel button.
         */
        setCancelLabel(text) {
            this.cancelLabel = text;
        }

        /**
         * Centers the form window on the screen.
         * This method should be called before calling the `popup` method.
         */
        centerWindow() {
            this.__centerWindow = true;
        }

        /**
         * Sets the window colors.
         *
         * @param {CWSYSTEM.CWColor} color - The main color of the window.
         * @param {CWSYSTEM.CWColor} secondaryColor - The secondary color of the window.
         */
        setWindowColor(color, secondaryColor) {
            this.windowColor = color;
            this.windowSecondaryColor = secondaryColor;
        }

        /**
         * Sets the text color for the form window.
         *
         * @param {CWSYSTEM.CWColor} color - The text color.
         */
        setTextColor(color) {
            this.textColor = color;
        }

        /**
         * Pops up the form window at the current mouse position.
         * This method should be called after setting up the form window elements.
         */
        popup$() {
            this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(CWSYSTEM.Environment.mouseXLastClicked$(),
                CWSYSTEM.Environment.mouseYLastClicked$(), CWSYSTEM.CWSReference.virtualScreen.serif8_font,
                14, 14, 15, 120, 12, 17, 5);
        }

        /**
         * Pops up the form window at the specified position.
         * This method should be called after setting up the form window elements.
         *
         * @param {number} gX - The global x-position.
         * @param {number} gY - The global y-position.
         * @param {CWSYSTEM.CWFont} font - The font to be used.
         * @param {number} marginY - The margin for the y-axis.
         * @param {number} x1 - The x-offset for the first column.
         * @param {number} y1 - The y-offset for the second column.
         * @param {number} width1 - The width of the first column.
         * @param {number} x2 - The x-offset for the third column.
         * @param {number} height - The height of the form window.
         * @param {number} width - The width of the form window.
         */
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
                    const button1 = this.window.addButton(formName + "_SUBMIT", x3, y2 + width,
                        k + 20, height, this.submitLabel,
                        CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
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
                    button = this.window.addButton(formName + "_CANCEL", x3 * 2 + 20 + k, y2 + width,
                        tWidth + 20, height, this.cancelLabel,
                        CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
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
                    button = this.window.addButton(formName + "_SUBMIT", posDiv, y2 + width,
                        k + 20, height, this.submitLabel,
                        CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
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

        /**
         * Pops up the form window at the specified position.
         * This method should be called after setting up the form window elements.
         * Overloaded method to provide flexibility in method retrieval based on available parameters.
         *
         * @param {number} gX - The global x-position.
         * @param {number} gY - The global y-position.
         * @param {CWSYSTEM.CWFont} font - The font to be used.
         * @param {number} marginY - The margin for the y-axis.
         * @param {number} x1 - The x-offset for the first column.
         * @param {number} y1 - The y-offset for the second column.
         * @param {number} width1 - The width of the first column.
         * @param {number} x2 - The x-offset for the third column.
         * @param {number} height - The height of the form window.
         * @param {number} width - The width of the form window.
         */
        popup(gX, gY, font, marginY, x1, y1, width1, x2, height, width) {
            if (arguments.length === 0) {
                return this.popup$();
            } else if (arguments.length === 10) {
                return this.popup$gx$gy$f$my$x1$y1$w1$x2$h$w(gX, gY, font, marginY, x1, y1, width1, x2, height, width);
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Called when the text area is submitted.
         *
         * @param {CWSYSTEM.CWTextArea} textArea - The text area that was submitted.
         */
        textAreaSubmitted(textArea) {
            this.submit();
        }

        /**
         * Submits the form window. This method should be overridden to provide custom submission logic.
         */
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

        /**
         * Called when the submission fails. This method should be overridden to provide custom failure logic.
         * If not overridden, the form window will be destroyed after submission fails.
         */
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

        /**
         * Cancels the form window. This method should be overridden to provide custom cancellation logic.
         * If not overridden, the form window will be destroyed after cancellation.
         */
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

        /**
         * Called when the text area is changed.
         *
         * @param {string} id - The identifier of the text area.
         * @param {string} str - The old text value.
         */
        textAreaChanged(id, str) {
            this.formWindowItems.delete(id);
            this.formWindowItems.set(id, (new dsector.FormWindowItem(
                dsector.FormWindowItem.INPUTBOX)).setStringValue(str));
        }

        /**
         * Called when the checkbox is changed.
         *
         * @param {CWSYSTEM.CWCheckBox} checkBox - The checkbox that was changed.
         */
        checkBoxChanged(checkBox) {
            this.formWindowItems.delete(checkBox.name);
            this.formWindowItems.set(checkBox.name, (new dsector.FormWindowItem(
                dsector.FormWindowItem.CHECKBOX)).setBooleanValue(checkBox.selected$()));
        }

        /**
         * Checks if the form window is currently popped up.
         *
         * @returns {boolean} true if the form window is popped up, false otherwise.
         */
        isPoppedUp() {
            return this.window != null;
        }

        /**
         * Destroys the form window and releases any resources it might be holding.
         *
         * @private
         */
        destroy() {
            if (this.window != null) {
                this.window.destroy();
                this.window = null;
            }
        }
    }

    dsector.FormWindow = FormWindow;
    FormWindow["__class"] = "dsector.FormWindow";
})(dsector);