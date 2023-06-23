/* re-written from Java */
var dsector;
(function (dsector) {
    /** Static class containing all the pre-built weapon specifications */
    class PreBuiltWeaponSpecifications {
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
                4, 2500, 18, 50, 7.0, 7000,
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
        }

        getPreBuiltSpecification(specId) {
            for (let index = 0; index < this.preBuiltSpecifications.length; index++) {
                let preBuiltSpecification = this.preBuiltSpecifications[index];
                const specification = preBuiltSpecification;
                if (specification.specificationID === specId) {
                    return specification;
                }
            }
            dsector.DSReference.alertManager.messageQueued("No pre-built weapon specification of specificationID " + specId);
            return null;
        }
    }

    PreBuiltWeaponSpecifications.NONE = 500;
    PreBuiltWeaponSpecifications.SMALL_DEBRIS = 501;
    PreBuiltWeaponSpecifications.MEDIUM_DEBRIS = 502;
    PreBuiltWeaponSpecifications.SPARK_DEBRIS = 503;
    PreBuiltWeaponSpecifications.LASER_DEBRIS = 504;
    PreBuiltWeaponSpecifications.TOUCH_FOE = 505;
    PreBuiltWeaponSpecifications.STANDARD_MISSILE = 300;
    PreBuiltWeaponSpecifications.DOUBLE_MISSILE = 301;
    PreBuiltWeaponSpecifications.TRIPLE_MISSILE = 302;
    PreBuiltWeaponSpecifications.BEAM_LASER = 303;
    PreBuiltWeaponSpecifications.POWER_LASER = 304;
    PreBuiltWeaponSpecifications.BLASTER = 305;
    PreBuiltWeaponSpecifications.NUKE_BLASTER = 306;
    PreBuiltWeaponSpecifications.GUIDE_BLASTER = 307;
    PreBuiltWeaponSpecifications.BLAST_GUIDER = 308;
    PreBuiltWeaponSpecifications.BLAST_SWIRLER = 309;
    PreBuiltWeaponSpecifications.REAR_DOUBLE = 310;
    PreBuiltWeaponSpecifications.REAR_TRIPLE = 311;
    PreBuiltWeaponSpecifications.REAR_GUIDERS = 312;
    PreBuiltWeaponSpecifications.ELECTRO_BUDS = 313;
    PreBuiltWeaponSpecifications.TELEPORT_FOE = 314;
    PreBuiltWeaponSpecifications.TELEPORT_SELF = 315;
    PreBuiltWeaponSpecifications.TRI_BREAKER = 316;
    PreBuiltWeaponSpecifications.TRI_STRIKER = 317;
    PreBuiltWeaponSpecifications.QUINT_BREAKER = 318;
    PreBuiltWeaponSpecifications.OCTO_BREAKER = 319;
    PreBuiltWeaponSpecifications.GUIDED_MISSILE = 320;
    PreBuiltWeaponSpecifications.QUINT_GUIDER = 321;
    PreBuiltWeaponSpecifications.SPARK_FIENDS = 322;
    PreBuiltWeaponSpecifications.SWIRLER = 323;
    PreBuiltWeaponSpecifications.NORMAL_BOMB = 324;
    PreBuiltWeaponSpecifications.DEATH_BOMB = 325;
    PreBuiltWeaponSpecifications.GLOW_SHIELD = 327;
    PreBuiltWeaponSpecifications.ECM_HACKER = 328;
    PreBuiltWeaponSpecifications.ECM_WIPER = 329;
    PreBuiltWeaponSpecifications.HEALER = 330;
    PreBuiltWeaponSpecifications.DEATH_TOUCH = 331;
    PreBuiltWeaponSpecifications.SWARM_MISSILE = 332;
    PreBuiltWeaponSpecifications.STANDARD_TANK = 400;
    PreBuiltWeaponSpecifications.ROTRA_1 = 401;
    PreBuiltWeaponSpecifications.ROTRA_2 = 402;
    PreBuiltWeaponSpecifications.OPEC_1 = 403;
    PreBuiltWeaponSpecifications.OPEC_2 = 404;
    PreBuiltWeaponSpecifications.SHOPPING_CARD = 405;
    PreBuiltWeaponSpecifications.LARGER_DEATH = 406;
    PreBuiltWeaponSpecifications.SCORE_BRIBE = 407;
    PreBuiltWeaponSpecifications.FAST_RECHARGE = 408;
    PreBuiltWeaponSpecifications.AUTO_HEALER = 409;
    PreBuiltWeaponSpecifications.FUEL_UPGRADE = 410;
    PreBuiltWeaponSpecifications.METAL_UPGRADE = 411;
    PreBuiltWeaponSpecifications.TURN_UPGRADE = 412;
    PreBuiltWeaponSpecifications.SPEED_UPGRADE = 413;
    PreBuiltWeaponSpecifications.FUEL_UPGRADE_2 = 414;
    PreBuiltWeaponSpecifications.METAL_UPGRADE_2 = 415;
    PreBuiltWeaponSpecifications.TURN_UPGRADE_2 = 416;
    PreBuiltWeaponSpecifications.SPEED_UPGRADE_2 = 417;
    PreBuiltWeaponSpecifications.OPEC_X = 418;
    dsector.PreBuiltWeaponSpecifications = PreBuiltWeaponSpecifications;
    PreBuiltWeaponSpecifications["__class"] = "dsector.PreBuiltWeaponSpecifications";
})(dsector || (dsector = {}));
