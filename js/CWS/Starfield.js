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
            const rand = ((Math.random() * 3.0) | 0) + 1;
            let r2 = 0.0;
            if (rand === 2) {
                r2 = 0.3 + Math.random() * 0.6;
            }
            this.numberOfStars = starCount;
            this.star = Array(starCount).fill(null);
            this.twinkle = Array(starCount).fill(false);
            for (let i = 0; i < (starCount / 50 | 0); ++i) {
                for (let j = 0; j < 50; ++j) {
                    const selected = i * 50 + j;
                    const v3 = new dsector.VectorInR3(1.0E21, 0.0, 0.0);
                    let a1;
                    let a2;
                    let a3;
                    switch (rand) {
                        case 1:
                            a1 = Math.fround(Math.random() * 2.0 * Math.PI);
                            a2 = Math.fround(Math.random() * 2.0 * Math.PI);
                            a3 = Math.fround(Math.random() * 2.0 * Math.PI);
                            v3.rotateAroundAxis(1, a2);
                            v3.rotateAroundAxis(0, a1);
                            v3.rotateAroundAxis(2, a3);
                            break;
                        case 2:
                            a1 = Math.fround(Math.random() * Math.PI);
                            a2 = Math.fround(Math.random() * Math.PI);
                            a3 = Math.fround(Math.random() * Math.PI);
                            v3.rotateAroundAxis(1, a2);
                            v3.rotateAroundAxis(0, a1);
                            v3.rotateAroundAxis(2, a3);
                            break;
                        case 3:
                            if (Math.random() > r2) {
                                a1 = Math.fround(Math.random() * 2.0 * Math.PI);
                                a2 = Math.fround(Math.random() * 2.0 * Math.PI);
                                a3 = Math.fround(Math.random() * 2.0 * Math.PI);
                                v3.rotateAroundAxis(1, a2);
                                v3.rotateAroundAxis(0, a1);
                                v3.rotateAroundAxis(2, a3);
                            } else {
                                v3.rotateAroundAxisWithCosSin(
                                    0, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
                                v3.rotateAroundAxisWithCosSin(
                                    1, Math.random(), Math.random());
                                v3.rotateAroundAxisWithCosSin(
                                    2, Math.random() * 2.0 - 1.0, Math.random() * 2.0 - 1.0);
                            }
                    }
                    this.star[selected] = v3;
                    this.twinkle[selected] = Math.random() < 0.3;
                }
            }
        }

        /**
         * Returns the number of stars in the star field.
         *
         * @returns {number} The number of stars in the star field.
         */
        getStarsCount() {
            return this.numberOfStars;
        }
    }

    dsector.Starfield = Starfield;
    Starfield["__class"] = "dsector.Starfield";
})(dsector);