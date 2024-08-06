import {dsector} from './dsector.js';

/**
 * Navigation class provides methods for calculating navigation vectors based on scene orientation.
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
export class Navigation {
    /**
     * Returns a unit vector in the direction of the camera's orientation in the scene.
     *
     * @param {dsector.Scene} scene - The scene object containing the camera's rotation.
     * @returns {dsector.VectorInR3} The unit vector in the direction of the camera's orientation.
     */
    static unitVectorInDirectionOfOrientation(scene) {
        const vectorInR3 = new dsector.VectorInR3(0.0, 0.0, 1.0);
        vectorInR3.transform(scene.cameraRotation);
        return vectorInR3;
    }

    /**
     * Returns a unit vector to the direct right of the camera's orientation in the scene.
     * @param {dsector.Scene} scene - The scene object containing the camera's rotation.
     * @returns {dsector.VectorInR3} The unit vector to the direct right of the camera's orientation.
     */
    static unitVectorToTheDirectRight(scene) {
        const vectorInR3 = new dsector.VectorInR3(0.0, 1.0, 0.0);
        vectorInR3.transform(scene.cameraRotation);
        return vectorInR3;
    }
}