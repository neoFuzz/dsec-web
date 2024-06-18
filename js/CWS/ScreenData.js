var CWSYSTEM;
(function (CWSYSTEM) {
    /**
     Class representing screen data.
     */
    class ScreenData {
        /**
         Creates an instance of ScreenData.
         @param {number} width - The width of the screen.
         @param {number} height - The height of the screen.
         @param {string} [description=null] - The description of the screen.
         */
        constructor(width, height, description) {
            /**
             @type {Array}
             */
            this.point = null;
            /**
             @type {number}
             */
            this.width = 0;
            /**
             @type {number}
             */
            this.height = 0;
            /**
             @type {string}
             */
            this.description = null;

            this.description = description;
            this.point = createMultiDimensionalArray([height, width]);
            this.width = width;
            this.height = height;
        }
    }

    /**
     Creates a multidimensional array.
     @param {number[]} dimensions - An array of dimensions for the multidimensional array.
     @returns {Array} The created multidimensional array.
     */
    function createMultiDimensionalArray(dimensions) {
        /**
         Allocates the multidimensional array based on the provided dimensions.
         @param {number[]} dims - Dimensions for the array.
         @returns {Array | number} Allocated multidimensional array or 0 if dimensions are empty.
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

    CWSYSTEM.ScreenData = ScreenData;
    ScreenData["__class"] = "CWSYSTEM.ScreenData";
})(CWSYSTEM || (CWSYSTEM = {}));
