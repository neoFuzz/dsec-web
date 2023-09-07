var dsector;
(function (dsector) {
    class DSecPlayer {
        constructor(robotFileName, name) {
            this.brain = new dsector.DSecBrain(this);
            if (this.credits === undefined) {
                this.credits = 0;
            }
            if (this.__hasShoppingCard === undefined) {
                this.__hasShoppingCard = false;
            }
            if (this.__hasLargerDeath === undefined) {
                this.__hasLargerDeath = false;
            }
            if (this.__hasFastRecharge === undefined) {
                this.__hasFastRecharge = false;
            }
            if (this.__hasAutoHealer === undefined) {
                this.__hasAutoHealer = false;
            }
            if (this.__shoppingCardOwnedButSuspended === undefined) {
                this.__shoppingCardOwnedButSuspended = false;
            }
            if (this.damageInflictedByWeaponSpecification === undefined) {
                this.damageInflictedByWeaponSpecification = new Map();
            }
            if (this.__damageInflictedTowardsPlayer === undefined) {
                this.__damageInflictedTowardsPlayer = new Map();
            }
            if (this.robotSpecification === undefined) {
                this.robotSpecification = null;
            }
            if (this.tankSpecification === undefined) {
                this.tankSpecification = null;
            }
            if (this.weaponEnergy === undefined) {
                this.weaponEnergy = 0;
            }
            if (this.shields === undefined) {
                this.shields = 0;
            }
            if (this.aliveState === undefined) {
                this.aliveState = 0;
            }
            if (this.forwardMovementSound === undefined) {
                this.forwardMovementSound = null;
            }
            if (this.angleMovementSound === undefined) {
                this.angleMovementSound = null;
            }
            if (this.shieldSound === undefined) {
                this.shieldSound = null;
            }
            this.tankColor = ([]);
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.__score === undefined) {
                this.__score = 0;
            }
            if (this.scoreAtStartOfRound === undefined) {
                this.scoreAtStartOfRound = 0;
            }
            if (this.__numberOfKills === undefined) {
                this.__numberOfKills = 0;
            }
            if (this.__numberOfDeaths === undefined) {
                this.__numberOfDeaths = 0;
            }
            if (this.numberOfTimesWeaponFired === undefined) {
                this.numberOfTimesWeaponFired = 0;
            }
            if (this.totalDamageInflicted === undefined) {
                this.totalDamageInflicted = 0;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.angle === undefined) {
                this.angle = 0;
            }
            if (this.__forwardMovement === undefined) {
                this.__forwardMovement = 0;
            }
            if (this.__angleMovement === undefined) {
                this.__angleMovement = 0;
            }
            if (this.lastMovementInstruction === undefined) {
                this.lastMovementInstruction = 0;
            }
            if (this.translationalMomentum === undefined) {
                this.translationalMomentum = 0;
            }
            if (this.angularMomentum === undefined) {
                this.angularMomentum = 0;
            }
            if (this.weapons === undefined) {
                this.weapons = new Map();
            }
            if (this.__selectedPort === undefined) {
                this.__selectedPort = 0;
            }
            if (this.__shieldActive === undefined) {
                this.__shieldActive = false;
            }
            if (this.shieldTurnedOnAt === undefined) {
                this.shieldTurnedOnAt = 0;
            }
            if (this.teleportInProcess === undefined) {
                this.teleportInProcess = false;
            }
            if (this.teleportStartedAt === undefined) {
                this.teleportStartedAt = 0;
            }
            if (this.shieldSpecificationTurnedOn === undefined) {
                this.shieldSpecificationTurnedOn = null;
            }
            if (this.instructionSuppression === undefined) {
                this.instructionSuppression = null;
            }
            this.robotSpecification = new dsector.RobotSpecification(robotFileName);
            this.name = name;
            this.prepareForStartOfGame();
            if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                try {
                    let clip = new Audio("assets/sounds/forwardMovement.wav");
                    clip.loop = false;
                    this.forwardMovementSound = clip;
                    clip = new Audio("assets/sounds/angleMovement.wav");
                    clip.loop = false;
                    this.angleMovementSound = clip;
                    clip = new Audio("assets/sounds/shieldActive.wav");
                    clip.loop = false;
                    this.shieldSound = clip;
                } catch (e) {
                    CWSYSTEM.Debug.println("Error loading movement sounds from DSecPlayer constructor." + e);
                    CWSYSTEM.Debug.println("Error loading Player movement sounds : Line unavailable." + e);
                    CWSYSTEM.Debug.println("Error loading Player movement sounds : File error." + e);
                    CWSYSTEM.Debug.println("Error loading Player movement sounds : Unsupported format." + e);
                }
            }
        }

        static positiveMod(x, y) {
            return x >= 0.0 ? x % y : DSecPlayer.positiveMod(1000.0 * y + x, y);
        }

        getTankSpecification() {
            return this.tankSpecification;
        }

        getNumberOfKills() {
            return this.__numberOfDeaths;
        }

        setNumberOfKills(killCount) {
            this.__numberOfKills = killCount;
        }

        getNumberOfDeaths() {
            return this.__numberOfDeaths;
        }

        setNumberOfDeaths(deathCount) {
            this.__numberOfDeaths = deathCount;
        }

        getNumberOfTimesWeaponFired() {
            return this.numberOfTimesWeaponFired;
        }

        setNumberOfTimesWeaponFired(fireCount) {
            this.numberOfTimesWeaponFired = fireCount;
        }

        getTotalDamageInflicted() {
            return this.totalDamageInflicted;
        }

        setTotalDamageInflicted(dmgInflicted) {
            this.totalDamageInflicted = dmgInflicted;
        }

        /** Returns the player's current score
         * @return {number} */
        score() {
            return this.__score;
        }

        setScore(score) {
            this.__score = score;
        }

        getTankColor(mode) {
            let colorTest = this.tankColor[0];
            try {
                colorTest = this.tankColor[mode];
            } catch (e) {
                CWSYSTEM.Debug.println("tankColor exception: " + e);
            }
            return colorTest;
        }

        prepareForStartOfGame() {
            this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.STANDARD_TANK);
            this.__score = 0.0;//this.credits = 600;
            switch (dsector.DSecSetupWindow.startingCredits) {
                default:
                case 0:
                    this.credits = 600;
                    break;
                case 1:
                    this.credits = 1200;
                    break;
                case 2:
                    this.credits = 100000;
                    break;
            }
            if (CWSYSTEM.CWStringTools.find$Str$Str(this.name, "gmal") !== -1) {
                this.credits = 100000;
            }
            this.__selectedPort = 1;
            this.__numberOfKills = 0;
            this.__numberOfDeaths = 0;
            this.numberOfTimesWeaponFired = 0;
            this.totalDamageInflicted = 0.0;
            this.damageInflictedByWeaponSpecification = new Map();
            this.__damageInflictedTowardsPlayer = new Map();
            this.__hasShoppingCard = false;
            this.__hasLargerDeath = false;
            this.__hasFastRecharge = false;
            this.__hasAutoHealer = false;
            this.__shoppingCardOwnedButSuspended = false;
            this.weapons = new Map();
            this.grantWeapon(dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE));
        }

        prepareForStartOfRound() {
            this.weaponEnergy = 100.0;
            this.shields = 100.0;
            this.aliveState = DSecPlayer.ALIVE;
            this.scoreAtStartOfRound = this.__score;
            this.__forwardMovement = 0;
            this.__angleMovement = 0;
            this.lastMovementInstruction = -1;
            this.__shieldActive = false;
            this.teleportInProcess = false;
        }

        finishForEndOfRound() {
            if (this.angleMovementSound != null) {
                this.angleMovementSound.pause();
            }
            if (this.forwardMovementSound != null) {
                this.forwardMovementSound.pause();
            }
            if (this.shieldSound != null) {
                this.shieldSound.pause();
            }
        }

        scoreOverLastRound() {
            return Math.round(this.__score - this.scoreAtStartOfRound);
        }

        numberOfKills() {
            return this.__numberOfKills;
        }

        numberOfDeaths() {
            return this.__numberOfDeaths;
        }

        damageFireRatio() {
            let ratio = Math.fround(this.totalDamageInflicted / this.numberOfTimesWeaponFired);
            if (ratio > 1000) {
                ratio = 0;
            }
            return ratio;
        }

        mostDamageTo() {
            let player = null;
            let dmg = -1.0;
            for (let playerItr of this.__damageInflictedTowardsPlayer.entries()) {
                let dmgInflicted = this.__damageInflictedTowardsPlayer.get(playerItr[0]);
                if (dmgInflicted > dmg) {
                    dmg = dmgInflicted;
                    player = playerItr[0];
                }
            }
            return player;
        }

        leastDamageTo() {
            let player = null;
            let maxValue = 3.4028235E38;
            for (let playerItr of this.__damageInflictedTowardsPlayer.entries()) {
                let dmgInflicted = this.__damageInflictedTowardsPlayer.get(playerItr[0]);
                if (dmgInflicted < maxValue) {
                    maxValue = dmgInflicted;
                    player = playerItr[0];
                }
            }
            return player;
        }

        damageInflictedTowardsPlayer(player) {
            const damage = this.__damageInflictedTowardsPlayer.get(player);
            return damage != null ? damage : 0.0;
        }

        specificationIDOfFavouriteWeapon() {
            let maxEntry = null;
            for (let entry of this.damageInflictedByWeaponSpecification.entries()) {
                if (maxEntry === null || entry[1] > maxEntry[1]) {
                    maxEntry = entry;
                }
            }
            return maxEntry[0];
        }

        setDamageInflictedByWeapon(specification, damage) {
            this.damageInflictedByWeaponSpecification.set(specification.specificationID, damage);
        }

        setDamageInflictedTowardsPlayer(player, damage) {
            this.__damageInflictedTowardsPlayer.set(player, damage);
        }

        damageInflictedByWeapon(specID) {
            let iterator = this.damageInflictedByWeaponSpecification.keys();
            let specIDValue;
            do {
                const item = iterator.next();
                if (item.done) {
                    return 0.0;
                }
                specIDValue = item.value;
            } while (specIDValue !== specID);
            let damage = this.damageInflictedByWeaponSpecification.get(specIDValue);
            return damage;
        }

        grantWeapon(specification, specID = 100) {
            if (specification.portNumber >= 1 && specification.portNumber <= DSecPlayer.numberOfWeaponPorts) {
                const weapon = this.getWeaponFromPortNumber(specification.portNumber);
                if (weapon === specification) {
                    specID = 100 + this.getFireUnitsFromPortNumber(specification.portNumber);
                }
                this.weapons.set(specification.portNumber, new dsector.WeaponPort(specification, specID));
            } else {
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.STANDARD_TANK) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.STANDARD_TANK);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.ROTRA_1) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.ROTRA1);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.ROTRA_2) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.ROTRA2);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.OPEC_1) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.OPEC1);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.OPEC_2) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.OPEC2);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.OPEC_X) {
                    this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.OPECX);
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.SHOPPING_CARD) {
                    this.__hasShoppingCard = true;
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.LARGER_DEATH) {
                    this.__hasLargerDeath = true;
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.FAST_RECHARGE) {
                    this.__hasFastRecharge = true;
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.AUTO_HEALER) {
                    this.__hasAutoHealer = true;
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.SCORE_BRIBE) {
                    this.__score += 500.0;
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE ||
                    specification.specificationID === dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE_2) {
                    this.tankSpecification.upgradeWeaponFuelQuality();
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE ||
                    specification.specificationID === dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE_2) {
                    this.tankSpecification.upgradeArmour();
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE ||
                    specification.specificationID === dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE_2) {
                    this.tankSpecification.upgradeTurnRate();
                }
                if (specification.specificationID === dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE ||
                    specification.specificationID === dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE_2) {
                    this.tankSpecification.upgradeVelocity();
                }
            }
        }

        removeWeaponFromPort(portNumber) {
            let port = this.weapons.get(portNumber);
            if (port != null) {
                this.weapons.delete(portNumber);
            }
        }

        getWeaponFromPortNumber(portNumber) {
            let port = this.weapons.get(portNumber);
            return port == null ? null : port.weaponSpecification;
        }

        /**
         * @param {number} weaponSpecID WeaponSpecificationID to retrieve port number from */
        getPortNumberFromWeaponSpecificationID(weaponSpecID) {
            for (let i = 1; i <= DSecPlayer.numberOfWeaponPorts; ++i) {
                let port = this.weapons.get(i);
                if (port != null && port.weaponSpecification.specificationID === weaponSpecID) {
                    return i;
                }
            }
            return -1;
        }

        getFireUnitsFromPortNumber(portNumber) {
            let port = this.weapons.get(portNumber);
            return port == null ? -1 : port.fireUnits;
        }

        setFireUnitsFromPortNumber(weaponId, units) {
            let port = this.weapons.get(weaponId);
            if (port != null) {
                port.fireUnits = units;
            }
        }

        selectedWeapon() {
            return this.getWeaponFromPortNumber(this.__selectedPort);
        }

        hasWeaponInPort(portNumber) {
            let weaponPort = this.weapons.get(portNumber);
            return weaponPort != null && weaponPort.fireUnits !== 0;
        }

        selectedPort() {
            return this.__selectedPort;
        }

        changeWeapon() {
            for (let i = 0; i < DSecPlayer.numberOfWeaponPorts; ++i) {
                ++this.__selectedPort;
                if (this.__selectedPort === 7) {
                    this.__selectedPort = 1;
                }
                if (this.selectedWeapon() != null) {
                    return;
                }
            }
        }

        selectPort(portId) {
            for (let i = 0; i < DSecPlayer.numberOfWeaponPorts; ++i) {
                if (this.selectedPort() === portId) {
                    return;
                }
                this.changeWeapon();
            }
        }

        enoughWeaponEnergyToFireSelectedWeapon() {
            const selectedWeapon = this.selectedWeapon();
            if (selectedWeapon == null) {
                return false;
            } else {
                return !(Math.fround(this.weaponEnergy - selectedWeapon.fuelUse) < 0.0);
            }
        }

        fireWeapon() {
            let selectedWeapon = this.selectedWeapon();
            if (selectedWeapon == null) {
                this.changeWeapon();
                selectedWeapon = this.selectedWeapon();
            }
            if (selectedWeapon != null) {
                if (this.robotSpecification.isHuman() ||
                    CWSYSTEM.Environment.currentTime() - dsector.DSReference.dsecGame.dsecRound.timeWhenRoundStarted() >= 4000 ||
                    dsector.DSReference.dsecGame.dsecRound.atLeastOnePlayerHasFired()) {
                    if (!selectedWeapon.alreadyFired(this)) {
                        if (Math.fround(this.weaponEnergy - selectedWeapon.fuelUse) < 0.0 &&
                            dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                            if (this.robotSpecification.type !== dsector.RobotSpecification.ROBOT) {
                                dsector.DSReference.cwSound.playSound("assets/sounds/missileFailed.wav",
                                    (Math.random() * 20.0));
                            }
                            return;
                        }
                        this.weaponEnergy -= selectedWeapon.fuelUse;
                    }
                    dsector.DSReference.dsecGame.dsecRound.setTimeWhenAnyPlayerLastFired(CWSYSTEM.Environment.currentTime());
                    selectedWeapon.fireP(this);
                    const weaponPort = this.weapons.get(this.__selectedPort);
                    --weaponPort.fireUnits;
                    ++this.numberOfTimesWeaponFired;
                    if (weaponPort.fireUnits <= 0) {
                        this.weapons.delete(selectedWeapon.portNumber);
                        this.changeWeapon();
                    }
                }
            }
        }

        forwardMovement() {
            return this.__forwardMovement;
        }

        angleMovement() {
            return this.__angleMovement;
        }

        preventInstructionForMilliseconds(key, length) {
            if (this.instructionSuppression == null) {
                this.instructionSuppression = new Map();
            }
            this.instructionSuppression.set(key,
                CWSYSTEM.Environment.currentTime() + (n => n < 0 ? Math.ceil(n) : Math.floor(n))(length));
        }

        acceptInstruction(state) {
            if (this.aliveState !== DSecPlayer.DESTROYED) {
                if (this.instructionSuppression != null) {
                    const changeState = state;
                    let suppression = this.instructionSuppression.get(changeState);
                    if (suppression != null || suppression !== undefined) {
                        if (suppression >= CWSYSTEM.Environment.currentTime()) {
                            return;
                        }
                        this.instructionSuppression.delete(changeState);
                    }
                }
                switch (state) {
                    case 0: /* MOVE_FORWARDS */
                        if (this.lastMovementInstruction !== DSecPlayer.MOVE_FORWARDS) {
                            this.__forwardMovement = DSecPlayer.MOVE_BACKWARDS;
                            this.lastMovementInstruction = DSecPlayer.MOVE_FORWARDS;
                        }
                        break;
                    case 1: /* MOVE_BACKWARDS */
                        if (this.lastMovementInstruction !== DSecPlayer.MOVE_BACKWARDS) {
                            this.__forwardMovement = -1;
                            this.lastMovementInstruction = DSecPlayer.MOVE_BACKWARDS;
                        }
                        break;
                    case 2: /* STOP_MOVING */
                        this.__forwardMovement = DSecPlayer.MOVE_FORWARDS;
                        this.lastMovementInstruction = DSecPlayer.STOP_MOVING;
                        break;
                    case 3: /* TURN_CLOCKWISE */
                        if (this.lastMovementInstruction !== DSecPlayer.TURN_CLOCKWISE) {
                            this.__angleMovement = 1;
                            this.lastMovementInstruction = DSecPlayer.TURN_CLOCKWISE;
                            if (this.__angleMovement === 0 && this.angleMovementSound != null &&
                                dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                this.angleMovementSound.loop = false;
                                this.angleMovementSound.play();
                            }
                        }
                        break;
                    case 4: /* TURN_ANTICLOCKWISE */
                        if (this.lastMovementInstruction !== DSecPlayer.TURN_ANTICLOCKWISE) {
                            this.__angleMovement = -1;
                            this.lastMovementInstruction = DSecPlayer.TURN_ANTICLOCKWISE;
                            if (this.__angleMovement === 0 && this.angleMovementSound != null &&
                                dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                this.angleMovementSound.loop = false;
                                this.angleMovementSound.play();
                            }
                        }
                        break;
                    case 5: /* STOP_TURNING */
                        if (this.angleMovementSound != null &&
                            dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND) {
                            this.angleMovementSound.pause();
                        }
                        this.lastMovementInstruction = DSecPlayer.STOP_TURNING;
                        this.__angleMovement = 0;
                        break;
                    case 6: /* CHANGE_WEAPON */
                        this.changeWeapon();
                        break;
                    case 7: /* FIRE_WEAPON */
                        this.fireWeapon();
                }
            }
        }

        getX() {
            return this.x;
        }

        setX(x) {
            this.x = x;
        }

        getY() {
            return this.y;
        }

        setY(y) {
            this.y = y;
        }

        getAngle() {
            return Math.fround(DSecPlayer.positiveMod(this.angle, 6.283185307179586));
        }

        setAngle(degrees) {
            this.angle = degrees;
        }

        moveAndRotate() {
            if (this.__angleMovement === 1 || this.__angleMovement === -1 || this.angularMomentum !== 0.0) {
                if (this.__angleMovement === 1 || this.__angleMovement === -1) {
                    this.angularMomentum += Math.fround(this.__angleMovement * dsector.DSReference.dsecGame.gameSpeed() *
                        this.tankSpecification.maximumTurnRate()) / 4.0;
                    if (this.angularMomentum > this.tankSpecification.maximumTurnRate()) {
                        this.angularMomentum = this.tankSpecification.maximumTurnRate();
                    }
                    if (this.angularMomentum < (-this.tankSpecification.maximumTurnRate())) {
                        this.angularMomentum = -this.tankSpecification.maximumTurnRate();
                    }
                }
                if (this.__angleMovement === 0) {
                    if (this.angularMomentum > 0.0) {
                        this.angularMomentum -= Math.fround(dsector.DSReference.dsecGame.gameSpeed() *
                            this.tankSpecification.maximumTurnRate()) / 3.0;
                        if (this.angularMomentum < 0.0) {
                            this.angularMomentum = 0.0;
                        }
                    } else {
                        this.angularMomentum += Math.fround(dsector.DSReference.dsecGame.gameSpeed() *
                            this.tankSpecification.maximumTurnRate()) / 3.0;
                        if (this.angularMomentum > 0.0) {
                            this.angularMomentum = 0.0;
                        }
                    }
                }
                const angleSpeed = Math.fround(-(this.angularMomentum) * dsector.DSReference.dsecGame.gameSpeed() *
                    dsector.DSecGame.tankSpeedRelativeToMissiles);
                if (this.tankAllowedToMoveIntoPosition(this.x, this.y, Math.fround(this.angle + angleSpeed))) {
                    this.angle += angleSpeed;
                    this.brain.adjustAmountTurned(angleSpeed);
                }
            }
            if (this.__forwardMovement === 1 || this.__forwardMovement === -1 || this.translationalMomentum !== 0.0) {
                if (this.__forwardMovement === 1 || this.__forwardMovement === -1) {
                    let accelScale = 0;
                    if (this.robotSpecification.type >= dsector.RobotSpecification.JOYSTICK1) {
                        try {
                            accelScale = CWSYSTEM.CWUtils.roundFloat(dsector.DSReference.jsu.joysticksActive.get(
                                this.robotSpecification.type).gpTriggersScaled.f1, 4);
                        } catch (e) {
                            accelScale = 0;
                        }
                    }
                    // If we are going forward, check we are a joystick player and using the trigger.
                    if (this.__forwardMovement === 1 &&
                        this.robotSpecification.type >= dsector.RobotSpecification.JOYSTICK1 && accelScale !== 0) {
                        const mv = this.tankSpecification.maximumVelocity();
                        this.translationalMomentum = Math.fround(accelScale * mv);/* Set as a percentage of the maximum velocity.
                    Was similar to below else but this caused strange speed scaling */
                    } else {
                        // Everyone else is go at max acceleration
                        this.translationalMomentum += Math.fround((this.__forwardMovement *
                            dsector.DSReference.dsecGame.gameSpeed()) * this.tankSpecification.maximumVelocity()) / 8.0;
                    }
                    // Set translationalMomentum to maximumVelocity() if it is too high
                    if (this.translationalMomentum > this.tankSpecification.maximumVelocity()) {
                        this.translationalMomentum = this.tankSpecification.maximumVelocity();
                    }
                    // Set translationalMomentum to negative maximumVelocity() if it is too low.
                    if (this.translationalMomentum < (-this.tankSpecification.maximumVelocity())) {
                        this.translationalMomentum = -this.tankSpecification.maximumVelocity();
                    }
                    if (this.__forwardMovement === 1) {
                        dsector.DSecBrain.timeOfLastForwardMovementOfAnyTank = CWSYSTEM.Environment.currentTime();
                    }
                }
                if (this.__forwardMovement === 0) {
                    if (this.translationalMomentum > 0.0) {
                        this.translationalMomentum -= Math.fround((dsector.DSReference.dsecGame.gameSpeed() *
                            this.tankSpecification.maximumVelocity()) / 6.0);
                        if (this.translationalMomentum < 0.0) {
                            this.translationalMomentum = 0.0;
                        }
                    } else {
                        this.translationalMomentum += Math.fround((dsector.DSReference.dsecGame.gameSpeed() *
                            this.tankSpecification.maximumVelocity()) / 6.0);
                        if (this.translationalMomentum > 0.0) {
                            this.translationalMomentum = 0.0;
                        }
                    }
                }
                const xAngle = this.x + Math.cos(this.angle) * this.translationalMomentum *
                    dsector.DSReference.dsecGame.gameSpeed() * 1.649999976158142;
                const yAngle = this.y + Math.sin(this.angle) * this.translationalMomentum *
                    dsector.DSReference.dsecGame.gameSpeed() * 1.649999976158142;
                if (this.tankAllowedToMoveIntoPosition(xAngle, yAngle, this.angle)) {
                    this.x = xAngle;
                    this.y = yAngle;
                }
            }
            this.turnShieldOffIfExpired();
            this.teleportIfCountDownExpired();
            dsector.DSReference.dsecGame.dsecRound.suspendShoppingCardIfTankIsTheFirstOutOfArea(this);
        }

        tankAllowedToMoveIntoPosition(x, y, angle) {
            const x1 = this.x;
            const y1 = this.y;
            const cAngle = this.angle;
            this.x = x;
            this.y = y;
            this.angle = angle;
            const positionedModel = this.constructPositionedModel();
            let checked = false;
            let model;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player !== this && player.aliveState !== DSecPlayer.DESTROYED) {
                    model = player.constructPositionedModel();
                    if (positionedModel.intersectsWith(model)) {
                        checked = true;
                        break;
                    }
                }
            }
            const round = dsector.DSReference.dsecGame.dsecRound;
            for (let j = 0; j < round.backgroundObjects.length; ++j) {
                model = round.backgroundObjects[j];
                if (positionedModel.intersectsWith(model)) {
                    checked = true;
                    break;
                }
            }
            this.x = x1;
            this.y = y1;
            this.angle = cAngle;
            return !checked;
        }

        constructPositionedModel() {
            return new dsector.PositionedModel(null, this.tankSpecification.model3DMatrix,
                this.orientationAsMatrix(), Math.fround(this.x), Math.fround(this.y), 0.0);
        }

        constructPositionedModelOfRedDot() {
            return new dsector.PositionedModel(null, this.tankSpecification.model3DMatrixForRedDot,
                this.orientationAsMatrix(), Math.fround(this.x), Math.fround(this.y), 0.0);
        }

        orientationAsMatrix() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ(-this.angle);
            return matrix4f;
        }

        takeDamage(missile) {
            if (this.__shieldActive) {
                if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound(
                        "assets/sounds/shieldDeflection.wav", (Math.random() * 20.0));
                }
            } else {
                const owner = missile.owner;
                let reduction = Math.fround(missile.getDamage() / this.tankSpecification.armour());
                if (owner != null) {
                    reduction *= owner.tankSpecification.weaponFuelQuality();
                }
                reduction *= Math.fround(owner.robotSpecification.weaponFuelRatio / 100.0);
                if (reduction > this.shields) {
                    reduction = this.shields;
                }
                this.shields -= reduction;
                if (owner != null && this.playerIsEnemy(owner)) {
                    owner.__score += reduction;
                    owner.totalDamageInflicted += reduction;
                    owner.credits += Math.ceil(reduction * 7.0);
                    let dmgInflicted = 0.0;
                    if (owner.__damageInflictedTowardsPlayer.get(this) != null) {
                        dmgInflicted = owner.__damageInflictedTowardsPlayer.get(this);
                    }
                    owner.__damageInflictedTowardsPlayer.set(this, dmgInflicted + reduction);
                    let weaponDmg = owner.damageInflictedByWeaponSpecification.get(
                        missile.weaponSpecification.specificationID);
                    let inflicted = 0.0;
                    if (weaponDmg != null) {
                        inflicted = weaponDmg;
                    }

                    owner.damageInflictedByWeaponSpecification.set(missile.weaponSpecification.specificationID,
                        inflicted + reduction);
                    this.brain.setTankLastTakenHitFrom(owner);
                }
                if (this.shields <= 0.0) {
                    if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                        if (this.__hasLargerDeath) {
                            dsector.DSReference.cwSound.playSound(
                                "assets/sounds/mediumExplosion.wav", (Math.random() * 10.0));
                            dsector.DSReference.cwSound.playSound(
                                "assets/sounds/mediumExplosion.wav", (Math.random() * 10.0));
                        } else {
                            dsector.DSReference.cwSound.playSound(
                                "assets/sounds/mediumExplosion.wav", (Math.random() * 10.0));
                        }
                    }
                    this.shields = 0.0;
                    this.weaponEnergy = 0.0;
                    this.finishForEndOfRound();
                    this.aliveState = DSecPlayer.DESTROYED;
                    ++owner.__numberOfKills;
                    ++this.__numberOfDeaths;
                    for (let i = 0; i < 4; ++i) {
                        let v = 2.0;
                        if (this.hasLargerDeath()) {
                            v = 20.0;
                        }
                        if (i > 0 && !this.__hasLargerDeath) {
                            break;
                        }
                        let ws;
                        let inr3 = new dsector.VectorInR3(0.0, 0.0, 0.0);
                        if (i === 0) {
                            ws = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                                dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
                            ws.velocity = 0.5;
                            ws.lifeSpanInMilliseconds = 4000;
                            ws.fire(this, this.x, this.y, 0.0, inr3, v);
                            ws.fire(this, this.x, this.y, 1.5707964, inr3, v);
                            ws.fire(this, this.x, this.y, Math.PI, inr3, v);
                            ws.fire(this, this.x, this.y, 4.712389, inr3, v);
                        }
                        ws = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                            dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
                        ws.velocity = Math.fround(1.0 + i);
                        ws.lifeSpanInMilliseconds = 3000 + ((Math.random() * 2000.0) | 0);
                        ws.fire(this, this.x, this.y, 0.7853982, inr3, v);
                        ws.fire(this, this.x, this.y, 2.3561945, inr3, v);
                        ws.fire(this, this.x, this.y, 3.9269907, inr3, v);
                        ws.fire(this, this.x, this.y, 5.497787, inr3, v);
                        ws = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                            dsector.PreBuiltWeaponSpecifications.MEDIUM_DEBRIS);
                        ws.velocity = Math.fround(1.5 + i);
                        ws.lifeSpanInMilliseconds = 2000 + ((Math.random() * 2000.0) | 0);
                        ws.fire(this, this.x, this.y, 0.0, inr3, (2.0 * v));
                        ws.fire(this, this.x, this.y, 1.5707964, inr3, (2.0 * v));
                        ws.fire(this, this.x, this.y, Math.PI, inr3, (2.0 * v));
                        ws.fire(this, this.x, this.y, 4.712389, inr3, (2.0 * v));
                    }
                    if (this.__hasLargerDeath) {
                        dsector.DSecFadingLight.add(80.0, this.x, this.y, 40.0, 6000);
                    } else {
                        dsector.DSecFadingLight.add(20.0, this.x, this.y, 40.0, 3500);
                    }
                }
            }
        }

        restoreWeaponAndShieldEnergyOverOneFrame() {
            this.weaponEnergy += dsector.DSReference.dsecGame.gameSpeed() / 10.0 * (this.__hasFastRecharge ? 1.25 : 1.0);
            if (this.weaponEnergy > 100.0) {
                this.weaponEnergy = 100.0;
            }
            if (this.hasAutoHealer()) {
                let heal = 0.0;
                for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                    const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                    if (player !== this && player.aliveState !== DSecPlayer.DESTROYED) {
                        const v = Math.sqrt(Math.pow(this.x - player.getX(), 2.0) +
                            Math.pow(this.y - player.getY(), 2.0));
                        if (v !== 0.0) {
                            heal = (heal + 1.0 / v);
                        }
                    }
                }
                this.shields += heal * 4.0;
                if (this.shields > 100.0) {
                    this.shields = 100.0;
                }
            }
        }

        playerNumber() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                if (this === dsector.DSReference.dsecGame.getPlayer(i + 1)) {
                    return i + 1;
                }
            }
            return -1;
        }

        suspendShoppingCardIfOwned() {
            if (this.__hasShoppingCard && !this.__shoppingCardOwnedButSuspended) {
                this.__shoppingCardOwnedButSuspended = true;
                dsector.DSReference.alertManager.messageQueued(this.name +
                    " should stay within the D-Sector. Shopping card suspended.");
            }
        }

        shoppingDiscount() {
            return this.__hasShoppingCard && !this.__shoppingCardOwnedButSuspended ? 0.75 : 1.0;
        }

        hasShoppingCard() {
            return this.__hasShoppingCard;
        }

        shoppingCardOwnedButSuspended() {
            return this.__shoppingCardOwnedButSuspended;
        }

        hasLargerDeath() {
            return this.__hasLargerDeath;
        }

        hasFastRecharge() {
            return this.__hasFastRecharge;
        }

        hasAutoHealer() {
            return this.__hasAutoHealer;
        }

        turnShieldOn(weaponSpec) {
            if (!this.__shieldActive) {
                if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound(
                        "assets/sounds/shieldSwitchOn.wav", (Math.random() * 5.0));
                }
                if (dsector.DSecSetupWindow.soundMode === dsector.DSecSetupWindow.NORMAL_SOUND &&
                    this.shieldSound != null) {
                    //this.shieldSound.loop(3);
                }
            }
            this.shieldSpecificationTurnedOn = weaponSpec;
            this.__shieldActive = true;
            this.shieldTurnedOnAt = CWSYSTEM.Environment.currentTime();
        }

        turnShieldOffIfExpired() {
            if (this.__shieldActive &&
                CWSYSTEM.Environment.currentTime() - this.shieldTurnedOnAt > (n => n < 0 ? Math.ceil(n) :
                    Math.floor(n))(this.shieldSpecificationTurnedOn.lifeSpanInMilliseconds)) {
                if (this.shieldSound != null) {
                    this.shieldSound.pause();
                }
                this.__shieldActive = false;
                if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound(
                        "assets/sounds/shieldSwitchOff.wav", (Math.random() * 5.0));
                }
            }
        }

        shieldActive() {
            return this.__shieldActive;
        }

        distanceToPlayer(player) {
            return Math.sqrt(Math.pow(player.getX() - this.x, 2.0) +
                Math.pow(player.getY() - this.y, 2.0));
        }

        distanceToClosestPlayer() {
            const player = this.getClosestPlayer();
            return player != null ? this.distanceToPlayer(player) : -1.0;
        }

        getClosestPlayer() {
            let player = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player1 !== this && player1.aliveState !== DSecPlayer.DESTROYED) {
                    const v = Math.fround((Math.pow(this.x - player1.getX(), 2.0) +
                        Math.pow(this.y - player1.getY(), 2.0)));
                    if (v < maxValue) {
                        player = player1;
                        maxValue = v;
                    }
                }
            }
            return player;
        }

        getClosestFriendlyPlayer() {
            let player = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player1 !== this && player1.aliveState !== DSecPlayer.DESTROYED &&
                    !this.playerIsEnemy(player1)) {
                    const v = Math.fround((Math.pow(this.x - player1.getX(), 2.0) +
                        Math.pow(this.y - player1.getY(), 2.0)));
                    if (v < maxValue) {
                        player = player1;
                        maxValue = v;
                    }
                }
            }
            return player;
        }

        getClosestEnemyPlayer() {
            let player = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player1 = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.playerIsEnemy(player1) && player1 !== this && player1.aliveState !== DSecPlayer.DESTROYED) {
                    const v = Math.fround((Math.pow(this.x - player1.getX(), 2.0) +
                        Math.pow(this.y - player1.getY(), 2.0)));
                    if (v < maxValue) {
                        player = player1;
                        maxValue = v;
                    }
                }
            }
            return player;
        }

        teleport() {
            if (!this.teleportInProcess && dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                dsector.DSReference.cwSound.playSound("assets/sounds/teleport.wav", (Math.random() * 10.0));
            }
            this.teleportInProcess = true;
            this.teleportStartedAt = CWSYSTEM.Environment.currentTime();
        }

        teleportIfCountDownExpired() {
            if (this.teleportInProcess && CWSYSTEM.Environment.currentTime() - this.teleportStartedAt > 3000) {
                this.teleportInProcess = false;
                const maxTime = 600.0;
                for (let i = 0; i < 20; ++i) {
                    const x = (Math.fround(-maxTime / 2.0)) + Math.random() * maxTime;
                    const y = (Math.fround(-maxTime / 2.0)) + Math.random() * maxTime;
                    if (this.tankAllowedToMoveIntoPosition(x, y, this.angle)) {
                        this.x = x;
                        this.y = y;
                        break;
                    }
                }
            }
        }

        playerIsEnemy(player) {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.HOSTILE) {
                return player !== this;
            } else {
                return this.teamOfPlayer() !== player.teamOfPlayer();
            }
        }

        teamOfPlayer() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.playerNumber() <= (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) ?
                    dsector.DSReference.dsecGame.blueTeam : dsector.DSReference.dsecGame.redTeam;
            } else {
                return null;
            }
        }

        enemyTeamOfPlayer() {
            if (this.teamOfPlayer() == null) {
                return null;
            } else {
                return this.teamOfPlayer() === dsector.DSReference.dsecGame.blueTeam ?
                    dsector.DSReference.dsecGame.redTeam : dsector.DSReference.dsecGame.blueTeam;
            }
        }

        enemyJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.teamOfPlayer().__color === 1 ?
                    dsector.DSReference.dsecGame.dsecRound.blueJewel : dsector.DSReference.dsecGame.dsecRound.redJewel;
            } else {
                return null;
            }
        }

        ownJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.teamOfPlayer().__color === 1 ?
                    dsector.DSReference.dsecGame.dsecRound.redJewel : dsector.DSReference.dsecGame.dsecRound.blueJewel;
            } else {
                return null;
            }
        }

        distanceToEnemyJewel() {
            const enemyJewel = this.enemyJewel();
            return enemyJewel == null ? -1.0 : Math.fround(Math.sqrt(Math.pow(enemyJewel.x - this.x, 2.0) +
                Math.pow(enemyJewel.y - this.y, 2.0)));
        }

        allEnemyTanksDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.playerIsEnemy(player) && player.aliveState !== DSecPlayer.DESTROYED) {
                    return false;
                }
            }
            return true;
        }

        allFriendlyTanksDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (!this.playerIsEnemy(player) && player.aliveState !== DSecPlayer.DESTROYED) {
                    return false;
                }
            }
            return true;
        }

        isWeakestInTeamAndAtLeastOneOtherPlayerOfSameTeamAlive() {
            let state = DSecPlayer.DESTROYED;
            let player = null;
            let maxValue = 3.4028235E38;
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const thisPlayer = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (!this.playerIsEnemy(thisPlayer) && thisPlayer.aliveState !== DSecPlayer.DESTROYED) {
                    ++state;
                    if (thisPlayer.shields < maxValue) {
                        maxValue = thisPlayer.shields;
                        player = thisPlayer;
                    }
                }
            }
            return player === this && state >= 2;
        }
    }

    DSecPlayer.numberOfWeaponPorts = 6;
    DSecPlayer.DESTROYED = 0;
    DSecPlayer.ALIVE = 1;
    DSecPlayer.MOVE_FORWARDS = 0;
    DSecPlayer.MOVE_BACKWARDS = 1;
    DSecPlayer.STOP_MOVING = 2;
    DSecPlayer.TURN_CLOCKWISE = 3;
    DSecPlayer.TURN_ANTICLOCKWISE = 4;
    DSecPlayer.STOP_TURNING = 5;
    DSecPlayer.CHANGE_WEAPON = 6;
    DSecPlayer.FIRE_WEAPON = 7;
    dsector.DSecPlayer = DSecPlayer;
    DSecPlayer["__class"] = "dsector.DSecPlayer";
})(dsector || (dsector = {}));
