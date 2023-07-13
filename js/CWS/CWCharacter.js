/* Re-written from Java */
var CWSYSTEM;
(function (CWSYSTEM) {
    class CWCharacter {
        constructor(width, height, lineHeight) {
            this.width = width || 0;
            this.height = height || 0;
            this.lineHeight = lineHeight || 0;
            this.bitmap = this.allocateBitmap(height, width);
        }

        allocateBitmap(h, w) {
            if (h === 0 || w === 0) {
                return null;
            } else {
                let bitmap = [];
                for (let i = 0; i < h; i++) {
                    bitmap.push(this.allocateBitmap(w));
                }
                return bitmap;
            }
        }
    }

    CWSYSTEM.CWCharacter = CWCharacter;
    CWCharacter["__class"] = "CWSYSTEM.CWCharacter";
})(CWSYSTEM || (CWSYSTEM = {}));
