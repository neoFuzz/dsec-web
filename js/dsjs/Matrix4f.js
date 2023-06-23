/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class Matrix4f {
        constructor(element00, element10, element20, element30, element01, element11, element21, element31, element02, element12, element22, element32, element03, element13, element23, element33) {
            if (((typeof element00 === 'number') || element00 === null) && ((typeof element10 === 'number') || element10 === null) && ((typeof element20 === 'number') || element20 === null) && ((typeof element30 === 'number') || element30 === null) && ((typeof element01 === 'number') || element01 === null) && ((typeof element11 === 'number') || element11 === null) && ((typeof element21 === 'number') || element21 === null) && ((typeof element31 === 'number') || element31 === null) && ((typeof element02 === 'number') || element02 === null) && ((typeof element12 === 'number') || element12 === null) && ((typeof element22 === 'number') || element22 === null) && ((typeof element32 === 'number') || element32 === null) && ((typeof element03 === 'number') || element03 === null) && ((typeof element13 === 'number') || element13 === null) && ((typeof element23 === 'number') || element23 === null) && ((typeof element33 === 'number') || element33 === null)) {
                let __args = arguments;
                this.element = (function (dims) { let allocate = function (dims) { if (dims.length === 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([4, 4]);
                this.element[0][0] = element00;
                this.element[1][0] = element10;
                this.element[2][0] = element20;
                this.element[3][0] = element30;
                this.element[0][1] = element01;
                this.element[1][1] = element11;
                this.element[2][1] = element21;
                this.element[3][1] = element31;
                this.element[0][2] = element02;
                this.element[1][2] = element12;
                this.element[2][2] = element22;
                this.element[3][2] = element32;
                this.element[0][3] = element03;
                this.element[1][3] = element13;
                this.element[2][3] = element23;
                this.element[3][3] = element33;
            }
            else if (((element00 != null && element00 instanceof dsector.Matrix4f) || element00 === null) && element10 === undefined && element20 === undefined && element30 === undefined && element01 === undefined && element11 === undefined && element21 === undefined && element31 === undefined && element02 === undefined && element12 === undefined && element22 === undefined && element32 === undefined && element03 === undefined && element13 === undefined && element23 === undefined && element33 === undefined) {
                let __args = arguments;
                let matrix4f = __args[0];
                this.element = (function (dims) { let allocate = function (dims) { if (dims.length === 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([4, 4]);
                for (let i = 0; i < 4; ++i) {
                    CWSYSTEM.CWUtils.copyArray(matrix4f.element[i], 0, this.element[i], 0, 4);
                }
            }
            else if (element00 === undefined && element10 === undefined &&
                element20 === undefined && element30 === undefined &&
                element01 === undefined && element11 === undefined &&
                element21 === undefined && element31 === undefined &&
                element02 === undefined && element12 === undefined &&
                element22 === undefined && element32 === undefined &&
                element03 === undefined && element13 === undefined &&
                element23 === undefined && element33 === undefined) {
                this.element = (function (dims) { let allocate = function (dims) { if (dims.length === 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([4, 4]);
                this.reset();
            }
            else
                throw new Error('invalid overload');
        }
        set(matrix4f) {
            for (let i = 0; i < 4; ++i) {
                    CWSYSTEM.CWUtils.copyArray(matrix4f.element[i], 0, this.element[i], 0, 4);
            }
        }
        makeRandom() {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    this.element[i][j] = Math.fround(Math.random());
                }
            }
        }
        reset() {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    if (i === j) {
                        this.element[i][j] = 1.0;
                    }
                    else {
                        this.element[i][j] = 0.0;
                    }
                }
            }
        }
        postMultiply(matrix4f) {
            const element1 = this.element;
            const m4fElement = matrix4f.element;
            const fElement = (function (dims) { let allocate = function (dims) { if (dims.length === 0) {
                return 0;
            }
            else {
                let array = [];
                for (let i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([4, 4]);
            fElement[0][0] = Math.fround((((m4fElement[0][0] * element1[0][0]) + (m4fElement[0][1] *
                element1[1][0])) + (m4fElement[0][2] * element1[2][0])) + (m4fElement[0][3] * element1[3][0]));
            fElement[0][1] = Math.fround((((m4fElement[0][0] * element1[0][1]) + (m4fElement[0][1] *
                element1[1][1])) + (m4fElement[0][2] * element1[2][1])) + (m4fElement[0][3] * element1[3][1]));
            fElement[0][2] = Math.fround((((m4fElement[0][0] * element1[0][2]) + (m4fElement[0][1] *
                element1[1][2])) + (m4fElement[0][2] * element1[2][2])) + (m4fElement[0][3] * element1[3][2]));
            fElement[0][3] = Math.fround((((m4fElement[0][0] * element1[0][3]) + (m4fElement[0][1] *
                element1[1][3])) + (m4fElement[0][2] * element1[2][3])) + (m4fElement[0][3] * element1[3][3]));
            fElement[1][0] = Math.fround((((m4fElement[1][0] * element1[0][0]) + (m4fElement[1][1] *
                element1[1][0])) + (m4fElement[1][2] * element1[2][0])) + (m4fElement[1][3] * element1[3][0]));
            fElement[1][1] = Math.fround((((m4fElement[1][0] * element1[0][1]) + (m4fElement[1][1] *
                element1[1][1])) + (m4fElement[1][2] * element1[2][1])) + (m4fElement[1][3] * element1[3][1]));
            fElement[1][2] = Math.fround((((m4fElement[1][0] * element1[0][2]) + (m4fElement[1][1] *
                element1[1][2])) + (m4fElement[1][2] * element1[2][2])) + (m4fElement[1][3] * element1[3][2]));
            fElement[1][3] = Math.fround((((m4fElement[1][0] * element1[0][3]) + (m4fElement[1][1] *
                element1[1][3])) + (m4fElement[1][2] * element1[2][3])) + (m4fElement[1][3] * element1[3][3]));
            fElement[2][0] = Math.fround((((m4fElement[2][0] * element1[0][0]) + (m4fElement[2][1] *
                element1[1][0])) + (m4fElement[2][2] * element1[2][0])) + (m4fElement[2][3] * element1[3][0]));
            fElement[2][1] = Math.fround((((m4fElement[2][0] * element1[0][1]) + (m4fElement[2][1] *
                element1[1][1])) + (m4fElement[2][2] * element1[2][1])) + (m4fElement[2][3] * element1[3][1]));
            fElement[2][2] = Math.fround((((m4fElement[2][0] * element1[0][2]) + (m4fElement[2][1] *
                element1[1][2])) + (m4fElement[2][2] * element1[2][2])) + (m4fElement[2][3] * element1[3][2]));
            fElement[2][3] = Math.fround((((m4fElement[2][0] * element1[0][3]) + (m4fElement[2][1] *
                element1[1][3])) + (m4fElement[2][2] * element1[2][3])) + (m4fElement[2][3] * element1[3][3]));
            fElement[3][0] = Math.fround((((m4fElement[3][0] * element1[0][0]) + (m4fElement[3][1] *
                element1[1][0])) + (m4fElement[3][2] * element1[2][0])) + (m4fElement[3][3] * element1[3][0]));
            fElement[3][1] = Math.fround((((m4fElement[3][0] * element1[0][1]) + (m4fElement[3][1] *
                element1[1][1])) + (m4fElement[3][2] * element1[2][1])) + (m4fElement[3][3] * element1[3][1]));
            fElement[3][2] = Math.fround((((m4fElement[3][0] * element1[0][2]) + (m4fElement[3][1] *
                element1[1][2])) + (m4fElement[3][2] * element1[2][2])) + (m4fElement[3][3] * element1[3][2]));
            fElement[3][3] = Math.fround((((m4fElement[3][0] * element1[0][3]) + (m4fElement[3][1] *
                element1[1][3])) + (m4fElement[3][2] * element1[2][3])) + (m4fElement[3][3] * element1[3][3]));
            for (let i = 0; i < 4; ++i) {
                CWSYSTEM.CWUtils.copyArray(fElement[i], 0, this.element[i], 0, 4);
            }
        }
        preMultiply(var1) {
            const element1 = var1.element;
            const element2 = this.element;
            const matrix = (function (dims) { let allocate = function (dims) { if (dims.length === 0) {
                return 0;
            }
            else {
                let array = [];
                for (let i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([4, 4]);
            matrix[0][0] = Math.fround((((element2[0][0] * element1[0][0]) + (element2[0][1] * element1[1][0])) +
                (element2[0][2] * element1[2][0])) + (element2[0][3] * element1[3][0]));
            matrix[0][1] = Math.fround((((element2[0][0] * element1[0][1]) + (element2[0][1] * element1[1][1])) +
                (element2[0][2] * element1[2][1])) + (element2[0][3] * element1[3][1]));
            matrix[0][2] = Math.fround((((element2[0][0] * element1[0][2]) + (element2[0][1] * element1[1][2])) +
                (element2[0][2] * element1[2][2])) + (element2[0][3] * element1[3][2]));
            matrix[0][3] = Math.fround((((element2[0][0] * element1[0][3]) + (element2[0][1] * element1[1][3])) +
                (element2[0][2] * element1[2][3])) + (element2[0][3] * element1[3][3]));
            matrix[1][0] = Math.fround((((element2[1][0] * element1[0][0]) + (element2[1][1] * element1[1][0])) +
                (element2[1][2] * element1[2][0])) + (element2[1][3] * element1[3][0]));
            matrix[1][1] = Math.fround((((element2[1][0] * element1[0][1]) + (element2[1][1] * element1[1][1])) +
                (element2[1][2] * element1[2][1])) + (element2[1][3] * element1[3][1]));
            matrix[1][2] = Math.fround((((element2[1][0] * element1[0][2]) + (element2[1][1] * element1[1][2])) +
                (element2[1][2] * element1[2][2])) + (element2[1][3] * element1[3][2]));
            matrix[1][3] = Math.fround((((element2[1][0] * element1[0][3]) + (element2[1][1] * element1[1][3])) +
                (element2[1][2] * element1[2][3])) + (element2[1][3] * element1[3][3]));
            matrix[2][0] = Math.fround((((element2[2][0] * element1[0][0]) + (element2[2][1] * element1[1][0])) +
                (element2[2][2] * element1[2][0])) + (element2[2][3] * element1[3][0]));
            matrix[2][1] = Math.fround((((element2[2][0] * element1[0][1]) + (element2[2][1] * element1[1][1])) +
                (element2[2][2] * element1[2][1])) + (element2[2][3] * element1[3][1]));
            matrix[2][2] = Math.fround((((element2[2][0] * element1[0][2]) + (element2[2][1] * element1[1][2])) +
                (element2[2][2] * element1[2][2])) + (element2[2][3] * element1[3][2]));
            matrix[2][3] = Math.fround((((element2[2][0] * element1[0][3]) + (element2[2][1] * element1[1][3])) +
                (element2[2][2] * element1[2][3])) + (element2[2][3] * element1[3][3]));
            matrix[3][0] = Math.fround((((element2[3][0] * element1[0][0]) + (element2[3][1] * element1[1][0])) +
                (element2[3][2] * element1[2][0])) + (element2[3][3] * element1[3][0]));
            matrix[3][1] = Math.fround((((element2[3][0] * element1[0][1]) + (element2[3][1] * element1[1][1])) +
                (element2[3][2] * element1[2][1])) + (element2[3][3] * element1[3][1]));
            matrix[3][2] = Math.fround((((element2[3][0] * element1[0][2]) + (element2[3][1] * element1[1][2])) +
                (element2[3][2] * element1[2][2])) + (element2[3][3] * element1[3][2]));
            matrix[3][3] = Math.fround((((element2[3][0] * element1[0][3]) + (element2[3][1] * element1[1][3])) +
                (element2[3][2] * element1[2][3])) + (element2[3][3] * element1[3][3]));
            for (let i = 0; i < 4; ++i) {
                CWSYSTEM.CWUtils.copyArray(matrix[i], 0, this.element[i], 0, 4);
            }
        }
        inverse() {
            const matrix = [this.element[0][0], this.element[1][0], this.element[2][0], this.element[3][0], this.element[0][1], this.element[1][1], this.element[2][1], this.element[3][1], this.element[0][2], this.element[1][2], this.element[2][2], this.element[3][2], this.element[0][3], this.element[1][3], this.element[2][3], this.element[3][3]];
            const x16 = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(16);
            const x12 = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(12);
            const x16g = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(16);
            let i;
            for (i = 0; i < 4; ++i) {
                x16g[i] = matrix[i * 4];
                x16g[i + 4] = matrix[i * 4 + 1];
                x16g[i + 8] = matrix[i * 4 + 2];
                x16g[i + 12] = matrix[i * 4 + 3];
            }
            x12[0] = Math.fround(x16g[10] * x16g[15]);
            x12[1] = Math.fround(x16g[11] * x16g[14]);
            x12[2] = Math.fround(x16g[9] * x16g[15]);
            x12[3] = Math.fround(x16g[11] * x16g[13]);
            x12[4] = Math.fround(x16g[9] * x16g[14]);
            x12[5] = Math.fround(x16g[10] * x16g[13]);
            x12[6] = Math.fround(x16g[8] * x16g[15]);
            x12[7] = Math.fround(x16g[11] * x16g[12]);
            x12[8] = Math.fround(x16g[8] * x16g[14]);
            x12[9] = Math.fround(x16g[10] * x16g[12]);
            x12[10] = Math.fround(x16g[8] * x16g[13]);
            x12[11] = Math.fround(x16g[9] * x16g[12]);
            x16[0] =  Math.fround(((x12[0] * x16g[5]) + (x12[3] * x16g[6])) + (x12[4] * x16g[7]));
            x16[0] -= Math.fround(((x12[1] * x16g[5]) + (x12[2] * x16g[6])) + (x12[5] * x16g[7]));
            x16[1] =  Math.fround(((x12[1] * x16g[4]) + (x12[6] * x16g[6])) + (x12[9] * x16g[7]));
            x16[1] -= Math.fround(((x12[0] * x16g[4]) + (x12[7] * x16g[6])) + (x12[8] * x16g[7]));
            x16[2] =  Math.fround(((x12[2] * x16g[4]) + (x12[7] * x16g[5])) + (x12[10] * x16g[7]));
            x16[2] -= Math.fround(((x12[3] * x16g[4]) + (x12[6] * x16g[5])) + (x12[11] * x16g[7]));
            x16[3] =  Math.fround(((x12[5] * x16g[4]) + (x12[8] * x16g[5])) + (x12[11] * x16g[6]));
            x16[3] -= Math.fround(((x12[4] * x16g[4]) + (x12[9] * x16g[5])) + (x12[10] * x16g[6]));
            x16[4] =  Math.fround(((x12[1] * x16g[1]) + (x12[2] * x16g[2])) + (x12[5] * x16g[3]));
            x16[4] -= Math.fround(((x12[0] * x16g[1]) + (x12[3] * x16g[2])) + (x12[4] * x16g[3]));
            x16[5] =  Math.fround(((x12[0] * x16g[0]) + (x12[7] * x16g[2])) + (x12[8] * x16g[3]));
            x16[5] -= Math.fround(((x12[1] * x16g[0]) + (x12[6] * x16g[2])) + (x12[9] * x16g[3]));
            x16[6] =  Math.fround(((x12[3] * x16g[0]) + (x12[6] * x16g[1])) + (x12[11] * x16g[3]));
            x16[6] -= Math.fround(((x12[2] * x16g[0]) + (x12[7] * x16g[1])) + (x12[10] * x16g[3]));
            x16[7] =  Math.fround(((x12[4] * x16g[0]) + (x12[9] * x16g[1])) + (x12[10] * x16g[2]));
            x16[7] -= Math.fround(((x12[5] * x16g[0]) + (x12[8] * x16g[1])) + (x12[11] * x16g[2]));
            x12[0] = Math.fround(x16g[2] * x16g[7]);
            x12[1] = Math.fround(x16g[3] * x16g[6]);
            x12[2] = Math.fround(x16g[1] * x16g[7]);
            x12[3] = Math.fround(x16g[3] * x16g[5]);
            x12[4] = Math.fround(x16g[1] * x16g[6]);
            x12[5] = Math.fround(x16g[2] * x16g[5]);
            x12[6] = Math.fround(x16g[0] * x16g[7]);
            x12[7] = Math.fround(x16g[3] * x16g[4]);
            x12[8] = Math.fround(x16g[0] * x16g[6]);
            x12[9] = Math.fround(x16g[2] * x16g[4]);
            x12[10] = Math.fround(x16g[0] * x16g[5]);
            x12[11] = Math.fround(x16g[1] * x16g[4]);
            x16[8] =  Math.fround(((x12[0] * x16g[13]) + (x12[3] * x16g[14])) + (x12[4] * x16g[15]));
            x16[8] -= Math.fround(((x12[1] * x16g[13]) + (x12[2] * x16g[14])) + (x12[5] * x16g[15]));
            x16[9] =  Math.fround(((x12[1] * x16g[12]) + (x12[6] * x16g[14])) + (x12[9] * x16g[15]));
            x16[9] -= Math.fround(((x12[0] * x16g[12]) + (x12[7] * x16g[14])) + (x12[8] * x16g[15]));
            x16[10] = Math.fround(((x12[2] * x16g[12]) + (x12[7] * x16g[13])) + (x12[10] * x16g[15]));
            x16[10] -= Math.fround(((x12[3] * x16g[12]) + (x12[6] * x16g[13])) + (x12[11] * x16g[15]));
            x16[11] =  Math.fround(((x12[5] * x16g[12]) + (x12[8] * x16g[13])) + (x12[11] * x16g[14]));
            x16[11] -= Math.fround(((x12[4] * x16g[12]) + (x12[9] * x16g[13])) + (x12[10] * x16g[14]));
            x16[12] =  Math.fround(((x12[2] * x16g[10]) + (x12[5] * x16g[11])) + (x12[1] * x16g[9]));
            x16[12] -= Math.fround(((x12[4] * x16g[11]) + (x12[0] * x16g[9])) + (x12[3] * x16g[10]));
            x16[13] =  Math.fround(((x12[8] * x16g[11]) + (x12[0] * x16g[8])) + (x12[7] * x16g[10]));
            x16[13] -= Math.fround(((x12[6] * x16g[10]) + (x12[9] * x16g[11])) + (x12[1] * x16g[8]));
            x16[14] =  Math.fround(((x12[6] * x16g[9]) + (x12[11] * x16g[11])) + (x12[3] * x16g[8]));
            x16[14] -= Math.fround(((x12[10] * x16g[11]) + (x12[2] * x16g[8])) + (x12[7] * x16g[9]));
            x16[15] =  Math.fround(((x12[10] * x16g[10]) + (x12[4] * x16g[8])) + (x12[9] * x16g[9]));
            x16[15] -= Math.fround(((x12[8] * x16g[9]) +  (x12[11] * x16g[10])) + (x12[5] * x16g[8]));
            const combine = Math.fround((((x16g[0] * x16[0]) + (x16g[1] * x16[1])) + (x16g[2] * x16[2])) + (x16g[3] * x16[3]));
            if (combine === 0.0) {
                for (i = 0; i < 16; ++i) {
                        x16[i] = NaN;
                }
            }
            else {
                const div = Math.fround(1.0 / combine);
                for (let j = 0; j < 16; ++j) {
                    x16[j] *= div;
                }
            }
            return new Matrix4f(x16[0], x16[1], x16[2], x16[3], x16[4], x16[5], x16[6], x16[7],
                x16[8], x16[9], x16[10], x16[11], x16[12], x16[13], x16[14], x16[15]);
        }
        static scaleMatrix(e00, e11, e22) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = e00;
            matrix4f.element[1][1] = e11;
            matrix4f.element[2][2] = e22;
            return matrix4f;
        }
        scale(e00, e11, e22) {
            this.preMultiply(Matrix4f.scaleMatrix(e00, e11, e22));
            return this;
        }
        static translationMatrix(e30, e31, e32) {
            const matrix4f = new Matrix4f();
            matrix4f.element[3][0] = e30;
            matrix4f.element[3][1] = e31;
            matrix4f.element[3][2] = e32;
            return matrix4f;
        }
        translate(e30, e31, e32) {
            this.preMultiply(Matrix4f.translationMatrix(e30, e31, e32));
            return this;
        }
        static rotationXMatrix(rotateX) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateX$float(rotateX);
            return matrix4f;
        }
        static rotationYMatrix(rotateY) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateY$float(rotateY);
            return matrix4f;
        }
        static rotationZMatrix(rotateZ) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateZ$float(rotateZ);
            return matrix4f;
        }
        rotateX$float(x) {
            const sinV = Math.fround(Math.sin(x));
            const cosV = Math.fround(Math.cos(x));
            this.rotateX$float$float(sinV, cosV);
            return this;
        }
        rotateX$float$float(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[1][1] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][1] = start;
            matrix4f.element[1][2] = -start;
            this.preMultiply(matrix4f);
            return this;
        }
        rotateX(start, end) {
            if (((typeof start === 'number') || start === null) &&
                ((typeof end === 'number') || end === null)) {
                return this.rotateX$float$float(start, end);
            }
            else if (((typeof start === 'number') || start === null) &&
                end === undefined) {
                return this.rotateX$float(start);
            }
            else
                throw new Error('invalid overload');
        }
        rotateY$float(rotateY) {
            const sin = Math.fround(Math.sin(rotateY));
            const cos = Math.fround(Math.cos(rotateY));
            this.rotateY$float$float(sin, cos);
            return this;
        }
        rotateY$float$float(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][0] = -start;
            matrix4f.element[0][2] = start;
            this.preMultiply(matrix4f);
            return this;
        }
        rotateY(start, end) {
            if (((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null)) {
                return this.rotateY$float$float(start, end);
            }
            else if (((typeof start === 'number') || start === null) && end === undefined) {
                return this.rotateY$float(start);
            }
            else
                throw new Error('invalid overload');
        }
        rotateZ$float(rotateZ) {
            const sin = Math.fround(Math.sin(rotateZ));
            const cos = Math.fround(Math.cos(rotateZ));
            this.rotateZ$float$float(sin, cos);
            return this;
        }
        rotateZ$float$float(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[1][1] = end;
            matrix4f.element[1][0] = start;
            matrix4f.element[0][1] = -start;
            this.preMultiply(matrix4f);
            return this;
        }
        rotateZ(start, end) {
            if (((typeof start === 'number') || start === null) && ((typeof end === 'number') || end === null)) {
                return this.rotateZ$float$float(start, end);
            }
            else if (((typeof start === 'number') || start === null) && end === undefined) {
                return this.rotateZ$float(start);
            }
            else
                throw new Error('invalid overload');
        }
        print() {
            const str = { str: "", toString: function () { return this.str; } };
            for (let i = 0; i < 4; ++i) {
                {
                    /* append */ (sb => { sb.str += "\n"; return sb; })(/* append */ (sb => { sb.str += this.element[3][i]; return sb; })(/* append */ (sb => { sb.str += " "; return sb; })(/* append */ (sb => { sb.str += this.element[2][i]; return sb; })(/* append */ (sb => { sb.str += " "; return sb; })(/* append */ (sb => { sb.str += this.element[1][i]; return sb; })(/* append */ (sb => { sb.str += " "; return sb; })(/* append */ (sb => { sb.str += this.element[0][i]; return sb; })(/* append */ (sb => { sb.str += "\n"; return sb; })(str)))))))));
                }
                ;
            }
            return /* toString */ str.str;
        }
    }
    dsector.Matrix4f = Matrix4f;
    Matrix4f["__class"] = "dsector.Matrix4f";
})(dsector || (dsector = {}));
