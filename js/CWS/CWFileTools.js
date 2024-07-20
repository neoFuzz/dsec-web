// TODO: make it work as intended for each platform (Electron goal)
(function (CWSYSTEM) {
    /**
     * Utility class built as a wrapper for handling file operations.
     * Files are created through a virtual filesystem using IndexedDB.
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
    class CWFileTools {
        /**
         * Delete a file from IndexedDB.
         *
         * @param fileName {string} The name of the file to delete.
         */
        static delete(fileName) {
            indexedDB.deleteDatabase(fileName);
        }

        /**
         * Copy a file from one location to another.
         *
         * @param fileName {string} The name of the file to copy.
         * @param newPath {string} The new path to copy the file to.
         * @returns {boolean} Whether the copy operation was successful or not.
         */
        static copy(fileName, newPath) {
            return !((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 :
                o2.toUpperCase()))(fileName, newPath);
        }

        /**
         * Output a 'file' to IndexedDB.
         *
         * @param name {string} The name of the file to output.
         * @param data {string} The data to output to the file.
         * @returns {Promise<unknown>} A promise that resolves when the file has been outputted.
         */
        static outputFile(name, data) {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(name, 1);
                request.onerror = () => reject(new Error('Failed to open database'));
                request.onupgradeneeded = () => {
                    const db = request.result;
                    const store = db.createObjectStore('data', {keyPath: 'id'});
                };
                request.onsuccess = () => {
                    const db = request.result;
                    const transaction = db.transaction(['data'], 'readwrite');
                    const store = transaction.objectStore('data');
                    const putRequest = store.put({id: 1, content: data});
                    putRequest.onsuccess = () => {
                        db.close();
                        resolve(true);
                    };
                    putRequest.onerror = () => {
                        db.close();
                        reject(new Error('Failed to write data to database'));
                    };
                };
            });
        }

        /**
         * Read a 'file' from IndexedDB.
         *
         * @param name {string} The name of the file to read.
         * @returns {Promise<unknown>} A promise that resolves with the file data when the file has been read.
         */
        static readFileIDB(name) {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(name, 1);
                request.onerror = () => reject(new Error('Failed to open database'));
                request.onupgradeneeded = () => {
                    const db = request.result;
                    const store = db.createObjectStore('data', {keyPath: 'id'});
                };
                request.onsuccess = () => {
                    const db = request.result;
                    const transaction = db.transaction(['data'], 'readonly');
                    const store = transaction.objectStore('data');
                    const getRequest = store.get(1);
                    getRequest.onsuccess = () => {
                        db.close();
                        if (getRequest.result) {
                            resolve(getRequest.result.content);
                        } else {
                            reject(new Error('No data found in database ' + name));
                        }
                    };
                    getRequest.onerror = () => {
                        db.close();
                        reject(new Error('Failed to read data from database'));
                    };
                };
            });
        }

        /**
         * Read a file from IndexedDB, return as a string.
         *
         * @param path {string} The path to the file to read.
         * @returns {string} The contents of the file.
         */
        static readFile$str(path) {
            let data1 = "";
            // Open a connection to IndexedDB
            const request = indexedDB.open(path, 1);

            // Define the object store and its properties
            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                const objectStore = db.createObjectStore('data', {
                    keyPath: 'id', autoIncrement: false
                });
            };

            request.onsuccess = function (event) {
                const db = event.target.result;

                // Fetch the file from the URL
                fetch(path)
                    .then(response => response.text())
                    .then(data => {
                        // Store the file contents into IndexedDB
                        const transaction = db.transaction(['data'], 'readwrite');
                        const objectStore = transaction.objectStore('data');
                        const request = objectStore.put({id: 1, content: data});

                        request.onsuccess = function () {
                            CWSYSTEM.Debug.println('File saved to IndexedDB');
                        };

                        request.onerror = function (event) {
                            CWSYSTEM.Debug.error('Error saving file to IndexedDB', event.target.error);
                        };

                        transaction.oncomplete = function () {
                            CWSYSTEM.Debug.println('Transaction completed');
                        };
                    });

                db.onclose = function () {
                    CWSYSTEM.Debug.println('Connection to IndexedDB closed');
                };
            };

            request.onerror = function (event) {
                console.error('Error opening database', event.target.error);
            };
            return data1;
        }

        /**
         * Read a file from IndexedDB, return as a string.
         *
         * @param filePath {string} The path to the file to read.
         * @param b {boolean} A boolean value.
         * @returns {null|string} The contents of the file or null if an error occurred.
         */
        static readFile$str$b(filePath, b) {
            if (!b) {
                return CWFileTools.readFile$str(filePath);
            } else {
                const newName = {
                    str: "", toString: function () {
                        return this.str;
                    }
                };
                try {
                    return newName.str;
                } catch (e) {
                    return null;
                }
            }
        }
    }

    CWSYSTEM.CWFileTools = CWFileTools;
    CWFileTools["__class"] = "CWSYSTEM.CWFileTools";
})(CWSYSTEM || (CWSYSTEM = {}));