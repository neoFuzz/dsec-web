var dsector;
(function (dsector) {
    class Vertex2D {
        constructor(x, y) {
            if (((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
                let __args = arguments;
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                this.x = x;
                this.y = y;
            }
            else if (((x != null && x instanceof dsector.Vertex2D) || x === null) && y === undefined) {
                let __args = arguments;
                let vertex2D = __args[0];
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                this.x = vertex2D.x;
                this.y = vertex2D.y;
            }
            else
                throw new Error('invalid overload');
        }
        set(vertex2D) {
            this.x = vertex2D.x;
            this.y = vertex2D.y;
        }
        print() {
            console.info("\n" + this.x + " " + this.y);
        }
        distanceTo(vertex2D) {
            const xDist = vertex2D.x - this.x;
            const yDist = vertex2D.y - this.y;
            return Math.sqrt(xDist * xDist + yDist * yDist);
        }
    }
    dsector.Vertex2D = Vertex2D;
    Vertex2D["__class"] = "dsector.Vertex2D";
})(dsector || (dsector = {}));
