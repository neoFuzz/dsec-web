/**
 * Namespace with the Canvas Windowing components.
 * @namespace CWSYSTEM
 */
(function (CWSYSTEM) {
    /**
     * Provides a centralized reference point for various components and managers
     * within the CWS (CWSYSTEM) framework. This class acts as a singleton instance,
     * ensuring that only one instance of each component is created and accessible
     * throughout the application's lifecycle.
     * @class
     * @memberof CWSYSTEM
     */
    class CWSReference {
        /**
         * Initializes a new instance of the CWSReference class.
         * @constructor
         * @returns {CWSReference} A new instance of the CWSReference class.
         */
        constructor() {
            CWSReference.virtualScreen = new CWSYSTEM.VirtualScreen();
            CWSReference.gui = new CWSYSTEM.CWWindowCollection(CWSReference.virtualScreen);
            CWSReference.graphics = new CWSYSTEM.CWGraphics();
            CWSReference.alertManager = new CWSYSTEM.AlertManager();
            CWSReference.cwSound = new CWSYSTEM.CWSound();
            CWSReference.mouseDrag = new CWSYSTEM.MouseDrag();
        }
    }

    CWSReference.mouseDrag = null;
    CWSReference.virtualScreen = null;
    CWSReference.gui = null;
    CWSReference.graphics = null;
    CWSReference.interfaceProcesses = null;
    CWSReference.alertManager = null;
    CWSReference.renderer = null;
    CWSReference.cwSound = null;
    CWSYSTEM.CWSReference = CWSReference;
    CWSReference["__class"] = "CWSYSTEM.CWSReference";
})(CWSYSTEM || (CWSYSTEM = {}));