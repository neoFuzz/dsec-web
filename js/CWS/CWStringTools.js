var CWSYSTEM;
(function (CWSYSTEM) {
    class CWStringTools {
        static breakSentenceIntoWords(text, word) {
            let index = 0;
            const length = text.length + 1;
            const subWord = Array(length).fill(null);
            let i;
            for (i = 0; i < length; ++i) {
                subWord[i] = "";
            }
            for (i = 0; i < text.length; ++i) {
                const subString = text.substring(i, i + 1);
                if (subString === word) {
                    ++index;
                } else {
                    subWord[index] = subWord[index] + subString;
                }
            }
            const separated = Array(index + 1).fill(null);
            CWSYSTEM.CWUtils.copyArray(subWord, 0, separated, 0, index + 1);
            return separated;
        }

        static breakStringIntoWordsSeparatedByStringCaseInsensitive(text, word) {
            if (word != null && word.length !== 0) {
                if (text == null) {
                    return null;
                } else {
                    let regEx = CWSYSTEM.CWStringTools.convertRegularExpressionSimple(word);
                    let splitStr = text.split(regEx);
                    return splitStr;
                }
            } else {
                const arrayList = ([]);
                arrayList.push(text);
                return arrayList;
            }
        }

        static stringReplaceCaseInsensitive(text, word, replacementChar) {
            const arrList = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(text, word);
            text = "";
            for (let i = 0; i < arrList.length; ++i) {
                text = text + arrList[i];
                if (i < arrList.length - 1) {
                    text = text + replacementChar;
                }
            }
            return text;
        }

        static convertRegularExpressionToString(text) {
            let builder = "";
            for (let i = 0; i < text.length; ++i) {
                builder = builder + "[" + text.charAt(i) + "]";
            }
            return builder;
        }

        static convertRegularExpressionSimple(word) {
            return word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        static messagesBetweenCharacters(text, char1, char2) {
            const arrayList = ([]);
            let checked = false;
            let builder = "";
            const charArray = (text).split('');
            for (let i = 0; i < charArray.length; ++i) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i]) ===
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(char1)) {
                    checked = true;
                } else if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charArray[i]) ===
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(char2)) {
                    if (checked) {
                        arrayList.push(builder);
                        builder = "";
                        checked = false;
                    }
                } else if (checked) {
                    builder = builder + charArray[i];
                }
            }
            return arrayList;
        }

        static messagePrecedingCharacter(text, character) {
            const textBytes = (text).split('').map(s => s.charCodeAt(0));
            const checked = false;
            let i;
            for (i = 0; i < textBytes.length && textBytes[i] !==
            (c => c.charCodeAt == null ? c : c.charCodeAt(0))(character); ++i) {
                // TODO: work out function, missing from source
            }
            return text.substring(0, i);
        }

        static characterReplace(text, oldChar, newChar) {
            return text.split(oldChar).join(newChar);
        }

        static characterRemove(text, target) {
            const textBytes = (text).split('').map(s => s.charCodeAt(0));
            let count = 0;
            for (let i = 0; i < textBytes.length - count; ++i) {
                if (textBytes[i] === (c => c.charCodeAt == null ? c : c.charCodeAt(0))(target)) {
                    for (let j = i; j < textBytes.length - 1; ++j) {
                        textBytes[j] = textBytes[j + 1];
                    }
                    ++count;
                    --i;
                }
            }
            return (String.fromCharCode.apply(null, textBytes)).substring(0, text.length - count);
        }

        static removeRepeatedCharacters(text, target) {
            if (text.length < 2) {
                return text;
            } else {
                const checked = false;
                const textBytes = (text).split('').map(s => s.charCodeAt(0));
                const bytes = Array(textBytes.length).fill(0);
                bytes[0] = textBytes[0];
                let endIndex = 1;
                for (let i = 1; i < textBytes.length; ++i) {
                    const singleByte = textBytes[i];
                    if (singleByte === (c => c.charCodeAt == null ? c : c.charCodeAt(0))(target)) {
                        const aByte = textBytes[i - 1];
                        if (singleByte === aByte) {
                            continue;
                        }
                    }
                    bytes[endIndex] = singleByte;
                    ++endIndex;
                }
                return (String.fromCharCode.apply(null, bytes)).substring(0, endIndex);
            }
        }

        static find$Str$Str(text, target) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, 0, false);
        }

        static findIgnoreCase$Str$Str(text, target) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, 0, true);
        }

        static find$txt$tgt$loc(text, target, loc) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, loc, false);
        }

        static findIgnoreCase$txt$tgt$loc(text, target, loc) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, loc, true);
        }

        static findIgnoreCase(text, target, loc) {
            if (((typeof text === 'string') || text === null) &&
                ((typeof target === 'string') || target === null) &&
                ((typeof loc === 'number') || loc === null)) {
                return CWSYSTEM.CWStringTools.findIgnoreCase$txt$tgt$loc(text, target, loc);
            } else if (((typeof text === 'string') || text === null) &&
                ((typeof target === 'string') || target === null) &&
                loc === undefined) {
                return CWSYSTEM.CWStringTools.findIgnoreCase$Str$Str(text, target);
            } else
                throw new Error('invalid overload');
        }

        static find$txt$tgt$loc$case(text, target, loc, caseBool) {
            const firstChar = target.substring(0, 1);
            const targetLen = target.length;
            const textLen = text.length;
            if (loc >= -1) {
                for (let i = loc; i < textLen - targetLen + 1; ++i) {
                    const substring = text.substring(i, i + 1);
                    let checked = false;
                    if (caseBool) {
                        if (((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase())
                        )(substring, firstChar)) {
                            checked = true;
                        }
                    } else if (substring === firstChar) {
                        checked = true;
                    }
                    if (checked) {
                        const substring1 = text.substring(i, i + targetLen);
                        if (caseBool) {
                            if (((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase())
                            )(substring1, target)) {
                                return i;
                            }
                        } else if (substring1 === target) {
                            return i;
                        }
                    }
                }
            }
            return -1;
        }

        static find(text, target, loc, caseBool) {
            if (((typeof text === 'string') || text === null) &&
                ((typeof target === 'string') || target === null) &&
                ((typeof loc === 'number') || loc === null) &&
                ((typeof caseBool === 'boolean') || caseBool === null)) {
                return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, loc, caseBool);
            } else if (((typeof text === 'string') || text === null) &&
                ((typeof target === 'string') || target === null) &&
                ((typeof loc === 'number') || loc === null) && caseBool === undefined) {
                return CWSYSTEM.CWStringTools.find$txt$tgt$loc(text, target, loc);
            } else if (((typeof text === 'string') || text === null) &&
                ((typeof target === 'string') || target === null) && loc === undefined && caseBool === undefined) {
                return CWSYSTEM.CWStringTools.find$Str$Str(text, target);
            } else
                throw new Error('invalid overload');
        }

        static trim(text) {
            text = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(
                CWSYSTEM.CWStringTools.stringWithLeadingCharactersTrimmed(text, ' '), ' ');
            text = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(
                CWSYSTEM.CWStringTools.stringWithLeadingCharactersTrimmed(text, '\n'), '\n');
            text = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(
                CWSYSTEM.CWStringTools.stringWithLeadingCharactersTrimmed(text, '\t'), '\t');
            text = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(
                CWSYSTEM.CWStringTools.stringWithLeadingCharactersTrimmed(text, '\r'), '\r');
            return text;
        }

        static stringWithTrailingCharactersTrimmed(text, character) {
            if (!(text === (""))) {
                do {
                    const subChar = (text.substring(text.length - 1)).split('')[0];
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(subChar) !==
                        (c => c.charCodeAt == null ? c : c.charCodeAt(0))(character)) {
                        return text;
                    }
                    text = text.substring(0, text.length - 1);
                } while ((text.length !== 0));
            }
            return "";
        }

        static stringWithLeadingCharactersTrimmed(text, character) {
            const charArray = (text).split('');
            const checked = false;
            let i;
            for (i = 0; i < text.length &&
            (c => c.charCodeAt === null ? c : c.charCodeAt(0))(charArray[i]) ===
            (c => c.charCodeAt == null ? c : c.charCodeAt(0))(character); ++i) {
                // TODO: work out what is missing, was blank in source code. incomplete?
            }
            return i < text.length ? text.substring(i, text.length - i) : "";
        }

        static shortenedFloat(value, trim) {
            let string = "" + value;
            if (string.length > trim) {
                string = string.substring(0, trim);
                string = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(string, '.');
            }
            return string;
        }

        static getValueFromNameValuePair(text, target) {
            const fromLine = CWStringTools.getNameAndValueParametersFromLine(text, '=', ' ');
            return fromLine.get(target);
        }

        /**
         * Get name and value parameters from line.
         * @param {string} text
         * @param {string} name
         * @param {number} value
         * @return {Map}
         */
        static getNameAndValueParametersFromLine(text, name, value) {
            const hashMap = new Map();
            const arrayList = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(text,
                "" + name);
            for (let i = 0; i < arrayList.length; ++i) {
                const stringFromList = arrayList[i];
                const breakString = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(stringFromList,
                    "" + value);
                if (breakString.length === 1) {
                    hashMap.set(breakString[0].toLowerCase(), "");
                } else {
                    hashMap.set(breakString[0].toLowerCase(), breakString[1]);
                }
            }
            return hashMap;
        }

        static stringRepeated(text, count) {
            let builder = "";
            for (let i = 0; i < count; ++i) {
                builder = builder + text;
            }
            return builder;
        }

        static cutStringIntoSmallerLengths(string, length) {
            const arrayList = ([]);
            let i;
            for (i = 0; i + length <= string.length - 1; i += length) {
                arrayList.push(string.substring(i, length));
            }
            arrayList.push(string.substring(i));
            return arrayList;
        }

        static createWordWrappedLines(string, mode) {
            const arrayList = ([]);
            string = string + "\n";
            const word = (string).split('');
            let str = "";
            for (let i = 0; i < word.length; ++i) {
                if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(word[i]) === '\n'.charCodeAt(0)) {
                    arrayList.push(str);
                    str = "";
                } else {
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(word[i]) === ' '.charCodeAt(0)) {
                        let count = 0;
                        for (let j = i + 1; j < word.length && (c => c.charCodeAt === null ? c :
                            c.charCodeAt(0))(word[j]) !== ' '.charCodeAt(0); ++j) {
                            ++count;
                        }
                        if (str.length + count > mode - 1) {
                            arrayList.push(str);
                            str = "";
                            continue;
                        }
                    }
                    str = str + "" + word[i];
                }
            }
            return arrayList;
        }

        static shortenString(text, amount) {
            const length = text.length;
            return length > amount ? text.substring(0, amount) + "..." : text;
        }

        static vectorOfStringToArrayOfString(arrayList) {
            const string = Array(arrayList.length).fill(null);
            for (let i = 0; i < arrayList.length; ++i) {
                string[i] = arrayList[i];
            }
            return string;
        }

        static vectorOfIntegerToArrayOfInt(arrayList) {
            const ints = Array(arrayList.length).fill(0);
            for (let i = 0; i < arrayList.length; ++i) {
                const processed = arrayList[i];
                ints[i] = processed;
            }
            return ints;
        }

        static replaceNonAlphaNumericalCharacters(text, replacement) {
            return text.replace(new RegExp("[^a-zA-Z0-9]", 'g'), replacement);
        }

        static replaceNonAlphaCharacters(text, replacement) {
            return text.replace(new RegExp("[^a-zA-Z]", 'g'), replacement);
        }

        static stringToBoolean(text) {
            if (text == null) {
                return false;
            } else {
                text = text.trim();
                text = text.toLowerCase();
                return (text === ("true")) || (text === ("yes")) || (text === ("1"));
            }
        }

        static stringStartsWith(text, startingText) {
            if (text != null && startingText != null) {
                if (startingText.length > text.length) {
                    return false;
                } else {
                    return ((str, searchString, position = 0) => str.substring(position,
                        searchString.length) === searchString)(text, startingText);
                }
            } else {
                return false;
            }
        }

        static stringEndsWith(text, ending) {
            if (text != null && ending != null) {
                if (ending.length > text.length) {
                    return false;
                } else {
                    return ((str, searchString, position = 0) => str.substring(position, searchString.length) ===
                        searchString)(text, ending, text.length - ending.length);
                }
            } else {
                return false;
            }
        }

        static filenameFilter(text) {
            const charString = (text).split('');
            let builderStr = "";
            for (let i = 0; i < charString.length; ++i) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) >= 'a'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) <= 'z'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) >= 'A'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) <= 'Z'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) >= '0'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) <= '9'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === ' '.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '_'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '-'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '!'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '$'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '('.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === ')'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '#'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '@'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(charString[i]) === '.'.charCodeAt(0)) {
                    builderStr = builderStr + charString[i];
                }
            }
            if (builderStr.length === 0) {
                return "_";
            } else {
                return builderStr;
            }
        }

        static sorted(arrList) {
            if (arrList == null) {
                return null;
            } else {
                let treeMap = new Map();
                for (let i = 0; i < arrList.length; i++) {
                    let comparable = arrList[i];
                    treeMap.set(comparable, comparable);
                }
                let values = treeMap.values();
                let objects = Array.from(values);
                let arrayList = [];
                arrayList.push(...objects);

                return arrayList;
            }
        }

        static main() {
            const arrList = ([]);
            arrList.push("tree");
            arrList.push("greg");
            arrList.push("andrew");
            arrList.push("chris");
            arrList.push("ellaine");
            arrList.push("squirrel");
            arrList.push("tea");
            const arrayList = CWSYSTEM.StringTools.sorted(arrList);
            for (let i = 0; i < arrayList.length; ++i) {
                console.info(arrayList[i]);
            }
            const test = CWSYSTEM.StringTools.stringReplaceCaseInsensitive(arrList[0], "T", "R");
            console.info("String replace: " + test);
        }
    }

    CWSYSTEM.CWStringTools = CWStringTools;
    CWStringTools["__class"] = "CWSYSTEM.CWStringTools";
})(CWSYSTEM || (CWSYSTEM = {}));
