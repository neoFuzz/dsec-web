/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class Joystick {
        constructor() {

            if (this.joystickID === undefined) {
                this.joystickID = 0;
            }
            if (this.gpTriggersScaled === undefined) {
                this.gpTriggersScaled = null;
            }
            if (this.gamePadName === undefined) {
                this.gamePadName = null;
            }
            if (this.gamePadButtons === undefined) {
                this.gamePadButtons = null;
            }
            if (this.gamePadAxes === undefined) {
                this.gamePadAxes = null;
            }
            if (this.internalID === undefined) {
                this.internalID = 0;
            }
            /** Trigger values stored in a FloatPair */
            this.gpTriggersScaled = new dsector.FloatPair(0.0, 0.0);

            /** Gamepad axes storage */
            this.gamePadAxes = ([]);

            /** Gamepad button storage */
            this.gamePadButtons = ([]);

            /** Gamepad API index */
            this.joystickID = 0;

            /** Non-zero indexed ID internal to the game. Starts at 5 as the Keyboard players are 1 through 4 */
            this.internalID = 5;
        }
    }
    dsector.Joystick = Joystick;
    Joystick["__class"] = "dsector.Joystick";
})(dsector || (dsector = {}));