var dsector;
(function (dsector) {
    class TimedInstruction {
        constructor(time, parent, methodName) {
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
            this.methodName = methodName;
        }

        static addTimedInstruction(time, parent, methodName) {
            if (TimedInstruction.timedInstructions == null) {
                TimedInstruction.timedInstructions = ([]);
            }
            TimedInstruction.timedInstructions.push(new TimedInstruction(time, parent, methodName));
        }

        static executeInstructionsDue() {
            if (TimedInstruction.timedInstructions != null) {
                for (let i = 0; i < TimedInstruction.timedInstructions.length; ++i) {
                    const instruction = TimedInstruction.timedInstructions[i];
                    if (CWSYSTEM.Environment.currentTime() >= instruction.time) {
                        try {
                            const method = ((c, p) => {
                                if (c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function')
                                    return {owner: c, name: p, fn: c.prototype[p]};
                                else
                                    return null;
                            })(instruction.objectToExecuteMethod.constructor, instruction.methodName);
                            method.fn.apply(instruction.objectToExecuteMethod, [null]);
                        } catch (e) {
                            console.error("Problem in executeInstructionsDue(): " + e);
                        }
                        (a => {
                            let index = a.indexOf(instruction);
                            if (index >= 0) {
                                a.splice(index, 1);
                                return true;
                            } else {
                                return false;
                            }
                        })(TimedInstruction.timedInstructions);
                    }
                }
            }
        }
    }

    TimedInstruction.timedInstructions = null;
    dsector.TimedInstruction = TimedInstruction;
    TimedInstruction["__class"] = "dsector.TimedInstruction";
})(dsector || (dsector = {}));
