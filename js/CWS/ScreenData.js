/**
 * Class representing screen data. The point array will contain [CWColor]{@link CWSYSTEM.CWColor} data.
 *
 * @property {Array<CWSYSTEM.CWColor>} point - A multidimensional array representing the screen data.
 * @property {number} width - The width of the screen.
 * @property {number} height - The height of the screen.
 * @property {string} description - The description of the screen.
 *
 * @since    1.0.0
 * @access   public
 * @class
 *
 * @memberof CWSYSTEM
 *
 * @author   neoFuzz
 * @link     https://github.com/neoFuzz/dsec-web
 * @license  AGPLv3
 */
export class ScreenData {
    /**
     Creates an instance of ScreenData.
     @param {number} width - The width of the screen.
     @param {number} height - The height of the screen.
     @param {string} [description=null] - The description of the screen.
     */
    constructor(width, height, description) {
        this.description = description | null;
        this.point = createMultiDimensionalArray([height, width]);
        this.width = width | 0;
        this.height = height | 0;
    }

    /**
     * Returns the description of the screen.
     *
     * @public
     * @returns {*|number}
     */
    getDescription() {
        return this.description;
    }
}

/**
 * Creates a multidimensional array.
 *
 * @param {number[]} dimensions - An array of dimensions for the multidimensional array.
 * @returns {Array} The created multidimensional array.
 */
function createMultiDimensionalArray(dimensions) {
    /**
     * Allocates the multidimensional array based on the provided dimensions.
     *
     * @param {number[]} dims - Dimensions for the array.
     * @returns {Array | number} Allocated multidimensional array or 0 if dimensions are empty.
     * @private
     */
    function allocate(dims) {
        if (dims.length === 0) {
            return 0;
        } else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        }
    }

    return allocate(dimensions);
}