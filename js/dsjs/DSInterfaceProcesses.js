(function (dsector) {
    /**
     * Manages interface processes such as button clicks, input box processing, and keyboard interactions within the D-Sector application.r
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
    class DSInterfaceProcesses extends CWSYSTEM.CWInterfaceProcesses {
        /**
         * Initializes the main GUI reference.
         */
        constructor() {
            super();
            if (this.mainGUI === undefined) {
                this.mainGUI = null;
            }
            this.mainGUI = dsector.DSReference.gui;
        }

        /**
         * Processes actions based on button clicks.
         *
         * @param {CWSYSTEM.CWButton} button - The button that was clicked.
         * @param {number} x - The x coordinate of the click.
         * @param {number} y - The y coordinate of the click.
         */
        processButton$btn$x$y(button, x, y) {
            const windowName = button.name;
            button.buttonPressed();
            if ((button.parent.nameID === ("overlay")) && CWSYSTEM.Environment.activePulldownMenu$() != null) {
                CWSYSTEM.Environment.activePulldownMenu$().optionSelected(button);
            } else {
                if (windowName === ("DESTROY_WINDOW")) {
                    dsector.DSReference.alertManager.processContinue();
                } else if (windowName.length > 11 && ((str, searchString, position = 0) =>
                    str.substring(position, searchString.length) === searchString)(windowName, "MENU_BUTTON")) {
                    CWSYSTEM.CWMenu.menuTitlePressed(windowName);
                }
                if (windowName === ("ENTER_DSECTOR")) {
                    dsector.DSReference.dsecMainSetupWindow.enterDSecButtonPressed(button);
                }
                if (windowName === ("SHOPPING_DONE_BUTTON")) {
                    dsector.DSReference.dsecShoppingScreen.doneButtonPressed(button);
                }
                if (windowName === ("LOAD_GAME")) {
                    dsector.DSReference.dsecLoadGameWindow.loadGameFileSelected();
                }
                if (windowName === ("SAVE_GAME")) {
                    dsector.DSReference.dsecSaveGameWindow.saveButtonPressed();
                }
            }
        }

        /**
         * Overloaded method to process button clicks with default coordinates.
         *
         * @param {CWSYSTEM.CWButton} button - The button that was clicked.
         */
        processButton$button(button) {
            this.processButton$btn$x$y(button, 0, 0);
        }

        /**
         * Processes input box interactions.
         *
         * @param {CWSYSTEM.CWInputBox} inputBox - The input box being interacted with.
         */
        processInputBox(inputBox) {
            CWSYSTEM.Environment.inputBoxSelected = null;
            inputBox.parentWindow.updated = false;
            inputBox.returnTyped();
            const name = inputBox.name;
            switch (name) {
                case "CAM_X":
                    dsector.DSReference.renderer.setCameraPositionX(inputBox.text);
                    break;
                case "CAM_Y":
                    dsector.DSReference.renderer.setCameraPositionY(inputBox.text);
                    break;
                case "CAM_Z":
                    dsector.DSReference.renderer.setCameraPositionZ(inputBox.text);
                    break;
                case "VER_X":
                case "VER_Y":
                case "VER_Z":
                    break;
            }
        }

        /**
         * Processes checkbox interactions.
         *
         * @override
         * @param {CWSYSTEM.CWCheckBox} checkBox - The checkbox being interacted with.
         */
        processCheckBox(checkBox) {
            this.mainGUI.moveWindowToTopByName(checkBox.parentWindow.nameID);
        }

        /**
         * Processes character inputs from the keyboard.
         *
         * @override
         * @param {Object} c - The character input.
         */
        processKeyboardChar(c) {
            if (CWSYSTEM.Environment.inputBoxSelected$() != null) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(c) !== '\uffff'.charCodeAt(0)) {
                    CWSYSTEM.Environment.inputBoxSelected$().addCharacter(c);
                }
            } else if (CWSYSTEM.CWTextArea.textAreaSelected() != null) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(c) !== '\uffff'.charCodeAt(0)) {
                    CWSYSTEM.CWTextArea.textAreaSelected().addCharacter(c);
                }
            } else if (!CWSYSTEM.Environment.ctrlKeyPressed) {
                /* unsure what this is for */ //CWSYSTEM.Debug.println("!Environment.ctrlKeyPressed");
            }
        }

        /**
         * Processes keyboard key press actions.
         *
         * @override
         * @param {number} keyCode - The code of the key pressed.
         */
        processKeyboardPress(keyCode) {
            dsector.DSReference.dsecGame.keyPressed(keyCode);
            if (CWSYSTEM.Environment.inputBoxSelected$() != null) {
                if (keyCode !== 46 && keyCode !== 8) {
                    if (keyCode === 13) { // 13 is Enter
                        dsector.DSReference.interfaceProcesses.processInputBox(
                            CWSYSTEM.Environment.inputBoxSelected$());
                    } else if (keyCode === 27) {
                        CWSYSTEM.Environment.inputBoxSelected = null;
                    }
                } else {
                    CWSYSTEM.Environment.inputBoxSelected$().deleteCharacter();
                }
            } else if (CWSYSTEM.CWTextArea.textAreaSelected() != null) {
                super.textAreaKeyPressed(keyCode);
            }
        }

        /**
         * Processes keyboard key release actions.
         *
         * @param {number} keyCode - The code of the key released.
         */
        processKeyboardRelease(keyCode) {
            switch (dsector.Keyboard.focus) {
                case dsector.Keyboard.DSECTOR:
                    dsector.DSReference.dsecGame.keyReleased(keyCode);
            }
        }

        /**
         * Processes mouse release actions.
         */
        processMouseRelease() {
            CWSYSTEM.Environment.windowScrollUp = false;
            CWSYSTEM.Environment.windowScrollDown = false;
            CWSYSTEM.Environment.windowPageUp = false;
            CWSYSTEM.Environment.windowPageDown = false;
            CWSYSTEM.Environment.scrollbarHeld = null;
        }
    }

    dsector.DSInterfaceProcesses = DSInterfaceProcesses;
    DSInterfaceProcesses["__class"] = "dsector.DSInterfaceProcesses";
})(dsector || (dsector = {}));