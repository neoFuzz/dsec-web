// Declare the variable to hold the CWSYSTEM namespace.
// It is set here since Debug is the logger required by all other classes.
let CWSYSTEM = {};

(function (CWSYSTEM) {
    /**
     * This is the logger class for the CWSYSTEM.
     * It provides methods for printing messages to the console and handling errors.
     * Can be enabled or disabled globally setting the appropriate properties.
     *
     * @property {boolean} [terminalPrinting=true] - Whether to print log/informational messages to the console.
     * @property {boolean} [errorLogging=true] - Whether to log errors to the console.
     * @property {object} [constructor=null]
     *
     * @note This is a logging class, not a debugging class.
     *       It is recommended to use a proper debugging tool
     *       for debugging purposes.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class Debug {
        /**
         * Prints a message to the console using info if terminal printing is enabled.
         *
         * @access public
         * @static
         * @param {string} message The information message to print.
         */
        static print(message) {
            if (Debug.terminalPrinting) {
                console.info(message);
            }
        }

        /**
         * Prints a message to the console using log if terminal printing is enabled.
         *
         * @param {string} message The log message to print.
         * @access public
         * @static
         */
        static println(message) {
            if (Debug.terminalPrinting) {
                console.log(message);
            }
        }

        /**
         * Prints an error message to the console using error if error logging is enabled.
         *
         * @param {string} message The error message to print.
         * @access public
         * @static
         */
        static error(message) {
            if (Debug.errorLogging) {
                console.error(message);
            }
        }
    }

    /**
     * Whether to print log/informational messages to the console.
     * @type {boolean}
     */
    Debug.terminalPrinting = true;
    /**
     * Whether to log errors to the console.
     * @type {boolean}
     */
    Debug.errorLogging = true;
    CWSYSTEM.Debug = Debug;
    Debug["__class"] = "CWSYSTEM.Debug";
})(CWSYSTEM);