/**/
(function (dsector) {
    /**
     * Class representing a joystick.
     * @class
     * @memberof dsector
     */
    class Joystick {
        /**
         * Constructor for the Joystick class. Initializes all properties to their default values.
         */
        constructor() {
            /** @property {string} gamePadName Name of the gamepad */
            this.gamePadName = null;
            /** @property {number} internalID Internal ID of the joystick */
            this.internalID = 0;
            /** Trigger values stored in a FloatPair
             @property {dsector.FloatPair} gpTriggersScaled Scaled trigger values */
            this.gpTriggersScaled = new dsector.FloatPair(0.0, 0.0);

            /** Gamepad axes storage
             @property {Array<number>} gamePadAxes Array of gamepad axes values */
            this.gamePadAxes = ([]);

            /** Gamepad button storage
             @property {Array<number>} gamePadButtons Array of gamepad button values */
            this.gamePadButtons = ([]);

            /** @property {number} joystickID Gamepad API index */
            this.joystickID = 0;

            /** @property {number} internalID
             *  Non-zero indexed ID internal to the game. Starts at 5 as the Keyboard players are 1 through 4 */
            this.internalID = 5;
        }
    }

    dsector.Joystick = Joystick;
    Joystick["__class"] = "dsector.Joystick";
})(dsector || (dsector = {}));