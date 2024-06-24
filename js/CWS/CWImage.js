var CWSYSTEM;
(function (CWSYSTEM) {
    /**
     * Class representing an image.
     * @memberof CWSYSTEM
     */
    class CWImage {
        /**
         * Create a CWImage.
         * @param {Object} parent - The parent object.
         * @param {string} nameID - The ID of the image.
         * @param {number} x - The x-coordinate of the image.
         * @param {number} y - The y-coordinate of the image.
         * @param {string} filePath - The file path of the image.
         * @param {string} transparentColor - The transparent color of the image.
         */
        constructor(parent, nameID, x, y, filePath, transparentColor) {
            if (this.parent === undefined) {
                this.parent = null;
            }
            if (this.nameID === undefined) {
                this.nameID = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.filepath === undefined) {
                this.filepath = null;
            }
            if (this.transparentColor === undefined) {
                this.transparentColor = null;
            }
            this.parent = parent;
            this.nameID = nameID;
            this.x = x;
            this.y = y;
            this.filepath = filePath;
            this.transparentColor = transparentColor;
        }

        /**
         * Draws an image using color-derived transparency.
         * @param {string} filename - The name of the file.
         * @param {Array} arrPoints - The array of points.
         * @param {number} chosenA - The chosen A coordinate.
         * @param {number} chosenB - The chosen B coordinate.
         * @param {string} inColor - The input color.
         * @param {number} scaleFlt - The scale factor.
         */
        static drawUsingColorDerivedTransparency(filename, arrPoints, chosenA, chosenB, inColor, scaleFlt) {
            const screenData = (new CWSYSTEM.CWGraphics()).getJPG(filename);
            if (screenData != null) {
                const points = screenData.point;
                for (let i = 0; i < screenData.height; ++i) {
                    try {
                        let j;
                        if (inColor == null) {
                            for (j = 0; j < screenData.width; ++j) {
                                arrPoints[chosenB + i][chosenA + j] = points[i][j];
                            }
                        } else {
                            for (j = 0; j < screenData.width; ++j) {
                                const cPoint = arrPoints[chosenB + i][chosenA + j];
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
                                arrPoints[chosenB + i][chosenA + j] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
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
         * @param {Object} screenData - The screen data.
         * @param {Array} points - The array of points.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {number} multi - The multiplier.
         */
        static drawUsingBrightnessOverlay(screenData, points, x, y, multi) {
            if (screenData != null) {
                const color1 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const color2 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const sdPoints = screenData.point;
                for (let i = 0; i < screenData.height; ++i) {
                    try {
                        for (let j = 0; j < screenData.width; ++j) {
                            const pixelColor1 = points[y + i][x + j];
                            const pixelColor2 = sdPoints[i][j];
                            color1.setColor$int(pixelColor1);
                            color2.setColor$int(pixelColor2);
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
         * @param {Object} screenData - The screen data.
         * @param {Array} points - The array of points.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         * @param {number} multiplier - The multiplier.
         * @param {number} minX - The minimum x-coordinate.
         * @param {number} minY - The minimum y-coordinate.
         * @param {number} maxX - The maximum x-coordinate.
         * @param {number} maxY - The maximum y-coordinate.
         */
        static drawUsingBrightnessOverlayWithCropping(screenData, points, x, y, multiplier, minX, minY, maxX, maxY) {
            if (screenData != null) {
                const color1 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const color2 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.transparentBlack_$LI$());
                const intArray = screenData.point;
                for (let i = 0; i < screenData.height; ++i) {
                    if (y + i >= minY && y + i <= maxY) {
                        let sLine = 0;
                        let width = screenData.width;
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
         * @param {Object} color1 - The first color.
         * @param {Object} color2 - The second color.
         * @param {Object} color3 - The resulting color.
         * @param {number} multiplier - The multiplier.
         */
        static overlayColorsWithAestheticSaturation(color1, color2, color3, multiplier) {
            let calcColor1 = (color1.red() + (multiplier * color2.red()));
            let calcColor2 = (color1.green() + (multiplier * color2.green()));
            let calcColor3 = (color1.blue() + (multiplier * color2.blue()));
            let calculated;
            if (calcColor1 > 255.0) {
                if (calcColor3 > 255.0) {
                    if (calcColor2 > 255.0) {
                        calcColor1 = 255.0;
                        calcColor2 = 255.0;
                        calcColor3 = 255.0;
                    } else {
                        calculated = (((1.0 + (((calcColor3 / 256.0) * calcColor1) / 256.0))) / 2.0);
                        calcColor3 = 255.0;
                        calcColor1 = 255.0;
                        calcColor2 *= calculated;
                        if (calcColor2 > 255.0) {
                            calcColor2 = 255.0;
                        }
                    }
                } else {
                    calculated = (((1.0 + (calcColor1 / 256.0))) / 2.0);
                    calcColor1 = 255.0;
                    calcColor2 *= calculated;
                    if (calcColor2 > 255.0) {
                        calcColor2 = 255.0;
                    }
                    calcColor3 *= calculated;
                    if (calcColor3 > 255.0) {
                        calcColor3 = 255.0;
                    }
                }
                if (calcColor2 > 255.0) {
                    calculated = (((1.0 + (((calcColor2 / 256.0) * calcColor1) / 256.0))) / 2.0);
                    calcColor2 = 255.0;
                    calcColor1 = 255.0;
                    calcColor3 *= calculated;
                    if (calcColor3 > 255.0) {
                        calcColor3 = 255.0;
                    }
                }
            } else if (calcColor2 > 255.0) {
                if (calcColor3 > 255.0) {
                    calculated = (((1.0 + (((calcColor2 / 256.0) * calcColor3) / 256.0))) / 2.0);
                    calcColor2 = 255.0;
                    calcColor3 = 255.0;
                    calcColor1 *= calculated;
                    if (calcColor1 > 255.0) {
                        calcColor1 = 255.0;
                    }
                } else {
                    calculated = (((1.0 + (calcColor2 / 256.0))) / 2.0);
                    calcColor2 = 255.0;
                    calcColor1 *= calculated;
                    if (calcColor1 > 255.0) {
                        calcColor1 = 255.0;
                    }
                    calcColor3 *= calculated;
                    if (calcColor3 > 255.0) {
                        calcColor3 = 255.0;
                    }
                }
            } else if (calcColor3 > 255.0) {
                calculated = (((1.0 + (calcColor3 / 256.0))) / 2.0);
                calcColor3 = 255.0;
                calcColor1 *= calculated;
                if (calcColor1 > 255.0) {
                    calcColor1 = 255.0;
                }
                calcColor2 *= calculated;
                if (calcColor2 > 255.0) {
                    calcColor2 = 255.0;
                }
            }
            if (calcColor1 > 255.0 || calcColor2 > 255.0 || calcColor3 > 255.0) {
                CWSYSTEM.CWSReference.alertManager.message("Error with calculating color in rendering.");
            }
            color3.setColor$rgba((calcColor1 | 0), (calcColor2 | 0), (calcColor3 | 0), 255);
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
})(CWSYSTEM || (CWSYSTEM = {}));
