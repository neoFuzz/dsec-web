/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class Vertex {
        constructor(x, y, z) {
            if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) &&
                ((typeof z === 'number') || z === null)) {
                let __args = arguments;
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.z === undefined) {
                    this.z = 0;
                }
                if (this.selected === undefined) {
                    this.selected = false;
                }
                if (this.positionChangedSinceKeyframeLoaded === undefined) {
                    this.positionChangedSinceKeyframeLoaded = false;
                }
                this.x = x;
                this.y = y;
                this.z = z;
                this.selected = false;
            }
            else if (((x != null && x instanceof dsector.Vertex) || x === null) && y === undefined && z === undefined) {
                let __args = arguments;
                let vertex = __args[0];
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.z === undefined) {
                    this.z = 0;
                }
                if (this.selected === undefined) {
                    this.selected = false;
                }
                if (this.positionChangedSinceKeyframeLoaded === undefined) {
                    this.positionChangedSinceKeyframeLoaded = false;
                }
                this.x = vertex.x;
                this.y = vertex.y;
                this.z = vertex.z;
            }
            else
                throw new Error('invalid overload');
        }
        transform(matrix4f) {
            const element = matrix4f.element;
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
        set(vertex) {
            this.x = vertex.x;
            this.y = vertex.y;
            this.z = vertex.z;
        }
        print() {
            console.info("\n" + this.x + " " + this.y + " " + this.z);
        }
        distanceTo(vertex) {
            const xDist = Math.fround(vertex.x - this.x);
            const yDist = Math.fround(vertex.y - this.y);
            const zDist = Math.fround(vertex.z - this.z);
            return Math.fround(Math.sqrt((xDist * xDist) + (yDist * yDist) + (zDist * zDist)));
        }
    }
    dsector.Vertex = Vertex;
    Vertex["__class"] = "dsector.Vertex";
})(dsector || (dsector = {}));
