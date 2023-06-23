/* Re-written from Java */
var dsector;
(function (dsector) {
    class DSecTeam {
        constructor(colorName) {
            if (this.__color === undefined) {
                this.__color = 0;
            }
            if (this.score === undefined) {
                this.score = 0;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.scoreAtStartOfRound === undefined) {
                this.scoreAtStartOfRound = 0;
            }
            this.__color = colorName;
            this.score = 0.0;
            this.name = colorName === DSecTeam.BLUE ? "Blue" : "Red";
        }

        color() {
            return this.__color;
        }

        prepareForStartOfRound() {
            this.scoreAtStartOfRound = this.score;
        }

        scoreOverLastRound() {
            return Math.round(this.score - this.scoreAtStartOfRound);
        }

        totalTankStrengthOfTeam() {
            let strength = 0.0;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.teamOfPlayer() === this) {
                    strength += Math.fround((2.0 * player.weaponEnergy) + player.shields);
                }
            }
            return strength;
        }

        allPlayersInTeamDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.teamOfPlayer() === this && player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                    return false;
                }
            }
            return true;
        }

        firstPlayerInTeam() {
            return this.__color === DSecTeam.BLUE ? dsector.DSReference.dsecGame.getPlayer(1) :
                dsector.DSReference.dsecGame.getPlayer((dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) + 1);
        }
    }

    DSecTeam.BLUE = 0;
    DSecTeam.RED = 1;
    dsector.DSecTeam = DSecTeam;
    DSecTeam["__class"] = "dsector.DSecTeam";
})(dsector || (dsector = {}));
