import {dsector} from './dsector.js';

/**
 * Class representing an intersecting object in the game.
 *
 * @property {number} distance - The distance to the intersecting object.
 * @property {number} type - The type of the intersecting object.
 * @property {dsector.DSecPlayer|null} playerOwningIntersectingTank - The player owning the intersecting tank, if applicable.
 * @property {dsector.DSecMissile|null} intersectingMissile - The intersecting missile, if applicable.
 * @property {dsector.DSecJewel|null} jewel - The intersecting jewel, if applicable.
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
export class IntersectingDSecObject {
    /**
     * Creates an instance of IntersectingDSecObject.
     *
     * @param {number} dist - The distance to the intersecting object.
     * @param {number} type - The type of the intersecting object.
     * @param {dsector.DSecPlayer|null} player - The player owning the intersecting tank, if applicable.
     * @param {dsector.DSecMissile|null} m - The intersecting missile, if applicable.
     * @param {dsector.DSecJewel|null} jewel - The intersecting jewel, if applicable.
     */
    constructor(dist, type, player, m, jewel) {
        this.distance = dist || 0;
        this.type = type || 0;
        this.playerOwningIntersectingTank = player || null;
        this.intersectingMissile = m || null;
        this.jewel = jewel || null;
    }

    /**
     * Returns the recorded distance to the intersecting object.
     *
     * @public
     * @returns {*|number|number}
     */
    getDistance() {
        return this.distance;
    }
}