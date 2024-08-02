(function (CWSYSTEM) {
    /**
     * Contains the basic user input processing and handling.
     *
     * @property {CWSYSTEM.IOInstruction[]} instructions - An array of IOInstruction objects representing user input events.
     * @property {boolean} buttonActionPerformedOnButtonPressed - Whether a button action was performed on button press.
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
    class UserIOBuffer {
        /**
         * Constructor for creating a new UserIOBuffer object.
         *
         * @access public
         */
        constructor() {
            this.instructions = ([]);
            this.buttonActionPerformedOnButtonPressed = false;
        }

        /**
         * Adds a mouse entered event to the instructions array.
         *
         * @access public
         * @param {number} x - The x-coordinate of the mouse event.
         * @param {number} y - The y-coordinate of the mouse event.
         */
        addMouseEnteredEvent(x, y) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseEntered, x, y));
        }

        /**
         * Adds a mouse exited event to the instructions array.
         *
         * @access public
         * @param {number} x - The x-coordinate of the mouse event.
         * @param {number} y - The y-coordinate of the mouse event.
         */
        addMouseExitedEvent(x, y) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseExited, x, y));
        }

        /**
         * Adds a mouse pressed event to the instructions array.
         *
         * @access public
         * @param {MouseEvent} mouseEvent - The mouse event object.
         */
        addMousePressedEvent(mouseEvent) {
            if (mouseEvent.button === 0) {
                CWSYSTEM.Environment.lastMouseButtonPressed = CWSYSTEM.Environment.MOUSE_LEFT;
                this.instructions.push(new CWSYSTEM.IOInstruction(
                    CWSYSTEM.IOInstruction.mouseLeftPressed, mouseEvent.x, mouseEvent.y));
            } else {
                CWSYSTEM.Environment.lastMouseButtonPressed = CWSYSTEM.Environment.MOUSE_RIGHT;
                this.instructions.push(new CWSYSTEM.IOInstruction(
                    CWSYSTEM.IOInstruction.mouseRightPressed, mouseEvent.x, mouseEvent.y));
            }
        }

        /**
         * Adds a mouse released event to the instructions array.
         *
         * @access public
         * @param {MouseEvent} mouseEvent - The mouse event object.
         */
        addMouseReleasedEvent(mouseEvent) {
            if (mouseEvent.button === 0) {
                CWSYSTEM.Environment.lastMouseButtonPressed = CWSYSTEM.Environment.MOUSE_LEFT;
                this.instructions.push(new CWSYSTEM.IOInstruction(
                    CWSYSTEM.IOInstruction.mouseLeftReleased, mouseEvent.x, mouseEvent.y));
            } else {
                CWSYSTEM.Environment.lastMouseButtonPressed = CWSYSTEM.Environment.MOUSE_RIGHT;
                this.instructions.push(new CWSYSTEM.IOInstruction(
                    CWSYSTEM.IOInstruction.mouseRightReleased, mouseEvent.x, mouseEvent.y));
            }
        }

        /**
         * Adds a mouse clicked event to the instructions array.
         *
         * @access public
         * @param {MouseEvent} mouseEvent - The mouse event object.
         */
        addMouseClickedEvent(mouseEvent) {
            let x = mouseEvent.x;
            let y = mouseEvent.y;
            let check = true;
            if (mouseEvent.button === 0) {
                CWSYSTEM.Environment.lastMouseButtonPressed = (CWSYSTEM.Environment.MOUSE_LEFT);
                check = false;
            } else {
                CWSYSTEM.Environment.lastMouseButtonPressed = (CWSYSTEM.Environment.MOUSE_RIGHT);
            }
            const currentTime = CWSYSTEM.Environment.currentTime();
            let timeCheck;
            if (x === CWSYSTEM.Environment.mouseXLastClicked$() && y === CWSYSTEM.Environment.mouseYLastClicked$() &&
                currentTime - CWSYSTEM.Environment.timeWhenMouseLastClicked < CWSYSTEM.Global.maximumDoubleClickTime) {
                timeCheck = true;
                CWSYSTEM.Environment.timeWhenMouseLastClicked = 0;
            } else {
                timeCheck = false;
                CWSYSTEM.Environment.mouseXLastClicked = x;
                CWSYSTEM.Environment.mouseYLastClicked = y;
                CWSYSTEM.Environment.timeWhenMouseLastClicked = currentTime;
            }
            if (timeCheck) {
                if (check) {
                    this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseDoubleRightClicked, x, y));
                } else {
                    this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseDoubleLeftClicked, x, y));
                }
            } else if (check) {
                this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseRightClicked, x, y));
            } else {
                this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseLeftClicked, x, y));
            }
        }

        /**
         * Adds a mouse dragged event to the instructions array.
         *
         * @access public
         * @param {number} x - The x-coordinate of the mouse event.
         * @param {number} y - The y-coordinate of the mouse event.
         */
        addMouseDraggedEvent(x, y) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseDragged, x, y));
        }

        /**
         * Adds a mouse moved event to the instructions array.
         *
         * @access public
         * @param {number} x - The x-coordinate of the mouse event.
         * @param {number} y - The y-coordinate of the mouse event.
         */
        addMouseMovedEvent(x, y) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.mouseMoved, x, y));
        }

        /**
         * Adds a key typed event to the instructions array.
         *
         * @access public
         * @param {number} c - The character code of the key typed event.
         */
        addKeyTypedEvent(c) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.keyTyped, c));
        }

        /**
         * Adds a key pressed event to the instructions array.
         *
         * @access public
         * @param {number} evt - The key code of the key pressed event.
         */
        addKeyPressedEvent(evt) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.keyPressed, evt));
            if (evt === 27) {
                CWSYSTEM.Environment.ESCKeyPressedDuringThisCycle = true;
                CWSYSTEM.Debug.println("Escape Key pressed.");
            }
        }

        /**
         * Adds a key released event to the instructions array.
         *
         * @access public
         * @param {number} keyCode - The key code of the key released event.
         */
        addKeyReleasedEvent(keyCode) {
            this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.keyReleased, keyCode));
        }

        /**
         * Clears the instructions array.
         *
         * @access public
         */
        clear() {
            while ((this.instructions.length !== 0)) {
                const ioInstruction = this.instructions[0];
                (a => {
                    let index = a.indexOf(ioInstruction);
                    if (index >= 0) {
                        a.splice(index, 1);
                        return true;
                    } else {
                        return false;
                    }
                })(this.instructions);
            }
            CWSYSTEM.Environment.ctrlKeyPressed = false;
            CWSYSTEM.Environment.shiftKeyPressed = false;
            CWSYSTEM.Environment.altKeyPressed = false;
            CWSYSTEM.Environment.spacebarPressed = false;
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = false;
            CWSYSTEM.Environment.VK_q_Pressed = false;
        }

        /**
         * Processes the instructions in the instructions array.
         *
         * @access public
         */
        process() {
            CWSYSTEM.CWSReference.virtualScreen.cancelOption = false;
            CWSYSTEM.Environment.ESCKeyPressedDuringThisCycle = false;
            while (this.instructions.length !== 0) {
                const ioInstruction = this.instructions[0];
                (a => {
                    let index = a.indexOf(ioInstruction);
                    if (index >= 0) {
                        a.splice(index, 1);
                        return true;
                    } else {
                        return false;
                    }
                })(this.instructions);
                const type = ioInstruction.type;
                const x = ioInstruction.x;
                const y = ioInstruction.y;
                const key = ioInstruction.key;
                const keyCode = ioInstruction.keyCode;
                switch (type) {
                    case CWSYSTEM.IOInstruction.mouseLeftPressed:
                        this.mouseLeftPressed(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseRightPressed:
                        this.mouseRightPressed(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseLeftReleased:
                        this.mouseLeftReleased(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseRightReleased:
                        this.mouseRightReleased(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseLeftClicked:
                        this.mouseLeftClicked(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseRightClicked:
                        this.mouseRightClicked(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseDoubleLeftClicked:
                        this.mouseDoubleLeftClicked(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseDoubleRightClicked:
                        this.mouseDoubleRightClicked(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseDragged:
                        CWSYSTEM.CWSReference.mouseDrag.process(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.mouseMoved:
                        this.mouseMoved(x, y);
                        break;
                    case CWSYSTEM.IOInstruction.keyTyped:
                        this.keyTyped(key);
                        break;
                    case CWSYSTEM.IOInstruction.keyPressed:
                        this.keyPressed(keyCode);
                        break;
                    case CWSYSTEM.IOInstruction.keyReleased:
                        this.keyReleased(keyCode);
                        break;
                    case CWSYSTEM.IOInstruction.mouseEntered:
                    case CWSYSTEM.IOInstruction.mouseExited:
                    default:
                        break;
                }
            }
        }

        /**
         * Handles mouse movement and updates the mouse position and button hover state
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         */
        mouseMoved(x, y) {
            CWSYSTEM.Environment.mouseX = x;
            CWSYSTEM.Environment.mouseY = y;
            const mouseIsOver = CWSYSTEM.CWSReference.gui.windowThatMouseIsOver(x, y);
            if (mouseIsOver === -1) {
                if (CWSYSTEM.Environment.buttonLastMovedOver$() != null) {
                    CWSYSTEM.Environment.buttonLastMovedOver$().mouseIsOver = false;
                    CWSYSTEM.Environment.buttonLastMovedOver$().parent.updated = false;
                    CWSYSTEM.Environment.buttonLastMovedOver = null;
                }
            } else {
                const window = CWSYSTEM.CWSReference.gui.getWindow$int(mouseIsOver);
                const button = CWSYSTEM.CWSReference.gui.buttonThatMouseIsOver(x, y);
                if (button != null) {
                    if (button !== CWSYSTEM.Environment.buttonLastMovedOver$()) {
                        button.mouseIsOver = true;
                        if (CWSYSTEM.Environment.buttonLastMovedOver$() != null) {
                            CWSYSTEM.Environment.buttonLastMovedOver$().mouseIsOver = false;
                            CWSYSTEM.Environment.buttonLastMovedOver$().parent.updated = false;
                        }
                        CWSYSTEM.Environment.buttonLastMovedOver = button;
                        window.updated = false;
                        CWSYSTEM.CWMenu.mouseMovedOverButton(button);
                    }
                } else if (CWSYSTEM.Environment.buttonLastMovedOver$() != null) {
                    CWSYSTEM.Environment.buttonLastMovedOver$().mouseIsOver = false;
                    CWSYSTEM.Environment.buttonLastMovedOver$().parent.updated = false;
                    CWSYSTEM.Environment.buttonLastMovedOver = null;
                }
            }
        }

        /**
         * Handles mouse press events and performs the appropriate actions
         *
         * @private
         */
        mousePressedFinalize() {
            CWSYSTEM.CWMenu.mouseClicked();
            CWSYSTEM.CWPopupMenu.mouseClicked();
        }

        /**
         * Handles mouse press events and performs the appropriate actions
         *
         * @param {number} xPos - The x position of the mouse
         * @param {number} yPos - The y position of the mouse
         * @private
         */
        mouseLeftPressed(xPos, yPos) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = true;
            const mouseIsOver = CWSYSTEM.CWSReference.gui.windowThatMouseIsOver(xPos, yPos);
            if (mouseIsOver === -1) {
                this.mousePressedFinalize();
            } else {
                const cwWindow = CWSYSTEM.CWSReference.gui.getWindow$int(mouseIsOver);
                const nameID = cwWindow.nameID;
                CWSYSTEM.Environment.screenHasChanged = true;
                CWSYSTEM.CWSReference.gui.moveWindowToTop$int(mouseIsOver);
                CWSYSTEM.CWSReference.gui.deactivateTextAreasInWindowsOtherThan(cwWindow);
                if (CWSYSTEM.Environment.activePulldownMenu$() != null &&
                    cwWindow === CWSYSTEM.Environment.activePulldownMenu$().parent) {
                    CWSYSTEM.Environment.activePulldownMenu$().mousePressedOverClosedSectionOrOverlayBorder();
                    this.mousePressedFinalize();
                } else {
                    const inputBox = CWSYSTEM.CWSReference.gui.inputBoxThatMouseIsOver(xPos, yPos);
                    if (inputBox != null) {
                        CWSYSTEM.Environment.inputBoxSelected = inputBox;
                    }
                    if (CWSYSTEM.Environment.inputBoxSelected$() != null
                        && CWSYSTEM.Environment.inputBoxSelected$() !== inputBox) {
                        CWSYSTEM.CWSReference.interfaceProcesses.processInputBox(CWSYSTEM.Environment.inputBoxSelected$());
                        CWSYSTEM.Environment.inputBoxSelected = null;
                    }
                    const textArea = CWSYSTEM.CWSReference.gui.textAreaThatMouseIsOver(xPos, yPos);
                    if (textArea != null) {
                        textArea.select(xPos - (cwWindow.xPosition - cwWindow.borderWidth),
                            yPos - (cwWindow.yPosition - cwWindow.borderWidth - cwWindow.__titleHeight));
                    }
                    const cwButton = CWSYSTEM.CWSReference.gui.buttonThatMouseIsOver(xPos, yPos);
                    if (cwButton != null) {
                        if (cwButton.respondsTo === CWSYSTEM.CWButton.PRESSED) {
                            CWSYSTEM.CWSReference.interfaceProcesses.processButton$btn$x$y(cwButton, xPos, yPos);
                            cwButton.press();
                            this.buttonActionPerformedOnButtonPressed = true;
                            this.mousePressedFinalize();
                            return;
                        }
                        cwButton.press();
                    }
                    const cwChkBox = CWSYSTEM.CWSReference.gui.checkBoxThatMouseIsOver(xPos, yPos);
                    if (cwChkBox != null) {
                        if (cwChkBox.isRadioButton()) {
                            cwChkBox.setSelected(true);
                            this.mousePressedFinalize();
                        } else {
                            cwChkBox.invertSelectedState();
                            CWSYSTEM.CWSReference.interfaceProcesses.processCheckBox(cwChkBox);
                            this.mousePressedFinalize();
                        }
                    } else if ((nameID === ("overlay")) && CWSYSTEM.Environment.activePulldownMenu$() != null) {
                        CWSYSTEM.Environment.activePulldownMenu$().mousePressedOverClosedSectionOrOverlayBorder();
                        this.mousePressedFinalize();
                    } else {
                        const pulldownMO = CWSYSTEM.CWSReference.gui.pulldownThatMouseIsOver(xPos, yPos);
                        if (pulldownMO != null) {
                            pulldownMO.mousePressedOverClosedSectionOrOverlayBorder();
                            this.mousePressedFinalize();
                        } else {
                            if (cwWindow.hasScrollbar()) {
                                CWSYSTEM.Environment.scrollbarHeld = cwWindow.scrollbar;
                                CWSYSTEM.Environment.timeOnInitialPress = CWSYSTEM.Environment.currentTime();
                                if (cwWindow.scrollbar.mouseIsOverSlidingBar(xPos, yPos)) {
                                    CWSYSTEM.CWSReference.mouseDrag.engageSlidingBarMove(cwWindow, xPos, yPos);
                                    this.mousePressedFinalize();
                                    return;
                                }
                                if (cwWindow.scrollbar.mouseIsOverScrollbarUpperSpace(xPos, yPos)) {
                                    cwWindow.scrollbar.moveUpFast();
                                    CWSYSTEM.Environment.windowPageUp = true;
                                    this.mousePressedFinalize();
                                    return;
                                }
                                if (cwWindow.scrollbar.mouseIsOverScrollbarLowerSpace(xPos, yPos)) {
                                    cwWindow.scrollbar.moveDownFast();
                                    CWSYSTEM.Environment.windowPageDown = true;
                                    this.mousePressedFinalize();
                                    return;
                                }
                                if (cwWindow.scrollbar.mouseIsOverScrollbarUpperButton(xPos, yPos)) {
                                    cwWindow.scrollbar.moveUpSlowly();
                                    CWSYSTEM.Environment.windowScrollUp = true;
                                    this.mousePressedFinalize();
                                    return;
                                }
                                if (cwWindow.scrollbar.mouseIsOverScrollbarLowerButton(xPos, yPos)) {
                                    cwWindow.scrollbar.moveDownSlowly();
                                    CWSYSTEM.Environment.windowScrollDown = true;
                                    this.mousePressedFinalize();
                                    return;
                                }
                            }

                            const cornerMouseOver = cwWindow.cornerThatMouseIsOver(xPos, yPos);
                            if (cornerMouseOver > 0 && cwWindow.resizable) {
                                CWSYSTEM.CWSReference.mouseDrag.engageWindowResize(mouseIsOver, cornerMouseOver, xPos, yPos);
                            } else if (CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea) {
                                if (cwWindow.mouseOverTitleArea(xPos, yPos)) {
                                    CWSYSTEM.CWSReference.mouseDrag.engageWindowMove(mouseIsOver, xPos, yPos);
                                }
                            } else {
                                CWSYSTEM.CWSReference.mouseDrag.engageWindowMove(mouseIsOver, xPos, yPos);
                            }
                            this.mousePressedFinalize();
                        }
                    }
                }
            }
        }

        /**
         * Handles right mouse press events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseRightPressed(x, y) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = true;
            const ref = CWSYSTEM.CWSReference.gui.windowThatMouseIsOver(x, y);
            if (ref === -1) {
                if (CWSYSTEM.CWSReference.gui.rightClickPopupMenu != null) {
                    CWSYSTEM.CWSReference.gui.rightClickPopupMenu.popup$();
                }
                this.mousePressedFinalize();
            } else {
                const window = CWSYSTEM.CWSReference.gui.getWindow$int(ref);
                if (window.rightClickPopupMenu != null) {
                    window.rightClickPopupMenu.popup$();
                }
                this.mousePressedFinalize();
            }
        }

        /**
         * Handles mouse release events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseLeftReleased(x, y) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = false;
            CWSYSTEM.CWSReference.mouseDrag.release(x, y);
            if (CWSYSTEM.Environment.buttonLastPressed$() != null) {
                CWSYSTEM.Environment.buttonLastPressed$().release();
            }
            CWSYSTEM.CWSReference.interfaceProcesses.processMouseRelease();
        }

        /**
         * Handles right mouse release events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseRightReleased(x, y) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = false;
        }

        /**
         * Handles mouse double click events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseDoubleLeftClicked(x, y) {
            const ref = CWSYSTEM.CWSReference.gui.windowThatMouseIsOver(x, y);
            if (ref !== -1) {
                // unused
            }
        }

        /**
         * Handles right mouse double click events and performs the appropriate actions
         *
         * @deprecated This method is deprecated and will be updated in a future version.
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseDoubleRightClicked(x, y) {
            CWSYSTEM.Debug.print("");
        }

        /**
         * Handles left mouse click events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @private
         */
        mouseLeftClicked(x, y) {
            if (this.buttonActionPerformedOnButtonPressed) {
                this.buttonActionPerformedOnButtonPressed = false;
            } else {
                const mouseOver = CWSYSTEM.CWSReference.gui.windowThatMouseIsOver(x, y);
                if (mouseOver !== -1) {
                    const button = CWSYSTEM.CWSReference.gui.buttonThatMouseIsOver(x, y);
                    if (button != null && button.respondsTo === CWSYSTEM.CWButton.CLICKED) {
                        CWSYSTEM.CWSReference.interfaceProcesses.processButton$btn$x$y(button, x, y);
                        this.mousePressedFinalize();
                    }
                }
            }
        }

        /**
         * Handles right mouse click events and performs the appropriate actions
         *
         * @param {number} x - The x position of the mouse
         * @param {number} y - The y position of the mouse
         * @note outputs a log message since it isn't used yet
         * @private
         */
        mouseRightClicked(x, y) {
            CWSYSTEM.Debug.print("RC X: " + x + " | Y: " + y);
        }

        /**
         * Handles tab key press events and performs the appropriate actions
         *
         * @private
         */
        tabKeyPressed() {
            CWSYSTEM.CWSReference.interfaceProcesses.processKeyboardPress(9);
        }

        /**
         * Handles key typed events and performs the appropriate actions
         *
         * @param {string} c - The character typed
         * @private
         */
        keyTyped(c) {
            CWSYSTEM.CWSReference.interfaceProcesses.processKeyboardChar(c);
        }

        /**
         * Handles key press events and performs the appropriate actions
         *
         * @param {number} keycode - The key code of the pressed key
         */
        keyPressed(keycode) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = true;
            switch (keycode) {
                case 16:
                    CWSYSTEM.Environment.shiftKeyPressed = true;
                    break;
                case 18:
                    CWSYSTEM.Environment.altKeyPressed = true;
                    break;
                case 17:
                    CWSYSTEM.Environment.ctrlKeyPressed = true;
                    break;
                case 32:
                    CWSYSTEM.Environment.spacebarPressed = true;
                    break;
                case 81:
                    CWSYSTEM.Environment.VK_q_Pressed = true;
                    break;
            }
            CWSYSTEM.CWSReference.interfaceProcesses.processKeyboardPress(keycode);
        }

        /**
         * Handles key release events and performs the appropriate actions
         *
         * @param {number} keycode - The key code of the released key
         */
        keyReleased(keycode) {
            CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = false;
            switch (keycode) {
                case 16:
                    CWSYSTEM.Environment.shiftKeyPressed = false;
                    break;
                case 18:
                    CWSYSTEM.Environment.altKeyPressed = false;
                    break;
                case 17:
                    CWSYSTEM.Environment.ctrlKeyPressed = false;
                    break;
                case 32:
                    CWSYSTEM.Environment.spacebarPressed = false;
                    break;
                case 81:
                    CWSYSTEM.Environment.VK_q_Pressed = false;
                    break;
            }
            CWSYSTEM.CWSReference.interfaceProcesses.processKeyboardRelease(keycode);
        }
    }

    /**
     * The minimum guaranteed size of the buffer.
     * @static
     * @type {number}
     */
    UserIOBuffer.minimumGuaranteedBufferSize = 20;
    CWSYSTEM.UserIOBuffer = UserIOBuffer;
    UserIOBuffer["__class"] = "CWSYSTEM.UserIOBuffer";
})(CWSYSTEM);