/* re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWPopupMenu {
        constructor(menu, title) {
            if (((menu != null && menu instanceof CWSYSTEM.CWMenu) || menu === null) &&
                ((typeof title === 'string') || title === null)) {
                let __args = arguments;
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.menuTitle === undefined) {
                    this.menuTitle = null;
                }
                if (this.parentMenu === undefined) {
                    this.parentMenu = null;
                }
                if (this.popupMenuItems === undefined) {
                    this.popupMenuItems = null;
                }
                this.type = CWPopupMenu.CONNECTED_MENU;
                this.popupMenuItems = ([]);
                this.menuTitle = title;
                this.parentMenu = menu;
            }
            else if (((menu != null && menu instanceof CWSYSTEM.CWWindow) || menu === null) &&
                ((typeof title === 'string') || title === null)) {
                let __args = arguments;
                let window = __args[0];
                let menuTitle = __args[1];
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.menuTitle === undefined) {
                    this.menuTitle = null;
                }
                if (this.parentMenu === undefined) {
                    this.parentMenu = null;
                }
                if (this.popupMenuItems === undefined) {
                    this.popupMenuItems = null;
                }
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = ([]);
                this.menuTitle = menuTitle;
                window.rightClickPopupMenu = this;
            }
            else if (((menu != null && menu instanceof CWSYSTEM.CWWindowCollection) || menu === null) &&
                ((typeof title === 'string') || title === null)) {
                let __args = arguments;
                let windowCollection = __args[0];
                let menuTitle = __args[1];
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.menuTitle === undefined) {
                    this.menuTitle = null;
                }
                if (this.parentMenu === undefined) {
                    this.parentMenu = null;
                }
                if (this.popupMenuItems === undefined) {
                    this.popupMenuItems = null;
                }
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = ([]);
                this.menuTitle = menuTitle;
                windowCollection.rightClickPopupMenu = this;
            }
            else if (menu === undefined && title === undefined) {
                let __args = arguments;
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.window === undefined) {
                    this.window = null;
                }
                if (this.menuTitle === undefined) {
                    this.menuTitle = null;
                }
                if (this.parentMenu === undefined) {
                    this.parentMenu = null;
                }
                if (this.popupMenuItems === undefined) {
                    this.popupMenuItems = null;
                }
                this.type = CWPopupMenu.RIGHT_CLICK_MENU;
                this.popupMenuItems = ([]);
                if (CWPopupMenu.rightClickMenu != null && CWPopupMenu.rightClickMenu.isPoppedUp()) {
                    CWPopupMenu.rightClickMenu.destroy();
                }
                CWPopupMenu.rightClickMenu = this;
            }
            else
                throw new Error('invalid overload');
        }
        getType() {
            return this.type;
        }
        addMenuItem$() {
            return this.addMenuItem$int$String$String$String$boolean(
                CWSYSTEM.CWPopupMenuItem.SEPARATOR, "", "", null, false);
        }
        addMenuItem$int$String$String$String$boolean(type, code, text, shortcutText, bulletStatus) {
            const popupMenuItem = new CWSYSTEM.CWPopupMenuItem(type, code, text, shortcutText, bulletStatus, null, null);
            this.popupMenuItems.push(popupMenuItem);
            return popupMenuItem;
        }
        addMenuItem$type$code$text$String$Object$Method(type, code, text, shortcutText, invokedFrom, bulletStatusByMethod) {
            const popupMenuItem = new CWSYSTEM.CWPopupMenuItem(
                type, code, text, shortcutText, false, invokedFrom, bulletStatusByMethod);
            this.popupMenuItems.push(popupMenuItem);
            return popupMenuItem;
        }
        addMenuItem$Detailed(type, code, text, shortcutText, invokedFrom, bulletStatusByMethod,
                             objectToInvokeExecuteMethodFrom, executeMethodUponSelection, parametersForExecuteMethod) {
            const popupMenuItem = new CWSYSTEM.CWPopupMenuItem(type, code, text, shortcutText,
                false, invokedFrom, bulletStatusByMethod);
            popupMenuItem.objectToInvokeExecuteMethodFrom = objectToInvokeExecuteMethodFrom;
            popupMenuItem.executeMethodUponSelection = executeMethodUponSelection;
            popupMenuItem.parametersForExecuteMethod = parametersForExecuteMethod;
            this.popupMenuItems.push(popupMenuItem);
            return popupMenuItem;
        }
        addMenuItem(type, code, text, shortcutText, invokedFrom, bulletStatusByMethod, objectToInvokeExecuteMethodFrom, executeMethodUponSelection, parametersForExecuteMethod) {
            if (((typeof type === 'number') || type === null) && ((typeof code === 'string') || code === null) &&
                ((typeof text === 'string') || text === null) &&
                ((typeof shortcutText === 'string') || shortcutText === null) &&
                ((invokedFrom != null) || invokedFrom === null) && ((bulletStatusByMethod != null &&
                    (bulletStatusByMethod instanceof Object)) || bulletStatusByMethod === null) &&
                ((objectToInvokeExecuteMethodFrom != null) || objectToInvokeExecuteMethodFrom === null) &&
                ((executeMethodUponSelection != null &&
                    (executeMethodUponSelection instanceof Object)) || executeMethodUponSelection === null) &&
                ((parametersForExecuteMethod != null && parametersForExecuteMethod instanceof Array &&
                    (parametersForExecuteMethod.length == 0 || parametersForExecuteMethod[0] == null ||
                        (parametersForExecuteMethod[0] != null))) || parametersForExecuteMethod === null)) {
                return this.addMenuItem$Detailed(type, code, text, shortcutText, invokedFrom, bulletStatusByMethod, objectToInvokeExecuteMethodFrom, executeMethodUponSelection, parametersForExecuteMethod);
            }
            else if (((typeof type === 'number') || type === null) && ((typeof code === 'string') || code === null) &&
                ((typeof text === 'string') || text === null) &&
                ((typeof shortcutText === 'string') || shortcutText === null) &&
                ((invokedFrom != null) || invokedFrom === null) && ((bulletStatusByMethod != null &&
                    (bulletStatusByMethod instanceof Object)) || bulletStatusByMethod === null) &&
                objectToInvokeExecuteMethodFrom === undefined && executeMethodUponSelection === undefined &&
                parametersForExecuteMethod === undefined) {
                return this.addMenuItem$type$code$text$String$Object$Method(type, code, text, shortcutText, invokedFrom, bulletStatusByMethod);
            }
            else if (((typeof type === 'number') || type === null) && ((typeof code === 'string') || code === null) &&
                ((typeof text === 'string') || text === null) &&
                ((typeof shortcutText === 'string') || shortcutText === null) &&
                ((typeof invokedFrom === 'boolean') || invokedFrom === null) &&
                bulletStatusByMethod === undefined && objectToInvokeExecuteMethodFrom === undefined &&
                executeMethodUponSelection === undefined && parametersForExecuteMethod === undefined) {
                return this.addMenuItem$int$String$String$String$boolean(type, code, text, shortcutText, invokedFrom);
            }
            else if (type === undefined && code === undefined && text === undefined && shortcutText === undefined &&
                invokedFrom === undefined && bulletStatusByMethod === undefined &&
                objectToInvokeExecuteMethodFrom === undefined && executeMethodUponSelection === undefined &&
                parametersForExecuteMethod === undefined) {
                return this.addMenuItem$();
            }
            else
                throw new Error('invalid overload');
        }
        popup$() {
            if (!this.isPoppedUp()) {
                let mouseX = 0;
                let mouseY = 0;
                if (this.type === CWPopupMenu.CONNECTED_MENU) {
                    if (this.parentMenu != null && this.parentMenu.window != null) {
                        const button = this.parentMenu.getMenuButtonFromPopupMenu(this);
                        if (button != null) {
                            mouseX = button.x + this.parentMenu.window.xPosition;
                            mouseY = this.parentMenu.window.h + CWPopupMenu.verticalOffsetFromMenu + this.parentMenu.window.yPosition;
                        }
                    }
                }
                else {
                    mouseX = CWSYSTEM.Environment.mouseX_$LI$();
                    mouseY = CWSYSTEM.Environment.mouseY_$LI$();
                }
                this.popup$int$int$int$dsector_JCFont$int$int$int$int$int$int(mouseX, mouseY, 16, dsector.DSReference.virtualScreen.serif8_font, 40, 5, 1, 0, 0, 2);
                CWPopupMenu.cycleInWhichPopupOpened = CWSYSTEM.Environment.cycleID_$LI$();
            }
        }
        popup$int$int$int$dsector_JCFont$int$int$int$int$int$int(xPos, yPos, btnHeight, font, pxlSize, xWidth, he, btnX, height5, hMt) {
            if (!this.isPoppedUp()) {
                const hc = 0;
                let pixel = 0;
                let h1 = hc + height5;
                let i;
                for (i = 0; i < this.popupMenuItems.length; ++i) {
                        const popupMenuItem = this.popupMenuItems[i];
                        const lenPixels = CWSYSTEM.CWFontTools.textLengthInPixels(popupMenuItem.text + popupMenuItem.shortcutText, font);
                        if (lenPixels > pixel) {
                            pixel = lenPixels;
                        }
                        if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.SEPARATOR) {
                            h1 += hMt;
                            h1 += hMt;
                        }
                        else {
                            h1 += btnHeight;
                        }
                        if (i < this.popupMenuItems.length - 1) {
                            h1 += he;
                        }
                }
                i = pixel + pxlSize;
                h1 += height5;
                const byteCalc = 0;
                const w1 = byteCalc + 2 * btnX + 2 * xWidth + i;
                const name = "POPUP_" + ((Math.random() * 10000.0) | 0);
                this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                    name, CWSYSTEM.CWWindowStyles.ROUNDED, "", xPos, yPos, w1 + 1, h1 + 1, true);
                this.window.titleVisible = false;
                this.window.ignoreWhenSavingAndRestoringEnvironment = true;
                this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(200, 200, 255, 150));
                const base1 = 0;
                let btnY = base1 + height5;
                for (let index = 0; index < this.popupMenuItems.length; index++) {
                    let menuItem = this.popupMenuItems[index];
                    {
                        const popupMenuItem = menuItem;
                        if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.SEPARATOR) {
                            btnY += hMt;
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY - 1, w1 - CWPopupMenu.separatorMargin, btnY - 1, 30, 0, 0, 155);
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY, w1 - CWPopupMenu.separatorMargin, btnY, 210, 210, 210, 255);
                            this.window.addStoredLine(CWPopupMenu.separatorMargin, btnY + 1, w1 - CWPopupMenu.separatorMargin, btnY + 1, 0, 0, 30, 155);
                            btnY += hMt;
                        }
                        else {
                            let strBullet = "";
                            if (popupMenuItem.type === CWSYSTEM.CWPopupMenuItem.BULLETED) {
                                if (popupMenuItem.bulletStatus()) {
                                    strBullet = "o";
                                }
                                else {
                                    strBullet = "";
                                }
                            }
                            const btnLen = xWidth * 2 + i;
                            const button = this.window.addButton$name$x$y$len$h$text$t$r(popupMenuItem.code,
                                btnX, btnY, btnLen, btnHeight, strBullet, 9, 1);
                            button.generalPurposeObject = popupMenuItem.generalPurposeObject;
                            button.secondText = popupMenuItem.text;
                            button.shortcutText = popupMenuItem.shortcutText;
                            button.secondTextHorizontalOffset = 10;
                            button.textAlignment = CWSYSTEM.CWButton.LEFT;
                            button.textColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.navy_$LI$());
                            button.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
                            button.secondaryBackgroundColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.lightGrey_$LI$());
                            button.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.nearBlack_$LI$());
                            button.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$());
                            button.fillStyle = CWSYSTEM.CWButton.LINEAR_GRADIENT;
                            button.onPressedMethod = popupMenuItem.executeMethodUponSelection;
                            button.onPressedObject = popupMenuItem.objectToInvokeExecuteMethodFrom;
                            button.onPressedParameters = popupMenuItem.parametersForExecuteMethod;
                            btnY += btnHeight;
                        }
                        btnY += he;
                    }
                }
            }
        }
        popup(xPos, yPos, btnHeight, font, pxlSize, xWidth, he, btnX, height5, hMt) {
            if (((typeof xPos === 'number') || xPos === null) && ((typeof yPos === 'number') || yPos === null) && ((typeof btnHeight === 'number') || btnHeight === null) && ((font != null && font instanceof dsector.JCFont) || font === null) && ((typeof pxlSize === 'number') || pxlSize === null) && ((typeof xWidth === 'number') || xWidth === null) && ((typeof he === 'number') || he === null) && ((typeof btnX === 'number') || btnX === null) && ((typeof height5 === 'number') || height5 === null) && ((typeof hMt === 'number') || hMt === null)) {
                return this.popup$int$int$int$dsector_JCFont$int$int$int$int$int$int(xPos, yPos, btnHeight, font, pxlSize, xWidth, he, btnX, height5, hMt);
            }
            else if (xPos === undefined && yPos === undefined && btnHeight === undefined && font === undefined && pxlSize === undefined && xWidth === undefined && he === undefined && btnX === undefined && height5 === undefined && hMt === undefined) {
                return this.popup$();
            }
            else
                throw new Error('invalid overload');
        }
        static mouseClicked() {
            if (CWPopupMenu.cycleInWhichPopupOpened !== CWSYSTEM.Environment.cycleID_$LI$()) {
                for (let i = 0; i < dsector.DSReference.gui.numberOfWindows(); ++i) {
                    {
                        const window1 = dsector.DSReference.gui.getWindow$int(i);
                        if (window1.rightClickPopupMenu != null) {
                            window1.rightClickPopupMenu.destroy();
                        }
                    }
                    ;
                }
                if (dsector.DSReference.gui.rightClickPopupMenu != null) {
                    dsector.DSReference.gui.rightClickPopupMenu.destroy();
                }
                if (CWPopupMenu.rightClickMenu != null) {
                    CWPopupMenu.rightClickMenu.destroy();
                }
            }
        }
        destroy() {
            if (this.window != null) {
                this.window.destroy();
                this.window = null;
            }
        }
        isPoppedUp() {
            return this.window != null;
        }
    }
    CWPopupMenu.RIGHT_CLICK_MENU = 0;
    CWPopupMenu.CONNECTED_MENU = 1;
    CWPopupMenu.verticalOffsetFromMenu = 5;
    CWPopupMenu.rightClickMenu = null;
    CWPopupMenu.cycleInWhichPopupOpened = 0;
    CWPopupMenu.separatorMargin = 0;
    CWSYSTEM.CWPopupMenu = CWPopupMenu;
    CWPopupMenu["__class"] = "CWSYSTEM.CWPopupMenu";
})(CWSYSTEM || (CWSYSTEM = {}));
