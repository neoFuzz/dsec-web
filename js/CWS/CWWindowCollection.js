import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * A class for managing a collection of GUI windows.
 *
 * @property {CWSYSTEM.CWWindow[]} cwWindow - An array of CWWindow objects.
 * @property {CWSYSTEM.IntegerArray} depthSortedSequence - An array of window IDs sorted by depth.
 * @property {CWSYSTEM.CWPopupMenu} rightClickPopupMenu - The right-click popup menu.
 * @property {CWSYSTEM.VirtualScreen} virtualScreen - The virtual screen object.
 * @property {number} __numberOfWindows - The number of windows currently managed by the CWWindowCollection object.
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
export class CWWindowCollection {
    /**
     * Constructor for creating a new CWWindowCollection object.
     *
     * @param {CWSYSTEM.VirtualScreen} vs - The virtual screen object to associate with the window collection.
     */
    constructor(vs) {
        this.depthSortedSequence = new CWSYSTEM.IntegerArray(1);
        this.rightClickPopupMenu = null;
        this.__numberOfWindows = 0;
        this.virtualScreen = vs;
        this.cwWindow = Array(CWWindowCollection.maxNumberOfWindows).fill(null);
        this.__numberOfWindows = 0;
    }

    /**
     * Returns the number of windows currently managed by the CWWindowCollection object.
     *
     * @returns {number} the number of windows stored
     */
    numberOfWindows() {
        return this.__numberOfWindows;
    }

