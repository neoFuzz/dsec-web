/* re-written from Java */
var dsector;
(function (dsector) {
    class LightManager {
        constructor(scene) {
            if (this.scene === undefined) {
                this.scene = null;
            }
            this.ambientRed = 1.5;
            this.ambientGreen = 1.5;
            this.ambientBlue = 1.5;
            if (this.lightCameraSpaceX === undefined) {
                this.lightCameraSpaceX = null;
            }
            if (this.lightCameraSpaceY === undefined) {
                this.lightCameraSpaceY = null;
            }
            if (this.lightCameraSpaceZ === undefined) {
                this.lightCameraSpaceZ = null;
            }
            if (this.lightRed === undefined) {
                this.lightRed = null;
            }
            if (this.lightGreen === undefined) {
                this.lightGreen = null;
            }
            if (this.lightBlue === undefined) {
                this.lightBlue = null;
            }
            if (this.numberOfLightsInRenderingScene === undefined) {
                this.numberOfLightsInRenderingScene = 0;
            }
            this.scene = scene;
        }

        prepareLightsForRendering() {
            const arrayList = ([]);
            const inverse = this.scene.cameraRotation.inverse();
            const vertex = new dsector.Vertex(0.0, 0.0, 0.0);
            let i;
            for(i = 0; i < this.scene.__positionedModels.size; ++i) {
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
                            const vertex1 = new dsector.Vertex(inbuiltLight.x$(), inbuiltLight.y$(), inbuiltLight.z$());
                            vertex1.transform(positionedModel.rotation);
                            vertex.x = Math.fround((positionedModel.x - this.scene.cameraX));
                            vertex.y = Math.fround((positionedModel.y - this.scene.cameraY));
                            vertex.z = Math.fround((positionedModel.z - this.scene.cameraZ));
                            vertex1.x += vertex.x;
                            vertex1.y += vertex.y;
                            vertex1.z += vertex.z;
                            vertex1.transform(inverse);
                            arrayList.push(new dsector.InbuiltLight(null, null, true,
                                vertex1.x, vertex1.y, vertex1.z, inbuiltLight.red$(), inbuiltLight.green$(), inbuiltLight.blue$()));
                        }
                    }
                }
            }
            this.numberOfLightsInRenderingScene = arrayList.length;
            this.lightCameraSpaceX = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
            this.lightCameraSpaceY = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
            this.lightCameraSpaceZ = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
            this.lightRed = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
            this.lightGreen = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
            this.lightBlue = (s => {let a = [];
                while (s-- > 0)
                    a.push(0);
                return a;})(this.numberOfLightsInRenderingScene);
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
