(function (dsector) {
    /**
     * Class for displaying the options set up window.
     *
     * @property {CWSYSTEM.CWWindow} window - The window object for the setup window.
     * @property {Array} keyLabels - An array of key labels for the keyboard layout.
     * @property {number} savedX - The saved x-coordinate of the window.
     * @property {number} savedY - The saved y-coordinate of the window.
     * @property {boolean} showBackgrounds - Whether to show backgrounds in the game.
     * @property {number} antialiasLevel - The antialias level for the game.
     * @property {number} soundMode - The sound mode for the game.
     * @property {number} startingCredits - The starting credits for the game.
     * @property {number} musicMode - The music mode for the game.
     * @property {Array} dsOptions - An array of options for the game.
     * @property {Array} dsecKeyboardLayout - An array of keyboard layouts for the game.
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
    class DSecSetupWindow {
        /**
         * Constructor for DSecSetupWindow.
         */
        constructor() {
            this.window = null;
            this.keyLabels = null;
            this.savedX = -1;
            this.savedY = -1;
            this.showBackgrounds = false;
            this.antialiasLevel = 1;
            this.soundMode = DSecSetupWindow.SIMPLIFIED_SOUND;
            this.startingCredits = 0;
            this.musicMode = DSecSetupWindow.MUSIC_ON;
            this.dsOptions = null;

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
            this.keyLabels.push(new dsector.ObjectPair(38, "Up"));
            this.keyLabels.push(new dsector.ObjectPair(40, "Down"));
            this.keyLabels.push(new dsector.ObjectPair(37, "Left"));
            this.keyLabels.push(new dsector.ObjectPair(39, "Right"));
            this.keyLabels.push(new dsector.ObjectPair(32, "Space"));
            this.keyLabels.push(new dsector.ObjectPair(10, "Enter"));
            this.keyLabels.push(new dsector.ObjectPair(44, "Comma"));
            this.keyLabels.push(new dsector.ObjectPair(46, "Period"));
            this.keyLabels.push(new dsector.ObjectPair(59, ";"));
            this.keyLabels.push(new dsector.ObjectPair(222, "'"));
            this.keyLabels.push(new dsector.ObjectPair(47, "/"));
            this.keyLabels.push(new dsector.ObjectPair(92, "\\"));
            this.keyLabels.push(new dsector.ObjectPair(127, "Del"));
            this.keyLabels.push(new dsector.ObjectPair(8, "Backspace"));
            this.keyLabels.push(new dsector.ObjectPair(45, "-"));
            this.keyLabels.push(new dsector.ObjectPair(61, "+"));
            this.keyLabels.push(new dsector.ObjectPair(91, "["));
            this.keyLabels.push(new dsector.ObjectPair(93, "]"));
            this.keyLabels.push(new dsector.ObjectPair(36, "Home"));
            this.keyLabels.push(new dsector.ObjectPair(35, "End"));
            this.keyLabels.push(new dsector.ObjectPair(155, "Insert"));
            this.keyLabels.push(new dsector.ObjectPair(33, "Page up"));
            this.keyLabels.push(new dsector.ObjectPair(34, "Page down"));
            this.keyLabels.push(new dsector.ObjectPair(48, "0"));
            this.keyLabels.push(new dsector.ObjectPair(49, "1"));
            this.keyLabels.push(new dsector.ObjectPair(50, "2"));
            this.keyLabels.push(new dsector.ObjectPair(51, "3"));
            this.keyLabels.push(new dsector.ObjectPair(52, "4"));
            this.keyLabels.push(new dsector.ObjectPair(53, "5"));
            this.keyLabels.push(new dsector.ObjectPair(54, "6"));
            this.keyLabels.push(new dsector.ObjectPair(55, "7"));
            this.keyLabels.push(new dsector.ObjectPair(56, "8"));
            this.keyLabels.push(new dsector.ObjectPair(57, "9"));
            this.keyLabels.push(new dsector.ObjectPair(65, "A"));
            this.keyLabels.push(new dsector.ObjectPair(66, "B"));
            this.keyLabels.push(new dsector.ObjectPair(67, "C"));
            this.keyLabels.push(new dsector.ObjectPair(68, "D"));
            this.keyLabels.push(new dsector.ObjectPair(69, "E"));
            this.keyLabels.push(new dsector.ObjectPair(70, "F"));
            this.keyLabels.push(new dsector.ObjectPair(71, "G"));
            this.keyLabels.push(new dsector.ObjectPair(72, "H"));
            this.keyLabels.push(new dsector.ObjectPair(73, "I"));
            this.keyLabels.push(new dsector.ObjectPair(74, "J"));
            this.keyLabels.push(new dsector.ObjectPair(75, "K"));
            this.keyLabels.push(new dsector.ObjectPair(76, "L"));
            this.keyLabels.push(new dsector.ObjectPair(77, "M"));
            this.keyLabels.push(new dsector.ObjectPair(78, "N"));
            this.keyLabels.push(new dsector.ObjectPair(79, "O"));
            this.keyLabels.push(new dsector.ObjectPair(80, "P"));
            this.keyLabels.push(new dsector.ObjectPair(81, "Q"));
            this.keyLabels.push(new dsector.ObjectPair(82, "R"));
            this.keyLabels.push(new dsector.ObjectPair(83, "S"));
            this.keyLabels.push(new dsector.ObjectPair(84, "T"));
            this.keyLabels.push(new dsector.ObjectPair(85, "U"));
            this.keyLabels.push(new dsector.ObjectPair(86, "V"));
            this.keyLabels.push(new dsector.ObjectPair(87, "W"));
            this.keyLabels.push(new dsector.ObjectPair(88, "X"));
            this.keyLabels.push(new dsector.ObjectPair(89, "Y"));
            this.keyLabels.push(new dsector.ObjectPair(90, "Z"));
        }

        /**
         * Static method to get the camera mode.
         *
         * @public
         * @static
         * @returns {number} The camera mode.
         */
        static cameraMode_$LI$() {
            if (dsector.DSReference.dsecSetupWindow.cameraMode == null ||
                isNaN(dsector.DSReference.dsecSetupWindow.cameraMode)) {
                dsector.DSReference.dsecSetupWindow.cameraMode = DSecSetupWindow.OVERHEAD;
            }
            return dsector.DSReference.dsecSetupWindow.cameraMode;
        }

        /**
         * Get the camera mode.
         *
         * @returns {number} The camera mode.
         * @private
         */
        _cameraMode() {
            if (this.cameraMode == null || isNaN(this.cameraMode)) {
                this.cameraMode = DSecSetupWindow.OVERHEAD;
            }
            return dsector.DSReference.dsecSetupWindow.cameraMode;
        }

        /**
         * Check if the window is created.
         *
         * @public
         * @returns {boolean}
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
         * Create the setup window.
         *
         * @public
         */
        create() {
            dsector.DSReference.virtualScreen.fadeInBackgroundFromBlack(4000);
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/robotEditing.jpg");
            dsector.DSReference.dsecMainSetupWindow.destroy();
            this.drawWindow();
            this.window.centerWithinDesktop();
        }

        /**
         * Destroy the setup window.
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
         * Update the setup window.
         *
         * @public
         */
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            } else {
                this.drawWindow();
                this.restorePosition();
            }
        }

        /**
         * Restore the position of the setup window.
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
         * Draw the setup window.
         *
         * @private
         */
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
            const color = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            this.window.addTextBlock("", "Right-click over playfield to adjust options during game",
                10, 30, font, color, 999);
            this.window.addTextBlock("", "Default camera mode", 10, 70, font, color, 999);
            this.window.addTextBlock("", "Render magnetic grid", 10, 90, font, color, 999);
            this.window.addTextBlock("", "Anti-alias level", 10, 110, font, color, 999);
            this.window.addTextBlock("", "Sound effects", 10, 130, font, color, 999);
            this.window.addTextBlock("", "Music", 10, 150, font, color, 999);
            this.window.addTextBlock("", "Starting Credits", 10, 170, font, color, 999);
            let arrayList = ([]);
            arrayList.push(new dsector.StringPair("D-Sector standard display", "0"));
            arrayList.push(new dsector.StringPair("Cyclic panning", "1"));
            arrayList.push(new dsector.StringPair("Player 1 perspective", "2"));
            arrayList.push(new dsector.StringPair("Player 2 perspective", "3"));
            arrayList.push(new dsector.StringPair("Player 3 perspective", "4"));
            arrayList.push(new dsector.StringPair("Player 4 perspective", "5"));
            arrayList.push(new dsector.StringPair("Player 5 perspective", "6"));
            arrayList.push(new dsector.StringPair("Player 6 perspective", "7"));
            let pd = this.window.addPulldown("cameraMode", arrayList, 235, 46, 200, 16);
            pd.selectedOption = this._cameraMode();
            pd.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("Yes", "true"));
            arrayList.push(new dsector.StringPair("No", "false"));
            pd = this.window.addPulldown("showBackgrounds", arrayList, 235, 66, 200, 16);
            pd.selectedOption = this.showBackgrounds ? 0 : 1;
            pd.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("Disabled", "1"));
            arrayList.push(new dsector.StringPair("Four times super-sampled", "2"));
            arrayList.push(new dsector.StringPair("Nine times super-sampled", "3"));
            pd = this.window.addPulldown("antialiasLevel", arrayList, 235, 86, 200, 16);
            pd.selectedOption = this.antialiasLevel - 1;
            pd.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("No sound effects", "0"));
            arrayList.push(new dsector.StringPair("Simplified sound", "1"));
            arrayList.push(new dsector.StringPair("Extended sound", "2"));
            pd = this.window.addPulldown("soundMode", arrayList, 235, 106, 200, 16);
            pd.selectedOption = this.soundMode;
            pd.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("Music off", "0"));
            arrayList.push(new dsector.StringPair("Music on", "1"));
            pd = this.window.addPulldown("musicMode", arrayList, 235, 126, 200, 16);
            pd.selectedOption = this.musicMode;
            pd.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("Default", "0"));
            arrayList.push(new dsector.StringPair("Fun", "1"));
            arrayList.push(new dsector.StringPair("OVERPOWERED!", "2"));
            pd = this.window.addPulldown("startingCredits", arrayList, 235, 146, 200, 16);
            pd.selectedOption = this.startingCredits;
            pd.objectContainingPulldownChangedMethod = this;
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
                let pdc = 0;
                let index = 0;
                let j;
                let objectPair;
                let keyDigit;
                let keyGlyph;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].forwards) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "Forwards", arrayList,
                    120 + 80 * i, 187, 75, 16);
                pd.setDefaults(index, i);
                arrayList = ([]);
                pdc = 0;
                index = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].backwards) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "Backwards", arrayList,
                    120 + 80 * i, 207, 75, 16);
                pd.setDefaults(index, i);
                arrayList = ([]);
                pdc = 0;
                index = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].turnLeft) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "TurnLeft", arrayList, 120 + 80 * i, 227, 75, 16);
                pd.setDefaults(index, i);
                arrayList = ([]);
                pdc = 0;
                index = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].turnRight) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "TurnRight", arrayList, 120 + 80 * i, 247, 75, 16);
                pd.setDefaults(index, i);
                arrayList = ([]);
                pdc = 0;
                index = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    (arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit)));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "FireWeapon", arrayList, 120 + 80 * i, 267, 75, 16);
                pd.setDefaults(index, i);
                arrayList = ([]);
                pdc = 0;
                index = 0;
                for (j = 0; j < this.keyLabels.length; ++j) {
                    objectPair = this.keyLabels[j];
                    keyDigit = objectPair.object1;
                    if (keyDigit === DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon) {
                        index = pdc;
                    } else if (this.keyAlreadyUsed(keyDigit)) {
                        continue;
                    }
                    keyGlyph = objectPair.object2;

                    arrayList.push(new dsector.StringPair(keyGlyph, "" + keyDigit));
                    ++pdc;
                }
                pd = this.window.addPulldown("keyboard" + (i + 1) + "ChangeWeapon", arrayList, 120 + 80 * i, 287, 75, 16);
                pd.selectedOption = index;
                pd.objectContainingPulldownChangedMethod = this;
                pd.generalPurposeObject = i + 1;
                pd.popupWindowFont = dsector.DSReference.virtualScreen.jcsmallfixed_font;
                pd.popupWindowItemHeight = 12;
            }
            const kbMsg = "Assigning different keys to each keyboard layout allows players to play from one computer" + " and share the same keyboard. External USB keyboards can be plugged in for greater comfort.";
            this.window.addTextBlock("", kbMsg, 10, 350, font, color, 420);
            let button;
            button = this.window.addButton("", 394, 370, 40, 15, "Done",
                CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "doneButtonPressed";
        }

        /**
         * Handle a pulldown changed event.
         *
         * @private
         * @param {CWSYSTEM.CWPulldown} pd the pulldown that changed.
         */
        pulldownChanged(pd) {
            pd = pd[0];
            if (pd.generalPurposeObject != null) {
                const gpObj = pd.generalPurposeObject;
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "Forwards") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].forwards = parseInt(pd.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "Backwards") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].backwards = parseInt(pd.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "TurnLeft") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].turnLeft = parseInt(pd.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "TurnRight") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].turnRight = parseInt(pd.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "FireWeapon") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].fireWeapon = parseInt(pd.selectedValue());
                }
                if (CWSYSTEM.CWStringTools.find$Str$Str(pd.name, "ChangeWeapon") !== -1) {
                    DSecSetupWindow.dsecKeyboardLayout[gpObj - 1].changeWeapon = parseInt(pd.selectedValue());
                }
            }
            if (pd.name === ("cameraMode")) {
                this.cameraMode = parseInt(pd.selectedValue());
            }
            if (pd.name === ("showBackgrounds")) {
                this.showBackgrounds = CWSYSTEM.CWStringTools.stringToBoolean(pd.selectedValue());
            }
            if (pd.name === ("antialiasLevel")) {
                this.antialiasLevel = parseInt(pd.selectedValue());
            }
            if (pd.name === ("soundMode")) {
                this.soundMode = parseInt(pd.selectedValue());
            }
            if (pd.name === ("musicMode")) {
                this.musicMode = parseInt(pd.selectedValue());
            }
            if (pd.name === ("startingCredits")) {
                this.startingCredits = parseInt(pd.selectedValue());
            }
            this.update();
        }

        /**
         * Handle the done button being pressed.
         *
         * @private
         * @param {CWSYSTEM.CWButton} button the button that was pressed.
         */
        doneButtonPressed(button) {
            this.saveOptions();
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        }

        /**
         * Save the options.
         *
         * @public
         */
        saveOptions() {
            let configString = `
cameraMode=${this._cameraMode()}
showBackgrounds=${this.showBackgrounds}
antialiasLevel=${this.antialiasLevel}
soundMode=${this.soundMode}
musicMode=${this.musicMode}
startingCredits=${this.startingCredits}`;

            for (let i = 0; i < 4; ++i) {
                configString += `
keyboard${i + 1}Forwards=${DSecSetupWindow.dsecKeyboardLayout[i].forwards}
keyboard${i + 1}Backwards=${DSecSetupWindow.dsecKeyboardLayout[i].backwards}
keyboard${i + 1}TurnLeft=${DSecSetupWindow.dsecKeyboardLayout[i].turnLeft}
keyboard${i + 1}TurnRight=${DSecSetupWindow.dsecKeyboardLayout[i].turnRight}
keyboard${i + 1}FireWeapon=${DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon}
keyboard${i + 1}ChangeWeapon=${DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon}`;
            }

            CWSYSTEM.CWFileTools.outputFile("dzsetup.cfg", configString.trim());
        }

        /**
         * Load the options.
         *
         * @public
         */
        loadOptions() {
            let c;
            let ht = this.dsOptions;
            if (ht === null || ht.hashMap === null) {
                ht = null;
            }
            CWSYSTEM.Debug.println(ht);
            let exceptionList = [];

            try {
                c = parseInt(ht.get("cameraMode"));
                this.cameraMode = isNaN(c) ? DSecSetupWindow.OVERHEAD : c;
            } catch (e) {
                this.cameraMode = DSecSetupWindow.OVERHEAD;
                exceptionList.push({"cameraMode": e.message});
            }
            try {
                this.showBackgrounds =
                    CWSYSTEM.CWStringTools.stringToBoolean(ht.get("showBackgrounds"));
            } catch (e) {
                this.showBackgrounds = false;
                exceptionList.push({"showBackgrounds": e.message});
            }
            try {
                c = parseInt(ht.get("antialiasLevel"));
                this.antialiasLevel = isNaN(c) ? 1 : c;
            } catch (e) {
                this.antialiasLevel = 1;
                exceptionList.push({"antialiasLevel": e.message});
            }
            try {
                c = parseInt(ht.get("soundMode"));
                this.soundMode = isNaN(c) ? DSecSetupWindow.NORMAL_SOUND : c;
            } catch (e) {
                this.soundMode = DSecSetupWindow.NORMAL_SOUND;
                exceptionList.push({"soundMode": e.message});
            }
            try {
                c = parseInt(ht.get("musicMode"));
                this.musicMode = isNaN(c) ? DSecSetupWindow.MUSIC_ON : c;
            } catch (e) {
                this.musicMode = DSecSetupWindow.MUSIC_ON;
                exceptionList.push({"musicMode": e.message});
            }
            try {
                c = parseInt(ht.get("startingCredits"));
                CWSYSTEM.Debug.println(`"${ht.get("startingCredits")}\nStarting Creds: ${c}`);
                this.startingCredits = isNaN(c) ? 0 : c;
            } catch (e) {
                this.startingCredits = 0;
                exceptionList.push({"startingCredits": e.message});
            }

            if (exceptionList.length > 0) {
                CWSYSTEM.Debug.println("LO01: Exceptions thrown:\n" +
                    JSON.stringify(exceptionList, null, 2) + "\nLO01: will try using defaults");
            }

            exceptionList = [];
            for (let i = 0; i < 4; ++i) {
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "Forwards"));
                    DSecSetupWindow.dsecKeyboardLayout[i].forwards = isNaN(c) ? 38 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].forwards = 38;
                    exceptionList.push({[`keyboard${i + 1}Forwards`]: e.message});
                }
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "Backwards"));
                    DSecSetupWindow.dsecKeyboardLayout[i].backwards = isNaN(c) ? 40 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].backwards = 40;
                    exceptionList.push({[`keyboard${i + 1}Backwards`]: e.message});
                }
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "TurnLeft"));
                    DSecSetupWindow.dsecKeyboardLayout[i].turnLeft = isNaN(c) ? 37 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].turnLeft = 37;
                    exceptionList.push({[`keyboard${i + 1}TurnLeft`]: e.message});
                }
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "TurnRight"));
                    DSecSetupWindow.dsecKeyboardLayout[i].turnRight = isNaN(c) ? 39 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].turnRight = 39;
                    exceptionList.push({[`keyboard${i + 1}TurnRight`]: e.message});
                }
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "FireWeapon"));
                    DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon = isNaN(c) ? 32 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].fireWeapon = 32;
                    exceptionList.push({[`keyboard${i + 1}FireWeapon`]: e.message});
                }
                try {
                    c = parseInt(ht.get("keyboard" + (i + 1) + "ChangeWeapon"));
                    DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon = isNaN(c) ? 67 : c;
                } catch (e) {
                    DSecSetupWindow.dsecKeyboardLayout[i].changeWeapon = 67;
                    exceptionList.push({[`keyboard${i + 1}ChangeWeapon`]: e.message});
                }
            }

            if (exceptionList.length > 0) {
                CWSYSTEM.Debug.println("KB001: Exceptions thrown:\n" +
                    JSON.stringify(exceptionList, null, 2) + "\nKB001: will use defaults...");
            }
        }

        /**
         * Check if a key is already used.
         *
         * @private
         * @param {number} keyDigit the key to check.
         * @return {boolean} true if the key is already used.
         */
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

    /**
     * Keyboard layout configuration for DSecSetupWindow.
     * @type {Object|null}
     * @static
     */
    DSecSetupWindow.dsecKeyboardLayout = null;

    /**
     * Rotations per minute for the setup window.
     * @type {number}
     * @default 1.0
     * @static
     */
    DSecSetupWindow.rotationsPerMinute = 1.0;

    /**
     * Constant representing no sound.
     * @type {number}
     * @constant
     * @default 0
     * @static
     */
    DSecSetupWindow.NO_SOUND = 0;

    /**
     * Constant representing simplified sound.
     * @type {number}
     * @constant
     * @default 1
     * @static
     */
    DSecSetupWindow.SIMPLIFIED_SOUND = 1;

    /**
     * Constant representing normal sound.
     * @type {number}
     * @constant
     * @default 2
     * @static
     */
    DSecSetupWindow.NORMAL_SOUND = 2;

    /**
     * Constant representing music off.
     * @type {number}
     * @constant
     * @default 0
     * @static
     */
    DSecSetupWindow.MUSIC_OFF = 0;

    /**
     * Constant representing music on.
     * @type {number}
     * @constant
     * @default 1
     * @static
     */
    DSecSetupWindow.MUSIC_ON = 1;

    /**
     * Constant representing overhead view.
     * @type {number}
     * @constant
     * @default 0
     * @static
     */
    DSecSetupWindow.OVERHEAD = 0;

    /**
     * Constant representing cyclic panning view.
     * @type {number}
     * @constant
     * @default 1
     * @static
     */
    DSecSetupWindow.CYCLIC_PANNING = 1;

    /**
     * Constant representing player 1 perspective view.
     * @type {number}
     * @constant
     * @default 2
     * @static
     */
    DSecSetupWindow.PLAYER_1_PERSPECTIVE = 2;

    /**
     * Constant representing player 2 perspective view.
     * @type {number}
     * @constant
     * @default 3
     * @static
     */
    DSecSetupWindow.PLAYER_2_PERSPECTIVE = 3;
    dsector.DSecSetupWindow = DSecSetupWindow;
    DSecSetupWindow["__class"] = "dsector.DSecSetupWindow";
})(dsector);