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