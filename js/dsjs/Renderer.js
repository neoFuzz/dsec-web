/* re-written from java */
var dsector;
(function (dsector) {
    class Renderer {
        constructor(mainGUI) {
            if (this.brightWhite === undefined) {
                this.brightWhite = 0;
            }
            if (this.dullBlue === undefined) {
                this.dullBlue = 0;
            }
            if (this.brightGreen === undefined) {
                this.brightGreen = 0;
            }
            if (this.brightBlue === undefined) {
                this.brightBlue = 0;
            }
            if (this.starfield === undefined) {
                this.starfield = null;
            }
            if (this.numberOfStars === undefined) {
                this.numberOfStars = 0;
            }
            if (this.mainGUI === undefined) {
                this.mainGUI = null;
            }
            if (this.v === undefined) {
                this.v = null;
            }
            if (this.__renderingMode === undefined) {
                this.__renderingMode = 0;
            }
            if (this.zBuffer === undefined) {
                this.zBuffer = null;
            }
            if (this.detailSensitiveRendering === undefined) {
                this.detailSensitiveRendering = false;
            }
            this.brightWhite = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.lightGrey_$LI$()).color;
            this.dullBlue = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.dullBlue_$LI$()).color;
            this.brightGreen = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightGreen_$LI$()).color;
            this.brightBlue = new CWSYSTEM.CWColor(CWSYSTEM.CWColor.brightBlue_$LI$()).color;
            this.__renderingMode = Renderer.BACKFACE_CULLING;
            this.detailSensitiveRendering = false;
            this.mainGUI = mainGUI;
            this.v = dsector.DSReference.virtualScreen;
            if (this.v == null) {
                dsector.DSReference.alertManager.messageQueued(
                    "Error in Renderer constructor. Virtual screen not initialised prior to Renderer being constructed.");
            }
            Renderer.scale = [0, 0, 0];
            Renderer.offsetX = [0, 0, 0];
            Renderer.offsetY = [0, 0, 0];
            for (let i = 0; i < 3; ++i) {
                Renderer.scale[i] = 10.0;
                Renderer.offsetX[i] = 0.0;
                Renderer.offsetY[i] = 0.0;
            }
            this.createStars();
        }

        static tinyLensFlare() {
            if (Renderer.__tinyLensFlare == null) {
                Renderer.__tinyLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/tinyLensFlare.jpg");
            }
            return Renderer.__tinyLensFlare;
        }

        static smallLensFlare() {
            if (Renderer.__smallLensFlare == null) {
                Renderer.__smallLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/smallLensFlare.jpg");
            }
            return Renderer.__smallLensFlare;
        }

        static mediumLensFlare() {
            if (Renderer.__mediumLensFlare == null) {
                Renderer.__mediumLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/mediumLensFlare.jpg");
            }
            return Renderer.__mediumLensFlare;
        }

        static shieldGraphic() {
            if (Renderer.__shieldGraphic == null) {
                Renderer.__shieldGraphic = new CWSYSTEM.CWGraphics().getJPG("assets/images/shield.jpg");
            }
            return Renderer.__shieldGraphic;
        }

        createStars() {
            this.starfield = new dsector.Starfield(15000);
        }

        processButton(cwButton) {
            const parent = cwButton.parent;
            const substring = cwButton.name.substring(7, 9);
            const substring2 = cwButton.name.substring(5, 6);
            let n;
            if (substring2 === ("X")) {
                n = 0;
            } else if (substring2 === ("Y")) {
                n = 1;
            } else {
                n = 2;
            }
            switch ((substring)) {
                case "UP":
                    const offsetY = Renderer.offsetY;
                    offsetY[n] += Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 10.0) / Renderer.scale[n]);
                    break;
                case "DN":
                    const offsetY2 = Renderer.offsetY;
                    offsetY2[n] -= Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 10.0) / Renderer.scale[n]);
                    break;
                case "LT":
                    const offsetX = Renderer.offsetX;
                    offsetX[n] += Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 10.0) / Renderer.scale[n]);
                    break;
                case "RT":
                    const offsetX2 = Renderer.offsetX;
                    offsetX2[n] -= Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 10.0) / Renderer.scale[n]);
                    break;
                case "Z+":
                    this.zoomIn(n);
                    break;
                case "Z-":
                    this.zoomOut(n);
                    break;
                case "OF":
                    dsector.DSReference.mouseDrag.engageOffsetPad(CWSYSTEM.Environment.mouseX_$LI$(), CWSYSTEM.Environment.mouseY_$LI$(), parent);
                    break;
            }
            //CWSYSTEM.Environment.oneProjectiveViewWindowRequestedForUpdateNextCycle(cwButton.parent);
        }

        zoomOut(n) {
            const scale = Renderer.scale;
            scale[n] /= Math.fround(1.0 + CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0);
            if (Renderer.scale[n] < 0.01) {
                const scale2 = Renderer.scale;
                scale2[n] *= 1.1;
            }
        }

        zoomIn(n) {
            const scale = Renderer.scale;
            scale[n] *= Math.fround(1.0 + CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0);
            if (Renderer.scale[n] > 50000.0) {
                const scale2 = Renderer.scale;
                scale2[n] /= 1.1;
            }
        }

        updateViewWindow(cwWindow) {
            if (cwWindow == null) {
                return;
            }
            if (cwWindow.nameID === ("X")) {
                this.orthogonalProjection(0);
            }
            if (cwWindow.nameID === ("Y")) {
                this.orthogonalProjection(1);
            }
            if (cwWindow.nameID === ("Z")) {
                this.orthogonalProjection(2);
            }
            if (cwWindow.nameID === ("PER")) {
                this.perspectiveProjection$();
            }
        }

        updateViewWindowIncludingButtons(cwWindow) {
            if (cwWindow == null) {
                return;
            }
            const string = "PROJ_" + cwWindow.nameID + "_";
            this.updateViewWindow(cwWindow);
            cwWindow.deleteButton(string + "UP");
            cwWindow.deleteButton(string + "DN");
            cwWindow.deleteButton(string + "LT");
            cwWindow.deleteButton(string + "RT");
            cwWindow.deleteButton(string + "Z+");
            cwWindow.deleteButton(string + "Z-");
            cwWindow.deleteButton(string + "OF");
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "UP", (cwWindow.w / 2 | 0) - 5, 3, 11, 11, "", 1, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "DN", (cwWindow.w / 2 | 0) - 5, cwWindow.h - 10, 11, 11, "", 2, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "LT", -1, (cwWindow.h / 2 | 0) - 5, 11, 11, "", 3, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "RT", cwWindow.w - 10, (cwWindow.h / 2 | 0) - 5, 11, 11, "", 4, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "Z+", cwWindow.w - 10, -1, 11, 11, "", 5, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "Z-", cwWindow.w - 19, -1, 11, 11, "", 6, 1);
            cwWindow.addButton$name$x$y$len$h$text$t$r(string + "OF", -1, -1, 11, 11, "", 8, 1);
            cwWindow.drawWindow();
        }

        updateAllProjectiveViewWindows() {
            this.orthogonalProjection(0);
            this.orthogonalProjection(1);
            this.orthogonalProjection(2);
        }

        updateAllViewWindows() {
            this.orthogonalProjection(0);
            this.orthogonalProjection(1);
            this.orthogonalProjection(2);
            this.perspectiveProjection$();
        }

        updateAllViewWindowsIncludingButtons() {
            this.updateViewWindowIncludingButtons(dsector.DSReference.gui.getWindow$byName("X"));
            this.updateViewWindowIncludingButtons(dsector.DSReference.gui.getWindow$byName("Y"));
            this.updateViewWindowIncludingButtons(dsector.DSReference.gui.getWindow$byName("Z"));
            this.perspectiveProjection$();
        }

        orthogonalProjection(n) {
            let cwWindow = null;
            switch (n) {
                case 2: {
                    cwWindow = dsector.DSReference.gui.getWindow$byName("Z");
                    break;
                }
                case 1: {
                    cwWindow = dsector.DSReference.gui.getWindow$byName("Y");
                    break;
                }
                case 0: {
                    cwWindow = dsector.DSReference.gui.getWindow$byName("X");
                    break;
                }
            }
            if (cwWindow == null) {
                return;
            }
            const preAntiAliasedContent = cwWindow.preAntiAliasedContent;
            const antiAliasedLevel = cwWindow.antiAliasedLevel;
            const n2 = cwWindow.w * antiAliasedLevel;
            const n3 = cwWindow.h * antiAliasedLevel;
            const n4 = (cwWindow.w * antiAliasedLevel / 2 | 0);
            const n5 = (cwWindow.h * antiAliasedLevel / 2 | 0);
            let n6 = 0.0;
            let n7 = 0.0;
            let n8 = 0.0;
            let n9 = 0.0;
            let n10 = 0.0;
            let n11 = 0.0;
            const n12 = Renderer.scale[n];
            cwWindow.clearPreAntiAliasedContent();
            const n18 = Renderer.offsetX[n];
            const n19 = Renderer.offsetY[n];
            const n20 = ((Math.fround(n18 * n12)) | 0);
            const n21 = ((Math.fround(n19 * n12)) | 0);
            let n22 = 0.0;
            let n23 = 0;
            let n24 = 0;
            let n25 = 0;
            switch (n) {
                case 2: {
                    n23 = CWSYSTEM.Environment.xAxisFlippedXYView_$LI$();
                    n24 = CWSYSTEM.Environment.yAxisFlippedXYView_$LI$();
                    n25 = CWSYSTEM.Environment.zAxisFlippedXYView_$LI$();
                    break;
                }
                case 1: {
                    n23 = CWSYSTEM.Environment.xAxisFlippedXZView_$LI$();
                    n24 = CWSYSTEM.Environment.yAxisFlippedXZView_$LI$();
                    n25 = CWSYSTEM.Environment.zAxisFlippedXZView_$LI$();
                    break;
                }
                case 0: {
                    n23 = CWSYSTEM.Environment.xAxisFlippedYZView_$LI$();
                    n24 = CWSYSTEM.Environment.yAxisFlippedYZView_$LI$();
                    n25 = CWSYSTEM.Environment.zAxisFlippedYZView_$LI$();
                    break;
                }
            }
            const model3DMatrix = dsector.DSReference.model3DMatrix;
            if (model3DMatrix == null) {
                return;
            }
            this.resetZBuffer(cwWindow.preAntiAliasedContent);
            for (let i = 0; i < 2; ++i) {
                const polygonIterator = new dsector.PolygonIterator(model3DMatrix,
                    dsector.PolygonIterator.ALL_POLYGON_GROUPS);
                while (true) {
                    const nextPolygonGroup = polygonIterator.nextPolygonGroup();
                    if (nextPolygonGroup == null) {
                        break;
                    }
                    for (let j = nextPolygonGroup.transposedRepresentations.length - 1; j >= -1; --j) {
                        if (j <= -1 || i !== 0) {
                            let directRepresentation;
                            if (j === -1) {
                                directRepresentation = nextPolygonGroup.directRepresentation;
                            } else {
                                directRepresentation = nextPolygonGroup.transposedRepresentations[j];
                            }
                            if (directRepresentation.visible() || directRepresentation.active) {
                                const vertex = new dsector.Vertex(0.0, 0.0, 0.0);
                                const vertex2 = new dsector.Vertex(0.0, 0.0, 0.0);
                                const vertex3 = new dsector.Vertex(0.0, 0.0, 0.0);
                                for (let k = 0; k < nextPolygonGroup.polygons.length; ++k) {
                                    const polygon = nextPolygonGroup.polygons[k];
                                    if (i !== 0) {
                                        vertex.x = polygon.v1.x;
                                        vertex.y = polygon.v1.y;
                                        vertex.z = polygon.v1.z;
                                        vertex2.x = polygon.v2.x;
                                        vertex2.y = polygon.v2.y;
                                        vertex2.z = polygon.v2.z;
                                        vertex3.x = polygon.v3.x;
                                        vertex3.y = polygon.v3.y;
                                        vertex3.z = polygon.v3.z;
                                        vertex.selected = polygon.v1.selected;
                                        vertex2.selected = polygon.v2.selected;
                                        vertex3.selected = polygon.v3.selected;
                                        if (j !== -1) {
                                            const transformationMatrix = directRepresentation.transformationMatrix;
                                            vertex.transform(transformationMatrix);
                                            vertex2.transform(transformationMatrix);
                                            vertex3.transform(transformationMatrix);
                                        }
                                        switch ((n)) {
                                            case 0: {/* DOUBLE_SIDED_POLYGONS */
                                                n6 = Math.fround((vertex.y * n24 + n18) * n12 + n4);
                                                n7 = Math.fround((vertex.z * n25 + n19) * n12 + n5);
                                                n8 = Math.fround((vertex2.y * n24 + n18) * n12 + n4);
                                                n9 = Math.fround((vertex2.z * n25 + n19) * n12 + n5);
                                                n10 = Math.fround((vertex3.y * n24 + n18) * n12 + n4);
                                                n11 = Math.fround((vertex3.z * n25 + n19) * n12 + n5);
                                                n22 = Math.fround(vertex.x + vertex2.x + vertex3.x);
                                                break;
                                            }
                                            case 1: {/* BACKFACE_CULLING */
                                                n6 = Math.fround((vertex.x * n23 + n18) * n12 + n4);
                                                n7 = Math.fround((vertex.z * n25 + n19) * n12 + n5);
                                                n8 = Math.fround((vertex2.x * n23 + n18) * n12 + n4);
                                                n9 = Math.fround((vertex2.z * n25 + n19) * n12 + n5);
                                                n10 = Math.fround((vertex3.x * n23 + n18) * n12 + n4);
                                                n11 = Math.fround((vertex3.z * n25 + n19) * n12 + n5);
                                                n22 = Math.fround(vertex.y + vertex2.y + vertex3.y);
                                                break;
                                            }
                                            case 2: {/* HILIGHT_REVERSE_SIDE */
                                                n6 = Math.fround((vertex.x * n23 + n18) * n12 + n4);
                                                n7 = Math.fround((vertex.y * n24 + n19) * n12 + n5);
                                                n8 = Math.fround((vertex2.x * n23 + n18) * n12 + n4);
                                                n9 = Math.fround((vertex2.y * n24 + n19) * n12 + n5);
                                                n10 = Math.fround((vertex3.x * n23 + n18) * n12 + n4);
                                                n11 = Math.fround((vertex3.y * n24 + n19) * n12 + n5);
                                                n22 = Math.fround(vertex.z + vertex2.z + vertex3.z);
                                                break;
                                            }
                                        }
                                        if (i === 0) {
                                            this.v.setColor$intCWColor(polygon.color);
                                            this.v.renderPolygon(preAntiAliasedContent, this.zBuffer, n22, n6, n7, n8,
                                                n9, n10, n11, true, n2, n3, null, null);
                                        }
                                        if (i === 1) {
                                            if (j === -1 && directRepresentation.active) {
                                                this.v.setColor$int(this.brightWhite);
                                            } else {
                                                this.v.setColor$int(this.dullBlue);
                                            }
                                            if ((n6 >= 0.0 || n8 >= 0.0) && (n7 >= 0.0 || n9 >= 0.0) &&
                                                (n6 <= n2 || n8 <= n2) && (n7 <= n3 || n9 <= n3)) {
                                                this.v.CWLine(preAntiAliasedContent, (n6 | 0), (n7 | 0),
                                                    (n8 | 0), (n9 | 0), true);
                                            }
                                            if ((n8 >= 0.0 || n10 >= 0.0) && (n9 >= 0.0 || n11 >= 0.0) &&
                                                (n8 <= n2 || n10 <= n2) && (n9 <= n3 || n11 <= n3)) {
                                                this.v.CWLine(preAntiAliasedContent, (n8 | 0), (n9 | 0),
                                                    (n10 | 0), (n11 | 0), true);
                                            }
                                            if ((n10 >= 0.0 || n6 >= 0.0) && (n11 >= 0.0 || n7 >= 0.0) &&
                                                (n10 <= n2 || n6 <= n2) && (n11 <= n3 || n7 <= n3)) {
                                                this.v.CWLine(preAntiAliasedContent, (n10 | 0), (n11 | 0),
                                                    (n6 | 0), (n7 | 0), true);
                                            }
                                            if (j !== -1) {
                                                if (directRepresentation.active) {
                                                    this.v.setColor$int(this.brightBlue);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n6 | 0) - 3, (n7 | 0) - 3, 8, 8);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n8 | 0) - 3, (n9 | 0) - 3, 8, 8);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n10 | 0) - 3, (n11 | 0) - 3, 8, 8);
                                                }
                                            } else {
                                                if (vertex.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n6 | 0) - 3, (n7 | 0) - 3, 8, 8);
                                                }
                                                if (vertex2.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n8 | 0) - 3, (n9 | 0) - 3, 8, 8);
                                                }
                                                if (vertex3.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (n10 | 0) - 3, (n11 | 0) - 3, 8, 8);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            const allSpecialPoints = dsector.SpecialPoint.getAllSpecialPoints(model3DMatrix);
            for (let index = 0; index < allSpecialPoints.length; ++index) {
                const specialPoint = allSpecialPoints[index];
                if (specialPoint.visibility$()) {
                    let n32 = -1;
                    let n33 = -1;
                    switch ((n)) {
                        case 2: {
                            n32 = n4 + n20 + n23 * ((Math.fround(n12 * specialPoint.x)) | 0);
                            n33 = n5 + n21 + n24 * ((Math.fround(n12 * specialPoint.y)) | 0);
                            break;
                        }
                        case 1: {
                            n32 = n4 + n20 + n23 * ((Math.fround(n12 * specialPoint.x)) | 0);
                            n33 = n5 + n21 + n25 * ((Math.fround(n12 * specialPoint.z)) | 0);
                            break;
                        }
                        case 0: {
                            n32 = n4 + n20 + n24 * ((Math.fround(n12 * specialPoint.y)) | 0);
                            n33 = n5 + n21 + n25 * ((Math.fround(n12 * specialPoint.z)) | 0);
                            break;
                        }
                    }
                    this.v.setColorVS$r$g$b$a(specialPoint.red, specialPoint.green, specialPoint.blue, 255);
                    this.v.CWLine(preAntiAliasedContent, n32 - 6, n33 - 6, n32 + 6, n33 + 6, true);
                    this.v.CWLine(preAntiAliasedContent, n32 + 6, n33 - 6, n32 - 6, n33 + 6, true);
                }
            }
            this.v.setColorVS$r$g$b$a(255, 180, 180, 255);
            cwWindow.renderingRequired = true;
        }

        perspectiveProjection$() {
            CWSYSTEM.Debug.println("perspectiveProjection");
        }

        perspectiveProjection$array$sd$window(array, screenData, cwWindow) {
            const scene = dsector.DSReference.scene;
            if (cwWindow == null && screenData == null) {
                return;
            }
            cwWindow.dSecSpecialEffects = ([]);
            let preAntiAliasedContent2;
            let width;
            let height;
            let n;
            let n2;
            if (screenData != null) {
                preAntiAliasedContent2 = screenData;
                width = screenData.width;
                height = screenData.height;
                n = (width / 2 | 0);
                n2 = (width / 2 | 0);
            } else {
                preAntiAliasedContent2 = cwWindow.preAntiAliasedContent;
                const antiAliasedLevel = cwWindow.antiAliasedLevel;
                width = cwWindow.w * antiAliasedLevel;
                height = cwWindow.h * antiAliasedLevel;
                n = (cwWindow.w * antiAliasedLevel / 2 | 0);
                n2 = (cwWindow.h * antiAliasedLevel / 2 | 0);
            }
            const n3 = 10.0;
            const vertex = new dsector.Vertex(0.0, 0.0, 0.0);
            const vertex2 = new dsector.Vertex(0.0, 0.0, 0.0);
            const vertex3 = new dsector.Vertex(0.0, 0.0, 0.0);
            if (preAntiAliasedContent2 !== screenData && array == null) {
                cwWindow.clearPreAntiAliasedContent();
            }
            let n4;
            if (width > height) {
                n4 = ((width * n3) / 15.0);
            } else {
                n4 = ((height * n3) / 15.0);
            }
            const n5 = (scene.lightManager.ambientRed / 100.0);
            const n6 = (scene.lightManager.ambientGreen / 100.0);
            const n7 = (scene.lightManager.ambientBlue / 100.0);
            const lightManager = scene.lightManager;
            lightManager.prepareLightsForRendering();
            if (scene === null) {
                dsector.DSReference.alertManager.messageQueued("Error with perspectiveProjection(..): The Scene at DSReference.scene was not created.");
                return;
            }
            const inverse = scene.cameraRotation.inverse();
            this.drawStarfield(preAntiAliasedContent2, cwWindow.antiAliasedLevel, inverse, n4, n, n2);
            this.resetZBuffer(preAntiAliasedContent2);
            const positionedModels = scene.positionedModels();
            for (let i = 0; i < /* size */ positionedModels.length; ++i) {
                const positionedModel = positionedModels[i];
                const model3DMatrix = positionedModel.model3DMatrix;
                let detailCategoryClosestToGivenAveragePolygonArea = 0;
                if (this.detailSensitiveRendering) {
                    detailCategoryClosestToGivenAveragePolygonArea = this.detailCategoryClosestToGivenAveragePolygonArea(model3DMatrix, this.getIdealPolygonAreaFromCameraLocationAndPositionedModel((Math.sqrt(Math.pow(dsector.DSReference.scene.cameraX - positionedModel.x, 2.0) + Math.pow(dsector.DSReference.scene.cameraY - positionedModel.y, 2.0) + Math.pow(dsector.DSReference.scene.cameraZ - positionedModel.z, 2.0))), width, height));
                }
                let n8 = 0.0;
                let x1 = 0;
                let y1 = 0;
                const polygonIterator = new dsector.PolygonIterator(model3DMatrix, dsector.PolygonIterator.VISIBLE_POLYGON_GROUPS);
                while (true) {
                    const nextPolygonGroup = polygonIterator.nextPolygonGroup();
                    if (nextPolygonGroup == null) {
                        break;
                    }
                    if (this.detailSensitiveRendering && dsector.Model3DMatrix.getDetailCategoryFromPolygonGroupName(nextPolygonGroup.name) !== detailCategoryClosestToGivenAveragePolygonArea) {
                        continue;
                    }
                    for (let j = -1; j < /* size */ nextPolygonGroup.transposedRepresentations.length; ++j) {
                        const matrix4f = new dsector.Matrix4f();
                        let directRepresentation;
                        if (j === -1) {
                            directRepresentation = nextPolygonGroup.directRepresentation;
                        } else {
                            directRepresentation = nextPolygonGroup.transposedRepresentations[j];
                            matrix4f.set(directRepresentation.transformationMatrix);
                        }
                        if (directRepresentation.visible()) {
                            matrix4f.preMultiply(positionedModel.rotation);
                            matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(((positionedModel.x - scene.cameraX)), ((positionedModel.y - scene.cameraY)), ((positionedModel.z - scene.cameraZ))));
                            matrix4f.preMultiply(inverse);
                            for (let k = 0; k < /* size */ nextPolygonGroup.polygons.length; ++k) {
                                const polygon = nextPolygonGroup.polygons[k];
                                vertex.set(polygon.v1);
                                vertex2.set(polygon.v2);
                                vertex3.set(polygon.v3);
                                vertex.transform(matrix4f);
                                vertex2.transform(matrix4f);
                                vertex3.transform(matrix4f);
                                if (vertex.z > 0.0 || vertex2.z > 0.0 || vertex3.z > 0.0) {
                                    if (vertex.z <= 0.0) {
                                        vertex.z = 1.0E-4;
                                    }
                                    if (vertex2.z <= 0.0) {
                                        vertex2.z = 1.0E-4;
                                    }
                                    if (vertex3.z <= 0.0) {
                                        vertex3.z = 1.0E-4;
                                    }
                                    const n11 = (vertex2.x - vertex.x);
                                    const n12 = (vertex2.y - vertex.y);
                                    const n13 = (vertex2.z - vertex.z);
                                    const n14 = (vertex3.x - vertex.x);
                                    const n15 = (vertex3.y - vertex.y);
                                    const n16 = (vertex3.z - vertex.z);
                                    const n17 = ((n12 * n16) - (n13 * n15));
                                    const n18 = ((n13 * n14) - (n11 * n16));
                                    const n19 = ((n11 * n15) - (n12 * n14));
                                    const n20 = (0.0 - vertex.x);
                                    const n21 = (0.0 - vertex.y);
                                    const n22 = (0.0 - vertex.z);
                                    const n23 = (Math.sqrt((((n17 * n17) + (n18 * n18)) + (n19 * n19))));
                                    const n24 = (n17 / n23);
                                    const n25 = (n18 / n23);
                                    const n26 = (n19 / n23);
                                    const n27 = (Math.sqrt((((n20 * n20) + (n21 * n21)) + (n22 * n22))));
                                    const n28 = (n20 / n27);
                                    const n29 = (n21 / n27);
                                    const n30 = (n22 / n27);
                                    const n31 = (((n24 * n28) + (n25 * n29)) + (n26 * n30));
                                    if (this.__renderingMode !== Renderer.BACKFACE_CULLING || n31 >= 0.0) {
                                        let n32 = 0.0;
                                        let n33 = 0.0;
                                        let n34 = 0.0;
                                        const b = false;
                                        const n35 = (1.0 + ((Math.pow(nextPolygonGroup.dispersedLightDirectionSensitivity, 3.0)) / 1000.0));
                                        const n36 = (4.0 - ((nextPolygonGroup.reflection * 4.0) / 100.0));
                                        const n37 = (1.0 + ((Math.pow(nextPolygonGroup.reflectedLightDirectionSensitivity, 3.0)) / 1000.0));
                                        const n38 = ((nextPolygonGroup.reflection * 4.0) / 100.0);
                                        if (b) {
                                            n32 = 1.0;
                                            n33 = 1.0;
                                            n34 = 1.0;
                                        } else {
                                            for (let l = 0; l < lightManager.numberOfLightsInRenderingScene; ++l) {
                                                const lmx = (lightManager.lightCameraSpaceX[l] - vertex.x);
                                                const lmy = (lightManager.lightCameraSpaceY[l] - vertex.y);
                                                const lmz = (lightManager.lightCameraSpaceZ[l] - vertex.z);
                                                const n42 = (Math.sqrt((((lmx * lmx) + (lmy * lmy)) + (lmz * lmz))));
                                                const lx = (lmx / n42);
                                                const ly = (lmy / n42);
                                                const lz = (lmz / n42);
                                                let n47;
                                                const n46 = n47 = (((n24 * lx) + (n25 * ly)) + (n26 * lz));
                                                if (n47 >= 0.0) {
                                                    let n48 = (((((((2.0 * n46) * n24) - lx)) * n28) + (((((2.0 * n46) * n25) - ly)) * n29)) + (((((2.0 * n46) * n26) - lz)) * n30));
                                                    if (n48 < 0.0) {
                                                        n48 = 0.0;
                                                    }
                                                    const n49 = ((((Math.pow(n47, n35)) * n35) * n36) + (((Math.pow(n48, n37)) * n37) * n38));
                                                    const n50 = (1000.0 / ((n42 * n42)));
                                                    n32 += ((n49 * Math.log((1.0 + (lightManager.lightRed[l] * n50)))));
                                                    n33 += ((n49 * Math.log((1.0 + (lightManager.lightGreen[l] * n50)))));
                                                    n34 += ((n49 * Math.log((1.0 + (lightManager.lightBlue[l] * n50)))));
                                                }
                                            }
                                        }
                                        let redN = ((polygon.color.red() * (n32 + n5)) | 0);
                                        let greenN = ((polygon.color.green() * (n33 + n6)) | 0);
                                        let blueN = ((polygon.color.blue() * (n34 + n7)) | 0);
                                        const alpha = polygon.color.alpha();
                                        const n54 = redN + greenN + blueN;
                                        if (n54 > n8) {
                                            n8 = n54;
                                            x1 = ((((((vertex.x / vertex.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + n)) | 0);
                                            y1 = ((((((vertex.y / vertex.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + n2)) | 0);
                                        }
                                        if (redN > 255) {
                                            if (blueN > 255) {
                                                if (greenN > 255) {
                                                    redN = 255;
                                                    greenN = 255;
                                                    blueN = 255;
                                                } else {
                                                    const n55 = (((1.0 + (((blueN / 256.0) * redN) / 256.0))) / 2.0);
                                                    blueN = 255;
                                                    redN = 255;
                                                    greenN *= (n55 | 0);
                                                    if (greenN > 255) {
                                                        greenN = 255;
                                                    }
                                                }
                                            } else {
                                                const n56 = (((1.0 + (redN / 256.0))) / 2.0);
                                                redN = 255;
                                                greenN *= (n56 | 0);
                                                if (greenN > 255) {
                                                    greenN = 255;
                                                }
                                                blueN *= (n56 | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                            if (greenN > 255) {
                                                const n57 = (((1.0 + (((greenN / 256.0) * redN) / 256.0))) / 2.0);
                                                greenN = 255;
                                                redN = 255;
                                                blueN *= (n57 | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                        } else if (greenN > 255) {
                                            if (blueN > 255) {
                                                const n58 = (((1.0 + (((greenN / 256.0) * blueN) / 256.0))) / 2.0);
                                                greenN = 255;
                                                blueN = 255;
                                                redN *= (n58 | 0);
                                                if (redN > 255) {
                                                    redN = 255;
                                                }
                                            } else {
                                                const n59 = (((1.0 + (greenN / 256.0))) / 2.0);
                                                greenN = 255;
                                                redN *= (n59 | 0);
                                                if (redN > 255) {
                                                    redN = 255;
                                                }
                                                blueN *= (n59 | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                        } else if (blueN > 255) {
                                            const n60 = (((1.0 + (blueN / 256.0))) / 2.0);
                                            blueN = 255;
                                            redN *= (n60 | 0);
                                            if (redN > 255) {
                                                redN = 255;
                                            }
                                            greenN *= (n60 | 0);
                                            if (greenN > 255) {
                                                greenN = 255;
                                            }
                                        }
                                        if (redN > 255 || greenN > 255 || blueN > 255) {
                                            dsector.DSReference.alertManager.message("Error with calculating color in rendering.");
                                        }
                                        if (this.__renderingMode === Renderer.HILIGHT_REVERSE_SIDE && n31 < 0.0) {
                                            this.v.setColorVS$r$g$b$a(0, 255, 0, alpha);
                                        } else {
                                            this.v.setColorVS$r$g$b$a(redN, greenN, blueN, alpha);
                                        }
                                        const n61 = ((((vertex.x / vertex.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + n);
                                        const n62 = ((((vertex.y / vertex.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + n2);
                                        const n63 = ((((vertex2.x / vertex2.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + n);
                                        const n64 = ((((vertex2.y / vertex2.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + n2);
                                        const n65 = ((((vertex3.x / vertex3.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + n);
                                        const n66 = ((((vertex3.y / vertex3.z) * n4) * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + n2);
                                        const n67 = ((vertex.x + vertex2.x) + vertex3.x);
                                        const n68 = ((vertex.y + vertex2.y) + vertex3.y);
                                        const n69 = ((vertex.z + vertex2.z) + vertex3.z);
                                        const n70 = (((n67 * n67) + (n68 * n68)) + (n69 * n69));
                                        if (array != null) {
                                            this.v.renderPolygon(preAntiAliasedContent2, this.zBuffer, n70, n61, n62, n63, n64, n65, n66, true, width, height, polygon, array);
                                        } else {
                                            this.v.renderPolygon(preAntiAliasedContent2, this.zBuffer, n70, n61, n62, n63, n64, n65, n66, true, width, height, null, null);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (n8 > 7500.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.mediumLensFlare(), (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.mediumLensFlare().width / 2 | 0), (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.mediumLensFlare().height / 2 | 0), ((Math.random()) * ((0.4 + (((n8 - 7500.0)) / 7500.0))))));
                } else if (n8 > 5000.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.smallLensFlare(), (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.smallLensFlare().width / 2 | 0), (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.smallLensFlare().height / 2 | 0), ((Math.random()) * ((0.2 + (((n8 - 5000.0)) / 5000.0))))));
                } else if (n8 > 3000.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.tinyLensFlare(), (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.tinyLensFlare().width / 2 | 0), (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.tinyLensFlare().height / 2 | 0), ((Math.random()) * ((0.0 + (((n8 - 3000.0)) / 3000.0))))));
                }
            }
            cwWindow.renderingRequired = true;
            if (screenData != null) {
                this.zBuffer = null;
            }
        }

        perspectiveProjection(polygonArr, screenData, cwWindow) {
            if (((polygonArr != null && polygonArr instanceof Array && (polygonArr.length === 0 ||
                    polygonArr[0] == null || polygonArr[0] instanceof Array)) || polygonArr === null) &&
                ((screenData != null && screenData instanceof CWSYSTEM.ScreenData) || screenData === null) &&
                ((cwWindow != null && cwWindow instanceof CWSYSTEM.CWWindow) || cwWindow === null)) {
                return this.perspectiveProjection$array$sd$window(polygonArr, screenData, cwWindow);
            } else if (polygonArr === undefined && screenData === undefined && cwWindow === undefined) {
                return this.perspectiveProjection$();
            } else
                throw new Error('invalid overload');
        }

        universeToScreenProjection(cwWindow, n, n2, n3) {
            const scene = dsector.DSReference.scene;
            const antiAliasedLevel = cwWindow.antiAliasedLevel;
            const n4 = cwWindow.w * antiAliasedLevel;
            const n5 = cwWindow.h * antiAliasedLevel;
            const n6 = (cwWindow.w * antiAliasedLevel / 2 | 0);
            const n7 = (cwWindow.h * antiAliasedLevel / 2 | 0);
            const n8 = 10.0;
            let n9;
            if (n4 > n5) {
                n9 = Math.fround((n4 * n8) / 15.0);
            } else {
                n9 = Math.fround((n5 * n8) / 15.0);
            }
            const matrix4f = new dsector.Matrix4f();
            matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(Math.fround((-scene.cameraX)), Math.fround((-scene.cameraY)), Math.fround((-scene.cameraZ))));
            matrix4f.preMultiply(scene.cameraRotation.inverse());
            const vertex = new dsector.Vertex(n, n2, n3);
            vertex.transform(matrix4f);
            if (vertex.z <= 0.0) {
                return null;
            }
            return new dsector.Vertex2D(
                Math.fround(vertex.x / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$() + n6),
                Math.fround(vertex.y / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$() + n7));
        }

        drawStarfield(screenData, n, matrix4f, n2, n3, n4) {
            const vectorInR3 = new dsector.VectorInR3(0.0, 0.0, 0.0);
            let n5 = 1.0;
            const n6 = (screenData.width / 2 | 0);
            if (n3 > n4) {
                if (n3 < n6) {
                    n5 *= Math.fround(n3 / n6);
                }
            } else if (n4 < n6) {
                n5 *= Math.fround(n4 / n6);
            }
            for (let i = 0; i < this.starfield.numberOfStars; ++i) {
                vectorInR3.x = this.starfield.star[i].x;
                vectorInR3.y = this.starfield.star[i].y;
                vectorInR3.z = this.starfield.star[i].z;
                vectorInR3.transform(matrix4f);
                if (vectorInR3.z > 0.0) {
                    const n7 = (Math.pow(i % 5, 2.8) | 0);
                    const n8 = Math.fround((vectorInR3.x / vectorInR3.z) * n2 + n3);
                    const n9 = Math.fround((vectorInR3.y / vectorInR3.z) * n2 + n4);
                    this.v.setColorVS$r$g$b$a((((n7 + Math.random() * 60.0) * n5) | 0),
                        (((n7 + Math.random() * 60.0) * n5) | 0), (((n7 + Math.random() * 60.0) * n5) | 0), 255);
                    if (n === 1) {
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0));
                        if (this.starfield.twinkle[i] && Math.random() > 0.9) {
                            this.v.setColorVS$r$g$b$a(((((n7 / 3 | 0) + Math.random() * 30.0) * n5) | 0),
                                ((((n7 / 3 | 0) + Math.random() * 30.0) * n5) | 0),
                                ((((n7 / 3 | 0) + Math.random() * 30.0) * n5) | 0), 255);
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) + 1, (n9 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) + 1);
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) - 1, (n9 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) - 1);
                        }
                    } else {
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) + 1, (n9 | 0));
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) - 1, (n9 | 0));
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) - 1);
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) + 1, (n9 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) + 1, (n9 | 0) - 1);
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) - 1, (n9 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) - 1, (n9 | 0) - 1);
                        if (Math.random() > 0.9) {
                            this.v.setColorVS$r$g$b$a(((((n7 / 3 | 0) + Math.random() * 60.0) * n5) | 0), ((((n7 / 3 | 0) + Math.random() * 60.0) * n5) | 0), ((((n7 / 3 | 0) + Math.random() * 60.0) * n5) | 0), 255);
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) + 2, (n9 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) + 2);
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0) - 2, (n9 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (n8 | 0), (n9 | 0) - 2);
                        }
                    }
                }
            }
        }

        panCameraDirectly(n) {
            const unitVectorToTheDirectRight =
                dsector.Navigation.unitVectorToTheDirectRight(dsector.DSReference.scene);
            unitVectorToTheDirectRight.multiply(n);
            const scene = dsector.DSReference.scene;
            scene.cameraX += unitVectorToTheDirectRight.x;
            const scene2 = dsector.DSReference.scene;
            scene2.cameraY += unitVectorToTheDirectRight.y;
            const scene3 = dsector.DSReference.scene;
            scene3.cameraZ += unitVectorToTheDirectRight.z;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        moveCameraDirectly(n) {
            const unitVectorInDirectionOfOrientation =
                dsector.Navigation.unitVectorInDirectionOfOrientation(dsector.DSReference.scene);
            unitVectorInDirectionOfOrientation.multiply(n);
            const scene = dsector.DSReference.scene;
            scene.cameraX += unitVectorInDirectionOfOrientation.x;
            const scene2 = dsector.DSReference.scene;
            scene2.cameraY += unitVectorInDirectionOfOrientation.y;
            const scene3 = dsector.DSReference.scene;
            scene3.cameraZ += unitVectorInDirectionOfOrientation.z;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        changeCameraHueDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ$float(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        changeCameraHue(n, b) {
            this.changeCameraHueDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        changeCameraVertDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateX$float(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        changeCameraVert(n, b) {
            this.changeCameraVertDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        moveCameraPivotDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY$float(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        moveCameraPivot(n, b) {
            this.moveCameraPivotDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        flipCamera() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY$float(3.1415927);
            dsector.DSReference.scene.cameraRotation.preMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        setCameraPositionX(s) {
            let int1;
            try {
                int1 = parseInt(s);
            } catch (ex) {
                dsector.DSReference.alertManager.messageQueued("Invalid X value.");
                return;
            }
            dsector.DSReference.scene.cameraX = int1;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        setCameraPositionY(s) {
            let int1;
            try {
                int1 = parseInt(s);
            } catch (ex) {
                dsector.DSReference.alertManager.messageQueued("Invalid Y value.");
                return;
            }
            dsector.DSReference.scene.cameraY = int1;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        setCameraPositionZ(s) {
            let int1;
            try {
                int1 = parseInt(s);
            } catch (ex) {
                dsector.DSReference.alertManager.messageQueued("Invalid Z value.");
                return;
            }
            dsector.DSReference.scene.cameraZ = int1;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        renderingMode$() {
            return this.__renderingMode;
        }

        renderingMode$int(renderingMode) {
            this.__renderingMode = renderingMode;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        renderingMode$java_lang_Integer(n) {
            this.renderingMode$int((n | 0));
        }

        renderingMode(n) {
            if (((typeof n === 'number') || n === null)) {
                return this.renderingMode$java_lang_Integer(n);
            } else if ((typeof n === 'number') || n === null) {
                return this.renderingMode$int(n);
            } else if (n === undefined) {
                return this.renderingMode$();
            } else
                throw new Error('invalid overload');
        }

        usesDoubleSidedPolygons() {
            return this.__renderingMode === Renderer.DOUBLE_SIDED_POLYGONS;
        }

        usesBackfaceCulling() {
            return this.__renderingMode === Renderer.BACKFACE_CULLING;
        }

        usesHiglightReverseSide() {
            return this.__renderingMode === Renderer.HILIGHT_REVERSE_SIDE;
        }

        /** @private */
        resetZBuffer(screenData) {
            const width = screenData.width;
            const height = screenData.height;
            if (this.zBuffer == null || (this.zBuffer != null &&
                (this.zBuffer.length < height || this.zBuffer[0].length < width))) {
                this.zBuffer = (function (dims) {
                    let allocate = function (dims) {
                        if (dims.length === 0) {
                            return 0;
                        } else {
                            let array = [];
                            for (let i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        }
                    };
                    return allocate(dims);
                })([height, width]);
            }
            const width2 = screenData.width;
            let height2 = screenData.height;
            for (let i = 0; i < height2; ++i) {
                CWSYSTEM.CWUtils.fillArray(this.zBuffer[i], 0, width2, 1.0E30);
            }
        }

        setDetailSensitiveRendering(detailSensitiveRendering) {
            this.detailSensitiveRendering = detailSensitiveRendering;
        }

        getIdealPolygonAreaFromCameraLocationAndPositionedModel(n, n2, n3) {
            if (n2 > n3) {
                return Math.fround(Math.pow((1000.0 / n2 * n / 100.0), 2.0));
            }
            return Math.fround(Math.pow((1000.0 / n3 * n / 100.0), 2.0));
        }

        detailCategoryClosestToGivenAveragePolygonArea(model3DMatrix, n) {
            let n2 = 0;
            let n3 = 3.4028235E38;
            for (let i = 0; i <= 5; ++i) {
                const averagePolygonAreaWhenModelLoaded = model3DMatrix.averagePolygonAreaWhenModelLoaded(i);
                if (averagePolygonAreaWhenModelLoaded >= 0.0) {
                    const abs = Math.abs(Math.fround(averagePolygonAreaWhenModelLoaded - n));
                    if (abs < n3) {
                        n3 = abs;
                        n2 = i;
                    }
                }
            }
            return n2;
        }
    }

    Renderer.DOUBLE_SIDED_POLYGONS = 0;
    Renderer.BACKFACE_CULLING = 1;
    Renderer.HILIGHT_REVERSE_SIDE = 2;
    Renderer.scale = null;
    Renderer.offsetX = null;
    Renderer.offsetY = null;
    Renderer.__tinyLensFlare = null;
    Renderer.__smallLensFlare = null;
    Renderer.__mediumLensFlare = null;
    Renderer.__shieldGraphic = null;
    dsector.Renderer = Renderer;
    Renderer["__class"] = "dsector.Renderer";
})(dsector || (dsector = {}));
