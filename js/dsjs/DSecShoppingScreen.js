(function (dsector) {
    /**
     * Class for the shopping screen.
     *
     * @property {CWSYSTEM.CWWindow} window
     * @property {dsector.DSecPlayer} currentShopper
     * @property {dsector.MP3} controlRoomSound
     * @property {boolean} controlRoomSoundPlaying
     * @property {number} savedX
     * @property {number} savedY
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
    class DSecShoppingScreen {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.currentShopper = null;
            if (this.controlRoomSound === undefined) {
                this.controlRoomSound = new dsector.MP3("assets/sounds/controlRoom.mp3");
            }
            this.controlRoomSoundPlaying = false;
            this.savedX = -1;
            this.savedY = -1;
        }

        /**
         * Build a list of port descriptions.
         *
         * @private
         */
        static __portDescription() {
            if (DSecShoppingScreen.portDescription == null) {
                DSecShoppingScreen.portDescription = ["Missile fire", "Laser Fire", "Alternative Fire",
                    "Advanced Weaponry", "Aggressive Defense", "Defense"];
            }
            return DSecShoppingScreen.portDescription;
        }

        /**
         * Start the shopping sequence.
         */
        startShoppingSequence() {
            this.calculateSpecials();
            this.shopForRobots();
            this.currentShopper = this.getFirstHumanPlayer();
            if (this.currentShopper != null) {
                this.create();
                dsector.DSMain.setActivity("Shopping", "..", "store",
                    this.currentShopper.playerNumber(), dsector.DSReference.dsecGame.numberOfPlayers(),
                    dsector.DSReference.dsecMainSetupWindow.playMode());
            } else {
                this.destroy();
                dsector.DSReference.dsecGame.startNextRound();
            }
        }

        /**
         * Get the first human player.
         *
         * @returns {dsector.DSecPlayer} The first human player, or null if none found.
         */
        getFirstHumanPlayer() {
            return this.getNextPlayerAfterIndex(-1);
        }

        /**
         * Get the next player after the given index.
         *
         * @private
         * @param {number} index - The index to start searching from.
         * @returns {dsector.DSecPlayer|null} The next human player, or null if none found.
         */
        getNextPlayerAfterIndex(index) {
            for (let i = index + 1; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (player.robotSpecification.isHuman()) {
                    return player;
                }
            }
            return null;
        }

        /**
         * Get the next player after the current shopper.
         *
         * @returns {dsector.DSecPlayer|null} The next human player, or null if none found.
         */
        getNextPlayer() {
            if (this.currentShopper != null) {
                for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                    const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                    if (player === this.currentShopper) {
                        return this.getNextPlayerAfterIndex(i);
                    }
                }
            }
            return null;
        }

        /**
         * Shop for robots.
         */
        shopForRobots() {
            for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
                if (!player.robotSpecification.isHuman()) {
                    player.brain.goShopping();
                }
            }
        }

        /**
         * Check if the shopping screen is created.
         *
         * @public
         * @returns {boolean} True if the shopping screen is created, false otherwise.
         */
        isCreated() {
            return this.window != null;
        }

        /**
         * Toggle the shopping screen.
         */
        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        /**
         * Create the shopping screen.
         */
        create() {
            dsector.DSReference.virtualScreen.setBackgroundImage("assets/images/shopping.jpg");
            dsector.DSReference.dsecMainSetupWindow.destroy();
            dsector.DSReference.dsecPlayWindow.destroy();
            dsector.DSReference.playersStatusWindow.destroy();
            this.drawWindow();
            if (!this.controlRoomSoundPlaying) {
                this.controlRoomSound.loop();
                this.controlRoomSoundPlaying = true;
            }
        }

        /**
         * Destroy the shopping screen.
         */
        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.window.destroy();
                this.window = null;
            }
            this.controlRoomSound.setPlayingStatus(false);
            this.controlRoomSoundPlaying = false;
        }

        /**
         * Update the shopping screen.
         */
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }

        /**
         * Restore the position of the shopping screen window.
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
         * Draw the shopping screen window.
         *
         * @private
         */
        drawWindow() {
            if (this.currentShopper != null) {
                let x = 25;
                let y = 25;
                if (this.window != null) {
                    x = this.window.xPosition;
                    y = this.window.yPosition;
                    dsector.DSReference.gui.destroyWindow("SHOP");
                }
                const font = dsector.DSReference.virtualScreen.serif8_font;
                const margin = 10;
                const defWidth = 120;
                const padding = 5;
                const w = margin * 2 + defWidth * padding - 5;
                this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("SHOP", 3,
                    null, x, y, w, 470, true);
                const bgColor = this.currentShopper.getTankColor(3);
                this.window.changeBackgroundColor$CWColor(bgColor);
                let currentName = this.currentShopper.name;
                if (currentName.length > 12) {
                    currentName = currentName.substring(0, 12);
                }
                this.window.addTextBlock("", currentName, 5 + margin, 35, font, CWSYSTEM.CWColor.__white(), 999);
                this.window.addTextBlock("", "Money " + this.currentShopper.credits, margin + 88, 35, font, CWSYSTEM.CWColor.__white(), 999);
                let refRound = 1;
                if (dsector.DSReference.dsecGame.currentRound() > 0) {
                    refRound = dsector.DSReference.dsecGame.currentRound() + 1;
                }
                this.window.addTextBlock("", "Round " + refRound + " of " + dsector.DSReference.dsecMainSetupWindow.numberOfRounds(), margin + 160, 35, font, CWSYSTEM.CWColor.__white(), 999);
                let button = this.window.addButton("", w - 285, 11, 70, 15,
                    "Load Game", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "loadGame";
                button = this.window.addButton("", w - 185, 11, 70, 15, "Save Game",
                    CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "saveGame";
                button = this.window.addButton("", w - 85, 11, 76, 15, "Abort Game",
                    CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "abortGame";
                let baseline = 40;
                const arrList = dsector.DSReference.preBuiltWeaponSpecifications.preBuiltSpecifications;
                for (let j = 1; j <= 7; ++j) {
                    let checked = false;
                    let h;
                    let wSpec;
                    for (h = 0; h < arrList.length; ++h) {
                        wSpec = arrList[h];
                        if (wSpec.portNumber === j &&
                            wSpec.actualPrice(this.currentShopper) <= this.currentShopper.credits &&
                            this.itemAvailable(wSpec) &&
                            (wSpec.specificationID !== dsector.PreBuiltWeaponSpecifications.SHOPPING_CARD ||
                                !this.currentShopper.hasShoppingCard())) {
                            checked = true;
                            break;
                        }
                    }
                    if (checked) {
                        if (j < 7) {
                            let wName1 = "Empty";
                            wSpec = this.currentShopper.getWeaponFromPortNumber(j);
                            if (wSpec != null) {
                                wName1 = wSpec.fullName + ", " + this.currentShopper.getFireUnitsFromPortNumber(j) + " units";
                            }
                            this.window.addTextBlock("", "Port " + j + ", " +
                                DSecShoppingScreen.__portDescription()[j - 1] + " : " + wName1,
                                5 + margin, 25 + baseline, font, CWSYSTEM.CWColor.__white(), 999);
                        } else {
                            this.window.addTextBlock("", "Items", 5 + margin, 25 + baseline, font,
                                CWSYSTEM.CWColor.__white(), 999);
                        }
                        baseline += 16;
                        h = 0;
                        for (let i = 0; i < arrList.length; ++i) {
                            const weaponSpec = arrList[i];
                            if (weaponSpec.portNumber === j &&
                                weaponSpec.actualPrice(this.currentShopper) <= this.currentShopper.credits &&
                                this.itemAvailable(weaponSpec) &&
                                (weaponSpec.specificationID !== dsector.PreBuiltWeaponSpecifications.SHOPPING_CARD ||
                                    !this.currentShopper.hasShoppingCard())) {
                                button = this.window.addButton("", margin + h * defWidth,
                                    baseline, defWidth - 18, 15, weaponSpec.fullName,
                                    CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                                if (weaponSpec.type === dsector.WeaponSpecification.TANK) {
                                    if (this.currentShopper.tankSpecification.matchesShoppingItem(weaponSpec)) {
                                        button.bgColor = new CWSYSTEM.CWColor(210, 210, 255, 255);
                                        button.secondaryBackgroundColor =
                                            new CWSYSTEM.CWColor(160, 160, 190, 255);
                                    } else {
                                        button.bgColor = new CWSYSTEM.CWColor(180, 180, 235, 255);
                                        button.secondaryBackgroundColor =
                                            new CWSYSTEM.CWColor(135, 135, 165, 255);
                                    }
                                }
                                button.generalPurposeObject = weaponSpec;
                                button.objectContainingButtonPressedMethod = this;
                                button.buttonPressedMethodName = "itemPurchaseButtonPressed";
                                button = this.window.addButton("",
                                    margin + (h + 1) * defWidth - 17, baseline, 12, 15, "i",
                                    CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                                button.generalPurposeObject = weaponSpec;
                                button.objectContainingButtonPressedMethod = this;
                                button.buttonPressedMethodName = "itemInfoButtonPressed";
                                ++h;
                                if (h > padding - 1) {
                                    h = 0;
                                    baseline += 16;
                                }
                            }
                        }
                        if (h > 0) {
                            baseline += 16;
                        }
                        baseline += 8;
                    }
                }
                this.window.addButton("SHOPPING_DONE_BUTTON", ((w - 30) / 2 | 0), baseline, 42, 15,
                    "Done", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON,
                    CWSYSTEM.CWButton.CLICKED || CWSYSTEM.CWButton.PRESSED);
                this.window.h = baseline + 22;
                this.window.centerWithinDesktop();
            }
        }

        /**
         * Handle the item purchase button press event.
         *
         * @param {CWSYSTEM.CWButton} button the button pressed
         */
        itemPurchaseButtonPressed(button) {
            button = button[0];
            const specification = button.generalPurposeObject;
            this.currentShopper.grantWeapon(specification);
            const player = this.currentShopper;
            player.credits -= specification.actualPrice(this.currentShopper);
            this.create();
        }

        /**
         * Handle the item info button press event.
         *
         * @param {CWSYSTEM.CWButton} button the button pressed
         */
        itemInfoButtonPressed(button) {
            button = button[0];
            dsector.DSReference.dsecItemDescriptionWindow.weaponSpecification = button.generalPurposeObject;
            dsector.DSReference.dsecItemDescriptionWindow.create();
        }

        /**
         * Handle the done button press event.
         *
         * @param {CWSYSTEM.CWButton} button the button pressed
         */
        doneButtonPressed(button) {
            this.currentShopper = this.getNextPlayer();
            if (this.currentShopper != null) {
                this.update();
                if (dsector.DSReference.dsecSetupWindow.soundMode !== dsector.DSecSetupWindow.NO_SOUND) {
                    dsector.DSReference.cwSound.play("compressionDoor.wav");
                }
            } else {
                this.destroy();
                dsector.DSReference.dsecGame.startNextRound();
            }
        }

        /**
         * Check if the item is available for purchase.
         *
         * @private
         * @param {dsector.PreBuiltWeaponSpecification} specification the specification to check
         * @return {boolean} true if the item is available, false otherwise
         */
        itemAvailable(specification) {
            switch (specification.specificationID) {
                case dsector.PreBuiltWeaponSpecifications.LARGER_DEATH:
                    if (this.currentShopper.hasLargerDeath()) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.SCORE_BRIBE:
                default:
                    break;
                case dsector.PreBuiltWeaponSpecifications.FAST_RECHARGE:
                    if (this.currentShopper.hasFastRecharge()) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.AUTO_HEALER:
                    if (this.currentShopper.hasAutoHealer()) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE:
                    if (this.currentShopper.tankSpecification.weaponFuelUpgradeLevel() !== 0) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE:
                    if (this.currentShopper.tankSpecification.armourUpgradeLevel() !== 0) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE:
                    if (this.currentShopper.tankSpecification.turnRateUpgradeLevel() !== 0) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE:
                    if (this.currentShopper.tankSpecification.velocityUpgradeLevel() !== 0) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE_2:
                    if (this.currentShopper.tankSpecification.weaponFuelUpgradeLevel() !== 1) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE_2:
                    if (this.currentShopper.tankSpecification.armourUpgradeLevel() !== 1) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE_2:
                    if (this.currentShopper.tankSpecification.turnRateUpgradeLevel() !== 1) {
                        return false;
                    }
                    break;
                case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE_2:
                    if (this.currentShopper.tankSpecification.velocityUpgradeLevel() !== 1) {
                        return false;
                    }
            }
            return true;
        }

        /**
         * Abort the game.
         *
         * @param {CWSYSTEM.CWButton} button the button that was pressed
         */
        abortGame(button) {
            this.destroy();
            dsector.DSReference.dsecMainSetupWindow.create();
        }

        /**
         * Load the game.
         *
         * @param {CWSYSTEM.CWButton} button the button that was pressed
         */
        loadGame(button) {
            dsector.DSReference.dsecLoadGameWindow.create();
        }

        /**
         * Save the game.
         *
         * @param {CWSYSTEM.CWButton} button the button that was pressed
         */
        saveGame(button) {
            dsector.DSReference.dsecSaveGameWindow.create();
        }

        /**
         * Calculate specials for this round of shopping.
         *
         * @return {dsector.DSecPlayer} the next player to shop
         * @private
         */
        calculateSpecials() {
            DSecShoppingScreen.itemsOnSpecial = ([]);
            if (Math.random() < 0.35) {
                const arrayList = dsector.DSReference.preBuiltWeaponSpecifications.preBuiltSpecifications;
                for (let i = 0; i < arrayList.length; ++i) {
                    const weaponSpec = arrayList[i];
                    switch (weaponSpec.specificationID) {
                        default:
                            if (weaponSpec.portNumber >= 1 && weaponSpec.portNumber <= 7 && weaponSpec.price > 1200 && Math.random() < 0.05) {
                                const rndNumber = Math.random();
                                if (rndNumber < 0.04) {
                                    CWSYSTEM.CWSReference.alertManager.messageQueued("Shopping special! 75% off " + weaponSpec.fullName + ", " + ((weaponSpec.price * 0.25) | 0) + " before shopping card discount");
                                    DSecShoppingScreen.itemsOnSpecial.push(new dsector.ObjectPair(weaponSpec, 75));
                                } else if (rndNumber < 0.25) {
                                    CWSYSTEM.CWSReference.alertManager.messageQueued("Shopping special! " + weaponSpec.fullName + " half price at " + ((weaponSpec.price * 0.5) | 0) + " before shopping card discount");
                                    DSecShoppingScreen.itemsOnSpecial.push(new dsector.ObjectPair(weaponSpec, 50));
                                } else if (rndNumber < 0.3) {
                                    CWSYSTEM.CWSReference.alertManager.messageQueued("Supply of " + weaponSpec.fullName + " extremely low. Offered only at quadruple price of " + weaponSpec.price * 2 + " before shopping card discount");
                                    DSecShoppingScreen.itemsOnSpecial.push(new dsector.ObjectPair(weaponSpec, -300));
                                } else if (rndNumber < 0.45) {
                                    CWSYSTEM.CWSReference.alertManager.messageQueued("Supply of " + weaponSpec.fullName + " low. Offered only at double price of " + weaponSpec.price * 2 + " before shopping card discount");
                                    DSecShoppingScreen.itemsOnSpecial.push(new dsector.ObjectPair(weaponSpec, -100));
                                } else {
                                    CWSYSTEM.CWSReference.alertManager.messageQueued("Shopping special! 25% off " + weaponSpec.fullName + ", " + ((weaponSpec.price * 0.75) | 0) + " before shopping card discount");
                                    DSecShoppingScreen.itemsOnSpecial.push(new dsector.ObjectPair(weaponSpec, 25));
                                }
                            }
                            break;
                        // not branch
                        case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE:
                        case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE:
                        case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE:
                        case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE:
                        case dsector.PreBuiltWeaponSpecifications.FUEL_UPGRADE_2:
                        case dsector.PreBuiltWeaponSpecifications.METAL_UPGRADE_2:
                        case dsector.PreBuiltWeaponSpecifications.TURN_UPGRADE_2:
                        case dsector.PreBuiltWeaponSpecifications.SPEED_UPGRADE_2:
                            break;
                    }
                }
            }
        }
    }

    /**
     * Array containing the items on special, if any.
     * @type {Array}
     */
    DSecShoppingScreen.itemsOnSpecial = null;
    dsector.DSecShoppingScreen = DSecShoppingScreen;
    DSecShoppingScreen["__class"] = "dsector.DSecShoppingScreen";
})(dsector);