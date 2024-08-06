import {dsector} from './dsector.js';

/**
 * Represents a vertex in 3D space.
 *
 * @property {number} x - The x-coordinate of the vertex.
 * @property {number} y - The y-coordinate of the vertex.
 * @property {number} z - The z-coordinate of the vertex.
 * @property {boolean} selected - Indicates whether the vertex is selected or not.
 * @property {boolean} positionChangedSinceKeyframeLoaded - Indicates whether the vertex's position has changed since the keyframe was loaded.
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
export class Vertex {
    /**
     * Creates an instance of Vertex.
     *
     * @param {number|dsector.Vertex} [x=0] - The x-coordinate or a Vertex instance.
     * @param {number} [y=0] - The y-coordinate.
     * @param {number} [z=0] - The z-coordinate.
     * @throws {Error} Throws an error if the arguments are invalid.
     */
    constructor(x = 0, y = 0, z = 0) {
        if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            this.x = x;
            this.y = y;
            this.z = z;
        } else if (x instanceof dsector.Vertex) {
            ({x: this.x, y: this.y, z: this.z} = x);
        } else {
            throw new Error('invalid overload');
        }
        this.selected = false;
        this.positionChangedSinceKeyframeLoaded = false;
    }

    /**
     * Transforms the vertex using a 4x4 matrix.
     *
     * @param {Matrix4f} m4f - The 4x4 transformation matrix.
     */
    transform(m4f) {
        const element = m4f.element;
        const x = Math.fround((((element[0][0] * this.x) + (element[1][0] * this.y)) +
            (element[2][0] * this.z)) + element[3][0]);
        const y = Math.fround((((element[0][1] * this.x) + (element[1][1] * this.y)) +
            (element[2][1] * this.z)) + element[3][1]);
        const z = Math.fround((((element[0][2] * this.x) + (element[1][2] * this.y)) +
            (element[2][2] * this.z)) + element[3][2]);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Sets the vertex coordinates to those of another vertex.
     *
     * @param {dsector.Vertex} v - The vertex to copy coordinates from.
     */
    set(v) {
        ({x: this.x, y: this.y, z: this.z} = v);
    }

    /**
     * Prints the vertex coordinates to the console.
     * @public
     */
    print() {
        console.info(`\n${this.x} ${this.y} ${this.z}`);
    }

    /**
     * Calculates the distance to another vertex.
     *
     * @param {dsector.Vertex} vertex - The vertex to calculate the distance to.
     * @returns {number} The distance to the vertex.
     */
    distanceTo(vertex) {
        const xDist = Math.fround(vertex.x - this.x);
        const yDist = Math.fround(vertex.y - this.y);
        const zDist = Math.fround(vertex.z - this.z);
        return Math.fround(Math.sqrt((xDist * xDist) + (yDist * yDist) + (zDist * zDist)));
    }
}