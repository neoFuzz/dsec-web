(function (CWSYSTEM) {
    /**
     * Represents an image and its data within the CWSYSTEM.
     * Handles image rendering with various effects and transformations.
     *
     * @property {Object} parent - The parent object.
     * @property {string} nameID - The ID of the image.
     * @property {number} x - The x-coordinate of the image.
     * @property {number} y - The y-coordinate of the image.
     * @property {string} filepath - The file path of the image.
     * @property {CWSYSTEM.CWColor} transparentColor - The transparent color of the image.
     *
     * @since    1.0.0
     * @access   public
     * @class
     * @requires CWGraphics
     * @requires CWColor
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class CWImage {
        /**
         * Create a CWImage instance.
         *
         * @param {Object} parent - The parent object.
         * @param {string} nameID - The ID of the image.
         * @param {number} x - The x-coordinate of the image.
         * @param {number} y - The y-coordinate of the image.
         * @param {string} filePath - The file path of the image.
         * @param {CWSYSTEM.CWColor} transparentColor - The transparent color of the image.
         */
        constructor(parent, nameID, x, y, filePath, transparentColor) {
            this.parent = parent || null;
            this.nameID = nameID || null;
            this.x = x || 0;
            this.y = y || 0;
            this.filepath = filePath || null;
            this.transparentColor = transparentColor || null;
        }

        /**
         * Draws an image using color-derived transparency.
         *
         * @static
         * @param {string} filename - The name of the file.
         * @param {Array} pts - The array of points.
         * @param {number} chosenA - The chosen A coordinate.
         * @param {number} chosenB - The chosen B coordinate.
         * @param {CWSYSTEM.CWColor} inColor - The input color.
         * @param {number} scaleFlt - The scale factor.
         */
        static drawUsingColorDerivedTransparency(filename, pts, chosenA, chosenB, inColor, scaleFlt) {
            const screenData = (new CWSYSTEM.CWGraphics()).getJPG(filename);
            if (screenData != null) {
                const points = screenData.point;
                for (let i = 0; i < screenData.height; ++i) {
                    try {
                        let j;
                        if (inColor == null) {
                            for (j = 0; j < screenData.width; ++j) {
                                pts[chosenB + i][chosenA + j] = points[i][j];
                            }
                        } else {
                            for (j = 0; j < screenData.width; ++j) {
                                const cPoint = pts[chosenB + i][chosenA + j];
                                const pointsValue = points[i][j];
                                const red1 = CWSYSTEM.FastColorUtilities.red(cPoint);
                                const green1 = CWSYSTEM.FastColorUtilities.green(cPoint);
                                const blue1 = CWSYSTEM.FastColorUtilities.blue(cPoint);
                                const alpha1 = CWSYSTEM.FastColorUtilities.alpha(cPoint);
                                const red2 = CWSYSTEM.FastColorUtilities.red(pointsValue);
                                const green2 = CWSYSTEM.FastColorUtilities.green(pointsValue);
                                const blue2 = CWSYSTEM.FastColorUtilities.blue(pointsValue);
                                const alpha2 = CWSYSTEM.FastColorUtilities.alpha(pointsValue);
                                const blend = Math.abs(red2 - red1) +
                                    Math.abs(green2 - green1) + Math.abs(blue2 - blue1);
                                let calcBlend = (blend * scaleFlt | 0);
                                if (calcBlend > 255) {
                                    calcBlend = 255;
                                }
                                const blended = 255 - calcBlend;
                                const calcRed = ((calcBlend * red2 + blended * red1) / 256 | 0);
                                const calcGreen = ((calcBlend * green2 + blended * green1) / 256 | 0);
                                const calcBlue = ((calcBlend * blue2 + blended * blue1) / 256 | 0);
                                const alphaBlend = ((calcBlend * alpha2 + blended * alpha1) / 256 | 0);
                                pts[chosenB + i][chosenA + j] = CWSYSTEM.FastColorUtilities.colorRGBA(
                                    calcRed, calcGreen, calcBlue, alphaBlend);
                            }
                        }
                    } catch (e) {
                        console.error("Rending of CWImage out of range.");
                    }

                }
            }
        }

        /**
         * Draws an image using brightness overlay.
         *
         * @static
         * @param {CWSYSTEM.ScreenData} sd - The screen data.
         * @param {Array} points - The array of points.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {number} multi - The multiplier.
         */
        static drawUsingBrightnessOverlay(sd, points, x, y, multi) {
            if (sd != null) {
                const color1 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const color2 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const sdPoints = sd.point;
                for (let i = 0; i < sd.height; ++i) {
                    try {
                        for (let j = 0; j < sd.width; ++j) {
                            const pixelColor1 = points[y + i][x + j];
                            const pixelColor2 = sdPoints[i][j];
                            color1.setColor(pixelColor1);
                            color2.setColor(pixelColor2);
                            CWImage.overlayColorsWithAestheticSaturation(color1, color2, color3, multi);
                            points[y + i][x + j] = color3.color;
                        }
                    } catch (e) {
                        console.error("Rending of CWImage out of range.");
                    }
                }
            }
        }

        /**
         * Draws an image using brightness overlay with cropping.
         *
         * @static
         * @param {CWSYSTEM.ScreenData} sd - The screen data.
         * @param {Array} points - The array of points.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {number} multiplier - The multiplier.
         * @param {Object} minMax - The minimum and maximum coordinates.
         */
        static drawUsingBrightnessOverlayWithCropping(sd, points, x, y,
                                                      multiplier, minMax) {
            const {minX, minY, maxX, maxY} = minMax;
            if (sd != null) {
                const color1 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const color2 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__transparentBlack());
                const intArray = sd.point;
                for (let i = 0; i < sd.height; ++i) {
                    if (y + i >= minY && y + i <= maxY) {
                        let sLine = 0;
                        let width = sd.width;
                        if (x + sLine < minX) {
                            sLine = minX - x;
                        }
                        if (width + x > maxX) {
                            width = maxX - x;
                        }
                        try {
                            for (let j = sLine; j < width; ++j) {
                                const pixelColor1 = points[y + i][x + j];
                                const pixelColor2 = intArray[i][j];
                                color1.setColor$int(pixelColor1);
                                color2.setColor$int(pixelColor2);
                                CWImage.overlayColorsWithAestheticSaturation(color1, color2, color3, multiplier);
                                points[y + i][x + j] = color3.color;
                            }
                        } catch (e) {
                            console.error("Rending of CWImage out of range.");
                        }
                    }
                }
            }
        }

        /**
         * Overlays colors with aesthetic saturation.
         *
         * @static
         * @param {CWSYSTEM.CWColor} color1 - The first color.
         * @param {CWSYSTEM.CWColor} color2 - The second color.
         * @param {CWSYSTEM.CWColor} color3 - The resulting color.
         * @param {number} multiplier - The multiplier.
         */
        static overlayColorsWithAestheticSaturation(color1, color2, color3, multiplier) {
            let red = color1.red() + (multiplier * color2.red());
            let green = color1.green() + (multiplier * color2.green());
            let blue = color1.blue() + (multiplier * color2.blue());

            if (red > CWSYSTEM.Global.MAX_COLOR_VALUE || green > CWSYSTEM.Global.MAX_COLOR_VALUE ||
                blue > CWSYSTEM.Global.MAX_COLOR_VALUE) {
                const maxOverflow = Math.max(red, green, blue) / CWSYSTEM.Global.COLOR_NORMALIZATION;
                const adjustment = (1 + maxOverflow) / 2;

                red = Math.min(red, CWSYSTEM.Global.MAX_COLOR_VALUE);
                green = Math.min(green, CWSYSTEM.Global.MAX_COLOR_VALUE);
                blue = Math.min(blue, CWSYSTEM.Global.MAX_COLOR_VALUE);

                if (red < CWSYSTEM.Global.MAX_COLOR_VALUE) red *= adjustment;
                if (green < CWSYSTEM.Global.MAX_COLOR_VALUE) green *= adjustment;
                if (blue < CWSYSTEM.Global.MAX_COLOR_VALUE) blue *= adjustment;
            }

            // Cap all values to MAX_COLOR_VALUE
            red = Math.min(red, CWSYSTEM.Global.MAX_COLOR_VALUE);
            green = Math.min(green, CWSYSTEM.Global.MAX_COLOR_VALUE);
            blue = Math.min(blue, CWSYSTEM.Global.MAX_COLOR_VALUE);

            color3.setColor$rgba(
                Math.round(red),
                Math.round(green),
                Math.round(blue),
                CWSYSTEM.Global.MAX_COLOR_VALUE
            );
        }

        /**
         * Draws the CWImage.
         */
        draw() {
            CWImage.drawUsingColorDerivedTransparency(this.filepath, this.parent.window.point,
                this.x, this.y, this.transparentColor, 3.0);
        }
    }

    CWSYSTEM.CWImage = CWImage;
    CWImage["__class"] = "CWSYSTEM.CWImage";
})(CWSYSTEM);