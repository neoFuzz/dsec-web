/* Re-written from Java */
var dsector;
(function (dsector) {
    class PositionedModel {
        constructor(name, model3DMatrix, rotation, x, y, z) {
            if (this.__name === undefined) {
                this.__name = null;
            }
            if (this.model3DMatrix === undefined) {
                this.model3DMatrix = null;
            }
            if (this.rotation === undefined) {
                this.rotation = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.z === undefined) {
                this.z = 0;
            }
            if (this.intersectedPolygon === undefined) {
                this.intersectedPolygon = null;
            }
            if (this.numberOfCopiedPolygons === undefined) {
                this.numberOfCopiedPolygons = 0;
            }
            if (name == null) {
                name = "" + ((Math.random() * 1.0E9) | 0);
            }
            this.__name = name;
            this.model3DMatrix = model3DMatrix;
            this.rotation = rotation;
            this.x = x;
            this.y = y;
            this.z = z;
        }

        static createPositionedModelFromGroupOfPolygons(s, list) {
            const str = s + Math.random();
            const model3DMatrix1 = new dsector.Model3DMatrix();
            model3DMatrix1.name = str;
            const polygonGroup = new dsector.PolygonGroup("ghost", model3DMatrix1.rootFolder,
                true, "Direct Representation", true, 5, 30, 10);
            model3DMatrix1.rootFolder.polygonGroups.push(polygonGroup);
            let x = 0.0;
            let y = 0.0;
            let z = 0.0;
            let i;
            for (i = 0; i < list.length; ++i) {
                const var9 = list[i];
                x += Math.fround(var9.v1.x + var9.v2.x + var9.v3.x);
                y += Math.fround(var9.v1.y + var9.v2.y + var9.v3.y);
                z += Math.fround(var9.v1.z + var9.v2.z + var9.v3.z);
            }
            i = list.length * 3;
            const var14 = Math.fround(x / i);
            const var10 = Math.fround(y / i);
            const var11 = Math.fround(z / i);
            for (let index = 0; index < list.length; index++) {
                const polygon = list[index];
                let list1 = polygon.v1;
                list1.x -= var14;
                list1 = polygon.v2;
                list1.x -= var14;
                list1 = polygon.v3;
                list1.x -= var14;
                list1 = polygon.v1;
                list1.y -= var10;
                list1 = polygon.v2;
                list1.y -= var10;
                list1 = polygon.v3;
                list1.y -= var10;
                list1 = polygon.v1;
                list1.z -= var11;
                list1 = polygon.v2;
                list1.z -= var11;
                list1 = polygon.v3;
                list1.z -= var11;
                model3DMatrix1.addPolygon(polygonGroup, polygon, 0);
            }
            return new PositionedModel(str, model3DMatrix1, new dsector.Matrix4f(), var14, var10, var11);
        }

        name() {
            return this.__name;
        }

        intersectsWith(positionedModel) {
            if (positionedModel !== this && positionedModel.model3DMatrix != null && this.model3DMatrix != null) {
                const modelCenter = this.model3DMatrix.maximumDistanceOfVertexToCenterWhenModelLoaded();
                const posModelCenter = positionedModel.model3DMatrix.maximumDistanceOfVertexToCenterWhenModelLoaded();
                const pos = Math.fround(Math.sqrt(
                    (this.x - positionedModel.x) * (this.x - positionedModel.x) + (this.y - positionedModel.y) *
                    (this.y - positionedModel.y) + (this.z - positionedModel.z) * (this.z - positionedModel.z)));
                if (!(pos > Math.fround(modelCenter + posModelCenter))) {
                    this.projectPolygonsToStudioSpace(1, this);
                    const xMax1 = PositionedModel.xMax;
                    const xMin1 = PositionedModel.xMin;
                    const yMax1 = PositionedModel.yMax;
                    const yMin1 = PositionedModel.yMin;
                    const zMax1 = PositionedModel.zMax;
                    const zMin1 = PositionedModel.zMin;
                    const polygonNumber = this.numberOfCopiedPolygons;
                    this.projectPolygonsToStudioSpace(2, positionedModel);
                    const xMax2 = PositionedModel.xMax;
                    const xMin2 = PositionedModel.xMin;
                    const yMax2 = PositionedModel.yMax;
                    const yMin2 = PositionedModel.yMin;
                    const zMax2 = PositionedModel.zMax;
                    const zMin2 = PositionedModel.zMin;
                    const numberOfCopiedPolygons1 = this.numberOfCopiedPolygons;
                    if (!(xMax1 < xMin2) && !(xMin1 > xMax2) && !(yMax1 < yMin2) && !(yMin1 > yMax2) &&
                        !(zMax1 < zMin2) && !(zMin1 > zMax2)) {
                        for (let i = 0; i < polygonNumber; ++i) {
                            const clPolygon = PositionedModel.polygonCollisionDetectionBufferA[i];
                            for (let j = 0; j < numberOfCopiedPolygons1; ++j) {
                                const colourlessPolygon = PositionedModel.polygonCollisionDetectionBufferB[j];
                                const vert1 = [0, 0, 0];
                                const vert2 = [0, 0, 0];
                                const vert3 = [0, 0, 0];
                                const vert4 = [0, 0, 0];
                                const vert5 = [0, 0, 0];
                                const vert6 = [0, 0, 0];
                                vert1[0] = clPolygon.v1.x;
                                vert1[1] = clPolygon.v1.y;
                                vert1[2] = clPolygon.v1.z;
                                vert2[0] = clPolygon.v2.x;
                                vert2[1] = clPolygon.v2.y;
                                vert2[2] = clPolygon.v2.z;
                                vert3[0] = clPolygon.v3.x;
                                vert3[1] = clPolygon.v3.y;
                                vert3[2] = clPolygon.v3.z;
                                vert4[0] = colourlessPolygon.v1.x;
                                vert4[1] = colourlessPolygon.v1.y;
                                vert4[2] = colourlessPolygon.v1.z;
                                vert5[0] = colourlessPolygon.v2.x;
                                vert5[1] = colourlessPolygon.v2.y;
                                vert5[2] = colourlessPolygon.v2.z;
                                vert6[0] = colourlessPolygon.v3.x;
                                vert6[1] = colourlessPolygon.v3.y;
                                vert6[2] = colourlessPolygon.v3.z;
                                if (dsector.PolygonIntersection.tri_tri_intersect(
                                    vert1, vert2, vert3, vert4, vert5, vert6) === 1) {
                                    this.intersectedPolygon = new dsector.Polygon(clPolygon.v1, clPolygon.v2,
                                        clPolygon.v3, new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$()));
                                    positionedModel.intersectedPolygon = new dsector.Polygon(colourlessPolygon.v1,
                                        colourlessPolygon.v2, colourlessPolygon.v3,
                                        new CWSYSTEM.CWColor(CWSYSTEM.CWColor.white_$LI$()));
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        /** @private */
        projectPolygonsToStudioSpace(i, positionedModel) {
            if (PositionedModel.numberOfProjections++ % 1000 === 0) {
                if (i === 1) {
                    PositionedModel.polygonCollisionDetectionBufferA = null;
                } else {
                    PositionedModel.polygonCollisionDetectionBufferB = null;
                }
            }
            const model3DMatrix1 = positionedModel.model3DMatrix;
            const polygonIterator = new dsector.PolygonIterator(
                model3DMatrix1, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            this.numberOfCopiedPolygons = 0;
            PositionedModel.xMax = -1.0E20;
            PositionedModel.xMin = 1.0E20;
            PositionedModel.yMax = -1.0E20;
            PositionedModel.yMin = 1.0E20;
            PositionedModel.zMax = -1.0E20;
            PositionedModel.zMin = 1.0E20;
            while (true) {
                let polygonGroup;
                do {
                    polygonGroup = polygonIterator.nextPolygonGroup();
                    if (polygonGroup == null) {
                        return;
                    }
                } while ((CWSYSTEM.CWStringTools.findIgnoreCase$Str$Str(polygonGroup.name, "ghost") === -1));
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
                    matrix4f.preMultiply(dsector.Matrix4f.translationMatrix(Math.fround(positionedModel.x),
                        Math.fround(positionedModel.y), Math.fround(positionedModel.z)));
                    for (let k = 0; k < polygonGroup.polygons.length; ++k) {
                        const polygon = polygonGroup.polygons[k];
                        let len;
                        let len2;
                        if (i === 1) {
                            if (PositionedModel.polygonCollisionDetectionBufferA == null ||
                                PositionedModel.polygonCollisionDetectionBufferA.length < this.numberOfCopiedPolygons) {
                                if (PositionedModel.polygonCollisionDetectionBufferA == null) {
                                    PositionedModel.polygonCollisionDetectionBufferA = (s => {
                                        let a = [];
                                        while (s-- > 0)
                                            a.push(null);
                                        return a;
                                    })(1000);
                                    for (len = 0; len < PositionedModel.polygonCollisionDetectionBufferA.length; ++len) {
                                        PositionedModel.polygonCollisionDetectionBufferA[len] =
                                            new dsector.ColourlessPolygon(new dsector.Vertex(0.0, 0.0, 0.0),
                                                new dsector.Vertex(0.0, 0.0, 0.0),
                                                new dsector.Vertex(0.0, 0.0, 0.0));
                                    }
                                } else {
                                    len = PositionedModel.polygonCollisionDetectionBufferA.length;
                                    PositionedModel.polygonCollisionDetectionBufferA = (s => {
                                        let a = [];
                                        while (s-- > 0)
                                            a.push(null);
                                        return a;
                                    })((len * 11 / 10 | 0));
                                    for (len2 = len; j < PositionedModel.polygonCollisionDetectionBufferA.length; ++len2) {
                                        PositionedModel.polygonCollisionDetectionBufferA[len2] =
                                            new dsector.ColourlessPolygon(
                                                new dsector.Vertex(0.0, 0.0, 0.0),
                                                new dsector.Vertex(0.0, 0.0, 0.0),
                                                new dsector.Vertex(0.0, 0.0, 0.0));
                                    }
                                }
                            }
                        } else if (PositionedModel.polygonCollisionDetectionBufferB == null ||
                            PositionedModel.polygonCollisionDetectionBufferB.length < this.numberOfCopiedPolygons) {
                            if (PositionedModel.polygonCollisionDetectionBufferB == null) {
                                PositionedModel.polygonCollisionDetectionBufferB = (s => {
                                    let a = [];
                                    while (s-- > 0)
                                        a.push(null);
                                    return a;
                                })(1000);
                                for (len = 0; len < PositionedModel.polygonCollisionDetectionBufferB.length; ++len) {
                                    PositionedModel.polygonCollisionDetectionBufferB[len] =
                                        new dsector.ColourlessPolygon(
                                            new dsector.Vertex(0.0, 0.0, 0.0),
                                            new dsector.Vertex(0.0, 0.0, 0.0),
                                            new dsector.Vertex(0.0, 0.0, 0.0));
                                }
                            } else {
                                len = PositionedModel.polygonCollisionDetectionBufferB.length;
                                PositionedModel.polygonCollisionDetectionBufferB = (s => {
                                    let a = [];
                                    while (s-- > 0)
                                        a.push(null);
                                    return a;
                                })((len * 11 / 10 | 0));
                                for (len2 = len; j < PositionedModel.polygonCollisionDetectionBufferB.length; ++len2) {
                                    PositionedModel.polygonCollisionDetectionBufferB[len2] =
                                        new dsector.ColourlessPolygon(
                                            new dsector.Vertex(0.0, 0.0, 0.0),
                                            new dsector.Vertex(0.0, 0.0, 0.0),
                                            new dsector.Vertex(0.0, 0.0, 0.0));
                                }
                            }
                        }
                        const colourlessPolygon = i === 1 ?
                            PositionedModel.polygonCollisionDetectionBufferA[this.numberOfCopiedPolygons++] :
                            PositionedModel.polygonCollisionDetectionBufferB[this.numberOfCopiedPolygons++];
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
                        if (colourlessPolygon.v1.x > PositionedModel.xMax) {
                            PositionedModel.xMax = colourlessPolygon.v1.x;
                        }
                        if (colourlessPolygon.v1.y > PositionedModel.yMax) {
                            PositionedModel.yMax = colourlessPolygon.v1.y;
                        }
                        if (colourlessPolygon.v1.z > PositionedModel.zMax) {
                            PositionedModel.zMax = colourlessPolygon.v1.z;
                        }
                        if (colourlessPolygon.v1.x < PositionedModel.xMin) {
                            PositionedModel.xMin = colourlessPolygon.v1.x;
                        }
                        if (colourlessPolygon.v1.y < PositionedModel.yMin) {
                            PositionedModel.yMin = colourlessPolygon.v1.y;
                        }
                        if (colourlessPolygon.v1.z < PositionedModel.zMin) {
                            PositionedModel.zMin = colourlessPolygon.v1.z;
                        }
                        if (colourlessPolygon.v2.x > PositionedModel.xMax) {
                            PositionedModel.xMax = colourlessPolygon.v2.x;
                        }
                        if (colourlessPolygon.v2.y > PositionedModel.yMax) {
                            PositionedModel.yMax = colourlessPolygon.v2.y;
                        }
                        if (colourlessPolygon.v2.z > PositionedModel.zMax) {
                            PositionedModel.zMax = colourlessPolygon.v2.z;
                        }
                        if (colourlessPolygon.v2.x < PositionedModel.xMin) {
                            PositionedModel.xMin = colourlessPolygon.v2.x;
                        }
                        if (colourlessPolygon.v2.y < PositionedModel.yMin) {
                            PositionedModel.yMin = colourlessPolygon.v2.y;
                        }
                        if (colourlessPolygon.v2.z < PositionedModel.zMin) {
                            PositionedModel.zMin = colourlessPolygon.v2.z;
                        }
                        if (colourlessPolygon.v3.x > PositionedModel.xMax) {
                            PositionedModel.xMax = colourlessPolygon.v3.x;
                        }
                        if (colourlessPolygon.v3.y > PositionedModel.yMax) {
                            PositionedModel.yMax = colourlessPolygon.v3.y;
                        }
                        if (colourlessPolygon.v3.z > PositionedModel.zMax) {
                            PositionedModel.zMax = colourlessPolygon.v3.z;
                        }
                        if (colourlessPolygon.v3.x < PositionedModel.xMin) {
                            PositionedModel.xMin = colourlessPolygon.v3.x;
                        }
                        if (colourlessPolygon.v3.y < PositionedModel.yMin) {
                            PositionedModel.yMin = colourlessPolygon.v3.y;
                        }
                        if (colourlessPolygon.v3.z < PositionedModel.zMin) {
                            PositionedModel.zMin = colourlessPolygon.v3.z;
                        }
                    }
                }
            }
        }
    }

    PositionedModel.polygonCollisionDetectionBufferA = null;
    PositionedModel.polygonCollisionDetectionBufferB = null;
    PositionedModel.xMax = 0;
    PositionedModel.xMin = 0;
    PositionedModel.yMax = 0;
    PositionedModel.yMin = 0;
    PositionedModel.zMax = 0;
    PositionedModel.zMin = 0;
    PositionedModel.numberOfProjections = 0;
    dsector.PositionedModel = PositionedModel;
    PositionedModel["__class"] = "dsector.PositionedModel";
})(dsector || (dsector = {}));
