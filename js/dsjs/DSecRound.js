(function (dsector) {
    /**
     * Class used to manage each round of the game.
     *
     * @property {dsector.DSecGame} dsGame the game object.
     * @property {number} redJewel the red jewel.
     * @property {number} blueJewel the blue jewel.
     * @property {Array} backgroundObjects the background objects.
     * @property {Array} silentBackgroundObjects the silent background objects.
     * @property {Array} backgroundObjectsForDisplayNextFrame the background objects for display next frame.
     * @property {number} allPlayersDestroyed the all players destroyed.
     * @property {number} __timeWhenAllPlayersDestroyed the time when all players destroyed.
     * @property {number} __timeWhenAllJewelsDestroyed the time when all jewels destroyed.
     * @property {number} __timeWhenAnyPlayerLastFired the time when any player last fired.
     * @property {number} __timeWhenRoundStarted the time when round started.
     * @property {boolean} endOfRoundWarningIssued the end of round warning issued.
     * @property {boolean} __atLeastOnePlayerHasFired the at least one player has fired.
     * @property {dsector.DSecPlayer} firstTankMovedOutOfArea the first tank moved out of area.
     * @property {number} timeWhenLastOutOfAreaWarningStated the time when last out of area warning stated.
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
    class DSecRound {
        /**
         * Constructor for DSecRound.
         *
         * @param {dsector.DSecGame} game the game object.
         */
        constructor(game) {
            this.redJewel = null;
            this.blueJewel = null;
            this.backgroundObjects = null;
            this.silentBackgroundObjects = null;
            this.backgroundObjectsForDisplayNextFrame = null;
            this.allPlayersDestroyed = 0;
            this.__timeWhenAllPlayersDestroyed = 0;
            this.__timeWhenAllJewelsDestroyed = 0;
            this.__timeWhenAnyPlayerLastFired = 0;
            this.__timeWhenRoundStarted = 0;
            this.__atLeastOnePlayerHasFired = false;
            this.endOfRoundWarningIssued = false;
            this.firstTankMovedOutOfArea = null;
            this.timeWhenLastOutOfAreaWarningStated = -1;
            this.dsGame = game;
            this.initializeRound();
        }

        /**
         * Initialize the round.
         *
         * @private
         */
        initializeRound() {
            this.__timeWhenAllPlayersDestroyed = -1;
            this.__timeWhenAllJewelsDestroyed = -1;
            this.__timeWhenAnyPlayerLastFired = CWSYSTEM.Environment.currentTime();
            this.__timeWhenRoundStarted = CWSYSTEM.Environment.currentTime();
            this.__atLeastOnePlayerHasFired = false;
            this.endOfRoundWarningIssued = false;
            this.silentBackgroundObjects = this.createBackdrop();
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                this.backgroundObjects =
                    this.placeJewelAndSurroundingBlocksInRandomLocationOverGrid(this.silentBackgroundObjects);
            } else {
                this.backgroundObjects = ([]);
            }
            this.createRandomBackgroundScene(this.backgroundObjects, this.silentBackgroundObjects);
            this.backgroundObjectsForDisplayNextFrame = ([]);
            this.firstTankMovedOutOfArea = null;
            let i;
            let calcFlt;
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                for (i = 0; i < 2; ++i) {
                    const b = i !== 0;
                    for (let j = 0; j < (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0); ++j) {
                        const playerId = !b ? j + 1 : j + 1 + (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0);
                        const player = dsector.DSReference.dsecGame.getPlayer(playerId);
                        const jAngle = !b ? this.blueJewel.angleFromCenter : this.redJewel.angleFromCenter;
                        calcFlt = 0.10471976;
                        let v = 0.0;
                        let model;
                        let count;
                        switch (dsector.DSReference.dsecGame.numberOfPlayers()) {
                            // TODO: investigate what cases are meant to do here
                            case 4:
                                v = Math.fround(-calcFlt / 2.0);
                                break;
                            case 6:
                                v = -calcFlt;
                                break;
                            case 2:
                            case 3:
                            case 5:
                            default:

                        }
                        const angle = Math.fround(jAngle + v + j * calcFlt);
                        player.setAngle(Math.fround(angle + Math.PI));
                        const playerX = Math.fround(Math.cos(angle) * 305.0);
                        const playerY = Math.fround(Math.sin(angle) * 305.0);
                        player.setX(playerX);
                        player.setY(playerY);
                        player.setAngle(Math.fround(angle + Math.PI));
                        model = player.constructPositionedModel();
                        count = 0;

                        while ((count < this.backgroundObjects.length)) {
                            const model1 = this.backgroundObjects[count];
                            if (model.intersectsWith(model1)) {
                                this.initializeRound();
                                return;
                            }
                            ++count;
                        }
                    }
                }
            } else {
                const x = 600.0;
                const y = 600.0;
                const piAngle2 = Math.fround(Math.random() * 2.0 * Math.PI);
                const players = this.listPlayersInRandomOrder();
                for (let k = 0; k < players.length; ++k) {
                    const zPlayer = players[k];
                    calcFlt = Math.fround(piAngle2 + (k * 2) * Math.PI / this.dsGame.numberOfPlayers() % 6.2831855);
                    zPlayer.setX(Math.fround(Math.cos(calcFlt) * x / 2.0));
                    zPlayer.setY(Math.fround(Math.sin(calcFlt) * y / 2.0));
                    zPlayer.setAngle(Math.fround(calcFlt + Math.PI));
                    const model = zPlayer.constructPositionedModel();
                    for (const backgroundObject of this.backgroundObjects) {
                        const model1 = backgroundObject;
                        if (model.intersectsWith(model1)) {
                            this.initializeRound();
                            return;
                        }
                    }
                }
            }
            for (i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                player.prepareForStartOfRound();
            }
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                dsector.DSReference.dsecGame.redTeam.prepareForStartOfRound();
                dsector.DSReference.dsecGame.blueTeam.prepareForStartOfRound();
            }
            i = dsector.DSReference.dsecGame.numberOfPlayers();
            if (dsector.DSReference.dsecSetupWindow._cameraMode() === 4 && i < 3 ||
                dsector.DSReference.dsecSetupWindow._cameraMode() === 5 && i < 4 ||
                dsector.DSReference.dsecSetupWindow._cameraMode() === 6 && i < 5 ||
                dsector.DSReference.dsecSetupWindow._cameraMode() === 7 && i < 6) {
                dsector.DSReference.dsecSetupWindow.cameraMode = 0;
            }
        }

        /**
         * Create a random background scene.
         *
         * @private
         * @param {Array} scene the scene.
         * @param {Array} config the configuration.
         */
        createRandomBackgroundScene(scene, config) {
            const configuration = new dsector.DSecBackgroundConfiguration(config);
            configuration.usePresetConfiguration(((Math.random() *
                dsector.DSecBackgroundConfiguration.numberOfPresetConfigurations) | 0));
            configuration.setEdgeStyle(((Math.random() * 2.0) | 0) + 1);
            configuration.generateRandomScene(scene);
        }

        /**
         * Create a backdrop.
         *
         * @private
         * @returns {Array} the backdrop.
         */
        createBackdrop() {
            const arrayList = ([]);
            const rndNum = ((Math.random() * 5.0) | 0) + 1;
            const angle = Math.random() < 0.5 ? 0.7853982 : 2.3561945;
            let model = null;
            switch (rndNum) {
                case 1:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(
                        "assets/models/background1"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 2:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(
                        "assets/models/background2"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 3:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(
                        "assets/models/background3"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 4:
                case 5:
                    for (let x1 = -300.0; x1 <= 300.0; x1 += 200.0) {
                        for (let y1 = -300.0; y1 <= 300.0; y1 += 200.0) {
                            const randomP = ((Math.random() * 6.0) | 0) + 1;
                            switch (randomP) {
                                case 2:
                                case 3:
                                case 4:
                                    model = new dsector.PositionedModel(null,
                                        dsector.DSReference.modelLoader.getModel("assets/models/background4_1"),
                                        dsector.Matrix4f.rotationZMatrix(0.0), x1, y1, -8.0);
                                    arrayList.push(model);
                                    break;
                                case 5:
                                case 6:
                                    model = new dsector.PositionedModel(null,
                                        dsector.DSReference.modelLoader.getModel("assets/models/background4_2"),
                                        dsector.Matrix4f.rotationZMatrix(0.0), x1, y1, -8.0);
                                    arrayList.push(model);
                                    break;
                                case 1:
                                default:
                                    break;
                            }
                        }
                    }
            }
            return arrayList;
        }

        /**
         * Place a jewel and surrounding blocks to create a base in a random location over the grid.
         *
         * @private
         * @param {Array} arrayList the array list.
         * @returns {Array} the array list.
         */
        placeJewelAndSurroundingBlocksInRandomLocationOverGrid(arrayList) {
            const stand = 350.0;
            let x2 = 0.0;
            let y2 = 0.0;
            let x1 = 0.0;
            let y1 = 0.0;
            let arrayList1 = null;
            for (let i = 0; i < 50; ++i) {
                const redJAngle = Math.fround((Math.random() * 2.0 * Math.PI));
                const blueJAngle = Math.fround(redJAngle + Math.PI);
                x2 = Math.fround(Math.cos(redJAngle) * stand);
                y2 = Math.fround(Math.sin(redJAngle) * stand);
                x1 = Math.fround(Math.cos(blueJAngle) * stand);
                y1 = Math.fround(Math.sin(blueJAngle) * stand);
                arrayList1 = ([]);
                this.redJewel = new dsector.DSecJewel(1, redJAngle, x2, y2);
                const blockCheckRed = this.addBlocksSurroundingJewel(this.redJewel, arrayList1, arrayList);
                this.blueJewel = new dsector.DSecJewel(0, blueJAngle, x1, y1);
                const blockCheckBlue = this.addBlocksSurroundingJewel(this.blueJewel, arrayList1, arrayList);
                if (blockCheckRed && blockCheckBlue) {
                    break;
                }
            }
            return arrayList1;
        }

        /**
         * Add blocks surrounding jewel.
         *
         * @private
         * @param {dsector.DSecJewel} jewel the jewel.
         * @param {Array} list1 the list containing models.
         * @param {Array} list2 the list to compare against.
         * @returns {boolean} the boolean.
         */
        addBlocksSurroundingJewel(jewel, list1, list2) {
            const stand = 20.0;
            const model1 = new dsector.PositionedModel(null,
                dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(),
                Math.fround(jewel.x + stand), jewel.y, 0.0);
            const model2 = new dsector.PositionedModel(null,
                dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(),
                Math.fround(jewel.x - stand), jewel.y, 0.0);
            const model3 = new dsector.PositionedModel(null,
                dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(),
                jewel.x, Math.fround(jewel.y + stand), 0.0);
            const model4 = new dsector.PositionedModel(null,
                dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(),
                jewel.x, Math.fround(jewel.y - stand), 0.0);

            if (this.jewelBlockIsOverGrid(model1, list2) && this.jewelBlockIsOverGrid(model2, list2) &&
                this.jewelBlockIsOverGrid(model3, list2) && this.jewelBlockIsOverGrid(model4, list2)) {
                list1.push(model1);
                list1.push(model2);
                list1.push(model3);
                list1.push(model4);
                return true;
            } else {
                return false;
            }
        }

        /**
         * Check if a jewel block is over the grid.
         *
         * @private
         * @param {dsector.PositionedModel} model the model.
         * @param {Array} arrayList the array list.
         */
        jewelBlockIsOverGrid(model, arrayList) {
            model.z = -10.0;
            for (let i = 0; i < arrayList.length; ++i) {
                const positionedModel = this.silentBackgroundObjects[i];
                if (model.intersectsWith(positionedModel)) {
                    model.z = 0.0;
                    return true;
                }
            }
            return false;
        }

        /**
         * List players in random order.
         *
         * @private
         * @returns {Array} the array list.
         */
        listPlayersInRandomOrder() {
            const players = Array(dsector.DSReference.dsecGame.numberOfPlayers()).fill(null);
            for (let i = 0; i < this.dsGame.numberOfPlayers(); ++i) {
                const player = this.dsGame.getPlayer(i + 1);
                let rndPlayer;
                do {
                    rndPlayer = ((Math.random() * dsector.DSReference.dsecGame.numberOfPlayers()) | 0);
                } while ((players[rndPlayer] != null));
                players[rndPlayer] = player;
            }
            return players;
        }

        /**
         * Check if all players are destroyed.
         *
         * @private
         * @returns {boolean} the boolean.
         */
        allPlayersAreDestroyed() {
            if (this.__timeWhenAllPlayersDestroyed > 0) {
                return true;
            } else {
                let count = 0;
                for (let i = 0; i < this.dsGame.numberOfPlayers(); ++i) {
                    const player = this.dsGame.getPlayer(i + 1);
                    if (player.aliveState !== 0) {
                        ++count;
                    }
                }
                if (count <= 1) {
                    this.__timeWhenAllPlayersDestroyed = CWSYSTEM.Environment.currentTime();
                    return true;
                } else {
                    return false;
                }
            }
        }

        /**
         * Check if all jewels are destroyed.
         *
         * @private
         * @returns {boolean} the boolean.
         */
        allJewelsAreDestroyed() {
            if (this.__timeWhenAllJewelsDestroyed > 0) {
                return true;
            } else {
                const checked = false;
                if (this.redJewel.energy > 0.0 && this.blueJewel.energy > 0.0) {
                    return checked;
                } else {
                    this.__timeWhenAllJewelsDestroyed = CWSYSTEM.Environment.currentTime();
                    return true;
                }
            }
        }

        /**
         * Milliseconds since all players were destroyed.
         *
         * @private
         * @returns {number} the long.
         */
        millisecondsSinceAllPlayersDestroyed() {
            return CWSYSTEM.Environment.currentTime() - this.timeWhenAllPlayersDestroyed();
        }

        /**
         * Milliseconds since all jewels were destroyed.
         *
         * @private
         * @returns {number} the long.
         */
        millisecondsSinceAllJewelsDestroyed() {
            return CWSYSTEM.Environment.currentTime() - this.timeWhenAllJewelsDestroyed();
        }

        /**
         * Time when all players were destroyed.
         *
         * @private
         * @returns {number} the long.
         */
        timeWhenAllPlayersDestroyed() {
            return this.__timeWhenAllPlayersDestroyed;
        }

        /**
         * Time when all jewels were destroyed.
         *
         * @private
         * @returns {number} the when the jewels were destroyed.
         */
        timeWhenAllJewelsDestroyed() {
            return this.__timeWhenAllJewelsDestroyed;
        }

        /**
         * Suspend shopping card if tank is the first out of area.
         *
         * @private
         * @param {dsector.DSecPlayer} player the player to get discount suspended.
         */
        suspendShoppingCardIfTankIsTheFirstOutOfArea(player) {
            if (this.firstTankMovedOutOfArea == null) {
                if ((player.getX() > 600.0 || player.getX() < -600.0 ||
                        player.getY() > 600.0 || player.getY() < -600.0) &&
                    CWSYSTEM.Environment.currentTime() - this.timeWhenLastOutOfAreaWarningStated > 10000 &&
                    dsector.DSReference.dsecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound("returnToZoneWarning.wav", 1);
                    this.timeWhenLastOutOfAreaWarningStated = CWSYSTEM.Environment.currentTime();
                }
                if (player.getX() > 750.0 || player.getX() < -750.0 ||
                    player.getY() > 750.0 || player.getY() < -750.0) {
                    dsector.DSReference.dsecGame.dsecRound.firstTankMovedOutOfArea = player;
                    player.suspendShoppingCardIfOwned();
                }
            }
        }

        /**
         * Set time when any player last fired.
         *
         * @private
         * @param {number} time the time to set.
         */
        setTimeWhenAnyPlayerLastFired(time) {
            this.__timeWhenAnyPlayerLastFired = time;
            this.__atLeastOnePlayerHasFired = true;
            this.endOfRoundWarningIssued = false;
        }

        /**
         * Gets the time when the current round started.
         *
         * @returns {number} The timestamp of when the round started.
         */
        timeWhenRoundStarted() {
            return this.__timeWhenRoundStarted;
        }

        /**
         * Gets the time when any player last fired a shot.
         *
         * @returns {number} The timestamp of the last shot fired by any player.
         */
        timeWhenAnyPlayerLastFired() {
            return this.__timeWhenAnyPlayerLastFired;
        }

        /**
         * Checks if at least one player has fired during the current round.
         *
         * @returns {boolean} True if at least one player has fired, false otherwise.
         */
        atLeastOnePlayerHasFired() {
            return this.__atLeastOnePlayerHasFired;
        }

        /**
         * Check if zero fire period has exceeded.
         *
         * @returns {boolean} the boolean.
         */
        zeroFirePeriodExceeded() {
            const timePeriod = CWSYSTEM.Environment.currentTime() - this.__timeWhenAnyPlayerLastFired;
            if (!this.endOfRoundWarningIssued && timePeriod > 120000 && dsector.DSReference.dsecSetupWindow.soundMode !== 0) {
                dsector.DSReference.cwSound.playSound("roundEndWarning.wav", 0);
                this.endOfRoundWarningIssued = true;
            }
            return timePeriod > 139000;
        }
    }

    dsector.DSecRound = DSecRound;
    DSecRound["__class"] = "dsector.DSecRound";
})(dsector);