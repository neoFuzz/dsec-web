/* re-written from Java. Working in-game */
var dsector;
(function (dsector) {
    class Scene {
        constructor() {
            if (this.__positionedModels === undefined) {
                this.__positionedModels = null;
            }
            this.cameraX = 0.0;
            this.cameraY = 0.0;
            this.cameraZ = 0.0;
            if (this.cameraRotation === undefined) {
                this.cameraRotation = null;
            }
            if (this.lightManager === undefined) {
                this.lightManager = null;
            }
            this.clearScene();
        }
        clearScene() {
            this.__positionedModels = new Map();
            this.cameraRotation = new dsector.Matrix4f();
            this.lightManager = new dsector.LightManager(this);
            const positionedModel = new dsector.PositionedModel("staticLights", new dsector.Model3DMatrix(),
                new dsector.Matrix4f(), 0.0, 0.0, 0.0);
            this.addPositionedModel(positionedModel);
        }
        addPositionedModel(positionedModel) {
            this.__positionedModels.set(positionedModel.name(), positionedModel);
        }
        addStaticLight(x, y, z, red, green, blue) {
            const positionedModel = this.getPositionedModel("staticLights");
            const inbuiltLight = new dsector.InbuiltLight(positionedModel.model3DMatrix.rootFolder, "",
                true, x, y, z, red, green, blue);
            positionedModel.model3DMatrix.rootFolder.inbuiltLights.push(inbuiltLight);
        }
        removePositionedModel(modelName) {
            this.__positionedModels.delete(modelName);
        }
        getPositionedModel(model) {
            return this.__positionedModels.get(model);
        }
        positionedModels() {
            /*return ( /* values /((m) => { let r = []; if (m.entries == null)
                m.entries = []; for (let i = 0; i < m.entries.length; i++)
                r.push(m.entries[i].value); return r; })(this.__positionedModels).slice(0));*/
            return Array.from(this.__positionedModels.values());
        }
    }
    dsector.Scene = Scene;
    Scene["__class"] = "dsector.Scene";
})(dsector || (dsector = {}));
