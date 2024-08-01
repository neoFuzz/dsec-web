(function (CWSYSTEM) {
    /**
     * Class for managing interface processes.
     *
     * @property {CWSYSTEM.CWGUI} mainGUI - The main GUI object.
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
    class CWInterfaceProcesses {
        /**
         * Creates an instance of CWInterfaceProcesses.
         */
        constructor() {
            if (this.mainGUI === undefined) {
                this.mainGUI = null;
            }
            this.mainGUI = CWSYSTEM.CWSReference.gui;
        }

        /**
         * Processes a button press event.
         *
         * @param {CWSYSTEM.CWButton} button - the CWButton object
         * @param {number} x - the x coordinate
         * @param {number} y - the y coordinate
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processButton$btn$x$y(button, x, y) {
            const windowName = button.name;
            button.buttonPressed();
            if ((button.parent.nameID === ("overlay")) && CWSYSTEM.Environment.activePulldownMenu$() != null) {
                CWSYSTEM.Environment.activePulldownMenu$().optionSelected(button);
            } else {
                if (windowName === ("DESTROY_WINDOW")) {
                    CWSYSTEM.CWSReference.alertManager.processContinue();
                } else if (windowName.length > 11 && ((str, searchString, position = 0) =>
                    str.substring(position, searchString.length) === searchString)(windowName, "MENU_BUTTON")) {
                    CWSYSTEM.CWMenu.menuTitlePressed(windowName);
                }
                if (windowName === ("SAMPLE")) {
                    //dsector.DSReference.dsecMainSetupWindow.enterDSecButtonPressed(button);
                }
            }
        }

        /**
         * Processes a button press event without coordinates.
         *
         * @param {CWSYSTEM.CWButton} button - the CWButton object
         * @param {number} x - the x coordinate
         * @param {number} y - the y coordinate
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processButton(button, x, y) {
            if (((button != null && button instanceof CWSYSTEM.CWButton) || button === null) &&
                ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
                return this.processButton$btn$x$y(button, x, y);
            } else if (((button != null && button instanceof CWSYSTEM.CWButton) || button === null) &&
                x === undefined && y === undefined) {
                return this.processButton$button(button);
            } else
                throw new Error('invalid overload');
        }

        /**
         * Processes a button press event without coordinates.
         *
         * @param {CWSYSTEM.CWButton} button - the CWButton object
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         * @private
         */
        processButton$button(button) {
            this.processButton$btn$x$y(button, 0, 0);
        }

        /**
         * Processes an input box event.
         *
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         * @param {CWSYSTEM.CWInputBox} inputBox - the CWInputBox object
         */
        processInputBox(inputBox) {
            CWSYSTEM.Environment.inputBoxSelected = null;
            inputBox.parentWindow.updated = false;
            inputBox.returnTyped();
            const name = inputBox.name;
            switch (name) {
                case "VER_Z":
                    break;
            }
        }

        /**
         * Processes a checkbox event.
         *
         * @param {CWSYSTEM.CWCheckBox} checkBox - The CWCheckBox object
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processCheckBox(checkBox) {
            this.mainGUI.moveWindowToTopByName(checkBox.parentWindow.nameID);
        }

        /**
         * Processes a pulldown menu event.
         *
         * @param {CWSYSTEM.CWPulldown} pulldownMenu - the CWPulldown object
         * @param {number} x - the x coordinate
         * @param {number} y - the y coordinate
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processPulldownMenu$pulldownMenu$x$y(pulldownMenu, x, y) {
            this.mainGUI.moveWindowToTopByName(pulldownMenu.nameID);
            pulldownMenu.optionSelected(x, y);
        }

        /**
         * Processes a pulldown menu event without coordinates.
         *
         * @param {CWSYSTEM.CWPopupMenu} pulldownMenu the pulldown menu object
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processPulldownMenu$pulldownMenu(pulldownMenu) {
            this.processPulldownMenu$pulldownMenu$x$y(pulldownMenu, 0, 0);
        }

        /**
         * Processes a keyboard character event.
         *
         * @param {Object} c the character
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
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
                // unused branch
            }
        }

        /**
         * Processes a keyboard press event.
         *
         * @param {number} keyCode Key code of pressed key.
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processKeyboardPress(keyCode) {
            if (CWSYSTEM.Environment.inputBoxSelected$() != null) {
                if (keyCode !== 46 && keyCode !== 8) {
                    if (keyCode === 13) { // 13 is Enter
                        CWSYSTEM.CWSReference.interfaceProcesses.processInputBox(
                            CWSYSTEM.Environment.inputBoxSelected$());
                    } else if (keyCode === 27) {
                        CWSYSTEM.Environment.inputBoxSelected = null;
                    }
                } else {
                    CWSYSTEM.Environment.inputBoxSelected$().deleteCharacter();
                }
            } else if (CWSYSTEM.CWTextArea.textAreaSelected() != null) {
                textAreaKeyPressed(keyCode);
            }
        }

        textAreaKeyPressed(keyCode) {
            switch (keyCode) {
                case 46:
                    CWSYSTEM.CWTextArea.textAreaSelected().deleteTyped();
                    break;
                case 8:
                    CWSYSTEM.CWTextArea.textAreaSelected().backSpaceTyped();
                    break;
                case 13:
                    CWSYSTEM.CWTextArea.textAreaSelected().returnTyped();
                    break;
                case 39:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorRight();
                    break;
                case 37:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorLeft();
                    break;
                case 38:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorUp();
                    break;
                case 40:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorDown();
                    break;
                case 36:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorHome();
                    break;
                case 35:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorEnd();
                    break;
                case 33:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorPageUp();
                    break;
                case 34:
                    CWSYSTEM.CWTextArea.textAreaSelected().cursorPageDown();
                    break;
                case 9:
                    CWSYSTEM.CWTextArea.textAreaSelected().tabTyped();
                    break;
                case 18:
                    CWSYSTEM.CWTextArea.textAreaSelected().tabTyped();
                    break;
            }
        }

        /**
         * Processes a keyboard release event.
         *
         * @param {number} keyCode Key code of released key.
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processKeyboardRelease(keyCode) {
            // adapter shell
        }

        /**
         * Processes a mouse press event.
         *
         * @param {number} x - the x coordinate
         * @param {number} y - the y coordinate
         * @param {CWSYSTEM.CWButton} button - the button code
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processMousePress$x$y$btn(x, y, button) {
            CWSYSTEM.Environment.windowScrollUp = false;
            CWSYSTEM.Environment.windowScrollDown = false;
            CWSYSTEM.Environment.windowPageUp = false;
            CWSYSTEM.Environment.windowPageDown = false;
            CWSYSTEM.Environment.scrollbarHeld = null;
        }

        /**
         * Processes a mouse release event.
         *
         * @private
         * @methodOf CWSYSTEM.CWInterfaceProcesses
         */
        processMouseRelease() {
            CWSYSTEM.Environment.windowScrollUp = false;
            CWSYSTEM.Environment.windowScrollDown = false;
            CWSYSTEM.Environment.windowPageUp = false;
            CWSYSTEM.Environment.windowPageDown = false;
            CWSYSTEM.Environment.scrollbarHeld = null;
        }
    }

    CWSYSTEM.CWInterfaceProcesses = CWInterfaceProcesses;
    CWInterfaceProcesses["__class"] = "CWSYSTEM.CWInterfaceProcesses";
})(CWSYSTEM);