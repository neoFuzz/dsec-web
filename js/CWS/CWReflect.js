import {CWSYSTEM} from './CWSYSTEM.js';

/**
 * Utility class for reflecting on objects and retrieving methods dynamically.
 * Provides functionality to introspect objects for methods and properties.
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
export class CWReflect {
    /**
     * Retrieves a method from an object based on the method name and object name.
     * This method allows for dynamic method invocation based on runtime conditions.
     *
     * @param {object} obj - The object to retrieve the method from.
     * @param {string} name - The name of the method to retrieve.
     * @returns {object|null} The method object containing the owner, name, and function if found; null otherwise.
     */
    static getMethod$obj$string(obj, name) {
        try {
            return this.getDeclaredMethod(obj.constructor, name);
        } catch (e) {
            console.info("Error with CWReflect.getMethod(..) with methodName '" + name + "': " + e);
            return null;
        }
    }

    /**
     * Retrieves a method from an object based on the method name and class object.
     * This method is useful for cases where the method's class context is important for accurate retrieval.
     *
     * @param {object} obj - The object to retrieve the method from.
     * @param {string} name - The name of the method to retrieve.
     * @param {object} classO - The class object to which the method belongs. Unused
     * @returns {object|null} The method object containing the owner, name, and function if found; null otherwise.
     */
    static getMethod$obj$name$class(obj, name, classO) {
        return CWReflect.getMethod$obj$string(obj, name);
    }

    /**
     * Retrieves a method from an object based on the method name.
     * Overloaded method to provide flexibility in method retrieval based on available parameters.
     *
     * @param {object} obj - The object to retrieve the method from.
     * @param {string} name - The name of the method to retrieve.
     * @param {object} [classO] - The class object to which the method belongs (optional).
     * @returns {object|null} The method object containing the owner, name, and function if found; null otherwise.
     * @throws {Error} If invalid overload inputs are provided.
     */
    static getMethod(obj, name, classO) {
        if (((obj != null) || obj === null) && ((typeof name === 'string') || name === null) &&
            ((classO != null) || classO === null)) {
            return CWSYSTEM.CWReflect.getMethod$obj$name$class(obj, name, classO);
        } else if (((obj != null) || obj === null) &&
            ((typeof name === 'string') || name === null) && classO === undefined) {
            return CWSYSTEM.CWReflect.getMethod$obj$string(obj, name);
        } else
            throw new Error('invalid overload');
    }

    /**
     * Retrieves a declared method from the owner object.
     *
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