/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class DSecGame {
        constructor() {
            if (this.dsecRound === undefined) {
                this.dsecRound = null;
            }
            this.cameraPanAngle = 0.0;
            if (this.redTeam === undefined) {
                this.redTeam = null;
            }
            if (this.blueTeam === undefined) {
                this.blueTeam = null;
            }
            this.__currentRound = -1;
        }

        static tankColorR_$LI$() {
            if (DSecGame.tankColorR == null) {
                DSecGame.tankColorR = ( /* asList */[0.01, 0.08, 0.01, 0.05, 0.01, 0.05].slice(0));
            }
            return DSecGame.tankColorR;
        }

        static tankColorG_$LI$() {
            if (DSecGame.tankColorG == null) {
                DSecGame.tankColorG = ( /* asList */[0.01, 0.01, 0.08, 0.05, 0.05, 0.01].slice(0));
            }
            return DSecGame.tankColorG;
        }

        static tankColorB_$LI$() {
            if (DSecGame.tankColorB == null) {
                DSecGame.tankColorB = ( /* asList */[0.08, 0.02, 0.01, 0.01, 0.05, 0.05].slice(0));
            }
            return DSecGame.tankColorB;
        }

        static blueTeamR_$LI$() {
            if (DSecGame.blueTeamR == null) {
                DSecGame.blueTeamR = [0.01, 0.015, 0.05, 0.0933, 0.0, 0.015, 0.01, 0.005];
            }
            return DSecGame.blueTeamR;
        }

        static blueTeamG_$LI$() {
            if (DSecGame.blueTeamG == null) {
                DSecGame.blueTeamG = [0.01, 0.04, 0.05, 0.11, 0.2, 0.0, 0.04, 0.1];
            }
            return DSecGame.blueTeamG;
        }

        static blueTeamB_$LI$() {
            if (DSecGame.blueTeamB == null) {
                DSecGame.blueTeamB = [0.08, 0.07, 0.19, 0.17, 0.225, 0.15, 0.18, 0.225];
            }
            return DSecGame.blueTeamB;
        }

        static redTeamR_$LI$() {
            if (DSecGame.redTeamR == null) {
                DSecGame.redTeamR = [0.08, 0.084, 0.18, 0.21, 0.225, 0.14, 0.18, 0.225];
            }
            return DSecGame.redTeamR;
        }

        static redTeamG_$LI$() {
            if (DSecGame.redTeamG == null) {
                DSecGame.redTeamG = [0.01, 0.04, 0.03, 0.01334, 0.02, 0.0, 0.04, 0.1];
            }
            return DSecGame.redTeamG;
        }

        static redTeamB_$LI$() {
            if (DSecGame.redTeamB == null) {
                DSecGame.redTeamB = [0.01, 0.015, 0.03, 0.01334, 0.15, 0.054, 0.062, 0.005];
            }
            return DSecGame.redTeamB;
        }

        static randomBaseColor() {
            let rand = Math.random();
            const d = rand * (0.225 - 0.0) + 0.0;
            return d;
        }

        gameSpeed() {
            let lastFramePeriod = CWSYSTEM.Environment.lastFramePeriod_$LI$();
            // TODO: inject frame counter
            if (lastFramePeriod > CWSYSTEM.Global.maximumDoubleClickTime) {
                lastFramePeriod = CWSYSTEM.Global.maximumDoubleClickTime;
            }
            return Math.fround(0.035 * lastFramePeriod);
        }

        numberOfPlayers() {
            return dsector.DSReference.dsecMainSetupWindow.numberOfPlayers();
        }

        getPlayer(playerId) {
            return dsector.DSReference.dsecMainSetupWindow.getPlayer(playerId);
        }

        startGame() {
            this.initializeGame();
            dsector.DSReference.dsecShoppingScreen.startShoppingSequence();
        }

        initializeGame() {
            this.__currentRound = -1;
            dsector.DSReference.dsecPlayWindow = new dsector.DSecPlayWindow();
            dsector.DSReference.renderer.createStars();
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                this.redTeam = new dsector.DSecTeam(dsector.DSecTeam.RED);
                this.blueTeam = new dsector.DSecTeam(dsector.DSecTeam.BLUE);
            }
            if ( /* size */DSecGame.tankColorR_$LI$().length > 6 && /* size */ DSecGame.tankColorG_$LI$().length > 6 && /* size */ DSecGame.tankColorB_$LI$().length > 6) {
                for (let k = DSecGame.tankColorR_$LI$().length - 1; /* size */ DSecGame.tankColorR_$LI$().length > 6; k--) {
                    /* remove */
                    DSecGame.tankColorR_$LI$().splice(k, 1)[0];
                    /* remove */
                    DSecGame.tankColorG_$LI$().splice(k, 1)[0];
                    /* remove */
                    DSecGame.tankColorB_$LI$().splice(k, 1)[0];
                }
            }
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                this.initializeColors(player, i);
                player.prepareForStartOfGame();
            }
        }

        initializeColors(player, i) {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() !== dsector.DSecMainSetupWindow.TEAMS) {
                if (i >= 6 && dsector.DSecMainSetupWindow.TEAMS !== 1) {
                    /* add */
                    (DSecGame.tankColorR_$LI$().push(DSecGame.randomBaseColor()) > 0);
                    /* add */
                    (DSecGame.tankColorB_$LI$().push(DSecGame.randomBaseColor()) > 0);
                    /* add */
                    (DSecGame.tankColorG_$LI$().push(DSecGame.randomBaseColor()) > 0);
                } else {
                    /* set */
                    (DSecGame.tankColorR_$LI$()[i] = DSecGame.randomBaseColor());
                    /* set */
                    (DSecGame.tankColorB_$LI$()[i] = DSecGame.randomBaseColor());
                    /* set */
                    (DSecGame.tankColorG_$LI$()[i] = DSecGame.randomBaseColor());
                }
            }
            try {
                if ( /* get */player.tankColor[0] != null) {
                    player.tankColor = ([]);
                }
            } catch (__e) {
                if (__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.IndexOutOfBoundsException") >= 0)) {
                    const e = __e;
                    CWSYSTEM.Debug.println(player.name + " tankColor IndexOutOfBounds exception");
                }
                if (__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof Error) {
                    const e = __e;
                    CWSYSTEM.Debug.println(player.name + " tankColor exception: " + e);
                }
            }
            for (let m = 0; m < 4; m++) {
                /* add */
                (player.tankColor.push(this.tankColor(player.playerNumber(), m)) > 0);
            }
        }

        startNextRound() {
            dsector.DSReference.dsecPlayWindow.create();
            dsector.DSReference.dsecPlayWindow.window.useAntiAliasedContentAreaAndNoInterfaceElements(dsector.DSecSetupWindow.antialiasLevel, 1);
            if (this.__currentRound === -1) {
                this.__currentRound = 1;
            } else {
                ++this.__currentRound;
            }
            for (let j = 0; j < this.numberOfPlayers(); ++j) {
                const player = this.getPlayer(j + 1);
                player.prepareForStartOfRound();
            }
            this.dsecRound = new dsector.DSecRound(this);
            dsector.DSReference.playersStatusWindow.create();
            dsector.DSReference.dsecPlayWindow.create();
        }

        currentRound() {
            return this.__currentRound;
        }

        setCurrentRound(round) {
            this.__currentRound = round;
        }

        gamePlayInProgress() {
            return this.dsecRound != null;
        }

        endRound() {
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                player.finishForEndOfRound();
            }
            dsector.DSReference.dsecGame.dsecRound = null;
            dsector.DSReference.dsecMissileManager.destroyAllMissiles();
            dsector.DSReference.dsecScoreboard.create();
        }

        respondToGameTick() {
            if (dsector.DSReference.dsecTitlePage.titleScreenOpen) {
                dsector.DSReference.dsecTitlePage.respondToGameTick();
            }
            if (this.dsecRound != null) {
                if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.HOSTILE) {
                    if (this.dsecRound.allPlayersAreDestroyed() && CWSYSTEM.Environment.currentTime() - this.dsecRound.timeWhenAllPlayersDestroyed() > 3000) {
                        this.endRound();
                        return;
                    }
                } else if (this.dsecRound.allJewelsAreDestroyed() && CWSYSTEM.Environment.currentTime() - this.dsecRound.timeWhenAllJewelsDestroyed() > 3000) {
                    this.endRound();
                    return;
                }
                if (this.dsecRound.zeroFirePeriodExceeded()) {
                    this.endRound();
                    return;
                }
            }
            if (dsector.DSReference.dsecScoreboard.window != null) {
                dsector.DSReference.dsecScoreboard.respondToGameTick();
            }
            if (this.gamePlayInProgress()) {
                for (let i = 0; i < this.numberOfPlayers(); ++i) {
                    const player = this.getPlayer(i + 1);
                    if (player.aliveState !== 0) {
                        player.moveAndRotate();
                        player.restoreWeaponAndShieldEnergyOverOneFrame();
                        if (player.robotSpecification.type === dsector.RobotSpecification.ROBOT) {
                            player.robotSpecification.performAI(player);
                        }
                    }
                }
                dsector.DSReference.dsecMissileManager.moveMissiles();
                dsector.DSReference.scene.clearScene();
                let vertex;
                let y1;
                let rotateX;
                let matrix;
                let rotateY;
                let z1;
                let arrayList;
                let time;
                switch ((dsector.DSecSetupWindow.cameraMode_$LI$())) {
                    case 0:
                        vertex = this.getCameraOverheadPositionForClosestTankDisplay();
                        dsector.DSReference.scene.cameraRotation = dsector.Matrix4f.rotationXMatrix(3.1415927);
                        break;
                    case 1:
                        time = ((CWSYSTEM.Environment.currentTime() % 10000000) | 0);
                        const div = 1.6666667E-5;
                        y1 = Math.fround((6.283185307179586 * time * div));
                        if (this.currentRound() % 2 === 0) {
                            y1 = -y1;
                        }
                        rotateX = 1.5;
                        matrix = 0.9599311;
                        rotateY = 0.35;
                        const obj = null;
                        z1 = 600.0;
                        this.cameraPanAngle = this.smoothlyAdjustedCameraPan(this.cameraPanAngle, y1, z1);
                        arrayList = this.getCyclicPannedCameraPositionAndOrientation(obj, this.cameraPanAngle, rotateX, matrix, rotateY, -1);
                        vertex = arrayList[0];
                        dsector.DSReference.scene.cameraRotation = arrayList[1];
                        break;
                    default:
                        let player = this.getPlayer(1);
                        if (dsector.DSecSetupWindow.cameraMode_$LI$() >= 3) {
                            player = this.getPlayer((dsector.DSecSetupWindow.cameraMode_$LI$() - 1));
                        }
                        y1 = Math.fround(3.1415927 + player.getAngle());
                        rotateX = 1.3;
                        matrix = 0.2617994;
                        rotateY = 0.3;
                        const vertex2D = new dsector.Vertex2D(player.getX(), player.getY());
                        z1 = 6.0;
                        this.cameraPanAngle = this.smoothlyAdjustedCameraPan(this.cameraPanAngle, y1, z1);
                        arrayList = this.getCyclicPannedCameraPositionAndOrientation(vertex2D, this.cameraPanAngle, rotateX, matrix, rotateY, 100);
                        vertex = arrayList[0];
                        dsector.DSReference.scene.cameraRotation = arrayList[1];
                }
                dsector.DSReference.scene.cameraX = (dsector.DSReference.scene.cameraX * DSecGame.cameraPanSlowness / this.gameSpeed() + vertex.x) / (Math.fround(1.0 + (DSecGame.cameraPanSlowness / this.gameSpeed())));
                dsector.DSReference.scene.cameraY = (dsector.DSReference.scene.cameraY * DSecGame.cameraPanSlowness / this.gameSpeed() + vertex.y) / (Math.fround(1.0 + (DSecGame.cameraPanSlowness / this.gameSpeed())));
                dsector.DSReference.scene.cameraZ = (dsector.DSReference.scene.cameraZ * DSecGame.cameraPanSlowness / this.gameSpeed() + vertex.z) / (Math.fround(1.0 + (DSecGame.cameraPanSlowness / this.gameSpeed())));
                let positionedModel;
                for (time = 0; time < /* size */ this.dsecRound.backgroundObjects.length; ++time) {
                    positionedModel = this.dsecRound.backgroundObjects[time];
                    dsector.DSReference.scene.addPositionedModel(positionedModel);
                }
                if (dsector.DSecSetupWindow.showBackgrounds) {
                    for (time = 0; time < /* size */ this.dsecRound.silentBackgroundObjects.length; ++time) {
                        positionedModel = this.dsecRound.silentBackgroundObjects[time];
                        dsector.DSReference.scene.addPositionedModel(positionedModel);
                    }
                }
                for (time = 0; time < /* size */ this.dsecRound.backgroundObjectsForDisplayNextFrame.length; ++time) {
                    positionedModel = this.dsecRound.backgroundObjectsForDisplayNextFrame[time];
                    dsector.DSReference.scene.addPositionedModel(positionedModel);
                }
                this.dsecRound.backgroundObjectsForDisplayNextFrame = ([]);
                let positionedModel1;
                for (time = 0; time < this.numberOfPlayers(); ++time) {
                    const player = this.getPlayer(time + 1);
                    if (player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                        positionedModel1 = player.constructPositionedModel();
                        dsector.DSReference.scene.addPositionedModel(positionedModel1);
                        if (!player.enoughWeaponEnergyToFireSelectedWeapon()) {
                            const redDot = player.constructPositionedModelOfRedDot();
                            dsector.DSReference.scene.addPositionedModel(redDot);
                        }
                    }
                }
                for (time = 0; time < dsector.DSReference.dsecMissileManager.missiles.length; ++time) {
                    const dsMissile = dsector.DSReference.dsecMissileManager.missiles[time];
                    positionedModel1 = dsMissile.constructPositionedModel();
                    dsector.DSReference.scene.addPositionedModel(positionedModel1);
                }
                if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                    this.dsecRound.redJewel.rotateOverOneFrame();
                    this.dsecRound.blueJewel.rotateOverOneFrame();
                    dsector.DSReference.scene.addPositionedModel(this.dsecRound.redJewel.constructPositionedModel());
                    dsector.DSReference.scene.addPositionedModel(this.dsecRound.blueJewel.constructPositionedModel());
                }
                this.setLightsOverTanks(dsector.DSReference.scene);
                this.setLightsOverJewels(dsector.DSReference.scene);
                this.setMainLight(dsector.DSReference.scene);
                dsector.DSecFadingLight.addLightsToScene(dsector.DSReference.scene);
                dsector.DSReference.renderer.setDetailSensitiveRendering(true);
                dsector.DSReference.renderer.perspectiveProjection$array$sd$window(null, null, dsector.DSReference.dsecPlayWindow.window);
                this.addGlowShieldEffects();
                if (CWSYSTEM.Environment.cycleID_$LI$() % 4 === 0) {
                    dsector.DSReference.playersStatusWindow.update();
                }
            }
        }

        /** @private */
        addGlowShieldEffects() {
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                if (player.shieldActive()) {
                    const width = dsector.Renderer.shieldGraphic().width;
                    const height = dsector.Renderer.shieldGraphic().height;
                    const cosAngle = Math.fround(player.getX() + (4.0 * Math.cos(player.getAngle())));
                    const sinAngle = Math.fround(player.getY() + (4.0 * Math.sin(player.getAngle())));
                    const vertex2D = new dsector.Vertex2D(0, 0);
                    dsector.DSReference.renderer.universeToScreenProjection(dsector.DSReference.dsecPlayWindow.window, cosAngle, sinAngle, 0.0);
                    if (vertex2D != null) {
                        /* add */
                        dsector.DSReference.dsecPlayWindow.window.dSecSpecialEffects.push(
                            new dsector.DSecSpecialEffect(dsector.Renderer.shieldGraphic(),
                                ((vertex2D.x | 0) / dsector.DSReference.dsecPlayWindow.window.antiAliasedLevel | 0) - (width / 2 | 0),
                                ((vertex2D.y | 0) / dsector.DSReference.dsecPlayWindow.window.antiAliasedLevel | 0) - (height / 2 | 0),
                                Math.fround(0.5 + (0.5 * Math.random()))));
                    }
                }
            }
        }

        /** @private */
        smoothlyAdjustedCameraPan(x, y, z) {
            let adjustX = (3.141592653589793E8 + x) % 6.283185307179586;
            let adjustY = (3.141592653589793E8 + y) % 6.283185307179586;
            if (adjustY - adjustX < 3.141592653589793) {
                adjustY += 6.283185307179586;
            }
            if (adjustY - adjustX > 3.141592653589793) {
                adjustX += 6.283185307179586;
            }
            return Math.fround((adjustX * z / this.gameSpeed() + adjustY) /
                (dsector.DSecSetupWindow.rotationsPerMinute + (z / this.gameSpeed())));
        }

        keyPressed(keycode) {
            if (this.gamePlayInProgress()) {
                let i;
                if (keycode === 27) {
                    this.awardEstimatedScores();
                    this.endRound();
                }
                for (i = 0; i < this.numberOfPlayers(); ++i) {
                    const player = this.getPlayer(i + 1);
                    let kbLayout = null;
                    const setupWindow = dsector.DSReference.dsecSetupWindow;
                    switch (player.robotSpecification.type) {
                        case dsector.RobotSpecification.KEYBOARD1:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[0];
                            break;
                        case dsector.RobotSpecification.KEYBOARD2:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[1];
                            break;
                        case dsector.RobotSpecification.KEYBOARD3:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[2];
                            break;
                        case dsector.RobotSpecification.KEYBOARD4:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[3];
                            break;
                        default:
                            if (player.robotSpecification.type > dsector.RobotSpecification.ROBOT) {
                                kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[player.robotSpecification.type - 1];
                            }
                            break;
                    }
                    if (kbLayout != null || kbLayout != undefined) {
                        if (keycode === kbLayout.forwards) {
                            player.acceptInstruction(dsector.DSecPlayer.MOVE_FORWARDS);
                        }
                        if (keycode === kbLayout.backwards) {
                            player.acceptInstruction(dsector.DSecPlayer.MOVE_BACKWARDS);
                        }
                        if (keycode === kbLayout.turnLeft) {
                            player.acceptInstruction(dsector.DSecPlayer.TURN_ANTICLOCKWISE);
                        }
                        if (keycode === kbLayout.turnRight) {
                            player.acceptInstruction(dsector.DSecPlayer.TURN_CLOCKWISE);
                        }
                        if (keycode === kbLayout.changeWeapon) {
                            player.acceptInstruction(dsector.DSecPlayer.CHANGE_WEAPON);
                        }
                        if (keycode === kbLayout.fireWeapon) {
                            player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                        }
                    }
                }
            }
        }

        keyReleased(keycode) {
            if (this.gamePlayInProgress()) {
                for (let i = 0; i < this.numberOfPlayers(); ++i) {
                    const player = this.getPlayer(i + 1);
                    let kbLayout = null;
                    switch ((player.robotSpecification.type)) {
                        case dsector.RobotSpecification.KEYBOARD1:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[0];
                            break;
                        case dsector.RobotSpecification.KEYBOARD2:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[1];
                            break;
                        case dsector.RobotSpecification.KEYBOARD3:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[2];
                            break;
                        case dsector.RobotSpecification.KEYBOARD4:
                            kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[3];
                            break;
                        default:
                            if (player.robotSpecification.type > dsector.RobotSpecification.ROBOT) {
                                kbLayout = dsector.DSecSetupWindow.dsecKeyboardLayout[player.robotSpecification.type - 1];
                            }
                            break;
                    }
                    if (kbLayout != null) {
                        if (keycode === kbLayout.forwards) {
                            player.acceptInstruction(dsector.DSecPlayer.STOP_MOVING);
                        }
                        if (keycode === kbLayout.backwards) {
                            player.acceptInstruction(dsector.DSecPlayer.STOP_MOVING);
                        }
                        if (keycode === kbLayout.turnLeft) {
                            player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                        }
                        if (keycode === kbLayout.turnRight) {
                            player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                        }
                    }
                }
            }
        }

        /** @private */
        getCyclicPannedCameraPositionAndOrientation(vertex2D, rotateZ, xA, rotationXMatrix, yA, mode) {
            let base = 300.0;
            let x1 = -1.0E10;
            let x2 = 1.0E10;
            let y1 = -1.0E10;
            let y2 = 1.0E10;
            let count = 0;
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                if (player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                    ++count;
                    if (player.getX() > x1) {
                        x1 = player.getX();
                    }
                    if (player.getX() < x2) {
                        x2 = player.getX();
                    }
                    if (player.getY() > y1) {
                        y1 = player.getY();
                    }
                    if (player.getY() < y2) {
                        y2 = player.getY();
                    }
                }
            }
            const x3 = x1 - x2;
            const y3 = y1 - y2;
            let xDiv = x2 + x3 / 2.0;
            let yDiv = y2 + y3 / 2.0;
            let axisValue;
            if (count === 0) {
                xDiv = 0.0;
                yDiv = 0.0;
            } else {
                axisValue = x3 > y3 * 1.25 ? x3 : y3 * 1.25;
                if (mode === -1) {
                    base = 100.0 + axisValue * yA;
                } else {
                    base = mode;
                }
            }
            if (vertex2D != null) {
                xDiv = vertex2D.x;
                yDiv = vertex2D.y;
            }
            const xRotate = base * xA;
            axisValue = yDiv + Math.sin(rotateZ) * xRotate;
            const xRtd = xDiv + Math.cos(rotateZ) * xRotate;
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateX$float(1.5707964);
            matrix4f.rotateZ$float(-(Math.fround(rotateZ + 1.5707964)));
            matrix4f.postMultiply(dsector.Matrix4f.rotationXMatrix(rotationXMatrix));
            const arrayList = ([]);
            arrayList.push(new dsector.Vertex(Math.fround(xRtd), Math.fround(axisValue), Math.fround(base))) ;
            arrayList.push(matrix4f);
            return arrayList;
        }

        /** @private */
        getCameraOverheadPositionForClosestTankDisplay() {
            let x1 = -1.0E10;
            let x2 = 1.0E10;
            let y1 = -1.0E10;
            let y2 = 1.0E10;
            let count = 0;
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                if (player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                    ++count;
                    if (player.getX() > x1) {
                        x1 = player.getX();
                    }
                    if (player.getX() < x2) {
                        x2 = player.getX();
                    }
                    if (player.getY() > y1) {
                        y1 = player.getY();
                    }
                    if (player.getY() < y2) {
                        y2 = player.getY();
                    }
                }
            }
            let jewel = null;
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                if (this.dsecRound.blueJewel.teamDestroyed()) {
                    jewel = this.dsecRound.blueJewel;
                }
                if (this.dsecRound.redJewel.teamDestroyed()) {
                    jewel = this.dsecRound.redJewel;
                }
                if (jewel != null) {
                    if (jewel.x > x1) {
                        x1 = jewel.x;
                    }
                    if (jewel.x < x2) {
                        x2 = jewel.x;
                    }
                    if (jewel.y > y1) {
                        y1 = jewel.y;
                    }
                    if (jewel.y < y2) {
                        y2 = jewel.y;
                    }
                }
            }
            if (count === 0 && jewel == null) {
                return new dsector.Vertex(0.0, 0.0, 300.0);
            } else {
                const xNeg = x1 - x2;
                const yNeg = y1 - y2;
                const xDiv = x2 + xNeg / 2.0;
                const yDiv = y2 + yNeg / 2.0;
                const cons = 1.25;
                const dBase = 0.65;
                const calcAx = Math.max(xNeg, yNeg * cons);
                const z1 = 130.0 + calcAx * dBase;
                return new dsector.Vertex(Math.fround(xDiv), Math.fround(yDiv), Math.fround(z1));
            }
        }

        baseRed(base) {
            const playerCount = Math.min(dsector.DSReference.dsecGame.numberOfPlayers(), 100);
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return base <= (playerCount / 2 | 0) ? DSecGame.blueTeamR_$LI$()[base - 1] : DSecGame.redTeamR_$LI$()[base - 1 - ((playerCount / 2 | 0))];
            } else {
                return /* get */ DSecGame.tankColorR_$LI$()[base - 1];
            }
        }

        baseGreen(base) {
            const playerCount = Math.min(dsector.DSReference.dsecGame.numberOfPlayers(), 100);
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return base <= (playerCount / 2 | 0) ? DSecGame.blueTeamG_$LI$()[base - 1] : DSecGame.redTeamG_$LI$()[base - 1 - ((playerCount / 2 | 0))];
            } else {
                return /* get */ DSecGame.tankColorG_$LI$()[base - 1];
            }
        }

        baseBlue(base) {
            const playerCount = Math.min(dsector.DSReference.dsecGame.numberOfPlayers(), 100);
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return base <= (playerCount / 2 | 0) ? DSecGame.blueTeamB_$LI$()[base - 1] : DSecGame.redTeamB_$LI$()[base - 1 - ((playerCount / 2 | 0))];
            } else {
                return /* get */ DSecGame.tankColorB_$LI$()[base - 1];
            }
        }

        tankColor(base, mode) {
            let color;
            switch ((mode)) {
                case 0:
                    color = new CWSYSTEM.CWColor(Math.fround(120.0 + (600.0 * this.baseRed(base))), Math.fround(120.0 + (600.0 * this.baseGreen(base))), Math.fround(120.0 + (600.0 * this.baseBlue(base))), 255);
                    return color;
                case 1:
                    color = new CWSYSTEM.CWColor(Math.fround(100.0 + (400.0 * this.baseRed(base))), Math.fround(100.0 + (400.0 * this.baseGreen(base))), Math.fround(100.0 + (400.0 * this.baseBlue(base))), 255);
                    return color;
                case 2:
                default:
                    color = new CWSYSTEM.CWColor(Math.fround(50.0 + (200.0 * this.baseRed(base))), Math.fround(50.0 + (200.0 * this.baseGreen(base))), Math.fround(50.0 + (200.0 * this.baseBlue(base))), 255);
                    return color;
                case 3:
                    color = new CWSYSTEM.CWColor(Math.fround(80.0 + (800.0 * this.baseRed(base))), Math.fround(80.0 + (800.0 * this.baseGreen(base))), Math.fround(80.0 + (800.0 * this.baseBlue(base))) , 150);
                    return color;
            }
        }

        /** @private */
        setLightsOverJewels(scene) {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                const z = 20.0;
                let red = 0.2;
                let green = 0.2;
                let blue = 0.6;
                red *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                green *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                blue *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                scene.addStaticLight(this.dsecRound.blueJewel.x, this.dsecRound.blueJewel.y, z, red, green, blue);
                red = 0.6;
                green = 0.2;
                blue = 0.2;
                red *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                green *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                blue *= Math.fround(this.dsecRound.redJewel.energy / 200.0);
                scene.addStaticLight(this.dsecRound.redJewel.x, this.dsecRound.redJewel.y, z, red, green, blue);
            }
        }

        /** @private */
        setLightsOverTanks(scene) {
            let z = 20.0;
            let red;
            let blue;
            let green;
            for (let i = 0; i < this.numberOfPlayers(); ++i) {
                const player = this.getPlayer(i + 1);
                if (player.aliveState !== dsector.DSecPlayer.DESTROYED) {
                    red = this.baseRed(i + 1);
                    green = this.baseGreen(i + 1);
                    blue = this.baseBlue(i + 1);
                    if (player.shieldActive()) {
                        red *= 9.0;
                        green *= 9.0;
                        blue *= 9.0;
                        z *= CWSYSTEM.FastColorUtilities.gammaCorrection;
                    }
                    red = red * Math.fround((100.0 + player.weaponEnergy) / 200.0);
                    green = green * Math.fround((100.0 + player.weaponEnergy) / 200.0);
                    blue = blue * Math.fround((100.0 + player.weaponEnergy) / 200.0); // ex: 200
                    scene.addStaticLight(Math.fround(player.getX()), Math.fround(player.getY()), z, red, green, blue);
                }
            }
        }

        setMainLight(scene) {
            scene.addStaticLight(0.0, 0.0, 800.0, 100.0, 100.0, 100.0);
        }

        abortGame() {
            this.endRound();
            dsector.DSReference.dsecMainSetupWindow.create();
        }

        addObjectForDisplayOnlyDuringTheNextFrame(positionedModel) {
            if (this.dsecRound != null) {
                this.dsecRound.backgroundObjectsForDisplayNextFrame.push(positionedModel);
            }
        }

        allPlayersAreRobots() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.robotSpecification.isHuman()) {
                    return false;
                }
            }
            return true;
        }

        /** @private */
        awardEstimatedScores() {
            let stat1;
            let stat2;
            let stat3 = 0.0;
            let stat4 = 0.0;
            let rndnum;
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                let team = null;
                if (this.dsecRound.redJewel.energy > 0.0 && this.dsecRound.blueJewel.energy > 0.0) {
                    stat1 = Math.fround(this.redTeam.totalTankStrengthOfTeam() + Math.random());
                    stat2 = Math.fround(this.blueTeam.totalTankStrengthOfTeam() + Math.random());
                    if (stat1 > stat2) {
                        this.dsecRound.blueJewel.takeDamage(this.dsecRound.blueJewel.energy, null);
                        if (Math.random() > 0.8) {
                            this.dsecRound.redJewel.takeDamage(Math.fround(Math.random() * 30.0), null);
                        }
                        team = this.redTeam;
                    } else {
                        this.dsecRound.redJewel.takeDamage(this.dsecRound.redJewel.energy, null);
                        if (Math.random() > 0.8) {
                            this.dsecRound.blueJewel.takeDamage(Math.fround(Math.random() * 30.0), null);
                        }
                        team = this.blueTeam;
                    }
                }
                stat1 = 0.0;
                stat2 = 0.0;
                for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                    const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                    if (player.aliveState !== dsector.DSecPlayer.DESTROYED && !player.robotSpecification.isHuman()) {
                        if (player.teamOfPlayer() !== team) {
                            stat1 += player.shields;
                            ++stat4;
                        } else {
                            stat2 += player.shields;
                            ++stat3;
                        }
                    }
                }
                rndnum = Math.fround((Math.random() * 40.0) - 20.0);
                for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                    const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                    if (player.aliveState !== dsector.DSecPlayer.DESTROYED && !player.robotSpecification.isHuman()) {
                        let score;
                        if (player.teamOfPlayer() === team) {
                            score = Math.fround(stat1 / stat3);
                        } else {
                            score = Math.fround((stat2 / stat4) / 2.0);
                        }
                        if (i % 2 === 0) {
                            score += Math.fround(rndnum - (Math.random() * 5.0));
                        } else {
                            score -= Math.fround(rndnum - (Math.random() * 5.0));
                        }
                        if (score < 0.0) {
                            score = 0.0;
                        }
                        player.setScore(Math.fround(player.score() + score));
                        player.credits = Math.ceil(player.credits + (score * DSecGame.scoreCreditMultiplier));
                    }
                }
            } else {
                let counter = 0;
                stat1 = 0.0;
                stat2 = 0.0;
                for (let q = 0; q < dsector.DSReference.dsecGame.numberOfPlayers(); ++q) {
                    const player = dsector.DSReference.dsecGame.getPlayer(q + 1);
                    if (player.aliveState !== dsector.DSecPlayer.DESTROYED && !player.robotSpecification.isHuman()) {
                        stat1 += player.shields;
                        stat2 += player.weaponEnergy;
                        ++counter;
                    }
                }
                if (counter <= 1) {
                    return;
                }
                stat3 = Math.fround(stat1 / counter);
                stat4 = Math.fround(stat3 / 2.0);
                rndnum = Math.fround(stat1 - stat4);
                const rndNum2 = Math.fround((Math.random() * 40.0) - 20.0);
                if (Math.fround(stat1 + stat2) > 0.0) {
                    for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                        const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                        if (player.aliveState !== dsector.DSecPlayer.DESTROYED && !player.robotSpecification.isHuman()) {
                            let score2 = Math.fround((rndnum * (player.shields + player.weaponEnergy)) / (stat1 + stat2));
                            if (i % 2 === 0) {
                                score2 += Math.fround(rndNum2 -(Math.random() * 5.0));
                            } else {
                                score2 -= Math.fround(rndNum2 - (Math.random() * 5.0));
                            }
                            if (score2 < 0.0) {
                                score2 = 0.0;
                            }
                            player.setScore(Math.ceil(player.score() + score2));
                            player.credits = Math.ceil(player.credits + (score2 * DSecGame.scoreCreditMultiplier));
                        }
                    }
                }
            }
        }
    }

    DSecGame.cameraPanSlowness = 20;
    DSecGame.scoreCreditMultiplier = 7.0;
    DSecGame.tankSpeedRelativeToMissiles = 1.65;
    dsector.DSecGame = DSecGame;
    DSecGame["__class"] = "dsector.DSecGame";
})(dsector || (dsector = {}));
