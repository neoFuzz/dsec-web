var CWSYSTEM;
(function (CWSYSTEM) {
    class ScreenData {
        constructor(width, height, description) {
            if (this.point === undefined) {
                this.point = null;
            }
            if (this.width === undefined) {
                this.width = 0;
            }
            if (this.height === undefined) {
                this.height = 0;
            }
            if (this.description === undefined) {
                this.description = null;
            }
            this.description = description;
            this.point = (function (dims) {
                let allocate = function (dims) {
                    if (dims.length === 0) {
                        return 0;
                    } else {
                        let array = [];
                        for (let i = 0; i < dims[0]; i++) {
                            array.push(allocate(dims.slice(1)));
                        }
                        return array;
                    }
                };
                return allocate(dims);
            })([height, width]);
            this.width = width;
            this.height = height;
        }
    }

    CWSYSTEM.ScreenData = ScreenData;
    ScreenData["__class"] = "CWSYSTEM.ScreenData";
})(CWSYSTEM || (CWSYSTEM = {}));
