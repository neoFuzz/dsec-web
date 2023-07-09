var CWSYSTEM;
(function (CWSYSTEM) {
    class CWMenu {
        constructor(name) {
            if (this.popupMenus === undefined) {
                this.popupMenus = null;
            }
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.mode === undefined) {
                this.mode = 0;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.buildX === undefined) {
                this.buildX = 0;
            }
            if (this.buildY === undefined) {
                this.buildY = 0;
            }
            this.name = name;
            this.popupMenus = ([]);
            this.mode = CWMenu.INACTIVE;
            this.buildX = 15;
            this.buildY = dsector.DSReference.virtualScreen.topInset + 10;
        }

        static mouseClicked() {
            if (CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened !== CWSYSTEM.Environment.cycleID_$LI$()) {
                for (let i = 0; i < dsector.DSReference.gui.numberOfWindows(); ++i) {
                    const guiWindow = dsector.DSReference.gui.getWindow$int(i);
                    if (guiWindow.menuManager != null && guiWindow.menuManager.mode === CWMenu.ACTIVE) {
                        guiWindow.menuManager.mode = CWMenu.INACTIVE;
                        guiWindow.menuManager.destroyAllOpenPopupMenus();
                    }
                }
            }
        }

        static menuTitlePressed(pressed) {
            if (CWSYSTEM.Environment.cycleID_$LI$() !== CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened) {
                const whatPressed = CWSYSTEM.CWStringTools.messagesBetweenCharacters(
                    pressed, '(', ')')[0];
                const anInt = parseInt(CWSYSTEM.CWStringTools.messagesBetweenCharacters(
                    pressed, '[', ']')[0]);
                let cwWindow = null;
                for (let i = 0; i < dsector.DSReference.gui.numberOfWindows(); ++i) {
                    const guiWindow = dsector.DSReference.gui.getWindow$int(i);
                    if (guiWindow.menuManager != null && (guiWindow.menuManager.name === whatPressed)) {
                        cwWindow = guiWindow;
                        break;
                    }
                }
                if (cwWindow == null) {
                    CWSYSTEM.CWSReference.alertManager.messageQueued("A button was pressed with name \'" +
                        pressed + "\' but no menu was found for this window.");
                } else {
                    const menuManager = cwWindow.menuManager;
                    menuManager.destroyAllOpenPopupMenus();
                    if (menuManager.mode === CWMenu.ACTIVE) {
                        menuManager.mode = CWMenu.INACTIVE;
                    } else {
                        menuManager.mode = CWMenu.ACTIVE;
                        const popupMenu = menuManager.popupMenus[anInt];
                        popupMenu.popup$();
                        CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened = CWSYSTEM.Environment.cycleID_$LI$();
                    }
                }
            }
        }

        static mouseMovedOverButton(cwButton) {
            const btnName = cwButton.name;
            if (btnName.length > 11 && ((str, searchString, position = 0) => str.substring(
                position, searchString.length) === searchString)(btnName, "MENU_BUTTON")) {
                const msgBetweenChar = CWSYSTEM.CWStringTools.messagesBetweenCharacters(btnName, '(', ')')[0];
                const gap = parseInt(CWSYSTEM.CWStringTools.messagesBetweenCharacters(btnName, '[', ']')[0]);
                let window0 = null;
                for (let i = 0; i < dsector.DSReference.gui.numberOfWindows(); ++i) {
                    const window1 = dsector.DSReference.gui.getWindow$int(i);
                    if (window1.menuManager != null && (window1.menuManager.name === msgBetweenChar)) {
                        window0 = window1;
                        break;
                    }
                }
                if (window0.menuManager == null) {
                    return;
                }
                const menuManager = window0.menuManager;
                if (menuManager.mode === CWMenu.ACTIVE) {
                    menuManager.destroyAllOpenPopupMenus();
                    const popupMenu = menuManager.popupMenus[gap];
                    popupMenu.popup$();
                }
            }
        }

        addMenu(popupMenu) {
            this.popupMenus.push(popupMenu);
        }

        setBuildPosition(buildX, buildY) {
            this.buildX = buildX;
            this.buildY = buildY;
        }

        build$() {
            this.build$int$int$int$Font$int$int$int$int(
                this.buildX, this.buildY, 15, dsector.DSReference.virtualScreen.serif8_font,
                7, 1, 0, 0);
        }

        build$int$int$int$Font$int$int$int$int(buildX, buildY, height, font, inWidth, maxWidth, width, y1) {
            const baseW = 0;
            let width1 = baseW + width;
            let height1;
            for (height1 = 0; height1 < this.popupMenus.length; ++height1) {
                const popupMenu = this.popupMenus[height1];
                width1 += inWidth;
                width1 += CWSYSTEM.CWFontTools.textLengthInPixels(popupMenu.menuTitle, font);
                width1 += inWidth;
                if (height1 < this.popupMenus.length - 1) {
                    width1 += maxWidth;
                }
            }
            width1 += width;
            height1 = y1 * 2 + height;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                this.name, 3, "", buildX, buildY, width1 + 1, height1 + 1, true);
            this.window.titleVisible = false;
            this.window.menuManager = this;
            this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(200, 200, 255, 150));
            const bWidth = 0;
            let x1 = bWidth + width;
            for (let k = 0; k < this.popupMenus.length; ++k) {
                const popupMenu = this.popupMenus[k];
                const length2 = inWidth * 2 + CWSYSTEM.CWFontTools.textLengthInPixels(popupMenu.menuTitle, font);
                const button = this.window.addButton$name$x$y$len$h$text$t$r(
                    "MENU_BUTTON(" + this.name + ")[" + k + "]", x1, y1, length2, height,
                    popupMenu.menuTitle, 9, 1);
                button.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
                button.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                button.secondaryBackgroundColor = new CWSYSTEM.CWColor(180, 180, 180, 255);
                button.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.nearBlack_$LI$());
                button.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$());
                button.fillStyle = CWSYSTEM.CWButton.LINEAR_GRADIENT;
                x1 += length2 + maxWidth;
            }
        }

        build(buildX, buildY, height, font, inWidth, maxWidth, width, y1) {
            if (typeof buildX === 'number' && typeof buildY === 'number' &&
                typeof height === 'number' && font instanceof CWSYSTEM.CWFont &&
                typeof inWidth === 'number' && typeof maxWidth === 'number' &&
                typeof width === 'number' && typeof y1 === 'number') {
                return this.build$int$int$int$Font$int$int$int$int(buildX, buildY, height, font,
                    inWidth, maxWidth, width, y1);
            } else if (buildX === undefined && buildY === undefined && height === undefined &&
                font === undefined && inWidth === undefined && maxWidth === undefined &&
                width === undefined && y1 === undefined) {
                return this.build$();
            } else {
                throw new Error('Invalid overload');
            }
        }

        destroyAllOpenPopupMenus() {
            for (let i = 0; i < this.popupMenus.length; ++i) {
                const popupMenu = this.popupMenus[i];
                if (popupMenu.isPoppedUp()) {
                    popupMenu.destroy();
                }
            }
        }

        destroy() {
            if (this.window != null) {
                this.destroyAllOpenPopupMenus();
                this.window.destroy();
                this.window = null;
            }
        }

        getMenuButtonFromPopupMenu(popupMenu) {
            if (this.window != null) {
                for (let i = 0; i < this.popupMenus.length; ++i) {
                    if (popupMenu === this.popupMenus[i]) {
                        return this.window.getButton("MENU_BUTTON(" + this.name + ")[" + i + "]");
                    }
                }
            }
            return null;
        }
    }

    CWMenu.INACTIVE = 0;
    CWMenu.ACTIVE = 1;
    CWSYSTEM.CWMenu = CWMenu;
    CWMenu["__class"] = "CWSYSTEM.CWMenu";
})(CWSYSTEM || (CWSYSTEM = {}));
