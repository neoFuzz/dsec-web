(function (dsector) {
    /**
     * This class that holds all the background object configurations used within the game.
     *
     * @property {number} edgeStyle - The edge style for the background objects.
     * @property {number} limitRotationsTo90Degrees - Whether to limit rotations to 90 degrees.
     * @property {Array} silentBackgroundObjects - An array of silent background objects.
     * @property {Array} backgroundObjectNumbers - An array of background object numbers.
     *
     * @property {number} SMALL_BLOCK - Constant representing the small block model.
     * @property {number} SMALL_SPHERE - Constant representing the small sphere model.
     * @property {number} LARGE_SPHERE - Constant representing the large sphere model.
     * @property {number} SHORT_LINE - Constant representing the short line model.
     * @property {number} MEDIUM_LINE - Constant representing the medium line model.
     * @property {number} LONG_LINE - Constant representing the long line model.
     * @property {number} LONG_LINE_45_SHORT_LINE1 - Constant representing the long line with a 45-degree angle and short line 1.
     * @property {number} LONG_LINE_45_SHORT_LINE2 - Constant representing the long line with a 45-degree angle and short line 2.
     * @property {number} SQUARE_LOOP1 - Constant representing the square loop 1.
     * @property {number} SQUARE_LOOP2 - Constant representing the square loop 2.
     * @property {number} SQUARE_LOOP3 - Constant representing the square loop 3.
     *
     * @property {number} setNumberOfObjects - Sets the number of objects for a given model.
     * @property {number} allowAnyRotation - Allows any rotation.
     * @property {number} getModelName - Gets the model name for a given model constant.
     *
     * @example
     * var config = new DSecBackgroundConfiguration([]);
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
    class DSecBackgroundConfiguration {
        /**
         * Constructor for DSecBackgroundConfiguration.
         *
         * @param {Array} arrayList - An array list of silent background objects.
         */
        constructor(arrayList) {
            if (this.silentBackgroundObjects === undefined) {
                this.silentBackgroundObjects = null;
            }
            if (this.backgroundObjectNumbers === undefined) {
                this.backgroundObjectNumbers = null;
            }
            this.limitRotationsTo90Degrees = false;
            if (this.edgeStyle === undefined) {
                this.edgeStyle = 0;
            }
            this.silentBackgroundObjects = arrayList;
            this.setNumberOfObjects(DSecBackgroundConfiguration.SMALL_BLOCK, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.SMALL_SPHERE, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.LARGE_SPHERE, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.SHORT_LINE, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.MEDIUM_LINE, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.LONG_LINE, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.LONG_LINE_45_SHORT_LINE1, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.LONG_LINE_45_SHORT_LINE2, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.SQUARE_LOOP1, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.SQUARE_LOOP2, 0);
            this.setNumberOfObjects(DSecBackgroundConfiguration.SQUARE_LOOP3, 0);
            this.allowAnyRotation();
        }

        /**
         * Gets the model name for a given mode.
         *
         * @private
         * @param {number} mode - The mode constant.
         * @returns {string|null} The model name or null if the mode is not recognized.
         */
        getModelName(mode) {
            switch (mode) {
                case 0: /* SMALL_BLOCK */
                    return "assets/models/smallBlock";
                case 1: /* SMALL_SPHERE */
                    return "assets/models/smallSphere";
                case 2: /* SHORT_LINE */
                    return "assets/models/shortLine";
                case 3: /* MEDIUM_LINE */
                    return "assets/models/mediumLine";
                case 4: /* LONG_LINE */
                    return "assets/models/longLine";
                case 5:
                case 6:
                case 7: /* LONG_LINE_45_SHORT_LINE1 */
                case 8: /* LONG_LINE_45_SHORT_LINE2 */
                default:
                    return null;
                case 9: /* SQUARE_LOOP1 */
                    return "assets/models/squareLoop1";
                case 10: /* SQUARE_LOOP2 */
                    return "assets/models/squareLoop2";
                case 11: /* SQUARE_LOOP3 */
                    return "assets/models/squareLoop3";
                case 12: /* LARGE_SPHERE */
                    return "assets/models/largeSphere";
            }
        }

        /**
         * Sets the number of objects for a given model.
         *
         * @private
         * @param {number} key - The model constant.
         * @param {number} value - The number of objects.
         */
        setNumberOfObjects(key, value) {
            if (this.backgroundObjectNumbers == null) {
                this.backgroundObjectNumbers = new Map();
            }
            this.backgroundObjectNumbers.set(key, value);
        }

        /**
         * Gets the number of objects for a given model.
         *
         * @private
         * @param {number} key - The model constant.
         * @returns {number} The number of objects.
         */
        getNumberOfObjects(key) {
            const number = this.backgroundObjectNumbers.get(key);
            return number == null ? 0 : number;
        }

        /**
         * Allows any rotation.
         */
        allowAnyRotation() {
            this.limitRotationsTo90Degrees = false;
        }

        /**
         * Allows only 90-degree rotations.
         */
        allow90DegreeRotations() {
            this.limitRotationsTo90Degrees = true;
        }

        /**
         * Sets the edge style.
         *
         * @private
         * @param {number} edgeStyle - The edge style.
         */
        setEdgeStyle(edgeStyle) {
            this.edgeStyle = edgeStyle;
        }

        /**
         * Uses a preset configuration.
         *
         * @private
         * @param {number} mode - The preset mode.
         */
        usePresetConfiguration(mode) {
            switch (mode) {
                case 0:
                default:
                    break;
                case 1:
                    this.setNumberOfObjects(1, 100);
                    this.allow90DegreeRotations();
                    break;
                case 2:
                    this.setNumberOfObjects(0, 30);
                    this.allow90DegreeRotations();
                    break;
                case 3:
                    this.setNumberOfObjects(2, 50);
                    this.setNumberOfObjects(3, 50);
                    this.setNumberOfObjects(4, 50);
                    this.allow90DegreeRotations();
                    break;
                case 4:
                    this.setNumberOfObjects(2, 50);
                    this.setNumberOfObjects(3, 50);
                    this.setNumberOfObjects(4, 50);
                    this.allowAnyRotation();
                    break;
                case 5:
                    this.setNumberOfObjects(9, 10);
                    this.setNumberOfObjects(10, 10);
                    this.setNumberOfObjects(11, 10);
                    this.allow90DegreeRotations();
                    break;
                case 6:
                    this.setNumberOfObjects(9, 10);
                    this.setNumberOfObjects(10, 10);
                    this.setNumberOfObjects(11, 10);
                    this.allowAnyRotation();
                    break;
                case 7:
                    this.setNumberOfObjects(12, 100);
                    this.allow90DegreeRotations();
            }
        }

        /**
         * Generates a random scene.
         *
         * @private
         * @param {Array} arrayList - An array list of silent background objects.
         */
        generateRandomScene(arrayList) {
            if (this.edgeStyle === 1) {
                this.placeObjectsAtEdge(arrayList, 0);
            }
            if (this.edgeStyle === 2) {
                this.placeObjectsAtEdge(arrayList, 1);
            }
            this.placeObjectsRandomly(arrayList, 11);
            this.placeObjectsRandomly(arrayList, 10);
            this.placeObjectsRandomly(arrayList, 9);
            this.placeObjectsRandomly(arrayList, 4);
            this.placeObjectsRandomly(arrayList, 7);
            this.placeObjectsRandomly(arrayList, 8);
            this.placeObjectsRandomly(arrayList, 0);
            this.placeObjectsRandomly(arrayList, 1);
            this.placeObjectsRandomly(arrayList, 2);
            this.placeObjectsRandomly(arrayList, 3);
            this.placeObjectsRandomly(arrayList, 12);
        }

        /**
         * Places objects at the edge of the scene.
         *
         * @private
         * @param {Array} arrayList - An array list of silent background objects.
         * @param {number} number - The model constant.
         */
        placeObjectsAtEdge(arrayList, number) {
            let randomNumber;
            if (Math.random() < 0.5) {
                randomNumber = 20 + ((Math.random() * 90.0) | 0);
            } else {
                randomNumber = 40 + ((Math.random() * 40.0) | 0);
            }
            const modelName = this.getModelName(number);
            if (modelName != null) {
                for (let dbl = 0.0; dbl < 6.283185307179586; dbl += 6.283185307179586 / randomNumber) {
                    const sin = 500.0 * Math.sin(dbl);
                    const cos = 500.0 * Math.cos(dbl);
                    const matrix4f = dsector.Matrix4f.rotationZMatrix(Math.fround(dbl));
                    const positionedModel = new dsector.PositionedModel(null,
                        dsector.DSReference.modelLoader.getModel(modelName), matrix4f, sin, cos, 4.0);
                    arrayList.push(positionedModel);
                }
            }
        }

        /**
         * Places objects randomly in the scene.
         *
         * @private
         * @param {Array} arrayList - An array list of silent background objects.
         * @param {number} number - The model constant.
         */
        placeObjectsRandomly(arrayList, number) {
            const numberOfObjects = this.getNumberOfObjects(number);
            const modelName = this.getModelName(number);
            if (modelName != null) {
                for (let i = 0; i < numberOfObjects; ++i) {
                    const ran1 = 5 * (((Math.random() * 110.0) | 0) - 55);
                    const ran2 = 5 * (((Math.random() * 110.0) | 0) - 55);
                    let matrix4f = new dsector.Matrix4f();
                    if (this.limitRotationsTo90Degrees) {
                        switch (((Math.random() * 4.0) | 0)) {
                            case 0:
                                matrix4f = dsector.Matrix4f.rotationZMatrix(0.0);
                                break;
                            case 1:
                                matrix4f = dsector.Matrix4f.rotationZMatrix(1.5707964);
                                break;
                            case 2:
                                matrix4f = dsector.Matrix4f.rotationZMatrix(Math.PI);
                                break;
                            case 3:
                                matrix4f = dsector.Matrix4f.rotationZMatrix(4.712389);
                        }
                    } else {
                        matrix4f = dsector.Matrix4f.rotationZMatrix((Math.random() * 2.0 * Math.PI));
                    }
                    const pModel = new dsector.PositionedModel(null, dsector.DSReference.modelLoader.getModel(modelName),
                        matrix4f, ran1, ran2, 4.0);
                    this.addPositionedModelIfSpaceClear(arrayList, pModel);
                }
            }
        }

        /**
         * Adds a positioned model to the array list if its position is clear.
         *
         * @private
         * @param {Array} arrayList - An array list of objects.
         * @param {dsector.PositionedModel} positionedModel - The positioned model to add.
         */
        addPositionedModelIfSpaceClear(arrayList, positionedModel) {
            if (arrayList == null) {
                arrayList = ([]);
            }
            const x = positionedModel.x;
            const y = positionedModel.y;
            let i;
            let positionedModel1;
            for (i = 0; i < arrayList.length; ++i) {
                positionedModel1 = arrayList[i];
                const v = 28.6;
                for (let m = -v; m <= v; m += (v / 4.0)) {
                    for (let n = -v; n <= v; n += (v / 4.0)) {
                        positionedModel.x = x + m;
                        positionedModel.y = y + n;
                        if (positionedModel1.intersectsWith(positionedModel)) {
                            return;
                        }
                    }
                }
            }
            positionedModel.x = x;
            positionedModel.y = y;
            for (i = 0; i < this.silentBackgroundObjects.length; ++i) {
                positionedModel1 = this.silentBackgroundObjects[i];
                positionedModel.z = -10.0;
                const intersectsWith = positionedModel.intersectsWith(positionedModel1);
                positionedModel.z = 0.0;
                if (intersectsWith) {
                    arrayList.push(positionedModel);
                    break;
                }
            }
        }
    }

    DSecBackgroundConfiguration.SMALL_BLOCK = 0;
    DSecBackgroundConfiguration.SMALL_SPHERE = 1;
    DSecBackgroundConfiguration.SHORT_LINE = 2;
    DSecBackgroundConfiguration.MEDIUM_LINE = 3;
    DSecBackgroundConfiguration.LONG_LINE = 4;
    DSecBackgroundConfiguration.LONG_LINE_45_SHORT_LINE1 = 7;
    DSecBackgroundConfiguration.LONG_LINE_45_SHORT_LINE2 = 8;
    DSecBackgroundConfiguration.SQUARE_LOOP1 = 9;
    DSecBackgroundConfiguration.SQUARE_LOOP2 = 10;
    DSecBackgroundConfiguration.SQUARE_LOOP3 = 11;
    DSecBackgroundConfiguration.LARGE_SPHERE = 12;
    DSecBackgroundConfiguration.numberOfPresetConfigurations = 8;
    dsector.DSecBackgroundConfiguration = DSecBackgroundConfiguration;
    DSecBackgroundConfiguration["__class"] = "dsector.DSecBackgroundConfiguration";
})(dsector || (dsector = {}));