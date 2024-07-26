(function (dsector) {
    /**
     * Class representing a Scene.
     *
     * @property {Map<string, dsector.PositionedModel>} __positionedModels - The positioned models in the scene.
     * @property {number} cameraX - The x-coordinate of the camera.
     * @property {number} cameraY - The y-coordinate of the camera.
     * @property {number} cameraZ - The z-coordinate of the camera.
     * @property {dsector.Matrix4f|null} cameraRotation - The camera rotation matrix.
     * @property {dsector.LightManager|null} lightManager - The light manager.
     *
     * @example
     * let scene = new dsector.Scene();
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
    class Scene {
        /**
         * Creates an instance of Scene.
         */
        constructor() {
            this.__positionedModels = null;
            this.cameraX = 0.0;
            this.cameraY = 0.0;
            this.cameraZ = 0.0;
            this.cameraRotation = null;
            this.lightManager = null;

            this.clearScene();
        }

        /**
         * Clears the scene and initializes default objects.
         */
        clearScene() {
            this.__positionedModels = new Map();
            this.cameraRotation = new dsector.Matrix4f();
            this.lightManager = new dsector.LightManager(this);

            const positionedModel = new dsector.PositionedModel(
                "staticLights",
                new dsector.Model3DMatrix(),
                new dsector.Matrix4f(),
                0.0, 0.0, 0.0
            );
            this.addPositionedModel(positionedModel);
        }

        /**
         * Adds a positioned model to the scene.
         *
         * @param {dsector.PositionedModel} positionedModel - The positioned model to add.
         */
        addPositionedModel(positionedModel) {
            this.__positionedModels.set(positionedModel.name(), positionedModel);
        }

        /**
         * Adds a static light to the "staticLights" positioned model.
         *
         * @param {number} x - The x-coordinate of the light.
         * @param {number} y - The y-coordinate of the light.
         * @param {number} z - The z-coordinate of the light.
         * @param {number} red - The red color component.
         * @param {number} green - The green color component.
         * @param {number} blue - The blue color component.
         */
        addStaticLight(x, y, z, red, green, blue) {
            const positionedModel = this.getPositionedModel("staticLights");
            const inbuiltLight = new dsector.InbuiltLight(
                positionedModel.model3DMatrix.rootFolder,
                "",
                true,
                x, y, z,
                red, green, blue
            );
            positionedModel.model3DMatrix.rootFolder.inbuiltLights.push(inbuiltLight);
        }

        /**
         * Removes a positioned model from the scene by its name.
         *
         * @param {string} modelName - The name of the model to remove.
         */
        removePositionedModel(modelName) {
            this.__positionedModels.delete(modelName);
        }

        /**
         * Gets a positioned model by its name.
         *
         * @param {string} model - The name of the model.
         * @returns {dsector.PositionedModel|undefined} The positioned model, or undefined if not found.
         */
        getPositionedModel(model) {
            return this.__positionedModels.get(model);
        }

        /**
         * Gets all positioned models in the scene.
         *
         * @returns {Array<dsector.PositionedModel>} An array of all positioned models.
         */
        positionedModels() {
            return Array.from(this.__positionedModels.values());
        }
    }

    dsector.Scene = Scene;
    Scene["__class"] = "dsector.Scene";
})(dsector || (dsector = {}));