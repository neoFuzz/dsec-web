/**/
(function (dsector) {
    /**
     * Represents a folder for organizing 3D models and related elements.
     * @class
     * @memberof dsector
     */
    class ModelFolder {
        /**
         * Creates a new ModelFolder instance.
         * @param {string} name - The name of the folder.
         * @param {ModelFolder|null} parent - The parent folder, if any.
         */
        constructor(name, parent) {
            this.name = name;
            this.__parentFolder = parent;
            this.id = dsector.NumberTools.randomLong();
            this.__visible = true;
            this.expanded = true;
            this.modelFolders = [];
            this.polygonGroups = [];
            this.inbuiltLights = [];
            this.specialPoints = [];
        }

        /**
         * Checks if the folder is visible, considering parent visibility.
         * @returns {boolean} True if the folder is visible, false otherwise.
         */
        visible() {
            return this.__parentFolder ? this.__parentFolder.visible() && this.__visible : this.__visible;
        }

        /**
         * Checks if the folder itself is set to visible.
         * @returns {boolean} True if the folder is set to visible, false otherwise.
         */
        isVisible() {
            return this.__visible;
        }

        /**
         * Checks if the folder is hidden.
         * @returns {boolean} True if the folder is hidden, false otherwise.
         */
        isHidden() {
            return !this.__visible;
        }

        /**
         * Sets the visibility of the folder.
         * @param {boolean} [mode=true] - The visibility mode to set.
         */
        setVisible(mode = true) {
            this.__visible = mode;
            this.updateViews();
        }

        /**
         * Sets the folder as hidden.
         */
        setHidden() {
            this.__visible = false;
            this.updateViews();
        }

        /**
         * Updates the projective and perspective views.
         * @private
         */
        updateViews() {
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Gets the parent folder.
         * @returns {ModelFolder|null} The parent folder, or null if there is none.
         */
        parentFolder() {
            return this.__parentFolder;
        }
    }
    dsector.ModelFolder = ModelFolder;
    ModelFolder["__class"] = "dsector.ModelFolder";
})(dsector || (dsector = {}));
