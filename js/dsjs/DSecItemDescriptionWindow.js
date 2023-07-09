var dsector;
(function (dsector) {
    class DSecItemDescriptionWindow {
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.weaponSpecification = null;
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
            if (this.isCreated()) {
                this.drawWindow();
            } else {
                this.drawWindow();
                this.restorePosition();
            }
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

        /** @private */ restorePosition() {
            if (this.savedX !== -1) {
                this.window.xPosition = this.savedX;
            }
            if (this.savedY !== -1) {
                this.window.yPosition = this.savedY;
            }
        }

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
                const color = CWSYSTEM.CWColor.white_$LI$();
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
                    let defaultDamage = this.weaponSpecification.defaultDamage;
                    if (this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.TRI_BREAKER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.QUINT_BREAKER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.QUINT_GUIDER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.BLASTER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.NUKE_BLASTER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.GUIDE_BLASTER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.BLAST_GUIDER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.BLAST_SWIRLER ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.NORMAL_BOMB ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.DEATH_BOMB ||
                        this.weaponSpecification.specificationID === dsector.PreBuiltWeaponSpecifications.OCTO_BREAKER) {
                        defaultDamage *= 2;
                    }
                    this.window.addTextBlock("", "Weapon fuel use", 10, baseline, font, color, 999);
                    this.window.addTextBlock("", "" + this.weaponSpecification.fuelUse, 160, baseline, font, color, 999);
                    baseline += 18;
                    this.window.addTextBlock("", "Maximum damage", 10, baseline, font, color, 999);
                    this.window.addTextBlock("", "" + defaultDamage, 160, baseline, font, color, 999);
                    baseline += 28;
                }
                if (this.weaponSpecification.type === dsector.WeaponSpecification.TANK) {
                    let b = -1;
                    switch (this.weaponSpecification.specificationID) {
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
                }
                baseline -= 25;
                const button = this.window.addButton$name$x$y$len$h$text$t$r("", 101, baseline, 57,
                    15, "Close", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, 0);
                button.objectContainingButtonPressedMethod = this;
                button.buttonPressedMethodName = "closeWindow";
                baseline += 24;
                this.window.h = baseline;
                this.window.xPosition = x;
                this.window.yPosition = y;
            }
        }

        closeWindow(button) {
            this.destroy();
        }
    }

    dsector.DSecItemDescriptionWindow = DSecItemDescriptionWindow;
    DSecItemDescriptionWindow["__class"] = "dsector.DSecItemDescriptionWindow";
})(dsector || (dsector = {}));
