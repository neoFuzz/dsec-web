/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class PolygonIterator {
        constructor(var1, var2) {
            if (this.model3DMatrix === undefined) {
                this.model3DMatrix = null;
            }
            if (this.modelFolders === undefined) {
                this.modelFolders = null;
            }
            if (this.modelFolderIterator === undefined) {
                this.modelFolderIterator = 0;
            }
            if (this.polygonGroupIterator === undefined) {
                this.polygonGroupIterator = 0;
            }
            if (this.polygonIterator === undefined) {
                this.polygonIterator = 0;
            }
            if (this.vertexIterator === undefined) {
                this.vertexIterator = 0;
            }
            if (this.finished === undefined) {
                this.finished = false;
            }
            if (this.__lastFetchedModelFolder === undefined) {
                this.__lastFetchedModelFolder = null;
            }
            if (this.__lastFetchedPolygonGroup === undefined) {
                this.__lastFetchedPolygonGroup = null;
            }
            if (this.__lastFetchedPolygon === undefined) {
                this.__lastFetchedPolygon = null;
            }
            if (this.__lastFetchedVertex === undefined) {
                this.__lastFetchedVertex = null;
            }
            if (this.selectionCriteria === undefined) {
                this.selectionCriteria = 0;
            }
            if (this.__numberOfPolygons === undefined) {
                this.__numberOfPolygons = 0;
            }
            this.model3DMatrix = var1;
            this.selectionCriteria = var2;
            this.prepareLinearList();
        }
        /** @private */ prepareLinearList() {
            this.modelFolders = ([]);
            this.addModelFoldersFromParentFolder(this.model3DMatrix.rootFolder);
            this.modelFolderIterator = 0;
            this.polygonGroupIterator = 0;
            this.polygonIterator = 0;
            this.vertexIterator = 0;
            this.__numberOfPolygons = 0;
            this.finished = /* size */ this.modelFolders.length === 0;
        }
        /** @private */ polygonGroupMatchesCriteria(var1) {
            if (this.selectionCriteria === PolygonIterator.ACTIVE_POLYGON_GROUPS && !var1.directRepresentation.active) {
                return false;
            }
            else {
                return this.selectionCriteria !== PolygonIterator.VISIBLE_POLYGON_GROUPS || var1.visible();
            }
        }
        /** @private */ addModelFoldersFromParentFolder(var1) {
            let var2;
            for (var2 = 0; var2 < /* size */ var1.polygonGroups.length; ++var2) {
                {
                    const var3 = var1.polygonGroups[var2];
                    if (this.polygonGroupMatchesCriteria(var3)) {
                        this.__numberOfPolygons += /* size */ var3.polygons.length;
                    }
                }
                ;
            }
            /* add */ (this.modelFolders.push(var1) > 0);
            for (var2 = 0; var2 < /* size */ var1.modelFolders.length; ++var2) {
                {
                    const var4 = var1.modelFolders[var2];
                    this.addModelFoldersFromParentFolder(var4);
                }
                ;
            }
        }
        nextVertex() {
            if (this.finished) {
                return null;
            }
            else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if ( /* size */this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextVertex();
                }
                else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    if (!this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup)) {
                        this.nextPolygonGroup();
                        return this.nextVertex();
                    }
                    else if ( /* size */this.__lastFetchedPolygonGroup.polygons.length === 0) {
                        this.nextPolygonGroup();
                        return this.nextVertex();
                    }
                    else {
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
                            if (this.polygonIterator > /* size */ this.__lastFetchedPolygonGroup.polygons.length - 1) {
                                this.polygonIterator = 0;
                                ++this.polygonGroupIterator;
                                if (this.polygonGroupIterator > /* size */ this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                                    this.polygonGroupIterator = 0;
                                    ++this.modelFolderIterator;
                                    if (this.modelFolderIterator > /* size */ this.modelFolders.length - 1) {
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
        nextPolygon() {
            if (this.finished) {
                return null;
            }
            else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if ( /* size */this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextPolygon();
                }
                else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    if (!this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup)) {
                        this.nextPolygonGroup();
                        return this.nextPolygon();
                    }
                    else if ( /* size */this.__lastFetchedPolygonGroup.polygons.length === 0) {
                        this.nextPolygonGroup();
                        return this.nextPolygon();
                    }
                    else {
                        this.__lastFetchedPolygon = this.__lastFetchedPolygonGroup.polygons[this.polygonIterator];
                        this.vertexIterator = 0;
                        ++this.polygonIterator;
                        if (this.polygonIterator > /* size */ this.__lastFetchedPolygonGroup.polygons.length - 1) {
                            this.polygonIterator = 0;
                            ++this.polygonGroupIterator;
                            if (this.polygonGroupIterator > /* size */ this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                                this.polygonGroupIterator = 0;
                                ++this.modelFolderIterator;
                                if (this.modelFolderIterator > /* size */ this.modelFolders.length - 1) {
                                    this.finished = true;
                                }
                            }
                        }
                        return this.__lastFetchedPolygon;
                    }
                }
            }
        }
        nextPolygonGroup() {
            if (this.finished) {
                return null;
            }
            else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                if ( /* size */this.__lastFetchedModelFolder.polygonGroups.length === 0) {
                    this.nextModelFolder();
                    return this.nextPolygonGroup();
                }
                else {
                    this.__lastFetchedPolygonGroup = this.__lastFetchedModelFolder.polygonGroups[this.polygonGroupIterator];
                    const var1 = !this.polygonGroupMatchesCriteria(this.__lastFetchedPolygonGroup);
                    this.polygonIterator = 0;
                    this.vertexIterator = 0;
                    ++this.polygonGroupIterator;
                    if (this.polygonGroupIterator > /* size */ this.__lastFetchedModelFolder.polygonGroups.length - 1) {
                        this.polygonGroupIterator = 0;
                        ++this.modelFolderIterator;
                        if (this.modelFolderIterator > /* size */ this.modelFolders.length - 1) {
                            this.finished = true;
                        }
                    }
                    return var1 ? this.nextPolygonGroup() : this.__lastFetchedPolygonGroup;
                }
            }
        }
        nextModelFolder() {
            if (this.finished) {
                return null;
            }
            else {
                this.__lastFetchedModelFolder = this.modelFolders[this.modelFolderIterator];
                this.polygonGroupIterator = 0;
                this.polygonIterator = 0;
                this.vertexIterator = 0;
                ++this.modelFolderIterator;
                if (this.modelFolderIterator > /* size */ this.modelFolders.length - 1) {
                    this.finished = true;
                }
                return this.__lastFetchedModelFolder;
            }
        }
        lastFetchedModelFolder() {
            return this.__lastFetchedModelFolder;
        }
        lastFetchedPolygonGroup() {
            return this.__lastFetchedPolygonGroup;
        }
        lastFetchedPolygon() {
            return this.__lastFetchedPolygon;
        }
        lastFetchedVertex() {
            return this.__lastFetchedVertex;
        }
        numberOfPolygons() {
            return this.__numberOfPolygons;
        }
    }
    PolygonIterator.ALL_POLYGON_GROUPS = 0;
    PolygonIterator.ACTIVE_POLYGON_GROUPS = 1;
    PolygonIterator.VISIBLE_POLYGON_GROUPS = 2;
    dsector.PolygonIterator = PolygonIterator;
    PolygonIterator["__class"] = "dsector.PolygonIterator";
})(dsector || (dsector = {}));
