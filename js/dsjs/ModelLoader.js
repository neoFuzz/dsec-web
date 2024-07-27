(function (dsector) {
    /**
     * Class to load and manage 3D models.
     *
     * @property {Map<string, dsector.Model3DMatrix>} loadedModels - A cache of loaded models.
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
    class ModelLoader {
        /**
         * Creates an instance of ModelLoader.
         */
        constructor() {
            this.loadedModels = new Map();
        }

        /**
         * Retrieves a model from the loaded models cache or loads it if not found.
         *
         * @param {string} fileName - The name of the model file to load.
         * @returns {dsector.Model3DMatrix|null}
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
         *
         * @param {string} name - The name of the model to drop.
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