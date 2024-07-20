/**/
(function (dsector) {
    /**
     * @classdesc Iterates over polygons, polygon groups, and model folders in a 3D model matrix.
     * @class
     * @memberof dsector
     */
    class PolygonIterator {
        /**
         * @constructor
         * @param {Model3DMatrix} m3dm - The 3D model matrix to iterate over.
         * @param {number} sel - The selection criteria for polygon groups.
         */
        constructor(m3dm, sel) {
            this.modelFolders = null;
            this.modelFolderIterator = 0;
            this.polygonGroupIterator = 0;
            this.polygonIterator = 0;
            this.vertexIterator = 0;
            this.finished = false;
            this.__lastFetchedModelFolder = null;
            this.__lastFetchedPolygonGroup = null;
            this.__lastFetchedPolygon = null;
            this.__lastFetchedVertex = null;
            this.selectionCriteria = 0;
            this.__numberOfPolygons = 0;
            this.model3DMatrix = m3dm != null ? m3dm : null;
            this.selectionCriteria = sel;
            this.prepareLinearList();
        }

        /**
         * @private
         * @method prepareLinearList
         * @description Prepares a linear list of model folders for iteration.
         */
        prepareLinearList() {
            this.modelFolders = ([]);
            this.addModelFoldersFromParentFolder(this.model3DMatrix.rootFolder);
            this.modelFolderIterator = 0;
            this.polygonGroupIterator = 0;
            this.polygonIterator = 0;
            this.vertexIterator = 0;
            this.__numberOfPolygons = 0;
            this.finished = this.modelFolders.length === 0;
        }

        /**
         * @private
         * @method polygonGroupMatchesCriteria
         * @param {PolygonGroup} pg - The polygon group to check.
         * @returns {boolean} True if the polygon group matches the selection criteria, false otherwise.
         */
        polygonGroupMatchesCriteria(pg) {
            if (this.selectionCriteria === PolygonIterator.ACTIVE_POLYGON_GROUPS && !pg.directRepresentation.active) {
                return false;
            } else {
                return this.selectionCriteria !== PolygonIterator.VISIBLE_POLYGON_GROUPS || pg.visible();
            }
        }

        /**
         * @private
         * @method addModelFoldersFromParentFolder
         * @param {ModelFolder} folder - The parent folder to add model folders from.
         * @description Recursively adds model folders from the parent folder to the linear list.
         */
        addModelFoldersFromParentFolder(folder) {
            let i;
            for (i = 0; i < folder.polygonGroups.length; ++i) {
                const var3 = folder.polygonGroups[i];
                if (this.polygonGroupMatchesCriteria(var3)) {
                    this.__numberOfPolygons += var3.polygons.length;
                }
            }
            this.modelFolders.push(folder);
            for (i = 0; i < folder.modelFolders.length; ++i) {
                const var4 = folder.modelFolders[i];
                this.addModelFoldersFromParentFolder(var4);
            }
        }

        /**
         * @method nextVertex
         * @returns {Vertex|null} The next vertex in the iteration, or null if finished.
         * @description Moves to the next vertex in the iteration.
         */
        nextVertex() {
            if (this.finished) {
                return null;
            } else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if (this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextVertex();
                } else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    if (!this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup)) {
                        this.nextPolygonGroup();
                        return this.nextVertex();
                    } else if (this.__lastFetchedPolygonGroup.polygons.length === 0) {
                        this.nextPolygonGroup();
                        return this.nextVertex();
                    } else {
                        this.__lastFetchedPolygon = this.__lastFetchedPolygonGroup.polygons[this.polygonIterator];
                        switch ((this.vertexIterator)) {
                            case 0:
                                this.__lastFetchedVertex = this.__lastFetchedPolygon.v1;
                                break;
                            case 1:
                                this.__lastFetchedVertex = this.__lastFetchedPolygon.v2;
                                break;
                            case 2:
                                this.__lastFetchedVertex = this.__lastFetchedPolygon.v3;
                                break;
                            default:
                                dsector.DSReference.alertManager.messageQueued("Invalid value for vertexIterator " + this.vertexIterator + " in PolygonIterator.nextVertex()");
                                return null;
                        }
                        ++this.vertexIterator;
                        if (this.vertexIterator > 2) {
                            this.vertexIterator = 0;
                            ++this.polygonIterator;
                            if (this.polygonIterator > this.__lastFetchedPolygonGroup.polygons.length - 1) {
                                this.polygonIterator = 0;
                                ++this.polygonGroupIterator;
                                if (this.polygonGroupIterator > this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                                    this.polygonGroupIterator = 0;
                                    ++this.modelFolderIterator;
                                    if (this.modelFolderIterator > this.modelFolders.length - 1) {
                                        this.finished = true;
                                    }
                                }
                            }
                        }
                        return this.__lastFetchedVertex;
                    }
                }
            }
        }

        /**
         * @method nextPolygon
         * @returns {Polygon|null} The next polygon in the iteration, or null if finished.
         * @description Moves to the next polygon in the iteration.
         */
        nextPolygon() {
            if (this.finished) {
                return null;
            } else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if (this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextPolygon();
                } else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    if (!this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup)) {
                        this.nextPolygonGroup();
                        return this.nextPolygon();
                    } else if (this.__lastFetchedPolygonGroup.polygons.length === 0) {
                        this.nextPolygonGroup();
                        return this.nextPolygon();
                    } else {
                        this.__lastFetchedPolygon = this.__lastFetchedPolygonGroup.polygons[this.polygonIterator];
                        this.vertexIterator = 0;
                        ++this.polygonIterator;
                        if (this.polygonIterator > this.__lastFetchedPolygonGroup.polygons.length - 1) {
                            this.polygonIterator = 0;
                            ++this.polygonGroupIterator;
                            if (this.polygonGroupIterator > this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                                this.polygonGroupIterator = 0;
                                ++this.modelFolderIterator;
                                if (this.modelFolderIterator > this.modelFolders.length - 1) {
                                    this.finished = true;
                                }
                            }
                        }
                        return this.__lastFetchedPolygon;
                    }
                }
            }
        }

        /**
         * @method nextPolygonGroup
         * @returns {PolygonGroup|null} The next polygon group in the iteration, or null if finished.
         * @description Moves to the next polygon group in the iteration.
         */
        nextPolygonGroup() {
            if (this.finished) {
                return null;
            } else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if (this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextPolygonGroup();
                } else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    const pgb = !this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup);
                    this.polygonIterator = 0;
                    this.vertexIterator = 0;
                    ++this.polygonGroupIterator;
                    if (this.polygonGroupIterator > this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                        this.polygonGroupIterator = 0;
                        ++this.modelFolderIterator;
                        if (this.modelFolderIterator > this.modelFolders.length - 1) {
                            this.finished = true;
                        }
                    }
                    return pgb ? this.nextPolygonGroup() : this.__lastFetchedPolygonGroup;
                }
            }
        }

        /**
         * @method nextModelFolder
         * @returns {ModelFolder|null} The next model folder in the iteration, or null if finished.
         * @description Moves to the next model folder in the iteration.
         */
        nextModelFolder() {
            if (this.finished) {
                return null;
            } else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                this.polygonGroupIterator = 0;
                this.polygonIterator = 0;
                this.vertexIterator = 0;
                ++this.modelFolderIterator;
                if (this.modelFolderIterator > this.modelFolders.length - 1) {
                    this.finished = true;
                }
                return this.__lastFetchedModelFolder;
            }
        }

        /**
         * @method lastFetchedModelFolder
         * @returns {ModelFolder} The last fetched model folder.
         */
        lastFetchedModelFolder() {
            return this.__lastFetchedModelFolder;
        }

        /**
         * @method lastFetchedPolygonGroup
         * @returns {PolygonGroup} The last fetched polygon group.
         */
        lastFetchedPolygonGroup() {
            return this.__lastFetchedPolygonGroup;
        }

        /**
         * @method lastFetchedPolygon
         * @returns {Polygon} The last fetched polygon.
         */
        lastFetchedPolygon() {
            return this.__lastFetchedPolygon;
        }

        /**
         * @method lastFetchedVertex
         * @returns {Vertex} The last fetched vertex.
         */
        lastFetchedVertex() {
            return this.__lastFetchedVertex;
        }

        /**
         * @method numberOfPolygons
         * @returns {number} The total number of polygons in the iteration.
         */
        numberOfPolygons() {
            return this.__numberOfPolygons;
        }
    }

    /**
     * @static
     * @readonly
     * @type {number}
     * @description Constant representing the selection of all polygon groups.
     */
    PolygonIterator.ALL_POLYGON_GROUPS = 0;
    /**
     * @static
     * @readonly
     * @type {number}
     * @description Constant representing the selection of active polygon groups only.
     */
    PolygonIterator.ACTIVE_POLYGON_GROUPS = 1;
    /**
     * @static
     * @readonly
     * @type {number}
     * @description Constant representing the selection of visible polygon groups only.
     */
    PolygonIterator.VISIBLE_POLYGON_GROUPS = 2;
    dsector.PolygonIterator = PolygonIterator;
    PolygonIterator["__class"] = "dsector.PolygonIterator";
})(dsector || (dsector = {}));
