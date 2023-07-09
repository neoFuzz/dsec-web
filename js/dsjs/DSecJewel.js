var dsector;
(function (dsector) {
    class DSecJewel {
        constructor(color, angleFromCenter, x, y) {
            if (this.color === undefined) {
                this.color = 0;
            }
            if (this.state === undefined) {
                this.state = 0;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.energy === undefined) {
                this.energy = 0;
            }
            if (this.angle === undefined) {
                this.angle = 0;
            }
            if (this.angleFromCenter === undefined) {
                this.angleFromCenter = 0;
            }
            if (this.model3DMatrix === undefined) {
                this.model3DMatrix = null;
            }
            this.armour = 3.0;
            this.color = color;
            this.angleFromCenter = angleFromCenter;
            this.x = x;
            this.y = y;
            this.energy = 200.0;
            this.angle = 0.0;
            this.state = DSecJewel.ALIVE;
            this.model3DMatrix = dsector.DSReference.modelLoader.getModel("assets/models/jewel");
        }
        teamOfJewel() {
            return this.color === dsector.DSecTeam.BLUE ? dsector.DSReference.dsecGame.blueTeam :
                dsector.DSReference.dsecGame.redTeam;
        }
        rotateOverOneFrame() {
            this.angle = Math.fround((this.angle + ((
                this.energy * dsector.DSReference.dsecGame.gameSpeed()) / 500.0)) % 6.2831855);
            if (this.teamOfJewel().allPlayersInTeamDestroyed()) {
                const damage = Math.fround(0.25 * dsector.DSReference.dsecGame.gameSpeed());
                this.takeDamage(damage, null);
            }
        }
        constructPositionedModel() {
            return new dsector.PositionedModel(null, this.model3DMatrix,
                this.orientationAsMatrix(), this.x, this.y, 0.0);
        }
        orientationAsMatrix() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ$float(-this.angle);
            return matrix4f;
        }
        takeMissileDamage(missile) {
            if (!(this.energy <= 0.0)) {
                const owner = missile.owner;
                let damage = Math.fround(missile.getDamage() / this.armour);
                if (owner != null) {
                    damage *= owner.tankSpecification.weaponFuelQuality();
                }
                damage *= Math.fround(owner.robotSpecification.weaponFuelRatio / 100.0);
                this.takeDamage(damage, owner);
            }
        }
        takeDamage(damage, player) {
            if (damage > this.energy) {
                damage = this.energy;
            }
            this.energy -= damage;
            let team;
            if (this.color === 0) {
                team = dsector.DSReference.dsecGame.redTeam;
            }
            else {
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
                    if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                        dsector.DSReference.cwSound.playSound("assets/sounds/jewelDestroyed.wav",
                            this.teamOfJewel().color);
                    }
                    this.state = DSecJewel.DESTROYED;
                }
            }
        }
        teamDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                {
                    const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                    if (player.teamOfPlayer() === this.teamOfJewel() && player.aliveState !== 0) {
                        return false;
                    }
                }
                ;
            }
            return true;
        }
    }
    DSecJewel.ALIVE = 0;
    DSecJewel.DESTROYED = 1;
    dsector.DSecJewel = DSecJewel;
    DSecJewel["__class"] = "dsector.DSecJewel";
})(dsector || (dsector = {}));
