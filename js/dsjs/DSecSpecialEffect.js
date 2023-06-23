/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class DSecSpecialEffect {
        constructor(image, x, y, brightness) {
            this.type = 0;
            if (this.image === undefined) {
                this.image = null;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.brightness === undefined) {
                this.brightness = 0;
            }
            this.image = image;
            this.x = x;
            this.y = y;
            this.brightness = brightness;
        }
    }
    DSecSpecialEffect.IMAGE_COMPOSIT = 0;
    dsector.DSecSpecialEffect = DSecSpecialEffect;
    DSecSpecialEffect["__class"] = "dsector.DSecSpecialEffect";
})(dsector || (dsector = {}));
