(function (dsector) {
    /**
     * Represents a colourless polygon defined by three vertices.
     *
     * @property {dsector.Vertex} v1 - The first vertex of the polygon.
     * @property {dsector.Vertex} v2 - The second vertex of the polygon.
     * @property {dsector.Vertex} v3 - The third vertex of the polygon.
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
    class ColourlessPolygon {
        /**
         * @param {dsector.Vertex} v1 - The first vertex of the polygon.
         * @param {dsector.Vertex} v2 - The second vertex of the polygon.
         * @param {dsector.Vertex} v3 - The third vertex of the polygon.
         */
        constructor(v1, v2, v3) {
            if (this.v1 === undefined) {
                this.v1 = null;
            }
            if (this.v2 === undefined) {
                this.v2 = null;
            }
            if (this.v3 === undefined) {
                this.v3 = null;
            }
            this.v1 = v1;
            this.v2 = v2;
            this.v3 = v3;
        }
    }

    /**
     * The byte size of the ColourlessPolygon object.
     * @static
     * @type {number}
     */
    ColourlessPolygon.byteSize = 12;
    dsector.ColourlessPolygon = ColourlessPolygon;
    ColourlessPolygon["__class"] = "dsector.ColourlessPolygon";
})(dsector || (dsector = {}));