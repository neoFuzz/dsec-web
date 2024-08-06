import {dsector} from './dsector.js';

/**
 * Represents a pair of strings with a name and a value.
 *
 * @property  {string} name - The name part of the pair.
 * @property {string} value - The value part of the pair.
 *
 * @example
 * let pair = new dsector.StringPair("name", "value");
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class StringPair {
    /**
     * Constructs a new StringPair instance with the specified name and value.
     *
     * @param {string} name - The name part of the pair.
     * @param {string} value - The value part of the pair.
     */
    constructor(name, value) {
        this.name = name || null;
        this.value = value || null;
    }

    /**
     * Returns the name part of the pair.
     * @returns {string} The name part of the pair.
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the value part of the pair.
     * @returns {string} The value part of the pair.
     */
    getValue() {
        return this.value;
    }

    /**
     * Sets the name part of the pair.
     * @param {string} name - The new name value.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Sets the value part of the pair.
     * @param {string} value - The new value.
     */
    setValue(value) {
        this.value = value;
    }
}