/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    /** Utility class for reflecting on objects and retrieving methods dynamically.
     * @class */
    class CWReflect {
        /** Retrieves a method from an object based on the method name and object name.
         * @param {object} obj - The object to retrieve the method from.
         * @param {string} name - The name of the method to retrieve.
         * @returns {object} The method object containing the owner, name, and function.
         */
        static getMethod$obj$string(obj, name) {
            try {
                return this.getDeclaredMethod(obj.constructor, name);
            } catch (e) {
                console.info("Error with CWReflect.getMethod(..) with methodName \'" + name + "\': " + e);
                return null;
            }
        }

        /** Retrieves a method from an object based on the method name and class object.
         * @param {object} obj - The object to retrieve the method from.
         * @param {string} name - The name of the method to retrieve.
         * @param {object} classO - The class object to which the method belongs.
         * @returns {object} The method object containing the owner, name, and function.
         */
        static getMethod$obj$name$class(obj, name, classO) {
            const types = [classO.constructor];
            try {
                return this.getDeclaredMethod(obj.constructor, name);
            } catch (e) {
                console.info("Error with CWReflect.getMethod(..) with methodName \'" + name + "\': " + e);
                return null;
            }
        }

        /** Retrieves a method from an object based on the method name.
         * @param {object} obj - The object to retrieve the method from.
         * @param {string} name - The name of the method to retrieve.
         * @param {object} [classO] - The class object to which the method belongs (optional).
         * @returns {object} The method object containing the owner, name, and function.
         * @throws {Error} If invalid overload inputs are provided.
         */
        static getMethod(obj, name, classO) {
            if (((obj != null) || obj === null) && ((typeof name === 'string') || name === null) && ((classO != null) || classO === null)) {
                return CWSYSTEM.CWReflect.getMethod$obj$name$class(obj, name, classO);
            } else if (((obj != null) || obj === null) && ((typeof name === 'string') || name === null) && classO === undefined) {
                return CWSYSTEM.CWReflect.getMethod$obj$string(obj, name);
            } else
                throw new Error('invalid overload');
        }

        /** Retrieves a declared method from the owner object.
         * @param {object} owner - The owner object to retrieve the method from.
         * @param {string} name - The name of the method to retrieve.
         * @returns {object} The method object containing the owner, name, and function, or null if not found.
         */
        static getDeclaredMethod(owner, name) {
            if (owner.prototype.hasOwnProperty(name) && typeof owner.prototype[name] == 'function') {
                return {owner: owner, name: name, fn: owner.prototype[name]};
            } else {
                return null;
            }
        }
    }

    CWSYSTEM.CWReflect = CWReflect;
    CWReflect["__class"] = "CWSYSTEM.CWReflect";
})(CWSYSTEM || (CWSYSTEM = {}));
