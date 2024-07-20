/**/
(function (dsector) {
    /**
     * Sets up the Scoreboard window for use
     * @class
     * @memberof dsector
     */
    class DSecScoreboard {
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

        isCreated() {
            return this.window != null;
        }

        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        create() {
            dsector.DSReference.dsecPlayWindow.destroy();
            dsector.DSReference.playersStatusWindow.destroy();
            this.drawWindow();
            this.window.centerWithinDesktop();
            this.timeWhenScoreBoardProduced = CWSYSTEM.Environment.currentTime();
            dsMain.userIOBuffer.clear();
            dsector.DSMain.setActivity("Scoreboard", "Viewing Scoreboard", "planet",
                1, dsector.DSReference.dsecGame.numberOfPlayers(),
                dsector.DSReference.dsecMainSetupWindow.playMode());
        }

        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.window.destroy();
                this.window = null;
            }
        }

        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }

        /** @private */
        restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }

        drawWindow() {
            let baseX = 25;
            let baseY = 25;
            if (this.window != null) {
                baseX = this.window.xPosition;
                baseY = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("SCOREBOARD");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            const playerCount = dsector.DSReference.dsecGame.numberOfPlayers();
            const refScore = Math.ceil(160 + 75 * playerCount);
            const roundsRemain = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            if (roundsRemain === 0) {
                dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/gameEnd.jpg");
            } else {
                dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/statistics.jpg");
            }
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("SCOREBOARD", 3,
                null, baseX, baseY, refScore, 470, true);
            let color1 = new CWSYSTEM.CWColor(0, 0, 0, 100);
            if (roundsRemain === 0) {
                color1 = this.winningPlayer().getTankColor(3);
            }
            this.window.changeBackgroundColor$CWColor(color1);
            const roundsColor = roundsRemain === 0 ? new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__lightGrey()) :
                new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__silver());
            const color3 = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
            let blNum = 30;
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
            blNum += 20;
            let arrList;
            if (roundsRemain === 0) {
                arrList = this.getPlayersInOrderOfScore(true);
            } else {
                arrList = this.getPlayersInOrderOfScore(false);
            }
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
            for (i = 0; i < arrList.length; ++i) {
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
                }
                this.addTextBlock("", "" + Math.ceil(player.credits), leftMargin, blNum, font, color2, 999);
                blNum += 20;
                const color = roundsRemain === 0 ? color3 : color2;
                this.addTextBlock("", "" + Math.round(player.score()), leftMargin, blNum, font, color, 999);
                blNum += 20;
            }
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

        continueButtonPressed(button) {
            this.closeScoreboard();
        }

        /** @private */
        closeScoreboard() {
            const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            this.destroy();
            if (rounds === 0) {
                dsector.DSReference.dsecMainSetupWindow.create();
            } else {
                if (dsector.DSReference.dsecGame.currentRound() % 3 === 0) {
                    dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
                } else {
                    dsector.DSReference.dsecGame.startNextRound();
                }
            }
        }

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

        getPlayersInOrderOfScore(mode) {
            const arrayList = ([]);
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                arrayList.push(dsector.DSReference.dsecGame.getPlayer(i + 1));

            }
            const arrayList1 = ([]);
            while (arrayList.length > 0) {
                let score1 = 0.0;
                let player = null;
                for (let j = 0; j < arrayList.length; ++j) {
                    const player1 = arrayList[j];
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

        statisticsBoardMode() {
            const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            return rounds === 0 || dsector.DSReference.dsecGame.currentRound() % 15 === 0;
        }

        respondToGameTick() {
            const rounds = dsector.DSReference.dsecMainSetupWindow.numberOfRounds() -
                dsector.DSReference.dsecGame.currentRound();
            if (CWSYSTEM.Environment.spacebarPressed) {
                this.closeScoreboard();
            }
            if (CWSYSTEM.Environment.VK_q_Pressed && CWSYSTEM.Environment.ctrlKeyPressed) {
                this.destroy();
                dsector.DSReference.dsecMainSetupWindow.create();
            } else {
                if (rounds !== 0 && dsector.DSReference.dsecGame.allPlayersAreRobots()) {
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
        }

        /** @private */
        addTextBlock(nameId, text, leftMargin, baseLine, font, color, width) {
            this.window.addTextBlock(nameId, text, leftMargin + 1, baseLine + 1, font,
                new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__black()), width);
            this.window.addTextBlock(nameId, text, leftMargin, baseLine, font, color, width);
        }
    }

    dsector.DSecScoreboard = DSecScoreboard;
    DSecScoreboard["__class"] = "dsector.DSecScoreboard";
})(dsector || (dsector = {}));
