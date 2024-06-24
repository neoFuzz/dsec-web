/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    /** Class used to create and manage CWWindow windows*/
    class CWWindow {
        /** Represents a CWWindow object.
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
         * @constructor
         */
        constructor(virtualScreen, minWidth, minHeight, maxWidth, maxHeight,
                    nameId, style, title, xPosition, yPosition, w, h) {
            if (this.v === undefined) {
                this.v = null;
            }
            if (this.w === undefined) {
                this.w = 0;
            }
            if (this.h === undefined) {
                this.h = 0;
            }
            if (this.maxWidth === undefined) {
                this.maxWidth = 0;
            }
            if (this.maxHeight === undefined) {
                this.maxHeight = 0;
            }
            if (this.minWidth === undefined) {
                this.minWidth = 0;
            }
            if (this.minHeight === undefined) {
                this.minHeight = 0;
            }
            if (this.xPosition === undefined) {
                this.xPosition = 0;
            }
            if (this.yPosition === undefined) {
                this.yPosition = 0;
            }
            if (this.xPrevPosition === undefined) {
                this.xPrevPosition = 0;
            }
            if (this.yPrevPosition === undefined) {
                this.yPrevPosition = 0;
            }
            if (this.title === undefined) {
                this.title = null;
            }
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            if (this.style === undefined) {
                this.style = 0;
            }
            if (this.resizable === undefined) {
                this.resizable = false;
            }
            if (this.antiAliasedLevel === undefined) {
                this.antiAliasedLevel = 0;
            }
            if (this.useAntiAliasedContent === undefined) {
                this.useAntiAliasedContent = false;
            }
            if (this.hasInterfaceElements === undefined) {
                this.hasInterfaceElements = false;
            }
            if (this.ignoreWhenSavingAndRestoringEnvironment === undefined) {
                this.ignoreWhenSavingAndRestoringEnvironment = false;
            }
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.preAntiAliasedContent === undefined) {
                this.preAntiAliasedContent = null;
            }
            if (this.temporalSupersample === undefined) {
                this.temporalSupersample = null;
            }
            if (this.rememberedPostTimeSupersampledScreenData === undefined) {
                this.rememberedPostTimeSupersampledScreenData = null;
            }
            if (this.subframes === undefined) {
                this.subframes = 0;
            }
            if (this.depth === undefined) {
                this.depth = 0;
            }
            if (this.updated === undefined) {
                this.updated = false;
            }
            if (this.renderingRequired === undefined) {
                this.renderingRequired = false;
            }
            if (this.oldW === undefined) {
                this.oldW = 0;
            }
            if (this.oldH === undefined) {
                this.oldH = 0;
            }
            if (this.oldX === undefined) {
                this.oldX = 0;
            }
            if (this.oldY === undefined) {
                this.oldY = 0;
            }
            if (this.titleVisible === undefined) {
                this.titleVisible = false;
            }
            if (this.windowVisible === undefined) {
                this.windowVisible = false;
            }
            if (this.floating === undefined) {
                this.floating = false;
            }
            if (this.toBeDestroyed === undefined) {
                this.toBeDestroyed = false;
            }
            if (this.windowBGColor === undefined) {
                this.windowBGColor = null;
            }
            if (this.windowSecondaryBGColor === undefined) {
                this.windowSecondaryBGColor = null;
            }
            if (this.titleTextColor === undefined) {
                this.titleTextColor = null;
            }
            if (this.titleBGColor === undefined) {
                this.titleBGColor = null;
            }
            if (this.titleBGColorSecondary === undefined) {
                this.titleBGColorSecondary = null;
            }
            if (this.buttonColor === undefined) {
                this.buttonColor = null;
            }
            if (this.inputBoxColor === undefined) {
                this.inputBoxColor = null;
            }
            if (this.checkBoxColor === undefined) {
                this.checkBoxColor = null;
            }
            if (this.windowText === undefined) {
                this.windowText = null;
            }
            if (this.button === undefined) {
                this.button = null;
            }
            if (this.image === undefined) {
                this.image = null;
            }
            if (this.inputBox === undefined) {
                this.inputBox = null;
            }
            if (this.textArea === undefined) {
                this.textArea = null;
            }
            if (this.checkBox === undefined) {
                this.checkBox = null;
            }
            if (this.textElement === undefined) {
                this.textElement = null;
            }
            if (this.textBlock === undefined) {
                this.textBlock = null;
            }
            if (this.imageElement === undefined) {
                this.imageElement = null;
            }
            if (this.pulldown === undefined) {
                this.pulldown = null;
            }
            if (this.storedLine === undefined) {
                this.storedLine = null;
            }
            if (this.scrollbar === undefined) {
                this.scrollbar = null;
            }
            if (this.scrollablePage === undefined) {
                this.scrollablePage = null;
            }
            if (this.menuManager === undefined) {
                this.menuManager = null;
            }
            if (this.rightClickPopupMenu === undefined) {
                this.rightClickPopupMenu = null;
            }
            if (this.numberOfButtons === undefined) {
                this.numberOfButtons = 0;
            }
            if (this.numberOfImages === undefined) {
                this.numberOfImages = 0;
            }
            if (this.numberOfInputBoxes === undefined) {
                this.numberOfInputBoxes = 0;
            }
            if (this.numberOfTextAreas === undefined) {
                this.numberOfTextAreas = 0;
            }
            if (this.numberOfCheckBoxes === undefined) {
                this.numberOfCheckBoxes = 0;
            }
            if (this.numberOfTextElements === undefined) {
                this.numberOfTextElements = 0;
            }
            if (this.numberOfTextBlocks === undefined) {
                this.numberOfTextBlocks = 0;
            }
            if (this.numberOfImageElements === undefined) {
                this.numberOfImageElements = 0;
            }
            if (this.numberOfPulldowns === undefined) {
                this.numberOfPulldowns = 0;
            }
            if (this.numberOfStoredLines === undefined) {
                this.numberOfStoredLines = 0;
            }
            if (this.borderWidth === undefined) {
                this.borderWidth = 0;
            }
            if (this.borderPatternThickness === undefined) {
                this.borderPatternThickness = 0;
            }
            if (this.borderBitmap === undefined) {
                this.borderBitmap = null;
            }
            if (this.cornerBitmap === undefined) {
                this.cornerBitmap = null;
            }
            if (this.__titleHeight === undefined) {
                this.__titleHeight = 0;
            }
            if (this.subFrame === undefined) {
                this.subFrame = 0;
            }
            if (this.dSecSpecialEffects === undefined) {
                this.dSecSpecialEffects = null;
            }
            this.ignoreWhenSavingAndRestoringEnvironment = false;
            this.subframes = 0;
            this.resizable = true;
            this.minWidth = minWidth;
            this.minHeight = minHeight;
            this.maxWidth = maxWidth;
            this.maxHeight = maxHeight;
            this.style = style;
            this.borderWidth = CWSYSTEM.CWWindowStyles.getBorderWidth(this.style);
            this.borderPatternThickness = CWSYSTEM.CWWindowStyles.getBorderPatternThickness(this.style);
            this.__titleHeight = CWSYSTEM.CWWindowStyles.getTitleHeight(this.style);
            this.window = new CWSYSTEM.ScreenData(this.maxWidth + 2 * this.borderWidth,
                this.maxHeight + 2 * this.borderWidth + this.__titleHeight, "CWWindow with nameID " + nameId);
            this.v = virtualScreen;
            this.borderBitmap = CWSYSTEM.CWWindowStyles.getBorderBitmap(this.style);
            this.cornerBitmap = CWSYSTEM.CWWindowStyles.getCornerBitmap(this.style);
            this.updated = false;
            this.windowVisible = true;
            this.title = null;
            this.windowBGColor = CWSYSTEM.CWWindowStyles.getBackgroundColor(this.style);
            this.titleTextColor = new CWSYSTEM.CWColor(CWWindow.defaultTitleTextColor_$LI$());
            this.titleBGColor = new CWSYSTEM.CWColor(CWWindow.defaultTitleBGColor_$LI$());
            this.titleBGColorSecondary = new CWSYSTEM.CWColor(CWWindow.defaultTitleBGColorSecondary_$LI$());
            this.inputBoxColor = new CWSYSTEM.CWColor(CWWindow.defaultInputBoxColor_$LI$());
            this.checkBoxColor = new CWSYSTEM.CWColor(CWWindow.defaultCheckBoxColor_$LI$());
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
            this.numberOfButtons = 0;
            this.numberOfImages = 0;
            this.numberOfInputBoxes = 0;
            this.numberOfTextAreas = 0;
            this.numberOfCheckBoxes = 0;
            this.numberOfTextElements = 0;
            this.numberOfTextBlocks = 0;
            this.numberOfImageElements = 0;
            this.numberOfStoredLines = 0;
            this.antiAliasedLevel = 1;
            this.useAntiAliasedContent = false;
            this.hasInterfaceElements = true;
            this.scrollbar = null;
            this.depth = 0;
            if (title == null) {
                this.title = null;
                this.titleVisible = false;
            } else {
                this.title = title;
            }
            this.nameID = nameId;
            if (w < this.minWidth) {
                this.w = this.minWidth;
            } else {
                this.w = Math.min(w, CWSYSTEM.Global.screenResolutionX_$LI$() - 2 * this.borderWidth);
            }
            if (h < this.minHeight) {
                this.h = this.minHeight;
            } else {
                this.h = Math.min(h, CWSYSTEM.Global.screenResolutionY_$LI$() - 2 * this.borderWidth - this.__titleHeight);
            }
            if (xPosition <= this.borderWidth) {
                this.xPosition = this.borderWidth;
            } else if (xPosition + this.w + this.borderWidth >= CWSYSTEM.Global.screenResolutionX_$LI$()) {
                this.xPosition = CWSYSTEM.Global.screenResolutionX_$LI$() - this.w - this.borderWidth;
            } else {
                this.xPosition = xPosition;
            }
            if (yPosition <= this.v.topInset + this.borderWidth + this.titleHeight()) {
                this.yPosition = this.borderWidth + this.titleHeight() + this.v.topInset;
            } else if (yPosition + this.h + this.borderWidth + this.__titleHeight >= CWSYSTEM.Global.screenResolutionY_$LI$()) {
                this.yPosition = CWSYSTEM.Global.screenResolutionY_$LI$() - this.h - this.borderWidth - this.titleHeight();
            } else {
                this.yPosition = yPosition;
            }
            this.oldX = this.xPosition;
            this.oldY = this.yPosition;
            this.xPrevPosition = this.xPosition;
            this.yPrevPosition = this.yPosition;
            this.oldW = 0;
            this.oldH = 0;
            if (minHeight === maxHeight && minWidth === maxWidth) {
                this.resizable = false;
            }
        }

        static defaultTitleTextColor_$LI$() {
            if (CWWindow.defaultTitleTextColor == null) {
                CWWindow.defaultTitleTextColor = new CWSYSTEM.CWColor(0, 0, 80, 255);
            }
            return CWWindow.defaultTitleTextColor;
        }

        static defaultTitleBGColor_$LI$() {
            if (CWWindow.defaultTitleBGColor == null) {
                CWWindow.defaultTitleBGColor = new CWSYSTEM.CWColor(235, 235, 255, 255);
            }
            return CWWindow.defaultTitleBGColor;
        }

        static defaultTitleBGColorSecondary_$LI$() {
            if (CWWindow.defaultTitleBGColorSecondary == null) {
                CWWindow.defaultTitleBGColorSecondary = new CWSYSTEM.CWColor(185, 185, 205, 255);
            }
            return CWWindow.defaultTitleBGColorSecondary;
        }

        static defaultInputBoxColor_$LI$() {
            if (CWWindow.defaultInputBoxColor == null) {
                CWWindow.defaultInputBoxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWWindow.defaultInputBoxColor;
        }

        static defaultCheckBoxColor_$LI$() {
            if (CWWindow.defaultCheckBoxColor == null) {
                CWWindow.defaultCheckBoxColor = new CWSYSTEM.CWColor(255, 255, 220, 255);
            }
            return CWWindow.defaultCheckBoxColor;
        }

        static defaultWindowBGColor_$LI$() {
            if (CWWindow.defaultWindowBGColor == null) {
                CWWindow.defaultWindowBGColor = new CWSYSTEM.CWColor(110, 130, 170, 255);
            }
            return CWWindow.defaultWindowBGColor;
        }

        useAntiAliasedContentAreaAndNoInterfaceElements(aaLevel, subFrames) {
            this.antiAliasedLevel = aaLevel;
            this.useAntiAliasedContent = true;
            this.subframes = subFrames;
            this.temporalSupersample = Array(subFrames).fill(null);
            if (this.subframes >= 2) {
                for (let i = 0; i < this.subframes; ++i) {
                    this.temporalSupersample[i] = new CWSYSTEM.ScreenData(this.maxWidth, this.maxHeight,
                        "Subframe for antialiased content " + i);
                }
                this.rememberedPostTimeSupersampledScreenData = new CWSYSTEM.ScreenData(this.maxWidth,
                    this.maxHeight, "Remembered antialiased content for CWWindow " + this.nameID);
            }
            this.subFrame = 0;
            this.preAntiAliasedContent = new CWSYSTEM.ScreenData(this.maxWidth * aaLevel,
                this.maxHeight * aaLevel, "Antialiased content for CWWindow " + this.nameID);
            this.hasInterfaceElements = false;
        }

        useAntiAliasedContentAreaWithInterfaceElements(aaLevel, subFrames) {
            this.useAntiAliasedContentAreaAndNoInterfaceElements(aaLevel, subFrames);
            this.hasInterfaceElements = true;
        }

        titleHeight() {
            return this.titleVisible ? this.__titleHeight : 0;
        }

        setVisibility(visible) {
            this.windowVisible = visible;
            if (this.windowVisible) {
                CWSYSTEM.CWSReference.gui.moveWindowToTopByName(this.nameID);
            }
            this.updated = false;
        }

        changeBackgroundColor$CWColor(color) {
            this.windowBGColor = color;
            this.windowSecondaryBGColor = null;
        }

        changeBackgroundColor$color$color(color1, color2) {
            this.windowBGColor = color1;
            this.windowSecondaryBGColor = color2;
        }

        changeBackgroundColor(color1, color2) {
            if (((color1 != null && color1 instanceof CWSYSTEM.CWColor) || color1 === null) &&
                ((color2 != null && color2 instanceof CWSYSTEM.CWColor) || color2 === null)) {
                return this.changeBackgroundColor$color$color(color1, color2);
            } else if (((color1 != null && color1 instanceof CWSYSTEM.CWColor) || color1 === null) && color2 === undefined) {
                return this.changeBackgroundColor$CWColor(color1);
            } else
                throw new Error('invalid overload');
        }

        destroy() {
            CWSYSTEM.CWSReference.gui.destroyWindow(this.nameID);
        }

        moveToTop() {
            CWSYSTEM.CWSReference.gui.moveWindowToTopByName(this.nameID);
        }

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

        destroyAllElements() {
            this.destroyAllElementsExceptPulldownLists();
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                this.pulldown[i] = null;
            }
            this.numberOfPulldowns = 0;
        }

        centerWithinDesktop() {
            this.xPosition = Math.floor((CWSYSTEM.Global.screenResolutionX_$LI$() - this.w) / 2 | 0);
            this.yPosition = Math.floor((CWSYSTEM.Global.screenResolutionY_$LI$() - this.h) / 2 | 0);
        }

        addButton$name$x$y$len$h$resp(name, x, y, length, height, responds) {
            if (this.numberOfButtons >= CWWindow.maximumNumberOfButtons) {
                CWSYSTEM.Debug.error("Critical error: Maximum number of buttons exceeded");
                return null;
            } else {
                this.button[this.numberOfButtons] = new CWSYSTEM.CWButton(this, name, x, y, length, height, responds);
                ++this.numberOfButtons;
                return this.button[this.numberOfButtons - 1];
            }
        }

        addButton$name$x$y$len$h$text$t$r(name, x, y, length, height, text, type, responds) {
            if (this.numberOfButtons >= CWWindow.maximumNumberOfButtons) {
                CWSYSTEM.Debug.error("Critical error: Maximum number of buttons exceeded");
                return null;
            } else {
                this.button[this.numberOfButtons] =
                    new CWSYSTEM.CWButton(this, name, x, y, length, height, text, type, responds);
                ++this.numberOfButtons;
                return this.button[this.numberOfButtons - 1];
            }
        }

        addButton(name, x, y, length, height, text, type, responds) {
            if (((typeof name === 'string') || name === null) && ((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) && ((typeof length === 'number') || length === null) &&
                ((typeof height === 'number') || height === null) && ((typeof text === 'string') || text === null) &&
                ((typeof type === 'number') || type === null) && ((typeof responds === 'number') || responds === null)) {
                return this.addButton$name$x$y$len$h$text$t$r(name, x, y, length, height, text, type, responds);
            } else if (((typeof name === 'string') || name === null) &&
                ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) &&
                ((typeof length === 'number') || length === null) &&
                ((typeof height === 'number') || height === null) && ((typeof text === 'number') || text === null) &&
                type === undefined && responds === undefined) {
                return this.addButton$name$x$y$len$h$resp(name, x, y, length, height, text);
            } else
                throw new Error('invalid overload');
        }

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

        getButton(name) {
            for (let i = 0; i < this.numberOfButtons; ++i) {
                if (this.button[i].name === name) {
                    return this.button[i];
                }
            }
            return null;
        }

        addImage(nameID, x, y, path, color) {
            this.image[this.numberOfImages++] = new CWSYSTEM.CWImage(this, nameID, x, y, path, color);
            return this.image[this.numberOfImages - 1];
        }

        addPulldown(name, options, x, y, width, height) {
            this.pulldown[this.numberOfPulldowns++] = new CWSYSTEM.CWPulldown(this, name, options, x, y, width, height);
            return this.pulldown[this.numberOfPulldowns - 1];
        }

        getPulldown(name) {
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                if (this.pulldown[i].name === name) {
                    return this.pulldown[i];
                }
            }
            return null;
        }

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

        getTextArea(name) {
            for (let i = 0; i < this.numberOfTextAreas; ++i) {
                if (this.textArea[i].name === name) {
                    return this.textArea[i];
                }
            }
            return null;
        }

        getTextBlock(name) {
            for (let i = 0; i < this.numberOfTextBlocks; ++i) {
                if (this.textBlock[i].nameID === name) {
                    return this.textBlock[i];
                }
            }
            return null;
        }

        addInputBox(name, x, y, length, text) {
            if (this.numberOfInputBoxes >= CWWindow.maximumNumberOfInputBoxes) {
                return null;
            } else {
                this.inputBox[this.numberOfInputBoxes] = new CWSYSTEM.CWInputBox(this, name, x, y, length, text);
                ++this.numberOfInputBoxes;
                return this.inputBox[this.numberOfInputBoxes - 1];
            }
        }

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

        getInputBox(name) {
            for (let i = 0; i < this.numberOfInputBoxes; ++i) {
                if (this.inputBox[i].name === name) {
                    return this.inputBox[i];
                }
            }
            return null;
        }

        addCheckBox(name, x, y, selected) {
            return this.addRadioButton(name, x, y, selected, -1);
        }

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

        getCheckBox(name) {
            for (let i = 0; i < this.numberOfCheckBoxes; ++i) {
                if (this.checkBox[i].name === name) {
                    return this.checkBox[i];
                }
            }
            return null;
        }

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

        addStoredLine(x0, y0, x1, y1, red, green, blue, alpha) {
            if (this.numberOfStoredLines < CWWindow.maximumNumberOfStoredLines) {
                this.storedLine[this.numberOfStoredLines] =
                    new CWSYSTEM.CWStoredLine(this, x0, y0, x1, y1, red, green, blue, alpha);
                ++this.numberOfStoredLines;
                this.updated = false;
            }
        }

        addTextElement(name, text, x, y, color) {
            if (this.numberOfTextElements < CWWindow.maximumNumberOfTextElements) {
                this.textElement[this.numberOfTextElements] = new CWSYSTEM.CWTextElement(name, text, x, y, color);
                ++this.numberOfTextElements;
                this.updated = false;
            }
        }

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

        addTextBlock(nameId, text, leftMargin, baseLine, font, color, width) {
            if (this.numberOfTextBlocks >= CWWindow.maximumNumberOfTextBlocks) {
                return null;
            } else {
                this.textBlock[this.numberOfTextBlocks] =
                    new CWSYSTEM.CWTextBlock(this, nameId, text, leftMargin, baseLine, font, color, width);
                ++this.numberOfTextBlocks;
                this.updated = false;
                return this.textBlock[this.numberOfTextBlocks - 1];
            }
        }

        addImageElement(nameID, fileName, x, y) {
            if (this.numberOfImageElements < CWWindow.maximumNumberOfImageElements) {
                this.imageElement[this.numberOfImageElements] = new CWSYSTEM.CWImageElement(nameID, fileName, x, y);
                ++this.numberOfImageElements;
                this.updated = false;
            }
        }

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

        pulldownThatMouseIsOver(x, y) {
            let pulldown1 = null;
            for (let i = 0; i < this.numberOfPulldowns; ++i) {
                if (x >= this.xPosition + this.pulldown[i].x && x <= this.xPosition + this.pulldown[i].x +
                    this.pulldown[i].width && y >= this.yPosition + this.pulldown[i].y && y <= this.yPosition +
                    this.pulldown[i].y + this.pulldown[i].height) {
                    pulldown1 = this.pulldown[i];
                    break;
                }
            }
            return pulldown1;
        }

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

        mouseOverTitleArea(x, y) {
            return x >= this.xPosition - this.borderWidth &&
                x <= this.xPosition + this.w + this.borderWidth &&
                y >= this.yPosition - this.borderWidth - this.__titleHeight &&
                y <= this.yPosition - this.borderWidth - this.__titleHeight + this.titleBarHeight();
        }

        clearContentArea() {
            if (this.useAntiAliasedContent) {
                this.v.CWDrawFilledRectangle(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, CWSYSTEM.CWColor.transparentBlack_$LI$());
            } else if (this.windowSecondaryBGColor == null) {
                this.v.CWDrawFilledRectangle(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, this.windowBGColor);
            } else {
                this.v.CWDrawFilledRectangleWithGradient(this.window, this.borderWidth, this.borderWidth + this.__titleHeight,
                    this.w, this.h, this.windowBGColor, this.windowSecondaryBGColor);
            }
        }

        clearPreAntiAliasedContent() {
            this.v.CWDrawFilledRectangle(this.preAntiAliasedContent, 0, 0, this.w * this.antiAliasedLevel,
                this.h * this.antiAliasedLevel, this.windowBGColor);
        }

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
                    color1 = CWSYSTEM.FastColorUtilities.color$r$g$b$a(this.borderBitmap[0][k][0],
                        this.borderBitmap[0][k][1], this.borderBitmap[0][k][2], this.borderBitmap[0][k][3]);
                    this.v.fastHorizontalLine(this.window, this.borderWidth,
                        this.__titleHeight + k, this.w, color1);
                    this.v.fastHorizontalLine(this.window, this.borderWidth,
                        this.h + 2 * this.borderWidth + this.__titleHeight - k - 1, this.w, color1);
                }
            }
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

        titleBarSag() {
            return this.style === CWSYSTEM.CWWindowStyles.ROUNDED ? 1 : 2;
        }

        titleBarVerticalSpace() {
            return 2;
        }

        titleTextWidth() {
            CWSYSTEM.CWFontTools.renderText(null, this.title, 0, 0, this.v.serif8_font,
                CWSYSTEM.CWColor.black_$LI$(), 9999);
            return CWSYSTEM.CWFontTools.RENDERED_WIDTH;
        }

        titleTextHeight() {
            const height = this.title != null ? this.title : "";
            return CWSYSTEM.CWFontTools.heightOfParagraph(height, this.v.serif8_font, 9999, false);
        }

        titleTextVerticalOffset() {
            if (this.style === CWSYSTEM.CWWindowStyles.ROUNDED) {
                return 2;
            } else {
                return this.style === 1 ? 0 : 1;
            }
        }

        titleBarWidth() {
            return this.titleTextWidth() + 10;
        }

        titleBarHeight() {
            return this.titleTextHeight() + 2 * this.titleBarVerticalSpace() - 1;
        }

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
                try {
                    this.drawBorder();
                    return true;
                } catch (e) {
                    dsector.DSReference.alertManager.messageQueued("Error drawing border of window \'" +
                        this.nameID + "\'. The window size may have been reduced because of lack of memory.");
                    return false;
                }
            }
        }

        drawTextElement(item) {
            if (this.textElement[item].shadow) {
                this.v.setColor$intCWColor(CWSYSTEM.CWColor.black_$LI$());
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

        drawImageElement(iD) {
            CWSYSTEM.CWSReference.graphics.renderImage(this.window, this.imageElement[iD].filename,
                this.imageElement[iD].x, this.imageElement[iD].y);
        }

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

        addScrollbar() {
            this.scrollbar = new CWSYSTEM.CWScrollbar(this);
        }

        removeScrollbar() {
            this.scrollbar = null;
        }

        hasScrollbar() {
            return this.scrollbar != null;
        }

        applySpecialEffects(effectArr, x, y) {
            if (this.dSecSpecialEffects != null) {
                for (let i = 0; i < this.dSecSpecialEffects.length; ++i) {
                    const specialEffect = this.dSecSpecialEffects[i];
                    if (specialEffect.type === dsector.DSecSpecialEffect.IMAGE_COMPOSITE) {
                        CWSYSTEM.CWImage.drawUsingBrightnessOverlayWithCropping(
                            specialEffect.image, effectArr, x + specialEffect.x, y + specialEffect.y,
                            specialEffect.brightness, x, y, x + this.w, y + this.h);
                    }
                }
            }
        }
    }

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
})(CWSYSTEM || (CWSYSTEM = {}));
