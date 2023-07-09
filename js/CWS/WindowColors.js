var CWSYSTEM;
(function (CWSYSTEM) {
    class WindowColors {
        constructor() {
            this.windowColor = new Map();
            new CWSYSTEM.CWColor(60, 60, 60, 180);
        }

        setWindowColor(name, color) {
            this.windowColor.remove(name);
            this.windowColor.put(name, color);
            const window = dsector.DSReference.gui.getWindow(name);
            if (window != null) {
                window.changeBackgroundColor(color);
            }
        }

        restoreWindowColor(name) {
            const color = this.windowColor.get(name);
            if (color != null) {
                const window = dsector.DSReference.gui.getWindow(name);
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
})(CWSYSTEM || (CWSYSTEM = {}));
