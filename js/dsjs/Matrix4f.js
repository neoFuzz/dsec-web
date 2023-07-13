var dsector;
(function (dsector) {
    class Matrix4f {
        constructor(
            element00, element10, element20, element30,
            element01, element11, element21, element31,
            element02, element12, element22, element32,
            element03, element13, element23, element33
        ) {
            if (
                typeof element00 === 'number' && typeof element10 === 'number' && typeof element20 === 'number' &&
                typeof element30 === 'number' && typeof element01 === 'number' && typeof element11 === 'number' &&
                typeof element21 === 'number' && typeof element31 === 'number' && typeof element02 === 'number' &&
                typeof element12 === 'number' && typeof element22 === 'number' && typeof element32 === 'number' &&
                typeof element03 === 'number' && typeof element13 === 'number' && typeof element23 === 'number' &&
                typeof element33 === 'number'
            ) {
                this.element = [
                    [element00, element10, element20, element30],
                    [element01, element11, element21, element31],
                    [element02, element12, element22, element32],
                    [element03, element13, element23, element33]
                ];
            } else if (
                element00 instanceof dsector.Matrix4f && element10 === undefined &&
                element20 === undefined && element30 === undefined &&
                element01 === undefined && element11 === undefined &&
                element21 === undefined && element31 === undefined &&
                element02 === undefined && element12 === undefined &&
                element22 === undefined && element32 === undefined &&
                element03 === undefined && element13 === undefined &&
                element23 === undefined && element33 === undefined
            ) {
                const matrix4f = element00;
                this.element = [
                    matrix4f.element[0].slice(),
                    matrix4f.element[1].slice(),
                    matrix4f.element[2].slice(),
                    matrix4f.element[3].slice()
                ];
            } else if (
                element00 === undefined && element10 === undefined && element20 === undefined &&
                element30 === undefined && element01 === undefined && element11 === undefined &&
                element21 === undefined && element31 === undefined && element02 === undefined &&
                element12 === undefined && element22 === undefined && element32 === undefined &&
                element03 === undefined && element13 === undefined && element23 === undefined &&
                element33 === undefined
            ) {
                this.element = [
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ];
                this.reset();
            } else {
                throw new Error('Invalid overload');
            }
        }

        static scaleMatrix(e00, e11, e22) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = e00;
            matrix4f.element[1][1] = e11;
            matrix4f.element[2][2] = e22;
            return matrix4f;
        }

        static translationMatrix(e30, e31, e32) {
            const matrix4f = new Matrix4f();
            matrix4f.element[3][0] = e30;
            matrix4f.element[3][1] = e31;
            matrix4f.element[3][2] = e32;
            return matrix4f;
        }

        static rotationXMatrix(rotateX) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateX(rotateX);
            return matrix4f;
        }

        static rotationYMatrix(rotateY) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateY(rotateY);
            return matrix4f;
        }

        static rotationZMatrix(rotateZ) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateZ(rotateZ);
            return matrix4f;
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
                this.element[i][i] = 1.0;
                for (let j = 0; j < 4; ++j) {
                    if (i !== j) {
                        this.element[i][j] = 0.0;
                    }
                }
            }
        }

        postMultiply(matrix4f) {
            const element1 = this.element;
            const m4fElement = matrix4f.element;
            const result = [];

            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let j = 0; j < 4; j++) {
                    let sum = 0;
                    for (let k = 0; k < 4; k++) {
                        sum += m4fElement[i][k] * element1[k][j];
                    }
                    row.push(Math.fround(sum));
                }
                result.push(row);
            }

            for (let i = 0; i < 4; i++) {
                CWSYSTEM.CWUtils.copyArray(result[i], 0, this.element[i], 0, 4);
            }
        }

        preMultiply(var1) {
            const element1 = var1.element;
            const element2 = this.element;
            const result = [];

            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let j = 0; j < 4; j++) {
                    let sum = 0;
                    for (let k = 0; k < 4; k++) {
                        sum += element2[i][k] * element1[k][j];
                    }
                    row.push(Math.fround(sum));
                }
                result.push(row);
            }

            for (let i = 0; i < 4; i++) {
                CWSYSTEM.CWUtils.copyArray(result[i], 0, this.element[i], 0, 4);
            }
        }


        inverse() {
            const matrix = [
                [this.element[0][0], this.element[1][0], this.element[2][0], this.element[3][0]],
                [this.element[0][1], this.element[1][1], this.element[2][1], this.element[3][1]],
                [this.element[0][2], this.element[1][2], this.element[2][2], this.element[3][2]],
                [this.element[0][3], this.element[1][3], this.element[2][3], this.element[3][3]]
            ];

            // Calculate the determinant of the matrix
            function determinant(matrix) {
                const [
                    [a, b, c, d],
                    [e, f, g, h],
                    [i, j, k, l],
                    [m, n, o, p]
                ] = matrix;

                const kp_lo = k * p - l * o;
                const jp_ln = j * p - l * n;
                const jo_kn = j * o - k * n;
                const ip_lm = i * p - l * m;
                const io_km = i * o - k * m;
                const in_jm = i * n - j * m;

                return a * (f * kp_lo - g * jp_ln + h * jo_kn) -
                    b * (e * kp_lo - g * ip_lm + h * io_km) +
                    c * (e * jp_ln - f * ip_lm + h * in_jm) -
                    d * (e * jo_kn - f * io_km + g * in_jm);
            }

            // Calculate the adjugate of the matrix
            function adjugate(matrix) {
                const [
                    [a, b, c, d],
                    [e, f, g, h],
                    [s, t, u, v],
                    [w, x, y, z]
                ] = matrix;

                const uz_vy = u * z - v * y;
                const tz_vx = t * z - v * x;
                const ty_ux = t * y - u * x;
                const sz_vw = s * z - v * w;
                const sy_uw = s * y - u * w;
                const sx_tw = s * x - t * w;

                const a11 = f * uz_vy - g * tz_vx + h * ty_ux;
                const a12 = -(e * uz_vy - g * sz_vw + h * sy_uw);
                const a13 = e * tz_vx - f * sz_vw + h * sx_tw;
                const a14 = -(e * ty_ux - f * sy_uw + g * sx_tw);
                const a21 = -(b * uz_vy - c * tz_vx + d * ty_ux);
                const a22 = a * uz_vy - c * sz_vw + d * sy_uw;
                const a23 = -(a * tz_vx - b * sz_vw + d * sx_tw);
                const a24 = a * ty_ux - b * sy_uw + d * sx_tw;
                const a31 = b * g - c * f + d * e;
                const a32 = -(a * g - c * d + d * b);
                const a33 = a * f - b * d + d * a;
                const a34 = -(a * e - b * c + d * a);
                const a41 = -(b * ty_ux - c * sy_uw + d * sx_tw);
                const a42 = a * ty_ux - b * sy_uw + d * sx_tw;
                const a43 = -(a * tz_vx - b * sz_vw + d * sx_tw);
                const a44 = a * tz_vx - b * sz_vw + d * ty_ux;

                return [
                    [a11, a21, a31, a41],
                    [a12, a22, a32, a42],
                    [a13, a23, a33, a43],
                    [a14, a24, a34, a44]
                ];
            }

            const det = determinant(matrix);

            if (det === 0) {
                throw new Error('Matrix is not invertible');
            }

            const adj = adjugate(matrix);

            return new Matrix4f(
                adj[0][0], adj[0][1], adj[0][2], adj[0][3],
                adj[1][0], adj[1][1], adj[1][2], adj[1][3],
                adj[2][0], adj[2][1], adj[2][2], adj[2][3],
                adj[3][0], adj[3][1], adj[3][2], adj[3][3]);
        }

        scale(e00, e11, e22) {
            this.preMultiply(Matrix4f.scaleMatrix(e00, e11, e22));
            return this;
        }

        translate(e30, e31, e32) {
            this.preMultiply(Matrix4f.translationMatrix(e30, e31, e32));
            return this;
        }

        rotateX(x) {
            const sinV = Math.fround(Math.sin(x));
            const cosV = Math.fround(Math.cos(x));
            this.rotateX$2v(sinV, cosV);
            return this;
        }

        rotateX$2v(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[1][1] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][1] = start;
            matrix4f.element[1][2] = -start;
            this.preMultiply(matrix4f);
            return this;
        }

        rotateY(rotateY) {
            const sin = Math.fround(Math.sin(rotateY));
            const cos = Math.fround(Math.cos(rotateY));
            this.rotateY$2v(sin, cos);
            return this;
        }

        rotateY$2v(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][0] = -start;
            matrix4f.element[0][2] = start;
            this.preMultiply(matrix4f);
            return this;
        }

        rotateZ(rotateZ) {
            const sin = Math.fround(Math.sin(rotateZ));
            const cos = Math.fround(Math.cos(rotateZ));
            this.rotateZ$2v(sin, cos);
            return this;
        }

        rotateZ$2v(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[1][1] = end;
            matrix4f.element[1][0] = start;
            matrix4f.element[0][1] = -start;
            this.preMultiply(matrix4f);
            return this;
        }

        print() {
            let str = "";
            for (let i = 0; i < 4; ++i) {
                str += "\n" + this.element[3][i] + " " + this.element[2][i] + " " + this.element[1][i] +
                    " " + this.element[0][i] + "\n";
            }
            return str;
        }
    }

    dsector.Matrix4f = Matrix4f;
    Matrix4f["__class"] = "dsector.Matrix4f";
})(dsector || (dsector = {}));
