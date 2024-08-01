(function (dsector) {
    /**
     * A class for managing the Starfield effect in the renderer.
     *
     * @property {Array} star - The star array.
     * @property {Array} twinkle - The twinkle array.
     * @property {number} numberOfStars - The number of stars in the starfield.
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
    class Starfield {
        /**
         * Constructs a new instance of the Starfield class with the specified number of stars.
         *
         * @param {number} starCount - The number of stars in the starfield.
         */
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
            this.star = Array(starCount).fill(null);
            this.twinkle = Array(starCount).fill(false);
            for (let i = 0; i < (starCount / 50 | 0); ++i) {
                for (let var9 = 0; var9 < 50; ++var9) {
                    const var10 = i * 50 + var9;
                    const var11 = new dsector.VectorInR3(1.0E21, 0.0, 0.0);
                    let var6;
                    let var7;
                    let var8;
                    switch (var2) {
                        case 1:
                            var6 = Math.fround(Math.random() * 2.0 * Math.PI);
                            var7 = Math.fround(Math.random() * 2.0 * Math.PI);
                            var8 = Math.fround(Math.random() * 2.0 * Math.PI);
                            var11.rotateAroundAxis(1, var7);
                            var11.rotateAroundAxis(0, var6);
                            var11.rotateAroundAxis(2, var8);
                            break;
                        case 2:
                            var6 = Math.fround(Math.random() * Math.PI);
                            var7 = Math.fround(Math.random() * Math.PI);
                            var8 = Math.fround(Math.random() * Math.PI);
                            var11.rotateAroundAxis(1, var7);
                            var11.rotateAroundAxis(0, var6);
                            var11.rotateAroundAxis(2, var8);
                            break;
                        case 3:
                            if (Math.random() > var3) {
                                var6 = Math.fround(Math.random() * 2.0 * Math.PI);
                                var7 = Math.fround(Math.random() * 2.0 * Math.PI);
                                var8 = Math.fround(Math.random() * 2.0 * Math.PI);
                                var11.rotateAroundAxis(1, var7);
                                var11.rotateAroundAxis(0, var6);
                                var11.rotateAroundAxis(2, var8);
                            } else {
                                var11.rotateAroundAxisWithCosSin(
                                    0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
                                var11.rotateAroundAxisWithCosSin(
                                    1, Math.random(), Math.random());
                                var11.rotateAroundAxisWithCosSin(
                                    2, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
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
})(dsector);