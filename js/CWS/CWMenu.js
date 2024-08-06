import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Class representing a menu in the Canvas Windowing system.
 *
 * @property {CWSYSTEM.CWWindow|null} window - The window associated with this menu (if any).
 * @property {string} name - The name of the menu.
 * @property {Array<CWSYSTEM.CWPopupMenu>} popupMenus - The list of popup menus associated with this menu.
 * @property {number} mode - The mode of the menu (active or inactive).
 * @property {number} buildX - The x-coordinate for building the menu.
 * @property {number} buildY - The y-coordinate for building the menu.
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
export class CWMenu {
    /**
     * Create a CWMenu.
     *
     * @param {string} name - The name of the menu.
     */
    constructor(name) {
        this.window = null;
        this.name = name;
        this.popupMenus = ([]);
        this.mode = CWMenu.INACTIVE;
        this.buildX = 15;
        this.buildY = CWSYSTEM.CWSReference.virtualScreen.topInset + 10;
    }

    /**
     * Handle mouse click events for menus.
     *
     * @static
     */
    static mouseClicked() {
        if (CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened !== CWSYSTEM.Environment.cycleID$()) {
            for (let i = 0; i < CWSYSTEM.CWSReference.gui.numberOfWindows(); ++i) {
                const guiWindow = CWSYSTEM.CWSReference.gui.getWindow$int(i);
                if (guiWindow.menuManager != null && guiWindow.menuManager.mode === CWMenu.ACTIVE) {
                    guiWindow.menuManager.mode = CWMenu.INACTIVE;
                    guiWindow.menuManager.destroyAllOpenPopupMenus();
                }
            }
        }
    }

    /**
     * Handle the event when a menu title is pressed.
     *
     * @param {string} pressed - The name of the pressed menu title.
     * @static
     */
    static menuTitlePressed(pressed) {
        if (CWSYSTEM.Environment.cycleID$() !== CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened) {
            const whatPressed = CWSYSTEM.CWStringTools.messagesBetweenCharacters(
                pressed, '(', ')')[0];
            const anInt = parseInt(CWSYSTEM.CWStringTools.messagesBetweenCharacters(
                pressed, '[', ']')[0]);
            let cwWindow = null;
            for (let i = 0; i < CWSYSTEM.CWSReference.gui.numberOfWindows(); ++i) {
                const guiWindow = CWSYSTEM.CWSReference.gui.getWindow$int(i);
                if (guiWindow.menuManager != null && (guiWindow.menuManager.name === whatPressed)) {
                    cwWindow = guiWindow;
                    break;
                }
            }
            if (cwWindow == null) {
                CWSYSTEM.CWSReference.alertManager.messageQueued("A button was pressed with name '" +
                    pressed + "' but no menu was found for this window.");
            } else {
                const menuManager = cwWindow.menuManager;
                menuManager.destroyAllOpenPopupMenus();
                if (menuManager.mode === CWMenu.ACTIVE) {
                    menuManager.mode = CWMenu.INACTIVE;
                } else {
                    menuManager.mode = CWMenu.ACTIVE;
                    const popupMenu = menuManager.popupMenus[anInt];
                    popupMenu.popup$();
                    CWSYSTEM.CWPopupMenu.cycleInWhichPopupOpened = CWSYSTEM.Environment.cycleID$();
                }
            }
        }
    }

    /**
     * Handle the event when the mouse is moved over a button.
     *
     * @param {CWSYSTEM.CWButton} cwBtn - The button being hovered over.
     * @static
     */
    static mouseMovedOverButton(cwBtn) {
        const btnName = cwBtn.name;
        if (btnName.length > 11 && ((str, searchString, position = 0) => str.substring(
            position, searchString.length) === searchString)(btnName, "MENU_BUTTON")) {
            const msgBtwnChar = CWSYSTEM.CWStringTools.messagesBetweenCharacters(
                btnName, '(', ')')[0];
            const gap = parseInt(
                CWSYSTEM.CWStringTools.messagesBetweenCharacters(btnName, '[', ']')[0]);
            let wind = null;
            for (let i = 0; i < CWSYSTEM.CWSReference.gui.numberOfWindows(); ++i) {
                const gcw = CWSYSTEM.CWSReference.gui.getWindow$int(i);
                if (gcw.menuManager != null && (gcw.menuManager.name === msgBtwnChar)) {
                    wind = gcw;
                    break;
                }
            }
            if (wind.menuManager === null) {
                return;
            }
            const menuManager = wind.menuManager;
            if (menuManager.mode === CWMenu.ACTIVE) {
                menuManager.destroyAllOpenPopupMenus();
                const popupMenu = menuManager.popupMenus[gap];
                popupMenu.popup$();
            }
        }
    }

