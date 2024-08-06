import {dsector} from './dsector.js';

/**
 * Utility class for handling game pad functionality.
 *
 * @property {Map<number, dsector.Joystick>} joysticksActive - A map of active joysticks, keyed by internal ID.
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
export class GamePadUtils {
    /**
     * Creates an instance of GamePadUtils.
     * Initializes active joysticks and sets up gamepad connections.
     */
    constructor() {
        if (this.joysticksActive === undefined) {
            this.joysticksActive = new Map();
        }
        let joy;
        this.joysticksActive = new Map();
        let gpID = 5;
        let gamepads = GamePadUtils.getGamePadObjects();
        for (const gamepad of gamepads) {
            if (gamepad) {
                joy = new dsector.Joystick();
                joy.gamePadName = gamepad.id;
                joy.joystickID = gamepad.index;
                joy.internalID = gpID;
                joy.gamePadAxes = gamepad.axes;
                joy.gamePadButtons = gamepad.buttons;
                this.joysticksActive.set(gpID, joy);
                gpID++;
            }
        }
        // Wire up events, maybe?
    }

    /**
     * Returns an array of gamepad objects.
     *
     * @returns {Array<null>|Gamepad[]} An array of gamepad objects.
     */
    static getGamePadObjects() {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : null;
        if (gamepads === null) {
            gamepads = navigator.webkitGetGamepads() ? navigator.webkitGetGamepads() : [];
        }
        return gamepads;
    }

    /**
     * Checks if a joystick is connected and updates the active joysticks list.
     *
     * @param {dsector.Joystick} joystick - The joystick to check.
     * @returns {boolean} True if the joystick is connected, false otherwise.
     */
    checkJoystickConnected(joystick) {
        let gamepads = GamePadUtils.getGamePadObjects();
        for (let i = 0; i < gamepads.length; i++) {
            const str = String(i + 1).toString();
            /* check for gamepad presence */
            for (let [key, value] of dsector.DSReference.jsu.joysticksActive) {
                if (value.joystickID === gamepads[i].index) {
                    return true;
                } else {
                    const gpn = dsector.DSReference.jsu.joysticksActive.get(joystick.internalID).gamePadName;
                    dsector.DSReference.alertManager.messageQueued(
                        `"Joystick ${str} with ${key} removed - Please plug ${gpn} back in`);
                    dsector.DSReference.jsu.joysticksActive.delete(joystick.internalID);
                    // TODO: Incomplete, needs to recheck joys and re-map
                }
            }
        }
    }

    /** @constant {number} */
    static JOY_UP = 12;
    /** @constant {number} */
    static JOY_RIGHT = 15;
    /** @constant {number} */
    static JOY_DOWN = 13;
    /** @constant {number} */
    static JOY_LEFT = 14;
}

// Gamepad functions
/** @constant {boolean} */
const haveEvents = 'GamepadEvent' in window;

/**
 * Handles gamepad disconnection events.
 * @param {GamepadEvent} e - The gamepad event.
 */
function disconnectHandler(e) {
    removeGamepad(e.gamepad);
}

/**
 * Removes a gamepad from the active joysticks list.
 * @param {Gamepad} gamepad - The gamepad to remove.
 */
function removeGamepad(gamepad) {
    delete dsector.DSReference.jsu.joysticksActive[gamepad.index];
}

if (haveEvents) {
    window.addEventListener("gamepaddisconnected", disconnectHandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepaddisconnected", disconnectHandler);
}