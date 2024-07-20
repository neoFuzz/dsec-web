/**/
(function (dsector) {
    /**
     * @type {number}
     */
    const UPGRADE_MULTIPLIER = 1.25;
    /**
     * @type {string}
     */
    const SOUND_FILE = "upgradeSound.wav";
    /**
     * Represents the specification of a tank, including its base attributes and upgrade levels.
     * @class
     * @memberof dsector
     */
    class TankSpecification {
        static STANDARD_TANK = 0;
        static ROTRA1 = 1;
        static ROTRA2 = 2;
        static OPEC1 = 3;
        static OPEC2 = 4;
        static OPECX = 5;

        /**
         * Constructs a new TankSpecification instance with the specified type.
         * @param {number} type - The type of the tank.
         */
        constructor(type) {
            this.__type = type;
            this.__name = null;
            this.baseVelocity = 0;
            this.baseTurnRate = 0;
            this.baseArmour = 0;
            this.baseWeaponFuelQuality = 0;
            this.model3DMatrix = null;
            this.model3DMatrixForRedDot = dsector.DSReference.modelLoader.getModel("assets/models/redDot");

            this.__armourUpgradeLevel = 0;
            this.__turnRateUpgradeLevel = 0;
            this.__velocityUpgradeLevel = 0;
            this.__weaponFuelUpgradeLevel = 0;

            const tankConfigs = {
                [TankSpecification.STANDARD_TANK]: {
                    velocity: 0.8,
                    turnRate: 0.03,
                    armour: 3.0,
                    weaponFuelQuality: 1.0,
                    model: "assets/models/standardTank",
                    name: "Standard tank"
                },
                [TankSpecification.ROTRA1]: {
                    velocity: 0.9,
                    turnRate: 0.05,
                    armour: 3.5,
                    weaponFuelQuality: 1.0,
                    model: "assets/models/rotra",
                    name: "Rotra I"
                },
                [TankSpecification.ROTRA2]: {
                    velocity: 1.0,
                    turnRate: 0.05,
                    armour: 3.5,
                    weaponFuelQuality: 1.1,
                    model: "assets/models/rotra",
                    name: "Rotra II"
                },
                [TankSpecification.OPEC1]: {
                    velocity: 1.1,
                    turnRate: 0.04,
                    armour: 4.0,
                    weaponFuelQuality: 1.2,
                    model: "assets/models/opec",
                    name: "Opec I"
                },
                [TankSpecification.OPEC2]: {
                    velocity: 1.2,
                    turnRate: 0.04,
                    armour: 4.0,
                    weaponFuelQuality: 1.3,
                    model: "assets/models/opec",
                    name: "Opec II"
                },
                [TankSpecification.OPECX]: {
                    velocity: 1.3,
                    turnRate: 0.05,
                    armour: 4.2,
                    weaponFuelQuality: 1.4,
                    model: "assets/models/opecx",
                    name: "Opec X"
                }
            };

            const config = tankConfigs[type] || tankConfigs[TankSpecification.STANDARD_TANK];
            this.baseVelocity = config.velocity;
            this.baseTurnRate = config.turnRate;
            this.baseArmour = config.armour;
            this.baseWeaponFuelQuality = config.weaponFuelQuality;
            this.model3DMatrix = dsector.DSReference.modelLoader.getModel(config.model);
            this.__name = config.name;
        }

        /**
         * Gets the name of the tank.
         * @returns {string} The name of the tank.
         */
        name() {
            return this.__name;
        }

        /**
         * Gets the type of the tank.
         * @returns {number} The type of the tank.
         */
        type() {
            return this.__type;
        }

        /**
         * Gets the type of the tank.
         * @returns {number} The type of the tank.
         */
        armourUpgradeLevel() {
            return this.__armourUpgradeLevel;
        }

        /**
         * Gets the current turn rate upgrade level.
         * @returns {number} The current turn rate upgrade level.
         */
        turnRateUpgradeLevel() {
            return this.__turnRateUpgradeLevel;
        }

        /**
         * Gets the current velocity upgrade level.
         * @returns {number} The current velocity upgrade level.
         */
        velocityUpgradeLevel() {
            return this.__velocityUpgradeLevel;
        }

        /**
         * Gets the current velocity upgrade level.
         * @returns {number} The current velocity upgrade level.
         */
        weaponFuelUpgradeLevel() {
            return this.__weaponFuelUpgradeLevel;
        }

        /**
         * Calculates the weapon fuel quality based on the base value and upgrade level.
         * @returns {number} The calculated weapon fuel quality.
         */
        weaponFuelQuality() {
            return Math.fround(this.baseWeaponFuelQuality *
                Math.pow(UPGRADE_MULTIPLIER, this.__weaponFuelUpgradeLevel));
        }

        /**
         * Calculates the maximum velocity based on the base value and upgrade level.
         * @returns {number} The calculated maximum velocity.
         */
        maximumVelocity() {
            return Math.fround(this.baseVelocity * Math.pow(UPGRADE_MULTIPLIER, this.__velocityUpgradeLevel));
        }

        /**
         * Calculates the maximum velocity based on the base value and upgrade level.
         * @returns {number} The calculated maximum velocity.
         */
        maximumTurnRate() {
            return Math.fround(this.baseTurnRate * Math.pow(UPGRADE_MULTIPLIER, this.__turnRateUpgradeLevel));
        }

        /**
         * Calculates the armour based on the base value and upgrade level.
         * @returns {number} The calculated armour.
         */
        armour() {
            return Math.fround(this.baseArmour * Math.pow(UPGRADE_MULTIPLIER, this.__armourUpgradeLevel));
        }

        /**
         * Upgrades the weapon fuel quality by one level, if possible.
         */
        upgradeWeaponFuelQuality() {
            if (this.__weaponFuelUpgradeLevel < 2) {
                this.playUpgradeSound();
                this.__weaponFuelUpgradeLevel++;
            }
        }

        /**
         * Upgrades the armour by one level, if possible.
         */
        upgradeArmour() {
            if (this.__armourUpgradeLevel < 2) {
                this.playUpgradeSound();
                this.__armourUpgradeLevel++;
            }
        }

        /**
         * Upgrades the turn rate by one level, if possible.
         */
        upgradeTurnRate() {
            if (this.__turnRateUpgradeLevel < 2) {
                this.playUpgradeSound();
                this.__turnRateUpgradeLevel++;
            }
        }

        /**
         * Upgrades the velocity by one level, if possible.
         */
        upgradeVelocity() {
            if (this.__velocityUpgradeLevel < 2) {
                this.playUpgradeSound();
                this.__velocityUpgradeLevel++;
            }
        }

        /**
         * Plays the upgrade sound if sound mode is enabled.
         */
        playUpgradeSound() {
            if (dsector.DSReference.dsecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                dsector.DSReference.cwSound.playSound(SOUND_FILE, Math.random() * 5.0);
            }
        }

        /**
         * Gets the weapon fuel quality formatted as a string for presentation.
         * @returns {string} The formatted weapon fuel quality.
         */
        weaponFuelAsPresented() {
            return `${(Math.fround(this.weaponFuelQuality() * 10.0) | 0).toFixed(0)}`;
        }

        /**
         * Gets the turn rate formatted as a string for presentation.
         * @returns {string} The formatted turn rate.
         */
        turnRateAsPresented() {
            const maxTurnRate = Math.fround(this.maximumTurnRate() * 1000.0);
            const roundedMax = Math.round(maxTurnRate);
            const turnRatePresented = Math.fround(roundedMax / 10.0);
            return `${turnRatePresented.toFixed(0)}`;
        }

        /**
         * Gets the speed formatted as a string for presentation.
         * @returns {string} The formatted speed.
         */
        speedAsPresented() {
            return `${(Math.fround(this.maximumVelocity() * 10.0).toFixed(2) | 0)}`;
        }

        /**
         * Gets the armour formatted as a string for presentation.
         * @returns {string}
         * */
        armourAsPresented() {
            const armour = Math.fround(this.armour() * 10.0);
            const rounded = Math.round(armour);
            const presented = Math.fround(rounded / 10.0);
            return `${presented.toFixed(2)}`;
        }

        /**
         * Checks if the given shopping item matches the current tank specification.
         * @param spec
         * @returns {boolean}
         */
        matchesShoppingItem(spec) {
            const specMapping = {
                [TankSpecification.STANDARD_TANK]: 400,
                [TankSpecification.ROTRA1]: 401,
                [TankSpecification.ROTRA2]: 402,
                [TankSpecification.OPEC1]: 403,
                [TankSpecification.OPEC2]: 404,
                [TankSpecification.OPECX]: 418
            };
            return spec.specificationID === specMapping[this.__type];
        }

        /**
         * Gets the price before any discounts.
         * @returns {number|number|number|*}
         */
        priceBeforeAllDiscounts() {
            const specMapping = {
                [TankSpecification.STANDARD_TANK]: dsector.PreBuiltWeaponSpecifications.STANDARD_TANK,
                [TankSpecification.ROTRA1]: dsector.PreBuiltWeaponSpecifications.ROTRA_1,
                [TankSpecification.ROTRA2]: dsector.PreBuiltWeaponSpecifications.ROTRA_2,
                [TankSpecification.OPEC1]: dsector.PreBuiltWeaponSpecifications.OPEC_1,
                [TankSpecification.OPEC2]: dsector.PreBuiltWeaponSpecifications.OPEC_2,
                [TankSpecification.OPECX]: dsector.PreBuiltWeaponSpecifications.OPEC_X
            };

            const pbs = specMapping[this.__type];
            if (pbs !== undefined) {
                return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(pbs).price;
            }
            return -1;
        }
    }

    dsector.TankSpecification = TankSpecification;
    TankSpecification["__class"] = "dsector.TankSpecification";
})(dsector || (dsector = {}));