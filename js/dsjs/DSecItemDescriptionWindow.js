(function (dsector) {
    /**
     * A class used to build the Item description window to explain items when shopping.
     *
     * @property {CWSYSTEM.CWWindow} window The GUI window with elements.
     * @property {dsector.WeaponSpecification} weaponSpecification The weapon specification to display.
     * @property {number} savedX The last X co-ordinate the window was in. Otherwise, -1 if not saved.
     * @property {number} savedY The last Y co-ordinate the window was in. Otherwise, -1 if not saved.
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
    class DSecItemDescriptionWindow {
        /**
         * Sets up the DSecItemDescriptionWindow class.
         */
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.weaponSpecification = null;
            this.savedX = -1;
            this.savedY = -1;
        }

        /**
         * Returns whether the window has been created.
         *
         * @public
         * @returns {boolean}
         */
        isCreated() {
            return this.window != null;
        }

        /**
         * Toggles the window's creation state.
         *
         * @public
         */
        toggleCreated() {
            if (this.isCreated()) {
                this.destroy();
            } else {
                this.create();
            }
        }

        /**
         * Creates the window.
         *
         * @public
         */
        create() {
            if (this.isCreated()) {
                this.drawWindow();
            } else {
                this.drawWindow();
                this.restorePosition();
            }
        }

        /**
         * Destroys the window.
         *
         * @public
         */
        destroy() {
            if (this.window != null) {
                this.savedX = this.window.xPosition;
                this.savedY = this.window.yPosition;
                this.window.destroy();
                this.window = null;
            }
        }

        /**
         * Restores the window's position.
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
         * Draws the window.
         */
        drawWindow() {
            if (this.weaponSpecification != null) {
                let x = 20;
                let y = 20;
                if (this.window != null) {
                    x = this.window.xPosition;
                    y = this.window.yPosition;
                    dsector.DSReference.gui.destroyWindow("ITEMDESCRIPTION");
                }
                const font = dsector.DSReference.virtualScreen.serif8_font;
                this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v("ITEMDESCRIPTION",
                    3, null, 30, 30, 260, 200, true);
                this.window.changeBackgroundColor$CWColor(new CWSYSTEM.CWColor(0, 0, 0, 210));
                this.window.floating = true;
                const color = CWSYSTEM.CWColor.__white();
                let fullName = this.weaponSpecification.fullName;
                if (this.weaponSpecification.type === dsector.WeaponSpecification.LASER ||
                    this.weaponSpecification.type === dsector.WeaponSpecification.PROJECTILE ||
                    this.weaponSpecification.type === dsector.WeaponSpecification.TOUCH) {
                    fullName = fullName + " [" + this.weaponSpecification.portName + "]";
                }
                let baseline = 30;
                this.window.addTextBlock("", fullName, 10, baseline, font, color, 999);
                if (dsector.DSReference.dsecShoppingScreen.currentShopper != null) {
                    this.window.addTextBlock("", this.weaponSpecification.actualPrice(
                        dsector.DSReference.dsecShoppingScreen.currentShopper) + " credits", 160, baseline, font, color, 999);
                    baseline += 28;
                }
                this.window.addTextBlock("", this.weaponSpecification.shoppingDescription, 10, baseline, font, color, 999);
                baseline += 28;
                if (this.weaponSpecification.type === dsector.WeaponSpecification.LASER ||
                    this.weaponSpecification.type === dsector.WeaponSpecification.PROJECTILE ||
                    this.weaponSpecification.type === dsector.WeaponSpecification.TOUCH) {
                    let defaultDamage = this.stage1WeaponCheck(this.weaponSpecification);
                    this.window.addTextBlock("", "Weapon fuel use", 10, baseline, font, color, 999);
                    this.window.addTextBlock("", "" + this.weaponSpecification.fuelUse, 160, baseline, font, color, 999);
                    baseline += 18;
                    this.window.addTextBlock("", "Maximum damage", 10, baseline, font, color, 999);
                    this.window.addTextBlock("", "" + defaultDamage, 160, baseline, font, color, 999);
                    baseline += 28;
                }
                if (this.weaponSpecification.type === dsector.WeaponSpecification.TANK) {
                    baseline = this.tankCheck(baseline, this.weaponSpecification.specificationID);
                }
                baseline -= 25;
                const button = this.window.addButton("", 101, baseline, 57,
                    15, "Close", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "closeWindow";
                baseline += 24;
                this.window.h = baseline;
                this.window.xPosition = x;
                this.window.yPosition = y;
            }
        }

        /**
         * Closes the window.
         *
         * @param button
         */
        closeWindow(button) {
            this.destroy();
        }

        /**
         * Checks a weapon specification against weapons with 2 stages and gives the calculated damage value.
         *
         * @private
         * @param {dsector.WeaponSpecification} wspec The weapon specification to check.
         * @returns {number} The calculated damage value.
         */
        stage1WeaponCheck(wspec) {
            if (wspec.specificationID === dsector.PreBuiltWeaponSpecifications.TRI_BREAKER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.QUINT_BREAKER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.QUINT_GUIDER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.BLASTER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.NUKE_BLASTER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.GUIDE_BLASTER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.BLAST_GUIDER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.BLAST_SWIRLER ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.NORMAL_BOMB ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.DEATH_BOMB ||
                wspec.specificationID === dsector.PreBuiltWeaponSpecifications.OCTO_BREAKER) {
                return wspec.defaultDamage * 2;
            }
            return wspec.defaultDamage;
        }

        /**
         * Checks a tank specification and displays the relevant information.
         *
         * @private
         * @param {number} baseline The baseline to start from for displaying text.
         * @param {number} specID The weapon specification ID to check.
         * @returns {number} The new baseline after displaying the information.
         */
        tankCheck(baseline, specID) {
            let b = -1;
            switch (specID) {
                case dsector.PreBuiltWeaponSpecifications.STANDARD_TANK:
                    b = 0;
                    break;
                case dsector.PreBuiltWeaponSpecifications.ROTRA_1:
                    b = 1;
                    break;
                case dsector.PreBuiltWeaponSpecifications.ROTRA_2:
                    b = 2;
                    break;
                case dsector.PreBuiltWeaponSpecifications.OPEC_1:
                    b = 3;
                    break;
                case dsector.PreBuiltWeaponSpecifications.OPEC_2:
                    b = 4;
                    break;
                case dsector.PreBuiltWeaponSpecifications.OPEC_X:
                    b = 5;
            }
            if (b !== -1) {
                const specification = new dsector.TankSpecification(b);
                this.window.addTextBlock("", "Weapon fuel quality", 10, baseline, font, color, 999);
                this.window.addTextBlock("", specification.weaponFuelAsPresented(), 160, baseline, font, color, 999);
                baseline += 18;
                this.window.addTextBlock("", "Armour", 10, baseline, font, color, 999);
                this.window.addTextBlock("", specification.armourAsPresented(), 160, baseline, font, color, 999);
                baseline += 18;
                this.window.addTextBlock("", "Speed", 10, baseline, font, color, 999);
                this.window.addTextBlock("", specification.speedAsPresented(), 160, baseline, font, color, 999);
                baseline += 18;
                this.window.addTextBlock("", "Turn rate", 10, baseline, font, color, 999);
                this.window.addTextBlock("", specification.turnRateAsPresented(), 160, baseline, font, color, 999);
                baseline += 28;
            }
            return baseline;
        }
    }

    dsector.DSecItemDescriptionWindow = DSecItemDescriptionWindow;
    DSecItemDescriptionWindow["__class"] = "dsector.DSecItemDescriptionWindow";
})(dsector);