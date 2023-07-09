var dsector;
(function (dsector) {
    class WeaponSpecification {
        /** Creates a new weapon specification.
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
            if (this.specificationID === undefined) {
                this.specificationID = 0;
            }
            if (this.type === undefined) {
                this.type = 0;
            }
            if (this.fullName === undefined) {
                this.fullName = null;
            }
            if (this.shoppingDescription === undefined) {
                this.shoppingDescription = null;
            }
            if (this.abbreviatedName === undefined) {
                this.abbreviatedName = null;
            }
            if (this.portName === undefined) {
                this.portName = null;
            }
            if (this.modelName === undefined) {
                this.modelName = null;
            }
            if (this.portNumber === undefined) {
                this.portNumber = 0;
            }
            if (this.price === undefined) {
                this.price = 0;
            }
            if (this.fuelUse === undefined) {
                this.fuelUse = 0;
            }
            if (this.defaultDamage === undefined) {
                this.defaultDamage = 0;
            }
            if (this.selfHealAmount === undefined) {
                this.selfHealAmount = 0;
            }
            if (this.velocity === undefined) {
                this.velocity = 0;
            }
            if (this.lifeSpanInMilliseconds === undefined) {
                this.lifeSpanInMilliseconds = 0;
            }
            if (this.launchSpecification === undefined) {
                this.launchSpecification = 0;
            }
            if (this.launchOffset === undefined) {
                this.launchOffset = null;
            }
            if (this.actionWhenFiredAfterAlreadyLaunched === undefined) {
                this.actionWhenFiredAfterAlreadyLaunched = 0;
            }
            if (this.actionWhenDestroyed === undefined) {
                this.actionWhenDestroyed = 0;
            }
            if (this.specificationIDForBreakingMissiles === undefined) {
                this.specificationIDForBreakingMissiles = 0;
            }
            if (this.guideSpecification === undefined) {
                this.guideSpecification = 0;
            }
            if (this.guidedTurnRate === undefined) {
                this.guidedTurnRate = 0;
            }
            this.specificationID = specificationID;
            this.type = type;
            this.fullName = fullName;
            this.shoppingDescription = shoppingDescription;
            this.abbreviatedName = abbreviatedName;
            this.portName = portName;
            this.modelName = modelName;
            this.portNumber = portNumber;
            this.price = price;
            this.fuelUse = fuelUse;
            this.defaultDamage = defaultDamage;
            this.velocity = velocity;
            this.lifeSpanInMilliseconds = lifeSpanInMS;
            this.launchSpecification = launchSpec;
            this.launchOffset = launchOffset;
            this.actionWhenFiredAfterAlreadyLaunched = actionWhenFired;
            this.actionWhenDestroyed = actionWhenDestroyed;
            this.specificationIDForBreakingMissiles = wspecIDForBreakingMissiles;
            this.guideSpecification = guideSpecification;
            this.guidedTurnRate = guidedTurnRate;
            this.selfHealAmount = 0;
        }

        /** @private */
        static soundPlay(missile) {
            try {
                dsector.DSReference.cwSound.playSound("assets/sounds/laserMovement.wav", 1);
            } catch (e) {
                CWSYSTEM.Debug.println("Error loading movement sounds from DSecPlayer.fireWeapon(..):" + e);
                CWSYSTEM.Debug.println("Unsupported Audio format: " + e);
                CWSYSTEM.Debug.println("Error loading sound: " + e);
            }
        }

        returnSelf() {
            return new dsector.WeaponSpecification(this.specificationID, false, this.type, this.fullName,
                this.shoppingDescription, this.abbreviatedName, this.portName, this.modelName, this.portNumber,
                this.price, this.fuelUse, this.defaultDamage, this.velocity, this.lifeSpanInMilliseconds,
                this.launchSpecification, this.launchOffset, this.actionWhenFiredAfterAlreadyLaunched,
                this.actionWhenDestroyed, this.specificationIDForBreakingMissiles,
                this.guideSpecification, this.guidedTurnRate);
        }

        actualPrice(player) {
            const itemsOnSpecial = dsector.DSReference.dsecShoppingScreen.itemsOnSpecial;
            if (player == null) {
                return Math.ceil(this.price);
            } else {
                const checked = true;
                let price1 = this.price;
                switch (this.specificationID) {
                    case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE:
                    case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE:
                    case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE:
                    case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE:
                        price1 = player.tankSpecification.priceBeforeAllDiscounts();
                        break;
                    case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE_2:
                    case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE_2:
                    case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE_2:
                    case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE_2:
                        price1 = 2 * player.tankSpecification.priceBeforeAllDiscounts();
                        break;
                }
                price1 = price1 * player.shoppingDiscount();
                if (itemsOnSpecial != null) {
                    for (let index = 0; index < itemsOnSpecial.length; index++) {
                        const objectPair = itemsOnSpecial[index];
                        const specification = objectPair.object1;
                        const object2 = objectPair.object2;
                        if (specification.specificationID === this.specificationID) {
                            price1 = (price1 * (100 - object2) / 100 | 0);
                        }
                    }
                }
                return Math.ceil(price1);
            }
        }

        fireP(player) {
            return this.fire(player, player.getX(), player.getY(), player.getAngle(),
                this.launchOffset, this.defaultDamage);
        }

        alreadyFired(player) {
            if (this.actionWhenFiredAfterAlreadyLaunched !== WeaponSpecification.ACTION_NONE) {
                for (let i = 0; i < dsector.DSReference.dsecMissileManager.missiles.length; ++i) {
                    const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                    if (missile.weaponSpecification === this && player === missile.owner) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * @param {DSecPlayer} owner Owner of the missiles.
         * @param {number} x X co-ordinate of the missile.
         * @param {number} y Y co-ordinate of the missile.
         * @param {number} mAngle The rate of turn the missile can turn.
         * @param {VectorInR3} r3 R3 vector.
         * @param {number} damage Damage the missile will do.
         * @return null | any */
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
                if (this.guideSpecification === WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER) {
                    mAngle = mAngle + 4.71238898038469;
                }
                if (this.actionWhenFiredAfterAlreadyLaunched !== WeaponSpecification.ACTION_NONE &&
                    this.alreadyFired(owner)) {
                    for (let i = 0; i < dsector.DSReference.dsecMissileManager.missiles.length; ++i) {
                        const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                        if (missile.weaponSpecification === this && owner === missile.owner) {
                            missile.destroyWithoutExplosion();
                            const specification = this.returnSelf();
                            specification.launchSpecification = this.actionWhenFiredAfterAlreadyLaunched;
                            specification.actionWhenFiredAfterAlreadyLaunched = WeaponSpecification.ACTION_NONE;
                            specification.fire(owner, missile.getX(), missile.getY(), missile.getAngle(),
                                new dsector.VectorInR3(0.0, 0.0, 0.0), missile.getDamage());
                        }

                    }
                    return null;
                } else {
                    let weaponSpec;
                    const wVector000 = new dsector.VectorInR3(0.0, 0.0, 0.0);
                    if (this.launchSpecification === WeaponSpecification.LAUNCH_FRONT_DOUBLE) {
                        weaponSpec = this.returnSelf();
                        weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        weaponSpec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, 3.5, 0.0), (damage / 2.0));
                        weaponSpec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, -3.5, 0.0), (damage / 2.0));
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_FRONT_TRIPLE) {
                        weaponSpec = this.returnSelf();
                        weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        weaponSpec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, 4.5, 0.0), (damage / 3.0));
                        weaponSpec.fire(owner, x, y, mAngle, wVector000, (damage / 3.0));
                        weaponSpec.fire(owner, x, y, mAngle, new dsector.VectorInR3(0.0, -4.5, 0.0), (damage / 3.0));
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_REAR_DOUBLE) {
                        weaponSpec = this.returnSelf();
                        weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        weaponSpec.fire(owner, x, y, Math.fround((mAngle + 3.141592653589793) % 360.0),
                            new dsector.VectorInR3(0.0, 3.5, 0.0), (damage / 2.0));
                        weaponSpec.fire(owner, x, y, Math.fround((mAngle + 3.141592653589793) % 360.0),
                            new dsector.VectorInR3(0.0, -3.5, 0.0), (damage / 2.0));
                        return null;
                    } else if (this.launchSpecification === WeaponSpecification.LAUNCH_REAR_TRIPLE) {
                        weaponSpec = this.returnSelf();
                        weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                        weaponSpec.fire(owner, x, y, Math.fround((mAngle + 3.141592653589793) % 360.0),
                            new dsector.VectorInR3(0.0, 4.5, 0.0), (damage / 3.0));
                        weaponSpec.fire(owner, x, y, Math.fround((mAngle + 3.141592653589793) % 360.0),
                            wVector000, (damage / 3.0));
                        weaponSpec.fire(owner, x, y, Math.fround((mAngle + 3.141592653589793) % 360.0),
                            new dsector.VectorInR3(0.0, -4.5, 0.0), (damage / 3.0));
                        return null;
                    } else {
                        let fVal;
                        if (this.launchSpecification === WeaponSpecification.LAUNCH_ELECTRO_BUDS) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            fVal = (Math.random() * 3.141592653589793 * 2.0);
                            for (let turn = 0.0; turn < 6.283185307179586; turn = (turn + 0.8975979010256552)) {
                                weaponSpec.fire(owner, x, y, (turn + fVal), wVector000, (damage / 7.0));
                            }
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_BOMB) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.velocity = 12.0;
                            weaponSpec.lifeSpanInMilliseconds = 4000;
                            weaponSpec.modelName = "assets/models/standardMissile";
                            if (this.specificationID === dsector.PreBuiltWeaponSpecifications.DEATH_BOMB) {
                                weaponSpec.modelName = "assets/models/deathSpike";
                            }
                            for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 6.283185307179586 / damage)) {
                                weaponSpec.fire(owner, x, y, fVal, wVector000, 2.0);
                            }
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_TRI_BREAKER) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.5235987755982988),
                                new dsector.VectorInR3(0.0, 0.0, 0.0), (damage * 2.0) / 3.0);
                            weaponSpec.fire(owner, x, y, mAngle, wVector000, (damage * 2.0) / 3.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.5235987755982988),
                                new dsector.VectorInR3(0.0, 0.0, 0.0), (damage * 2.0) / 3.0);
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_QUINT_BREAKER) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.6283185307179586), wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793), wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, mAngle, wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793), wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.6283185307179586), wVector000, Math.fround((2.0 * damage) / 5.0));
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_OCTO_BREAKER) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.7330382858376184), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.5235987755982988), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.10471975511965977), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.10471975511965977), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.5235987755982988), wVector000, Math.fround(2.0 * damage) / 8.0);
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.7330382858376184), wVector000, Math.fround(2.0 * damage) / 8.0);
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_BLAST) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_NOT_GUIDED;
                            for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 12.566370614359172 / damage)) {
                                weaponSpec.fire(owner, x, y, fVal, new dsector.VectorInR3(0.0, 0.0, 0.0), 4.0);
                            }
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_GUIDED_BLAST) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING;
                            for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 12.566370614359172 / damage)) {
                                weaponSpec.fire(owner, x, y, fVal, wVector000, 4.0);
                            }
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_QUINT_GUIDE) {
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING;
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.6283185307179586),
                                wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle - 0.3141592653589793),
                                wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, mAngle, wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.3141592653589793),
                                wVector000, Math.fround((2.0 * damage) / 5.0));
                            weaponSpec.fire(owner, x, y, Math.fround(mAngle + 0.6283185307179586),
                                wVector000, Math.fround((2.0 * damage) / 5.0));
                            return null;
                        } else if (this.launchSpecification === WeaponSpecification.LAUNCH_SWARM_MISSLE) {
                            let mspec = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                                dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE);
                            mspec.fire(owner, x, y, mAngle, wVector000, 5.0);
                            weaponSpec = this.returnSelf();
                            weaponSpec.launchSpecification = WeaponSpecification.LAUNCH_FRONT_SINGLE;
                            weaponSpec.actionWhenDestroyed = WeaponSpecification.DESTROY_AS_SMALL_BLAST;
                            weaponSpec.guideSpecification = WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST;
                            weaponSpec.guidedTurnRate = 8.0;
                            weaponSpec.modelName = "assets/models/deathSpike";
                            let sVector = new dsector.VectorInR3(0, -3, 0); // offset location
                            let angle = Math.fround(mAngle - 0.6283185307179586); // launch angle bottom
                            for (let nx = 0; nx < 8; ++nx) {
                                sVector.subtract(6, 1, 0);
                                weaponSpec.fire(owner, x, y, angle, sVector, 5.0);
                            }
                            angle = Math.fround(mAngle + 0.6283185307179586); // launch angle top
                            sVector = new dsector.VectorInR3(0, -3, 0);
                            for (let nx = 0; nx < 8; ++nx) {
                                sVector.subtract(6, 0, 0);
                                sVector.add(0, 1, 0);
                                weaponSpec.fire(owner, x, y, angle, sVector, 5.0);
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
                                vector.rotateVectorFromOriginAboutAxis$int$float(2, owner.getAngle());
                                missile.setX(x + vector.x);
                                missile.setY(y + vector.y);
                                missile.setDamage(damage);
                                dsector.DSReference.dsecMissileManager.addMissile(missile);
                                if (this.specificationID === dsector.PreBuiltWeaponSpecifications.TRI_STRIKER) {
                                    if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                                        switch ((((Math.random() * 3.0) | 0))) {
                                            case 0:
                                                dsector.DSReference.cwSound.playSound("assets/sounds/powerLaser.wav",
                                                    (Math.random() * 10.0));
                                                break;
                                            case 1:
                                                dsector.DSReference.cwSound.playSound("assets/sounds/powerLaser2.wav",
                                                    (Math.random() * 10.0));
                                                break;
                                            case 2:
                                                dsector.DSReference.cwSound.playSound("assets/sounds/beamLaser2.wav",
                                                    (Math.random() * 10.0));
                                        }
                                    }
                                    if (dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                        WeaponSpecification.soundPlay(missile);
                                    }
                                }
                                if (this.specificationID === dsector.PreBuiltWeaponSpecifications.POWER_LASER) {
                                    if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                                        if ((Math.random() * 2.0) === 0) {
                                            dsector.DSReference.cwSound.playSound("assets/sounds/powerLaser.wav",
                                                (Math.random() * 10.0));
                                        } else {
                                            dsector.DSReference.cwSound.playSound("assets/sounds/powerLaser2.wav",
                                                (Math.random() * 10.0));

                                        }
                                    }
                                    if (dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                        WeaponSpecification.soundPlay(missile);
                                    }
                                }
                                if (this.specificationID === dsector.PreBuiltWeaponSpecifications.BEAM_LASER) {
                                    if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                                        if ((Math.random() * 2.0) === 0) {
                                            dsector.DSReference.cwSound.playSound("assets/sounds/powerLaser2.wav",
                                                (Math.random() * 10.0));
                                        } else {
                                            dsector.DSReference.cwSound.playSound("assets/sounds/beamLaser2.wav",
                                                (Math.random() * 10.0));
                                        }
                                    }
                                    if (dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                        WeaponSpecification.soundPlay(missile);
                                    }
                                }
                                return missile;
                            }
                        } else {
                            weaponSpec = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                                dsector.PreBuiltWeaponSpecifications.SWIRLER);
                            for (fVal = 0.0; fVal < 6.283185307179586; fVal = (fVal + 0.7853981633974483)) {
                                weaponSpec.fire(owner, x, y, fVal, new dsector.VectorInR3(0.0, 0.0, 0.0),
                                    (2.0 * damage) / 8.0);
                            }
                            return null;
                        }
                    }
                }
            }
        }

        /** @private */
        fireHealer(player) {
            player.weaponEnergy -= this.fuelUse;
            player.shields += this.defaultDamage;
            if (player.shields > 100.0) {
                player.shields = 100.0;
            }
        }

        /** @private */
        teleportSelf(player) {
            player.teleport();
        }

        /** @private */
        teleportFoe(player) {
            const closestEnemyPlayer = player.getClosestEnemyPlayer();
            if (closestEnemyPlayer != null) {
                closestEnemyPlayer.teleport();
            }
        }

        /** @private */
        fireECMHacker(player) {
            for (let i = dsector.DSReference.dsecMissileManager.missiles.length - 1; i >= 0; --i) {
                const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                const distance = Math.sqrt(Math.pow(player.getX() - missile.getX(), 2.0) + Math.pow(player.getY() - missile.getY(), 2.0));
                if (distance < 72.0) {
                    missile.destroy();
                }
            }
        }

        /** @private */
        fireECMWiper(player) {
            for (let i = dsector.DSReference.dsecMissileManager.missiles.length - 1; i >= 0; --i) {
                const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                missile.destroy();
            }
        }
    }

    WeaponSpecification.TANK = 0;
    WeaponSpecification.ITEM = 1;
    WeaponSpecification.LASER = 2;
    WeaponSpecification.PROJECTILE = 3;
    WeaponSpecification.TOUCH = 5;
    WeaponSpecification.HEALER = 6;
    WeaponSpecification.SHIELD = 7;
    WeaponSpecification.TELEPORT_SELF = 8;
    WeaponSpecification.TELEPORT_FOE = 9;
    WeaponSpecification.WIPER = 10;
    WeaponSpecification.HACKER = 11;
    WeaponSpecification.ACTION_NONE = 0;
    WeaponSpecification.LAUNCH_FRONT_SINGLE = 1;
    WeaponSpecification.LAUNCH_FRONT_DOUBLE = 2;
    WeaponSpecification.LAUNCH_FRONT_TRIPLE = 3;
    WeaponSpecification.LAUNCH_REAR_SINGLE = 4;
    WeaponSpecification.LAUNCH_REAR_DOUBLE = 5;
    WeaponSpecification.LAUNCH_REAR_TRIPLE = 6;
    WeaponSpecification.LAUNCH_ELECTRO_BUDS = 7;
    WeaponSpecification.LAUNCH_TRI_BREAKER = 8;
    WeaponSpecification.LAUNCH_QUINT_BREAKER = 9;
    WeaponSpecification.LAUNCH_OCTO_BREAKER = 10;
    WeaponSpecification.LAUNCH_BLAST = 11;
    WeaponSpecification.LAUNCH_GUIDED_BLAST = 12;
    WeaponSpecification.LAUNCH_BLAST_SWIRLER = 13;
    WeaponSpecification.LAUNCH_BOMB = 14;
    WeaponSpecification.DESTROY_AS_SMALL_BLAST = 15;
    WeaponSpecification.DESTROY_AS_MEDIUM_BLAST = 16;
    WeaponSpecification.LAUNCH_QUINT_GUIDE = 17;
    WeaponSpecification.LAUNCH_SWARM_MISSLE = 18;
    WeaponSpecification.GUIDE_SPECIFICATION_NOT_GUIDED = 0;
    WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST = 1;
    WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING = 2;
    WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER = 3;
    dsector.WeaponSpecification = WeaponSpecification;
    WeaponSpecification["__class"] = "dsector.WeaponSpecification";
})(dsector || (dsector = {}));
