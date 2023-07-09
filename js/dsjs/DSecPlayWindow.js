/* Re-written from Java */
var dsector;
(function (dsector) {
    class DSecPlayWindow {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.backgroundMusic === undefined) {
                this.backgroundMusic = null;
            }
            this.savedX = 25;
            this.savedY = 25;
            if (this.savedW === undefined) {
                this.savedW = 0;
            }
            if (this.savedH === undefined) {
                this.savedH = 0;
            }
            const safeXRes = CWSYSTEM.Global.screenResolutionX_$LI$() < 500 ? 50 : 300;
            if (CWSYSTEM.Global.screenResolutionY_$LI$() > (CWSYSTEM.Global.screenResolutionX_$LI$() - safeXRes)) {
                this.savedW = CWSYSTEM.Global.screenResolutionX_$LI$() - safeXRes;
                this.savedH = Math.round((this.savedW / 4) * 3);
            } else {
                this.savedH = CWSYSTEM.Global.screenResolutionY_$LI$() - 100;
                this.savedW = Math.round((this.savedH / 3) * 4);
            }
            this.create();
            this.window.centerWithinDesktop();
            this.destroy();
            if (dsector.DSecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
                this.turnMusicOn();
            }
        }

        static __static_initialize() {
            if (!DSecPlayWindow.__static_initialized) {
                DSecPlayWindow.__static_initialized = true;
                DSecPlayWindow.__static_initializer_0();
            }
        }

        static renderingHeight_$LI$() {
            DSecPlayWindow.__static_initialize();
            return DSecPlayWindow.renderingHeight;
        }

        static __static_initializer_0() {
            DSecPlayWindow.renderingHeight = CWSYSTEM.Global.screenResolutionY;
        }

        isCreated() {
            return this.window != null;
        }

        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        create() {
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/dsectorPlay.jpg");
            if (dsector.DSReference.dsecMainSetupWindow != null) {
                dsector.DSReference.dsecMainSetupWindow.destroy();
            }
            if (dsector.DSReference.dsecItemDescriptionWindow != null) {
                dsector.DSReference.dsecItemDescriptionWindow.destroy();
            }
            if (dsector.DSReference.dsecLoadGameWindow != null) {
                dsector.DSReference.dsecLoadGameWindow.destroy();
            }
            if (dsector.DSReference.dsecSaveGameWindow != null) {
                dsector.DSReference.dsecSaveGameWindow.destroy();
            }
            this.drawWindow();
            if (dsector.DSecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
                this.turnMusicOn();
            }
            if (dsector.DSReference.dsecPlayWindow != null) {
                CWSYSTEM.Debug.println("PlayWindow Created");
            }
        }

        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.savedW = this.window.w;
                this.savedH = this.window.h;
                this.window.destroy();
                this.window = null;
            }
            this.turnMusicOff();
        }

        drawWindow() {
            if (this.window == null) {
                if (this.savedW > CWSYSTEM.Global.viewWindowMaxWidth_$LI$()) {
                    this.savedW = CWSYSTEM.Global.viewWindowMaxWidth_$LI$();
                }
                if (this.savedH > CWSYSTEM.Global.viewWindowMaxWidth_$LI$()) {
                    this.savedH = CWSYSTEM.Global.viewWindowMaxHeight_$LI$();
                }
                this.window = dsector.DSReference.gui.addWindow$fullDefinition(
                    100, 15, CWSYSTEM.Global.viewWindowMaxWidth_$LI$(),
                    CWSYSTEM.Global.viewWindowMaxHeight_$LI$(), "DSW", 1, "D-Sector",
                    this.savedX, this.savedY, this.savedW, this.savedH, true);
                this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(CWSYSTEM.CWColor.black_$LI$()));
                const popupMenu = new CWSYSTEM.CWPopupMenu(this.window, "dsecPlayWindowPopup");
                if (dsector.DSReference.dsecGame != null) {
                    popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                        "D-Sector standard display", null, null,
                        null, this, CWSYSTEM.CWReflect.getMethod$obj$string(
                            this, "standardOverheadDisplay"), null);
                    popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                        "Cyclic panning", null, null, null, this,
                        CWSYSTEM.CWReflect.getMethod$obj$string(this, "cyclicPanning"), null);
                    popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                        "Player 1 perspective", null, null, null,
                        this, CWSYSTEM.CWReflect.getMethod$obj$string(this, "player1Perspective"),
                        null);
                    popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                        "Player 2 perspective", null, null, null,
                        this, CWSYSTEM.CWReflect.getMethod$obj$string(this, "player2Perspective"),
                        null);
                    for (let i = 2, playerCount = dsector.DSReference.dsecGame.numberOfPlayers();
                         i < playerCount; i++) {
                        const pId = i + 1;
                        popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                            "Player " + pId + " perspective", null, null,
                            null, this, CWSYSTEM.CWReflect.getMethod$obj$name$class(
                                this, "playerXPerspective", pId), [pId]);
                        if (i === 7) {
                            break;
                        }
                    }
                }
                popupMenu.addMenuItem$();
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "No sound effects", null, null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "noSound"), null);
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "Simplified sound", null, null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "simplifiedSound"), null);
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "Extended sound", null, null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "normalSound"), null);
                popupMenu.addMenuItem$();
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "Toggle music", null, null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "toggleMusic"), null);
                popupMenu.addMenuItem$();
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "Toggle magnetic grid", null, null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "toggleBackgrounds"), null);
                popupMenu.addMenuItem$();
                popupMenu.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "",
                    "Fast forward round", "ESC", null, null, this,
                    CWSYSTEM.CWReflect.getMethod$obj$string(this, "endRound"), null);
                this.update();
            }
        }

        update() {
            dsector.DSReference.renderer.perspectiveProjection$();
        }

        standardOverheadDisplay() {
            dsector.DSecSetupWindow.cameraMode = dsector.DSecSetupWindow.OVERHEAD;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        cyclicPanning() {
            dsector.DSecSetupWindow.cameraMode = dsector.DSecSetupWindow.CYCLIC_PANNING;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        playerXPerspective(playerID) {
            if (playerID < 1) {
                playerID = 2;
            }
            dsector.DSecSetupWindow.cameraMode = parseInt(playerID) + 1;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        player1Perspective() {
            dsector.DSecSetupWindow.cameraMode = dsector.DSecSetupWindow.PLAYER_1_PERSPECTIVE;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        player2Perspective() {
            dsector.DSecSetupWindow.cameraMode = dsector.DSecSetupWindow.PLAYER_2_PERSPECTIVE;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        noSound() {
            dsector.DSecSetupWindow.soundMode = dsector.DSecSetupWindow.NO_SOUND;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        simplifiedSound() {
            dsector.DSecSetupWindow.soundMode = dsector.DSecSetupWindow.SIMPLIFIED_SOUND;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        normalSound() {
            dsector.DSecSetupWindow.soundMode = dsector.DSecSetupWindow.NORMAL_SOUND;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        toggleMusic() {
            if (dsector.DSecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_OFF) {
                dsector.DSecSetupWindow.musicMode = dsector.DSecSetupWindow.MUSIC_ON;
                this.turnMusicOn();
                dsector.DSReference.dsecSetupWindow.saveOptions();
            } else if (dsector.DSecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
                dsector.DSecSetupWindow.musicMode = dsector.DSecSetupWindow.MUSIC_OFF;
                this.turnMusicOff();
                dsector.DSReference.dsecSetupWindow.saveOptions();
            }
        }

        turnMusicOn() {
            if (dsector.DSReference.dsecGame != null && dsector.DSReference.dsecGame.dsecRound != null) {
                const musicNumber = Math.floor(Math.random() * (3 - 1)) + 1;
                this.backgroundMusic = new dsector.MP3("assets/sounds/backgroundMusic" + musicNumber + ".mp3");
                this.backgroundMusic.play();
            }
        }

        turnMusicOff() {
            if (this.backgroundMusic != null) {
                this.backgroundMusic.close();
            }
        }

        toggleBackgrounds() {
            dsector.DSecSetupWindow.showBackgrounds = !dsector.DSecSetupWindow.showBackgrounds;
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }

        endRound() {
            dsector.DSReference.dsecGame.endRound();
        }
    }

    DSecPlayWindow.__static_initialized = false;
    dsector.DSecPlayWindow = DSecPlayWindow;
    DSecPlayWindow["__class"] = "dsector.DSecPlayWindow";
})(dsector || (dsector = {}));
dsector.DSecPlayWindow.__static_initialize();
