(function (CWSYSTEM) {
    /**
     * Provides utility methods for working with strings.
     * This class includes methods for breaking strings into words, replacing substrings, and more.
     *
     * @property {object} [constructor=null]
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
    class CWStringTools {
        /**
         * Breaks a sentence into words based on a given delimiter.
         *
         * @param {string} text - The text to break into words.
         * @param {string} word - The delimiter to use for breaking the text.
         * @returns {string[]} - An array of words.
         */
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

        /**
         * Breaks a string into words separated by a given string, case-insensitively.
         *
         * @param {string} text - The text to break into words.
         * @param {string} word - The delimiter to use for breaking the text.
         * @returns {string[]} - An array of words.
         */
        static breakStringIntoWordsSeparatedByStringCaseInsensitive(text, word) {
            if (word != null && word.length !== 0) {
                if (text == null) {
                    return null;
                } else {
                    let regEx = CWSYSTEM.CWStringTools.convertRegularExpressionSimple(word);
                    return text.split(regEx);
                }
            } else {
                const arrayList = ([]);
                arrayList.push(text);
                return arrayList;
            }
        }

        /**
         * Replaces occurrences of a word in a text with a replacement character, case-insensitively.
         *
         * @param {string} text - The text in which to replace the word.
         * @param {string} word - The word to be replaced.
         * @param {string} replacementChar - The replacement character.
         * @returns {string} - The modified text.
         */
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

        /**
         * Converts a text into a regular expression string.
         *
         * @param {string} text - The text to convert.
         * @returns {string} - The regular expression string.
         */
        static convertRegularExpressionToString(text) {
            let builder = "";
            for (let i = 0; i < text.length; ++i) {
                builder = builder + "[" + text.charAt(i) + "]";
            }
            return builder;
        }

        /**
         * Converts a word into a simple regular expression.
         *
         * @param {string} word - The word to convert.
         * @returns {string} - The regular expression string.
         */
        static convertRegularExpressionSimple(word) {
            return word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        /**
         * Extracts messages between two characters in a text.
         *
         * @param {string} text - The text to search within.
         * @param {string} char1 - The starting character.
         * @param {string} char2 - The ending character.
         * @returns {string[]} - An array of messages between the characters.
         */
        static messagesBetweenCharacters(text, char1, char2) {
            const arrayList = ([]);
            let checked = false;
            let builder = "";
            const charArray = (text).split('');
            for (const element of charArray) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) ===
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(char1)) {
                    checked = true;
                } else if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) ===
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(char2)) {
                    if (checked) {
                        arrayList.push(builder);
                        builder = "";
                        checked = false;
                    }
                } else if (checked) {
                    builder = builder + element;
                }
            }
            return arrayList;
        }

        /**
         * Extracts the message preceding a given character in a text.
         *
         * @param {string} text - The text to search within.
         * @param {string} char - The character to look for.
         * @returns {string} - The message preceding the character.
         */
        static messagePrecedingCharacter(text, char) {
            const index = text.indexOf(char);
            return index !== -1 ? text.substring(0, index) : text;
        }

        /**
         * Replaces all occurrences of a character in a text with another character.
         *
         * @param {string} text - The text in which to replace characters.
         * @param {string} oldChar - The character to be replaced.
         * @param {string} newChar - The replacement character.
         * @returns {string} - The modified text.
         */
        static characterReplace(text, oldChar, newChar) {
            return text.split(oldChar).join(newChar);
        }

        /**
         * Removes all occurrences of a character from a text.
         *
         * @param {string} text - The text from which to remove the character.
         * @param {string} target - The character to be removed.
         * @returns {string} - The modified text.
         */
        static characterRemove(text, target) {
            return text.split(target).join('');
        }

        /**
         * Removes repeated occurrences of a character from a text.
         *
         * @param {string} txt - The text from which to remove repeated characters.
         * @param {string} tgt - The character whose repetitions are to be removed.
         * @returns {string} - The modified text.
         */
        static removeRepeatedCharacters(txt, tgt) {
            if (txt.length < 2) return txt;

            let result = txt[0];
            for (let i = 1; i < txt.length; ++i) {
                if (!(txt[i] === tgt && txt[i] === txt[i - 1])) {
                    result += txt[i];
                }
            }
            return result;
        }

        /**
         * Finds the first occurrence of a target string in a text.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @returns {number} - The index of the first occurrence of the target string, or -1 if not found
         */
        static find$Str$Str(text, target) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, 0, false);
        }

        /**
         * Finds the first occurrence of a target string in a text, ignoring case.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @returns {number} - The index of the first occurrence of the target string, or -1 if not found.
         */
        static findIgnoreCase$Str$Str(text, target) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, 0, true);
        }

        /**
         * Finds the first occurrence of a target string in a text starting from a specific location.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @param {number} loc - The location to start the search from.
         * @returns {number} - The index of the first occurrence of the target string, or -1 if not found.
         */
        static find$txt$tgt$loc(text, target, loc) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, loc, false);
        }

        /**
         * Finds the first occurrence of a target string in a text starting from a specific location, ignoring case.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @param {number} loc - The location to start the search from.
         * @returns {number} - The index of the first occurrence of the target string, or -1 if not found.
         */
        static findIgnoreCase$txt$tgt$loc(text, target, loc) {
            return CWSYSTEM.CWStringTools.find$txt$tgt$loc$case(text, target, loc, true);
        }

        /**
         * Finds the target string within the text starting from the specified location, ignoring case.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @param {number} loc - The location to start the search from.
         * @returns {number} The index of the first occurrence of the target string, ignoring case.
         * @throws {Error} If the provided parameters do not match any overload signature.
         */
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

        /**
         * Finds the first occurrence of a target string in a text with various options.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @param {number} loc - The location to start the search from.
         * @param {boolean} caseBool - Whether to ignore case.
         * @returns {number} - The index of the first occurrence of the target string, or -1 if not found.
         */
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

        /**
         * Finds the target string within the text starting from the specified location.
         *
         * @param {string} text - The text to search within.
         * @param {string} target - The string to find.
         * @param {number} loc - The location to start the search from.
         * @param {boolean} caseBool - Whether the search is case-sensitive.
         * @returns {number} The index of the first occurrence of the target string.
         * @throws {Error} If the provided parameters do not match any overload signature.
         */
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

        /**
         * Trims leading and trailing whitespace, newlines, tabs, and carriage returns from a text.
         *
         * @param {string} text - The text to trim.
         * @returns {string} - The trimmed text.
         */
        static trim(text) {
            const charactersToTrim = [' ', '\n', '\t', '\r'];
            for (const char of charactersToTrim) {
                text = CWSYSTEM.CWStringTools.stringWithLeadingCharactersTrimmed(text, char);
                text = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(text, char);
            }
            return text;
        }

        /**
         * Trims trailing occurrences of a specific character from a text.
         *
         * @param {string} text - The text to trim.
         * @param {string} char - The character to trim.
         * @returns {string} - The trimmed text.
         */
        static stringWithTrailingCharactersTrimmed(text, char) {
            while (text.length > 0 && text.endsWith(char)) {
                text = text.substring(0, text.length - 1);
            }
            return text;
        }

        /**
         * Trims the leading specified characters from the given string.
         *
         * @param {string} text - The input string to be trimmed.
         * @param {string} char - The character to be trimmed from the start of the string.
         * @returns {string} - The trimmed string with leading specified characters removed.
         */
        static stringWithLeadingCharactersTrimmed(text, char) {
            const charArray = text.split('');
            let i;
            for (i = 0; i < text.length && charArray[i] === char; ++i) {
                // Iterate through leading characters
            }
            return i < text.length ? text.substring(i) : "";
        }

        /**
         * Formats a float value with a specified number of decimal places and trimming.
         *
         * @param {number} value - The float value to format.
         * @param {number} trim - The maximum length of the formatted string.
         * @returns {string} - The formatted float value.
         */
        static shortenedFloat(value, trim) {
            let string = "" + value;
            if (string.length > trim) {
                string = string.substring(0, trim);
                string = CWSYSTEM.CWStringTools.stringWithTrailingCharactersTrimmed(string, '.');
            }
            return string;
        }

        /**
         * Retrieves the value associated with a name from a name-value pair string.
         *
         * @param {string} text - The name-value pair string.
         * @param {string} target - The name whose value is to be retrieved.
         * @returns {string} - The value associated with the name, or null if the name is not found.
         */
        static getValueFromNameValuePair(text, target) {
            const fromLine = CWStringTools.getNameAndValueParametersFromLine(text, '=', ' ');
            return fromLine.get(target);
        }

        /**
         * Get name and value parameters from line.
         *
         * @param {string} text - The input string containing name-value pairs.
         * @param {string} name - The name parameter to search for.
         * @param {string} value - The value parameter to search for.
         * @returns {Map} - A Map containing the name-value pairs found in the input string.
         */
        static getNameAndValueParametersFromLine(text, name, value) {
            const hashMap = new Map();
            const arrayList = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(text,
                "" + name);
            for (const stringFromList of arrayList) {
                const breakString = CWSYSTEM.CWStringTools
                    .breakStringIntoWordsSeparatedByStringCaseInsensitive(stringFromList, "" + value);
                if (breakString.length === 1) {
                    hashMap.set(breakString[0].toLowerCase(), "");
                } else {
                    hashMap.set(breakString[0].toLowerCase(), breakString[1]);
                }
            }
            return hashMap;
        }

        /**
         * Repeats the given string a specified number of times.
         *
         * @param {string} text - The string to be repeated.
         * @param {number} count - The number of times to repeat the string.
         * @returns {string} The concatenated result of the repeated string.
         */
        static stringRepeated(text, count) {
            let builder = "";
            for (let i = 0; i < count; ++i) {
                builder = builder + text;
            }
            return builder;
        }

        /**
         * Cuts the given string into smaller lengths based on the specified length.
         *
         * @param {string} string - The input string to be cut.
         * @param {number} length - The length of each smaller segment.
         * @returns {Array<string>} An array of smaller string segments.
         */
        static cutStringIntoSmallerLengths(string, length) {
            const arrayList = ([]);
            let i;
            for (i = 0; i + length <= string.length - 1; i += length) {
                arrayList.push(string.substring(i, length));
            }
            arrayList.push(string.substring(i));
            return arrayList;
        }

        /**
         * Creates word-wrapped lines from the given string based on the specified mode.
         *
         * @param {string} string - The input string to be word-wrapped.
         * @param {number} len - The maximum length of each line.
         * @returns {Array<string>} An array of word-wrapped lines.
         */
        static createWordWrappedLines(string, len) {
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
                        if (str.length + count > len - 1) {
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

        /**
         * Shortens the input string to the specified length, adding "..." if truncated.
         *
         * @param {string} text - The input string to be shortened.
         * @param {number} amount - The maximum length of the output string.
         * @returns {string} The shortened string.
         */
        static shortenString(text, amount) {
            const length = text.length;
            return length > amount ? text.substring(0, amount) + "..." : text;
        }

        /**
         * Converts a vector of strings to an array of strings.
         *
         * @param {Array<string>} arrayList - The vector of strings.
         * @returns {Array<string>} The converted array of strings.
         */
        static vectorOfStringToArrayOfString(arrayList) {
            const string = Array(arrayList.length).fill(null);
            for (let i = 0; i < arrayList.length; ++i) {
                string[i] = arrayList[i];
            }
            return string;
        }

        /**
         * Converts a vector of integers to an array of integers.
         *
         * @param {Array<number>} arrayList - The vector of integers.
         * @returns {Array<number>} The converted array of integers.
         */
        static vectorOfIntegerToArrayOfInt(arrayList) {
            const a = Array(arrayList.length).fill(0);
            for (let i = 0; i < arrayList.length; ++i) {
                a[i] = arrayList[i];
            }
            return a;
        }

        /**
         * Replaces all non-alphanumeric characters in the given text with the specified replacement.
         *
         * @param {string} text - The input text in which to replace non-alphanumeric characters.
         * @param {string} replacement - The string to replace each non-alphanumeric character with.
         * @returns {string} The modified string with non-alphanumeric characters replaced.
         */
        static replaceNonAlphaNumericalCharacters(text, replacement) {
            return text.replace(/[^a-zA-Z0-9]/g, replacement);
        }

        /**
         * Replaces all non-alphabetic characters in the given text with the specified replacement.
         *
         * @param {string} text - The input text in which to replace non-alphabetic characters.
         * @param {string} replacement - The string to replace each non-alphabetic character with.
         * @returns {string} The modified string with non-alphabetic characters replaced.
         */
        static replaceNonAlphaCharacters(text, replacement) {
            return text.replace(/[^a-zA-Z]/g, replacement);
        }

        /**
         * Converts a given string to a boolean value.
         * The function returns true if the string (after trimming and converting to lowercase) is "true", "yes", or "1".
         * Otherwise, it returns false.
         *
         * @param {string} text - The input text to be converted to a boolean.
         * @returns {boolean} The boolean value corresponding to the input text.
         */
        static stringToBoolean(text) {
            if (text == null) {
                return false;
            } else {
                text = text.trim();
                text = text.toLowerCase();
                return (text === ("true")) || (text === ("yes")) || (text === ("1"));
            }
        }

        /**
         * Checks if a given string starts with the specified starting text.
         *
         * @param {string} txt - The text to be checked.
         * @param {string} startTxt - The starting text to look for.
         * @returns {boolean} True if the text starts with the specified starting text, otherwise false.
         */
        static stringStartsWith(txt, startTxt) {
            if (txt != null && startTxt != null) {
                if (startTxt.length > txt.length) {
                    return false;
                } else {
                    return ((str, search, pos = 0) =>
                        str.substring(pos, search.length) === search)(txt, startTxt);
                }
            } else {
                return false;
            }
        }

        /**
         * Checks if a given string ends with the specified ending.
         *
         * @param {string} txt - The text to be checked.
         * @param {string} e - The ending string to look for.
         * @returns {boolean} True if the text ends with the specified ending, otherwise false.
         */
        static stringEndsWith(txt, e) {
            if (txt != null && e != null) {
                if (e.length > txt.length) {
                    return false;
                } else {
                    return ((str, search, pos = 0) =>
                        str.substring(pos, search.length) === search)(txt, e, txt.length - e.length);
                }
            } else {
                return false;
            }
        }

        /**
         * Filters a given string to only include valid filename characters.
         * Valid characters include letters (a-z, A-Z), digits (0-9), space,
         * and certain special characters (_ - ! $ ( ) # @ .).
         *
         * @param {string} txt - The input text to be filtered.
         * @returns {string} A string containing only valid filename characters. If the resulting string is empty, returns an underscore ("_").
         */
        static filenameFilter(txt) {
            const cStr = (txt).split('');
            let bStr = "";
            for (const element of cStr) {
                if ((c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) >= 'a'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) <= 'z'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) >= 'A'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) <= 'Z'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) >= '0'.charCodeAt(0) &&
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) <= '9'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === ' '.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '_'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '-'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '!'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '$'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '('.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === ')'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '#'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '@'.charCodeAt(0) ||
                    (c => c.charCodeAt == null ? c : c.charCodeAt(0))(element) === '.'.charCodeAt(0)) {
                    bStr = bStr + element;
                }
            }
            if (bStr.length === 0) {
                return "_";
            } else {
                return bStr;
            }
        }

        /**
         * Sorts the given array and returns a list with the sorted elements.
         * Uses a Map to remove duplicates and ensure natural ordering.
         *
         * @param {Array} arr - The array to be sorted.
         * @returns {Array|null} The sorted array or null if the input is null.
         */
        static sorted(arr) {
            if (arr == null) {
                return null;
            } else {
                let treeMap = new Map();
                arr.forEach(element => {
                    treeMap.set(element, element);
                });
                let values = treeMap.values();
                let objs = Array.from(values);
                let list = [];
                list.push(...objs);

                return list;
            }
        }

        /**
         * Main method for testing purposes.
         *
         * @static
         */
        static main() {
            const arrList = ([]);
            arrList.push("tree");
            arrList.push("greg");
            arrList.push("andrew");
            arrList.push("chris");
            arrList.push("ellaine");
            arrList.push("squirrel");
            arrList.push("tea");
            const arrayList = CWSYSTEM.CWStringTools.sorted(arrList);
            for (const element of arrayList) {
                console.info(element);
            }
            const test = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(arrList[0], "T", "R");
            console.info("String replace: " + test);
        }
    }

    CWSYSTEM.CWStringTools = CWStringTools;
    CWStringTools["__class"] = "CWSYSTEM.CWStringTools";
})(CWSYSTEM);