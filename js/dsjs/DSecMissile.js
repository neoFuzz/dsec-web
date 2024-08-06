import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Represents a missile fired by a player in the game.
 *
 * @property {DSecPlayer} owner the player who launched the missile
 * @property {WeaponSpecification} weaponSpecification the specification of the weapon used to launch the missile
 * @property {number} x the x-coordinate of the missile
 * @property {number} y the y-coordinate of the missile
 * @property {number} angle the angle of the missile
 * @property {number} fixedTurnRate the fixed turn rate of the missile
 * @property {number} damage the damage the missile can cause
 * @property {number} timeAtLaunchInMilliseconds the time at which the missile was launched in milliseconds
 * @property {Object} missileSound the sound of the missile
 *
 * @see      DSecPlayer
 * @see      WeaponSpecification
 *
 * @example
 * const player = new DSecPlayer();
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
export class DSecMissile {
    /**
     * Constructor for DSecMissile.
     *
     * @param {DSecPlayer} player the player who launched the missile
     * @param {WeaponSpecification} specification the specification of the weapon used to launch the missile
     */
    constructor(player, specification) {
        this.owner = player;
        this.weaponSpecification = specification;
        this.x = player.getX();
        this.y = player.getY();
        this.timeAtLaunchInMilliseconds = CWSYSTEM.Environment.currentTime();

        // Default values for other properties
        this.angle = 0;
        this.fixedTurnRate = 0;
        this.damage = 0;
        this.missileSound = null;
    }

    /**
     * Gets the x-coordinate of the missile.
     * @return {number} the x-coordinate of the missile
     */
    getX() {
        return this.x;
    }

    /**
     * Sets the x-coordinate of the missile.
     *
     * @param {number} x the x-coordinate of the missile
     */
    setX(x) {
        this.x = x;
    }

    /**
     * Gets the y-coordinate of the missile.
     *
     * @return {number} the y-coordinate of the missile
     */
    getY() {
        return this.y;
    }

    /**
     * Sets the y-coordinate of the missile.
     *
     * @param {number} y the y-coordinate of the missile
     */
    setY(y) {
        this.y = y;
    }

    /**
     * Gets the damage of the missile.
     *
     * @return {number} the damage of the missile
     */
    getDamage() {
        return this.damage;
    }

    /**
     * Sets the damage of the missile.
     *
     * @param {number} damage the damage of the missile
     */
    setDamage(damage) {
        this.damage = damage;
    }

    /**
     * Gets the angle of the missile.
     * @return {number} the angle of the missile
     */
    getAngle() {
        return this.angle;
    }

    /**
     * Sets the angle of the missile.
     *
     * @param {number} angle the angle of the missile
     */
    setAngle(angle) {
        this.angle = angle;
    }

    /**
     * Gets the fixed turn rate of the missile.
     * @return {number} the fixed turn rate of the missile
     */
    getFixedTurnRate() {
        return this.fixedTurnRate;
    }

    /**
     * Sets the fixed turn rate of the missile.
     *
     * @param {number} turnRate the fixed turn rate of the missile
     */
    setFixedTurnRate(turnRate) {
        this.fixedTurnRate = turnRate;
    }

    /**
     * Destroys the missile without creating a small blast effect.
     *
     * @return {boolean} true if the missile was successfully destroyed, false otherwise
     */
    destroyWithoutExplosion() {
        (a => {
            let index = a.indexOf(this);
            if (index >= 0) {
                a.splice(index, 1);
                return true;
            } else {
                return false;
            }
        })(dsector.DSReference.dsecMissileManager.missiles);
    }

