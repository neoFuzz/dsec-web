import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * AlertWindow class handles drawing and displaying alert messages to the user.
 *
 * This class is responsible for creating a window that shows alert messages
 * within the CWSYSTEM. It manages the window's appearance, content, and
 * interaction elements like the "Continue" button.
 *
 * @property {number} margin - Margin around the alert window content.
 * @property {number} maximumTextWidth - Maximum width of the text within the alert window.
 * @property {number} maximumHeight - Maximum height of the alert window.
 *
 * @see      [AlertManager]{@link CWSYSTEM.AlertManager}: for related functionality
 * @see      [CWWindowCollection]{@link CWSYSTEM.CWWindowCollection}: for window management
 *
 * @class
 * @since    1.0.0
 * @access   public
 *
 * @memberof CWSYSTEM
 * @requires CWSYSTEM.CWColor
 * @requires CWSYSTEM.CWFontTools
 * @requires CWSYSTEM.Global
 * @requires CWSYSTEM.CWSReference
 * @requires CWSYSTEM.AlertManager
 * @requires CWSYSTEM.CWWindow
 * @requires CWSYSTEM.CWWindowCollection
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class AlertWindow {
    /**
     * Create an AlertWindow with a preloaded `message`
     *
     * @param {Object} parent - The parent element or context
     * @param {string} message - The alert message to show to the user
     */
    constructor(message, parent) {
        this.window = null;
        this.parent = parent | null;

        if (CWSYSTEM.AlertManager.alertWindow != null) {
            CWSYSTEM.CWSReference.gui.destroyWindow("ALE");
        }
        CWSYSTEM.CWFontTools.renderText(null, message, 0, 0,
            CWSYSTEM.CWSReference.virtualScreen.serif8_font, CWSYSTEM.CWColor.__black(),
            AlertWindow.maximumTextWidth);
        const rWidth = CWSYSTEM.CWFontTools.RENDERED_WIDTH + 60;
        const rHeight = CWSYSTEM.CWFontTools.RENDERED_HEIGHT + 60 + 5;
        if (rHeight > AlertWindow.maximumHeight) {
            message = "The alert message that you are trying to display was too long.";
            CWSYSTEM.CWFontTools.renderText(null, message, 0, 0,
                CWSYSTEM.CWSReference.virtualScreen.serif8_font, CWSYSTEM.CWColor.__black(),
                AlertWindow.maximumTextWidth);
        }
        this.window = CWSYSTEM.CWSReference.gui.addWindow$name$style$title$x$y$w$h$v(
            "ALE", CWSYSTEM.CWWindowStyles.ROUNDED, "🚨 ALERT !",
            Math.floor((CWSYSTEM.Global.screenResolutionX_$LI$() - rWidth) / 2),
            Math.floor((CWSYSTEM.Global.screenResolutionY_$LI$() - rHeight) / 2), rWidth, rHeight, true);
        this.window.ignoreWhenSavingAndRestoringEnvironment = true;
        if (CWSYSTEM.AlertManager.backgroundColor != null) {
            this.window.changeBackgroundColor$CWColor(CWSYSTEM.AlertManager.backgroundColor);
        } else {
            this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(255, 255, 255, 220));
        }
        this.window.titleVisible = true;
        this.window.floating = true;
        CWSYSTEM.AlertManager.alertWindow = this;
        this.window.addButton("DESTROY_WINDOW", (rWidth / 2 | 0) - 35,
            rHeight - AlertWindow.margin - 3, 70, 17, "Continue",
            CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
        this.window.getButton("DESTROY_WINDOW").bgColor = CWSYSTEM.CWColor.__white();
        this.window.drawWindow();
        const color = CWSYSTEM.AlertManager.textColor != null ?
            CWSYSTEM.AlertManager.textColor : CWSYSTEM.CWColor.__black();
        this.window.addTextBlock("", message, AlertWindow.margin, 45,
            CWSYSTEM.CWSReference.virtualScreen.serif8_font, color, AlertWindow.maximumTextWidth);
    }

    /**
     * Get the window object associated with this AlertWindow instance.
     *
     * @public
     * @return {CWSYSTEM.CWWindow} The window object associated with this AlertWindow instance.
     * @note This was made to fix stop SonarLint reporting this as a constructor-only class.
     * @see CWSYSTEM.CWWindow
     */
    getWindow() {
        return this.window;
    }


    /**
     * Margin around the alert window content
     * @static
     * @default
     * @type {number}
     */
    static margin = 30;
    /**
     * Maximum width of the text within the alert window
     * @static
     * @default
     * @type {number}
     */

    static maximumTextWidth = 300;
    /**
     * Maximum height of the alert window
     * @static
     * @default
     * @type {number}
     */
    static maximumHeight = 600;
}