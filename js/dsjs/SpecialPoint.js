var dsector;
(function (dsector) {
    class SpecialPoint {
        constructor(parent, name, visible, x, y, z, red, green, blue) {
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.id === undefined) {
                this.id = 0;
            }
            if (this.parent === undefined) {
                this.parent = null;
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
            if (this.red === undefined) {
                this.red = 0;
            }
            if (this.green === undefined) {
                this.green = 0;
            }
            if (this.blue === undefined) {
                this.blue = 0;
            }
            if (this.__visibility === undefined) {
                this.__visibility = false;
            }
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

        static getAllSpecialPoints(model3DMatrix) {
            const arrayList = ([]);
            const polygonIterator = new dsector.PolygonIterator(model3DMatrix, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const modelFolder = polygonIterator.nextModelFolder();
                if (modelFolder == null) {
                    return arrayList;
                }
                for (let i = 0; i < modelFolder.specialPoints.length; ++i) {
                    const specialPoint = modelFolder.specialPoints[i];
                    arrayList.push(specialPoint);
                }
            }
        }

        visibility$() {
            return this.__visibility;
        }

        isVisible() {
            return this.__visibility;
        }

        isHidden() {
            return !this.__visibility;
        }

        visibility$boolean(visible) {
            this.__visibility = visible;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }

        visibility(visible) {
            if (((typeof visible === 'boolean') || visible === null)) {
                return this.visibility$boolean(visible);
            } else if (visible === undefined) {
                return this.visibility$();
            } else
                throw new Error('invalid overload');
        }

        toggleVisibility() {
            this.visibility$boolean(!this.visibility$());
        }

        setPositionToLocatorPosition() {
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }

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
