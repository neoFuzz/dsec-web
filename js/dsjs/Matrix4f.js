var dsector;
(function (dsector) {
    /**
     * Class representing a 4x4 matrix.
     */
    class Matrix4f {
        /**
         * Create a 4x4 matrix.
         * @param {...number} elements - The elements of the matrix. If 16 elements are provided, they are used to fill the matrix. If no elements are provided, a 4x4 zero matrix is created.
         * @throws {Error} Will throw an error if the number of elements provided is not 0 or 16.
         */
        constructor(...elements) {
            if (elements.length === 16) {
                this.element = Array.from({length: 4}, () => Array.from({length: 4}, () => 0));
                let index = 0;
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < 4; i++) {
                        this.element[i][j] = elements[index++];
                    }
                }
            } else if (elements.length === 0) {
                this.element = Array.from({length: 4}, () => Array.from({length: 4}, () => 0));
                this.reset();
            } else
                throw new Error('invalid overload');
        }

        /**
         * Create a scale matrix.
         * @param {number} e00 - The scale factor along the x-axis.
         * @param {number} e11 - The scale factor along the y-axis.
         * @param {number} e22 - The scale factor along the z-axis.
         * @returns {Matrix4f} A new Matrix4f object representing a scale matrix.
         */
        static scaleMatrix(e00, e11, e22) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = e00;
            matrix4f.element[1][1] = e11;
            matrix4f.element[2][2] = e22;
            return matrix4f;
        }

        /**
         * Create a translation matrix.
         * @param {number} e30 - The translation along the x-axis.
         * @param {number} e31 - The translation along the y-axis.
         * @param {number} e32 - The translation along the z-axis.
         * @returns {Matrix4f} A new Matrix4f object representing a translation matrix.
         */
        static translationMatrix(e30, e31, e32) {
            const matrix4f = new Matrix4f();
            matrix4f.element[3][0] = e30;
            matrix4f.element[3][1] = e31;
            matrix4f.element[3][2] = e32;
            return matrix4f;
        }

        /**
         * Create a rotation matrix around the x-axis.
         * @param {number} rotateX - The angle of rotation in radians.
         * @returns {Matrix4f} A new Matrix4f object representing a rotation matrix.
         */
        static rotationXMatrix(rotateX) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateX(rotateX);
            return matrix4f;
        }

        /**
         * Create a rotation matrix around the y-axis.
         * @param {number} rotateY - The angle of rotation in radians.
         * @returns {Matrix4f} A new Matrix4f object representing a rotation matrix.
         */
        static rotationYMatrix(rotateY) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateY(rotateY);
            return matrix4f;
        }

        /**
         * Create a rotation matrix around the z-axis.
         * @param {number} rotateZ - The angle of rotation in radians.
         * @returns {Matrix4f} A new Matrix4f object representing a rotation matrix.
         */
        static rotationZMatrix(rotateZ) {
            const matrix4f = new Matrix4f();
            matrix4f.rotateZ(rotateZ);
            return matrix4f;
        }

        /**
         * Set the elements of this matrix to the elements of another matrix.
         * @param {Matrix4f} matrix4f - The matrix to copy elements from.
         */
        set(matrix4f) {
            for (let i = 0; i < 4; ++i) {
                CWSYSTEM.CWUtils.copyArray(matrix4f.element[i], 0, this.element[i], 0, 4);
            }
        }

        /**
         * Fill the matrix with random elements.
         */
        makeRandom() {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    this.element[i][j] = Math.fround(Math.random());
                }
            }
        }

        /**
         * Reset the matrix to the identity matrix.
         */
        reset() {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    this.element[i][j] = (i === j) ? 1.0 : 0.0;
                }
            }
        }

        /**
         * Multiply this matrix by another matrix from the right.
         * @param {Matrix4f} matrix4f - The matrix to multiply this matrix by.
         */
        postMultiply(matrix4f) {
            const matrixA = this.element;
            const matrixB = matrix4f.element;
            const resultMatrix = Array.from({length: 4}, () => Array.from({length: 4}, () => 0));

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < 4; k++) {
                        resultMatrix[i][j] += matrixB[i][k] * matrixA[k][j];
                    }
                    resultMatrix[i][j] = Math.fround(resultMatrix[i][j]);
                }
            }
            for (let i = 0; i < 4; ++i) {
                CWSYSTEM.CWUtils.copyArray(resultMatrix[i], 0, this.element[i], 0, 4);
            }
        }

        /**
         * Multiply this matrix by another matrix from the left.
         * @param {Matrix4f} matrix4f - The matrix to multiply this matrix by.
         */
        preMultiply(matrix4f) {
            const matrixA = this.element;
            const matrixB = matrix4f.element;
            const resultMatrix = Array.from(
                {length: 4}, () => Array.from({length: 4}, () => 0)
            );
            resultMatrix[0][0] = Math.fround((((matrixA[0][0] * matrixB[0][0]) + (matrixA[0][1] * matrixB[1][0])) +
                (matrixA[0][2] * matrixB[2][0])) + (matrixA[0][3] * matrixB[3][0]));
            resultMatrix[0][1] = Math.fround((((matrixA[0][0] * matrixB[0][1]) + (matrixA[0][1] * matrixB[1][1])) +
                (matrixA[0][2] * matrixB[2][1])) + (matrixA[0][3] * matrixB[3][1]));
            resultMatrix[0][2] = Math.fround((((matrixA[0][0] * matrixB[0][2]) + (matrixA[0][1] * matrixB[1][2])) +
                (matrixA[0][2] * matrixB[2][2])) + (matrixA[0][3] * matrixB[3][2]));
            resultMatrix[0][3] = Math.fround((((matrixA[0][0] * matrixB[0][3]) + (matrixA[0][1] * matrixB[1][3])) +
                (matrixA[0][2] * matrixB[2][3])) + (matrixA[0][3] * matrixB[3][3]));
            resultMatrix[1][0] = Math.fround((((matrixA[1][0] * matrixB[0][0]) + (matrixA[1][1] * matrixB[1][0])) +
                (matrixA[1][2] * matrixB[2][0])) + (matrixA[1][3] * matrixB[3][0]));
            resultMatrix[1][1] = Math.fround((((matrixA[1][0] * matrixB[0][1]) + (matrixA[1][1] * matrixB[1][1])) +
                (matrixA[1][2] * matrixB[2][1])) + (matrixA[1][3] * matrixB[3][1]));
            resultMatrix[1][2] = Math.fround((((matrixA[1][0] * matrixB[0][2]) + (matrixA[1][1] * matrixB[1][2])) +
                (matrixA[1][2] * matrixB[2][2])) + (matrixA[1][3] * matrixB[3][2]));
            resultMatrix[1][3] = Math.fround((((matrixA[1][0] * matrixB[0][3]) + (matrixA[1][1] * matrixB[1][3])) +
                (matrixA[1][2] * matrixB[2][3])) + (matrixA[1][3] * matrixB[3][3]));
            resultMatrix[2][0] = Math.fround((((matrixA[2][0] * matrixB[0][0]) + (matrixA[2][1] * matrixB[1][0])) +
                (matrixA[2][2] * matrixB[2][0])) + (matrixA[2][3] * matrixB[3][0]));
            resultMatrix[2][1] = Math.fround((((matrixA[2][0] * matrixB[0][1]) + (matrixA[2][1] * matrixB[1][1])) +
                (matrixA[2][2] * matrixB[2][1])) + (matrixA[2][3] * matrixB[3][1]));
            resultMatrix[2][2] = Math.fround((((matrixA[2][0] * matrixB[0][2]) + (matrixA[2][1] * matrixB[1][2])) +
                (matrixA[2][2] * matrixB[2][2])) + (matrixA[2][3] * matrixB[3][2]));
            resultMatrix[2][3] = Math.fround((((matrixA[2][0] * matrixB[0][3]) + (matrixA[2][1] * matrixB[1][3])) +
                (matrixA[2][2] * matrixB[2][3])) + (matrixA[2][3] * matrixB[3][3]));
            resultMatrix[3][0] = Math.fround((((matrixA[3][0] * matrixB[0][0]) + (matrixA[3][1] * matrixB[1][0])) +
                (matrixA[3][2] * matrixB[2][0])) + (matrixA[3][3] * matrixB[3][0]));
            resultMatrix[3][1] = Math.fround((((matrixA[3][0] * matrixB[0][1]) + (matrixA[3][1] * matrixB[1][1])) +
                (matrixA[3][2] * matrixB[2][1])) + (matrixA[3][3] * matrixB[3][1]));
            resultMatrix[3][2] = Math.fround((((matrixA[3][0] * matrixB[0][2]) + (matrixA[3][1] * matrixB[1][2])) +
                (matrixA[3][2] * matrixB[2][2])) + (matrixA[3][3] * matrixB[3][2]));
            resultMatrix[3][3] = Math.fround((((matrixA[3][0] * matrixB[0][3]) + (matrixA[3][1] * matrixB[1][3])) +
                (matrixA[3][2] * matrixB[2][3])) + (matrixA[3][3] * matrixB[3][3]));

            for (let i = 0; i < 4; ++i) {
                CWSYSTEM.CWUtils.copyArray(resultMatrix[i], 0, this.element[i], 0, 4);
            }
        }

        /**
         * This function calculates the inverse of a square matrix.
         * If the matrix is not square, the function will return undefined.
         *
         * @returns {Array} The inverse of the original matrix. If the original matrix is not square, returns undefined.
         */
        inverse() {
            let matrixA = this.element;
            //if the matrix isn't square: exit (error)
            if (matrixA.length !== matrixA[0].length) {
                return;
            }

            let i = 0, ii = 0, j = 0, dim = matrixA.length, e = 0, t = 0;
            let resultMatrix = [], C = [];
            for (i = 0; i < dim; i += 1) {
                resultMatrix[resultMatrix.length] = [];
                C[C.length] = [];
                for (j = 0; j < dim; j += 1) {
                    if (i === j) {
                        resultMatrix[i][j] = 1;
                    } else {
                        resultMatrix[i][j] = 0;
                    }
                    C[i][j] = matrixA[i][j];
                }
            }
            for (i = 0; i < dim; i += 1) {
                e = C[i][i];
                if (e === 0) {
                    for (ii = i + 1; ii < dim; ii += 1) {
                        if (C[ii][i] !== 0) {
                            for (j = 0; j < dim; j++) {
                                e = C[i][j];
                                C[i][j] = C[ii][j];
                                C[ii][j] = e;
                                e = resultMatrix[i][j];
                                resultMatrix[i][j] = resultMatrix[ii][j];
                                resultMatrix[ii][j] = e;
                            }
                            break;
                        }
                    }
                    e = C[i][i];
                    // If it's still 0, not invertible (error)
                    if (e === 0) {
                        return;
                    }
                }
                for (j = 0; j < dim; j++) {
                    C[i][j] = C[i][j] / e;
                    resultMatrix[i][j] = resultMatrix[i][j] / e;
                }

                for (ii = 0; ii < dim; ii++) {
                    if (ii === i) {
                        continue;
                    }
                    e = C[ii][i];

                    for (j = 0; j < dim; j++) {
                        C[ii][j] -= e * C[i][j];
                        resultMatrix[ii][j] -= e * resultMatrix[i][j];
                    }
                }
            }
            return new Matrix4f(resultMatrix[0][0], resultMatrix[1][0], resultMatrix[2][0], resultMatrix[3][0],
                resultMatrix[0][1], resultMatrix[1][1], resultMatrix[2][1], resultMatrix[3][1],
                resultMatrix[0][2], resultMatrix[1][2], resultMatrix[2][2], resultMatrix[3][2],
                resultMatrix[0][3], resultMatrix[1][3], resultMatrix[2][3], resultMatrix[3][3]);
        }

        /**
         * This function scales the current matrix by the given factors along the x, y, and z axes.
         * It pre-multiplies the current matrix by the scaling matrix and updates the current matrix.
         *
         * @param {number} e00 - The scaling factor along the x-axis.
         * @param {number} e11 - The scaling factor along the y-axis.
         * @param {number} e22 - The scaling factor along the z-axis.
         * @returns {Matrix4f} The current matrix after scaling.
         */
        scale(e00, e11, e22) {
            this.preMultiply(Matrix4f.scaleMatrix(e00, e11, e22));
            return this;
        }

        /**
         * This function translates the current matrix by the given distances along the x, y, and z axes.
         * It pre-multiplies the current matrix by the translation matrix and updates the current matrix.
         *
         * @param {number} e30 - The distance to translate along the x-axis.
         * @param {number} e31 - The distance to translate along the y-axis.
         * @param {number} e32 - The distance to translate along the z-axis.
         * @returns {Matrix4f} The current matrix after translation.
         */
        translate(e30, e31, e32) {
            this.preMultiply(Matrix4f.translationMatrix(e30, e31, e32));
            return this;
        }

        /**
         * This function rotates the current matrix around the X-axis by the given angle.
         * It pre-multiplies the current matrix by the rotation matrix and updates the current matrix.
         *
         * @param {number} x - The angle by which to rotate the matrix around the X-axis.
         * @returns {Matrix4f} The current matrix after rotation.
         */
        rotateX(x) {
            const sinV = Math.fround(Math.sin(x));
            const cosV = Math.fround(Math.cos(x));
            this.rotateX$ff(sinV, cosV);
            return this;
        }

        /**
         * This function is a helper function for rotateX. It creates a new rotation matrix and pre-multiplies it with the current matrix.
         *
         * @param {number} start - The sine of the angle by which to rotate the matrix.
         * @param {number} end - The cosine of the angle by which to rotate the matrix.
         * @returns {Matrix4f} The current matrix after rotation.
         */
        rotateX$ff(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[1][1] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][1] = start;
            matrix4f.element[1][2] = -start;
            this.preMultiply(matrix4f);
            return this;
        }

        /**
         * This function rotates the current matrix around the Y-axis by the given angle.
         * It pre-multiplies the current matrix by the rotation matrix and updates the current matrix.
         *
         * @param {number} rotateY - The angle by which to rotate the matrix around the Y-axis.
         * @returns {Matrix4f} The current matrix after rotation.
         */
        rotateY(rotateY) {
            const sin = Math.fround(Math.sin(rotateY));
            const cos = Math.fround(Math.cos(rotateY));
            this.rotateY$ff(sin, cos);
            return this;
        }

        /**
         * This function is a helper function for rotateY. It creates a new rotation matrix and pre-multiplies it with the current matrix.
         *
         * @param {number} start - The sine of the angle by which to rotate the matrix.
         * @param {number} end - The cosine of the angle by which to rotate the matrix.
         * @returns {Matrix4f} The current matrix after rotation.
         */
        rotateY$ff(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[2][2] = end;
            matrix4f.element[2][0] = -start;
            matrix4f.element[0][2] = start;
            this.preMultiply(matrix4f);
            return this;
        }

        /**
         * This function rotates the current matrix around the Z-axis by the given angle.
         * It pre-multiplies the current matrix by the rotation matrix and updates the current matrix.
         *
         * @param {number} rotateZ - The angle by which to rotate the matrix around the Z-axis.
         * @returns {Matrix4f} The current matrix after rotation.
         */
        rotateZ(rotateZ) {
            const sin = Math.fround(Math.sin(rotateZ));
            const cos = Math.fround(Math.cos(rotateZ));
            this.rotateZ$ff(sin, cos);
            return this;
        }

        /**
         * This function is a helper function for rotateZ. It creates a new rotation matrix and pre-multiplies it with the current matrix.
         *
         * @param {number} start - The sine of the angle by which to rotate the matrix.
         * @param {number} end - The cosine of the angle by which to rotate the matrix.
         * @returns {Matrix4f} The current matrix after rotation. */
        rotateZ$ff(start, end) {
            const matrix4f = new Matrix4f();
            matrix4f.element[0][0] = end;
            matrix4f.element[1][1] = end;
            matrix4f.element[1][0] = start;
            matrix4f.element[0][1] = -start;
            this.preMultiply(matrix4f);
            return this;
        }
    }

    dsector.Matrix4f = Matrix4f;
    Matrix4f["__class"] = "dsector.Matrix4f";
})(dsector || (dsector = {}));
