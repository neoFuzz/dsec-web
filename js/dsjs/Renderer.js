/* Re-written from java */
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
            const aaLW = cwWindow.w * antiAliasedLevel;
            const aaLH = cwWindow.h * antiAliasedLevel;
            const halfAALW = (cwWindow.w * antiAliasedLevel / 2 | 0);
            const halfAALH = (cwWindow.h * antiAliasedLevel / 2 | 0);
            let vertexYc = 0.0;
            let vertexZc = 0.0;
            let vertex2Yc = 0.0;
            let vertex2Zc = 0.0;
            let vertex3Yc = 0.0;
            let vertex3Zc = 0.0;
            const rScale = Renderer.scale[n];
            cwWindow.clearPreAntiAliasedContent();
            const offsetX = Renderer.offsetX[n];
            const offsetY = Renderer.offsetY[n];
            const oXScale = ((Math.fround(offsetX * rScale)) | 0);
            const oYScale = ((Math.fround(offsetY * rScale)) | 0);
            let vertexX = 0.0;
            let xAxisView = 0;
            let yAxisView = 0;
            let zAxisView = 0;
            switch (n) {
                case 2: {
                    xAxisView = CWSYSTEM.Environment.xAxisFlippedXYView_$LI$();
                    yAxisView = CWSYSTEM.Environment.yAxisFlippedXYView_$LI$();
                    zAxisView = CWSYSTEM.Environment.zAxisFlippedXYView_$LI$();
                    break;
                }
                case 1: {
                    xAxisView = CWSYSTEM.Environment.xAxisFlippedXZView_$LI$();
                    yAxisView = CWSYSTEM.Environment.yAxisFlippedXZView_$LI$();
                    zAxisView = CWSYSTEM.Environment.zAxisFlippedXZView_$LI$();
                    break;
                }
                case 0: {
                    xAxisView = CWSYSTEM.Environment.xAxisFlippedYZView_$LI$();
                    yAxisView = CWSYSTEM.Environment.yAxisFlippedYZView_$LI$();
                    zAxisView = CWSYSTEM.Environment.zAxisFlippedYZView_$LI$();
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
                                                vertexYc = Math.fround(
                                                    (vertex.y * yAxisView + offsetX) * rScale + halfAALW);
                                                vertexZc = Math.fround(
                                                    (vertex.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertex2Yc = Math.fround(
                                                    (vertex2.y * yAxisView + offsetX) * rScale + halfAALW);
                                                vertex2Zc = Math.fround(
                                                    (vertex2.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertex3Yc = Math.fround(
                                                    (vertex3.y * yAxisView + offsetX) * rScale + halfAALW);
                                                vertex3Zc = Math.fround(
                                                    (vertex3.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertexX = Math.fround(vertex.x + vertex2.x + vertex3.x);
                                                break;
                                            }
                                            case 1: {/* BACKFACE_CULLING */
                                                vertexYc = Math.fround(
                                                    (vertex.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertexZc = Math.fround(
                                                    (vertex.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertex2Yc = Math.fround(
                                                    (vertex2.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertex2Zc = Math.fround(
                                                    (vertex2.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertex3Yc = Math.fround(
                                                    (vertex3.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertex3Zc = Math.fround(
                                                    (vertex3.z * zAxisView + offsetY) * rScale + halfAALH);
                                                vertexX = Math.fround(vertex.y + vertex2.y + vertex3.y);
                                                break;
                                            }
                                            case 2: {/* HILIGHT_REVERSE_SIDE */
                                                vertexYc = Math.fround(
                                                    (vertex.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertexZc = Math.fround(
                                                    (vertex.y * yAxisView + offsetY) * rScale + halfAALH);
                                                vertex2Yc = Math.fround(
                                                    (vertex2.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertex2Zc = Math.fround(
                                                    (vertex2.y * yAxisView + offsetY) * rScale + halfAALH);
                                                vertex3Yc = Math.fround(
                                                    (vertex3.x * xAxisView + offsetX) * rScale + halfAALW);
                                                vertex3Zc = Math.fround(
                                                    (vertex3.y * yAxisView + offsetY) * rScale + halfAALH);
                                                vertexX = Math.fround(vertex.z + vertex2.z + vertex3.z);
                                                break;
                                            }
                                        }
                                        if (i === 0) {
                                            this.v.setColor$intCWColor(polygon.color);
                                            this.v.renderPolygon(preAntiAliasedContent, this.zBuffer,
                                                vertexX, vertexYc, vertexZc, vertex2Yc,
                                                vertex2Zc, vertex3Yc, vertex3Zc, true, aaLW, aaLH,
                                                null, null);
                                        }
                                        if (i === 1) {
                                            if (j === -1 && directRepresentation.active) {
                                                this.v.setColor$int(this.brightWhite);
                                            } else {
                                                this.v.setColor$int(this.dullBlue);
                                            }
                                            if ((vertexYc >= 0.0 || vertex2Yc >= 0.0) && (vertexZc >= 0.0 || vertex2Zc >= 0.0) &&
                                                (vertexYc <= aaLW || vertex2Yc <= aaLW) && (vertexZc <= aaLH || vertex2Zc <= aaLH)) {
                                                this.v.CWLine(preAntiAliasedContent, (vertexYc | 0), (vertexZc | 0),
                                                    (vertex2Yc | 0), (vertex2Zc | 0), true);
                                            }
                                            if ((vertex2Yc >= 0.0 || vertex3Yc >= 0.0) && (vertex2Zc >= 0.0 || vertex3Zc >= 0.0) &&
                                                (vertex2Yc <= aaLW || vertex3Yc <= aaLW) && (vertex2Zc <= aaLH || vertex3Zc <= aaLH)) {
                                                this.v.CWLine(preAntiAliasedContent, (vertex2Yc | 0), (vertex2Zc | 0),
                                                    (vertex3Yc | 0), (vertex3Zc | 0), true);
                                            }
                                            if ((vertex3Yc >= 0.0 || vertexYc >= 0.0) && (vertex3Zc >= 0.0 || vertexZc >= 0.0) &&
                                                (vertex3Yc <= aaLW || vertexYc <= aaLW) && (vertex3Zc <= aaLH || vertexZc <= aaLH)) {
                                                this.v.CWLine(preAntiAliasedContent, (vertex3Yc | 0), (vertex3Zc | 0),
                                                    (vertexYc | 0), (vertexZc | 0), true);
                                            }
                                            if (j !== -1) {
                                                if (directRepresentation.active) {
                                                    this.v.setColor$int(this.brightBlue);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertexYc | 0) - 3, (vertexZc | 0) - 3, 8, 8);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertex2Yc | 0) - 3, (vertex2Zc | 0) - 3, 8, 8);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertex3Yc | 0) - 3, (vertex3Zc | 0) - 3, 8, 8);
                                                }
                                            } else {
                                                if (vertex.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertexYc | 0) - 3, (vertexZc | 0) - 3, 8, 8);
                                                }
                                                if (vertex2.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertex2Yc | 0) - 3, (vertex2Zc | 0) - 3, 8, 8);
                                                }
                                                if (vertex3.selected) {
                                                    this.v.setColor$int(this.brightGreen);
                                                    this.v.CWDrawRectangleWithCropping(preAntiAliasedContent,
                                                        (vertex3Yc | 0) - 3, (vertex3Zc | 0) - 3, 8, 8);
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
                    let x1 = -1;
                    let y1 = -1;
                    switch ((n)) {
                        case 2: {
                            x1 = halfAALW + oXScale + xAxisView * ((Math.fround(rScale * specialPoint.x)) | 0);
                            y1 = halfAALH + oYScale + yAxisView * ((Math.fround(rScale * specialPoint.y)) | 0);
                            break;
                        }
                        case 1: {
                            x1 = halfAALW + oXScale + xAxisView * ((Math.fround(rScale * specialPoint.x)) | 0);
                            y1 = halfAALH + oYScale + zAxisView * ((Math.fround(rScale * specialPoint.z)) | 0);
                            break;
                        }
                        case 0: {
                            x1 = halfAALW + oXScale + yAxisView * ((Math.fround(rScale * specialPoint.y)) | 0);
                            y1 = halfAALH + oYScale + zAxisView * ((Math.fround(rScale * specialPoint.z)) | 0);
                            break;
                        }
                    }
                    this.v.setColorVS$r$g$b$a(specialPoint.red, specialPoint.green, specialPoint.blue, 255);
                    this.v.CWLine(preAntiAliasedContent, x1 - 6, y1 - 6, x1 + 6, y1 + 6, true);
                    this.v.CWLine(preAntiAliasedContent, x1 + 6, y1 - 6, x1 - 6, y1 + 6, true);
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
            let centerX;
            let centerY;
            if (screenData != null) {
                preAntiAliasedContent2 = screenData;
                width = screenData.width;
                height = screenData.height;
                centerX = (width / 2 | 0);
                centerY = (width / 2 | 0);
            } else {
                preAntiAliasedContent2 = cwWindow.preAntiAliasedContent;
                const antiAliasedLevel = cwWindow.antiAliasedLevel;
                width = cwWindow.w * antiAliasedLevel;
                height = cwWindow.h * antiAliasedLevel;
                centerX = (cwWindow.w * antiAliasedLevel / 2 | 0);
                centerY = (cwWindow.h * antiAliasedLevel / 2 | 0);
            }
            const oFactor = 10.0;
            const vertex = new dsector.Vertex(0.0, 0.0, 0.0);
            const vertex2 = new dsector.Vertex(0.0, 0.0, 0.0);
            const vertex3 = new dsector.Vertex(0.0, 0.0, 0.0);
            if (preAntiAliasedContent2 !== screenData && array == null) {
                cwWindow.clearPreAntiAliasedContent();
            }
            let starCount;
            if (width > height) {
                starCount = ((width * oFactor) / 15.0);
            } else {
                starCount = ((height * oFactor) / 15.0);
            }
            const ambientRed = (scene.lightManager.ambientRed / 100.0);
            const ambientGreen = (scene.lightManager.ambientGreen / 100.0);
            const ambientBlue = (scene.lightManager.ambientBlue / 100.0);
            const lightManager = scene.lightManager;
            lightManager.prepareLightsForRendering();
            if (scene === null) {
                dsector.DSReference.alertManager.messageQueued(
                    "Error with perspectiveProjection(..): The Scene at DSReference.scene was not created.");
                return;
            }
            const inverse = scene.cameraRotation.inverse();
            this.drawStarfield(preAntiAliasedContent2, cwWindow.antiAliasedLevel, inverse, starCount, centerX, centerY);
            this.resetZBuffer(preAntiAliasedContent2);
            const positionedModels = scene.positionedModels();
            for (let i = 0; i < positionedModels.length; ++i) {
                const positionedModel = positionedModels[i];
                const model3DMatrix = positionedModel.model3DMatrix;
                let detailCategoryClosestToGivenAveragePolygonArea = 0;
                if (this.detailSensitiveRendering) {
                    detailCategoryClosestToGivenAveragePolygonArea = this.detailCategoryClosestToGivenAveragePolygonArea(
                        model3DMatrix, this.getIdealPolygonAreaFromCameraLocationAndPositionedModel(
                            (Math.sqrt(
                                    Math.pow(dsector.DSReference.scene.cameraX - positionedModel.x, 2.0) +
                                    Math.pow(dsector.DSReference.scene.cameraY - positionedModel.y, 2.0) +
                                    Math.pow(dsector.DSReference.scene.cameraZ - positionedModel.z, 2.0))
                            ), width, height));
                }
                let ambiance = 0.0;
                let x1 = 0;
                let y1 = 0;
                const polygonIterator = new dsector.PolygonIterator(
                    model3DMatrix, dsector.PolygonIterator.VISIBLE_POLYGON_GROUPS);
                while (true) {
                    const nextPolygonGroup = polygonIterator.nextPolygonGroup();
                    if (nextPolygonGroup == null) {
                        break;
                    }
                    if (this.detailSensitiveRendering &&
                        dsector.Model3DMatrix.getDetailCategoryFromPolygonGroupName(nextPolygonGroup.name) !==
                        detailCategoryClosestToGivenAveragePolygonArea) {
                        continue;
                    }
                    for (let j = -1; j < nextPolygonGroup.transposedRepresentations.length; ++j) {
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
                            matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(
                                (positionedModel.x - scene.cameraX),
                                (positionedModel.y - scene.cameraY),
                                (positionedModel.z - scene.cameraZ)));
                            matrix4f.preMultiply(inverse);
                            for (let k = 0; k < nextPolygonGroup.polygons.length; ++k) {
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
                                    const dx1 = (vertex2.x - vertex.x);
                                    const dy1 = (vertex2.y - vertex.y);
                                    const dz1 = (vertex2.z - vertex.z);
                                    const dx2 = (vertex3.x - vertex.x);
                                    const dy2 = (vertex3.y - vertex.y);
                                    const dz2 = (vertex3.z - vertex.z);
                                    const crossProductX = ((dy1 * dz2) - (dz1 * dy2));
                                    const crossProductY = ((dz1 * dx2) - (dx1 * dz2));
                                    const crossProductZ = ((dx1 * dy2) - (dy1 * dx2));
                                    const negVertexX = (0.0 - vertex.x);
                                    const negVertexY = (0.0 - vertex.y);
                                    const negVertexZ = (0.0 - vertex.z);
                                    const crossProductMagnitude = (Math.sqrt((((crossProductX * crossProductX) +
                                        (crossProductY * crossProductY)) + (crossProductZ * crossProductZ))));
                                    const normalizedCrossProductX = (crossProductX / crossProductMagnitude);
                                    const normalizedCrossProductY = (crossProductY / crossProductMagnitude);
                                    const normalizedCrossProductZ = (crossProductZ / crossProductMagnitude);
                                    const vertexMagnitude = (Math.sqrt((((negVertexX * negVertexX) +
                                        (negVertexY * negVertexY)) + (negVertexZ * negVertexZ))));
                                    const normalizedNegVertexX = (negVertexX / vertexMagnitude);
                                    const normalizedNegVertexY = (negVertexY / vertexMagnitude);
                                    const normalizedNegVertexZ = (negVertexZ / vertexMagnitude);
                                    const dotProduct = (((normalizedCrossProductX * normalizedNegVertexX) +
                                        (normalizedCrossProductY * normalizedNegVertexY)) + (normalizedCrossProductZ *
                                        normalizedNegVertexZ));
                                    if (this.__renderingMode !== Renderer.BACKFACE_CULLING || dotProduct >= 0.0) {
                                        let rLevel = 0.0;
                                        let gLevel = 0.0;
                                        let bLevel = 0.0;
                                        const b = false;
                                        const dLDS =
                                            (1.0 + ((Math.pow(nextPolygonGroup.dispersedLightDirectionSensitivity,
                                                3.0)) / 1000.0));
                                        const reflectFactor = (4.0 - ((nextPolygonGroup.reflection * 4.0) / 100.0));
                                        const rLDS =
                                            (1.0 + ((Math.pow(nextPolygonGroup.reflectedLightDirectionSensitivity,
                                                3.0)) / 1000.0));
                                        const polyReflection = ((nextPolygonGroup.reflection * 4.0) / 100.0);
                                        if (b) {
                                            rLevel = 1.0;
                                            gLevel = 1.0;
                                            bLevel = 1.0;
                                        } else {
                                            for (let l = 0; l < lightManager.numberOfLightsInRenderingScene; ++l) {
                                                const lmx = (lightManager.lightCameraSpaceX[l] - vertex.x);
                                                const lmy = (lightManager.lightCameraSpaceY[l] - vertex.y);
                                                const lmz = (lightManager.lightCameraSpaceZ[l] - vertex.z);
                                                const lmSumSq = (Math.sqrt((((lmx * lmx) + (lmy * lmy)) + (lmz * lmz))));
                                                const lx = (lmx / lmSumSq);
                                                const ly = (lmy / lmSumSq);
                                                const lz = (lmz / lmSumSq);
                                                let normalizedCrossProduct;
                                                const normalized = normalizedCrossProduct = (
                                                    ((normalizedCrossProductX * lx) + (normalizedCrossProductY * ly)) +
                                                    (normalizedCrossProductZ * lz));
                                                if (normalizedCrossProduct >= 0.0) {
                                                    const doubleNormalized = 2.0 * normalized;
                                                    const doubleNormalizedCrossProductX =
                                                        doubleNormalized * normalizedCrossProductX;
                                                    const doubleNormalizedCrossProductY =
                                                        doubleNormalized * normalizedCrossProductY;
                                                    const doubleNormalizedCrossProductZ =
                                                        doubleNormalized * normalizedCrossProductZ;
                                                    let perspectiveDistance =
                                                        ((doubleNormalizedCrossProductX - lx) * normalizedNegVertexX) +
                                                        ((doubleNormalizedCrossProductY - ly) * normalizedNegVertexY) +
                                                        ((doubleNormalizedCrossProductZ - lz) * normalizedNegVertexZ);
                                                    if (perspectiveDistance < 0.0) {
                                                        perspectiveDistance = 0.0;
                                                    }
                                                    const reflectValue =
                                                        ((Math.pow(normalizedCrossProduct, dLDS) * dLDS) * reflectFactor) +
                                                        ((Math.pow(perspectiveDistance, rLDS) * rLDS) * polyReflection);
                                                    const lightDim = 1000.0 / (lmSumSq * lmSumSq);
                                                    rLevel += reflectValue * Math.log(
                                                        1.0 + (lightManager.lightRed[l] * lightDim));
                                                    gLevel += reflectValue * Math.log(
                                                        1.0 + (lightManager.lightGreen[l] * lightDim));
                                                    bLevel += reflectValue * Math.log(
                                                        1.0 + (lightManager.lightBlue[l] * lightDim));
                                                }
                                            }
                                        }
                                        let redN = ((polygon.color.red() * (rLevel + ambientRed)) | 0);
                                        let greenN = ((polygon.color.green() * (gLevel + ambientGreen)) | 0);
                                        let blueN = ((polygon.color.blue() * (bLevel + ambientBlue)) | 0);
                                        const alpha = polygon.color.alpha();
                                        const colorFactor = redN + greenN + blueN;
                                        if (colorFactor > ambiance) {
                                            ambiance = colorFactor;
                                            x1 = (((((vertex.x / vertex.z) * starCount) *
                                                CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + centerX) | 0);
                                            y1 = (((((vertex.y / vertex.z) * starCount) *
                                                CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + centerY) | 0);
                                        }
                                        if (redN > 255) {
                                            if (blueN > 255) {
                                                if (greenN > 255) {
                                                    redN = 255;
                                                    greenN = 255;
                                                    blueN = 255;
                                                } else {
                                                    const greenIntensityFactor =
                                                        (((1.0 + (((blueN / 256.0) * redN) / 256.0))) / 2.0);
                                                    blueN = 255;
                                                    redN = 255;
                                                    greenN *= (greenIntensityFactor | 0);
                                                    if (greenN > 255) {
                                                        greenN = 255;
                                                    }
                                                }
                                            } else {
                                                const redIntensityFactor = (((1.0 + (redN / 256.0))) / 2.0);
                                                redN = 255;
                                                greenN *= (redIntensityFactor | 0);
                                                if (greenN > 255) {
                                                    greenN = 255;
                                                }
                                                blueN *= (redIntensityFactor | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                            if (greenN > 255) {
                                                const greenIntensityFactor =
                                                    (((1.0 + (((greenN / 256.0) * redN) / 256.0))) / 2.0);
                                                greenN = 255;
                                                redN = 255;
                                                blueN *= (greenIntensityFactor | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                        } else if (greenN > 255) {
                                            if (blueN > 255) {
                                                const greenIntensityFactor =
                                                    (((1.0 + (((greenN / 256.0) * blueN) / 256.0))) / 2.0);
                                                greenN = 255;
                                                blueN = 255;
                                                redN *= (greenIntensityFactor | 0);
                                                if (redN > 255) {
                                                    redN = 255;
                                                }
                                            } else {
                                                const greenIntensityFactor = (((1.0 + (greenN / 256.0))) / 2.0);
                                                greenN = 255;
                                                redN *= (greenIntensityFactor | 0);
                                                if (redN > 255) {
                                                    redN = 255;
                                                }
                                                blueN *= (greenIntensityFactor | 0);
                                                if (blueN > 255) {
                                                    blueN = 255;
                                                }
                                            }
                                        } else if (blueN > 255) {
                                            const blueIntensityFactor = (((1.0 + (blueN / 256.0))) / 2.0);
                                            blueN = 255;
                                            redN *= (blueIntensityFactor | 0);
                                            if (redN > 255) {
                                                redN = 255;
                                            }
                                            greenN *= (blueIntensityFactor | 0);
                                            if (greenN > 255) {
                                                greenN = 255;
                                            }
                                        }
                                        if (redN > 255 || greenN > 255 || blueN > 255) {
                                            dsector.DSReference.alertManager.message("Error with calculating color in rendering.");
                                        }
                                        if (this.__renderingMode === Renderer.HILIGHT_REVERSE_SIDE && dotProduct < 0.0) {
                                            this.v.setColorVS$r$g$b$a(0, 255, 0, alpha);
                                        } else {
                                            this.v.setColorVS$r$g$b$a(redN, greenN, blueN, alpha);
                                        }
                                        const transformedX1 = ((((vertex.x / vertex.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + centerX);
                                        const transformedY1 = ((((vertex.y / vertex.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + centerY);
                                        const transformedX2 = ((((vertex2.x / vertex2.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + centerX);
                                        const transformedY2 = ((((vertex2.y / vertex2.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + centerY);
                                        const transformedX3 = ((((vertex3.x / vertex3.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipX_$LI$()) + centerX);
                                        const transformedY3 = ((((vertex3.y / vertex3.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY_$LI$()) + centerY);
                                        const sumX = ((vertex.x + vertex2.x) + vertex3.x);
                                        const sumY = ((vertex.y + vertex2.y) + vertex3.y);
                                        const sumZ = ((vertex.z + vertex2.z) + vertex3.z);
                                        const squaredSum = (((sumX * sumX) + (sumY * sumY)) + (sumZ * sumZ));
                                        if (array != null) {
                                            this.v.renderPolygon(preAntiAliasedContent2, this.zBuffer, squaredSum,
                                                transformedX1, transformedY1, transformedX2, transformedY2,
                                                transformedX3, transformedY3, true, width, height, polygon, array);
                                        } else {
                                            this.v.renderPolygon(preAntiAliasedContent2, this.zBuffer, squaredSum,
                                                transformedX1, transformedY1, transformedX2, transformedY2,
                                                transformedX3, transformedY3, true, width, height, null, null);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (ambiance > 7500.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.mediumLensFlare(),
                        (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.mediumLensFlare().width / 2 | 0),
                        (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.mediumLensFlare().height / 2 | 0),
                        ((Math.random()) * ((0.4 + (((ambiance - 7500.0)) / 7500.0))))));
                } else if (ambiance > 5000.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.smallLensFlare(),
                        (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.smallLensFlare().width / 2 | 0),
                        (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.smallLensFlare().height / 2 | 0),
                        ((Math.random()) * ((0.2 + (((ambiance - 5000.0)) / 5000.0))))));
                } else if (ambiance > 3000.0) {
                    cwWindow.dSecSpecialEffects.push(new dsector.DSecSpecialEffect(Renderer.tinyLensFlare(),
                        (x1 / cwWindow.antiAliasedLevel | 0) - (Renderer.tinyLensFlare().width / 2 | 0),
                        (y1 / cwWindow.antiAliasedLevel | 0) - (Renderer.tinyLensFlare().height / 2 | 0),
                        ((Math.random()) * ((0.0 + (((ambiance - 3000.0)) / 3000.0))))));
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

        /**
         * Projects a 3D point from the universe onto the screen coordinates.
         *
         * @param {CWWindow} cwWindow - The CW window object containing width, height, and anti-aliasing level.
         * @param {number} x - The x-coordinate of the 3D point in the universe.
         * @param {number} y - The y-coordinate of the 3D point in the universe.
         * @param {number} z - The z-coordinate of the 3D point in the universe.
         * @returns {Vertex2D | null} - The projected 2D point on the screen, or null if the point is behind the camera.
         */
        universeToScreenProjection(cwWindow, x, y, z) {
            const scene = dsector.DSReference.scene;
            const antiAliasedLevel = cwWindow.antiAliasedLevel;
            const n9 = Math.fround(
                (Math.max(cwWindow.w, cwWindow.h) * cwWindow.antiAliasedLevel * 10.0) / 15.0);
            const matrix4f = new dsector.Matrix4f();
            matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(-scene.cameraX, -scene.cameraY, -scene.cameraZ));
            matrix4f.preMultiply(scene.cameraRotation.inverse());
            const vertex = new dsector.Vertex(x, y, z);
            vertex.transform(matrix4f);
            if (vertex.z <= 0.0) {
                return null;
            }
            return new dsector.Vertex2D(
                Math.fround(vertex.x / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipX_$LI$() +
                    (cwWindow.w * antiAliasedLevel / 2 | 0)),
                Math.fround(vertex.y / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipY_$LI$() +
                    (cwWindow.h * antiAliasedLevel / 2 | 0)));
        }

        /**
         * Draws the starfield on the screen.
         *
         * @param {ScreenData} screenData - The screen data object.
         * @param {number} antiAliasedLevel - The anti-aliasing level.
         * @param {dsector.Matrix4f} transformationMatrix - The transformation matrix.
         * @param {number} starCount - The number of stars in the starfield.
         * @param {number} screenCenterX - The x-coordinate of the screen center.
         * @param {number} screenCenterY - The y-coordinate of the screen center.
         */
        drawStarfield(screenData, antiAliasedLevel, matrix4f,
                      starCount, screenCenterX, screenCenterY) {
            const vectorInR3 = new dsector.VectorInR3(0.0, 0.0, 0.0);
            let cv = 1.0;
            const sdwCenter = (screenData.width / 2 | 0);
            if (screenCenterX > screenCenterY) {
                if (screenCenterX < sdwCenter) {
                    cv *= Math.fround(screenCenterX / sdwCenter);
                }
            } else if (screenCenterY < sdwCenter) {
                cv *= Math.fround(screenCenterY / sdwCenter);
            }
            for (let i = 0; i < this.starfield.numberOfStars; ++i) {
                vectorInR3.x = this.starfield.star[i].x;
                vectorInR3.y = this.starfield.star[i].y;
                vectorInR3.z = this.starfield.star[i].z;
                vectorInR3.transform(matrix4f);
                if (vectorInR3.z > 0.0) {
                    const dist = (Math.pow(i % 5, 2.8) | 0);
                    const x1 = Math.fround((vectorInR3.x / vectorInR3.z) * starCount + screenCenterX);
                    const y1 = Math.fround((vectorInR3.y / vectorInR3.z) * starCount + screenCenterY);
                    this.v.setColorVS$r$g$b$a((((dist + Math.random() * 60.0) * cv) | 0),
                        (((dist + Math.random() * 60.0) * cv) | 0), (((dist + Math.random() * 60.0) * cv) | 0), 255);
                    if (antiAliasedLevel === 1) {
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0));
                        if (this.starfield.twinkle[i] && Math.random() > 0.9) {
                            this.v.setColorVS$r$g$b$a(((((dist / 3 | 0) + Math.random() * 30.0) * cv) | 0),
                                ((((dist / 3 | 0) + Math.random() * 30.0) * cv) | 0),
                                ((((dist / 3 | 0) + Math.random() * 30.0) * cv) | 0), 255);
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 1, (y1 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) + 1);
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 1, (y1 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) - 1);
                        }
                    } else {
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 1, (y1 | 0));
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 1, (y1 | 0));
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) - 1);
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 1, (y1 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 1, (y1 | 0) - 1);
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 1, (y1 | 0) + 1);
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 1, (y1 | 0) - 1);
                        if (Math.random() > 0.9) {
                            this.v.setColorVS$r$g$b$a(
                                ((((dist / 3 | 0) + Math.random() * 60.0) * cv) | 0),
                                ((((dist / 3 | 0) + Math.random() * 60.0) * cv) | 0),
                                ((((dist / 3 | 0) + Math.random() * 60.0) * cv) | 0), 255);
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 2, (y1 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) + 2);
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 2, (y1 | 0));
                            this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) - 2);
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
            matrix4f.rotateZ(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        changeCameraHue(n, b) {
            this.changeCameraHueDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        changeCameraVertDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateX(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        changeCameraVert(n, b) {
            this.changeCameraVertDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        moveCameraPivotDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        moveCameraPivot(n, b) {
            this.moveCameraPivotDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod_$LI$() / 1500.0) * n));
        }

        flipCamera() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY(3.1415927);
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
