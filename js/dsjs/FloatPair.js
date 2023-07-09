var dsector;
(function (dsector) {
    class FloatPair {
        constructor(f1, f2) {
            if (((typeof f1 === 'number') || f1 === null) && ((typeof f2 === 'number') || f2 === null)) {
                let __args = arguments;
                if (this.f1 === undefined) {
                    this.f1 = 0;
                }
                if (this.f2 === undefined) {
                    this.f2 = 0;
                }
                this.f1 = f1;
                this.f2 = f2;
            }
            else if (f1 === undefined && f2 === undefined) {
                let __args = arguments;
                if (this.f1 === undefined) {
                    this.f1 = 0;
                }
                if (this.f2 === undefined) {
                    this.f2 = 0;
                }
                this.f1 = 0.0;
                this.f2 = 0.0;
            }
            else
                throw new Error('invalid overload');
        }
        set(f1, f2) {
            this.f1 = f1;
            this.f2 = f2;
        }
    }
    dsector.FloatPair = FloatPair;
    FloatPair["__class"] = "dsector.FloatPair";
})(dsector || (dsector = {}));
