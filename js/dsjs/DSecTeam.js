import {dsector} from './dsector.js';

/**
 * Class for setting up the Team object.
 *
 * @property {string} __color - The color of the team.
 * @property {number} score - The score of the team.
 * @property {string} name - The name of the team.
 * @property {number} scoreAtStartOfRound - The score of the team at the start of the round.
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
export class DSecTeam {
    /**
     * Creates an instance of DSecTeam.
     *
     * @param {number} colorName - The name of the team color, "blue" or "red".
     */
    constructor(colorName) {
        this.scoreAtStartOfRound = 0;
        this.__color = colorName;
        this.score = 0.0;
        this.name = colorName === DSecTeam.BLUE ? "Blue" : "Red";
    }

    /**
     * Returns the color of the team.
     *
     * @returns {number}
     */
    color() {
        return this.__color;
    }

    /**
     * Stores the current score of the team at the start of the round.
     */
    prepareForStartOfRound() {
        this.scoreAtStartOfRound = this.score;
    }

    /**
     * Returns the score difference from the start of the round.
     * @returns {number} The score difference.
     */
    scoreOverLastRound() {
        return Math.round(this.score - this.scoreAtStartOfRound);
    }

    /**
     * Returns the total tank strength of the team.
     * @returns {number} The total tank strength.
     */
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

    /**
     * Checks if all players in the team are destroyed.
     *
     * @returns {boolean} True if all players are destroyed, false otherwise.
     */
    allPlayersInTeamDestroyed() {
        for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
            const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
            if (player.teamOfPlayer() === this && player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the first player in the team.
     *
     * @returns {dsector.DSecPlayer} The first player in the team.
     */
    firstPlayerInTeam() {
        return this.__color === DSecTeam.BLUE ? dsector.DSReference.dsecGame.getPlayer(1) :
            dsector.DSReference.dsecGame.getPlayer((dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) + 1);
    }

    /**
     *  Constant representing the blue team.
     *
     * @constant {number}
     */
    static BLUE = 0;
    /**
     *  Constant representing the red team.
     *
     * @constant {number}
     */
    static RED = 1;
}