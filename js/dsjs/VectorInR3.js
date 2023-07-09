var dsector;
(function (dsector) {
    class VectorInR3 {
        /**
         * @param {number | VectorInR3} x
         * @param {number} y
         * @param {number} z
         * */
        constructor(x, y, z) {
            if (((typeof x === 'number') || x === null) &&
                ((typeof y === 'number') || y === null) &&
                ((typeof z === 'number') || z === null)) {
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.z === undefined) {
                    this.z = 0;
                }
                this.x = x;
                this.y = y;
                this.z = z;
            } else if (((x != null && x instanceof dsector.VectorInR3) || x === null) &&
                y === undefined && z === undefined) {
                let inR3 = arguments[0];
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.z === undefined) {
                    this.z = 0;
                }
                this.x = inR3.x;
                this.y = inR3.y;
                this.z = inR3.z;
            } else
                throw new Error('invalid overload');
        }

        /** adds on to existing values
         * @param {VectorInR3} inR3 */
        addVIR3(inR3) {
            this.x += inR3.x;
            this.y += inR3.y;
            this.z += inR3.z;
        }

        /**
         * @param {number} x
         * @param {number} y
         * @param {number} z
         */
        add(x, y, z) {
            this.x += x;
            this.y += y;
            this.z += z;
        }

        /** Subtract the parameter value from the specified axes.
         * @param {number} x Number to subtract from the X axis.
         * @param {number} y Number to subtract from the Y axis.
         * @param {number} z Number to subtract from the Z axis.
         */
        subtract(x, y, z) {
            this.x -= x;
            this.y -= y;
            this.z -= z;
        }

        /** Multiplies existing values by ``multiple`` value
         * @param {number} multiple */
        multiply(multiple) {
            this.x *= multiple;
            this.y *= multiple;
            this.z *= multiple;
        }

        /**
         * @returns the calculated length. */
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }

        dotProduct(inR3) {
            return this.x * inR3.x + this.y * inR3.y + this.z * inR3.z;
        }

        /**
         * @param {VectorInR3} inR3
         */
        crossProduct(inR3) {
            const x1 = this.x;
            const y1 = this.y;
            const z1 = this.z;
            const inX = inR3.x;
            const inY = inR3.y;
            const inZ = inR3.z;
            this.x = y1 * inZ - z1 * inY;
            this.y = z1 * inX - x1 * inZ;
            this.z = x1 * inY - y1 * inX;
        }

        /**
         * @param {number} mode
         * @param {number} angle
         */
        rotateVectorFromOriginAboutAxis$int$float(mode, angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            this.rotateVectorFromOriginAboutAxis$int$float$float(mode, cos, sin);
        }

        /**
         * @param {number} mode
         * @param {number} angle1
         * @param {number} angle2
         */
        rotateVectorFromOriginAboutAxis$int$float$float(mode, angle1, angle2) {
            const x1 = this.x;
            const y1 = this.y;
            const z1 = this.z;
            switch (mode) {
                case 0:
                    this.y = y1 * angle1 - z1 * angle2;
                    this.z = y1 * angle2 + z1 * angle1;
                    break;
                case 1:
                    this.x = x1 * angle1 + z1 * angle2;
                    this.z = -x1 * angle2 + z1 * angle1;
                    break;
                case 2:
                    this.x = x1 * angle1 - y1 * angle2;
                    this.y = x1 * angle2 + y1 * angle1;
            }
        }

        rotateVectorFromOriginAboutAxis(mode, angle1, angle2) {
            if (((typeof mode === 'number') || mode === null) && ((typeof angle1 === 'number') || angle1 === null) &&
                ((typeof angle2 === 'number') || angle2 === null)) {
                return this.rotateVectorFromOriginAboutAxis$int$float$float(mode, angle1, angle2);
            } else if (((typeof mode === 'number') || mode === null) &&
                ((typeof angle1 === 'number') || angle1 === null) && angle2 === undefined) {
                return this.rotateVectorFromOriginAboutAxis$int$float(mode, angle1);
            } else
                throw new Error('invalid overload');
        }

        transform(matrix4f) {
            const element = matrix4f.element;
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

        print() {
            CWSYSTEM.Debug.println("[" + this.x + ", " + this.y + ", " + this.z + "]");
        }
    }

    dsector.VectorInR3 = VectorInR3;
    VectorInR3["__class"] = "dsector.VectorInR3";
})(dsector || (dsector = {}));
