(function (dsector) {
    /**
     * Represents a 3D model with position and rotation.
     * This class provides methods to manage and manipulate the model's position, rotation, and intersected polygon.
     *
     * @property {string} __name - The name of the model.
     * @property {dsector.Model3DMatrix} model3DMatrix - The 3D matrix of the model.
     * @property {dsector.Matrix4f} rotation - The rotation matrix of the model.
     * @property {number} x - The x-coordinate of the model's position.
     * @property {number} y - The y-coordinate of the model's position.
     * @property {number} z - The z-coordinate of the model's position.
     * @property {Polygon} intersectedPolygon - The intersected polygon.
     * @property {number} numberOfCopiedPolygons - The number of copied polygons.
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
    class PositionedModel {
        /**
         * Creates a new PositionedModel.
         * @param {string} [name] - The name of the model. If not provided, a random name will be generated.
         * @param {dsector.Model3DMatrix} m3dMatrix - The 3D matrix of the model.
         * @param {dsector.Matrix4f} rot - The rot matrix of the model.
         * @param {number} x - The x-coordinate of the model's position.
         * @param {number} y - The y-coordinate of the model's position.
         * @param {number} z - The z-coordinate of the model's position.
         */
        constructor(name, m3dMatrix, rot = null,
                    x = 0, y = 0, z = 0) {
            this.model3DMatrix = null; // default

            this.__name = name == null ? "" + ((Math.random() * 1.0E9) | 0) : name;
            this.model3DMatrix = m3dMatrix;
            this.rotation = rot;
            this.x = x;
            this.y = y;
            this.z = z;
            this.intersectedPolygon = null;
            this.numberOfCopiedPolygons = 0;
        }

        /**
         * Creates a positioned model from a group of polygons.
         *
         * @param {string} s - The base name for the model.
         * @param {Array<Polygon>} list - The list of polygons.
         * @returns {PositionedModel} The created positioned model.
         */
        static createPositionedModelFromGroupOfPolygons(s, list) {
            const model3DMatrix1 = new dsector.Model3DMatrix();
            model3DMatrix1.name = `${s}${Math.random()}`;

            const polygonGroup = new dsector.PolygonGroup("ghost", model3DMatrix1.rootFolder,
                true, "Direct Representation", true,
                5, 30, 10);
            model3DMatrix1.rootFolder.polygonGroups.push(polygonGroup);

            // Calculate average values for x, y, and z
            const rX = list.reduce((a, b) =>
                a + b.v1.x + b.v2.x + b.v3.x, 0) / list.length * 3;
            const rY = list.reduce((a, b) =>
                a + b.v1.y + b.v2.y + b.v3.y, 0) / list.length * 3;
            const rZ = list.reduce((a, b) =>
                a + b.v1.z + b.v2.z + b.v3.z, 0) / list.length * 3;

            // Center the model around the origin by subtracting the average values from each vertex
            for (const polygon of list) {
                const {v1, v2, v3} = polygon;
                v1.x -= rX;
                v1.y -= rY;
                v1.z -= rZ;
                v2.x -= rX;
                v2.y -= rY;
                v2.z -= rZ;
                v3.x -= rX;
                v3.y -= rY;
                v3.z -= rZ;
                model3DMatrix1.addPolygon(polygonGroup, polygon, 0);
            }

            // Return the positioned model
            return new PositionedModel(model3DMatrix1.name, model3DMatrix1, new dsector.Matrix4f(), rX, rY, rZ);
        }

        /**
         * Returns the name of the [PositionedModel]{@link dsector.PositionedModel}.
         *
         * @returns {string} name of the model
         */
        name() {
            return this.__name;
        }

        /**
         * Checks if the positioned model intersects with another model.
         *
         * @param {dsector.PositionedModel} positionedModel - The other positioned model to check intersection with.
         * @returns {boolean} True if there is an intersection, false otherwise.
         */
        intersectsWith(positionedModel) {
            if (positionedModel === this || positionedModel.model3DMatrix == null || this.model3DMatrix == null) {
                return false;
            }

            const modelCenter = this.model3DMatrix.maximumDistanceOfVertexToCenterWhenModelLoaded();
            const posModelCenter = positionedModel.model3DMatrix.maximumDistanceOfVertexToCenterWhenModelLoaded();
            const pos = Math.hypot(
                this.x - positionedModel.x,
                this.y - positionedModel.y,
                this.z - positionedModel.z
            );

            if (pos > Math.fround(modelCenter + posModelCenter)) {
                return false;
            }

            this.projectPolygonsToStudioSpace(1, this);
            const {xMax: xMax1, xMin: xMin1, yMax: yMax1, yMin: yMin1, zMax: zMax1, zMin: zMin1} = this;
            const polygonNumber = this.numberOfCopiedPolygons;

            this.projectPolygonsToStudioSpace(2, positionedModel);
            const {xMax: xMax2, xMin: xMin2, yMax: yMax2, yMin: yMin2, zMax: zMax2, zMin: zMin2} = positionedModel;
            const numberOfCopiedPolygons1 = this.numberOfCopiedPolygons;

            if (xMax1 < xMin2 || xMin1 > xMax2 || yMax1 < yMin2 || yMin1 > yMax2 || zMax1 < zMin2 || zMin1 > zMax2) {
                return false;
            }

            for (let i = 0; i < polygonNumber; ++i) {
                const clPolygon = PositionedModel.polygonCollisionDetectionBufferA[i];

                for (let j = 0; j < numberOfCopiedPolygons1; ++j) {
                    const colourlessPolygon = PositionedModel.polygonCollisionDetectionBufferB[j];
                    const vert1 = [clPolygon.v1.x, clPolygon.v1.y, clPolygon.v1.z];
                    const vert2 = [clPolygon.v2.x, clPolygon.v2.y, clPolygon.v2.z];
                    const vert3 = [clPolygon.v3.x, clPolygon.v3.y, clPolygon.v3.z];
                    const vert4 = [colourlessPolygon.v1.x, colourlessPolygon.v1.y, colourlessPolygon.v1.z];
                    const vert5 = [colourlessPolygon.v2.x, colourlessPolygon.v2.y, colourlessPolygon.v2.z];
                    const vert6 = [colourlessPolygon.v3.x, colourlessPolygon.v3.y, colourlessPolygon.v3.z];

                    if (dsector.PolygonIntersection.tri_tri_intersect(vert1, vert2, vert3, vert4, vert5, vert6) === 1) {
                        this.intersectedPolygon = new dsector.Polygon(
                            clPolygon.v1, clPolygon.v2, clPolygon.v3,
                            new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white())
                        );
                        positionedModel.intersectedPolygon = new dsector.Polygon(
                            colourlessPolygon.v1, colourlessPolygon.v2, colourlessPolygon.v3,
                            new CWSYSTEM.CWColor(CWSYSTEM.CWColor.__white())
                        );
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Projects polygons to studio space.
         *
         * @private
         * @param {number} i - Buffer selector (1 or 2).
         * @param {PositionedModel} positionedModel - The model to project.
         */
        projectPolygonsToStudioSpace(i, positionedModel) {
            if (++PositionedModel.numberOfProjections % 1000 === 0) {
                if (i === 1) {
                    PositionedModel.polygonCollisionDetectionBufferA = null;
                } else {
                    PositionedModel.polygonCollisionDetectionBufferB = null;
                }
            }

            const model3DMatrix1 = positionedModel.model3DMatrix;
            const polygonIterator = new dsector.PolygonIterator(
                model3DMatrix1, dsector.PolygonIterator.ALL_POLYGON_GROUPS
            );

            this.numberOfCopiedPolygons = 0;
            let xMax = -1.0E20;
            let xMin = 1.0E20;
            let yMax = -1.0E20;
            let yMin = 1.0E20;
            let zMax = -1.0E20;
            let zMin = 1.0E20;

            while (true) {
                let polygonGroup;
                do {
                    polygonGroup = polygonIterator.nextPolygonGroup();
                    if (polygonGroup == null) {
                        return;
                    }
                } while (CWSYSTEM.CWStringTools.findIgnoreCase$Str$Str(polygonGroup.name, "ghost") === -1);

                for (let j = -1; j < polygonGroup.transposedRepresentations.length; ++j) {
                    let pgr;
                    const matrix4f = new dsector.Matrix4f();

                    if (j === -1) {
                        pgr = polygonGroup.directRepresentation;
                        //CWSYSTEM.Debug.println("PGR name: " + pgr.name);
                    } else {
                        pgr = polygonGroup.transposedRepresentations[j];
                        matrix4f.set(pgr.transformationMatrix);
                    }

                    matrix4f.preMultiply(positionedModel.rotation);
                    matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(
                        Math.fround(positionedModel.x),
                        Math.fround(positionedModel.y),
                        Math.fround(positionedModel.z)
                    ));

                    for (let k = 0; k < polygonGroup.polygons.length; ++k) {
                        const polygon = polygonGroup.polygons[k];
                        let len;
                        let len2;
                        let buffer =
                            i === 1
                                ? PositionedModel.polygonCollisionDetectionBufferA
                                : PositionedModel.polygonCollisionDetectionBufferB;

                        if (buffer == null || buffer.length < this.numberOfCopiedPolygons) {
                            const bufferSize = buffer == null ? 1000 : (buffer.length * 11 / 10) | 0;
                            buffer = Array(bufferSize).fill(null);

                            for (len = 0; len < bufferSize; ++len) {
                                buffer[len] = new dsector.ColourlessPolygon(
                                    new dsector.Vertex(0.0, 0.0, 0.0),
                                    new dsector.Vertex(0.0, 0.0, 0.0),
                                    new dsector.Vertex(0.0, 0.0, 0.0)
                                );
                            }

                            if (i === 1) {
                                PositionedModel.polygonCollisionDetectionBufferA = buffer;
                            } else {
                                PositionedModel.polygonCollisionDetectionBufferB = buffer;
                            }
                        }

                        const colourlessPolygon = buffer[this.numberOfCopiedPolygons++];
                        colourlessPolygon.v1.x = polygon.v1.x;
                        colourlessPolygon.v1.y = polygon.v1.y;
                        colourlessPolygon.v1.z = polygon.v1.z;
                        colourlessPolygon.v2.x = polygon.v2.x;
                        colourlessPolygon.v2.y = polygon.v2.y;
                        colourlessPolygon.v2.z = polygon.v2.z;
                        colourlessPolygon.v3.x = polygon.v3.x;
                        colourlessPolygon.v3.y = polygon.v3.y;
                        colourlessPolygon.v3.z = polygon.v3.z;
                        colourlessPolygon.v1.transform(matrix4f);
                        colourlessPolygon.v2.transform(matrix4f);
                        colourlessPolygon.v3.transform(matrix4f);

                        xMax = Math.max(xMax, colourlessPolygon.v1.x, colourlessPolygon.v2.x, colourlessPolygon.v3.x);
                        xMin = Math.min(xMin, colourlessPolygon.v1.x, colourlessPolygon.v2.x, colourlessPolygon.v3.x);
                        yMax = Math.max(yMax, colourlessPolygon.v1.y, colourlessPolygon.v2.y, colourlessPolygon.v3.y);
                        yMin = Math.min(yMin, colourlessPolygon.v1.y, colourlessPolygon.v2.y, colourlessPolygon.v3.y);
                        zMax = Math.max(zMax, colourlessPolygon.v1.z, colourlessPolygon.v2.z, colourlessPolygon.v3.z);
                        zMin = Math.min(zMin, colourlessPolygon.v1.z, colourlessPolygon.v2.z, colourlessPolygon.v3.z);
                    }
                }
            }
        }
    }

    /**
     * Static buffer for polygon collision detection.
     *
     * @static
     * @type {Object}
     */
    PositionedModel.polygonCollisionDetectionBufferA = null;
    /**
     * Static buffer for polygon collision detection.
     *
     * @static
     * @type {Object}
     */
    PositionedModel.polygonCollisionDetectionBufferB = null;
    PositionedModel.xMax = 0;
    PositionedModel.xMin = 0;
    PositionedModel.yMax = 0;
    PositionedModel.yMin = 0;
    PositionedModel.zMax = 0;
    PositionedModel.zMin = 0;
    /**
     * Number of projections.
     *
     * @static
     * @type {number}
     */
    PositionedModel.numberOfProjections = 0;
    dsector.PositionedModel = PositionedModel;
    PositionedModel["__class"] = "dsector.PositionedModel";
})(dsector || (dsector = {}));