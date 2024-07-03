/**/
(function (CWSYSTEM) {
    /**
     *
     * @class
     * @memberof CWSYSTEM
     */
    class CWWindowCollection {
        constructor(vs) {
            if (this.cwWindow === undefined) {
                this.cwWindow = null;
            }
            if (this.depthSortedSequence === undefined) {
                this.depthSortedSequence = new CWSYSTEM.IntegerArray(1);
            }
            if (this.rightClickPopupMenu === undefined) {
                this.rightClickPopupMenu = null;
            }
            if (this.virtualScreen === undefined) {
                this.virtualScreen = null;
            }
            if (this.__numberOfWindows === undefined) {
                this.__numberOfWindows = 0;
            }
            this.virtualScreen = vs;
            this.cwWindow = Array(CWWindowCollection.maxNumberOfWindows).fill(null);
            this.__numberOfWindows = 0;
        }

        numberOfWindows() {
            return this.__numberOfWindows;
        }

        getWindow$byName(name) {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (this.cwWindow[i].nameID === name) {
                    return this.cwWindow[i];
                }
            }
            return null;
        }

        getWindow(name) {
            if ((typeof name === 'string') || name === null) {
                return this.getWindow$byName(name);
            } else if ((typeof name === 'number') || name === null) {
                return this.getWindow$int(name);
            } else
                throw new Error('invalid overload');
        }

        /** @private */
        getWindowID(name) {
            for (let i = 0; i < this.__numberOfWindows; ++i) {

                if (this.cwWindow[i].nameID === name) {
                    return i;
                }
            }
            return -1;
        }

        getWindow$int(intID) {
            return this.cwWindow[intID];
        }

        addWindow$fullDefinition(minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h, visible) {
            if (this.__numberOfWindows > CWWindowCollection.numberOfWindowsBeforeWarningsAppear) {
                const message = "A large number of windows have appeared. The last window added was \'" + name + "\'.";
                CWSYSTEM.CWSReference.alertManager.messageQueued(message);
                console.error(message);
            }
            if (this.__numberOfWindows >= CWWindowCollection.maxNumberOfWindows) {
                return null;
            } else {
                const window = new CWSYSTEM.CWWindow(this.virtualScreen, minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h);
                this.cwWindow[this.__numberOfWindows] = window;
                ++this.__numberOfWindows;
                this.moveWindowToTopByName(name);
                window.windowVisible = visible;
                return window;
            }
        }

        addWindow(minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h, visible) {
            if (((typeof minW === 'number') || minW === null) && ((typeof minH === 'number') || minH === null) && ((typeof maxW === 'number') || maxW === null) && ((typeof maxH === 'number') || maxH === null) && ((typeof name === 'string') || name === null) && ((typeof style === 'number') || style === null) && ((typeof title === 'string') || title === null) && ((typeof xPos === 'number') || xPos === null) && ((typeof yPos === 'number') || yPos === null) && ((typeof w === 'number') || w === null) && ((typeof h === 'number') || h === null) && ((typeof visible === 'boolean') || visible === null)) {
                return this.addWindow$fullDefinition(minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h, visible);
            } else if (((typeof minW === 'string') || minW === null) && ((typeof minH === 'number') || minH === null) && ((typeof maxW === 'string') || maxW === null) && ((typeof maxH === 'number') || maxH === null) && ((typeof name === 'number') || name === null) && ((typeof style === 'number') || style === null) && ((typeof title === 'number') || title === null) && ((typeof xPos === 'boolean') || xPos === null) && yPos === undefined && w === undefined && h === undefined && visible === undefined) {
                return this.addWindow$name$style$title$x$y$w$h$v(minW, minH, maxW, maxH, name, style, title, xPos);
            } else
                throw new Error('invalid overload');
        }

        /** Adds a window with the specified properties to the CWWindowCollection.
         * @param {string} name - The name of the window.
         * @param {number} style - The numerical style of the window.
         * @param {string | null} title - The title of the window.
         * @param {number} xPos - The x-position of the window.
         * @param {number} yPos - The y-position of the window.
         * @param {number} w - The width of the window.
         * @param {number} h - The height of the window.
         * @param {boolean} visible - The visibility status of the window.
         */
        addWindow$name$style$title$x$y$w$h$v(name, style, title, xPos, yPos, w, h, visible) {
            if (this.__numberOfWindows > CWWindowCollection.numberOfWindowsBeforeWarningsAppear) {
                const message = "A large number of windows have appeared. The last window added was \'" + name + "\'.";
                CWSYSTEM.CWSReference.alertManager.messageQueued(message);
                console.error(message);
            }
            if (this.__numberOfWindows >= CWWindowCollection.maxNumberOfWindows) {
                return null;
            } else {
                const window = new CWSYSTEM.CWWindow(this.virtualScreen, w, h, w, h, name, style, title, xPos, yPos, w, h);
                this.cwWindow[this.__numberOfWindows] = window;
                ++this.__numberOfWindows;
                this.moveWindowToTopByName(name);
                window.windowVisible = visible;
                return window;
            }
        }

        destroyWindow(name) {
            const window = this.getWindow$byName(name);
            if (window != null) {
                if (CWSYSTEM.CWTextArea.textAreaSelected() != null && CWSYSTEM.CWTextArea.textAreaSelected().parent === window) {
                    CWSYSTEM.CWTextArea.deselectTextArea();
                }
                window.nameID = "TMP" + ((Math.random() * 9.9999999E7) | 0);
                window.toBeDestroyed = true;
                window.windowVisible = false;
                window.renderingRequired = true;
                CWSYSTEM.Environment.screenHasChanged = true;
                if (window.rightClickPopupMenu != null) {
                    window.rightClickPopupMenu.destroy();
                }
            }
        }

        destroyTerminallyIllWindows() {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (this.cwWindow[i].toBeDestroyed) {
                    this.deleteWindow(i);
                    --i;
                }
            }
        }

        /** @private */
        deleteWindow(idNumber) {
            if (idNumber >= 0 && idNumber < this.__numberOfWindows) {
                for (let i = idNumber; i < this.__numberOfWindows - 1; ++i) {
                    this.cwWindow[i] = this.cwWindow[i + 1];
                }
                --this.__numberOfWindows;
                this.generateDepthSortedSequence();
                return true;
            } else {
                CWSYSTEM.Debug.println("Error: Window " + idNumber + " cannot be deleted");
                return false;
            }
        }

        drawWindows() {
            this.updateTextBoxCursors();
            let check = true;
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (!this.cwWindow[i].updated) {
                    this.cwWindow[i].updated = true;
                    this.cwWindow[i].renderingRequired = true;
                    if (!this.cwWindow[i].drawWindow()) {
                        check = false;
                    }
                }
            }
            return check;
        }

        /** @private */
        updateTextBoxCursors() {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                for (let j = 0; j < this.cwWindow[i].numberOfInputBoxes; ++j) {
                    this.cwWindow[i].inputBox[j].checkCursor();
                }
            }
        }

        windowThatMouseIsOver(x, y) {
            let z = -1;
            let z2 = -1;
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (x > this.cwWindow[i].xPosition - this.cwWindow[i].borderWidth && x < this.cwWindow[i].xPosition + this.cwWindow[i].w + this.cwWindow[i].borderWidth && y > this.cwWindow[i].yPosition - this.cwWindow[i].borderWidth - this.cwWindow[i].__titleHeight && y < this.cwWindow[i].yPosition + this.cwWindow[i].h + this.cwWindow[i].borderWidth && (this.cwWindow[i].depth < z || z === -1) && this.cwWindow[i].windowVisible) {
                    z2 = i;
                    z = this.cwWindow[i].depth;
                }
            }
            return z2;
        }

        moveWindowToTopByName(targetWindow) {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (this.cwWindow[i].nameID === targetWindow) {
                    this.moveWindowToTop$int(i);
                }
            }
        }

        moveWindowToTop(targetWindow) {
            if (((typeof targetWindow === 'string') || targetWindow === null)) {
                return this.moveWindowToTopByName(targetWindow);
            } else if (((typeof targetWindow === 'number') || targetWindow === null)) {
                return this.moveWindowToTop$int(targetWindow);
            } else
                throw new Error('invalid overload');
        }

        moveWindowToTop$int(iD) {
            let i;
            for (i = 0; i < this.__numberOfWindows; ++i) {
                ++this.cwWindow[i].depth;
            }
            this.cwWindow[iD].depth = 0;
            this.cwWindow[iD].renderingRequired = true;
            for (i = 0; i < this.__numberOfWindows; ++i) {
                if (this.cwWindow[i].floating) {
                    this.cwWindow[i].depth = -2;
                    this.cwWindow[i].renderingRequired = true;
                }
            }
            CWSYSTEM.Environment.screenHasChanged = true;
            this.generateDepthSortedSequence();
        }

        deactivateTextAreasInWindowsOtherThan(window) {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                if (this.cwWindow[i] !== window) {
                    for (let j = 0; j < this.cwWindow[j].numberOfTextAreas; ++j) {
                        this.cwWindow[j].textArea[j].deselect();
                    }
                }
            }
        }

        buttonThatMouseIsOver(x, y) {
            const item = this.windowThatMouseIsOver(x, y);
            return item !== -1 ? this.cwWindow[item].buttonThatMouseIsOver(x, y) : null;
        }

        inputBoxThatMouseIsOver(x, y) {
            const item = this.windowThatMouseIsOver(x, y);
            return item !== -1 ? this.cwWindow[item].inputBoxThatMouseIsOver(x, y) : null;
        }

        textAreaThatMouseIsOver(x, y) {
            const item = this.windowThatMouseIsOver(x, y);
            return item !== -1 ? this.cwWindow[item].textAreaThatMouseIsOver(x, y) : null;
        }

        checkBoxThatMouseIsOver(x, y) {
            const item = this.windowThatMouseIsOver(x, y);
            return item !== -1 ? this.cwWindow[item].checkBoxThatMouseIsOver(x, y) : null;
        }

        pulldownThatMouseIsOver(x, y) {
            const item = this.windowThatMouseIsOver(x, y);
            return item !== -1 ? this.cwWindow[item].pulldownThatMouseIsOver(x, y) : null;
        }

        generateDepthSortedSequence() {
            const integerArray = new CWSYSTEM.IntegerArray(this.__numberOfWindows);
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                integerArray.add(-this.getWindow$int(i).depth);
            }
            this.depthSortedSequence = integerArray.sortedSequence();
        }

        ensureAllWindowsWithinVirtualScreen() {
            for (let i = 0; i < this.__numberOfWindows; ++i) {
                const window = this.cwWindow[i];
                const w = window.w;
                const h = window.h;
                const xPosition = window.xPosition;
                const yPosition = window.yPosition;
                const borderWidth = window.borderWidth;
                const titleHeight = window.titleHeight();
                if (w < window.minWidth) {
                    window.w = window.minWidth;
                } else {
                    window.w = Math.min(w, CWSYSTEM.Global.screenResolutionX_$LI$() - 2 * borderWidth);
                }
                if (h < window.minHeight) {
                    window.h = window.minHeight;
                } else {
                    window.h = Math.min(h, CWSYSTEM.Global.screenResolutionY_$LI$() - 2 * borderWidth - titleHeight);
                }
                if (xPosition <= borderWidth) {
                    window.xPosition = borderWidth;
                } else if (xPosition + window.w + borderWidth >= CWSYSTEM.Global.screenResolutionX_$LI$()) {
                    window.xPosition = CWSYSTEM.Global.screenResolutionX_$LI$() - window.w - borderWidth;
                } else {
                    window.xPosition = xPosition;
                }
                if (yPosition - borderWidth - titleHeight <= this.virtualScreen.topInset) {
                    window.yPosition = this.virtualScreen.topInset + borderWidth + titleHeight;
                } else if (yPosition + window.h + borderWidth + titleHeight >= CWSYSTEM.Global.screenResolutionY_$LI$()) {
                    window.yPosition = CWSYSTEM.Global.screenResolutionY_$LI$() - window.h - borderWidth - titleHeight;
                } else {
                    window.yPosition = yPosition;
                }
            }
        }
    }

    CWWindowCollection.maxNumberOfWindows = 100;
    CWWindowCollection.numberOfWindowsBeforeWarningsAppear = 75;
    CWSYSTEM.CWWindowCollection = CWWindowCollection;
    CWWindowCollection["__class"] = "CWSYSTEM.CWWindowCollection";
})(CWSYSTEM || (CWSYSTEM = {}));
