(function (dsector) {
    /**
     * Class that contains utilities to edit the robots.
     *
     * @property {CWSYSTEM.CWWindow} window the window of the robot chooser.
     * @property {string} selectedRobotFilename the filename of the selected robot.
     * @property {dsector.RobotSpecification} robotSpecification the specification of the robot.
     * @property {number} savedX the x position of the window.
     * @property {number} savedY the y position of the window.
     * @property {CWSYSTEM.CWWindow} newRobotFormWindow the window of the new robot form.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof dsector
     * @requires CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class DSecRobotChooserWindow {
        /**
         * Constructor for DSecRobotChooserWindow.
         */
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.selectedRobotFilename = "-1";
            this.robotSpecification = null;
            this.savedX = -1;
            this.savedY = -1;
            if (this.newRobotFormWindow === undefined) {
                this.newRobotFormWindow = null;
            }
            DSecRobotChooserWindow.initializeIOMessages();
        }

        /**
         * Check if the window is created.
         *
         * @return {boolean} true if the window is created.
         */
        isCreated() {
            return this.window != null;
        }

        /**
         * Toggle the created state of the window.
         *
         * @public
         */
        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        /**
         * Create the window.
         *
         * @public
         */
        create() {
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/robotEditing.jpg");
            dsector.DSReference.dsecMainSetupWindow.destroy();
            this.drawWindow();
            this.window.centerWithinDesktop();
            this.window.yPosition = 20;
        }

        /**
         * Destroy the window.
         *
         * @public
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
         * Update the window.
         *
         * @public
         */
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }

        /**
         * Restore the position of the window.
         *
         * @private
         */
        restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }

        /**
         * Draw the window.
         *
         * @private
         */
        drawWindow() {
            let xPos = 25;
            let yPos = 25;
            if (this.window != null) {
                xPos = this.window.xPosition;
                yPos = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("ROBOTCHOOSER");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ROBOTCHOOSER", 3,
                null, xPos, yPos, 500, 75, true);
            const color = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            this.window.addTextBlock("", "Select a robot to edit", 10, 30, font, color, 999);
            const options = ([]);
            options.push(new dsector.StringPair("- Select - ", "-1"));
            const robotFilenames = dsector.DSReference.dsecMainSetupWindow.getRobotFilenames();
            let selected = 0;
            let roboFilename;
            for (let i = 0; i < robotFilenames.length; ++i) {
                roboFilename = robotFilenames[i];
                options.push(new dsector.StringPair(roboFilename, roboFilename));
                if (((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(
                    roboFilename, this.selectedRobotFilename)) {
                    selected = i + 1;
                }
            }
            const pulldown = this.window.addPulldown("robotFilename", options, 250, 6, 245, 16);
            pulldown.selectedOption = selected;
            pulldown.objectContainingPulldownChangedMethod = this;
            roboFilename = null;
            let button;
            if (this.selectedRobotFilename !== "-1") {
                button = this.window.addButton("", 10, 30, 60,
                    15, "Summary", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "summaryButtonPressed";
                button = this.window.addButton("", 90, 30, 60,
                    15, "Sensors", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "sensorsButtonPressed";
                button = this.window.addButton("", 170, 30, 60,
                    15, "Clocks", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "clocksButtonPressed";
                button = this.window.addButton("", 250, 30, 60,
                    15, "Shopping", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "shoppingButtonPressed";
            }
            button = this.window.addButton("", 10, 50, 75,
                15, "New Robot", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "newRobotButtonPressed";
            if (this.selectedRobotFilename !== "-1") {
                button = this.window.addButton("", 90, 50, 60,
                    15, "Delete", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "deleteButtonPressed";
            }
            button = this.window.addButton("", 300, 50, 45,
                15, "Help", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "helpButtonPressed";
            button = this.window.addButton("", 380, 50, 110,
                15, "Return to D-Sector", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "returnToDSectorButtonPressed";
        }

        /**
         * Continue button pressed.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        continueButtonPressed(button) {
            const remainingRounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            this.destroy();
            if (remainingRounds === 0) {
                dsector.DSReference.dsecMainSetupWindow.create();
            } else if (dsector.DSReference.dsecGame.currentRound() % 3 === 0) {
                    dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
                } else {
                    dsector.DSReference.dsecGame.startNextRound();
                }

        }

        /**
         * Create a new robot.
         *
         * @public
         * @param {string} name the name of the robot.
         */
        createNewRobot(name) {
            this.robotSpecification = new dsector.RobotSpecification();
            this.robotSpecification.filename = name + ".dzr";
            this.robotSpecification.outputAsFile();
        }

        /**
         * Pulldown changed function.
         *
         * @public
         * @param {CWSYSTEM.CWPulldown} pulldown the pulldown that was changed.
         */
        pulldownChanged(pulldown) {
            pulldown = pulldown[0];
            if (pulldown.name === ("robotFilename")) {
                const selectedValue = pulldown.selectedValue();
                if (selectedValue === ("-1")) {
                    return;
                }
                this.selectedRobotFilename = selectedValue;
                this.robotSpecification = new dsector.RobotSpecification(this.selectedRobotFilename);
                this.update();
            }
        }

        /**
         * Summary button pressed function.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        summaryButtonPressed(button) {
            dsector.DSReference.robotSummaryWindow.create();
        }

        /**
         * Sensors button pressed function.
         *
         * @deprecated
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        sensorsButtonPressed(button) {
            // future feature
        }

        /**
         * Clocks button pressed function.
         *
         * @deprecated
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        clocksButtonPressed(button) {
            // future feature
        }

        /**
         * Shopping button pressed function.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        shoppingButtonPressed(button) {
            // future feature
        }
        cancelIfPoppedUp() {
            if (this.isPoppedUp()) {
                this.cancel();
            }
            return this; // Ensure it supports further chaining if needed
        }
        /**
         * New robot button pressed function.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        newRobotButtonPressed(button) {
            this.newRobotFormWindow?.cancelIfPoppedUp();

            const formWindow = new dsector.FormWindow(null);
            formWindow.addInputBox("Robot Name");
            formWindow.addCancelButton();
            formWindow.setSubmitLabel("Create");
            const formSubmitted = CWSYSTEM.CWReflect.getMethod$obj$name$class(this, "newRobotFormSubmitted", formWindow);
            formWindow.setResponseMethods(this, formSubmitted, null, null);
            formWindow.popup$();
            this.newRobotFormWindow = formWindow;
        }

        /**
         * New robot form submitted function.
         *
         * @public
         * @param {dsector.FormWindow} window the form window that was submitted.
         */
        newRobotFormSubmitted(window) {
            let robotName = window.get("Robot Name").stringValue();
            robotName = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(robotName, " ", "SPACECHARACTER");
            robotName = CWSYSTEM.CWStringTools.replaceNonAlphaCharacters(robotName, "");
            robotName = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(robotName, "SPACECHARACTER", " ");
            this.createNewRobot(robotName);
            this.selectedRobotFilename = robotName + ".dzr";
            this.update();
        }

        /**
         * Delete button pressed function.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        deleteButtonPressed(button) {
            CWSYSTEM.CWFileTools.delete(this.selectedRobotFilename);
            this.selectedRobotFilename = "-1";
            this.update();
        }

        /**
         * Help button pressed function.
         *
         * @deprecated
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        helpButtonPressed(button) {
            // future feature
        }

        /**
         * Return to D-Sector button pressed function.
         *
         * @public
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        returnToDSectorButtonPressed(button) {
            this.destroyAllRobotEditingWindows();
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        }

        /**
         * Destroy all robot editing windows.
         *
         * @private
         */
        destroyAllRobotEditingWindows() {
            dsector.DSReference.robotSummaryWindow.create();
        }

        /**
         * Initialize IO messages.
         *
         * @private
         */
        static initializeIOMessages() {
            if (DSecRobotChooserWindow.ioMessages == null) {
                DSecRobotChooserWindow.ioMessages = new Map();
                DSecRobotChooserWindow.ioMessages.set(10, "Most favored weapon affordable from a random weapon strategy");
                const specialMessages = new Set([18, 24, 25, 48, 77, 126, 127, 128, 129, 130, 131, 132, 133, 134,
                    135, 136, 137, 138, 139, 140, 167, 169, 170, 171, 173, 175, 176, 177, 178, 179, 180, 181, 198]);

                for (let i = 11; i <= 181; i++) {
                    if (specialMessages.has(i) || (i >= 18 && i <= 25) || (i >= 40 && i <= 77) || (i >= 100 && i <= 181)) {
                        DSecRobotChooserWindow.ioMessages.set(i, "");
                    }
                }
                DSecRobotChooserWindow.ioMessages.set(198, "");
            }
        }
    }

    /**
     * IO messages array. Holds the IO messages.
     * @static
     * @type {Array}
     */
    DSecRobotChooserWindow.ioMessages = null;
    dsector.DSecRobotChooserWindow = DSecRobotChooserWindow;
    DSecRobotChooserWindow["__class"] = "dsector.DSecRobotChooserWindow";
})(dsector || (dsector = {}));