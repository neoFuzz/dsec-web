var CWSYSTEM;
(function (CWSYSTEM) {
    /**
     * Represents a hashtable for storing key-value pairs.
     * @class
     */
    class CWHashtable {
        /**
         * Creates an instance of CWHashtable.
         * @param {string} filename - The filename where the hashtable data is stored.
         */
        constructor(filename) {
            if (this.hashMap === undefined) {
                this.hashMap = null;
            }
            if (this.filename === undefined) {
                this.filename = null;
            }
            if (this.filedata === undefined) {
                this.filedata = "";
            }
            this.filename = filename;
            //this.readHashtableFromFile();
        }

        /**
         * Retrieves a value by key.
         * @param {string} key - The key to retrieve the value for.
         * @returns {string} The value associated with the key, or null if not found.
         */
        get(value) {
            return "" + this.hashMap.get(value);
        }

        /**
         * Adds or updates a key-value pair in the hashtable.
         * @param {string} key - The key associated with the value.
         * @param {string} value - The value to store.
         */
        put(key, value) {
            this.hashMap.set(key, value);
            this.writeHashtableToFile();
        }

        /**
         * Returns the number of key-value pairs in the hashtable.
         * @returns {number} The size of the hashtable.
         */
        size() {
            return this.hashMap.length;
        }

        /**
         * Gets the filename where the hashtable data is stored.
         * @returns {string} The filename.
         */
        getFilename() {
            return this.filename;
        }

        /**
         * Reads the hashtable data from a file(IDB) and initializes the hashtable.
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
            strLength = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(strLength, "\r", "\n");
            strLength = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(strLength, "\n\n", "\n");
            const arrayList =
                CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(strLength, "\n");
            for (let i = 0; i < arrayList.length; ++i) {
                const listProc = arrayList[i];
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
         * Writes the current state of the hashtable to a file, which is actually a IDB.
         * @private
         */
        writeHashtableToFile() {
            // opens file
            const arrayList = Array.from(this.hashMap.keys());
            let values = "";

            try {
                for (let i = 0; i < arrayList.length; ++i) {
                    const value = arrayList[i];
                    const v = this.hashMap.get(value);
                    //write to file
                    values += value + "=" + this.hashMap.get(value) + "\n";
                }
            } catch (e) {
                console.error("There was an error writing the file in CWHashtable.writeHashtableToFile().");
            }
            CWSYSTEM.CWFileTools.outputFile(this.filename, values);
        }
    }

    CWSYSTEM.CWHashtable = CWHashtable;
    CWHashtable["__class"] = "CWSYSTEM.CWHashtable";
})(CWSYSTEM || (CWSYSTEM = {}));
