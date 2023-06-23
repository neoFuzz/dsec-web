/* Re-written from Java */
var dsector;
(function (dsector) {
    class DSecBrain {
        constructor(player) {
            if (this.targetType === undefined) {
                this.targetType = 0;
            }
            if (this.target === undefined) {
                this.target = null;
            }
            if (this.player === undefined) {
                this.player = null;
            }
            if (this.amountToTurnInRadians === undefined) {
                this.amountToTurnInRadians = 0;
            }
            if (this.__amountTurned === undefined) {
                this.__amountTurned = 0;
            }
            if (this.__tankLastDetectedBySensor === undefined) {
                this.__tankLastDetectedBySensor = null;
            }
            if (this.tankLastTakenHitFrom === undefined) {
                this.tankLastTakenHitFrom = null;
            }
            this.player = player;
            this.targetType = DSecBrain.NONE;
            this.target = null;
            this.amountToTurnInRadians = 0.0;
        }

        respondToGameTick() {
            this.stopTurningIfAmountTurnedExceedsTarget();
        }

        resetAmountTurned() {
            this.__amountTurned = 0.0;
        }

        adjustAmountTurned(amount) {
            this.__amountTurned += amount;
        }

        amountTurned() {
            return this.__amountTurned;
        }

        tankLastDetectedBySensor() {
            return this.__tankLastDetectedBySensor;
        }

        turnRightForGivenRadians(radians) {
            this.resetAmountTurned();
            this.player.acceptInstruction(dsector.DSecPlayer.TURN_CLOCKWISE);
            this.amountToTurnInRadians = -radians;
        }

        turnLeftForGivenRadians(radians) {
            this.resetAmountTurned();
            this.player.acceptInstruction(dsector.DSecPlayer.TURN_ANTICLOCKWISE);
            this.amountToTurnInRadians = radians;
        }

        /** private function */
        stopTurningIfAmountTurnedExceedsTarget() {
            if (this.amountToTurnInRadians !== 0.0) {
                if (this.player.angleMovement() === 1) {
                    if (this.amountToTurnInRadians > 0.0) {
                        this.amountToTurnInRadians = 0.0;
                    } else if (this.__amountTurned < this.amountToTurnInRadians) {
                        this.resetAmountTurned();
                        this.player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                    }
                } else if (this.player.angleMovement() === -1) {
                    if (this.amountToTurnInRadians < 0.0) {
                        this.amountToTurnInRadians = 0.0;
                    } else if (this.__amountTurned > this.amountToTurnInRadians) {
                        this.resetAmountTurned();
                        this.player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                    }
                } else {
                    this.amountToTurnInRadians = 0.0;
                }
            }
        }

        setTargetAsTankLastDetectedWithSensor() {
            if (this.__tankLastDetectedBySensor != null) {
                this.targetType = DSecBrain.TANK;
                this.target = this.__tankLastDetectedBySensor;
            }
        }

        setTargetAsNearestEnemyTank() {
            let player = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.player.playerIsEnemy(player1) && player1 !== this.player && player1.aliveState !== 0) {
                    const dist = this.player.distanceToPlayer(player1);
                    if (dist < maxValue) {
                        maxValue = dist;
                        player = player1;
                    }
                }
            }
            if (player != null) {
                this.targetType = DSecBrain.TANK;
                this.target = player;
            }
        }

        setTargetAsEnemyJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                this.targetType = DSecBrain.JEWEL;
                this.target = this.player.enemyJewel();
            }
        }

        setTargetAsNearestEnemyTankOrJewel() {
            this.setTargetAsNearestEnemyTank();
            if (dsector.DSReference.dsecMainSetupWindow.playMode() !== dsector.DSecMainSetupWindow.HOSTILE) {
                if (this.player.allEnemyTanksDestroyed()) {
                    this.setTargetAsEnemyJewel();
                } else {
                    if (this.targetType === DSecBrain.TANK) {
                        const player = this.target;
                        const targetJewel = Math.sqrt(Math.pow(this.player.enemyJewel().x - this.player.getX(),
                            2.0) + Math.pow(this.player.enemyJewel().y - this.player.getY(), 2.0));
                        const targetPlayer = Math.sqrt(Math.pow(player.getX() - this.player.getX(), 2.0) +
                            Math.pow(player.getY() - this.player.getY(), 2.0));
                        if (targetJewel < targetPlayer && (this.player.allEnemyTanksDestroyed() ||
                            this.player.teamOfPlayer().totalTankStrengthOfTeam() <
                            this.player.enemyTeamOfPlayer().totalTankStrengthOfTeam() ||
                            this.player.isWeakestInTeamAndAtLeastOneOtherPlayerOfSameTeamAlive() ||
                            this.enemyJewelCanProbablyBeDestroyedQuickly())) {
                            this.setTargetAsEnemyJewel();
                        }
                    }
                }
            }
        }

        setTargetAsTankWithHighestScore() {
            let player = null;
            let score = 0.0;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.player.playerIsEnemy(player1) && player1 !== this.player &&
                    player1.aliveState !== 0 && player1.score() >= score) {
                    score = player1.score();
                    player = player1;
                }
            }
            if (player != null) {
                this.targetType = DSecBrain.TANK;
                this.target = player;
            }
            if (this.player.allEnemyTanksDestroyed() && this.player.enemyJewel() != null) {
                this.setTargetAsEnemyJewel();
            }
        }

        setTargetAsTankWithLowestScore() {
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.player.playerIsEnemy(player) && player !== this.player &&
                    player.aliveState !== 0 && player.score() <= maxValue) {
                    maxValue = player.score();
                }
            }
            if (this.player != null) {
                this.targetType = DSecBrain.TANK;
                this.target = this.player;
            }
            if (this.player.allEnemyTanksDestroyed() && this.player.enemyJewel() != null) {
                this.setTargetAsEnemyJewel();
            }
        }

        setTankLastTakenHitFrom(player) {
            this.tankLastTakenHitFrom = player;
        }

        setTargetAsTankLastTakenHitFrom() {
            if (this.tankLastTakenHitFrom != null) {
                this.targetType = DSecBrain.TANK;
                this.target = this.tankLastTakenHitFrom;
            }
        }

        turnTowardsTarget() {
            let cPosX = 0.0;
            let cPosY = 0.0;
            let angle;
            if (this.targetType === DSecBrain.TANK) {
                const player1 = this.player;
                const player2 = this.target;
                const p2Angle = Math.cos(player2.getAngle());
                angle = Math.sin(player2.getAngle());
                const p2X = player2.getX() + ((20.0 * p2Angle) * player2.tankSpecification.maximumVelocity()) *
                    player2.forwardMovement();
                const p2Y = player2.getY() + ((20.0 * angle) * player2.tankSpecification.maximumVelocity()) *
                    player2.forwardMovement();
                cPosX = p2X - player1.getX();
                cPosY = p2Y - player1.getY();
            }
            if (this.targetType === DSecBrain.JEWEL &&
                dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                cPosX = this.player.enemyJewel().x - this.player.getX();
                cPosY = this.player.enemyJewel().y - this.player.getY();
            }
            let atan = Math.atan2(cPosY, cPosX);
            let pAngle = this.player.getAngle();
            atan = (atan + 6.283185307179586) % 6.2831855;
            pAngle = (pAngle + 6.283185307179586) % 6.2831855;
            let amount = 1;
            if (atan > pAngle) {
                amount = -1;
            }
            angle = Math.abs(atan - pAngle);
            if (angle > 3.141592653589793) {
                amount = -amount;
                angle = Math.fround(6.2831855 - angle);
            }
            if (angle < 0.031415926535897934) {
                this.resetAmountTurned();
                this.player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
            } else {
                if (amount === 1) {
                    this.turnRightForGivenRadians(angle);
                } else {
                    this.turnLeftForGivenRadians(angle);
                }
            }
        }

        sensorsVisible() {
            return this.player.robotSpecification.type === 4 &&
                this.player.robotSpecification.viewSensors === dsector.RobotSpecification.TRUE;
        }

        closestObjectStrikingSensor(ap, va, vv, m, csin) {
            const angle = this.player.getAngle();
            const anglePos = Math.fround(this.player.getAngle() + ap);
            const vX = (this.player.getX() + m * Math.cos(angle) - csin * Math.sin(angle));
            const vY = (this.player.getY() + m * Math.sin(angle) + csin * Math.cos(angle));
            const angleVX = vX + Math.cos(anglePos) * va;
            const angleVY = vY + Math.sin(anglePos) * va;
            const polygon = new dsector.Polygon(new dsector.Vertex(vX, vY, 0.0),
                new dsector.Vertex((angleVX + Math.sin(anglePos) * vv / 2.0),
                    (angleVY - Math.cos(anglePos) * vv / 2.0), 0.0),
                new dsector.Vertex((angleVX - Math.sin(anglePos) * vv / 2.0),
                    (angleVY + Math.cos(anglePos) * vv / 2.0), 0.0),
                new CWSYSTEM.CWColor(255, 20, 20, 15));
            const arrayList = ([]);
            arrayList.push(polygon);
            const sensor = dsector.PositionedModel.createPositionedModelFromGroupOfPolygons("sensor", arrayList);
            if (this.sensorsVisible()) {
                dsector.DSReference.dsecGame.addObjectForDisplayOnlyDuringTheNextFrame(sensor);
            }
            const arrayList1 = ([]);
            let round = dsector.DSReference.dsecGame.dsecRound;
            let i;
            for (i = 0; i < round.backgroundObjects.length; ++i) {
                const model = round.backgroundObjects[i];
                if (sensor.intersectsWith(model)) {
                    const polygonCenter = this.distanceBetweenPointAndPolygonCenter(
                        this.player.getX(), this.player.getY(), 0.0, model.intersectedPolygon);
                    arrayList1.push(new dsector.IntersectingDSecObject(polygonCenter,
                        DSecBrain.WALL, null, null, null));
                }
            }
            let v;
            let positionedModel;
            for (i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player1 !== this.player && player1.aliveState !== 0) {
                    positionedModel = player1.constructPositionedModel();
                    if (sensor.intersectsWith(positionedModel)) {
                        v = this.distanceBetweenPointAndPolygonCenter(this.player.getX(), this.player.getY(),
                            0.0, positionedModel.intersectedPolygon);
                        arrayList1.push(new dsector.IntersectingDSecObject(v, DSecBrain.TANK, player1, null, null));
                    }
                }
            }
            for (i = 0; i < dsector.DSReference.dsecMissileManager.missiles.length; ++i) {
                const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                if (missile.owner !== this.player) {
                    positionedModel = missile.constructPositionedModel();
                    if (sensor.intersectsWith(positionedModel)) {
                        v = this.distanceBetweenPointAndPolygonCenter(this.player.getX(), this.player.getY(),
                            0.0, positionedModel.intersectedPolygon);
                        arrayList1.push(new dsector.IntersectingDSecObject(v, DSecBrain.MISSILE, null, missile, null));
                    }
                }
            }
            let polyCenter;
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                round = dsector.DSReference.dsecGame.dsecRound;
                let model = this.player.enemyJewel().constructPositionedModel();
                if (sensor.intersectsWith(model)) {
                    polyCenter = this.distanceBetweenPointAndPolygonCenter(this.player.getX(), this.player.getY(),
                        0.0, model.intersectedPolygon);
                    arrayList1.push(new dsector.IntersectingDSecObject(polyCenter, DSecBrain.JEWEL, null,
                        null, this.player.enemyJewel()));
                }
                model = this.player.ownJewel().constructPositionedModel();
                if (sensor.intersectsWith(model)) {
                    polyCenter = this.distanceBetweenPointAndPolygonCenter(this.player.getX(), this.player.getY(),
                        0.0, model.intersectedPolygon);
                    arrayList1.push(new dsector.IntersectingDSecObject(polyCenter, DSecBrain.WALL,
                        null, null, null));
                }
            }
            if (arrayList1.length === 0) {
                return DSecBrain.NONE;
            } else {
                let intersectingObject = null;
                polyCenter = 3.4028235E38;
                for (let j = 0; j < arrayList1.length; ++j) {
                    const intersObject = arrayList1[j];
                    if (intersObject.distance < polyCenter) {
                        intersectingObject = intersObject;
                        polyCenter = intersObject.distance;
                    }
                }
                if (intersectingObject.type === DSecBrain.TANK) {
                    this.__tankLastDetectedBySensor = intersectingObject.playerOwningIntersectingTank;
                    if (this.__tankLastDetectedBySensor.shieldActive()) {
                        intersectingObject.type = DSecBrain.WALL;
                    }
                    if (!this.player.playerIsEnemy(this.__tankLastDetectedBySensor)) {
                        intersectingObject.type = DSecBrain.WALL;
                    }
                }
                if (intersectingObject.type === DSecBrain.MISSILE && intersectingObject.intersectingMissile.weaponSpecification.actionWhenFiredAfterAlreadyLaunched === 14 && !this.player.shieldActive()) {
                    intersectingObject.type = DSecBrain.WALL;
                }
                return intersectingObject.type;
            }
        }

        /** private function */
        distanceBetweenPointAndPolygonCenter(inVX, inVY, inVZ, polygon) {
            const vX = ((polygon.v1.x + polygon.v2.x) + polygon.v3.x) / 3.0;
            const vY = ((polygon.v1.y + polygon.v2.y) + polygon.v3.y) / 3.0;
            const vZ = ((polygon.v1.z + polygon.v2.z) + polygon.v3.z) / 3.0;
            return Math.fround(Math.sqrt(Math.pow(vX - inVX, 2.0) +
                Math.pow(vY - inVY, 2.0) + Math.pow(vZ - inVZ, 2.0)));
        }

        sensorResponse(response) {
            switch (response) {
                case 1:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor1Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor1Length, this.player.robotSpecification.sensor1Width,
                        this.player.robotSpecification.sensor1ParallelOffset,
                        this.player.robotSpecification.sensor1PerpendicularOffset);
                case 2:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor2Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor2Length, this.player.robotSpecification.sensor2Width,
                        this.player.robotSpecification.sensor2ParallelOffset,
                        this.player.robotSpecification.sensor2PerpendicularOffset);
                case 3:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor3Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor3Length, this.player.robotSpecification.sensor3Width,
                        this.player.robotSpecification.sensor3ParallelOffset,
                        this.player.robotSpecification.sensor3PerpendicularOffset);
                case 4:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor4Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor4Length, this.player.robotSpecification.sensor4Width,
                        this.player.robotSpecification.sensor4ParallelOffset,
                        this.player.robotSpecification.sensor4PerpendicularOffset);
                case 5:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor5Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor5Length, this.player.robotSpecification.sensor5Width,
                        this.player.robotSpecification.sensor5ParallelOffset,
                        this.player.robotSpecification.sensor5PerpendicularOffset);
                case 6:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor6Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor6Length, this.player.robotSpecification.sensor6Width,
                        this.player.robotSpecification.sensor6ParallelOffset,
                        this.player.robotSpecification.sensor6PerpendicularOffset);
                case 7:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor7Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor7Length, this.player.robotSpecification.sensor7Width,
                        this.player.robotSpecification.sensor7ParallelOffset,
                        this.player.robotSpecification.sensor7PerpendicularOffset);
                case 8:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor8Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor8Length, this.player.robotSpecification.sensor8Width,
                        this.player.robotSpecification.sensor8ParallelOffset,
                        this.player.robotSpecification.sensor8PerpendicularOffset);
                case 9:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor9Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor9Length, this.player.robotSpecification.sensor9Width,
                        this.player.robotSpecification.sensor9ParallelOffset,
                        this.player.robotSpecification.sensor9PerpendicularOffset);
                case 10:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor10Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor10Length, this.player.robotSpecification.sensor10Width,
                        this.player.robotSpecification.sensor10ParallelOffset,
                        this.player.robotSpecification.sensor10PerpendicularOffset);
                case 11:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor11Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor11Length, this.player.robotSpecification.sensor11Width,
                        this.player.robotSpecification.sensor11ParallelOffset,
                        this.player.robotSpecification.sensor11PerpendicularOffset);
                case 12:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor12Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor12Length, this.player.robotSpecification.sensor12Width,
                        this.player.robotSpecification.sensor12ParallelOffset,
                        this.player.robotSpecification.sensor12PerpendicularOffset);
                case 13:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor13Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor13Length, this.player.robotSpecification.sensor13Width,
                        this.player.robotSpecification.sensor13ParallelOffset, this.player.robotSpecification.sensor13PerpendicularOffset);
                case 14:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor14Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor14Length, this.player.robotSpecification.sensor14Width,
                        this.player.robotSpecification.sensor14ParallelOffset,
                        this.player.robotSpecification.sensor14PerpendicularOffset);
                case 15:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor15Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor15Length, this.player.robotSpecification.sensor15Width,
                        this.player.robotSpecification.sensor15ParallelOffset,
                        this.player.robotSpecification.sensor15PerpendicularOffset);
                case 16:
                    return this.player.brain.closestObjectStrikingSensor(Math.fround(
                            (this.player.robotSpecification.sensor16Angle * 3.1415927) / 180.0),
                        this.player.robotSpecification.sensor16Length, this.player.robotSpecification.sensor16Width,
                        this.player.robotSpecification.sensor16ParallelOffset,
                        this.player.robotSpecification.sensor16PerpendicularOffset);
                default:
                    return DSecBrain.NONE;
            }
        }

        destinationTankOrJewelWithin(range) {
            let distance;
            if (this.targetType === DSecBrain.TANK) {
                const player = this.target;
                distance = Math.sqrt(Math.pow(player.getX() - this.player.getX(), 2.0) +
                    Math.pow(player.getY() - this.player.getY(), 2.0));
                return distance < range;
            } else if (this.targetType === DSecBrain.JEWEL) {
                const jewel = this.player.enemyJewel();
                distance = Math.sqrt(Math.pow(jewel.x - this.player.getX(), 2.0) +
                    Math.pow(jewel.y - this.player.getY(), 2.0));
                return distance < range;
            } else {
                return false;
            }
        }

        destinationTankWithin(range) {
            if (this.targetType === DSecBrain.TANK) {
                const player = this.target;
                const dist = Math.sqrt(Math.pow(player.getX() - this.player.getX(), 2.0) + Math.pow(player.getY() - this.player.getY(), 2.0));
                return dist < range;
            } else {
                return false;
            }
        }

        noEnemyTankOrJewelWithin(range) {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.player.playerIsEnemy(player) && this.player !== player) {
                    const dist = Math.sqrt(Math.pow(this.player.getX() - player.getX(), 2.0) +
                        Math.pow(this.player.getY() - player.getY(), 2.0));
                    if (dist > range) {
                        return false;
                    }
                }
            }
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                const jewel = this.player.enemyJewel();
                const dist1 = Math.sqrt(Math.pow(this.player.getX() - jewel.x, 2.0) +
                    Math.pow(this.player.getY() - jewel.y, 2.0));
                return !(dist1 > range);
            }
            return true;
        }

        noPlayerHasMovedSince(id) {
            return DSecBrain.timeOfLastForwardMovementOfAnyTank < id;
        }

        numberOfEnemiesAlive() {
            let count = 0;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player !== this.player && player.aliveState !== 0 &&
                    (dsector.DSReference.dsecMainSetupWindow.playMode() !== dsector.DSecMainSetupWindow.TEAMS ||
                        this.player.teamOfPlayer() !== player.teamOfPlayer())) {
                    ++count;
                }
            }
            return count;
        }

        withinOptimalZoneForFiringAtJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS &&
                this.targetType === DSecBrain.JEWEL) {
                const jewel = this.player.enemyJewel();
                const yDist = jewel.y - this.player.getY();
                const xDist = jewel.x - this.player.getX();
                const atan = Math.atan2(yDist, xDist);
                const factor = Math.abs(atan) % 1.5707963267948966;
                if (Math.abs(factor - 0.7853981633974483) < 0.15707963267948966) {
                    const distToEnemyJewel = this.player.distanceToEnemyJewel();
                    if (distToEnemyJewel > 43.2 && distToEnemyJewel < 72.0 && (this.player.allEnemyTanksDestroyed() || this.player.teamOfPlayer().totalTankStrengthOfTeam() < this.player.enemyTeamOfPlayer().totalTankStrengthOfTeam() || this.player.isWeakestInTeamAndAtLeastOneOtherPlayerOfSameTeamAlive() || this.enemyJewelCanProbablyBeDestroyedQuickly())) {
                        const friendlyPlayer = this.player.getClosestFriendlyPlayer();
                        if (friendlyPlayer == null) {
                            return true;
                        }
                        return this.player.distanceToPlayer(friendlyPlayer) > 50.399998 ||
                            friendlyPlayer.forwardMovement() !== 0;
                    }
                }
            }
            return false;
        }

        enemyJewelCanProbablyBeDestroyedQuickly() {
            const jewel = this.player.enemyJewel();
            const remE = Math.sqrt(Math.pow(this.player.getX() - jewel.x, 2.0) + Math.pow(this.player.getY() - jewel.y, 2.0));
            return (Math.fround(jewel.energy * 20.0)) + remE < (Math.fround(10.0 * this.player.weaponEnergy));
        }

        enemyMissileWithin(v, dmg) {
            for (let i = 0; i < /* size */ dsector.DSReference.dsecMissileManager.missiles.length; ++i) {
                const missile = dsector.DSReference.dsecMissileManager.missiles[i];
                if (missile.owner !== this.player &&
                    (dsector.DSReference.dsecMainSetupWindow.playMode() !== dsector.DSecMainSetupWindow.TEAMS ||
                        missile.owner == null || missile.owner.teamOfPlayer() !== this.player.teamOfPlayer()) &&
                    !(missile.getDamage() < dmg)) {
                    const ret = Math.sqrt(Math.pow(missile.getX() - this.player.getX(), 2.0) +
                        Math.pow(missile.getY() - this.player.getY(), 2.0));
                    if (ret < v) {
                        return true;
                    }
                }
            }
            return false;
        }

        attemptToTurnShieldOn() {
            if (!this.player.shieldActive()) {
                for (let i = 1; i <= 6; ++i) {
                    const wSpec = this.player.getWeaponFromPortNumber(i);
                    if (wSpec != null && wSpec.specificationID === 327) {
                        this.player.selectPort(i);
                        this.player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    }
                }
            }
        }

        goShopping() {
            this.shoppingLog("-------------------------------------------\n" + this.player.name + " is going shopping");
            const shoppingActions = [this.player.robotSpecification.shoppingStrategyAction1,
                this.player.robotSpecification.shoppingStrategyAction2,
                this.player.robotSpecification.shoppingStrategyAction3,
                this.player.robotSpecification.shoppingStrategyAction4,
                this.player.robotSpecification.shoppingStrategyAction5,
                this.player.robotSpecification.shoppingStrategyAction6,
                this.player.robotSpecification.shoppingStrategyAction7,
                this.player.robotSpecification.shoppingStrategyAction8,
                this.player.robotSpecification.shoppingStrategyAction9,
                this.player.robotSpecification.shoppingStrategyAction10];
            const shoppingStrategy = [this.player.robotSpecification.shoppingStrategyCondition1,
                this.player.robotSpecification.shoppingStrategyCondition2,
                this.player.robotSpecification.shoppingStrategyCondition3,
                this.player.robotSpecification.shoppingStrategyCondition4,
                this.player.robotSpecification.shoppingStrategyCondition5,
                this.player.robotSpecification.shoppingStrategyCondition6,
                this.player.robotSpecification.shoppingStrategyCondition7,
                this.player.robotSpecification.shoppingStrategyCondition8,
                this.player.robotSpecification.shoppingStrategyCondition9,
                this.player.robotSpecification.shoppingStrategyCondition10];
            for (let i = 0; i < shoppingActions.length; ++i) {
                if (this.passesShoppingCondition(shoppingStrategy[i])) {
                    this.attemptToExecuteShoppingAction(shoppingActions[i]);
                }
            }
        }

        /** private function */
        passesShoppingCondition(condition) {
            const remainingRounds =
                dsector.DSReference.dsecMainSetupWindow.numberOfRounds() - dsector.DSReference.dsecGame.currentRound();
            switch (condition) {
                case 40:
                    return true;
                case 41:
                    return this.player.credits > 500;
                case 42:
                    return this.player.credits > 1000;
                case 43:
                    return this.player.credits > 2000;
                case 44:
                    return this.player.credits > 3000;
                case 45:
                    return this.player.credits > 4000;
                case 46:
                    return this.player.credits > 6000;
                case 47:
                    return this.player.credits > 8000;
                case 48:
                    return this.player.credits > 10000;
                case 49:
                    return this.player.credits > 15000;
                case 50:
                    return this.player.credits > 20000;
                case 51:
                    return this.player.robotSpecification.acceptProbability(5);
                case 52:
                    return this.player.robotSpecification.acceptProbability(10);
                case 53:
                    return this.player.robotSpecification.acceptProbability(25);
                case 54:
                    return this.player.robotSpecification.acceptProbability(50);
                case 55:
                    return this.player.robotSpecification.acceptProbability(75);
                case 56:
                    return remainingRounds > 25;
                case 57:
                    return remainingRounds > 50;
                case 58:
                    return remainingRounds > 100;
                case 59:
                    return remainingRounds > 150;
                case 60:
                    return remainingRounds === 3;
                case 61:
                    return remainingRounds === 6;
                case 62:
                    return remainingRounds === 9;
                case 63:
                default:
                    return false;
                case 64:
                    return remainingRounds === 15;
                case 65:
                    return remainingRounds === 18;
                case 66:
                    return this.player.getFireUnitsFromPortNumber(1) === -1;
                case 67:
                    return this.player.getFireUnitsFromPortNumber(2) === -1;
                case 68:
                    return this.player.getFireUnitsFromPortNumber(3) === -1;
                case 69:
                    return this.player.getFireUnitsFromPortNumber(4) === -1;
                case 70:
                    return this.player.getFireUnitsFromPortNumber(5) === -1;
                case 71:
                    return this.player.getFireUnitsFromPortNumber(6) === -1;
                case 72:
                    return this.player.getFireUnitsFromPortNumber(1) <= 100;
                case 73:
                    return this.player.getFireUnitsFromPortNumber(2) <= 100;
                case 74:
                    return this.player.getFireUnitsFromPortNumber(3) <= 100;
                case 75:
                    return this.player.getFireUnitsFromPortNumber(4) <= 100;
                case 76:
                    return this.player.getFireUnitsFromPortNumber(5) <= 100;
                case 77:
                    return this.player.getFireUnitsFromPortNumber(6) <= 100;
            }
        }

        /** private function */
        attemptToExecuteShoppingAction(action) {
            switch (action) {
                case 10:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(((Math.random() * 8.0) | 0) + 1);
                    break;
                case 11:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(1);
                    break;
                case 12:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(2);
                    break;
                case 13:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(3);
                    break;
                case 14:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(4);
                    break;
                case 15:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(5);
                    break;
                case 16:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(6);
                    break;
                case 17:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(7);
                    break;
                case 18:
                    this.attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(8);
                case 19:
                case 20:
                default:
                    break;
                case 21:
                    if (this.player.tankSpecification.type() === 4 || this.player.tankSpecification.type() === 3 &&
                        this.player.tankSpecification.weaponFuelUpgradeLevel() > 0 ||
                        this.player.tankSpecification.type() === 2 &&
                        this.player.tankSpecification.weaponFuelUpgradeLevel() === 2 ||
                        this.player.tankSpecification.type() === 1 &&
                        this.player.tankSpecification.weaponFuelUpgradeLevel() === 2) {
                        switch ((((Math.random() * 5.0) | 0))) {
                            case 0:
                                this.attemptToExecuteShoppingAction(22);
                                return;
                            case 1:
                            case 2:
                                this.attemptToExecuteShoppingAction(23);
                                return;
                            case 3:
                                this.attemptToExecuteShoppingAction(24);
                                return;
                            case 4:
                                this.attemptToExecuteShoppingAction(22);
                        }
                    } else {
                        switch (this.player.tankSpecification.type()) {
                            case 0:
                                if (this.attemptToPurchaseGivenItem(404)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(403)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(402)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(401)) {
                                    return;
                                }
                                return;
                            case 1:
                                if (this.attemptToPurchaseGivenItem(404)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(403)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(402)) {
                                    return;
                                }
                                return;
                            case 2:
                                if (this.attemptToPurchaseGivenItem(404)) {
                                    return;
                                }
                                if (this.attemptToPurchaseGivenItem(403)) {
                                    return;
                                }
                                return;
                            case 3:
                                if (this.attemptToPurchaseGivenItem(404)) {
                                    return;
                                }
                        }
                    }
                    break;
                case 22:
                    if (this.player.tankSpecification.weaponFuelUpgradeLevel() === 0 &&
                        this.attemptToPurchaseGivenItem(410)) {
                        this.shoppingLog("Successfully upgraded weapon fuel to level 1");
                    }
                    if (this.player.tankSpecification.weaponFuelUpgradeLevel() === 1) {
                        if (this.player.tankSpecification.type() === 0) {
                            this.attemptToPurchaseGivenItem(404);
                        } else if (this.attemptToPurchaseGivenItem(414)) {
                            this.shoppingLog("Successfully upgraded weapon fuel to level 2");
                        }
                    }
                    break;
                case 23:
                    if (this.player.tankSpecification.armourUpgradeLevel() === 0 &&
                        this.attemptToPurchaseGivenItem(411)) {
                        this.shoppingLog("Successfully upgraded armour to level 1");
                    }
                    if (this.player.tankSpecification.armourUpgradeLevel() === 1 &&
                        this.attemptToPurchaseGivenItem(415)) {
                        this.shoppingLog("Successfully upgraded armour to level 2");
                    }
                    break;
                case 24:
                    if (this.player.tankSpecification.turnRateUpgradeLevel() === 0 &&
                        this.attemptToPurchaseGivenItem(412)) {
                        this.shoppingLog("Successfully upgraded turn rate to level 1");
                        return;
                    }
                    if (this.player.tankSpecification.turnRateUpgradeLevel() === 1 &&
                        this.attemptToPurchaseGivenItem(416)) {
                        this.shoppingLog("Successfully upgraded turn rate to level 2");
                        return;
                    }
                    break;
                case 25:
                    if (this.player.tankSpecification.velocityUpgradeLevel() === 0 &&
                        this.attemptToPurchaseGivenItem(413)) {
                        this.shoppingLog("Successfully upgraded speed to level 1");
                        return;
                    }
                    if (this.player.tankSpecification.velocityUpgradeLevel() === 1 &&
                        this.attemptToPurchaseGivenItem(417)) {
                        this.shoppingLog("Successfully upgraded speed to level 2");
                        return;
                    }
                    break;
                case 26:
                    if (!this.player.hasShoppingCard()) {
                        this.attemptToPurchaseGivenItem(405);
                    }
                    break;
                case 27:
                    let check;
                    for (check = false; this.attemptToPurchaseGivenItem(407); check = true) {
                        // ???
                    }
                    if (check) {
                        this.shoppingLog("Bribed the shop");
                    }
            }
        }

        /** private function */
        attemptToPurchaseGivenItem(item) {
            if (item === -1) {
                return false;
            } else if (item === dsector.PreBuiltWeaponSpecifications.NONE) {
                return false;
            } else {
                const specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(item);
                if (specification == null) {
                    this.shoppingLog(this.player.name + " attempted to purchase an item with an invalid id (" + item + ").");
                } else {
                    const actualPrice = specification.actualPrice(this.player);
                    if (actualPrice < this.player.credits) {
                        this.shoppingLog(this.player.name + " is considering to purchase " + specification.fullName +
                            " for " + actualPrice);
                        if (specification.portNumber >= 1 && specification.portNumber <= 6) {
                            const portNumber = this.player.getWeaponFromPortNumber(specification.portNumber);
                            const firedUnits = this.player.getFireUnitsFromPortNumber(specification.portNumber);
                            if (portNumber != null) {
                                if (portNumber.specificationID === item) {
                                    if (firedUnits + 100 > this.player.robotSpecification.shoppingStrategyMaximumFireUnitsThatBePurchased) {
                                        this.shoppingLog("The " + specification.fullName +
                                            " could not be purchased because " + firedUnits + " are already held");
                                        return false;
                                    }
                                    this.shoppingLog(this.player.name + " upgraded " + specification.fullName +
                                        " with 100 units for " + actualPrice + " previously having " + firedUnits + " fire units");
                                } else {
                                    const itemPrice = Math.fround(firedUnits / 100.0) * portNumber.price;
                                    if (itemPrice > this.player.robotSpecification.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced) {
                                        this.shoppingLog("The " + specification.fullName +
                                            " could not be purchase because " + firedUnits + " of " +
                                            portNumber.fullName + " are already held in the same port");
                                        return false;
                                    }
                                    this.shoppingLog(this.player.name + " purchased " + specification.fullName +
                                        " for " + actualPrice + " replacing " + portNumber.fullName + " having " +
                                        firedUnits + " fire units");
                                }
                            } else {
                                this.shoppingLog(this.player.name + " purchased " + specification.fullName + " for " +
                                    actualPrice + " over empty port");
                            }
                        }
                        this.player.grantWeapon(specification);
                        const player = this.player;
                        player.credits -= actualPrice;
                        this.shoppingLog("Purchase successful");
                        return true;
                    }
                    this.shoppingLog(this.player.name + " wanted to purchase " + specification.fullName +
                        " but could not afford.");
                }
                return false;
            }
        }

        /** private function */
        attemptToPurchaseMostAffordableWeaponFromGivenWeaponStrategy(strat) {
            const stratFav = [this.player.robotSpecification.weaponStrategyFavourite1,
                this.player.robotSpecification.weaponStrategyFavourite2,
                this.player.robotSpecification.weaponStrategyFavourite3,
                this.player.robotSpecification.weaponStrategyFavourite4,
                this.player.robotSpecification.weaponStrategyFavourite5,
                this.player.robotSpecification.weaponStrategyFavourite6,
                this.player.robotSpecification.weaponStrategyFavourite7,
                this.player.robotSpecification.weaponStrategyFavourite8];
            const secondFav = [this.player.robotSpecification.weaponStrategySecondFavourite1,
                this.player.robotSpecification.weaponStrategySecondFavourite2,
                this.player.robotSpecification.weaponStrategySecondFavourite3,
                this.player.robotSpecification.weaponStrategySecondFavourite4,
                this.player.robotSpecification.weaponStrategySecondFavourite5,
                this.player.robotSpecification.weaponStrategySecondFavourite6,
                this.player.robotSpecification.weaponStrategySecondFavourite7,
                this.player.robotSpecification.weaponStrategySecondFavourite8];
            const thirdFav = [this.player.robotSpecification.weaponStrategyThirdFavourite1,
                this.player.robotSpecification.weaponStrategyThirdFavourite2,
                this.player.robotSpecification.weaponStrategyThirdFavourite3,
                this.player.robotSpecification.weaponStrategyThirdFavourite4,
                this.player.robotSpecification.weaponStrategyThirdFavourite5,
                this.player.robotSpecification.weaponStrategyThirdFavourite6,
                this.player.robotSpecification.weaponStrategyThirdFavourite7,
                this.player.robotSpecification.weaponStrategyThirdFavourite8];
            const forthFav = [this.player.robotSpecification.weaponStrategyFourthFavourite1,
                this.player.robotSpecification.weaponStrategyFourthFavourite2,
                this.player.robotSpecification.weaponStrategyFourthFavourite3,
                this.player.robotSpecification.weaponStrategyFourthFavourite4,
                this.player.robotSpecification.weaponStrategyFourthFavourite5,
                this.player.robotSpecification.weaponStrategyFourthFavourite6,
                this.player.robotSpecification.weaponStrategyFourthFavourite7,
                this.player.robotSpecification.weaponStrategyFourthFavourite8];
            const fifthFav = [this.player.robotSpecification.weaponStrategyFifthFavourite1,
                this.player.robotSpecification.weaponStrategyFifthFavourite2,
                this.player.robotSpecification.weaponStrategyFifthFavourite3,
                this.player.robotSpecification.weaponStrategyFifthFavourite4,
                this.player.robotSpecification.weaponStrategyFifthFavourite5,
                this.player.robotSpecification.weaponStrategyFifthFavourite6,
                this.player.robotSpecification.weaponStrategyFifthFavourite7,
                this.player.robotSpecification.weaponStrategyThirdFavourite8];
            let check = false;
            if (!check) {
                check = this.attemptToPurchaseGivenItem(stratFav[strat - 1]);
            }
            if (!check) {
                check = this.attemptToPurchaseGivenItem(secondFav[strat - 1]);
            }
            if (!check) {
                check = this.attemptToPurchaseGivenItem(thirdFav[strat - 1]);
            }
            if (!check) {
                check = this.attemptToPurchaseGivenItem(forthFav[strat - 1]);
            }
            if (!check) {
                this.attemptToPurchaseGivenItem(fifthFav[strat - 1]);
            }
        }

        /** private function */
        shoppingLog(message) {
            console.info(message);
        }
    }

    DSecBrain.NONE = 0;
    DSecBrain.TANK = 1;
    DSecBrain.JEWEL = 2;
    DSecBrain.WALL = 3;
    DSecBrain.MISSILE = 4;
    DSecBrain.tankLength = 36.0;
    DSecBrain.timeOfLastForwardMovementOfAnyTank = 0;
    dsector.DSecBrain = DSecBrain;
    DSecBrain["__class"] = "dsector.DSecBrain";
})(dsector || (dsector = {}));
