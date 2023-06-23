/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class PolygonIntersection {
        static FABS(abs) {
            return Math.abs(abs);
        }
        static CROSS(target, set1, set2) {
            target[0] = Math.fround((set1[1] * set2[2]) - (set1[2] * set2[1]));
            target[1] = Math.fround((set1[2] * set2[0]) - (set1[0] * set2[2]));
            target[2] = Math.fround((set1[0] * set2[1]) - (set1[1] * set2[0]));
        }
        static DOT(set1, set2) {
            return Math.fround(((set1[0] * set2[0]) +(set1[1] * set2[1])) + (set1[2] * set2[2]));
        }
        static SUB(target, set1, set2) {
            target[0] = Math.fround(set1[0] - set2[0]);
            target[1] = Math.fround(set1[1] - set2[1]);
            target[2] = Math.fround(set1[2] - set2[2]);
        }
        static ADD(target, set1, set2) {
            target[0] = Math.fround(set1[0] + set2[0]);
            target[1] = Math.fround(set1[1] + set2[1]);
            target[2] = Math.fround(set1[2] + set2[2]);
        }
        static MULT(target, y, z) {
            target[0] = Math.fround(z * y[0]);
            target[1] = Math.fround(z * y[1]);
            target[2] = Math.fround(z * y[2]);
        }
        static SET(target, set) {
            target[0] = set[0];
            target[1] = set[1];
            target[2] = set[2];
        }
        static SORT(floatPair) {
            if (floatPair.f1 > floatPair.f2) {
                const fx = floatPair.f1;
                floatPair.f1 = floatPair.f2;
                floatPair.f2 = fx;
            }
        }
        static ISECT(x1, y1, z1, x2, y2, z2, floatPair) {
            floatPair.set(Math.fround(x1 + (y1 - x1) * x2 / (x2 - y2)),
                Math.fround(x1 + (z1 - x1) * x2 / (x2 - z2)));
        }
        static COMPUTE_INTERVALS(var0, var1, var2, var3, var4, var5, var6, var7, floatPair) {
            if (var6 > 0.0) {
                PolygonIntersection.ISECT(var2, var0, var1, var5, var3, var4, floatPair);
                return true;
            }
            else if (var7 > 0.0) {
                PolygonIntersection.ISECT(var1, var0, var2, var4, var3, var5, floatPair);
                return true;
            }
            else if (!(Math.fround(var4 * var5) > 0.0) && var3 === 0.0) {
                if (var4 !== 0.0) {
                    PolygonIntersection.ISECT(var1, var0, var2, var4, var3, var5, floatPair);
                    return true;
                }
                else if (var5 !== 0.0) {
                    PolygonIntersection.ISECT(var2, var0, var1, var5, var3, var4, floatPair);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                PolygonIntersection.ISECT(var0, var1, var2, var3, var4, var5, floatPair);
                return true;
            }
        }
        static EDGE_EDGE_TEST(var0, var1, var2, var3, var4, var5, var6) {
            const var10 = Math.fround(var1[var3] - var2[var3]);
            const var11 = Math.fround(var1[var4] - var2[var4]);
            const var12 = Math.fround(var0[var3] - var1[var3]);
            const var13 = Math.fround(var0[var4] - var1[var4]);
            const var9 = Math.fround((var6 * var10) - (var5 * var11));
            const var8 = Math.fround((var11 * var12) - (var10 * var13));
            if (var9 > 0.0 && var8 >= 0.0 && var8 <= var9 || var9 < 0.0 && var8 <= 0.0 && var8 >= var9) {
                const var7 = Math.fround((var5 * var13) - (var6 * var12));
                if (var9 > 0.0) {
                    if (var7 >= 0.0 && var7 <= var9) {
                        return 1;
                    }
                }
                else if (var7 <= 0.0 && var7 >= var9) {
                    return 1;
                }
            }
            return 0;
        }
        static EDGE_AGAINST_TRI_EDGES(var0, var1, var2, var3, var4, var5, var6) {
            const var7 = Math.fround(var1[var5] - var0[var5]);
            const var8 = Math.fround(var1[var6] - var0[var6]);
            if (PolygonIntersection.EDGE_EDGE_TEST(var0, var2, var3, var5, var6, var7, var8) === 1) {
                return 1;
            }
            else if (PolygonIntersection.EDGE_EDGE_TEST(var0, var3, var4, var5, var6, var7, var8) === 1) {
                return 1;
            }
            else {
                return PolygonIntersection.EDGE_EDGE_TEST(var0, var4, var2, var5, var6, var7, var8) === 1 ? 1 : 0;
            }
        }
        static POINT_IN_TRI(var0, var1, var2, var3, var4, var5) {
            let var6 = Math.fround(var2[var5] - var1[var5]);
            let var7 = -(Math.fround(var2[var4] - var1[var4]));
            let var8 = Math.fround((-var6 * var1[var4]) - (var7 * var1[var5]));
            const var9 = Math.fround((var6 * var0[var4]) +(var7 * var0[var5])+ var8);
            var6 = Math.fround(var3[var5] - var2[var5]);
            var7 = -(Math.fround(var3[var4] - var2[var4]));
            var8 = Math.fround((-var6 * var2[var4]) - (var7 * var2[var5]));
            const var10 = Math.fround(((var6 * var0[var4]) + (var7 * var0[var5])) + var8);
            var6 = Math.fround(var1[var5] - var3[var5]);
            var7 = -(Math.fround(var1[var4] - var3[var4]));
            var8 = Math.fround((-var6 * var3[var4]) - (var7 * var3[var5]));
            const var11 = Math.fround(((var6 * var0[var4]) + (var7 * var0[var5])) + var8);
            return Math.fround(var9 * var10) > 0.0 && (var9 * var11) > 0.0 ? 1 : 0;
        }
        static coplanar_tri_tri(var0, var1, var2, var3, var4, var5, var6) {
            const var7 = [PolygonIntersection.FABS(var0[0]), PolygonIntersection.FABS(var0[1]), PolygonIntersection.FABS(var0[2])];
            let var8;
            let var9;
            if (var7[0] > var7[1]) {
                if (var7[0] > var7[2]) {
                    var8 = 1;
                    var9 = 2;
                }
                else {
                    var8 = 0;
                    var9 = 1;
                }
            }
            else if (var7[2] > var7[1]) {
                var8 = 0;
                var9 = 1;
            }
            else {
                var8 = 0;
                var9 = 2;
            }
            if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(var1, var2, var4, var5, var6, var8, var9) === 1) {
                return 1;
            }
            else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(var2, var3, var4, var5, var6, var8, var9) === 1) {
                return 1;
            }
            else if (PolygonIntersection.EDGE_AGAINST_TRI_EDGES(var3, var1, var4, var5, var6, var8, var9) === 1) {
                return 1;
            }
            else if (PolygonIntersection.POINT_IN_TRI(var1, var4, var5, var6, var8, var9) === 1) {
                return 1;
            }
            else {
                return PolygonIntersection.POINT_IN_TRI(var4, var1, var2, var3, var8, var9) === 1 ? 1 : 0;
            }
        }
        static tri_tri_intersect(x1, y1, z1, x2, y2, z2) {
            const var6 = [0, 0, 0];
            const var7 = [0, 0, 0];
            const var8 = [0, 0, 0];
            const var9 = [0, 0, 0];
            let spacing;
            let var11;
            let var12;
            let var13;
            let var14;
            let var15;
            let var16;
            let var17;
            const var18 = [0, 0, 0];
            const pair1 = new dsector.FloatPair();
            const pair2 = new dsector.FloatPair();
            let var21;
            let var22;
            let var23;
            let var24;
            let var26;
            let var27;
            let var28;
            let var29;
            let var30;
            let var31;
            let var32;
            let var33;
            let var34;
            PolygonIntersection.SUB(var6, y1, x1);
            PolygonIntersection.SUB(var7, z1, x1);
            PolygonIntersection.CROSS(var8, var6, var7);
            spacing = -PolygonIntersection.DOT(var8, x1);
            var12 = Math.fround(PolygonIntersection.DOT(var8, x2) + spacing);
            var13 = Math.fround(PolygonIntersection.DOT(var8, y2) + spacing);
            var14 = Math.fround(PolygonIntersection.DOT(var8, z2) + spacing);
            if (PolygonIntersection.FABS(var12) < PolygonIntersection.EPSILON) {
                var12 = 0.0;
            }
            if (PolygonIntersection.FABS(var13) < PolygonIntersection.EPSILON) {
                var13 = 0.0;
            }
            if (PolygonIntersection.FABS(var14) < PolygonIntersection.EPSILON) {
                var14 = 0.0;
            }
            var21 = Math.fround(var12 * var13);
            var22 = Math.fround(var12 * var14);
            if (var21 > 0.0 && var22 > 0.0) {
                return 0;
            }
            else {
                PolygonIntersection.SUB(var6, y2, x2);
                PolygonIntersection.SUB(var7, z2, x2);
                PolygonIntersection.CROSS(var9, var6, var7);
                var11 = -PolygonIntersection.DOT(var9, x2);
                var15 = Math.fround(PolygonIntersection.DOT(var9, x1) + var11);
                var16 = Math.fround(PolygonIntersection.DOT(var9, y1) + var11);
                var17 = Math.fround(PolygonIntersection.DOT(var9, z1) + var11);
                if (PolygonIntersection.FABS(var15) < PolygonIntersection.EPSILON) {
                    var15 = 0.0;
                }
                if (PolygonIntersection.FABS(var16) < PolygonIntersection.EPSILON) {
                    var16 = 0.0;
                }
                if (PolygonIntersection.FABS(var17) < PolygonIntersection.EPSILON) {
                    var17 = 0.0;
                }
                var23 = Math.fround(var15 * var16);
                var24 = Math.fround(var15 * var17);
                if (var23 > 0.0 && var24 > 0.0) {
                    return 0;
                }
                else {
                    PolygonIntersection.CROSS(var18, var8, var9);
                    var34 = PolygonIntersection.FABS(var18[0]);
                    let var35 = 0;
                    var32 = PolygonIntersection.FABS(var18[1]);
                    var33 = PolygonIntersection.FABS(var18[2]);
                    if (var32 > var34) {
                        var34 = var32;
                        var35 = 1;
                    }
                    if (var33 > var34) {
                        var35 = 2;
                    }
                    var26 = x1[var35];
                    var27 = y1[var35];
                    var28 = z1[var35];
                    var29 = x2[var35];
                    var30 = y2[var35];
                    var31 = z2[var35];
                    if (!PolygonIntersection.COMPUTE_INTERVALS(var26, var27, var28, var15, var16, var17, var23, var24, pair1)) {
                        return PolygonIntersection.coplanar_tri_tri(var8, x1, y1, z1, x2, y2, z2);
                    }
                    else if (!PolygonIntersection.COMPUTE_INTERVALS(var29, var30, var31, var12, var13, var14, var21, var22, pair2)) {
                        return PolygonIntersection.coplanar_tri_tri(var8, x1, y1, z1, x2, y2, z2);
                    }
                    else {
                        PolygonIntersection.SORT(pair1);
                        PolygonIntersection.SORT(pair2);
                        return !(pair1.f2 < pair2.f1) && !(pair2.f2 < pair1.f1) ? 1 : 0;
                    }
                }
            }
        }
    }
    PolygonIntersection.EPSILON = 1.0E-6;
    dsector.PolygonIntersection = PolygonIntersection;
    PolygonIntersection["__class"] = "dsector.PolygonIntersection";
})(dsector || (dsector = {}));
