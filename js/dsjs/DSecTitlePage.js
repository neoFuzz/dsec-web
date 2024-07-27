(function (dsector) {
    /**
     * Class for setting up the title page.
     *
     * @property {boolean} titleScreenOpen
     * @property {dsector.MP3} controlRoomSound
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
    class DSecTitlePage {
        constructor() {
            this.titleScreenOpen = false;
            if (this.controlRoomSound === undefined) {
                this.controlRoomSound = null;
            }
            this.titleScreenOpen = true;
            if (dsector.DSReference.dsecSetupWindow.soundMode !== 0) {
                this.controlRoomSound = new dsector.MP3("assets/sounds/title.mp3");
                this.controlRoomSound.play();
            }
            dsector.DSReference.virtualScreen.fadeInBackgroundFromBlack(7000);
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/dsectorTitle.jpg");
            dsector.Keyboard.focus = dsector.Keyboard.DSECTOR;
            CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea = false;
        }

        /**
         * Responds to the game tick event.
         */
        respondToGameTick() {
            if (CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed) {
                this.titleScreenOpen = false;
                dsector.DSReference.dsecSetupWindow.loadOptions();
                dsector.DSReference.dsecMainSetupWindow.create();
                if (this.controlRoomSound != null) {
                    this.controlRoomSound.close();
                }
            }
        }
    }

    dsector.DSecTitlePage = DSecTitlePage;
    DSecTitlePage["__class"] = "dsector.DSecTitlePage";
})(dsector || (dsector = {}));