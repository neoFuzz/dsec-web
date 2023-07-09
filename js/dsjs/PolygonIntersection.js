var dsector;
(function (dsector) {
    class PolygonIntersection {
        /** Shortcut for Math.abs()
         * @param {number} abs */
        static FABS(abs) {
            return Math.abs(abs);
        }

        /**
         * Calculates the cross product of two vectors and stores the result in the target vertex.
         *
         * @param {Float32Array<number>} targetVertex - The target vertex to store the cross product.
         * @param {Float32Array<number>} vertex1 - The first vector.
         * @param {Float32Array<number>} vertex2 - The second vector.
         * @returns {void}
         */
        static CROSS(targetVertex, vertex1, vertex2) {
            targetVertex[0] = Math.fround((vertex1[1] * vertex2[2]) - (vertex1[2] * vertex2[1]));
            targetVertex[1] = Math.fround((vertex1[2] * vertex2[0]) - (vertex1[0] * vertex2[2]));
            targetVertex[2] = Math.fround((vertex1[0] * vertex2[1]) - (vertex1[1] * vertex2[0]));
        }

        /**
         * Calculates the dot product between two vectors.
         *
         * @param {Float32Array<number>} vertex1 - The first vector.
         * @param {Float32Array<number>} vertex2 - The second vector.
         * @returns {number} Returns the dot product of the two vectors.
         */
        static DOT(vertex1, vertex2) {
            return Math.fround(((vertex1[0] * vertex2[0]) + (vertex1[1] * vertex2[1])) + (vertex1[2] * vertex2[2]));
        }

        /**
         * Subtracts two vectors and stores the result in the target vertex.
         *
         * @param {Float32Array<number>} targetVertex - The target vertex to store the result of the subtraction.
         * @param {Float32Array<number>} vertex1 - The first vector.
         * @param {Float32Array<number>} vertex2 - The second vector.
         * @returns {void}
         */
        static SUB(targetVertex, vertex1, vertex2) {
            targetVertex[0] = Math.fround(vertex1[0] - vertex2[0]);
            targetVertex[1] = Math.fround(vertex1[1] - vertex2[1]);
            targetVertex[2] = Math.fround(vertex1[2] - vertex2[2]);
        }

        /**
         * Adds two vectors and stores the result in the target vertex.
         *
         * @param {Array<number>} targetVertex - The target vertex to store the result of the addition.
         * @param {Array<number>} vertex1 - The first vector.
         * @param {Array<number>} vertex2 - The second vector.
         * @returns {void}
         */
        static ADD(targetVertex, vertex1, vertex2) {
            targetVertex[0] = Math.fround(vertex1[0] + vertex2[0]);
            targetVertex[1] = Math.fround(vertex1[1] + vertex2[1]);
            targetVertex[2] = Math.fround(vertex1[2] + vertex2[2]);
        }

        /**
         * Multiplies a vector by a multiplier and stores the result in the target vertex.
         *
         * @param {Array<number>} targetVertex - The target vertex to store the result of the multiplication.
         * @param {Array<number>} vertex - The vector to be multiplied.
         * @param {number} multiplier - The multiplier value.
         * @returns {void}
         */
        static MULT(targetVertex, vertex, multiplier) {
            targetVertex[0] = Math.fround(multiplier * vertex[0]);
            targetVertex[1] = Math.fround(multiplier * vertex[1]);
            targetVertex[2] = Math.fround(multiplier * vertex[2]);
        }

        /**
         * Sets the values of the target vertex to match the input vertex.
         *
         * @param {Array<number>} target - The target vertex to be set.
         * @param {Array<number>} vInput - The input vertex to be copied.
         * @returns {void}
         */
        static SET(target, vInput) {
            target[0] = vInput[0];
            target[1] = vInput[1];
            target[2] = vInput[2];
        }

        static SORT(floatPair) {
            if (floatPair.f1 > floatPair.f2) {
                const fx = floatPair.f1;
                floatPair.f1 = floatPair.f2;
                floatPair.f2 = fx;
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
         * @param {Object} floatPair - An object to store the intersection point.
         * @returns {void}
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
         * @param {Object} floatPair - An object to store the intersection points.
         * @returns {boolean} Returns true if intervals and intersection points are computed, otherwise returns false.
         */
        static COMPUTE_INTERVALS(axis1, axis2, axis3,
                                 axis4, axis5, axis6,
                                 product1, product2, floatPair) {
            if (product1 > 0.0) {
                PolygonIntersection.ISECT(axis3, axis1, axis2, axis6, axis4, axis5, floatPair);
                return true;
            } else if (product2 > 0.0) {
                PolygonIntersection.ISECT(axis2, axis1, axis3, axis5, axis4, axis6, floatPair);
                return true;
            } else if (!(Math.fround(axis5 * axis6) > 0.0) && axis4 === 0.0) {
                if (axis5 !== 0.0) {
                    PolygonIntersection.ISECT(axis2, axis1, axis3, axis5, axis4, axis6, floatPair);
                    return true;
                } else if (axis6 !== 0.0) {
                    PolygonIntersection.ISECT(axis3, axis1, axis2, axis6, axis4, axis5, floatPair);
                    return true;
                } else {
                    return false;
                }
            } else {
                PolygonIntersection.ISECT(axis1, axis2, axis3, axis4, axis5, axis6, floatPair);
                return true;
            }
        }

        /**
         * Performs an edge-edge intersection test between two triangles.
         *
         * @param {Float32Array<number>} vertex1 - The first vertex of the triangle.
         * @param {Float32Array<number>} vertex2 - The second vertex of the triangle.
         * @param {Float32Array<number>} vertex3 - The third vertex of the triangle.
         * @param {number} axis1 - The first axis index for the calculation.
         * @param {number} axis2 - The second axis index for the calculation.
         * @param {number} axis3 - The third axis index for the calculation.
         * @param {number} axis4 - The fourth axis index for the calculation.
         * @returns {number} Returns 1 if an intersection is found, otherwise returns 0.
         */
        static EDGE_EDGE_TEST(vertex1, vertex2, vertex3,
                              axis1, axis2, axis3, axis4) {
            const diff1 = Math.fround(vertex2[axis1] - vertex3[axis1]);
            const diff2 = Math.fround(vertex2[axis2] - vertex3[axis2]);
            const diff3 = Math.fround(vertex1[axis1] - vertex2[axis1]);
            const diff4 = Math.fround(vertex1[axis2] - vertex2[axis2]);
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
         * @param {Float32Array<number>} vertex1 - The first vertex of the triangle.
         * @param {Float32Array<number>} vertex2 - The second vertex of the triangle.
         * @param {Float32Array<number>} vertex3 - The third vertex of the triangle.
         * @param {Float32Array<number>} vertex4 - The point to check.
         * @param {number} axis1 - The first axis index for the calculation.
         * @param {number} axis2 - The second axis index for the calculation.
         * @returns {number} Returns 1 if the point is inside the triangle, otherwise returns 0.
         */
        static POINT_IN_TRI(vertex1, vertex2, vertex3,
                            vertex4, axis1, axis2) {
            const diff0 = Math.fround(vertex2[axis1] - vertex1[axis1]);
            const diff1 = Math.fround(vertex2[axis2] - vertex1[axis2]);
            const diff2 = Math.fround(vertex3[axis1] - vertex2[axis1]);
            const diff3 = Math.fround(vertex3[axis2] - vertex2[axis2]);
            const diff4 = Math.fround(vertex1[axis1] - vertex3[axis1]);
            const diff5 = Math.fround(vertex1[axis2] - vertex3[axis2]);

            const point1 = Math.fround((diff1 * vertex4[axis1]) + (-diff0 * vertex4[axis2]) +
                ((-diff1 * vertex1[axis1]) - (-diff0 * vertex1[axis2])));
            const point2 = Math.fround((diff3 * vertex4[axis1]) + (-diff2 * vertex4[axis2]) +
                ((-diff3 * vertex2[axis1]) - (-diff2 * vertex2[axis2])));
            const point3 = Math.fround((diff5 * vertex4[axis1]) + (-diff4 * vertex4[axis2]) +
                ((-diff5 * vertex3[axis1]) - (-diff4 * vertex3[axis2])));

            return (point1 * point2) > 0.0 && (point1 * point3) > 0.0 ? 1 : 0;
        }

        /**
         * Checks for intersection between two coplanar triangles.
         *
         * @param {Float32Array<number>} vertex1 - The first vertex of the first triangle.
         * @param {Float32Array<number>} vertex2 - The second vertex of the first triangle.
         * @param {Float32Array<number>} vertex3 - The third vertex of the first triangle.
         * @param {Float32Array<number>} vertex4 - The first vertex of the second triangle.
         * @param {Float32Array<number>} vertex5 - The second vertex of the second triangle.
         * @param {Float32Array<number>} vertex6 - The third vertex of the second triangle.
         * @param {Float32Array<number>} vertex7 - A temporary vertex array used for calculations.
         * @returns {number} Returns 1 if the triangles intersect, otherwise returns 0.
         */
        static coplanar_tri_tri(vertex1, vertex2, vertex3,
                                vertex4, vertex5, vertex6, vertex7) {
            const vertex01 = [PolygonIntersection.FABS(vertex1[0]), PolygonIntersection.FABS(vertex1[1]),
                PolygonIntersection.FABS(vertex1[2])];
            let axis1;
            let axis2;
            if (vertex01[0] > vertex01[1]) {
                if (vertex01[0] > vertex01[2]) {
                    axis1 = 1;
                    axis2 = 2;
                } else {
                    axis1 = 0;
                    axis2 = 1;
                }
            } else if (vertex01[2] > vertex01[1]) {
                axis1 = 0;
                axis2 = 1;
            } else {
                axis1 = 0;
                axis2 = 2;
            }
            if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(vertex2, vertex3, vertex5, vertex6,
                vertex7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(vertex3, vertex4, vertex5, vertex6,
                vertex7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(vertex4, vertex2, vertex5, vertex6,
                vertex7, axis1, axis2) === 1) {
                return 1;
            } else if (PolygonIntersection.POINT_IN_TRI(vertex2, vertex5, vertex6, vertex7, axis1, axis2) === 1) {
                return 1;
            } else {
                return PolygonIntersection.POINT_IN_TRI(vertex5, vertex2, vertex3, vertex4, axis1, axis2) === 1 ? 1 : 0;
            }
        }

        /*      static old_tri_tri_intersect(inVertex1, inVertex2, inVertex3, inVertex4, inVertex5, inVertex6) {
                  const vertex0 = [0, 0, 0];
                  const vertex1 = [0, 0, 0];
                  const vertex2 = [0, 0, 0];
                  const vertex3 = [0, 0, 0];
                  const vertex4 = [0, 0, 0];
                  const pair1 = new dsector.FloatPair();
                  const pair2 = new dsector.FloatPair();
                  let xCo_ordVertex3;
                  let yCo_ordVertex3;
                  let zCo_ordVertex3;
                  let xyProduct1;
                  let xzProduct1;
                  let xyProduct2;
                  let xzProduct2;
                  let negDot;
                  let xc1;
                  let yc1;
                  let zc1;
                  let xc2;
                  let yc2;
                  let zc2;
                  let absY;
                  let absZ;
                  let absX;
                  PolygonIntersection.SUB(vertex0, inVertex2, inVertex1);
                  PolygonIntersection.SUB(vertex1, inVertex3, inVertex1);
                  PolygonIntersection.CROSS(vertex2, vertex0, vertex1);
                  let spacing = -PolygonIntersection.DOT(vertex2, inVertex1);
                  let xCo_ordVertex2 = Math.fround(PolygonIntersection.DOT(vertex2, inVertex4) + spacing);
                  let yCo_ordVertex2 = Math.fround(PolygonIntersection.DOT(vertex2, inVertex5) + spacing);
                  let zCo_ordVertex2 = Math.fround(PolygonIntersection.DOT(vertex2, inVertex6) + spacing);
                  if (PolygonIntersection.FABS(xCo_ordVertex2) < PolygonIntersection.EPSILON) {
                      xCo_ordVertex2 = 0.0;
                  }
                  if (PolygonIntersection.FABS(yCo_ordVertex2) < PolygonIntersection.EPSILON) {
                      yCo_ordVertex2 = 0.0;
                  }
                  if (PolygonIntersection.FABS(zCo_ordVertex2) < PolygonIntersection.EPSILON) {
                      zCo_ordVertex2 = 0.0;
                  }
                  xyProduct1 = Math.fround(xCo_ordVertex2 * yCo_ordVertex2);
                  xzProduct1 = Math.fround(xCo_ordVertex2 * zCo_ordVertex2);
                  if (xyProduct1 > 0.0 && xzProduct1 > 0.0) {
                      return 0;
                  } else {
                      PolygonIntersection.SUB(vertex0, inVertex5, inVertex4);
                      PolygonIntersection.SUB(vertex1, inVertex6, inVertex4);
                      PolygonIntersection.CROSS(vertex3, vertex0, vertex1);
                      negDot = -PolygonIntersection.DOT(vertex3, inVertex4);
                      xCo_ordVertex3 = Math.fround(PolygonIntersection.DOT(vertex3, inVertex1) + negDot);
                      yCo_ordVertex3 = Math.fround(PolygonIntersection.DOT(vertex3, inVertex2) + negDot);
                      zCo_ordVertex3 = Math.fround(PolygonIntersection.DOT(vertex3, inVertex3) + negDot);
                      if (PolygonIntersection.FABS(xCo_ordVertex3) < PolygonIntersection.EPSILON) {
                          xCo_ordVertex3 = 0.0;
                      }
                      if (PolygonIntersection.FABS(yCo_ordVertex3) < PolygonIntersection.EPSILON) {
                          yCo_ordVertex3 = 0.0;
                      }
                      if (PolygonIntersection.FABS(zCo_ordVertex3) < PolygonIntersection.EPSILON) {
                          zCo_ordVertex3 = 0.0;
                      }
                      xyProduct2 = Math.fround(xCo_ordVertex3 * yCo_ordVertex3);
                      xzProduct2 = Math.fround(xCo_ordVertex3 * zCo_ordVertex3);
                      if (xyProduct2 > 0.0 && xzProduct2 > 0.0) {
                          return 0;
                      } else {
                          PolygonIntersection.CROSS(vertex4, vertex2, vertex3);
                          absX = PolygonIntersection.FABS(vertex4[0]);
                          let constant = 0;
                          absY = PolygonIntersection.FABS(vertex4[1]);
                          absZ = PolygonIntersection.FABS(vertex4[2]);
                          if (absY > absX) {
                              absX = absY;
                              constant = 1;
                          }
                          if (absZ > absX) {
                              constant = 2;
                          }
                          xc1 = inVertex1[constant];
                          yc1 = inVertex2[constant];
                          zc1 = inVertex3[constant];
                          xc2 = inVertex4[constant];
                          yc2 = inVertex5[constant];
                          zc2 = inVertex6[constant];
                          if (!PolygonIntersection.COMPUTE_INTERVALS(xc1, yc1, zc1, xCo_ordVertex3, yCo_ordVertex3,
                              zCo_ordVertex3, xyProduct2, xzProduct2, pair1)) {
                              return PolygonIntersection.coplanar_tri_tri(vertex2, inVertex1, inVertex2, inVertex3,
                                  inVertex4, inVertex5, inVertex6);
                          } else if (!PolygonIntersection.COMPUTE_INTERVALS(xc2, yc2, zc2, xCo_ordVertex2,
                              yCo_ordVertex2, zCo_ordVertex2, xyProduct1, xzProduct1, pair2)) {
                              return PolygonIntersection.coplanar_tri_tri(vertex2, inVertex1, inVertex2, inVertex3,
                                  inVertex4, inVertex5, inVertex6);
                          } else {
                              PolygonIntersection.SORT(pair1);
                              PolygonIntersection.SORT(pair2);
                              return !(pair1.f2 < pair2.f1) && !(pair2.f2 < pair1.f1) ? 1 : 0;
                          }
                      }
                  }
              }
      */
        /**
         * Determines if two triangles intersect each other.
         *
         * @param {Float32Array<number>} inVertex1 - The first vertex of the first triangle.
         * @param {Float32Array<number>} inVertex2 - The second vertex of the first triangle.
         * @param {Float32Array<number>} inVertex3 - The third vertex of the first triangle.
         * @param {Float32Array<number>} inVertex4 - The first vertex of the second triangle.
         * @param {Float32Array<number>} inVertex5 - The second vertex of the second triangle.
         * @param {Float32Array<number>} inVertex6 - The third vertex of the second triangle.
         * @returns {number} Returns 1 if the triangles intersect, otherwise returns 0.
         */
        static tri_tri_intersect(inVertex1, inVertex2, inVertex3,
                                 inVertex4, inVertex5, inVertex6) {
            const vertex0 = new Float32Array(3);
            const vertex1 = new Float32Array(3);
            const vertex2 = new Float32Array(3);
            const vertex3 = new Float32Array(3);
            const vertex4 = new Float32Array(3);
            const pair1 = new dsector.FloatPair();
            const pair2 = new dsector.FloatPair();

            PolygonIntersection.SUB(vertex0, inVertex2, inVertex1);
            PolygonIntersection.SUB(vertex1, inVertex3, inVertex1);
            PolygonIntersection.CROSS(vertex2, vertex0, vertex1);
            let spacing = -PolygonIntersection.DOT(vertex2, inVertex1);

            const axisDot1 = PolygonIntersection.DOT(vertex2, inVertex4) + spacing;
            const axisDot2 = PolygonIntersection.DOT(vertex2, inVertex5) + spacing;
            const axisDot3 = PolygonIntersection.DOT(vertex2, inVertex6) + spacing;
            const xyProduct1 = axisDot1 * axisDot2;
            const xzProduct1 = axisDot1 * axisDot3;
            if (xyProduct1 > 0.0 && xzProduct1 > 0.0) {
                return 0;
            }

            PolygonIntersection.SUB(vertex0, inVertex5, inVertex4);
            PolygonIntersection.SUB(vertex1, inVertex6, inVertex4);
            PolygonIntersection.CROSS(vertex3, vertex0, vertex1);
            const negDot = -PolygonIntersection.DOT(vertex3, inVertex4);

            const xCo_ordVertex3 = PolygonIntersection.DOT(vertex3, inVertex1) + negDot;
            const yCo_ordVertex3 = PolygonIntersection.DOT(vertex3, inVertex2) + negDot;
            const zCo_ordVertex3 = PolygonIntersection.DOT(vertex3, inVertex3) + negDot;

            const xyProduct2 = xCo_ordVertex3 * yCo_ordVertex3;
            const xzProduct2 = xCo_ordVertex3 * zCo_ordVertex3;
            if (xyProduct2 > 0.0 && xzProduct2 > 0.0) {
                return 0;
            }

            PolygonIntersection.CROSS(vertex4, vertex2, vertex3);
            let abs0 = Math.abs(vertex4[0]);
            let constant = 0;
            let abs1 = Math.abs(vertex4[1]);
            let abs2 = Math.abs(vertex4[2]);
            if (abs1 > abs0) {
                abs0 = abs1;
                constant = 1;
            }
            if (abs2 > abs0) {
                constant = 2;
            }

            const constant1 = inVertex1[constant];
            const constant2 = inVertex2[constant];
            const constant3 = inVertex3[constant];
            const constant4 = inVertex4[constant];
            const constant5 = inVertex5[constant];
            const constant6 = inVertex6[constant];

            const computeIntervals1 = PolygonIntersection.COMPUTE_INTERVALS(constant1, constant2, constant3, xCo_ordVertex3,
                yCo_ordVertex3, zCo_ordVertex3, xyProduct2, xzProduct2, pair1);
            const computeIntervals2 = PolygonIntersection.COMPUTE_INTERVALS(constant4, constant5, constant6, axisDot1,
                axisDot2, axisDot3, xyProduct1, xzProduct1, pair2);

            if (!computeIntervals1 || !computeIntervals2) {
                return PolygonIntersection.coplanar_tri_tri(vertex2, inVertex1, inVertex2, inVertex3, inVertex4,
                    inVertex5, inVertex6);
            }

            PolygonIntersection.SORT(pair1);
            PolygonIntersection.SORT(pair2);

            return !(pair1.f2 < pair2.f1) && !(pair2.f2 < pair1.f1) ? 1 : 0;
        }
    }

    PolygonIntersection.EPSILON = 1.0E-6;
    dsector.PolygonIntersection = PolygonIntersection;
    PolygonIntersection["__class"] = "dsector.PolygonIntersection";
})(dsector || (dsector = {}));
