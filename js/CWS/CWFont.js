import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * This class is responsible for loading and managing font data.
 *
 * @property {Map} characters - A map containing the characters in the font.
 * @property {number} rows - The number of rows in the font.
 * @property {number} cols - The number of columns in the font.
 * @property {number} defaultSpacing - The default spacing between characters.
 * @property {number} defaultHeight - The default height of characters.
 * @property {string} badCharacter - A string representing a bad character.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 * @requires CWSYSTEM.CWCharacter
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class CWFont {
    /**
     * Represents a font that can be used to render text on the screen.
     *
     * @param {string} str - The path to the font file.
     */
    constructor(str) {
        this.characters = new Map();
        this.rows = 7;
        this.cols = 5;
        this.defaultSpacing = 6;
        this.defaultHeight = 10;
        this.badCharacter = "111101111";
        this.BYTE_SIZE = 32;
        this.loadFont(str);
    }

    /**
     * Retrieves a character from the font.
     *
     * @param {string} char - The character to retrieve.
     * @returns {CWSYSTEM.CWCharacter|null} The CWCharacter object for the specified character, or null if not found.
     */
    getCharacter(char) {
        const cwChar = this.characters.get(char);
        return cwChar != null ? cwChar : this.symbolForNotFound();
    }

    /**
     * Provides a default symbol for characters that are not found in the font.
     *
     * @returns {CWSYSTEM.CWCharacter} The CWCharacter object for the default symbol.
     */
    symbolForNotFound() {
        return this.characters.get("null");
    }

    /**
     * Checks if the font is not installed.
     *
     * @returns {boolean} True if the font is not installed, false otherwise.
     */
    notInstalled() {
        return this.characters == null;
    }

    /**
     * Loads the font data from a file.
     * <p>
     * **NOTE:** font file line ending should be in Unix format and the last character in the file must be a '.' period.
     * Check there is not a 'new line' at the end of the file as this causes an error and the file will not load.
     * </p>
     *
     * @param {URL} fileName URL to load the file from
     * @async
     * @returns {Promise<void>} A promise that resolves when the font is loaded.
     */
    async loadFont(fileName) {
        const chars = (function (dims) {
            let allocate = function (dims) {
                if (dims.length === 0) {
                    return null;
                } else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            };
            return allocate(dims);
        })([this.BYTE_SIZE, this.BYTE_SIZE]);

        // Location to store font data from file
        let fileData;

        try {
            // Get the font file and put it in memory
            CWSYSTEM.Debug.println("Loading Font file: " + fileName);
            await fetch(fileName).then(response => response.text()).then(text => {
                fileData = text;
            });
        } catch (e) {
            CWSYSTEM.Debug.error("Font file not found: " + fileName);
            this.characters = null;
            return;
        }

        fileData = CWFont.preprocessFontData(fileData);

        // Process fileData and make the character map
        let iterator = 0;
        while (true) {
            let chrBuffer;
            try {
                chrBuffer = fileData[iterator++];
            } catch (e) {
                return;
            }
            if (this.notNullUndefined(chrBuffer)) {
                break;
            }
            let hBbuffer;
            try {
                hBbuffer = fileData[iterator++];
            } catch (e) {
                return;
            }
            if (this.notNullUndefined(hBbuffer)) {
                break;
            }
            let intBuffer;
            try {
                intBuffer = parseInt(hBbuffer);
            } catch (e) {
                CWSYSTEM.Debug.error("Bad format in " + fileName + ", symbol '" + chrBuffer +
                    "'. Line height '" + hBbuffer + "' is not an integer.");
                this.characters = null;
                return;
            }
            let r = 0;
            let s = 0;
            const __ret = this.procIT(fileData, iterator, r, s, chars, fileName, chrBuffer);
            iterator = __ret.iterator;
            r = __ret.r;
            s = __ret.s;
            if (__ret.state === 1) return;
            const cwc = new CWSYSTEM.CWCharacter(r, s, intBuffer);
            cwc.bitmap = CWFont.processBitmap(s, r, cwc.bitmap, chars);
            this.characters.set(chrBuffer, cwc);
        }
    }

    procIT(fileData, iterator, r, s, chars, fileName, chrBuffer) {
        let n;
        let m;
        let i = 0;
        let state = 0;
        for (n = 0; n < this.BYTE_SIZE; ++n) {
            let chars1 = ([]);
            try {
                chars1 = fileData[iterator++];
            } catch (e) {
                CWSYSTEM.Debug.println("chars1 error");
                state = 1;
                return {iterator, r, s, state};
            }
            if (n === 0) {
                r = chars1.length;
            }
            if (chars1[0] === '.' || chars1 === "") {
                s = i;
                break;
            }
            for (m = 0; m < r; ++m) {
                chars[i][m] = chars1[m];
            }
            ++i;
        }
        if (n === this.BYTE_SIZE) {
            CWSYSTEM.Debug.error("Error FA1: loading font " + fileName +
                ", symbol '" + chrBuffer + "'. Size exceeds " + this.BYTE_SIZE + ".");
            this.characters = null;
            return {iterator, r, s, state};
        }
        return {iterator, r, s, state};
    }

    static processBitmap(s, r, bitmap, chars) {
        for (let i = 0; i < s; ++i) {
            for (let m = 0; m < r; ++m) {
                bitmap[s - i - 1][m] = chars[i][m];
            }
        }
        return bitmap;
    }

    notNullUndefined(b) {
        return (b === null || b === undefined);
    }

    /**
     * Line ending processor
     */
    static preprocessFontData(fileData) {
        fileData = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(fileData, "\r", "\n");
        fileData = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(fileData, "\n\n", "\n");
        return fileData.split("\n");
    }

    /**
     * Tests the font by rendering specified characters.
     *
     * @param {string} args - A string containing characters to test.
     * @returns {number} 1 if an error occurred, otherwise 0.
     */
    fontTest(args) {
        args = args.split(" "); // TODO: fix for Unicode characters
        if (args.length < 2) {
            CWSYSTEM.Debug.println("To test characters, use the following:\n" +
                'new CWFont(file).fontTest(..symbols)\n\n' +
                'For example: new CWFont("FixedWidthSmall.jcf").fontTest("a b c")');
            return 1;
        }

        let cwFont = this;
        let m = 0;
        let plot = 2560;
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        let imgData = ctx.createImageData(CWSYSTEM.Global.screenResolutionX_$LI$(),
            CWSYSTEM.Global.screenResolutionY_$LI$());

        for (const element of args) {
            if (cwFont.notInstalled()) {
                CWSYSTEM.Debug.println("An error with the font installation was caught successfully using " +
                    "the notInstalled() method");
                return 1;
            } else {
                CWFont.performTest(cwFont, element, args, imgData, m, plot, ctx);
            }
        }
    }

    /**
     * Performs the actual testing of characters.
     *
     * @param {CWSYSTEM.CWFont} cwFont - The font object.
     * @param {string} element - The character to test.
     * @param {string[]} args - An array of characters to test.
     * @param {ImageData} imgData - The image data for rendering.
     * @param {number} m - The starting index in the image data.
     * @param {number} plot - The plot value for rendering.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    static performTest(cwFont, element, args, imgData, m, plot, ctx) {
        let character = cwFont.getCharacter(element);
        if (character == null) {
            CWSYSTEM.Debug.println("\nCharacter '" + element + "' not covered in " + args[0]);
        } else {
            CWSYSTEM.Debug.println("\nBitmap for the letter '" + element +
                "', height " + character.lineHeight + ":");
            let line = "";
            for (let j = character.height - 1; j >= 0; --j) {

                for (let k = 0; k < character.width; ++k) {
                    if (character.bitmap[j][k] === '0') {
                        line = line + "_";
                        imgData.data[m + 0] = 255;
                        imgData.data[m + 1] = 255;
                        imgData.data[m + 2] = 255;
                        imgData.data[m + 3] = 255;
                    } else {
                        line = line + "#";
                        imgData.data[m + 0] = 0;
                        imgData.data[m + 1] = 0;
                        imgData.data[m + 2] = 0;
                        imgData.data[m + 3] = 255;
                    }
                    // End of width loop process
                    plot -= 4;
                    m += 4;
                }
                // End of height loop processes
                line += "\n";
                m += plot;
                plot = 2560;
            }
            CWSYSTEM.Debug.println(line);
            let outdiv = document.createElement("div");
            outdiv.innerText = line;
            outdiv.className = "text-monospace";
            document.getElementById("font-output").appendChild(outdiv);

            CWSYSTEM.Debug.println("**** End ****");
        }
        ctx.putImageData(imgData, 0, 0);
    }
}