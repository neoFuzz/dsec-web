/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWCharacter {
        constructor(width, height, lineHeight) {
            if (this.width === undefined) {
                this.width = 0;
            }
            if (this.height === undefined) {
                this.height = 0;
            }
            if (this.lineHeight === undefined) {
                this.lineHeight = 0;
            }
            if (this.bitmap === undefined) {
                this.bitmap = null;
            }
            this.width = width;
            this.height = height;
            this.lineHeight = lineHeight;
            this.bitmap = (function (dims) {
                let allocate = function (dims) {
                    if (dims.length === 0) {
                        return null;
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
        }
    }

    CWSYSTEM.CWCharacter = CWCharacter;
    CWCharacter["__class"] = "CWSYSTEM.CWCharacter";
})(CWSYSTEM || (CWSYSTEM = {}));
