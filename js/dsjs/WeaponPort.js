var dsector;
(function (dsector) {
    class WeaponPort {
        constructor(specification, fireUnits) {
            if (this.weaponSpecification === undefined) {
                this.weaponSpecification = null;
            }
            if (this.fireUnits === undefined) {
                this.fireUnits = 0;
            }
            this.weaponSpecification = specification;
            this.fireUnits = fireUnits;
        }
    }
    dsector.WeaponPort = WeaponPort;
    WeaponPort["__class"] = "dsector.WeaponPort";
})(dsector || (dsector = {}));
