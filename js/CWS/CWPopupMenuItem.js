/**/
(function (CWSYSTEM) {
    /**
     * Represents a popup menu item.
     * @class
     * @memberof CWSYSTEM
     */
    class CWPopupMenuItem {
        /**
         * Creates an instance of CWPopupMenuItem.
         * @constructor
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
     */
    CWPopupMenuItem.NORMAL = 0;
    /** Bulleted menu item type.
     * @constant {number}
     */
    CWPopupMenuItem.BULLETED = 1;
    /** Separator menu item type.
     * @constant {number}
     */
    CWPopupMenuItem.SEPARATOR = 2;
    CWSYSTEM.CWPopupMenuItem = CWPopupMenuItem;
    CWPopupMenuItem["__class"] = "CWSYSTEM.CWPopupMenuItem";
})(CWSYSTEM || (CWSYSTEM = {}));
