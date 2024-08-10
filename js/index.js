import {dsector} from "./dsjs/dsector";
import {CWSYSTEM} from "./CWS/CWSYSTEM";

async function run() {

    const triangle1 = [0, 0, 0, 1, 0, 0, 0, 1, 0]; // Flattened array for first triangle
    const triangle2 = [0, 0, 1, 1, 0, 1, 0, 1, 1]; // Flattened array for second triangle

    const result = dsector.PolygonIntersection.tri_tri_intersect(
        triangle1.slice(0, 3), triangle1.slice(3, 6), triangle1.slice(6, 9),
        triangle2.slice(0, 3), triangle2.slice(3, 6), triangle2.slice(6, 9)
    );
    console.log("Triangles intersect:", result === 1);
}
run();

// Setup robot AI IndexedDBs
const robotFiles = (["R1_Prototype.dzr", "R2_Prototype.dzr", "R3_Seeker.dzr",
    "R4_Hunter.dzr", "R5_Defender.dzr", "R6_Destroyer.dzr"]);
export const robotAIcode = new Map();

export function preloadImages(paths, callback) {
    let loaded = 0;
    paths.forEach(function (values, keys) {
        let img = new Image();
        img.src = keys;
        img.onload = onImagePreloaded;
        preImages.set(keys, img);
    });

    function onImagePreloaded() {
        loaded++;
        if (loaded === paths.length && callback) {
            callback(preImages);
        }
    }

}

export const preImages = new Map([
    ["assets/images/background.jpg", null],
    ["assets/images/dsectorPlay.jpg", null],
    ["assets/images/dsectorTitle.jpg", null],
    ["assets/images/gameEnd.jpg", null],
    ["assets/images/mediumLensFlare.jpg", null],
    ["assets/images/optionScreen.jpg", null],
    ["assets/images/robotEditing.jpg", null],
    ["assets/images/shield.jpg", null],
    ["assets/images/shopping.jpg", null],
    ["assets/images/smallLensFlare.jpg", null],
    ["assets/images/statistics.jpg", null],
    ["assets/images/tinyLensFlare.jpg", null]
]);

export function loadAI() {
    for (const fileName of robotFiles) {
        try {
            if (CWSYSTEM.CWStringTools.findIgnoreCase(fileName, ".dzr") !== -1) {
                let url = "assets/robots/" + fileName;
                CWSYSTEM.CWFileTools.readFile$str(url);
                robotAIcode.set(fileName, new CWSYSTEM.CWHashtable(url));
            }
        } catch (e) {
            console.info("Robo Error: " + e);
        }
    }
    setTimeout(() => {
        robotAIcode.forEach((values, keys) => {
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

let c2dSpace = document.createElement("canvas", {willReadFrequently: true, willWriteFrequently: true});
let myStyle = {width: "800px", height: "600px", border: "1px solid black"};

c2dSpace.id = "3dSpace";
Object.assign(c2dSpace.style, myStyle);
document.getElementById("gameWindow").appendChild(c2dSpace);

let context = document.getElementsByTagName('canvas')[0].getContext('2d', {
    willReadFrequently: true,
    willWriteFrequently: true
});
context.fillStyle = '#000000';
context.fillRect(0, 0, context.canvas.width, context.canvas.height);

// Post-loading functions and processes
{
    document.body.addEventListener("contextmenu", function (evt) {
        evt.preventDefault();
        return false;
    });

    preloadImages(preImages);
    window.preImages = preImages;
    window.robotAIcode = robotAIcode;
    let startGame = document.getElementById('start-game');
    startGame.addEventListener("click", () => {
        dsector.dsMain = new dsector.DSMain();
        new dsector.DSReference(dsector.dsMain);
        dsector.dsMain.main();
        document.getElementById("start-game").hidden = true;
    });
    // Set up touch buttons
    let up = document.getElementById("up");
    up.addEventListener("touchstart", () => {
        dsMain.userIOBuffer.addKeyPressedEvent(38);
    });
    up.addEventListener("touchend", () => {
        dsMain.userIOBuffer.addKeyReleasedEvent(38);
    });
    let down = document.getElementById("down");
    down.addEventListener("touchstart", () => {
        dsMain.userIOBuffer.addKeyPressedEvent(40);
    });
    down.addEventListener("touchend", () => {
        dsMain.userIOBuffer.addKeyReleasedEvent(40);
    });
    let left = document.getElementById("left");
    left.addEventListener("touchstart", () => {
        dsMain.userIOBuffer.addKeyPressedEvent(37);
    });
    left.addEventListener("touchend", () => {
        dsMain.userIOBuffer.addKeyReleasedEvent(37);
    });
    let right = document.getElementById("right");
    right.addEventListener("touchstart", () => {
        dsMain.userIOBuffer.addKeyPressedEvent(39);
    });
    right.addEventListener("touchend", () => {
        dsMain.userIOBuffer.addKeyReleasedEvent(39);
    });
    let c_w = document.getElementById("change-weapon");
    c_w.addEventListener("touchstart", () => dsMain.userIOBuffer.addKeyPressedEvent(13));
    c_w.addEventListener("touchend", () => dsMain.userIOBuffer.addKeyReleasedEvent(13));
    let f_w = document.getElementById("fire-weapon");
    f_w.addEventListener("touchstart", () => {
        dsMain.userIOBuffer.addKeyPressedEvent(32)
    });
    f_w.addEventListener("touchend", () => dsMain.userIOBuffer.addKeyReleasedEvent(32));

    setTimeout(() => {
        loadAI();
    }, 1000);
};