/* Re-written from Java */
var dsector;
(function (dsector) {
    class DSInterfaceProcesses {
        constructor() {
            if (this.mainGUI === undefined) {
                this.mainGUI = null;
            }
            this.mainGUI = dsector.DSReference.gui;
        }

        processButton$btn$x$y(button, x, y) {
            const windowName = button.name;
            button.buttonPressed();
            if ((button.parent.nameID === ("overlay")) && CWSYSTEM.Environment.activePulldownMenu_$LI$() != null) {
                CWSYSTEM.Environment.activePulldownMenu_$LI$().optionSelected(button);
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

        processButton$button(button) {
            this.processButton$btn$x$y(button, 0, 0);
        }

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

        processCheckBox(checkBox) {
            this.mainGUI.moveWindowToTopByName(checkBox.parentWindow.nameID);
        }

        processKeyboardChar(c) {
            if (CWSYSTEM.Environment.inputBoxSelected_$LI$() != null) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(c) !== '\uffff'.charCodeAt(0)) {
                    CWSYSTEM.Environment.inputBoxSelected_$LI$().addCharacter(c);
                }
            } else if (CWSYSTEM.CWTextArea.textAreaSelected() != null) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(c) !== '\uffff'.charCodeAt(0)) {
                    CWSYSTEM.CWTextArea.textAreaSelected().addCharacter(c);
                }
            } else if (!CWSYSTEM.Environment.ctrlKeyPressed) {
                CWSYSTEM.Debug.println("!Environment.ctrlKeyPressed");
            }
        }

        processKeyboardPress(keyCode) {
            dsector.DSReference.dsecGame.keyPressed(keyCode);
            if (CWSYSTEM.Environment.inputBoxSelected_$LI$() != null) {
                if (keyCode !== 46 && keyCode !== 8) {
                    if (keyCode === 13) { // 13 is Enter
                        dsector.DSReference.interfaceProcesses.processInputBox(
                            CWSYSTEM.Environment.inputBoxSelected_$LI$());
                    } else if (keyCode === 27) {
                        CWSYSTEM.Environment.inputBoxSelected = null;
                    }
                } else {
                    CWSYSTEM.Environment.inputBoxSelected_$LI$().deleteCharacter();
                }
            } else if (CWSYSTEM.CWTextArea.textAreaSelected() != null) {
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
        }

        processKeyboardRelease(keyCode) {
            switch (dsector.Keyboard.focus) {
                case dsector.Keyboard.JCAD_DEFAULT:
                    CWSYSTEM.Environment.screenHasChanged = true;
                    switch (keyCode) {
                        case 37:
                            CWSYSTEM.Environment.moveCameraLeft = false;
                            return;
                        case 38:
                            CWSYSTEM.Environment.moveCameraUp = false;
                            return;
                        case 39:
                            CWSYSTEM.Environment.moveCameraRight = false;
                            return;
                        case 40:
                            CWSYSTEM.Environment.moveCameraDown = false;
                            return;
                        case 44:
                        case 45:
                            CWSYSTEM.Environment.moveCameraBackwards = false;
                            return;
                        case 46:
                        case 61:
                        case 521:
                            CWSYSTEM.Environment.moveCameraForwards = false;
                            return;
                        case 59:
                            CWSYSTEM.Environment.moveCameraLeftPivot = false;
                            return;
                        case 222:
                            CWSYSTEM.Environment.moveCameraRightPivot = false;
                            return;
                        default:
                            return;
                    }
                case dsector.Keyboard.DSECTOR:
                    dsector.DSReference.dsecGame.keyReleased(keyCode);
            }
        }

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
