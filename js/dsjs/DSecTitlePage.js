var dsector;
(function (dsector) {
    class DSecTitlePage {
        constructor() {
            this.titleScreenOpen = false;
            if (this.controlRoomSound === undefined) {
                this.controlRoomSound = null;
            }
            this.titleScreenOpen = true;
            if (dsector.DSecSetupWindow.soundMode !== 0) {
                this.controlRoomSound = new dsector.MP3("assets/sounds/title.mp3");
                this.controlRoomSound.play();
            }
            dsector.DSReference.virtualScreen.fadeInBackgroundFromBlack(7000);
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/dsectorTitle.jpg");
            dsector.Keyboard.focus = dsector.Keyboard.DSECTOR;
            CWSYSTEM.Global.windowsCanOnlyBeMovedByClickingTitleArea = false;
            //dsector.DSReference.dsecSetupWindow.loadOptions();

        }
        respondToGameTick() {
            if (CWSYSTEM.Environment.mouseButtonOrAnyKeyPressed) {
                this.titleScreenOpen = false;
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
