(function (CWSYSTEM) {
    /**
     * The alert manager is responsible for displaying messages to the user in a dedicated window.
     * It manages a queue of messages and displays them one at a time in a dedicated alert window.
     *
     * @property {Array} messageQueue - An array containing the messages to be displayed.
     *
     * @class
     * @since    1.0.0
     * @access   public
     *
     * @memberof CWSYSTEM
     * @requires CWSYSTEM.AlertWindow
     * @requires CWSYSTEM.CWColor
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class AlertManager {
        /**
         * Creates an instance of AlertManager.
         */
        constructor() {
            this.messageQueue = ([]);
        }

        /**
         * Initializes the message queue to an empty array and adds the provided message as the first item.
         * This method is intended to be called when a new message needs to be prominently displayed,
         * clearing any previous messages.
         *
         * @param {string} msg - The message to be added to the queue.
         */
        message(msg) {
            this.messageQueue = ([]);
            this.messageQueued(msg);
        }

        /**
         * Queue a message using the input parameter.
         *
         * @param {string} msg
         */
        messageQueued(msg) {
            this.messageQueue.push(msg);
            if (this.messageQueue.length === 1) {
                this.displayFirstMessageInQueue();
            }
        }

        /**
         * Creates a window and displays the first message from the queue.
         */
        displayFirstMessageInQueue() {
            if (this.messageQueue.length > 0) {
                const msg = this.messageQueue[0];
                AlertManager.alertWindow = new CWSYSTEM.AlertWindow(msg, this);
            } else {
                AlertManager.alertWindow = null;

            }
        }

        /**
         * Deletes the message from the queue then calls the function to display the first message from the queue.
         *
         * @requires displayFirstMessageInQueue
         */
        processContinue() {
            CWSYSTEM.CWSReference.gui.destroyWindow("ALE");
            this.messageQueue.shift();
            this.displayFirstMessageInQueue();
            if (AlertManager.alertWindow == null) {
                CWSYSTEM.Debug.println("No more messages.");
            }
        }
    }

    /**
     * Current alert window instance
     * @static
     * @type {CWSYSTEM.AlertWindow | null}
     */
    AlertManager.alertWindow = null;
    /**
     * Background color for the alert window
     * @static
     * @type {CWSYSTEM.CWColor | null}
     */
    AlertManager.backgroundColor = null;
    /**
     * Text color for the alert message
     * @static
     * @type {CWSYSTEM.CWColor | null}
     */
    AlertManager.textColor = null;
    CWSYSTEM.AlertManager = AlertManager;
    AlertManager["__class"] = "CWSYSTEM.AlertManager";
})(CWSYSTEM);