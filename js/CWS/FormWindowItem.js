/**/
(function (dsector) {
    /**
     * @class
     * @memberof CWSYSTEM
     */
    class FormWindowItem {
        constructor(fileName, color) {
            if (arguments.length === 2) {
                this.type = FormWindowItem.IMAGE;
                this.__booleanValue = false;
                this.__stringValue = "";
                this.color = color;
                const hashMap = CWSYSTEM.CWSReference.graphics.JPGSize(fileName);
                this.imageHeight = hashMap != null ? parseInt(hashMap.get("height")) : 0;
            } else if (arguments.length === 1) {
                this.type = fileName;
                this.__booleanValue = false;
                this.__stringValue = "";
                this.color = null;
                this.imageHeight = 0;
            } else {
                throw new Error('invalid overload');
            }
        }

        setBooleanValue(b) {
            this.__booleanValue = b;
            return this;
        }

        setStringValue(stringValue) {
            this.__stringValue = stringValue;
            return this;
        }

        booleanValue() {
            return this.__booleanValue;
        }

        stringValue() {
            return this.__stringValue;
        }
    }

    FormWindowItem.INPUTBOX = 0;
    FormWindowItem.CHECKBOX = 1;
    FormWindowItem.TEXT = 2;
    FormWindowItem.IMAGE = 3;
    dsector.FormWindowItem = FormWindowItem;
    FormWindowItem["__class"] = "dsector.FormWindowItem";
})(dsector || (dsector = {}));
