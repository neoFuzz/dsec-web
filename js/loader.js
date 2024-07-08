/**
 * loader.js utility script to load the dsector game
 *
 * Loads all the JS files in the order they are required.
 *
 * @name       "loader.js"
 * @since      1.0.0
 * @access     public
 * @global
 *
 * @memberof dsector
 *
 * @author Justin Condello
 * @link https://none.yet
 * @license GPLv3
 */

/** Simple function to assist in preloading scripts
 * @param {string} url URL of the script to be loaded */
function loadScript(url) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}
let dsector;

/* Utility Classes */
loadScript('js/dsjs/LightManager.js');
loadScript('js/dsjs/ModelLoader.js');
loadScript('js/dsjs/ModelFolder.js');
loadScript('js/dsjs/Matrix4f.js');
loadScript('js/dsjs/Model3DMatrix.js');
loadScript('js/dsjs/Navigation.js');
loadScript('js/dsjs/Polygon.js');
loadScript('js/dsjs/PolygonGroup.js');
loadScript('js/dsjs/PolygonGroupRepresentation.js');
loadScript('js/dsjs/PolygonIntersection.js');
loadScript('js/dsjs/PolygonIterator.js');
loadScript('js/dsjs/ColourlessPolygon.js');
loadScript('js/dsjs/PositionedModel.js');
loadScript('js/dsjs/ScreenPosition.js');
loadScript('js/dsjs/SpecialPoint.js');
loadScript('js/dsjs/VectorInR3.js');
loadScript('js/dsjs/Vertex.js');
loadScript('js/dsjs/Vertex2D.js');
loadScript('js/dsjs/TimedInstruction.js');

/* Game Utility Classes */
loadScript('js/dsjs/Global.js');
loadScript('js/dsjs/DSReference.js');
loadScript('js/dsjs/Environment.js');
loadScript('js/dsjs/Scene.js');
loadScript('js/dsjs/DSecKeyboardLayout.js');
loadScript('js/dsjs/Joystick.js');
loadScript('js/dsjs/GamePadUtils.js');
loadScript('js/dsjs/InbuiltLight.js');
loadScript('js/dsjs/DSInterfaceProcesses.js');
loadScript('js/dsjs/Keyboard.js');
loadScript('js/dsjs/MP3.js');

/* Game Element Classes*/
loadScript('js/dsjs/DSecBackgroundConfiguration.js');
loadScript('js/dsjs/DSecBrain.js');
loadScript('js/dsjs/DSecJewel.js');
loadScript('js/dsjs/DSecPlayer.js');
loadScript('js/dsjs/DSecGame.js');
loadScript('js/dsjs/DSecTeam.js');
loadScript('js/dsjs/DSecFadingLight.js');
loadScript('js/dsjs/DSecMissile.js');
loadScript('js/dsjs/DSecMissileManager.js');
loadScript('js/dsjs/DSecRound.js');
loadScript('js/dsjs/DSecSpecialEffect.js');
loadScript('js/dsjs/IntersectingDSecObject.js');
loadScript('js/dsjs/WeaponPort.js');
loadScript('js/dsjs/WeaponSpecification.js');
loadScript('js/dsjs/PreBuiltWeaponSpecifications.js');
loadScript('js/dsjs/RobotSpecification.js');
loadScript('js/dsjs/TankSpecification.js');

/* GUI Classes */
loadScript('js/dsjs/Renderer.js');
loadScript('js/dsjs/DSecTitlePage.js');
loadScript('js/dsjs/DSecLoadGameWindow.js');
loadScript('js/dsjs/DSecMainSetupWindow.js');
loadScript('js/dsjs/DSecPlayWindow.js');
loadScript('js/dsjs/DSecRobotChooserWindow.js');
loadScript('js/dsjs/DSecSaveGameWindow.js');
loadScript('js/dsjs/DSecScoreboard.js');
loadScript('js/dsjs/DSecSetupWindow.js');
loadScript('js/dsjs/DSecShoppingScreen.js');
loadScript('js/dsjs/DSecItemDescriptionWindow.js');
loadScript('js/dsjs/PlayersStatusWindow.js');
loadScript('js/dsjs/RobotIOWindow.js');
loadScript('js/dsjs/RobotSensorsIllustrationWindow.js');
loadScript('js/dsjs/RobotSummaryWindow.js');

/* Load main class last */
loadScript('js/dsjs/DSMain.js');

/** Use powershell script to create preload list
 *  `foreach($item in $list) {write-host ('["assets/images/{0}",null],' -f $item.name)}`
 *  */
const preImages = new Map([
    ["assets/images/background.jpg",null],
    ["assets/images/dsectorPlay.jpg",null],
    ["assets/images/dsectorTitle.jpg",null],
    ["assets/images/gameEnd.jpg",null],
    ["assets/images/mediumLensFlare.jpg",null],
    ["assets/images/optionScreen.jpg",null],
    ["assets/images/robotEditing.jpg",null],
    ["assets/images/shield.jpg",null],
    ["assets/images/shopping.jpg",null],
    ["assets/images/smallLensFlare.jpg",null],
    ["assets/images/statistics.jpg",null],
    ["assets/images/tinyLensFlare.jpg",null]
]);

function preloadImages(paths, callback) {
    let loaded = 0;
    paths.forEach(function (values,keys) {
        let img = new Image();
        img.src = keys;
        img.onload = onImagePreloaded;
        preImages.set(keys,img);
    });

    function onImagePreloaded() {
        loaded++;
        if (loaded === paths.length && callback) {
            callback(preImages);
        }
    }
}

// Setup robot AI IndexedDBs
const robotFiles = (["R1_Prototype.dzr", "R2_Prototype.dzr", "R3_Seeker.dzr",
    "R4_Hunter.dzr", "R5_Defender.dzr", "R6_Destroyer.dzr"]);
const robotAIcode = new Map();
function loadAI() {
    for (const fileName of robotFiles) {
        try {
            if (CWSYSTEM.CWStringTools.findIgnoreCase(fileName, ".dzr") !== -1) {
                let url = "assets/robots/" + fileName;
                CWSYSTEM.CWFileTools.readFile$str(url);
                robotAIcode.set(fileName,new CWSYSTEM.CWHashtable(url));
            }
        } catch (e) {
            console.info("Robo Error: " + e);
        }
    }
    setTimeout(() => {
        robotAIcode.forEach((values,keys)=>{
          values.readHashtableFromFile();
        });
        console.info("AI code preloaded");
        try {
            document.getElementById("start-game").style.display = "block";
        } catch (e) {
            console.info(e);
        }
    }, 1000);
}