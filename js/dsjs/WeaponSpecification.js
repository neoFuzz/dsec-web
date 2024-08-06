import {dsector} from './dsector.js';

/**
 * Class representing a weapon specification.
 *
 * @property {number} specificationID - The ID of the weapon specification.
 * @property {boolean} unUsed - Unused boolean parameter.
 * @property {number} type - The type of the weapon.
 * @property {string} fullName - The full name of the weapon.
 * @property {string} shoppingDescription - The shopping description of the weapon.
 * @property {string} abbreviatedName - The abbreviated name of the weapon.
 * @property {string} portName - The port name of the weapon.
 * @property {string} modelName - The model name of the weapon.
 * @property {number} portNumber - The port number of the weapon.
 * @property {number} price - The price of the weapon.
 * @property {number} fuelUse - The fuel usage of the weapon.
 * @property {number} defaultDamage - The default damage the weapon does.
 * @property {number} velocity - The velocity of the weapon.
 * @property {number} lifeSpanInMS - The lifespan of the weapon in milliseconds.
 * @property {number} launchSpec - The launch specification (unknown type).
 * @property {VectorInR3} launchOffset - The launch offset (unknown type).
 * @property {number} actionWhenFired - The action when fired (unknown type).
 * @property {number} actionWhenDestroyed - The action when destroyed (unknown type).
 * @property {number} wspecIDForBreakingMissiles - The ID for breaking missiles.
 * @property {number} guideSpecification - The guide specification (unknown type).
 * @property {number} guidedTurnRate - The guided turn rate of the weapon.
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
export class WeaponSpecification {
    /**
     * Creates a new weapon specification.
     *
     * @param {number} specificationID - The ID of the weapon specification.
     * @param {boolean} unUsed - Unused boolean parameter.
     * @param {number} type - The type of the weapon.
     * @param {string} fullName - The full name of the weapon.
     * @param {string} shoppingDescription - The shopping description of the weapon.
     * @param {string} abbreviatedName - The abbreviated name of the weapon.
     * @param {string} portName - The port name of the weapon.
     * @param {string} modelName - The model name of the weapon.
     * @param {number} portNumber - The port number of the weapon.
     * @param {number} price - The price of the weapon.
     * @param {number} fuelUse - The fuel usage of the weapon.
     * @param {number} defaultDamage - The default damage the weapon does.
     * @param {number} velocity - The velocity of the weapon.
     * @param {number} lifeSpanInMS - The lifespan of the weapon in milliseconds.
     * @param {number} launchSpec - The launch specification (unknown type).
     * @param {VectorInR3} launchOffset - The launch offset (unknown type).
     * @param {number} actionWhenFired - The action when fired (unknown type).
     * @param {number} actionWhenDestroyed - The action when destroyed (unknown type).
     * @param {number} wspecIDForBreakingMissiles - The ID for breaking missiles.
     * @param {number} guideSpecification - The guide specification (unknown type).
     * @param {number} guidedTurnRate - The guided turn rate of the weapon.
     */
    constructor(specificationID, unUsed, type, fullName, shoppingDescription,
                abbreviatedName, portName, modelName, portNumber, price, fuelUse,
                defaultDamage, velocity, lifeSpanInMS, launchSpec, launchOffset,
                actionWhenFired, actionWhenDestroyed, wspecIDForBreakingMissiles,
                guideSpecification, guidedTurnRate) {
        this.specificationID = specificationID;
        this.type = type;
        this.fullName = fullName || null;
        this.shoppingDescription = shoppingDescription || null;
        this.abbreviatedName = abbreviatedName || null;
        this.portName = portName || null;
        this.modelName = modelName || null;
        this.portNumber = portNumber || 0;
        this.price = price || 0;
        this.fuelUse = fuelUse || 0;
        this.defaultDamage = defaultDamage || 0;
        this.velocity = velocity || 0;
        this.lifeSpanInMilliseconds = lifeSpanInMS || 0;
        this.launchSpecification = launchSpec || 0;
        this.launchOffset = launchOffset || null;
        this.actionWhenFiredAfterAlreadyLaunched = actionWhenFired || 0;
        this.actionWhenDestroyed = actionWhenDestroyed || 0;
        this.specificationIDForBreakingMissiles = wspecIDForBreakingMissiles || 0;
        this.guideSpecification = guideSpecification || 0;
        this.guidedTurnRate = guidedTurnRate || 0;
        this.selfHealAmount = 0;
    }

    /**
     * Play a sound from the buffer.
     *
     * @param {number} m unused Missile parameter
     * @private
     */
    static soundPlay(m) {
        dsector.DSReference.cwSound.playSound("laserMovement.wav");
    }

    /**
     * Creates and returns a clone of the current WeaponSpecification instance.
     *
     * @returns {dsector.WeaponSpecification} A new instance of WeaponSpecification with the same properties.
     */
    returnSelf() {
        return new dsector.WeaponSpecification(this.specificationID, false, this.type, this.fullName,
            this.shoppingDescription, this.abbreviatedName, this.portName, this.modelName, this.portNumber,
            this.price, this.fuelUse, this.defaultDamage, this.velocity, this.lifeSpanInMilliseconds,
            this.launchSpecification, this.launchOffset, this.actionWhenFiredAfterAlreadyLaunched,
            this.actionWhenDestroyed, this.specificationIDForBreakingMissiles,
            this.guideSpecification, this.guidedTurnRate);
    }

    /**
     * Returns the actual price of the weapon based on whether the discount card is in the player's inventory.
     * If the player is null, it returns the base price.
     * Otherwise, it calculates the price based on the tank specification and any applicable discounts.
     *
     * @param {dsector.DSecPlayer} p The player object.
     * @returns {number} The actual price of the weapon.
     */
    actualPrice(p) {
        const itemsOnSpecial = dsector.DSReference.dsecShoppingScreen.itemsOnSpecial;
        if (p == null) {
            return Math.ceil(this.price);
        } else {
            let price1 = this.price;
            switch (this.specificationID) {
                case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE:
                case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE:
                case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE:
                case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE:
                    price1 = p.tankSpecification.priceBeforeAllDiscounts();
                    break;
                case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE_2:
                case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE_2:
                case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE_2:
                case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE_2:
                    price1 = 2 * p.tankSpecification.priceBeforeAllDiscounts();
                    break;
            }
            price1 = price1 * p.shoppingDiscount();
            if (itemsOnSpecial != null) {
                for (const item of itemsOnSpecial) {
                    const specification = item.object1;
                    const object2 = item.object2;
                    if (specification.specificationID === this.specificationID) {
                        price1 = (price1 * (100 - object2) / 100 | 0);
                    }
                }
            }
            return Math.ceil(price1);
        }
    }

    /**
     * Fires the weapon at the specified position and angle from the player.
     *
     * @param {DSecPlayer} p The player firing the weapon.
     * @returns {DSecMissile} The fired missile, or null if the weapon type is not recognized.
     */
    fireP(p) {
        return this.fire(p, p.getX(), p.getY(), p.getAngle(),
            this.launchOffset, this.defaultDamage);
    }

    /**
     * Checks if the weapon has already been fired by the player.
     *
     * @param {DSecPlayer} p The player to check for.
     * @returns {boolean} True if the weapon has already been fired, false otherwise.
     */
    alreadyFired(p) {
        if (this.actionWhenFiredAfterAlreadyLaunched !== WeaponSpecification.ACTION_NONE) {
            for (const m of dsector.DSReference.dsecMissileManager.missiles) {
                if (m.weaponSpecification === this && p === m.owner) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Fires the weapon at the specified position and angle from the player.
     *
     * @param {DSecPlayer} owner Owner of the missiles.
     * @param {number} x X co-ordinate of the missile.
     * @param {number} y Y co-ordinate of the missile.
     * @param {number} mAngle The rate of turn the missile can turn.
     * @param {VectorInR3} r3 R3 vector.
     * @param {number} damage Damage the missile will do.
     * @returns {null|DSecMissile} The fired missile, or null if the weapon type is not recognized.
     */
    fire(owner, x, y, mAngle, r3, damage) {
        if (this.type === WeaponSpecification.TELEPORT_SELF) {
            this.teleportSelf(owner);
            return null;
        } else if (this.type === WeaponSpecification.TELEPORT_FOE) {
            this.teleportFoe(owner);
            return null;
        } else if (this.type === WeaponSpecification.SHIELD) {
            owner.turnShieldOn(this);
            return null;
        } else if (this.type === WeaponSpecification.HEALER) {
            this.fireHealer(owner);
            return null;
        } else if (this.type === WeaponSpecification.HACKER) {
            this.fireECMHacker(owner);
            return null;
        } else if (this.type === WeaponSpecification.WIPER) {
            this.fireECMWiper(owner);
            return null;
        } else if (this.type === WeaponSpecification.TOUCH) {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                let d = owner.distanceToPlayer(player);
                if (player !== owner && player.aliveState !== dsector.DSecPlayer.DESTROYED && d < 43) {
                    // Player takes damage directly
                    let missile = new dsector.DSecMissile(owner,
                        dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                            dsector.PreBuiltWeaponSpecifications.DEATH_TOUCH));
                    missile.setDamage(15);
                    player.takeDamage(missile);
                    break;
                }
            }
            return null;
        } else {
            const p = dsector.DSReference.dsecSetupWindow.soundMode;
            if (this.guideSpecification === WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER) {
                mAngle = mAngle + 4.71238898038469;
            }
            if (this.actionWhenFiredAfterAlreadyLaunched !== WeaponSpecification.ACTION_NONE &&
                this.alreadyFired(owner)) {
                for (const m of dsector.DSReference.dsecMissileManager.missiles) {
                    if (m.weaponSpecification === this && owner === m.owner) {
                        m.destroyWithoutExplosion();
                        const specification = this.returnSelf();
                        specification.launchSpecification = this.actionWhenFiredAfterAlreadyLaunched;
                        specification.actionWhenFiredAfterAlreadyLaunched = WeaponSpecification.ACTION_NONE;
                        specification.fire(owner, m.getX(), m.getY(), m.getAngle(),
                            new dsector.VectorInR3(0.0, 0.0, 0.0), m.getDamage());
                    }

                }
                return null;
            } else {
                let w_Spec;
                const v000 = new dsector.VectorInR3(0.0, 0.0, 0.0);
                if (this.launchSpecification === WeaponSpecification.LAUNCH_FRONT_DOUBLE) {
                    w_Spec = this.returnSelf();
                    w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                    w_Spec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, 3.5, 0.0), (damage / 2.0));
                    w_Spec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, -3.5, 0.0), (damage / 2.0));
                    return null;
                } else if (this.launchSpecification === WeaponSpecification.LAUNCH_FRONT_TRIPLE) {
                    w_Spec = this.returnSelf();
                    w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                    w_Spec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, 4.5, 0.0), (damage / 3.0));
                    w_Spec.fire(owner, x, y, mAngle, v000, (damage / 3.0));
                    w_Spec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, -4.5, 0.0), (damage / 3.0));
                    return null;
                } else if (this.launchSpecification === WeaponSpecification.LAUNCH_REAR_DOUBLE) {
                    w_Spec = this.returnSelf();
                    w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                    w_Spec.fire(owner, x, y, Math.fround((mAngle + Math.PI) % 360.0), /*3.141592653589793*/
                        new dsector.VectorInR3(0.0, 3.5, 0.0), (damage / 2.0));
                    w_Spec.fire(owner, x, y, Math.fround((mAngle + Math.PI) % 360.0),
                        new dsector.VectorInR3(0.0, -3.5, 0.0), (damage / 2.0));
                    return null;
                } else if (this.launchSpecification === WeaponSpecification.LAUNCH_REAR_TRIPLE) {
                    w_Spec = this.returnSelf();
                    w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                    w_Spec.fire(owner, x, y, Math.fround((mAngle + Math.PI) % 360.0),
                        new dsector.VectorInR3(0.0, 4.5, 0.0), (damage / 3.0));
                    w_Spec.fire(owner, x, y, Math.fround((mAngle + Math.PI) % 360.0),
                        v000, (damage / 3.0));
                    w_Spec.fire(owner, x, y, Math.fround((mAngle + Math.PI) % 360.0),
                        new dsector.VectorInR3(0.0, -4.5, 0.0), (damage / 3.0));
                    return null;
                } else {
                    let fVal;
                    if (this.launchSpecification === WeaponSpecification.LAUNCH_ELECTRO_BUDS) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        fVal = (Math.random() * Math.PI * 2.0);
                        for (let turn = 0.0; turn < 6.283185307179586; turn = (turn + 0.8975979010256552)) {
                            w_Spec.fire(owner, x, y, (turn + fVal), v000, (damage / 7.0));
                        }
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_BOMB) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.velocity = 12.0;
                        w_Spec.lifeSpanInMilliseconds = 4000;
                        w_Spec.modelName = "assets/models/standardMissile";
                        if (this.specificationID === dsector.PreBuiltWeaponSpecifications.DEATH_BOMB) {
                            w_Spec.modelName = "assets/models/deathSpike";
                        }
                        for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 6.283185307179586 / damage)) {
                            w_Spec.fire(owner, x, y, fVal, v000, 2.0);
                        }
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_TRI_BREAKER) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.5235987755982988),
                            new dsector.VectorInR3(0.0, 0.0, 0.0), (damage * 2.0) / 3.0);
                        w_Spec.fire(owner, x, y, mAngle, v000, (damage * 2.0) / 3.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.5235987755982988),
                            new dsector.VectorInR3(0.0, 0.0, 0.0), (damage * 2.0) / 3.0);
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_QUINT_BREAKER) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.6283185307179586), v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793), v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, mAngle, v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793), v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.6283185307179586), v000, Math.fround((2.0 * damage) / 5.0));
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_OCTO_BREAKER) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.7330382858376184), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.5235987755982988), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.10471975511965977), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.10471975511965977), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.5235987755982988), v000, Math.fround(2.0 * damage) / 8.0);
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.7330382858376184), v000, Math.fround(2.0 * damage) / 8.0);
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_BLAST) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_NOT_GUIDED;
                        for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 12.566370614359172 / damage)) {
                            w_Spec.fire(owner, x, y, fVal, new dsector.VectorInR3(0.0, 0.0, 0.0), 4.0);
                        }
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_GUIDED_BLAST) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING;
                        for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 12.566370614359172 / damage)) {
                            w_Spec.fire(owner, x, y, fVal, v000, 4.0);
                        }
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_QUINT_GUIDE) {
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING;
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.6283185307179586),
                            v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793),
                            v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, mAngle, v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793),
                            v000, Math.fround((2.0 * damage) / 5.0));
                        w_Spec.fire(owner, x, y, Math.fround(mAngle + 0.6283185307179586),
                            v000, Math.fround((2.0 * damage) / 5.0));
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_SWARM_MISSLE) {
                        let mspec = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                            dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE);
                        mspec.fire(owner, x, y, mAngle, v000, 5.0);
                        w_Spec = this.returnSelf();
                        w_Spec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        w_Spec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                        w_Spec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST;
                        w_Spec.guidedTurnRate = 8.0;
                        w_Spec.modelName = "assets/models/deathSpike";
                        let sVector = new dsector.VectorInR3(0, -3, 0); // offset location
                        let angle = Math.fround(mAngle - 0.6283185307179586); // launch angle bottom
                        for (let nx = 0; nx < 8; ++nx) {
                            sVector.subtract(6, 1, 0);
                            w_Spec.fire(owner, x, y, angle, sVector, 5.0);
                        }
                        angle = Math.fround(mAngle + 0.6283185307179586); // launch angle top
                        sVector = new dsector.VectorInR3(0, -3, 0);
                        for (let nx = 0; nx < 8; ++nx) {
                            sVector.subtract(6, 0, 0);
                            sVector.add(0, 1, 0);
                            w_Spec.fire(owner, x, y, angle, sVector, 5.0);
                        }
                        return null;
                    } else if (this.launchSpecification !== WeaponSpecification.LAUNCH_BLAST_SWIRLER) {
                        if (this.type !== WeaponSpecification.PROJECTILE && this.type !== WeaponSpecification.LASER) {
                            dsector.DSReference.alertManager.messageQueued("Weapon type " + this.type +
                                " not yet implemented in WeaponSpecification.fire(..)");
                            return null;
                        } else {
                            const missile = new dsector.DSecMissile(owner, this);
                            missile.setAngle(mAngle);
                            const vector = new dsector.VectorInR3(r3);
                            vector.rotateAroundAxis(2, owner.getAngle());
                            missile.setX(x + vector.x);
                            missile.setY(y + vector.y);
                            missile.setDamage(damage);
                            dsector.DSReference.dsecMissileManager.addMissile(missile);
                            if (this.specificationID === dsector.PreBuiltWeaponSpecifications.TRI_STRIKER) {
                                if (p !== dsector.DSecSetupWindow.NO_SOUND) {
                                    switch ((((Math.random() * 3.0) | 0))) {
                                        case 0:
                                            dsector.DSReference.cwSound.playSound("powerLaser.wav",
                                                (Math.random() * 10.0));
                                            break;
                                        case 1:
                                            dsector.DSReference.cwSound.playSound("powerLaser2.wav",
                                                (Math.random() * 10.0));
                                            break;
                                        case 2:
                                            dsector.DSReference.cwSound.playSound("beamLaser2.wav",
                                                (Math.random() * 10.0));
                                    }
                                }
                                if (p === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                    WeaponSpecification.soundPlay(missile);
                                }
                            }
                            if (this.specificationID === dsector.PreBuiltWeaponSpecifications.POWER_LASER) {
                                if (p !== dsector.DSecSetupWindow.NO_SOUND) {
                                    if ((Math.random() * 2.0) === 0) {
                                        dsector.DSReference.cwSound.playSound("powerLaser.wav",
                                            (Math.random() * 10.0));
                                    } else {
                                        dsector.DSReference.cwSound.playSound("powerLaser2.wav",
                                            (Math.random() * 10.0));

                                    }
                                }
                                if (p === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                    WeaponSpecification.soundPlay(missile);
                                }
                            }
                            if (this.specificationID === dsector.PreBuiltWeaponSpecifications.BEAM_LASER) {
                                if (p !== dsector.DSecSetupWindow.NO_SOUND) {
                                    if ((Math.random() * 2.0) === 0) {
                                        dsector.DSReference.cwSound.playSound("powerLaser2.wav",
                                            (Math.random() * 10.0));
                                    } else {
                                        dsector.DSReference.cwSound.playSound("beamLaser2.wav",
                                            (Math.random() * 10.0));
                                    }
                                }
                                if (p === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                    WeaponSpecification.soundPlay(missile);
                                }
                            }
                            return missile;
                        }
                    } else {
                        w_Spec = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                            dsector.PreBuiltWeaponSpecifications.SWIRLER);
                        for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 0.7853981633974483)) {
                            w_Spec.fire(owner, x, y, fVal, new dsector.VectorInR3(0.0, 0.0, 0.0),
                                (2.0 * damage) / 8.0);
                        }
                        return null;
                    }
                }
            }
        }
    }

    /**
     * Fire a healer weapon.
     *
     * @private
     * @param {DSecPlayer} p the player to fire the healer weapon for.
     */
    fireHealer(p) {
        p.weaponEnergy -= this.fuelUse;
        p.shields += this.defaultDamage;
        if (p.shields > 100.0) {
            p.shields = 100.0;
        }
    }

    /**
     * Teleport the player to a random location.
     *
     * @private
     * @param {DSecPlayer} p the player to teleport.
     */
    teleportSelf(p) {
        p.teleport();
    }

    /**
     * Teleport the closest enemy player to a random location.
     *
     * @private
     * @param {DSecPlayer} p the player to teleport the enemy player for.
     */
    teleportFoe(p) {
        const closestEnemyPlayer = p.getClosestEnemyPlayer();
        if (closestEnemyPlayer != null) {
            closestEnemyPlayer.teleport();
        }
    }

    /**
     * Search for missiles in range of the player and destroy them
     *
     * @private
     * @param {DSecPlayer} p the player to search for missiles in range from.
     */
    fireECMHacker(p) {
        for (let i = dsector.DSReference.dsecMissileManager.missiles.length - 1; i >= 0; --i) {
            const missile = dsector.DSReference.dsecMissileManager.missiles[i];
            const distance = Math.sqrt(Math.pow(p.getX() - missile.getX(), 2.0) +
                Math.pow(p.getY() - missile.getY(), 2.0));
            if (distance < 72.0) {
                missile.destroy();
            }
        }
    }

    /**
     * Destroy all missiles.
     *
     * @private
     * @param {DSecPlayer} p the player to search for missiles in range from.
     */
    fireECMWiper(p) {
        for (let i = dsector.DSReference.dsecMissileManager.missiles.length - 1; i >= 0; --i) {
            const missile = dsector.DSReference.dsecMissileManager.missiles[i];
            missile.destroy();
        }
    }


    /**
     * Represents the weapon specification for a tank.
     *
     * @constant {number}
     * @default 0
     */
    static TANK = 0;
    /**
     * Represents the weapon specification for an item.
     *
     * @constant {number}
     * @default 1
     */
    static ITEM = 1;
    /**
     * Represents the weapon specification for a laser.
     * @constant {number}
     * @default 2
     */
    static LASER = 2;
    /**
     * Represents the weapon specification for a projectile.
     * @constant {number}
     * @default 3
     */
    static PROJECTILE = 3;
    /**
     * Represents the weapon specification for Death Touch.
     * @constant {number}
     * @default 5
     */
    static TOUCH = 5;
    /**
     * Represents the weapon specification for a healer.
     * @constant {number}
     * @default 6
     */
    static HEALER = 6;
    /**
     * Represents the weapon specification for a shield.
     * @constant {number}
     * @default 7
     */
    static SHIELD = 7;
    /**
     * Represents the weapon specification for teleporting the player.
     * @constant {number}
     * @default 8
     */
    static TELEPORT_SELF = 8;
    /**
     * Represents the weapon specification for teleporting the closest enemy player.
     * @constant {number}
     * @default 9
     */
    static TELEPORT_FOE = 9;
    /**
     * Represents the weapon specification for an ECM Hacker.
     * @constant {number}
     * @default 10
     */
    static WIPER = 10;
    /**
     * Represents the weapon specification for a hacker.
     *
     * @constant {number}
     * @default 11
     */
    static HACKER = 11;

    /**
     * Represents no action.
     *
     * @constant {number}
     * @default 0
     */
    static ACTION_NONE = 0;

    /**
     * Represents the launch of a single front weapon.
     *
     * @constant {number}
     * @default 1
     */
    static LAUNCH_FRONT_SINGLE = 1;

    /**
     * Represents the launch of a double front weapon.
     *
     * @constant {number}
     * @default 2
     */
    static LAUNCH_FRONT_DOUBLE = 2;

    /**
     * Represents the launch of a triple front weapon.
     *
     * @constant {number}
     * @default 3
     */
    static LAUNCH_FRONT_TRIPLE = 3;

    /**
     * Represents the launch of a single rear weapon.
     *
     * @constant {number}
     * @default 4
     */
    static LAUNCH_REAR_SINGLE = 4;

    /**
     * Represents the launch of a double rear weapon.
     *
     * @constant {number}
     * @default 5
     */
    static LAUNCH_REAR_DOUBLE = 5;

    /**
     * Represents the launch of a triple rear weapon.
     *
     * @constant {number}
     * @default 6
     */
    static LAUNCH_REAR_TRIPLE = 6;

    /**
     * Represents the launch of electro buds.
     *
     * @constant {number}
     * @default 7
     */
    static LAUNCH_ELECTRO_BUDS = 7;

    /**
     * Represents the launch of a tri-breaker weapon.
     *
     * @constant {number}
     * @default 8
     */
    static LAUNCH_TRI_BREAKER = 8;

    /**
     * Represents the launch of a quint-breaker weapon.
     *
     * @constant {number}
     * @default 9
     */
    static LAUNCH_QUINT_BREAKER = 9;

    /**
     * Represents the launch of an octo-breaker weapon.
     *
     * @constant {number}
     * @default 10
     */
    static LAUNCH_OCTO_BREAKER = 10;

    /**
     * Represents the launch of a blast weapon.
     *
     * @constant {number}
     * @default 11
     */
    static LAUNCH_BLAST = 11;

    /**
     * Represents the launch of a guided blast weapon.
     *
     * @constant {number}
     * @default 12
     */
    static LAUNCH_GUIDED_BLAST = 12;

    /**
     * Represents the launch of a blast swirler weapon.
     *
     * @constant {number}
     * @default 13
     */
    static LAUNCH_BLAST_SWIRLER = 13;

    /**
     * Represents the launch of a bomb weapon.
     *
     * @constant {number}
     * @default 14
     */
    static LAUNCH_BOMB = 14;

    /**
     * Represents destruction as a small blast.
     *
     * @constant {number}
     * @default 15
     */
    static DESTROY_AS_SMALL_BLAST = 15;

    /**
     * Represents destruction as a medium blast.
     *
     * @constant {number}
     * @default 16
     */
    static DESTROY_AS_MEDIUM_BLAST = 16;

    /**
     * Represents the launch of a quint guide weapon.
     *
     * @constant {number}
     * @default 17
     */
    static LAUNCH_QUINT_GUIDE = 17;

    /**
     * Represents the launch of a swarm missile weapon.
     *
     * @constant {number}
     * @default 18
     */
    static LAUNCH_SWARM_MISSLE = 18;

    /**
     * Represents the specification for not guided weapons.
     *
     * @constant {number}
     * @default 0
     */
    static GUIDE_SPECIFICATION_NOT_GUIDED = 0;

    /**
     * Represents the specification for seeking the nearest target.
     *
     * @constant {number}
     * @default 1
     */
    static GUIDE_SPECIFICATION_SEEK_NEAREST = 1;

    /**
     * Represents the specification for seeking the nearest moving target.
     *
     * @constant {number}
     * @default 2
     */
    static GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING = 2;

    /**
     * Represents the specification for swirler weapons.
     *
     * @constant {number}
     * @default 3
     */
    static GUIDE_SPECIFICATION_SWIRLER = 3;
}