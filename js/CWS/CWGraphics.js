import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Class representing CWGraphics with methods to handle image processing.
 *
 * @property {number} IMAGE_WIDTH - The width of the image.
 * @property {number} IMAGE_HEIGHT - The height of the image.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class CWGraphics {
    /**
     * Constructs a new CWGraphics instance.
     */
    constructor() {
        if (this.IMAGE_WIDTH === undefined) {
            this.IMAGE_WIDTH = 0;
        }
        if (this.IMAGE_HEIGHT === undefined) {
            this.IMAGE_HEIGHT = 0;
        }
    }

    /**
     * Convert [ScreenData]{@link CWSYSTEM.ScreenData} in to {@link ImageData}.
     *
     * @param {CWSYSTEM.ScreenData} sd the CWSYSTEM.ScreenData object.
     * @returns {ImageData} New ImageData object.
     */
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

    /**
     * Sets the display mode for all devices. This method is deprecated since it is not needed in a web browser.
     *
     * @todo possible electron implementation
     * @deprecated Not used with web browsers
     * @param window The window object.
     * @param width The width of the display mode.
     * @param height The height of the display mode.
     * @param bitDepth The bit depth of the display mode.
     * @param refreshRate The refresh rate of the display mode.
     * @returns {boolean} True if the display mode was set successfully, false otherwise.
     */
    static setDisplayModeForAllDevices(window, width, height, bitDepth, refreshRate) {
        return true;
    }

    /**
     * This method is deprecated since it is not needed in a web browser.
     *
     * @todo possible electron implementation
     * @deprecated Not used with web browsers
     * @param window The window object.
     * @param width The width of the display mode.
     * @param height The height of the display mode.
     * @param bitDepth The bit depth of the display mode.
     * @param refreshRate The refresh rate of the display mode.
     * @returns {string} An empty string as it's currently deprecated.
     */
    static setDisplayModeForDefaultDevice(window, width, height, bitDepth, refreshRate) {
        return "";
    }

    /**
     * This method is deprecated since it is not needed in a web browser.
     *
     * @todo possible electron implementation
     * @deprecated Not used with web browsers
     * @returns {string} An empty string as it's currently deprecated.
     */
    static defaultDisplayMode() {
        return "";
    }

    /**
     * Renders an image on the screen.
     *
     * @param {CWSYSTEM.ScreenData} screenData The screen data.
     * @param {string} filename The filename of the image to render.
     * @param {number} w The width of the image.
     * @param {number} h The height of the image.
     */
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

    /**
     * Reads a JPG file and converts it to base64.
     *
     * @param {string} url The URL of the JPG file.
     * @returns {Promise<string>} A promise that resolves with the base64 encoded string of the image.
     */
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

    /**
     * Returns the specified Image from the preloaded images as ScreenData object.
     *
     * @param {string} fileName The name of the file to get.
     * @returns {CWSYSTEM.ScreenData} The ScreenData representation of the image.
     */
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
                imageData.push(CWSYSTEM.FastColorUtilities.colorRGBA(
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

    /**
     * Returns the size of a JPG image.
     *
     * @param {string} fileName The name of the JPG file.
     * @returns {Map<string, string>} A map containing the width and height of the image.
     */
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

    /**
     * Saves the screen data as a JPG file.
     *
     * @todo implement with Electron
     * @param {CWSYSTEM.ScreenData} screenData The screen data to save.
     * @param {string} filePath The file path to save the image to.
     * @param {string} type The file type of the image.
     */
    saveScreenDataAsJPG(screenData, filePath, type) {
        // Future feature
    }

    /**
     * Saves the buffered image as a JPG file.
     *
     * @todo implement with Electron
     * @param {Image} bufferedImage The image to save.
     * @param {string} filename The filename to save the image as.
     * @param {string} type The file type of the image.
     */
    saveImageAsJPG(bufferedImage, filename, type) {
        // future feature
    }

    /**
     * Creates an anti-aliased screen data from the given screen data.
     *
     * @param {CWSYSTEM.ScreenData} screenData The screen data to create an anti-aliased version of.
     * @returns {CWSYSTEM.ScreenData}
     */
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