    /**
     * Destroys the missile and creates a small blast effect.
     *
     * @see DSecFadingLight
     * @see PreBuiltWeaponSpecifications
     */
    destroy() {
        const sm = dsector.DSReference.dsecSetupWindow.soundMode;
        if (this.missileSound != null) {
            this.missileSound.pause();
        }
        this.destroyWithoutExplosion();
        let specification;
        let base;
        let vir3 = new dsector.VectorInR3(0.0, 0.0, 0.0);
        if (this.weaponSpecification.actionWhenDestroyed === dsector.WeaponSpecification.DESTROY_AS_SMALL_BLAST) {
            if (sm === dsector.DSecSetupWindow.NORMAL_SOUND &&
                !this.missileFarFromCamera()) {
                if ((Math.random() * 2.0) === 0) {
                    dsector.DSReference.cwSound.playSound("debrisExplosion1.wav", (Math.random() * 20.0));
                } else {
                    dsector.DSReference.cwSound.playSound("debrisExplosion2.wav", (Math.random() * 20.0));
                }
            }
            specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
            base = 0.0;
            specification.fire(this.owner, this.x, this.y, 0.0, vir3, base);
            specification.fire(this.owner, this.x, this.y, 1.5707964, vir3, base);
            specification.fire(this.owner, this.x, this.y, Math.PI, vir3, base);
            specification.fire(this.owner, this.x, this.y, 4.712389, vir3, base);
            dsector.DSecFadingLight.add(Math.fround(0.1 + this.damage / 40.0), this.x, this.y, 30.0, 1500);
        }
        if (this.weaponSpecification.actionWhenDestroyed === dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST) {
            if (!this.missileFarFromCamera() && sm === dsector.DSecSetupWindow.NORMAL_SOUND) {
                dsector.DSReference.cwSound.playSound("smallExplosion.wav", (Math.random() * 10.0));
            }
            specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                dsector.PreBuiltWeaponSpecifications.MEDIUM_DEBRIS);
            base = this.weaponSpecification.defaultDamage / 8;
            specification.fire(this.owner, this.x, this.y, 0.0, vir3, base);
            specification.fire(this.owner, this.x, this.y, 1.5707964, vir3, base);
            specification.fire(this.owner, this.x, this.y, Math.PI, vir3, base);
            specification.fire(this.owner, this.x, this.y, 4.712389, vir3, base);
            specification = dsector.DSReference.preBuiltWeaponSpecifications.getPreBuiltSpecification(
                dsector.PreBuiltWeaponSpecifications.SMALL_DEBRIS);
            base = this.weaponSpecification.defaultDamage / 16;
            specification.fire(this.owner, this.x, this.y, 0.7853982, vir3, base);
            specification.fire(this.owner, this.x, this.y, 2.3561945, vir3, base);
            specification.fire(this.owner, this.x, this.y, 3.9269907, vir3, base);
            specification.fire(this.owner, this.x, this.y, 5.497787, vir3, base);
            dsector.DSecFadingLight.add(Math.fround(0.1 + (this.damage / 40.0)), this.x, this.y, 30.0, 1500);
        }
    }

    /**
     * Checks if the missile is striking an object.
     *
     * @return {boolean} true if the missile is striking an object, false otherwise
     */
    isStrikingAnObject() {
        const positionedModel = this.constructPositionedModel();
        let positionedModel1;
        for (let i = 0; i < dsector.DSReference.dsecGame.numberOfPlayers(); ++i) {
            const player = dsector.DSReference.dsecGame.getPlayer(i + 1);
            if (player.aliveState !== dsector.DSecPlayer.DESTROYED && player !== this.owner) {
                positionedModel1 = player.constructPositionedModel();
                if (positionedModel.intersectsWith(positionedModel1)) {
                    this.strikePlayer(player);
                    return true;
                }
            }
        }
        const round = dsector.DSReference.dsecGame.dsecRound;
        for (const positionedModel1 of round.backgroundObjects) {
            if (positionedModel.intersectsWith(positionedModel1)) {
                return true;
            }
        }
        if (dsector.DSReference.dsecMainSetupWindow.playMode() === dsector.DSecMainSetupWindow.TEAMS) {
            if (round.blueJewel.constructPositionedModel().intersectsWith(positionedModel)) {
                round.blueJewel.takeMissileDamage(this);
                return true;
            }
            if (round.redJewel.constructPositionedModel().intersectsWith(positionedModel)) {
                round.redJewel.takeMissileDamage(this);
                return true;
            }
        }
        return false;
    }

    /**
     * Strikes the given player with the missile.
     *
     * @param {DSecPlayer} player the player to strike
     */
    strikePlayer(player) {
        player.takeDamage(this);
    }

    /**
     * Constructs a positioned model for the missile.
     *
     * @return {dsector.PositionedModel} the positioned model for the missile
     */
    constructPositionedModel() {
        return new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(
            this.weaponSpecification.modelName), this.orientationAsMatrix(), this.x, this.y, 0.0);
    }

    /**
     * Returns the orientation of the missile as a matrix.
     *
     * @return {dsector.Matrix4f} the orientation of the missile as a matrix
     * @private
     */
    orientationAsMatrix() {
        const matrix4f = new dsector.Matrix4f();
        matrix4f.rotateZ(-this.angle);
        return matrix4f;
    }

    /**
     * Checks if the missile has timed out.
     *
     * @return {boolean} true if the missile has timed out, false otherwise
     * @private
     */
    timedOut() {
        const launchTime = CWSYSTEM.Environment.currentTime() - this.timeAtLaunchInMilliseconds;
        return launchTime > (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.weaponSpecification.lifeSpanInMilliseconds);
    }

    /**
     * Checks if the missile is far from the camera.
     *
     * @private
     */
    missileFarFromCamera() {
        const distance = Math.sqrt(Math.pow(this.x - dsector.DSReference.scene.cameraX, 2.0) +
            Math.pow(this.y - dsector.DSReference.scene.cameraY, 2.0));
        return distance > 600.0;
    }
}