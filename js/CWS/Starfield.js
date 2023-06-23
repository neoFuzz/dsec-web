/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class Starfield {
        constructor(starCount) {
            if (this.star === undefined) {
                this.star = null;
            }
            if (this.twinkle === undefined) {
                this.twinkle = null;
            }
            if (this.numberOfStars === undefined) {
                this.numberOfStars = 0;
            }
            const var2 = ((Math.random() * 3.0) | 0) + 1;
            let var3 = 0.0;
            if (var2 === 2) {
                var3 = 0.3 + Math.random() * 0.6;
            }
            this.numberOfStars = starCount;
            this.star = (s => { let a = []; while (s-- > 0)
                a.push(null); return a; })(starCount);
            this.twinkle = (s => { let a = []; while (s-- > 0)
                a.push(false); return a; })(starCount);
            for (let var5 = 0; var5 < (starCount / 50 | 0); ++var5) {
                for (let var9 = 0; var9 < 50; ++var9) {
                    const var10 = var5 * 50 + var9;
                    const var11 = new dsector.VectorInR3(1.0E21, 0.0, 0.0);
                    let var6;
                    let var7;
                    let var8;
                    switch (var2) {
                        case 1:
                            var6 = Math.fround(Math.random() * 2.0 * 3.1415927);
                            var7 = Math.fround(Math.random() * 2.0 * 3.1415927);
                            var8 = Math.fround(Math.random() * 2.0 * 3.1415927);
                            var11.rotateVectorFromOriginAboutAxis$int$float(1, var7);
                            var11.rotateVectorFromOriginAboutAxis$int$float(0, var6);
                            var11.rotateVectorFromOriginAboutAxis$int$float(2, var8);
                            break;
                        case 2:
                            var6 = Math.fround(Math.random() * 3.1415927);
                            var7 = Math.fround(Math.random() * 3.1415927);
                            var8 = Math.fround(Math.random() * 3.1415927);
                            var11.rotateVectorFromOriginAboutAxis$int$float(1, var7);
                            var11.rotateVectorFromOriginAboutAxis$int$float(0, var6);
                            var11.rotateVectorFromOriginAboutAxis$int$float(2, var8);
                            break;
                        case 3:
                            if (Math.random() > var3) {
                                var6 = Math.fround(Math.random() * 2.0 * 3.1415927);
                                var7 = Math.fround(Math.random() * 2.0 * 3.1415927);
                                var8 = Math.fround(Math.random() * 2.0 * 3.1415927);
                                var11.rotateVectorFromOriginAboutAxis$int$float(1, var7);
                                var11.rotateVectorFromOriginAboutAxis$int$float(0, var6);
                                var11.rotateVectorFromOriginAboutAxis$int$float(2, var8);
                            } else {
                                var11.rotateVectorFromOriginAboutAxis$int$float$float(0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
                                var11.rotateVectorFromOriginAboutAxis$int$float$float(1, Math.random(), Math.random());
                                var11.rotateVectorFromOriginAboutAxis$int$float$float(2, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
                            }
                    }
                    this.star[var10] = var11;
                    this.twinkle[var10] = Math.random() < 0.3;
                }
            }
        }
    }
    dsector.Starfield = Starfield;
    Starfield["__class"] = "dsector.Starfield";
})(dsector || (dsector = {}));
