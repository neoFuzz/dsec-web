/* Re-written from java */
(function (dsector) {
    /**
     * @class
     * @memberof dsector
     */
    class DSecMainSetupWindow {
        constructor() {
            if (this.dsecPlayers === undefined) {
                this.dsecPlayers = null;
            }
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.__numberOfRounds === undefined) {
                this.__numberOfRounds = 15;
            }
            if (this.__playMode === undefined) {
                this.__playMode = 0;
            }
            if (this.robotSpecifications === undefined) {
                this.robotSpecifications = null;
            }
            this.savedX = -1;
            this.savedY = -1;
            this.hmPlayers = new CWSYSTEM.CWHashtable("players.cfg");
            this.hmPlayers.readHashtableFromFile();
            CWSYSTEM.AlertManager.backgroundColor = new CWSYSTEM.CWColor(0, 0, 0, 180);
            CWSYSTEM.AlertManager.textColor = CWSYSTEM.CWColor.__white();
        }

        numberOfPlayers() {
            return this.dsecPlayers.length;
        }

        setNumberOfRounds(rounds) {
            this.__numberOfRounds = rounds;
        }

        playMode() {
            return this.__playMode;
        }

        setPlayMode(mode) {
            this.__playMode = mode;
        }

        getPlayer(playerId) {
            return playerId <= this.numberOfPlayers() && playerId >= 1 ? this.dsecPlayers[playerId - 1] : null;
        }

        addPlayer(iD, name) {
            const player = new dsector.DSecPlayer(iD, name);
            this.dsecPlayers.push(player); // > 0)
        }

        addDefaultPlayer(playerID) {
            const player = this.getDefaultPlayer(playerID);
            this.dsecPlayers.push(player); // > 0)
        }

        numberOfRounds() {
            return isNaN(this.__numberOfRounds) ? 15 : this.__numberOfRounds;
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
            let i;
            if (this.dsecPlayers == null) {
                this.dsecPlayers = ([]);
                const defaultPlayers = this.getDefaultNumberOfPlayers();
                for (i = 0; i < defaultPlayers; ++i) {
                    this.addDefaultPlayer(i + 1);
                }
                this.__numberOfRounds = this.getDefaultNumberOfRounds();
                this.__playMode = this.getDefaultPlayMode();
            }
            dsector.DSReference.virtualScreen.fadeInBackgroundFromBlack(4000);
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/optionScreen.jpg");
            this.robotSpecifications = ([]);
            this.robotSpecifications.push(new dsector.RobotSpecification("[keyboard1]"));
            this.robotSpecifications.push(new dsector.RobotSpecification("[keyboard2]"));
            this.robotSpecifications.push(new dsector.RobotSpecification("[keyboard3]"));
            this.robotSpecifications.push(new dsector.RobotSpecification("[keyboard4]"));

            /* Joystick setup */
            let gamePadID = 1;
            for (let g = 0; g < dsector.DSReference.jsu.joysticksActive.size; g++) {
                this.robotSpecifications.push(new dsector.RobotSpecification("[joystick" + gamePadID + "]"));
                gamePadID++;
            }

            const robotFilenames = this.getRobotFilenames();
            for (i = 0; i < robotFilenames.length; ++i) {
                const rName = robotFilenames[i];
                this.robotSpecifications.push(new dsector.RobotSpecification(rName)); // > 0)
            }
            if (dsector.DSReference.dsecItemDescriptionWindow != null) {
                dsector.DSReference.dsecItemDescriptionWindow.destroy();
            }
            if (dsector.DSReference.playersStatusWindow != null) {
                dsector.DSReference.playersStatusWindow.destroy();
            }
            if (dsector.DSReference.dsecPlayWindow != null) {
                dsector.DSReference.dsecPlayWindow.destroy();
            }
            if (dsector.DSReference.dsecScoreboard != null) {
                dsector.DSReference.dsecScoreboard.destroy();
            }
            if (dsector.DSReference.dsecLoadGameWindow != null) {
                dsector.DSReference.dsecLoadGameWindow.destroy();
            }
            if (dsector.DSReference.dsecSaveGameWindow != null) {
                dsector.DSReference.dsecSaveGameWindow.destroy();
            }
            this.drawWindow();
            this.window.centerWithinDesktop();
            dsector.DSMain.setActivity("At main menu", "Setting up", "city", 0, 0, 2);
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
            let x = 25;
            let y = 25;
            if (this.window != null) {
                x = this.window.xPosition;
                y = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("DZM");
            }
            const font = dsector.DSReference.virtualScreen.serif8_font;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("DZM", 3,
                "Setup", x, y, 390, 100 + 20 * this.numberOfPlayers(), true);
            this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(0, 0, 0, 50));
            let cwButton = null;
            cwButton = this.window.addButton("ENTER_DSECTOR", 10, 12, 80, 15,
                "Enter D-Sector", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON,
                CWSYSTEM.CWButton.CLICKED || CWSYSTEM.CWButton.PRESSED);
            cwButton = this.window.addButton("SETUP", 120, 12, 50, 15,
                "Setup", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.PRESSED);
            cwButton.objectContainingButtonPressedMethod = this;
            cwButton.buttonPressedMethodName = "setupButtonPressed";
            cwButton = this.window.addButton("LOAD_GAME_FROM_MAIN_MENU", 208, 12,
                70, 15, "Load Game", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            cwButton.objectContainingButtonPressedMethod = this;
            cwButton.buttonPressedMethodName = "loadGameButtonPressed";
            cwButton = this.window.addButton("EXIT_DSECTOR", 305, 12, 75,
                15, "Exit D-Sector", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
            cwButton.objectContainingButtonPressedMethod = this;
            cwButton.buttonPressedMethodName = "exitDSectorButtonPressed";
            this.window.addTextBlock("", "Players", 15, 69, font, CWSYSTEM.CWColor.__white(), 999);
            this.window.addTextBlock("", "Rounds", 143, 69, font, CWSYSTEM.CWColor.__white(), 999);
            this.window.addTextBlock("", "Mode", 285, 69, font, CWSYSTEM.CWColor.__white(), 999);
            let arrayList = ([]);
            for (let j = 2; j <= dsector.DSMain.maxPlayers; ++j) {
                arrayList.push(new dsector.StringPair("" + j, "" + j)); // > 0)
                if (this.__playMode === DSecMainSetupWindow.TEAMS) {
                    ++j;
                }
            }
            let playersPullDown = this.window.addPulldown("players", arrayList, 55, 45, 25, 16);
            if (this.__playMode === DSecMainSetupWindow.TEAMS) {
                playersPullDown.selectedOption = (this.numberOfPlayers() / 2 | 0) - 1;
            } else {
                playersPullDown.selectedOption = this.numberOfPlayers() < 2 ? 0 : (this.numberOfPlayers() - 2);
            }
            playersPullDown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            let j = 0;
            let i;
            for (i = 3; i <= 30; i += 3) {
                arrayList.push(new dsector.StringPair("" + i, "" + i));
                if (i === this.__numberOfRounds) {
                    j = arrayList.length - 1;
                }
            }
            for (i = 45; i <= 195; i += 15) {
                arrayList.push(new dsector.StringPair("" + i, "" + i));  // > 0)
                if (i === this.__numberOfRounds) {
                    j = arrayList.length - 1;
                }
            }
            playersPullDown = this.window.addPulldown("rounds", arrayList, 190, 45, 35, 16);
            playersPullDown.selectedOption = j;
            playersPullDown.objectContainingPulldownChangedMethod = this;
            arrayList = ([]);
            arrayList.push(new dsector.StringPair("Hostile", "hostile"));
            arrayList.push(new dsector.StringPair("Teams", "teams"));
            playersPullDown = this.window.addPulldown("mode", arrayList, 323, 45, 55, 16);
            playersPullDown.selectedOption = this.__playMode === DSecMainSetupWindow.HOSTILE ? 0 : 1;
            playersPullDown.objectContainingPulldownChangedMethod = this;
            for (i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                if (this.__playMode === DSecMainSetupWindow.HOSTILE) {
                    this.window.addTextBlock("", "Player " + (i + 1), 15, 105 + 22 * i, font,
                        CWSYSTEM.CWColor.__white(), 999);
                } else {
                    if (i === 0) {
                        this.window.addTextBlock("", "Blue", 15, 105 + 22 * i, font, CWSYSTEM.CWColor.__white(), 999);
                    }
                    if (i === (this.numberOfPlayers() / 2 | 0)) {
                        this.window.addTextBlock("", "Red", 15, 105 + 22 * i, font, CWSYSTEM.CWColor.__white(), 999);
                    }
                }
                arrayList = ([]);
                j = 0;
                for (let k = 0; k < this.robotSpecifications.length; ++k) {
                    const robotSpec = this.robotSpecifications[k];
                    arrayList.push(new dsector.StringPair(robotSpec.name, robotSpec.filename));
                    if (robotSpec.filename === player.robotSpecification.filename) {
                        j = k;
                    }
                }
                playersPullDown = this.window.addPulldown("playerType", arrayList, 60, 80 + 22 * i, 120, 16);
                playersPullDown.generalPurposeObject = player;
                playersPullDown.selectedOption = j;
                playersPullDown.objectContainingPulldownChangedMethod = this;
                this.window.addTextBlock("", "Name", 210, 105 + 22 * i, font, CWSYSTEM.CWColor.__white(), 378);
                this.window.addTextArea("name" + i, 250, 79 + 22 * i, 130, 1, font, "").endMark = "";
                const textArea = this.window.getTextArea("name" + i);
                textArea.setText(player.name);
                textArea.generalPurposeObject = player;
                textArea.deselectionCausesSubmit = true;
                textArea.returnKeyCausesSubmit = true;
                textArea.objectContainingTextAreaSubmittedMethod = this;
            }
            const popup = new CWSYSTEM.CWPopupMenu(this.window, "dsecMainSetupWindowPopup");
            popup.addMenuItem$Detailed(CWSYSTEM.CWPopupMenuItem.NORMAL, "", "Exit D-Sector", null, null,
                null, this, CWSYSTEM.CWReflect.getMethod$obj$string(this, "exitDSector"), null);
        }

        pulldownChanged(pulldown) {
            pulldown = pulldown[0];
            let selectedVal;
            if (pulldown.name === ("players")) {
                selectedVal = parseInt(pulldown.selectedValue());
                const playerCount = this.numberOfPlayers();
                let i;
                if (selectedVal > playerCount) {
                    for (i = 0; i < selectedVal - playerCount; ++i) {
                        const count = this.numberOfPlayers() + 1;
                        this.addDefaultPlayer(count);
                    }
                }
                if (selectedVal < playerCount) {
                    for (i = 0; i < playerCount - selectedVal; ++i) {
                        (a => {
                            let index = a.indexOf(this.dsecPlayers[this.dsecPlayers.length - 1]);
                            if (index >= 0) {
                                a.splice(index, 1);
                                return true;
                            } else {
                                return false;
                            }
                        })(this.dsecPlayers);
                    }
                }
                this.update();
                this.saveDefaultPlayers();
            } else if (pulldown.name === ("rounds")) {
                this.__numberOfRounds = parseInt(pulldown.selectedValue());
                this.update();
                this.saveDefaultPlayers();
            } else if (!(pulldown.name === ("mode"))) {
                if (pulldown.name === ("playerType")) {
                    const player = pulldown.generalPurposeObject;
                    const selectedValue = pulldown.selectedValue();
                    player.robotSpecification = new dsector.RobotSpecification(selectedValue);
                    this.saveDefaultPlayers();
                }
                this.update();
            } else {
                if (pulldown.selectedValue() === ("hostile")) {
                    this.__playMode = DSecMainSetupWindow.HOSTILE;
                } else {
                    this.__playMode = DSecMainSetupWindow.TEAMS;
                    if (!(this.numberOfPlayers() % 2 === 0)) {
                        selectedVal = this.numberOfPlayers() + 1;
                        this.addDefaultPlayer(selectedVal);
                    }
                }
                this.update();
                this.saveDefaultPlayers();
            }
        }

        textAreaSubmitted(textArea) {
            textArea = textArea[0];
            const player = textArea.generalPurposeObject;
            player.name = textArea.getText();
            this.saveDefaultPlayers();
        }

        exitDSector() {
            CWSYSTEM.Global.runState = false;
        }

        enterDSecButtonPressed(button) {
            dsector.DSReference.dsecGame.startGame();
        }

        setupButtonPressed(button) {
            dsector.DSReference.dsecSetupWindow.create();
        }

        loadGameButtonPressed(button) {
            dsector.DSReference.dsecLoadGameWindow.create();
        }

        exitDSectorButtonPressed(button) {
            dsector.DSReference.dsecMainSetupWindow.exitDSector();
        }

        getRobotFilenames() {// TODO: change robot loading to be compatible with Electron, current setup is web only
            let arrayList = ([]);
            let files = (["R1_Prototype.dzr", "R2_Prototype.dzr", "R3_Seeker.dzr",
                "R4_Hunter.dzr", "R5_Defender.dzr", "R6_Destroyer.dzr"]);
            for (let i = 0; i < files.length; ++i) {
                let file1 = files[i];
                let fileName = file1;
                if (CWSYSTEM.CWStringTools.findIgnoreCase(fileName, ".dzr") !== -1) {
                    arrayList.push("assets/robots/" + fileName);
                }
            }
            return CWSYSTEM.CWStringTools.sorted(arrayList);
        }

        saveDefaultPlayers() {
            let message = "";
            let val = this.numberOfPlayers();
            message = message + "numberOfPlayers=" + val + "\n";
            val = this.playMode();
            message = message + "playMode=" + val + "\n";
            val = this.numberOfRounds();
            message = message + "numberOfRounds=" + val + "\n";

            let i;
            let player;
            for (i = 0; i < this.numberOfPlayers(); ++i) {
                player = this.getPlayer(i + 1);
                message = message + "player" + (i + 1) + "Name=" + player.name + "\n";
                message = message + "player" + (i + 1) + "Filename=" + player.robotSpecification.filenameCode() + "\n";
            }

            for (i = this.numberOfPlayers(); i < 8; ++i) {
                player = this.getDefaultPlayer(i + 1);
                message = message + "player" + (i + 1) + "Name=" + player.name + "\n";
                message = message + "player" + (i + 1) + "Filename=" + player.robotSpecification.filenameCode() + "\n";
            }
            CWSYSTEM.CWFileTools.outputFile("players.cfg", message).then(result => CWSYSTEM.Debug.println(result)) // output: true
                .catch(error => console.error(error));
        }

        getDefaultNumberOfPlayers() {
            let playerCount = 4;
            let hashmap = this.hmPlayers;
            try {
                playerCount = parseInt(hashmap.get("numberOfPlayers"));
            } catch (e) {
                CWSYSTEM.Debug.println("Error GDNP: [" + e.message + "] using default");
            }
            return playerCount;
        }

        getDefaultPlayMode() {
            let mode = DSecMainSetupWindow.HOSTILE;
            let hashMap = this.hmPlayers;
            try {
                mode = parseInt(hashMap.get("playMode"));
            } catch (e) {
                CWSYSTEM.Debug.println("Error GDPM: [" + e.message + "] using default");
            }
            return mode;
        }

        getDefaultNumberOfRounds() {
            let rounds = 15;
            let hashtable = this.hmPlayers;
            try {
                rounds = parseInt(hashtable.get("numberOfRounds"));
            } catch (e) {
                CWSYSTEM.Debug.println("Error GDNR: [" + e.message + "] using default");
            }
            return rounds;
        }

        getDefaultPlayer(playerId) {
            let playerName = null;
            let type = null;
            let hashMap = this.hmPlayers;
            let errorCodes = "";
            try {
                playerName = hashMap.get("player" + playerId + "Name");
                if (playerName === "undefined") {
                    playerName = "Player " + playerId
                } // very JavaScript specific catch
            } catch (e) {
                errorCodes += "Error GDP1: [" + e.message + "] using default\n";
                playerName = "Player " + playerId;
            }
            try {
                type = hashMap.get("player" + playerId + "Filename");
                if (type === "undefined") {
                    type = null;
                }
            } catch (e) {
                errorCodes += "Error GDP2: [" + e.message + "] using default";
            }
            CWSYSTEM.Debug.println(errorCodes);
            if (playerName == null) {
                playerName = "Player " + playerId;
            }
            if (type != null) {
                // Check if joystick is connected by looking in the HashMap
                if (dsector.DSReference.jsu.joysticksActive.size !== 0) {
                    if (!dsector.DSReference.jsu.joysticksActive.has(type) && type.contains("joystick")) {
                        type = null;
                    }
                }
            }
            if (type == null) {
                type = "[keyboard1]";
            }
            return new dsector.DSecPlayer(type, playerName);
        }
    }

    DSecMainSetupWindow.HOSTILE = 0;
    DSecMainSetupWindow.TEAMS = 1;
    dsector.DSecMainSetupWindow = DSecMainSetupWindow;
    DSecMainSetupWindow["__class"] = "dsector.DSecMainSetupWindow";
})(dsector || (dsector = {}));
