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

        allocateBitmap(height, width) {
            if (height === 0 || width === 0) {
                return null;
            } else {
                let bitmap = [];
                for (let i = 0; i < height; i++) {
                    bitmap.push(this.allocateBitmap(width));
                }
                return bitmap;
            }
        }
    }


    CWSYSTEM.CWCharacter = CWCharacter;
    CWCharacter["__class"] = "CWSYSTEM.CWCharacter";
})(CWSYSTEM || (CWSYSTEM = {}));
