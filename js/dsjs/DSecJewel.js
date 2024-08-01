(function (dsector) {
    /**
     * Object class to represent a jewel in game.
     *
     * @property {number} color - Jewel color.
     * @property {number} angleFromCenter - Jewel angle from center.
     * @property {number} x - Jewel x coordinate.
     * @property {number} y - Jewel y coordinate.
     * @property {number} angle - Jewel angle.
     * @property {number} energy - Jewel energy.
     * @property {number} armour - Jewel armour.
     * @property {number} state - Jewel state.
     * @property {dsector.Matrix4f} model3DMatrix - Jewel 3D model matrix.
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
    class DSecJewel {
        /**
         * Constructor for DSecJewel class.
         *
         * @param {CWSYSTEM.CWColor} color - Jewel color.
         * @param {number} angleFromCenter - Jewel angle of rotation from center, like clock angles.
         * @param {number} x - Jewel x coordinate.
         * @param {number} y - Jewel y coordinate.
         */
        constructor(color, angleFromCenter, x, y) {
            this.color = color || 0;
            this.angleFromCenter = angleFromCenter || 0;
            this.x = x || 0;
            this.y = y || 0;
            this.angle = 0.0;
            this.energy = 200.0;
            this.armour = 3.0;
            this.state = DSecJewel.ALIVE;
            this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/jewel");
        }

        /**
         * Returns the team of the jewel.
         *
         * @returns {dsector.DSTeam} The team of the jewel.
         *
         */
        teamOfJewel() {
            return this.color === dsector.DSecTeam.BLUE ? dsector.DSReference.dsecGame.blueTeam :
                dsector.DSReference.dsecGame.redTeam;
        }

        /**
         * Rotates the jewel over one frame.
         */
        rotateOverOneFrame() {
            this.angle = Math.fround((this.angle + ((
                this.energy * dsector.DSReference.dsecGame.gameSpeed()) / 500.0)) % 6.2831855);
            if (this.teamOfJewel().allPlayersInTeamDestroyed()) {
                const damage = Math.fround(0.25 * dsector.DSReference.dsecGame.gameSpeed());
                this.takeDamage(damage, null);
            }
        }

        /**
         * Returns the positioned model of the jewel.
         *
         * @returns {dsector.PositionedModel} The positioned model of the jewel.
         */
        constructPositionedModel() {
            return new dsector.PositionedModel(null, this.model3DMatrix,
                this.orientationAsMatrix(), this.x, this.y, 0.0);
        }

        /**
         * Returns the orientation of the jewel as a matrix.
         *
         * @returns {dsector.Matrix4f} The orientation of the jewel as a matrix.
         * @private
         */
        orientationAsMatrix() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ(-this.angle);
            return matrix4f;
        }

        /**
         * Takes missile damage.
         * @param {dsector.DSecMissile} missile - The missile that hit the jewel.
         */
        takeMissileDamage(missile) {
            if (this.energy > 0.0) {
                const owner = missile.owner;
                let damage = Math.fround(missile.getDamage() / this.armour);
                if (owner != null) {
                    damage *= owner.tankSpecification.weaponFuelQuality();
                }
                damage *= Math.fround(owner.robotSpecification.weaponFuelRatio / 100.0);
                this.takeDamage(damage, owner);
            }
        }

        /**
         * Takes damage from a player.
         *
         * @param {number} damage - The damage to take.
         * @param {dsector.DSecPlayer} player - The player that hit the jewel.
         */
        takeDamage(damage, player) {
            if (damage > this.energy) {
                damage = this.energy;
            }
            this.energy -= damage;
            let team;
            if (this.color === 0) {
                team = dsector.DSReference.dsecGame.redTeam;
            } else {
                team = dsector.DSReference.dsecGame.blueTeam;
            }
            team.score += damage;
            if (player != null && player.teamOfPlayer() !== this.teamOfJewel()) {
                player.setScore(Math.ceil(player.score() + damage));
                player.setTotalDamageInflicted(Math.fround(player.getTotalDamageInflicted() + damage));
                player.credits += Math.ceil(damage * 7.0);
            }
            if (this.energy <= 0.0) {
                this.energy = 0.0;
                if (this.state === DSecJewel.ALIVE) {
                    if (dsector.DSReference.dsecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                        dsector.DSReference.cwSound.playSound("jewelDestroyed.wav",
                            this.teamOfJewel().color);
                    }
                    this.state = DSecJewel.DESTROYED;
                }
            }
        }

        /**
         * Returns if the team of the jewel is destroyed.
         *
         * @returns {boolean} If the team of the jewel is destroyed.
         * @private
         */
        teamDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {

                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.teamOfPlayer() === this.teamOfJewel() && player.aliveState !== 0) {
                    return false;
                }

            }
            return true;
        }
    }

    /**
     * Constant for alive jewel state.
     * @constant
     * @static
     * @type {number}
     */
    DSecJewel.ALIVE = 0;
    /**
     * Constant for destroyed jewel state.
     * @constant
     * @static
     * @type {number}
     */
    DSecJewel.DESTROYED = 1;
    dsector.DSecJewel = DSecJewel;
    DSecJewel["__class"] = "dsector.DSecJewel";
})(dsector);