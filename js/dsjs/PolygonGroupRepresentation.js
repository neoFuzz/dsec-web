var dsector;
(function (dsector) {
    class PolygonGroupRepresentation {
        constructor(polygonGroup, name, visible, e00, e10, e20, e30, e01,
                    e11, e21, e31, e02, e12, e22, e32, e03, e13, e23, e33) {
            if (this.parentPolygonGroup === undefined) {
                this.parentPolygonGroup = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.id === undefined) {
                this.id = 0;
            }
            if (this.visibility === undefined) {
                this.visibility = false;
            }
            if (this.transformationMatrix === undefined) {
                this.transformationMatrix = null;
            }
            if (this.active === undefined) {
                this.active = false;
            }
            this.parentPolygonGroup = polygonGroup;
            this.id = dsector.NumberTools.randomLong();
            this.name = name;
            this.visibility = visible;
            this.transformationMatrix = new dsector.Matrix4f(e00, e10, e20, e30, e01, e11,
                e21, e31, e02, e12, e22, e32, e03, e13, e23, e33);
            this.active = false;
        }

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

        isDirectRepresentation() {
            return this.parentPolygonGroup.directRepresentation === this;
        }

        visible() {
            return this.parentPolygonGroup.visible() && this.visibility;
        }

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
