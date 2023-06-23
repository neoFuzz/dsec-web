var dsector;
(function (dsector) {
    /** Re-written from Java*/
    class InbuiltLight {
        constructor(parent, name, on, x, y, z, red, green, blue) {
            if (this.parent === undefined) {
                this.parent = null;
            }
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.id === undefined) {
                this.id = 0;
            }
            if (this.positionLockedToLocator === undefined) {
                this.positionLockedToLocator = false;
            }
            if (this.__on === undefined) {
                this.__on = false;
            }
            if (this.__x === undefined) {
                this.__x = 0;
            }
            if (this.__y === undefined) {
                this.__y = 0;
            }
            if (this.__z === undefined) {
                this.__z = 0;
            }
            if (this.__red === undefined) {
                this.__red = 0;
            }
            if (this.__green === undefined) {
                this.__green = 0;
            }
            if (this.__blue === undefined) {
                this.__blue = 0;
            }
            this.parent = parent;
            this.name = name;
            this.id = dsector.NumberTools.randomLong();
            this.__on = on;
            this.__x = x;
            this.__y = y;
            this.__z = z;
            this.__red = red;
            this.__green = green;
            this.__blue = blue;
            this.positionLockedToLocator = false;
        }
        on$() {
            return this.__on;
        }
        isOn() {
            return this.__on;
        }
        isOff() {
            return !this.__on;
        }
        on_skipWindowUpdates(skip) {
            this.__on = skip;
        }
        on$boolean(state) {
            this.__on = state;
            this.updateWindowsShowingLightOnStatus();
        }
        on(state) {
            if (((typeof state === 'boolean') || state === null)) {
                return this.on$boolean(state);
            }
            else if (state === undefined) {
                return this.on$();
            }
            else
                throw new Error('invalid overload');
        }
        x$float(x) {
            this.__x = x;
            this.updateWindowsShowingLightPosition();
        }
        x(x) {
            if (((typeof x === 'number') || x === null)) {
                return this.x$float(x);
            }
            else if (x === undefined) {
                return this.x$();
            }
            else
                throw new Error('invalid overload');
        }
        x_noWindowUpdate(x) {
            this.__x = x;
        }
        x$() {
            return this.__x;
        }
        y$float(y) {
            this.__y = y;
            this.updateWindowsShowingLightPosition();
        }
        y(y) {
            if (((typeof y === 'number') || y === null)) {
                return this.y$float(y);
            }
            else if (y === undefined) {
                return this.y$();
            }
            else
                throw new Error('invalid overload');
        }
        y_noWindowUpdate(y) {
            this.__y = y;
        }
        y$() {
            return this.__y;
        }
        z$float(z) {
            this.__z = z;
            this.updateWindowsShowingLightPosition();
        }
        z(z) {
            if (((typeof z === 'number') || z === null)) {
                return this.z$float(z);
            }
            else if (z === undefined) {
                return this.z$();
            }
            else
                throw new Error('invalid overload');
        }
        z_noWindowUpdate(z) {
            this.__z = z;
        }
        z$() {
            return this.__z;
        }
        red$float(value) {
            this.__red = value;
            this.updateWindowsShowingLightColor();
        }
        red(value) {
            if (((typeof value === 'number') || value === null)) {
                return this.red$float(value);
            }
            else if (value === undefined) {
                return this.red$();
            }
            else
                throw new Error('invalid overload');
        }
        red$() {
            return this.__red;
        }
        green$float(value) {
            this.__green = value;
            this.updateWindowsShowingLightColor();
        }
        green(value) {
            if (((typeof value === 'number') || value === null)) {
                return this.green$float(value);
            }
            else if (value === undefined) {
                return this.green$();
            }
            else
                throw new Error('invalid overload');
        }
        green$() {
            return this.__green;
        }
        blue$float(value) {
            this.__blue = value;
            this.updateWindowsShowingLightColor();
        }
        blue(value) {
            if (((typeof value === 'number') || value === null)) {
                return this.blue$float(value);
            }
            else if (value === undefined) {
                return this.blue$();
            }
            else
                throw new Error('invalid overload');
        }
        blue$() {
            return this.__blue;
        }
        updateWindowsShowingLightOnStatus() {
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        updateWindowsShowingLightPosition() {
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        updateWindowsShowingLightColor() {
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
    }
    dsector.InbuiltLight = InbuiltLight;
    InbuiltLight["__class"] = "dsector.InbuiltLight";
})(dsector || (dsector = {}));