    /**
     * Retrieves a window by its name.
     *
     * @param {string} name The name of the window to retrieve.
     * @returns {CWSYSTEM.CWWindow|null} The window with the specified name, or null if not found.
     * @throws {Error} If the provided name is not a string or null.
     */
    getWindow$byName(name) {
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            if (this.cwWindow[i].nameID === name) {
                return this.cwWindow[i];
            }
        }
        return null;
    }

    /**
     * Retrieves a window by its ID.
     *
     * @param {number} name The ID of the window to retrieve.
     * @returns {CWSYSTEM.CWWindow|null} The window with the specified ID, or null if not found.
     * @throws {Error} If the provided name is not a string or null.
     */
    getWindow(name) {
        if ((typeof name === 'string') || name === null) {
            return this.getWindow$byName(name);
        } else if ((typeof name === 'number') || name === null) {
            return this.getWindow$int(name);
        } else
            throw new Error('invalid overload');
    }

    /**
     * Retrieves the ID of a window by its name.
     *
     * @param {string} name The name of the window to retrieve the ID for.
     * @returns {number} The ID of the window with the specified name, or -1 if not found.
     * @throws {Error} If the provided name is not a string or null.
     * @private
     */
    getWindowID(name) {
        for (let i = 0; i < this.__numberOfWindows; ++i) {

            if (this.cwWindow[i].nameID === name) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Retrieves a window by its ID.
     *
     * @param {number} intID The ID of the window to retrieve.
     * @returns {CWSYSTEM.CWWindow} The window with the specified ID.
     * @throws {Error} If the provided ID is not a number or null.
     * @private
     */
    getWindow$int(intID) {
        return this.cwWindow[intID];
    }

    /**
     * Adds a new window to the collection.
     *
     * @param {number} minW The minimum width of the window.
     * @param {number} minH The minimum height of the window.
     * @param {number} maxW The maximum width of the window.
     * @param {number} maxH The maximum height of the window.
     * @param {string} name The name of the window.
     * @param {CWWindowStyles} style The style of the window.
     * @param {string} title The title of the window.
     * @param {number} xPos The x-coordinate of the window.
     * @param {number} yPos The y-coordinate of the window.
     * @param {number} w The width of the window.
     * @param {number} h The height of the window.
     * @param {boolean} visible Whether the window is visible or not.
     * @returns {CWSYSTEM.CWWindow|null} The newly added window, or null if the maximum number of windows has been reached.
     */
    addWindow$fullDefinition(minW, minH, maxW, maxH, name, style,
                             title, xPos, yPos, w, h, visible) {
        if (this.__numberOfWindows > CWWindowCollection.numberOfWindowsBeforeWarningsAppear) {
            const message = "A large number of windows have appeared. The last window added was '" + name + "'.";
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

    /**
     * Adds a new window to the collection.
     *
     * @param {string} name The name of the window.
     * @param {number} minW The minimum width of the window.
     * @param {number} minH The minimum height of the window.
     * @param {number} maxW The maximum width of the window.
     * @param {number} maxH The maximum height of the window.
     * @param {CWWindowStyles} style The style of the window.
     * @param {string} title The title of the window.
     * @param {number} xPos The x-coordinate of the window.
     * @param {number} yPos The y-coordinate of the window.
     * @param {number} w The width of the window.
     * @param {number} h The height of the window.
     * @param {boolean} vis Whether the window is visible or not.
     * @returns {CWSYSTEM.CWWindow|null} The newly added window, or null if the maximum number of windows has been reached.
     */
    addWindow(minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h, vis) {
        if (this.isFullDefinition(...arguments)) {
            return this.addWindow$fullDefinition({
                minW,
                minH,
                maxW,
                maxH,
                name,
                style,
                title,
                xPos,
                yPos,
                w,
                h,
                vis
            });
        } else if (this.isPartialDefinition(...arguments)) {
            return this.addWindow$name$style$title$x$y$w$h$v({minW, minH, maxW, maxH, name, style, title, xPos});
        } else {
            throw new Error('Invalid arguments for addWindow');
        }
    }

    isFullDefinition(minW, minH, maxW, maxH, name, style, title, xPos, yPos, w, h, visible) {
        return (
            this.isNumberOrNull(minW) &&
            this.isNumberOrNull(minH) &&
            this.isNumberOrNull(maxW) &&
            this.isNumberOrNull(maxH) &&
            this.isStringOrNull(name) &&
            this.isNumberOrNull(style) &&
            this.isStringOrNull(title) &&
            this.isNumberOrNull(xPos) &&
            this.isNumberOrNull(yPos) &&
            this.isNumberOrNull(w) &&
            this.isNumberOrNull(h) &&
            this.isBooleanOrNull(visible)
        );
    }

    isPartialDefinition(name, style, title, x, y, w, h, visible) {
        return (
            this.isStringOrNull(name) &&
            this.isNumberOrNull(style) &&
            this.isStringOrNull(title) &&
            this.isNumberOrNull(x) &&
            this.isNumberOrNull(y) &&
            this.isNumberOrNull(w) &&
            this.isNumberOrNull(h) &&
            this.isBooleanOrNull(visible)
        );
    }

    isNumberOrNull(value) {
        return typeof value === 'number' || value === null;
    }

    isStringOrNull(value) {
        return typeof value === 'string' || value === null;
    }

    isBooleanOrNull(value) {
        return typeof value === 'boolean' || value === null;
    }

    /**
     * Adds a window with the specified properties to the CWWindowCollection.
     *
     * @param {string} name - The name of the window.
     * @param {number|CWWindowStyles} style - The numerical style of the window.
     * @param {string | null} title - The title of the window.
     * @param {number} xPos - The x-position of the window.
     * @param {number} yPos - The y-position of the window.
     * @param {number} w - The width of the window.
     * @param {number} h - The height of the window.
     * @param {boolean} visible - The visibility status of the window.
     * @returns {CWSYSTEM.CWWindow|null} The newly added window, or null if the maximum number of windows has been reached.
     */
    addWindow$name$style$title$x$y$w$h$v(name, style, title, xPos, yPos, w, h, visible) {
        if (this.__numberOfWindows > CWWindowCollection.numberOfWindowsBeforeWarningsAppear) {
            const message = "A large number of windows have appeared. The last window added was '" + name + "'.";
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

    /**
     * Destroys a window by its name.
     *
     * @param {string} name The name of the window to destroy.
     */
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

    /**
     * Destroys all windows that are marked as terminated.
     *
     * @private
     */
    destroyTerminallyIllWindows() {
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            if (this.cwWindow[i].toBeDestroyed) {
                this.deleteWindow(i);
                --i;
            }
        }
    }

    /**
     * Deletes a window by its ID.
     *
     * @param {number} idNumber The ID of the window to delete.
     * @returns {boolean} True if the window was successfully deleted, false otherwise.
     * @private
     */
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

    /**
     * Draws all windows in the collection.
     *
     * @returns {boolean} True if all windows were successfully drawn, false otherwise.
     */
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

    /**
     * Updates the cursor positions of all text boxes in the windows.
     *
     * @private
     */
    updateTextBoxCursors() {
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            for (let j = 0; j < this.cwWindow[i].numberOfInputBoxes; ++j) {
                this.cwWindow[i].inputBox[j].checkCursor();
            }
        }
    }

    /**
     * Returns the ID of the window that the mouse is over.
     *
     * @param {number} x The x-coordinate of the mouse pointer.
     * @param {number} y The y-coordinate of the mouse pointer.
     * @returns {number} The ID of the window that the mouse is over, or -1 if none is found.
     */
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

    /**
     * Moves a window to the top of the depth sorted sequence.
     *
     * @param {string} targetWindow The name of the window to move to the top.
     */
    moveWindowToTopByName(targetWindow) {
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            if (this.cwWindow[i].nameID === targetWindow) {
                this.moveWindowToTop$int(i);
            }
        }
    }

    /**
     * Moves a window to the top of the depth sorted sequence.
     *
     * @param {string|CWSYSTEM.CWWindow} targetWindow The window to bring to the top.
     */
    moveWindowToTop(targetWindow) {
        if (((typeof targetWindow === 'string') || targetWindow === null)) {
            return this.moveWindowToTopByName(targetWindow);
        } else if ((typeof targetWindow === 'number')) {
            return this.moveWindowToTop$int(targetWindow);
        } else
            throw new Error('invalid overload');
    }

    /**
     * Moves a window to the top of the depth sorted sequence.
     *
     * @param {number} iD The ID of the window to move to the top.
     */
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

    /**
     * Deactivates all text areas in windows other than the specified window.
     *
     * @param {CWSYSTEM.CWWindow} window The window to keep active.
     */
    deactivateTextAreasInWindowsOtherThan(window) {
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            if (this.cwWindow[i] !== window) {
                for (let j = 0; j < this.cwWindow[j].numberOfTextAreas; ++j) {
                    this.cwWindow[j].textArea[j].deselect();
                }
            }
        }
    }

    /**
     * Returns the button that the mouse is over, or null if none is found.
     *
     * @param {number} x The x-coordinate of the mouse pointer.
     * @param {number} y The y-coordinate of the mouse pointer.
     * @returns {CWButton|null} The button that the mouse is over, or null if none is found.
     */
    buttonThatMouseIsOver(x, y) {
        const item = this.windowThatMouseIsOver(x, y);
        return item !== -1 ? this.cwWindow[item].buttonThatMouseIsOver(x, y) : null;
    }

    /**
     * Determines the input box that the mouse cursor is currently over.
     *
     * @param {number} x - The x-coordinate of the mouse cursor.
     * @param {number} y - The y-coordinate of the mouse cursor.
     * @returns {CWSYSTEM.CWInputBox|null} The input box object that the mouse cursor is over, or null if no input box is found.
     */
    inputBoxThatMouseIsOver(x, y) {
        const item = this.windowThatMouseIsOver(x, y);
        return item !== -1 ? this.cwWindow[item].inputBoxThatMouseIsOver(x, y) : null;
    }

    /**
     * Determines the text area that the mouse cursor is currently over.
     *
     * @param {number} x - The x-coordinate of the mouse cursor.
     * @param {number} y - The y-coordinate of the mouse cursor.
     * @returns {CWSYSTEM.CWTextArea|null} The text area object that the mouse cursor is over, or null if no text area is found.
     */
    textAreaThatMouseIsOver(x, y) {
        const item = this.windowThatMouseIsOver(x, y);
        return item !== -1 ? this.cwWindow[item].textAreaThatMouseIsOver(x, y) : null;
    }

    /**
     * Determines the checkbox that the mouse cursor is currently over.
     *
     * @param {number} x The x-coordinate of the mouse cursor.
     * @param {number} y The y-coordinate of the mouse cursor.
     * @returns {CWSYSTEM.CWCheckBox|null} The check box object that the mouse cursor is over, or null if no check box is found.
     */
    checkBoxThatMouseIsOver(x, y) {
        const item = this.windowThatMouseIsOver(x, y);
        return item !== -1 ? this.cwWindow[item].checkBoxThatMouseIsOver(x, y) : null;
    }

    /**
     * Determines the pulldown that the mouse cursor is currently over.
     *
     * @param {number} x The x-coordinate of the mouse cursor.
     * @param {number} y The y-coordinate of the mouse cursor.
     * @returns {CWSYSTEM.CWPulldown|null} The pulldown object that the mouse cursor is over, or null if no pulldown is found.
     */
    pulldownThatMouseIsOver(x, y) {
        const item = this.windowThatMouseIsOver(x, y);
        return item !== -1 ? this.cwWindow[item].pulldownThatMouseIsOver(x, y) : null;
    }

    /**
     * Generates a depth sorted sequence of windows.
     */
    generateDepthSortedSequence() {
        const integerArray = new CWSYSTEM.IntegerArray(this.__numberOfWindows);
        for (let i = 0; i < this.__numberOfWindows; ++i) {
            integerArray.add(-this.getWindow$int(i).depth);
        }
        this.depthSortedSequence = integerArray.sortedSequence();
    }

    /**
     * Ensures that all windows are within the virtual screen boundaries.
     */
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

    /**
     * The maximum number of windows that can be created.
     * @type {number}
     * @static
     * @default
     */
    static maxNumberOfWindows = 100;
    /**
     * The number of windows before warnings appear.
     * @type {number}
     * @static
     * @default
     */
    static numberOfWindowsBeforeWarningsAppear = 75;
}