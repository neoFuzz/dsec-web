/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWFont {
        constructor(str) {
            this.characters = new Map();
            this.loadFont(str);
        }

        getCharacter(character) {
            const cwCharacter = this.characters.get(character);
            return cwCharacter != null ? cwCharacter : this.symbolForNotFound();
        }

        symbolForNotFound() {
            return this.characters.get("null");
        }

        notInstalled() {
            return this.characters == null;
        }

        /** Load font files in to memory.
         *
         * **NOTE:** font file line ending should be in Unix format and the last character in the file must be a '.' period.
         * Check there is not a 'new line' at the end of the file as this causes an error and the file will not load.
         * @param {URL} fileName URL to load the file from
         * */
        async loadFont(fileName) {
            const bytea = 32;
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
            })([bytea, bytea]);

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

            // Line ending processor
            fileData = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(fileData, "\r", "\n");
            fileData = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(fileData, "\n\n", "\n");
            fileData = fileData.split("\n");

            // Process fileData and make the character map
            let iterator = 0;
            while (true) {
                let chrBuffer;
                try {
                    chrBuffer = fileData[iterator++];
                } catch (e) {
                    return;
                }
                if (chrBuffer === null || chrBuffer === undefined) {
                    break;
                }
                let hBbuffer;
                try {
                    hBbuffer = fileData[iterator++];
                } catch (e) {
                    return;
                }
                if (hBbuffer === null || hBbuffer === undefined) {
                    break;
                }
                let intBuffer;
                try {
                    intBuffer = parseInt(hBbuffer);
                } catch (e) {
                    CWSYSTEM.Debug.error("Bad format in " + fileName + ", symbol \'" + chrBuffer + "\'. Line height \'" + hBbuffer + "\' is not an integer.");
                    this.characters = null;
                    return;
                }
                let i = 0;
                let r = 0;
                let s = 0;
                let m;
                let n;
                for (n = 0; n < bytea; ++n) {
                    let chars1 = ([]);
                    try {
                        chars1 = fileData[iterator++];
                    } catch (e) {
                        CWSYSTEM.Debug.println("chars1 error");
                        return;
                    }
                    if (n === 0) {
                        r = chars1.length;
                    }
                    //if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(chars1[0]) === '.'.charCodeAt(0)) {
                    if (chars1[0] === '.' || chars1 === "") {
                        s = i;
                        break;
                    }
                    for (m = 0; m < r; ++m) {
                        chars[i][m] = chars1[m];
                    }
                    ++i;
                }
                if (n === bytea) {
                    CWSYSTEM.Debug.error("Error FA1: loading font " + fileName +
                        ", symbol '" + chrBuffer + "'. Size exceeds " + bytea + ".");
                    this.characters = null;
                    return;
                }
                const cwc = new CWSYSTEM.CWCharacter(r, s, intBuffer);
                const bitmap = cwc.bitmap;
                for (i = 0; i < s; ++i) {
                    for (m = 0; m < r; ++m) {
                        bitmap[s - i - 1][m] = chars[i][m];
                    }
                }
                this.characters.set(chrBuffer, cwc);
            }
        }

        fontTest(args) {
            args = args.split(" ");
            if (args.length < 2) {
                CWSYSTEM.Debug.println("To test characters, use the following:\n" +
                    "new CWFont file [symbol] {..symbol}\n\nFor example: new CWFont FixedWidthSmall.jcf a b c");
                return 1;
            }

            let cwFont = this;
            let m = 0;
            let plot = 2560;
            let c = document.getElementById("myCanvas");
            let ctx = c.getContext("2d");
            let imgData = ctx.createImageData(CWSYSTEM.Global.screenResolutionX_$LI$(),
                CWSYSTEM.Global.screenResolutionY_$LI$());

            for (let i = 0; i < args.length; ++i) {
                if (cwFont.notInstalled()) {
                    CWSYSTEM.Debug.println("An error with the font installation was caught successfully using the notInstalled() method");
                    return 1;
                } else {
                    let character = cwFont.getCharacter(args[i]);
                    if (character == null) {
                        CWSYSTEM.Debug.println("\nCharacter '" + args[i] + "' not covered in " + args[0]);
                    } else {
                        CWSYSTEM.Debug.println("\nBitmap for the letter '" + args[i] + "', height " + character.lineHeight + ":");
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
        }
    }

    CWSYSTEM.CWFont = CWFont;
    CWFont["__class"] = "CWSYSTEM.CWFont";
})(CWSYSTEM || (CWSYSTEM = {}));
