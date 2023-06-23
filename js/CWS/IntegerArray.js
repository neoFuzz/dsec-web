var CWSYSTEM;
(function (CWSYSTEM) {
    class IntegerArray {
        constructor(value) {
            if (this.value === undefined) {
                this.value = null;
            }
            if (this.__size === undefined) {
                this.__size = 0;
            }
            this.value = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(value);
            this.__size = 0;
        }
        add(value) {
            this.value[this.__size++] = value;
        }
        remove(value) {
            for (let i = value; i < this.__size - 1; ++i) {
                this.value[i] = this.value[i + 1];
            }
            --this.__size;
        }
        get(value) {
            return this.value[value];
        }
        size() {
            return this.__size;
        }
        sort() {
            /* sort */ ((l) => { l.sort(); })(this.value);
        }
        indexOfMinimumValue() {
            if (this.__size === 1) {
                return 0;
            }
            else {
                let start = 0;
                let index = this.value[0];
                for (let i = 1; i < this.__size; ++i) {
                        if (this.value[i] < index) {
                            index = this.value[i];
                            start = i;
                        }
                }
                return start;
            }
        }
        sortedSequence() {
            const max = 1073741824;
            const integerArray = new IntegerArray(this.__size);
            const booleans = (s => { let a = []; while (s-- > 0)
                a.push(false); return a; })(this.__size);
            let i;
            for (i = 0; i < this.__size; ++i) {
                booleans[i] = false;}
            i = -1;
            for (let j = 0; j < this.__size; ++j) {
                    let m = max;
                    for (let k = 0; k < this.__size; ++k) {
                            if (!booleans[k] && this.value[k] < m) {
                                m = this.value[k];
                                i = k;
                            }
                    }
                    booleans[i] = true;
                    integerArray.add(i);
            }
            return integerArray;
        }
    }
    CWSYSTEM.IntegerArray = IntegerArray;
    IntegerArray["__class"] = "CWSYSTEM.IntegerArray";
})(CWSYSTEM || (CWSYSTEM = {}));
