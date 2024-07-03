/**/
(function (dsector) {
    /**
     * @extends CWSYSTEM.CWSReference
     * @description Represents the main reference class for the DSector game.
     * @class DSReference
     * @memberof dsector
     */
    class DSReference extends CWSYSTEM.CWSReference {
        /**
         * @constructor
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
            let url = "assets/sounds/";
            let sounds = ["angleMovement.wav",
                "angleMovement2.wav",
                "beamLaser2.wav",
                "compressionDoor.wav",
                "controlRoom.mp3",
                "controlRoom.wav",
                "debrisExplosion1.wav",
                "debrisExplosion2.wav",
                "forwardMovement.wav",
                "jewelDestroyed.wav",
                "largeCompressionDoor.wav",
                "largeExplosion.wav",
                "laserMovement.wav",
                "mediumExplosion.wav",
                "missileFailed.wav",
                "powerLaser.wav",
                "powerLaser2.wav",
                "returnToZoneWarning.wav",
                "roundEndWarning.wav",
                "shieldActive.wav",
                "shieldDeflection.wav",
                "shieldSwitchOff.wav",
                "shieldSwitchOn.wav",
                "smallExplosion.wav",
                "teleport.wav",
                "upgradeSound.wav"];

            sounds.forEach(file => {
                DSReference.cwSound.loadSound(url + file)
                    .then(buffer => DSReference.cwSound.cachedAudioClips.set(file, buffer));

            });

        }
    }

    /** The main DSector game object
     * @type {Object}  */
    DSReference.dsMain = null;
    /** The game scene
     * @type {dsector.Scene} */
    DSReference.scene = null;
    /** The renderer
     * @type {dsector.Renderer} */
    DSReference.renderer = null;
    /** The interface processes
     * @type {dsector.DSInterfaceProcesses} */
    DSReference.interfaceProcesses = null;
    /** The model loader
     * @type {dsector.ModelLoader} */
    DSReference.modelLoader = null;
    /** The setup window
     * @type {dsector.DSecSetupWindow} */
    DSReference.dsecSetupWindow = null;
    /** The play window
     * @type {dsector.DSecPlayWindow} */
    DSReference.dsecPlayWindow = null;
    /** The main setup window
     * @type {dsector.DSecMainSetupWindow} */
    DSReference.dsecMainSetupWindow = null;
    /** The game object
     * @type {dsector.DSecGame} */
    DSReference.dsecGame = null;
    /** The missile manager
     * @type {dsector.DSecMissileManager} */
    DSReference.dsecMissileManager = null;
    /** The pre-built weapon specifications
     * @type {dsector.PreBuiltWeaponSpecifications} */
    DSReference.preBuiltWeaponSpecifications = null;
    /** The players status window
     * @type {dsector.PlayersStatusWindow} */
    DSReference.playersStatusWindow = null;
    /** The shopping screen
     * @type {dsector.DSecShoppingScreen} */
    DSReference.dsecShoppingScreen = null;
    /** The scoreboard
     * @type {dsector.DSecScoreboard} */
    DSReference.dsecScoreboard = null;
    /** The robot chooser window
     * @type {dsector.DSecRobotChooserWindow} */
    DSReference.dsecRobotChooserWindow = null;
    /** The item description window
     * @type {dsector.DSecItemDescriptionWindow} */
    DSReference.dsecItemDescriptionWindow = null;
    /** The robot summary window
     * @type {dsector.RobotSummaryWindow} */
    DSReference.robotSummaryWindow = null;
    /** The robot sensors illustration window
     *  @type {dsector.RobotSensorsIllustrationWindow} */
    DSReference.robotSensorsIllustrationWindow = null;
    /**  The robot IO window
     * @type {dsector.RobotIOWindow} */
    DSReference.robotIOWindow = null;
    /**  The save game window
     * @type {dsector.DSecSaveGameWindow} */
    DSReference.dsecSaveGameWindow = null;
    /**  The load game window
     * @type {dsector.DSecLoadGameWindow} */
    DSReference.dsecLoadGameWindow = null;
    /** The title page
     * @type {dsector.DSecTitlePage}  */
    DSReference.dsecTitlePage = null;
    /** The gamepad utilities
     * @type {dsector.GamePadUtils} */
    DSReference.jsu = null;
    /** The 3D model matrix
     * @type {Object}  */
    DSReference.model3DMatrix = null;

    dsector.DSReference = DSReference;
    DSReference["__class"] = "dsector.DSReference";
})(dsector || (dsector = {}));
