(function (dsector) {
    /**
     * A class to handle fading lights in the scene.
     *
     * @example
     * const fadingLight = new DSecFadingLight(0, 0, 0, 0, 1000);
     *
     * @property {number} initialBrightness The initial brightness of the light.
     * @property {number} x The x-coordinate of the light.
     * @property {number} y The y-coordinate of the light.
     * @property {number} z The z-coordinate of the light.
     * @property {number} startTime The start time of the light in milliseconds.
     * @property {number} endTime The end time of the light in milliseconds.
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
    class DSecFadingLight {
        /**
         * Constructor for the DSecFadingLight class.
         *
         * @param {number} initialBrightness  The initial brightness of the light.
         * @param {number} x The x-coordinate of the light.
         * @param {number} y The y-coordinate of the light.
         * @param {number} z The z-coordinate of the light.
         * @param {number} end The end time of the light in milliseconds.
         */
        constructor(initialBrightness = 0, x = 0, y = 0, z = 0, end = 0) {
            this.initialBrightness = initialBrightness;
            this.x = x;
            this.y = y;
            this.z = z;
            this.startTime = CWSYSTEM.Environment.currentTime();
            this.endTime = this.startTime + Math.floor(end);
        }

        /**
         * Add a new fading light to the scene.
         *
         * @param {number} initBright The initial brightness of the light.
         * @param {number} x The x-coordinate of the light.
         * @param {number} y The y-coordinate of the light.
         * @param {number} z The z-coordinate of the light.
         * @param {number} end The end time of the light in milliseconds.
         * @static
         */
        static add(initBright, x, y, z, end) {
            if (DSecFadingLight.fadingLightsInScene == null) {
                DSecFadingLight.fadingLightsInScene = ([]);
            }
            const fadingLight = new DSecFadingLight(initBright, x, y, z, end);
            DSecFadingLight.fadingLightsInScene.push(fadingLight);
        }

        /**
         * Add the fading lights in the scene to the current scene.
         *
         * @param {dsector.Scene} scene The scene to add the lights to.
         * @static
         */
        static addLightsToScene(scene) {
            if (!DSecFadingLight.fadingLightsInScene || DSecFadingLight.fadingLightsInScene.length === 0) {
                return;
            }

            const currentTime = CWSYSTEM.Environment.currentTime();
            const activeLights = [];

            for (let i = 0; i < DSecFadingLight.fadingLightsInScene.length; i++) {
                const fadingLight = DSecFadingLight.fadingLightsInScene[i];

                if (currentTime <= fadingLight.endTime) {
                    const elapsedTime = currentTime - fadingLight.startTime;
                    const totalDuration = fadingLight.endTime - fadingLight.startTime;
                    const remainingRatio = 1 - (elapsedTime / totalDuration);
                    const brightness = remainingRatio * fadingLight.initialBrightness;

                    scene.addStaticLight(fadingLight.x, fadingLight.y, fadingLight.z, brightness, brightness, brightness);
                    activeLights.push(fadingLight);
                }
            }

            // Update the fadingLightsInScene array with only the active lights
            DSecFadingLight.fadingLightsInScene = activeLights;
        }
    }

    /**
     * The count of fading lights in the scene.
     *
     * @static
     * @type {number}
     */
    DSecFadingLight.fadingLightsInScene = null;
    dsector.DSecFadingLight = DSecFadingLight;
    DSecFadingLight["__class"] = "dsector.DSecFadingLight";
})(dsector);