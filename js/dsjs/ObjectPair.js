/* Re-written from java */
(function (dsector) {
    /**
     * Represents a pair of objects. The purpose of this class is to store and manage a pair of objects together.
     * It can be used in various scenarios where two related objects need to be grouped and processed together.
     * If either of the provided objects is `undefined`, it sets the corresponding property to `null`.
     * @class
     * @memberof dsector
     */
    class ObjectPair {
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
    dsector.ObjectPair = ObjectPair;
    ObjectPair["__class"] = "dsector.ObjectPair";
})(dsector || (dsector = {}));
