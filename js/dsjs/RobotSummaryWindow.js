/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class RobotSummaryWindow {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.selectedRobotFilename === undefined) {
                this.selectedRobotFilename = null;
            }
            this.savedX = -1;
            this.savedY = -1;
        }
        isCreated() {
            return this.window != null;
        }
        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            }
            else {
                this.create();
            }
        }
        create() {
            this.drawWindow();
            this.window.centerWithinDesktop();
        }
        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.window.destroy();
                this.window = null;
            }
        }
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }
        /** @private */ restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }
        drawWindow() {
            let x = 25;
            let y = 25;
            if (this.window != null) {
                x = this.window.xPosition;
                y = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("ROBOTSUMMARY");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ROBOTSUMMARY", 3, null, x, y, 400, 200, true);
            const cY = 30;
            const color = CWSYSTEM.CWColor.white_$LI$();
            this.window.addTextBlock("", "Robot Name", 10, cY, font, color, 999);
            this.window.addTextArea("name", 150, cY - 23, 245, 1, font, "").endMark = "";
            let baseline = cY + 30;
            let textArea = this.window.getTextArea("name");
            textArea.setText(dsector.DSReference.dsecRobotChooserWindow.robotSpecification.name);
            textArea.deselectionCausesSubmit = true;
            textArea.returnKeyCausesSubmit = true;
            textArea.objectContainingTextAreaSubmittedMethod = this;
            this.window.addTextBlock("", "Description", 10, baseline, font, color, 999);
            this.window.addTextArea("description", 150, baseline - 23, 245, 2, font, "").endMark = "";
            textArea = this.window.getTextArea("description");
            baseline += 45;
            let str = "";
            if (dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description != null) {
                str = dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description;
            }
            textArea.setText(str);
            textArea.deselectionCausesSubmit = true;
            textArea.returnKeyCausesSubmit = true;
            textArea.objectContainingTextAreaSubmittedMethod = this;
            const button = this.window.addButton$name$x$y$len$h$text$t$r("done", 360, baseline - 23, 35, 15, "Done", 9, 0);
            baseline += 15;
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "doneButtonPressed";
            this.window.h = baseline - 15;
        }
        textAreaSubmitted(textArea) {
            if (textArea.name === ("name")) {
                dsector.DSReference.dsecRobotChooserWindow.robotSpecification.name = textArea.getText();
            }
            if (textArea.name === ("description")) {
                dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description = textArea.getText();
            }
            dsector.DSReference.dsecRobotChooserWindow.robotSpecification.outputAsFile();
        }
        doneButtonPressed(button) {
            this.destroy();
        }
    }
    dsector.RobotSummaryWindow = RobotSummaryWindow;
    RobotSummaryWindow["__class"] = "dsector.RobotSummaryWindow";
})(dsector || (dsector = {}));
