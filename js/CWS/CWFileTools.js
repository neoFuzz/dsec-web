/* code from Java, butchered to fit JavaScript. Need to accommodate Electron */
// TODO: make it work as intended for each platform (Electron goal)
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWFileTools {
        static delete(fileName) {
            let deleteRequest = indexedDB.deleteDatabase(fileName);
        }

        static copy(fileName, newPath) {
            if (((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 : o2.toUpperCase()))(fileName, newPath)) { /* equalsIgnoreCase */
                return false;
            } else {
                // attempt to make copy
                return true;
            }
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
            /*
            let openRequest = indexedDB.open(name, 1);

            openRequest.onupgradeneeded = function() {
                let db = openRequest.result;
                if (!db.objectStoreNames.contains(name)) { // if there's no "books" store
                    db.createObjectStore(name, {}); // create it
                }
            };
            openRequest.onerror = function() {
                console.error("Error E000:", openRequest.error);
            };

            openRequest.onsuccess = function() {
                let db = openRequest.result;
                db.onversionchange = function() {
                    db.close();
                    console.info("CWFileTools I001: Database is outdated, please reload the page.")
                };

            };
            openRequest.onblocked = function() {
                // this event shouldn't trigger
            };
            try {

                console.info("CWFileTools I000: " +name + " " + data);
                return true;
            }
            catch (e) {
                return false;
            }*/
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
                const objectStore = db.createObjectStore('data', {keyPath: 'id', autoIncrement: false});
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
                        const request = objectStore.put({id:1, content: data});

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
                    const byte1 = (s => {
                        let a = [];
                        while (s-- > 0)
                            a.push(0);
                        return a;
                    })(1024);
                    return /* toString */ newName.str;
                } catch (e) {
                    return null;
                }
            }
        }

        static readFile(filePath, b) {
            if (((typeof filePath === 'string') || filePath === null) && ((typeof b === 'boolean') || b === null)) {
                return CWSYSTEM.CWFileTools.readFile$str$b(filePath, b);
            } else if (((typeof filePath === 'string') || filePath === null) && b === undefined) {
                return CWSYSTEM.CWFileTools.readFile$str(filePath);
            } else
                throw new Error('invalid overload');
        }
    }

    CWSYSTEM.CWFileTools = CWFileTools;
    CWFileTools["__class"] = "CWSYSTEM.CWFileTools";
})(CWSYSTEM || (CWSYSTEM = {}));
