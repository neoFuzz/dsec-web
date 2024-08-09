use wasm_bindgen::prelude::*;

const EPSILON: f32 = 1.0E-6;

#[wasm_bindgen]
pub struct FloatPair {
    f1: f32,
    f2: f32,
}

#[wasm_bindgen]
impl FloatPair {
    #[wasm_bindgen(constructor)]
    pub fn new() -> FloatPair {
        FloatPair { f1: 0.0, f2: 0.0 }
    }

    pub fn set(&mut self, f1: f32, f2: f32) {
        self.f1 = f1;
        self.f2 = f2;
    }
}

#[derive(Debug, Clone, Copy)]
struct Vector3 {
    x: f32,
    y: f32,
    z: f32,
}

impl Vector3 {
    fn sub(&self, other: &Self) -> Self {
        Self {
            x: self.x - other.x,
            y: self.y - other.y,
            z: self.z - other.z,
        }
    }

    fn cross(&self, other: &Self) -> Self {
        Self {
            x: self.y * other.z - self.z * other.y,
            y: self.z * other.x - self.x * other.z,
            z: self.x * other.y - self.y * other.x,
        }
    }

    fn dot(&self, other: &Self) -> f32 {
        self.x * other.x + self.y * other.y + self.z * other.z
    }
}

#[wasm_bindgen]
pub struct PolygonIntersection;

#[wasm_bindgen]
impl PolygonIntersection {
    #[wasm_bindgen(js_name = tri_tri_intersect)]
    pub fn tri_tri_intersect(
        iv1: &[f32],
        iv2: &[f32],
        iv3: &[f32],
        iv4: &[f32],
        iv5: &[f32],
        iv6: &[f32],
    ) -> bool {
        let mut v0 = [0.0; 3];
        let mut v1 = [0.0; 3];
        let mut v2 = [0.0; 3];
        let mut v3 = [0.0; 3];
        let mut v4 = [0.0; 3];
        let mut p1 = FloatPair::new();
        let mut p2 = FloatPair::new();

        Self::sub(&mut v0, iv2, iv1);
        Self::sub(&mut v1, iv3, iv1);
        Self::cross(&mut v2, &v0, &v1);
        let spacing = -Self::dot(&v2, iv1);

        let axis_dot1 = Self::dot(&v2, iv4) + spacing;
        let axis_dot2 = Self::dot(&v2, iv5) + spacing;
        let axis_dot3 = Self::dot(&v2, iv6) + spacing;
        let xy_product1 = axis_dot1 * axis_dot2;
        let xz_product1 = axis_dot1 * axis_dot3;
        if xy_product1 > 0.0 && xz_product1 > 0.0 {
            return false;
        }

        Self::sub(&mut v0, iv5, iv4);
        Self::sub(&mut v1, iv6, iv4);
        Self::cross(&mut v3, &v0, &v1);
        let neg_dot = -Self::dot(&v3, iv4);

        let x_co_ord_vertex3 = Self::dot(&v3, iv1) + neg_dot;
        let y_co_ord_vertex3 = Self::dot(&v3, iv2) + neg_dot;
        let z_co_ord_vertex3 = Self::dot(&v3, iv3) + neg_dot;

        let xy_product2 = x_co_ord_vertex3 * y_co_ord_vertex3;
        let xz_product2 = x_co_ord_vertex3 * z_co_ord_vertex3;
        if xy_product2 > 0.0 && xz_product2 > 0.0 {
            return false;
        }

        Self::cross(&mut v4, &v2, &v3);
        let mut abs0 = v4[0].abs();
        let mut constant = 0;
        let abs1 = v4[1].abs();
        let abs2 = v4[2].abs();
        if abs1 > abs0 {
            abs0 = abs1;
            constant = 1;
        }
        if abs2 > abs0 {
            constant = 2;
        }

        let c1 = iv1[constant];
        let c2 = iv2[constant];
        let c3 = iv3[constant];
        let c4 = iv4[constant];
        let c5 = iv5[constant];
        let c6 = iv6[constant];

        let compute_intervals1 = Self::compute_intervals(
            c1,
            c2,
            c3,
            x_co_ord_vertex3,
            y_co_ord_vertex3,
            z_co_ord_vertex3,
            xy_product2,
            xz_product2,
            &mut p1,
        );
        let compute_intervals2 = Self::compute_intervals(
            c4,
            c5,
            c6,
            axis_dot1,
            axis_dot2,
            axis_dot3,
            xy_product1,
            xz_product1,
            &mut p2,
        );

        if !compute_intervals1 || !compute_intervals2 {
            return Self::coplanar_tri_tri(&v2, iv1, iv2, iv3, iv4, iv5, iv6);
        }

        Self::sort(&mut p1);
        Self::sort(&mut p2);

        !(p1.f2 < p2.f1) && !(p2.f2 < p1.f1)
    }

