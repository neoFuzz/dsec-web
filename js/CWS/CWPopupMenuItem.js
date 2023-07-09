var CWSYSTEM;
(function (CWSYSTEM) {
    class CWPopupMenuItem {
        constructor(type, code, text, shortcutText, bulletStatus, InvokedFrom, bulletStatusByMethod) {
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
                (typeof shortcutText === 'string' || shortcutText === null) &&
                (typeof bulletStatus === 'boolean' || bulletStatus === null) &&
                (InvokedFrom != null || InvokedFrom === null) &&
                (bulletStatusByMethod != null &&
                    bulletStatusByMethod instanceof Object || bulletStatusByMethod === null)) {
                this.type = type;
                this.code = code;
                this.text = text;
                this.shortcutText = shortcutText;
                this.__bulletStatus = bulletStatus;
                this.bulletStatusDeterminedByMethod = bulletStatusByMethod;
                this.objectThatMethodInvokedFrom = InvokedFrom;
            } else if (typeof type === 'number' && (typeof code === 'string' || code === null) &&
                (typeof text === 'string' || text === null) &&
                (typeof shortcutText === 'string' || shortcutText === null) &&
                bulletStatus === undefined && InvokedFrom === undefined && bulletStatusByMethod === undefined) {
                this.type = type;
                this.code = code;
                this.text = text;
                this.shortcutText = shortcutText;
            } else {
                throw new Error('Invalid overload');
            }
        }


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

    CWPopupMenuItem.NORMAL = 0;
    CWPopupMenuItem.BULLETED = 1;
    CWPopupMenuItem.SEPARATOR = 2;
    CWSYSTEM.CWPopupMenuItem = CWPopupMenuItem;
    CWPopupMenuItem["__class"] = "CWSYSTEM.CWPopupMenuItem";
})(CWSYSTEM || (CWSYSTEM = {}));
