var CWSYSTEM;
(function (CWSYSTEM) {
    /** AlertManager Class for managing alerts generated from the program. */
    class AlertManager {
        constructor() {
            this.messageQueue = ([]);
        }

        /** Erases the queue and puts `msg` in as the first message in the queue.
         * @param {string} msg
         */
        message(msg) {
            this.messageQueue = ([]);
            this.messageQueued(msg);
        }

        /** Queue a message using the input parameter.
         * @param {string} msg
         */
        messageQueued(msg) {
            this.messageQueue.push(msg);
            if (this.messageQueue.length === 1) {
                this.displayFirstMessageInQueue();
            }
        }

        /** Creates a window and displays the first message from the queue. */
        displayFirstMessageInQueue() {
            if (this.messageQueue.length > 0) {
                const msg = this.messageQueue[0];
                AlertManager.alertWindow = new CWSYSTEM.AlertWindow(msg, this);
            } else {
                AlertManager.alertWindow = null;

            }
        }

        /** Deletes the message from the queue then calls the function to display the first message from the queue.
         * @requires displayFirstMessageInQueue
         */
        processContinue() {
            CWSYSTEM.CWSReference.gui.destroyWindow("ALE");
            this.messageQueue.splice(0, 1)[0];
            this.displayFirstMessageInQueue();
            if (AlertManager.alertWindow == null) {
            }
        }
    }

    AlertManager.alertWindow = null;
    AlertManager.backgroundColor = null;
    AlertManager.textColor = null;
    CWSYSTEM.AlertManager = AlertManager;
    AlertManager["__class"] = "CWSYSTEM.AlertManager";
})(CWSYSTEM || (CWSYSTEM = {}));