    // Helper methods would be implemented here
    fn fabs(x: f32) -> f32 {
        x.abs()
    }

     fn sub(target: &mut [f32], v1: &[f32], v2: &[f32]) {
        target[0] = v1[0] - v2[0];
        target[1] = v1[1] - v2[1];
        target[2] = v1[2] - v2[2];
    }

    fn cross(target: &mut [f32], v1: &[f32], v2: &[f32]) {
        target[0] = (v1[1] * v2[2]) - (v1[2] * v2[1]);
        target[1] = (v1[2] * v2[0]) - (v1[0] * v2[2]);
        target[2] = (v1[0] * v2[1]) - (v1[1] * v2[0]);
    }

     fn dot(v1: &[f32], v2: &[f32]) -> f32 {
        (v1[0] * v2[0]) + (v1[1] * v2[1]) + (v1[2] * v2[2])
    }

    fn add(target: &mut [f32; 3], v1: &[f32; 3], v2: &[f32; 3]) {
        target[0] = v1[0] + v2[0];
        target[1] = v1[1] + v2[1];
        target[2] = v1[2] + v2[2];
    }

    fn mult(target: &mut [f32; 3], v: &[f32; 3], scalar: f32) {
        target[0] = scalar * v[0];
        target[1] = scalar * v[1];
        target[2] = scalar * v[2];
    }

    fn set(target: &mut [f32; 3], v: &[f32; 3]) {
        target[0] = v[0];
        target[1] = v[1];
        target[2] = v[2];
    }
    
    fn sort(fp: &mut FloatPair) {
        if fp.f1 > fp.f2 {
            let fx = fp.f1;
            fp.f1 = fp.f2;
            fp.f2 = fx;
        }
    }

     fn isect(a: f32, b: f32, c: f32, d: f32, e: f32, f: f32, float_pair: &mut FloatPair) {
        float_pair.set(
            a + (b - a) * d / (d - e),
            a + (c - a) * d / (d - f)
        );
    }

    fn compute_intervals(
        axis1: f32,
        axis2: f32,
        axis3: f32,
        axis4: f32,
        axis5: f32,
        axis6: f32,
        product1: f32,
        product2: f32,
        fp: &mut FloatPair,
    ) -> bool {
        if product1 > 0.0 {
            Self::isect(axis3, axis1, axis2, axis6, axis4, axis5, fp);
            true
        } else if product2 > 0.0 {
            Self::isect(axis2, axis1, axis3, axis5, axis4, axis6, fp);
            true
        } else if !(axis5 * axis6 > 0.0) && axis4 == 0.0 {
            if axis5 != 0.0 {
                Self::isect(axis2, axis1, axis3, axis5, axis4, axis6, fp);
                true
            } else if axis6 != 0.0 {
                Self::isect(axis3, axis1, axis2, axis6, axis4, axis5, fp);
                true
            } else {
                false
            }
        } else {
            Self::isect(axis1, axis2, axis3, axis4, axis5, axis6, fp);
            true
        }
    }
    
