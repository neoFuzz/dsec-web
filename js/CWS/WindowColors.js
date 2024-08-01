(function (CWSYSTEM) {
    /**
     * Represents a manager for window colors within the system, allowing for the setting and
     * restoration of window background colors.
     *
     * @property {Map<string, CWColor>} windowColor - A map containing window names and their corresponding color mappings.
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
    class WindowColors {
        /**
         * Constructs a new instance of the WindowColors class, initializing the internal map used to
         * store window color mappings.
         */
        constructor() {
            this.windowColor = new Map();
            new CWSYSTEM.CWColor(60, 60, 60, 180);
        }

        /**
         * Sets the color for a specified window and updates the window's background color if the window exists.
         * @see [CWColor]{@link CWSYSTEM.CWColor} for information on color objects.
         *
         * @public
         * @param {string} name - The name identifier of the window to set the color for.
         * @param {CWColor} color - The color to set for the specified window.
         */
        setWindowColor(name, color) {
            this.windowColor.remove(name);
            this.windowColor.put(name, color);
            const window = CWSYSTEM.CWSReference.gui.getWindow(name);
            if (window != null) {
                window.changeBackgroundColor(color);
            }
        }

        /**
         * Restores the background color of a specified window to its previously set color, if any.
         * If the window or its color mapping does not exist, an error is logged to the console.
         * @see [CWColor]{@link CWSYSTEM.CWColor} for information on color objects.
         *
         * @public
         * @param {string} name - The name identifier of the window whose color is to be restored.
         */
        restoreWindowColor(name) {
            const color = this.windowColor.get(name);
            if (color != null) {
                const window = CWSYSTEM.CWSReference.gui.getWindow(name);
                if (window != null) {
                    window.changeBackgroundColor(color);
                }
            } else {
                CWSYSTEM.Debug.error("Window key or mapping not defined for " + name);
            }
        }
    }

    CWSYSTEM.WindowColors = WindowColors;
    WindowColors["__class"] = "CWSYSTEM.WindowColors";
})(CWSYSTEM);