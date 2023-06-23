var dsector;
(function (dsector) {
    class GamePadUtils {
        constructor() {
            if (this.joysticksActive === undefined) {
                this.joysticksActive = new Map();// null;
            }
            let joy;
            this.joysticksActive = new Map();
            let gpID = 5;
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : (
                navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i]) { // && (gamepads[i].index in controllers)) {
                    //controllers[gamepads[i].index] = gamepads[i];
                    joy = new dsector.Joystick();
                    joy.gamePadName = gamepads[i].id;
                    joy.joystickID = gamepads[i].index;
                    joy.internalID = gpID;
                    joy.gamePadAxes = gamepads[i].axes;
                    joy.gamePadButtons = gamepads[i].buttons;
                    this.joysticksActive.set(gpID,joy);
                    gpID++;
                }
            }
            // Wire up events, maybe?

        }

        checkJoystickConnected(joystick) {
            let gamepads = navigator.getGamepads ? navigator.getGamepads() :
                (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
            for (let i = 0; i < gamepads.length; i++) {
                const str = String(i + 1).toString();
                /* check for gamepad presence */
                for (let [key, value] of dsector.DSReference.jsu.joysticksActive) {
                    if (value.joystickID === gamepads[i].index) {
                        return true;
                    } else {
                        const gpn = dsector.DSReference.jsu.joysticksActive.get(joystick.internalID).gamePadName;
                        dsector.DSReference.alertManager.messageQueued("Joystick" + str + " removed - Please plug " + gpn + "back in");
                        dsector.DSReference.jsu.joysticksActive.delete(joystick.internalID);
                        // TODO: Incomplete, needs recheck joys and re-map
                    }
                }
            }
        }
    }

    GamePadUtils.JOY_UP = 12;
    GamePadUtils.JOY_RIGHT = 15;
    GamePadUtils.JOY_DOWN = 13;
    GamePadUtils.JOY_LEFT = 14;
    dsector.GamePadUtils = GamePadUtils;
    GamePadUtils["__class"] = "dsector.GamePadUtils";
})(dsector || (dsector = {}));
// Gamepad functions
const haveEvents = 'GamepadEvent' in window;

function disconnectHandler(e) {
    removegamepad(e.gamepad);
}
function removegamepad(gamepad) {
    delete dsector.DSReference.jsu.joysticksActive[gamepad.index];
}

if (haveEvents) {
    window.addEventListener("gamepaddisconnected", disconnectHandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepaddisconnected", disconnectHandler);
}