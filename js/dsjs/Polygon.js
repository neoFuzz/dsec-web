/**/
(function (dsector) {
    /**
     * Represents a polygon with three vertices and a color.
     *
     * @property {dsector.Vertex} v1 - The first vertex of the polygon.
     * @property {dsector.Vertex} v2 - The second vertex of the polygon.
     * @property {dsector.Vertex} v3 - The third vertex of the polygon.
     * @property {CWSYSTEM.CWColor} color - The color of the polygon.
     * @property {boolean} selected - Indicates whether the polygon is selected.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof dsector
     * @requires dsector.Vertex
     * @requires CWSYSTEM.CWColor
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class Polygon {
        /**
         * Creates an instance of a Polygon.
         *
         * @param {dsector.Vertex} vertex1 - The first vertex of the polygon.
         * @param {dsector.Vertex} vertex2 - The second vertex of the polygon.
         * @param {dsector.Vertex} vertex3 - The third vertex of the polygon.
         * @param {CWSYSTEM.CWColor} color - The color of the polygon.
         */
        constructor(vertex1, vertex2, vertex3, color) {
            this.v1 = vertex1;
            this.v2 = vertex2;
            this.v3 = vertex3;
            this.color = color;
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
})(dsector);