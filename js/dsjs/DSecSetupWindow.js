/* re-written from Java */
var dsector;
(function (dsector) {
    class DSecSetupWindow {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.keyLabels === undefined) {
                this.keyLabels = null;
            }
            this.savedX = -1;
            this.savedY = -1;
            let dkblCount = 4;
            /* check for joysticks */
            try {
                dkblCount += dsector.DSReference.jsu.joysticksActive.size;
            } catch (e) {
                CWSYSTEM.Debug.println("No joysticks connected");
            }

            // Create array for keyboard layout
            DSecSetupWindow.dsecKeyboardLayout = Array(dkblCount).fill(null);

            // Sets up default key mappings for keyboard players
            for (let i = 0; i < 4; ++i) {
                DSecSetupWindow.dsecKeyboardLayout[i] = new dsector.DSecKeyboardLayout();
            }

            // Set up joystick button mappings
            if (dkblCount > 4) {
                let joyID = 5;
                for (let i = 0; i < dsector.DSReference.jsu.joysticksActive.size; i++) {
                    const joySelector = joyID * 1000;
                    DSecSetupWindow.dsecKeyboardLayout[(joyID - 1)] = new dsector.DSecKeyboardLayout(
                        (joySelector + dsector.GamePadUtils.JOY_UP), (joySelector + dsector.GamePadUtils.JOY_DOWN),
                        (joySelector + dsector.GamePadUtils.JOY_LEFT), (joySelector + dsector.GamePadUtils.JOY_RIGHT),
                        (joySelector + 0), (joySelector + 1));
                    joyID++;
                }
            }

            // Set up key labels
            this.keyLabels = ([]);
            (this.keyLabels.push(new dsector.ObjectPair(38, "Up")));
            (this.keyLabels.push(new dsector.ObjectPair(40, "Down")));
            (this.keyLabels.push(new dsector.ObjectPair(37, "Left")));
            (this.keyLabels.push(new dsector.ObjectPair(39, "Right")));
            (this.keyLabels.push(new dsector.ObjectPair(32, "Space")));
            (this.keyLabels.push(new dsector.ObjectPair(10, "Enter")));
            (this.keyLabels.push(new dsector.ObjectPair(44, "Comma")));
            (this.keyLabels.push(new dsector.ObjectPair(46, "Period")));
            (this.keyLabels.push(new dsector.ObjectPair(59, ";")));
            (this.keyLabels.push(new dsector.ObjectPair(222, "\'")));
            (this.keyLabels.push(new dsector.ObjectPair(47, "/")));
            (this.keyLabels.push(new dsector.ObjectPair(92, "\\")));
            (this.keyLabels.push(new dsector.ObjectPair(127, "Del")));
            (this.keyLabels.push(new dsector.ObjectPair(8, "Backspace")));
            (this.keyLabels.push(new dsector.ObjectPair(45, "-")));
            (this.keyLabels.push(new dsector.ObjectPair(61, "+")));
            (this.keyLabels.push(new dsector.ObjectPair(91, "[")));
            (this.keyLabels.push(new dsector.ObjectPair(93, "]")));
            (this.keyLabels.push(new dsector.ObjectPair(36, "Home")));
            (this.keyLabels.push(new dsector.ObjectPair(35, "End")));
            (this.keyLabels.push(new dsector.ObjectPair(155, "Insert")));
            (this.keyLabels.push(new dsector.ObjectPair(33, "Page up")));
            (this.keyLabels.push(new dsector.ObjectPair(34, "Page down")));
            (this.keyLabels.push(new dsector.ObjectPair(48, "0")));
            (this.keyLabels.push(new dsector.ObjectPair(49, "1")));
            (this.keyLabels.push(new dsector.ObjectPair(50, "2")));
            (this.keyLabels.push(new dsector.ObjectPair(51, "3")));
            (this.keyLabels.push(new dsector.ObjectPair(52, "4")));
            (this.keyLabels.push(new dsector.ObjectPair(53, "5")));
            (this.keyLabels.push(new dsector.ObjectPair(54, "6")));
            (this.keyLabels.push(new dsector.ObjectPair(55, "7")));
            (this.keyLabels.push(new dsector.ObjectPair(56, "8")));
            (this.keyLabels.push(new dsector.ObjectPair(57, "9")));
            (this.keyLabels.push(new dsector.ObjectPair(65, "A")));
            (this.keyLabels.push(new dsector.ObjectPair(66, "B")));
            (this.keyLabels.push(new dsector.ObjectPair(67, "C")));
            (this.keyLabels.push(new dsector.ObjectPair(68, "D")));
            (this.keyLabels.push(new dsector.ObjectPair(69, "E")));
            (this.keyLabels.push(new dsector.ObjectPair(70, "F")));
            (this.keyLabels.push(new dsector.ObjectPair(71, "G")));
            (this.keyLabels.push(new dsector.ObjectPair(72, "H")));
            (this.keyLabels.push(new dsector.ObjectPair(73, "I")));
            (this.keyLabels.push(new dsector.ObjectPair(74, "J")));
            (this.keyLabels.push(new dsector.ObjectPair(75, "K")));
            (this.keyLabels.push(new dsector.ObjectPair(76, "L")));
            (this.keyLabels.push(new dsector.ObjectPair(77, "M")));
            (this.keyLabels.push(new dsector.ObjectPair(78, "N")));
            (this.keyLabels.push(new dsector.ObjectPair(79, "O")));
            (this.keyLabels.push(new dsector.ObjectPair(80, "P")));
            (this.keyLabels.push(new dsector.ObjectPair(81, "Q")));
            (this.keyLabels.push(new dsector.ObjectPair(82, "R")));
            (this.keyLabels.push(new dsector.ObjectPair(83, "S")));
            (this.keyLabels.push(new dsector.ObjectPair(84, "T")));
            (this.keyLabels.push(new dsector.ObjectPair(85, "U")));
            (this.keyLabels.push(new dsector.ObjectPair(86, "V")));
            this.keyLabels.push(new dsector.ObjectPair(87, "W"));
            this.keyLabels.push(new dsector.ObjectPair(88, "X"));
            this.keyLabels.push(new dsector.ObjectPair(89, "Y"));
            this.keyLabels.push(new dsector.ObjectPair(90, "Z"));
        }

        static cameraMode_$LI$() {
            if (DSecSetupWindow.cameraMode == null || isNaN(DSecSetupWindow.cameraMode)) {
                DSecSetupWindow.cameraMode = DSecSetupWindow.OVERHEAD;
            }
            return DSecSetupWindow.cameraMode;
        }

        isCreated() {
            return this.window != null;
        }

        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        create() {
            dsector.DSReference.virtualScreen.fadeInBackgroundFromBlack(4000);
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/robotEditing.jpg");
            dsector.DSReference.dsecMainSetupWindow.destroy();
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
            } else {
                this.drawWindow();
                this.restorePosition();
            }
        }

        /** @private */
        restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }

        drawWindow() {
            let initX = 25;
            let initY = 25;
            if (this.window != null) {
                initX = this.window.xPosition;
                initY = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("DSECTORSETUP");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("DSECTORSETUP", 3,
                null, initX, initY, 440, 390, true);
            const color = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            this.window.addTextBlock("", "Right-click over playfield to adjust options during game",
                10, 30, font, color, 999);
            this.window.addTextBlock("", "Default camera mode", 10, 70, font, color, 999);
            this.window.addTextBlock("", "Render magnetic grid", 10, 90, font, color, 999);
            this.window.addTextBlock("", "Anti-alias level", 10, 110, font, color, 999);
            this.window.addTextBlock("", "Sound effects", 10, 130, font, color, 999);
            this.window.addTextBlock("", "Music", 10, 150, font, color, 999);
            this.window.addTextBlock("", "Starting Credits", 10, 170, font, color, 999);
            let arrayList = ([]);
            (arrayList.push(new dsector.StringPair("D-Sector standard display", "0")));
            (arrayList.push(new dsector.StringPair("Cyclic panning", "1")));
            (arrayList.push(new dsector.StringPair("Player 1 perspective", "2")));
            (arrayList.push(new dsector.StringPair("Player 2 perspective", "3")));
            (arrayList.push(new dsector.StringPair("Player 3 perspective", "4")));
            (arrayList.push(new dsector.StringPair("Player 4 perspective", "5")));
            (arrayList.push(new dsector.StringPair("Player 5 perspective", "6")));
            (arrayList.push(new dsector.StringPair("Player 6 perspective", "7")));
            let pulldown = this.window.addPulldown("cameraMode", arrayList, 235, 46, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.cameraMode_$LI$();
            pulldown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            (arrayList.push(new dsector.StringPair("Yes", "true")));
            (arrayList.push(new dsector.StringPair("No", "false")));
            pulldown = this.window.addPulldown("showBackgrounds", arrayList, 235, 66, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.showBackgrounds ? 0 : 1;
            pulldown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            (arrayList.push(new dsector.StringPair("Disabled", "1")));
            (arrayList.push(new dsector.StringPair("Four times super-sampled", "2")));
            (arrayList.push(new dsector.StringPair("Nine times super-sampled", "3")));
            pulldown = this.window.addPulldown("antialiasLevel", arrayList, 235, 86, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.antialiasLevel - 1;
            pulldown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            (arrayList.push(new dsector.StringPair("No sound effects", "0")));
            (arrayList.push(new dsector.StringPair("Simplified sound", "1")));
            (arrayList.push(new dsector.StringPair("Extended sound", "2")));
            pulldown = this.window.addPulldown("soundMode", arrayList, 235, 106, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.soundMode;
            pulldown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            (arrayList.push(new dsector.StringPair("Music off", "0")));
            (arrayList.push(new dsector.StringPair("Music on", "1")));
            pulldown = this.window.addPulldown("musicMode", arrayList, 235, 126, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.musicMode;
            pulldown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            (arrayList.push(new dsector.StringPair("Default", "0")));
            (arrayList.push(new dsector.StringPair("Fun", "1")));
            (arrayList.push(new dsector.StringPair("OVERPOWERED!", "2")));
            pulldown = this.window.addPulldown("startingCredits", arrayList, 235, 146, 200, 16);
            pulldown.selectedOption = DSecSetupWindow.startingCredits;
            pulldown.objectContainingPulldownChangedMethod = this;
            this.window.addTextBlock("", "Action", 10, 190, font, color, 999);
            this.window.addTextBlock("", "Keyboard 1", 124, 190, font, color, 999);
            this.window.addTextBlock("", "Keyboard 2", 204, 190, font, color, 999);
            this.window.addTextBlock("", "Keyboard 3", 284, 190, font, color, 999);
            this.window.addTextBlock("", "Keyboard 4", 364, 190, font, color, 999);
            this.window.addTextBlock("", "Move forwards", 10, 210, font, color, 999);
            this.window.addTextBlock("", "Move backwards", 10, 230, font, color, 999);
            this.window.addTextBlock("", "Turn left", 10, 250, font, color, 999);
            this.window.addTextBlock("", "Turn right", 10, 270, font, color, 999);
            this.window.addTextBlock("", "Fire", 10, 290, font, color, 999);
            this.window.addTextBlock("", "Change weapon", 10, 310, font, color, 999);
            for (let i = 0; i < 4; ++i) {
                arrayList = ([]);
                let countD = 0;
                let counter1 = 0;
                let j;
                let objectPair;
                let keyDigit;
                let keyGlyph;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].forwards) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "Forwards", arrayList,
                    120 + 80 * i, 187, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
                arrayList = ([]);
                countD = 0;
                counter1 = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].backwards) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "Backwards", arrayList,
                    120 + 80 * i, 207, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
                arrayList = ([]);
                countD = 0;
                counter1 = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].turnLeft) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "TurnLeft", arrayList, 120 + 80 * i, 227, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
                arrayList = ([]);
                countD = 0;
                counter1 = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].turnRight) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "TurnRight", arrayList, 120 + 80 * i, 247, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
                arrayList = ([]);
                countD = 0;
                counter1 = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "FireWeapon", arrayList, 120 + 80 * i, 267, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
                arrayList = ([]);
                countD = 0;
                counter1 = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon) {
                        counter1 = countD;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit));
                    ++countD;
                }
                pulldown = this.window.addPulldown("keyboard" + (i + 1) + "ChangeWeapon", arrayList, 120 + 80 * i, 287, 75, 16);
                pulldown.selectedOption = counter1;
                pulldown.objectContainingPulldownChangedMethod = this;
                pulldown.generalPurposeObject = i + 1;
                pulldown.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pulldown.popupWindowItemHeight = 12;
            }
            const kbMsg = "Assigning different keys to each keyboard layout allows players to play from one computer" + " and share the same keyboard. External USB keyboards can be plugged in for greater comfort.";
            this.window.addTextBlock("", kbMsg, 10, 350, font, color, 420);
            let button = null;
            button = this.window.addButton$name$x$y$len$h$text$t$r("", 394, 370, 40, 15, "Done", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "doneButtonPressed";
        }

        pulldownChanged(pulldown) {
            pulldown = pulldown[0];
            if (pulldown.generalPurposeObject != null) {
                const gpObj = pulldown.generalPurposeObject;
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "Forwards") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].forwards = parseInt(pulldown.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "Backwards") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].backwards = parseInt(pulldown.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "TurnLeft") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].turnLeft = parseInt(pulldown.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "TurnRight") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].turnRight = parseInt(pulldown.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "FireWeapon") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].fireWeapon = parseInt(pulldown.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pulldown.name, "ChangeWeapon") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].changeWeapon = parseInt(pulldown.selectedValue());
                }
            }
            if (pulldown.name === ("cameraMode")) {
                DSecSetupWindow.cameraMode = parseInt(pulldown.selectedValue());
            }
            if (pulldown.name === ("showBackgrounds")) {
                DSecSetupWindow.showBackgrounds = CWSYSTEM.CWStringTools.stringToBoolean(pulldown.selectedValue());
            }
            if (pulldown.name === ("antialiasLevel")) {
                DSecSetupWindow.antialiasLevel = parseInt(pulldown.selectedValue());
            }
            if (pulldown.name === ("soundMode")) {
                DSecSetupWindow.soundMode = parseInt(pulldown.selectedValue());
            }
            if (pulldown.name === ("musicMode")) {
                DSecSetupWindow.musicMode = parseInt(pulldown.selectedValue());
            }
            if (pulldown.name === ("startingCredits")) {
                DSecSetupWindow.startingCredits = parseInt(pulldown.selectedValue());
            }
            this.saveOptions();
            this.update();
        }

        doneButtonPressed(button) {
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        }

        saveOptions() {
            let configString = `
cameraMode=${DSecSetupWindow.cameraMode_$LI$()}
showBackgrounds=${DSecSetupWindow.showBackgrounds}
antialiasLevel=${DSecSetupWindow.antialiasLevel}
soundMode=${DSecSetupWindow.soundMode}
musicMode=${DSecSetupWindow.musicMode}
startingCredits=${DSecSetupWindow.startingCredits}`;

            for (let i = 0; i < 4; ++i) {
                configString += `
keyboard${i + 1}Forwards=${DSecSetupWindow.dsecKeyboardLayout[i].forwards}
keyboard${i + 1}Backwards=${DSecSetupWindow.dsecKeyboardLayout[i].backwards}
keyboard${i + 1}TurnLeft=${DSecSetupWindow.dsecKeyboardLayout[i].turnLeft}
keyboard${i + 1}TurnRight=${DSecSetupWindow.dsecKeyboardLayout[i].turnRight}
keyboard${i + 1}FireWeapon=${DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon}
keyboard${i + 1}ChangeWeapon=${DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon}`;
            }

            CWSYSTEM.CWFileTools.outputFile("config/dzsetup.cfg", configString.trim());
        }

        loadOptions() {
            let hashtable = new CWSYSTEM.CWHashtable("config/dzsetup.cfg");
            if (hashtable.hashMap === null) {
                hashtable = null;
            }
            let exceptionList = [];
            const x = [String.fromCharCode(10)];
            try {
                DSecSetupWindow.cameraMode = parseInt(hashtable.get("cameraMode"));
            } catch (e) {
                exceptionList.push({"cameraMode": e.message});
            }
            try {
                DSecSetupWindow.showBackgrounds =
                    CWSYSTEM.CWStringTools.stringToBoolean(hashtable.get("showBackgrounds"));
            } catch (e) {
                exceptionList.push({"showBackgrounds": e.message});
            }
            try {
                DSecSetupWindow.antialiasLevel = parseInt(hashtable.get("antialiasLevel"));
            } catch (e) {
                exceptionList.push({"antialiasLevel": e.message});
            }
            try {
                DSecSetupWindow.soundMode = parseInt(hashtable.get("soundMode"));
            } catch (e) {
                exceptionList.push({"soundMode": e.message});
            }
            try {
                DSecSetupWindow.musicMode = parseInt(hashtable.get("musicMode"));
            } catch (e) {
                exceptionList.push({"musicMode": e.message});
            }
            try {
                DSecSetupWindow.startingCredits = parseInt(hashtable.get("startingCredits"));
            } catch (e) {
                exceptionList.push({"startingCredits": e.message});
                DSecSetupWindow.startingCredits = 0;
            }

            if (exceptionList.length > 0) {
                CWSYSTEM.Debug.println("LO01: Exceptions thrown:\n" +
                    JSON.stringify(exceptionList, null, 2) + "\nLO01: will try using defaults");
            }

            exceptionList = [];
            for (let i = 0; i < 4; ++i) {
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].forwards =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "Forwards"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}Forwards`]: e.message});
                }
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].backwards =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "Backwards"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}Backwards`]: e.message});
                }
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].turnLeft =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "TurnLeft"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}TurnLeft`]: e.message});
                }
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].turnRight =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "TurnRight"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}TurnRight`]: e.message});
                }
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "FireWeapon"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}FireWeapon`]: e.message});
                }
                try {
                    DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon =
                        parseInt(hashtable.get("keyboard" + (i + 1) + "ChangeWeapon"));
                } catch (e) {
                    exceptionList.push({[`keyboard${i + 1}ChangeWeapon`]: e.message});
                }
            }

            if (exceptionList.length > 0) {
                CWSYSTEM.Debug.println("KB001: Exceptions thrown:\n" +
                    JSON.stringify(exceptionList, null, 2) + "\nKB001: will use defaults...");
            }
        }

        /** @private */
        keyAlreadyUsed(keyDigit) {
            for (let i = 0; i < 4; ++i) {
                if (DSecSetupWindow.dsecKeyboardLayout[i].forwards === keyDigit ||
                    DSecSetupWindow.dsecKeyboardLayout[i].backwards === keyDigit ||
                    DSecSetupWindow.dsecKeyboardLayout[i].turnLeft === keyDigit ||
                    DSecSetupWindow.dsecKeyboardLayout[i].turnRight === keyDigit ||
                    DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon === keyDigit ||
                    DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon === keyDigit) {
                    return true;
                }
            }
            return false;
        }
    }

    DSecSetupWindow.showBackgrounds = false;
    DSecSetupWindow.antialiasLevel = 1;
    DSecSetupWindow.NO_SOUND = 0;
    DSecSetupWindow.SIMPLIFIED_SOUND = 1;
    DSecSetupWindow.NORMAL_SOUND = 2;
    DSecSetupWindow.soundMode = 1;
    DSecSetupWindow.MUSIC_OFF = 0;
    DSecSetupWindow.MUSIC_ON = 1;
    DSecSetupWindow.musicMode = 1;
    DSecSetupWindow.startingCredits = 0;
    DSecSetupWindow.OVERHEAD = 0;
    DSecSetupWindow.CYCLIC_PANNING = 1;
    DSecSetupWindow.PLAYER_1_PERSPECTIVE = 2;
    DSecSetupWindow.PLAYER_2_PERSPECTIVE = 3;
    DSecSetupWindow.rotationsPerMinute = 1.0;
    DSecSetupWindow.dsecKeyboardLayout = null;
    dsector.DSecSetupWindow = DSecSetupWindow;
    DSecSetupWindow["__class"] = "dsector.DSecSetupWindow";
})(dsector || (dsector = {}));
