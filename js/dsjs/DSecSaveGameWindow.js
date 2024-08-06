import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * This class represents the save game window
 *
 * @property {string} selectedFilename - The selected filename
 * @property {number} savedX - The saved x coordinate
 * @property {number} savedY - The saved y coordinate
 * @property {Window} window - The window
 *
 *
 * @example
 * let saveGameWindow = new dsector.DSecSaveGameWindow();
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
export class DSecSaveGameWindow {
    /**
     * Constructor for DSecSaveGameWindow.
     */
    constructor() {
        this.window = null;
        this.selectedFilename = null;
        this.savedX = -1;
        this.savedY = -1;
    }

    /**
     * Save the game.
     * @param {string} filename - The filename to save the game as.
     */
    static saveGame(filename) {
        if (dsector.DSReference.dsecGame != null) {
            let content = "";
            content = content + "numberOfPlayers=" + dsector.DSReference.dsecMainSetupWindow.numberOfPlayers() + "\n";
            content = content + "numberOfRounds=" + dsector.DSReference.dsecMainSetupWindow.numberOfRounds() + "\n";
            content = content + "playMode=" + dsector.DSReference.dsecMainSetupWindow.playMode() + "\n";
            content = content + "lastRoundPlayed=" + dsector.DSReference.dsecGame.currentRound() + "\n";
            if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
                content = content + "redTeamScore=" + dsector.DSReference.dsecGame.redTeam.score + "\n";
                content = content + "blueTeamScore=" + dsector.DSReference.dsecGame.blueTeam.score + "\n";
            }
            for (let i = 1; i <= dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
                const player = dsector.DSReference.dsecGame.getPlayer(i);
                content = content + "player" + i + "Name=" + player.name + "\n";
                content = content + "player" + i + "Score=" + player.score() + "\n";
                content = content + "player" + i + "Credits=" + Math.ceil(player.credits) + "\n";
                content = content + "player" + i + "RobotSpecification.type=" + player.robotSpecification.type + "\n";
                content = content + "player" + i + "RobotSpecification.filename=" +
                    player.robotSpecification.filename + "\n";
                content = content + "player" + i + "TankSpecification.type=" + player.tankSpecification.type() + "\n";
                content = content + "player" + i + "WeaponFuelUpgradeLevel=" +
                    player.tankSpecification.weaponFuelUpgradeLevel() + "\n";
                content = content + "player" + i + "ArmourUpgradeLevel=" +
                    player.tankSpecification.armourUpgradeLevel() + "\n";
                content = content + "player" + i + "TurnRateUpgradeLevel=" +
                    player.tankSpecification.turnRateUpgradeLevel() + "\n";
                content = content + "player" + i + "VelocityUpgradeLevel=" +
                    player.tankSpecification.velocityUpgradeLevel() + "\n";
                content = content + "player" + i + "NumberOfKills=" + player.getNumberOfKills() + "\n";
                content = content + "player" + i + "NumberOfDeaths=" + player.getNumberOfDeaths() + "\n";
                content = content + "player" + i + "NumberOfTimesWeaponFired=" +
                    player.getNumberOfTimesWeaponFired() + "\n";
                content = content + "player" + i + "TotalDamageInflicted=" + player.getTotalDamageInflicted() + "\n";
                content = content + "player" + i + "HasShoppingCard=" + player.hasShoppingCard() + "\n";
                content = content + "player" + i + "HasLargerDeath=" + player.hasLargerDeath() + "\n";
                content = content + "player" + i + "HasFastRecharge=" + player.hasFastRecharge() + "\n";
                content = content + "player" + i + "HasAutoHealer=" + player.hasAutoHealer() + "\n";
                content = content + "player" + i + "ShoppingCardOwnedButSuspended=" +
                    player.shoppingCardOwnedButSuspended() + "\n";
                const specs = dsector.DSReference.preBuiltWeaponSpecifications.preBuiltSpecifications;
                let j;
                let specification;
                let iD;
                for (j = 0; j < specs.length; ++j) {
                    specification = specs[j];
                    iD = specification.specificationID;
                    if (specification.defaultDamage > 0) {
                        content = content + "player" + i + "DamageInflictedByWeapon" + iD + "=" +
                            player.damageInflictedByWeapon(iD) + "\n";
                    }
                }
                for (j = 1; j <= 6; ++j) {

                    specification = player.getWeaponFromPortNumber(j);
                    iD = player.getFireUnitsFromPortNumber(j);
                    const specID1 = specification != null ? specification.specificationID : -1;
                    content = content + "player" + i + "Port" + j + "Specification=" + specID1 + "\n";
                    content = content + "player" + i + "Port" + j + "FireUnits=" + iD + "\n";

                }
                for (j = 0; j < dsector.DSReference.dsecGame.numberOfPlayers(); ++j) {
                    const player1 = dsector.DSReference.dsecGame.getPlayer(j + 1);
                    if (player1 !== player) {
                        const damage = player1.damageInflictedTowardsPlayer(player);
                        content = content + "player" + i + "DamageInflictedTowardsPlayer" + (j + 1) + "=" + damage + "\n";
                    }
                }
            }
            CWSYSTEM.CWFileTools.outputFile(filename, content);
        }
    }

    /**
     *  Checks if the window is created.
     * @public
     * @returns {boolean} Returns true if the window is created.
     */
    isCreated() {
        return this.window != null;
    }

    /**
     * Toggles the created state of the window.
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
     */
    create() {
        dsector.DSReference.dsecLoadGameWindow.destroy();
        this.drawWindow();
        this.restorePosition();
    }

    /**
     * Destroys the window.
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
     * Updates the window.
     */
    update() {
        if (this.isCreated()) {
            this.drawWindow();
        } else {
            this.drawWindow();
            this.restorePosition();
        }
    }

    /**
     * Restores the window to its saved position.
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
        let x = 25;
        let y = 25;
        if (this.window != null) {
            x = this.window.xPosition;
            y = this.window.yPosition;
            dsector.DSReference.gui.destroyWindow("DSECTORSAVEGAME");
        }
        const font = dsector.DSReference.virtualScreen.serif8_font;
        this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(
            "DSECTORSAVEGAME", 3, null, x, y, 300, 48, true);
        const color = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white());
        this.window.addTextBlock("", "Save Game", 10, 30, font, color, 999);
        this.window.addTextArea("filename", 95, 5, 200, 1,
            dsector.DSReference.virtualScreen.serif8_font, "").endMark = "";
        let button = null;
        button = this.window.addButton("SAVE_GAME", 190, 27, 40,
            15, "Save", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
        button = this.window.addButton("", 242, 27, 52, 15,
            "Cancel", CWSYSTEM.CWButton.ROUNDED_TEXT_BUTTON, CWSYSTEM.CWButton.CLICKED);
        button.objectContainingButtonPressedMethod = this;
        button.buttonPressedMethodName = "cancelButtonPressed";
    }

    /**
     * Cancel button pressed.
     *
     * @param {CWSYSTEM.CWButton} button - The button.
     */
    cancelButtonPressed(button) {
        this.destroy();
    }

    /**
     * Save button pressed action.
     */
    saveButtonPressed() {
        let filename = this.window.getTextArea("filename").getText();
        filename = filename.trim();
        filename = CWSYSTEM.CWStringTools.filenameFilter(filename);
        if (filename === ("_")) {
            dsector.DSReference.alertManager.messageQueued("Please enter a filename");
        } else {
            filename = filename + ".sav";
            DSecSaveGameWindow.saveGame(filename);
            this.destroy();
        }
    }
}