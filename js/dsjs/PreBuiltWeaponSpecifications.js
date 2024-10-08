import {dsector} from './dsector.js';

/**
 * Static class containing all the pre-built weapon specifications
 * for the game.
 *
 * @property {Array} preBuiltSpecifications - An array of pre-built weapon specifications.
 * @property {string} STANDARD_TANK - The standard tank specification key.
 * @property {string} ROTRA_1 - The Rotra I specification key.
 * @property {string} ROTRA_2 - The Rotra II specification key.
 * @property {string} OPEC_1 - The Opec I specification key.
 * @property {string} OPEC_2 - The Opec II specification key.
 * @property {string} OPEC_X - The Opec X specification key.
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
export class PreBuiltWeaponSpecifications {
    /**
     * Initializes the pre-built weapon specifications.
     */
    constructor() {
        this.preBuiltSpecifications = ([]);
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.STANDARD_TANK,
            true, dsector.WeaponSpecification.TANK, "Standard Tank", "Standard tank",
            "", "", "", 7, 2000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.ROTRA_1,
            true, dsector.WeaponSpecification.TANK, "Rotra I", "Fast turning defense tank",
            "", "", "", 7, 4000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.ROTRA_2,
            false, dsector.WeaponSpecification.TANK, "Rotra II", "Highly manoeuvrable tank",
            "", "", "", 7, 6000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.OPEC_1,
            false, dsector.WeaponSpecification.TANK, "Opec I", "Fast moving armoured tank",
            "", "", "", 7, 9000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.OPEC_2,
            false, dsector.WeaponSpecification.TANK, "Opec II", "General high performance tank",
            "", "", "", 7, 12000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.OPEC_X,
            false, dsector.WeaponSpecification.TANK, "Opec X", "Experimental high performance tank",
            "", "", "", 7, 18000, -1, -1,
            -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SHOPPING_CARD,
            true, dsector.WeaponSpecification.ITEM, "Shopping Card", "Membership for D-Sector discounts",
            "", "", "", 7, 3000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SCORE_BRIBE,
            true, dsector.WeaponSpecification.ITEM, "Score Bribe", "Bribe the D-Sector shop for 500 points",
            "", "", "", 7, 5000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.LARGER_DEATH,
            true, dsector.WeaponSpecification.ITEM, "Larger Death", "Powerful missiles released during death",
            "", "", "", 7, 8000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.FAST_RECHARGE,
            false, dsector.WeaponSpecification.ITEM, "Fast Recharge",
            "Increases weapon energy recovery rate by 25%", "", "", "", 7, 7000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.AUTO_HEALER,
            false, dsector.WeaponSpecification.ITEM, "Auto Healer",
            "Absorbs energy of nearby tanks to regenerate shields", "", "", "", 7, 6000, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.FUEL_UPGRADE,
            true, dsector.WeaponSpecification.ITEM, "Fuel Upgrade",
            "Upgraded tank weapon fuel increases damage 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.METAL_UPGRADE,
            true, dsector.WeaponSpecification.ITEM, "Metal Upgrade",
            "Increases tank\'s armour by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TURN_UPGRADE,
            true, dsector.WeaponSpecification.ITEM, "Turn Upgrade",
            "Increases tank\'s turn rate by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SPEED_UPGRADE,
            true, dsector.WeaponSpecification.ITEM, "Speed Upgrade",
            "Increases tank\'s speed by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.FUEL_UPGRADE_2,
            false, dsector.WeaponSpecification.ITEM, "Fuel Upgrade II",
            "Upgraded tank weapon fuel increases damage 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.METAL_UPGRADE_2,
            false, dsector.WeaponSpecification.ITEM, "Metal Upgrade II",
            "Increases tank\'s armour by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TURN_UPGRADE_2,
            false, dsector.WeaponSpecification.ITEM, "Turn Upgrade II",
            "Increases tank\'s turn rate by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SPEED_UPGRADE_2,
            false, dsector.WeaponSpecification.ITEM, "Speed Upgrade II",
            "Increases tank\'s speed by 25%", "", "", "", 7, -1, -1, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SMALL_DEBRIS,
            true, dsector.WeaponSpecification.PROJECTILE, "Debris", "", "", "", "assets/models/smallDebris", -1, 0, 0, 1, 2.0, 1500, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.MEDIUM_DEBRIS,
            true, dsector.WeaponSpecification.PROJECTILE, "Debris", "", "", "", "assets/models/mediumDebris", -1, 0, 0, 1, 3.0, 1500, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SPARK_DEBRIS,
            true, dsector.WeaponSpecification.PROJECTILE, "Debris", "", "", "", "assets/models/sparkFiend", -1, 0, 0, 1, 3.0, 1500, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.LASER_DEBRIS,
            true, dsector.WeaponSpecification.PROJECTILE, "Debris", "", "", "", "assets/models/standardLaser", -1, 0, 0, 1, 3.0, 1500, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TOUCH_FOE,
            true, dsector.WeaponSpecification.PROJECTILE, "Touch Spark", "", "", "", "assets/models/smallDebris", -1, 0, 0, 60, 2.0, 100, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.STANDARD_MISSILE,
            true, dsector.WeaponSpecification.PROJECTILE, "Single Missile", "Standard font mounted missile", "Sng Msl", "SM", "assets/models/standardMissile", 1, 2, 4, 4, 5.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.DOUBLE_MISSILE,
            true, dsector.WeaponSpecification.PROJECTILE, "Double Missile", "Twin fire front mounted missiles", "Dble Msl", "DM", "assets/models/standardMissile", 1, 200, 4, 6, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_DOUBLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TRIPLE_MISSILE,
            true, dsector.WeaponSpecification.PROJECTILE, "Triple Missile", "Triple fire front mounted missiles", "Trpl Msl", "TM", "assets/models/standardMissile", 1, 1200, 4, 9, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_TRIPLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TRI_BREAKER,
            true, dsector.WeaponSpecification.PROJECTILE, "Tri Breaker", "Breaks into three missiles", "Tri Brk", "TB", "assets/models/standardMissile", 1, 300, 12, 12, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 8, 16, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.QUINT_BREAKER,
            true, dsector.WeaponSpecification.PROJECTILE, "Quint Breaker", "Breaks into five missiles", "Quint Brk", "QB", "assets/models/standardMissile", 1, 1500, 12, 20, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 9, 16, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.OCTO_BREAKER,
            false, dsector.WeaponSpecification.PROJECTILE, "Octo Breaker", "Breaks into eight missiles", "Octo Brk", "OB", "assets/models/standardMissile", 1, 8500, 12, 32, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 10, 16, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.GUIDED_MISSILE,
            true, dsector.WeaponSpecification.PROJECTILE, "Guided Missile", "Movement sensitive guided missile", "Guid Msl", "GU", "assets/models/standardMissile", 1, 400, 6, 6, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 2, 1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.BEAM_LASER,
            true, dsector.WeaponSpecification.PROJECTILE, "Beam Laser", "Front mounted laser bolt", "Beam Lsr", "BL", "assets/models/standardLaser", 2, 300, 6, 6, 20.0, 2000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.POWER_LASER,
            true, dsector.WeaponSpecification.PROJECTILE, "Power Laser", "Double front mounted laser bolt", "Power Lsr", "PL", "assets/models/standardLaser", 2, 1650, 6, 12, 25.0, 2000, dsector.WeaponSpecification.LASER, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TRI_STRIKER,
            false, dsector.WeaponSpecification.PROJECTILE, "Tri-striker", "Triple fire front mounted lasers", "Tri Strik", "TS", "assets/models/standardLaser", 2, 3350, 6, 18, 30.0, 1500, dsector.WeaponSpecification.LAUNCH_FRONT_TRIPLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.REAR_TRIPLE,
            true, dsector.WeaponSpecification.PROJECTILE, "Rear Triple", "Triple fire rear mounted missiles", "Rear Tri", "RT", "assets/models/standardMissile", 3, 2400, 5, 15, 20.0, 3000, dsector.WeaponSpecification.LAUNCH_REAR_TRIPLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.REAR_DOUBLE,
            true, dsector.WeaponSpecification.PROJECTILE, "Rear Double", "Double fire rear mounted missiles", "Rear Dbl", "RD", "assets/models/standardMissile", 3, 250, 5, 8, 12.0, 5000, dsector.WeaponSpecification.LAUNCH_REAR_DOUBLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.REAR_GUIDERS,
            true, dsector.WeaponSpecification.PROJECTILE, "Rear Guiders", "Two rear-fire guided missiles", "Rear Gui", "RG", "assets/models/standardMissile", 3, 650, 5, 8, 7.0, 8000, dsector.WeaponSpecification.LAUNCH_REAR_DOUBLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 2, 1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.BLASTER,
            true, dsector.WeaponSpecification.PROJECTILE, "Blaster", "Chemical warhead blaster", "Blaster", "BL", "assets/models/standardMissile", 4, 2500, 30, 60, 8.0, 6000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 11, 16, -1, 0, 1.5));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.GUIDE_BLASTER,
            true, dsector.WeaponSpecification.PROJECTILE, "Guide Blaster", "Blaster with a guided warhead", "Gde Blstr", "GB", "assets/models/standardMissile", 4, 3200, 30, 60, 6.0, 6000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 11, 16, -1, 2, 2.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.QUINT_GUIDER,
            true, dsector.WeaponSpecification.PROJECTILE, "Quint Guider", "Breaks into five guided missiles", "Quint Gde", "QG", "assets/models/standardMissile", 4, 2200, 18, 20, 6.0, 9000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), dsector.WeaponSpecification.LAUNCH_QUINT_GUIDE, dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST, -1, 0, 2.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.BLAST_GUIDER,
            true, dsector.WeaponSpecification.PROJECTILE, "Blast Guider", "Bursts into guided missiles", "Blast Gdr", "BG", "assets/models/standardMissile", 4, 3200, 30, 30, 6.0, 6000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 12, 16, -1, 0, 4.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.BLAST_SWIRLER,
            true, dsector.WeaponSpecification.PROJECTILE, "Blast Swirler", "Bursts into eight swirling missiles", "Blast Swr", "BS", "assets/models/standardMissile", 4, 4500, 30, 40, 6.0, 6000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 13, 16, -1, 0, 1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.NUKE_BLASTER,
            false, dsector.WeaponSpecification.PROJECTILE, "Nuke Blaster",
            "Fission warhead blaster", "Nuke Blst", "NB", "assets/models/standardMissile",
            4, 20000, 30, 140, 8.0, 6000,
            dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0),
            11, 16, -1, 0, 1.0));

        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SWARM_MISSILE,
            true, dsector.WeaponSpecification.PROJECTILE, "Swarm Missile",
            "Breaks in to many small guided missiles", "Swarm Msl", "SM", "assets/models/standardMissile",
            4, 3200, 18, 50, 7.0, 7000,
            dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0),
            dsector.WeaponSpecification.LAUNCH_SWARM_MISSLE, dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST,
            -1, 0, 8.0));

        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SPARK_FIENDS,
            true, dsector.WeaponSpecification.PROJECTILE, "Spark Fiends", "Movement sensitive electron bolts", "Spark", "SP", "assets/models/sparkFiend", 4, 7500, 5, 30, 35.0, 30000, dsector.WeaponSpecification.LAUNCH_FRONT_TRIPLE, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 15, -1, 2, 8.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.SWIRLER,
            true, dsector.WeaponSpecification.PROJECTILE, "Swirler", "Swirling missile", "Swirler", "SW", "assets/models/standardMissile", 5, 250, 3, 4, 5.0, 40000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(-10.0, 0.0, 0.0), 0, 15, -1, dsector.WeaponSpecification.GUIDE_SPECIFICATION_SWIRLER, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.ELECTRO_BUDS,
            true, dsector.WeaponSpecification.PROJECTILE, "Electro Buds", "Releases seven guided sparks", "Elect Bud", "EB", "assets/models/smallDebris", 5, 900, 3, 7, 2.0, 10000, dsector.WeaponSpecification.LAUNCH_ELECTRO_BUDS, new dsector.VectorInR3(0.0, 0.0, 0.0), 0, 0, -1, 2, 3.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.NORMAL_BOMB,
            true, dsector.WeaponSpecification.PROJECTILE, "Normal Bomb", "Stationary blaster", "Bomb", "BO", "assets/models/whiteDot", 5, 1000, 20, 50, 0.0, 50000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0), dsector.WeaponSpecification.LAUNCH_BOMB, dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST, -1, 0, -1.0));
        /* BUG: missing models causes the code to hang */
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.DEATH_BOMB,
            true, dsector.WeaponSpecification.PROJECTILE, "Death Bomb",
            "Nuclear powered death bomb", "Dth Bomb", "DB",
            "assets/models/deathBomb", 5, 8000, 20, 150, 0.0,
            50000, dsector.WeaponSpecification.LAUNCH_FRONT_SINGLE, new dsector.VectorInR3(0.0, 0.0, 0.0),
            dsector.WeaponSpecification.LAUNCH_BOMB, dsector.WeaponSpecification.DESTROY_AS_MEDIUM_BLAST, -1, 0, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.GLOW_SHIELD,
            true, dsector.WeaponSpecification.SHIELD, "Glow Shield",
            "Temporary protection from missiles and lasers", "Glow Shld", "GS",
            "", 6, 2500, 15, -1, -1.0, 7000, -1,
            null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.ECM_HACKER,
            true, dsector.WeaponSpecification.HACKER, "ECM Hacker", "Destroys missiles within close range", "ECM Hack", "EH", "", 6, 200, 3, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.ECM_WIPER,
            true, dsector.WeaponSpecification.WIPER, "ECM Wiper", "Destroys all missiles within the D-Sector", "ECM Wipe", "EW", "", 6, 400, 3, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TELEPORT_SELF,
            true, dsector.WeaponSpecification.TELEPORT_SELF, "Teleport Self", "Teleports tank to a random location", "Tprt Self", "TS", "", 6, 2000, 4, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.TELEPORT_FOE,
            false, dsector.WeaponSpecification.TELEPORT_FOE, "Teleport Foe", "Teleports closest tank to a random location", "Tprt Foe", "TF", "", 6, 2000, 4, -1, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.HEALER,
            true, dsector.WeaponSpecification.HEALER, "Healer", "Converts weapon energy into shield energy", "Heal", "HE", "", 6, 2000, 10, 10, -1.0, -1, -1, null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.DEATH_TOUCH,
            true, dsector.WeaponSpecification.TOUCH, "Death Touch",
            "Damages any tank in contact", "Dth Tch", "DT",
            "", 6, 350, 7, 15, 20.0, 10, 1,
            null, -1, -1, -1, -1, -1.0));
        this.preBuiltSpecifications.push(new dsector.WeaponSpecification(PreBuiltWeaponSpecifications.NONE,
            true, dsector.WeaponSpecification.NONE, "None", "No weapon",
            "None", "NO", "", -1, 0, 0, 0,
            0.0, 0, 0, null, -1, -1,
            -1, -1, -1.0));
    }

    /**
     * Returns a pre-built weapon specification of a given specification ID.
     *
     * @param {number} sid The specification ID to search for.
     * @returns {WeaponSpecification|null} A {@link WeaponSpecification} or null if not found.
     */
    getPreBuiltSpecification(sid) {
        for (let index = 0; index < this.preBuiltSpecifications.length; index++) {
            let pbs = this.preBuiltSpecifications[index];
            const spec = pbs;
            if (spec.specificationID === sid) {
                return spec;
            }
        }
        dsector.DSReference.alertManager.messageQueued(
            "No pre-built weapon specification of specificationID " + sid);
        return null;
    }

    /**
     * @constant {number} NONE - Represents no weapon (500)
     */
    static NONE = 500;

    /**
     * @constant {number} SMALL_DEBRIS - Represents small debris (501)
     */
    static SMALL_DEBRIS = 501;

    /**
     * @constant {number} MEDIUM_DEBRIS - Represents medium debris (502)
     */
    static MEDIUM_DEBRIS = 502;

    /**
     * @constant {number} SPARK_DEBRIS - Represents spark debris (503)
     */
    static SPARK_DEBRIS = 503;

    /**
     * @constant {number} LASER_DEBRIS - Represents laser debris (504)
     */
    static LASER_DEBRIS = 504;

    /**
     * @constant {number} TOUCH_FOE - Represents touching a foe (505)
     */
    static TOUCH_FOE = 505;

    /**
     * @constant {number} STANDARD_MISSILE - Represents a standard missile (300)
     */
    static STANDARD_MISSILE = 300;

    /**
     * @constant {number} DOUBLE_MISSILE - Represents a double missile (301)
     */
    static DOUBLE_MISSILE = 301;

    /**
     * @constant {number} TRIPLE_MISSILE - Represents a triple missile (302)
     */
    static TRIPLE_MISSILE = 302;

    /**
     * @constant {number} BEAM_LASER - Represents a beam laser (303)
     */
    static BEAM_LASER = 303;

    /**
     * @constant {number} POWER_LASER - Represents a power laser (304)
     */
    static POWER_LASER = 304;

    /**
     * @constant {number} BLASTER - Represents a blaster (305)
     */
    static BLASTER = 305;

    /**
     * @constant {number} NUKE_BLASTER - Represents a nuke blaster (306)
     */
    static NUKE_BLASTER = 306;

    /**
     * @constant {number} GUIDE_BLASTER - Represents a guide blaster (307)
     */
    static GUIDE_BLASTER = 307;

    /**
     * @constant {number} BLAST_GUIDER - Represents a blast guider (308)
     */
    static BLAST_GUIDER = 308;

    /**
     * @constant {number} BLAST_SWIRLER - Represents a blast swirler (309)
     */
    static BLAST_SWIRLER = 309;

    /**
     * @constant {number} REAR_DOUBLE - Represents a rear double weapon (310)
     */
    static REAR_DOUBLE = 310;

    /**
     * @constant {number} REAR_TRIPLE - Represents a rear triple weapon (311)
     */
    static REAR_TRIPLE = 311;

    /**
     * @constant {number} REAR_GUIDERS - Represents rear guiders (312)
     */
    static REAR_GUIDERS = 312;

    /**
     * @constant {number} ELECTRO_BUDS - Represents electro buds (313)
     */
    static ELECTRO_BUDS = 313;

    /**
     * @constant {number} TELEPORT_FOE - Represents teleporting a foe (314)
     */
    static TELEPORT_FOE = 314;

    /**
     * @constant {number} TELEPORT_SELF - Represents self-teleportation (315)
     */
    static TELEPORT_SELF = 315;

    /**
     * @constant {number} TRI_BREAKER - Represents a tri-breaker weapon (316)
     */
    static TRI_BREAKER = 316;

    /**
     * @constant {number} TRI_STRIKER - Represents a tri-striker weapon (317)
     */
    static TRI_STRIKER = 317;

    /**
     * @constant {number} QUINT_BREAKER - Represents a quint-breaker weapon (318)
     */
    static QUINT_BREAKER = 318;

    /**
     * @constant {number} OCTO_BREAKER - Represents an octo-breaker weapon (319)
     */
    static OCTO_BREAKER = 319;

    /**
     * @constant {number} GUIDED_MISSILE - Represents a guided missile (320)
     */
    static GUIDED_MISSILE = 320;

    /**
     * @constant {number} QUINT_GUIDER - Represents a quint-guider weapon (321)
     */
    static QUINT_GUIDER = 321;

    /**
     * @constant {number} SPARK_FIENDS - Represents spark fiends (322)
     */
    static SPARK_FIENDS = 322;

    /**
     * @constant {number} SWIRLER - Represents a swirler weapon (323)
     */
    static SWIRLER = 323;

    /**
     * @constant {number} NORMAL_BOMB - Represents a normal bomb (324)
     */
    static NORMAL_BOMB = 324;

    /**
     * @constant {number} DEATH_BOMB - Represents a death bomb (325)
     */
    static DEATH_BOMB = 325;

    /**
     * @constant {number} GLOW_SHIELD - Represents a glow shield (327)
     */
    static GLOW_SHIELD = 327;

    /**
     * @constant {number} ECM_HACKER - Represents an ECM hacker (328)
     */
    static ECM_HACKER = 328;

    /**
     * @constant {number} ECM_WIPER - Represents an ECM wiper (329)
     */
    static ECM_WIPER = 329;

    /**
     * @constant {number} HEALER - Represents a healer (330)
     */
    static HEALER = 330;

    /**
     * @constant {number} DEATH_TOUCH - Represents a death touch (331)
     */
    static DEATH_TOUCH = 331;

    /**
     * @constant {number} SWARM_MISSILE - Represents a swarm missile (332)
     */
    static SWARM_MISSILE = 332;

    /**
     * @constant {number} STANDARD_TANK - Represents a standard tank (400)
     */
    static STANDARD_TANK = 400;

    /**
     * @constant {number} ROTRA_1 - Represents ROTRA-1 tank (401)
     */
    static ROTRA_1 = 401;

    /**
     * @constant {number} ROTRA_2 - Represents ROTRA-2 tank (402)
     */
    static ROTRA_2 = 402;

    /**
     * @constant {number} OPEC_1 - Represents OPEC-1 tank (403)
     */
    static OPEC_1 = 403;

    /**
     * @constant {number} OPEC_2 - Represents OPEC-2 tank (404)
     */
    static OPEC_2 = 404;

    /**
     * @constant {number} SHOPPING_CARD - Represents a shopping discount card (405)
     */
    static SHOPPING_CARD = 405;

    /**
     * @constant {number} LARGER_DEATH - Represents a larger death (406)
     */
    static LARGER_DEATH = 406;

    /**
     * @constant {number} SCORE_BRIBE - Represents a score bribe (407)
     */
    static SCORE_BRIBE = 407;

    /**
     * @constant {number} FAST_RECHARGE - Represents fast recharge (408)
     */
    static FAST_RECHARGE = 408;

    /**
     * @constant {number} AUTO_HEALER - Represents an auto healer (409)
     */
    static AUTO_HEALER = 409;

    /**
     * @constant {number} FUEL_UPGRADE - Represents a fuel upgrade (410)
     */
    static FUEL_UPGRADE = 410;

    /**
     * @constant {number} METAL_UPGRADE - Represents a metal upgrade (411)
     */
    static METAL_UPGRADE = 411;

    /**
     * @constant {number} TURN_UPGRADE - Represents a turn upgrade (412)
     */
    static TURN_UPGRADE = 412;

    /**
     * @constant {number} SPEED_UPGRADE - Represents a speed upgrade (413)
     */
    static SPEED_UPGRADE = 413;

    /**
     * @constant {number} FUEL_UPGRADE_2 - Represents a second fuel upgrade (414)
     */
    static FUEL_UPGRADE_2 = 414;

    /**
     * @constant {number} METAL_UPGRADE_2 - Represents a second metal upgrade (415)
     */
    static METAL_UPGRADE_2 = 415;

    /**
     * @constant {number} TURN_UPGRADE_2 - Represents a second turn upgrade (416)
     */
    static TURN_UPGRADE_2 = 416;

    /**
     * @constant {number} SPEED_UPGRADE_2 - Represents a second speed upgrade (417)
     */
    static SPEED_UPGRADE_2 = 417;

    /**
     * @constant {number} OPEC_X - Represents OPEC-X (418)
     */
    static OPEC_X = 418;
}
