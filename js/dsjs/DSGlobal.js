var dsector;
(function (dsector) {
    /**
     * Global Class that stores a variety of variables for setting up D-Sector.
     * @class
     */
    class DSGlobal {
        static __static_initialize() {
            if (!DSGlobal.__static_initialized) {
                DSGlobal.__static_initialized = true;
                DSGlobal.__static_initializer_0();
            }
        }

        static __static_initializer_0() {
            let newColor = new CWSYSTEM.CWColor(55, 55, 55, 255).color;
            CWSYSTEM.Global.environmentBackgroundColor = newColor;
            CWSYSTEM.Global.guidelineSelectRegionWidth = 8;
            CWSYSTEM.Global.versionNumber = DSGlobal.versionNumber;
            CWSYSTEM.Global.applicationName = DSGlobal.applicationName;
            CWSYSTEM.Global.subFrames = DSGlobal.subFrames;
            CWSYSTEM.Global.noWindowPositionLoad = DSGlobal.noWindowPositionLoad;
            CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea = DSGlobal.windowsCanOnlyBeMovedByClickingTitleArea;
            CWSYSTEM.Global.shortWindowTitleBars = DSGlobal.shortWindowTitleBars;
        }
    }

    DSGlobal.__static_initialized = false;
    DSGlobal.DSECTOR = 3;
    DSGlobal.application = 3;
    DSGlobal.versionNumber = "0.1";
    DSGlobal.applicationName = "D-Sector";
    DSGlobal.subFrames = 1;
    DSGlobal.noWindowPositionLoad = false;
    DSGlobal.windowsCanOnlyBeMovedByClickingTitleArea = true;
    DSGlobal.shortWindowTitleBars = true;
    dsector.DSGlobal = DSGlobal;
    DSGlobal["__class"] = "dsector.DSGlobal";
})(dsector || (dsector = {}));
dsector.DSGlobal.__static_initialize();
