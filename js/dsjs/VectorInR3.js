/**/
(function (dsector) {
    /**
     * @class
     * @memberof dsector
     */
    class VectorInR3 {
        /**
         * @param {number | VectorInR3} x
         * @param {number} [y]
         * @param {number} [z]
         */
        constructor(x = 0, y = 0, z = 0) {
            if (typeof x === 'number') {
                this.x = x;
                this.y = y;
                this.z = z;
            } else if (x instanceof VectorInR3) {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
            } else {
                throw new Error('Invalid arguments');
            }
        }

        /**
         * adds on to existing values
         * @param {VectorInR3} v
         */
        addVector(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        }

        /**
         * Adds the specified values to this vector.
         * @param {number} x
         * @param {number} y
         * @param {number} z
         */
        add(x, y, z) {
            this.x += x;
            this.y += y;
            this.z += z;
        }

        /**
         * Subtracts the specified values from this vector.
         * @param {number} x Number to subtract from the X axis.
         * @param {number} y Number to subtract from the Y axis.
         * @param {number} z Number to subtract from the Z axis.
         */
        subtract(x, y, z) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }

        /**
         * Multiplies this vector by a scalar value.
         * @param {number} scalar
         */
        multiply(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            this.z *= scalar;
        }

        /**
         * Calculates the length of this vector.
         * @returns {number} the calculated length.
         */
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        /**
         * Calculates the dot product with another vector.
         * @param {VectorInR3} v
         * @returns {number}
         */
        dotProduct(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        /**
         * Calculates the cross product with another vector and updates this vector.
         * @param {VectorInR3} v
         */
        crossProduct(v) {
            const x1 = this.x;
            const y1 = this.y;
            const z1 = this.z;
            const inX = v.x;
            const inY = v.y;
            const inZ = v.z;
            this.x = y1 * inZ - z1 * inY;
            this.y = z1 * inX - x1 * inZ;
            this.z = x1 * inY - y1 * inX;
        }

        /**
         * Rotates this vector around the specified axis by the given angle.
         * @param {number} axis
         * @param {number} angle
         */
        rotateAroundAxis(axis, angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            this.rotateAroundAxisWithCosSin(axis, cos, sin);
        }

        /**
         * Rotates this vector around the specified axis by given cosine and sine of the angle.
         * @param {number} axis
         * @param {number} cos
         * @param {number} sin
         */
        rotateAroundAxisWithCosSin(axis, cos, sin) {
            const x1 = this.x;
            const y1 = this.y;
            const z1 = this.z;
            switch (axis) {
                case 0:
                    this.y = y1 * cos - z1 * sin;
                    this.z = y1 * sin + z1 * cos;
                    break;
                case 1:
                    this.x = x1 * cos + z1 * sin;
                    this.z = -x1 * sin + z1 * cos;
                    break;
                case 2:
                    this.x = x1 * cos - y1 * sin;
                    this.y = x1 * sin + y1 * cos;
            }
        }

        /**
         * Rotates this vector around the specified axis.
         * If only angle is provided, computes cosine and sine internally.
         * @param {number} axis
         * @param {number} angle
         * @param {number} [sin]
         */
        rotateAroundAxisSin(axis, angle, sin) {
            if (typeof sin === 'undefined') {
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                this.rotateAroundAxisWithCosSin(axis, cos, sin);
            } else {
                this.rotateAroundAxisWithCosSin(axis, angle, sin);
            }
        }

        /**
         * Transforms this vector by a 4x4 matrix.
         * @param {object} m4f
         */
        transform(m4f) {
            const element = m4f.element;
            const x = Math.fround(element[0][0] * this.x + element[1][0] * this.y +
                element[2][0] * this.z + element[3][0]);
            const y = Math.fround(element[0][1] * this.x + element[1][1] * this.y +
                element[2][1] * this.z + element[3][1]);
            const z = Math.fround(element[0][2] * this.x + element[1][2] * this.y +
                element[2][2] * this.z + element[3][2]);
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /**
         * Prints the vector.
         */
        print() {
            CWSYSTEM.Debug.println(`[${this.x}, ${this.y}, ${this.z}]`);
        }
    }

    dsector.VectorInR3 = VectorInR3;
    VectorInR3["__class"] = "dsector.VectorInR3";
})(dsector || (dsector = {}));
