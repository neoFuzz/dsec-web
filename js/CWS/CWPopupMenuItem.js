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
        constructor(type, code, text, scTxt,
                    bltSts, invFrm, statFrmMthd) {
            this.initializeDefaultProperties();

            if (this.isFullParameterSet(...arguments)) {
                this.setFullParameters(type, code, text, scTxt, bltSts, invFrm, statFrmMthd);
            } else if (this.isShortParameterSet(...arguments)) {
                this.setShortParameters(type, code, text, scTxt);
            } else {
                throw new Error('Invalid parameters for MenuItem constructor');
            }
        }

        /**
         * Initializes the default properties of the CWPopupMenuItem instance.
         *
         * @private
         */
        initializeDefaultProperties() {
            this.type = 0;
            this.code = null;
            this.text = null;
            this.shortcutText = null;
            this.generalPurposeObject = null;
            this.__bulletStatus = false;
            this.bulletStatusDeterminedByMethod = null;
            this.objectThatMethodInvokedFrom = null;
            this.executeMethodUponSelection = null;
            this.objectToInvokeExecuteMethodFrom = null;
            this.parametersForExecuteMethod = null;
        }

        /**
         * Checks if the parameters match the expected types for the full parameter set.
         *
         * @private
         * @param {number} type - The type of the menu item.
         * @param {string} code - The code associated with the menu item.
         * @param {string} text - The display text of the menu item.
         * @param {string} shortcutText - The shortcut text for the menu item.
         * @param {boolean} bulletStatus - The bullet status of the menu item.
         * @param {Object} invokeFrom - The object from which the method is invoked.
         * @param {Object} statusFromMethod - The method to determine bullet status.
         * @returns {boolean} True if the parameters match the expected types, false otherwise.
         */
        isFullParameterSet(type, code, text, shortcutText, bulletStatus, invokeFrom, statusFromMethod) {
            return (
                typeof type === 'number' &&
                this.isValidStringOrNull(code) &&
                this.isValidStringOrNull(text) &&
                this.isValidStringOrNull(shortcutText) &&
                (typeof bulletStatus === 'boolean' || bulletStatus === null) &&
                (invokeFrom != null || invokeFrom === null) &&
                (statusFromMethod instanceof Object || statusFromMethod === null)
            );
        }

        /**
         * Checks if the parameters match the expected types for the short parameter set.
         *
         * @private
         * @param {number} type - The type of the menu item.
         * @param {string} code - The code associated with the menu item.
         * @param {string} text - The display text of the menu item.
         * @param {string} shortcutText - The shortcut text for the menu item.
         * @returns {boolean} True if the parameters match the expected types, false otherwise.
         */
        isShortParameterSet(type, code, text, shortcutText) {
            return (
                typeof type === 'number' &&
                this.isValidStringOrNull(code) &&
                this.isValidStringOrNull(text) &&
                this.isValidStringOrNull(shortcutText) &&
                arguments.length === 4
            );
        }

        /**
         * Checks if the value is a string or null.
         *
         * @private
         * @param {string|null} value - The value to check.
         * @returns {boolean} True if the value is a string or null, false otherwise.
         */
        isValidStringOrNull(value) {
            return typeof value === 'string' || value === null;
        }

        /**
         * Sets the full parameters for the menu item.
         *
         * @param {number} type - The type of the menu item.
         * @param {string|null} code - The code associated with the menu item.
         * @param {string|null} text - The display text of the menu item.
         * @param {string|null} shortcutText - The shortcut text for the menu item.
         * @param {boolean|null} bulletStatus - The bullet status of the menu item.
         * @param {Object|null} invokeFrom - The object from which the method is invoked.
         * @param {Object|null} statusFromMethod - The method to determine bullet status.
         */
        setFullParameters(type, code, text, shortcutText, bulletStatus, invokeFrom, statusFromMethod) {
            this.type = type;
            this.code = code;
            this.text = text;
            this.shortcutText = shortcutText;
            this.__bulletStatus = bulletStatus;
            this.objectThatMethodInvokedFrom = invokeFrom;
            this.bulletStatusDeterminedByMethod = statusFromMethod;
        }

        /**
         * Sets the short parameters for the menu item.
         *
         * @param {number} type - The type of the menu item.
         * @param {string|null} code - The code associated with the menu item.
         * @param {string|null} text - The display text of the menu item.
         * @param {string|null} shortcutText - The shortcut text for the menu item.
         * @throws {Error} Throws an error if the parameters do not match the expected types.
         */
        setShortParameters(type, code, text, shortcutText) {
            this.type = type;
            this.code = code;
            this.text = text;
            this.shortcutText = shortcutText;
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