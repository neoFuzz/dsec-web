(function (CWSYSTEM) {
    /**
     * Class used to create and manage CWWindow windows.
     *
     * @property {VirtualScreen} v - The virtual screen associated with the window.
     * @property {number} w - The width of the window.
     * @property {number} h - The height of the window.
     * @property {number} maxWidth - The maximum width of the window.
     * @property {number} maxHeight - The maximum height of the window.
     * @property {number} minWidth - The minimum width of the window.
     * @property {number} minHeight - The minimum height of the window.
     * @property {number} xPosition - The x-position of the window.
     * @property {number} yPosition - The y-position of the window.
     * @property {string} nameId - The abbreviated identifier for the window.
     * @property {number} style - The [CWWindowStyles]{@link CWSYSTEM.CWWindowStyles} defined style of the window.
     * @property {string} title - The title of the window.
     * @property {number} v - The virtual screen associated with the window.
     * @property {ScreenData} window - The window object.
     * @property {boolean} resizable - Whether the window is resizable.
     * @property {boolean} useAntiAliasedContent - Whether to use anti-aliased content.
     * @property {boolean} hasInterfaceElements - Whether the window has interface elements.
     * @property {number} antiAliasedLevel - The antialiasing level of the window.
     * @property {number} subframes - The number of sub-frames in the window.
     * @property {number} depth - The depth of the window.
     * @property {boolean} updated - Whether the window has been updated.
     * @property {boolean} renderingRequired - Whether rendering is required.
     * @property {boolean} titleVisible - Whether the title is visible.
     * @property {boolean} windowVisible - Whether the window is visible.
     *
     * @see [CWWindowStyles]{@link CWSYSTEM.CWWindowStyles} for information on window styles.
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
    class CWWindow {
        /**
         * Represents a CWWindow object.
         *
         * @param {VirtualScreen} virtualScreen - The virtual screen to associate with the window.
         * @param {number} minWidth - The minimum width of the window.
         * @param {number} minHeight - The minimum height of the window.
         * @param {number} maxWidth - The maximum width of the window.
         * @param {number} maxHeight - The maximum height of the window.
         * @param {string} nameId - The abbreviated identifier for the window.
         * @param {number} style - The {@link CWWindowStyles} defined style of the window.
         * @param {string} title - The title of the window.
         * @param {number} xPosition - The x-position of the window.
         * @param {number} yPosition - The y-position of the window.
         * @param {number} w - The width of the window.
         * @param {number} h - The height of the window.
         */
        constructor(virtualScreen, minWidth, minHeight, maxWidth, maxHeight,
                    nameId, style, title, xPosition, yPosition, w, h) {
            // Initialize properties with default values
            this.v = null;
            this.w = this.h = this.maxWidth = this.maxHeight = this.minWidth = this.minHeight = 0;
            this.xPosition = this.yPosition = this.xPrevPosition = this.yPrevPosition = 0;
            this.title = this.nameID = this.window = null;
            this.resizable = this.useAntiAliasedContent = this.hasInterfaceElements = false;
            this.antiAliasedLevel = this.subframes = this.depth = 0;
            this.updated = this.renderingRequired = this.titleVisible = this.windowVisible = false;
            this.oldW = this.oldH = this.oldX = this.oldY = 0;
            this.floating = this.toBeDestroyed = false;
            this.style = style !== null ? style : CWSYSTEM.CWWindowStyles.ROUNDED;

            this.preAntiAliasedContent = null;
            this.temporalSupersample = null;
            this.rememberedPostTimeSupersampledScreenData = null;

            // Initialize color properties
            this.windowBGColor = this.windowSecondaryBGColor = this.titleTextColor = this.titleBGColor =
                this.titleBGColorSecondary = this.buttonColor = this.inputBoxColor = this.checkBoxColor = null;

            // Set specific properties
            this.ignoreWhenSavingAndRestoringEnvironment = false;
            this.resizable = minHeight !== maxHeight || minWidth !== maxWidth;
            this.minWidth = minWidth;
            this.minHeight = minHeight;
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this.borderWidth = CWSYSTEM.CWWindowStyles.getBorderWidth(this.style);
            this.borderPatternThickness = CWSYSTEM.CWWindowStyles.getBorderPatternThickness(this.style);
            this.borderBitmap = CWSYSTEM.CWWindowStyles.getBorderBitmap(this.style);
            this.cornerBitmap = CWSYSTEM.CWWindowStyles.getCornerBitmap(this.style);
            this.__titleHeight = CWSYSTEM.CWWindowStyles.getTitleHeight(this.style);

            this.button = null;
            this.image = null;
            this.inputBox = null;
            this.textArea = null;
            this.checkBox = null;
            this.textElement = null;
            this.textBlock = null;
            this.imageElement = null;
            this.pulldown = null;
            this.storedLine = null;
            this.scrollbar = null;
            this.scrollablePage = null;
            this.menuManager = null;
            this.rightClickPopupMenu = null;
            this.numberOfPulldowns = 0;
            this.numberOfStoredLines = 0;

            this.subFrame = 0;
            this.dSecSpecialEffects = null;
            this.ignoreWhenSavingAndRestoringEnvironment = false;
            this.subframes = 0;
            this.resizable = true;

            this.window = new CWSYSTEM.ScreenData(this.maxWidth + 2 * this.borderWidth,
                this.maxHeight + 2 * this.borderWidth + this.__titleHeight,
                `CWWindow with nameID ${nameId}`);

            this.v = virtualScreen;
            this.windowVisible = true;
            this.title = title !== null ? title : null;
            this.titleVisible = title !== null;
            this.nameID = nameId;

            // Set dimensions
            this.w = Math.min(Math.max(w, this.minWidth), CWSYSTEM.Global.screenResolutionX_$LI$() - 2 * this.borderWidth);
            this.h = Math.min(Math.max(h, this.minHeight), CWSYSTEM.Global.screenResolutionY_$LI$() - 2 * this.borderWidth - this.__titleHeight);

            // Set position
            this.xPosition = Math.min(Math.max(xPosition, this.borderWidth), CWSYSTEM.Global.screenResolutionX_$LI$() - this.w - this.borderWidth);
            this.yPosition = Math.min(Math.max(yPosition, this.v.topInset + this.borderWidth + this.titleHeight()),
                CWSYSTEM.Global.screenResolutionY_$LI$() - this.h - this.borderWidth - this.titleHeight());
            this.oldX = this.xPrevPosition = this.xPosition;
            this.oldY = this.yPrevPosition = this.yPosition;

            // Set colors
            this.windowBGColor = CWSYSTEM.CWWindowStyles.getBackgroundColor(this.style);
            this.titleTextColor = new CWSYSTEM.CWColor(CWWindow.defaultTitleTextColor_$LI$());
            this.titleBGColor = new CWSYSTEM.CWColor(CWWindow.defaultTitleBGColor_$LI$());
            this.titleBGColorSecondary = new CWSYSTEM.CWColor(CWWindow.defaultTitleBGColorSecondary_$LI$());
            this.inputBoxColor = new CWSYSTEM.CWColor(CWWindow.defaultInputBoxColor_$LI$());
            this.checkBoxColor = new CWSYSTEM.CWColor(CWWindow.defaultCheckBoxColor_$LI$());

            // Fill out GUI element arrays
            this.button = Array(CWWindow.maximumNumberOfButtons).fill(null);
            this.image = Array(CWWindow.maximumNumberOfImages).fill(null);
            this.inputBox = Array(CWWindow.maximumNumberOfInputBoxes).fill(null);
            this.textArea = Array(CWWindow.maximumNumberOfTextAreas).fill(null);
            this.checkBox = Array(CWWindow.maximumNumberOfCheckBoxes).fill(null);
            this.textElement = Array(CWWindow.maximumNumberOfTextElements).fill(null);
            this.textBlock = Array(CWWindow.maximumNumberOfTextBlocks).fill(null);
            this.imageElement = Array(CWWindow.maximumNumberOfImageElements).fill(null);
            this.pulldown = Array(CWWindow.maximumNumberOfPullDowns).fill(null);
            this.storedLine = Array(CWWindow.maximumNumberOfStoredLines).fill(null);

            // Set additional properties
            this.antiAliasedLevel = 1;
            this.useAntiAliasedContent = false;
            this.hasInterfaceElements = true;
            this.scrollbar = null;
            this.depth = 0;
            this.numberOfButtons = 0;
            this.numberOfImages = 0;
            this.numberOfInputBoxes = 0;
            this.numberOfTextAreas = 0;
            this.numberOfCheckBoxes = 0;
            this.numberOfTextElements = 0;
            this.numberOfTextBlocks = 0;
            this.numberOfImageElements = 0;
            this.numberOfStoredLines = 0;
            this.oldW = 0;
            this.oldH = 0;
            if (minHeight === maxHeight && minWidth === maxWidth) {
                this.resizable = false;
            }
        }

        /**
         * Returns the default title text color.
         *
         * @private
         * @returns {*}
         */
        static defaultTitleTextColor_$LI$() {
            if (CWWindow.defaultTitleTextColor == null) {
                CWWindow.defaultTitleTextColor = new CWSYSTEM.CWColor(0, 0, 80, 255);
            }
            return CWWindow.defaultTitleTextColor;
        }

        /**
         * Returns the default title background color.
         *
         * @private
         * @returns {*}
         */
        static defaultTitleBGColor_$LI$() {
            if (CWWindow.defaultTitleBGColor == null) {
                CWWindow.defaultTitleBGColor = new CWSYSTEM.CWColor(235, 235, 255, 255);
            }
            return CWWindow.defaultTitleBGColor;
        }

        /**
         * Returns the default secondary title background color.
         *
         * @private
         * @returns {*}
         */
        static defaultTitleBGColorSecondary_$LI$() {
            if (CWWindow.defaultTitleBGColorSecondary == null) {
                CWWindow.defaultTitleBGColorSecondary = new CWSYSTEM.CWColor(185, 185, 205, 255);
            }
            return CWWindow.defaultTitleBGColorSecondary;
        }

        /**
         * Returns the default input box color.
         *
         * @private
         * @returns {*}
         */
        static defaultInputBoxColor_$LI$() {
            if (CWWindow.defaultInputBoxColor == null) {
                CWWindow.defaultInputBoxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWWindow.defaultInputBoxColor;
        }

        /**
         * Returns the default check box color.
         *
         * @private
         * @returns {*}
         */
        static defaultCheckBoxColor_$LI$() {
            if (CWWindow.defaultCheckBoxColor == null) {
                CWWindow.defaultCheckBoxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWWindow.defaultCheckBoxColor;
        }

        /**
         * Returns the default window background color.
         *
         * @private
         * @returns {*}
         */
        static defaultWindowBGColor_$LI$() {
            if (CWWindow.defaultWindowBGColor == null) {
                CWWindow.defaultWindowBGColor = new CWSYSTEM.CWColor(110, 130, 170, 255);
            }
            return CWWindow.defaultWindowBGColor;
        }

        /**
         * Sets the anti-aliased content area and related properties.
         *
         * @param {number} aaLevel - The antialiasing level.
         * @param {number} subFrames - The number of sub-frames for antialiasing.
         */
        useAntiAliasedContentAreaAndNoInterfaceElements(aaLevel, subFrames) {
            this.antiAliasedLevel = aaLevel;
            this.useAntiAliasedContent = true;
            this.subframes = subFrames;
            this.temporalSupersample = Array(subFrames).fill(null);
            if (this.subframes >= 2) {
                for (let i = 0; i < this.subframes; ++i) {
                    this.temporalSupersample[i] = new CWSYSTEM.ScreenData(this.maxWidth, this.maxHeight,
                        "Sub-frame for anti-aliased content " + i);
                }
                this.rememberedPostTimeSupersampledScreenData = new CWSYSTEM.ScreenData(this.maxWidth,
                    this.maxHeight, "Remembered anti-aliased content for CWWindow " + this.nameID);
            }
            this.subFrame = 0;
            this.preAntiAliasedContent = new CWSYSTEM.ScreenData(this.maxWidth * aaLevel,
                this.maxHeight * aaLevel, "Anti-aliased content for CWWindow " + this.nameID);
            this.hasInterfaceElements = false;
        }

        /**
         * Sets the anti-aliased content area and related properties, including interface elements.
         * This method is typically used for windows with interactive elements like buttons or input boxes.
         *
         * @param {number} aaLevel - The antialiasing level.
         * @param {number} subFrames - The number of sub-frames for antialiasing.
         */
        useAntiAliasedContentAreaWithInterfaceElements(aaLevel, subFrames) {
            this.useAntiAliasedContentAreaAndNoInterfaceElements(aaLevel, subFrames);
            this.hasInterfaceElements = true;
        }

        /**
         * Returns the height of the title bar based on the window style.
         *
         * @returns {*|number}
         */
        titleHeight() {
            return this.titleVisible ? this.__titleHeight : 0;
        }

        /**
         * Sets the visibility of the window.
         * This method is typically used to hide or show a window without destroying it.
         *
         * @param {boolean} visible - Whether the window should be
         */
        setVisibility(visible) {
            this.windowVisible = visible;
            if (this.windowVisible) {
                CWSYSTEM.CWSReference.gui.moveWindowToTopByName(this.nameID);
            }
            this.updated = false;
        }

        /**
         * Sets the background color of the window.
         * This method is typically used to change the background color of a window.
         *
         * @param {CWSYSTEM.CWColor} color - The new background color for the window.
         */
        changeBackgroundColor$CWColor(color) {
            this.windowBGColor = color;
            this.windowSecondaryBGColor = null;
        }

        /**
         * Sets the background color of the window.
         * This method is typically used to change the background color of a window.
         *
         * @param {CWSYSTEM.CWColor} color - The new background color for the window.
         * @param {CWSYSTEM.CWColor} color2 - The new secondary background color for the window.
         */
        changeBackgroundColor$color$color(color1, color2) {
            this.windowBGColor = color1;
            this.windowSecondaryBGColor = color2;
        }

        /**
         * Sets the background color of the window.
         * This method is typically used to change the background color of a window.
         *
         * @param {CWSYSTEM.CWColor} color1 - The new background color for the window.
         * @param {CWSYSTEM.CWColor} color2 - The new secondary background color for the window.
         */
        changeBackgroundColor(color1, color2) {
            if (((color1 != null && color1 instanceof CWSYSTEM.CWColor) || color1 === null) &&
                ((color2 != null && color2 instanceof CWSYSTEM.CWColor) || color2 === null)) {
                return this.changeBackgroundColor$color$color(color1, color2);
            } else if (((color1 != null && color1 instanceof CWSYSTEM.CWColor) || color1 === null) && color2 === undefined) {
                return this.changeBackgroundColor$CWColor(color1);
            } else
                throw new Error('invalid overload');
        }

        /**
         * Destroys the window and removes it from the GUI.
         * This method is typically used to close a window and clean up resources.
         */
        destroy() {
            CWSYSTEM.CWSReference.gui.destroyWindow(this.nameID);
        }

        /**
         * Moves the window to the top of the GUI stack.
         * This method is typically used to bring a window to the front when it has been clicked or interacted with.
         */
        moveToTop() {
            CWSYSTEM.CWSReference.gui.moveWindowToTopByName(this.nameID);
        }

        /**
         * Destroys all elements of the window, except for pulldown lists.
         * This method is typically used to clean up resources when the window is no longer needed.
         */
        destroyAllElementsExceptPulldownLists() {
            let i;
            for (i = 0; i < this.numberOfButtons; ++i) {

                this.button[i] = null;
            }
            this.numberOfButtons = 0;
            for (i = 0; i < this.numberOfImages; ++i) {
                this.image[i] = null;
            }
            this.numberOfImages = 0;
            for (i = 0; i < this.numberOfInputBoxes; ++i) {
                this.inputBox[i] = null;
            }
            this.numberOfInputBoxes = 0;
            for (i = 0; i < this.numberOfTextAreas; ++i) {
                this.textArea[i] = null;
            }
            this.numberOfTextAreas = 0;
            for (i = 0; i < this.numberOfCheckBoxes; ++i) {
                this.checkBox[i] = null;
            }
            this.numberOfCheckBoxes = 0;
            for (i = 0; i < this.numberOfTextElements; ++i) {
                this.textElement[i] = null;
            }
            this.numberOfTextElements = 0;
            for (i = 0; i < this.numberOfTextBlocks; ++i) {
                this.textBlock[i] = null;
            }
            this.numberOfTextBlocks = 0;
            for (i = 0; i < this.numberOfImageElements; ++i) {
                this.imageElement[i] = null;
            }
            this.numberOfImageElements = 0;
            for (i = 0; i < this.numberOfStoredLines; ++i) {
                this.storedLine[i] = null;
            }
            this.numberOfStoredLines = 0;
        }

        /**
         * Destroys all elements of the window, including pulldown lists.
         * This method is typically used to clean up resources when the window is no longer needed.
         */
        destroyAllElements() {
            this.destroyAllElementsExceptPulldownLists();
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                this.pulldown[i] = null;
            }
            this.numberOfPulldowns = 0;
        }

        /**
         * Centers the window within the desktop area.
         * This method is typically used to position a window in the center of the screen.
         */
        centerWithinDesktop() {
            this.xPosition = Math.floor((CWSYSTEM.Global.screenResolutionX_$LI$() - this.w) / 2 | 0);
            this.yPosition = Math.floor((CWSYSTEM.Global.screenResolutionY_$LI$() - this.h) / 2 | 0);
        }

        /**
         * Adds a button to the window.
         * This method is typically used to add buttons to a window, such as for navigation or interaction.
         *
         * @param {string} name - The name of the button.
         * @param {number} x - The x-coordinate of the button.
         * @param {number} y - The y-coordinate of the button.
         * @param {number} length - The length of the button.
         * @param {number} height - The height of the button.
         * @param {string} text - The text displayed on the button.
         * @param {number} type - The type of the button.
         * @param {number} responds - The response value for the button.
         * @returns {CWSYSTEM.CWButton|null} The newly created button, or null if the maximum number of buttons has been reached.
         */
        addButton(name, x, y, length, height,
                  text, type, responds) {
            if (this.numberOfButtons >= CWWindow.maximumNumberOfButtons) {
                CWSYSTEM.Debug.error("Critical error: Maximum number of buttons exceeded");
                return null;
            } else {
                const dimensions = {
                    x: x,
                    y: y,
                    length: length,
                    height: height
                };
                this.button[this.numberOfButtons] =
                    new CWSYSTEM.CWButton(this, name, dimensions, text, type, responds);
                ++this.numberOfButtons;
                return this.button[this.numberOfButtons - 1];
            }
        }

        /**
         * Deletes a button from the window by name.
         * This method is typically used to remove buttons from a window when they are no longer needed.
         *
         * @param {string} name - The name of the button to be deleted.
         * @returns {boolean} True if the button was successfully deleted, false otherwise.
         */
        deleteButton(name) {
            for (let i = 0; i < this.numberOfButtons; ++i) {
                if (this.button[i].name === name) {
                    for (let j = i; j < this.numberOfButtons - 1; ++j) {
                        this.button[j] = this.button[j + 1];
                    }
                    --this.numberOfButtons;
                    return true;
                }

            }
            return false;
        }

        /**
         * Returns a button by its name.
         * This method is typically used to retrieve a button by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the button to be retrieved.
         * @returns {CWSYSTEM.CWButton|null} The button with the specified name, or null if not found.
         */
        getButton(name) {
            for (let i = 0; i < this.numberOfButtons; ++i) {
                if (this.button[i].name === name) {
                    return this.button[i];
                }
            }
            return null;
        }

        /**
         * Adds an image to the window.
         * This method is typically used to add images to a window, such as for decorations or visual elements.
         *
         * @param {string} nameID - The name of the image.
         * @param {number} x - The x-coordinate of the image.
         * @param {number} y - The y-coordinate of the image.
         * @param {string} path - The path to the image file.
         * @param {CWSYSTEM.CWColor} color - The color of the image.
         * @returns {CWSYSTEM.CWImage|null} The newly created image, or null if the maximum number of images has been reached.
         */
        addImage(nameID, x, y, path, color) {
            this.image[this.numberOfImages++] = new CWSYSTEM.CWImage(this, nameID, x, y, path, color);
            return this.image[this.numberOfImages - 1];
        }

        /**
         * Adds a pulldown list to the window.
         * This method is typically used to add pulldown lists to a window, such as for selecting options or filters.
         *
         * @param {string} name - The name of the pulldown list.
         * @param {Array} options - The options to be displayed in the pulldown list.
         * @param {number} x - The x-coordinate of the pulldown list.
         * @param {number} y - The y-coordinate of the pulldown list.
         * @param {number} width - The width of the pulldown list.
         * @param {number} height - The height of the pulldown list.
         * @returns {CWSYSTEM.CWPulldown|null} The newly created pulldown list, or null if the maximum number of pulldowns has been reached.
         */
        addPulldown(name, options, x, y, width, height) {
            this.pulldown[this.numberOfPulldowns++] = new CWSYSTEM.CWPulldown(this, name, options, x, y, width, height);
            return this.pulldown[this.numberOfPulldowns - 1];
        }

        /**
         * Returns a pulldown list by its name.
         * This method is typically used to retrieve a pulldown list by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the pulldown list to be retrieved.
         * @returns {CWSYSTEM.CWPulldown|null} The pulldown list with the specified name, or null if not found.
         */
        getPulldown(name) {
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                if (this.pulldown[i].name === name) {
                    return this.pulldown[i];
                }
            }
            return null;
        }

        /**
         * Removes a pulldown list from the window by its name.
         * This method is typically used to remove pulldown lists from a window when they are no longer needed.
         *
         * @param {string} name - The name of the pulldown list to be removed.
         * @returns {boolean} True if the pulldown list was successfully removed, false otherwise.
         */
        removePulldown(name) {
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                if (this.pulldown[i].name === name) {
                    for (let j = i; j < this.numberOfPulldowns - 1; ++j) {
                        this.pulldown[j] = this.pulldown[j + 1];
                    }
                    --this.numberOfPulldowns;
                    return true;
                }
            }
            return false;
        }

        /**
         * Adds a text area to the window.
         * This method is typically used to add text areas to a window, such as for input or display of text.
         *
         * @param {string} name - The name of the text area.
         * @param {number} x - The x-coordinate of the text area.
         * @param {number} y - The y-coordinate of the text area.
         * @param {number} width - The width of the text area.
         * @param {number} numberOfLines - The number of lines the text area can display.
         * @param {string} font - The font used in the text area.
         * @param {string} text - The initial text displayed in the text area.
         * @returns {CWSYSTEM.CWTextArea|null} The newly created text area, or null if the maximum number of text areas has been reached.
         */
        addTextArea(name, x, y, width, numberOfLines, font, text) {
            if (this.numberOfTextAreas >= CWWindow.maximumNumberOfTextAreas) {
                CWSYSTEM.Debug.println("Maximum number of CWTextArea objects exceeded");
                return null;
            } else {
                this.textArea[this.numberOfTextAreas] =
                    new CWSYSTEM.CWTextArea(this, this.numberOfTextAreas, name, x, y, width, numberOfLines, font, text);
                ++this.numberOfTextAreas;
                return this.textArea[this.numberOfTextAreas - 1];
            }
        }

        /**
         * Returns a text area by its name.
         * This method is typically used to retrieve a text area by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the text area to be retrieved.
         * @returns {CWSYSTEM.CWTextArea|null} The text area with the specified name, or null if not found.
         */
        getTextArea(name) {
            for (let i = 0; i < this.numberOfTextAreas; ++i) {
                if (this.textArea[i].name === name) {
                    return this.textArea[i];
                }
            }
            return null;
        }

        /**
         * Returns a text block by its name.
         * This method is typically used to retrieve a text block by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the text block to be retrieved.
         * @returns {CWSYSTEM.CWTextBlock|null} The text block with the specified name, or null if not found.
         */
        getTextBlock(name) {
            for (let i = 0; i < this.numberOfTextBlocks; ++i) {
                if (this.textBlock[i].nameID === name) {
                    return this.textBlock[i];
                }
            }
            return null;
        }

        /**
         * Adds an input box to the window.
         * This method is typically used to add input boxes to a window, such as for user input or data entry.
         *
         * @param {string} name - The name of the input box.
         * @param {number} x - The x-coordinate of the input box.
         * @param {number} y - The y-coordinate of the input box.
         * @param {number} length - The length of the input box.
         * @param {string} text - The initial text displayed in the input box.
         * @returns {CWSYSTEM.CWInputBox|null} The newly created input box, or null if the maximum number of input boxes has been reached.
         */
        addInputBox(name, x, y, length, text) {
            if (this.numberOfInputBoxes >= CWWindow.maximumNumberOfInputBoxes) {
                return null;
            } else {
                this.inputBox[this.numberOfInputBoxes] = new CWSYSTEM.CWInputBox(this, name, x, y, length, text);
                ++this.numberOfInputBoxes;
                return this.inputBox[this.numberOfInputBoxes - 1];
            }
        }

        /**
         * Deletes an input box from the window by its name.
         * This method is typically used to remove input boxes from a window when they are no longer needed.
         *
         * @param {string} name - The name of the input box to be deleted.
         * @returns {boolean} True if the input box was successfully deleted, false otherwise.
         */
        deleteInputBox(name) {
            for (let i = 0; i < this.numberOfInputBoxes; ++i) {
                if (this.inputBox[i].name === name) {
                    for (let j = i; j < this.numberOfInputBoxes - 1; ++j) {
                        this.inputBox[j] = this.inputBox[j + 1];
                    }
                    --this.numberOfInputBoxes;
                    return true;
                }
            }
            return false;
        }

        /**
         * Returns an input box by its name.
         * This method is typically used to retrieve an input box by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the input box to be retrieved.
         * @returns {CWSYSTEM.CWInputBox|null} The input box with the specified name, or null if not found.
         */
        getInputBox(name) {
            for (let i = 0; i < this.numberOfInputBoxes; ++i) {
                if (this.inputBox[i].name === name) {
                    return this.inputBox[i];
                }
            }
            return null;
        }

        /**
         * Adds a checkbox to the window.
         * This method is typically used to add check boxes to a window, such as for selecting options or filters.
         *
         * @param {string} name - The name of the checkbox.
         * @param {number} x - The x-coordinate of the checkbox.
         * @param {number} y - The y-coordinate of the checkbox.
         * @param {boolean} selected - Whether the checkbox is initially selected or not.
         * @returns {CWSYSTEM.CWCheckBox|null} The newly created checkbox, or null if the maximum number of checkboxes has been reached.
         */
        addCheckBox(name, x, y, selected) {
            return this.addRadioButton(name, x, y, selected, -1);
        }

        /**
         * Adds a radio button to the window.
         * This method is typically used to add radio buttons to a window, such as for selecting a single option from a group.
         *
         * @param {string} name - The name of the radio button.
         * @param {number} x - The x-coordinate of the radio button.
         * @param {number} y - The y-coordinate of the radio button.
         * @param {boolean} selected - Whether the radio button is initially selected or not.
         * @param {number} radioId - The ID of the radio button group.
         * @returns {CWSYSTEM.CWCheckBox|null} The newly created radio button, or null if the maximum number of checkboxes has been reached.
         */
        addRadioButton(name, x, y, selected, radioId) {
            if (this.numberOfCheckBoxes >= CWWindow.maximumNumberOfCheckBoxes) {
                return null;
            } else {
                this.checkBox[this.numberOfCheckBoxes] = new CWSYSTEM.CWCheckBox(this, name, x, y, selected);
                this.checkBox[this.numberOfCheckBoxes].radioID = radioId;
                ++this.numberOfCheckBoxes;
                return this.checkBox[this.numberOfCheckBoxes - 1];
            }
        }

        /**
         * Returns a checkbox by its name.
         * This method is typically used to retrieve a checkbox by its name for interaction or manipulation.
         *
         * @param {string} name - The name of the checkbox to be retrieved.
         * @returns {CWSYSTEM.CWCheckBox|null} The checkbox with the specified name, or null if not found.
         */
        getCheckBox(name) {
            for (let i = 0; i < this.numberOfCheckBoxes; ++i) {
                if (this.checkBox[i].name === name) {
                    return this.checkBox[i];
                }
            }
            return null;
        }

        /**
         * Deletes a checkbox from the window by its name.
         * This method is typically used to remove checkboxes from a window when they are no longer needed.
         *
         * @param {string} name - The name of the checkbox to be deleted.
         * @returns {boolean} True if the checkbox was successfully deleted, false otherwise.
         */
        deleteCheckBox(name) {
            for (let i = 0; i < this.numberOfCheckBoxes; ++i) {
                if (this.checkBox[i].name === name) {
                    for (let j = i; j < this.numberOfCheckBoxes - 1; ++j) {
                        this.checkBox[j] = this.checkBox[j + 1];
                    }
                    --this.numberOfCheckBoxes;
                    return true;
                }
            }
            return false;
        }

        /**
         * Adds a stored line to the window.
         * This method is typically used to add stored lines to a window, such as for drawing lines or shapes on a canvas.
         *
         * @param {number} x0 - The x-coordinate of the starting point of the line.
         * @param {number} y0 - The y-coordinate of the starting point of the line.
         * @param {number} x1 - The x-coordinate of the ending point of the line.
         * @param {number} y1 - The y-coordinate of the ending point of the line.
         * @param {number} red - The red component of the line color.
         * @param {number} green - The green component of the line color.
         * @param {number} blue - The blue component of the line color.
         * @param {number} alpha - The alpha (transparency) component of the line color.
         */
        addStoredLine(x0, y0, x1, y1, red, green, blue, alpha) {
            if (this.numberOfStoredLines < CWWindow.maximumNumberOfStoredLines) {
                const dimensions = {
                    x0: x0,
                    y0: y0,
                    x1: x1,
                    y1: y1
                };
                this.storedLine[this.numberOfStoredLines] =
                    new CWSYSTEM.CWStoredLine(this, dimensions, red, green, blue, alpha);
                ++this.numberOfStoredLines;
                this.updated = false;
            }
        }

        /**
         * Adds a text element to the window.
         * This method is typically used to add text elements to a window, such as for displaying text or labels.
         *
         * @param {string} name - The name of the text element.
         * @param {string} text - The text to be displayed.
         * @param {number} x - The x-coordinate of the text element.
         * @param {number} y - The y-coordinate of the text element.
         * @param {string} color - The color of the text element.
         */
        addTextElement(name, text, x, y, color) {
            if (this.numberOfTextElements < CWWindow.maximumNumberOfTextElements) {
                this.textElement[this.numberOfTextElements] = new CWSYSTEM.CWTextElement(name, text, x, y, color);
                ++this.numberOfTextElements;
                this.updated = false;
            }
        }

        /**
         * Deletes a text element from the window by its name.
         * This method is typically used to remove text elements from a window when they are no longer needed.
         *
         * @param {string} name - The name of the text element to be deleted.
         * @returns {boolean} True if the text element was successfully deleted, false otherwise.
         */
        deleteTextElement(name) {
            for (let i = 0; i < this.numberOfTextElements; ++i) {
                if (this.textElement[i].nameID === name) {
                    for (let j = i; j < this.numberOfTextElements - 1; ++j) {
                        this.textElement[j] = this.textElement[j + 1];
                    }
                    --this.numberOfTextElements;
                    return true;
                }
            }
            return false;
        }

        /**
         * Adds a text block to the window.
         * This method is typically used to add text blocks to a window, such as for displaying text or labels.
         *
         * @param {string} nameId - The name of the text block.
         * @param {string} text - The text to be displayed.
         * @param {number} leftMargin - The left margin of the text block.
         * @param {number} baseLine - The baseline of the text block.
         * @param {CWSYSTEM.CWFont} font - The font of the text block.
         * @param {CWSYSTEM.CWColor} color - The color of the text block.
         * @param {number} width - The width of the text block.
         * @returns {CWSYSTEM.CWTextBlock|null} The newly created text block, or null if the maximum number of text blocks has been reached.
         */
        addTextBlock(nameId, text, leftMargin, baseLine, font, color, width) {
            if (this.numberOfTextBlocks >= CWWindow.maximumNumberOfTextBlocks) {
                return null;
            } else {
                this.textBlock[this.numberOfTextBlocks] =
                    new CWSYSTEM.CWTextBlock(this, nameId, text, font, color, baseLine, leftMargin, width);
                ++this.numberOfTextBlocks;
                this.updated = false;
                return this.textBlock[this.numberOfTextBlocks - 1];
            }
        }

        /**
         * Adds an image element to the window.
         * This method is typically used to add image elements to a window, such as for displaying images or graphics.
         *
         * @param {string} nameID - The name of the image element.
         * @param {string} fileName - The file name of the image.
         * @param {number} x - The x-coordinate of the image element.
         * @param {number} y - The y-coordinate of the image element.
         */
        addImageElement(nameID, fileName, x, y) {
            if (this.numberOfImageElements < CWWindow.maximumNumberOfImageElements) {
                this.imageElement[this.numberOfImageElements] = new CWSYSTEM.CWImageElement(nameID, fileName, x, y);
                ++this.numberOfImageElements;
                this.updated = false;
            }
        }

        /**
         * Returns the button that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {CWSYSTEM.CWButton|null} The button that the mouse is over, or null if no button is being hovered over.
         */
        buttonThatMouseIsOver(x, y) {
            let button = null;
            for (let i = 0; i < this.numberOfButtons; ++i) {
                if (x >= this.xPosition + this.button[i].x &&
                    x <= this.xPosition + this.button[i].x + this.button[i].length &&
                    y >= this.yPosition + this.button[i].y &&
                    y <= this.yPosition + this.button[i].y + this.button[i].height) {
                    button = this.button[i];
                    break;
                }
            }
            return button;
        }

        /**
         * Returns the input box that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {CWSYSTEM.CWInputBox|null} The input box that the mouse is over, or null if no input box is being hovered over.
         */
        inputBoxThatMouseIsOver(x, y) {
            for (let i = 0; i < this.numberOfInputBoxes; ++i) {
                if (x >= this.xPosition + this.inputBox[i].x &&
                    x <= this.xPosition + this.inputBox[i].x + this.inputBox[i].length &&
                    y >= this.yPosition + this.inputBox[i].y &&
                    y <= this.yPosition + this.inputBox[i].y + this.inputBox[i].height) {
                    return this.inputBox[i];
                }
            }
            return null;
        }

        /**
         * Returns the text area that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {CWSYSTEM.CWTextArea|null} The text area that the mouse is over, or null if no text area is being hovered over.
         */
        textAreaThatMouseIsOver(x, y) {
            for (let i = 0; i < this.numberOfTextAreas; ++i) {
                if (x >= this.xPosition + this.textArea[i].x &&
                    x <= this.xPosition + this.textArea[i].x + this.textArea[i].width &&
                    y >= this.yPosition + this.textArea[i].y &&
                    y <= this.yPosition + this.textArea[i].y + this.textArea[i].height()) {
                    return this.textArea[i];
                }
            }
            return null;
        }

        /**
         * Returns the checkbox that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {CWSYSTEM.CWCheckBox|null} The checkbox that the mouse is over, or null if no checkbox is being hovered over.
         */
        checkBoxThatMouseIsOver(x, y) {
            let checkBox = null;
            for (let i = 0; i < this.numberOfCheckBoxes; ++i) {
                if (x >= this.xPosition + this.checkBox[i].x - this.checkBox[i].clickableBorderWidth &&
                    x <= this.xPosition + this.checkBox[i].x + this.checkBox[i].length + this.checkBox[i].clickableBorderWidth &&
                    y >= this.yPosition + this.checkBox[i].y - this.checkBox[i].clickableBorderWidth &&
                    y <= this.yPosition + this.checkBox[i].y + this.checkBox[i].height + this.checkBox[i].clickableBorderWidth) {
                    checkBox = this.checkBox[i];
                    break;
                }
            }
            return checkBox;
        }

        /**
         * Returns the pulldown menu that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {CWSYSTEM.CWPulldownMenu|null} The pulldown menu that the mouse is over, or null if no pulldown menu is being hovered over.
         */
        pulldownThatMouseIsOver(x, y) {
            let pd = null;
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                if (x >= this.xPosition + this.pulldown[i].x && x <= this.xPosition + this.pulldown[i].x +
                    this.pulldown[i].width && y >= this.yPosition + this.pulldown[i].y && y <= this.yPosition +
                    this.pulldown[i].y + this.pulldown[i].height) {
                    pd = this.pulldown[i];
                    break;
                }
            }
            return pd;
        }

        /**
         * Returns the corner of the window that the mouse is currently over.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {number} The corner of the window that the mouse is over, or 0 if the mouse is not over any corner.
         */
        cornerThatMouseIsOver(x, y) {
            if (x >= this.xPosition + this.w && y >= this.yPosition + this.h) {
                return 1;
            } else if (x >= this.xPosition + this.w && y <= this.yPosition) {
                return 2;
            } else if (x <= this.xPosition && y <= this.yPosition) {
                return 3;
            } else {
                return x <= this.xPosition && y >= this.yPosition + this.h ? 4 : 0;
            }
        }

        /**
         * Returns whether the mouse is over the title area of the window.
         *
         * @param {number} x - The x-coordinate of the mouse pointer.
         * @param {number} y - The y-coordinate of the mouse pointer.
         * @returns {boolean} True if the mouse is over the title area, false otherwise.
         */
        mouseOverTitleArea(x, y) {
            return x >= this.xPosition - this.borderWidth &&
                x <= this.xPosition + this.w + this.borderWidth &&
                y >= this.yPosition - this.borderWidth - this.__titleHeight &&
                y <= this.yPosition - this.borderWidth - this.__titleHeight + this.titleBarHeight();
        }

        /**
         * Clears the content area of the window.
         * This method is typically used to clear the content area of a window before drawing new content.
         */
        clearContentArea() {
            if (this.useAntiAliasedContent) {
                this.v.CWDrawFilledRectangle(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, CWSYSTEM.CWColor.__transparentBlack());
            } else if (this.windowSecondaryBGColor == null) {
                this.v.CWDrawFilledRectangle(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, this.windowBGColor);
            } else {
                this.v.CWDrawFilledRectangleWithGradient(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, this.windowBGColor, this.windowSecondaryBGColor);
            }
        }

        /**
         * Clears the pre-anti-aliased content area of the window.
         * This method is typically used to clear the pre-anti-aliased content area of a window before drawing new content.
         */
        clearPreAntiAliasedContent() {
            this.v.CWDrawFilledRectangle(this.preAntiAliasedContent, 0, 0, this.w * this.antiAliasedLevel,
                this.h * this.antiAliasedLevel, this.windowBGColor);
        }

        /**
         * Draws the border of the window.
         * This method is typically used to draw the border of a window, such as for creating a window frame.
         */
        drawBorder() {
            let i;
            let j;
            let k;
            for (i = 0; i < (this.h / this.borderPatternThickness | 0); i += this.borderPatternThickness) {
                for (j = 0; j < this.borderPatternThickness; ++j) {
                    for (k = 0; k < this.borderWidth; ++k) {
                        this.v.setColorVS$r$g$b$a(this.borderBitmap[j][k][0], this.borderBitmap[j][k][1],
                            this.borderBitmap[j][k][2], this.borderBitmap[j][k][3]);
                        this.v.CWDrawPixel(this.window, k, this.borderWidth + this.__titleHeight + i *
                            this.borderPatternThickness + j);
                        this.v.CWDrawPixel(this.window, this.w + 2 * this.borderWidth - k - 1,
                            this.borderWidth + this.__titleHeight + i * this.borderPatternThickness + j);
                    }
                }
            }
            this.doDrawA(i, j, k);
            this.v.CWDrawFilledRectangle(this.window, 0, 0, this.w + 2 * this.borderWidth,
                this.__titleHeight, new CWSYSTEM.CWColor(CWSYSTEM.Global.environmentBackgroundColor_$LI$()));
            if (this.titleVisible) {
                const titleBarSag = this.titleBarSag();
                const titleTextWidth = this.titleTextWidth();
                const titleTxtVertOffset = this.titleTextVerticalOffset();
                const titleBarHeight = this.titleBarHeight();
                const titleBarWidth = this.titleBarWidth();
                this.v.setColor$intCWColor(this.titleTextColor);
                this.v.CWDrawRectangle(this.window, 1 + this.borderWidth + (this.w / 2 | 0) - (titleBarWidth / 2 | 0),
                    1 + titleBarSag, titleBarWidth - 2, titleBarHeight);
                this.v.setColor$intCWColor(this.titleTextColor);
                this.v.CWDrawRectangle(this.window, this.borderWidth + (this.w / 2 | 0) - (titleBarWidth / 2 | 0),
                    titleBarSag, titleBarWidth - 2, titleBarHeight);
                this.v.CWDrawFilledRectangleWithGradient(this.window, 1 + this.borderWidth + (this.w / 2 | 0) -
                    (titleBarWidth / 2 | 0), 1 + titleBarSag, titleBarWidth - 4, titleBarHeight - 2,
                    this.titleBGColor, this.titleBGColorSecondary);
                this.v.setColor$intCWColor(this.titleTextColor);
                CWSYSTEM.CWFontTools.renderText(this.window, this.title, this.borderWidth +
                    ((this.w - titleTextWidth) / 2 | 0) - 1, titleBarSag + this.borderWidth + this.__titleHeight +
                    titleTxtVertOffset, this.v.serif8_font, this.titleTextColor, 9999);
            }
        }

        doDrawA(i, j, k) {
            let color1;
            if (this.borderPatternThickness > 1) {
                for (i = 0; i < (this.w / this.borderPatternThickness | 0); i += this.borderPatternThickness) {
                    for (j = 0; j < this.borderPatternThickness; ++j) {
                        for (k = 0; k < this.borderWidth; ++k) {
                            this.v.setColorVS$r$g$b$a(this.borderBitmap[j][k][0], this.borderBitmap[j][k][1],
                                this.borderBitmap[j][k][2], this.borderBitmap[j][k][3]);
                            this.v.CWDrawPixel(this.window, this.borderWidth + i * this.borderPatternThickness + j,
                                this.__titleHeight + k);
                            this.v.CWDrawPixel(this.window, this.borderWidth + i * this.borderPatternThickness + j,
                                this.h + 2 * this.borderWidth + this.__titleHeight - k - 1);
                        }
                    }
                }
            } else {
                for (k = 0; k < this.borderWidth; ++k) {
                    color1 = CWSYSTEM.FastColorUtilities.colorRGBA(this.borderBitmap[0][k][0],
                        this.borderBitmap[0][k][1], this.borderBitmap[0][k][2], this.borderBitmap[0][k][3]);
                    this.v.fastHorizontalLine(this.window, this.borderWidth,
                        this.__titleHeight + k, this.w, color1);
                    this.v.fastHorizontalLine(this.window, this.borderWidth,
                        this.h + 2 * this.borderWidth + this.__titleHeight - k - 1, this.w, color1);
                }
            }
            this.doDrawB();
        }

        doDrawB() {
            let j, k;
            for (j = 0; j < this.borderWidth; ++j) {
                for (k = 0; k < this.borderWidth; ++k) {
                    this.v.setColorVS$r$g$b$a(this.cornerBitmap[j][k][0], this.cornerBitmap[j][k][1],
                        this.cornerBitmap[j][k][2], this.cornerBitmap[j][k][3]);
                    this.v.CWDrawPixel(this.window, k, this.__titleHeight + j);
                    this.v.CWDrawPixel(this.window, this.w + 2 * this.borderWidth - k - 1, this.__titleHeight + j);
                    this.v.CWDrawPixel(this.window, k, this.h + 2 * this.borderWidth + this.__titleHeight - j - 1);
                    this.v.CWDrawPixel(this.window, this.w + 2 * this.borderWidth - k - 1,
                        this.h + 2 * this.borderWidth + this.__titleHeight - j - 1);
                }
            }
        }

        /**
         * Returns the vertical space between the title bar and the content area.
         *
         * @returns {number} The vertical space between the title bar and the content area.
         */
        titleBarSag() {
            return this.style === CWSYSTEM.CWWindowStyles.ROUNDED ? 1 : 2;
        }

        /**
         * Returns the vertical space between the title bar and the content area.
         *
         * @returns {number} The vertical space between the title bar and the content area.
         */
        titleBarVerticalSpace() {
            return 2;
        }

        /**
         * Returns the width of the title text.
         *
         * @returns {number} The width of the title text.
         */
        titleTextWidth() {
            CWSYSTEM.CWFontTools.renderText(null, this.title, 0, 0, this.v.serif8_font,
                CWSYSTEM.CWColor.__black(), 9999);
            return CWSYSTEM.CWFontTools.RENDERED_WIDTH;
        }

        /**
         * Returns the height of the title text.
         *
         * @returns {number} The height of the title text.
         */
        titleTextHeight() {
            const height = this.title != null ? this.title : "";
            return CWSYSTEM.CWFontTools.heightOfParagraph(height, this.v.serif8_font, 9999, false);
        }

        /**
         * Returns the vertical offset of the title text.
         *
         * @returns {number} The vertical offset of the title text.
         */
        titleTextVerticalOffset() {
            if (this.style === CWSYSTEM.CWWindowStyles.ROUNDED) {
                return 2;
            } else {
                return this.style === 1 ? 0 : 1;
            }
        }

        /**
         * Returns the width of the title bar.
         *
         * @returns {number} The width of the title bar.
         */
        titleBarWidth() {
            return this.titleTextWidth() + 10;
        }

        /**
         * Returns the height of the title bar.
         *
         * @returns {number} The height of the title bar.
         */
        titleBarHeight() {
            return this.titleTextHeight() + 2 * this.titleBarVerticalSpace() - 1;
        }

        /**
         * Draws the window and its components.
         *
         * @returns {boolean} True if the window should continue to exist, false otherwise.
         */
        drawWindow() {
            if (this.toBeDestroyed) {
                return false;
            } else {
                this.clearContentArea();
                if ((this.nameID === ("X")) || (this.nameID === ("Y")) || (this.nameID === ("Z"))) {
                    const color = new CWSYSTEM.CWColor(0, 0, 0, 120);
                    const borderWidth1 = this.borderWidth;
                    const selectRegionWidth = CWSYSTEM.Global.guidelineSelectRegionWidth_$LI$();
                    this.v.CWDrawFilledRectangle(this.window, borderWidth1, borderWidth1 + this.__titleHeight,
                        this.w, selectRegionWidth, color);
                    this.v.CWDrawFilledRectangle(this.window, borderWidth1, borderWidth1 + this.__titleHeight +
                        this.h - 7, this.w, selectRegionWidth, color);
                    this.v.CWDrawFilledRectangle(this.window, borderWidth1, borderWidth1 + this.__titleHeight,
                        selectRegionWidth, this.h, color);
                    this.v.CWDrawFilledRectangle(this.window, borderWidth1 + this.w - 7, borderWidth1 +
                        this.__titleHeight, selectRegionWidth, this.h, color);
                }
                this.prepareElements();
                try {
                    this.drawBorder();
                    return true;
                } catch (e) {
                    dsector.DSReference.alertManager.messageQueued("Error drawing border of window '" +
                        this.nameID + "'. The window size may have been reduced because of lack of memory.");
                    return false;
                }
            }
        }

        /**
         * Prepares the elements of the window for drawing.
         *
         * @private
         */
        prepareElements() {
            let i;
            for (i = 0; i < this.numberOfTextElements; ++i) {
                this.drawTextElement(i);
            }
            for (i = 0; i < this.numberOfTextBlocks; ++i) {
                this.textBlock[i].draw();
            }
            for (i = 0; i < this.numberOfImages; ++i) {
                this.image[i].draw();
            }
            for (i = 0; i < this.numberOfImageElements; ++i) {
                this.drawImageElement(i);
            }
            for (i = 0; i < this.numberOfButtons; ++i) {
                this.button[i].draw();
            }
            for (i = 0; i < this.numberOfInputBoxes; ++i) {
                this.drawInputBox(i);
            }
            for (i = 0; i < this.numberOfTextAreas; ++i) {
                this.textArea[i].draw();
            }
            for (i = 0; i < this.numberOfCheckBoxes; ++i) {
                this.checkBox[i].draw();
            }
            for (i = 0; i < this.numberOfPulldowns; ++i) {
                this.pulldown[i].draw();
            }
            for (i = 0; i < this.numberOfStoredLines; ++i) {
                this.storedLine[i].draw();
            }
            this.xPrevPosition = this.xPosition;
            this.yPrevPosition = this.yPosition;
            if (this.hasScrollbar()) {
                this.scrollbar.renderScrollablePage();
            }
            if (this.hasScrollbar()) {
                this.scrollbar.draw();
            }
        }

        /**
         * Draws a text element.
         *
         * @param {number} item The index of the text element to draw.
         * @returns {boolean} True if the text element was drawn successfully, false otherwise.
         * @private
         */
        drawTextElement(item) {
            if (this.textElement[item].shadow) {
                this.v.setColor$intCWColor(CWSYSTEM.CWColor.__black());
                this.v.drawString$sd$n$s$n2$n3$b(this.window, this.w - this.borderWidth - this.textElement[item].x,
                    this.textElement[item].text, this.borderWidth + this.textElement[item].x + 1,
                    this.borderWidth + this.__titleHeight + this.textElement[item].y + 1, false);
            }
            this.v.setColor$intCWColor(this.textElement[item].textColor);
            this.v.drawString$sd$n$s$n2$n3$b(this.window, this.w - this.borderWidth - this.textElement[item].x,
                this.textElement[item].text, this.borderWidth + this.textElement[item].x,
                this.borderWidth + this.__titleHeight + this.textElement[item].y, false);
            return true;
        }

        /**
         * Draws an image element.
         *
         * @param {number} iD The index of the image element to draw.
         * @private
         */
        drawImageElement(iD) {
            CWSYSTEM.CWSReference.graphics.renderImage(this.window, this.imageElement[iD].filename,
                this.imageElement[iD].x, this.imageElement[iD].y);
        }

        /**
         * Draws an input box.
         *
         * @param {number} iD The index of the input box to draw.
         * @private
         */
        drawInputBox(iD) {
            this.v.setColor$intCWColor(this.titleTextColor);
            this.v.CWDrawRectangle(this.window, this.borderWidth + this.inputBox[iD].x,
                this.borderWidth + this.__titleHeight + this.inputBox[iD].y, this.inputBox[iD].length,
                this.inputBox[iD].height);
            this.v.CWDrawFilledRectangle(this.window, this.borderWidth + this.inputBox[iD].x + 1,
                this.borderWidth + this.__titleHeight + this.inputBox[iD].y + 1, this.inputBox[iD].length - 2,
                this.inputBox[iD].height - 2, this.inputBoxColor);
            if (this.inputBox[iD].text != null) {
                let text = this.inputBox[iD].text;
                if (this.inputBox[iD].blinkState) {
                    text = text.concat("|");
                }
                this.v.setColor$intCWColor(this.titleTextColor);
                this.v.drawString$sd$n$s$n2$n3$b(this.window, this.inputBox[iD].length,
                    text, this.borderWidth + this.inputBox[iD].x + 4,
                    this.borderWidth + this.__titleHeight + this.inputBox[iD].y + this.inputBox[iD].height - 3,
                    false);
            }
            return true;
        }

        /**
         * Adds a scrollbar to the window.
         */
        addScrollbar() {
            this.scrollbar = new CWSYSTEM.CWScrollbar(this);
        }

        /**
         * Removes the scrollbar from the window.
         */
        removeScrollbar() {
            this.scrollbar = null;
        }

        /**
         * Returns whether the window has a scrollbar.
         *
         * @returns {boolean} True if the window has a scrollbar, false otherwise.
         */
        hasScrollbar() {
            return this.scrollbar != null;
        }

        /**
         * Applies special effects to the window.
         *
         * @param {Array} effectArr The array of special effects to apply.
         * @param {number} x The x-coordinate of the window.
         * @param {number} y The y-coordinate of the window.
         */
        applySpecialEffects(effectArr, x, y) {
            if (this.dSecSpecialEffects != null) {
                for (const specialEffect of this.dSecSpecialEffects) {
                    if (specialEffect.type === dsector.DSecSpecialEffect.IMAGE_COMPOSITE) {
                        const minMax = {
                            minX: x,
                            minY: y,
                            maxX: x + this.w,
                            maxY: y + this.h
                        }
                        CWSYSTEM.CWImage.drawUsingBrightnessOverlayWithCropping(
                            specialEffect.image, effectArr, x + specialEffect.x, y + specialEffect.y,
                            specialEffect.brightness, minMax);
                    }
                }
            }
        }
    }

    /**
     * @property {number} maximumNumberOfButtons - The maximum number of buttons that can be created.
     * @property {number} maximumNumberOfImages - The maximum number of images that can be created.
     * @property {number} maximumNumberOfInputBoxes - The maximum number of input boxes that can be created.
     * @property {number} maximumNumberOfTextAreas - The maximum number of text areas that can be created.
     * @property {number} maximumNumberOfCheckBoxes - The maximum number of check boxes that can be created.
     * @property {number} maximumNumberOfTextElements - The maximum number of text elements that can be created.
     * @property {number} maximumNumberOfImageElements - The maximum number of image elements that can be created.
     * @property {number} maximumNumberOfTextBlocks - The maximum number of text blocks that can be created.
     * @property {number} maximumNumberOfPullDowns - The maximum number of pull downs that can be created.
     * @property {number} maximumNumberOfStoredLines - The maximum number of stored lines that can be created.
     */
    CWWindow.maximumNumberOfButtons = 100;
    CWWindow.maximumNumberOfImages = 100;
    CWWindow.maximumNumberOfInputBoxes = 100;
    CWWindow.maximumNumberOfTextAreas = 100;
    CWWindow.maximumNumberOfCheckBoxes = 100;
    CWWindow.maximumNumberOfTextElements = 400;
    CWWindow.maximumNumberOfImageElements = 100;
    CWWindow.maximumNumberOfTextBlocks = 400;
    CWWindow.maximumNumberOfPullDowns = 50;
    CWWindow.maximumNumberOfStoredLines = 100;
    CWSYSTEM.CWWindow = CWWindow;
    CWWindow["__class"] = "CWSYSTEM.CWWindow";
})(CWSYSTEM);