import {dsector} from './dsector.js';

/**
 * Manages lighting for a 3D scene.
 *
 * @property {dsector.Scene} scene - The 3D scene to manage lighting for.
 * @property {number} ambientRed - The red component of the ambient light.
 * @property {number} ambientGreen - The green component of the ambient light.
 * @property {number} ambientBlue - The blue component of the ambient light.
 * @property {Float32Array} lightCameraSpaceX - The x-coordinate of the light in camera space.
 * @property {Float32Array} lightCameraSpaceY - The y-coordinate of the light in camera space.
 * @property {Float32Array} lightCameraSpaceZ - The z-coordinate of the light in camera space.
 * @property {Float32Array} lightRed - The red component of the light.
 * @property {Float32Array} lightGreen - The green component of the light.
 * @property {Float32Array} lightBlue - The blue component of the light.
 * @property {number} numberOfLightsInRenderingScene - The number of lights in the rendering scene.
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
export class LightManager {
    /**
     * Creates a new LightManager instance and initializes the lighting properties for the scene.
     *
     * @param {dsector.Scene} scene - The 3D scene to manage lighting for.
     */
    constructor(scene) {
        this.scene = scene;
        this.ambientRed = 1.5;
        this.ambientGreen = 1.5;
        this.ambientBlue = 1.5;
        this.lightCameraSpaceX = null;
        this.lightCameraSpaceY = null;
        this.lightCameraSpaceZ = null;
        this.lightRed = null;
        this.lightGreen = null;
        this.lightBlue = null;
        this.numberOfLightsInRenderingScene = 0;
    }

    /**
     * Prepares lights for rendering in the scene.
     * This method calculates the positions and colors of lights in camera space.
     */
    prepareLightsForRendering() {
        const maxLights = 50;
        const lights = [];
        const inverse = this.scene.cameraRotation.inverse();
        const cameraPos = {
            x: this.scene.cameraX,
            y: this.scene.cameraY,
            z: this.scene.cameraZ
        };

        for (let i = 0; i < this.scene.__positionedModels.size; ++i) {
            const positionedModel = this.scene.positionedModels()[i];
            const polygonIterator = new dsector.PolygonIterator(positionedModel.model3DMatrix,
                dsector.PolygonIterator.ALL_POLYGON_GROUPS);

            while (true) {
                const modelFolder = polygonIterator.nextModelFolder();
                if (modelFolder == null) {
                    break;
                }

                for (const inbuiltLight of modelFolder.inbuiltLights) {
                    if (inbuiltLight.on()) {
                        const lightPos = this.transformLightPosition(inbuiltLight, positionedModel, cameraPos, inverse);
                        lights.push(new dsector.InbuiltLight(null, null, true,
                            lightPos.x, lightPos.y, lightPos.z,
                            inbuiltLight.red(), inbuiltLight.green(), inbuiltLight.blue()
                        ));

                        if (lights.length >= maxLights) {
                            break;
                        }
                    }
                }

                if (lights.length >= maxLights) {
                    break;
                }
            }

            if (lights.length >= maxLights) {
                break;
            }
        }

        this.numberOfLightsInRenderingScene = lights.length;
        this.lightCameraSpaceX = new Float32Array(this.numberOfLightsInRenderingScene);
        this.lightCameraSpaceY = new Float32Array(this.numberOfLightsInRenderingScene);
        this.lightCameraSpaceZ = new Float32Array(this.numberOfLightsInRenderingScene);
        this.lightRed = new Float32Array(this.numberOfLightsInRenderingScene);
        this.lightGreen = new Float32Array(this.numberOfLightsInRenderingScene);
        this.lightBlue = new Float32Array(this.numberOfLightsInRenderingScene);

        for (let i = 0; i < this.numberOfLightsInRenderingScene; i++) {
            const light = lights[i];
            this.lightCameraSpaceX[i] = light.x();
            this.lightCameraSpaceY[i] = light.y();
            this.lightCameraSpaceZ[i] = light.z();
            this.lightRed[i] = light.red();
            this.lightGreen[i] = light.green();
            this.lightBlue[i] = light.blue();
        }
    }

    /**
     * Transforms the position of a light from world space to camera space.
     *
     * @param {dsector.InbuiltLight} inbuiltLight - The light to transform.
     * @param {dsector.PositionedModel} positionedModel - The positioned model the light belongs to.
     * @param {Object} cameraPos - The position of the camera.
     * @param {dsector.Matrix4f} inverse - The inverse rotation matrix of the camera.
     * @returns {dsector.Vertex} The transformed light position.
     *
     */
    transformLightPosition(inbuiltLight, positionedModel, cameraPos, inverse) {
        const vertex = new dsector.Vertex(
            inbuiltLight.x(), inbuiltLight.y(), inbuiltLight.z()
        );
        vertex.transform(positionedModel.rotation);
        vertex.x += Math.fround(positionedModel.x - cameraPos.x);
        vertex.y += Math.fround(positionedModel.y - cameraPos.y);
        vertex.z += Math.fround(positionedModel.z - cameraPos.z);
        vertex.transform(inverse);
        return vertex;
    }
}