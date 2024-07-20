/* info header */
(function (CWSYSTEM) {
    /**
     * Global Class that stores a variety of variables. Re-written from Java.
     * @class
     * @memberof CWSYSTEM
     */
    class Global {
        /**
         * Initializes static properties if not already initialized.
         * @private
         * @static
         */
        static __static_initialize() {
            if (!Global.__static_initialized) {
                Global.__static_initialized = true;
                Global.__static_initializer_0();
            }
        }

        /**
         * @returns {number} The horizontal screen resolution.
         * @static
         */
        static screenResolutionX_$LI$() {
            Global.__static_initialize();
            return Global.screenResolutionX;
        }

        /**
         * @returns {number} The vertical screen resolution.
         * @static
         */
        static screenResolutionY_$LI$() {
            Global.__static_initialize();
            return Global.screenResolutionY;
        }

        /**
         * @returns {number} The environment background color.
         * @static
         */
        static environmentBackgroundColor_$LI$() {
            Global.__static_initialize();
            return Global.environmentBackgroundColor;
        }

        /**
         * @returns {number} The guideline select region width.
         * @static
         */
        static guidelineSelectRegionWidth_$LI$() {
            Global.__static_initialize();
            return Global.guidelineSelectRegionWidth;
        }

        /**
         * @returns {number} The maximum view window width.
         * @static
         */
        static viewWindowMaxWidth_$LI$() {
            Global.__static_initialize();
            return Global.viewWindowMaxWidth;
        }

        /**
         * @returns {number} The maximum view window height.
         * @static
         */
        static viewWindowMaxHeight_$LI$() {
            Global.__static_initialize();
            return Global.viewWindowMaxHeight;
        }

        /**
         * Initializes the global settings, including screen resolution and memory calculations.
         * @static
         * @async
         * @returns {Promise<void>}
         */
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

        /**
         * Initializes static properties.
         * @private
         * @static
         */
        static __static_initializer_0() {
            Global.environmentBackgroundColor = new CWSYSTEM.CWColor(55, 55, 55, 255).color;
            Global.guidelineSelectRegionWidth = 8;
        }

        /**
         * @returns {string} The current operating system, always returns "Web".
         * @static
         */
        static getOperatingSystem() {
            return "Web";
        }
    }

    /**
     * @static
     * @type {boolean}
     */
    Global.__static_initialized = false;

    /**
     * @static
     * @type {number}
     */
    Global.JAVA = 0;

    /**
     * @static
     * @type {number}
     */
    Global.MAC_OSX = 1;

    /**
     * @static
     * @type {string}
     */
    Global.versionNumber = "";

    /**
     * @static
     * @type {string}
     */
    Global.applicationName = "";

    /**
     * @static
     * @type {number}
     */
    Global.viewWindowsAntiAliasSetting = 2;

    /**
     * @static
     * @type {number}
     */
    Global.subFrames = 1;

    /**
     * @static
     * @type {boolean}
     */
    Global.noWindowPositionLoad = false;

    /**
     * @static
     * @type {boolean}
     */
    Global.windowsCanOnlyBeMovedByClickingTitleArea = true;

    /**
     * @static
     * @type {boolean}
     */
    Global.shortWindowTitleBars = true;

    /**
     * @static
     * @type {boolean}
     */
    Global.runState = true;

    /**
     * @static
     * @type {number}
     */
    Global.maximumNumberOfWindows = 40;

    /**
     * @static
     * @type {number}
     */
    Global.maximumDoubleClickTime = 500;

    /**
     * @static
     * @type {boolean}
     */
    Global.graphicsInitialized = false;
    CWSYSTEM.Global = Global;
    Global["__class"] = "CWSYSTEM.Global";
})(CWSYSTEM || (CWSYSTEM = {}));
CWSYSTEM.Global.__static_initialize();
