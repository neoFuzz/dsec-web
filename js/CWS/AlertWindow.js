/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    /** AlertWindow Class - used to handle drawing the window for alerts and showing the message to the user */
    class AlertWindow {
        /** Create an AlertWindow with a preloaded `message`
         * @param {any} parent
         * @param {string} message The alert message to show to the user */
        constructor(message, parent) {
            if (this.window === undefined) {
                this.window = null;
            }
            if (parent === undefined) {
                parent = null;
            }
            if (CWSYSTEM.AlertManager.alertWindow != null) {
                CWSYSTEM.CWSReference.gui.destroyWindow("ALE");
                //dsector.DSReference.gui.destroyWindow("ALE");
            }
            CWSYSTEM.CWFontTools.renderText(null, message, 0, 0,
                dsector.DSReference.virtualScreen.serif8_font, CWSYSTEM.CWColor.black_$LI$(),
                AlertWindow.maximumTextWidth);
            const rWidth = CWSYSTEM.CWFontTools.RENDERED_WIDTH + 60;
            const rHeight = CWSYSTEM.CWFontTools.RENDERED_HEIGHT + 60 + 5;
            if (rHeight > AlertWindow.maximumHeight) {
                message = "The alert message that you are trying to display was too long.";
                CWSYSTEM.CWFontTools.renderText(null, message, 0, 0,
                    dsector.DSReference.virtualScreen.serif8_font, CWSYSTEM.CWColor.black_$LI$(),
                    AlertWindow.maximumTextWidth);
            }
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ALE", 3, "! ALERT !",
                Math.floor((CWSYSTEM.Global.screenResolutionX_$LI$() - rWidth) / 2),
                Math.floor((CWSYSTEM.Global.screenResolutionY_$LI$() - rHeight) / 2), rWidth, rHeight, true);
            this.window.ignoreWhenSavingAndRestoringEnvironment = true;
            if (CWSYSTEM.AlertManager.backgroundColor != null) {
                this.window.changeBackgroundColor$CWColor(CWSYSTEM.AlertManager.backgroundColor);
            }
            else {
                this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(255, 255, 255, 220));
            }
            this.window.titleVisible = true;
            this.window.floating = true;
            CWSYSTEM.AlertManager.alertWindow = this;
            this.window.addButton$name$x$y$len$h$text$t$r("DESTROY_WINDOW", (rWidth / 2 | 0) - 35,
                rHeight - AlertWindow.margin - 3, 70, 17, "Continue", 9, CWSYSTEM.CWButton.CLICKED);
            this.window.getButton("DESTROY_WINDOW").bgColor = CWSYSTEM.CWColor.white_$LI$();
            this.window.drawWindow();
            const color = CWSYSTEM.AlertManager.textColor != null ?
                CWSYSTEM.AlertManager.textColor : CWSYSTEM.CWColor.black_$LI$();
            this.window.addTextBlock("", message, AlertWindow.margin, 45,
                dsector.DSReference.virtualScreen.serif8_font, color, AlertWindow.maximumTextWidth);
        }
    }
    AlertWindow.margin = 30;
    AlertWindow.maximumTextWidth = 300;
    AlertWindow.maximumHeight = 600;
    CWSYSTEM.AlertWindow = AlertWindow;
    AlertWindow["__class"] = "CWSYSTEM.AlertWindow";
})(CWSYSTEM || (CWSYSTEM = {}));
