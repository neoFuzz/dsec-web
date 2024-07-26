(function (dsector) {
    /**
     * Renderer class responsible for rendering graphical elements.
     *
     * @property {number} __renderingMode - The rendering mode of the renderer.
     * @property {boolean} detailSensitiveRendering - Indicates whether detail-sensitive rendering is enabled or not.
     * @property {CWWindowCollection} mainGUI - The main graphical user interface.
     * @property {CWGraphics} starfield - The starfield graphic.
     * @property {number} numberOfStars - The number of stars in the starfield.
     * @property {number[]} zBuffer - The z-buffer for depth sorting.
     * @property {number[]} scale - The scale factors for rendering.
     * @property {number[]} offsetX - The offset values for the x-axis.
     * @property {number[]} offsetY - The offset values for the y-axis.
     * @property {CWGraphics} __tinyLensFlare - The tiny lens flare graphic.
     * @property {CWGraphics} __smallLensFlare - The small lens flare graphic.
     * @property {CWGraphics} __mediumLensFlare - The medium lens flare graphic.
     * @property {CWGraphics} __largeLensFlare - The large lens flare graphic.
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
    class Renderer {
        /**
         * Constructor for the Renderer class.
         *
         * @param {CWWindowCollection} mainGUI - The main graphical user interface.
         */
        constructor(mainGUI) {
            this.starfield = null;
            this.numberOfStars = 0;
            this.v = null;
            this.__renderingMode = 0;
            this.zBuffer = null;
            this.detailSensitiveRendering = false;
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

        /**
         * Gets the tiny lens flare graphic.
         * @static
         * @returns {CWGraphics} The tiny lens flare graphic.
         */
        static tinyLensFlare() {
            if (Renderer.__tinyLensFlare == null) {
                Renderer.__tinyLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/tinyLensFlare.jpg");
            }
            return Renderer.__tinyLensFlare;
        }

        /**
         * Gets the small lens flare graphic.
         * @static
         * @returns {CWGraphics} The small lens flare graphic.
         */
        static smallLensFlare() {
            if (Renderer.__smallLensFlare == null) {
                Renderer.__smallLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/smallLensFlare.jpg");
            }
            return Renderer.__smallLensFlare;
        }

        /**
         * Gets the medium lens flare graphic.
         * @static
         * @returns {CWGraphics} The medium lens flare graphic.
         */
        static mediumLensFlare() {
            if (Renderer.__mediumLensFlare == null) {
                Renderer.__mediumLensFlare = new CWSYSTEM.CWGraphics().getJPG("assets/images/mediumLensFlare.jpg");
            }
            return Renderer.__mediumLensFlare;
        }

        /**
         * Gets the shield graphic.
         * @static
         * @returns {CWGraphics} The shield graphic.
         */
        static shieldGraphic() {
            if (Renderer.__shieldGraphic == null) {
                Renderer.__shieldGraphic = new CWSYSTEM.CWGraphics().getJPG("assets/images/shield.jpg");
            }
            return Renderer.__shieldGraphic;
        }

        /**
         * Creates stars for the starfield.
         */
        createStars() {
            this.starfield = new dsector.Starfield(15000);
        }

        /**
         * Zooms out the view.
         * @param {number} n - The index of the scale.
         */
        zoomOut(n) {
            const scale = Renderer.scale;
            scale[n] /= Math.fround(1.0 + CWSYSTEM.Environment.lastFramePeriod$() / 1500.0);
            if (Renderer.scale[n] < 0.01) {
                const scale2 = Renderer.scale;
                scale2[n] *= 1.1;
            }
        }

        /**
         * Zooms in the view.
         * @param {number} n - The index of the scale.
         */
        zoomIn(n) {
            const scale = Renderer.scale;
            scale[n] *= Math.fround(1.0 + CWSYSTEM.Environment.lastFramePeriod$() / 1500.0);
            if (Renderer.scale[n] > 50000.0) {
                const scale2 = Renderer.scale;
                scale2[n] /= 1.1;
            }
        }

        /**
         * Logs the perspective projection.
         */
        perspectiveProjection$() {
            CWSYSTEM.Debug.println("Using perspectiveProjection...");
        }

        /**
         * Performs perspective projection on an array of screen data.
         * @param {Array} array - The array of data.
         * @param {ScreenData} screenData - The screen data.
         * @param {CWWindow} cwWindow - The window object.
         */
        perspectiveProjection$sd$(array, screenData, cwWindow) {
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
                                                CWSYSTEM.Environment.perspectiveViewFlipX$()) + centerX) | 0);
                                            y1 = (((((vertex.y / vertex.z) * starCount) *
                                                CWSYSTEM.Environment.perspectiveViewFlipY$()) + centerY) | 0);
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
                                            CWSYSTEM.Environment.perspectiveViewFlipX$()) + centerX);
                                        const transformedY1 = ((((vertex.y / vertex.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY$()) + centerY);
                                        const transformedX2 = ((((vertex2.x / vertex2.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipX$()) + centerX);
                                        const transformedY2 = ((((vertex2.y / vertex2.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY$()) + centerY);
                                        const transformedX3 = ((((vertex3.x / vertex3.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipX$()) + centerX);
                                        const transformedY3 = ((((vertex3.y / vertex3.z) * starCount) *
                                            CWSYSTEM.Environment.perspectiveViewFlipY$()) + centerY);
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
                        Math.random() * ((ambiance - 3000.0) / 3000.0)
                    ));
                }
            }
            cwWindow.renderingRequired = true;
            if (screenData != null) {
                this.zBuffer = null;
            }
        }

        /**
         * Projects a 3D point from the universe onto the screen coordinates.
         * @param {CWWindow} cwWindow - The CWWindow object containing width, height, and antialiasing level.
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
                Math.fround(vertex.x / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipX$() +
                    (cwWindow.w * antiAliasedLevel / 2 | 0)),
                Math.fround(vertex.y / vertex.z * n9 * CWSYSTEM.Environment.perspectiveViewFlipY$() +
                    (cwWindow.h * antiAliasedLevel / 2 | 0)));
        }

        /**
         * Draws the starfield on the screen.
         *
         * @param {ScreenData} screenData - The screen data object.
         * @param {number} antiAliasedLevel - The antialiasing level.
         * @param {Matrix4f} transformationMatrix - The transformation matrix.
         * @param {number} starCount - The number of stars in the starfield.
         * @param {number} screenCenterX - The x-coordinate of the screen center.
         * @param {number} screenCenterY - The y-coordinate of the screen center.
         */
        drawStarfield(screenData, antiAliasedLevel, transformationMatrix,
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

            const drawPixel = (x1, y1) => {
                this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) + 1, (y1 | 0));
                this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) + 1);
                this.v.CWDrawPixelWithCropping(screenData, (x1 | 0) - 1, (y1 | 0));
                this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0) - 1);
            };

            for (let i = 0; i < this.starfield.numberOfStars; ++i) {
                vectorInR3.x = this.starfield.star[i].x;
                vectorInR3.y = this.starfield.star[i].y;
                vectorInR3.z = this.starfield.star[i].z;
                vectorInR3.transform(transformationMatrix);
                if (vectorInR3.z > 0.0) {
                    const dist = (Math.pow(i % 5, 2.8) | 0);
                    const x1 = Math.fround((vectorInR3.x / vectorInR3.z) * starCount + screenCenterX);
                    const y1 = Math.fround((vectorInR3.y / vectorInR3.z) * starCount + screenCenterY);
                    const randomValue = Math.random() * 60.0;
                    const colorValue = ((dist + randomValue) * cv) | 0;
                    const rr = Math.floor(Math.random() * (60 - 1)) + 1;
                    const rb = Math.floor(Math.random() * (60 - 1)) + 1;
                    const rg = Math.floor(Math.random() * (60 - 1)) + 1;
                    this.v.setColorVS$r$g$b$a(colorValue + rr, colorValue + rg, colorValue + rb, 255);
                    if (antiAliasedLevel === 1) {
                        this.v.CWDrawPixelWithCropping(screenData, (x1 | 0), (y1 | 0));
                        if (this.starfield.twinkle[i] && Math.random() > 0.9) {
                            this.v.setColorVS$r$g$b$a(
                                ((dist / 3 | 0) + Math.random() * 30.0) * cv,
                                ((dist / 3 | 0) + Math.random() * 30.0) * cv,
                                ((dist / 3 | 0) + Math.random() * 30.0) * cv, 255);
                            //drawPixel(x1,y1);
                        }
                    } else {
                        //drawPixel(x1,y1);
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
                    drawPixel(x1, y1);
                }
            }
        }

        /**
         * Pans the camera directly.
         * @param {number} n - The amount to pan.
         */
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

        /**
         * Moves the camera directly.
         * @param {number} n - The amount to move.
         */
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

        /**
         * Changes the camera hue directly.
         * @param {number} n - The amount to change the hue.
         */
        changeCameraHueDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateZ(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Changes the camera hue.
         * @param {number} n - The amount to change the hue.
         * @param {boolean} b - Unknown parameter.
         */
        changeCameraHue(n, b) {
            this.changeCameraHueDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod$() / 1500.0) * n));
        }

        /**
         * Changes the camera vertical angle directly.
         * @param {number} n - The amount to change the vertical angle.
         */
        changeCameraVertDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateX(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Changes the camera vertical angle.
         * @param {number} n - The amount to change the vertical angle.
         * @param {boolean} b - Unknown parameter.
         */
        changeCameraVert(n, b) {
            this.changeCameraVertDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod$() / 1500.0) * n));
        }

        /**
         * Moves the camera pivot directly.
         * @param {number} n - The amount to move the pivot.
         */
        moveCameraPivotDirectly(n) {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY(n);
            dsector.DSReference.scene.cameraRotation.postMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Moves the camera pivot.
         * @param {number} n - The amount to move the pivot.
         * @param {boolean} b - Unknown parameter.
         */
        moveCameraPivot(n, b) {
            this.moveCameraPivotDirectly(Math.fround((CWSYSTEM.Environment.lastFramePeriod$() / 1500.0) * n));
        }

        /**
         * Flips the camera.
         */
        flipCamera() {
            const matrix4f = new dsector.Matrix4f();
            matrix4f.rotateY(Math.PI);
            dsector.DSReference.scene.cameraRotation.preMultiply(matrix4f);
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Sets the camera position X.
         * @param {string} s - The X position as a string.
         */
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

        /**
         * Sets the camera position Y.
         * @param {string} s - The Y position as a string.
         */
        setCameraPositionY(s) {
            let cY;
            try {
                cY = parseInt(s);
            } catch (ex) {
                dsector.DSReference.alertManager.messageQueued("Invalid Y value.");
                return;
            }
            dsector.DSReference.scene.cameraY = cY;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Sets the camera position Z.
         * @param {string} s - The Z position as a string.
         */
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

        /**
         * Returns the current rendering mode.
         * @returns {number}
         */
        renderingMode$() {
            return this.__renderingMode;
        }

        /**
         *
         * @param rm The Rendering mode to use.
         */
        renderingMode$int(rm) {
            this.__renderingMode = rm;
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Sets the rendering mode.
         * @param {number} n
         */
        renderingMode$ji(n) {
            this.renderingMode$int((n | 0));
        }

        /**
         * Gets or sets the rendering mode.
         * @param {number} [n] - The rendering mode to set.
         * @returns {number} The current rendering mode.
         */
        renderingMode(n) {
            if (((typeof n === 'number') || n === null)) {
                return this.renderingMode$ji(n);
            } else if ((typeof n === 'number')) {
                return this.renderingMode$int(n);
            } else if (n === undefined) {
                return this.renderingMode$();
            } else
                throw new Error('invalid overload');
        }

        /**
         * Checks if double-sided polygons are used.
         * @returns {boolean} True if double-sided polygons are used, false otherwise.
         */
        usesDoubleSidedPolygons() {
            return this.__renderingMode === Renderer.DOUBLE_SIDED_POLYGONS;
        }

        /**
         * Checks if backface culling is used.
         * @returns {boolean} True if backface culling is used, false otherwise.
         */
        usesBackfaceCulling() {
            return this.__renderingMode === Renderer.BACKFACE_CULLING;
        }

        /**
         * Checks if reverse side highlighting is used.
         * @returns {boolean} True if reverse side highlighting is used, false otherwise.
         */
        usesHiglightReverseSide() {
            return this.__renderingMode === Renderer.HILIGHT_REVERSE_SIDE;
        }

        /**
         * Resets the Z-buffer.
         * @param {ScreenData} screenData - The screen data object.
         * @private
         */
        resetZBuffer(screenData) {
            const width = screenData.width;
            const height = screenData.height;
            if (this.zBuffer == null || ((this.zBuffer.length < height || this.zBuffer[0].length < width))) {
                this.zBuffer = Array.from({length: height}, () => new Array(width).fill(0));
            }
            const width2 = screenData.width;
            let height2 = screenData.height;
            for (let i = 0; i < height2; ++i) {
                CWSYSTEM.CWUtils.fillArray(this.zBuffer[i], 0, width2, 1.0E30);
            }
        }

        /**
         * Sets the detail-sensitive rendering flag.
         * @param {boolean} detailSensitiveRendering - Whether to use detail-sensitive rendering.
         */
        setDetailSensitiveRendering(detailSensitiveRendering) {
            this.detailSensitiveRendering = detailSensitiveRendering;
        }

        /**
         * Calculates the ideal polygon area based on camera location and positioned model.
         * @param {number} n - Unknown parameter.
         * @param {number} n2 - Unknown parameter.
         * @param {number} n3 - Unknown parameter.
         * @returns {number} The ideal polygon area.
         * @private
         */
        getIdealPolygonAreaFromCameraLocationAndPositionedModel(n, n2, n3) {
            if (n2 > n3) {
                return Math.fround(Math.pow((1000.0 / n2 * n / 100.0), 2.0));
            }
            return Math.fround(Math.pow((1000.0 / n3 * n / 100.0), 2.0));
        }

        /**
         * Finds the detail category closest to the given average polygon area.
         * @param {Model3DMatrix} model3DMatrix - The 3D model matrix.
         * @param {number} n - The target average polygon area.
         * @returns {number} The closest detail category.
         * @private
         */
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

    /**
     * @constant {number}
     * @default 0
     */
    Renderer.DOUBLE_SIDED_POLYGONS = 0;
    /**
     * @constant {number}
     * @default 1
     */
    Renderer.BACKFACE_CULLING = 1;
    /**
     * @constant {number}
     * @default 2
     */
    Renderer.HILIGHT_REVERSE_SIDE = 2;
    /**
     * @static
     * @type {Array<number>}
     */
    Renderer.scale = null;
    /**
     * @static
     * @type {Array<number>}
     */
    Renderer.offsetX = null;
    /**
     * @static
     * @type {Array<number>}
     */
    Renderer.offsetY = null;
    /**
     * @static
     * @type {CWGraphics}
     * @private
     */
    Renderer.__tinyLensFlare = null;
    /**
     * @static
     * @type {CWGraphics}
     * @private
     */
    Renderer.__smallLensFlare = null;
    /**
     * @static
     * @type {CWGraphics}
     * @private
     */
    Renderer.__mediumLensFlare = null;
    /**
     * @static
     * @type {CWGraphics}
     * @private
     */
    Renderer.__shieldGraphic = null;
    dsector.Renderer = Renderer;
    Renderer["__class"] = "dsector.Renderer";
})(dsector || (dsector = {}));