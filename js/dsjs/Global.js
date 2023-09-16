var CWSYSTEM;
(function (CWSYSTEM) {
    /** Global Class that stores a variety of variables. Re-written from Java */
    class Global {
        static __static_initialize() {
            if (!Global.__static_initialized) {
                Global.__static_initialized = true;
                Global.__static_initializer_0();
            }
        }

        static screenResolutionX_$LI$() {
            Global.__static_initialize();
            return Global.screenResolutionX;
        }

        static screenResolutionY_$LI$() {
            Global.__static_initialize();
            return Global.screenResolutionY;
        }

        static environmentBackgroundColor_$LI$() {
            Global.__static_initialize();
            return Global.environmentBackgroundColor;
        }

        static guidelineSelectRegionWidth_$LI$() {
            Global.__static_initialize();
            return Global.guidelineSelectRegionWidth;
        }

        static viewWindowMaxWidth_$LI$() {
            Global.__static_initialize();
            return Global.viewWindowMaxWidth;
        }

        static viewWindowMaxHeight_$LI$() {
            Global.__static_initialize();
            return Global.viewWindowMaxHeight;
        }

        static async initialize() {
            Global.screenResolutionX = 800; // TODO: pull dynamically from page
            Global.screenResolutionY = 600;
            while (true) {
                let maxMem;
                try { // TODO: Remove legacy memory check
                    if (window.performance.memory === undefined) {
                        // Firefox doesn't have window.performance. We need some value for memory calculation
                        let ffMaxMem = await navigator.storage.estimate();
                        maxMem = ffMaxMem.quota / 10;
                    } else {
                        // This works perfectly for Chromium browsers
                        maxMem = window.performance.memory.jsHeapSizeLimit;
                    }
                } catch (e) {
                    maxMem = 1073741824; // failsafe number of 1 GB
                }
                let pixelCount = Global.screenResolutionX * Global.screenResolutionY * 4 * (2 + Global.subFrames);
                let maxMemRem = maxMem - 15728640;
                maxMemRem -= pixelCount;
                let calculatedMem = Math.sqrt(maxMemRem / 4) / 4 / 2;
                if (calculatedMem * 10 / 9 > Global.screenResolutionX) {
                    Global.viewWindowMaxWidth = Global.screenResolutionX;
                } else {
                    Global.viewWindowMaxWidth = calculatedMem * 10 / 9;
                }
                if (calculatedMem * 9 / 10 > Global.screenResolutionY) {
                    Global.viewWindowMaxHeight = Global.screenResolutionY;
                } else {
                    Global.viewWindowMaxHeight = calculatedMem * 9 / 10;
                }
                console.info("Maximum memory available to JVM assumed to be " + (maxMem / 1024 / 1024) + " MB\n" +
                    "Desktop requires " + pixelCount / 1024 / 1024 + " MB\n" +
                    "Using resolution " + Global.screenResolutionX + ", " + Global.screenResolutionY + ".\n" +
                    "Maximum length of view windows set to " + calculatedMem + " pixels.\n--------------------");
                if (calculatedMem >= 150) {
                    return;
                }

                console.error("View window size too small - reducing screen resolution and trying again:");
                Global.screenResolutionX = ((Math.fround(Global.screenResolutionX * 0.9)) | 0);
                Global.screenResolutionY = ((Math.fround(Global.screenResolutionY * 0.9)) | 0);
                if (Global.screenResolutionX_$LI$() < 640) {
                    const message = "Error setting up Screen";
                    console.error(message);
                    return;
                }
            }
        }

        static __static_initializer_0() {
            //let newColor = new CWSYSTEM.CWColor(55, 55, 55, 255).color;
            Global.environmentBackgroundColor = new CWSYSTEM.CWColor(55, 55, 55, 255).color;
            Global.guidelineSelectRegionWidth = 8;
        }

        static getOperatingSystem() {
            return "Web";
        }
    }

    Global.__static_initialized = false;
    Global.JAVA = 0;
    Global.MAC_OSX = 1;
    Global.versionNumber = "";
    Global.applicationName = "";
    Global.viewWindowsAntiAliasSetting = 2;
    Global.subFrames = 1;
    Global.noWindowPositionLoad = false;
    Global.windowsCanOnlyBeMovedByClickingTitleArea = true;
    Global.shortWindowTitleBars = true;
    Global.runState = true;
    Global.maximumNumberOfWindows = 40;
    Global.maximumDoubleClickTime = 500;
    Global.graphicsInitialized = false;
    CWSYSTEM.Global = Global;
    Global["__class"] = "CWSYSTEM.Global";
})(CWSYSTEM || (CWSYSTEM = {}));
CWSYSTEM.Global.__static_initialize();
