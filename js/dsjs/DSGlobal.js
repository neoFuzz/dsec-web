/**
 * Namespace containing all the D-Sector game components.
 * @namespace dsector
 */
import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Global Class that stores a variety of variables for setting up D-Sector.
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
export class DSGlobal {
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
     * Static initializer helper.
     *
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

    /**
     * @type {boolean}
     * @description Indicates whether the static initialization has been performed
     */
    static __static_initialized = false;

    /**
     * @type {number}
     * @description Constant representing the D-Sector application
     */
    static DSECTOR = 3;

    /**
     * @type {number}
     * @description Current application identifier
     */
    static application = 3;

    /**
     * @type {string}
     * @description Version number of the application
     */
    static versionNumber = "0.1";

    /**
     * @type {string}
     * @description Name of the application
     */
    static applicationName = "D-Sector";

    /**
     * @type {number}
     * @description Number of sub-frames used in the application
     */
    static subFrames = 1;

    /**
     * @type {boolean}
     * @description If true, prevents loading of window positions
     */
    static noWindowPositionLoad = false;

    /**
     * @type {boolean}
     * @description If true, windows can only be moved by clicking the title area
     */
    static windowsCanOnlyBeMovedByClickingTitleArea = true;

    /**
     * @type {boolean}
     * @description If true, uses short window title bars
     */
    static shortWindowTitleBars = true;
}