import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Contains the basic user input processing and handling.
 *
 * @property {CWSYSTEM.IOInstruction[]} instructions - An array of IOInstruction objects representing user input events.
 * @property {boolean} buttonActionPerformedOnButtonPressed - Whether a button action was performed on button press.
 *
 * @todo decouple from dsector like CWSReference
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
export class UserIOBuffer extends CWSYSTEM.UserIOBuffer {
    /**
     * Constructor for creating a new UserIOBuffer object.
     *
     * @access public
     */
    constructor() {
        super();
        this.instructions = ([]);
        this.buttonActionPerformedOnButtonPressed = false;
    }

    /**
     * Processes the instructions in the instructions array.
     *
     * @access public
     * @override
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
        this.handleGamePads();
    }

    /**
     * Check game pads are connected then processes each game pad's pending actions
     *
     * @private
     */
    handleGamePads() {
        dsector.DSReference.jsu.joysticksActive.forEach(
            (joy, joyId) => dsector.DSReference.jsu.checkJoystickConnected(joy));
        dsector.DSReference.jsu.joysticksActive.forEach((joy, joyId) => {
            return this.processGamePad(joy, joyId);
        });
    }

    /**
     * Processes the game pad's pending actions
     *
     * @param {Gamepad} joy - The game pad object
     * @param {number} joyId - The game pad's ID
     * @private
     */
    processGamePad(joy, joyId) {
        let gamepads = CWSYSTEM.GamePadUtils.getGamePadObjects();
        let buttonPressed = false;
        let keySelector = joyId * 1000;
        let gamePadButtons = gamepads[joy.joystickID].buttons;
        let gamePadAxes = gamepads[joy.joystickID].axes;

        // Process button states
        for (let i = 0; i < gamePadButtons.length; ++i) {
            let currentPress = gamePadButtons[i];
            let prevPress = joy.gamePadButtons[i];

            // Check if the game pad button is pressed
            if (currentPress.value === 1) {
                buttonPressed = true;
            } else if (currentPress.value === 0) {
                buttonPressed = false;
            }

            // Check if game pad buttons are not pressed now and weren't pressed last cycle.
            if (currentPress.value === 0 && prevPress.value === 0) {
                continue;
            }

            // Check if game pad buttons are pressed now and were pressed last cycle
            if (currentPress.value === 1 && prevPress.value === 1) {
                continue;
            }

            // Determine if button is pressed or released
            let keyMode = buttonPressed ? CWSYSTEM.IOInstruction.keyPressed :
                CWSYSTEM.IOInstruction.keyReleased;
            switch (i) {
                case 0:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, keySelector));
                    break;
                case 1:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 1)));
                    break;
                case 2:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 2)));
                    break;
                case 3:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 3)));
                    break;
                case 4:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 4)));
                    break;
                case 5:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 5)));
                    break;
                case 8:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 6)));
                    dsector.DSReference.alertManager.messageQueued("Joy back button"); // Testing
                    break;
                case 7:
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 7)));
                    break;
                case 10: // Left Stick press
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 8)));
                    break;
                case 11: // Right Stick press
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 9)));
                    break;
                case 12: // D-Pad Up
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 12)));
                    break;
                case 13: // D-Pad Down
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 13)));
                    break;
                case 14: // D-Pad Left
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 14)));
                    break;
                case 15: // D-Pad Right
                    this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 15)));
                    break;
                default:
            }

            if (gamePadButtons[4].value === 1 &&
                gamePadButtons[5].value === 1) {
                // Terminate the round by adding an Escape key IOInstruction when holding down LB + RB buttons
                this.instructions.push(new CWSYSTEM.IOInstruction(CWSYSTEM.IOInstruction.keyPressed, 27));
                CWSYSTEM.Debug.println("'Escape Key' game pad combo pressed.");
            }
        }
        // Process trigger buttons
        buttonPressed = false;
        let keyMode = 0, z = 6;

        while (z < 8) {
            if (z === 6) {
                if (gamePadButtons[z].value > 0 && joy.gamePadButtons[z].value > 0 || // if pressed now and previously
                    gamePadButtons[z].value > 0 && joy.gamePadButtons[z].value === 0) { // if pressed now and not previously
                    buttonPressed = true;
                    dsector.DSReference.jsu.joysticksActive.get(joyId).gpTriggersScaled.f1 =
                        ((gamePadButtons[z].value + 1) * 50) / 100;
                } else if (gamePadButtons[z].value === 0 && joy.gamePadButtons[z].value > 0) { //if not pressed now but pressed previously
                    buttonPressed = false;
                    dsector.DSReference.jsu.joysticksActive.get(joyId).gpTriggersScaled.f1 = 0.0;
                } else {
                    z++;
                    continue;
                }
                keyMode = buttonPressed ? CWSYSTEM.IOInstruction.keyPressed : CWSYSTEM.IOInstruction.keyReleased;
                this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 12)));
            }
            z++;
        }

        /*/ Process stick axes - TODO: Fix stick processing, not processing the sticks currently since it overlaps with triggers
        buttonPressed = false;
        for (let i = 0; i < gamePadAxes.length; ++i) {
            if (i === 0) {
                if (gamePadAxes[i] !== -1 && joy.gamePadAxes[i] !== -1 || // if pressed now and previously
                    gamePadAxes[i] !== -1 && joy.gamePadAxes[i] === -1) { // if pressed now and not previously
                    buttonPressed = true;
                    dsector.DSReference.jsu.joysticksActive.get(joyId).gpTriggersScaled.f1 =
                        ((gamePadAxes[i] + 1) * 50) / 100;
                } else if (gamePadAxes[i] === -1 && joy.gamePadAxes[i] > -1) { //if not pressed now but pressed previously
                    buttonPressed = false;
                    dsector.DSReference.jsu.joysticksActive.get(joyId).gpTriggersScaled.f1 = 0.0;
                } else {
                    continue;
                }
                keyMode = buttonPressed ? CWSYSTEM.IOInstruction.keyPressed : CWSYSTEM.IOInstruction.keyReleased;
                this.instructions.push(new CWSYSTEM.IOInstruction(keyMode, (keySelector + 10)));
            }
            if (i === 5) {
                CWSYSTEM.Debug.println("hit " + i)
            }
        }*/
        joy.gamePadButtons = gamePadButtons;
        joy.gamePadAxes = gamePadAxes;
        dsector.DSReference.jsu.joysticksActive.set(joyId, joy);
    }

    /**
     * Handles mouse press events and performs the appropriate actions
     *
     * @param {number} xPos - The x position of the mouse
     * @param {number} yPos - The y position of the mouse
     * @private
     * @override
     */
    mouseLeftPressed(xPos, yPos) {
        CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = true;
        const mouseIsOver = dsector.DSReference.gui.windowThatMouseIsOver(xPos, yPos);
        if (mouseIsOver === -1) {
            this.mousePressedFinalize();
        } else {
            const cwWindow = dsector.DSReference.gui.getWindow$int(mouseIsOver);
            const nameID = cwWindow.nameID;
            CWSYSTEM.Environment.screenHasChanged = true;
            dsector.DSReference.gui.moveWindowToTop$int(mouseIsOver);
            dsector.DSReference.gui.deactivateTextAreasInWindowsOtherThan(cwWindow);
            if (CWSYSTEM.Environment.activePulldownMenu$() != null && cwWindow === CWSYSTEM.Environment.activePulldownMenu$().parent) {
                CWSYSTEM.Environment.activePulldownMenu$().mousePressedOverClosedSectionOrOverlayBorder();
                this.mousePressedFinalize();
            } else {
                const inputBox = dsector.DSReference.gui.inputBoxThatMouseIsOver(xPos, yPos);
                if (inputBox != null) {
                    CWSYSTEM.Environment.inputBoxSelected = inputBox;
                }
                if (CWSYSTEM.Environment.inputBoxSelected$() != null && CWSYSTEM.Environment.inputBoxSelected$() !== inputBox) {
                    dsector.DSReference.interfaceProcesses.processInputBox(CWSYSTEM.Environment.inputBoxSelected$());
                    CWSYSTEM.Environment.inputBoxSelected = null;
                }
                const textArea = dsector.DSReference.gui.textAreaThatMouseIsOver(xPos, yPos);
                if (textArea != null) {
                    textArea.select(xPos - (cwWindow.xPosition - cwWindow.borderWidth), yPos - (cwWindow.yPosition - cwWindow.borderWidth - cwWindow.__titleHeight));
                }
                const cwButton = dsector.DSReference.gui.buttonThatMouseIsOver(xPos, yPos);
                if (cwButton != null) {
                    if (cwButton.respondsTo === CWSYSTEM.CWButton.PRESSED) {
                        dsector.DSReference.interfaceProcesses.processButton$btn$x$y(cwButton, xPos, yPos);
                        cwButton.press();
                        this.buttonActionPerformedOnButtonPressed = true;
                        this.mousePressedFinalize();
                        return;
                    }
                    cwButton.press();
                }
                const cwChkBox = dsector.DSReference.gui.checkBoxThatMouseIsOver(xPos, yPos);
                if (cwChkBox != null) {
                    if (cwChkBox.isRadioButton()) {
                        cwChkBox.setSelected(true);
                        this.mousePressedFinalize();
                    } else {
                        cwChkBox.invertSelectedState();
                        dsector.DSReference.interfaceProcesses.processCheckBox(cwChkBox);
                        this.mousePressedFinalize();
                    }
                } else if ((nameID === ("overlay")) && CWSYSTEM.Environment.activePulldownMenu$() != null) {
                    CWSYSTEM.Environment.activePulldownMenu$().mousePressedOverClosedSectionOrOverlayBorder();
                    this.mousePressedFinalize();
                } else {
                    const pulldownMO = dsector.DSReference.gui.pulldownThatMouseIsOver(xPos, yPos);
                    if (pulldownMO != null) {
                        pulldownMO.mousePressedOverClosedSectionOrOverlayBorder();
                        this.mousePressedFinalize();
                    } else {
                        if (cwWindow.hasScrollbar()) {
                            CWSYSTEM.Environment.scrollbarHeld = cwWindow.scrollbar;
                            CWSYSTEM.Environment.timeOnInitialPress = CWSYSTEM.Environment.currentTime();
                            if (cwWindow.scrollbar.mouseIsOverSlidingBar(xPos, yPos)) {
                                dsector.DSReference.mouseDrag.engageSlidingBarMove(cwWindow, xPos, yPos);
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
                            dsector.DSReference.mouseDrag.engageWindowResize(mouseIsOver, cornerMouseOver, xPos, yPos);
                        } else if (CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea) {
                            if (cwWindow.mouseOverTitleArea(xPos, yPos)) {
                                dsector.DSReference.mouseDrag.engageWindowMove(mouseIsOver, xPos, yPos);
                            }
                        } else {
                            dsector.DSReference.mouseDrag.engageWindowMove(mouseIsOver, xPos, yPos);
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
     * @override
     */
    mouseRightPressed(x, y) {
        CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = true;
        const ref = dsector.DSReference.gui.windowThatMouseIsOver(x, y);
        if (ref === -1) {
            if (dsector.DSReference.gui.rightClickPopupMenu != null) {
                dsector.DSReference.gui.rightClickPopupMenu.popup$();
            }
            this.mousePressedFinalize();
        } else {
            const window = dsector.DSReference.gui.getWindow$int(ref);
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
     * @override
     */
    mouseLeftReleased(x, y) {
        CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed = false;
        dsector.DSReference.mouseDrag.release(x, y);
        if (CWSYSTEM.Environment.buttonLastPressed$() != null) {
            CWSYSTEM.Environment.buttonLastPressed$().release();
        }
        dsector.DSReference.interfaceProcesses.processMouseRelease();
    }

    /**
     * Handles mouse double click events and performs the appropriate actions
     *
     * @param {number} x - The x position of the mouse
     * @param {number} y - The y position of the mouse
     * @private
     * @override
     */
    mouseDoubleLeftClicked(x, y) {
        const ref = dsector.DSReference.gui.windowThatMouseIsOver(x, y);
        if (ref !== -1) {
            // const window4 = dsector.DSReference.gui.getWindow$int(ref)
        }
    }

    /**
     * Handles right mouse double click events and performs the appropriate actions
     *
     * @deprecated This method is deprecated and will be updated in a future version.
     * @param {number} x - The x position of the mouse
     * @param {number} y - The y position of the mouse
     * @private
     * @override
     */
    mouseDoubleRightClicked(x, y) {
        CWSYSTEM.Debug.print("");
    }

    /**
     * Handles key typed events and performs the appropriate actions
     *
     * @param {string} c - The character typed
     * @private
     * @override
     */
    keyTyped(c) {
        dsector.DSReference.interfaceProcesses.processKeyboardChar(c);
    }

    /**
     * Handles key press events and performs the appropriate actions
     *
     * @param {number} keycode - The key code of the pressed key
     * @override
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
        dsector.DSReference.interfaceProcesses.processKeyboardPress(keycode);
    }

    /**
     * Handles key release events and performs the appropriate actions
     *
     * @param {number} keycode - The key code of the released key
     * @override
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
        dsector.DSReference.interfaceProcesses.processKeyboardRelease(keycode);
    }

    /**
     * The minimum guaranteed size of the buffer.
     * @static
     * @type {number}
     */
    static minimumGuaranteedBufferSize = 20;
}