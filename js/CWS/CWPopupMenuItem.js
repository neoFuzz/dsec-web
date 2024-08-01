(function (CWSYSTEM) {
    /**
     * A class that is used to represent a popup menu item.
     *
     * @property {number} type - The type of the menu item.
     * @property {string|null} code - The code associated with the menu item.
     * @property {string|null} text - The display text of the menu item.
     * @property {string|null} shortcutText - The shortcut text for the menu item.
     * @property {boolean} bulletStatus - The bullet status of the menu item.
     * @property {Object|null} generalPurposeObject - The object from which the method is invoked.
     * @property {Function|null} bulletStatusDeterminedByMethod - The method to determine bullet status.
     * @property {Object|null} objectThatMethodInvokedFrom - The object from which the method is invoked.
     * @property {Function|null} executeMethodUponSelection - The method to execute upon selection.
     * @property {Object|null} objectToInvokeExecuteMethodFrom - The object to invoke the execute method from.
     * @property {Array|null} parametersForExecuteMethod - The parameters for the execute method.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof CWSYSTEM
     * @requires CWSYSTEM.CWPopupMenu
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class CWPopupMenuItem {
        /**
         * Creates an instance of CWPopupMenuItem.
         *
         * @param {number} type - The type of the menu item.
         * @param {string|null} code - The code associated with the menu item.
         * @param {string|null} text - The display text of the menu item.
         * @param {string|null} scTxt - The shortcut text for the menu item.
         * @param {boolean|null} bltSts - The bullet status of the menu item.
         * @param {Object|null} invFrm - The object from which the method is invoked.
         * @param {Object|null} statFrmMthd - The method to determine bullet status.
         * @throws {Error} Throws an error if the parameters do not match the expected types.
         */
        constructor(type, code, text, scTxt, bltSts, invFrm, statFrmMthd) {
            this.code = null;
            this.text = null;
            this.shortcutText = null;
            this.type = 0;
            this.generalPurposeObject = null;
            this.__bulletStatus = false;
            this.bulletStatusDeterminedByMethod = null;
            this.objectThatMethodInvokedFrom = null;
            this.executeMethodUponSelection = null;
            this.objectToInvokeExecuteMethodFrom = null;
            this.parametersForExecuteMethod = null;

            if (typeof type === 'number' && (typeof code === 'string' || code === null) &&
                (typeof text === 'string' || text === null) &&
                (typeof scTxt === 'string' || scTxt === null) &&
                (typeof bltSts === 'boolean' || bltSts === null) &&
                (invFrm != null || invFrm === null) &&
                (statFrmMthd != null &&
                    statFrmMthd instanceof Object || statFrmMthd === null)) {
                this.type = type;
                this.code = code;
                this.text = text;
                this.shortcutText = scTxt;
                this.__bulletStatus = bltSts;
                this.bulletStatusDeterminedByMethod = statFrmMthd;
                this.objectThatMethodInvokedFrom = invFrm;
            } else if (typeof type === 'number' && (typeof code === 'string' || code === null) &&
                (typeof text === 'string' || text === null) &&
                (typeof scTxt === 'string' || scTxt === null) &&
                bltSts === undefined && invFrm === undefined && statFrmMthd === undefined) {
                this.type = type;
                this.code = code;
                this.text = text;
                this.shortcutText = scTxt;
            } else {
                throw new Error('Invalid overload');
            }
        }

        /**
         * Gets the bullet status of the menu item.
         *
         * @returns {boolean} The bullet status of the menu item.
         */
        bulletStatus() {
            if (this.bulletStatusDeterminedByMethod == null) {
                return this.__bulletStatus;
            } else {
                let check;
                try {
                    check = this.bulletStatusDeterminedByMethod.fn.apply(this.objectThatMethodInvokedFrom, [null]);
                } catch (e) {
                    console.error("Error occured in CWPopupMenuItem.bulletStatus(): " + e);
                    return false;
                }
                return check;
            }
        }
    }

    /** Normal menu item type.
     * @constant {number}
     * @static
     */
    CWPopupMenuItem.NORMAL = 0;
    /** Bulleted menu item type.
     * @constant {number}
     * @static
     */
    CWPopupMenuItem.BULLETED = 1;
    /** Separator menu item type.
     * @constant {number}
     * @static
     */
    CWPopupMenuItem.SEPARATOR = 2;
    CWSYSTEM.CWPopupMenuItem = CWPopupMenuItem;
    CWPopupMenuItem["__class"] = "CWSYSTEM.CWPopupMenuItem";
})(CWSYSTEM);