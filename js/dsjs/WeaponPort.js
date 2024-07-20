/**/
(function (dsector) {
    /**
     * This class represents a weapon port in the game.
     * It contains information about the weapon specification and the number of fire units.
     * @class
     * @memberof dsector
     */
    class WeaponPort {
        /**
         * Creates an instance of WeaponPort.
         * @param {WeaponSpecification} [specification=null] - The weapon specification for this weapon port.
         * @param {number} [fireUnits=0] - The number of fire units for this weapon port.
         */
        constructor(specification = null, fireUnits = 0) {
            /**
             * The weapon specification for this weapon port.
             * @type {WeaponSpecification}
             */
            this.weaponSpecification = specification;

            /**
             * The number of fire units for this weapon port.
             * @type {number}
             */
            this.fireUnits = fireUnits;
        }
    }

    dsector.WeaponPort = WeaponPort;
    WeaponPort["__class"] = "dsector.WeaponPort";
})(dsector || (dsector = {}));
