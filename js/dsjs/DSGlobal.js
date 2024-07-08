/**
 * Namespace containing all the D-Sector game components.
 * @namespace dsector
 */
(function (dsector) {
    /**
     * Global Class that stores a variety of variables for setting up D-Sector.
     * @class
     * @memberof dsector
     */
    class DSGlobal {
        /**
         * Static initializer.
         * @static
         */
        static __static_initialize() {
            if (!DSGlobal.__static_initialized) {
                DSGlobal.__static_initialized = true;
                DSGlobal.__static_initializer_0();
            }
        }

        /**
         * @static
         * @private
         */
        static __static_initializer_0() {
            CWSYSTEM.Global.environmentBackgroundColor = new CWSYSTEM.CWColor(55, 55, 55, 255).color;
            CWSYSTEM.Global.guidelineSelectRegionWidth = 8;
            CWSYSTEM.Global.versionNumber = DSGlobal.versionNumber;
            CWSYSTEM.Global.applicationName = DSGlobal.applicationName;
            CWSYSTEM.Global.subFrames = DSGlobal.subFrames;
            CWSYSTEM.Global.noWindowPositionLoad = DSGlobal.noWindowPositionLoad;
            CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea = DSGlobal.windowsCanOnlyBeMovedByClickingTitleArea;
            CWSYSTEM.Global.shortWindowTitleBars = DSGlobal.shortWindowTitleBars;
        }
    }

    /**
     * @type {boolean}
     * @description Indicates whether the static initialization has been performed
     */
    DSGlobal.__static_initialized = false;

    /**
     * @type {number}
     * @description Constant representing the D-Sector application
     */
    DSGlobal.DSECTOR = 3;

    /**
     * @type {number}
     * @description Current application identifier
     */
    DSGlobal.application = 3;

    /**
     * @type {string}
     * @description Version number of the application
     */
    DSGlobal.versionNumber = "0.1";

    /**
     * @type {string}
     * @description Name of the application
     */
    DSGlobal.applicationName = "D-Sector";

    /**
     * @type {number}
     * @description Number of sub-frames used in the application
     */
    DSGlobal.subFrames = 1;

    /**
     * @type {boolean}
     * @description If true, prevents loading of window positions
     */
    DSGlobal.noWindowPositionLoad = false;

    /**
     * @type {boolean}
     * @description If true, windows can only be moved by clicking the title area
     */
    DSGlobal.windowsCanOnlyBeMovedByClickingTitleArea = true;

    /**
     * @type {boolean}
     * @description If true, uses short window title bars
     */
    DSGlobal.shortWindowTitleBars = true;

    dsector.DSGlobal = DSGlobal;
    DSGlobal["__class"] = "dsector.DSGlobal";
})(dsector || (dsector = {}));
dsector.DSGlobal.__static_initialize();