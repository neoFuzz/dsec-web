var CWSYSTEM;
(function (CWSYSTEM) {
    class CWSReference {
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