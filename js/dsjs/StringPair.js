var dsector;
(function (dsector) {
    class StringPair {
        constructor(name, value) {
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.value === undefined) {
                this.value = null;
            }
            this.name = name;
            this.value = value;
        }
    }
    dsector.StringPair = StringPair;
    StringPair["__class"] = "dsector.StringPair";
})(dsector || (dsector = {}));
