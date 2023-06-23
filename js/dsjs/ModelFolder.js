/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class ModelFolder {
        constructor(var1, var2) {
            if (this.name === undefined) {
                this.name = null;
            }
            if (this.__parentFolder === undefined) {
                this.__parentFolder = null;
            }
            if (this.id === undefined) {
                this.id = 0;
            }
            if (this.__visible === undefined) {
                this.__visible = false;
            }
            if (this.expanded === undefined) {
                this.expanded = false;
            }
            if (this.modelFolders === undefined) {
                this.modelFolders = null;
            }
            if (this.polygonGroups === undefined) {
                this.polygonGroups = null;
            }
            if (this.inbuiltLights === undefined) {
                this.inbuiltLights = null;
            }
            if (this.specialPoints === undefined) {
                this.specialPoints = null;
            }
            this.name = var1;
            this.__parentFolder = var2;
            this.id = dsector.NumberTools.randomLong();
            this.__visible = true;
            this.expanded = true;
            this.modelFolders = ([]);
            this.polygonGroups = ([]);
            this.inbuiltLights = ([]);
            this.specialPoints = ([]);
        }
        visible() {
            if (this.__parentFolder == null) {
                return this.__visible;
            }
            else {
                return this.__parentFolder.visible() && this.__visible;
            }
        }
        isVisible() {
            return this.__visible;
        }
        isHidden() {
            return !this.__visible;
        }
        setVisible$boolean(var1) {
            this.__visible = var1;
        }
        setVisible(var1) {
            if (((typeof var1 === 'boolean') || var1 === null)) {
                return this.setVisible$boolean(var1);
            }
            else if (var1 === undefined) {
                return this.setVisible$();
            }
            else
                throw new Error('invalid overload');
        }
        setVisible$() {
            this.__visible = true;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        setHidden() {
            this.__visible = false;
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
            CWSYSTEM.Environment.perspectiveViewWindowsRequestedForUpdateNextCycle();
        }
        parentFolder() {
            return this.__parentFolder;
        }
    }
    dsector.ModelFolder = ModelFolder;
    ModelFolder["__class"] = "dsector.ModelFolder";
})(dsector || (dsector = {}));
