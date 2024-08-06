import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Utility class built as a wrapper for handling file operations.
 * Files are created through a virtual filesystem using IndexedDB.
 *
 * @todo     Electron goal: make it work as intended for each platform.
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
export class CWFileTools {
    /**
     * Delete a file from IndexedDB.
     *
     * @param {string} fileName The name of the file to delete.
     */
    static delete(fileName) {
        indexedDB.deleteDatabase(fileName);
    }

    /**
     * Copy a file from one location to another.
     *
     * @param {string} fileName The name of the file to copy.
     * @param {string} newPath The new path to copy the file to.
     * @returns {boolean} Whether the copy operation was successful or not.
     */
    static copy(fileName, newPath) {
        return !((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 :
            o2.toUpperCase()))(fileName, newPath);
    }

    /**
     * Output a 'file' to IndexedDB.
     *
     * @param {string} name The name of the file to output.
     * @param {string} data The data to output to the file.
     * @returns {Promise<unknown>} A promise that resolves when the file has been outputted.
     */
    static async outputFile(name, data) {
        try {
            const db = await this.openDatabase(name);
            await this.storeInIndexedDB(db, data);
            await this.closeDatabase(db);
            return true;
        } catch (error) {
            CWSYSTEM.Debug.error('Error in outputFile: ' + error);
            return false;
        }
    }

    /**
     * Read a 'file' from IndexedDB.
     *
     * @param {string} name The name of the file to read.
     * @returns {Promise<unknown>} A promise that resolves with the file data when the file has been read.
     */
    static async readFileIDB(name) {
        try {
            const db = await this.openDatabase(name);
            const content = await this.readFromIndexedDB(db);
            await this.closeDatabase(db);
            return content;
        } catch (error) {
            CWSYSTEM.Debug.error('Error in readFileIDB: ' + error);
            throw error; // Re-throw to maintain the original error handling behavior
        }
    }

    /**
     * Read data from IndexedDB.
     *
     * @private
     * @param {IDBDatabase} db The IndexedDB database to read from.
     * @returns {Promise<unknown>} A promise that resolves with the data when the data has been read.
     */
    static readFromIndexedDB(db) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['data'], 'readonly');
            const objectStore = transaction.objectStore('data');
            const request = objectStore.get(1);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.content);
                } else {
                    reject(new Error('No data found in database'));
                }
            };

            request.onerror = () => {
                reject(new Error('Failed to read data from database'));
            };
        });
    }

    /**
     * Read a file from IndexedDB, return as a string.
     *
     * @param {string} path The path to the file to read.
     * @returns {string} The contents of the file.
     */
    static async readFile$str(path) {
        try {
            const db = await this.openDatabase(path);
            const fileContent = await this.fetchAndStoreFile(db, path);
            await this.closeDatabase(db);
            return fileContent;
        } catch (error) {
            CWSYSTEM.Debug.error('Error in readFile: ' + error);
            return "";
        }
    }

    /**
     * Open a database.
     *
     * @private
     * @param {string} path The path to the database.
     * @returns {Promise<unknown>} A promise that resolves with the database when the database has been opened.
     */
    static openDatabase(path) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(path, 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                db.createObjectStore('data', {keyPath: 'id', autoIncrement: false});
            };

            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror = (event) => reject(new Error('Error opening database: ' + event.target.error));
        });
    }

    /**
     * Fetch a file and store it in IndexedDB.
     *
     * @private
     * @param {IDBDatabase} db The IndexedDB database to store the file in.
     * @param {string} path The path to the file to fetch.
     * @returns {Promise<unknown>} A promise that resolves when the file has been fetched and stored.
     */
    static async fetchAndStoreFile(db, path) {
        const response = await fetch(path);
        const data = await response.text();

        await this.storeInIndexedDB(db, data);

        return data;
    }

    static storeInIndexedDB(db, data) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['data'], 'readwrite');
            const objectStore = transaction.objectStore('data');
            const request = objectStore.put({id: 1, content: data});

            request.onsuccess = () => {
                CWSYSTEM.Debug.println('File saved to IndexedDB');
                resolve();
            };

            request.onerror = (event) => {
                CWSYSTEM.Debug.error('Error saving file to IndexedDB ' + event.target.error);
                reject(new Error('Error saving file to IndexedDB: ' + event.target.error));
            };

            transaction.oncomplete = () => CWSYSTEM.Debug.println('Transaction completed');
        });
    }

    static closeDatabase(db) {
        return new Promise((resolve) => {
            db.close();
            CWSYSTEM.Debug.println('Connection to IndexedDB closed');
            resolve();
        });
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