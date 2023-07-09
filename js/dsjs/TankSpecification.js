var dsector;
(function (dsector) {
    class TankSpecification {
        constructor(type) {
            if (this.__type === undefined) {
                this.__type = 0;
            }
            if (this.__name === undefined) {
                this.__name = null;
            }
            if (this.baseVelocity === undefined) {
                this.baseVelocity = 0;
            }
            if (this.baseTurnRate === undefined) {
                this.baseTurnRate = 0;
            }
            if (this.baseArmour === undefined) {
                this.baseArmour = 0;
            }
            if (this.baseWeaponFuelQuality === undefined) {
                this.baseWeaponFuelQuality = 0;
            }
            if (this.model3DMatrix === undefined) {
                this.model3DMatrix = null;
            }
            if (this.model3DMatrixForRedDot === undefined) {
                this.model3DMatrixForRedDot = null;
            }
            this.__armourUpgradeLevel = 0;
            this.__turnRateUpgradeLevel = 0;
            this.__velocityUpgradeLevel = 0;
            this.__weaponFuelUpgradeLevel = 0;
            this.__type = type;
            this.model3DMatrixForRedDot = dsector.DSReference.modelLoader.getModel("assets/models/redDot");
            switch ((type)) {
                case TankSpecification.STANDARD_TANK:
                default:
                    this.baseVelocity = 0.8;
                    this.baseTurnRate = 0.03;
                    this.baseArmour = 3.0;
                    this.baseWeaponFuelQuality = 1.0;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/standardTank");
                    this.__name = "Standard tank";
                    break;
                case TankSpecification.ROTRA1:
                    this.baseVelocity = 0.9;
                    this.baseTurnRate = 0.05;
                    this.baseArmour = 3.5;
                    this.baseWeaponFuelQuality = 1.0;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/rotra");
                    this.__name = "Rotra I";
                    break;
                case TankSpecification.ROTRA2:
                    this.baseVelocity = 1.0;
                    this.baseTurnRate = 0.05;
                    this.baseArmour = 3.5;
                    this.baseWeaponFuelQuality = 1.1;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/rotra");
                    this.__name = "Rotra II";
                    break;
                case TankSpecification.OPEC1:
                    this.baseVelocity = 1.1;
                    this.baseTurnRate = 0.04;
                    this.baseArmour = 4.0;
                    this.baseWeaponFuelQuality = 1.2;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/opec");
                    this.__name = "Opec I";
                    break;
                case TankSpecification.OPEC2:
                    this.baseVelocity = 1.2;
                    this.baseTurnRate = 0.04;
                    this.baseArmour = 4.0;
                    this.baseWeaponFuelQuality = 1.3;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/opec");
                    this.__name = "Opec II";
                    break;
                case 5: // ew tank type
                    this.baseVelocity = 1.3;
                    this.baseTurnRate = 0.05;
                    this.baseArmour = 4.2;
                    this.baseWeaponFuelQuality = 1.4;
                    this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/opecx");
                    this.__name = "Opec X";
                    break;
            }
        }

        name() {
            return this.__name;
        }

        type() {
            return this.__type;
        }

        armourUpgradeLevel() {
            return this.__armourUpgradeLevel;
        }

        turnRateUpgradeLevel() {
            return this.__turnRateUpgradeLevel;
        }

        velocityUpgradeLevel() {
            return this.__velocityUpgradeLevel;
        }

        weaponFuelUpgradeLevel() {
            return this.__weaponFuelUpgradeLevel;
        }

        weaponFuelQuality() {
            return Math.fround(this.baseWeaponFuelQuality * Math.pow(1.25, this.__weaponFuelUpgradeLevel));
        }

        maximumVelocity() {
            return Math.fround(this.baseVelocity * Math.pow(1.25, this.__velocityUpgradeLevel));
        }

        maximumTurnRate() {
            return Math.fround(this.baseTurnRate * Math.pow(1.25, this.__turnRateUpgradeLevel));
        }

        armour() {
            return Math.fround(this.baseArmour * Math.pow(1.25, this.__armourUpgradeLevel));
        }

        upgradeWeaponFuelQuality() {
            if (this.__weaponFuelUpgradeLevel === 0) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__weaponFuelUpgradeLevel = 1;
            } else if (this.__weaponFuelUpgradeLevel === 1) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__weaponFuelUpgradeLevel = 2;
            }
        }

        upgradeArmour() {
            if (this.__armourUpgradeLevel === 0) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__armourUpgradeLevel = 1;
            } else if (this.__armourUpgradeLevel === 1) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__armourUpgradeLevel = 2;
            }
        }

        upgradeTurnRate() {
            if (this.__turnRateUpgradeLevel === 0) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__turnRateUpgradeLevel = 1;
            } else if (this.__turnRateUpgradeLevel === 1) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__turnRateUpgradeLevel = 2;
            }
        }

        upgradeVelocity() {
            if (this.__velocityUpgradeLevel === 0) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__velocityUpgradeLevel = 1;
            } else if (this.__velocityUpgradeLevel === 1) {
                if (dsector.DSecSetupWindow.soundMode !== 0) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/upgradeSound.wav", (Math.random() * 5.0));
                }
                this.__velocityUpgradeLevel = 2;
            }
        }

        weaponFuelAsPresented() {
            return "" + ((Math.fround(this.weaponFuelQuality() * 10.0)) | 0).toFixed(0);
        }

        turnRateAsPresented() {
            const maxTurnRate = Math.fround(this.maximumTurnRate() * 1000.0);
            const roundedMax = Math.round(maxTurnRate);
            const turnRatePresented = Math.fround(roundedMax / 10.0);
            return "" + turnRatePresented.toFixed(0);
        }

        speedAsPresented() {
            return "" + ((Math.fround(this.maximumVelocity() * 10.0).toFixed(2)) | 0);
        }

        armourAsPresented() {
            const armour = Math.fround(this.armour() * 10.0);
            const rounded = Math.round(armour);
            const presented = Math.fround(rounded / 10.0);
            return "" + presented.toFixed(2);
        }

        matchesShoppingItem(specification) {
            switch ((this.__type)) {
                case TankSpecification.STANDARD_TANK:
                    return specification.specificationID === 400;
                case TankSpecification.ROTRA1:
                    return specification.specificationID === 401;
                case TankSpecification.ROTRA2:
                    return specification.specificationID === 402;
                case TankSpecification.OPEC1:
                    return specification.specificationID === 403;
                case TankSpecification.OPEC2:
                    return specification.specificationID === 404;
                default:
                    return false;
            }
        }

        priceBeforeAllDiscounts() {
            switch ((this.__type)) {
                case TankSpecification.STANDARD_TANK:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(400).price;
                case TankSpecification.ROTRA1:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(401).price;
                case TankSpecification.ROTRA2:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(402).price;
                case TankSpecification.OPEC1:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(403).price;
                case TankSpecification.OPEC2:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(404).price
                case TankSpecification.OPECX:
                    return dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                        dsector.PreBuiltWeaponSpecifications.OPEC_X).price;
                default:
                    return -1;
            }
        }
    }

    TankSpecification.STANDARD_TANK = 0;
    TankSpecification.ROTRA1 = 1;
    TankSpecification.ROTRA2 = 2;
    TankSpecification.OPEC1 = 3;
    TankSpecification.OPEC2 = 4;
    TankSpecification.OPECX = 5;
    dsector.TankSpecification = TankSpecification;
    TankSpecification["__class"] = "dsector.TankSpecification";
})(dsector || (dsector = {}));