    /**
     * Add a popup menu to the menu.
     *
     * @param {CWSYSTEM.CWPopupMenu} popupMenu - The popup menu to add.
     */
    addMenu(popupMenu) {
        this.popupMenus.push(popupMenu);
    }

    /**
     * Set the build position of the menu.
     *
     * @param {number} buildX - The x-coordinate for the build position.
     * @param {number} buildY - The y-coordinate for the build position.
     */
    setBuildPosition(buildX, buildY) {
        this.buildX = buildX;
        this.buildY = buildY;
    }

    /**
     * Build a basic menu.
     */
    build$() {
        const build = {
            bx: this.buildX,
            by: this.buildY
        }
        this.build(build, 15, CWSYSTEM.CWSReference.virtualScreen.serif8_font, 7, 1, 0, 0);
    }

    /**
     * Build the menu with specified parameters.
     *
     * @param {number} buildX - The x-coordinate for the build position.
     * @param {number} buildY - The y-coordinate for the build position.
     * @param {number} height - The height of the menu.
     * @param {CWSYSTEM.CWFont} font - The font used in the menu.
     * @param {number} inWidth - The inner width of the menu.
     * @param {number} maxWidth - The maximum width of the menu.
     * @param {number} width - The width of the menu.
     * @param {number} y1 - The y-coordinate offset for the build position.
     */
    build(build, height,
          font, inWidth, maxWidth, width, y1) {
        let buildX = build.bx;
        let buildY = build.by;
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
        this.window = CWSYSTEM.CWSReference.gui.addWindow$name$style$title$x$y$w$h$v(
            this.name, 3, "", buildX, buildY, width1 + 1, height1 + 1, true);
        this.window.titleVisible = false;
        this.window.menuManager = this;
        this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(200, 200, 255, 150));
        const bWidth = 0;
        let x1 = bWidth + width;
        for (let k = 0; k < this.popupMenus.length; ++k) {
            const popupMenu = this.popupMenus[k];
            const length2 = inWidth * 2 + CWSYSTEM.CWFontTools.textLengthInPixels(popupMenu.menuTitle, font);
            const button = this.window.addButton("MENU_BUTTON(" + this.name + ")[" + k + "]",
                x1, y1, length2, height, popupMenu.menuTitle,
                CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.PRESSED);
            button.textColor = new CWSYSTEM.CWColor(0, 0, 100, 255);
            button.bgColor = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            button.secondaryBackgroundColor = new CWSYSTEM.CWColor(180, 180, 180, 255);
            button.bgColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__nearBlack());
            button.secondaryBackgroundColorHighlighted = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__brightBlue());
            button.fillStyle = CWSYSTEM.CWButton.LINEAR_GRADIENT;
            x1 += length2 + maxWidth;
        }
    }

    /**
     * Destroy all open popup menus.
     */
    destroyAllOpenPopupMenus() {
        for (const popupMenu of this.popupMenus) {
            if (popupMenu.isPoppedUp()) {
                popupMenu.destroy();
            }
        }
    }

    /**
     * Destroy the menu.
     */
    destroy() {
        if (this.window != null) {
            this.destroyAllOpenPopupMenus();
            this.window.destroy();
            this.window = null;
        }
    }

    /**
     * Get the menu button corresponding to a given popup menu.
     *
     * @param {CWSYSTEM.CWPopupMenu} popupMenu - The popup menu.
     * @returns {CWSYSTEM.CWButton|null} The corresponding menu button, or null if not found.
     */
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


    /**
     * Menu inactive state constant.
     * @constant
     * @type {number}
     * @default
     */
    static INACTIVE = 0;
    /**
     * Menu active state constant.
     * @constant
     * @type {number}
     * @default
     */
    static ACTIVE = 1;
}