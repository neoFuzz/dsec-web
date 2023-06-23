/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class DSecRound {
        constructor(player) {
            if (this.dsGame === undefined) {
                this.dsGame = null;
            }
            if (this.redJewel === undefined) {
                this.redJewel = null;
            }
            if (this.blueJewel === undefined) {
                this.blueJewel = null;
            }
            if (this.backgroundObjects === undefined) {
                this.backgroundObjects = null;
            }
            if (this.silentBackgroundObjects === undefined) {
                this.silentBackgroundObjects = null;
            }
            if (this.backgroundObjectsForDisplayNextFrame === undefined) {
                this.backgroundObjectsForDisplayNextFrame = null;
            }
            if (this.allPlayersDestroyed === undefined) {
                this.allPlayersDestroyed = 0;
            }
            if (this.__timeWhenAllPlayersDestroyed === undefined) {
                this.__timeWhenAllPlayersDestroyed = 0;
            }
            if (this.__timeWhenAllJewelsDestroyed === undefined) {
                this.__timeWhenAllJewelsDestroyed = 0;
            }
            if (this.__timeWhenAnyPlayerLastFired === undefined) {
                this.__timeWhenAnyPlayerLastFired = 0;
            }
            if (this.__timeWhenRoundStarted === undefined) {
                this.__timeWhenRoundStarted = 0;
            }
            if (this.endOfRoundWarningIssued === undefined) {
                this.endOfRoundWarningIssued = false;
            }
            if (this.__atLeastOnePlayerHasFired === undefined) {
                this.__atLeastOnePlayerHasFired = false;
            }
            if (this.firstTankMovedOutOfArea === undefined) {
                this.firstTankMovedOutOfArea = null;
            }
            this.timeWhenLastOutOfAreaWarningStated = -1;
            this.dsGame = player;
            this.initializeRound();
        }

        /** @private */
        initializeRound() {
            this.__timeWhenAllPlayersDestroyed = -1;
            this.__timeWhenAllJewelsDestroyed = -1;
            this.__timeWhenAnyPlayerLastFired = CWSYSTEM.Environment.currentTime();
            this.__timeWhenRoundStarted = CWSYSTEM.Environment.currentTime();
            this.__atLeastOnePlayerHasFired = false;
            this.endOfRoundWarningIssued = false;
            this.silentBackgroundObjects = this.createBackdrop();
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                this.backgroundObjects = this.placeJewelAndSurroundingBlocksInRandomLocationOverGrid(this.silentBackgroundObjects);
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
                        switch (dsector.DSReference.dsecGame.numberOfPlayers()) {  // TODO: investigate what cases are meant to do here
                            case 2:
                                v = 0.0;
                            case 4:
                                v = Math.fround(-calcFlt / 2.0);
                            case 6:
                                v = -calcFlt;
                            case 3:
                            case 5:
                            default:
                                const angle = Math.fround(jAngle + v + j * calcFlt);
                                player.setAngle(Math.fround(angle + 3.1415927));
                                const playerX = Math.fround(Math.cos(angle) * 305.0);
                                const playerY = Math.fround(Math.sin(angle) * 305.0);
                                player.setX(playerX);
                                player.setY(playerY);
                                player.setAngle(Math.fround(angle + 3.1415927));
                                model = player.constructPositionedModel();
                                count = 0;
                        }
                        while ((count < /* size */ this.backgroundObjects.length)) {
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
                const piAngle2 = Math.fround(Math.random() * 2.0 * 3.1415927);
                const players = this.listPlayersInRandomOrder();
                for (let k = 0; k < players.length; ++k) {
                    const zPlayer = players[k];
                    calcFlt = Math.fround(piAngle2 + (k * 2) * 3.1415927 / this.dsGame.numberOfPlayers() % 6.2831855);
                    zPlayer.setX(Math.fround(Math.cos(calcFlt) * x / 2.0));
                    zPlayer.setY(Math.fround(Math.sin(calcFlt) * y / 2.0));
                    zPlayer.setAngle(Math.fround(calcFlt + 3.1415927));
                    const model = zPlayer.constructPositionedModel();
                    for (let index = 0; index < this.backgroundObjects.length; index++) {
                        let backgroundObject = this.backgroundObjects[index];
                        {
                            const model1 = backgroundObject;
                            if (model.intersectsWith(model1)) {
                                this.initializeRound();
                                return;
                            }
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
            if (dsector.DSecSetupWindow.cameraMode_$LI$() === 4 && i < 3 || dsector.DSecSetupWindow.cameraMode_$LI$() === 5 && i < 4 || dsector.DSecSetupWindow.cameraMode_$LI$() === 6 && i < 5 || dsector.DSecSetupWindow.cameraMode_$LI$() === 7 && i < 6) {
                dsector.DSecSetupWindow.cameraMode = 0;
            }
            const playerCountMode = dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS ? (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) : dsector.DSReference.dsecGame.numberOfPlayers();
        }

        /** @private */
        createRandomBackgroundScene(scene, config) {
            const configuration = new dsector.DSecBackgroundConfiguration(config);
            configuration.usePresetConfiguration(((Math.random() * dsector.DSecBackgroundConfiguration.numberOfPresetConfigurations) | 0));
            configuration.setEdgeStyle(((Math.random() * 2.0) | 0) + 1);
            configuration.generateRandomScene(scene);
        }

        /** @private */
        createBackdrop() {
            const arrayList = ([]);
            const rndNum = ((Math.random() * 5.0) | 0) + 1;
            const angle = Math.random() < 0.5 ? 0.7853982 : 2.3561945;
            let model = null;
            switch (rndNum) {
                case 1:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/background1"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 2:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/background2"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 3:
                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/background3"), dsector.Matrix4f.rotationZMatrix(angle), 0.0, 0.0, -8.0);
                    arrayList.push(model);
                    break;
                case 4:
                case 5:
                    for (let x1 = -300.0; x1 <= 300.0; x1 += 200.0) {
                        for (let y1 = -300.0; y1 <= 300.0; y1 += 200.0) {
                            const randomP = ((Math.random() * 6.0) | 0) + 1;
                            switch (randomP) {
                                case 1:
                                default:
                                    break;
                                case 2:
                                case 3:
                                case 4:
                                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/background4_1"), dsector.Matrix4f.rotationZMatrix(0.0), x1, y1, -8.0);
                                    arrayList.push(model);
                                    break;
                                case 5:
                                case 6:
                                    model = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/background4_2"), dsector.Matrix4f.rotationZMatrix(0.0), x1, y1, -8.0);
                                    arrayList.push(model);
                            }
                        }
                    }
            }
            return arrayList;
        }

        /** @private */
        placeJewelAndSurroundingBlocksInRandomLocationOverGrid(arrayList) {
            const stand = 350.0;
            let x2 = 0.0;
            let y2 = 0.0;
            let x1 = 0.0;
            let y1 = 0.0;
            let arrayList1 = null;
            for (let i = 0; i < 50; ++i) {
                const redJAngle = Math.fround((Math.random() * 2.0 * 3.141592653589793));
                const blueJAngle = Math.fround(redJAngle + 3.1415927);
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

        addBlocksSurroundingJewel(jewel, list1, list2) {
            const stand = 20.0;
            const model1 = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(), Math.fround(jewel.x + stand), jewel.y, 0.0);
            const model2 = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(), Math.fround(jewel.x - stand), jewel.y, 0.0);
            const model3 = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(), jewel.x, Math.fround(jewel.y + stand), 0.0);
            const model4 = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel("assets/models/smallBlock"), new dsector.Matrix4f(), jewel.x, Math.fround(jewel.y - stand), 0.0);
            if (this.jewelBlockIsOverGrid(model1, list2) && this.jewelBlockIsOverGrid(model2, list2) && this.jewelBlockIsOverGrid(model3, list2) && this.jewelBlockIsOverGrid(model4, list2)) {
                list1.push(model1);
                list1.push(model2);
                list1.push(model3);
                list1.push(model4);
                return true;
            } else {
                return false;
            }
        }

        /** @private */
        jewelBlockIsOverGrid(model, arrayList) {
            model.z = -10.0;
            for (let i = 0; i < /* size */ arrayList.length; ++i) {
                const positionedModel = this.silentBackgroundObjects[i];
                if (model.intersectsWith(positionedModel)) {
                    model.z = 0.0;
                    return true;
                }
            }
            return false;
        }

        /** @private */
        listPlayersInRandomOrder() {
            const players = (s => {
                let a = [];
                while (s-- > 0)
                    a.push(null);
                return a;
            })(dsector.DSReference.dsecGame.numberOfPlayers());
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

        allJewelsAreDestroyed() {
            if (this.__timeWhenAllJewelsDestroyed > 0) {
                return true;
            } else {
                const checked = false;
                if (!(this.redJewel.energy <= 0.0) && !(this.blueJewel.energy <= 0.0)) {
                    return checked;
                } else {
                    this.__timeWhenAllJewelsDestroyed = CWSYSTEM.Environment.currentTime();
                    return true;
                }
            }
        }

        millisecondsSinceAllPlayersDestroyed() {
            return CWSYSTEM.Environment.currentTime() - this.timeWhenAllPlayersDestroyed();
        }

        millisecondsSinceAllJewelsDestroyed() {
            return CWSYSTEM.Environment.currentTime() - this.timeWhenAllJewelsDestroyed();
        }

        timeWhenAllPlayersDestroyed() {
            return this.__timeWhenAllPlayersDestroyed;
        }

        timeWhenAllJewelsDestroyed() {
            return this.__timeWhenAllJewelsDestroyed;
        }

        suspendShoppingCardIfTankIsTheFirstOutOfArea(player) {
            if (this.firstTankMovedOutOfArea == null) {
                if ((player.getX() > 600.0 || player.getX() < -600.0 ||
                        player.getY() > 600.0 || player.getY() < -600.0) &&
                    CWSYSTEM.Environment.currentTime() - this.timeWhenLastOutOfAreaWarningStated > 10000 &&
                    dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound("assets/sounds/returnToZoneWarning.wav", 1);
                    this.timeWhenLastOutOfAreaWarningStated = CWSYSTEM.Environment.currentTime();
                }
                if (player.getX() > 750.0 || player.getX() < -750.0 ||
                    player.getY() > 750.0 || player.getY() < -750.0) {
                    dsector.DSReference.dsecGame.dsecRound.firstTankMovedOutOfArea = player;
                    player.suspendShoppingCardIfOwned();
                }
            }
        }

        setTimeWhenAnyPlayerLastFired(time) {
            this.__timeWhenAnyPlayerLastFired = time;
            this.__atLeastOnePlayerHasFired = true;
            this.endOfRoundWarningIssued = false;
        }

        timeWhenRoundStarted() {
            return this.__timeWhenRoundStarted;
        }

        timeWhenAnyPlayerLastFired() {
            return this.__timeWhenAnyPlayerLastFired;
        }

        atLeastOnePlayerHasFired() {
            return this.__atLeastOnePlayerHasFired;
        }

        zeroFirePeriodExceeded() {
            const timePeriod = CWSYSTEM.Environment.currentTime() - this.__timeWhenAnyPlayerLastFired;
            if (!this.endOfRoundWarningIssued && timePeriod > 120000 && dsector.DSecSetupWindow.soundMode !== 0) {
                dsector.DSReference.cwSound.playSound("assets/sounds/roundEndWarning.wav", 0);
                this.endOfRoundWarningIssued = true;
            }
            return timePeriod > 139000;
        }
    }

    dsector.DSecRound = DSecRound;
    DSecRound["__class"] = "dsector.DSecRound";
})(dsector || (dsector = {}));
