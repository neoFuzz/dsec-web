/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWHashtable {
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

        get(value) {
            return "" + this.hashMap.get(value);
        }

        put(key, value) {
            this.hashMap.set(key, value);
            this.writeHashtableToFile();
        }

        size() {
            return this.hashMap.length;
        }

        getFilename() {
            return this.filename;
        }

        /** @private */
        async readHashtableFromFile() {
            this.hashMap = new Map();
            let strLength = "";
            if (this.filedata === "") {
                try {
                    // Load file
                    this.filedata = await CWSYSTEM.CWFileTools.readFileIDB(this.filename);/*
                    .then(data => {console.info("IDB000i: " + this.filename);})
                    .catch(error => console.error(error));/**/
                } catch (e) {
                    //this.hashMap = null;
                    console.error("RHF Error: " + e);
                    return;
                }
            }
            strLength = "" + this.filedata;
            strLength = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(strLength, "\r", "\n");
            strLength = CWSYSTEM.CWStringTools.stringReplaceCaseInsensitive(strLength, "\n\n", "\n");
            const arrayList = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(strLength, "\n");
            for (let i = 0; i < arrayList.length; ++i) {
                const listProc = arrayList[i];
                const breakList = CWSYSTEM.CWStringTools.breakStringIntoWordsSeparatedByStringCaseInsensitive(listProc, "=");
                if (breakList.length === 2) {
                    const key = breakList[0].trim();
                    const value = breakList[1].trim();
                    this.hashMap.set(key, value);
                }
            }
        }

        /** @private */
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
