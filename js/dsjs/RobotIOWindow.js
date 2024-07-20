/* Re-written from Java */
(function (dsector) {
    /**
     * Class for the Robot IO window
     * @class
     * @memberof dsector
     */
    class RobotIOWindow {
        /**
         * Constructor for the RobotIOWindow class
         * @constructor
         */
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.selectedRobotFilename === undefined) {
                this.selectedRobotFilename = null;
            }
            if (this.selectedInputDevice === undefined) {
                this.selectedInputDevice = 0;
            }
            this.savedX = -1;
            this.savedY = -1;
        }

        /**
         * Checks if the window is created.
         * @returns {boolean}
         */
        isCreated() {
            return this.window != null;
        }

        /**
         * Toggles the created state of the window.
         */
        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        /**
         * Creates the window.
         */
        create() {
            this.drawWindow();
            this.window.centerWithinDesktop();
        }

        /**
         * Destroys the window.
         */
        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.window.destroy();
                this.window = null;
            }
        }

        /**
         * Updates the window.
         */
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }

        /**
         * Restores the position of the window.
         *  @private
         */ restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }

        /**
         * Draws the window.
         * @private
         */
        drawWindow() {
            let x = 25;
            let y = 25;
            if (this.window != null) {
                x = this.window.xPosition;
                y = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("ROBOTIO");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ROBOTIO", 3, null, x, y, 500, 400, true);
            const base = RobotIOWindow.CLOCK1;
            const arrayList = ([]);
            let i;
            for (i = 1; i <= 10; ++i) {
                arrayList.push(new dsector.StringPair("Sensor " + i, "Sensor " + i));

            }
            for (i = 1; i <= RobotIOWindow.CLOCK1; ++i) {

                arrayList.push(new dsector.StringPair("Clock " + i, "Clock " + i));

            }
            arrayList.push(new dsector.StringPair("Hit by missile", "Hit by missile"));
            arrayList.push(new dsector.StringPair("Turned to face target", "Turned to face target"));
            const pulldown = this.window.addPulldown("players", arrayList, 10, base, 180, 16);
            const unused = base + RobotIOWindow.CLOCK6;
            pulldown.selectedOption = this.selectedInputDevice;
            pulldown.objectContainingPulldownChangedMethod = this;
            if ((this.selectedInputDevice < RobotIOWindow.SENSOR1 || this.selectedInputDevice > RobotIOWindow.SENSOR10) && (this.selectedInputDevice < 10 || this.selectedInputDevice > RobotIOWindow.CLOCK10) && this.selectedInputDevice !== RobotIOWindow.HIT_BY_MISSILE && this.selectedInputDevice === RobotIOWindow.TURNED_TO_FACE_TARGET) {
                CWSYSTEM.Debug.println("RIOW: " + unused);
            }
        }

        /**
         * Handles the submission of text area content.
         * @param {Object} textArea - The text area that was submitted.
         */
        textAreaSubmitted(textArea) {
            if (textArea.name === ("name")) {
                dsector.DSReference.dsecRobotChooserWindow.robotSpecification.name = textArea.getText();
            }
            if (textArea.name === ("description")) {
                dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description = textArea.getText();
            }
            dsector.DSReference.dsecRobotChooserWindow.robotSpecification.outputAsFile();
        }

        /**
         * Handles the pressing of the done button.
         * @private
         * @param {Object} button - The button that was pressed.
         */
        doneButtonPressed(button) {
            dsector.DSReference.robotSensorsIllustrationWindow.destroy();
            this.destroy();
        }
    }

    RobotIOWindow.SENSOR1 = 0;
    RobotIOWindow.SENSOR2 = 1;
    RobotIOWindow.SENSOR3 = 2;
    RobotIOWindow.SENSOR4 = 3;
    RobotIOWindow.SENSOR5 = 4;
    RobotIOWindow.SENSOR6 = 5;
    RobotIOWindow.SENSOR7 = 6;
    RobotIOWindow.SENSOR8 = 7;
    RobotIOWindow.SENSOR9 = 8;
    RobotIOWindow.SENSOR10 = 9;
    RobotIOWindow.CLOCK1 = 10;
    RobotIOWindow.CLOCK2 = 11;
    RobotIOWindow.CLOCK3 = 12;
    RobotIOWindow.CLOCK4 = 13;
    RobotIOWindow.CLOCK5 = 14;
    RobotIOWindow.CLOCK6 = 15;
    RobotIOWindow.CLOCK7 = 16;
    RobotIOWindow.CLOCK8 = 17;
    RobotIOWindow.CLOCK9 = 18;
    RobotIOWindow.CLOCK10 = 19;
    RobotIOWindow.HIT_BY_MISSILE = 20;
    RobotIOWindow.TURNED_TO_FACE_TARGET = 21;
    dsector.RobotIOWindow = RobotIOWindow;
    RobotIOWindow["__class"] = "dsector.RobotIOWindow";
})(dsector || (dsector = {}));
