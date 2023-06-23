/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWFontTools {
        static textLengthInPixels(text, font) {
            if (text == null) {
                return 0;
            } else {
                const charArray = (text).split('');
                let totalWidth = 0;
                for (let index = 0; index < charArray.length; index++) {
                    let c = charArray[index];
                    {
                        const character = font.getCharacter("" + c);
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
                const charArray = (text).split('');
                let textHeight = 0;
                for (let i = 0; i < charArray.length; ++i) {
                    const character = font.getCharacter("" + charArray[i]);
                    if (character.lineHeight > textHeight) {
                        textHeight = character.lineHeight;
                    }
                }
                return textHeight;
            }
        }

        static renderText(screenData, text, x, y, font, color, textWidth) {
            if (text != null) {
                const charArray = (text).split('');
                let renderWidth = x;
                const color1 = color.color;
                const localY = y;
                CWFontTools.RENDERED_WIDTH = 0;
                CWFontTools.RENDERED_HEIGHT = 0;
                let bold = false;
                let cursorPosition = 0;
                let maxValue = 2147483647;
                CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = 0;
                for (let i = 0; i < charArray.length; ++i) {
                    let character = font.getCharacter("" + charArray[i]);
                    let charHeight = character.height;
                    let charWidth = character.width;
                    let j;
                     if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i]) === ' '.charCodeAt(0)) {
                        let kerning = 0;
                        for (j = i + 1; j < charArray.length; ++j) {
                            if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[j]) === '\\'.charCodeAt(0)) {
                                ++j;
                            } else {
                                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[j]) === ' '.charCodeAt(0)) {
                                    break;
                                }
                                kerning += font.getCharacter("" + charArray[j]).width;
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
                    if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i]) === '\n'.charCodeAt(0)) {
                        renderWidth = x;
                        y += font.getCharacter("a").lineHeight + CWFontTools.ADDED_PIXEL_GAP_BETWEEN_LINES;
                        ++cursorPosition;
                    }
                    if (charArray[i] === '\\' && i + 1 < charArray.length && charArray[i + 1] === 'C') {//if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i]) === '\\'.charCodeAt(0) && i + 1 < charArray.length && (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i + 1]) == 'C'.charCodeAt(0)) {
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
                    if (CWFontTools.CURSOR_POSITION_Y_APPROX >= y - font.getCharacter("a").lineHeight && CWFontTools.CURSOR_POSITION_Y_APPROX <= y + 1) {
                        if (CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth) < maxValue) {
                            CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition;
                            maxValue = CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth);
                        }
                        if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(charArray[i]) !== '\n'.charCodeAt(0) && CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth + charWidth) < maxValue) {
                            CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition + 1;
                            maxValue = CWFontTools.distance(CWFontTools.CURSOR_POSITION_X_APPROX, renderWidth + charWidth);
                        }
                    }
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(charArray[i]) !== '\n'.charCodeAt(0)) {
                        if (CWFontTools.CURSOR_POSITION_IN_TEXT === cursorPosition) {
                            CWFontTools.LAST_CURSOR_X = renderWidth;
                            CWFontTools.LAST_CURSOR_Y = y;
                        }
                        if (screenData != null) {
                            try {
                                const charBitmap = character.bitmap;
                                for (j = 0; j < charHeight; ++j) {
                                    for (let k = 0; k < charWidth; ++k) {
                                        const charMap = charBitmap[j][k];
                                        if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charMap) === '1'.charCodeAt(0)) {
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
                CWSYSTEM.Environment.screenHasChanged = true;
                CWFontTools.RENDERED_HEIGHT = y - localY + font.getCharacter("a").lineHeight;
                if (renderWidth - x > CWFontTools.RENDERED_WIDTH) {
                    CWFontTools.RENDERED_WIDTH = renderWidth - x;
                }
                if (CWFontTools.CURSOR_POSITION_Y_APPROX > y) {
                    CWFontTools.CURSOR_POSITION_IN_TEXT_FROM_APPROX_COORDS = cursorPosition;
                }
            }
        }

        /** @private */
        static distance(point1, point2) {
            return point1 > point2 ? point1 - point2 : point2 - point1;
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
