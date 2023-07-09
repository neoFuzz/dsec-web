var dsector;
(function (dsector) {
    class Polygon {
        constructor(vertex1, vertex2, vertex3, color) {
            if (this.v1 === undefined) {
                this.v1 = null;
            }
            if (this.v2 === undefined) {
                this.v2 = null;
            }
            if (this.v3 === undefined) {
                this.v3 = null;
            }
            if (this.color === undefined) {
                this.color = null;
            }
            if (this.selected === undefined) {
                this.selected = false;
            }
            this.v1 = vertex1;
            this.v2 = vertex2;
            this.v3 = vertex3;
            this.color = color;
            this.selected = false;
        }
    }
    Polygon.byteSize = 20;
    dsector.Polygon = Polygon;
    Polygon["__class"] = "dsector.Polygon";
})(dsector || (dsector = {}));
