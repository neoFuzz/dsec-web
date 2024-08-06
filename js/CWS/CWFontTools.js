import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Class providing font manipulation and text rendering tools.
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
export class CWFontTools {
    /**
     * Calculates the length of the given text in pixels using the specified font.
     *
     * @param {string} text - The text to measure.
     * @param {CWSYSTEM.CWFont} font - The font object containing character width information.
     * @returns {number} - The total width of the text in pixels.
     */
    static textLengthInPixels(text, font) {
        if (text == null) {
            return 0;
        } else {
            // Using Array.from to handle Unicode characters correctly
            const charArray = Array.from(text);
            let totalWidth = 0;
            for (const c of charArray) {
                const character = font.getCharacter(c);
                totalWidth += character.width;
            }
            return totalWidth;
        }
    }

    /**
     * Calculates the height of a paragraph in pixels given the text, font, text width, and boldness.
     *
     * @param {string} text - The paragraph text to measure.
     * @param {CWSYSTEM.CWFont} font - The font object containing character height information.
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
            CWFontTools.renderText(null, text, 0, 0, font, CWSYSTEM.CWColor.__black(), tWidth);
            CWFontTools.BOLD = bold;
            return CWFontTools.RENDERED_HEIGHT;
        }
    }

    /**
     * Calculates the height of the given text in pixels using the specified font.
     *
     * @param {string} text - The text to measure.
     * @param {CWSYSTEM.CWFont} font - The font object containing character height information.
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
            for (const element of charArray) {
                const character = font.getCharacter(element);
                if (character.lineHeight > textHeight) {
                    textHeight = character.lineHeight;
                }
            }
            return textHeight;
        }
    }

    /**
     * Renders the given text on the screen data using the specified font and color.
     *
     * @param {CWSYSTEM.ScreenData} sd - The screen data object to render the text on.
     * @param {string} text - The text to render.
     * @param {number} x - The x-coordinate where the text rendering starts.
     * @param {number} y - The y-coordinate where the text rendering starts.
     * @param {CWSYSTEM.CWFont} font - The font object containing character rendering information.
     * @param {CWSYSTEM.CWColor} color - The color object for the text.
     * @param {number} textWidth - The maximum width of the text.
     */
    static renderText(sd, text, x, y,
                      font, color, textWidth) {
        if (text != null) {
            // Using Array.from to handle Unicode characters correctly
            const charArray = Array.from(text);
            let renderWidth = x;
            const color1 = color.color;
            const localY = y;
            CWFontTools.reinitialiseRenderingMetrics();

            let bold = false;
            let curPos = 0;
            let maxValue = Number.MAX_SAFE_INTEGER;

            for (let i = 0; i < charArray.length; ++i) {
                let char_ = font.getCharacter(charArray[i]);
                let charH = char_.height;
                let charW = char_.width;
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
                        ++curPos;
                        continue;
                    }
                }

                if (charArray[i] === '\n') {
                    renderWidth = x;
                    y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                    ++curPos;
                }

                if (charArray[i] === '\\' && i + 1 < charArray.length && charArray[i + 1] === 'C') {
                    ++i;
                    char_ = font.getCharacter("|");
                    charH = char_.height;
                    charW = char_.width;
                    bold = true;
                    renderWidth -= (charW / 2 | 0);
                }

                if (!bold && renderWidth - x + charW > textWidth) {
                    renderWidth = x;
                    y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                }

                this.updateCursorPositionAndDistance(charArray, i, curPos, font, x, y,
                    renderWidth, charW, maxValue);

                if (charArray[i] !== '\n') {
                    this.renderCharacter(sd, font, char_, charArray, y, renderWidth, charH, charW, color1, i);
                    if (!bold) {
                        renderWidth += charW;
                        if (CWFontTools.BOLD) {
                            ++renderWidth;
                        }
                        ++curPos;
                    } else {
                        renderWidth += (charW / 2 | 0);
                        bold = false;
                    }
                }
            }

