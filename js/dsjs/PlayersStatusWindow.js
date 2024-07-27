(function (dsector) {
    /**
     * PlayersStatusWindow class responsible for managing the status window of players.
     *
     * @property {CWSYSTEM.CWWindow|null} window - The window object for the status window.
     * @property {boolean} initialized - Indicates if the window is initialized.
     * @property {number} savedX - The saved x-coordinate of the window.
     * @property {number} savedY - The saved y-coordinate of the window.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof dsector
     * @requires CWSYSTEM.CWWindow
     * @requires dsector.Polygon
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class PlayersStatusWindow {
        /**
         * Constructor for the PlayersStatusWindow class.
         */
        constructor() {
            if (this.window === undefined) {
                this.window = null;
            }
            this.initialized = false;
            this.savedX = 25;
            this.savedY = 25;
        }

        /**
         * Initializes the window.
         * @private
         */
        initialize() {
            this.initialized = true;
            this.create();
            this.window.centerWithinDesktop();
            this.window.xPosition = CWSYSTEM.Global.screenResolutionX_$LI$() - this.window.w - 10;
            this.destroy();
        }

        /**
         * Checks if the window is created.
         * @returns {boolean} True if the window is created, false otherwise.
         */
        isCreated() {
            return this.window != null;
        }

        /**
         * Toggles the creation state of the window.
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
            if (!this.initialized) {
                this.initialize();
            }
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
                CWSYSTEM.Debug.println("Status window destroyed");
            }
        }

        /**
         * Restores the position of the window.
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
         * Updates the window.
         */
        update() {
            if (this.isCreated()) {
                this.drawWindow();
            }
        }

        /**
         * Draws the window.
         */
        drawWindow() {
            let baseX = 100;
            let baseY = 100;
            if (this.window != null) {
                baseX = this.window.xPosition;
                baseY = this.window.yPosition;
                dsector.DSReference.gui.destroyWindow("PLS");
            }
            const numOfPlayers = dsector.DSReference.dsecGame.numberOfPlayers();
            const vY = 6;
            const vX = 10;
            const w = 220;
            const h = 136;
            const pRef = vY * 2 + numOfPlayers * h;
            const wO = vX * 2 + w;
            const aaLevel = 2;
            this.window = dsector.DSReference.gui.addWindow$name$style$title$x$y$w$h$v(
                "PLS", 3, null, baseX, baseY, (wO / aaLevel | 0), (pRef / aaLevel | 0), true);
            this.window.ignoreWhenSavingAndRestoringEnvironment = true;
            this.window.useAntiAliasedContentAreaWithInterfaceElements(aaLevel, 1);
            const color = new CWSYSTEM.CWColor(0, 0, 0, 200);
            this.window.changeBackgroundColor$CWColor(color);
            const vs = dsector.DSReference.virtualScreen;
            const screenData = this.window.preAntiAliasedContent;
            this.window.clearPreAntiAliasedContent();
            const flt1 = [-35.0, 35.0, 70.0, 35.0, -35.0, -70.0];
            const flt2 = [-50.0, -50.0, 0.0, 50.0, 50.0, 0.0];
            for (let i = 0; i < numOfPlayers; ++i) {
                const currentPlayer = dsector.DSReference.dsecGame.getPlayer(i + 1);
                let polygon = new dsector.Polygon(new dsector.Vertex(vX, (vY + h * i + 60), 0.0),
                    new dsector.Vertex(vX, (vY + h * i + 130), 0.0), new dsector.Vertex((vX + 50), (vY + h * i + 130),
                        0.0), new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white()));
                PlayersStatusWindow.setupGlyph(vs, screenData, polygon, wO, pRef);
                const displayColor = currentPlayer.getTankColor(2);
                vs.setColor$intCWColor(displayColor);
                vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x, polygon.v2.y,
                    polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                PlayersStatusWindow.multiplyPolygon(polygon, Math.fround(currentPlayer.shields / 100.0));
                vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x, polygon.v2.y,
                    polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                polygon = new dsector.Polygon(new dsector.Vertex((wO - vX), (vY + h * i + 60), 0.0),
                    new dsector.Vertex((wO - vX), (vY + h * i + 130), 0.0), new dsector.Vertex((wO - vX - 50),
                        (vY + h * i + 130), 0.0), new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white()));
                PlayersStatusWindow.setupGlyph(vs, screenData, polygon, wO, pRef);
                vs.setColor$intCWColor(currentPlayer.getTankColor(2));
                vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x, polygon.v2.y,
                    polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                PlayersStatusWindow.multiplyPolygon(polygon, Math.fround(currentPlayer.weaponEnergy / 100.0));
                vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x, polygon.v2.y,
                    polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                const xH = (vX + (w / 2 | 0));
                const yH = (16 + (vY / 2 | 0) + h * i + (h / 2 | 0));
                for (let j = 0; j < 6; ++j) {
                    const wSpec = currentPlayer.getWeaponFromPortNumber(j + 1);
                    polygon = new dsector.Polygon(new dsector.Vertex(xH, yH, 0.0),
                        new dsector.Vertex(Math.fround(xH + flt1[j]), Math.fround(yH + flt2[j]), 0.0),
                        new dsector.Vertex(Math.fround(xH + flt1[(j + 1) % 6]), Math.fround(yH + flt2[(j + 1) % 6]),
                            0.0), new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white()));
                    PlayersStatusWindow.multiplyPolygon(polygon, 0.95);
                    if (wSpec != null) {
                        if (currentPlayer.selectedPort() === j + 1) {
                            vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                        } else {
                            vs.setColor$intCWColor(currentPlayer.getTankColor(1));
                        }
                    } else {
                        vs.setColorVS$r$g$b$a(50, 50, 50, 255);
                    }
                    vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x,
                        polygon.v2.y, polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                    PlayersStatusWindow.multiplyPolygon(polygon, 0.85);
                    if (currentPlayer.hasWeaponInPort(j + 1)) {
                        if (currentPlayer.selectedPort() === j + 1) {
                            vs.setColor$intCWColor(currentPlayer.getTankColor(1));
                        } else {
                            vs.setColor$intCWColor(currentPlayer.getTankColor(2));
                        }
                    } else {
                        vs.setColorVS$r$g$b$a(25, 25, 25, 255);
                    }
                    vs.renderPolygon(screenData, null, 0.0, polygon.v1.x, polygon.v1.y, polygon.v2.x,
                        polygon.v2.y, polygon.v3.x, polygon.v3.y, false, wO, pRef, null, null);
                    vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                    vs.renderPolygon(screenData, null, 0.0, xH, yH, Math.fround(xH + (flt1[j] / 4.0)),
                        Math.fround(yH + (flt2[j] / 4.0)), Math.fround(xH + (flt1[(j + 1) % 6] / 4.0)),
                        Math.fround(yH + (flt2[(j + 1) % 6] / 4.0)), false, wO, pRef, null, null);
                    vs.setColor$intCWColor(CWSYSTEM.CWColor.__black());
                    vs.renderPolygon(screenData, null, 0.0, xH, yH, Math.fround(xH + (flt1[j] / 5.0)),
                        Math.fround(yH + (flt2[j] / 5.0)), Math.fround(xH + (flt1[(j + 1) % 6] / 5.0)),
                        Math.fround(yH + (flt2[(j + 1) % 6] / 5.0)), false, wO, pRef, null, null);
                    const scale1 = Math.fround((polygon.v1.x + polygon.v2.x + polygon.v3.x) / 3.0);
                    const scale2 = Math.fround((polygon.v1.y + polygon.v2.y + polygon.v3.y) / 3.0);
                    if (wSpec != null) {
                        if (currentPlayer.selectedPort() === j + 1) {
                            vs.setColor$intCWColor(CWSYSTEM.CWColor.__black());
                        } else {
                            vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                        }
                        vs.drawStringDoubleSize(screenData, wSpec.portName, (scale1 | 0) - 10, (scale2 | 0) - 20);
                    }
                }
                let currentPlayerName = currentPlayer.name;
                if (currentPlayerName.length > 9) {
                    currentPlayerName = currentPlayerName.substring(0, 9);
                }
                vs.setColor$intCWColor(CWSYSTEM.CWColor.__black());
                vs.drawStringDoubleSize(screenData, currentPlayerName, 7, -3 + vY + h * i);
                vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                vs.drawStringDoubleSize(screenData, currentPlayerName, 6, -4 + vY + h * i);
                vs.setColor$intCWColor(CWSYSTEM.CWColor.__black());
                let abName = "None";
                const wSpec1 = currentPlayer.selectedWeapon();
                if (wSpec1 != null) {
                    abName = wSpec1.abbreviatedName;
                }
                vs.drawStringDoubleSize(screenData, abName, -3 + wO - abName.length * 12, -3 + vY + h * i);
                vs.setColor$intCWColor(currentPlayer.getTankColor(0));
                vs.drawStringDoubleSize(screenData, abName, -4 + wO - abName.length * 12, -4 + vY + h * i);
            }
        }

        /**
         * Sets up a glyph for the player status.
         *
         * @param vs {CWSYSTEM.VirtualScreen} virtual screen to draw on
         * @param sd {CWSYSTEM.ScreenData} screen data to draw on
         * @param p {dsector.Polygon} polygon to change
         * @param w {number} width offset
         * @param ref {number} reference to polygon
         */
        static setupGlyph(vs, sd, p, w, ref) {
            function glyph2() {
                vs.setColorVS$r$g$b$a(35, 35, 35, 255);
                vs.renderPolygon(sd, null, 0.0, p.v1.x, p.v1.y, p.v2.x, p.v2.y,
                    p.v3.x, p.v3.y, false, w, ref, null, null);
                PlayersStatusWindow.multiplyPolygon(p, 0.9);
            }

            glyph2();
            vs.setColorVS$r$g$b$a(50, 50, 50, 255);
            vs.renderPolygon(sd, null, 0.0, p.v1.x, p.v1.y, p.v2.x, p.v2.y,
                p.v3.x, p.v3.y, false, w, ref, null, null);
            PlayersStatusWindow.multiplyPolygon(p, 0.9);
            glyph2();
        }

        /**
         * Multiplies the polygon by a scale amount.
         *
         * @param {dsector.Polygon} pg - The polygon to modify.
         * @param {number} scalar - The amount to scale the polygon.
         */
        static multiplyPolygon(pg, scalar) {
            const x1 = Math.fround((pg.v1.x + pg.v2.x + pg.v3.x) / 3.0);
            const y1 = Math.fround((pg.v1.y + pg.v2.y + pg.v3.y) / 3.0);
            const z1 = Math.fround((pg.v1.z + pg.v2.z + pg.v3.z) / 3.0);
            let matrix4f = new dsector.Matrix4f();
            matrix4f = matrix4f.translate(-x1, -y1, -z1);
            matrix4f = matrix4f.scale(scalar, scalar, scalar);
            matrix4f = matrix4f.translate(x1, y1, z1);
            pg.v1.transform(matrix4f);
            pg.v2.transform(matrix4f);
            pg.v3.transform(matrix4f);
        }
    }

    dsector.PlayersStatusWindow = PlayersStatusWindow;
    PlayersStatusWindow["__class"] = "dsector.PlayersStatusWindow";
})(dsector || (dsector = {}));