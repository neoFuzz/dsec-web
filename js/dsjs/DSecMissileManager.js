/**/
(function (dsector) {
    /**
     * @class
     * @memberof dsector
     */
    class DSecMissileManager {
        constructor() {
            this.missiles = ([]);
        }

        addMissile(missile) {
            this.missiles.push(missile);
        }

        moveMissiles() {
            const arrayList = (this.missiles.slice(0));
            for (let i = 0; i < arrayList.length; ++i) {
                const missile = arrayList[i];
                if (missile.timedOut()) {
                    missile.destroy();
                    (a => {
                        let index = a.indexOf(missile);
                        if (index >= 0) {
                            a.splice(index, 1);
                            return true;
                        } else {
                            return false;
                        }
                    })(this.missiles);
                } else {
                    let angle = missile.getAngle();
                    let velocity = missile.weaponSpecification.velocity;
                    let dTan;
                    if (missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING ||
                        missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST) {
                        const player = missile.weaponSpecification.guideSpecification === 1 ?
                            this.getEnemyTankClosestToMissile(missile.owner, missile) :
                            this.getMovingEnemyTankClosestToMissile(missile.owner, missile);
                        if (player != null) {
                            const xx = player.getX() - missile.getX();
                            const yy = player.getY() - missile.getY();
                            dTan = Math.fround(Math.atan2(yy, xx));
                            let mAngle = missile.getAngle();
                            dTan = Math.fround((dTan + 6.283185307179586) % 6.2831855);
                            mAngle = Math.fround((mAngle + 6.283185307179586) % 6.2831855);
                            let dist = 1;
                            if (dTan > mAngle) {
                                dist = -1;
                            }
                            let abs = Math.abs(Math.fround(dTan - mAngle));
                            if (abs > 3.141592653589793) {
                                dist = -dist;
                                abs = Math.fround(6.2831855 - abs);
                            }
                            const turnRate = missile.weaponSpecification.guidedTurnRate;
                            if (velocity > 25.0) {
                                velocity = Math.fround(velocity * 3.2358403 - abs / Math.PI);
                            }
                            angle = Math.fround(missile.getAngle() - turnRate / 50.0 * dist *
                                DSecMissileManager.missileRelativeSpeedup * dsector.DSReference.dsecGame.gameSpeed());
                        }
                    }
                    const spX = missile.getX() + Math.cos(missile.getAngle()) * 0.550000011920929 * velocity * dsector.DSReference.dsecGame.gameSpeed();
                    const spY = missile.getY() + Math.sin(missile.getAngle()) * 0.550000011920929 * velocity * dsector.DSReference.dsecGame.gameSpeed();
                    if (missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER) {
                        if (missile.getFixedTurnRate() === 0.0) {
                            missile.setFixedTurnRate(Math.fround(0.165 * dsector.DSReference.dsecGame.gameSpeed()));
                        }
                        angle += missile.getFixedTurnRate();
                        const speedRef = Math.fround(0.165 * dsector.DSReference.dsecGame.gameSpeed());
                        missile.setFixedTurnRate(Math.fround(missile.getFixedTurnRate() * (100.0 - speedRef) / 100.0));
                    }
                    const model = dsector.DSReference.modelLoader.getModel(missile.weaponSpecification.modelName);
                    dTan = model.maximumDistanceOfVertexToCenterWhenModelLoaded();
                    const sqrt = Math.sqrt((spX - missile.getX()) * (spX - missile.getX()) + (spY - missile.getY()) * (spY - missile.getY()));
                    const sqX = (spX - missile.getX()) / sqrt;
                    const sqY = (spY - missile.getY()) / sqrt;
                    let missileX = missile.getX();
                    let missileY = missile.getY();
                    let count = 0;
                    let v = 0.0;
                    let checked = true;
                    while ((checked)) {
                        ++count;
                        missileX += sqX * dTan;
                        missileY += sqY * dTan;
                        v += dTan;
                        if (v > sqrt) {
                            missileX = spX;
                            missileY = spY;
                            checked = false;
                        }
                        missile.setX(missileX);
                        missile.setY(missileY);
                        missile.setAngle(angle);
                        if (missile.isStrikingAnObject()) {
                            missile.destroy();
                            checked = false;
                        }
                    }
                }
            }
        }

        /**
         * @param {DSecPlayer} owner
         * @param {DSecMissile} missile
         * @returns {DSecPlayer} The closest moving enemy.
         * */
        getMovingEnemyTankClosestToMissile(owner, missile) {
            let player1 = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player2 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player2 !== owner && player2.aliveState !== 0 && (player2.forwardMovement() !== 0 || player2.angleMovement() !== 0)) {
                    const v = Math.fround((Math.pow(player2.getX() - missile.getX(), 2.0) + Math.pow(player2.getY() - missile.getY(), 2.0)));
                    if (v < maxValue) {
                        player1 = player2;
                        maxValue = v;
                    }
                }
            }
            return player1;
        }

        getEnemyTankClosestToMissile(owner, missile) {
            let player1 = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player2 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player2 !== owner && player2.aliveState !== 0) {
                    const v = Math.fround((Math.pow(player2.getX() - missile.getX(), 2.0) +
                        Math.pow(player2.getY() - missile.getY(), 2.0)));
                    if (v < maxValue) {
                        player1 = player2;
                        maxValue = v;
                    }
                }
            }
            return player1;
        }

        destroyAllMissiles() {
            CWSYSTEM.Debug.println("Missiles to be destroyed: " + this.missiles.length);
            if (this.missiles.length > 0) {
                for (let i = this.missiles.length - 1; i !== 0; i--) {
                    const missile = this.missiles[i];
                    missile.destroy();
                }
            }
        }
    }

    DSecMissileManager.missileRelativeSpeedup = 0.55;
    dsector.DSecMissileManager = DSecMissileManager;
    DSecMissileManager["__class"] = "dsector.DSecMissileManager";
})(dsector || (dsector = {}));
