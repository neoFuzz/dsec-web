var CWSYSTEM;
(function (CWSYSTEM) {
    class CWFontTools {
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

        static reinitialiseRenderingMetrics() {
            CWFontTools.RENDERED_WIDTH = 0;
            CWFontTools.RENDERED_HEIGHT = 0;
            CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;
        }

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

        /** @private */
        static distance(point1, point2) {
            return Math.abs(point1 - point2);
        }
    }

    CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES = 2;
    CWFontTools.RENDERED_WIDTH = 0;
    CWFontTools.RENDERED_HEIGHT = 0;
    CWFontTools.BOLD = false;
    CWFontTools.CURSOR_POSITION_X_APPROX = 0;
    CWFontTools.CURSOR_POSITION_Y_APPROX = 0;
    CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;
    CWFontTools.CURSOR_POSITION_IN_TEXT = 0;
    CWFontTools.LAST_CURSOR_X = 0;
    CWFontTools.LAST_CURSOR_Y = 0;
    CWSYSTEM.CWFontTools = CWFontTools;
    CWFontTools["__class"] = "CWSYSTEM.CWFontTools";
})(CWSYSTEM || (CWSYSTEM = {}));