    fn edge_edge_test(
        v1: &[f32], v2: &[f32], v3: &[f32],
        axis1: usize, axis2: usize, axis3: f32, axis4: f32
    ) -> bool {
        let diff1 = v2[axis1] - v3[axis1];
        let diff2 = v2[axis2] - v3[axis2];
        let diff3 = v1[axis1] - v2[axis1];
        let diff4 = v1[axis2] - v2[axis2];
        let determinant1 = (axis4 * diff1) - (axis3 * diff2);
        let determinant2 = (diff2 * diff3) - (diff1 * diff4);

        if (determinant1 > 0.0 && determinant2 >= 0.0 && determinant2 <= determinant1) ||
           (determinant1 < 0.0 && determinant2 <= 0.0 && determinant2 >= determinant1) {
            let axis_diff = (axis3 * diff4) - (axis4 * diff3);
            if determinant1 > 0.0 {
                axis_diff >= 0.0 && axis_diff <= determinant1
            } else {
                axis_diff <= 0.0 && axis_diff >= determinant1
            }
        } else {
            false
        }
    }

    fn edge_against_tri_edges(
        v0: &[f32], v1: &[f32], v2: &[f32], v3: &[f32], v4: &[f32],
        axis1: usize, axis2: usize
    ) -> bool {
        let diff1 = v1[axis1] - v0[axis1];
        let diff2 = v1[axis2] - v0[axis2];
        Self::edge_edge_test(v0, v2, v3, axis1, axis2, diff1, diff2) ||
        Self::edge_edge_test(v0, v3, v4, axis1, axis2, diff1, diff2) ||
        Self::edge_edge_test(v0, v4, v2, axis1, axis2, diff1, diff2)
    }

    fn point_in_tri(
        v1: &[f32], v2: &[f32], v3: &[f32],
        v4: &[f32], axis1: usize, axis2: usize
    ) -> bool {
        let diff0 = v2[axis1] - v1[axis1];
        let diff1 = v2[axis2] - v1[axis2];
        let diff2 = v3[axis1] - v2[axis1];
        let diff3 = v3[axis2] - v2[axis2];
        let diff4 = v1[axis1] - v3[axis1];
        let diff5 = v1[axis2] - v3[axis2];

        let point1 = (diff1 * v4[axis1]) + (-diff0 * v4[axis2]) +
            ((-diff1 * v1[axis1]) - (-diff0 * v1[axis2]));
        let point2 = (diff3 * v4[axis1]) + (-diff2 * v4[axis2]) +
            ((-diff3 * v2[axis1]) - (-diff2 * v2[axis2]));
        let point3 = (diff5 * v4[axis1]) + (-diff4 * v4[axis2]) +
            ((-diff5 * v3[axis1]) - (-diff4 * v3[axis2]));

        (point1 * point2) > 0.0 && (point1 * point3) > 0.0
    }

    fn coplanar_tri_tri(
        v1: &[f32], v2: &[f32], v3: &[f32],
        v4: &[f32], v5: &[f32], v6: &[f32], v7: &[f32]
    ) -> bool {
        let nv = [Self::fabs(v1[0]), Self::fabs(v1[1]), Self::fabs(v1[2])];
        let (axis1, axis2) = if nv[0] > nv[1] {
            if nv[0] > nv[2] {
                (1, 2)
            } else {
                (0, 1)
            }
        } else if nv[2] > nv[1] {
            (0, 1)
        } else {
            (0, 2)
        };

        Self::edge_against_tri_edges(v2, v3, v5, v6, v7, axis1, axis2) ||
        Self::edge_against_tri_edges(v3, v4, v5, v6, v7, axis1, axis2) ||
        Self::edge_against_tri_edges(v4, v2, v5, v6, v7, axis1, axis2) ||
        Self::point_in_tri(v2, v5, v6, v7, axis1, axis2) ||
        Self::point_in_tri(v5, v2, v3, v4, axis1, axis2)
    }
}