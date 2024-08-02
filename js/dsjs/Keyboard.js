(function (dsector) {
    /**
     * Keyboard class. This class doesn't do much, but it's here for consistency.
     *
     * @deprecated This class is deprecated and will be removed in a future version.
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
    class Keyboard {
        // struct like class
    }

    /** Constant for the focus key.
     * @type {number} */
    Keyboard.focus = 0;
    /**Constant for the DSECTOR app.
     * @type {number} */
    Keyboard.DSECTOR = 1;
    dsector.Keyboard = Keyboard;
    Keyboard["__class"] = "dsector.Keyboard";
})(dsector);