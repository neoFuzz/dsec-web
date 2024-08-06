import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * @description Represents the main reference class for the DSector game. Creates the base objects required to run the game.
 *
 * @property {dsector.GamePadUtils} jsu - Instance of GamePadUtils class.
 * @property {dsector.DSMain} dsMain - Main DSector game object.
 * @property {dsector.DSInterfaceProcesses} interfaceProcesses - Instance of DSInterfaceProcesses class.
 * @property {dsector.Renderer} renderer - Instance of Renderer class.
 * @property {dsector.ModelLoader} modelLoader - Instance of ModelLoader class.
 * @property {dsector.PreBuiltWeaponSpecifications} preBuiltWeaponSpecifications - Instance of PreBuiltWeaponSpecifications class.
 * @property {dsector.Scene} scene - Instance of Scene class.
 * @property {dsector.DSecSetupWindow} dsecSetupWindow - Instance of DSecSetupWindow class.
 * @property {dsector.DSecPlayWindow} dsecPlayWindow - Instance of DSecPlayWindow class.
 * @property {dsector.DSecMainSetupWindow} dsecMainSetupWindow - Instance of DSecMainSetupWindow class.
 * @property {dsector.DSecMissileManager} dsecMissileManager - Instance of DSecMissileManager class.
 * @property {dsector.DSecGame} dsecGame - Instance of DSecGame class.
 * @property {dsector.PlayersStatusWindow} playersStatusWindow - Instance of PlayersStatusWindow class.
 * @property {dsector.DSecShoppingScreen} dsecShoppingScreen - Instance of DSecShoppingScreen class.
 * @property {dsector.DSecScoreboard} dsecScoreboard - Instance of DSecScoreboard class.
 * @property {dsector.DSecRobotChooserWindow} dsecRobotChooserWindow - Instance of DSecRobotChooserWindow class.
 * @property {dsector.DSecItemDescriptionWindow} dsecItemDescriptionWindow - Instance of DSecItemDescriptionWindow class.
 * @property {dsector.RobotSummaryWindow} robotSummaryWindow - Instance of RobotSummaryWindow class.
 * @property {dsector.RobotIOWindow} robotIOWindow - Instance of RobotIOWindow class.
 * @property {dsector.RobotSensorsIllustrationWindow} robotSensorsIllustrationWindow - Instance of RobotSensorsIllustrationWindow class.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 * @extends CWSYSTEM.CWSReference
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class DSReference extends CWSYSTEM.CWSReference {
    /**
     * Constructs a new instance of the DSReference class.
     *
     * @param {Object} w - The main DSector game object.
     */
    constructor(w) {
        super();
        DSReference.jsu = new dsector.GamePadUtils();
        DSReference.dsMain = w;
        DSReference.interfaceProcesses = new dsector.DSInterfaceProcesses();
        DSReference.renderer = new dsector.Renderer(super.gui);
        DSReference.modelLoader = new dsector.ModelLoader();
        DSReference.preBuiltWeaponSpecifications = new dsector.PreBuiltWeaponSpecifications();
        DSReference.scene = new dsector.Scene();
        DSReference.dsecSetupWindow = new dsector.DSecSetupWindow();
        DSReference.dsecPlayWindow = new dsector.DSecPlayWindow();
        DSReference.dsecMainSetupWindow = new dsector.DSecMainSetupWindow();
        DSReference.dsecMissileManager = new dsector.DSecMissileManager();
        DSReference.dsecGame = new dsector.DSecGame();
        DSReference.playersStatusWindow = new dsector.PlayersStatusWindow();
        DSReference.dsecShoppingScreen = new dsector.DSecShoppingScreen();
        DSReference.dsecScoreboard = new dsector.DSecScoreboard();
        DSReference.dsecRobotChooserWindow = new dsector.DSecRobotChooserWindow();
        DSReference.dsecItemDescriptionWindow = new dsector.DSecItemDescriptionWindow();
        DSReference.robotSummaryWindow = new dsector.RobotSummaryWindow();
        DSReference.robotIOWindow = new dsector.RobotIOWindow();
        DSReference.robotSensorsIllustrationWindow = new dsector.RobotSensorsIllustrationWindow();
        DSReference.dsecSaveGameWindow = new dsector.DSecSaveGameWindow();
        DSReference.dsecLoadGameWindow = new dsector.DSecLoadGameWindow();
        DSReference.dsecTitlePage = new dsector.DSecTitlePage();

        // Load the game settings IDB
        DSReference.dsecSetupWindow.dsOptions = new CWSYSTEM.CWHashtable("dzsetup.cfg");
        DSReference.dsecSetupWindow.dsOptions.readHashtableFromFile();

        // Load sounds
        this.loadSounds();

    }

    loadSounds() {
        let url = "assets/sounds/";
        let sounds = [
            "angleMovement.wav", "angleMovement2.wav", "beamLaser2.wav", "compressionDoor.wav", "controlRoom.mp3",
            "controlRoom.wav", "debrisExplosion1.wav", "debrisExplosion2.wav", "forwardMovement.wav",
            "jewelDestroyed.wav", "largeCompressionDoor.wav", "largeExplosion.wav", "laserMovement.wav",
            "mediumExplosion.wav", "missileFailed.wav", "powerLaser.wav", "powerLaser2.wav",
            "returnToZoneWarning.wav", "roundEndWarning.wav", "shieldActive.wav", "shieldDeflection.wav",
            "shieldSwitchOff.wav", "shieldSwitchOn.wav", "smallExplosion.wav", "teleport.wav", "upgradeSound.wav"
        ];

        sounds.forEach(file => {
            DSReference.cwSound.loadSound(url + file)
                .then(buffer => DSReference.cwSound.cachedAudioClips.set(file, buffer));

        });
    }


    static get virtualScreen() {
        return CWSYSTEM.CWSReference.virtualScreen;
    }

    static get gui() {
        return CWSYSTEM.CWSReference.gui;
    }

    static get graphics() {
        return CWSYSTEM.CWSReference.graphics;
    }

    static get alertManager() {
        return CWSYSTEM.CWSReference.alertManager;
    }

    static get cwSound() {
        return CWSYSTEM.CWSReference.cwSound;
    }

    static get mouseDrag() {
        return CWSYSTEM.CWSReference.mouseDrag;
    }
}