import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * A class used to build and display a Scoreboard window.
 *
 * @property {CWSYSTEM.CWWindow} window - The window object representing the Scoreboard window.
 * @property {dsector.DSecPlayer} currentShopper - The current shopper player.
 * @property {number} timeWhenScoreBoardProduced - The time when the Scoreboard was produced.
 * @property {number} savedX - The saved x-coordinate of the Scoreboard window.
 * @property {number} savedY - The saved y-coordinate of the Scoreboard window.
 *
 * @example
 * var scoreboard = new dsector.DSecScoreboard();
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof dsector
 * @requires CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class DSecScoreboard {
    /**
     * Constructor for DSecScoreboard.
     */
    constructor() {
        if (this.window === undefined) {
            this.window = null;
        }
        this.currentShopper = null;
        if (this.timeWhenScoreBoardProduced === undefined) {
            this.timeWhenScoreBoardProduced = 0;
        }
        this.savedX = -1;
        this.savedY = -1;
    }

    /**
     * Check if the window is created.
     *
     * @public
     * @returns {boolean} True if the window is created, false otherwise.
     */
    isCreated() {
        return this.window != null;
    }

    /**
     * Toggle the created state of the window.
     *
     * @public
     */
    toggleCreated() {
        if (this.isCreated()) {
            this.destroy();
        } else {
            this.create();
        }
    }

    /**
     * Create the Scoreboard window.
     *
     * @public
     */
    create() {
        dsector.DSReference.dsecPlayWindow.destroy();
        dsector.DSReference.playersStatusWindow.destroy();
        this.drawWindow();
        this.window.centerWithinDesktop();
        this.timeWhenScoreBoardProduced = CWSYSTEM.Environment.currentTime();
        dsector.dsMain.userIOBuffer.clear();
        dsector.DSMain.setActivity("Scoreboard", "Viewing Scoreboard", "planet",
            1, dsector.DSReference.dsecGame.numberOfPlayers(),
            dsector.DSReference.dsecMainSetupWindow.playMode());
    }

    /**
     * Destroy the Scoreboard window.
     *
     * @public
     */
    destroy() {
        if (this.window != null) {
            this.savedX = this.window.xPosition;
            this.savedY = this.window.yPosition;
            this.window.destroy();
            this.window = null;
        }
    }

    /**
     * Update the window.
     *
     * @public
     */
    update() {
        if (this.isCreated()) {
            this.drawWindow();
        }
    }

    /**
     * Restore the position of the window.
     *
     * @private
     */
    restorePosition() {
        if (this.savedX !== -1) {
            this.window.xPosition = this.savedX;
        }
        if (this.savedY !== -1) {
            this.window.yPosition = this.savedY;
        }
    }

    /**
     * Draw the window.
     *
     * @private
     */
    drawWindow() {
        const font = dsector.DSReference.virtualScreen.serif8_font;
        const playerCount = dsector.DSReference.dsecGame.numberOfPlayers();
        const refScore = Math.ceil(160 + 75 * playerCount);
        const roundsRemain = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
            dsector.DSReference.dsecGame.currentRound();
        this.setupWindow(roundsRemain, refScore);

        let color1 = new CWSYSTEM.CWColor(0, 0, 0, 100);
        if (roundsRemain === 0) {
            color1 = this.winningPlayer().getTankColor(3);
        }
        this.window.changeBackgroundColor$CWColor(color1);
        const roundsColor = roundsRemain === 0 ?
            new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__lightGrey()) :
            new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__silver());
        const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
        let blNum = 30;
        blNum = this.addTextBlocks(roundsRemain, refScore, blNum, font, color3, roundsColor);
        blNum += 20;
        let arrList;
        if (roundsRemain === 0) {
            arrList = this.getPlayersInOrderOfScore(true);
        } else {
            arrList = this.getPlayersInOrderOfScore(false);
        }
        blNum = this.handleTeamsMode(roundsRemain, blNum, font);
        blNum = this.handlePlayerStatistics(arrList, blNum, roundsRemain, font, color3);

        blNum += 20;
        switch (roundsRemain) {
            case 0:
                this.addTextBlock("", "End of game, Space continues", 10, blNum, font, color3, 999);
                break;
            case 1:
                this.addTextBlock("", "1 round remains, Ctrl-Q aborts, Space continues", 10,
                    blNum, font, color3, 999);
                break;
            default:
                this.addTextBlock("", roundsRemain + " rounds left, Space continues, Ctrl-Q aborts",
                    10, blNum, font, roundsColor, 999);
        }
        const aContinue = this.window.addButton("", refScore - 72, blNum - 23,
            65, 15, "Continue", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
        aContinue.objectContainingButtonPressedMethod = this;
        aContinue.buttonPressedMethodName = "continueButtonPressed";
        this.window.h = Math.ceil(blNum);
    }

    handlePlayerStatistics(arrList, blNum, roundsRemain, font, color3) {
        for (let i = 0; i < arrList.length; ++i) {
            const player = arrList[i];
            blNum = 30;
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                blNum += 80;
            }
            if (roundsRemain === 0) {
                blNum = blNum + 30.0;
            }
            const color2 = player.getTankColor(0);
            const leftMargin = 150 + i * 75;
            let playerName = player.name;
            if (playerName.length > 12) {
                playerName = playerName.substring(0, 12);
            }
            this.addTextBlock("", playerName, leftMargin, blNum, font, color2, 999);
            blNum += 20;
            this.addTextBlock("", "" + Math.round(player.scoreOverLastRound()), leftMargin,
                blNum, font, color2, 999);
            blNum += 20;
            if (this.statisticsBoardMode()) {
                blNum = this.internalTextBlocks(player, leftMargin, blNum, font, color2, roundsRemain);
            }
            this.addTextBlock("", "" + Math.ceil(player.credits), leftMargin, blNum, font, color2, 999);
            blNum += 20;
            const color = roundsRemain === 0 ? color3 : color2;
            this.addTextBlock("", "" + Math.round(player.score()), leftMargin, blNum, font, color, 999);
            blNum += 20;
        }
        return blNum;
    }

    internalTextBlocks(player, leftMargin, blNum, font, color2, roundsRemain) {
        this.addTextBlock("", "" + player.tankSpecification.name(), leftMargin,
            blNum, font, color2, 999);
        blNum += 20;
        this.addTextBlock("", "" + player.tankSpecification.weaponFuelAsPresented(),
            leftMargin, blNum, font, color2, 999);
        blNum += 20;
        this.addTextBlock("", "" + player.tankSpecification.armourAsPresented(), leftMargin,
            blNum, font, color2, 999);
        blNum += 20;
        this.addTextBlock("", "" + player.tankSpecification.speedAsPresented(), leftMargin,
            blNum, font, color2, 999);
        blNum += 20;
        this.addTextBlock("", "" + player.tankSpecification.turnRateAsPresented(), leftMargin,
            blNum, font, color2, 999);
        blNum += 20;
        if (player.specificationIDOfFavouriteWeapon() != null) {
            const specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                player.specificationIDOfFavouriteWeapon());
            this.addTextBlock("", specification.fullName, leftMargin, blNum, font, color2, 999);
            blNum += 20;
        } else {
            this.addTextBlock("", "None", leftMargin, blNum, font, color2, 999);
            blNum += 20;
        }
        if (roundsRemain === 0 &&
            dsector.DSReference.dsecMainSetupWindow.playMode() !== dsector.DSecMainSetupWindow.TEAMS) {
            this.addTextBlock("", "" + player.damageFireRatio().toFixed(2),
                leftMargin, blNum, font, color2, 999);
            blNum += 20;
        }
        if (player.mostDamageTo() != null) {
            this.addTextBlock("", player.mostDamageTo().name, leftMargin, blNum, font,
                player.mostDamageTo().getTankColor(0), 999);
            blNum += 20;
        } else {
            this.addTextBlock("", "None", leftMargin, blNum, font, color2, 999);
            blNum += 20;
        }
        if (player.leastDamageTo() != null) {
            this.addTextBlock("", player.leastDamageTo().name, leftMargin, blNum, font,
                player.leastDamageTo().getTankColor(0), 999);
            blNum += 20;
        } else {
            this.addTextBlock("", "None", leftMargin, blNum, font, color2, 999);
            blNum += 20;
        }
        this.addTextBlock("", "" + player.numberOfKills(), leftMargin, blNum, font, color2, 999);
        blNum += 20;
        this.addTextBlock("", "" + player.numberOfDeaths(), leftMargin, blNum, font, color2, 999);
        blNum += 20;
        return blNum;
    }

    handleTeamsMode(roundsRemain, blNum, font) {
        let i;
        if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
            for (i = 0; i < 2; ++i) {
                let team = null;
                const redTeam = dsector.DSReference.dsecGame.redTeam;
                const blueTeam = dsector.DSReference.dsecGame.blueTeam;
                if (roundsRemain === 0) {
                    team = redTeam.score > blueTeam.score ? redTeam : blueTeam;
                } else {
                    team = redTeam.scoreOverLastRound() > blueTeam.scoreOverLastRound() ? redTeam : blueTeam;
                }
                if (i === 1) {
                    team = team === redTeam ? blueTeam : redTeam;
                }
                blNum = 30;
                if (roundsRemain === 0) {
                    blNum = blNum + 30.0;
                }
                const color = team.firstPlayerInTeam().getTankColor(0);
                dsector.DSReference.dsecGame.tankColor(team.firstPlayerInTeam().playerNumber(), 0);
                const teamCount = 150 + (i * 75 * dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0);
                this.addTextBlock("", team.name, teamCount, blNum, font, color, 999);
                blNum += 20;
                this.addTextBlock("", "" + Math.round(team.scoreOverLastRound()),
                    teamCount, blNum, font, color, 999);
                blNum += 20;
                this.addTextBlock("", "" + Math.round(team.score), teamCount, blNum, font, color, 999);
                blNum += 40;
            }
        }
        return blNum;
    }

    /**
     * Add text blocks to the window.
     *
     * @private
     * @param {number} roundsRemain the number of rounds remaining.
     * @param {number} refScore the reference score.
     * @param {number} blNum the vertical position of the next text block.
     * @param {CWSYSTEM.CWFont} font the font to use.
     * @param {CWSYSTEM.CWColor} color3 the color to use for the text.
     * @param {CWSYSTEM.CWColor} roundsColor the color to use for the rounds text.
     * @return {number} the new vertical position of the next text block.
     */
    addTextBlocks(roundsRemain, refScore, blNum, font, color3, roundsColor) {
        if (roundsRemain === 0) {
            this.addTextBlock("", "-- FINAL STATISTICS --", Math.round((refScore - 120) / 2),
                blNum, font, color3, 999);
            blNum = blNum + 30.0;
        }
        if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
            this.addTextBlock("", "Team", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Score this round", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Total score", 10, blNum, font, roundsColor, 999);
            blNum += 40;
        }
        this.addTextBlock("", "Player", 10, blNum, font, roundsColor, 999);
        blNum += 20;
        this.addTextBlock("", "Score this round", 10, blNum, font, roundsColor, 999);
        blNum += 20;
        if (this.statisticsBoardMode()) {
            this.addTextBlock("", "Current tank", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Weapon fuel quality", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Armour", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Speed", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Turn rate", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Favourite weapon", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            if (roundsRemain === 0 && dsector.DSReference.dsecMainSetupWindow.playMode() !==
                dsector.DSecMainSetupWindow.TEAMS) {
                this.addTextBlock("", "Damage/fire ratio", 10, blNum, font, roundsColor, 999);
                blNum += 20;
            }
            this.addTextBlock("", "Most damage to", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Least damage to", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Number of kills", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Number of deaths", 10, blNum, font, roundsColor, 999);
            blNum += 20;
        }
        if (roundsRemain === 0) {
            this.addTextBlock("", "Credits left over", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Final score", 10, blNum, font, color3, 999);
        } else {
            this.addTextBlock("", "Shopping credits", 10, blNum, font, roundsColor, 999);
            blNum += 20;
            this.addTextBlock("", "Total score", 10, blNum, font, roundsColor, 999);
        }
        return blNum;
    }

    /**
     * Called when the continue button is pressed.
     *
     * @public
     * @param {CWSYSTEM.CWButton} button the button that was pressed.
     */
    continueButtonPressed(button) {
        this.closeScoreboard();
    }

    /**
     * Close the scoreboard.
     *
     * @private
     */
    closeScoreboard() {
        const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
            dsector.DSReference.dsecGame.currentRound();
        this.destroy();
        if (rounds === 0) {
            dsector.DSReference.dsecMainSetupWindow.create();
        } else if (dsector.DSReference.dsecGame.currentRound() % 3 === 0) {
            dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
        } else {
            dsector.DSReference.dsecGame.startNextRound();
        }

    }

    /**
     * Get the winning player.
     *
     * @public
     * @returns {dsector.DSecPlayer} the winning player.
     */
    winningPlayer() {
        if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
            return dsector.DSReference.dsecGame.redTeam.score > dsector.DSReference.dsecGame.blueTeam.score ?
                dsector.DSReference.dsecGame.redTeam.firstPlayerInTeam() :
                dsector.DSReference.dsecGame.blueTeam.firstPlayerInTeam();
        } else {
            const playersInOrder = this.getPlayersInOrderOfScore(true);
            return playersInOrder[0];
        }
    }

    /**
     * Get the players in order of score.
     *
     * @public
     * @param {boolean} mode true for score, false for score over last round.
     * @returns {dsector.DSecPlayer[]} the players in order of score.
     */
    getPlayersInOrderOfScore(mode) {
        const arrayList = ([]);
        for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
            arrayList.push(dsector.DSReference.dsecGame.getPlayer(i + 1));

        }
        const arrayList1 = ([]);
        while (arrayList.length > 0) {
            let score1 = 0.0;
            let player = null;
            for (const player1 of arrayList) {
                const score = mode ? player1.score() : player1.scoreOverLastRound();
                if (score >= score1) {
                    score1 = score;
                    player = player1;
                }
            }
            (a => {
                let index = a.indexOf(player);
                if (index >= 0) {
                    a.splice(index, 1);
                    return true;
                } else {
                    return false;
                }
            })(arrayList);
            arrayList1.push(player);
        }
        return arrayList1;
    }

    /**
     * Check if the statistics board mode is on.
     *
     * @public
     * @returns {boolean} true if the statistics board mode is on, false otherwise.
     */
    statisticsBoardMode() {
        const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
            dsector.DSReference.dsecGame.currentRound();
        return rounds === 0 || dsector.DSReference.dsecGame.currentRound() % 15 === 0;
    }

    /**
     * Respond to the game tick.
     *
     * @private
     */
    respondToGameTick() {
        const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
            dsector.DSReference.dsecGame.currentRound();
        if (CWSYSTEM.Environment.spacebarPressed) {
            this.closeScoreboard();
        }
        if (CWSYSTEM.Environment.VK_q_Pressed && CWSYSTEM.Environment.ctrlKeyPressed) {
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        } else if (rounds !== 0 && dsector.DSReference.dsecGame.allPlayersAreRobots()) {
            let tValue = 5000;
            if (this.statisticsBoardMode()) {
                tValue = 30000;
            }
            if (CWSYSTEM.Environment.currentTime() - this.timeWhenScoreBoardProduced >
                (n => n < 0 ? Math.ceil(n) : Math.floor(n))(tValue)) {
                this.closeScoreboard();
            }
        }
    }

    /**
     * Add a text block to the window.
     *
     * @private
     * @param {string} nameId the name of the text block.
     * @param {string} text the text to display.
     * @param {number} leftMargin the left margin.
     * @param {number} baseLine the text baseline.
     * @param {CWSYSTEM.CWFont} font the font to use.
     * @param {CWSYSTEM.CWColor} color the color to use.
     * @param {number} width the width of the text block.
     */
    addTextBlock(nameId, text, leftMargin, baseLine, font, color, width) {
        this.window.addTextBlock(nameId, text, leftMargin + 1, baseLine + 1,
            font, CWSYSTEM.CWColor.__black(), width);
        this.window.addTextBlock(nameId, text, leftMargin, baseLine, font, color, width);
    }

    /**
     * Set up the window.
     *
     * @private
     * @param {number} roundsRemain the number of rounds remaining.
     * @param {number} refScore the reference score.
     */
    setupWindow(roundsRemain, refScore) {
        let baseX = 25;
        let baseY = 25;
        if (this.window != null) {
            baseX = this.window.xPosition;
            baseY = this.window.yPosition;
            dsector.DSReference.gui.destroyWindow("SCOREBOARD");
        }

        if (roundsRemain === 0) {
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/gameEnd.jpg");
        } else {
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/statistics.jpg");
        }
        this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("SCOREBOARD", 3,
            null, baseX, baseY, refScore, 470, true);
    }

}