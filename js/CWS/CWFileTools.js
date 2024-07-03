/* code from Java, butchered to fit JavaScript. */
// TODO: make it work as intended for each platform (Electron goal)
(function (CWSYSTEM) {
    /**
     * Utility class built as a wrapper for handling file operations.
     * @class
     * @memberof CWSYSTEM
     */
    class CWFileTools {
        static delete(fileName) {
            indexedDB.deleteDatabase(fileName);
        }

        static copy(fileName, newPath) {
            return !((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 :
                o2.toUpperCase()))(fileName, newPath);
        }

        /** Output data in to IndexedDB */
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

        /** read file from IndexedDB */
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

                        //const fileData = {content: data, timestamp: new Date().getTime()};
                        const request = objectStore.put({id: 1, content: data});

                        request.onsuccess = function () {
                            console.log('File saved to IndexedDB');
                        };

                        request.onerror = function (event) {
                            console.error('Error saving file to IndexedDB', event.target.error);
                        };

                        transaction.oncomplete = function () {
                            console.log('Transaction completed');
                        };
                    });

                db.onclose = function () {
                    console.log('Connection to IndexedDB closed');
                };
            };

            request.onerror = function (event) {
                console.error('Error opening database', event.target.error);
            };
            return data1;
        }

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
                    //const byte1 = Array(1024).fill(0);
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
