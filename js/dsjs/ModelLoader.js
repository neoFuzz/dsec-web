var dsector;
(function (dsector) {
    class ModelLoader {
        constructor() {
            this.loadedModels = new Map();
        }

        getModel(fileName) {
            let model3DMatrix = this.loadedModels.get(fileName);
            if (model3DMatrix === undefined) {
                model3DMatrix = new dsector.Model3DMatrix(fileName + ".xml");
                if (model3DMatrix == null) {
                    return null;
                }
                this.loadedModels.set(fileName, model3DMatrix);
            }
            return model3DMatrix;
        }

        dropModel(name) {
            this.loadedModels.remove(name);
        }

        dropAllUnusedModels() {
            CWSYSTEM.Debug.println("Dropped all unused Models");
        }
    }

    dsector.ModelLoader = ModelLoader;
    ModelLoader["__class"] = "dsector.ModelLoader";
})(dsector || (dsector = {}));
