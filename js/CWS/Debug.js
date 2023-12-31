/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class Debug {
        static print(message) {
            if (Debug.terminalPrinting) {
                console.info(message);
            }
        }

        static println(message) {
            if (Debug.terminalPrinting) {
                console.log(message);
            }
        }

        static error(message) {
            if (Debug.errorLogging) {
                console.error(message);
            }
        }
    }

    Debug.terminalPrinting = true;
    Debug.errorLogging = true;
    CWSYSTEM.Debug = Debug;
    Debug["__class"] = "CWSYSTEM.Debug";
})(CWSYSTEM || (CWSYSTEM = {}));
