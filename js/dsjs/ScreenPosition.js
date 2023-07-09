var dsector;
(function (dsector) {
    class ScreenPosition {
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
            else if (x === undefined && y === undefined) {
                let __args = arguments;
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                this.x = 0;
                this.y = 0;
            }
            else
                throw new Error('invalid overload');
        }
        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }
        getX() {
            return this.x;
        }
        getY() {
            return this.y;
        }
    }
    dsector.ScreenPosition = ScreenPosition;
    ScreenPosition["__class"] = "dsector.ScreenPosition";
})(dsector || (dsector = {}));
