var dsector;
(function (dsector) {
    class DSecMissile {
        /** @param {DSecPlayer} player
         * @param {WeaponSpecification} specification */
        constructor(player, specification) {
            if (this.owner === undefined) {
                this.owner = null;
            }
            if (this.weaponSpecification === undefined) {
                this.weaponSpecification = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.angle === undefined) {
                this.angle = 0;
            }
            if (this.fixedTurnRate === undefined) {
                this.fixedTurnRate = 0;
            }
            if (this.damage === undefined) {
                this.damage = 0;
            }
            if (this.timeAtLaunchInMilliseconds === undefined) {
                this.timeAtLaunchInMilliseconds = 0;
            }
            if (this.missileSound === undefined) {
                this.missileSound = null;
            }
            this.weaponSpecification = specification;
            this.owner = player;
            this.timeAtLaunchInMilliseconds = CWSYSTEM.Environment.currentTime();
            this.x = player.getX();
            this.y = player.getY();
        }

        getX() {
            return this.x;
        }

        setX(x) {
            this.x = x;
        }

        getY() {
            return this.y;
        }

        setY(y) {
            this.y = y;
        }

        getDamage() {
            return this.damage;
        }

        setDamage(damage) {
            this.damage = damage;
        }

        getAngle() {
            return this.angle;
        }

        setAngle(angle) {
            this.angle = angle;
        }

        getFixedTurnRate() {
            return this.fixedTurnRate;
        }

        setFixedTurnRate(turnRate) {
            this.fixedTurnRate = turnRate;
        }

        destroyWithoutExplosion() {
            (a => {
                let index = a.indexOf(this);
                if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            })(dsector.DSReference.dsecMissileManager.missiles);
        }

        destroy() {
            if (this.missileSound != null) {
                this.missileSound.pause();
            }
            this.destroyWithoutExplosion();
            let specification;
            let base;
            let vir3 = new dsector.VectorInR3(0.0, 0.0, 0.0);
            if (this.weaponSpecification.actionWhenDestroyed === dsector.WeaponSpecification.DESTROY_AS_SMALL_BLAST) {
                if (dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND &&
                    !this.missileFarFromCamera()) {
                    if ((Math.random() * 2.0) === 0) {
                        dsector.DSReference.cwSound.playSound("assets/sounds/debrisExplosion1.wav", (Math.random() * 20.0));
                    } else {
                        dsector.DSReference.cwSound.playSound("assets/sounds/debrisExplosion2.wav", (Math.random() * 20.0));
                    }
                }
                specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                    dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
                base = 0.0;
                specification.fire(this.owner, this.x, this.y, 0.0, vir3, base);
                specification.fire(this.owner, this.x, this.y, 1.5707964, vir3, base);
                specification.fire(this.owner, this.x, this.y, 3.1415927, vir3, base);
                specification.fire(this.owner, this.x, this.y, 4.712389, vir3, base);
                dsector.DSecFadingLight.add(Math.fround(0.1 + this.damage / 40.0), this.x, this.y, 30.0, 1500);
            }
            if (this.weaponSpecification.actionWhenDestroyed === dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST) {
                if (!this.missileFarFromCamera() && dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/smallExplosion.wav", (Math.random() * 10.0));
                }
                specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                    dsector.PreBuiltWeaponSpecifications.MEDIUM_DEBRIS);
                base = this.weaponSpecification.defaultDamage / 8;
                specification.fire(this.owner, this.x, this.y, 0.0, vir3, base);
                specification.fire(this.owner, this.x, this.y, 1.5707964, vir3, base);
                specification.fire(this.owner, this.x, this.y, 3.1415927, vir3, base);
                specification.fire(this.owner, this.x, this.y, 4.712389, vir3, base);
                specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                    dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
                base = this.weaponSpecification.defaultDamage / 16;
                specification.fire(this.owner, this.x, this.y, 0.7853982, vir3, base);
                specification.fire(this.owner, this.x, this.y, 2.3561945, vir3, base);
                specification.fire(this.owner, this.x, this.y, 3.9269907, vir3, base);
                specification.fire(this.owner, this.x, this.y, 5.497787, vir3, base);
                dsector.DSecFadingLight.add(Math.fround(0.1 + (this.damage / 40.0)), this.x, this.y, 30.0, 1500);
            }
        }

        isStrikingAnObject() {
            const positionedModel = this.constructPositionedModel();
            let positionedModel1;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.aliveState !== dsector.DSecPlayer.DESTROYED && player !== this.owner) {
                    positionedModel1 = player.constructPositionedModel();
                    if (positionedModel.intersectsWith(positionedModel1)) {
                        this.strikePlayer(player);
                        return true;
                    }
                }
            }
            const round = dsector.DSReference.dsecGame.dsecRound;
            for (let i = 0; i < round.backgroundObjects.length; ++i) {
                positionedModel1 = round.backgroundObjects[i];
                if (positionedModel.intersectsWith(positionedModel1)) {
                    return true;
                }
            }
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                if (round.blueJewel.constructPositionedModel().intersectsWith(positionedModel)) {
                    round.blueJewel.takeMissileDamage(this);
                    return true;
                }
                if (round.redJewel.constructPositionedModel().intersectsWith(positionedModel)) {
                    round.redJewel.takeMissileDamage(this);
                    return true;
                }
            }
            return false;
        }

        strikePlayer(player) {
            player.takeDamage(this);
        }

        constructPositionedModel() {
            return new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(
                this.weaponSpecification.modelName), this.orientationAsMatrix(), this.x, this.y, 0.0);
        }

        orientationAsMatrix() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ$float(-this.angle);
            return matrix4f;
        }

        timedOut() {
            const launchTime = CWSYSTEM.Environment.currentTime() - this.timeAtLaunchInMilliseconds;
            return launchTime > (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.weaponSpecification.lifeSpanInMilliseconds);
        }

        /** @private */
        missileFarFromCamera() {
            const distance = Math.sqrt(Math.pow(this.x - dsector.DSReference.scene.cameraX, 2.0) +
                Math.pow(this.y - dsector.DSReference.scene.cameraY, 2.0));
            return distance > 600.0;
        }
    }

    dsector.DSecMissile = DSecMissile;
    DSecMissile["__class"] = "dsector.DSecMissile";
})(dsector || (dsector = {}));
