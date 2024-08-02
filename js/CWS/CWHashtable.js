(function (CWSYSTEM) {
    /**
     * Represents a hashtable for storing key-value pairs.
     *
     * @property {Map} hashMap - The underlying data structure used to store the key-value pairs.
     * @property {string} filename - The filename where the hashtable data is stored.
     * @property {string} filedata - The data read from the file.
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
    class CWHashtable {
        /**
         * Creates an instance of CWHashtable.
         *
         * @param {string} filename - The filename where the hashtable data is stored.
         */
        constructor(filename) {
            this.hashMap = null;
            this.filename = filename;
            this.filedata = "";
            // we used to read from the file here, but it's done later to avoid bugs now.
        }

        /**
         * Retrieves a value by key.
         *
         * @param {string} key - The key to retrieve the value for.
         * @returns {string} The value associated with the key, or null if not found.
         */
        get(key) {
            return "" + this.hashMap.get(key);
        }

        /**
         * Adds or updates a key-value pair in the hashtable.
         *
         * @param {string} key - The key associated with the value.
         * @param {string} value - The value to store.
         */
        put(key, value) {
            this.hashMap.set(key, value);
            this.writeHashtableToFile();
        }

        /**
         * Returns the number of key-value pairs in the hashtable.
         *
         * @returns {number} The size of the hashtable.
         */
        size() {
            return this.hashMap.length;
        }

        /**
         * Gets the filename where the hashtable data is stored.
         *
         * @returns {string} The filename.
         */
        getFilename() {
            return this.filename;
        }

        /**
         * Reads the hashtable data from a file(IDB) and initializes the hashtable.
         *
         * @async
         * @public
         */
        async readHashtableFromFile() {
            this.hashMap = new Map();
            let strLength = "";
            if (this.filedata === "") {
                try {
                    // Load file
                    this.filedata = await CWSYSTEM.CWFileTools.readFileIDB(this.filename);
                } catch (e) {
                    this.hashMap = null;
                    CWSYSTEM.Debug.error("RHF Error: " + e.message);
                    return;
                }
            }
            strLength = "" + this.filedata;
            strLength = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(strLength, "\r", "");
            const arrayList =
                CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(strLength, "\n");
            for (const listProc of arrayList) {
                const breakList =
                    CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(listProc, "=");
                if (breakList.length === 2) {
                    const key = breakList[0].trim();
                    const value = breakList[1].trim();
                    this.hashMap.set(key, value);
                }
            }
        }

        /**
         *
         * This method iterates over the keys in the hashmap and constructs a string
         * with key-value pairs separated by an equal sign (=) and newline characters.
         * It then writes this string to a file using the `CWSYSTEM.CWFileTools.outputFile`
         * method.
         *
         * @throws {Error} If an error occurs while writing to the file, it logs an error message
         *                 to the console.
         * @public
         */
        writeHashtableToFile() {
            // opens file
            const arrayList = Array.from(this.hashMap.keys());
            let values = "";

            try {
                for (const value of arrayList) {
                    const v = this.hashMap.get(value);
                    //write to file
                    values += value + "=" + v + "\n";
                }
            } catch (e) {
                CWSYSTEM.Debug.error("There was an error writing the file in CWHashtable.writeHashtableToFile().");
            }
            CWSYSTEM.CWFileTools.outputFile(this.filename, values);
        }
    }

    CWSYSTEM.CWHashtable = CWHashtable;
    CWHashtable["__class"] = "CWSYSTEM.CWHashtable";
})(CWSYSTEM);