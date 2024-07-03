/**/
(function (CWSYSTEM) {
    /**
     * @class
     * @memberof CWSYSTEM
    */
    class IOInstruction {
        constructor(type, x, y) {
            if (((typeof type === 'number') || type === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null)) {
                let __args = arguments;
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.key === undefined) {
                    this.key = null;
                }
                if (this.keyCode === undefined) {
                    this.keyCode = 0;
                }
                this.type = type;
                this.x = x;
                this.y = y;
            } else if (((typeof type === 'number') || type === null) && ((typeof x === 'string') || x === null) && y === undefined) {
                let __args = arguments;
                let key = __args[1];
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.key === undefined) {
                    this.key = null;
                }
                if (this.keyCode === undefined) {
                    this.keyCode = 0;
                }
                this.type = type;
                this.key = key;
            } else if (((typeof type === 'number') || type === null) && ((typeof x === 'number') || x === null) && y === undefined) {
                let __args = arguments;
                let keycode = __args[1];
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.x === undefined) {
                    this.x = 0;
                }
                if (this.y === undefined) {
                    this.y = 0;
                }
                if (this.key === undefined) {
                    this.key = null;
                }
                if (this.keyCode === undefined) {
                    this.keyCode = 0;
                }
                this.type = type;
                this.keyCode = keycode;
            } else
                throw new Error('invalid overload');
        }
    }

    IOInstruction.mouseEntered = 1;
    IOInstruction.mouseExited = 2;
    IOInstruction.mouseLeftPressed = 3;
    IOInstruction.mouseRightPressed = 4;
    IOInstruction.mouseLeftReleased = 5;
    IOInstruction.mouseRightReleased = 6;
    IOInstruction.mouseLeftClicked = 7;
    IOInstruction.mouseRightClicked = 8;
    IOInstruction.mouseDoubleLeftClicked = 9;
    IOInstruction.mouseDoubleRightClicked = 10;
    IOInstruction.mouseDragged = 11;
    IOInstruction.mouseMoved = 12;
    IOInstruction.keyTyped = 13;
    IOInstruction.keyPressed = 14;
    IOInstruction.keyReleased = 15;
    CWSYSTEM.IOInstruction = IOInstruction;
    IOInstruction["__class"] = "CWSYSTEM.IOInstruction";
})(CWSYSTEM || (CWSYSTEM = {}));
