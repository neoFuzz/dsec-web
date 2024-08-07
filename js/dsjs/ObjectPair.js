import {dsector} from './dsector.js';

    /**
     * Represents a pair of objects. The purpose of this class is to store and manage a pair of objects together.
     * It can be used in various scenarios where two related objects need to be grouped and processed together.
     * If either of the provided objects is `undefined`, it sets the corresponding property to `null`.
     *
     * @property {any} object1 - The first object of the pair.
     * @property {any} object2 - The second object of the pair.
     *
     * @example
     * const pair = new dsector.ObjectPair(object1, object2);
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
    export class ObjectPair {
        /**
         * Creates a new instance of {@link ObjectPair}.
         * @param {any} object1 - The first object of the pair.
         * @param {any} object2 - The second object of the pair.
         */
        constructor(object1, object2) {
            // If object1 is undefined, set it to null
            if (this.object1 === undefined) {
                this.object1 = null;
            }

            // If object2 is undefined, set it to null
            if (this.object2 === undefined) {
                this.object2 = null;
            }

            // Set object1 and object2 to the provided values
            this.object1 = object1;
            this.object2 = object2;
        }
    }