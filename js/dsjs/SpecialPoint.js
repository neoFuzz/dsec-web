(function (dsector) {
    /**
     * Class representing a Special Point.
     *
     * @property {Object|null} parent - The parent object.
     * @property {number} id - The unique identifier of the special point.
     * @property {string|null} name - The name of the special point.
     * @property {boolean} __visibility - The visibility of the special point.
     * @property {number} x - The x-coordinate of the special point.
     * @property {number} y - The y-coordinate of the special point.
     * @property {number} z - The z-coordinate of the special point.
     * @property {number} red - The red color component.
     * @property {number} green - The green color component.
     * @property {number} blue - The blue color component.
     *
     * @example
     * let specialPoint = new dsector.SpecialPoint();
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
    class SpecialPoint {
        /**
         * Creates an instance of SpecialPoint.
         * @param {Object|null} [parent=null] - The parent object.
         * @param {string|null} [name=null] - The name of the special point.
         * @param {boolean} [visible=false] - The visibility of the special point.
         * @param {number} [x=0] - The x-coordinate of the special point.
         * @param {number} [y=0] - The y-coordinate of the special point.
         * @param {number} [z=0] - The z-coordinate of the special point.
         * @param {number} [red=0] - The red color component.
         * @param {number} [green=0] - The green color component.
         * @param {number} [blue=0] - The blue color component.
         */
        constructor(parent = null, name = null, visible = false,
                    x = 0, y = 0, z = 0,
                    red = 0, green = 0, blue = 0) {
            this.parent = parent;
            this.id = dsector.NumberTools.randomLong();
            this.name = name;
            this.__visibility = visible;
            this.x = x;
            this.y = y;
            this.z = z;
            this.red = red;
            this.green = green;
            this.blue = blue;
        }

        /**
         * Gets all special points from the given model 3D matrix.
         *
         * @param {Object} model3DMatrix - The 3D model matrix.
         * @returns {Array<SpecialPoint>} The array of special points.
         */
        static getAllSpecialPoints(model3DMatrix) {
            const arrayList = [];
            const polygonIterator = new dsector.PolygonIterator(model3DMatrix, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const modelFolder = polygonIterator.nextModelFolder();
                if (modelFolder == null) {
                    return arrayList;
                }
                for (const sp of modelFolder.specialPoints) {
                    arrayList.push(sp);
                }
            }
        }

        /**
         * Gets the visibility of the special point.
         *
         * @returns {boolean} The visibility of the special point.
         */
        visibility$() {
            return this.__visibility;
        }

        /**
         * Checks if the special point is visible.
         *
         * @returns {boolean} True if the special point is visible, otherwise false.
         */
        isVisible() {
            return this.__visibility;
        }

        /**
         * Checks if the special point is hidden.
         *
         * @returns {boolean} True if the special point is hidden, otherwise false.
         */
        isHidden() {
            return !this.__visibility;
        }

        /**
         * Sets the visibility of the special point.
         *
         * @param {boolean} visible - The visibility state to set.
         */
        visibility$boolean(visible) {
            this.__visibility = visible;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Gets or sets the visibility of the special point.
         *
         * @param {boolean} [visible] - The visibility state to set. If no argument is provided, it gets the current visibility.
         * @returns {boolean|undefined} If called with no arguments, returns the current visibility. If called with an argument, sets the visibility.
         * @throws {Error} Throws an error if the argument type is invalid.
         */
        visibility(visible) {
            if (typeof visible === 'boolean' || visible === null) {
                return this.visibility$boolean(visible);
            } else if (visible === undefined) {
                return this.visibility$();
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Toggles the visibility of the special point.
         */
        toggleVisibility() {
            this.visibility$boolean(!this.visibility$());
        }

        /**
         * Requests an update for the projective view windows in the next cycle.
         * This function is a placeholder for the actual implementation.
         */
        setPositionToLocatorPosition() {
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /**
         * Sets the color of the special point.
         *
         * @param {Object} color - The color object with red, green, and blue methods.
         */
        setColor(color) {
            this.red = color.red();
            this.green = color.green();
            this.blue = color.blue();
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }
    }

    dsector.SpecialPoint = SpecialPoint;
    SpecialPoint["__class"] = "dsector.SpecialPoint";
})(dsector || (dsector = {}));