(function (dsector) {
    /**
     * The DSecMissileManager class is responsible for managing and controlling missiles within the game.
     * It handles missile lifecycle events, including creation, movement, collision detection, and destruction.
     *
     * Key Responsibilities:
     *<ol>
     * <li>
     *     Missile Management: Adds and tracks active missiles, ensuring they are correctly updated and processed
     *     each game cycle.
     * </li><li>
     *     Movement and Guidance: Updates missile positions based on their velocity and angle. Implements advanced
     *     guidance systems for seeking the nearest or moving enemies, adjusting the missile's angle and speed as needed.
     * </li><li>
     *     Collision Detection: Checks for collisions between missiles and other objects, including tanks and obstacles.
     *     Destroys missiles upon impact or when they exceed their lifespan.
     * </li><li>
     *     Guidance Systems: Supports various guidance specifications, such as seeking the nearest enemy or moving
     *     target, and applies specific behaviour modifications based on these settings.
     * </li><li>
     *     Resource Cleanup: Provides functionality to destroy all missiles, cleaning up resources and ensuring no
     *     residual objects remain.
     * </li>
     * </ol>
     * The DSecMissileManager class ensures efficient missile operations and integrates complex behaviours for
     * guided missiles, contributing to a dynamic and engaging gameplay experience.
     *
     * @property {Array<dsector.DSecMissile>} missiles the missiles objects array in the manager
     *
     * @since 1.0.0
     * @access public
     * @class
     *
     * @memberof dsector
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class DSecMissileManager {
        /**
         * Constructor for DSecMissileManager.
         */
        constructor() {
            this.missiles = ([]);
        }

        /**
         * Add a missile to the manager.
         *
         * @public
         * @param {dsector.DSecMissile} missile the missile to add
         */
        addMissile(missile) {
            this.missiles.push(missile);
        }

        /**
         * Move all missiles.
         *
         * @public
         */
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
                    if (this.isGuidedMissile(missile)) {
                        const player = this.findClosestPlayer(missile);
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
                    const __sa = this.calculateNewPosition(missile, angle, velocity);
                    const spX = __sa[0];
                    const spY = __sa[1];
                    if (missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER) {
                        angle = this.updateSwirlerMissile(missile, angle);
                    }
                    this.moveMissileToNewPosition(missile,spX,spY,angle);
                }
            }
        }

        /**
         * Checks if a missile is guided.
         *
         * @param {dsector.DSecMissile} missile - The missile to check.
         * @returns {boolean} - True if the missile is guided, false otherwise.
         */
        isGuidedMissile(missile) {
            return missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST_MOVING ||
                missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST;
        }

        /**
         * Finds the closest player to a missile based on its guide specification.
         *
         * @param {dsector.DSecMissile} missile - The missile to check.
         * @returns {dsector.DSecPlayer|null} - The closest player, or null if none found.
         */
        findClosestPlayer(missile) {
            return missile.weaponSpecification.guideSpecification === dsector.WeaponSpecification.GUIDE_SPECIFICATION_SEEK_NEAREST ?
                this.getEnemyTankClosestToMissile(missile.owner, missile) :
                this.getMovingEnemyTankClosestToMissile(missile.owner, missile);
        }

        /**
         * Calculates the new position of a missile.
         * @param {dsector.DSecMissile} missile - The missile to update.
         * @param {number} angle - The angle of the missile.
         * @param {number} velocity - The velocity of the missile.
         * @returns {number[]} - The new x and y positions.
         */
        calculateNewPosition(missile, angle, velocity) {
            const speedFactor = 0.550000011920929 * velocity * dsector.DSReference.dsecGame.gameSpeed();
            const spX = missile.getX() + Math.cos(angle) * speedFactor;
            const spY = missile.getY() + Math.sin(angle) * speedFactor;
            return [spX, spY];
        }

        /**
         * Updates the angle of a swirler missile.
         * @param {dsector.DSecMissile} missile - The missile to update.
         * @param {number} angle - The current angle of the missile.
         * @returns {number} - The updated angle.
         */
        updateSwirlerMissile(missile, angle) {
            if (missile.getFixedTurnRate() === 0.0) {
                missile.setFixedTurnRate(Math.fround(0.165 * dsector.DSReference.dsecGame.gameSpeed()));
            }
            angle += missile.getFixedTurnRate();
            const speedRef = Math.fround(0.165 * dsector.DSReference.dsecGame.gameSpeed());
            missile.setFixedTurnRate(Math.fround(missile.getFixedTurnRate() * (100.0 - speedRef) / 100.0));
            return angle;
        }

        /**
         * Moves a missile to a new position.
         * @param {dsector.DSecMissile} missile - The missile to move.
         * @param {number} spX - The new x position.
         * @param {number} spY - The new y position.
         * @param {number} angle - The new angle.
         */
        moveMissileToNewPosition(missile, spX, spY, angle) {
            const model = dsector.DSReference.modelLoader.getModel(missile.weaponSpecification.modelName);
            const dTan = model.maximumDistanceOfVertexToCenterWhenModelLoaded();
            const distance = Math.sqrt((spX - missile.getX()) ** 2 + (spY - missile.getY()) ** 2);
            const [dx, dy] = [(spX - missile.getX()) / distance, (spY - missile.getY()) / distance];

            let missileX = missile.getX();
            let missileY = missile.getY();
            let traveled = 0.0;
            let stillMoving = true;

            while (stillMoving) {
                missileX += dx * dTan;
                missileY += dy * dTan;
                traveled += dTan;
                if (traveled > distance) {
                    missileX = spX;
                    missileY = spY;
                    stillMoving = false;
                }
                missile.setX(missileX);
                missile.setY(missileY);
                missile.setAngle(angle);
                if (missile.isStrikingAnObject()) {
                    missile.destroy();
                    stillMoving = false;
                }
            }
        }

        /**
         * Get the closest moving enemy tank to a missile.
         * This method is used by the missile to seek nearest moving enemy tank.
         *
         * @param {DSecPlayer} owner The owner of the missile.
         * @param {DSecMissile} missile The missile object.
         * @returns {DSecPlayer} The closest moving enemy.
         */
        getMovingEnemyTankClosestToMissile(owner, missile) {
            let player1 = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player2 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player2 !== owner && player2.aliveState !== 0 &&
                    (player2.forwardMovement() !== 0 || player2.angleMovement() !== 0)) {
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

        /**
         * Get the closest enemy tank to a missile.
         *
         * @param {DSecPlayer} owner The owner of the missile.
         * @param {DSecMissile} missile The missile object.
         * @returns {DSecPlayer} The closest enemy tank.
         */
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

        /**
         * Destroy all missiles.
         *
         * @public
         * @see DSecMissile#destroy
         */
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

    /**
     * Relative speedup for missiles.
     *
     * @constant
     * @type {number}
     */
    DSecMissileManager.missileRelativeSpeedup = 0.55;
    dsector.DSecMissileManager = DSecMissileManager;
    DSecMissileManager["__class"] = "dsector.DSecMissileManager";
})(dsector);