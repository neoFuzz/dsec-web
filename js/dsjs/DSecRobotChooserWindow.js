/* Re-written from Java */
var dsector;
(function (dsector) {
    class DSecRobotChooserWindow {
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
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/robotEditing.jpg");
            dsector.DSReference.dsecMainSetupWindow.destroy();
            this.drawWindow();
            this.window.centerWithinDesktop();
            this.window.yPosition = 20;
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
            const color = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
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
            if (!(this.selectedRobotFilename === ("-1"))) {
                button = this.window.addButton$name$x$y$len$h$text$t$r("", 10, 30, 60,
                    15, "Summary", 9, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "summaryButtonPressed";
                button = this.window.addButton$name$x$y$len$h$text$t$r("", 90, 30, 60,
                    15, "Sensors", 9, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "sensorsButtonPressed";
                button = this.window.addButton$name$x$y$len$h$text$t$r("", 170, 30, 60,
                    15, "Clocks", 9, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "clocksButtonPressed";
                button = this.window.addButton$name$x$y$len$h$text$t$r("", 250, 30, 60,
                    15, "Shopping", 9, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "shoppingButtonPressed";
            }
            button = this.window.addButton$name$x$y$len$h$text$t$r("", 10, 50, 75,
                15, "New Robot", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "newRobotButtonPressed";
            if (!(this.selectedRobotFilename === ("-1"))) {
                button = this.window.addButton$name$x$y$len$h$text$t$r("", 90, 50, 60,
                    15, "Delete", 9, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "deleteButtonPressed";
            }
            button = this.window.addButton$name$x$y$len$h$text$t$r("", 300, 50, 45,
                15, "Help", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "helpButtonPressed";
            button = this.window.addButton$name$x$y$len$h$text$t$r("", 380, 50, 110,
                15, "Return to D-Sector", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "returnToDSectorButtonPressed";
        }
        continueButtonPressed(button) {
            const remainingRounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            this.destroy();
            if (remainingRounds === 0) {
                dsector.DSReference.dsecMainSetupWindow.create();
            }
            else {
                if (dsector.DSReference.dsecGame.currentRound() % 3 === 0) {
                    dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
                }
                else {
                    dsector.DSReference.dsecGame.startNextRound();
                }
            }
        }
        createNewRobot(name) {
            this.robotSpecification = new dsector.RobotSpecification();
            this.robotSpecification.filename = name + ".dzr";
            this.robotSpecification.outputAsFile();
        }
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
        summaryButtonPressed(button) {
            dsector.DSReference.robotSummaryWindow.create();
        }
        sensorsButtonPressed(button) {
        }
        clocksButtonPressed(button) {
        }
        shoppingButtonPressed(button) {
        }
        newRobotButtonPressed(button) {
            if (this.newRobotFormWindow != null && this.newRobotFormWindow.isPoppedUp()) {
                this.newRobotFormWindow.cancel();
            }
            const formWindow = new dsector.FormWindow(null);
            formWindow.addInputBox("Robot Name");
            formWindow.addCancelButton();
            formWindow.setSubmitLabel("Create");
            const formSubmitted = CWSYSTEM.CWReflect.getMethod$obj$name$class(this, "newRobotFormSubmitted", formWindow);
            formWindow.setResponseMethods(this, formSubmitted, null, null);
            formWindow.popup$();
            this.newRobotFormWindow = formWindow;
        }
        newRobotFormSubmitted(window) {
            let robotName = window.get("Robot Name").stringValue();
            robotName = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(robotName, " ", "SPACECHARACTER");
            robotName = CWSYSTEM.CWStringTools.replaceNonAlphaCharacters(robotName, "");
            robotName = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(robotName, "SPACECHARACTER", " ");
            this.createNewRobot(robotName);
            this.selectedRobotFilename = robotName + ".dzr";
            this.update();
        }
        deleteButtonPressed(button) {
            CWSYSTEM.CWFileTools.delete(this.selectedRobotFilename);
            this.selectedRobotFilename = "-1";
            this.update();
        }
        helpButtonPressed(button) {
        }
        returnToDSectorButtonPressed(button) {
            this.destroyAllRobotEditingWindows();
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        }
        destroyAllRobotEditingWindows() {
            dsector.DSReference.robotSummaryWindow.create();
        }
        /** @private */ static initializeIOMessages() {
            if (DSecRobotChooserWindow.ioMessages == null) {
                DSecRobotChooserWindow.ioMessages = new Map();
                DSecRobotChooserWindow.ioMessages.set(10, "Most favored weapon affordable from a random weapon strategy");
                DSecRobotChooserWindow.ioMessages.set(11, "");
                DSecRobotChooserWindow.ioMessages.set(12, "");
                DSecRobotChooserWindow.ioMessages.set(13, "");
                DSecRobotChooserWindow.ioMessages.set(14, "");
                DSecRobotChooserWindow.ioMessages.set(15, "");
                DSecRobotChooserWindow.ioMessages.set(16, "");
                DSecRobotChooserWindow.ioMessages.set(17, "");
                DSecRobotChooserWindow.ioMessages.set(18, "");
                DSecRobotChooserWindow.ioMessages.set(21, "");
                DSecRobotChooserWindow.ioMessages.set(22, "");
                DSecRobotChooserWindow.ioMessages.set(23, "");
                DSecRobotChooserWindow.ioMessages.set(25, "");
                DSecRobotChooserWindow.ioMessages.set(24, "");
                DSecRobotChooserWindow.ioMessages.set(40, "");
                DSecRobotChooserWindow.ioMessages.set(41, "");
                DSecRobotChooserWindow.ioMessages.set(42, "");
                DSecRobotChooserWindow.ioMessages.set(43, "");
                DSecRobotChooserWindow.ioMessages.set(44, "");
                DSecRobotChooserWindow.ioMessages.set(45, "");
                DSecRobotChooserWindow.ioMessages.set(46, "");
                DSecRobotChooserWindow.ioMessages.set(47, "");
                DSecRobotChooserWindow.ioMessages.set(48, "");
                DSecRobotChooserWindow.ioMessages.set(51, "");
                DSecRobotChooserWindow.ioMessages.set(52, "");
                DSecRobotChooserWindow.ioMessages.set(53, "");
                DSecRobotChooserWindow.ioMessages.set(54, "");
                DSecRobotChooserWindow.ioMessages.set(55, "");
                DSecRobotChooserWindow.ioMessages.set(56, "");
                DSecRobotChooserWindow.ioMessages.set(57, "");
                DSecRobotChooserWindow.ioMessages.set(58, "");
                DSecRobotChooserWindow.ioMessages.set(59, "");
                DSecRobotChooserWindow.ioMessages.set(60, "");
                DSecRobotChooserWindow.ioMessages.set(61, "");
                DSecRobotChooserWindow.ioMessages.set(62, "");
                DSecRobotChooserWindow.ioMessages.set(63, "");
                DSecRobotChooserWindow.ioMessages.set(64, "");
                DSecRobotChooserWindow.ioMessages.set(65, "");
                DSecRobotChooserWindow.ioMessages.set(66, "");
                DSecRobotChooserWindow.ioMessages.set(67, "");
                DSecRobotChooserWindow.ioMessages.set(68, "");
                DSecRobotChooserWindow.ioMessages.set(69, "");
                DSecRobotChooserWindow.ioMessages.set(70, "");
                DSecRobotChooserWindow.ioMessages.set(71, "");
                DSecRobotChooserWindow.ioMessages.set(72, "");
                DSecRobotChooserWindow.ioMessages.set(73, "");
                DSecRobotChooserWindow.ioMessages.set(74, "");
                DSecRobotChooserWindow.ioMessages.set(75, "");
                DSecRobotChooserWindow.ioMessages.set(76, "");
                DSecRobotChooserWindow.ioMessages.set(77, "");
                DSecRobotChooserWindow.ioMessages.set(100, "");
                DSecRobotChooserWindow.ioMessages.set(101, "");
                DSecRobotChooserWindow.ioMessages.set(102, "");
                DSecRobotChooserWindow.ioMessages.set(103, "");
                DSecRobotChooserWindow.ioMessages.set(104, "");
                DSecRobotChooserWindow.ioMessages.set(105, "");
                DSecRobotChooserWindow.ioMessages.set(106, "");
                DSecRobotChooserWindow.ioMessages.set(107, "");
                DSecRobotChooserWindow.ioMessages.set(108, "");
                DSecRobotChooserWindow.ioMessages.set(109, "");
                DSecRobotChooserWindow.ioMessages.set(110, "");
                DSecRobotChooserWindow.ioMessages.set(111, "");
                DSecRobotChooserWindow.ioMessages.set(112, "");
                DSecRobotChooserWindow.ioMessages.set(113, "");
                DSecRobotChooserWindow.ioMessages.set(114, "");
                DSecRobotChooserWindow.ioMessages.set(115, "");
                DSecRobotChooserWindow.ioMessages.set(116, "");
                DSecRobotChooserWindow.ioMessages.set(117, "");
                DSecRobotChooserWindow.ioMessages.set(118, "");
                DSecRobotChooserWindow.ioMessages.set(119, "");
                DSecRobotChooserWindow.ioMessages.set(120, "");
                DSecRobotChooserWindow.ioMessages.set(121, "");
                DSecRobotChooserWindow.ioMessages.set(122, "");
                DSecRobotChooserWindow.ioMessages.set(123, "");
                DSecRobotChooserWindow.ioMessages.set(124, "");
                DSecRobotChooserWindow.ioMessages.set(125, "");
                DSecRobotChooserWindow.ioMessages.set(126, "");
                DSecRobotChooserWindow.ioMessages.set(127, "");
                DSecRobotChooserWindow.ioMessages.set(128, "");
                DSecRobotChooserWindow.ioMessages.set(129, "");
                DSecRobotChooserWindow.ioMessages.set(130, "");
                DSecRobotChooserWindow.ioMessages.set(131, "");
                DSecRobotChooserWindow.ioMessages.set(132, "");
                DSecRobotChooserWindow.ioMessages.set(133, "");
                DSecRobotChooserWindow.ioMessages.set(134, "");
                DSecRobotChooserWindow.ioMessages.set(135, "");
                DSecRobotChooserWindow.ioMessages.set(136, "");
                DSecRobotChooserWindow.ioMessages.set(137, "");
                DSecRobotChooserWindow.ioMessages.set(138, "");
                DSecRobotChooserWindow.ioMessages.set(139, "");
                DSecRobotChooserWindow.ioMessages.set(140, "");
                DSecRobotChooserWindow.ioMessages.set(167, "");
                DSecRobotChooserWindow.ioMessages.set(169, "");
                DSecRobotChooserWindow.ioMessages.set(170, "");
                DSecRobotChooserWindow.ioMessages.set(171, "");
                DSecRobotChooserWindow.ioMessages.set(173, "");
                DSecRobotChooserWindow.ioMessages.set(175, "");
                DSecRobotChooserWindow.ioMessages.set(176, "");
                DSecRobotChooserWindow.ioMessages.set(177, "");
                DSecRobotChooserWindow.ioMessages.set(178, "");
                DSecRobotChooserWindow.ioMessages.set(179, "");
                DSecRobotChooserWindow.ioMessages.set(180, "");
                DSecRobotChooserWindow.ioMessages.set(181, "");
                DSecRobotChooserWindow.ioMessages.set(198, "");
            }
        }
    }
    DSecRobotChooserWindow.ioMessages = null;
    dsector.DSecRobotChooserWindow = DSecRobotChooserWindow;
    DSecRobotChooserWindow["__class"] = "dsector.DSecRobotChooserWindow";
})(dsector || (dsector = {}));
