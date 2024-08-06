import {CWSYSTEM} from '../CWS/CWSYSTEM.js';
import {dsector} from './dsector.js';

/**
 * Represents a timed instruction that will execute a specified method
 * on a parent object after a certain amount of time.
 *
 * @property  {number} time - The time after which the method should be executed.
 * @property {Object} objectToExecuteMethod - The object on which the method should be executed.
 * @property {string} methodName - The name of the method to be executed.
 *
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
export class TimedInstruction {
    /**
     * Creates an instance of TimedInstruction.
     *
     * @param {number} time - The time after which the method should be executed.
     * @param {Object} parent - The object on which the method should be executed.
     * @param {string} name - The name of the method to be executed.
     */
    constructor(time, parent, name) {
        if (this.time === undefined) {
            this.time = 0;
        }
        if (this.objectToExecuteMethod === undefined) {
            this.objectToExecuteMethod = null;
        }
        if (this.methodName === undefined) {
            this.methodName = null;
        }
        this.time = time;
        this.objectToExecuteMethod = parent;
        this.methodName = name;
    }

    /**
     * Adds a new timed instruction to the list of timed instructions.
     *
     * @param {number} time - The time after which the method should be executed.
     * @param {Object} parent - The object on which the method should be executed.
     * @param {string} name - The name of the method to be executed.
     */
    static addTimedInstruction(time, parent, name) {
        if (TimedInstruction.timedInstructions == null) {
            TimedInstruction.timedInstructions = ([]);
        }
        TimedInstruction.timedInstructions.push(new TimedInstruction(time, parent, name));
    }

    /**
     * Executes all instructions that are due to be executed.
     * Checks the current time against the time specified in each instruction
     * and executes the method if the time has been reached or exceeded.
     */
    static executeInstructionsDue() {
        if (TimedInstruction.timedInstructions != null) {
            let removeList = [];

            TimedInstruction.timedInstructions.forEach(ins => {
                if (CWSYSTEM.Environment.currentTime() >= ins.time) {
                    try {
                        const method = ((c, p) => {
                            if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                                return {owner: c, name: p, fn: c.prototype[p]};
                            else
                                return null;
                        })(ins.objectToExecuteMethod.constructor, ins.methodName);

                        if (method) {
                            method.fn.apply(ins.objectToExecuteMethod, [null]);
                        }
                    } catch (e) {
                        console.error("Problem in executeInstructionsDue(): " + e);
                    }

                    // Flag the instruction for removal
                    removeList.push(ins);
                }
            });

            // Remove flagged instructions
            TimedInstruction.timedInstructions = TimedInstruction.timedInstructions.filter(inst =>
                !removeList.includes(inst)
            );
        }
    }

    /**
     * The list of timed instructions.
     * @type {null}
     */
    static timedInstructions = null;
}