            this.finaliseRendering(y, localY, font, renderWidth, x, curPos);
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
     *
     * @param {Array} charArray - The array of characters in the text.
     * @param {number} i - The current character index.
     * @param {number} cursorPosition - The current cursor position in the text.
     * @param {CWSYSTEM.CWFont} font - The font object containing character width information.
     * @param {number} x - The x-coordinate where the text rendering starts.
     * @param {number} y - The y-coordinate where the text rendering starts.
     * @param {number} renderWidth - The current rendered width of the text.
     * @param {number} charWidth - The width of the current character.
     * @param {number} maxValue - The maximum value of the distance.
     */
    static updateCursorPositionAndDistance(charArray, i, cursorPosition, font,
                                           x, y, renderWidth, charWidth, maxValue) {
        if (CWFontTools.CURSOR_POSITION_Y_APPROX >= y - font.getCharacter("a").lineHeight &&
            CWFontTools.CURSOR_POSITION_Y_APPROX <= y + 1) {
            if (CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth) < maxValue) {
                CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition;
                maxValue = CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth);
            }
            if (charArray[i] !== '\n' &&
                CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth + charWidth) < maxValue) {
                CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition + 1;
            }
        }
    }

    /**
     * Renders a single character on the screen data.
     *
     * @param {CWSYSTEM.ScreenData} sd - The screen data object to render the character on.
     * @param {CWSYSTEM.CWFont} font - The font object containing character rendering information.
     * @param {CWSYSTEM.CWCharacter} char - The character object to render.
     * @param {Array} charArray - The array of characters in the text.
     * @param {number} y - The y-coordinate where the text rendering starts.
     * @param {number} renderWidth - The current rendered width of the text.
     * @param {number} charHeight - The height of the current character.
     * @param {number} charWidth - The width of the current character.
     * @param {string} color1 - The color of the character.
     * @param {number} i - The current character index
     */
    static renderCharacter(sd, font, char, charArray,
                           y, renderWidth, charHeight, charWidth, color1, i) {
        if (sd != null) {
            try {
                const bitmap = char.bitmap;
                for (let j = 0; j < charHeight; ++j) {
                    for (let k = 0; k < charWidth; ++k) {
                        const charMap = bitmap[j][k];
                        if (charMap === '1') {
                            sd.point[y - j][k + renderWidth] = color1;
                            if (CWFontTools.BOLD) {
                                sd.point[y - j][k + renderWidth + 1] = color1;
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
     *
     * @param {number} y - The y-coordinate where the text rendering starts.
     * @param {number} localY - The local y-coordinate where the text rendering starts.
     * @param {CWSYSTEM.CWFont} font - The font object containing character height information.
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
     *
     * @private
     * @param {number} point1 - The first point.
     * @param {number} point2 - The second point.
     * @returns {number} - The distance between the points.
     */
    static distance(point1, point2) {
        return Math.abs(point1 - point2);
    }

    /**
     * The gap in pixels added between lines during text rendering.
     * @type {number}
     * @static
     * @constant
     */
    static ADDED_PIXEL_GAP_BETWEEN_LINES = 2;
    /**
     * The gap in pixels added between lines during text rendering.
     * @type {number}
     * @static
     * @constant
     */
    static ADDED_PIXEL_GAP_BETWEEN_LINES = 2;

    /**
     * The rendered width of the text.
     * @type {number}
     * @static
     * @default
     */
    static RENDERED_WIDTH = 0;

    /**
     * The rendered height of the text.
     * @type {number}
     * @constant
     * @default
     */
    static RENDERED_HEIGHT = 0;

    /**
     * Boolean indicating if the text is bold.
     * @type {boolean}
     * @default
     * @static
     */
    static BOLD = false;

    /**
     * The approximate x-coordinate of the cursor position.
     * @type {number}
     * @default
     * @static
     */
    static CURSOR_POSITION_X_APPROX = 0;

    /**
     * The approximate y-coordinate of the cursor position.
     * @type {number}
     * @default
     * @static
     */
    static CURSOR_POSITION_Y_APPROX = 0;

    /**
     * The cursor position in the text from approximate coordinates.
     * @type {number}
     * @default
     * @static
     */
    static CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;

    /**
     * The current cursor position in the text.
     * @type {number}
     * @default
     * @static
     */
    static CURSOR_POSITION_IN_TEXT = 0;

    /**
     * The last known x-coordinate of the cursor.
     * @type {number}
     * @default
     * @static
     */
    static LAST_CURSOR_X = 0;

    /**
     * The last known y-coordinate of the cursor.
     * @type {number}
     * @default
     * @static
     */
    static LAST_CURSOR_Y = 0;
}