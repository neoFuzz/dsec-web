/* Re-written from Java */

var CWSYSTEM;
(function (CWSYSTEM) {
    class CWGraphics {
        constructor() {
            if (this.IMAGE_WIDTH === undefined) {
                this.IMAGE_WIDTH = 0;
            }
            if (this.IMAGE_HEIGHT === undefined) {
                this.IMAGE_HEIGHT = 0;
            }
        }

        /** Function that can process PNG picture data in to usable graphics data for the renderer.
         * Function is actually empty.
         * @param {Image} bufferedImage
         * @return {Image}
         * @deprecated
         */
        static processPNG(bufferedImage) {
            return bufferedImage;
        }

        /** Convert {@link ScreenData} in to {@link ImageData}.
         * @param {ScreenData} sd CWSYSTEM.ScreenData object.
         * @return {ImageData} New ImageData object. */
        static convertScreenDataToBufferedImage(sd) {
            let canvas = new OffscreenCanvas(
                CWSYSTEM.Global.screenResolutionX_$LI$(), CWSYSTEM.Global.screenResolutionY_$LI$());
            let context = canvas.getContext('2d', {willReadFrequently: true, willWriteFrequently: true});
            let imgData = context.createImageData(sd.width, sd.height);

            // Screen data loop
            let n = 0;
            for (let k = 0; k < sd.height; ++k) {
                for (let l = 0; l < sd.width; ++l) {
                    // using getColorRGB produces a useful result, RGBA is just all white
                    let pixel = CWSYSTEM.FastColorUtilities.getColorRGB(sd.point[k][l]);
                    imgData.data[n++] = pixel.red;
                    imgData.data[n++] = pixel.green;
                    imgData.data[n++] = pixel.blue;
                    imgData.data[n++] = pixel.alpha;
                }
            }
            return imgData;
        }

        static setDisplayModeForAllDevices(window, width, height, bitDepth, refreshRate) {
            return true;
        }

        static setDisplayModeForDefaultDevice(window, width, height, bitDepth, refreshRate) {
            return "";
        }

        static defaultDisplayMode() {
            return "";
        }

        renderImage(screenData, filename, w, h) {
            CWSYSTEM.Debug.println("Loading image '" + filename + "'");
            let bufferedImage = null;
            let checked = false;

            const reader = new FileReader();
            reader.onloadend = () => {
                bufferedImage = reader.result;
            };
            (async () => {
                const response = await fetch(filename);
                const imageBlob = await response.blob();
                reader.readAsDataURL(imageBlob);
            })();

            try {
                let canvas = new OffscreenCanvas(
                    CWSYSTEM.Global.screenResolutionX_$LI$(), CWSYSTEM.Global.screenResolutionY_$LI$());
                let context = canvas.getContext('2d',
                    {willReadFrequently: true, willWriteFrequently: true});
                context.drawImage(bufferedImage, 0, 0, bufferedImage.width, bufferedImage.height);
                bufferedImage = context.getImageData(0, 0, bufferedImage.width, bufferedImage.height);
                checked = true;
            } catch (e) {
                CWSYSTEM.Debug.println("renderImage Exception: " + e)
            }

            if (checked) {
                let intArr;
                try {
                    intArr = bufferedImage.data;
                } catch (e) {
                    return;
                }

                let imageHeight = bufferedImage.height;
                let imageWidth = bufferedImage.width;
                this.IMAGE_HEIGHT = imageHeight;
                this.IMAGE_WIDTH = imageWidth;
                if (screenData != null) {
                    let calcH = 0;
                    let calcV = 0;
                    let bufferedWidth = imageWidth;
                    let bufferedHeight = imageHeight;
                    if (w < 0) {
                        calcH = -w;
                    }

                    if (h < 0) {
                        calcV = -h;
                    }

                    if (w + imageWidth > screenData.width) {
                        bufferedWidth = screenData.width - w;
                    }

                    if (h + imageHeight > screenData.height) {
                        bufferedHeight = screenData.height - h;
                    }

                    for (let i = calcV; i < bufferedHeight; ++i) {
                        for (let j = calcH; j < bufferedWidth; ++j) {
                            screenData.point[i + h][j + w] = intArr[i * imageWidth + j] + -16777216;
                        }
                    }
                }
            } else {
                this.IMAGE_WIDTH = 0;
                this.IMAGE_HEIGHT = 0;
            }
        }

        readJpgFileToBase64(url) {
            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = () => reject(new Error('Failed to read image'));
                        reader.readAsDataURL(blob);
                    })
                    .catch(error => reject(error));
            });
        }

        /** Returns the specified Image from the preloaded images as ScreenData object
         * @param {string} fileName
         * @requires CWSYSTEM.ScreenData */
        getJPG(fileName) { // change to JS image preload in loader.js
            let o; // ScreenData
            let bufferedImage = preImages.get(fileName); // preloaded images
            let intArray = ([]);
            let checkmark = false;

            try {
                const canvas = new OffscreenCanvas(bufferedImage.width, bufferedImage.height);
                let context = canvas.getContext('2d',
                    {willReadFrequently: true, willWriteFrequently: true});
                context.drawImage(bufferedImage, 0, 0, bufferedImage.width, bufferedImage.height);
                bufferedImage = context.getImageData(0, 0, bufferedImage.width, bufferedImage.height);
                checkmark = true;
            } catch (e) {
                CWSYSTEM.Debug.println("getJPG Exception: " + e)
            }

            if (checkmark) {
                try {
                    intArray = bufferedImage.data;
                } catch (e) {
                    return null;
                }
                let imageHeight = bufferedImage.height;
                let imageWidth = bufferedImage.width;
                o = new CWSYSTEM.ScreenData(imageWidth, imageHeight, "JPG image with path '" + fileName + "'");

                let imageData = ([]);
                for (let i = 0; i < intArray.length; i += 4) {
                    imageData.push(CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        intArray[i + 0], intArray[i + 1], intArray[i + 2], intArray[i + 3]));
                }
                for (let i = 0; i < imageHeight; ++i) {
                    for (let j = 0; j < imageWidth; ++j) {
                        o.point[i][j] = imageData[i * imageWidth + j] + -16777216;
                    }
                }
            }
            return o;
        }

        JPGSize(fileName) {
            const screenData = dsector.DSReference.graphics.getJPG(fileName);
            if (screenData != null) {
                let map = new Map();
                map.set("width", "" + screenData.width);
                map.set("height", "" + screenData.height);
                return map;
            }
            return null;
        }

        saveScreenDataAsJPG(screenData, filePath, type) {
        }

        saveImageAsJPG(bufferedImage, filename, type) {
        }

        createAntialiasedScreenData(screenData) {
            const sdBuffer = new CWSYSTEM.ScreenData((screenData.width / 2 | 0), (screenData.height / 2 | 0),
                screenData.description + " (anti-aliased)");
            for (let i = 0; i < sdBuffer.height; ++i) {
                for (let j = 0; j < sdBuffer.width; ++j) {
                    const value1 = j * 2;
                    const value2 = i * 2;
                    const color1 = screenData.point[value2][value1];
                    const color2 = screenData.point[value2][value1 + 1];
                    const color3 = screenData.point[value2 + 1][value1];
                    const pPoint = screenData.point[value2 + 1][value1 + 1];
                    const red =
                        ((CWSYSTEM.FastColorUtilities.red(color1) + CWSYSTEM.FastColorUtilities.red(color2) +
                            CWSYSTEM.FastColorUtilities.red(color3) + CWSYSTEM.FastColorUtilities.red(pPoint)) / 4 | 0);
                    const green =
                        ((CWSYSTEM.FastColorUtilities.green(color1) + CWSYSTEM.FastColorUtilities.green(color2) +
                            CWSYSTEM.FastColorUtilities.green(color3) + CWSYSTEM.FastColorUtilities.green(pPoint)) / 4 | 0);
                    const blue =
                        ((CWSYSTEM.FastColorUtilities.blue(color1) + CWSYSTEM.FastColorUtilities.blue(color2) +
                            CWSYSTEM.FastColorUtilities.blue(color3) + CWSYSTEM.FastColorUtilities.blue(pPoint)) / 4 | 0);
                    sdBuffer.point[i][j] = CWSYSTEM.FastColorUtilities.colorWithGammaAdjustment(red, green, blue);
                }
            }
            return sdBuffer;
        }
    }

    CWSYSTEM.CWGraphics = CWGraphics;
    CWGraphics["__class"] = "CWSYSTEM.CWGraphics";
})(CWSYSTEM || (CWSYSTEM = {}));
