/* re-written from Java */
var dsector;
(function (dsector) {
    class LightManager {
        constructor(scene) {
            this.scene = scene;
            this.ambientRed = 1.5;
            this.ambientGreen = 1.5;
            this.ambientBlue = 1.5;
            this.lightCameraSpaceX = null;
            this.lightCameraSpaceY = null;
            this.lightCameraSpaceZ = null;
            this.lightRed = null;
            this.lightGreen = null;
            this.lightBlue = null;
            this.numberOfLightsInRenderingScene = 0;
        }

        prepareLightsForRendering() {
            const maxLights = 60; // Set the maximum number of lights to render
            const arrayList = [];
            const inverse = this.scene.cameraRotation.inverse();
            const vertex = new dsector.Vertex(0.0, 0.0, 0.0);

            let i;
            for (i = 0; i < this.scene.__positionedModels.size; ++i) {
                const positionedModel = this.scene.positionedModels()[i];
                const polygonIterator = new dsector.PolygonIterator(positionedModel.model3DMatrix,
                    dsector.PolygonIterator.ALL_POLYGON_GROUPS);

                while (true) {
                    const modelFolder = polygonIterator.nextModelFolder();
                    if (modelFolder == null) {
                        break;
                    }

                    for (let j = 0; j < modelFolder.inbuiltLights.length; ++j) {
                        const inbuiltLight = modelFolder.inbuiltLights[j];
                        if (inbuiltLight.on$()) {
                            const vertex1 = new dsector.Vertex(
                                inbuiltLight.x$(), inbuiltLight.y$(), inbuiltLight.z$());
                            vertex1.transform(positionedModel.rotation);
                            vertex.x = Math.fround((positionedModel.x - this.scene.cameraX));
                            vertex.y = Math.fround((positionedModel.y - this.scene.cameraY));
                            vertex.z = Math.fround((positionedModel.z - this.scene.cameraZ));
                            vertex1.x += vertex.x;
                            vertex1.y += vertex.y;
                            vertex1.z += vertex.z;
                            vertex1.transform(inverse);

                            arrayList.push(new dsector.InbuiltLight(null, null, true,
                                vertex1.x, vertex1.y, vertex1.z,
                                inbuiltLight.red$(), inbuiltLight.green$(), inbuiltLight.blue$()
                            ));
                        }
                    }
                }
            }

            this.numberOfLightsInRenderingScene = Math.min(arrayList.length, maxLights);
            this.lightCameraSpaceX = new Array(this.numberOfLightsInRenderingScene).fill(0);
            this.lightCameraSpaceY = new Array(this.numberOfLightsInRenderingScene).fill(0);
            this.lightCameraSpaceZ = new Array(this.numberOfLightsInRenderingScene).fill(0);
            this.lightRed = new Array(this.numberOfLightsInRenderingScene).fill(0);
            this.lightGreen = new Array(this.numberOfLightsInRenderingScene).fill(0);
            this.lightBlue = new Array(this.numberOfLightsInRenderingScene).fill(0);

            for (i = 0; i < this.numberOfLightsInRenderingScene; ++i) {
                const inbuiltLight = arrayList[i];
                this.lightCameraSpaceX[i] = inbuiltLight.x$();
                this.lightCameraSpaceY[i] = inbuiltLight.y$();
                this.lightCameraSpaceZ[i] = inbuiltLight.z$();
                this.lightRed[i] = inbuiltLight.red$();
                this.lightGreen[i] = inbuiltLight.green$();
                this.lightBlue[i] = inbuiltLight.blue$();
            }
        }
    }

    dsector.LightManager = LightManager;
    LightManager["__class"] = "dsector.LightManager";
})(dsector || (dsector = {}));
