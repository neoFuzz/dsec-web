/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class Navigation {
        static unitVectorInDirectionOfOrientation(scene) {
            const vectorInR3 = new dsector.VectorInR3(0.0, 0.0, 1.0);
            vectorInR3.transform(scene.cameraRotation);
            return vectorInR3;
        }
        static unitVectorToTheDirectRight(scene) {
            const vectorInR3 = new dsector.VectorInR3(0.0, 1.0, 0.0);
            vectorInR3.transform(scene.cameraRotation);
            return vectorInR3;
        }
    }
    dsector.Navigation = Navigation;
    Navigation["__class"] = "dsector.Navigation";
})(dsector || (dsector = {}));
