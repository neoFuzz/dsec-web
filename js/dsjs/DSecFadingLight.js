/* Re-written from java */
var dsector;
(function (dsector) {
    class DSecFadingLight {
        constructor(initialBrightness, x, y, z, end) {
            if (this.initialBrightness === undefined) {
                this.initialBrightness = 0;
            }
            if (this.x === undefined) {
                this.x = 0;
            }
            if (this.y === undefined) {
                this.y = 0;
            }
            if (this.z === undefined) {
                this.z = 0;
            }
            if (this.startTime === undefined) {
                this.startTime = 0;
            }
            if (this.endTime === undefined) {
                this.endTime = 0;
            }
            this.initialBrightness = initialBrightness;
            this.x = x;
            this.y = y;
            this.z = z;
            this.startTime = CWSYSTEM.Environment.currentTime();
            this.endTime = this.startTime + (n => n < 0 ? Math.ceil(n) : Math.floor(n))(end);
        }

        static add(initBright, x, y, z, end) {
            if (DSecFadingLight.fadingLightsInScene == null) {
                DSecFadingLight.fadingLightsInScene = ([]);
            }
            const fadingLight = new DSecFadingLight(initBright, x, y, z, end);
            DSecFadingLight.fadingLightsInScene.push(fadingLight);
        }

        static addLightsToScene(scene) {
            if (DSecFadingLight.fadingLightsInScene != null) {
                for (let i = 0; i < DSecFadingLight.fadingLightsInScene.length; ++i) {
                    const fadingLight = DSecFadingLight.fadingLightsInScene[i];
                    const currentTime = CWSYSTEM.Environment.currentTime();
                    if (currentTime > fadingLight.endTime) {
                        (a => {let index = a.indexOf(fadingLight);
                            if (index >= 0) {a.splice(index, 1);return true;} else {return false;}
                        })(DSecFadingLight.fadingLightsInScene);
                        --i;
                    } else {
                        const startTime = ((currentTime - fadingLight.startTime) | 0);
                        const endTime = ((fadingLight.endTime - fadingLight.startTime) | 0);
                        let calcTime = Math.fround(1.0 - Math.fround(startTime / endTime));
                        calcTime *= fadingLight.initialBrightness;
                        scene.addStaticLight(fadingLight.x, fadingLight.y, fadingLight.z, calcTime, calcTime, calcTime);
                    }
                }
            }
        }
    }

    DSecFadingLight.fadingLightsInScene = null;
    dsector.DSecFadingLight = DSecFadingLight;
    DSecFadingLight["__class"] = "dsector.DSecFadingLight";
})(dsector || (dsector = {}));
