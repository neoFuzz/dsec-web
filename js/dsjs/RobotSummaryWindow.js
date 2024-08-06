import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Class representing a Robot Summary Window.
 *
 * @property {CWSYSTEM.CWWindow|null} window - The window object.
 * @property {string|null} selectedRobotFilename - The filename of the selected robot.
 * @property {number} savedX - The saved x-coordinate of the window.
 * @property {number} savedY - The saved y-coordinate of the window.
 *
 * @example
 * let robotSummaryWindow = new dsector.RobotSummaryWindow();
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class RobotSummaryWindow {
    /**
     * Creates an instance of RobotSummaryWindow.
     */
    constructor() {
        this.window = null;
        this.selectedRobotFilename = null;
        this.savedX = -1;
        this.savedY = -1;
    }

    /**
     * Checks if the window is created.
     *
     * @returns {boolean} True if the window is created, otherwise false.
     */
    isCreated() {
        return this.window != null;
    }

    /**
     * Toggles the creation of the window.
     */
    toggleCreated() {
        if (this.isCreated()) {
            this.destroy();
        } else {
            this.create();
        }
    }

    /**
     * Creates the window and centers it within the desktop.
     */
    create() {
        this.drawWindow();
        this.window.centerWithinDesktop();
    }

    /**
     * Destroys the window and saves its position.
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
     * Updates the window if it is created.
     */
    update() {
        if (this.isCreated()) {
            this.drawWindow();
        }
    }

    /**
     * Restores the position of the window.
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
     * Draws the window and its components.
     */
    drawWindow() {
        let x = 25;
        let y = 25;
        if (this.window != null) {
            x = this.window.xPosition;
            y = this.window.yPosition;
            dsector.DSReference.gui.destroyWindow("ROBOTSUMMARY");
        }
        const font = dsector.DSReference.virtualScreen.serif8_font;
        this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ROBOTSUMMARY", 3, null, x, y, 400, 200, true);
        const cY = 30;
        const color = CWSYSTEM.CWColor.__white();
        this.window.addTextBlock("", "Robot Name", 10, cY, font, color, 999);
        this.window.addTextArea("name", 150, cY - 23, 245, 1, font, "").endMark = "";
        let baseline = cY + 30;
        let textArea = this.window.getTextArea("name");
        textArea.setText(dsector.DSReference.dsecRobotChooserWindow.robotSpecification.name);
        textArea.deselectionCausesSubmit = true;
        textArea.returnKeyCausesSubmit = true;
        textArea.objectContainingTextAreaSubmittedMethod = this;
        this.window.addTextBlock("", "Description", 10, baseline, font, color, 999);
        this.window.addTextArea("description", 150, baseline - 23, 245, 2, font, "").endMark = "";
        textArea = this.window.getTextArea("description");
        baseline += 45;
        let str = "";
        if (dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description != null) {
            str = dsector.DSReference.dsecRobotChooserWindow.robotSpecification.description;
        }
        textArea.setText(str);
        textArea.deselectionCausesSubmit = true;
        textArea.returnKeyCausesSubmit = true;
        textArea.objectContainingTextAreaSubmittedMethod = this;
        const button = this.window.addButton("done", 360, baseline - 23,
            35, 15, "Done", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
        baseline += 15;
        button.objectContainingButtonPressedMethod = this;
        button.buttonPressedMethodName = "doneButtonPressed";
        this.window.h = baseline - 15;
    }

    /**
     * Handles the submission of a text area.
     * @param textArea
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
     * Handles the press of the "Done" button.
     * @private
     * @param button
     */
    doneButtonPressed(button) {
        this.destroy();
    }
}