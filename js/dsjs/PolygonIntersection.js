/**/
(function (dsector) {
    /**
     * Class for calculating polygon intersections.
     *
     * @property {number} EPSILON - The epsilon value for floating-point comparisons.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof dsector
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class PolygonIntersection {
        /**
         * Shortcut for Math.abs()
         *
         * @param {number} abs - The value to get the absolute value of.
         * @returns {number} The absolute value of the input value.
         */
        static FABS(abs) {
            return Math.abs(abs);
        }

        /**
         * Calculates the cross product of two vectors and stores the result in the target vertex.
         *
         * @param {Float32Array<number>} targetVertex - The target vertex to store the cross product.
         * @param {Float32Array<number>} vertex1 - The first vector.
         * @param {Float32Array<number>} vertex2 - The second vector.
         */
        static CROSS(targetVertex, vertex1, vertex2) {
            targetVertex[0] = Math.fround((vertex1[1] * vertex2[2]) - (vertex1[2] * vertex2[1]));
            targetVertex[1] = Math.fround((vertex1[2] * vertex2[0]) - (vertex1[0] * vertex2[2]));
            targetVertex[2] = Math.fround((vertex1[0] * vertex2[1]) - (vertex1[1] * vertex2[0]));
        }

        /**
         * Calculates the dot product between two vectors.
         *
         * @param {Float32Array<number>} v1 - The first vector.
         * @param {Float32Array<number>} v2 - The second vector.
         * @returns {number} Returns the dot product of the two vectors.
         */
        static DOT(v1, v2) {
            return Math.fround(((v1[0] * v2[0]) + (v1[1] * v2[1])) + (v1[2] * v2[2]));
        }

        /**
         * Subtracts two vectors and stores the result in the target vertex.
         *
         * @param {Float32Array<number>} target - The target vertex to store the result of the subtraction.
         * @param {Float32Array<number>} v1 - The first vector.
         * @param {Float32Array<number>} v2 - The second vector.
         */
        static SUB(target, v1, v2) {
            target[0] = Math.fround(v1[0] - v2[0]);
            target[1] = Math.fround(v1[1] - v2[1]);
            target[2] = Math.fround(v1[2] - v2[2]);
        }

        /**
         * Adds two vectors and stores the result in the target vertex.
         *
         * @param {Array<number>} target - The target vertex to store the result of the addition.
         * @param {Array<number>} v1 - The first vector.
         * @param {Array<number>} v2 - The second vector.
         */
        static ADD(target, v1, v2) {
            target[0] = Math.fround(v1[0] + v2[0]);
            target[1] = Math.fround(v1[1] + v2[1]);
            target[2] = Math.fround(v1[2] + v2[2]);
        }

        /**
         * Multiplies a vector by a multiplier and stores the result in the target vertex.
         *
         * @param {Array<number>} target - The target vertex to store the result of the multiplication.
         * @param {Array<number>} vertex - The vector to be multiplied.
         * @param {number} scalar - The multiplier value.
         */
        static MULT(target, vertex, scalar) {
            target[0] = Math.fround(scalar * vertex[0]);
            target[1] = Math.fround(scalar * vertex[1]);
            target[2] = Math.fround(scalar * vertex[2]);
        }

        /**
         * Sets the values of the target vertex to match the input vertex.
         *
         * @param {Array<number>} target - The target vertex to be set.
         * @param {Array<number>} v - The input vertex to be copied.
         */
        static SET(target, v) {
            target[0] = v[0];
            target[1] = v[1];
            target[2] = v[2];
        }

        /**
         * Swaps the values of f1 and f2 if f1 is greater than f2.
         *
         * @param {dsector.FloatPair} fp - An object containing f1 and f2 values.
         */
        static SORT(fp) {
            if (fp.f1 > fp.f2) {
                const fx = fp.f1;
                fp.f1 = fp.f2;
                fp.f2 = fx;
            }
        }

        /**
         * Calculates the intersection point between two lines in a 2D space.
         *
         * @param {number} a - The starting value of the x-coordinate.
         * @param {number} b - The ending value of the x-coordinate.
         * @param {number} c - The ending value of the y-coordinate.
         * @param {number} d - The parameter that determines the position between the starting and ending values.
         * @param {number} e - The starting value of the parameter difference.
         * @param {number} f - The starting value of the y-coordinate difference.
         * @param {dsector.FloatPair} floatPair - An object to store the intersection point.
         */
        static ISECT(a, b, c, d, e, f, floatPair) {
            floatPair.set(Math.fround(a + (b - a) * d / (d - e)),
                Math.fround(a + (c - a) * d / (d - f)));
        }

        /**
         * Computes intervals and intersection points based on the given parameters.
         *
         * @param {number} axis1 - The x-coordinate of the first vertex.
         * @param {number} axis2 - The y-coordinate of the first vertex.
         * @param {number} axis3 - The z-coordinate of the first vertex.
         * @param {number} axis4 - The x-coordinate of the second vertex.
         * @param {number} axis5 - The y-coordinate of the second vertex.
         * @param {number} axis6 - The z-coordinate of the second vertex.
         * @param {number} product1 - The product value used for interval calculation.
         * @param {number} product2 - The product value used for interval calculation.
         * @param {dsector.FloatPair} fp - An object to store the intersection points.
         * @returns {boolean} Returns true if intervals and intersection points are computed, otherwise returns false.
         */
        static COMPUTE_INTERVALS(axis1, axis2, axis3,
                                 axis4, axis5, axis6,
                                 product1, product2, fp) {
            if (product1 > 0.0) {
                PolygonIntersection.ISECT(axis3, axis1, axis2, axis6, axis4, axis5, fp);
                return true;
            } else if (product2 > 0.0) {
                PolygonIntersection.ISECT(axis2, axis1, axis3, axis5, axis4, axis6, fp);
                return true;
            } else if (!(Math.fround(axis5 * axis6) > 0.0) && axis4 === 0.0) {
                if (axis5 !== 0.0) {
                    PolygonIntersection.ISECT(axis2, axis1, axis3, axis5, axis4, axis6, fp);
                    return true;
                } else if (axis6 !== 0.0) {
                    PolygonIntersection.ISECT(axis3, axis1, axis2, axis6, axis4, axis5, fp);
                    return true;
                } else {
                    return false;
                }
            } else {
                PolygonIntersection.ISECT(axis1, axis2, axis3, axis4, axis5, axis6, fp);
                return true;
            }
        }

        /**
         * Performs an edge-edge intersection test between two triangles.
         *
         * @param {Float32Array<number>} v1 - The first vertex of the triangle.
         * @param {Float32Array<number>} v2 - The second vertex of the triangle.
         * @param {Float32Array<number>} v3 - The third vertex of the triangle.
         * @param {number} axis1 - The first axis index for the calculation.
         * @param {number} axis2 - The second axis index for the calculation.
         * @param {number} axis3 - The third axis index for the calculation.
         * @param {number} axis4 - The fourth axis index for the calculation.
         * @returns {number} Returns 1 if an intersection is found, otherwise returns 0.
         */
        static EDGE_EDGE_TEST(v1, v2, v3,
                              axis1, axis2, axis3, axis4) {
            const diff1 = Math.fround(v2[axis1] - v3[axis1]);
            const diff2 = Math.fround(v2[axis2] - v3[axis2]);
            const diff3 = Math.fround(v1[axis1] - v2[axis1]);
            const diff4 = Math.fround(v1[axis2] - v2[axis2]);
            const determinant1 = Math.fround((axis4 * diff1) - (axis3 * diff2));
            const determinant2 = Math.fround((diff2 * diff3) - (diff1 * diff4));
            if (determinant1 > 0.0 && determinant2 >= 0.0 && determinant2 <= determinant1 || determinant1 < 0.0 && determinant2 <= 0.0 && determinant2 >= determinant1) {
                const axisDiff = Math.fround((axis3 * diff4) - (axis4 * diff3));
                if (determinant1 > 0.0) {
                    if (axisDiff >= 0.0 && axisDiff <= determinant1) {
                        return 1;
                    }
                } else if (axisDiff <= 0.0 && axisDiff >= determinant1) {
                    return 1;
                }
            }
            return 0;
        }

        /**
         * Performs an edge against triangle edges intersection test.
         *
         * @param {Float32Array<number>} v0 - The first vertex of the edge.
         * @param {Float32Array<number>} v1 - The second vertex of the edge.
         * @param {Float32Array<number>} v2 - The first vertex of the triangle.
         * @param {Float32Array<number>} v3 - The second vertex of the triangle.
         * @param {Float32Array<number>} v4 - The third vertex of the triangle.
         * @param {number} axis1 - The first axis index for the calculation.
         * @param {number} axis2 - The second axis index for the calculation.
         * @returns {number} Returns 1 if an intersection is found, otherwise returns 0.
         */
        static EDGE_AGAINST_TRI_EDGES(v0, v1, v2, v3, v4,
                                      axis1, axis2) {
            const diff1 = Math.fround(v1[axis1] - v0[axis1]);
            const diff2 = Math.fround(v1[axis2] - v0[axis2]);
            if (PolygonIntersection.EDGE_EDGE_TEST(v0, v2, v3, axis1, axis2, diff1, diff2) === 1) {
                return 1;
            } else if (PolygonIntersection.EDGE_EDGE_TEST(v0, v3, v4, axis1, axis2, diff1, diff2) === 1) {
                return 1;
            } else {
                return PolygonIntersection.EDGE_EDGE_TEST(v0, v4, v2, axis1, axis2, diff1, diff2) === 1 ? 1 : 0;
            }
        }

        /**
         * Checks if a point is inside a triangle.
         *
         * @param {Float32Array<number>} v1 - The first vertex of the triangle.
         * @param {Float32Array<number>} v2 - The second vertex of the triangle.
         * @param {Float32Array<number>} v3 - The third vertex of the triangle.
         * @param {Float32Array<number>} v4 - The point to check.
         * @param {number} axis1 - The first axis index for the calculation.
         * @param {number} axis2 - The second axis index for the calculation.
         * @returns {number} Returns 1 if the point is inside the triangle, otherwise returns 0.
         */
        static POINT_IN_TRI(v1, v2, v3,
                            v4, axis1, axis2) {
            const diff0 = Math.fround(v2[axis1] - v1[axis1]);
            const diff1 = Math.fround(v2[axis2] - v1[axis2]);
            const diff2 = Math.fround(v3[axis1] - v2[axis1]);
            const diff3 = Math.fround(v3[axis2] - v2[axis2]);
            const diff4 = Math.fround(v1[axis1] - v3[axis1]);
            const diff5 = Math.fround(v1[axis2] - v3[axis2]);

            const point1 = Math.fround((diff1 * v4[axis1]) + (-diff0 * v4[axis2]) +
                ((-diff1 * v1[axis1]) - (-diff0 * v1[axis2])));
            const point2 = Math.fround((diff3 * v4[axis1]) + (-diff2 * v4[axis2]) +
                ((-diff3 * v2[axis1]) - (-diff2 * v2[axis2])));
            const point3 = Math.fround((diff5 * v4[axis1]) + (-diff4 * v4[axis2]) +
                ((-diff5 * v3[axis1]) - (-diff4 * v3[axis2])));

            return (point1 * point2) > 0.0 && (point1 * point3) > 0.0 ? 1 : 0;
        }

        /**
         * Checks for intersection between two coplanar triangles.
         *
         * @param {Float32Array<number>} v1 - The first vertex of the first triangle.
         * @param {Float32Array<number>} v2 - The second vertex of the first triangle.
         * @param {Float32Array<number>} v3 - The third vertex of the first triangle.
         * @param {Float32Array<number>} v4 - The first vertex of the second triangle.
         * @param {Float32Array<number>} v5 - The second vertex of the second triangle.
         * @param {Float32Array<number>} v6 - The third vertex of the second triangle.
         * @param {Float32Array<number>} v7 - A temporary vertex array used for calculations.
         * @returns {number} Returns 1 if the triangles intersect, otherwise returns 0.
         */
        static coplanar_tri_tri(v1, v2, v3,
                                v4, v5, v6, v7) {
            const nv = [PolygonIntersection.FABS(v1[0]), PolygonIntersection.FABS(v1[1]),
                PolygonIntersection.FABS(v1[2])];
            let axis1;
            let axis2;
            if (nv[0] > nv[1]) {
                if (nv[0] > nv[2]) {
                    axis1 = 1;
                    axis2 = 2;
                } else {
                    axis1 = 0;
                    axis2 = 1;
                }
            } else if (nv[2] > nv[1]) {
                axis1 = 0;
                axis2 = 1;
            } else {
                axis1 = 0;
                axis2 = 2;
            }
            if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(v2, v3, v5, v6,
                v7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(v3, v4, v5, v6,
                v7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(v4, v2, v5, v6,
                v7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.POINT_IN_TRI(v2, v5, v6, v7, axis1, axis2) === 1) {
                return 1;
            } else {
                return PolygonIntersection.POINT_IN_TRI(v5, v2, v3, v4, axis1, axis2) === 1 ? 1 : 0;
            }
        }

        /**
         * Determines if two triangles intersect each other.
         *
         * @param {Float32Array<number>} iv1 - The first vertex of the first triangle.
         * @param {Float32Array<number>} iv2 - The second vertex of the first triangle.
         * @param {Float32Array<number>} iv3 - The third vertex of the first triangle.
         * @param {Float32Array<number>} iv4 - The first vertex of the second triangle.
         * @param {Float32Array<number>} iv5 - The second vertex of the second triangle.
         * @param {Float32Array<number>} iv6 - The third vertex of the second triangle.
         * @returns {number} Returns 1 if the triangles intersect, otherwise returns 0.
         */
        static tri_tri_intersect(iv1, iv2, iv3,
                                 iv4, iv5, iv6) {
            const v0 = new Float32Array(3);
            const v1 = new Float32Array(3);
            const v2 = new Float32Array(3);
            const v3 = new Float32Array(3);
            const v4 = new Float32Array(3);
            const p1 = new dsector.FloatPair();
            const p2 = new dsector.FloatPair();

            PolygonIntersection.SUB(v0, iv2, iv1);
            PolygonIntersection.SUB(v1, iv3, iv1);
            PolygonIntersection.CROSS(v2, v0, v1);
            let spacing = -PolygonIntersection.DOT(v2, iv1);

            const axisDot1 = PolygonIntersection.DOT(v2, iv4) + spacing;
            const axisDot2 = PolygonIntersection.DOT(v2, iv5) + spacing;
            const axisDot3 = PolygonIntersection.DOT(v2, iv6) + spacing;
            const xyProduct1 = axisDot1 * axisDot2;
            const xzProduct1 = axisDot1 * axisDot3;
            if (xyProduct1 > 0.0 && xzProduct1 > 0.0) {
                return 0;
            }

            PolygonIntersection.SUB(v0, iv5, iv4);
            PolygonIntersection.SUB(v1, iv6, iv4);
            PolygonIntersection.CROSS(v3, v0, v1);
            const negDot = -PolygonIntersection.DOT(v3, iv4);

            const xCo_ordVertex3 = PolygonIntersection.DOT(v3, iv1) + negDot;
            const yCo_ordVertex3 = PolygonIntersection.DOT(v3, iv2) + negDot;
            const zCo_ordVertex3 = PolygonIntersection.DOT(v3, iv3) + negDot;

            const xyProduct2 = xCo_ordVertex3 * yCo_ordVertex3;
            const xzProduct2 = xCo_ordVertex3 * zCo_ordVertex3;
            if (xyProduct2 > 0.0 && xzProduct2 > 0.0) {
                return 0;
            }

            PolygonIntersection.CROSS(v4, v2, v3);
            let abs0 = Math.abs(v4[0]);
            let constant = 0;
            let abs1 = Math.abs(v4[1]);
            let abs2 = Math.abs(v4[2]);
            if (abs1 > abs0) {
                abs0 = abs1;
                constant = 1;
            }
            if (abs2 > abs0) {
                constant = 2;
            }

            const c1 = iv1[constant];
            const c2 = iv2[constant];
            const c3 = iv3[constant];
            const c4 = iv4[constant];
            const c5 = iv5[constant];
            const c6 = iv6[constant];

            const computeIntervals1 = PolygonIntersection.COMPUTE_INTERVALS(c1, c2, c3, xCo_ordVertex3,
                yCo_ordVertex3, zCo_ordVertex3, xyProduct2, xzProduct2, p1);
            const computeIntervals2 = PolygonIntersection.COMPUTE_INTERVALS(c4, c5, c6, axisDot1,
                axisDot2, axisDot3, xyProduct1, xzProduct1, p2);

            if (!computeIntervals1 || !computeIntervals2) {
                return PolygonIntersection.coplanar_tri_tri(v2, iv1, iv2, iv3, iv4,
                    iv5, iv6);
            }

            PolygonIntersection.SORT(p1);
            PolygonIntersection.SORT(p2);

            return !(p1.f2 < p2.f1) && !(p2.f2 < p1.f1) ? 1 : 0;
        }
    }

    /**
     * The epsilon value used for various calculations.
     * @type {number}
     * @constant
     * @default 1.0E-6
     */
    PolygonIntersection.EPSILON = 1.0E-6;
    dsector.PolygonIntersection = PolygonIntersection;
    PolygonIntersection["__class"] = "dsector.PolygonIntersection";
})(dsector || (dsector = {}));