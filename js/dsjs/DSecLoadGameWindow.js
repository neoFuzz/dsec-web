/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class DSecLoadGameWindow {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.selectedFilename = null;
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
            dsector.DSReference.dsecSaveGameWindow.destroy();
            this.drawWindow();
            this.restorePosition();
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
            } else {
                this.drawWindow();
                this.restorePosition();
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
            let x = 25;
            let y = 25;
            if (this.window != null) {
                x = this.window.xPosition;
                y = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("DSECLOADGAME");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("DSECLOADGAME",
                3, null, x, y, 400, 48, true);
            const colour = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$());
            this.window.addTextBlock("", "Load Game", 10, 30, font, colour, 999);
            const list = ([]);
            list.push(new dsector.StringPair("- Select - ", ""));
            const savedGames = this.getSavedGameFilenames();
            let count = 0;
            let saveName;
            for (let i = 0; i < /* size */ savedGames.length; ++i) {
                saveName = savedGames[i];
                list.push(new dsector.StringPair(saveName, saveName));
                if (((o1, o2) => o1.toUpperCase() === (o2 === null ? o2 :
                    o2.toUpperCase()))(saveName, this.selectedFilename)) {
                    count = i + 1;
                }
            }
            const pulldown = this.window.addPulldown("dzoneFilename", list, 100, 6, 295, 16);
            pulldown.selectedOption = count;
            pulldown.objectContainingPulldownChangedMethod = this;
            saveName = null;
            let button = this.window.addButton$name$x$y$len$h$text$t$r("DELETE_GAME", 226, 27,
                52, 15, "Delete", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "deleteButtonPressed";
            button = this.window.addButton$name$x$y$len$h$text$t$r("LOAD_GAME", 288, 27, 42,
                15, "Load", 9, 0);
            button = this.window.addButton$name$x$y$len$h$text$t$r("", 342, 27, 52, 15,
                "Cancel", 9, 0);
            button.objectContainingButtonPressedMethod = this;
            button.buttonPressedMethodName = "cancelButtonPressed";
        }

        pulldownChanged(pulldown) {
            pulldown = pulldown[0];
            this.selectedFilename = pulldown.selectedValue();
        }

        getSavedGameFilenames() {
            const list = ([]);
            let url = null;
            let urlPath = null;
            try {
                urlPath = "file://file";
                url = new URL(urlPath);
            } catch (e) {
                CWSYSTEM.Debug.println(e.toString());
            }
            try {
            } catch (e) {
                const userDir = "/";
                console.error("Error trying to form File in getSavedGameFilenames from default directory. " +
                    "Attempting to create File directly from user.dir=\'" + userDir +
                    "\' property. Notes: url=" + urlPath + ", urlContext=" + url);
            }
            return list;
        }

        cancelButtonPressed(button) {
            this.destroy();
        }

        deleteButtonPressed(button) {
            CWSYSTEM.CWFileTools.delete(this.selectedFilename);
            this.update();
        }

        loadGameFileSelected() {
            if (this.selectedFilename != null) {
                const hashMap = new CWSYSTEM.CWHashtable(this.selectedFilename);
                if (hashMap != null) {
                    let playerCount;
                    try {
                        playerCount = parseInt(hashMap.get("numberOfPlayers"));
                    } catch (e) {
                        return;
                    }
                    dsector.DSReference.dsecMainSetupWindow.setNumberOfRounds(parseInt(hashMap.get("numberOfRounds")));
                    dsector.DSReference.dsecMainSetupWindow.setPlayMode(parseInt(hashMap.get("playMode")));
                    dsector.DSReference.dsecGame.initializeGame();
                    dsector.DSReference.dsecGame.setCurrentRound(parseInt(hashMap.get("lastRoundPlayed")));
                    dsector.DSReference.dsecMainSetupWindow.dsecPlayers = ([]);
                    if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                        dsector.DSReference.dsecGame.redTeam.score = parseFloat(hashMap.get("redTeamScore"));
                        dsector.DSReference.dsecGame.blueTeam.score = parseFloat(hashMap.get("blueTeamScore"));
                    }
                    for (let i = 1; i <= playerCount; ++i) {
                        const playerName = hashMap.get("player" + i + "Name");
                        const intSpecType = parseInt(hashMap.get("player" + i + "RobotSpecification.type"));
                        let curSpecType = hashMap.get("player" + i + "RobotSpecification.filename");
                        if (intSpecType !== 4) {
                            switch ((intSpecType)) {
                                case 0:
                                    curSpecType = "[keyboard1]";
                                    break;
                                case 1:
                                    curSpecType = "[keyboard2]";
                                    break;
                                case 2:
                                    curSpecType = "[keyboard3]";
                                    break;
                                case 3:
                                    curSpecType = "[keyboard4]";
                            }
                        }
                        dsector.DSReference.dsecMainSetupWindow.addPlayer(curSpecType, playerName);
                        const player = dsector.DSReference.dsecGame.getPlayer(i);
                        player.removeWeaponFromPort(1);
                        console.info("Loading player " + i);
                        player.setScore(parseFloat(hashMap.get("player" + i + "Score")));
                        player.credits = parseInt(hashMap.get("player" + i + "Credits"));
                        player.tankSpecification = new dsector.TankSpecification(parseInt(
                            hashMap.get("player" + i + "TankSpecification.type")));
                        player.tankSpecification.__weaponFuelUpgradeLevel = parseInt(
                            hashMap.get("player" + i + "WeaponFuelUpgradeLevel"));
                        player.tankSpecification.__armourUpgradeLevel = parseInt(
                            hashMap.get("player" + i + "ArmourUpgradeLevel"));
                        player.tankSpecification.__turnRateUpgradeLevel = parseInt(
                            hashMap.get("player" + i + "TurnRateUpgradeLevel"));
                        player.tankSpecification.__velocityUpgradeLevel = parseInt(
                            hashMap.get("player" + i + "VelocityUpgradeLevel"));
                        player.setNumberOfKills(parseInt(hashMap.get("player" + i + "NumberOfKills")));
                        player.setNumberOfDeaths(parseInt(hashMap.get("player" + i + "NumberOfDeaths")));
                        player.setNumberOfTimesWeaponFired(parseInt(hashMap.get("player" + i + "NumberOfTimesWeaponFired")));
                        player.setTotalDamageInflicted(parseFloat(hashMap.get("player" + i + "TotalDamageInflicted")));
                        player.__hasShoppingCard = CWSYSTEM.CWStringTools.stringToBoolean(hashMap.get(
                            "player" + i + "HasShoppingCard"));
                        player.__hasLargerDeath = CWSYSTEM.CWStringTools.stringToBoolean(hashMap.get(
                            "player" + i + "HasLargerDeath"));
                        player.__hasFastRecharge = CWSYSTEM.CWStringTools.stringToBoolean(hashMap.get(
                            "player" + i + "HasFastRecharge"));
                        player.__hasAutoHealer = CWSYSTEM.CWStringTools.stringToBoolean(hashMap.get(
                            "player" + i + "HasAutoHealer"));
                        player.__shoppingCardOwnedButSuspended = CWSYSTEM.CWStringTools.stringToBoolean(hashMap.get(
                            "player" + i + "ShoppingCardOwnedButSuspended"));
                        const arrList = dsector.DSReference.preBuiltWeaponSpecifications.preBuiltSpecifications;
                        let j;
                        for (j = 0; j < arrList.length; ++j) {
                            const WeaponSpec = arrList[j];
                            if (WeaponSpec.defaultDamage > 0) {
                                const specId = WeaponSpec.specificationID;
                                const damage = parseFloat(hashMap.get("player" + i +
                                    "DamageInflictedByWeapon" + specId));
                                player.setDamageInflictedByWeapon(WeaponSpec, damage);
                            }
                        }
                        for (j = 1; j <= 6; ++j) {
                            const specPort = parseInt(hashMap.get("player" + i + "Port" + j + "Specification"));
                            if (specPort !== -1) {
                                const specification =
                                    dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(specPort);
                                if (specification != null) {
                                    const fireUnits = parseInt(hashMap.get("player" + i + "Port" + j + "FireUnits"));
                                    player.grantWeapon(specification, fireUnits);
                                }
                            }
                        }
                        for (j = 0; j < dsector.DSReference.dsecGame.numberOfPlayers(); ++j) {
                            const targetPlayer = dsector.DSReference.dsecGame.getPlayer(j + 1);
                            if (targetPlayer !== player) {
                                const inflictedDmg = parseFloat(hashMap.get("player" + i +
                                    "DamageInflictedTowardsPlayer" + (j + 1)));
                                player.setDamageInflictedTowardsPlayer(targetPlayer, inflictedDmg);
                            }
                        }
                    }
                    for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                        const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                        try {
                            if (player.tankColor[0] != null) {
                                player.tankColor = ([]);
                            }
                        } catch (__e) {
                            if (__e != null && (__e["__classes"] &&
                                __e["__classes"].indexOf("IndexOutOfBoundsException") >= 0)) {
                                const e = __e;
                                CWSYSTEM.Debug.println(player.name + " tankColor IndexOutOfBounds exception");
                            }
                            if (__e != null && (__e["__classes"] &&
                                    __e["__classes"].indexOf("Exception") >= 0) || __e != null &&
                                __e instanceof Error) {
                                const e = __e;
                                CWSYSTEM.Debug.println(player.name + " tankColor exception: " + e);
                            }
                        }
                        for (let k = 0; k < 4; k++) {
                            player.tankColor.push(dsector.DSReference.dsecGame.tankColor(player.playerNumber(), k));
                        }
                    }
                    dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
                    this.destroy();
                }
            }
        }
    }

    dsector.DSecLoadGameWindow = DSecLoadGameWindow;
    DSecLoadGameWindow["__class"] = "dsector.DSecLoadGameWindow";
})(dsector || (dsector = {}));
