(function (CWSYSTEM) {
    /**
     * Environment Class that stores a variety of variables about the running environment.
     *
     * @todo Move to the CWSYSTEM namespace
     *
     * @since 1.0.0
     * @access public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class Environment {
        /**
         * Creates an instance of Environment.
         *
         * @private
         */
        constructor() {
            Environment.applicationExpired();
        }

        /**
         * Initializes static members of the Environment class.
         *
         * @static
         * @private
         */
        static __static_initialize() {
            if (!Environment.__static_initialized) {
                Environment.__static_initialized = true;
                Environment.__static_initializer_0();
            }
        }

        /**
         * Returns the current cycle ID.
         *
         * @static
         * @returns {number} The current cycle ID.
         */
        static cycleID$() {
            Environment.__static_initialize();
            return Environment.cycleID;
        }

        /**
         * Returns the last frame period.
         *
         * @static
         * @returns {number} The last frame period.
         */
        static lastFramePeriod$() {
            Environment.__static_initialize();
            return Environment.lastFramePeriod;
        }

        /**
         * Returns the currently selected input box.
         *
         * @static
         * @returns {CWInputBox} The currently selected input box.
         */
        static inputBoxSelected$() {
            Environment.__static_initialize();
            return Environment.inputBoxSelected;
        }

        /**
         * Returns the X co-ordinate the last time the mouse was clicked.
         *
         * @static
         * @returns {number} The X co-ordinate the last time the mouse was clicked.
         */
        static mouseXLastClicked$() {
            Environment.__static_initialize();
            return Environment.mouseXLastClicked;
        }

        /**
         * Returns the Y co-ordinate the last time the mouse was clicked.
         *
         * @static
         * @returns {number} The Y co-ordinate the last time the mouse was clicked.
         */
        static mouseYLastClicked$() {
            Environment.__static_initialize();
            return Environment.mouseYLastClicked;
        }

        /**
         * Returns the last button pressed.
         *
         * @returns {number} The last button pressed.
         * @private
         */
        static buttonLastPressed$() {
            Environment.__static_initialize();
            return Environment.buttonLastPressed;
        }

        /**
         * Returns the last button moved over.
         *
         * @returns {CWButton} The last button moved over.
         * @private
         */
        static buttonLastMovedOver$() {
            Environment.__static_initialize();
            return Environment.buttonLastMovedOver;
        }

        /**
         * Returns the X co-ordinate of the mouse.
         *
         * @returns {number} The X co-ordinate of the mouse.
         * @private
         */
        static mouseX$() {
            Environment.__static_initialize();
            return Environment.mouseX;
        }

        /**
         * Returns the Y co-ordinate of the mouse.
         *
         * @returns {number} The Y co-ordinate of the mouse.
         * @private
         */
        static mouseY$() {
            Environment.__static_initialize();
            return Environment.mouseY;
        }

        /**
         * Returns the active pulldown menu.
         *
         * @returns {CWPulldown} The active pulldown item.
         */
        static activePulldownMenu$() {
            Environment.__static_initialize();
            return Environment.activePulldownMenu;
        }

        /**
         * Returns the perspective flipped X state.
         *
         * @returns {number} The perspective state.
         */
        static perspectiveViewFlipX$() {
            Environment.__static_initialize();
            return Environment.perspectiveViewFlipX;
        }

        /**
         * Returns the perspective flipped Y state.
         *
         * @returns {number} The perspective state.
         */
        static perspectiveViewFlipY$() {
            Environment.__static_initialize();
            return Environment.perspectiveViewFlipY;
        }

        /**
         * Returns the window colors.
         *
         * @returns {CWColor} The assigned color.
         */
        static windowColors$() {
            Environment.__static_initialize();
            return Environment.windowColors;
        }

        /**
         * Move the window content up.
         *
         * @returns {boolean} Whether or not the window has changed.
         */
        static windowScrollUp$() {
            Environment.__static_initialize();
            return Environment.windowScrollUp;
        }

        /**
         * Move the window content down.
         *
         * @static
         * @returns {boolean} Whether or not the window has changed.
         */
        static windowScrollDown$() {
            Environment.__static_initialize();
            return Environment.windowScrollDown;
        }

        /**
         * Move the window page content up.
         *
         * @returns {boolean}
         */
        static windowPageUp$() {
            Environment.__static_initialize();
            return Environment.windowPageUp;
        }

        /**
         * Move the window page content down.
         * @returns {boolean}
         */
        static windowPageDown$() {
            Environment.__static_initialize();
            return Environment.windowPageDown;
        }

        /**
         * Returns the scrollbar being held.
         *
         * @returns {CWScrollbar} The scrollbar being held.
         */
        static scrollbarHeld$() {
            Environment.__static_initialize();
            return Environment.scrollbarHeld;
        }

        /**
         * Returns the time (in milliseconds) when the initial mouse button was pressed.
         *
         * @static
         * @returns {number} The time (in milliseconds) when the initial mouse button was pressed.
         */
        static timeOnInitialPress$() {
            Environment.__static_initialize();
            return Environment.timeOnInitialPress;
        }

        /**
         * Returns the current time in milliseconds.
         *
         * @static
         * @returns {number} The current time in milliseconds.
         */
        static currentTime() {
            return (new Date()).getTime() - 1;
        }

        /**
         * Processes buttons and keys that are being held down.
         *
         * @static
         */
        static processButtonsAndKeysThatAreHeld() {
            const pressTime = Environment.currentTime() - Environment.timeOnInitialPress$();
            if (Environment.windowScrollUp$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld$().moveUpSlowly();
                }
            }
            if (Environment.windowScrollDown$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld$().moveDownSlowly();
                }
            }
            if (Environment.windowPageUp$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld$().moveUpFast();
                }
            }
            if (Environment.windowPageDown$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld$().moveDownFast();
                }
            }
        }

        /**
         * Requests an update for perspective view windows in the next cycle.
         *
         * @static
         */
        static perspectiveViewWindowsRequestedForUpdateNextCycle() {
            Environment.perspectiveViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }

        /**
         * Requests an update for projective view windows in the next cycle.
         *
         * @static
         */
        static projectiveViewWindowsRequestedForUpdateNextCycle() {
            Environment.xyViewRequestedForUpdate = true;
            Environment.xzViewRequestedForUpdate = true;
            Environment.yzViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }

        /**
         * Requests an update for all view windows in the next cycle.
         *
         * @static
         */
        static viewWindowsRequestedForUpdateNextCycle() {
            Environment.xyViewRequestedForUpdate = true;
            Environment.xzViewRequestedForUpdate = true;
            Environment.yzViewRequestedForUpdate = true;
            Environment.perspectiveViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }


        /**
         * Requests an update for a specific projective view window in the next cycle.
         *
         * @static
         * @param {number} viewID - The ID of the view to update.
         */
        static oneProjectiveViewWindowRequestedForUpdateNextCycle(viewID) {
            switch (viewID) {
                case 0:
                    Environment.yzViewRequestedForUpdate = true;
                    break;
                case 1:
                    Environment.xzViewRequestedForUpdate = true;
                    break;
                case 2:
                    Environment.xyViewRequestedForUpdate = true;
                    break;
                case 3:
                    Environment.perspectiveViewRequestedForUpdate = true;
            }
            Environment.screenHasChanged = true;
        }

        /**
         * Dummy function for the constructor.
         *
         * @returns {boolean}
         */
        static applicationExpired() {
            return false;
        }

        /**
         * Advances the cycle counter
         *
         * @static
         */
        static advanceCycle() {
            Environment.cycleID = (Environment.cycleID + 1) % 100000;
        }

        /**
         * Initializes static properties of the Environment class.
         * @static
         * @private
         */
        static __static_initializer_0() {
            Environment.cycleID = 0;
            Environment.mouseXLastClicked = (CWSYSTEM.Global.screenResolutionX / 2 | 0);
            Environment.mouseYLastClicked = (CWSYSTEM.Global.screenResolutionY / 2 | 0);
            Environment.buttonLastPressed = null;
            Environment.buttonLastMovedOver = null;
            Environment.activePulldownMenu = null;
            Environment.xyViewRequestedForUpdate = false;
            Environment.xzViewRequestedForUpdate = false;
            Environment.yzViewRequestedForUpdate = false;
            Environment.perspectiveViewRequestedForUpdate = false;
            Environment.xAxisFlippedXYView = 1;
            Environment.yAxisFlippedXYView = -1;
            Environment.zAxisFlippedXYView = -1;
            Environment.xAxisFlippedYZView = 1;
            Environment.yAxisFlippedYZView = 1;
            Environment.zAxisFlippedYZView = -1;
            Environment.xAxisFlippedXZView = 1;
            Environment.yAxisFlippedXZView = -1;
            Environment.zAxisFlippedXZView = -1;
            Environment.perspectiveViewFlipX = 1;
            Environment.perspectiveViewFlipY = 1;
            Environment.ESCKeyPressedDuringThisCycle = false;
            Environment.moveCameraForwards = false;
            Environment.moveCameraBackwards = false;
            Environment.moveCameraUp = false;
            Environment.moveCameraDown = false;
            Environment.moveCameraLeft = false;
            Environment.moveCameraRight = false;
            Environment.moveCameraLeftPivot = false;
            Environment.moveCameraRightPivot = false;
            Environment.windowColors = new CWSYSTEM.WindowColors();
            Environment.windowScrollUp = false;
            Environment.windowScrollDown = false;
            Environment.windowPageUp = false;
            Environment.windowPageDown = false;
            Environment.scrollbarHeld = null;
            Environment.timeOnInitialPress = 0;
        }
    }

    /**
     * @static
     * @type {boolean}
     */
    Environment.__static_initialized = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.screenHasChanged = true;

    /**
     * @static
     * @type {number}
     */
    Environment.furtherRendering = 0;

    /**
     * @static
     * @type {boolean}
     */
    Environment.shiftKeyPressed = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.ctrlKeyPressed = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.altKeyPressed = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.spacebarPressed = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.mouseButtonOrAnyKeyPressed = false;
    /**
     * @static
     * @type {boolean}
     */
    Environment.VK_q_Pressed = false;
    /**
     * @static
     * @type {number}
     */
    Environment.timeWhenMouseLastClicked = 0;
    /**
     * @static
     * @type {number}
     */
    Environment.MOUSE_LEFT = 0;
    /**
     * @static
     * @type {number}
     */
    Environment.MOUSE_MIDDLE = 1;
    /**
     * @static
     * @type {number}
     */
    Environment.MOUSE_RIGHT = 2;
    /**
     * @static
     * @type {number}
     */
    Environment.lastFramePeriod = 0;
    /**
     * @static
     * @type {CWInputBox|null}
     */
    Environment.inputBoxSelected = null;
    /**
     * @static
     * @type {number}
     */
    Environment.lastMouseButtonPressed = null;
    CWSYSTEM.Environment = Environment;
    Environment["__class"] = "CWSYSTEM.Environment";
})(CWSYSTEM || (CWSYSTEM = {}));
CWSYSTEM.Environment.__static_initialize();