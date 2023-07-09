var dsector;
(function (dsector) {
    class NumberTools {
        static largeInteger_$LI$() {
            if (NumberTools.largeInteger == null) {
                NumberTools.largeInteger = 2147483647;
            }
            return NumberTools.largeInteger;
        }

        static largeLong_$LI$() {
            if (NumberTools.largeLong == null) {
                NumberTools.largeLong = 9223372036854775807;
            }
            return NumberTools.largeLong;
        }

        static smallPositiveFloat_$LI$() {
            if (NumberTools.smallPositiveFloat == null) {
                NumberTools.smallPositiveFloat = 1.4E-45;
            }
            return NumberTools.smallPositiveFloat;
        }

        static randomInteger() {
            return ((Math.random() * NumberTools.largeInteger_$LI$()) | 0);
        }

        static randomLong() {
            return (n => n < 0 ? Math.ceil(n) : Math.floor(n))((Math.random() * NumberTools.largeLong_$LI$()));
        }

        static main() {
            console.info("Random integer: " + NumberTools.randomInteger());
            console.info("Random long: " + NumberTools.randomLong());
            console.info("smallFloat: 1.401E-42 or " + NumberTools.smallPositiveFloat_$LI$());
        }
    }

    dsector.NumberTools = NumberTools;
    NumberTools["__class"] = "dsector.NumberTools";
})(dsector || (dsector = {}));
