var CWSYSTEM;
(function (CWSYSTEM) {
    class CWPopupMenuItem {
        constructor(type, code, text, shortcutText, bulletStatus, InvokedFrom, bulletStatusByMethod) {
            if (((typeof type === 'number') || type === null) && ((typeof code === 'string') || code === null) && ((typeof text === 'string') || text === null) && ((typeof shortcutText === 'string') || shortcutText === null) && ((typeof bulletStatus === 'boolean') || bulletStatus === null) && ((InvokedFrom != null) || InvokedFrom === null) && ((bulletStatusByMethod != null && (bulletStatusByMethod instanceof Object)) || bulletStatusByMethod === null)) {
                let __args = arguments;
                if (this.code === undefined) {
                    this.code = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.__bulletStatus === undefined) {
                    this.__bulletStatus = false;
                }
                if (this.bulletStatusDeterminedByMethod === undefined) {
                    this.bulletStatusDeterminedByMethod = null;
                }
                if (this.objectThatMethodInvokedFrom === undefined) {
                    this.objectThatMethodInvokedFrom = null;
                }
                if (this.executeMethodUponSelection === undefined) {
                    this.executeMethodUponSelection = null;
                }
                if (this.objectToInvokeExecuteMethodFrom === undefined) {
                    this.objectToInvokeExecuteMethodFrom = null;
                }
                if (this.parametersForExecuteMethod === undefined) {
                    this.parametersForExecuteMethod = null;
                }
                this.type = type;
                this.code = code;
                this.text = text;
                this.shortcutText = shortcutText;
                this.__bulletStatus = bulletStatus;
                this.bulletStatusDeterminedByMethod = bulletStatusByMethod;
                this.objectThatMethodInvokedFrom = InvokedFrom;
            }
            else if (((typeof type === 'number') || type === null) && ((typeof code === 'string') || code === null) && ((typeof text === 'string') || text === null) && ((typeof shortcutText === 'string') || shortcutText === null) && bulletStatus === undefined && InvokedFrom === undefined && bulletStatusByMethod === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let bulletStatus = false;
                    let InvokedFrom = null;
                    let bulletStatusByMethod = null;
                    if (this.code === undefined) {
                        this.code = null;
                    }
                    if (this.text === undefined) {
                        this.text = null;
                    }
                    if (this.shortcutText === undefined) {
                        this.shortcutText = null;
                    }
                    if (this.type === undefined) {
                        this.type = 0;
                    }
                    if (this.generalPurposeObject === undefined) {
                        this.generalPurposeObject = null;
                    }
                    if (this.__bulletStatus === undefined) {
                        this.__bulletStatus = false;
                    }
                    if (this.bulletStatusDeterminedByMethod === undefined) {
                        this.bulletStatusDeterminedByMethod = null;
                    }
                    if (this.objectThatMethodInvokedFrom === undefined) {
                        this.objectThatMethodInvokedFrom = null;
                    }
                    if (this.executeMethodUponSelection === undefined) {
                        this.executeMethodUponSelection = null;
                    }
                    if (this.objectToInvokeExecuteMethodFrom === undefined) {
                        this.objectToInvokeExecuteMethodFrom = null;
                    }
                    if (this.parametersForExecuteMethod === undefined) {
                        this.parametersForExecuteMethod = null;
                    }
                    this.type = type;
                    this.code = code;
                    this.text = text;
                    this.shortcutText = shortcutText;
                    this.__bulletStatus = bulletStatus;
                    this.bulletStatusDeterminedByMethod = bulletStatusByMethod;
                    this.objectThatMethodInvokedFrom = InvokedFrom;
                }
                if (this.code === undefined) {
                    this.code = null;
                }
                if (this.text === undefined) {
                    this.text = null;
                }
                if (this.shortcutText === undefined) {
                    this.shortcutText = null;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.generalPurposeObject === undefined) {
                    this.generalPurposeObject = null;
                }
                if (this.__bulletStatus === undefined) {
                    this.__bulletStatus = false;
                }
                if (this.bulletStatusDeterminedByMethod === undefined) {
                    this.bulletStatusDeterminedByMethod = null;
                }
                if (this.objectThatMethodInvokedFrom === undefined) {
                    this.objectThatMethodInvokedFrom = null;
                }
                if (this.executeMethodUponSelection === undefined) {
                    this.executeMethodUponSelection = null;
                }
                if (this.objectToInvokeExecuteMethodFrom === undefined) {
                    this.objectToInvokeExecuteMethodFrom = null;
                }
                if (this.parametersForExecuteMethod === undefined) {
                    this.parametersForExecuteMethod = null;
                }
            }
            else
                throw new Error('invalid overload');
        }
        bulletStatus() {
            if (this.bulletStatusDeterminedByMethod == null) {
                return this.__bulletStatus;
            }
            else {
                let check;
                try {
                    check = this.bulletStatusDeterminedByMethod.fn.apply(this.objectThatMethodInvokedFrom, [null]);
                }
                catch (e) {
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
