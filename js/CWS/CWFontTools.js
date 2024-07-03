/**/
(function (CWSYSTEM) {
    /**
     * Class providing font manipulation and text rendering tools.
     * @class
     * @memberof CWSYSTEM
     */
    class CWFontTools {
        /**
         * Calculates the length of the given text in pixels using the specified font.
         * @param {string} text - The text to measure.
         * @param {object} font - The font object containing character width information.
         * @returns {number} - The total width of the text in pixels.
         */
        static textLengthInPixels(text, font) {
            if (text == null) {
                return 0;
            } else {
                // Using Array.from to handle Unicode characters correctly
                const charArray = Array.from(text);
                let totalWidth = 0;
                for (let index = 0; index < charArray.length; index++) {
                    let c = charArray[index];
                    {
                        const character = font.getCharacter(c);
                        totalWidth += character.width;
                    }
                }
                return totalWidth;
            }
        }

        /**
         * Calculates the height of a paragraph in pixels given the text, font, text width, and boldness.
         * @param {string} text - The paragraph text to measure.
         * @param {object} font - The font object containing character height information.
         * @param {number} tWidth - The maximum width of the text.
         * @param {boolean} isBold - Indicates if the text is bold.
         * @returns {number} - The height of the paragraph in pixels.
         */
        static heightOfParagraph(text, font, tWidth, isBold) {
            if (text == null) {
                return 0;
            } else {
                const bold = CWFontTools.BOLD;
                CWFontTools.BOLD = isBold;
                CWFontTools.renderText(null, text, 0, 0, font, CWSYSTEM.CWColor.black_$LI$(), tWidth);
                CWFontTools.BOLD = bold;
                return CWFontTools.RENDERED_HEIGHT;
            }
        }

        /**
         * Calculates the height of the given text in pixels using the specified font.
         * @param {string} text - The text to measure.
         * @param {object} font - The font object containing character height information.
         * @returns {number} - The height of the text in pixels.
         */
        static textHeightInPixels(text, font) {
            if (text == null) {
                return 0;
            } else {
                if (text === ("")) {
                    text = " ";
                }
                // Using Array.from to handle Unicode characters correctly
                const charArray = Array.from(text);
                let textHeight = 0;
                for (let i = 0; i < charArray.length; ++i) {
                    const character = font.getCharacter(charArray[i]);
                    if (character.lineHeight > textHeight) {
                        textHeight = character.lineHeight;
                    }
                }
                return textHeight;
            }
        }

        /**
         * Renders the given text on the screen data using the specified font and color.
         * @param {object} screenData - The screen data object to render the text on.
         * @param {string} text - The text to render.
         * @param {number} x - The x-coordinate where the text rendering starts.
         * @param {number} y - The y-coordinate where the text rendering starts.
         * @param {object} font - The font object containing character rendering information.
         * @param {object} color - The color object for the text.
         * @param {number} textWidth - The maximum width of the text.
         */
        static renderText(screenData, text, x, y, font, color, textWidth) {
            if (text != null) {
                // Using Array.from to handle Unicode characters correctly
                const charArray = Array.from(text);
                let renderWidth = x;
                const color1 = color.color;
                const localY = y;
                CWFontTools.reinitialiseRenderingMetrics();

                let bold = false;
                let cursorPosition = 0;
                let maxValue = Number.MAX_SAFE_INTEGER;

                for (let i = 0; i < charArray.length; ++i) {
                    let character = font.getCharacter(charArray[i]);
                    let charHeight = character.height;
                    let charWidth = character.width;
                    let j;

                    if (charArray[i] === ' ') {
                        let kerning = 0;
                        for (j = i + 1; j < charArray.length; ++j) {
                            if (charArray[j] === '\\') {
                                ++j;
                            } else {
                                if (charArray[j] === ' ') {
                                    break;
                                }
                                kerning += font.getCharacter(charArray[j]).width;
                                if (CWFontTools.BOLD) {
                                    ++kerning;
                                }
                            }
                        }
                        kerning += font.getCharacter(" ").width;
                        if (renderWidth - x + kerning > textWidth) {
                            if (renderWidth - x > CWFontTools.RENDERED_WIDTH) {
                                CWFontTools.RENDERED_WIDTH = renderWidth - x;
                            }
                            renderWidth = x;
                            y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                            ++cursorPosition;
                            continue;
                        }
                    }

                    if (charArray[i] === '\n') {
                        renderWidth = x;
                        y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                        ++cursorPosition;
                    }

                    if (charArray[i] === '\\' && i + 1 < charArray.length && charArray[i + 1] === 'C') {
                        ++i;
                        character = font.getCharacter("|");
                        charHeight = character.height;
                        charWidth = character.width;
                        bold = true;
                        renderWidth -= (charWidth / 2 | 0);
                    }

                    if (!bold && renderWidth - x + charWidth > textWidth) {
                        renderWidth = x;
                        y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                    }

                    this.updateCursorPositionAndDistance(charArray, i, cursorPosition, font, x, y, renderWidth, charWidth, maxValue);

                    if (charArray[i] !== '\n') {
                        this.renderCharacter(screenData, font, character, charArray, y, renderWidth, charHeight, charWidth, color1, i);
                        if (!bold) {
                            renderWidth += charWidth;
                            if (CWFontTools.BOLD) {
                                ++renderWidth;
                            }
                            ++cursorPosition;
                        } else {
                            renderWidth += (charWidth / 2 | 0);
                            bold = false;
                        }
                    }
                }

                this.finaliseRendering(y, localY, font, renderWidth, x, cursorPosition);
            }
        }

        /**
         * Re-initializes the rendering metrics.
         */
        static reinitialiseRenderingMetrics() {
            CWFontTools.RENDERED_WIDTH = 0;
            CWFontTools.RENDERED_HEIGHT = 0;
            CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;
        }

        /**
         * Updates the cursor position and distance for text rendering.
         * @param {Array} charArray - The array of characters in the text.
         * @param {number} i - The current character index.
         * @param {number} cursorPosition - The current cursor position in the text.
         * @param {object} font - The font object containing character width information.
         * @param {number} x - The x-coordinate where the text rendering starts.
         * @param {number} y - The y-coordinate where the text rendering starts.
         * @param {number} renderWidth - The current rendered width of the text.
         * @param {number} charWidth - The width of the current character.
         * @param {number} maxValue - The maximum value of the distance.
         */
        static updateCursorPositionAndDistance(charArray, i, cursorPosition, font, x, y, renderWidth, charWidth, maxValue) {
            if (CWFontTools.CURSOR_POSITION_Y_APPROX >= y - font.getCharacter("a").lineHeight &&
                CWFontTools.CURSOR_POSITION_Y_APPROX <= y + 1) {
                if (CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth) < maxValue) {
                    CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition;
                    maxValue = CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth);
                }
                if (charArray[i] !== '\n' &&
                    CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth + charWidth) < maxValue) {
                    CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition + 1;
                    maxValue = CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth + charWidth);
                }
            }
        }

        /**
         * Renders a single character on the screen data.
         * @param {object} screenData - The screen data object to render the character on.
         * @param {object} font - The font object containing character rendering information.
         * @param {object} character - The character object to render.
         * @param {Array} charArray - The array of characters in the text.
         * @param {number} y - The y-coordinate where the text rendering starts.
         * @param {number} renderWidth - The current rendered width of the text.
         * @param {number} charHeight - The height of the current character.
         * @param {number} charWidth - The width of the current character.
         * @param {string} color1 - The color of the character.
         * @param {number} i - The current character index
         */
        static renderCharacter(screenData, font, character, charArray, y, renderWidth, charHeight, charWidth, color1, i) {
            if (screenData != null) {
                try {
                    const charBitmap = character.bitmap;
                    for (let j = 0; j < charHeight; ++j) {
                        for (let k = 0; k < charWidth; ++k) {
                            const charMap = charBitmap[j][k];
                            if (charMap === '1') {
                                screenData.point[y - j][k + renderWidth] = color1;
                                if (CWFontTools.BOLD) {
                                    screenData.point[y - j][k + renderWidth + 1] = color1;
                                }
                            }
                        }
                    }
                } catch (e) {
                    CWSYSTEM.Debug.println("Text rendering out of range in renderText().");
                }
            }
        }

        /**
         * Finalizes the rendering process by updating the rendered height and width.
         * @param {number} y - The y-coordinate where the text rendering starts.
         * @param {number} localY - The local y-coordinate where the text rendering starts.
         * @param {object} font - The font object containing character height information.
         * @param {number} renderWidth - The current rendered width of the text.
         * @param {number} x - The x-coordinate where the text rendering starts.
         * @param {number} cp - The cursor position in the text.
         */
        static finaliseRendering(y, localY, font, renderWidth, x, cp) {
            CWSYSTEM.Environment.screenHasChanged = true;
            CWFontTools.RENDERED_HEIGHT = y - localY + font.getCharacter("a").lineHeight;
            if (renderWidth - x > CWFontTools.RENDERED_WIDTH) {
                CWFontTools.RENDERED_WIDTH = renderWidth - x;
            }
            if (CWFontTools.CURSOR_POSITION_Y_APPROX > y) {
                CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cp;
            }
        }

        /**
         * Calculates the distance between two points.
         * @private
         * @param {number} point1 - The first point.
         * @param {number} point2 - The second point.
         * @returns {number} - The distance between the points.
         */
        static distance(point1, point2) {
            return Math.abs(point1 - point2);
        }
    }

    /**
     * The gap in pixels added between lines during text rendering.
     * @type {number}
     */
    CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES = 2;
    /**
     * The gap in pixels added between lines during text rendering.
     * @type {number}
     */
    CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES = 2;

    /**
     * The rendered width of the text.
     * @type {number}
     */
    CWFontTools.RENDERED_WIDTH = 0;

    /**
     * The rendered height of the text.
     * @type {number}
     */
    CWFontTools.RENDERED_HEIGHT = 0;

    /**
     * Boolean indicating if the text is bold.
     * @type {boolean}
     */
    CWFontTools.BOLD = false;

    /**
     * The approximate x-coordinate of the cursor position.
     * @type {number}
     */
    CWFontTools.CURSOR_POSITION_X_APPROX = 0;

    /**
     * The approximate y-coordinate of the cursor position.
     * @type {number}
     */
    CWFontTools.CURSOR_POSITION_Y_APPROX = 0;

    /**
     * The cursor position in the text from approximate coordinates.
     * @type {number}
     */
    CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;

    /**
     * The current cursor position in the text.
     * @type {number}
     */
    CWFontTools.CURSOR_POSITION_IN_TEXT = 0;

    /**
     * The last known x-coordinate of the cursor.
     * @type {number}
     */
    CWFontTools.LAST_CURSOR_X = 0;

    /**
     * The last known y-coordinate of the cursor.
     * @type {number}
     */
    CWFontTools.LAST_CURSOR_Y = 0;
    CWSYSTEM.CWFontTools = CWFontTools;
    CWFontTools["__class"] = "CWSYSTEM.CWFontTools";
})(CWSYSTEM || (CWSYSTEM = {}));
