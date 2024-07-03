/**/
(function(dsector) {
    /**
     * Represents a polygon with three vertices and a color.
     * @class
     * @memberof dsector
     */
    class Polygon {
        /**
         * Creates an instance of a Polygon.
         *
         * @param {Vertex} vertex1 - The first vertex of the polygon.
         * @param {Vertex} vertex2 - The second vertex of the polygon.
         * @param {Vertex} vertex3 - The third vertex of the polygon.
         * @param {string} color - The color of the polygon.
         */
        constructor(vertex1, vertex2, vertex3, color) {
            /**
             * The first vertex of the polygon.
             * @type {Vertex|null}
             */
            this.v1 = vertex1;

            /**
             * The second vertex of the polygon.
             * @type {Vertex|null}
             */
            this.v2 = vertex2;

            /**
             * The third vertex of the polygon.
             * @type {Vertex|null}
             */
            this.v3 = vertex3;

            /**
             * The color of the polygon.
             * @type {string|null}
             */
            this.color = color;

            /**
             * Indicates whether the polygon is selected.
             * @type {boolean}
             */
            this.selected = false;
        }
    }

    /**
     * The byte size of the Polygon.
     * @static
     * @type {number}
     */
    Polygon.byteSize = 20;

    dsector.Polygon = Polygon;
    Polygon["__class"] = "dsector.Polygon";
})(dsector || (dsector = {}));