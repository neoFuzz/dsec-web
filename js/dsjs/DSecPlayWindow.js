import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * DSecPlayWindow class for managing the game play window.
 *
 * @property {CWSYSTEM.CWWindow} window the game play window.
 * @property {CWSYSTEM.CWWindow} backgroundMusic the background music window.
 * @property {number} savedX the saved x coordinate.
 * @property {number} savedY the saved y coordinate.
 * @property {number} savedW the saved width.
 * @property {number} savedH the saved height.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 * @requires CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class DSecPlayWindow {
    /**
     * Constructor for DSecPlayWindow.
     */
    constructor() {
        this.window = this.window || null;
        this.backgroundMusic = this.backgroundMusic || null;
        this.savedX = 25;
        this.savedY = 25;
        this.savedW = this.savedW || 0;
        this.savedH = this.savedH || 0;

        const screenWidth = CWSYSTEM.Global.screenResolutionX_$LI$();
        const screenHeight = CWSYSTEM.Global.screenResolutionY_$LI$();
        const safeXRes = screenWidth < 500 ? 50 : 300;

        if (screenHeight > (screenWidth - safeXRes)) {
            this.savedW = screenWidth - safeXRes;
            this.savedH = Math.round(this.savedW * 0.75);
        } else {
            this.savedH = screenHeight - 100;
            this.savedW = Math.round(this.savedH * 4 / 3);
        }

        this.create();
        this.window.centerWithinDesktop();
        this.destroy();

        if (dsector.DSReference.dsecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
            this.turnMusicOn();
        }
    }

    /**
     * Static initializer for DSecPlayWindow.
     * @private
     */
    static __static_initialize() {
        if (!DSecPlayWindow.__static_initialized) {
            DSecPlayWindow.__static_initialized = true;
            DSecPlayWindow.__static_initializer_0();
        }
    }

    /**
     * Get the rendering height.
     * @returns {number} The rendering height.
     */
    static renderingHeight_$LI$() {
        DSecPlayWindow.__static_initialize();
        return DSecPlayWindow.renderingHeight;
    }

    /**
     * Static initializer method.
     * @private
     */
    static __static_initializer_0() {
        DSecPlayWindow.renderingHeight = CWSYSTEM.Global.screenResolutionY;
    }

    /**
     * Check if the window is created.
     * @returns {boolean} True if the window is created, false otherwise.
     */
    isCreated() {
        return this.window != null;
    }

    /**
     * Toggle the creation status of the window.
     */
    toggleCreated() {
        if (this.isCreated()) {
            this.destroy();
        } else {
            this.create();
        }
    }

    /**
     * Create the play window.
     */
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
        if (dsector.DSReference.dsecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
            this.turnMusicOn();
        }
        if (dsector.DSReference.dsecPlayWindow != null) {
            CWSYSTEM.Debug.println("PlayWindow Created");
        }
    }

    /**
     * Destroy the play window.
     */
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

    /**
     * Draw the play window.
     */
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
                CWSYSTEM.Global.viewWindowMaxHeight_$LI$(), "DSW", CWSYSTEM.CWWindowStyles.SQUARE_RESIZE, null,
                this.savedX, this.savedY, this.savedW, this.savedH, true);
            this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__black()));
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

    /**
     * Update the window rendering.
     */
    update() {
        dsector.DSReference.renderer.perspectiveProjection$();
    }

    /**
     * Set standard overhead display mode.
     */
    standardOverheadDisplay() {
        dsector.DSReference.dsecSetupWindow.cameraMode = dsector.DSecSetupWindow.OVERHEAD;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set cyclic panning display mode.
     */
    cyclicPanning() {
        dsector.DSReference.dsecSetupWindow.cameraMode = dsector.DSecSetupWindow.CYCLIC_PANNING;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set the camera to chosen player perspective mode.
     * @param {number} pid - The ID of the player.
     */
    playerXPerspective(pid) {
        if (pid < 1) {
            pid = 2;
        }
        dsector.DSReference.dsecSetupWindow.cameraMode = parseInt(pid) + 1;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set the camera to player 1 perspective mode.
     */
    player1Perspective() {
        dsector.DSReference.dsecSetupWindow.cameraMode = dsector.DSecSetupWindow.PLAYER_1_PERSPECTIVE;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set the camera to player 2 perspective mode.
     */
    player2Perspective() {
        dsector.DSReference.dsecSetupWindow.cameraMode = dsector.DSecSetupWindow.PLAYER_2_PERSPECTIVE;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set no sound mode.
     */
    noSound() {
        dsector.DSReference.dsecSetupWindow.soundMode = dsector.DSecSetupWindow.NO_SOUND;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set simplified sound mode.
     */
    simplifiedSound() {
        dsector.DSReference.dsecSetupWindow.soundMode = dsector.DSecSetupWindow.SIMPLIFIED_SOUND;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Set normal sound mode.
     */
    normalSound() {
        dsector.DSReference.dsecSetupWindow.soundMode = dsector.DSecSetupWindow.NORMAL_SOUND;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * Toggle music on or off.
     */
    toggleMusic() {
        if (dsector.DSReference.dsecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_OFF) {
            dsector.DSReference.dsecSetupWindow.musicMode = dsector.DSecSetupWindow.MUSIC_ON;
            this.turnMusicOn();
            dsector.DSReference.dsecSetupWindow.saveOptions();
        } else if (dsector.DSReference.dsecSetupWindow.musicMode === dsector.DSecSetupWindow.MUSIC_ON) {
            dsector.DSReference.dsecSetupWindow.musicMode = dsector.DSecSetupWindow.MUSIC_OFF;
            this.turnMusicOff();
            dsector.DSReference.dsecSetupWindow.saveOptions();
        }
    }

    /**
     * Turn music on.
     */
    turnMusicOn() {
        if (dsector.DSReference?.dsecGame?.dsecRound) {
            const musicNumber = Math.floor(Math.random() * (3 - 1)) + 1;
            this.backgroundMusic = new dsector.MP3("assets/sounds/backgroundMusic" + musicNumber + ".mp3");
            this.backgroundMusic.play();
        }
    }

    /**
     * Turn music off.
     */
    turnMusicOff() {
        if (this.backgroundMusic != null) {
            this.backgroundMusic.close();
        }
    }

    /**
     * Toggle the display of backgrounds.
     */
    toggleBackgrounds() {
        dsector.DSReference.dsecSetupWindow.showBackgrounds = !dsector.DSReference.dsecSetupWindow.showBackgrounds;
        dsector.DSReference.dsecSetupWindow.saveOptions();
    }

    /**
     * End the current round.
     */
    endRound() {
        dsector.DSReference.dsecGame.endRound();
    }

    /**
     * Static variable to determine class initialization.
     *
     * @type {boolean}
     * @private
     */
    static __static_initialized = false;
}