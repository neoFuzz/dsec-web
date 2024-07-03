/**/
(function (dsector) {
    /**
     * Class representing an intersecting object in the game.
     * @class
     * @memberof dsector
     */
    class IntersectingDSecObject {
        /**
         * Creates an instance of IntersectingDSecObject.
         * @param {number} dist - The distance to the intersecting object.
         * @param {number} type - The type of the intersecting object.
         * @param {DSecPlayer|null} player - The player owning the intersecting tank, if applicable.
         * @param {DSecMissile|null} m - The intersecting missile, if applicable.
         * @param {DSecJewel|null} jewel - The intersecting jewel, if applicable.
         */
        constructor(dist, type, player, m, jewel) {
            /** The distance to the intersecting object.
             *  @type {number} */
            this.distance = 0;

            /** The type of the intersecting object.
             *  @type {number} */
            this.type = 0;

            /** The player owning the intersecting tank, if applicable.
             *  @type {Object|null} */
            this.playerOwningIntersectingTank = null;

            /** The intersecting missile, if applicable.
             *  @type {Object|null} */
            this.intersectingMissile = null;

            /** The intersecting jewel, if applicable.
             *  @type {Object|null} */
            this.jewel = null;

            this.distance = dist;
            this.type = type;
            this.playerOwningIntersectingTank = player;
            this.intersectingMissile = m;
            this.jewel = jewel;
        }
    }

    dsector.IntersectingDSecObject = IntersectingDSecObject;
    IntersectingDSecObject["__class"] = "dsector.IntersectingDSecObject";
})(dsector || (dsector = {}));