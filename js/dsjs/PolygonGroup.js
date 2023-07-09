var dsector;
(function (dsector) {
    /**
     * Represents a polygon group.
     *
     * @class
     * @classdesc A polygon group is a collection of polygons that belong to a parent folder and have various properties.
     *
     * @param {string} name - The name of the polygon group.
     * @param {string} parentFolder - The name of the parent folder.
     * @param {boolean} visible - Indicates whether the polygon group is visible.
     * @param {string} pgrName - The name of the polygon group representation.
     * @param {boolean} pgrVisible - Indicates whether the polygon group representation is visible.
     * @param {string} reflection - The type of reflection for the polygon group.
     * @param {number} reflectedLightDirectionSensitivity - The sensitivity of the reflected light direction.
     * @param {number} dispersedLightDirectionSensitivity - The sensitivity of the dispersed light direction.
     */
    class PolygonGroup {
        constructor(name, parentFolder, visible, pgrName, pgrVisible, reflection,
                    reflectedLightDirectionSensitivity, dispersedLightDirectionSensitivity) {
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.id === undefined) {
                this.id = 0;
            }
            if (this.expanded === undefined) {
                this.expanded = false;
            }
            if (this.visibility === undefined) {
                this.visibility = false;
            }
            if (this.polygons === undefined) {
                this.polygons = null;
            }
            if (this.reflection === undefined) {
                this.reflection = 0;
            }
            if (this.reflectedLightDirectionSensitivity === undefined) {
                this.reflectedLightDirectionSensitivity = 0;
            }
            if (this.dispersedLightDirectionSensitivity === undefined) {
                this.dispersedLightDirectionSensitivity = 0;
            }
            if (this.directRepresentation === undefined) {
                this.directRepresentation = null;
            }
            if (this.transposedRepresentations === undefined) {
                this.transposedRepresentations = null;
            }
            if (this.__parentFolder === undefined) {
                this.__parentFolder = null;
            }
            this.id = dsector.NumberTools.randomLong();
            this.name = name;
            this.__parentFolder = parentFolder;
            this.visibility = visible;
            this.expanded = true;
            this.polygons = ([]);
            this.transposedRepresentations = ([]);
            this.directRepresentation = new dsector.PolygonGroupRepresentation(
                this, pgrName, pgrVisible, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
                0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
            this.reflection = reflection;
            this.dispersedLightDirectionSensitivity = dispersedLightDirectionSensitivity;
            this.reflectedLightDirectionSensitivity = reflectedLightDirectionSensitivity;
        }
        visible() {
            return this.__parentFolder.visible() && this.visibility;
        }
        isVisible() {
            return this.visibility;
        }
        isHidden() {
            return !this.visibility;
        }
        setVisible() {
            this.visibility = true;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        setHidden() {
            this.visibility = false;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        parentFolder() {
            return this.__parentFolder;
        }
        addPolygon(polygon) {
            this.polygons.push(polygon);
        }
        static getActivePolygonGroups() {
            const polygonIterator = new dsector.PolygonIterator(dsector.DSReference.model3DMatrix,
                dsector.PolygonIterator.ACTIVE_POLYGON_GROUPS);
            const arrayList = ([]);
            while (true) {
                    const polygonGroup = polygonIterator.nextPolygonGroup();
                    if (polygonGroup == null) {
                        return arrayList;
                    }
                    arrayList.push(polygonGroup);
            }
        }
    }
    PolygonGroup.defaultReflection = 5;
    PolygonGroup.defaultReflectedLightDirectionSensitivity = 30;
    PolygonGroup.defaultDispersedLightDirectionSensitivity = 10;
    dsector.PolygonGroup = PolygonGroup;
    PolygonGroup["__class"] = "dsector.PolygonGroup";
})(dsector || (dsector = {}));
