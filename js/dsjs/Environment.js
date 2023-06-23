var CWSYSTEM;
(function (CWSYSTEM) {
    class Environment {
        constructor() {
            Environment.applicationExpired();
        }

        static __static_initialize() {
            if (!Environment.__static_initialized) {
                Environment.__static_initialized = true;
                Environment.__static_initializer_0();
            }
        }

        static cycleID_$LI$() {
            Environment.__static_initialize();
            return Environment.cycleID;
        }

        static lastFramePeriod_$LI$() {
            Environment.__static_initialize();
            return Environment.lastFramePeriod;
        }

        /** @returns {CWInputBox} */
        static inputBoxSelected_$LI$() {
            Environment.__static_initialize();
            return Environment.inputBoxSelected;
        }

        static mouseXLastClicked_$LI$() {
            Environment.__static_initialize();
            return Environment.mouseXLastClicked;
        }

        static mouseYLastClicked_$LI$() {
            Environment.__static_initialize();
            return Environment.mouseYLastClicked;
        }

        static lastMouseButtonPressed_$LI$() {
            Environment.__static_initialize();
            return Environment.lastMouseButtonPressed;
        }

        static buttonLastPressed_$LI$() {
            Environment.__static_initialize();
            return Environment.buttonLastPressed;
        }

        static buttonLastMovedOver_$LI$() {
            Environment.__static_initialize();
            return Environment.buttonLastMovedOver;
        }

        static mouseX_$LI$() {
            Environment.__static_initialize();
            return Environment.mouseX;
        }

        static mouseY_$LI$() {
            Environment.__static_initialize();
            return Environment.mouseY;
        }

        static activePulldownMenu_$LI$() {
            Environment.__static_initialize();
            return Environment.activePulldownMenu;
        }

        static xyViewRequestedForUpdate_$LI$() {
            Environment.__static_initialize();
            return Environment.xyViewRequestedForUpdate;
        }

        static xzViewRequestedForUpdate_$LI$() {
            Environment.__static_initialize();
            return Environment.xzViewRequestedForUpdate;
        }

        static yzViewRequestedForUpdate_$LI$() {
            Environment.__static_initialize();
            return Environment.yzViewRequestedForUpdate;
        }

        static perspectiveViewRequestedForUpdate_$LI$() {
            Environment.__static_initialize();
            return Environment.perspectiveViewRequestedForUpdate;
        }

        static xAxisFlippedXYView_$LI$() {
            Environment.__static_initialize();
            return Environment.xAxisFlippedXYView;
        }

        static yAxisFlippedXYView_$LI$() {
            Environment.__static_initialize();
            return Environment.yAxisFlippedXYView;
        }

        static zAxisFlippedXYView_$LI$() {
            Environment.__static_initialize();
            return Environment.zAxisFlippedXYView;
        }

        static xAxisFlippedYZView_$LI$() {
            Environment.__static_initialize();
            return Environment.xAxisFlippedYZView;
        }

        static yAxisFlippedYZView_$LI$() {
            Environment.__static_initialize();
            return Environment.yAxisFlippedYZView;
        }

        static zAxisFlippedYZView_$LI$() {
            Environment.__static_initialize();
            return Environment.zAxisFlippedYZView;
        }

        static xAxisFlippedXZView_$LI$() {
            Environment.__static_initialize();
            return Environment.xAxisFlippedXZView;
        }

        static yAxisFlippedXZView_$LI$() {
            Environment.__static_initialize();
            return Environment.yAxisFlippedXZView;
        }

        static zAxisFlippedXZView_$LI$() {
            Environment.__static_initialize();
            return Environment.zAxisFlippedXZView;
        }

        static perspectiveViewFlipX_$LI$() {
            Environment.__static_initialize();
            return Environment.perspectiveViewFlipX;
        }

        static perspectiveViewFlipY_$LI$() {
            Environment.__static_initialize();
            return Environment.perspectiveViewFlipY;
        }

        static ESCKeyPressedDuringThisCycle_$LI$() {
            Environment.__static_initialize();
            return Environment.ESCKeyPressedDuringThisCycle;
        }

        static moveCameraForwards_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraForwards;
        }

        static moveCameraBackwards_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraBackwards;
        }

        static moveCameraUp_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraUp;
        }

        static moveCameraDown_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraDown;
        }

        static moveCameraLeft_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraLeft;
        }

        static moveCameraRight_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraRight;
        }

        static moveCameraLeftPivot_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraLeftPivot;
        }

        static moveCameraRightPivot_$LI$() {
            Environment.__static_initialize();
            return Environment.moveCameraRightPivot;
        }

        static windowColors_$LI$() {
            Environment.__static_initialize();
            return Environment.windowColors;
        }

        static windowScrollUp_$LI$() {
            Environment.__static_initialize();
            return Environment.windowScrollUp;
        }

        static windowScrollDown_$LI$() {
            Environment.__static_initialize();
            return Environment.windowScrollDown;
        }

        static windowPageUp_$LI$() {
            Environment.__static_initialize();
            return Environment.windowPageUp;
        }

        static windowPageDown_$LI$() {
            Environment.__static_initialize();
            return Environment.windowPageDown;
        }

        static scrollbarHeld_$LI$() {
            Environment.__static_initialize();
            return Environment.scrollbarHeld;
        }

        static timeOnInitialPress_$LI$() {
            Environment.__static_initialize();
            return Environment.timeOnInitialPress;
        }

        static currentTime() {
            return (new Date()).getTime() - 1;
        }

        static operationExceedsFreeMemory(memory) {
            return false;
        }

        static processButtonsAndKeysThatAreHeld() {
            let name = "";
            if (Environment.buttonLastPressed_$LI$() != null) {
                name = Environment.buttonLastPressed_$LI$().name;
            }
            if (Environment.buttonLastPressed_$LI$() != null) {
                const nameID = Environment.buttonLastPressed_$LI$().parent.nameID;
                if ((name === ("CAM_U")) || (name === ("CAM_D")) || (name === ("CAM_L")) || (name === ("CAM_R")) ||
                    (name === ("CAM_F")) || (name === ("CAM_B")) || (nameID === ("DIR")) || (nameID === ("SYS")) &&
                    !(name === ("SYS_WORLD_INFO")) || (nameID === ("X")) || (nameID === ("Y")) || (nameID === ("Z"))) {
                    dsector.DSReference.interfaceProcesses.processButton$button(Environment.buttonLastPressed_$LI$());
                }
            }
            const pressTime = Environment.currentTime() - Environment.timeOnInitialPress_$LI$();
            if (Environment.windowScrollUp_$LI$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld_$LI$().moveUpSlowly();
                }
            }
            if (Environment.windowScrollDown_$LI$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld_$LI$().moveDownSlowly();
                }
            }
            if (Environment.windowPageUp_$LI$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld_$LI$().moveUpFast();
                }
            }
            if (Environment.windowPageDown_$LI$()) {
                Environment.screenHasChanged = true;
                if (pressTime > CWSYSTEM.Global.maximumDoubleClickTime) {
                    Environment.scrollbarHeld_$LI$().moveDownFast();
                }
            }
        }

        static escapeKeyPressed() {
            return Environment.ESCKeyPressedDuringThisCycle_$LI$();
        }

        static perspectiveViewWindowsRequestedForUpdateNextCycle() {
            Environment.perspectiveViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }

        static projectiveViewWindowsRequestedForUpdateNextCycle() {
            Environment.xyViewRequestedForUpdate = true;
            Environment.xzViewRequestedForUpdate = true;
            Environment.yzViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }

        static viewWindowsRequestedForUpdateNextCycle() {
            Environment.xyViewRequestedForUpdate = true;
            Environment.xzViewRequestedForUpdate = true;
            Environment.yzViewRequestedForUpdate = true;
            Environment.perspectiveViewRequestedForUpdate = true;
            Environment.screenHasChanged = true;
        }

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

        static applicationExpired() {
            return false;
        }

        static advanceCycle() {
            Environment.cycleID = (Environment.cycleID + 1) % 100000;
        }

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

    Environment.__static_initialized = false;
    Environment.screenHasChanged = true;
    Environment.furtherRendering = 0;
    Environment.shiftKeyPressed = false;
    Environment.ctrlKeyPressed = false;
    Environment.altKeyPressed = false;
    Environment.spacebarPressed = false;
    Environment.mouseButtonOrAnyKeyPressed = false;
    Environment.VK_q_Pressed = false;
    Environment.timeWhenMouseLastClicked = 0;
    Environment.MOUSE_LEFT = 0;
    Environment.MOUSE_MIDDLE = 1;
    Environment.MOUSE_RIGHT = 2;
    CWSYSTEM.Environment = Environment;
    Environment["__class"] = "CWSYSTEM.Environment";
})(CWSYSTEM || (CWSYSTEM = {}));
CWSYSTEM.Environment.__static_initialize();
