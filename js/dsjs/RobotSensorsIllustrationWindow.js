(function (dsector) {
    /**
     * This class represents a window for displaying robot sensors illustration.
     *
     * @deprecated This class is deprecated and should not be used in new code. Functionality needs to be re-created
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
    class RobotSensorsIllustrationWindow {
        /**
         * Destroys the window and performs any necessary cleanup operations.
         */
        destroy() {
            CWSYSTEM.Debug.print("");
        }
    }
    dsector.RobotSensorsIllustrationWindow = RobotSensorsIllustrationWindow;
    RobotSensorsIllustrationWindow["__class"] = "dsector.RobotSensorsIllustrationWindow";
})(dsector || (dsector = {}));