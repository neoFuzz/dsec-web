/**/
(function (dsector) {
    /**
     * Class representing a 2D vertex.
     * @class
     * @memberof dsector
     */
    class Vertex2D {
        /**
         * The x-coordinate of the vertex.
         * @type {number}
         */
        x = 0;

        /**
         * The y-coordinate of the vertex.
         * @type {number}
         */
        y = 0;

        /**
         * Creates an instance of Vertex2D.
         * @param {number|dsector.Vertex2D} x - The x-coordinate or a Vertex2D instance.
         * @param {number} [y] - The y-coordinate.
         * @throws {Error} Throws an error if the arguments are invalid.
         */
        constructor(x, y) {
            if (typeof x === 'number' && typeof y === 'number') {
                this.x = x;
                this.y = y;
            } else if (x instanceof Vertex2D) {
                this.x = x.x;
                this.y = x.y;
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Sets the coordinates of the vertex.
         * @param {dsector.Vertex2D} v2d - The vertex to copy the coordinates from.
         */
        set(v2d) {
            this.x = v2d.x;
            this.y = v2d.y;
        }

        /**
         * Prints the coordinates of the vertex.
         */
        print() {
            CWSYSTEM.Debug.println(this.x + " " + this.y);
        }

        /**
         * Calculates the distance to another vertex.
         * @param {dsector.Vertex2D} v2d - The other vertex.
         * @returns {number} The distance to the other vertex.
         */
        distanceTo(v2d) {
            const xDist = v2d.x - this.x;
            const yDist = v2d.y - this.y;
            return Math.sqrt(xDist * xDist + yDist * yDist);
        }
    }

    dsector.Vertex2D = Vertex2D;
    Vertex2D["__class"] = "dsector.Vertex2D";
})(dsector || (dsector = {}));
