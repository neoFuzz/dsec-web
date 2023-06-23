/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class FormWindowItem {
        constructor(fileName, color) {
            if (((typeof fileName === 'string') || fileName === null) && ((color != null && color instanceof CWSYSTEM.CWColor) || color === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let type = FormWindowItem.IMAGE;
                    if (this.type === undefined) {
                        this.type = 0;
                    }
                    if (this.__stringValue === undefined) {
                        this.__stringValue = null;
                    }
                    if (this.__booleanValue === undefined) {
                        this.__booleanValue = false;
                    }
                    if (this.color === undefined) {
                        this.color = null;
                    }
                    if (this.imageHeight === undefined) {
                        this.imageHeight = 0;
                    }
                    this.type = type;
                    this.__booleanValue = false;
                    this.__stringValue = "";
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.__stringValue === undefined) {
                    this.__stringValue = null;
                }
                if (this.__booleanValue === undefined) {
                    this.__booleanValue = false;
                }
                if (this.color === undefined) {
                    this.color = null;
                }
                if (this.imageHeight === undefined) {
                    this.imageHeight = 0;
                }
                (() => {
                    this.color = color;
                    const hashMap = dsector.DSReference.graphics.JPGSize(fileName);
                    if (hashMap != null) {
                        this.imageHeight = /* parseInt */ parseInt(((m, k) => { if (m.entries == null)
                            m.entries = []; for (let i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                return m.entries[i].value;
                            } return null; })(hashMap, "height"));
                    }
                    else {
                        this.imageHeight = 0;
                    }
                })();
            }
            else if (((typeof fileName === 'number') || fileName === null) && color === undefined) {
                let __args = arguments;
                let type = __args[0];
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.__stringValue === undefined) {
                    this.__stringValue = null;
                }
                if (this.__booleanValue === undefined) {
                    this.__booleanValue = false;
                }
                if (this.color === undefined) {
                    this.color = null;
                }
                if (this.imageHeight === undefined) {
                    this.imageHeight = 0;
                }
                this.type = type;
                this.__booleanValue = false;
                this.__stringValue = "";
            }
            else
                throw new Error('invalid overload');
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
