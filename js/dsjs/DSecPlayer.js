(function (dsector) {
    /**
     * DSecPlayer represents an object of a player in the game.
     *
     * @property {dsector.DSecBrain} brain the brain of the player.
     * @property {boolean} __hasShoppingCard whether the player has a shopping card.
     * @property {boolean} __hasLargerDeath whether the player has a larger death.
     * @property {boolean} __hasFastRecharge whether the player has fast recharge.
     * @property {boolean} __hasAutoHealer whether the player has an auto healer.
     * @property {boolean} __shoppingCardOwnedButSuspended whether the shopping card is owned but suspended.
     * @property {number} __score the score of the player.
     * @property {number} __numberOfKills the number of kills of the player.
     * @property {number} __numberOfDeaths the number of deaths of the player.
     * @property {Map<number, number>} __damageInflictedTowardsPlayer the damage inflicted towards the player.
     * @property {Map<number, number>} damageInflictedByWeaponSpecification the damage inflicted by weapon specification.
     * @property {number} credits the credits of the player.
     * @property {number} weaponEnergy the weapon energy of the player.
     * @property {number} shields the shields of the player.
     * @property {number} aliveState the alive state of the player.
     * @property {number} scoreAtStartOfRound the score at the start of the round.
     * @property {number} numberOfTimesWeaponFired the number of times the weapon is fired.
     * @property {number} totalDamageInflicted the total damage inflicted.
     * @property {dsector.RobotSpecification} robotSpecification the robot specification.
     * @property {dsector.TankSpecification} tankSpecification the tank specification.
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
    class DSecPlayer {
        /**
         * Constructor for DSecPlayer.
         *
         * @param {string} robotFileName the name of the robot file.
         * @param {string} name the name of the player.
         */
        constructor(robotFileName, name) {
            this.brain = new dsector.DSecBrain(this);
            this.__hasShoppingCard = false;
            this.__hasLargerDeath = false;
            this.__hasFastRecharge = false;
            this.__hasAutoHealer = false;
            this.__shoppingCardOwnedButSuspended = false;
            this.__score = 0;
            this.__numberOfKills = 0;
            this.__numberOfDeaths = 0;
            this.__damageInflictedTowardsPlayer = new Map();
            this.damageInflictedByWeaponSpecification = new Map();
            this.credits = 0;
            this.weaponEnergy = 0;
            this.shields = 0;
            this.aliveState = 0;
            this.scoreAtStartOfRound = 0;
            this.numberOfTimesWeaponFired = 0;
            this.totalDamageInflicted = 0;
            this.robotSpecification = null;
            this.tankSpecification = null;

            this.tankColor = ([]);
            this.x = 0;
            this.y = 0;
            this.angle = 0;
            this.lastMovementInstruction = 0;
            this.translationalMomentum = 0;
            this.angularMomentum = 0;
            this.__forwardMovement = 0;
            this.__angleMovement = 0;
            this.__selectedPort = 0;
            this.shieldTurnedOnAt = 0;
            this.teleportStartedAt = 0;
            this.teleportInProcess = false;

            this.__shieldActive = false;
            this.weapons = new Map();
            this.shieldSpecificationTurnedOn = null;
            this.instructionSuppression = null;
            this.robotSpecification = new dsector.RobotSpecification(robotFileName);
            this.name = name || null;
            this.prepareForStartOfGame();
        }

        /**
         * Returns the positive modulus of x and y.
         *
         * @param {number} x the x-coordinate.
         * @param {number} y the y-coordinate.
         * @return {number} the positive modulus of x and y.
         */
        static positiveMod(x, y) {
            return x >= 0.0 ? x % y : DSecPlayer.positiveMod(1000.0 * y + x, y);
        }

        /**
         * Returns the tank specification of the player.
         *
         * @return {dsector.TankSpecification} the tank specification of the player.
         */
        getTankSpecification() {
            return this.tankSpecification;
        }

        /**
         * Returns the number of kills of the player.
         *
         * @return {number} the number of kills of the player.
         */
        getNumberOfKills() {
            return this.__numberOfDeaths;
        }

        /**
         * Sets the number of kills of the player.
         *
         * @param {number} killCount the number of kills of the player.
         */
        setNumberOfKills(killCount) {
            this.__numberOfKills = killCount;
        }

        /**
         * Returns the number of deaths of the player.
         *
         * @return {number} the number of deaths of the player.
         */
        getNumberOfDeaths() {
            return this.__numberOfDeaths;
        }

        /**
         * Sets the number of deaths of the player.
         *
         * @param {number} deathCount the number of deaths of the player.
         */
        setNumberOfDeaths(deathCount) {
            this.__numberOfDeaths = deathCount;
        }

        /**
         * Returns the number of times the player's weapon was fired.
         *
         * @return {number} the number of times the player's weapon was fired.
         */
        getNumberOfTimesWeaponFired() {
            return this.numberOfTimesWeaponFired;
        }

        /**
         * Sets the number of times the player's weapon was fired.
         *
         * @param {number} fireCount the number of times the player's weapon was fired.
         */
        setNumberOfTimesWeaponFired(fireCount) {
            this.numberOfTimesWeaponFired = fireCount;
        }

        /**
         * Returns the damage inflicted towards the player.
         *
         * @returns {Map<number, number>} the damage inflicted towards the player.
         */
        getTotalDamageInflicted() {
            return this.totalDamageInflicted;
        }

        /**
         * Sets the total damage inflicted.
         *
         * @param {number} dmgInflicted - The total amount of damage inflicted to be set.
         */
        setTotalDamageInflicted(dmgInflicted) {
            this.totalDamageInflicted = dmgInflicted;
        }

        /**
         * Returns the player's current score.
         *
         * @returns {number} player's score.
         */
        score() {
            return this.__score;
        }

        /**
         * Sets the player's score
         *
         * @param {number} score the score to set player's score to.
         */
        setScore(score) {
            this.__score = score;
        }

        /**
         * Retrieves the tank color based on the provided mode.
         *
         * @param {number} mode - The mode for which the tank color is requested.
         * @returns {string} The tank color corresponding to the provided mode, or the default color (this.tankColor[0]) if the mode is invalid.
         */
        getTankColor(mode) {
            let colorTest = this.tankColor[0];
            try {
                colorTest = this.tankColor[mode];
            } catch (e) {
                CWSYSTEM.Debug.println("tankColor exception: " + e);
            }
            return colorTest;
        }

        /**
         * Prepare the player for the start of the game.
         */
        prepareForStartOfGame() {
            this.tankSpecification = new dsector.TankSpecification(dsector.TankSpecification.STANDARD_TANK);
            this.__score = 0.0;
            switch (dsector.DSReference.dsecSetupWindow.startingCredits) {
                case 1:
                    this.credits = 1200;
                    break;
                case 2:
                    this.credits = 100000;
                    break;
                case 0:
                default:
                    this.credits = 600;
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

        /**
         * Prepare the player for the start of a new round.
         */
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

        /**
         * Finish the player's actions for the end of the game.
         */
        finishForEndOfRound() {
            dsector.DSReference.cwSound.stopSound("angleMovement.wav");
            dsector.DSReference.cwSound.stopSound("forwardMovement.wav");
            dsector.DSReference.cwSound.stopSound("shieldActive.wav");
        }

        /**
         * Calculates the score earned by the player over the last round of the game.
         *
         * @returns {number} The calculated score.
         */
        scoreOverLastRound() {
            return Math.round(this.__score - this.scoreAtStartOfRound);
        }

        /**
         * Get the player's number of kills.
         *
         * @returns {number} Player's number of kills
         */
        numberOfKills() {
            return this.__numberOfKills;
        }

        /**
         * Get the player's number of deaths.
         *
         * @returns {number} the player's number of deaths.
         */
        numberOfDeaths() {
            return this.__numberOfDeaths;
        }

        /**
         * calculates the ratio of damage inflicted to the number of times the weapon was fired.
         *
         * @returns {number} The calculated ratio value
         */
        damageFireRatio() {
            let ratio = Math.fround(this.totalDamageInflicted / this.numberOfTimesWeaponFired);
            if (ratio > 1000) {
                ratio = 0;
            }
            return isNaN(ratio) ? 0 : ratio;
        }

        /**
         * Finds the player this player inflicted the most damage on.
         *
         * @returns {DSecPlayer} The player with the most damage inflicted to.
         */
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

        /**
         * Finds the player this player inflicted the least damage on.
         *
         * @returns {DSecPlayer} The player with the least damage inflicted to.
         */
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

        /**
         * Retrieves the amount of damage inflicted towards a specific player.
         *
         * @param {DSecPlayer} player - The player for whom the damage is to be retrieved.
         * @returns {number} The amount of damage inflicted towards the specified player. Returns `0.0` if no damage has been inflicted.
         */
        damageInflictedTowardsPlayer(player) {
            const damage = this.__damageInflictedTowardsPlayer.get(player);
            return damage != null ? damage : 0.0;
        }

        /**
         * Retrieves the specification ID of the weapon that has inflicted the most damage.
         *
         * @returns {number} The specification ID of the weapon that caused the highest amount of damage. Returns `null` if no weapons have inflicted damage.
         */
        specificationIDOfFavouriteWeapon() {
            let maxEntry = null;
            for (let entry of this.damageInflictedByWeaponSpecification.entries()) {
                if (maxEntry === null || entry[1] > maxEntry[1]) {
                    maxEntry = entry;
                }
            }
            return maxEntry ? maxEntry[0] : dsector.PreBuiltWeaponSpecifications.NONE;
        }

        /**
         * Set how mage damage was done by a weapon using its [WeaponSpecification]{@link WeaponSpecification}.
         *
         * @param {dsector.WeaponSpecification} spec The weapon spec.
         * @param {number} damage the damage to set.
         */
        setDamageInflictedByWeapon(spec, damage) {
            this.damageInflictedByWeaponSpecification.set(spec.specificationID, damage);
        }

        /**
         * Records the damage inflicted towards a specific player.
         *
         * @param {DSecPlayer} player - The player who received the damage.
         * @param {number} damage - The amount of damage inflicted on the player.
         */
        setDamageInflictedTowardsPlayer(player, damage) {
            this.__damageInflictedTowardsPlayer.set(player, damage);
        }

        /**
         * Retrieves the damage inflicted by a specific weapon.
         *
         * @param {number} specID - The ID of the weapon specification.
         * @returns {number} The amount of damage inflicted by the weapon, or 0 if the weapon ID is not found.
         */
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
            return this.damageInflictedByWeaponSpecification.get(specIDValue);
        }

        /**
         * Give the player the specified weapon.
         *
         * @param {dsector.WeaponSpecification} specification The weapon to give.
         * @param {number} specID The weapon ID.
         */
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

        /**
         * Remove a player's weapon.
         *
         * @param {number} portNumber The port number to remove the weapon from.
         */
        removeWeaponFromPort(portNumber) {
            let port = this.weapons.get(portNumber);
            if (port != null) {
                this.weapons.delete(portNumber);
            }
        }

        /**
         * Get the weapon from a port.
         *
         * @param {number} portNumber The port number to retrieve the weapon from.
         * @returns {dsector.WeaponSpecification} The weapon specification, or null if the port is empty.
         */
        getWeaponFromPortNumber(portNumber) {
            let port = this.weapons.get(portNumber);
            return port == null ? null : port.weaponSpecification;
        }

        /**
         * Get the port number for a weapon specification ID.
         *
         * @param {number} weaponSpecID WeaponSpecificationID to retrieve port number from.
         * @returns {number} The port number, or -1 if not found.
         */
        getPortNumberFromWeaponSpecificationID(weaponSpecID) {
            for (let i = 1; i <= DSecPlayer.numberOfWeaponPorts; ++i) {
                let port = this.weapons.get(i);
                if (port != null && port.weaponSpecification.specificationID === weaponSpecID) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * Get the fire units from a port.
         *
         * @param {number} portNumber The port number to retrieve the fire units from.
         * @returns {number} The fire units, or -1 if the port is empty.
         */
        getFireUnitsFromPortNumber(portNumber) {
            let port = this.weapons.get(portNumber);
            return port == null ? -1 : port.fireUnits;
        }

        /**
         * Set the units for a weapon port.
         *
         * @param {number} weaponId Weapon specification ID.
         * @param {number} units The number of units.
         */
        setFireUnitsFromPortNumber(weaponId, units) {
            let port = this.weapons.get(weaponId);
            if (port != null) {
                port.fireUnits = units;
            }
        }

        /**
         * Get the current equipped weapon.
         *
         * @returns {dsector.WeaponSpecification} weapon in the current equipped port.
         */
        selectedWeapon() {
            return this.getWeaponFromPortNumber(this.__selectedPort);
        }

        /**
         * check if a weapon is in the port.
         *
         * @returns {boolean} true if the port is occupied.
         */
        hasWeaponInPort(portNumber) {
            let weaponPort = this.weapons.get(portNumber);
            return weaponPort != null && weaponPort.fireUnits !== 0;
        }

        /**
         * Get the selected port.
         *
         * @readonly
         * @returns {number} the selected port
         */
        selectedPort() {
            return this.__selectedPort;
        }

        /**
         * Change weapon to next port.
         */
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

        /**
         * Change to selected port to specified port.
         *
         * @param {number} portId port to change to.
         */
        selectPort(portId) {
            for (let i = 0; i < DSecPlayer.numberOfWeaponPorts; ++i) {
                if (this.selectedPort() === portId) {
                    return;
                }
                this.changeWeapon();
            }
        }

        /**
         * Check if enough fuel energy to use weapon.
         */
        enoughWeaponEnergyToFireSelectedWeapon() {
            const selectedWeapon = this.selectedWeapon();
            if (selectedWeapon == null) {
                return false;
            } else {
                return !(Math.fround(this.weaponEnergy - selectedWeapon.fuelUse) < 0.0);
            }
        }

        /**
         * Fire the selected weapon.
         */
        fireWeapon() {
            const sm = dsector.DSReference.dsecSetupWindow.soundMode;
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
                            sm !== dsector.DSecSetupWindow.NO_SOUND) {
                            if (this.robotSpecification.type !== dsector.RobotSpecification.ROBOT) {
                                dsector.DSReference.cwSound.playSound("missileFailed.wav",
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

        /**
         * Check if moving forward.
         */
        forwardMovement() {
            return this.__forwardMovement;
        }

        /**
         * Check is turning.
         */
        angleMovement() {
            return this.__angleMovement;
        }

        /**
         * Prevent an instruction from being carried out.
         *
         * @param {Object} key The key to suppress
         * @param {number} length The length of time to suppress the instruction in milliseconds.
         */
        preventInstructionForMilliseconds(key, length) {
            if (this.instructionSuppression == null) {
                this.instructionSuppression = new Map();
            }
            this.instructionSuppression.set(key,
                CWSYSTEM.Environment.currentTime() + (n => n < 0 ? Math.ceil(n) : Math.floor(n))(length));
        }

        /**
         * Accept an instruction.
         *
         * @param {number} state The state instruction.
         */
        acceptInstruction(state) {
            const sm = dsector.DSReference.dsecSetupWindow.soundMode;
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
                            if (this.__angleMovement === 0 && sm === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                dsector.DSReference.cwSound.playSound("angleMovement.wav");
                            }
                        }
                        break;
                    case 4: /* TURN_ANTICLOCKWISE */
                        if (this.lastMovementInstruction !== DSecPlayer.TURN_ANTICLOCKWISE) {
                            this.__angleMovement = -1;
                            this.lastMovementInstruction = DSecPlayer.TURN_ANTICLOCKWISE;
                            if (this.__angleMovement === 0 && sm === dsector.DSecSetupWindow.NORMAL_SOUND) {
                                dsector.DSReference.cwSound.playSound("angleMovement.wav")
                            }
                        }
                        break;
                    case 5: /* STOP_TURNING */
                        if (sm === dsector.DSecSetupWindow.NORMAL_SOUND) {
                            dsector.DSReference.cwSound.stopSound("angleMovement.wav")
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

        /**
         * Retrieves the current X coordinate.
         *
         * @returns {number} The X coordinate.
         */
        getX() {
            return this.x;
        }

        /**
         * Sets the X coordinate.
         *
         * @param {number} x - The new X coordinate.
         */
        setX(x) {
            this.x = x;
        }

        /**
         * Retrieves the current Y coordinate.
         *
         * @returns {number} The Y coordinate.
         */
        getY() {
            return this.y;
        }

        /**
         * Sets the Y coordinate.
         *
         * @param {number} y - The new Y coordinate.
         */
        setY(y) {
            this.y = y;
        }

        /**
         * Retrieves the current angle in radians, normalised to the range [0, 2π).
         *
         * @returns {number} The angle in radians.
         */
        getAngle() {
            return Math.fround(DSecPlayer.positiveMod(this.angle, 6.283185307179586));
        }

        /**
         * Sets the angle.
         *
         * @param {number} degrees - The new angle in radians.
         */
        setAngle(degrees) {
            this.angle = degrees;
        }

        /**
         * Process moving and rotating the player's tank.
         */
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

        /**
         * Check if the tank can move in to the position.
         *
         * @param {number} x - The X coordinate.
         * @param {number} y - The Y coordinate.
         * @param {number} angle - The angle in radians.
         * @returns {boolean} True if the tank can move into the position, false otherwise.
         */
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
            for (let model of round.backgroundObjects) {
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

        /**
         * Construct the model.
         */
        constructPositionedModel() {
            return new dsector.PositionedModel(null, this.tankSpecification.model3DMatrix,
                this.orientationAsMatrix(), Math.fround(this.x), Math.fround(this.y), 0.0);
        }

        /**
         * construct the Red dot model.
         */
        constructPositionedModelOfRedDot() {
            return new dsector.PositionedModel(null, this.tankSpecification.model3DMatrixForRedDot,
                this.orientationAsMatrix(), Math.fround(this.x), Math.fround(this.y), 0.0);
        }

        /**
         * Process the current orientation in to a [Matrix4f]{@link dsector.Matrix4f} object.
         *
         * @returns {dsector.Matrix4f} The matrix with the orientation
         */
        orientationAsMatrix() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ(-this.angle);
            return matrix4f;
        }

        /**
         * Processes the damage inflicted by a missile on the player.
         *
         * This method handles shield absorption and damage reduction based on the missile's characteristics
         * and the player's armour. It updates the player's shield and weapon energy, manages score and credits
         * for the player who inflicted the damage, and triggers appropriate sound and visual effects.
         * If the shields are depleted, it handles the player's destruction and spawns debris.
         *
         * @param {DSecMissile} missile - The missile causing the damage.
         * Contains information about the missile's owner, damage amount, and weapon specification.
         */
        takeDamage(missile) {
            const sm = dsector.DSReference.dsecSetupWindow.soundMode;
            if (this.__shieldActive) {
                if (sm !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound("shieldDeflection.wav");
                }
            } else {
                const mo = missile.owner;
                let reduction = Math.fround(missile.getDamage() / this.tankSpecification.armour());
                if (mo != null) {
                    reduction *= mo.tankSpecification.weaponFuelQuality();
                }
                reduction *= Math.fround(mo.robotSpecification.weaponFuelRatio / 100.0);
                if (reduction > this.shields) {
                    reduction = this.shields;
                }
                this.shields -= reduction;
                if (mo != null && this.playerIsEnemy(mo)) {
                    mo.__score += reduction;
                    mo.totalDamageInflicted += reduction;
                    mo.credits += Math.ceil(reduction * 7.0);
                    let dmgInflicted = 0.0;
                    if (mo.__damageInflictedTowardsPlayer.get(this) != null) {
                        dmgInflicted = mo.__damageInflictedTowardsPlayer.get(this);
                    }
                    mo.__damageInflictedTowardsPlayer.set(this, dmgInflicted + reduction);
                    let weaponDmg = mo.damageInflictedByWeaponSpecification.get(
                        missile.weaponSpecification.specificationID);
                    let inflicted = 0.0;
                    if (weaponDmg != null) {
                        inflicted = weaponDmg;
                    }

                    mo.damageInflictedByWeaponSpecification.set(missile.weaponSpecification.specificationID,
                        inflicted + reduction);
                    this.brain.setTankLastTakenHitFrom(mo);
                }
                if (this.shields <= 0.0) {
                    if (sm !== dsector.DSecSetupWindow.NO_SOUND) {
                        if (this.__hasLargerDeath) {
                            dsector.DSReference.cwSound.playSound(
                                "mediumExplosion.wav", (Math.random() * 10.0));
                            dsector.DSReference.cwSound.playSound(
                                "mediumExplosion.wav", (Math.random() * 10.0));
                        } else {
                            dsector.DSReference.cwSound.playSound(
                                "mediumExplosion.wav", (Math.random() * 10.0));
                        }
                    }
                    this.shields = 0.0;
                    this.weaponEnergy = 0.0;
                    this.finishForEndOfRound();
                    this.aliveState = DSecPlayer.DESTROYED;
                    ++mo.__numberOfKills;
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

        /**
         * Restores weapon and shield energy for the player over a single game frame.
         *
         * This method updates the player's weapon energy based on the game's speed and the player's recharge rate.
         * It also heals the player's shields if the player has an auto-healer equipped. The healing amount is based
         * on the proximity of other players, with closer players contributing more to the shield restoration.
         * The shield and weapon energy values are capped at their maximum limits.
         *
         * @public
         */
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

        /**
         * Retrieves the player's number within the game.
         *
         * This method iterates through all players in the game and returns the player's number if the
         * player instance matches the current object. The player number is 1-based, meaning it starts from 1.
         * If the player is not found, the method returns -1.
         *
         * @public
         * @returns {number} The number of the player if found; otherwise, -1.
         */
        playerNumber() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                if (this === dsector.DSReference.dsecGame.getPlayer(i + 1)) {
                    return i + 1;
                }
            }
            return -1;
        }

        /**
         * Suspend the shopping card is the player left the bounds of the arena.
         */
        suspendShoppingCardIfOwned() {
            if (this.__hasShoppingCard && !this.__shoppingCardOwnedButSuspended) {
                this.__shoppingCardOwnedButSuspended = true;
                dsector.DSReference.alertManager.messageQueued(this.name +
                    " should stay within the D-Sector. Shopping card suspended.");
            }
        }

        /**
         * Returns the shopping discount based on the player's shopping card status.
         * If the player has a shopping card and it is not suspended, a discount of 0.75 is returned.
         * Otherwise, the discount is 1.0 (no discount).
         *
         * @public
         * @returns {number} The discount rate (0.75 if eligible, 1.0 otherwise).
         */
        shoppingDiscount() {
            return this.__hasShoppingCard && !this.__shoppingCardOwnedButSuspended ? 0.75 : 1.0;
        }

        /**
         * Checks if the player has a shopping card.
         *
         * @public
         * @returns {boolean} True if the player has a shopping card; otherwise, false.
         */
        hasShoppingCard() {
            return this.__hasShoppingCard;
        }

        /**
         * Checks if the player's shopping card is owned but suspended.
         *
         * @public
         * @returns {boolean} True if the shopping card is owned but suspended; otherwise, false.
         */
        shoppingCardOwnedButSuspended() {
            return this.__shoppingCardOwnedButSuspended;
        }

        /**
         * Checks if the player has a larger death effect.
         *
         * @public
         * @returns {boolean} True if the player has a larger death effect; otherwise, false.
         */
        hasLargerDeath() {
            return this.__hasLargerDeath;
        }

        /**
         * Checks if the player has a fast recharge ability.
         *
         * @public
         * @returns {boolean} True if the player has fast recharge; otherwise, false.
         */
        hasFastRecharge() {
            return this.__hasFastRecharge;
        }

        /**
         * Checks if the player has an auto-healer ability.
         *
         * @public
         * @returns {boolean} True if the player has an auto-healer; otherwise, false.
         */
        hasAutoHealer() {
            return this.__hasAutoHealer;
        }

        /**
         * Turns on the shield for the specified weapon specification.
         *
         * @param {dsector.WeaponSpecification} weaponSpec - The weapon specification for which the shield should be turned on.
         * @public
         */
        turnShieldOn(weaponSpec) {
            if (!this.__shieldActive) {
                const c = dsector.DSReference.dsecSetupWindow.soundMode;
                if (c !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound("shieldSwitchOn.wav");
                }
                if (c === dsector.DSecSetupWindow.NORMAL_SOUND) {
                    dsector.DSReference.cwSound.loopSound("shieldActive.wav", 3);
                }
            }
            this.shieldSpecificationTurnedOn = weaponSpec;
            this.__shieldActive = true;
            this.shieldTurnedOnAt = CWSYSTEM.Environment.currentTime();
        }

        /**
         * Turns off the shield if it has expired.
         *
         * @public
         */
        turnShieldOffIfExpired() {
            if (this.__shieldActive &&
                CWSYSTEM.Environment.currentTime() - this.shieldTurnedOnAt > (n => n < 0 ? Math.ceil(n) :
                    Math.floor(n))(this.shieldSpecificationTurnedOn.lifeSpanInMilliseconds)) {
                dsector.DSReference.cwSound.playSound("shieldActive.wav");
                this.__shieldActive = false;
                if (dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.playSound("shieldSwitchOff.wav");
                }
            }
        }

        /**
         * Checks if the player's shield is active.
         *
         * @public
         * @returns {boolean} True if the player's shield is active; otherwise, false.
         */
        shieldActive() {
            return this.__shieldActive;
        }

        /**
         * Calculates the distance between the player and another player.
         *
         * @param {DSecPlayer} player - The other player.
         * @public
         * @returns {number} The distance between the two players.
         */
        distanceToPlayer(player) {
            return Math.sqrt(Math.pow(player.getX() - this.x, 2.0) +
                Math.pow(player.getY() - this.y, 2.0));
        }

        /**
         * Calculates the distance to the closest player.
         *
         * @public
         * @returns {number} The distance to the closest player, or -1.0 if no players are found.
         */
        distanceToClosestPlayer() {
            const player = this.getClosestPlayer();
            return player != null ? this.distanceToPlayer(player) : -1.0;
        }

        /**
         * Calculates the distance to the closest player.
         *
         * @public
         * @returns {number} The distance to the closest friendly player, or -1.0 if no friendly players are found.
         */
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

        /**
         * Calculates the distance to the closest friendly player.
         *
         * @public
         * @returns {number} The distance to the closest friendly player, or -1.0 if no friendly players are found.
         */
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

        /**
         * Calculates the distance to the closest enemy player.
         *
         * @public
         * @returns {number} The distance to the closest enemy player, or -1.0 if no enemy players are found.
         */
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

        /**
         * Teleports the player to a random position within the specified range.
         *
         * @public
         */
        teleport() {
            if (!this.teleportInProcess && dsector.DSecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                dsector.DSReference.cwSound.playSound("teleport.wav", (Math.random() * 10.0));
            }
            this.teleportInProcess = true;
            this.teleportStartedAt = CWSYSTEM.Environment.currentTime();
        }

        /**
         * Teleports the player to a random position within the specified range if the teleportation has expired.
         *
         * @public
         */
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

        /**
         * Checks if the player is an enemy of another player.
         *
         * @param {DSecPlayer} player - The other player.
         * @public
         * @returns {boolean} True if the player is an enemy;
         */
        playerIsEnemy(player) {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.HOSTILE) {
                return player !== this;
            } else {
                return this.teamOfPlayer() !== player.teamOfPlayer();
            }
        }

        /**
         * Returns the team of the player.
         *
         * @public
         * @returns {dsector.Team} The team of the player;
         */
        teamOfPlayer() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.playerNumber() <= (dsector.DSReference.dsecGame.numberOfPlayers() / 2 | 0) ?
                    dsector.DSReference.dsecGame.blueTeam : dsector.DSReference.dsecGame.redTeam;
            } else {
                return null;
            }
        }

        /**
         * Returns the enemy team of the player.
         *
         * @public
         * @returns {dsector.DSecTeam} The enemy team of the player;
         */
        enemyTeamOfPlayer() {
            if (this.teamOfPlayer() == null) {
                return null;
            } else {
                return this.teamOfPlayer() === dsector.DSReference.dsecGame.blueTeam ?
                    dsector.DSReference.dsecGame.redTeam : dsector.DSReference.dsecGame.blueTeam;
            }
        }

        /**
         * Returns the jewel of the player.
         *
         * @public
         * @returns {dsector.DSecJewel} The jewel of the player;
         */
        enemyJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.teamOfPlayer().__color === 1 ?
                    dsector.DSReference.dsecGame.dsecRound.blueJewel : dsector.DSReference.dsecGame.dsecRound.redJewel;
            } else {
                return null;
            }
        }

        /**
         * Returns the own jewel of the player.
         *
         * @public
         * @returns {dsector.DSecJewel} The own jewel of the player;
         */
        ownJewel() {
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                return this.teamOfPlayer().__color === 1 ?
                    dsector.DSReference.dsecGame.dsecRound.redJewel : dsector.DSReference.dsecGame.dsecRound.blueJewel;
            } else {
                return null;
            }
        }

        /**
         * Returns the distance to the enemy jewel.
         *
         * @public
         * @returns {number} The distance to the enemy jewel;
         */
        distanceToEnemyJewel() {
            const enemyJewel = this.enemyJewel();
            return enemyJewel == null ? -1.0 : Math.fround(Math.sqrt(Math.pow(enemyJewel.x - this.x, 2.0) +
                Math.pow(enemyJewel.y - this.y, 2.0)));
        }

        /**
         * Checks if all enemy tanks are destroyed.
         *
         * @public
         * @returns {boolean} True if all enemy tanks are destroyed;
         */
        allEnemyTanksDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (this.playerIsEnemy(player) && player.aliveState !== DSecPlayer.DESTROYED) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Checks if all friendly tanks are destroyed.
         *
         * @public
         * @returns {boolean} True if all friendly tanks are destroyed;
         */
        allFriendlyTanksDestroyed() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (!this.playerIsEnemy(player) && player.aliveState !== DSecPlayer.DESTROYED) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Checks if the player is the weakest in his team and at least one other player of the same team is alive.
         *
         * @public
         * @returns {boolean} True if the player is the weakest in his team and at least one other player of the same team is alive;
         */
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

    /**
     * The number of weapon ports on the tank.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.numberOfWeaponPorts = 6;
    /**
     * The player is in the destroyed state.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.DESTROYED = 0;
    /**
     * The player is alive.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.ALIVE = 1;
    /**
     * The player is in the process of moving forwards.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.MOVE_FORWARDS = 0;
    /**
     * The player is in the process of moving backwards.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.MOVE_BACKWARDS = 1;
    /**
     * The player is not moving.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.STOP_MOVING = 2;
    /**
     * The player is turning clockwise.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.TURN_CLOCKWISE = 3;
    /**
     * The player is turning anticlockwise.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.TURN_ANTICLOCKWISE = 4;
    /**
     * The player has stopped turning.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.STOP_TURNING = 5;
    /**
     * The player is changing weapon.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.CHANGE_WEAPON = 6;
    /**
     * The player is firing weapon.
     *
     * @constant
     * @type {number}
     */
    DSecPlayer.FIRE_WEAPON = 7;
    dsector.DSecPlayer = DSecPlayer;
    DSecPlayer["__class"] = "dsector.DSecPlayer";
})(dsector);