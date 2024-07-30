(function (dsector) {
    /**
     * Represents a polygon group in a 3D space
     *
     * @property {number} id - The unique identifier of the polygon group
     * @property {dsector.Matrix4f} transformationMatrix - The transformation matrix of the polygon group
     * @property {dsector.PolygonGroup} parentPolygonGroup - The parent polygon group
     * @property {string} name - The name of the representation
     * @property {boolean} visiblity - The visibility of the representation
     * @property {boolean} active - The activity state of the representation
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
    class PolygonGroupRepresentation {
        /**
         * Creates an instance of PolygonGroupRepresentation
         * @constructor
         * @param {dsector.PolygonGroup} polygonGroup - The parent polygon group
         * @param {string} name - The name of the representation
         * @param {boolean} visible - The visibility of the representation
         * @param {number} e00 - Element of the transformation matrix
         * @param {number} e10 - Element of the transformation matrix
         * @param {number} e20 - Element of the transformation matrix
         * @param {number} e30 - Element of the transformation matrix
         * @param {number} e01 - Element of the transformation matrix
         * @param {number} e11 - Element of the transformation matrix
         * @param {number} e21 - Element of the transformation matrix
         * @param {number} e31 - Element of the transformation matrix
         * @param {number} e02 - Element of the transformation matrix
         * @param {number} e12 - Element of the transformation matrix
         * @param {number} e22 - Element of the transformation matrix
         * @param {number} e32 - Element of the transformation matrix
         * @param {number} e03 - Element of the transformation matrix
         * @param {number} e13 - Element of the transformation matrix
         * @param {number} e23 - Element of the transformation matrix
         * @param {number} e33 - Element of the transformation matrix
         */
        constructor(polygonGroup, name, visible, e00, e10, e20, e30, e01,
                    e11, e21, e31, e02, e12, e22, e32, e03, e13, e23, e33) {
            this.parentPolygonGroup = polygonGroup || null;
            this.id = CWSYSTEM.NumberTools.randomLong();
            this.name = name || null;
            this.visibility = visible;
            this.transformationMatrix = new dsector.Matrix4f(e00, e10, e20, e30, e01, e11,
                e21, e31, e02, e12, e22, e32, e03, e13, e23, e33);
            this.active = false;
        }

        /**
         * Retrieves all polygon group representations from a given matrix
         *
         * @static
         * @param {dsector.Model3DMatrix} matrix - The matrix to search for polygon groups
         * @returns {Array} An array of all polygon group representations
         */
        static allPolygonGroupRepresentations(matrix) {
            const arrayList = ([]);
            const polygonIterator = new dsector.PolygonIterator(
                matrix, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const polygonGroup = polygonIterator.nextPolygonGroup();
                if (polygonGroup == null) {
                    return arrayList;
                }
                for (let i = -1; i < polygonGroup.transposedRepresentations.length; ++i) {
                    let pgr;
                    if (i === -1) {
                        pgr = polygonGroup.directRepresentation;
                    } else {
                        pgr = polygonGroup.transposedRepresentations[i];
                    }
                    arrayList.push(pgr);
                }
            }
        }

        /**
         * Checks if active representations have at least one direct representation
         *
         * @static
         * @returns {boolean} True if there's at least one active direct representation, false otherwise
         */
        static activeRepresentationsHaveAtLeastOneDirectRepresentation() {
            const arrayList =
                PolygonGroupRepresentation.allPolygonGroupRepresentations(dsector.DSReference.model3DMatrix);
            for (let index = 0; index < arrayList.length; index++) {
                let o = arrayList[index];
                {
                    const pgr = o;
                    if (pgr.active && pgr.isDirectRepresentation()) {
                        return true;
                    }
                }
            }
            return false;
        }

        /**
         * Checks if this representation is a direct representation
         *
         * @returns {boolean} True if it's a direct representation, false otherwise
         */
        isDirectRepresentation() {
            return this.parentPolygonGroup.directRepresentation === this;
        }

        /**
         * Checks if this representation is visible
         *
         * @returns {boolean} True if the representation is visible, false otherwise
         */
        visible() {
            return this.parentPolygonGroup.visible() && this.visibility;
        }

        /**
         * Sets this representation as active
         */
        setActive() {
            if (!CWSYSTEM.Environment.shiftKeyPressed) {
                const arrayList =
                    PolygonGroupRepresentation.allPolygonGroupRepresentations(dsector.DSReference.model3DMatrix);
                for (let index = 0; index < arrayList.length; index++) {
                    let o = arrayList[index];
                    {
                        const gr = o;
                        gr.active = false;
                    }
                }
            }
            this.active = true;
            if (this.isDirectRepresentation()) {
                for (let i = 0; i < this.parentPolygonGroup.polygons.length; ++i) {
                    const polygon = this.parentPolygonGroup.polygons[i];
                }
            }
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
    }

    dsector.PolygonGroupRepresentation = PolygonGroupRepresentation;
    PolygonGroupRepresentation["__class"] = "dsector.PolygonGroupRepresentation";
})(dsector || (dsector = {}));