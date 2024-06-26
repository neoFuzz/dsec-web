var dsector;
(function (dsector) {
    class DSReference extends CWSYSTEM.CWSReference {
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

    DSReference.dsMain = null;
    DSReference.scene = null;
    DSReference.renderer = null;
    DSReference.interfaceProcesses = null;
    DSReference.modelLoader = null;
    DSReference.dsecSetupWindow = null;
    DSReference.dsecPlayWindow = null;
    DSReference.dsecMainSetupWindow = null;
    DSReference.dsecGame = null;
    DSReference.dsecMissileManager = null;
    DSReference.preBuiltWeaponSpecifications = null;
    DSReference.playersStatusWindow = null;
    DSReference.dsecShoppingScreen = null;
    DSReference.dsecScoreboard = null;
    DSReference.dsecRobotChooserWindow = null;
    DSReference.dsecItemDescriptionWindow = null;
    DSReference.robotSummaryWindow = null;
    DSReference.robotSensorsIllustrationWindow = null;
    DSReference.robotIOWindow = null;
    DSReference.dsecSaveGameWindow = null;
    DSReference.dsecLoadGameWindow = null;
    DSReference.dsecTitlePage = null;
    DSReference.jsu = null;
    DSReference.model3DMatrix = null;
    dsector.DSReference = DSReference;
    DSReference["__class"] = "dsector.DSReference";
})(dsector || (dsector = {}));
