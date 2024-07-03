/**/
(function (dsector) {
    /**
     * Class to load and manage 3D models.
     * @class
     * @memberof dsector
     */
    class ModelLoader {
        /**
         * Creates an instance of ModelLoader.
         * @constructor
         */
        constructor() {
            this.loadedModels = new Map();
        }

        /**
         * Retrieves a model from the loaded models cache or loads it if not found.
         * @param fileName
         * @returns {Model3DMatrix|null}
         */
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

        /**
         * Drops a model from the loaded models cache.
         * @param name
         */
        dropModel(name) {
            this.loadedModels.remove(name);
        }

        /**
         * Drops all unused models from the loaded models cache.
         */
        dropAllUnusedModels() {
            CWSYSTEM.Debug.println("Dropped all unused Models");
        }
    }

    dsector.ModelLoader = ModelLoader;
    ModelLoader["__class"] = "dsector.ModelLoader";
})(dsector || (dsector = {}));
