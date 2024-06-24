/* Re-written from Java */
var dsector;
(function (dsector) {
    /**
     * Represents a colourless polygon defined by three vertices.
     * @class
     * @param {Object} v1 - The first vertex of the polygon.
     * @param {Object} v2 - The second vertex of the polygon.
     * @param {Object} v3 - The third vertex of the polygon.
     */
    class ColourlessPolygon {
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