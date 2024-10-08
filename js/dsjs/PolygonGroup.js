import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * A polygon group is a collection of polygons that belong to a parent folder and have various properties.
 *
 * @property {number} id - The unique identifier of the polygon group.
 * @property {string} name - The name of the polygon group.
 * @property {dsector.ModelLoader} __parentFolder - The name of the parent folder.
 * @property {boolean} visibility - Indicates whether the polygon group is visible.
 * @property {boolean} expanded - Indicates whether the polygon group is expanded.
 * @property {Array<dsector.Polygon>} polygons - The list of polygons in the polygon group.
 * @property {number} reflection - The type of reflection for the polygon group.
 * @property {number} reflectedLightDirectionSensitivity - The sensitivity of the reflected light direction.
 * @property {number} dispersedLightDirectionSensitivity - The sensitivity of the dispersed light direction.
 * @property {dsector.PolygonGroupRepresentation} directRepresentation - The direct representation of the polygon group.
 * @property {Array} transposedRepresentations - The list of transposed representations of the polygon group.
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
export class PolygonGroup {
    /**
     * Creates an instance of a polygon group.
     *
     * @param {string} name - The name of the polygon group.
     * @param {dsector.ModelFolder} parentFolder - The name of the parent folder.
     * @param {boolean} visible - Indicates whether the polygon group is visible.
     * @param {string} pgrName - The name of the polygon group representation.
     * @param {boolean} pgrVisible - Indicates whether the polygon group representation is visible.
     * @param {string} reflection - The type of reflection for the polygon group.
     * @param {number} reflectedLightDirectionSensitivity - The sensitivity of the reflected light direction.
     * @param {number} dispersedLightDirectionSensitivity - The sensitivity of the dispersed light direction.
     */
    constructor(name, parentFolder, visible, pgrName, pgrVisible, reflection,
                reflectedLightDirectionSensitivity, dispersedLightDirectionSensitivity) {
        this.name = null;
        this.id = 0;
        this.expanded = false;
        this.visibility = false;
        this.polygons = null;
        this.reflection = 0;
        this.reflectedLightDirectionSensitivity = 0;
        this.dispersedLightDirectionSensitivity = 0;
        this.directRepresentation = null;
        this.transposedRepresentations = null;
        this.__parentFolder = null;
        this.id = CWSYSTEM.NumberTools.randomLong();
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

    /**
     * Checks if the polygon group is visible, considering both its own visibility and its parent folder's visibility.
     *
     * @returns {boolean} True if the polygon group is visible, false otherwise.
     */
    visible() {
        return this.__parentFolder.visible() && this.visibility;
    }

    /**
     * Checks if the polygon group's visibility property is set to true.
     *
     * @returns {boolean} True if the polygon group's visibility is set to true, false otherwise.
     */
    isVisible() {
        return this.visibility;
    }

    /**
     * Checks if the polygon group's visibility property is set to false.
     *
     * @returns {boolean} True if the polygon group's visibility is set to false, false otherwise.
     */
    isHidden() {
        return !this.visibility;
    }

    /**
     * Sets the polygon group to visible and requests an update for projective and perspective view windows.
     */
    setVisible() {
        this.visibility = true;
        CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
    }

    /**
     * Sets the polygon group to hidden and requests an update for projective and perspective view windows.
     */
    setHidden() {
        this.visibility = false;
        CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
    }

    /**
     * Gets the parent folder of the polygon group.
     *
     * @returns {ModelFolder} The parent folder object.
     */
    parentFolder() {
        return this.__parentFolder;
    }

    /**
     * Adds a polygon to the polygon group.
     *
     * @param {Polygon} polygon - The polygon object to be added.
     */
    addPolygon(polygon) {
        this.polygons.push(polygon);
    }

    /**
     * Gets an array of active polygon groups.
     *
     * @returns {Array<dsector.PolygonGroup>} An array containing active polygon group objects.
     */
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

    /**
     * The default reflection value for polygon groups.
     * @static
     * @type {number}
     * @default 5
     */
    static defaultReflection = 5;
    /**
     * The default reflected light direction sensitivity for polygon groups.
     * @static
     * @type {number}
     * @default 30
     */
    static defaultReflectedLightDirectionSensitivity = 30;
    /**
     * The default dispersed light direction sensitivity for polygon groups.
     * @static
     * @type {number}
     * @default 10
     */
    static defaultDispersedLightDirectionSensitivity = 10;
}