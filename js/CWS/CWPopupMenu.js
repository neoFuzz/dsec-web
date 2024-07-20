(function (CWSYSTEM) {
    /**
     * Represents a CWPopupMenu class.
     *
     * @property {number} CONNECTED_MENU - Constant representing a connected menu.
     * @property {number} RIGHT_CLICK_MENU - Constant representing a right-click menu.
     * @property {CWSYSTEM.CWPopupMenu} rightClickMenu - The right-click menu.
     * @property {number} cycleInWhichPopupOpened - The cycle in which the popup menu was opened.
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
    class CWPopupMenu {
        /**
         * Constructor for CWPopupMenu.
         *
         * @param {(CWSYSTEM.CWMenu|CWSYSTEM.CWWindow|CWSYSTEM.CWWindowCollection|null)} menu - The menu, window, or window collection.
         * @param {string|null} title - The title of the menu.
         */
        constructor(menu, title) {
            this.type = 0;
            this.window = null;
            this.menuTitle = null;
            this.parentMenu = null;
            this.popupMenuItems = null;

            if ((menu instanceof CWSYSTEM.CWMenu || menu === null) && (typeof title === 'string' || title === null)) {
                this.type = CWPopupMenu.CONNECTED_MENU;
                this.popupMenuItems = [];
                this.menuTitle = title;
                this.parentMenu = menu;
            } else if ((menu instanceof CWSYSTEM.CWWindow || menu === null) &&
                (typeof title === 'string' || title === null)) {
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = [];
                this.menuTitle = title;
                menu.rightClickPopupMenu = this;
            } else if ((menu instanceof CWSYSTEM.CWWindowCollection || menu === null) &&
                (typeof title === 'string' || title === null)) {
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = [];
                this.menuTitle = title;
                menu.rightClickPopupMenu = this;
            } else if (menu === undefined && title === undefined) {
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = [];
                if (CWPopupMenu.rightClickMenu != null && CWPopupMenu.rightClickMenu.isPoppedUp()) {
                    CWPopupMenu.rightClickMenu.destroy();
                }
                CWPopupMenu.rightClickMenu = this;
            } else {
                throw new Error('Invalid overload');
            }
        }

        /**
         * Handles the mouse click event.
         *
         * @static
         */
        static mouseClicked() {
            if (CWPopupMenu.cycleInWhichPopupOpened !== CWSYSTEM.Environment.cycleID$()) {
                for (let i = 0; i < CWSYSTEM.CWSReference.gui.numberOfWindows(); ++i) {
                    const window1 = CWSYSTEM.CWSReference.gui.getWindow$int(i);
                    if (window1.rightClickPopupMenu != null) {
                        window1.rightClickPopupMenu.destroy();
                    }
                }
                if (CWSYSTEM.CWSReference.gui.rightClickPopupMenu != null) {
                    CWSYSTEM.CWSReference.gui.rightClickPopupMenu.destroy();
                }
                if (CWPopupMenu.rightClickMenu != null) {
                    CWPopupMenu.rightClickMenu.destroy();
                }
            }
        }

        /**
         * Gets the type of the popup menu.
         *
         * @returns {number} The type of the popup menu.
         */
        getType() {
            return this.type;
        }

        /**
         * Adds a menu item separator.
         *
         * @returns {CWSYSTEM.CWPopupMenuItem} The added menu item.
         */
        addMenuItem$() {
            return this.addMenuItem(
                CWSYSTEM.CWPopupMenuItem.SEPARATOR, "", "", null, false);
        }

        /**
         * Adds a menu item with detailed parameters.
         *
         * @param {number} type - The type of the menu item.
         * @param {string} code - The code of the menu item.
         * @param {string} text - The text of the menu item.
         * @param {string} scTxt - The shortcut text of the menu item.
         * @param {boolean} btSt - The bullet status of the menu item.
         * @returns {CWSYSTEM.CWPopupMenuItem} The added menu item.
         */
        addMenuItem(type, code, text, scTxt, btSt) {
            const popupMenuItem = new CWSYSTEM.CWPopupMenuItem(type, code, text,
                scTxt, btSt, null, null);
            this.popupMenuItems.push(popupMenuItem);
            return popupMenuItem;
        }

        /**
         * Adds a detailed menu item with additional parameters.
         *
         * @param {number} type - The type of the menu item.
         * @param {string} code - The code of the menu item.
         * @param {string} text - The text of the menu item.
         * @param {string} shortcutText - The shortcut text of the menu item.
         * @param {Object} invokedFrom - The object from which the method is invoked.
         * @param {CWSYSTEM.CWReflect} btStFrmMthd - The method to determine bullet status.
         * @param {Object} objInvMthdFrm - The object to invoke execute method from.
         * @param {Object} exeMthdSel - The method to execute upon selection.
         * @param {Array} paramsExeMthd - The parameters for the execute method.
         * @returns {CWSYSTEM.CWPopupMenuItem} The added menu item.
         */
        addMenuItem$Detailed(type, code, text, shortcutText, invokedFrom, btStFrmMthd,
                             objInvMthdFrm, exeMthdSel, paramsExeMthd) {
            const popupMenuItem = new CWSYSTEM.CWPopupMenuItem(type, code, text, shortcutText,
                false, invokedFrom, btStFrmMthd);
            popupMenuItem.objectToInvokeExecuteMethodFrom = objInvMthdFrm;
            popupMenuItem.executeMethodUponSelection = exeMthdSel;
            popupMenuItem.parametersForExecuteMethod = paramsExeMthd;
            this.popupMenuItems.push(popupMenuItem);
            return popupMenuItem;
        }

        /**
         * Pop up the menu.
         */
        popup$() {
            if (!this.isPoppedUp()) {
                let mouseX = 0;
                let mouseY = 0;
                if (this.type === CWPopupMenu.CONNECTED_MENU) {
                    if (this.parentMenu != null && this.parentMenu.window != null) {
                        const button = this.parentMenu.getMenuButtonFromPopupMenu(this);
                        if (button != null) {
                            mouseX = button.x + this.parentMenu.window.xPosition;
                            mouseY = this.parentMenu.window.h + CWPopupMenu.verticalOffsetFromMenu +
                                this.parentMenu.window.yPosition;
                        }
                    }
                } else {
                    mouseX = CWSYSTEM.Environment.mouseX$();
                    mouseY = CWSYSTEM.Environment.mouseY$();
                }
                this.popup$JCFont(mouseX, mouseY, 16,
                    CWSYSTEM.CWSReference.virtualScreen.serif8_font, 40, 5, 1, 0, 0, 2);
                CWPopupMenu.cycleInWhichPopupOpened = CWSYSTEM.Environment.cycleID$();
            }
        }

        /**
         * Create popup with customised parameters.
         *
         * @param {number} xPos - The x position of the popup.
         * @param {number} yPos - The y position of the popup.
         * @param {number} btnHgt - The height of the buttons.
         * @param {CWSYSTEM.CWFont} font - The font of the buttons.
         * @param {number} pxlSize - The pixel size of the buttons.
         * @param {number} xWidth - The x width of the buttons.
         * @param {number} he - The height of the popup.
         * @param {number} btnX - The x position of the buttons.
         * @param {number} pHeight - The height of the popup.
         * @param {number} hMt - The height of the margin.
         */
        popup$JCFont(xPos, yPos, btnHgt, font, pxlSize, xWidth,
                     he, btnX, pHeight, hMt) {
            if (!this.isPoppedUp()) {
                const hc = 0;
                let pixel = 0;
                let h1 = hc + pHeight;
                let i;
                for (i = 0; i < this.popupMenuItems.length; ++i) {
                    const popupMenuItem = this.popupMenuItems[i];
                    const lenPixels = CWSYSTEM.CWFontTools.textLengthInPixels(
                        popupMenuItem.text + popupMenuItem.shortcutText, font);
                    if (lenPixels > pixel) {
                        pixel = lenPixels;
                    }
                    if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.SEPARATOR) {
                        h1 += hMt;
                        h1 += hMt;
                    } else {
                        h1 += btnHgt;
                    }
                    if (i < this.popupMenuItems.length - 1) {
                        h1 += he;
                    }
                }
                i = pixel + pxlSize;
                h1 += pHeight;
                const byteCalc = 0;
                const w1 = byteCalc + 2 * btnX + 2 * xWidth + i;
                const name = "POPUP_" + ((Math.random() * 10000.0) | 0);
                this.window = CWSYSTEM.CWSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                    name, CWSYSTEM.CWWindowStyles.ROUNDED, "", xPos, yPos, w1 + 1, h1 + 1, true);
                this.window.titleVisible = false;
                this.window.ignoreWhenSavingAndRestoringEnvironment = true;
                this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(200, 200, 255, 150));
                const base1 = 0;
                let btnY = base1 + pHeight;
                for (let index = 0; index < this.popupMenuItems.length; index++) {
                    let menuItem = this.popupMenuItems[index];
                    {
                        const popupMenuItem = menuItem;
                        if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.SEPARATOR) {
                            btnY += hMt;
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY - 1,
                                w1 - CWPopupMenu.separatorMargin, btnY - 1, 30, 0, 0, 155);
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY,
                                w1 - CWPopupMenu.separatorMargin, btnY, 210, 210, 210, 255);
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY + 1,
                                w1 - CWPopupMenu.separatorMargin, btnY + 1, 0, 0, 30, 155);
                            btnY += hMt;
                        } else {
                            let strBullet = "";
                            if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.BULLETED) {
                                if (popupMenuItem.bulletStatus()) {
                                    strBullet = "o";
                                } else {
                                    strBullet = "";
                                }
                            }
                            const btnLen = xWidth * 2 + i;
                            const button = this.window.addButton(popupMenuItem.code, btnX, btnY,
                                btnLen, btnHgt, strBullet, CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON,
                                CWSYSTEM.CWButton.PRESSED);
                            button.generalPurposeObject = popupMenuItem.generalPurposeObject;
                            button.secondText = popupMenuItem.text;
                            button.shortcutText = popupMenuItem.shortcutText;
                            button.secondTextHorizontalOffset = 10;
                            button.textAlignment = CWSYSTEM.CWButton.LEFT;
                            button.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__navy());
                            button.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
                            button.secondaryBackgroundColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__lightGrey());
                            button.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__nearBlack());
                            button.secondaryBackgroundColorHighlighted =
                                new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__brightBlue());
                            button.fillStyle = CWSYSTEM.CWButton.LINEAR_GRADIENT;
                            button.onPressedMethod = popupMenuItem.executeMethodUponSelection;
                            button.onPressedObject = popupMenuItem.objectToInvokeExecuteMethodFrom;
                            button.onPressedParameters = popupMenuItem.parametersForExecuteMethod;
                            btnY += btnHgt;
                        }
                        btnY += he;
                    }
                }
            }
        }

        /**
         * Pops up the menu at the specified position.
         *
         * @param {number} [xPos] - The x position of the popup.
         * @param {number} [yPos] - The y position of the popup.
         * @param {number} [btnHgt] - The height of the button.
         * @param {CWSYSTEM.CWFont} [font] - The font of the popup menu.
         * @param {number} [pxlSize] - The pixel size.
         * @param {number} [xWidth] - The width of the x-axis.
         * @param {number} [he] - The height element.
         * @param {number} [btnX] - The x position of the button.
         * @param {number} [height5] - The height 5.
         * @param {number} [hMt] - The height margin top.
         */
        popup(xPos, yPos, btnHgt, font, pxlSize,
              xWidth, he, btnX, height5, hMt) {
            if (typeof xPos === 'number' && typeof yPos === 'number' &&
                typeof btnHgt === 'number' && font instanceof CWSYSTEM.CWFont &&
                typeof pxlSize === 'number' && typeof xWidth === 'number' &&
                typeof he === 'number' && typeof btnX === 'number' &&
                typeof height5 === 'number' && typeof hMt === 'number') {
                return this.popup$JCFont(xPos, yPos, btnHgt,
                    font, pxlSize, xWidth, he, btnX, height5, hMt);
            } else if (xPos === undefined && yPos === undefined && btnHgt === undefined &&
                font === undefined && pxlSize === undefined && xWidth === undefined &&
                he === undefined && btnX === undefined && height5 === undefined &&
                hMt === undefined) {
                return this.popup$();
            } else {
                throw new Error('Invalid overload');
            }
        }

        /**
         * Destroys the popup menu.
         */
        destroy() {
            if (this.window != null) {
                this.window.destroy();
                this.window = null;
            }
        }

        /**
         * Checks if the popup menu is popped up.
         *
         * @returns {boolean} True if the popup menu is popped up, otherwise false.
         */
        isPoppedUp() {
            return this.window != null;
        }
    }

    /**
     * Constant representing a right-click menu.
     * @constant
     * @type {number}
     * @default
     */
    CWPopupMenu.RIGHT_CLICK_MENU = 0;
    /**
     * Constant representing a connected menu.
     * @constant
     * @type {number}
     * @default
     */
    CWPopupMenu.CONNECTED_MENU = 1;
    /**
     * Constant representing the vertical offset from the menu.
     * @constant
     * @type {number}
     * @default
     */
    CWPopupMenu.verticalOffsetFromMenu = 5;
    /**
     * The right-click menu.
     * @static
     * @type {Object}
     * @default
     */
    CWPopupMenu.rightClickMenu = null;
    /**
     * The cycle in which a popup was opened.
     * @static
     * @type {number}
     * @default
     */
    CWPopupMenu.cycleInWhichPopupOpened = 0;
    /**
     * The margin for the separator.
     * @static
     * @type {number}
     * @default
     */
    CWPopupMenu.separatorMargin = 0;
    CWSYSTEM.CWPopupMenu = CWPopupMenu;
    CWPopupMenu["__class"] = "CWSYSTEM.CWPopupMenu";
})(CWSYSTEM || (CWSYSTEM = {}));