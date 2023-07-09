var dsector;
(function (dsector) {
    class RobotSpecification {
        constructor(fileName) {
            if (((typeof fileName === 'string') || fileName === null)) {
                let __args = arguments;
                {
                    let __args = arguments;
                    if (this.type === undefined) {
                        this.type = 0;
                    }
                    if (this.filename === undefined) {
                        this.filename = null;
                    }
                    if (this.name === undefined) {
                        this.name = null;
                    }
                    if (this.description === undefined) {
                        this.description = null;
                    }
                    if (this.viewSensors === undefined) {
                        this.viewSensors = 0;
                    }
                    if (this.clock1Probability === undefined) {
                        this.clock1Probability = 0;
                    }
                    if (this.clock2Probability === undefined) {
                        this.clock2Probability = 0;
                    }
                    if (this.clock3Probability === undefined) {
                        this.clock3Probability = 0;
                    }
                    if (this.clock4Probability === undefined) {
                        this.clock4Probability = 0;
                    }
                    if (this.clock5Probability === undefined) {
                        this.clock5Probability = 0;
                    }
                    if (this.clock6Probability === undefined) {
                        this.clock6Probability = 0;
                    }
                    if (this.clock7Probability === undefined) {
                        this.clock7Probability = 0;
                    }
                    if (this.clock8Probability === undefined) {
                        this.clock8Probability = 0;
                    }
                    if (this.clock9Probability === undefined) {
                        this.clock9Probability = 0;
                    }
                    if (this.clock10Probability === undefined) {
                        this.clock10Probability = 0;
                    }
                    if (this.clock1Period === undefined) {
                        this.clock1Period = 0;
                    }
                    if (this.clock2Period === undefined) {
                        this.clock2Period = 0;
                    }
                    if (this.clock3Period === undefined) {
                        this.clock3Period = 0;
                    }
                    if (this.clock4Period === undefined) {
                        this.clock4Period = 0;
                    }
                    if (this.clock5Period === undefined) {
                        this.clock5Period = 0;
                    }
                    if (this.clock6Period === undefined) {
                        this.clock6Period = 0;
                    }
                    if (this.clock7Period === undefined) {
                        this.clock7Period = 0;
                    }
                    if (this.clock8Period === undefined) {
                        this.clock8Period = 0;
                    }
                    if (this.clock9Period === undefined) {
                        this.clock9Period = 0;
                    }
                    if (this.clock10Period === undefined) {
                        this.clock10Period = 0;
                    }
                    if (this.clock1Requirement1 === undefined) {
                        this.clock1Requirement1 = 0;
                    }
                    if (this.clock1Requirement2 === undefined) {
                        this.clock1Requirement2 = 0;
                    }
                    if (this.clock2Requirement1 === undefined) {
                        this.clock2Requirement1 = 0;
                    }
                    if (this.clock2Requirement2 === undefined) {
                        this.clock2Requirement2 = 0;
                    }
                    if (this.clock3Requirement1 === undefined) {
                        this.clock3Requirement1 = 0;
                    }
                    if (this.clock3Requirement2 === undefined) {
                        this.clock3Requirement2 = 0;
                    }
                    if (this.clock4Requirement1 === undefined) {
                        this.clock4Requirement1 = 0;
                    }
                    if (this.clock4Requirement2 === undefined) {
                        this.clock4Requirement2 = 0;
                    }
                    if (this.clock5Requirement1 === undefined) {
                        this.clock5Requirement1 = 0;
                    }
                    if (this.clock5Requirement2 === undefined) {
                        this.clock5Requirement2 = 0;
                    }
                    if (this.clock6Requirement1 === undefined) {
                        this.clock6Requirement1 = 0;
                    }
                    if (this.clock6Requirement2 === undefined) {
                        this.clock6Requirement2 = 0;
                    }
                    if (this.clock7Requirement1 === undefined) {
                        this.clock7Requirement1 = 0;
                    }
                    if (this.clock7Requirement2 === undefined) {
                        this.clock7Requirement2 = 0;
                    }
                    if (this.clock8Requirement1 === undefined) {
                        this.clock8Requirement1 = 0;
                    }
                    if (this.clock8Requirement2 === undefined) {
                        this.clock8Requirement2 = 0;
                    }
                    if (this.clock9Requirement1 === undefined) {
                        this.clock9Requirement1 = 0;
                    }
                    if (this.clock9Requirement2 === undefined) {
                        this.clock9Requirement2 = 0;
                    }
                    if (this.clock10Requirement1 === undefined) {
                        this.clock10Requirement1 = 0;
                    }
                    if (this.clock10Requirement2 === undefined) {
                        this.clock10Requirement2 = 0;
                    }
                    if (this.clock1Response1 === undefined) {
                        this.clock1Response1 = 0;
                    }
                    if (this.clock1Response2 === undefined) {
                        this.clock1Response2 = 0;
                    }
                    if (this.clock1Response3 === undefined) {
                        this.clock1Response3 = 0;
                    }
                    if (this.clock2Response1 === undefined) {
                        this.clock2Response1 = 0;
                    }
                    if (this.clock2Response2 === undefined) {
                        this.clock2Response2 = 0;
                    }
                    if (this.clock2Response3 === undefined) {
                        this.clock2Response3 = 0;
                    }
                    if (this.clock3Response1 === undefined) {
                        this.clock3Response1 = 0;
                    }
                    if (this.clock3Response2 === undefined) {
                        this.clock3Response2 = 0;
                    }
                    if (this.clock3Response3 === undefined) {
                        this.clock3Response3 = 0;
                    }
                    if (this.clock4Response1 === undefined) {
                        this.clock4Response1 = 0;
                    }
                    if (this.clock4Response2 === undefined) {
                        this.clock4Response2 = 0;
                    }
                    if (this.clock4Response3 === undefined) {
                        this.clock4Response3 = 0;
                    }
                    if (this.clock5Response1 === undefined) {
                        this.clock5Response1 = 0;
                    }
                    if (this.clock5Response2 === undefined) {
                        this.clock5Response2 = 0;
                    }
                    if (this.clock5Response3 === undefined) {
                        this.clock5Response3 = 0;
                    }
                    if (this.clock6Response1 === undefined) {
                        this.clock6Response1 = 0;
                    }
                    if (this.clock6Response2 === undefined) {
                        this.clock6Response2 = 0;
                    }
                    if (this.clock6Response3 === undefined) {
                        this.clock6Response3 = 0;
                    }
                    if (this.clock7Response1 === undefined) {
                        this.clock7Response1 = 0;
                    }
                    if (this.clock7Response2 === undefined) {
                        this.clock7Response2 = 0;
                    }
                    if (this.clock7Response3 === undefined) {
                        this.clock7Response3 = 0;
                    }
                    if (this.clock8Response1 === undefined) {
                        this.clock8Response1 = 0;
                    }
                    if (this.clock8Response2 === undefined) {
                        this.clock8Response2 = 0;
                    }
                    if (this.clock8Response3 === undefined) {
                        this.clock8Response3 = 0;
                    }
                    if (this.clock9Response1 === undefined) {
                        this.clock9Response1 = 0;
                    }
                    if (this.clock9Response2 === undefined) {
                        this.clock9Response2 = 0;
                    }
                    if (this.clock9Response3 === undefined) {
                        this.clock9Response3 = 0;
                    }
                    if (this.clock10Response1 === undefined) {
                        this.clock10Response1 = 0;
                    }
                    if (this.clock10Response2 === undefined) {
                        this.clock10Response2 = 0;
                    }
                    if (this.clock10Response3 === undefined) {
                        this.clock10Response3 = 0;
                    }
                    if (this.sensor1Angle === undefined) {
                        this.sensor1Angle = 0;
                    }
                    if (this.sensor2Angle === undefined) {
                        this.sensor2Angle = 0;
                    }
                    if (this.sensor3Angle === undefined) {
                        this.sensor3Angle = 0;
                    }
                    if (this.sensor4Angle === undefined) {
                        this.sensor4Angle = 0;
                    }
                    if (this.sensor5Angle === undefined) {
                        this.sensor5Angle = 0;
                    }
                    if (this.sensor6Angle === undefined) {
                        this.sensor6Angle = 0;
                    }
                    if (this.sensor7Angle === undefined) {
                        this.sensor7Angle = 0;
                    }
                    if (this.sensor8Angle === undefined) {
                        this.sensor8Angle = 0;
                    }
                    if (this.sensor9Angle === undefined) {
                        this.sensor9Angle = 0;
                    }
                    if (this.sensor10Angle === undefined) {
                        this.sensor10Angle = 0;
                    }
                    if (this.sensor11Angle === undefined) {
                        this.sensor11Angle = 0;
                    }
                    if (this.sensor12Angle === undefined) {
                        this.sensor12Angle = 0;
                    }
                    if (this.sensor13Angle === undefined) {
                        this.sensor13Angle = 0;
                    }
                    if (this.sensor14Angle === undefined) {
                        this.sensor14Angle = 0;
                    }
                    if (this.sensor15Angle === undefined) {
                        this.sensor15Angle = 0;
                    }
                    if (this.sensor16Angle === undefined) {
                        this.sensor16Angle = 0;
                    }
                    if (this.sensor1Length === undefined) {
                        this.sensor1Length = 0;
                    }
                    if (this.sensor2Length === undefined) {
                        this.sensor2Length = 0;
                    }
                    if (this.sensor3Length === undefined) {
                        this.sensor3Length = 0;
                    }
                    if (this.sensor4Length === undefined) {
                        this.sensor4Length = 0;
                    }
                    if (this.sensor5Length === undefined) {
                        this.sensor5Length = 0;
                    }
                    if (this.sensor6Length === undefined) {
                        this.sensor6Length = 0;
                    }
                    if (this.sensor7Length === undefined) {
                        this.sensor7Length = 0;
                    }
                    if (this.sensor8Length === undefined) {
                        this.sensor8Length = 0;
                    }
                    if (this.sensor9Length === undefined) {
                        this.sensor9Length = 0;
                    }
                    if (this.sensor10Length === undefined) {
                        this.sensor10Length = 0;
                    }
                    if (this.sensor11Length === undefined) {
                        this.sensor11Length = 0;
                    }
                    if (this.sensor12Length === undefined) {
                        this.sensor12Length = 0;
                    }
                    if (this.sensor13Length === undefined) {
                        this.sensor13Length = 0;
                    }
                    if (this.sensor14Length === undefined) {
                        this.sensor14Length = 0;
                    }
                    if (this.sensor15Length === undefined) {
                        this.sensor15Length = 0;
                    }
                    if (this.sensor16Length === undefined) {
                        this.sensor16Length = 0;
                    }
                    if (this.sensor1Width === undefined) {
                        this.sensor1Width = 0;
                    }
                    if (this.sensor2Width === undefined) {
                        this.sensor2Width = 0;
                    }
                    if (this.sensor3Width === undefined) {
                        this.sensor3Width = 0;
                    }
                    if (this.sensor4Width === undefined) {
                        this.sensor4Width = 0;
                    }
                    if (this.sensor5Width === undefined) {
                        this.sensor5Width = 0;
                    }
                    if (this.sensor6Width === undefined) {
                        this.sensor6Width = 0;
                    }
                    if (this.sensor7Width === undefined) {
                        this.sensor7Width = 0;
                    }
                    if (this.sensor8Width === undefined) {
                        this.sensor8Width = 0;
                    }
                    if (this.sensor9Width === undefined) {
                        this.sensor9Width = 0;
                    }
                    if (this.sensor10Width === undefined) {
                        this.sensor10Width = 0;
                    }
                    if (this.sensor11Width === undefined) {
                        this.sensor11Width = 0;
                    }
                    if (this.sensor12Width === undefined) {
                        this.sensor12Width = 0;
                    }
                    if (this.sensor13Width === undefined) {
                        this.sensor13Width = 0;
                    }
                    if (this.sensor14Width === undefined) {
                        this.sensor14Width = 0;
                    }
                    if (this.sensor15Width === undefined) {
                        this.sensor15Width = 0;
                    }
                    if (this.sensor16Width === undefined) {
                        this.sensor16Width = 0;
                    }
                    if (this.sensor1Probability === undefined) {
                        this.sensor1Probability = 0;
                    }
                    if (this.sensor2Probability === undefined) {
                        this.sensor2Probability = 0;
                    }
                    if (this.sensor3Probability === undefined) {
                        this.sensor3Probability = 0;
                    }
                    if (this.sensor4Probability === undefined) {
                        this.sensor4Probability = 0;
                    }
                    if (this.sensor5Probability === undefined) {
                        this.sensor5Probability = 0;
                    }
                    if (this.sensor6Probability === undefined) {
                        this.sensor6Probability = 0;
                    }
                    if (this.sensor7Probability === undefined) {
                        this.sensor7Probability = 0;
                    }
                    if (this.sensor8Probability === undefined) {
                        this.sensor8Probability = 0;
                    }
                    if (this.sensor9Probability === undefined) {
                        this.sensor9Probability = 0;
                    }
                    if (this.sensor10Probability === undefined) {
                        this.sensor10Probability = 0;
                    }
                    if (this.sensor11Probability === undefined) {
                        this.sensor11Probability = 0;
                    }
                    if (this.sensor12Probability === undefined) {
                        this.sensor12Probability = 0;
                    }
                    if (this.sensor13Probability === undefined) {
                        this.sensor13Probability = 0;
                    }
                    if (this.sensor14Probability === undefined) {
                        this.sensor14Probability = 0;
                    }
                    if (this.sensor15Probability === undefined) {
                        this.sensor15Probability = 0;
                    }
                    if (this.sensor16Probability === undefined) {
                        this.sensor16Probability = 0;
                    }
                    if (this.sensor1Period === undefined) {
                        this.sensor1Period = 0;
                    }
                    if (this.sensor2Period === undefined) {
                        this.sensor2Period = 0;
                    }
                    if (this.sensor3Period === undefined) {
                        this.sensor3Period = 0;
                    }
                    if (this.sensor4Period === undefined) {
                        this.sensor4Period = 0;
                    }
                    if (this.sensor5Period === undefined) {
                        this.sensor5Period = 0;
                    }
                    if (this.sensor6Period === undefined) {
                        this.sensor6Period = 0;
                    }
                    if (this.sensor7Period === undefined) {
                        this.sensor7Period = 0;
                    }
                    if (this.sensor8Period === undefined) {
                        this.sensor8Period = 0;
                    }
                    if (this.sensor9Period === undefined) {
                        this.sensor9Period = 0;
                    }
                    if (this.sensor10Period === undefined) {
                        this.sensor10Period = 0;
                    }
                    if (this.sensor11Period === undefined) {
                        this.sensor11Period = 0;
                    }
                    if (this.sensor12Period === undefined) {
                        this.sensor12Period = 0;
                    }
                    if (this.sensor13Period === undefined) {
                        this.sensor13Period = 0;
                    }
                    if (this.sensor14Period === undefined) {
                        this.sensor14Period = 0;
                    }
                    if (this.sensor15Period === undefined) {
                        this.sensor15Period = 0;
                    }
                    if (this.sensor16Period === undefined) {
                        this.sensor16Period = 0;
                    }
                    if (this.sensor1ParallelOffset === undefined) {
                        this.sensor1ParallelOffset = 0;
                    }
                    if (this.sensor2ParallelOffset === undefined) {
                        this.sensor2ParallelOffset = 0;
                    }
                    if (this.sensor3ParallelOffset === undefined) {
                        this.sensor3ParallelOffset = 0;
                    }
                    if (this.sensor4ParallelOffset === undefined) {
                        this.sensor4ParallelOffset = 0;
                    }
                    if (this.sensor5ParallelOffset === undefined) {
                        this.sensor5ParallelOffset = 0;
                    }
                    if (this.sensor6ParallelOffset === undefined) {
                        this.sensor6ParallelOffset = 0;
                    }
                    if (this.sensor7ParallelOffset === undefined) {
                        this.sensor7ParallelOffset = 0;
                    }
                    if (this.sensor8ParallelOffset === undefined) {
                        this.sensor8ParallelOffset = 0;
                    }
                    if (this.sensor9ParallelOffset === undefined) {
                        this.sensor9ParallelOffset = 0;
                    }
                    if (this.sensor10ParallelOffset === undefined) {
                        this.sensor10ParallelOffset = 0;
                    }
                    if (this.sensor11ParallelOffset === undefined) {
                        this.sensor11ParallelOffset = 0;
                    }
                    if (this.sensor12ParallelOffset === undefined) {
                        this.sensor12ParallelOffset = 0;
                    }
                    if (this.sensor13ParallelOffset === undefined) {
                        this.sensor13ParallelOffset = 0;
                    }
                    if (this.sensor14ParallelOffset === undefined) {
                        this.sensor14ParallelOffset = 0;
                    }
                    if (this.sensor15ParallelOffset === undefined) {
                        this.sensor15ParallelOffset = 0;
                    }
                    if (this.sensor16ParallelOffset === undefined) {
                        this.sensor16ParallelOffset = 0;
                    }
                    if (this.sensor1PerpendicularOffset === undefined) {
                        this.sensor1PerpendicularOffset = 0;
                    }
                    if (this.sensor2PerpendicularOffset === undefined) {
                        this.sensor2PerpendicularOffset = 0;
                    }
                    if (this.sensor3PerpendicularOffset === undefined) {
                        this.sensor3PerpendicularOffset = 0;
                    }
                    if (this.sensor4PerpendicularOffset === undefined) {
                        this.sensor4PerpendicularOffset = 0;
                    }
                    if (this.sensor5PerpendicularOffset === undefined) {
                        this.sensor5PerpendicularOffset = 0;
                    }
                    if (this.sensor6PerpendicularOffset === undefined) {
                        this.sensor6PerpendicularOffset = 0;
                    }
                    if (this.sensor7PerpendicularOffset === undefined) {
                        this.sensor7PerpendicularOffset = 0;
                    }
                    if (this.sensor8PerpendicularOffset === undefined) {
                        this.sensor8PerpendicularOffset = 0;
                    }
                    if (this.sensor9PerpendicularOffset === undefined) {
                        this.sensor9PerpendicularOffset = 0;
                    }
                    if (this.sensor10PerpendicularOffset === undefined) {
                        this.sensor10PerpendicularOffset = 0;
                    }
                    if (this.sensor11PerpendicularOffset === undefined) {
                        this.sensor11PerpendicularOffset = 0;
                    }
                    if (this.sensor12PerpendicularOffset === undefined) {
                        this.sensor12PerpendicularOffset = 0;
                    }
                    if (this.sensor13PerpendicularOffset === undefined) {
                        this.sensor13PerpendicularOffset = 0;
                    }
                    if (this.sensor14PerpendicularOffset === undefined) {
                        this.sensor14PerpendicularOffset = 0;
                    }
                    if (this.sensor15PerpendicularOffset === undefined) {
                        this.sensor15PerpendicularOffset = 0;
                    }
                    if (this.sensor16PerpendicularOffset === undefined) {
                        this.sensor16PerpendicularOffset = 0;
                    }
                    if (this.sensor1Condition1 === undefined) {
                        this.sensor1Condition1 = 0;
                    }
                    if (this.sensor1Condition2 === undefined) {
                        this.sensor1Condition2 = 0;
                    }
                    if (this.sensor1Condition3 === undefined) {
                        this.sensor1Condition3 = 0;
                    }
                    if (this.sensor2Condition1 === undefined) {
                        this.sensor2Condition1 = 0;
                    }
                    if (this.sensor2Condition2 === undefined) {
                        this.sensor2Condition2 = 0;
                    }
                    if (this.sensor2Condition3 === undefined) {
                        this.sensor2Condition3 = 0;
                    }
                    if (this.sensor3Condition1 === undefined) {
                        this.sensor3Condition1 = 0;
                    }
                    if (this.sensor3Condition2 === undefined) {
                        this.sensor3Condition2 = 0;
                    }
                    if (this.sensor3Condition3 === undefined) {
                        this.sensor3Condition3 = 0;
                    }
                    if (this.sensor4Condition1 === undefined) {
                        this.sensor4Condition1 = 0;
                    }
                    if (this.sensor4Condition2 === undefined) {
                        this.sensor4Condition2 = 0;
                    }
                    if (this.sensor4Condition3 === undefined) {
                        this.sensor4Condition3 = 0;
                    }
                    if (this.sensor5Condition1 === undefined) {
                        this.sensor5Condition1 = 0;
                    }
                    if (this.sensor5Condition2 === undefined) {
                        this.sensor5Condition2 = 0;
                    }
                    if (this.sensor5Condition3 === undefined) {
                        this.sensor5Condition3 = 0;
                    }
                    if (this.sensor6Condition1 === undefined) {
                        this.sensor6Condition1 = 0;
                    }
                    if (this.sensor6Condition2 === undefined) {
                        this.sensor6Condition2 = 0;
                    }
                    if (this.sensor6Condition3 === undefined) {
                        this.sensor6Condition3 = 0;
                    }
                    if (this.sensor7Condition1 === undefined) {
                        this.sensor7Condition1 = 0;
                    }
                    if (this.sensor7Condition2 === undefined) {
                        this.sensor7Condition2 = 0;
                    }
                    if (this.sensor7Condition3 === undefined) {
                        this.sensor7Condition3 = 0;
                    }
                    if (this.sensor8Condition1 === undefined) {
                        this.sensor8Condition1 = 0;
                    }
                    if (this.sensor8Condition2 === undefined) {
                        this.sensor8Condition2 = 0;
                    }
                    if (this.sensor8Condition3 === undefined) {
                        this.sensor8Condition3 = 0;
                    }
                    if (this.sensor9Condition1 === undefined) {
                        this.sensor9Condition1 = 0;
                    }
                    if (this.sensor9Condition2 === undefined) {
                        this.sensor9Condition2 = 0;
                    }
                    if (this.sensor9Condition3 === undefined) {
                        this.sensor9Condition3 = 0;
                    }
                    if (this.sensor10Condition1 === undefined) {
                        this.sensor10Condition1 = 0;
                    }
                    if (this.sensor10Condition2 === undefined) {
                        this.sensor10Condition2 = 0;
                    }
                    if (this.sensor10Condition3 === undefined) {
                        this.sensor10Condition3 = 0;
                    }
                    if (this.sensor11Condition1 === undefined) {
                        this.sensor11Condition1 = 0;
                    }
                    if (this.sensor11Condition2 === undefined) {
                        this.sensor11Condition2 = 0;
                    }
                    if (this.sensor11Condition3 === undefined) {
                        this.sensor11Condition3 = 0;
                    }
                    if (this.sensor12Condition1 === undefined) {
                        this.sensor12Condition1 = 0;
                    }
                    if (this.sensor12Condition2 === undefined) {
                        this.sensor12Condition2 = 0;
                    }
                    if (this.sensor12Condition3 === undefined) {
                        this.sensor12Condition3 = 0;
                    }
                    if (this.sensor13Condition1 === undefined) {
                        this.sensor13Condition1 = 0;
                    }
                    if (this.sensor13Condition2 === undefined) {
                        this.sensor13Condition2 = 0;
                    }
                    if (this.sensor13Condition3 === undefined) {
                        this.sensor13Condition3 = 0;
                    }
                    if (this.sensor14Condition1 === undefined) {
                        this.sensor14Condition1 = 0;
                    }
                    if (this.sensor14Condition2 === undefined) {
                        this.sensor14Condition2 = 0;
                    }
                    if (this.sensor14Condition3 === undefined) {
                        this.sensor14Condition3 = 0;
                    }
                    if (this.sensor15Condition1 === undefined) {
                        this.sensor15Condition1 = 0;
                    }
                    if (this.sensor15Condition2 === undefined) {
                        this.sensor15Condition2 = 0;
                    }
                    if (this.sensor15Condition3 === undefined) {
                        this.sensor15Condition3 = 0;
                    }
                    if (this.sensor16Condition1 === undefined) {
                        this.sensor16Condition1 = 0;
                    }
                    if (this.sensor16Condition2 === undefined) {
                        this.sensor16Condition2 = 0;
                    }
                    if (this.sensor16Condition3 === undefined) {
                        this.sensor16Condition3 = 0;
                    }
                    if (this.sensor1ResponseToWall1 === undefined) {
                        this.sensor1ResponseToWall1 = 0;
                    }
                    if (this.sensor1ResponseToWall2 === undefined) {
                        this.sensor1ResponseToWall2 = 0;
                    }
                    if (this.sensor1ResponseToWall3 === undefined) {
                        this.sensor1ResponseToWall3 = 0;
                    }
                    if (this.sensor1ResponseToTank1 === undefined) {
                        this.sensor1ResponseToTank1 = 0;
                    }
                    if (this.sensor1ResponseToTank2 === undefined) {
                        this.sensor1ResponseToTank2 = 0;
                    }
                    if (this.sensor1ResponseToTank3 === undefined) {
                        this.sensor1ResponseToTank3 = 0;
                    }
                    if (this.sensor1ResponseToMissile1 === undefined) {
                        this.sensor1ResponseToMissile1 = 0;
                    }
                    if (this.sensor1ResponseToMissile2 === undefined) {
                        this.sensor1ResponseToMissile2 = 0;
                    }
                    if (this.sensor1ResponseToMissile3 === undefined) {
                        this.sensor1ResponseToMissile3 = 0;
                    }
                    if (this.sensor2ResponseToWall1 === undefined) {
                        this.sensor2ResponseToWall1 = 0;
                    }
                    if (this.sensor2ResponseToWall2 === undefined) {
                        this.sensor2ResponseToWall2 = 0;
                    }
                    if (this.sensor2ResponseToWall3 === undefined) {
                        this.sensor2ResponseToWall3 = 0;
                    }
                    if (this.sensor2ResponseToTank1 === undefined) {
                        this.sensor2ResponseToTank1 = 0;
                    }
                    if (this.sensor2ResponseToTank2 === undefined) {
                        this.sensor2ResponseToTank2 = 0;
                    }
                    if (this.sensor2ResponseToTank3 === undefined) {
                        this.sensor2ResponseToTank3 = 0;
                    }
                    if (this.sensor2ResponseToMissile1 === undefined) {
                        this.sensor2ResponseToMissile1 = 0;
                    }
                    if (this.sensor2ResponseToMissile2 === undefined) {
                        this.sensor2ResponseToMissile2 = 0;
                    }
                    if (this.sensor2ResponseToMissile3 === undefined) {
                        this.sensor2ResponseToMissile3 = 0;
                    }
                    if (this.sensor3ResponseToWall1 === undefined) {
                        this.sensor3ResponseToWall1 = 0;
                    }
                    if (this.sensor3ResponseToWall2 === undefined) {
                        this.sensor3ResponseToWall2 = 0;
                    }
                    if (this.sensor3ResponseToWall3 === undefined) {
                        this.sensor3ResponseToWall3 = 0;
                    }
                    if (this.sensor3ResponseToTank1 === undefined) {
                        this.sensor3ResponseToTank1 = 0;
                    }
                    if (this.sensor3ResponseToTank2 === undefined) {
                        this.sensor3ResponseToTank2 = 0;
                    }
                    if (this.sensor3ResponseToTank3 === undefined) {
                        this.sensor3ResponseToTank3 = 0;
                    }
                    if (this.sensor3ResponseToMissile1 === undefined) {
                        this.sensor3ResponseToMissile1 = 0;
                    }
                    if (this.sensor3ResponseToMissile2 === undefined) {
                        this.sensor3ResponseToMissile2 = 0;
                    }
                    if (this.sensor3ResponseToMissile3 === undefined) {
                        this.sensor3ResponseToMissile3 = 0;
                    }
                    if (this.sensor4ResponseToWall1 === undefined) {
                        this.sensor4ResponseToWall1 = 0;
                    }
                    if (this.sensor4ResponseToWall2 === undefined) {
                        this.sensor4ResponseToWall2 = 0;
                    }
                    if (this.sensor4ResponseToWall3 === undefined) {
                        this.sensor4ResponseToWall3 = 0;
                    }
                    if (this.sensor4ResponseToTank1 === undefined) {
                        this.sensor4ResponseToTank1 = 0;
                    }
                    if (this.sensor4ResponseToTank2 === undefined) {
                        this.sensor4ResponseToTank2 = 0;
                    }
                    if (this.sensor4ResponseToTank3 === undefined) {
                        this.sensor4ResponseToTank3 = 0;
                    }
                    if (this.sensor4ResponseToMissile1 === undefined) {
                        this.sensor4ResponseToMissile1 = 0;
                    }
                    if (this.sensor4ResponseToMissile2 === undefined) {
                        this.sensor4ResponseToMissile2 = 0;
                    }
                    if (this.sensor4ResponseToMissile3 === undefined) {
                        this.sensor4ResponseToMissile3 = 0;
                    }
                    if (this.sensor5ResponseToWall1 === undefined) {
                        this.sensor5ResponseToWall1 = 0;
                    }
                    if (this.sensor5ResponseToWall2 === undefined) {
                        this.sensor5ResponseToWall2 = 0;
                    }
                    if (this.sensor5ResponseToWall3 === undefined) {
                        this.sensor5ResponseToWall3 = 0;
                    }
                    if (this.sensor5ResponseToTank1 === undefined) {
                        this.sensor5ResponseToTank1 = 0;
                    }
                    if (this.sensor5ResponseToTank2 === undefined) {
                        this.sensor5ResponseToTank2 = 0;
                    }
                    if (this.sensor5ResponseToTank3 === undefined) {
                        this.sensor5ResponseToTank3 = 0;
                    }
                    if (this.sensor5ResponseToMissile1 === undefined) {
                        this.sensor5ResponseToMissile1 = 0;
                    }
                    if (this.sensor5ResponseToMissile2 === undefined) {
                        this.sensor5ResponseToMissile2 = 0;
                    }
                    if (this.sensor5ResponseToMissile3 === undefined) {
                        this.sensor5ResponseToMissile3 = 0;
                    }
                    if (this.sensor6ResponseToWall1 === undefined) {
                        this.sensor6ResponseToWall1 = 0;
                    }
                    if (this.sensor6ResponseToWall2 === undefined) {
                        this.sensor6ResponseToWall2 = 0;
                    }
                    if (this.sensor6ResponseToWall3 === undefined) {
                        this.sensor6ResponseToWall3 = 0;
                    }
                    if (this.sensor6ResponseToTank1 === undefined) {
                        this.sensor6ResponseToTank1 = 0;
                    }
                    if (this.sensor6ResponseToTank2 === undefined) {
                        this.sensor6ResponseToTank2 = 0;
                    }
                    if (this.sensor6ResponseToTank3 === undefined) {
                        this.sensor6ResponseToTank3 = 0;
                    }
                    if (this.sensor6ResponseToMissile1 === undefined) {
                        this.sensor6ResponseToMissile1 = 0;
                    }
                    if (this.sensor6ResponseToMissile2 === undefined) {
                        this.sensor6ResponseToMissile2 = 0;
                    }
                    if (this.sensor6ResponseToMissile3 === undefined) {
                        this.sensor6ResponseToMissile3 = 0;
                    }
                    if (this.sensor7ResponseToWall1 === undefined) {
                        this.sensor7ResponseToWall1 = 0;
                    }
                    if (this.sensor7ResponseToWall2 === undefined) {
                        this.sensor7ResponseToWall2 = 0;
                    }
                    if (this.sensor7ResponseToWall3 === undefined) {
                        this.sensor7ResponseToWall3 = 0;
                    }
                    if (this.sensor7ResponseToTank1 === undefined) {
                        this.sensor7ResponseToTank1 = 0;
                    }
                    if (this.sensor7ResponseToTank2 === undefined) {
                        this.sensor7ResponseToTank2 = 0;
                    }
                    if (this.sensor7ResponseToTank3 === undefined) {
                        this.sensor7ResponseToTank3 = 0;
                    }
                    if (this.sensor7ResponseToMissile1 === undefined) {
                        this.sensor7ResponseToMissile1 = 0;
                    }
                    if (this.sensor7ResponseToMissile2 === undefined) {
                        this.sensor7ResponseToMissile2 = 0;
                    }
                    if (this.sensor7ResponseToMissile3 === undefined) {
                        this.sensor7ResponseToMissile3 = 0;
                    }
                    if (this.sensor8ResponseToWall1 === undefined) {
                        this.sensor8ResponseToWall1 = 0;
                    }
                    if (this.sensor8ResponseToWall2 === undefined) {
                        this.sensor8ResponseToWall2 = 0;
                    }
                    if (this.sensor8ResponseToWall3 === undefined) {
                        this.sensor8ResponseToWall3 = 0;
                    }
                    if (this.sensor8ResponseToTank1 === undefined) {
                        this.sensor8ResponseToTank1 = 0;
                    }
                    if (this.sensor8ResponseToTank2 === undefined) {
                        this.sensor8ResponseToTank2 = 0;
                    }
                    if (this.sensor8ResponseToTank3 === undefined) {
                        this.sensor8ResponseToTank3 = 0;
                    }
                    if (this.sensor8ResponseToMissile1 === undefined) {
                        this.sensor8ResponseToMissile1 = 0;
                    }
                    if (this.sensor8ResponseToMissile2 === undefined) {
                        this.sensor8ResponseToMissile2 = 0;
                    }
                    if (this.sensor8ResponseToMissile3 === undefined) {
                        this.sensor8ResponseToMissile3 = 0;
                    }
                    if (this.sensor9ResponseToWall1 === undefined) {
                        this.sensor9ResponseToWall1 = 0;
                    }
                    if (this.sensor9ResponseToWall2 === undefined) {
                        this.sensor9ResponseToWall2 = 0;
                    }
                    if (this.sensor9ResponseToWall3 === undefined) {
                        this.sensor9ResponseToWall3 = 0;
                    }
                    if (this.sensor9ResponseToTank1 === undefined) {
                        this.sensor9ResponseToTank1 = 0;
                    }
                    if (this.sensor9ResponseToTank2 === undefined) {
                        this.sensor9ResponseToTank2 = 0;
                    }
                    if (this.sensor9ResponseToTank3 === undefined) {
                        this.sensor9ResponseToTank3 = 0;
                    }
                    if (this.sensor9ResponseToMissile1 === undefined) {
                        this.sensor9ResponseToMissile1 = 0;
                    }
                    if (this.sensor9ResponseToMissile2 === undefined) {
                        this.sensor9ResponseToMissile2 = 0;
                    }
                    if (this.sensor9ResponseToMissile3 === undefined) {
                        this.sensor9ResponseToMissile3 = 0;
                    }
                    if (this.sensor10ResponseToWall1 === undefined) {
                        this.sensor10ResponseToWall1 = 0;
                    }
                    if (this.sensor10ResponseToWall2 === undefined) {
                        this.sensor10ResponseToWall2 = 0;
                    }
                    if (this.sensor10ResponseToWall3 === undefined) {
                        this.sensor10ResponseToWall3 = 0;
                    }
                    if (this.sensor10ResponseToTank1 === undefined) {
                        this.sensor10ResponseToTank1 = 0;
                    }
                    if (this.sensor10ResponseToTank2 === undefined) {
                        this.sensor10ResponseToTank2 = 0;
                    }
                    if (this.sensor10ResponseToTank3 === undefined) {
                        this.sensor10ResponseToTank3 = 0;
                    }
                    if (this.sensor10ResponseToMissile1 === undefined) {
                        this.sensor10ResponseToMissile1 = 0;
                    }
                    if (this.sensor10ResponseToMissile2 === undefined) {
                        this.sensor10ResponseToMissile2 = 0;
                    }
                    if (this.sensor10ResponseToMissile3 === undefined) {
                        this.sensor10ResponseToMissile3 = 0;
                    }
                    if (this.sensor11ResponseToWall1 === undefined) {
                        this.sensor11ResponseToWall1 = 0;
                    }
                    if (this.sensor11ResponseToWall2 === undefined) {
                        this.sensor11ResponseToWall2 = 0;
                    }
                    if (this.sensor11ResponseToWall3 === undefined) {
                        this.sensor11ResponseToWall3 = 0;
                    }
                    if (this.sensor11ResponseToTank1 === undefined) {
                        this.sensor11ResponseToTank1 = 0;
                    }
                    if (this.sensor11ResponseToTank2 === undefined) {
                        this.sensor11ResponseToTank2 = 0;
                    }
                    if (this.sensor11ResponseToTank3 === undefined) {
                        this.sensor11ResponseToTank3 = 0;
                    }
                    if (this.sensor11ResponseToMissile1 === undefined) {
                        this.sensor11ResponseToMissile1 = 0;
                    }
                    if (this.sensor11ResponseToMissile2 === undefined) {
                        this.sensor11ResponseToMissile2 = 0;
                    }
                    if (this.sensor11ResponseToMissile3 === undefined) {
                        this.sensor11ResponseToMissile3 = 0;
                    }
                    if (this.sensor12ResponseToWall1 === undefined) {
                        this.sensor12ResponseToWall1 = 0;
                    }
                    if (this.sensor12ResponseToWall2 === undefined) {
                        this.sensor12ResponseToWall2 = 0;
                    }
                    if (this.sensor12ResponseToWall3 === undefined) {
                        this.sensor12ResponseToWall3 = 0;
                    }
                    if (this.sensor12ResponseToTank1 === undefined) {
                        this.sensor12ResponseToTank1 = 0;
                    }
                    if (this.sensor12ResponseToTank2 === undefined) {
                        this.sensor12ResponseToTank2 = 0;
                    }
                    if (this.sensor12ResponseToTank3 === undefined) {
                        this.sensor12ResponseToTank3 = 0;
                    }
                    if (this.sensor12ResponseToMissile1 === undefined) {
                        this.sensor12ResponseToMissile1 = 0;
                    }
                    if (this.sensor12ResponseToMissile2 === undefined) {
                        this.sensor12ResponseToMissile2 = 0;
                    }
                    if (this.sensor12ResponseToMissile3 === undefined) {
                        this.sensor12ResponseToMissile3 = 0;
                    }
                    if (this.sensor13ResponseToWall1 === undefined) {
                        this.sensor13ResponseToWall1 = 0;
                    }
                    if (this.sensor13ResponseToWall2 === undefined) {
                        this.sensor13ResponseToWall2 = 0;
                    }
                    if (this.sensor13ResponseToWall3 === undefined) {
                        this.sensor13ResponseToWall3 = 0;
                    }
                    if (this.sensor13ResponseToTank1 === undefined) {
                        this.sensor13ResponseToTank1 = 0;
                    }
                    if (this.sensor13ResponseToTank2 === undefined) {
                        this.sensor13ResponseToTank2 = 0;
                    }
                    if (this.sensor13ResponseToTank3 === undefined) {
                        this.sensor13ResponseToTank3 = 0;
                    }
                    if (this.sensor13ResponseToMissile1 === undefined) {
                        this.sensor13ResponseToMissile1 = 0;
                    }
                    if (this.sensor13ResponseToMissile2 === undefined) {
                        this.sensor13ResponseToMissile2 = 0;
                    }
                    if (this.sensor13ResponseToMissile3 === undefined) {
                        this.sensor13ResponseToMissile3 = 0;
                    }
                    if (this.sensor14ResponseToWall1 === undefined) {
                        this.sensor14ResponseToWall1 = 0;
                    }
                    if (this.sensor14ResponseToWall2 === undefined) {
                        this.sensor14ResponseToWall2 = 0;
                    }
                    if (this.sensor14ResponseToWall3 === undefined) {
                        this.sensor14ResponseToWall3 = 0;
                    }
                    if (this.sensor14ResponseToTank1 === undefined) {
                        this.sensor14ResponseToTank1 = 0;
                    }
                    if (this.sensor14ResponseToTank2 === undefined) {
                        this.sensor14ResponseToTank2 = 0;
                    }
                    if (this.sensor14ResponseToTank3 === undefined) {
                        this.sensor14ResponseToTank3 = 0;
                    }
                    if (this.sensor14ResponseToMissile1 === undefined) {
                        this.sensor14ResponseToMissile1 = 0;
                    }
                    if (this.sensor14ResponseToMissile2 === undefined) {
                        this.sensor14ResponseToMissile2 = 0;
                    }
                    if (this.sensor14ResponseToMissile3 === undefined) {
                        this.sensor14ResponseToMissile3 = 0;
                    }
                    if (this.sensor15ResponseToWall1 === undefined) {
                        this.sensor15ResponseToWall1 = 0;
                    }
                    if (this.sensor15ResponseToWall2 === undefined) {
                        this.sensor15ResponseToWall2 = 0;
                    }
                    if (this.sensor15ResponseToWall3 === undefined) {
                        this.sensor15ResponseToWall3 = 0;
                    }
                    if (this.sensor15ResponseToTank1 === undefined) {
                        this.sensor15ResponseToTank1 = 0;
                    }
                    if (this.sensor15ResponseToTank2 === undefined) {
                        this.sensor15ResponseToTank2 = 0;
                    }
                    if (this.sensor15ResponseToTank3 === undefined) {
                        this.sensor15ResponseToTank3 = 0;
                    }
                    if (this.sensor15ResponseToMissile1 === undefined) {
                        this.sensor15ResponseToMissile1 = 0;
                    }
                    if (this.sensor15ResponseToMissile2 === undefined) {
                        this.sensor15ResponseToMissile2 = 0;
                    }
                    if (this.sensor15ResponseToMissile3 === undefined) {
                        this.sensor15ResponseToMissile3 = 0;
                    }
                    if (this.sensor16ResponseToWall1 === undefined) {
                        this.sensor16ResponseToWall1 = 0;
                    }
                    if (this.sensor16ResponseToWall2 === undefined) {
                        this.sensor16ResponseToWall2 = 0;
                    }
                    if (this.sensor16ResponseToWall3 === undefined) {
                        this.sensor16ResponseToWall3 = 0;
                    }
                    if (this.sensor16ResponseToTank1 === undefined) {
                        this.sensor16ResponseToTank1 = 0;
                    }
                    if (this.sensor16ResponseToTank2 === undefined) {
                        this.sensor16ResponseToTank2 = 0;
                    }
                    if (this.sensor16ResponseToTank3 === undefined) {
                        this.sensor16ResponseToTank3 = 0;
                    }
                    if (this.sensor16ResponseToMissile1 === undefined) {
                        this.sensor16ResponseToMissile1 = 0;
                    }
                    if (this.sensor16ResponseToMissile2 === undefined) {
                        this.sensor16ResponseToMissile2 = 0;
                    }
                    if (this.sensor16ResponseToMissile3 === undefined) {
                        this.sensor16ResponseToMissile3 = 0;
                    }
                    if (this.responseToMissileHit1 === undefined) {
                        this.responseToMissileHit1 = 0;
                    }
                    if (this.responseToMissileHit2 === undefined) {
                        this.responseToMissileHit2 = 0;
                    }
                    if (this.responseToMissileHit3 === undefined) {
                        this.responseToMissileHit3 = 0;
                    }
                    if (this.responseToFacingTarget1 === undefined) {
                        this.responseToFacingTarget1 = 0;
                    }
                    if (this.responseToFacingTarget2 === undefined) {
                        this.responseToFacingTarget2 = 0;
                    }
                    if (this.responseToFacingTarget3 === undefined) {
                        this.responseToFacingTarget3 = 0;
                    }
                    if (this.weaponStrategyFavourite1 === undefined) {
                        this.weaponStrategyFavourite1 = 0;
                    }
                    if (this.weaponStrategySecondFavourite1 === undefined) {
                        this.weaponStrategySecondFavourite1 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite1 === undefined) {
                        this.weaponStrategyThirdFavourite1 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite1 === undefined) {
                        this.weaponStrategyFourthFavourite1 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite1 === undefined) {
                        this.weaponStrategyFifthFavourite1 = 0;
                    }
                    if (this.weaponStrategyFavourite2 === undefined) {
                        this.weaponStrategyFavourite2 = 0;
                    }
                    if (this.weaponStrategySecondFavourite2 === undefined) {
                        this.weaponStrategySecondFavourite2 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite2 === undefined) {
                        this.weaponStrategyThirdFavourite2 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite2 === undefined) {
                        this.weaponStrategyFourthFavourite2 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite2 === undefined) {
                        this.weaponStrategyFifthFavourite2 = 0;
                    }
                    if (this.weaponStrategyFavourite3 === undefined) {
                        this.weaponStrategyFavourite3 = 0;
                    }
                    if (this.weaponStrategySecondFavourite3 === undefined) {
                        this.weaponStrategySecondFavourite3 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite3 === undefined) {
                        this.weaponStrategyThirdFavourite3 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite3 === undefined) {
                        this.weaponStrategyFourthFavourite3 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite3 === undefined) {
                        this.weaponStrategyFifthFavourite3 = 0;
                    }
                    if (this.weaponStrategyFavourite4 === undefined) {
                        this.weaponStrategyFavourite4 = 0;
                    }
                    if (this.weaponStrategySecondFavourite4 === undefined) {
                        this.weaponStrategySecondFavourite4 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite4 === undefined) {
                        this.weaponStrategyThirdFavourite4 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite4 === undefined) {
                        this.weaponStrategyFourthFavourite4 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite4 === undefined) {
                        this.weaponStrategyFifthFavourite4 = 0;
                    }
                    if (this.weaponStrategyFavourite5 === undefined) {
                        this.weaponStrategyFavourite5 = 0;
                    }
                    if (this.weaponStrategySecondFavourite5 === undefined) {
                        this.weaponStrategySecondFavourite5 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite5 === undefined) {
                        this.weaponStrategyThirdFavourite5 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite5 === undefined) {
                        this.weaponStrategyFourthFavourite5 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite5 === undefined) {
                        this.weaponStrategyFifthFavourite5 = 0;
                    }
                    if (this.weaponStrategyFavourite6 === undefined) {
                        this.weaponStrategyFavourite6 = 0;
                    }
                    if (this.weaponStrategySecondFavourite6 === undefined) {
                        this.weaponStrategySecondFavourite6 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite6 === undefined) {
                        this.weaponStrategyThirdFavourite6 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite6 === undefined) {
                        this.weaponStrategyFourthFavourite6 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite6 === undefined) {
                        this.weaponStrategyFifthFavourite6 = 0;
                    }
                    if (this.weaponStrategyFavourite7 === undefined) {
                        this.weaponStrategyFavourite7 = 0;
                    }
                    if (this.weaponStrategySecondFavourite7 === undefined) {
                        this.weaponStrategySecondFavourite7 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite7 === undefined) {
                        this.weaponStrategyThirdFavourite7 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite7 === undefined) {
                        this.weaponStrategyFourthFavourite7 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite7 === undefined) {
                        this.weaponStrategyFifthFavourite7 = 0;
                    }
                    if (this.weaponStrategyFavourite8 === undefined) {
                        this.weaponStrategyFavourite8 = 0;
                    }
                    if (this.weaponStrategySecondFavourite8 === undefined) {
                        this.weaponStrategySecondFavourite8 = 0;
                    }
                    if (this.weaponStrategyThirdFavourite8 === undefined) {
                        this.weaponStrategyThirdFavourite8 = 0;
                    }
                    if (this.weaponStrategyFourthFavourite8 === undefined) {
                        this.weaponStrategyFourthFavourite8 = 0;
                    }
                    if (this.weaponStrategyFifthFavourite8 === undefined) {
                        this.weaponStrategyFifthFavourite8 = 0;
                    }
                    if (this.weaponFuelRatio === undefined) {
                        this.weaponFuelRatio = 0;
                    }
                    if (this.shoppingStrategyAction1 === undefined) {
                        this.shoppingStrategyAction1 = 0;
                    }
                    if (this.shoppingStrategyCondition1 === undefined) {
                        this.shoppingStrategyCondition1 = 0;
                    }
                    if (this.shoppingStrategyAction2 === undefined) {
                        this.shoppingStrategyAction2 = 0;
                    }
                    if (this.shoppingStrategyCondition2 === undefined) {
                        this.shoppingStrategyCondition2 = 0;
                    }
                    if (this.shoppingStrategyAction3 === undefined) {
                        this.shoppingStrategyAction3 = 0;
                    }
                    if (this.shoppingStrategyCondition3 === undefined) {
                        this.shoppingStrategyCondition3 = 0;
                    }
                    if (this.shoppingStrategyAction4 === undefined) {
                        this.shoppingStrategyAction4 = 0;
                    }
                    if (this.shoppingStrategyCondition4 === undefined) {
                        this.shoppingStrategyCondition4 = 0;
                    }
                    if (this.shoppingStrategyAction5 === undefined) {
                        this.shoppingStrategyAction5 = 0;
                    }
                    if (this.shoppingStrategyCondition5 === undefined) {
                        this.shoppingStrategyCondition5 = 0;
                    }
                    if (this.shoppingStrategyAction6 === undefined) {
                        this.shoppingStrategyAction6 = 0;
                    }
                    if (this.shoppingStrategyCondition6 === undefined) {
                        this.shoppingStrategyCondition6 = 0;
                    }
                    if (this.shoppingStrategyAction7 === undefined) {
                        this.shoppingStrategyAction7 = 0;
                    }
                    if (this.shoppingStrategyCondition7 === undefined) {
                        this.shoppingStrategyCondition7 = 0;
                    }
                    if (this.shoppingStrategyAction8 === undefined) {
                        this.shoppingStrategyAction8 = 0;
                    }
                    if (this.shoppingStrategyCondition8 === undefined) {
                        this.shoppingStrategyCondition8 = 0;
                    }
                    if (this.shoppingStrategyAction9 === undefined) {
                        this.shoppingStrategyAction9 = 0;
                    }
                    if (this.shoppingStrategyCondition9 === undefined) {
                        this.shoppingStrategyCondition9 = 0;
                    }
                    if (this.shoppingStrategyAction10 === undefined) {
                        this.shoppingStrategyAction10 = 0;
                    }
                    if (this.shoppingStrategyCondition10 === undefined) {
                        this.shoppingStrategyCondition10 = 0;
                    }
                    if (this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced === undefined) {
                        this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = 0;
                    }
                    if (this.shoppingStrategyMaximumFireUnitsThatBePurchased === undefined) {
                        this.shoppingStrategyMaximumFireUnitsThatBePurchased = 0;
                    }
                    if (this.timeOfLastClock1Tick === undefined) {
                        this.timeOfLastClock1Tick = 0;
                    }
                    if (this.timeOfLastClock2Tick === undefined) {
                        this.timeOfLastClock2Tick = 0;
                    }
                    if (this.timeOfLastClock3Tick === undefined) {
                        this.timeOfLastClock3Tick = 0;
                    }
                    if (this.timeOfLastClock4Tick === undefined) {
                        this.timeOfLastClock4Tick = 0;
                    }
                    if (this.timeOfLastClock5Tick === undefined) {
                        this.timeOfLastClock5Tick = 0;
                    }
                    if (this.timeOfLastClock6Tick === undefined) {
                        this.timeOfLastClock6Tick = 0;
                    }
                    if (this.timeOfLastClock7Tick === undefined) {
                        this.timeOfLastClock7Tick = 0;
                    }
                    if (this.timeOfLastClock8Tick === undefined) {
                        this.timeOfLastClock8Tick = 0;
                    }
                    if (this.timeOfLastClock9Tick === undefined) {
                        this.timeOfLastClock9Tick = 0;
                    }
                    if (this.timeOfLastClock10Tick === undefined) {
                        this.timeOfLastClock10Tick = 0;
                    }
                    if (this.timeOfLastSensor1Tick === undefined) {
                        this.timeOfLastSensor1Tick = 0;
                    }
                    if (this.timeOfLastSensor2Tick === undefined) {
                        this.timeOfLastSensor2Tick = 0;
                    }
                    if (this.timeOfLastSensor3Tick === undefined) {
                        this.timeOfLastSensor3Tick = 0;
                    }
                    if (this.timeOfLastSensor4Tick === undefined) {
                        this.timeOfLastSensor4Tick = 0;
                    }
                    if (this.timeOfLastSensor5Tick === undefined) {
                        this.timeOfLastSensor5Tick = 0;
                    }
                    if (this.timeOfLastSensor6Tick === undefined) {
                        this.timeOfLastSensor6Tick = 0;
                    }
                    if (this.timeOfLastSensor7Tick === undefined) {
                        this.timeOfLastSensor7Tick = 0;
                    }
                    if (this.timeOfLastSensor8Tick === undefined) {
                        this.timeOfLastSensor8Tick = 0;
                    }
                    if (this.timeOfLastSensor9Tick === undefined) {
                        this.timeOfLastSensor9Tick = 0;
                    }
                    if (this.timeOfLastSensor10Tick === undefined) {
                        this.timeOfLastSensor10Tick = 0;
                    }
                    if (this.timeOfLastSensor11Tick === undefined) {
                        this.timeOfLastSensor11Tick = 0;
                    }
                    if (this.timeOfLastSensor12Tick === undefined) {
                        this.timeOfLastSensor12Tick = 0;
                    }
                    if (this.timeOfLastSensor13Tick === undefined) {
                        this.timeOfLastSensor13Tick = 0;
                    }
                    if (this.timeOfLastSensor14Tick === undefined) {
                        this.timeOfLastSensor14Tick = 0;
                    }
                    if (this.timeOfLastSensor15Tick === undefined) {
                        this.timeOfLastSensor15Tick = 0;
                    }
                    if (this.timeOfLastSensor16Tick === undefined) {
                        this.timeOfLastSensor16Tick = 0;
                    }
                    this.clock1Probability = 0;
                    this.clock2Probability = 0;
                    this.clock3Probability = 0;
                    this.clock4Probability = 0;
                    this.clock5Probability = 0;
                    this.clock6Probability = 0;
                    this.clock7Probability = 0;
                    this.clock8Probability = 0;
                    this.clock9Probability = 0;
                    this.clock10Probability = 0;
                    this.clock1Period = 0;
                    this.clock2Period = 0;
                    this.clock3Period = 0;
                    this.clock4Period = 0;
                    this.clock5Period = 0;
                    this.clock6Period = 0;
                    this.clock7Period = 0;
                    this.clock8Period = 0;
                    this.clock9Period = 0;
                    this.clock10Period = 0;
                    this.clock1Requirement1 = 167;
                    this.clock1Requirement2 = 167;
                    this.clock2Requirement1 = 167;
                    this.clock2Requirement2 = 167;
                    this.clock3Requirement1 = 167;
                    this.clock3Requirement2 = 167;
                    this.clock4Requirement1 = 167;
                    this.clock4Requirement2 = 167;
                    this.clock5Requirement1 = 167;
                    this.clock5Requirement2 = 167;
                    this.clock6Requirement1 = 167;
                    this.clock6Requirement2 = 167;
                    this.clock7Requirement1 = 167;
                    this.clock7Requirement2 = 167;
                    this.clock8Requirement1 = 167;
                    this.clock8Requirement2 = 167;
                    this.clock9Requirement1 = 167;
                    this.clock9Requirement2 = 167;
                    this.clock10Requirement1 = 167;
                    this.clock10Requirement2 = 167;
                    this.clock1Response1 = RobotSpecification.NO_ACTION;
                    this.clock1Response2 = 100;
                    this.clock1Response3 = 100;
                    this.clock2Response1 = 100;
                    this.clock2Response2 = 100;
                    this.clock2Response3 = 100;
                    this.clock3Response1 = 100;
                    this.clock3Response2 = 100;
                    this.clock3Response3 = 100;
                    this.clock4Response1 = 100;
                    this.clock4Response2 = 100;
                    this.clock4Response3 = 100;
                    this.clock5Response1 = 100;
                    this.clock5Response2 = 100;
                    this.clock5Response3 = 100;
                    this.clock6Response1 = 100;
                    this.clock6Response2 = 100;
                    this.clock6Response3 = 100;
                    this.clock7Response1 = 100;
                    this.clock7Response2 = 100;
                    this.clock7Response3 = 100;
                    this.clock8Response1 = 100;
                    this.clock8Response2 = 100;
                    this.clock8Response3 = 100;
                    this.clock9Response1 = 100;
                    this.clock9Response2 = 100;
                    this.clock9Response3 = 100;
                    this.clock10Response1 = 100;
                    this.clock10Response2 = 100;
                    this.clock10Response3 = 100;
                    this.sensor1Angle = 0;
                    this.sensor2Angle = 180;
                    this.sensor3Angle = 20;
                    this.sensor4Angle = -20;
                    this.sensor5Angle = 180;
                    this.sensor6Angle = 40;
                    this.sensor7Angle = -40;
                    this.sensor8Angle = 0;
                    this.sensor9Angle = 0;
                    this.sensor10Angle = 0;
                    this.sensor11Angle = 0;
                    this.sensor12Angle = 0;
                    this.sensor13Angle = 0;
                    this.sensor14Angle = 0;
                    this.sensor15Angle = 0;
                    this.sensor16Angle = 0;
                    this.sensor1Length = 900;
                    this.sensor2Length = 900;
                    this.sensor3Length = 300;
                    this.sensor4Length = 300;
                    this.sensor5Length = 80;
                    this.sensor6Length = 80;
                    this.sensor7Length = 80;
                    this.sensor8Length = 0;
                    this.sensor9Length = 0;
                    this.sensor10Length = 0;
                    this.sensor11Length = 0;
                    this.sensor12Length = 0;
                    this.sensor13Length = 0;
                    this.sensor14Length = 0;
                    this.sensor15Length = 0;
                    this.sensor16Length = 0;
                    this.sensor1Width = 0;
                    this.sensor2Width = 0;
                    this.sensor3Width = 5;
                    this.sensor4Width = 5;
                    this.sensor5Width = 0;
                    this.sensor6Width = 80;
                    this.sensor7Width = 80;
                    this.sensor8Width = 0;
                    this.sensor9Width = 0;
                    this.sensor10Width = 0;
                    this.sensor11Width = 0;
                    this.sensor12Width = 0;
                    this.sensor13Width = 0;
                    this.sensor14Width = 0;
                    this.sensor15Width = 0;
                    this.sensor16Width = 0;
                    this.sensor1Probability = RobotSpecification.NO_ACTION;
                    this.sensor2Probability = 100;
                    this.sensor3Probability = 100;
                    this.sensor4Probability = 100;
                    this.sensor5Probability = 100;
                    this.sensor6Probability = 100;
                    this.sensor7Probability = 100;
                    this.sensor8Probability = 100;
                    this.sensor9Probability = 100;
                    this.sensor10Probability = 100;
                    this.sensor11Probability = 100;
                    this.sensor12Probability = 100;
                    this.sensor13Probability = 100;
                    this.sensor14Probability = 100;
                    this.sensor15Probability = 100;
                    this.sensor16Probability = 100;
                    this.sensor1Period = 1000;
                    this.sensor2Period = 1000;
                    this.sensor3Period = 200;
                    this.sensor4Period = 200;
                    this.sensor5Period = 200;
                    this.sensor6Period = 200;
                    this.sensor7Period = 200;
                    this.sensor8Period = 0;
                    this.sensor9Period = 0;
                    this.sensor10Period = 0;
                    this.sensor11Period = 0;
                    this.sensor12Period = 0;
                    this.sensor13Period = 0;
                    this.sensor14Period = 0;
                    this.sensor15Period = 0;
                    this.sensor16Period = 0;
                    this.sensor1ParallelOffset = 0;
                    this.sensor2ParallelOffset = 0;
                    this.sensor3ParallelOffset = -15;
                    this.sensor4ParallelOffset = -15;
                    this.sensor5ParallelOffset = 0;
                    this.sensor6ParallelOffset = 0;
                    this.sensor7ParallelOffset = 0;
                    this.sensor8ParallelOffset = 0;
                    this.sensor9ParallelOffset = 0;
                    this.sensor10ParallelOffset = 0;
                    this.sensor11ParallelOffset = 0;
                    this.sensor12ParallelOffset = 0;
                    this.sensor13ParallelOffset = 0;
                    this.sensor14ParallelOffset = 0;
                    this.sensor15ParallelOffset = 0;
                    this.sensor16ParallelOffset = 0;
                    this.sensor1PerpendicularOffset = 0;
                    this.sensor2PerpendicularOffset = 0;
                    this.sensor3PerpendicularOffset = 15;
                    this.sensor4PerpendicularOffset = -15;
                    this.sensor5PerpendicularOffset = 0;
                    this.sensor6PerpendicularOffset = 0;
                    this.sensor7PerpendicularOffset = 0;
                    this.sensor8PerpendicularOffset = 0;
                    this.sensor9PerpendicularOffset = 0;
                    this.sensor10PerpendicularOffset = 0;
                    this.sensor11PerpendicularOffset = 0;
                    this.sensor12PerpendicularOffset = 0;
                    this.sensor13PerpendicularOffset = 0;
                    this.sensor14PerpendicularOffset = 0;
                    this.sensor15PerpendicularOffset = 0;
                    this.sensor16PerpendicularOffset = 0;
                    this.sensor1Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor1Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor1Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor2Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor2Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor2Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor3Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor3Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor3Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor4Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor4Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor4Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor5Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor5Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor5Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor6Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor6Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor6Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor7Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor7Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor7Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor8Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor8Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor8Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor9Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor9Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor9Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor10Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor10Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor10Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor11Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor11Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor11Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor12Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor12Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor12Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor13Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor13Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor13Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor14Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor14Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor14Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor15Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor15Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor15Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor16Condition1 = RobotSpecification.ANY_CONDITION;
                    this.sensor16Condition2 = RobotSpecification.ANY_CONDITION;
                    this.sensor16Condition3 = RobotSpecification.ANY_CONDITION;
                    this.sensor1ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor1ResponseToWall2 = 100;
                    this.sensor1ResponseToWall3 = 100;
                    this.sensor1ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor1ResponseToTank2 = 100;
                    this.sensor1ResponseToTank3 = 100;
                    this.sensor1ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor1ResponseToMissile2 = 100;
                    this.sensor1ResponseToMissile3 = 100;
                    this.sensor2ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor2ResponseToWall2 = 100;
                    this.sensor2ResponseToWall3 = 100;
                    this.sensor2ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor2ResponseToTank2 = 100;
                    this.sensor2ResponseToTank3 = 100;
                    this.sensor2ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor2ResponseToMissile2 = 100;
                    this.sensor2ResponseToMissile3 = 100;
                    this.sensor3ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor3ResponseToWall2 = 100;
                    this.sensor3ResponseToWall3 = 100;
                    this.sensor3ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor3ResponseToTank2 = 100;
                    this.sensor3ResponseToTank3 = 100;
                    this.sensor3ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor3ResponseToMissile2 = 100;
                    this.sensor3ResponseToMissile3 = 100;
                    this.sensor4ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor4ResponseToWall2 = 100;
                    this.sensor4ResponseToWall3 = 100;
                    this.sensor4ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor4ResponseToTank2 = 100;
                    this.sensor4ResponseToTank3 = 100;
                    this.sensor4ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor4ResponseToMissile2 = 100;
                    this.sensor4ResponseToMissile3 = 100;
                    this.sensor5ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor5ResponseToWall2 = 100;
                    this.sensor5ResponseToWall3 = 100;
                    this.sensor5ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor5ResponseToTank2 = 100;
                    this.sensor5ResponseToTank3 = 100;
                    this.sensor5ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor5ResponseToMissile2 = 100;
                    this.sensor5ResponseToMissile3 = 100;
                    this.sensor6ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor6ResponseToWall2 = 100;
                    this.sensor6ResponseToWall3 = 100;
                    this.sensor6ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor6ResponseToTank2 = 100;
                    this.sensor6ResponseToTank3 = 100;
                    this.sensor6ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor6ResponseToMissile2 = 100;
                    this.sensor6ResponseToMissile3 = 100;
                    this.sensor7ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor7ResponseToWall2 = 100;
                    this.sensor7ResponseToWall3 = 100;
                    this.sensor7ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor7ResponseToTank2 = 100;
                    this.sensor7ResponseToTank3 = 100;
                    this.sensor7ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor7ResponseToMissile2 = 100;
                    this.sensor7ResponseToMissile3 = 100;
                    this.sensor8ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor8ResponseToWall2 = 100;
                    this.sensor8ResponseToWall3 = 100;
                    this.sensor8ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor8ResponseToTank2 = 100;
                    this.sensor8ResponseToTank3 = 100;
                    this.sensor8ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor8ResponseToMissile2 = 100;
                    this.sensor8ResponseToMissile3 = 100;
                    this.sensor9ResponseToWall1 = RobotSpecification.NO_ACTION;
                    this.sensor9ResponseToWall2 = 100;
                    this.sensor9ResponseToWall3 = 100;
                    this.sensor9ResponseToTank1 = RobotSpecification.NO_ACTION;
                    this.sensor9ResponseToTank2 = 100;
                    this.sensor9ResponseToTank3 = 100;
                    this.sensor9ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor9ResponseToMissile2 = 100;
                    this.sensor9ResponseToMissile3 = 100;
                    this.sensor10ResponseToWall1 = 100;
                    this.sensor10ResponseToWall2 = 100;
                    this.sensor10ResponseToWall3 = 100;
                    this.sensor10ResponseToTank1 = 100;
                    this.sensor10ResponseToTank2 = 100;
                    this.sensor10ResponseToTank3 = 100;
                    this.sensor10ResponseToMissile1 = 100;
                    this.sensor10ResponseToMissile2 = 100;
                    this.sensor10ResponseToMissile3 = 100;
                    this.sensor11ResponseToWall1 = 100;
                    this.sensor11ResponseToWall2 = 100;
                    this.sensor11ResponseToWall3 = 100;
                    this.sensor11ResponseToTank1 = 100;
                    this.sensor11ResponseToTank2 = 100;
                    this.sensor11ResponseToTank3 = 100;
                    this.sensor11ResponseToMissile1 = 100;
                    this.sensor11ResponseToMissile2 = 100;
                    this.sensor11ResponseToMissile3 = 100;
                    this.sensor12ResponseToWall1 = 100;
                    this.sensor12ResponseToWall2 = 100;
                    this.sensor12ResponseToWall3 = 100;
                    this.sensor12ResponseToTank1 = 100;
                    this.sensor12ResponseToTank2 = 100;
                    this.sensor12ResponseToTank3 = 100;
                    this.sensor12ResponseToMissile1 = 100;
                    this.sensor12ResponseToMissile2 = 100;
                    this.sensor12ResponseToMissile3 = 100;
                    this.sensor13ResponseToWall1 = 100;
                    this.sensor13ResponseToWall2 = 100;
                    this.sensor13ResponseToWall3 = 100;
                    this.sensor13ResponseToTank1 = 100;
                    this.sensor13ResponseToTank2 = 100;
                    this.sensor13ResponseToTank3 = 100;
                    this.sensor13ResponseToMissile1 = 100;
                    this.sensor13ResponseToMissile2 = 100;
                    this.sensor13ResponseToMissile3 = 100;
                    this.sensor14ResponseToWall1 = 100;
                    this.sensor14ResponseToWall2 = 100;
                    this.sensor14ResponseToWall3 = 100;
                    this.sensor14ResponseToTank1 = 100;
                    this.sensor14ResponseToTank2 = 100;
                    this.sensor14ResponseToTank3 = 100;
                    this.sensor14ResponseToMissile1 = 100;
                    this.sensor14ResponseToMissile2 = 100;
                    this.sensor14ResponseToMissile3 = 100;
                    this.sensor15ResponseToWall1 = 100;
                    this.sensor15ResponseToWall2 = 100;
                    this.sensor15ResponseToWall3 = 100;
                    this.sensor15ResponseToTank1 = 100;
                    this.sensor15ResponseToTank2 = 100;
                    this.sensor15ResponseToTank3 = 100;
                    this.sensor15ResponseToMissile1 = 100;
                    this.sensor15ResponseToMissile2 = 100;
                    this.sensor15ResponseToMissile3 = 100;
                    this.sensor16ResponseToWall1 = 100;
                    this.sensor16ResponseToWall2 = 100;
                    this.sensor16ResponseToWall3 = 100;
                    this.sensor16ResponseToTank1 = 100;
                    this.sensor16ResponseToTank2 = 100;
                    this.sensor16ResponseToTank3 = 100;
                    this.sensor16ResponseToMissile1 = RobotSpecification.NO_ACTION;
                    this.sensor16ResponseToMissile2 = RobotSpecification.NO_ACTION;
                    this.sensor16ResponseToMissile3 = RobotSpecification.NO_ACTION;
                    this.responseToMissileHit1 = RobotSpecification.NO_ACTION;
                    this.responseToMissileHit2 = RobotSpecification.NO_ACTION;
                    this.responseToMissileHit3 = RobotSpecification.NO_ACTION;
                    this.responseToFacingTarget1 = RobotSpecification.NO_ACTION;
                    this.responseToFacingTarget2 = RobotSpecification.NO_ACTION;
                    this.responseToFacingTarget3 = RobotSpecification.NO_ACTION;
                    this.weaponStrategyFavourite1 = dsector.PreBuiltWeaponSpecifications.TRI_STRIKER;
                    this.weaponStrategySecondFavourite1 = dsector.PreBuiltWeaponSpecifications.POWER_LASER;
                    this.weaponStrategyThirdFavourite1 = dsector.PreBuiltWeaponSpecifications.BEAM_LASER;
                    this.weaponStrategyFourthFavourite1 = dsector.PreBuiltWeaponSpecifications.DOUBLE_MISSILE;
                    this.weaponStrategyFifthFavourite1 = dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE;
                    this.weaponStrategyFavourite2 = dsector.PreBuiltWeaponSpecifications.TRI_BREAKER;
                    this.weaponStrategySecondFavourite2 = dsector.PreBuiltWeaponSpecifications.QUINT_BREAKER;
                    this.weaponStrategyThirdFavourite2 = dsector.PreBuiltWeaponSpecifications.OCTO_BREAKER;
                    this.weaponStrategyFourthFavourite2 = dsector.PreBuiltWeaponSpecifications.NONE;
                    this.weaponStrategyFifthFavourite2 = dsector.PreBuiltWeaponSpecifications.NONE;
                    this.weaponStrategyFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_TRIPLE;
                    this.weaponStrategySecondFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_GUIDERS;
                    this.weaponStrategyThirdFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_DOUBLE;
                    this.weaponStrategyFourthFavourite3 = dsector.PreBuiltWeaponSpecifications.NONE;
                    this.weaponStrategyFifthFavourite3 = 500;
                    this.weaponStrategyFavourite4 = 500;
                    this.weaponStrategySecondFavourite4 = 500;
                    this.weaponStrategyThirdFavourite4 = 500;
                    this.weaponStrategyFourthFavourite4 = 500;
                    this.weaponStrategyFifthFavourite4 = 500;
                    this.weaponStrategyFavourite5 = 500;
                    this.weaponStrategySecondFavourite5 = 500;
                    this.weaponStrategyThirdFavourite5 = 500;
                    this.weaponStrategyFourthFavourite5 = 500;
                    this.weaponStrategyFifthFavourite5 = 500;
                    this.weaponStrategyFavourite6 = 500;
                    this.weaponStrategySecondFavourite6 = 500;
                    this.weaponStrategyThirdFavourite6 = 500;
                    this.weaponStrategyFourthFavourite6 = 500;
                    this.weaponStrategyFifthFavourite6 = 500;
                    this.weaponStrategyFavourite7 = 500;
                    this.weaponStrategySecondFavourite7 = 500;
                    this.weaponStrategyThirdFavourite7 = 500;
                    this.weaponStrategyFourthFavourite7 = 500;
                    this.weaponStrategyFifthFavourite7 = 500;
                    this.weaponStrategyFavourite8 = 500;
                    this.weaponStrategySecondFavourite8 = 500;
                    this.weaponStrategyThirdFavourite8 = 500;
                    this.weaponStrategyFourthFavourite8 = 500;
                    this.weaponStrategyFifthFavourite8 = 500;
                    this.shoppingStrategyAction1 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_1;
                    this.shoppingStrategyCondition1 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction2 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                    this.shoppingStrategyCondition2 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction3 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                    this.shoppingStrategyCondition3 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction4 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                    this.shoppingStrategyCondition4 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction5 = RobotSpecification.NO_ACTION;
                    this.shoppingStrategyCondition5 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction6 = RobotSpecification.NO_ACTION;
                    this.shoppingStrategyCondition6 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction7 = RobotSpecification.NO_ACTION;
                    this.shoppingStrategyCondition7 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction8 = RobotSpecification.NO_ACTION;
                    this.shoppingStrategyCondition8 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction9 = RobotSpecification.SHOPPING_CONDITION_50_PERCENT;
                    this.shoppingStrategyCondition9 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyAction10 = RobotSpecification.NO_ACTION;
                    this.shoppingStrategyCondition10 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                    this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = 200;
                    this.shoppingStrategyMaximumFireUnitsThatBePurchased = 200;
                    this.filename = "[keyboard1]";
                    this.name = "No name";
                    this.description = "";
                    this.viewSensors = RobotSpecification.FALSE;
                    this.weaponFuelRatio = 100;
                }
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.filename === undefined) {
                    this.filename = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.description === undefined) {
                    this.description = null;
                }
                if (this.viewSensors === undefined) {
                    this.viewSensors = 0;
                }
                if (this.clock1Probability === undefined) {
                    this.clock1Probability = 0;
                }
                if (this.clock2Probability === undefined) {
                    this.clock2Probability = 0;
                }
                if (this.clock3Probability === undefined) {
                    this.clock3Probability = 0;
                }
                if (this.clock4Probability === undefined) {
                    this.clock4Probability = 0;
                }
                if (this.clock5Probability === undefined) {
                    this.clock5Probability = 0;
                }
                if (this.clock6Probability === undefined) {
                    this.clock6Probability = 0;
                }
                if (this.clock7Probability === undefined) {
                    this.clock7Probability = 0;
                }
                if (this.clock8Probability === undefined) {
                    this.clock8Probability = 0;
                }
                if (this.clock9Probability === undefined) {
                    this.clock9Probability = 0;
                }
                if (this.clock10Probability === undefined) {
                    this.clock10Probability = 0;
                }
                if (this.clock1Period === undefined) {
                    this.clock1Period = 0;
                }
                if (this.clock2Period === undefined) {
                    this.clock2Period = 0;
                }
                if (this.clock3Period === undefined) {
                    this.clock3Period = 0;
                }
                if (this.clock4Period === undefined) {
                    this.clock4Period = 0;
                }
                if (this.clock5Period === undefined) {
                    this.clock5Period = 0;
                }
                if (this.clock6Period === undefined) {
                    this.clock6Period = 0;
                }
                if (this.clock7Period === undefined) {
                    this.clock7Period = 0;
                }
                if (this.clock8Period === undefined) {
                    this.clock8Period = 0;
                }
                if (this.clock9Period === undefined) {
                    this.clock9Period = 0;
                }
                if (this.clock10Period === undefined) {
                    this.clock10Period = 0;
                }
                if (this.clock1Requirement1 === undefined) {
                    this.clock1Requirement1 = 0;
                }
                if (this.clock1Requirement2 === undefined) {
                    this.clock1Requirement2 = 0;
                }
                if (this.clock2Requirement1 === undefined) {
                    this.clock2Requirement1 = 0;
                }
                if (this.clock2Requirement2 === undefined) {
                    this.clock2Requirement2 = 0;
                }
                if (this.clock3Requirement1 === undefined) {
                    this.clock3Requirement1 = 0;
                }
                if (this.clock3Requirement2 === undefined) {
                    this.clock3Requirement2 = 0;
                }
                if (this.clock4Requirement1 === undefined) {
                    this.clock4Requirement1 = 0;
                }
                if (this.clock4Requirement2 === undefined) {
                    this.clock4Requirement2 = 0;
                }
                if (this.clock5Requirement1 === undefined) {
                    this.clock5Requirement1 = 0;
                }
                if (this.clock5Requirement2 === undefined) {
                    this.clock5Requirement2 = 0;
                }
                if (this.clock6Requirement1 === undefined) {
                    this.clock6Requirement1 = 0;
                }
                if (this.clock6Requirement2 === undefined) {
                    this.clock6Requirement2 = 0;
                }
                if (this.clock7Requirement1 === undefined) {
                    this.clock7Requirement1 = 0;
                }
                if (this.clock7Requirement2 === undefined) {
                    this.clock7Requirement2 = 0;
                }
                if (this.clock8Requirement1 === undefined) {
                    this.clock8Requirement1 = 0;
                }
                if (this.clock8Requirement2 === undefined) {
                    this.clock8Requirement2 = 0;
                }
                if (this.clock9Requirement1 === undefined) {
                    this.clock9Requirement1 = 0;
                }
                if (this.clock9Requirement2 === undefined) {
                    this.clock9Requirement2 = 0;
                }
                if (this.clock10Requirement1 === undefined) {
                    this.clock10Requirement1 = 0;
                }
                if (this.clock10Requirement2 === undefined) {
                    this.clock10Requirement2 = 0;
                }
                if (this.clock1Response1 === undefined) {
                    this.clock1Response1 = 0;
                }
                if (this.clock1Response2 === undefined) {
                    this.clock1Response2 = 0;
                }
                if (this.clock1Response3 === undefined) {
                    this.clock1Response3 = 0;
                }
                if (this.clock2Response1 === undefined) {
                    this.clock2Response1 = 0;
                }
                if (this.clock2Response2 === undefined) {
                    this.clock2Response2 = 0;
                }
                if (this.clock2Response3 === undefined) {
                    this.clock2Response3 = 0;
                }
                if (this.clock3Response1 === undefined) {
                    this.clock3Response1 = 0;
                }
                if (this.clock3Response2 === undefined) {
                    this.clock3Response2 = 0;
                }
                if (this.clock3Response3 === undefined) {
                    this.clock3Response3 = 0;
                }
                if (this.clock4Response1 === undefined) {
                    this.clock4Response1 = 0;
                }
                if (this.clock4Response2 === undefined) {
                    this.clock4Response2 = 0;
                }
                if (this.clock4Response3 === undefined) {
                    this.clock4Response3 = 0;
                }
                if (this.clock5Response1 === undefined) {
                    this.clock5Response1 = 0;
                }
                if (this.clock5Response2 === undefined) {
                    this.clock5Response2 = 0;
                }
                if (this.clock5Response3 === undefined) {
                    this.clock5Response3 = 0;
                }
                if (this.clock6Response1 === undefined) {
                    this.clock6Response1 = 0;
                }
                if (this.clock6Response2 === undefined) {
                    this.clock6Response2 = 0;
                }
                if (this.clock6Response3 === undefined) {
                    this.clock6Response3 = 0;
                }
                if (this.clock7Response1 === undefined) {
                    this.clock7Response1 = 0;
                }
                if (this.clock7Response2 === undefined) {
                    this.clock7Response2 = 0;
                }
                if (this.clock7Response3 === undefined) {
                    this.clock7Response3 = 0;
                }
                if (this.clock8Response1 === undefined) {
                    this.clock8Response1 = 0;
                }
                if (this.clock8Response2 === undefined) {
                    this.clock8Response2 = 0;
                }
                if (this.clock8Response3 === undefined) {
                    this.clock8Response3 = 0;
                }
                if (this.clock9Response1 === undefined) {
                    this.clock9Response1 = 0;
                }
                if (this.clock9Response2 === undefined) {
                    this.clock9Response2 = 0;
                }
                if (this.clock9Response3 === undefined) {
                    this.clock9Response3 = 0;
                }
                if (this.clock10Response1 === undefined) {
                    this.clock10Response1 = 0;
                }
                if (this.clock10Response2 === undefined) {
                    this.clock10Response2 = 0;
                }
                if (this.clock10Response3 === undefined) {
                    this.clock10Response3 = 0;
                }
                if (this.sensor1Angle === undefined) {
                    this.sensor1Angle = 0;
                }
                if (this.sensor2Angle === undefined) {
                    this.sensor2Angle = 0;
                }
                if (this.sensor3Angle === undefined) {
                    this.sensor3Angle = 0;
                }
                if (this.sensor4Angle === undefined) {
                    this.sensor4Angle = 0;
                }
                if (this.sensor5Angle === undefined) {
                    this.sensor5Angle = 0;
                }
                if (this.sensor6Angle === undefined) {
                    this.sensor6Angle = 0;
                }
                if (this.sensor7Angle === undefined) {
                    this.sensor7Angle = 0;
                }
                if (this.sensor8Angle === undefined) {
                    this.sensor8Angle = 0;
                }
                if (this.sensor9Angle === undefined) {
                    this.sensor9Angle = 0;
                }
                if (this.sensor10Angle === undefined) {
                    this.sensor10Angle = 0;
                }
                if (this.sensor11Angle === undefined) {
                    this.sensor11Angle = 0;
                }
                if (this.sensor12Angle === undefined) {
                    this.sensor12Angle = 0;
                }
                if (this.sensor13Angle === undefined) {
                    this.sensor13Angle = 0;
                }
                if (this.sensor14Angle === undefined) {
                    this.sensor14Angle = 0;
                }
                if (this.sensor15Angle === undefined) {
                    this.sensor15Angle = 0;
                }
                if (this.sensor16Angle === undefined) {
                    this.sensor16Angle = 0;
                }
                if (this.sensor1Length === undefined) {
                    this.sensor1Length = 0;
                }
                if (this.sensor2Length === undefined) {
                    this.sensor2Length = 0;
                }
                if (this.sensor3Length === undefined) {
                    this.sensor3Length = 0;
                }
                if (this.sensor4Length === undefined) {
                    this.sensor4Length = 0;
                }
                if (this.sensor5Length === undefined) {
                    this.sensor5Length = 0;
                }
                if (this.sensor6Length === undefined) {
                    this.sensor6Length = 0;
                }
                if (this.sensor7Length === undefined) {
                    this.sensor7Length = 0;
                }
                if (this.sensor8Length === undefined) {
                    this.sensor8Length = 0;
                }
                if (this.sensor9Length === undefined) {
                    this.sensor9Length = 0;
                }
                if (this.sensor10Length === undefined) {
                    this.sensor10Length = 0;
                }
                if (this.sensor11Length === undefined) {
                    this.sensor11Length = 0;
                }
                if (this.sensor12Length === undefined) {
                    this.sensor12Length = 0;
                }
                if (this.sensor13Length === undefined) {
                    this.sensor13Length = 0;
                }
                if (this.sensor14Length === undefined) {
                    this.sensor14Length = 0;
                }
                if (this.sensor15Length === undefined) {
                    this.sensor15Length = 0;
                }
                if (this.sensor16Length === undefined) {
                    this.sensor16Length = 0;
                }
                if (this.sensor1Width === undefined) {
                    this.sensor1Width = 0;
                }
                if (this.sensor2Width === undefined) {
                    this.sensor2Width = 0;
                }
                if (this.sensor3Width === undefined) {
                    this.sensor3Width = 0;
                }
                if (this.sensor4Width === undefined) {
                    this.sensor4Width = 0;
                }
                if (this.sensor5Width === undefined) {
                    this.sensor5Width = 0;
                }
                if (this.sensor6Width === undefined) {
                    this.sensor6Width = 0;
                }
                if (this.sensor7Width === undefined) {
                    this.sensor7Width = 0;
                }
                if (this.sensor8Width === undefined) {
                    this.sensor8Width = 0;
                }
                if (this.sensor9Width === undefined) {
                    this.sensor9Width = 0;
                }
                if (this.sensor10Width === undefined) {
                    this.sensor10Width = 0;
                }
                if (this.sensor11Width === undefined) {
                    this.sensor11Width = 0;
                }
                if (this.sensor12Width === undefined) {
                    this.sensor12Width = 0;
                }
                if (this.sensor13Width === undefined) {
                    this.sensor13Width = 0;
                }
                if (this.sensor14Width === undefined) {
                    this.sensor14Width = 0;
                }
                if (this.sensor15Width === undefined) {
                    this.sensor15Width = 0;
                }
                if (this.sensor16Width === undefined) {
                    this.sensor16Width = 0;
                }
                if (this.sensor1Probability === undefined) {
                    this.sensor1Probability = 0;
                }
                if (this.sensor2Probability === undefined) {
                    this.sensor2Probability = 0;
                }
                if (this.sensor3Probability === undefined) {
                    this.sensor3Probability = 0;
                }
                if (this.sensor4Probability === undefined) {
                    this.sensor4Probability = 0;
                }
                if (this.sensor5Probability === undefined) {
                    this.sensor5Probability = 0;
                }
                if (this.sensor6Probability === undefined) {
                    this.sensor6Probability = 0;
                }
                if (this.sensor7Probability === undefined) {
                    this.sensor7Probability = 0;
                }
                if (this.sensor8Probability === undefined) {
                    this.sensor8Probability = 0;
                }
                if (this.sensor9Probability === undefined) {
                    this.sensor9Probability = 0;
                }
                if (this.sensor10Probability === undefined) {
                    this.sensor10Probability = 0;
                }
                if (this.sensor11Probability === undefined) {
                    this.sensor11Probability = 0;
                }
                if (this.sensor12Probability === undefined) {
                    this.sensor12Probability = 0;
                }
                if (this.sensor13Probability === undefined) {
                    this.sensor13Probability = 0;
                }
                if (this.sensor14Probability === undefined) {
                    this.sensor14Probability = 0;
                }
                if (this.sensor15Probability === undefined) {
                    this.sensor15Probability = 0;
                }
                if (this.sensor16Probability === undefined) {
                    this.sensor16Probability = 0;
                }
                if (this.sensor1Period === undefined) {
                    this.sensor1Period = 0;
                }
                if (this.sensor2Period === undefined) {
                    this.sensor2Period = 0;
                }
                if (this.sensor3Period === undefined) {
                    this.sensor3Period = 0;
                }
                if (this.sensor4Period === undefined) {
                    this.sensor4Period = 0;
                }
                if (this.sensor5Period === undefined) {
                    this.sensor5Period = 0;
                }
                if (this.sensor6Period === undefined) {
                    this.sensor6Period = 0;
                }
                if (this.sensor7Period === undefined) {
                    this.sensor7Period = 0;
                }
                if (this.sensor8Period === undefined) {
                    this.sensor8Period = 0;
                }
                if (this.sensor9Period === undefined) {
                    this.sensor9Period = 0;
                }
                if (this.sensor10Period === undefined) {
                    this.sensor10Period = 0;
                }
                if (this.sensor11Period === undefined) {
                    this.sensor11Period = 0;
                }
                if (this.sensor12Period === undefined) {
                    this.sensor12Period = 0;
                }
                if (this.sensor13Period === undefined) {
                    this.sensor13Period = 0;
                }
                if (this.sensor14Period === undefined) {
                    this.sensor14Period = 0;
                }
                if (this.sensor15Period === undefined) {
                    this.sensor15Period = 0;
                }
                if (this.sensor16Period === undefined) {
                    this.sensor16Period = 0;
                }
                if (this.sensor1ParallelOffset === undefined) {
                    this.sensor1ParallelOffset = 0;
                }
                if (this.sensor2ParallelOffset === undefined) {
                    this.sensor2ParallelOffset = 0;
                }
                if (this.sensor3ParallelOffset === undefined) {
                    this.sensor3ParallelOffset = 0;
                }
                if (this.sensor4ParallelOffset === undefined) {
                    this.sensor4ParallelOffset = 0;
                }
                if (this.sensor5ParallelOffset === undefined) {
                    this.sensor5ParallelOffset = 0;
                }
                if (this.sensor6ParallelOffset === undefined) {
                    this.sensor6ParallelOffset = 0;
                }
                if (this.sensor7ParallelOffset === undefined) {
                    this.sensor7ParallelOffset = 0;
                }
                if (this.sensor8ParallelOffset === undefined) {
                    this.sensor8ParallelOffset = 0;
                }
                if (this.sensor9ParallelOffset === undefined) {
                    this.sensor9ParallelOffset = 0;
                }
                if (this.sensor10ParallelOffset === undefined) {
                    this.sensor10ParallelOffset = 0;
                }
                if (this.sensor11ParallelOffset === undefined) {
                    this.sensor11ParallelOffset = 0;
                }
                if (this.sensor12ParallelOffset === undefined) {
                    this.sensor12ParallelOffset = 0;
                }
                if (this.sensor13ParallelOffset === undefined) {
                    this.sensor13ParallelOffset = 0;
                }
                if (this.sensor14ParallelOffset === undefined) {
                    this.sensor14ParallelOffset = 0;
                }
                if (this.sensor15ParallelOffset === undefined) {
                    this.sensor15ParallelOffset = 0;
                }
                if (this.sensor16ParallelOffset === undefined) {
                    this.sensor16ParallelOffset = 0;
                }
                if (this.sensor1PerpendicularOffset === undefined) {
                    this.sensor1PerpendicularOffset = 0;
                }
                if (this.sensor2PerpendicularOffset === undefined) {
                    this.sensor2PerpendicularOffset = 0;
                }
                if (this.sensor3PerpendicularOffset === undefined) {
                    this.sensor3PerpendicularOffset = 0;
                }
                if (this.sensor4PerpendicularOffset === undefined) {
                    this.sensor4PerpendicularOffset = 0;
                }
                if (this.sensor5PerpendicularOffset === undefined) {
                    this.sensor5PerpendicularOffset = 0;
                }
                if (this.sensor6PerpendicularOffset === undefined) {
                    this.sensor6PerpendicularOffset = 0;
                }
                if (this.sensor7PerpendicularOffset === undefined) {
                    this.sensor7PerpendicularOffset = 0;
                }
                if (this.sensor8PerpendicularOffset === undefined) {
                    this.sensor8PerpendicularOffset = 0;
                }
                if (this.sensor9PerpendicularOffset === undefined) {
                    this.sensor9PerpendicularOffset = 0;
                }
                if (this.sensor10PerpendicularOffset === undefined) {
                    this.sensor10PerpendicularOffset = 0;
                }
                if (this.sensor11PerpendicularOffset === undefined) {
                    this.sensor11PerpendicularOffset = 0;
                }
                if (this.sensor12PerpendicularOffset === undefined) {
                    this.sensor12PerpendicularOffset = 0;
                }
                if (this.sensor13PerpendicularOffset === undefined) {
                    this.sensor13PerpendicularOffset = 0;
                }
                if (this.sensor14PerpendicularOffset === undefined) {
                    this.sensor14PerpendicularOffset = 0;
                }
                if (this.sensor15PerpendicularOffset === undefined) {
                    this.sensor15PerpendicularOffset = 0;
                }
                if (this.sensor16PerpendicularOffset === undefined) {
                    this.sensor16PerpendicularOffset = 0;
                }
                if (this.sensor1Condition1 === undefined) {
                    this.sensor1Condition1 = 0;
                }
                if (this.sensor1Condition2 === undefined) {
                    this.sensor1Condition2 = 0;
                }
                if (this.sensor1Condition3 === undefined) {
                    this.sensor1Condition3 = 0;
                }
                if (this.sensor2Condition1 === undefined) {
                    this.sensor2Condition1 = 0;
                }
                if (this.sensor2Condition2 === undefined) {
                    this.sensor2Condition2 = 0;
                }
                if (this.sensor2Condition3 === undefined) {
                    this.sensor2Condition3 = 0;
                }
                if (this.sensor3Condition1 === undefined) {
                    this.sensor3Condition1 = 0;
                }
                if (this.sensor3Condition2 === undefined) {
                    this.sensor3Condition2 = 0;
                }
                if (this.sensor3Condition3 === undefined) {
                    this.sensor3Condition3 = 0;
                }
                if (this.sensor4Condition1 === undefined) {
                    this.sensor4Condition1 = 0;
                }
                if (this.sensor4Condition2 === undefined) {
                    this.sensor4Condition2 = 0;
                }
                if (this.sensor4Condition3 === undefined) {
                    this.sensor4Condition3 = 0;
                }
                if (this.sensor5Condition1 === undefined) {
                    this.sensor5Condition1 = 0;
                }
                if (this.sensor5Condition2 === undefined) {
                    this.sensor5Condition2 = 0;
                }
                if (this.sensor5Condition3 === undefined) {
                    this.sensor5Condition3 = 0;
                }
                if (this.sensor6Condition1 === undefined) {
                    this.sensor6Condition1 = 0;
                }
                if (this.sensor6Condition2 === undefined) {
                    this.sensor6Condition2 = 0;
                }
                if (this.sensor6Condition3 === undefined) {
                    this.sensor6Condition3 = 0;
                }
                if (this.sensor7Condition1 === undefined) {
                    this.sensor7Condition1 = 0;
                }
                if (this.sensor7Condition2 === undefined) {
                    this.sensor7Condition2 = 0;
                }
                if (this.sensor7Condition3 === undefined) {
                    this.sensor7Condition3 = 0;
                }
                if (this.sensor8Condition1 === undefined) {
                    this.sensor8Condition1 = 0;
                }
                if (this.sensor8Condition2 === undefined) {
                    this.sensor8Condition2 = 0;
                }
                if (this.sensor8Condition3 === undefined) {
                    this.sensor8Condition3 = 0;
                }
                if (this.sensor9Condition1 === undefined) {
                    this.sensor9Condition1 = 0;
                }
                if (this.sensor9Condition2 === undefined) {
                    this.sensor9Condition2 = 0;
                }
                if (this.sensor9Condition3 === undefined) {
                    this.sensor9Condition3 = 0;
                }
                if (this.sensor10Condition1 === undefined) {
                    this.sensor10Condition1 = 0;
                }
                if (this.sensor10Condition2 === undefined) {
                    this.sensor10Condition2 = 0;
                }
                if (this.sensor10Condition3 === undefined) {
                    this.sensor10Condition3 = 0;
                }
                if (this.sensor11Condition1 === undefined) {
                    this.sensor11Condition1 = 0;
                }
                if (this.sensor11Condition2 === undefined) {
                    this.sensor11Condition2 = 0;
                }
                if (this.sensor11Condition3 === undefined) {
                    this.sensor11Condition3 = 0;
                }
                if (this.sensor12Condition1 === undefined) {
                    this.sensor12Condition1 = 0;
                }
                if (this.sensor12Condition2 === undefined) {
                    this.sensor12Condition2 = 0;
                }
                if (this.sensor12Condition3 === undefined) {
                    this.sensor12Condition3 = 0;
                }
                if (this.sensor13Condition1 === undefined) {
                    this.sensor13Condition1 = 0;
                }
                if (this.sensor13Condition2 === undefined) {
                    this.sensor13Condition2 = 0;
                }
                if (this.sensor13Condition3 === undefined) {
                    this.sensor13Condition3 = 0;
                }
                if (this.sensor14Condition1 === undefined) {
                    this.sensor14Condition1 = 0;
                }
                if (this.sensor14Condition2 === undefined) {
                    this.sensor14Condition2 = 0;
                }
                if (this.sensor14Condition3 === undefined) {
                    this.sensor14Condition3 = 0;
                }
                if (this.sensor15Condition1 === undefined) {
                    this.sensor15Condition1 = 0;
                }
                if (this.sensor15Condition2 === undefined) {
                    this.sensor15Condition2 = 0;
                }
                if (this.sensor15Condition3 === undefined) {
                    this.sensor15Condition3 = 0;
                }
                if (this.sensor16Condition1 === undefined) {
                    this.sensor16Condition1 = 0;
                }
                if (this.sensor16Condition2 === undefined) {
                    this.sensor16Condition2 = 0;
                }
                if (this.sensor16Condition3 === undefined) {
                    this.sensor16Condition3 = 0;
                }
                if (this.sensor1ResponseToWall1 === undefined) {
                    this.sensor1ResponseToWall1 = 0;
                }
                if (this.sensor1ResponseToWall2 === undefined) {
                    this.sensor1ResponseToWall2 = 0;
                }
                if (this.sensor1ResponseToWall3 === undefined) {
                    this.sensor1ResponseToWall3 = 0;
                }
                if (this.sensor1ResponseToTank1 === undefined) {
                    this.sensor1ResponseToTank1 = 0;
                }
                if (this.sensor1ResponseToTank2 === undefined) {
                    this.sensor1ResponseToTank2 = 0;
                }
                if (this.sensor1ResponseToTank3 === undefined) {
                    this.sensor1ResponseToTank3 = 0;
                }
                if (this.sensor1ResponseToMissile1 === undefined) {
                    this.sensor1ResponseToMissile1 = 0;
                }
                if (this.sensor1ResponseToMissile2 === undefined) {
                    this.sensor1ResponseToMissile2 = 0;
                }
                if (this.sensor1ResponseToMissile3 === undefined) {
                    this.sensor1ResponseToMissile3 = 0;
                }
                if (this.sensor2ResponseToWall1 === undefined) {
                    this.sensor2ResponseToWall1 = 0;
                }
                if (this.sensor2ResponseToWall2 === undefined) {
                    this.sensor2ResponseToWall2 = 0;
                }
                if (this.sensor2ResponseToWall3 === undefined) {
                    this.sensor2ResponseToWall3 = 0;
                }
                if (this.sensor2ResponseToTank1 === undefined) {
                    this.sensor2ResponseToTank1 = 0;
                }
                if (this.sensor2ResponseToTank2 === undefined) {
                    this.sensor2ResponseToTank2 = 0;
                }
                if (this.sensor2ResponseToTank3 === undefined) {
                    this.sensor2ResponseToTank3 = 0;
                }
                if (this.sensor2ResponseToMissile1 === undefined) {
                    this.sensor2ResponseToMissile1 = 0;
                }
                if (this.sensor2ResponseToMissile2 === undefined) {
                    this.sensor2ResponseToMissile2 = 0;
                }
                if (this.sensor2ResponseToMissile3 === undefined) {
                    this.sensor2ResponseToMissile3 = 0;
                }
                if (this.sensor3ResponseToWall1 === undefined) {
                    this.sensor3ResponseToWall1 = 0;
                }
                if (this.sensor3ResponseToWall2 === undefined) {
                    this.sensor3ResponseToWall2 = 0;
                }
                if (this.sensor3ResponseToWall3 === undefined) {
                    this.sensor3ResponseToWall3 = 0;
                }
                if (this.sensor3ResponseToTank1 === undefined) {
                    this.sensor3ResponseToTank1 = 0;
                }
                if (this.sensor3ResponseToTank2 === undefined) {
                    this.sensor3ResponseToTank2 = 0;
                }
                if (this.sensor3ResponseToTank3 === undefined) {
                    this.sensor3ResponseToTank3 = 0;
                }
                if (this.sensor3ResponseToMissile1 === undefined) {
                    this.sensor3ResponseToMissile1 = 0;
                }
                if (this.sensor3ResponseToMissile2 === undefined) {
                    this.sensor3ResponseToMissile2 = 0;
                }
                if (this.sensor3ResponseToMissile3 === undefined) {
                    this.sensor3ResponseToMissile3 = 0;
                }
                if (this.sensor4ResponseToWall1 === undefined) {
                    this.sensor4ResponseToWall1 = 0;
                }
                if (this.sensor4ResponseToWall2 === undefined) {
                    this.sensor4ResponseToWall2 = 0;
                }
                if (this.sensor4ResponseToWall3 === undefined) {
                    this.sensor4ResponseToWall3 = 0;
                }
                if (this.sensor4ResponseToTank1 === undefined) {
                    this.sensor4ResponseToTank1 = 0;
                }
                if (this.sensor4ResponseToTank2 === undefined) {
                    this.sensor4ResponseToTank2 = 0;
                }
                if (this.sensor4ResponseToTank3 === undefined) {
                    this.sensor4ResponseToTank3 = 0;
                }
                if (this.sensor4ResponseToMissile1 === undefined) {
                    this.sensor4ResponseToMissile1 = 0;
                }
                if (this.sensor4ResponseToMissile2 === undefined) {
                    this.sensor4ResponseToMissile2 = 0;
                }
                if (this.sensor4ResponseToMissile3 === undefined) {
                    this.sensor4ResponseToMissile3 = 0;
                }
                if (this.sensor5ResponseToWall1 === undefined) {
                    this.sensor5ResponseToWall1 = 0;
                }
                if (this.sensor5ResponseToWall2 === undefined) {
                    this.sensor5ResponseToWall2 = 0;
                }
                if (this.sensor5ResponseToWall3 === undefined) {
                    this.sensor5ResponseToWall3 = 0;
                }
                if (this.sensor5ResponseToTank1 === undefined) {
                    this.sensor5ResponseToTank1 = 0;
                }
                if (this.sensor5ResponseToTank2 === undefined) {
                    this.sensor5ResponseToTank2 = 0;
                }
                if (this.sensor5ResponseToTank3 === undefined) {
                    this.sensor5ResponseToTank3 = 0;
                }
                if (this.sensor5ResponseToMissile1 === undefined) {
                    this.sensor5ResponseToMissile1 = 0;
                }
                if (this.sensor5ResponseToMissile2 === undefined) {
                    this.sensor5ResponseToMissile2 = 0;
                }
                if (this.sensor5ResponseToMissile3 === undefined) {
                    this.sensor5ResponseToMissile3 = 0;
                }
                if (this.sensor6ResponseToWall1 === undefined) {
                    this.sensor6ResponseToWall1 = 0;
                }
                if (this.sensor6ResponseToWall2 === undefined) {
                    this.sensor6ResponseToWall2 = 0;
                }
                if (this.sensor6ResponseToWall3 === undefined) {
                    this.sensor6ResponseToWall3 = 0;
                }
                if (this.sensor6ResponseToTank1 === undefined) {
                    this.sensor6ResponseToTank1 = 0;
                }
                if (this.sensor6ResponseToTank2 === undefined) {
                    this.sensor6ResponseToTank2 = 0;
                }
                if (this.sensor6ResponseToTank3 === undefined) {
                    this.sensor6ResponseToTank3 = 0;
                }
                if (this.sensor6ResponseToMissile1 === undefined) {
                    this.sensor6ResponseToMissile1 = 0;
                }
                if (this.sensor6ResponseToMissile2 === undefined) {
                    this.sensor6ResponseToMissile2 = 0;
                }
                if (this.sensor6ResponseToMissile3 === undefined) {
                    this.sensor6ResponseToMissile3 = 0;
                }
                if (this.sensor7ResponseToWall1 === undefined) {
                    this.sensor7ResponseToWall1 = 0;
                }
                if (this.sensor7ResponseToWall2 === undefined) {
                    this.sensor7ResponseToWall2 = 0;
                }
                if (this.sensor7ResponseToWall3 === undefined) {
                    this.sensor7ResponseToWall3 = 0;
                }
                if (this.sensor7ResponseToTank1 === undefined) {
                    this.sensor7ResponseToTank1 = 0;
                }
                if (this.sensor7ResponseToTank2 === undefined) {
                    this.sensor7ResponseToTank2 = 0;
                }
                if (this.sensor7ResponseToTank3 === undefined) {
                    this.sensor7ResponseToTank3 = 0;
                }
                if (this.sensor7ResponseToMissile1 === undefined) {
                    this.sensor7ResponseToMissile1 = 0;
                }
                if (this.sensor7ResponseToMissile2 === undefined) {
                    this.sensor7ResponseToMissile2 = 0;
                }
                if (this.sensor7ResponseToMissile3 === undefined) {
                    this.sensor7ResponseToMissile3 = 0;
                }
                if (this.sensor8ResponseToWall1 === undefined) {
                    this.sensor8ResponseToWall1 = 0;
                }
                if (this.sensor8ResponseToWall2 === undefined) {
                    this.sensor8ResponseToWall2 = 0;
                }
                if (this.sensor8ResponseToWall3 === undefined) {
                    this.sensor8ResponseToWall3 = 0;
                }
                if (this.sensor8ResponseToTank1 === undefined) {
                    this.sensor8ResponseToTank1 = 0;
                }
                if (this.sensor8ResponseToTank2 === undefined) {
                    this.sensor8ResponseToTank2 = 0;
                }
                if (this.sensor8ResponseToTank3 === undefined) {
                    this.sensor8ResponseToTank3 = 0;
                }
                if (this.sensor8ResponseToMissile1 === undefined) {
                    this.sensor8ResponseToMissile1 = 0;
                }
                if (this.sensor8ResponseToMissile2 === undefined) {
                    this.sensor8ResponseToMissile2 = 0;
                }
                if (this.sensor8ResponseToMissile3 === undefined) {
                    this.sensor8ResponseToMissile3 = 0;
                }
                if (this.sensor9ResponseToWall1 === undefined) {
                    this.sensor9ResponseToWall1 = 0;
                }
                if (this.sensor9ResponseToWall2 === undefined) {
                    this.sensor9ResponseToWall2 = 0;
                }
                if (this.sensor9ResponseToWall3 === undefined) {
                    this.sensor9ResponseToWall3 = 0;
                }
                if (this.sensor9ResponseToTank1 === undefined) {
                    this.sensor9ResponseToTank1 = 0;
                }
                if (this.sensor9ResponseToTank2 === undefined) {
                    this.sensor9ResponseToTank2 = 0;
                }
                if (this.sensor9ResponseToTank3 === undefined) {
                    this.sensor9ResponseToTank3 = 0;
                }
                if (this.sensor9ResponseToMissile1 === undefined) {
                    this.sensor9ResponseToMissile1 = 0;
                }
                if (this.sensor9ResponseToMissile2 === undefined) {
                    this.sensor9ResponseToMissile2 = 0;
                }
                if (this.sensor9ResponseToMissile3 === undefined) {
                    this.sensor9ResponseToMissile3 = 0;
                }
                if (this.sensor10ResponseToWall1 === undefined) {
                    this.sensor10ResponseToWall1 = 0;
                }
                if (this.sensor10ResponseToWall2 === undefined) {
                    this.sensor10ResponseToWall2 = 0;
                }
                if (this.sensor10ResponseToWall3 === undefined) {
                    this.sensor10ResponseToWall3 = 0;
                }
                if (this.sensor10ResponseToTank1 === undefined) {
                    this.sensor10ResponseToTank1 = 0;
                }
                if (this.sensor10ResponseToTank2 === undefined) {
                    this.sensor10ResponseToTank2 = 0;
                }
                if (this.sensor10ResponseToTank3 === undefined) {
                    this.sensor10ResponseToTank3 = 0;
                }
                if (this.sensor10ResponseToMissile1 === undefined) {
                    this.sensor10ResponseToMissile1 = 0;
                }
                if (this.sensor10ResponseToMissile2 === undefined) {
                    this.sensor10ResponseToMissile2 = 0;
                }
                if (this.sensor10ResponseToMissile3 === undefined) {
                    this.sensor10ResponseToMissile3 = 0;
                }
                if (this.sensor11ResponseToWall1 === undefined) {
                    this.sensor11ResponseToWall1 = 0;
                }
                if (this.sensor11ResponseToWall2 === undefined) {
                    this.sensor11ResponseToWall2 = 0;
                }
                if (this.sensor11ResponseToWall3 === undefined) {
                    this.sensor11ResponseToWall3 = 0;
                }
                if (this.sensor11ResponseToTank1 === undefined) {
                    this.sensor11ResponseToTank1 = 0;
                }
                if (this.sensor11ResponseToTank2 === undefined) {
                    this.sensor11ResponseToTank2 = 0;
                }
                if (this.sensor11ResponseToTank3 === undefined) {
                    this.sensor11ResponseToTank3 = 0;
                }
                if (this.sensor11ResponseToMissile1 === undefined) {
                    this.sensor11ResponseToMissile1 = 0;
                }
                if (this.sensor11ResponseToMissile2 === undefined) {
                    this.sensor11ResponseToMissile2 = 0;
                }
                if (this.sensor11ResponseToMissile3 === undefined) {
                    this.sensor11ResponseToMissile3 = 0;
                }
                if (this.sensor12ResponseToWall1 === undefined) {
                    this.sensor12ResponseToWall1 = 0;
                }
                if (this.sensor12ResponseToWall2 === undefined) {
                    this.sensor12ResponseToWall2 = 0;
                }
                if (this.sensor12ResponseToWall3 === undefined) {
                    this.sensor12ResponseToWall3 = 0;
                }
                if (this.sensor12ResponseToTank1 === undefined) {
                    this.sensor12ResponseToTank1 = 0;
                }
                if (this.sensor12ResponseToTank2 === undefined) {
                    this.sensor12ResponseToTank2 = 0;
                }
                if (this.sensor12ResponseToTank3 === undefined) {
                    this.sensor12ResponseToTank3 = 0;
                }
                if (this.sensor12ResponseToMissile1 === undefined) {
                    this.sensor12ResponseToMissile1 = 0;
                }
                if (this.sensor12ResponseToMissile2 === undefined) {
                    this.sensor12ResponseToMissile2 = 0;
                }
                if (this.sensor12ResponseToMissile3 === undefined) {
                    this.sensor12ResponseToMissile3 = 0;
                }
                if (this.sensor13ResponseToWall1 === undefined) {
                    this.sensor13ResponseToWall1 = 0;
                }
                if (this.sensor13ResponseToWall2 === undefined) {
                    this.sensor13ResponseToWall2 = 0;
                }
                if (this.sensor13ResponseToWall3 === undefined) {
                    this.sensor13ResponseToWall3 = 0;
                }
                if (this.sensor13ResponseToTank1 === undefined) {
                    this.sensor13ResponseToTank1 = 0;
                }
                if (this.sensor13ResponseToTank2 === undefined) {
                    this.sensor13ResponseToTank2 = 0;
                }
                if (this.sensor13ResponseToTank3 === undefined) {
                    this.sensor13ResponseToTank3 = 0;
                }
                if (this.sensor13ResponseToMissile1 === undefined) {
                    this.sensor13ResponseToMissile1 = 0;
                }
                if (this.sensor13ResponseToMissile2 === undefined) {
                    this.sensor13ResponseToMissile2 = 0;
                }
                if (this.sensor13ResponseToMissile3 === undefined) {
                    this.sensor13ResponseToMissile3 = 0;
                }
                if (this.sensor14ResponseToWall1 === undefined) {
                    this.sensor14ResponseToWall1 = 0;
                }
                if (this.sensor14ResponseToWall2 === undefined) {
                    this.sensor14ResponseToWall2 = 0;
                }
                if (this.sensor14ResponseToWall3 === undefined) {
                    this.sensor14ResponseToWall3 = 0;
                }
                if (this.sensor14ResponseToTank1 === undefined) {
                    this.sensor14ResponseToTank1 = 0;
                }
                if (this.sensor14ResponseToTank2 === undefined) {
                    this.sensor14ResponseToTank2 = 0;
                }
                if (this.sensor14ResponseToTank3 === undefined) {
                    this.sensor14ResponseToTank3 = 0;
                }
                if (this.sensor14ResponseToMissile1 === undefined) {
                    this.sensor14ResponseToMissile1 = 0;
                }
                if (this.sensor14ResponseToMissile2 === undefined) {
                    this.sensor14ResponseToMissile2 = 0;
                }
                if (this.sensor14ResponseToMissile3 === undefined) {
                    this.sensor14ResponseToMissile3 = 0;
                }
                if (this.sensor15ResponseToWall1 === undefined) {
                    this.sensor15ResponseToWall1 = 0;
                }
                if (this.sensor15ResponseToWall2 === undefined) {
                    this.sensor15ResponseToWall2 = 0;
                }
                if (this.sensor15ResponseToWall3 === undefined) {
                    this.sensor15ResponseToWall3 = 0;
                }
                if (this.sensor15ResponseToTank1 === undefined) {
                    this.sensor15ResponseToTank1 = 0;
                }
                if (this.sensor15ResponseToTank2 === undefined) {
                    this.sensor15ResponseToTank2 = 0;
                }
                if (this.sensor15ResponseToTank3 === undefined) {
                    this.sensor15ResponseToTank3 = 0;
                }
                if (this.sensor15ResponseToMissile1 === undefined) {
                    this.sensor15ResponseToMissile1 = 0;
                }
                if (this.sensor15ResponseToMissile2 === undefined) {
                    this.sensor15ResponseToMissile2 = 0;
                }
                if (this.sensor15ResponseToMissile3 === undefined) {
                    this.sensor15ResponseToMissile3 = 0;
                }
                if (this.sensor16ResponseToWall1 === undefined) {
                    this.sensor16ResponseToWall1 = 0;
                }
                if (this.sensor16ResponseToWall2 === undefined) {
                    this.sensor16ResponseToWall2 = 0;
                }
                if (this.sensor16ResponseToWall3 === undefined) {
                    this.sensor16ResponseToWall3 = 0;
                }
                if (this.sensor16ResponseToTank1 === undefined) {
                    this.sensor16ResponseToTank1 = 0;
                }
                if (this.sensor16ResponseToTank2 === undefined) {
                    this.sensor16ResponseToTank2 = 0;
                }
                if (this.sensor16ResponseToTank3 === undefined) {
                    this.sensor16ResponseToTank3 = 0;
                }
                if (this.sensor16ResponseToMissile1 === undefined) {
                    this.sensor16ResponseToMissile1 = 0;
                }
                if (this.sensor16ResponseToMissile2 === undefined) {
                    this.sensor16ResponseToMissile2 = 0;
                }
                if (this.sensor16ResponseToMissile3 === undefined) {
                    this.sensor16ResponseToMissile3 = 0;
                }
                if (this.responseToMissileHit1 === undefined) {
                    this.responseToMissileHit1 = 0;
                }
                if (this.responseToMissileHit2 === undefined) {
                    this.responseToMissileHit2 = 0;
                }
                if (this.responseToMissileHit3 === undefined) {
                    this.responseToMissileHit3 = 0;
                }
                if (this.responseToFacingTarget1 === undefined) {
                    this.responseToFacingTarget1 = 0;
                }
                if (this.responseToFacingTarget2 === undefined) {
                    this.responseToFacingTarget2 = 0;
                }
                if (this.responseToFacingTarget3 === undefined) {
                    this.responseToFacingTarget3 = 0;
                }
                if (this.weaponStrategyFavourite1 === undefined) {
                    this.weaponStrategyFavourite1 = 0;
                }
                if (this.weaponStrategySecondFavourite1 === undefined) {
                    this.weaponStrategySecondFavourite1 = 0;
                }
                if (this.weaponStrategyThirdFavourite1 === undefined) {
                    this.weaponStrategyThirdFavourite1 = 0;
                }
                if (this.weaponStrategyFourthFavourite1 === undefined) {
                    this.weaponStrategyFourthFavourite1 = 0;
                }
                if (this.weaponStrategyFifthFavourite1 === undefined) {
                    this.weaponStrategyFifthFavourite1 = 0;
                }
                if (this.weaponStrategyFavourite2 === undefined) {
                    this.weaponStrategyFavourite2 = 0;
                }
                if (this.weaponStrategySecondFavourite2 === undefined) {
                    this.weaponStrategySecondFavourite2 = 0;
                }
                if (this.weaponStrategyThirdFavourite2 === undefined) {
                    this.weaponStrategyThirdFavourite2 = 0;
                }
                if (this.weaponStrategyFourthFavourite2 === undefined) {
                    this.weaponStrategyFourthFavourite2 = 0;
                }
                if (this.weaponStrategyFifthFavourite2 === undefined) {
                    this.weaponStrategyFifthFavourite2 = 0;
                }
                if (this.weaponStrategyFavourite3 === undefined) {
                    this.weaponStrategyFavourite3 = 0;
                }
                if (this.weaponStrategySecondFavourite3 === undefined) {
                    this.weaponStrategySecondFavourite3 = 0;
                }
                if (this.weaponStrategyThirdFavourite3 === undefined) {
                    this.weaponStrategyThirdFavourite3 = 0;
                }
                if (this.weaponStrategyFourthFavourite3 === undefined) {
                    this.weaponStrategyFourthFavourite3 = 0;
                }
                if (this.weaponStrategyFifthFavourite3 === undefined) {
                    this.weaponStrategyFifthFavourite3 = 0;
                }
                if (this.weaponStrategyFavourite4 === undefined) {
                    this.weaponStrategyFavourite4 = 0;
                }
                if (this.weaponStrategySecondFavourite4 === undefined) {
                    this.weaponStrategySecondFavourite4 = 0;
                }
                if (this.weaponStrategyThirdFavourite4 === undefined) {
                    this.weaponStrategyThirdFavourite4 = 0;
                }
                if (this.weaponStrategyFourthFavourite4 === undefined) {
                    this.weaponStrategyFourthFavourite4 = 0;
                }
                if (this.weaponStrategyFifthFavourite4 === undefined) {
                    this.weaponStrategyFifthFavourite4 = 0;
                }
                if (this.weaponStrategyFavourite5 === undefined) {
                    this.weaponStrategyFavourite5 = 0;
                }
                if (this.weaponStrategySecondFavourite5 === undefined) {
                    this.weaponStrategySecondFavourite5 = 0;
                }
                if (this.weaponStrategyThirdFavourite5 === undefined) {
                    this.weaponStrategyThirdFavourite5 = 0;
                }
                if (this.weaponStrategyFourthFavourite5 === undefined) {
                    this.weaponStrategyFourthFavourite5 = 0;
                }
                if (this.weaponStrategyFifthFavourite5 === undefined) {
                    this.weaponStrategyFifthFavourite5 = 0;
                }
                if (this.weaponStrategyFavourite6 === undefined) {
                    this.weaponStrategyFavourite6 = 0;
                }
                if (this.weaponStrategySecondFavourite6 === undefined) {
                    this.weaponStrategySecondFavourite6 = 0;
                }
                if (this.weaponStrategyThirdFavourite6 === undefined) {
                    this.weaponStrategyThirdFavourite6 = 0;
                }
                if (this.weaponStrategyFourthFavourite6 === undefined) {
                    this.weaponStrategyFourthFavourite6 = 0;
                }
                if (this.weaponStrategyFifthFavourite6 === undefined) {
                    this.weaponStrategyFifthFavourite6 = 0;
                }
                if (this.weaponStrategyFavourite7 === undefined) {
                    this.weaponStrategyFavourite7 = 0;
                }
                if (this.weaponStrategySecondFavourite7 === undefined) {
                    this.weaponStrategySecondFavourite7 = 0;
                }
                if (this.weaponStrategyThirdFavourite7 === undefined) {
                    this.weaponStrategyThirdFavourite7 = 0;
                }
                if (this.weaponStrategyFourthFavourite7 === undefined) {
                    this.weaponStrategyFourthFavourite7 = 0;
                }
                if (this.weaponStrategyFifthFavourite7 === undefined) {
                    this.weaponStrategyFifthFavourite7 = 0;
                }
                if (this.weaponStrategyFavourite8 === undefined) {
                    this.weaponStrategyFavourite8 = 0;
                }
                if (this.weaponStrategySecondFavourite8 === undefined) {
                    this.weaponStrategySecondFavourite8 = 0;
                }
                if (this.weaponStrategyThirdFavourite8 === undefined) {
                    this.weaponStrategyThirdFavourite8 = 0;
                }
                if (this.weaponStrategyFourthFavourite8 === undefined) {
                    this.weaponStrategyFourthFavourite8 = 0;
                }
                if (this.weaponStrategyFifthFavourite8 === undefined) {
                    this.weaponStrategyFifthFavourite8 = 0;
                }
                if (this.weaponFuelRatio === undefined) {
                    this.weaponFuelRatio = 0;
                }
                if (this.shoppingStrategyAction1 === undefined) {
                    this.shoppingStrategyAction1 = 0;
                }
                if (this.shoppingStrategyCondition1 === undefined) {
                    this.shoppingStrategyCondition1 = 0;
                }
                if (this.shoppingStrategyAction2 === undefined) {
                    this.shoppingStrategyAction2 = 0;
                }
                if (this.shoppingStrategyCondition2 === undefined) {
                    this.shoppingStrategyCondition2 = 0;
                }
                if (this.shoppingStrategyAction3 === undefined) {
                    this.shoppingStrategyAction3 = 0;
                }
                if (this.shoppingStrategyCondition3 === undefined) {
                    this.shoppingStrategyCondition3 = 0;
                }
                if (this.shoppingStrategyAction4 === undefined) {
                    this.shoppingStrategyAction4 = 0;
                }
                if (this.shoppingStrategyCondition4 === undefined) {
                    this.shoppingStrategyCondition4 = 0;
                }
                if (this.shoppingStrategyAction5 === undefined) {
                    this.shoppingStrategyAction5 = 0;
                }
                if (this.shoppingStrategyCondition5 === undefined) {
                    this.shoppingStrategyCondition5 = 0;
                }
                if (this.shoppingStrategyAction6 === undefined) {
                    this.shoppingStrategyAction6 = 0;
                }
                if (this.shoppingStrategyCondition6 === undefined) {
                    this.shoppingStrategyCondition6 = 0;
                }
                if (this.shoppingStrategyAction7 === undefined) {
                    this.shoppingStrategyAction7 = 0;
                }
                if (this.shoppingStrategyCondition7 === undefined) {
                    this.shoppingStrategyCondition7 = 0;
                }
                if (this.shoppingStrategyAction8 === undefined) {
                    this.shoppingStrategyAction8 = 0;
                }
                if (this.shoppingStrategyCondition8 === undefined) {
                    this.shoppingStrategyCondition8 = 0;
                }
                if (this.shoppingStrategyAction9 === undefined) {
                    this.shoppingStrategyAction9 = 0;
                }
                if (this.shoppingStrategyCondition9 === undefined) {
                    this.shoppingStrategyCondition9 = 0;
                }
                if (this.shoppingStrategyAction10 === undefined) {
                    this.shoppingStrategyAction10 = 0;
                }
                if (this.shoppingStrategyCondition10 === undefined) {
                    this.shoppingStrategyCondition10 = 0;
                }
                if (this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced === undefined) {
                    this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = 0;
                }
                if (this.shoppingStrategyMaximumFireUnitsThatBePurchased === undefined) {
                    this.shoppingStrategyMaximumFireUnitsThatBePurchased = 0;
                }
                if (this.timeOfLastClock1Tick === undefined) {
                    this.timeOfLastClock1Tick = 0;
                }
                if (this.timeOfLastClock2Tick === undefined) {
                    this.timeOfLastClock2Tick = 0;
                }
                if (this.timeOfLastClock3Tick === undefined) {
                    this.timeOfLastClock3Tick = 0;
                }
                if (this.timeOfLastClock4Tick === undefined) {
                    this.timeOfLastClock4Tick = 0;
                }
                if (this.timeOfLastClock5Tick === undefined) {
                    this.timeOfLastClock5Tick = 0;
                }
                if (this.timeOfLastClock6Tick === undefined) {
                    this.timeOfLastClock6Tick = 0;
                }
                if (this.timeOfLastClock7Tick === undefined) {
                    this.timeOfLastClock7Tick = 0;
                }
                if (this.timeOfLastClock8Tick === undefined) {
                    this.timeOfLastClock8Tick = 0;
                }
                if (this.timeOfLastClock9Tick === undefined) {
                    this.timeOfLastClock9Tick = 0;
                }
                if (this.timeOfLastClock10Tick === undefined) {
                    this.timeOfLastClock10Tick = 0;
                }
                if (this.timeOfLastSensor1Tick === undefined) {
                    this.timeOfLastSensor1Tick = 0;
                }
                if (this.timeOfLastSensor2Tick === undefined) {
                    this.timeOfLastSensor2Tick = 0;
                }
                if (this.timeOfLastSensor3Tick === undefined) {
                    this.timeOfLastSensor3Tick = 0;
                }
                if (this.timeOfLastSensor4Tick === undefined) {
                    this.timeOfLastSensor4Tick = 0;
                }
                if (this.timeOfLastSensor5Tick === undefined) {
                    this.timeOfLastSensor5Tick = 0;
                }
                if (this.timeOfLastSensor6Tick === undefined) {
                    this.timeOfLastSensor6Tick = 0;
                }
                if (this.timeOfLastSensor7Tick === undefined) {
                    this.timeOfLastSensor7Tick = 0;
                }
                if (this.timeOfLastSensor8Tick === undefined) {
                    this.timeOfLastSensor8Tick = 0;
                }
                if (this.timeOfLastSensor9Tick === undefined) {
                    this.timeOfLastSensor9Tick = 0;
                }
                if (this.timeOfLastSensor10Tick === undefined) {
                    this.timeOfLastSensor10Tick = 0;
                }
                if (this.timeOfLastSensor11Tick === undefined) {
                    this.timeOfLastSensor11Tick = 0;
                }
                if (this.timeOfLastSensor12Tick === undefined) {
                    this.timeOfLastSensor12Tick = 0;
                }
                if (this.timeOfLastSensor13Tick === undefined) {
                    this.timeOfLastSensor13Tick = 0;
                }
                if (this.timeOfLastSensor14Tick === undefined) {
                    this.timeOfLastSensor14Tick = 0;
                }
                if (this.timeOfLastSensor15Tick === undefined) {
                    this.timeOfLastSensor15Tick = 0;
                }
                if (this.timeOfLastSensor16Tick === undefined) {
                    this.timeOfLastSensor16Tick = 0;
                }
                (() => {
                    this.filename = fileName;
                    switch (fileName) {
                        case "[keyboard1]":
                            this.name = "Keyboard 1";
                            this.type = RobotSpecification.KEYBOARD1;
                            break;
                        case "[keyboard2]":
                            this.name = "Keyboard 2";
                            this.type = RobotSpecification.KEYBOARD2;
                            break;
                        case "[keyboard3]":
                            this.name = "Keyboard 3";
                            this.type = RobotSpecification.KEYBOARD3;
                            break;
                        case "[keyboard4]":
                            this.name = "Keyboard 4";
                            this.type = RobotSpecification.KEYBOARD4;
                            break;
                        default:
                            if (fileName.indexOf("joystick") !== -1) {
                                const joyNumber = "" + fileName.charAt(9);
                                const jId = parseInt(joyNumber);
                                this.name = "Joystick " + jId;
                                this.type = jId + 4;
                            } else {
                                this.type = RobotSpecification.ROBOT;
                                this.loadFromFile();
                            }
                            break;
                    }
                })();
            } else if (fileName === undefined) {
                let __args = arguments;
                if (this.type === undefined) {
                    this.type = 0;
                }
                if (this.filename === undefined) {
                    this.filename = null;
                }
                if (this.name === undefined) {
                    this.name = null;
                }
                if (this.description === undefined) {
                    this.description = null;
                }
                if (this.viewSensors === undefined) {
                    this.viewSensors = 0;
                }
                if (this.clock1Probability === undefined) {
                    this.clock1Probability = 0;
                }
                if (this.clock2Probability === undefined) {
                    this.clock2Probability = 0;
                }
                if (this.clock3Probability === undefined) {
                    this.clock3Probability = 0;
                }
                if (this.clock4Probability === undefined) {
                    this.clock4Probability = 0;
                }
                if (this.clock5Probability === undefined) {
                    this.clock5Probability = 0;
                }
                if (this.clock6Probability === undefined) {
                    this.clock6Probability = 0;
                }
                if (this.clock7Probability === undefined) {
                    this.clock7Probability = 0;
                }
                if (this.clock8Probability === undefined) {
                    this.clock8Probability = 0;
                }
                if (this.clock9Probability === undefined) {
                    this.clock9Probability = 0;
                }
                if (this.clock10Probability === undefined) {
                    this.clock10Probability = 0;
                }
                if (this.clock1Period === undefined) {
                    this.clock1Period = 0;
                }
                if (this.clock2Period === undefined) {
                    this.clock2Period = 0;
                }
                if (this.clock3Period === undefined) {
                    this.clock3Period = 0;
                }
                if (this.clock4Period === undefined) {
                    this.clock4Period = 0;
                }
                if (this.clock5Period === undefined) {
                    this.clock5Period = 0;
                }
                if (this.clock6Period === undefined) {
                    this.clock6Period = 0;
                }
                if (this.clock7Period === undefined) {
                    this.clock7Period = 0;
                }
                if (this.clock8Period === undefined) {
                    this.clock8Period = 0;
                }
                if (this.clock9Period === undefined) {
                    this.clock9Period = 0;
                }
                if (this.clock10Period === undefined) {
                    this.clock10Period = 0;
                }
                if (this.clock1Requirement1 === undefined) {
                    this.clock1Requirement1 = 0;
                }
                if (this.clock1Requirement2 === undefined) {
                    this.clock1Requirement2 = 0;
                }
                if (this.clock2Requirement1 === undefined) {
                    this.clock2Requirement1 = 0;
                }
                if (this.clock2Requirement2 === undefined) {
                    this.clock2Requirement2 = 0;
                }
                if (this.clock3Requirement1 === undefined) {
                    this.clock3Requirement1 = 0;
                }
                if (this.clock3Requirement2 === undefined) {
                    this.clock3Requirement2 = 0;
                }
                if (this.clock4Requirement1 === undefined) {
                    this.clock4Requirement1 = 0;
                }
                if (this.clock4Requirement2 === undefined) {
                    this.clock4Requirement2 = 0;
                }
                if (this.clock5Requirement1 === undefined) {
                    this.clock5Requirement1 = 0;
                }
                if (this.clock5Requirement2 === undefined) {
                    this.clock5Requirement2 = 0;
                }
                if (this.clock6Requirement1 === undefined) {
                    this.clock6Requirement1 = 0;
                }
                if (this.clock6Requirement2 === undefined) {
                    this.clock6Requirement2 = 0;
                }
                if (this.clock7Requirement1 === undefined) {
                    this.clock7Requirement1 = 0;
                }
                if (this.clock7Requirement2 === undefined) {
                    this.clock7Requirement2 = 0;
                }
                if (this.clock8Requirement1 === undefined) {
                    this.clock8Requirement1 = 0;
                }
                if (this.clock8Requirement2 === undefined) {
                    this.clock8Requirement2 = 0;
                }
                if (this.clock9Requirement1 === undefined) {
                    this.clock9Requirement1 = 0;
                }
                if (this.clock9Requirement2 === undefined) {
                    this.clock9Requirement2 = 0;
                }
                if (this.clock10Requirement1 === undefined) {
                    this.clock10Requirement1 = 0;
                }
                if (this.clock10Requirement2 === undefined) {
                    this.clock10Requirement2 = 0;
                }
                if (this.clock1Response1 === undefined) {
                    this.clock1Response1 = 0;
                }
                if (this.clock1Response2 === undefined) {
                    this.clock1Response2 = 0;
                }
                if (this.clock1Response3 === undefined) {
                    this.clock1Response3 = 0;
                }
                if (this.clock2Response1 === undefined) {
                    this.clock2Response1 = 0;
                }
                if (this.clock2Response2 === undefined) {
                    this.clock2Response2 = 0;
                }
                if (this.clock2Response3 === undefined) {
                    this.clock2Response3 = 0;
                }
                if (this.clock3Response1 === undefined) {
                    this.clock3Response1 = 0;
                }
                if (this.clock3Response2 === undefined) {
                    this.clock3Response2 = 0;
                }
                if (this.clock3Response3 === undefined) {
                    this.clock3Response3 = 0;
                }
                if (this.clock4Response1 === undefined) {
                    this.clock4Response1 = 0;
                }
                if (this.clock4Response2 === undefined) {
                    this.clock4Response2 = 0;
                }
                if (this.clock4Response3 === undefined) {
                    this.clock4Response3 = 0;
                }
                if (this.clock5Response1 === undefined) {
                    this.clock5Response1 = 0;
                }
                if (this.clock5Response2 === undefined) {
                    this.clock5Response2 = 0;
                }
                if (this.clock5Response3 === undefined) {
                    this.clock5Response3 = 0;
                }
                if (this.clock6Response1 === undefined) {
                    this.clock6Response1 = 0;
                }
                if (this.clock6Response2 === undefined) {
                    this.clock6Response2 = 0;
                }
                if (this.clock6Response3 === undefined) {
                    this.clock6Response3 = 0;
                }
                if (this.clock7Response1 === undefined) {
                    this.clock7Response1 = 0;
                }
                if (this.clock7Response2 === undefined) {
                    this.clock7Response2 = 0;
                }
                if (this.clock7Response3 === undefined) {
                    this.clock7Response3 = 0;
                }
                if (this.clock8Response1 === undefined) {
                    this.clock8Response1 = 0;
                }
                if (this.clock8Response2 === undefined) {
                    this.clock8Response2 = 0;
                }
                if (this.clock8Response3 === undefined) {
                    this.clock8Response3 = 0;
                }
                if (this.clock9Response1 === undefined) {
                    this.clock9Response1 = 0;
                }
                if (this.clock9Response2 === undefined) {
                    this.clock9Response2 = 0;
                }
                if (this.clock9Response3 === undefined) {
                    this.clock9Response3 = 0;
                }
                if (this.clock10Response1 === undefined) {
                    this.clock10Response1 = 0;
                }
                if (this.clock10Response2 === undefined) {
                    this.clock10Response2 = 0;
                }
                if (this.clock10Response3 === undefined) {
                    this.clock10Response3 = 0;
                }
                if (this.sensor1Angle === undefined) {
                    this.sensor1Angle = 0;
                }
                if (this.sensor2Angle === undefined) {
                    this.sensor2Angle = 0;
                }
                if (this.sensor3Angle === undefined) {
                    this.sensor3Angle = 0;
                }
                if (this.sensor4Angle === undefined) {
                    this.sensor4Angle = 0;
                }
                if (this.sensor5Angle === undefined) {
                    this.sensor5Angle = 0;
                }
                if (this.sensor6Angle === undefined) {
                    this.sensor6Angle = 0;
                }
                if (this.sensor7Angle === undefined) {
                    this.sensor7Angle = 0;
                }
                if (this.sensor8Angle === undefined) {
                    this.sensor8Angle = 0;
                }
                if (this.sensor9Angle === undefined) {
                    this.sensor9Angle = 0;
                }
                if (this.sensor10Angle === undefined) {
                    this.sensor10Angle = 0;
                }
                if (this.sensor11Angle === undefined) {
                    this.sensor11Angle = 0;
                }
                if (this.sensor12Angle === undefined) {
                    this.sensor12Angle = 0;
                }
                if (this.sensor13Angle === undefined) {
                    this.sensor13Angle = 0;
                }
                if (this.sensor14Angle === undefined) {
                    this.sensor14Angle = 0;
                }
                if (this.sensor15Angle === undefined) {
                    this.sensor15Angle = 0;
                }
                if (this.sensor16Angle === undefined) {
                    this.sensor16Angle = 0;
                }
                if (this.sensor1Length === undefined) {
                    this.sensor1Length = 0;
                }
                if (this.sensor2Length === undefined) {
                    this.sensor2Length = 0;
                }
                if (this.sensor3Length === undefined) {
                    this.sensor3Length = 0;
                }
                if (this.sensor4Length === undefined) {
                    this.sensor4Length = 0;
                }
                if (this.sensor5Length === undefined) {
                    this.sensor5Length = 0;
                }
                if (this.sensor6Length === undefined) {
                    this.sensor6Length = 0;
                }
                if (this.sensor7Length === undefined) {
                    this.sensor7Length = 0;
                }
                if (this.sensor8Length === undefined) {
                    this.sensor8Length = 0;
                }
                if (this.sensor9Length === undefined) {
                    this.sensor9Length = 0;
                }
                if (this.sensor10Length === undefined) {
                    this.sensor10Length = 0;
                }
                if (this.sensor11Length === undefined) {
                    this.sensor11Length = 0;
                }
                if (this.sensor12Length === undefined) {
                    this.sensor12Length = 0;
                }
                if (this.sensor13Length === undefined) {
                    this.sensor13Length = 0;
                }
                if (this.sensor14Length === undefined) {
                    this.sensor14Length = 0;
                }
                if (this.sensor15Length === undefined) {
                    this.sensor15Length = 0;
                }
                if (this.sensor16Length === undefined) {
                    this.sensor16Length = 0;
                }
                if (this.sensor1Width === undefined) {
                    this.sensor1Width = 0;
                }
                if (this.sensor2Width === undefined) {
                    this.sensor2Width = 0;
                }
                if (this.sensor3Width === undefined) {
                    this.sensor3Width = 0;
                }
                if (this.sensor4Width === undefined) {
                    this.sensor4Width = 0;
                }
                if (this.sensor5Width === undefined) {
                    this.sensor5Width = 0;
                }
                if (this.sensor6Width === undefined) {
                    this.sensor6Width = 0;
                }
                if (this.sensor7Width === undefined) {
                    this.sensor7Width = 0;
                }
                if (this.sensor8Width === undefined) {
                    this.sensor8Width = 0;
                }
                if (this.sensor9Width === undefined) {
                    this.sensor9Width = 0;
                }
                if (this.sensor10Width === undefined) {
                    this.sensor10Width = 0;
                }
                if (this.sensor11Width === undefined) {
                    this.sensor11Width = 0;
                }
                if (this.sensor12Width === undefined) {
                    this.sensor12Width = 0;
                }
                if (this.sensor13Width === undefined) {
                    this.sensor13Width = 0;
                }
                if (this.sensor14Width === undefined) {
                    this.sensor14Width = 0;
                }
                if (this.sensor15Width === undefined) {
                    this.sensor15Width = 0;
                }
                if (this.sensor16Width === undefined) {
                    this.sensor16Width = 0;
                }
                if (this.sensor1Probability === undefined) {
                    this.sensor1Probability = 0;
                }
                if (this.sensor2Probability === undefined) {
                    this.sensor2Probability = 0;
                }
                if (this.sensor3Probability === undefined) {
                    this.sensor3Probability = 0;
                }
                if (this.sensor4Probability === undefined) {
                    this.sensor4Probability = 0;
                }
                if (this.sensor5Probability === undefined) {
                    this.sensor5Probability = 0;
                }
                if (this.sensor6Probability === undefined) {
                    this.sensor6Probability = 0;
                }
                if (this.sensor7Probability === undefined) {
                    this.sensor7Probability = 0;
                }
                if (this.sensor8Probability === undefined) {
                    this.sensor8Probability = 0;
                }
                if (this.sensor9Probability === undefined) {
                    this.sensor9Probability = 0;
                }
                if (this.sensor10Probability === undefined) {
                    this.sensor10Probability = 0;
                }
                if (this.sensor11Probability === undefined) {
                    this.sensor11Probability = 0;
                }
                if (this.sensor12Probability === undefined) {
                    this.sensor12Probability = 0;
                }
                if (this.sensor13Probability === undefined) {
                    this.sensor13Probability = 0;
                }
                if (this.sensor14Probability === undefined) {
                    this.sensor14Probability = 0;
                }
                if (this.sensor15Probability === undefined) {
                    this.sensor15Probability = 0;
                }
                if (this.sensor16Probability === undefined) {
                    this.sensor16Probability = 0;
                }
                if (this.sensor1Period === undefined) {
                    this.sensor1Period = 0;
                }
                if (this.sensor2Period === undefined) {
                    this.sensor2Period = 0;
                }
                if (this.sensor3Period === undefined) {
                    this.sensor3Period = 0;
                }
                if (this.sensor4Period === undefined) {
                    this.sensor4Period = 0;
                }
                if (this.sensor5Period === undefined) {
                    this.sensor5Period = 0;
                }
                if (this.sensor6Period === undefined) {
                    this.sensor6Period = 0;
                }
                if (this.sensor7Period === undefined) {
                    this.sensor7Period = 0;
                }
                if (this.sensor8Period === undefined) {
                    this.sensor8Period = 0;
                }
                if (this.sensor9Period === undefined) {
                    this.sensor9Period = 0;
                }
                if (this.sensor10Period === undefined) {
                    this.sensor10Period = 0;
                }
                if (this.sensor11Period === undefined) {
                    this.sensor11Period = 0;
                }
                if (this.sensor12Period === undefined) {
                    this.sensor12Period = 0;
                }
                if (this.sensor13Period === undefined) {
                    this.sensor13Period = 0;
                }
                if (this.sensor14Period === undefined) {
                    this.sensor14Period = 0;
                }
                if (this.sensor15Period === undefined) {
                    this.sensor15Period = 0;
                }
                if (this.sensor16Period === undefined) {
                    this.sensor16Period = 0;
                }
                if (this.sensor1ParallelOffset === undefined) {
                    this.sensor1ParallelOffset = 0;
                }
                if (this.sensor2ParallelOffset === undefined) {
                    this.sensor2ParallelOffset = 0;
                }
                if (this.sensor3ParallelOffset === undefined) {
                    this.sensor3ParallelOffset = 0;
                }
                if (this.sensor4ParallelOffset === undefined) {
                    this.sensor4ParallelOffset = 0;
                }
                if (this.sensor5ParallelOffset === undefined) {
                    this.sensor5ParallelOffset = 0;
                }
                if (this.sensor6ParallelOffset === undefined) {
                    this.sensor6ParallelOffset = 0;
                }
                if (this.sensor7ParallelOffset === undefined) {
                    this.sensor7ParallelOffset = 0;
                }
                if (this.sensor8ParallelOffset === undefined) {
                    this.sensor8ParallelOffset = 0;
                }
                if (this.sensor9ParallelOffset === undefined) {
                    this.sensor9ParallelOffset = 0;
                }
                if (this.sensor10ParallelOffset === undefined) {
                    this.sensor10ParallelOffset = 0;
                }
                if (this.sensor11ParallelOffset === undefined) {
                    this.sensor11ParallelOffset = 0;
                }
                if (this.sensor12ParallelOffset === undefined) {
                    this.sensor12ParallelOffset = 0;
                }
                if (this.sensor13ParallelOffset === undefined) {
                    this.sensor13ParallelOffset = 0;
                }
                if (this.sensor14ParallelOffset === undefined) {
                    this.sensor14ParallelOffset = 0;
                }
                if (this.sensor15ParallelOffset === undefined) {
                    this.sensor15ParallelOffset = 0;
                }
                if (this.sensor16ParallelOffset === undefined) {
                    this.sensor16ParallelOffset = 0;
                }
                if (this.sensor1PerpendicularOffset === undefined) {
                    this.sensor1PerpendicularOffset = 0;
                }
                if (this.sensor2PerpendicularOffset === undefined) {
                    this.sensor2PerpendicularOffset = 0;
                }
                if (this.sensor3PerpendicularOffset === undefined) {
                    this.sensor3PerpendicularOffset = 0;
                }
                if (this.sensor4PerpendicularOffset === undefined) {
                    this.sensor4PerpendicularOffset = 0;
                }
                if (this.sensor5PerpendicularOffset === undefined) {
                    this.sensor5PerpendicularOffset = 0;
                }
                if (this.sensor6PerpendicularOffset === undefined) {
                    this.sensor6PerpendicularOffset = 0;
                }
                if (this.sensor7PerpendicularOffset === undefined) {
                    this.sensor7PerpendicularOffset = 0;
                }
                if (this.sensor8PerpendicularOffset === undefined) {
                    this.sensor8PerpendicularOffset = 0;
                }
                if (this.sensor9PerpendicularOffset === undefined) {
                    this.sensor9PerpendicularOffset = 0;
                }
                if (this.sensor10PerpendicularOffset === undefined) {
                    this.sensor10PerpendicularOffset = 0;
                }
                if (this.sensor11PerpendicularOffset === undefined) {
                    this.sensor11PerpendicularOffset = 0;
                }
                if (this.sensor12PerpendicularOffset === undefined) {
                    this.sensor12PerpendicularOffset = 0;
                }
                if (this.sensor13PerpendicularOffset === undefined) {
                    this.sensor13PerpendicularOffset = 0;
                }
                if (this.sensor14PerpendicularOffset === undefined) {
                    this.sensor14PerpendicularOffset = 0;
                }
                if (this.sensor15PerpendicularOffset === undefined) {
                    this.sensor15PerpendicularOffset = 0;
                }
                if (this.sensor16PerpendicularOffset === undefined) {
                    this.sensor16PerpendicularOffset = 0;
                }
                if (this.sensor1Condition1 === undefined) {
                    this.sensor1Condition1 = 0;
                }
                if (this.sensor1Condition2 === undefined) {
                    this.sensor1Condition2 = 0;
                }
                if (this.sensor1Condition3 === undefined) {
                    this.sensor1Condition3 = 0;
                }
                if (this.sensor2Condition1 === undefined) {
                    this.sensor2Condition1 = 0;
                }
                if (this.sensor2Condition2 === undefined) {
                    this.sensor2Condition2 = 0;
                }
                if (this.sensor2Condition3 === undefined) {
                    this.sensor2Condition3 = 0;
                }
                if (this.sensor3Condition1 === undefined) {
                    this.sensor3Condition1 = 0;
                }
                if (this.sensor3Condition2 === undefined) {
                    this.sensor3Condition2 = 0;
                }
                if (this.sensor3Condition3 === undefined) {
                    this.sensor3Condition3 = 0;
                }
                if (this.sensor4Condition1 === undefined) {
                    this.sensor4Condition1 = 0;
                }
                if (this.sensor4Condition2 === undefined) {
                    this.sensor4Condition2 = 0;
                }
                if (this.sensor4Condition3 === undefined) {
                    this.sensor4Condition3 = 0;
                }
                if (this.sensor5Condition1 === undefined) {
                    this.sensor5Condition1 = 0;
                }
                if (this.sensor5Condition2 === undefined) {
                    this.sensor5Condition2 = 0;
                }
                if (this.sensor5Condition3 === undefined) {
                    this.sensor5Condition3 = 0;
                }
                if (this.sensor6Condition1 === undefined) {
                    this.sensor6Condition1 = 0;
                }
                if (this.sensor6Condition2 === undefined) {
                    this.sensor6Condition2 = 0;
                }
                if (this.sensor6Condition3 === undefined) {
                    this.sensor6Condition3 = 0;
                }
                if (this.sensor7Condition1 === undefined) {
                    this.sensor7Condition1 = 0;
                }
                if (this.sensor7Condition2 === undefined) {
                    this.sensor7Condition2 = 0;
                }
                if (this.sensor7Condition3 === undefined) {
                    this.sensor7Condition3 = 0;
                }
                if (this.sensor8Condition1 === undefined) {
                    this.sensor8Condition1 = 0;
                }
                if (this.sensor8Condition2 === undefined) {
                    this.sensor8Condition2 = 0;
                }
                if (this.sensor8Condition3 === undefined) {
                    this.sensor8Condition3 = 0;
                }
                if (this.sensor9Condition1 === undefined) {
                    this.sensor9Condition1 = 0;
                }
                if (this.sensor9Condition2 === undefined) {
                    this.sensor9Condition2 = 0;
                }
                if (this.sensor9Condition3 === undefined) {
                    this.sensor9Condition3 = 0;
                }
                if (this.sensor10Condition1 === undefined) {
                    this.sensor10Condition1 = 0;
                }
                if (this.sensor10Condition2 === undefined) {
                    this.sensor10Condition2 = 0;
                }
                if (this.sensor10Condition3 === undefined) {
                    this.sensor10Condition3 = 0;
                }
                if (this.sensor11Condition1 === undefined) {
                    this.sensor11Condition1 = 0;
                }
                if (this.sensor11Condition2 === undefined) {
                    this.sensor11Condition2 = 0;
                }
                if (this.sensor11Condition3 === undefined) {
                    this.sensor11Condition3 = 0;
                }
                if (this.sensor12Condition1 === undefined) {
                    this.sensor12Condition1 = 0;
                }
                if (this.sensor12Condition2 === undefined) {
                    this.sensor12Condition2 = 0;
                }
                if (this.sensor12Condition3 === undefined) {
                    this.sensor12Condition3 = 0;
                }
                if (this.sensor13Condition1 === undefined) {
                    this.sensor13Condition1 = 0;
                }
                if (this.sensor13Condition2 === undefined) {
                    this.sensor13Condition2 = 0;
                }
                if (this.sensor13Condition3 === undefined) {
                    this.sensor13Condition3 = 0;
                }
                if (this.sensor14Condition1 === undefined) {
                    this.sensor14Condition1 = 0;
                }
                if (this.sensor14Condition2 === undefined) {
                    this.sensor14Condition2 = 0;
                }
                if (this.sensor14Condition3 === undefined) {
                    this.sensor14Condition3 = 0;
                }
                if (this.sensor15Condition1 === undefined) {
                    this.sensor15Condition1 = 0;
                }
                if (this.sensor15Condition2 === undefined) {
                    this.sensor15Condition2 = 0;
                }
                if (this.sensor15Condition3 === undefined) {
                    this.sensor15Condition3 = 0;
                }
                if (this.sensor16Condition1 === undefined) {
                    this.sensor16Condition1 = 0;
                }
                if (this.sensor16Condition2 === undefined) {
                    this.sensor16Condition2 = 0;
                }
                if (this.sensor16Condition3 === undefined) {
                    this.sensor16Condition3 = 0;
                }
                if (this.sensor1ResponseToWall1 === undefined) {
                    this.sensor1ResponseToWall1 = 0;
                }
                if (this.sensor1ResponseToWall2 === undefined) {
                    this.sensor1ResponseToWall2 = 0;
                }
                if (this.sensor1ResponseToWall3 === undefined) {
                    this.sensor1ResponseToWall3 = 0;
                }
                if (this.sensor1ResponseToTank1 === undefined) {
                    this.sensor1ResponseToTank1 = 0;
                }
                if (this.sensor1ResponseToTank2 === undefined) {
                    this.sensor1ResponseToTank2 = 0;
                }
                if (this.sensor1ResponseToTank3 === undefined) {
                    this.sensor1ResponseToTank3 = 0;
                }
                if (this.sensor1ResponseToMissile1 === undefined) {
                    this.sensor1ResponseToMissile1 = 0;
                }
                if (this.sensor1ResponseToMissile2 === undefined) {
                    this.sensor1ResponseToMissile2 = 0;
                }
                if (this.sensor1ResponseToMissile3 === undefined) {
                    this.sensor1ResponseToMissile3 = 0;
                }
                if (this.sensor2ResponseToWall1 === undefined) {
                    this.sensor2ResponseToWall1 = 0;
                }
                if (this.sensor2ResponseToWall2 === undefined) {
                    this.sensor2ResponseToWall2 = 0;
                }
                if (this.sensor2ResponseToWall3 === undefined) {
                    this.sensor2ResponseToWall3 = 0;
                }
                if (this.sensor2ResponseToTank1 === undefined) {
                    this.sensor2ResponseToTank1 = 0;
                }
                if (this.sensor2ResponseToTank2 === undefined) {
                    this.sensor2ResponseToTank2 = 0;
                }
                if (this.sensor2ResponseToTank3 === undefined) {
                    this.sensor2ResponseToTank3 = 0;
                }
                if (this.sensor2ResponseToMissile1 === undefined) {
                    this.sensor2ResponseToMissile1 = 0;
                }
                if (this.sensor2ResponseToMissile2 === undefined) {
                    this.sensor2ResponseToMissile2 = 0;
                }
                if (this.sensor2ResponseToMissile3 === undefined) {
                    this.sensor2ResponseToMissile3 = 0;
                }
                if (this.sensor3ResponseToWall1 === undefined) {
                    this.sensor3ResponseToWall1 = 0;
                }
                if (this.sensor3ResponseToWall2 === undefined) {
                    this.sensor3ResponseToWall2 = 0;
                }
                if (this.sensor3ResponseToWall3 === undefined) {
                    this.sensor3ResponseToWall3 = 0;
                }
                if (this.sensor3ResponseToTank1 === undefined) {
                    this.sensor3ResponseToTank1 = 0;
                }
                if (this.sensor3ResponseToTank2 === undefined) {
                    this.sensor3ResponseToTank2 = 0;
                }
                if (this.sensor3ResponseToTank3 === undefined) {
                    this.sensor3ResponseToTank3 = 0;
                }
                if (this.sensor3ResponseToMissile1 === undefined) {
                    this.sensor3ResponseToMissile1 = 0;
                }
                if (this.sensor3ResponseToMissile2 === undefined) {
                    this.sensor3ResponseToMissile2 = 0;
                }
                if (this.sensor3ResponseToMissile3 === undefined) {
                    this.sensor3ResponseToMissile3 = 0;
                }
                if (this.sensor4ResponseToWall1 === undefined) {
                    this.sensor4ResponseToWall1 = 0;
                }
                if (this.sensor4ResponseToWall2 === undefined) {
                    this.sensor4ResponseToWall2 = 0;
                }
                if (this.sensor4ResponseToWall3 === undefined) {
                    this.sensor4ResponseToWall3 = 0;
                }
                if (this.sensor4ResponseToTank1 === undefined) {
                    this.sensor4ResponseToTank1 = 0;
                }
                if (this.sensor4ResponseToTank2 === undefined) {
                    this.sensor4ResponseToTank2 = 0;
                }
                if (this.sensor4ResponseToTank3 === undefined) {
                    this.sensor4ResponseToTank3 = 0;
                }
                if (this.sensor4ResponseToMissile1 === undefined) {
                    this.sensor4ResponseToMissile1 = 0;
                }
                if (this.sensor4ResponseToMissile2 === undefined) {
                    this.sensor4ResponseToMissile2 = 0;
                }
                if (this.sensor4ResponseToMissile3 === undefined) {
                    this.sensor4ResponseToMissile3 = 0;
                }
                if (this.sensor5ResponseToWall1 === undefined) {
                    this.sensor5ResponseToWall1 = 0;
                }
                if (this.sensor5ResponseToWall2 === undefined) {
                    this.sensor5ResponseToWall2 = 0;
                }
                if (this.sensor5ResponseToWall3 === undefined) {
                    this.sensor5ResponseToWall3 = 0;
                }
                if (this.sensor5ResponseToTank1 === undefined) {
                    this.sensor5ResponseToTank1 = 0;
                }
                if (this.sensor5ResponseToTank2 === undefined) {
                    this.sensor5ResponseToTank2 = 0;
                }
                if (this.sensor5ResponseToTank3 === undefined) {
                    this.sensor5ResponseToTank3 = 0;
                }
                if (this.sensor5ResponseToMissile1 === undefined) {
                    this.sensor5ResponseToMissile1 = 0;
                }
                if (this.sensor5ResponseToMissile2 === undefined) {
                    this.sensor5ResponseToMissile2 = 0;
                }
                if (this.sensor5ResponseToMissile3 === undefined) {
                    this.sensor5ResponseToMissile3 = 0;
                }
                if (this.sensor6ResponseToWall1 === undefined) {
                    this.sensor6ResponseToWall1 = 0;
                }
                if (this.sensor6ResponseToWall2 === undefined) {
                    this.sensor6ResponseToWall2 = 0;
                }
                if (this.sensor6ResponseToWall3 === undefined) {
                    this.sensor6ResponseToWall3 = 0;
                }
                if (this.sensor6ResponseToTank1 === undefined) {
                    this.sensor6ResponseToTank1 = 0;
                }
                if (this.sensor6ResponseToTank2 === undefined) {
                    this.sensor6ResponseToTank2 = 0;
                }
                if (this.sensor6ResponseToTank3 === undefined) {
                    this.sensor6ResponseToTank3 = 0;
                }
                if (this.sensor6ResponseToMissile1 === undefined) {
                    this.sensor6ResponseToMissile1 = 0;
                }
                if (this.sensor6ResponseToMissile2 === undefined) {
                    this.sensor6ResponseToMissile2 = 0;
                }
                if (this.sensor6ResponseToMissile3 === undefined) {
                    this.sensor6ResponseToMissile3 = 0;
                }
                if (this.sensor7ResponseToWall1 === undefined) {
                    this.sensor7ResponseToWall1 = 0;
                }
                if (this.sensor7ResponseToWall2 === undefined) {
                    this.sensor7ResponseToWall2 = 0;
                }
                if (this.sensor7ResponseToWall3 === undefined) {
                    this.sensor7ResponseToWall3 = 0;
                }
                if (this.sensor7ResponseToTank1 === undefined) {
                    this.sensor7ResponseToTank1 = 0;
                }
                if (this.sensor7ResponseToTank2 === undefined) {
                    this.sensor7ResponseToTank2 = 0;
                }
                if (this.sensor7ResponseToTank3 === undefined) {
                    this.sensor7ResponseToTank3 = 0;
                }
                if (this.sensor7ResponseToMissile1 === undefined) {
                    this.sensor7ResponseToMissile1 = 0;
                }
                if (this.sensor7ResponseToMissile2 === undefined) {
                    this.sensor7ResponseToMissile2 = 0;
                }
                if (this.sensor7ResponseToMissile3 === undefined) {
                    this.sensor7ResponseToMissile3 = 0;
                }
                if (this.sensor8ResponseToWall1 === undefined) {
                    this.sensor8ResponseToWall1 = 0;
                }
                if (this.sensor8ResponseToWall2 === undefined) {
                    this.sensor8ResponseToWall2 = 0;
                }
                if (this.sensor8ResponseToWall3 === undefined) {
                    this.sensor8ResponseToWall3 = 0;
                }
                if (this.sensor8ResponseToTank1 === undefined) {
                    this.sensor8ResponseToTank1 = 0;
                }
                if (this.sensor8ResponseToTank2 === undefined) {
                    this.sensor8ResponseToTank2 = 0;
                }
                if (this.sensor8ResponseToTank3 === undefined) {
                    this.sensor8ResponseToTank3 = 0;
                }
                if (this.sensor8ResponseToMissile1 === undefined) {
                    this.sensor8ResponseToMissile1 = 0;
                }
                if (this.sensor8ResponseToMissile2 === undefined) {
                    this.sensor8ResponseToMissile2 = 0;
                }
                if (this.sensor8ResponseToMissile3 === undefined) {
                    this.sensor8ResponseToMissile3 = 0;
                }
                if (this.sensor9ResponseToWall1 === undefined) {
                    this.sensor9ResponseToWall1 = 0;
                }
                if (this.sensor9ResponseToWall2 === undefined) {
                    this.sensor9ResponseToWall2 = 0;
                }
                if (this.sensor9ResponseToWall3 === undefined) {
                    this.sensor9ResponseToWall3 = 0;
                }
                if (this.sensor9ResponseToTank1 === undefined) {
                    this.sensor9ResponseToTank1 = 0;
                }
                if (this.sensor9ResponseToTank2 === undefined) {
                    this.sensor9ResponseToTank2 = 0;
                }
                if (this.sensor9ResponseToTank3 === undefined) {
                    this.sensor9ResponseToTank3 = 0;
                }
                if (this.sensor9ResponseToMissile1 === undefined) {
                    this.sensor9ResponseToMissile1 = 0;
                }
                if (this.sensor9ResponseToMissile2 === undefined) {
                    this.sensor9ResponseToMissile2 = 0;
                }
                if (this.sensor9ResponseToMissile3 === undefined) {
                    this.sensor9ResponseToMissile3 = 0;
                }
                if (this.sensor10ResponseToWall1 === undefined) {
                    this.sensor10ResponseToWall1 = 0;
                }
                if (this.sensor10ResponseToWall2 === undefined) {
                    this.sensor10ResponseToWall2 = 0;
                }
                if (this.sensor10ResponseToWall3 === undefined) {
                    this.sensor10ResponseToWall3 = 0;
                }
                if (this.sensor10ResponseToTank1 === undefined) {
                    this.sensor10ResponseToTank1 = 0;
                }
                if (this.sensor10ResponseToTank2 === undefined) {
                    this.sensor10ResponseToTank2 = 0;
                }
                if (this.sensor10ResponseToTank3 === undefined) {
                    this.sensor10ResponseToTank3 = 0;
                }
                if (this.sensor10ResponseToMissile1 === undefined) {
                    this.sensor10ResponseToMissile1 = 0;
                }
                if (this.sensor10ResponseToMissile2 === undefined) {
                    this.sensor10ResponseToMissile2 = 0;
                }
                if (this.sensor10ResponseToMissile3 === undefined) {
                    this.sensor10ResponseToMissile3 = 0;
                }
                if (this.sensor11ResponseToWall1 === undefined) {
                    this.sensor11ResponseToWall1 = 0;
                }
                if (this.sensor11ResponseToWall2 === undefined) {
                    this.sensor11ResponseToWall2 = 0;
                }
                if (this.sensor11ResponseToWall3 === undefined) {
                    this.sensor11ResponseToWall3 = 0;
                }
                if (this.sensor11ResponseToTank1 === undefined) {
                    this.sensor11ResponseToTank1 = 0;
                }
                if (this.sensor11ResponseToTank2 === undefined) {
                    this.sensor11ResponseToTank2 = 0;
                }
                if (this.sensor11ResponseToTank3 === undefined) {
                    this.sensor11ResponseToTank3 = 0;
                }
                if (this.sensor11ResponseToMissile1 === undefined) {
                    this.sensor11ResponseToMissile1 = 0;
                }
                if (this.sensor11ResponseToMissile2 === undefined) {
                    this.sensor11ResponseToMissile2 = 0;
                }
                if (this.sensor11ResponseToMissile3 === undefined) {
                    this.sensor11ResponseToMissile3 = 0;
                }
                if (this.sensor12ResponseToWall1 === undefined) {
                    this.sensor12ResponseToWall1 = 0;
                }
                if (this.sensor12ResponseToWall2 === undefined) {
                    this.sensor12ResponseToWall2 = 0;
                }
                if (this.sensor12ResponseToWall3 === undefined) {
                    this.sensor12ResponseToWall3 = 0;
                }
                if (this.sensor12ResponseToTank1 === undefined) {
                    this.sensor12ResponseToTank1 = 0;
                }
                if (this.sensor12ResponseToTank2 === undefined) {
                    this.sensor12ResponseToTank2 = 0;
                }
                if (this.sensor12ResponseToTank3 === undefined) {
                    this.sensor12ResponseToTank3 = 0;
                }
                if (this.sensor12ResponseToMissile1 === undefined) {
                    this.sensor12ResponseToMissile1 = 0;
                }
                if (this.sensor12ResponseToMissile2 === undefined) {
                    this.sensor12ResponseToMissile2 = 0;
                }
                if (this.sensor12ResponseToMissile3 === undefined) {
                    this.sensor12ResponseToMissile3 = 0;
                }
                if (this.sensor13ResponseToWall1 === undefined) {
                    this.sensor13ResponseToWall1 = 0;
                }
                if (this.sensor13ResponseToWall2 === undefined) {
                    this.sensor13ResponseToWall2 = 0;
                }
                if (this.sensor13ResponseToWall3 === undefined) {
                    this.sensor13ResponseToWall3 = 0;
                }
                if (this.sensor13ResponseToTank1 === undefined) {
                    this.sensor13ResponseToTank1 = 0;
                }
                if (this.sensor13ResponseToTank2 === undefined) {
                    this.sensor13ResponseToTank2 = 0;
                }
                if (this.sensor13ResponseToTank3 === undefined) {
                    this.sensor13ResponseToTank3 = 0;
                }
                if (this.sensor13ResponseToMissile1 === undefined) {
                    this.sensor13ResponseToMissile1 = 0;
                }
                if (this.sensor13ResponseToMissile2 === undefined) {
                    this.sensor13ResponseToMissile2 = 0;
                }
                if (this.sensor13ResponseToMissile3 === undefined) {
                    this.sensor13ResponseToMissile3 = 0;
                }
                if (this.sensor14ResponseToWall1 === undefined) {
                    this.sensor14ResponseToWall1 = 0;
                }
                if (this.sensor14ResponseToWall2 === undefined) {
                    this.sensor14ResponseToWall2 = 0;
                }
                if (this.sensor14ResponseToWall3 === undefined) {
                    this.sensor14ResponseToWall3 = 0;
                }
                if (this.sensor14ResponseToTank1 === undefined) {
                    this.sensor14ResponseToTank1 = 0;
                }
                if (this.sensor14ResponseToTank2 === undefined) {
                    this.sensor14ResponseToTank2 = 0;
                }
                if (this.sensor14ResponseToTank3 === undefined) {
                    this.sensor14ResponseToTank3 = 0;
                }
                if (this.sensor14ResponseToMissile1 === undefined) {
                    this.sensor14ResponseToMissile1 = 0;
                }
                if (this.sensor14ResponseToMissile2 === undefined) {
                    this.sensor14ResponseToMissile2 = 0;
                }
                if (this.sensor14ResponseToMissile3 === undefined) {
                    this.sensor14ResponseToMissile3 = 0;
                }
                if (this.sensor15ResponseToWall1 === undefined) {
                    this.sensor15ResponseToWall1 = 0;
                }
                if (this.sensor15ResponseToWall2 === undefined) {
                    this.sensor15ResponseToWall2 = 0;
                }
                if (this.sensor15ResponseToWall3 === undefined) {
                    this.sensor15ResponseToWall3 = 0;
                }
                if (this.sensor15ResponseToTank1 === undefined) {
                    this.sensor15ResponseToTank1 = 0;
                }
                if (this.sensor15ResponseToTank2 === undefined) {
                    this.sensor15ResponseToTank2 = 0;
                }
                if (this.sensor15ResponseToTank3 === undefined) {
                    this.sensor15ResponseToTank3 = 0;
                }
                if (this.sensor15ResponseToMissile1 === undefined) {
                    this.sensor15ResponseToMissile1 = 0;
                }
                if (this.sensor15ResponseToMissile2 === undefined) {
                    this.sensor15ResponseToMissile2 = 0;
                }
                if (this.sensor15ResponseToMissile3 === undefined) {
                    this.sensor15ResponseToMissile3 = 0;
                }
                if (this.sensor16ResponseToWall1 === undefined) {
                    this.sensor16ResponseToWall1 = 0;
                }
                if (this.sensor16ResponseToWall2 === undefined) {
                    this.sensor16ResponseToWall2 = 0;
                }
                if (this.sensor16ResponseToWall3 === undefined) {
                    this.sensor16ResponseToWall3 = 0;
                }
                if (this.sensor16ResponseToTank1 === undefined) {
                    this.sensor16ResponseToTank1 = 0;
                }
                if (this.sensor16ResponseToTank2 === undefined) {
                    this.sensor16ResponseToTank2 = 0;
                }
                if (this.sensor16ResponseToTank3 === undefined) {
                    this.sensor16ResponseToTank3 = 0;
                }
                if (this.sensor16ResponseToMissile1 === undefined) {
                    this.sensor16ResponseToMissile1 = 0;
                }
                if (this.sensor16ResponseToMissile2 === undefined) {
                    this.sensor16ResponseToMissile2 = 0;
                }
                if (this.sensor16ResponseToMissile3 === undefined) {
                    this.sensor16ResponseToMissile3 = 0;
                }
                if (this.responseToMissileHit1 === undefined) {
                    this.responseToMissileHit1 = 0;
                }
                if (this.responseToMissileHit2 === undefined) {
                    this.responseToMissileHit2 = 0;
                }
                if (this.responseToMissileHit3 === undefined) {
                    this.responseToMissileHit3 = 0;
                }
                if (this.responseToFacingTarget1 === undefined) {
                    this.responseToFacingTarget1 = 0;
                }
                if (this.responseToFacingTarget2 === undefined) {
                    this.responseToFacingTarget2 = 0;
                }
                if (this.responseToFacingTarget3 === undefined) {
                    this.responseToFacingTarget3 = 0;
                }
                if (this.weaponStrategyFavourite1 === undefined) {
                    this.weaponStrategyFavourite1 = 0;
                }
                if (this.weaponStrategySecondFavourite1 === undefined) {
                    this.weaponStrategySecondFavourite1 = 0;
                }
                if (this.weaponStrategyThirdFavourite1 === undefined) {
                    this.weaponStrategyThirdFavourite1 = 0;
                }
                if (this.weaponStrategyFourthFavourite1 === undefined) {
                    this.weaponStrategyFourthFavourite1 = 0;
                }
                if (this.weaponStrategyFifthFavourite1 === undefined) {
                    this.weaponStrategyFifthFavourite1 = 0;
                }
                if (this.weaponStrategyFavourite2 === undefined) {
                    this.weaponStrategyFavourite2 = 0;
                }
                if (this.weaponStrategySecondFavourite2 === undefined) {
                    this.weaponStrategySecondFavourite2 = 0;
                }
                if (this.weaponStrategyThirdFavourite2 === undefined) {
                    this.weaponStrategyThirdFavourite2 = 0;
                }
                if (this.weaponStrategyFourthFavourite2 === undefined) {
                    this.weaponStrategyFourthFavourite2 = 0;
                }
                if (this.weaponStrategyFifthFavourite2 === undefined) {
                    this.weaponStrategyFifthFavourite2 = 0;
                }
                if (this.weaponStrategyFavourite3 === undefined) {
                    this.weaponStrategyFavourite3 = 0;
                }
                if (this.weaponStrategySecondFavourite3 === undefined) {
                    this.weaponStrategySecondFavourite3 = 0;
                }
                if (this.weaponStrategyThirdFavourite3 === undefined) {
                    this.weaponStrategyThirdFavourite3 = 0;
                }
                if (this.weaponStrategyFourthFavourite3 === undefined) {
                    this.weaponStrategyFourthFavourite3 = 0;
                }
                if (this.weaponStrategyFifthFavourite3 === undefined) {
                    this.weaponStrategyFifthFavourite3 = 0;
                }
                if (this.weaponStrategyFavourite4 === undefined) {
                    this.weaponStrategyFavourite4 = 0;
                }
                if (this.weaponStrategySecondFavourite4 === undefined) {
                    this.weaponStrategySecondFavourite4 = 0;
                }
                if (this.weaponStrategyThirdFavourite4 === undefined) {
                    this.weaponStrategyThirdFavourite4 = 0;
                }
                if (this.weaponStrategyFourthFavourite4 === undefined) {
                    this.weaponStrategyFourthFavourite4 = 0;
                }
                if (this.weaponStrategyFifthFavourite4 === undefined) {
                    this.weaponStrategyFifthFavourite4 = 0;
                }
                if (this.weaponStrategyFavourite5 === undefined) {
                    this.weaponStrategyFavourite5 = 0;
                }
                if (this.weaponStrategySecondFavourite5 === undefined) {
                    this.weaponStrategySecondFavourite5 = 0;
                }
                if (this.weaponStrategyThirdFavourite5 === undefined) {
                    this.weaponStrategyThirdFavourite5 = 0;
                }
                if (this.weaponStrategyFourthFavourite5 === undefined) {
                    this.weaponStrategyFourthFavourite5 = 0;
                }
                if (this.weaponStrategyFifthFavourite5 === undefined) {
                    this.weaponStrategyFifthFavourite5 = 0;
                }
                if (this.weaponStrategyFavourite6 === undefined) {
                    this.weaponStrategyFavourite6 = 0;
                }
                if (this.weaponStrategySecondFavourite6 === undefined) {
                    this.weaponStrategySecondFavourite6 = 0;
                }
                if (this.weaponStrategyThirdFavourite6 === undefined) {
                    this.weaponStrategyThirdFavourite6 = 0;
                }
                if (this.weaponStrategyFourthFavourite6 === undefined) {
                    this.weaponStrategyFourthFavourite6 = 0;
                }
                if (this.weaponStrategyFifthFavourite6 === undefined) {
                    this.weaponStrategyFifthFavourite6 = 0;
                }
                if (this.weaponStrategyFavourite7 === undefined) {
                    this.weaponStrategyFavourite7 = 0;
                }
                if (this.weaponStrategySecondFavourite7 === undefined) {
                    this.weaponStrategySecondFavourite7 = 0;
                }
                if (this.weaponStrategyThirdFavourite7 === undefined) {
                    this.weaponStrategyThirdFavourite7 = 0;
                }
                if (this.weaponStrategyFourthFavourite7 === undefined) {
                    this.weaponStrategyFourthFavourite7 = 0;
                }
                if (this.weaponStrategyFifthFavourite7 === undefined) {
                    this.weaponStrategyFifthFavourite7 = 0;
                }
                if (this.weaponStrategyFavourite8 === undefined) {
                    this.weaponStrategyFavourite8 = 0;
                }
                if (this.weaponStrategySecondFavourite8 === undefined) {
                    this.weaponStrategySecondFavourite8 = 0;
                }
                if (this.weaponStrategyThirdFavourite8 === undefined) {
                    this.weaponStrategyThirdFavourite8 = 0;
                }
                if (this.weaponStrategyFourthFavourite8 === undefined) {
                    this.weaponStrategyFourthFavourite8 = 0;
                }
                if (this.weaponStrategyFifthFavourite8 === undefined) {
                    this.weaponStrategyFifthFavourite8 = 0;
                }
                if (this.weaponFuelRatio === undefined) {
                    this.weaponFuelRatio = 0;
                }
                if (this.shoppingStrategyAction1 === undefined) {
                    this.shoppingStrategyAction1 = 0;
                }
                if (this.shoppingStrategyCondition1 === undefined) {
                    this.shoppingStrategyCondition1 = 0;
                }
                if (this.shoppingStrategyAction2 === undefined) {
                    this.shoppingStrategyAction2 = 0;
                }
                if (this.shoppingStrategyCondition2 === undefined) {
                    this.shoppingStrategyCondition2 = 0;
                }
                if (this.shoppingStrategyAction3 === undefined) {
                    this.shoppingStrategyAction3 = 0;
                }
                if (this.shoppingStrategyCondition3 === undefined) {
                    this.shoppingStrategyCondition3 = 0;
                }
                if (this.shoppingStrategyAction4 === undefined) {
                    this.shoppingStrategyAction4 = 0;
                }
                if (this.shoppingStrategyCondition4 === undefined) {
                    this.shoppingStrategyCondition4 = 0;
                }
                if (this.shoppingStrategyAction5 === undefined) {
                    this.shoppingStrategyAction5 = 0;
                }
                if (this.shoppingStrategyCondition5 === undefined) {
                    this.shoppingStrategyCondition5 = 0;
                }
                if (this.shoppingStrategyAction6 === undefined) {
                    this.shoppingStrategyAction6 = 0;
                }
                if (this.shoppingStrategyCondition6 === undefined) {
                    this.shoppingStrategyCondition6 = 0;
                }
                if (this.shoppingStrategyAction7 === undefined) {
                    this.shoppingStrategyAction7 = 0;
                }
                if (this.shoppingStrategyCondition7 === undefined) {
                    this.shoppingStrategyCondition7 = 0;
                }
                if (this.shoppingStrategyAction8 === undefined) {
                    this.shoppingStrategyAction8 = 0;
                }
                if (this.shoppingStrategyCondition8 === undefined) {
                    this.shoppingStrategyCondition8 = 0;
                }
                if (this.shoppingStrategyAction9 === undefined) {
                    this.shoppingStrategyAction9 = 0;
                }
                if (this.shoppingStrategyCondition9 === undefined) {
                    this.shoppingStrategyCondition9 = 0;
                }
                if (this.shoppingStrategyAction10 === undefined) {
                    this.shoppingStrategyAction10 = 0;
                }
                if (this.shoppingStrategyCondition10 === undefined) {
                    this.shoppingStrategyCondition10 = 0;
                }
                if (this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced === undefined) {
                    this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = 0;
                }
                if (this.shoppingStrategyMaximumFireUnitsThatBePurchased === undefined) {
                    this.shoppingStrategyMaximumFireUnitsThatBePurchased = 0;
                }
                if (this.timeOfLastClock1Tick === undefined) {
                    this.timeOfLastClock1Tick = 0;
                }
                if (this.timeOfLastClock2Tick === undefined) {
                    this.timeOfLastClock2Tick = 0;
                }
                if (this.timeOfLastClock3Tick === undefined) {
                    this.timeOfLastClock3Tick = 0;
                }
                if (this.timeOfLastClock4Tick === undefined) {
                    this.timeOfLastClock4Tick = 0;
                }
                if (this.timeOfLastClock5Tick === undefined) {
                    this.timeOfLastClock5Tick = 0;
                }
                if (this.timeOfLastClock6Tick === undefined) {
                    this.timeOfLastClock6Tick = 0;
                }
                if (this.timeOfLastClock7Tick === undefined) {
                    this.timeOfLastClock7Tick = 0;
                }
                if (this.timeOfLastClock8Tick === undefined) {
                    this.timeOfLastClock8Tick = 0;
                }
                if (this.timeOfLastClock9Tick === undefined) {
                    this.timeOfLastClock9Tick = 0;
                }
                if (this.timeOfLastClock10Tick === undefined) {
                    this.timeOfLastClock10Tick = 0;
                }
                if (this.timeOfLastSensor1Tick === undefined) {
                    this.timeOfLastSensor1Tick = 0;
                }
                if (this.timeOfLastSensor2Tick === undefined) {
                    this.timeOfLastSensor2Tick = 0;
                }
                if (this.timeOfLastSensor3Tick === undefined) {
                    this.timeOfLastSensor3Tick = 0;
                }
                if (this.timeOfLastSensor4Tick === undefined) {
                    this.timeOfLastSensor4Tick = 0;
                }
                if (this.timeOfLastSensor5Tick === undefined) {
                    this.timeOfLastSensor5Tick = 0;
                }
                if (this.timeOfLastSensor6Tick === undefined) {
                    this.timeOfLastSensor6Tick = 0;
                }
                if (this.timeOfLastSensor7Tick === undefined) {
                    this.timeOfLastSensor7Tick = 0;
                }
                if (this.timeOfLastSensor8Tick === undefined) {
                    this.timeOfLastSensor8Tick = 0;
                }
                if (this.timeOfLastSensor9Tick === undefined) {
                    this.timeOfLastSensor9Tick = 0;
                }
                if (this.timeOfLastSensor10Tick === undefined) {
                    this.timeOfLastSensor10Tick = 0;
                }
                if (this.timeOfLastSensor11Tick === undefined) {
                    this.timeOfLastSensor11Tick = 0;
                }
                if (this.timeOfLastSensor12Tick === undefined) {
                    this.timeOfLastSensor12Tick = 0;
                }
                if (this.timeOfLastSensor13Tick === undefined) {
                    this.timeOfLastSensor13Tick = 0;
                }
                if (this.timeOfLastSensor14Tick === undefined) {
                    this.timeOfLastSensor14Tick = 0;
                }
                if (this.timeOfLastSensor15Tick === undefined) {
                    this.timeOfLastSensor15Tick = 0;
                }
                if (this.timeOfLastSensor16Tick === undefined) {
                    this.timeOfLastSensor16Tick = 0;
                }
                this.clock1Probability = 0;
                this.clock2Probability = 0;
                this.clock3Probability = 0;
                this.clock4Probability = 0;
                this.clock5Probability = 0;
                this.clock6Probability = 0;
                this.clock7Probability = 0;
                this.clock8Probability = 0;
                this.clock9Probability = 0;
                this.clock10Probability = 0;
                this.clock1Period = 0;
                this.clock2Period = 0;
                this.clock3Period = 0;
                this.clock4Period = 0;
                this.clock5Period = 0;
                this.clock6Period = 0;
                this.clock7Period = 0;
                this.clock8Period = 0;
                this.clock9Period = 0;
                this.clock10Period = 0;
                this.clock1Requirement1 = 167;
                this.clock1Requirement2 = 167;
                this.clock2Requirement1 = 167;
                this.clock2Requirement2 = 167;
                this.clock3Requirement1 = 167;
                this.clock3Requirement2 = 167;
                this.clock4Requirement1 = 167;
                this.clock4Requirement2 = 167;
                this.clock5Requirement1 = 167;
                this.clock5Requirement2 = 167;
                this.clock6Requirement1 = 167;
                this.clock6Requirement2 = 167;
                this.clock7Requirement1 = 167;
                this.clock7Requirement2 = 167;
                this.clock8Requirement1 = 167;
                this.clock8Requirement2 = 167;
                this.clock9Requirement1 = 167;
                this.clock9Requirement2 = 167;
                this.clock10Requirement1 = 167;
                this.clock10Requirement2 = 167;
                this.clock1Response1 = RobotSpecification.NO_ACTION;
                this.clock1Response2 = 100;
                this.clock1Response3 = 100;
                this.clock2Response1 = 100;
                this.clock2Response2 = 100;
                this.clock2Response3 = 100;
                this.clock3Response1 = 100;
                this.clock3Response2 = 100;
                this.clock3Response3 = 100;
                this.clock4Response1 = 100;
                this.clock4Response2 = 100;
                this.clock4Response3 = 100;
                this.clock5Response1 = 100;
                this.clock5Response2 = 100;
                this.clock5Response3 = 100;
                this.clock6Response1 = 100;
                this.clock6Response2 = 100;
                this.clock6Response3 = 100;
                this.clock7Response1 = 100;
                this.clock7Response2 = 100;
                this.clock7Response3 = 100;
                this.clock8Response1 = 100;
                this.clock8Response2 = 100;
                this.clock8Response3 = 100;
                this.clock9Response1 = 100;
                this.clock9Response2 = 100;
                this.clock9Response3 = 100;
                this.clock10Response1 = 100;
                this.clock10Response2 = 100;
                this.clock10Response3 = 100;
                this.sensor1Angle = 0;
                this.sensor2Angle = 180;
                this.sensor3Angle = 20;
                this.sensor4Angle = -20;
                this.sensor5Angle = 180;
                this.sensor6Angle = 40;
                this.sensor7Angle = -40;
                this.sensor8Angle = 0;
                this.sensor9Angle = 0;
                this.sensor10Angle = 0;
                this.sensor11Angle = 0;
                this.sensor12Angle = 0;
                this.sensor13Angle = 0;
                this.sensor14Angle = 0;
                this.sensor15Angle = 0;
                this.sensor16Angle = 0;
                this.sensor1Length = 900;
                this.sensor2Length = 900;
                this.sensor3Length = 300;
                this.sensor4Length = 300;
                this.sensor5Length = 80;
                this.sensor6Length = 80;
                this.sensor7Length = 80;
                this.sensor8Length = 0;
                this.sensor9Length = 0;
                this.sensor10Length = 0;
                this.sensor11Length = 0;
                this.sensor12Length = 0;
                this.sensor13Length = 0;
                this.sensor14Length = 0;
                this.sensor15Length = 0;
                this.sensor16Length = 0;
                this.sensor1Width = 0;
                this.sensor2Width = 0;
                this.sensor3Width = 5;
                this.sensor4Width = 5;
                this.sensor5Width = 0;
                this.sensor6Width = 80;
                this.sensor7Width = 80;
                this.sensor8Width = 0;
                this.sensor9Width = 0;
                this.sensor10Width = 0;
                this.sensor11Width = 0;
                this.sensor12Width = 0;
                this.sensor13Width = 0;
                this.sensor14Width = 0;
                this.sensor15Width = 0;
                this.sensor16Width = 0;
                this.sensor1Probability = RobotSpecification.NO_ACTION;
                this.sensor2Probability = 100;
                this.sensor3Probability = 100;
                this.sensor4Probability = 100;
                this.sensor5Probability = 100;
                this.sensor6Probability = 100;
                this.sensor7Probability = 100;
                this.sensor8Probability = 100;
                this.sensor9Probability = 100;
                this.sensor10Probability = 100;
                this.sensor11Probability = 100;
                this.sensor12Probability = 100;
                this.sensor13Probability = 100;
                this.sensor14Probability = 100;
                this.sensor15Probability = 100;
                this.sensor16Probability = 100;
                this.sensor1Period = 1000;
                this.sensor2Period = 1000;
                this.sensor3Period = 200;
                this.sensor4Period = 200;
                this.sensor5Period = 200;
                this.sensor6Period = 200;
                this.sensor7Period = 200;
                this.sensor8Period = 0;
                this.sensor9Period = 0;
                this.sensor10Period = 0;
                this.sensor11Period = 0;
                this.sensor12Period = 0;
                this.sensor13Period = 0;
                this.sensor14Period = 0;
                this.sensor15Period = 0;
                this.sensor16Period = 0;
                this.sensor1ParallelOffset = 0;
                this.sensor2ParallelOffset = 0;
                this.sensor3ParallelOffset = -15;
                this.sensor4ParallelOffset = -15;
                this.sensor5ParallelOffset = 0;
                this.sensor6ParallelOffset = 0;
                this.sensor7ParallelOffset = 0;
                this.sensor8ParallelOffset = 0;
                this.sensor9ParallelOffset = 0;
                this.sensor10ParallelOffset = 0;
                this.sensor11ParallelOffset = 0;
                this.sensor12ParallelOffset = 0;
                this.sensor13ParallelOffset = 0;
                this.sensor14ParallelOffset = 0;
                this.sensor15ParallelOffset = 0;
                this.sensor16ParallelOffset = 0;
                this.sensor1PerpendicularOffset = 0;
                this.sensor2PerpendicularOffset = 0;
                this.sensor3PerpendicularOffset = 15;
                this.sensor4PerpendicularOffset = -15;
                this.sensor5PerpendicularOffset = 0;
                this.sensor6PerpendicularOffset = 0;
                this.sensor7PerpendicularOffset = 0;
                this.sensor8PerpendicularOffset = 0;
                this.sensor9PerpendicularOffset = 0;
                this.sensor10PerpendicularOffset = 0;
                this.sensor11PerpendicularOffset = 0;
                this.sensor12PerpendicularOffset = 0;
                this.sensor13PerpendicularOffset = 0;
                this.sensor14PerpendicularOffset = 0;
                this.sensor15PerpendicularOffset = 0;
                this.sensor16PerpendicularOffset = 0;
                this.sensor1Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor1Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor1Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor2Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor2Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor2Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor3Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor3Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor3Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor4Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor4Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor4Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor5Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor5Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor5Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor6Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor6Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor6Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor7Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor7Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor7Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor8Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor8Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor8Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor9Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor9Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor9Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor10Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor10Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor10Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor11Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor11Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor11Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor12Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor12Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor12Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor13Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor13Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor13Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor14Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor14Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor14Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor15Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor15Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor15Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor16Condition1 = RobotSpecification.ANY_CONDITION;
                this.sensor16Condition2 = RobotSpecification.ANY_CONDITION;
                this.sensor16Condition3 = RobotSpecification.ANY_CONDITION;
                this.sensor1ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor1ResponseToWall2 = 100;
                this.sensor1ResponseToWall3 = 100;
                this.sensor1ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor1ResponseToTank2 = 100;
                this.sensor1ResponseToTank3 = 100;
                this.sensor1ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor1ResponseToMissile2 = 100;
                this.sensor1ResponseToMissile3 = 100;
                this.sensor2ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor2ResponseToWall2 = 100;
                this.sensor2ResponseToWall3 = 100;
                this.sensor2ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor2ResponseToTank2 = 100;
                this.sensor2ResponseToTank3 = 100;
                this.sensor2ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor2ResponseToMissile2 = 100;
                this.sensor2ResponseToMissile3 = 100;
                this.sensor3ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor3ResponseToWall2 = 100;
                this.sensor3ResponseToWall3 = 100;
                this.sensor3ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor3ResponseToTank2 = 100;
                this.sensor3ResponseToTank3 = 100;
                this.sensor3ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor3ResponseToMissile2 = 100;
                this.sensor3ResponseToMissile3 = 100;
                this.sensor4ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor4ResponseToWall2 = 100;
                this.sensor4ResponseToWall3 = 100;
                this.sensor4ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor4ResponseToTank2 = 100;
                this.sensor4ResponseToTank3 = 100;
                this.sensor4ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor4ResponseToMissile2 = 100;
                this.sensor4ResponseToMissile3 = 100;
                this.sensor5ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor5ResponseToWall2 = 100;
                this.sensor5ResponseToWall3 = 100;
                this.sensor5ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor5ResponseToTank2 = 100;
                this.sensor5ResponseToTank3 = 100;
                this.sensor5ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor5ResponseToMissile2 = 100;
                this.sensor5ResponseToMissile3 = 100;
                this.sensor6ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor6ResponseToWall2 = 100;
                this.sensor6ResponseToWall3 = 100;
                this.sensor6ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor6ResponseToTank2 = 100;
                this.sensor6ResponseToTank3 = 100;
                this.sensor6ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor6ResponseToMissile2 = 100;
                this.sensor6ResponseToMissile3 = 100;
                this.sensor7ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor7ResponseToWall2 = 100;
                this.sensor7ResponseToWall3 = 100;
                this.sensor7ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor7ResponseToTank2 = 100;
                this.sensor7ResponseToTank3 = 100;
                this.sensor7ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor7ResponseToMissile2 = 100;
                this.sensor7ResponseToMissile3 = 100;
                this.sensor8ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor8ResponseToWall2 = 100;
                this.sensor8ResponseToWall3 = 100;
                this.sensor8ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor8ResponseToTank2 = 100;
                this.sensor8ResponseToTank3 = 100;
                this.sensor8ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor8ResponseToMissile2 = 100;
                this.sensor8ResponseToMissile3 = 100;
                this.sensor9ResponseToWall1 = RobotSpecification.NO_ACTION;
                this.sensor9ResponseToWall2 = 100;
                this.sensor9ResponseToWall3 = 100;
                this.sensor9ResponseToTank1 = RobotSpecification.NO_ACTION;
                this.sensor9ResponseToTank2 = 100;
                this.sensor9ResponseToTank3 = 100;
                this.sensor9ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor9ResponseToMissile2 = 100;
                this.sensor9ResponseToMissile3 = 100;
                this.sensor10ResponseToWall1 = 100;
                this.sensor10ResponseToWall2 = 100;
                this.sensor10ResponseToWall3 = 100;
                this.sensor10ResponseToTank1 = 100;
                this.sensor10ResponseToTank2 = 100;
                this.sensor10ResponseToTank3 = 100;
                this.sensor10ResponseToMissile1 = 100;
                this.sensor10ResponseToMissile2 = 100;
                this.sensor10ResponseToMissile3 = 100;
                this.sensor11ResponseToWall1 = 100;
                this.sensor11ResponseToWall2 = 100;
                this.sensor11ResponseToWall3 = 100;
                this.sensor11ResponseToTank1 = 100;
                this.sensor11ResponseToTank2 = 100;
                this.sensor11ResponseToTank3 = 100;
                this.sensor11ResponseToMissile1 = 100;
                this.sensor11ResponseToMissile2 = 100;
                this.sensor11ResponseToMissile3 = 100;
                this.sensor12ResponseToWall1 = 100;
                this.sensor12ResponseToWall2 = 100;
                this.sensor12ResponseToWall3 = 100;
                this.sensor12ResponseToTank1 = 100;
                this.sensor12ResponseToTank2 = 100;
                this.sensor12ResponseToTank3 = 100;
                this.sensor12ResponseToMissile1 = 100;
                this.sensor12ResponseToMissile2 = 100;
                this.sensor12ResponseToMissile3 = 100;
                this.sensor13ResponseToWall1 = 100;
                this.sensor13ResponseToWall2 = 100;
                this.sensor13ResponseToWall3 = 100;
                this.sensor13ResponseToTank1 = 100;
                this.sensor13ResponseToTank2 = 100;
                this.sensor13ResponseToTank3 = 100;
                this.sensor13ResponseToMissile1 = 100;
                this.sensor13ResponseToMissile2 = 100;
                this.sensor13ResponseToMissile3 = 100;
                this.sensor14ResponseToWall1 = 100;
                this.sensor14ResponseToWall2 = 100;
                this.sensor14ResponseToWall3 = 100;
                this.sensor14ResponseToTank1 = 100;
                this.sensor14ResponseToTank2 = 100;
                this.sensor14ResponseToTank3 = 100;
                this.sensor14ResponseToMissile1 = 100;
                this.sensor14ResponseToMissile2 = 100;
                this.sensor14ResponseToMissile3 = 100;
                this.sensor15ResponseToWall1 = 100;
                this.sensor15ResponseToWall2 = 100;
                this.sensor15ResponseToWall3 = 100;
                this.sensor15ResponseToTank1 = 100;
                this.sensor15ResponseToTank2 = 100;
                this.sensor15ResponseToTank3 = 100;
                this.sensor15ResponseToMissile1 = 100;
                this.sensor15ResponseToMissile2 = 100;
                this.sensor15ResponseToMissile3 = 100;
                this.sensor16ResponseToWall1 = 100;
                this.sensor16ResponseToWall2 = 100;
                this.sensor16ResponseToWall3 = 100;
                this.sensor16ResponseToTank1 = 100;
                this.sensor16ResponseToTank2 = 100;
                this.sensor16ResponseToTank3 = 100;
                this.sensor16ResponseToMissile1 = RobotSpecification.NO_ACTION;
                this.sensor16ResponseToMissile2 = RobotSpecification.NO_ACTION;
                this.sensor16ResponseToMissile3 = RobotSpecification.NO_ACTION;
                this.responseToMissileHit1 = RobotSpecification.NO_ACTION;
                this.responseToMissileHit2 = RobotSpecification.NO_ACTION;
                this.responseToMissileHit3 = RobotSpecification.NO_ACTION;
                this.responseToFacingTarget1 = RobotSpecification.NO_ACTION;
                this.responseToFacingTarget2 = RobotSpecification.NO_ACTION;
                this.responseToFacingTarget3 = RobotSpecification.NO_ACTION;
                this.weaponStrategyFavourite1 = dsector.PreBuiltWeaponSpecifications.TRI_STRIKER;
                this.weaponStrategySecondFavourite1 = dsector.PreBuiltWeaponSpecifications.POWER_LASER;
                this.weaponStrategyThirdFavourite1 = dsector.PreBuiltWeaponSpecifications.BEAM_LASER;
                this.weaponStrategyFourthFavourite1 = dsector.PreBuiltWeaponSpecifications.DOUBLE_MISSILE;
                this.weaponStrategyFifthFavourite1 = dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE;
                this.weaponStrategyFavourite2 = dsector.PreBuiltWeaponSpecifications.TRI_BREAKER;
                this.weaponStrategySecondFavourite2 = dsector.PreBuiltWeaponSpecifications.QUINT_BREAKER;
                this.weaponStrategyThirdFavourite2 = dsector.PreBuiltWeaponSpecifications.OCTO_BREAKER;
                this.weaponStrategyFourthFavourite2 = dsector.PreBuiltWeaponSpecifications.NONE;
                this.weaponStrategyFifthFavourite2 = dsector.PreBuiltWeaponSpecifications.NONE;
                this.weaponStrategyFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_TRIPLE;
                this.weaponStrategySecondFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_GUIDERS;
                this.weaponStrategyThirdFavourite3 = dsector.PreBuiltWeaponSpecifications.REAR_DOUBLE;
                this.weaponStrategyFourthFavourite3 = dsector.PreBuiltWeaponSpecifications.NONE;
                this.weaponStrategyFifthFavourite3 = 500;
                this.weaponStrategyFavourite4 = 500;
                this.weaponStrategySecondFavourite4 = 500;
                this.weaponStrategyThirdFavourite4 = 500;
                this.weaponStrategyFourthFavourite4 = 500;
                this.weaponStrategyFifthFavourite4 = 500;
                this.weaponStrategyFavourite5 = 500;
                this.weaponStrategySecondFavourite5 = 500;
                this.weaponStrategyThirdFavourite5 = 500;
                this.weaponStrategyFourthFavourite5 = 500;
                this.weaponStrategyFifthFavourite5 = 500;
                this.weaponStrategyFavourite6 = 500;
                this.weaponStrategySecondFavourite6 = 500;
                this.weaponStrategyThirdFavourite6 = 500;
                this.weaponStrategyFourthFavourite6 = 500;
                this.weaponStrategyFifthFavourite6 = 500;
                this.weaponStrategyFavourite7 = 500;
                this.weaponStrategySecondFavourite7 = 500;
                this.weaponStrategyThirdFavourite7 = 500;
                this.weaponStrategyFourthFavourite7 = 500;
                this.weaponStrategyFifthFavourite7 = 500;
                this.weaponStrategyFavourite8 = 500;
                this.weaponStrategySecondFavourite8 = 500;
                this.weaponStrategyThirdFavourite8 = 500;
                this.weaponStrategyFourthFavourite8 = 500;
                this.weaponStrategyFifthFavourite8 = 500;
                this.shoppingStrategyAction1 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_1;
                this.shoppingStrategyCondition1 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction2 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                this.shoppingStrategyCondition2 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction3 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                this.shoppingStrategyCondition3 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction4 = RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY;
                this.shoppingStrategyCondition4 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction5 = RobotSpecification.NO_ACTION;
                this.shoppingStrategyCondition5 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction6 = RobotSpecification.NO_ACTION;
                this.shoppingStrategyCondition6 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction7 = RobotSpecification.NO_ACTION;
                this.shoppingStrategyCondition7 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction8 = RobotSpecification.NO_ACTION;
                this.shoppingStrategyCondition8 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction9 = RobotSpecification.SHOPPING_CONDITION_50_PERCENT;
                this.shoppingStrategyCondition9 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyAction10 = RobotSpecification.NO_ACTION;
                this.shoppingStrategyCondition10 = RobotSpecification.SHOPPING_CONDITION_ALWAYS;
                this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = 200;
                this.shoppingStrategyMaximumFireUnitsThatBePurchased = 200;
                this.filename = "[keyboard1]";
                this.name = "No name";
                this.description = "";
                this.viewSensors = RobotSpecification.FALSE;
                this.weaponFuelRatio = 100;
            } else
                throw new Error('invalid overload');
        }

        static initializeVariableStringRepresentations() {
            if (RobotSpecification.variablestringRepresentations == null) {
                RobotSpecification.variablestringRepresentations = new Map();
            }
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_1, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_1");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_2, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_2");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_3, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_3");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_4, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_4");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_5, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_5");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_6, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_6");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_7, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_7");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_8, "MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_8");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOST_EXPENSIVE_TANK_WITHOUT_DOWNGRADING, "MOST_EXPENSIVE_TANK_WITHOUT_DOWNGRADING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FUEL_UPGRADE, "FUEL_UPGRADE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.METAL_UPGRADE, "METAL_UPGRADE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_UPGRADE, "TURN_UPGRADE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SPEED_UPGRADE, "SPEED_UPGRADE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CARD, "SHOPPING_CARD");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.AS_MANY_SCORE_BRIBES_AS_AFFORDABLE, "AS_MANY_SCORE_BRIBES_AS_AFFORDABLE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_ALWAYS, "SHOPPING_CONDITION_ALWAYS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_500_CREDITS, "SHOPPING_CONDITION_MORE_THAN_500_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_1000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_1000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_2000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_2000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_3000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_3000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_4000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_4000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_6000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_6000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_8000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_8000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_10000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_10000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_15000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_15000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_20000_CREDITS, "SHOPPING_CONDITION_MORE_THAN_20000_CREDITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_5_PERCENT, "SHOPPING_CONDITION_5_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_10_PERCENT, "SHOPPING_CONDITION_10_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_25_PERCENT, "SHOPPING_CONDITION_25_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_50_PERCENT, "SHOPPING_CONDITION_50_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_75_PERCENT, "SHOPPING_CONDITION_75_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_25_ROUNDS_REMAINING, "SHOPPING_CONDITION_MORE_THAN_25_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_50_ROUNDS_REMAINING, "SHOPPING_CONDITION_MORE_THAN_50_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_100_ROUNDS_REMAINING, "SHOPPING_CONDITION_MORE_THAN_100_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_MORE_THAN_150_ROUNDS_REMAINING, "SHOPPING_CONDITION_MORE_THAN_150_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_3_ROUNDS_REMAINING, "SHOPPING_CONDITION_3_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_6_ROUNDS_REMAINING, "SHOPPING_CONDITION_6_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_9_ROUNDS_REMAINING, "SHOPPING_CONDITION_9_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_12_ROUNDS_REMAINING, "SHOPPING_CONDITION_12_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_15_ROUNDS_REMAINING, "SHOPPING_CONDITION_15_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_18_ROUNDS_REMAINING, "SHOPPING_CONDITION_18_ROUNDS_REMAINING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_1_EMPTY, "SHOPPING_CONDITION_PORT_1_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_2_EMPTY, "SHOPPING_CONDITION_PORT_2_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_3_EMPTY, "SHOPPING_CONDITION_PORT_3_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_4_EMPTY, "SHOPPING_CONDITION_PORT_4_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_5_EMPTY, "SHOPPING_CONDITION_PORT_5_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_6_EMPTY, "SHOPPING_CONDITION_PORT_6_EMPTY");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_1_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_1_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_2_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_2_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_3_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_3_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_4_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_4_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_5_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_5_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SHOPPING_CONDITION_PORT_6_BELOW_100_FIRE_UNITS, "SHOPPING_CONDITION_PORT_6_BELOW_100_FIRE_UNITS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.NO_ACTION, "NO_ACTION");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_LEFT, "TURN_LEFT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_LEFT_10_DEGREES, "TURN_LEFT_10_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_LEFT_90_DEGREES, "TURN_LEFT_90_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_LEFT_180_DEGREES, "TURN_LEFT_180_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_RIGHT, "TURN_RIGHT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_RIGHT_10_DEGREES, "TURN_RIGHT_10_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_RIGHT_90_DEGREES, "TURN_RIGHT_90_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_RIGHT_180_DEGREES, "TURN_RIGHT_180_DEGREES");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_TANK_LAST_DETECTED_WITH_SENSOR, "SET_TARGET_AS_TANK_LAST_DETECTED_WITH_SENSOR");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_NEAREST_TANK, "SET_TARGET_AS_NEAREST_TANK");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_NEAREST_ENEMY_TANK_OR_JEWEL, "SET_TARGET_AS_NEAREST_ENEMY_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_ENEMY_JEWEL, "SET_TARGET_AS_ENEMY_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_ENEMY_TANK_WITH_HIGHEST_SCORE, "SET_TARGET_AS_ENEMY_TANK_WITH_HIGHEST_SCORE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_ENEMY_TANK_WITH_LOWEST_SCORE, "SET_TARGET_AS_ENEMY_TANK_WITH_LOWEST_SCORE");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SET_TARGET_AS_TANK_LAST_TAKEN_HIT_FROM, "SET_TARGET_AS_TANK_LAST_TAKEN_HIT_FROM");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ROTATE_TO_CORRECT_DIRECTION_ALONG_SHORTEST_PATH_TO_TARGET, "ROTATE_TO_CORRECT_DIRECTION_ALONG_SHORTEST_PATH_TO_TARGET");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_TOWARDS_TARGET, "TURN_TOWARDS_TARGET");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOVE_FORWARDS, "MOVE_FORWARDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOVE_BACKWARDS, "MOVE_BACKWARDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_1_SECOND, "SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_1_SECOND");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_2_SECONDS, "SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_2_SECONDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_4_SECONDS, "SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_4_SECONDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_1_SECOND, "SUPRESS_ROTATION_INSTRUCTIONS_FOR_1_SECOND");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_2_SECONDS, "SUPRESS_ROTATION_INSTRUCTIONS_FOR_2_SECONDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_4_SECONDS, "SUPRESS_ROTATION_INSTRUCTIONS_FOR_4_SECONDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.STOP_MOVING, "STOP_MOVING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.STOP_ROTATING, "STOP_ROTATING");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.MOVE_RANDOM_DIRECTION, "MOVE_RANDOM_DIRECTION");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_RANDOM_DIRECTION, "TURN_RANDOM_DIRECTION");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_1, "FIRE_STRATEGY_1");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_2, "FIRE_STRATEGY_2");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_3, "FIRE_STRATEGY_3");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_4, "FIRE_STRATEGY_4");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_5, "FIRE_STRATEGY_5");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_6, "FIRE_STRATEGY_6");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_7, "FIRE_STRATEGY_7");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.FIRE_STRATEGY_8, "FIRE_STRATEGY_8");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ROTATE_TURRET_TO_TARGET, "ROTATE_TURRET_TO_TARGET");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.POINT_TURRET_DIRECTLY_AT_TARGET, "POINT_TURRET_DIRECTLY_AT_TARGET");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.TURN_ON_SHIELD, "TURN_ON_SHIELD");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ANY_CONDITION, "ANY_CONDITION");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.DESTINATION_TANK_WITHIN_2_TANK_LENGTHS, "DESTINATION_TANK_WITHIN_2_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_2_TANK_LENGTHS, "DESTINATION_TANK_OR_JEWEL_WITHIN_2_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_5_TANK_LENGTHS, "DESTINATION_TANK_OR_JEWEL_WITHIN_5_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_10_TANK_LENGTHS, "DESTINATION_TANK_OR_JEWEL_WITHIN_10_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ENEMY_MISSILE_WITHIN_1_TANK_LENGTH, "ENEMY_MISSILE_WITHIN_1_TANK_LENGTH");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ENEMY_MISSILE_WITHIN_2_TANK_LENGTHS, "ENEMY_MISSILE_WITHIN_2_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ENEMY_MISSILE_WITHIN_3_TANK_LENGTHS, "ENEMY_MISSILE_WITHIN_3_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ENEMY_MISSILE_WITHIN_4_TANK_LENGTHS, "ENEMY_MISSILE_WITHIN_4_TANK_LENGTHS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_1_PERCENT, "PROBABILITY_OF_1_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_2_PERCENT, "PROBABILITY_OF_2_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_5_PERCENT, "PROBABILITY_OF_5_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_10_PERCENT, "PROBABILITY_OF_10_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_25_PERCENT, "PROBABILITY_OF_25_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.PROBABILITY_OF_50_PERCENT, "PROBABILITY_OF_50_PERCENT");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_1_DETECTING_TANK_OR_JEWEL, "SENSOR_1_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_2_DETECTING_TANK_OR_JEWEL, "SENSOR_2_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_3_DETECTING_TANK_OR_JEWEL, "SENSOR_3_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_4_DETECTING_TANK_OR_JEWEL, "SENSOR_4_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_5_DETECTING_TANK_OR_JEWEL, "SENSOR_5_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_6_DETECTING_TANK_OR_JEWEL, "SENSOR_6_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_7_DETECTING_TANK_OR_JEWEL, "SENSOR_7_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_8_DETECTING_TANK_OR_JEWEL, "SENSOR_8_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_9_DETECTING_TANK_OR_JEWEL, "SENSOR_9_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_10_DETECTING_TANK_OR_JEWEL, "SENSOR_10_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_11_DETECTING_TANK_OR_JEWEL, "SENSOR_11_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_12_DETECTING_TANK_OR_JEWEL, "SENSOR_12_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_13_DETECTING_TANK_OR_JEWEL, "SENSOR_13_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_14_DETECTING_TANK_OR_JEWEL, "SENSOR_14_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_15_DETECTING_TANK_OR_JEWEL, "SENSOR_15_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_16_DETECTING_TANK_OR_JEWEL, "SENSOR_16_DETECTING_TANK_OR_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_1_DETECTING_WALL, "SENSOR_1_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_2_DETECTING_WALL, "SENSOR_2_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_3_DETECTING_WALL, "SENSOR_3_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_4_DETECTING_WALL, "SENSOR_4_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_5_DETECTING_WALL, "SENSOR_5_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_6_DETECTING_WALL, "SENSOR_6_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_7_DETECTING_WALL, "SENSOR_7_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_8_DETECTING_WALL, "SENSOR_8_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_9_DETECTING_WALL, "SENSOR_9_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_10_DETECTING_WALL, "SENSOR_10_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_11_DETECTING_WALL, "SENSOR_11_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_12_DETECTING_WALL, "SENSOR_12_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_13_DETECTING_WALL, "SENSOR_13_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_14_DETECTING_WALL, "SENSOR_14_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_15_DETECTING_WALL, "SENSOR_15_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.SENSOR_16_DETECTING_WALL, "SENSOR_16_DETECTING_WALL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ENEMY_TANK_OR_JEWEL_IN_LINE_OF_SIGHT_FROM_TURRET, "ENEMY_TANK_OR_JEWEL_IN_LINE_OF_SIGHT_FROM_TURRET");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.NO_ENEMY_TANK_OR_JEWEL_NEAR, "NO_ENEMY_TANK_OR_JEWEL_NEAR");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL, "WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.NOT_WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL, "NOT_WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.NO_PLAYER_MOVED_FORWARD_FOR_2_SECONDS, "NO_PLAYER_MOVED_FORWARD_FOR_2_SECONDS");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.ALL_ENEMIES_DESTROYED, "ALL_ENEMIES_DESTROYED");
            RobotSpecification.variablestringRepresentations.set(RobotSpecification.AT_LEAST_ONE_ENEMY_ALIVE, "AT_LEAST_ONE_ENEMY_ALIVE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.NONE, "NONE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.STANDARD_MISSILE, "STANDARD_MISSILE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.DOUBLE_MISSILE, "DOUBLE_MISSILE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.TRIPLE_MISSILE, "TRIPLE_MISSILE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.BEAM_LASER, "BEAM_LASER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.POWER_LASER, "POWER_LASER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.BLASTER, "BLASTER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.GUIDE_BLASTER, "GUIDE_BLASTER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.BLAST_GUIDER, "BLAST_GUIDER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.NUKE_BLASTER, "NUKE_BLASTER");
            //RobotSpecification.variablestringRepresentations.set(307, "GUIDE_BLASTER");
            //RobotSpecification.variablestringRepresentations.set(308, "BLAST_GUIDER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.BLAST_SWIRLER, "BLAST_SWIRLER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.DEATH_BOMB, "DEATH_BOMB");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.NORMAL_BOMB, "NORMAL_BOMB");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.REAR_DOUBLE, "REAR_DOUBLE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.REAR_TRIPLE, "REAR_TRIPLE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.REAR_GUIDERS, "REAR_GUIDERS");
            //RobotSpecification.variablestringRepresentations.set(313, "ELECTRO_BUDS");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.TELEPORT_FOE, "TELEPORT_FOE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.TRI_BREAKER, "TRI_BREAKER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.TRI_STRIKER, "TRI_STRIKER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.QUINT_BREAKER, "QUINT_BREAKER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.OCTO_BREAKER, "OCTO_BREAKER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.GUIDED_MISSILE, "GUIDED_MISSILE");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.SPARK_FIENDS, "SPARK_FIENDS");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.SWIRLER, "SWIRLER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.ELECTRO_BUDS, "ELECTRO_BUDS");
            //RobotSpecification.variablestringRepresentations.set(324, "NORMAL_BOMB");
            //RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.DEATH_BOMB, "DEATH_BOMB");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.GLOW_SHIELD, "GLOW_SHIELD");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.ECM_HACKER, "ECM_HACKER");
            RobotSpecification.variablestringRepresentations.set(dsector.PreBuiltWeaponSpecifications.ECM_WIPER, "ECM_WIPER");
        }

        filenameCode() {
            if (this.type === 4) {
                return this.filename;
            } else {
                switch (this.type) {
                    case 0:
                        return "[keyboard1]";
                    case 1:
                        return "[keyboard2]";
                    case 2:
                        return "[keyboard3]";
                    case 3:
                        return "[keyboard4]";
                    case 5:
                        return "[joystick1]";
                    default:
                        console.info("Unexpected result in RobotSpecificaiton.filenameCode()");
                        return "";
                }
            }
        }

        isHuman() {
            return this.type !== RobotSpecification.ROBOT;
        }

        outputAsFile() {
            let fOutput = "";
            fOutput = fOutput + "name = " + this.name + "\n";
            fOutput = fOutput + "description = " + this.description + "\n";
            fOutput = fOutput + "viewSensors=FALSE\n";
            fOutput = fOutput + "clock1Probability = " + this.clock1Probability + "\n";
            fOutput = fOutput + "clock2Probability = " + this.clock2Probability + "\n";
            fOutput = fOutput + "clock3Probability = " + this.clock3Probability + "\n";
            fOutput = fOutput + "clock4Probability = " + this.clock4Probability + "\n";
            fOutput = fOutput + "clock5Probability = " + this.clock5Probability + "\n";
            fOutput = fOutput + "clock6Probability = " + this.clock6Probability + "\n";
            fOutput = fOutput + "clock7Probability = " + this.clock7Probability + "\n";
            fOutput = fOutput + "clock8Probability = " + this.clock8Probability + "\n";
            fOutput = fOutput + "clock9Probability = " + this.clock9Probability + "\n";
            fOutput = fOutput + "clock10Probability = " + this.clock10Probability + "\n";
            fOutput = fOutput + "clock1Period = " + this.clock1Period + "\n";
            fOutput = fOutput + "clock2Period = " + this.clock2Period + "\n";
            fOutput = fOutput + "clock3Period = " + this.clock3Period + "\n";
            fOutput = fOutput + "clock4Period = " + this.clock4Period + "\n";
            fOutput = fOutput + "clock5Period = " + this.clock5Period + "\n";
            fOutput = fOutput + "clock6Period = " + this.clock6Period + "\n";
            fOutput = fOutput + "clock7Period = " + this.clock7Period + "\n";
            fOutput = fOutput + "clock8Period = " + this.clock8Period + "\n";
            fOutput = fOutput + "clock9Period = " + this.clock9Period + "\n";
            fOutput = fOutput + "clock10Period = " + this.clock10Period + "\n";
            fOutput = fOutput + "clock1Requirement1 = " + this.stringRepresentation(this.clock1Requirement1) + "\n";
            fOutput = fOutput + "clock1Requirement2 = " + this.stringRepresentation(this.clock1Requirement2) + "\n";
            fOutput = fOutput + "clock2Requirement1 = " + this.stringRepresentation(this.clock2Requirement1) + "\n";
            fOutput = fOutput + "clock2Requirement2 = " + this.stringRepresentation(this.clock2Requirement2) + "\n";
            fOutput = fOutput + "clock3Requirement1 = " + this.stringRepresentation(this.clock3Requirement1) + "\n";
            fOutput = fOutput + "clock3Requirement2 = " + this.stringRepresentation(this.clock3Requirement2) + "\n";
            fOutput = fOutput + "clock4Requirement1 = " + this.stringRepresentation(this.clock4Requirement1) + "\n";
            fOutput = fOutput + "clock4Requirement2 = " + this.stringRepresentation(this.clock4Requirement2) + "\n";
            fOutput = fOutput + "clock5Requirement1 = " + this.stringRepresentation(this.clock5Requirement1) + "\n";
            fOutput = fOutput + "clock5Requirement2 = " + this.stringRepresentation(this.clock5Requirement2) + "\n";
            fOutput = fOutput + "clock6Requirement1 = " + this.stringRepresentation(this.clock6Requirement1) + "\n";
            fOutput = fOutput + "clock6Requirement2 = " + this.stringRepresentation(this.clock6Requirement2) + "\n";
            fOutput = fOutput + "clock7Requirement1 = " + this.stringRepresentation(this.clock7Requirement1) + "\n";
            fOutput = fOutput + "clock7Requirement2 = " + this.stringRepresentation(this.clock7Requirement2) + "\n";
            fOutput = fOutput + "clock8Requirement1 = " + this.stringRepresentation(this.clock8Requirement1) + "\n";
            fOutput = fOutput + "clock8Requirement2 = " + this.stringRepresentation(this.clock8Requirement2) + "\n";
            fOutput = fOutput + "clock9Requirement1 = " + this.stringRepresentation(this.clock9Requirement1) + "\n";
            fOutput = fOutput + "clock9Requirement2 = " + this.stringRepresentation(this.clock9Requirement2) + "\n";
            fOutput = fOutput + "clock10Requirement1 = " + this.stringRepresentation(this.clock10Requirement1) + "\n";
            fOutput = fOutput + "clock10Requirement2 = " + this.stringRepresentation(this.clock10Requirement2) + "\n";
            fOutput = fOutput + "clock1Response1 = " + this.stringRepresentation(this.clock1Response1) + "\n";
            fOutput = fOutput + "clock1Response2 = " + this.stringRepresentation(this.clock1Response2) + "\n";
            fOutput = fOutput + "clock1Response3 = " + this.stringRepresentation(this.clock1Response3) + "\n";
            fOutput = fOutput + "clock2Response1 = " + this.stringRepresentation(this.clock2Response1) + "\n";
            fOutput = fOutput + "clock2Response2 = " + this.stringRepresentation(this.clock2Response2) + "\n";
            fOutput = fOutput + "clock2Response3 = " + this.stringRepresentation(this.clock2Response3) + "\n";
            fOutput = fOutput + "clock3Response1 = " + this.stringRepresentation(this.clock3Response1) + "\n";
            fOutput = fOutput + "clock3Response2 = " + this.stringRepresentation(this.clock3Response2) + "\n";
            fOutput = fOutput + "clock3Response3 = " + this.stringRepresentation(this.clock3Response3) + "\n";
            fOutput = fOutput + "clock4Response1 = " + this.stringRepresentation(this.clock4Response1) + "\n";
            fOutput = fOutput + "clock4Response2 = " + this.stringRepresentation(this.clock4Response2) + "\n";
            fOutput = fOutput + "clock4Response3 = " + this.stringRepresentation(this.clock4Response3) + "\n";
            fOutput = fOutput + "clock5Response1 = " + this.stringRepresentation(this.clock5Response1) + "\n";
            fOutput = fOutput + "clock5Response2 = " + this.stringRepresentation(this.clock5Response2) + "\n";
            fOutput = fOutput + "clock5Response3 = " + this.stringRepresentation(this.clock5Response3) + "\n";
            fOutput = fOutput + "clock6Response1 = " + this.stringRepresentation(this.clock6Response1) + "\n";
            fOutput = fOutput + "clock6Response2 = " + this.stringRepresentation(this.clock6Response2) + "\n";
            fOutput = fOutput + "clock6Response3 = " + this.stringRepresentation(this.clock6Response3) + "\n";
            fOutput = fOutput + "clock7Response1 = " + this.stringRepresentation(this.clock7Response1) + "\n";
            fOutput = fOutput + "clock7Response2 = " + this.stringRepresentation(this.clock7Response2) + "\n";
            fOutput = fOutput + "clock7Response3 = " + this.stringRepresentation(this.clock7Response3) + "\n";
            fOutput = fOutput + "clock8Response1 = " + this.stringRepresentation(this.clock8Response1) + "\n";
            fOutput = fOutput + "clock8Response2 = " + this.stringRepresentation(this.clock8Response2) + "\n";
            fOutput = fOutput + "clock8Response3 = " + this.stringRepresentation(this.clock8Response3) + "\n";
            fOutput = fOutput + "clock9Response1 = " + this.stringRepresentation(this.clock9Response1) + "\n";
            fOutput = fOutput + "clock9Response2 = " + this.stringRepresentation(this.clock9Response2) + "\n";
            fOutput = fOutput + "clock9Response3 = " + this.stringRepresentation(this.clock9Response1) + "\n";
            fOutput = fOutput + "clock10Response1 = " + this.stringRepresentation(this.clock10Response1) + "\n";
            fOutput = fOutput + "clock10Response2 = " + this.stringRepresentation(this.clock10Response2) + "\n";
            fOutput = fOutput + "clock10Response3 = " + this.stringRepresentation(this.clock10Response3) + "\n";
            fOutput = fOutput + "sensor1Angle = " + this.sensor1Angle + "\n";
            fOutput = fOutput + "sensor2Angle = " + this.sensor2Angle + "\n";
            fOutput = fOutput + "sensor3Angle = " + this.sensor3Angle + "\n";
            fOutput = fOutput + "sensor4Angle = " + this.sensor4Angle + "\n";
            fOutput = fOutput + "sensor5Angle = " + this.sensor5Angle + "\n";
            fOutput = fOutput + "sensor6Angle = " + this.sensor6Angle + "\n";
            fOutput = fOutput + "sensor7Angle = " + this.sensor7Angle + "\n";
            fOutput = fOutput + "sensor8Angle = " + this.sensor8Angle + "\n";
            fOutput = fOutput + "sensor9Angle = " + this.sensor9Angle + "\n";
            fOutput = fOutput + "sensor10Angle = " + this.sensor10Angle + "\n";
            fOutput = fOutput + "sensor11Angle = " + this.sensor11Angle + "\n";
            fOutput = fOutput + "sensor12Angle = " + this.sensor12Angle + "\n";
            fOutput = fOutput + "sensor13Angle = " + this.sensor13Angle + "\n";
            fOutput = fOutput + "sensor14Angle = " + this.sensor14Angle + "\n";
            fOutput = fOutput + "sensor15Angle = " + this.sensor15Angle + "\n";
            fOutput = fOutput + "sensor16Angle = " + this.sensor16Angle + "\n";
            fOutput = fOutput + "sensor1Length = " + this.sensor1Length + "\n";
            fOutput = fOutput + "sensor2Length = " + this.sensor2Length + "\n";
            fOutput = fOutput + "sensor3Length = " + this.sensor3Length + "\n";
            fOutput = fOutput + "sensor4Length = " + this.sensor4Length + "\n";
            fOutput = fOutput + "sensor5Length = " + this.sensor5Length + "\n";
            fOutput = fOutput + "sensor6Length = " + this.sensor6Length + "\n";
            fOutput = fOutput + "sensor7Length = " + this.sensor7Length + "\n";
            fOutput = fOutput + "sensor8Length = " + this.sensor8Length + "\n";
            fOutput = fOutput + "sensor9Length = " + this.sensor9Length + "\n";
            fOutput = fOutput + "sensor10Length = " + this.sensor10Length + "\n";
            fOutput = fOutput + "sensor11Length = " + this.sensor11Length + "\n";
            fOutput = fOutput + "sensor12Length = " + this.sensor12Length + "\n";
            fOutput = fOutput + "sensor13Length = " + this.sensor13Length + "\n";
            fOutput = fOutput + "sensor14Length = " + this.sensor14Length + "\n";
            fOutput = fOutput + "sensor15Length = " + this.sensor15Length + "\n";
            fOutput = fOutput + "sensor16Length = " + this.sensor16Length + "\n";
            fOutput = fOutput + "sensor1Width = " + this.sensor1Width + "\n";
            fOutput = fOutput + "sensor2Width = " + this.sensor2Width + "\n";
            fOutput = fOutput + "sensor3Width = " + this.sensor3Width + "\n";
            fOutput = fOutput + "sensor4Width = " + this.sensor4Width + "\n";
            fOutput = fOutput + "sensor5Width = " + this.sensor5Width + "\n";
            fOutput = fOutput + "sensor6Width = " + this.sensor6Width + "\n";
            fOutput = fOutput + "sensor7Width = " + this.sensor7Width + "\n";
            fOutput = fOutput + "sensor8Width = " + this.sensor8Width + "\n";
            fOutput = fOutput + "sensor9Width = " + this.sensor9Width + "\n";
            fOutput = fOutput + "sensor10Width = " + this.sensor10Width + "\n";
            fOutput = fOutput + "sensor11Width = " + this.sensor11Width + "\n";
            fOutput = fOutput + "sensor12Width = " + this.sensor12Width + "\n";
            fOutput = fOutput + "sensor13Width = " + this.sensor13Width + "\n";
            fOutput = fOutput + "sensor14Width = " + this.sensor14Width + "\n";
            fOutput = fOutput + "sensor15Width = " + this.sensor15Width + "\n";
            fOutput = fOutput + "sensor16Width = " + this.sensor16Width + "\n";
            fOutput = fOutput + "sensor1Probability = " + this.sensor1Probability + "\n";
            fOutput = fOutput + "sensor2Probability = " + this.sensor2Probability + "\n";
            fOutput = fOutput + "sensor3Probability = " + this.sensor3Probability + "\n";
            fOutput = fOutput + "sensor4Probability = " + this.sensor4Probability + "\n";
            fOutput = fOutput + "sensor5Probability = " + this.sensor5Probability + "\n";
            fOutput = fOutput + "sensor6Probability = " + this.sensor6Probability + "\n";
            fOutput = fOutput + "sensor7Probability = " + this.sensor7Probability + "\n";
            fOutput = fOutput + "sensor8Probability = " + this.sensor8Probability + "\n";
            fOutput = fOutput + "sensor9Probability = " + this.sensor9Probability + "\n";
            fOutput = fOutput + "sensor10Probability = " + this.sensor10Probability + "\n";
            fOutput = fOutput + "sensor11Probability = " + this.sensor11Probability + "\n";
            fOutput = fOutput + "sensor12Probability = " + this.sensor12Probability + "\n";
            fOutput = fOutput + "sensor13Probability = " + this.sensor13Probability + "\n";
            fOutput = fOutput + "sensor14Probability = " + this.sensor14Probability + "\n";
            fOutput = fOutput + "sensor15Probability = " + this.sensor15Probability + "\n";
            fOutput = fOutput + "sensor16Probability = " + this.sensor16Probability + "\n";
            fOutput = fOutput + "sensor1Period = " + this.sensor1Period + "\n";
            fOutput = fOutput + "sensor2Period = " + this.sensor2Period + "\n";
            fOutput = fOutput + "sensor3Period = " + this.sensor3Period + "\n";
            fOutput = fOutput + "sensor4Period = " + this.sensor4Period + "\n";
            fOutput = fOutput + "sensor5Period = " + this.sensor5Period + "\n";
            fOutput = fOutput + "sensor6Period = " + this.sensor6Period + "\n";
            fOutput = fOutput + "sensor7Period = " + this.sensor7Period + "\n";
            fOutput = fOutput + "sensor8Period = " + this.sensor8Period + "\n";
            fOutput = fOutput + "sensor9Period = " + this.sensor9Period + "\n";
            fOutput = fOutput + "sensor10Period = " + this.sensor10Period + "\n";
            fOutput = fOutput + "sensor11Period = " + this.sensor11Period + "\n";
            fOutput = fOutput + "sensor12Period = " + this.sensor12Period + "\n";
            fOutput = fOutput + "sensor13Period = " + this.sensor13Period + "\n";
            fOutput = fOutput + "sensor14Period = " + this.sensor14Period + "\n";
            fOutput = fOutput + "sensor15Period = " + this.sensor15Period + "\n";
            fOutput = fOutput + "sensor16Period = " + this.sensor16Period + "\n";
            fOutput = fOutput + "sensor1ParallelOffset = " + this.sensor1ParallelOffset + "\n";
            fOutput = fOutput + "sensor2ParallelOffset = " + this.sensor2ParallelOffset + "\n";
            fOutput = fOutput + "sensor3ParallelOffset = " + this.sensor3ParallelOffset + "\n";
            fOutput = fOutput + "sensor4ParallelOffset = " + this.sensor4ParallelOffset + "\n";
            fOutput = fOutput + "sensor5ParallelOffset = " + this.sensor5ParallelOffset + "\n";
            fOutput = fOutput + "sensor6ParallelOffset = " + this.sensor6ParallelOffset + "\n";
            fOutput = fOutput + "sensor7ParallelOffset = " + this.sensor7ParallelOffset + "\n";
            fOutput = fOutput + "sensor8ParallelOffset = " + this.sensor8ParallelOffset + "\n";
            fOutput = fOutput + "sensor9ParallelOffset = " + this.sensor9ParallelOffset + "\n";
            fOutput = fOutput + "sensor10ParallelOffset = " + this.sensor10ParallelOffset + "\n";
            fOutput = fOutput + "sensor11ParallelOffset = " + this.sensor11ParallelOffset + "\n";
            fOutput = fOutput + "sensor12ParallelOffset = " + this.sensor12ParallelOffset + "\n";
            fOutput = fOutput + "sensor13ParallelOffset = " + this.sensor13ParallelOffset + "\n";
            fOutput = fOutput + "sensor14ParallelOffset = " + this.sensor14ParallelOffset + "\n";
            fOutput = fOutput + "sensor15ParallelOffset = " + this.sensor15ParallelOffset + "\n";
            fOutput = fOutput + "sensor16ParallelOffset = " + this.sensor16ParallelOffset + "\n";
            fOutput = fOutput + "sensor1PerpendicularOffset = " + this.sensor1PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor2PerpendicularOffset = " + this.sensor2PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor3PerpendicularOffset = " + this.sensor3PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor4PerpendicularOffset = " + this.sensor4PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor5PerpendicularOffset = " + this.sensor5PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor6PerpendicularOffset = " + this.sensor6PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor7PerpendicularOffset = " + this.sensor7PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor8PerpendicularOffset = " + this.sensor8PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor9PerpendicularOffset = " + this.sensor9PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor10PerpendicularOffset = " + this.sensor10PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor11PerpendicularOffset = " + this.sensor11PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor12PerpendicularOffset = " + this.sensor12PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor13PerpendicularOffset = " + this.sensor13PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor14PerpendicularOffset = " + this.sensor14PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor15PerpendicularOffset = " + this.sensor15PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor16PerpendicularOffset = " + this.sensor16PerpendicularOffset + "\n";
            fOutput = fOutput + "sensor1Condition1 = " + this.stringRepresentation(this.sensor1Condition1) + "\n";
            fOutput = fOutput + "sensor1Condition2 = " + this.stringRepresentation(this.sensor1Condition2) + "\n";
            fOutput = fOutput + "sensor1Condition3 = " + this.stringRepresentation(this.sensor1Condition3) + "\n";
            fOutput = fOutput + "sensor2Condition1 = " + this.stringRepresentation(this.sensor2Condition1) + "\n";
            fOutput = fOutput + "sensor2Condition2 = " + this.stringRepresentation(this.sensor2Condition2) + "\n";
            fOutput = fOutput + "sensor2Condition3 = " + this.stringRepresentation(this.sensor2Condition3) + "\n";
            fOutput = fOutput + "sensor3Condition1 = " + this.stringRepresentation(this.sensor3Condition1) + "\n";
            fOutput = fOutput + "sensor3Condition2 = " + this.stringRepresentation(this.sensor3Condition2) + "\n";
            fOutput = fOutput + "sensor3Condition3 = " + this.stringRepresentation(this.sensor3Condition3) + "\n";
            fOutput = fOutput + "sensor4Condition1 = " + this.stringRepresentation(this.sensor4Condition1) + "\n";
            fOutput = fOutput + "sensor4Condition2 = " + this.stringRepresentation(this.sensor4Condition2) + "\n";
            fOutput = fOutput + "sensor4Condition3 = " + this.stringRepresentation(this.sensor4Condition3) + "\n";
            fOutput = fOutput + "sensor5Condition1 = " + this.stringRepresentation(this.sensor5Condition1) + "\n";
            fOutput = fOutput + "sensor5Condition2 = " + this.stringRepresentation(this.sensor5Condition2) + "\n";
            fOutput = fOutput + "sensor5Condition3 = " + this.stringRepresentation(this.sensor5Condition3) + "\n";
            fOutput = fOutput + "sensor6Condition1 = " + this.stringRepresentation(this.sensor6Condition1) + "\n";
            fOutput = fOutput + "sensor6Condition2 = " + this.stringRepresentation(this.sensor6Condition2) + "\n";
            fOutput = fOutput + "sensor6Condition3 = " + this.stringRepresentation(this.sensor6Condition3) + "\n";
            fOutput = fOutput + "sensor7Condition1 = " + this.stringRepresentation(this.sensor7Condition1) + "\n";
            fOutput = fOutput + "sensor7Condition2 = " + this.stringRepresentation(this.sensor7Condition2) + "\n";
            fOutput = fOutput + "sensor7Condition3 = " + this.stringRepresentation(this.sensor7Condition3) + "\n";
            fOutput = fOutput + "sensor8Condition1 = " + this.stringRepresentation(this.sensor8Condition1) + "\n";
            fOutput = fOutput + "sensor8Condition2 = " + this.stringRepresentation(this.sensor8Condition2) + "\n";
            fOutput = fOutput + "sensor8Condition3 = " + this.stringRepresentation(this.sensor8Condition3) + "\n";
            fOutput = fOutput + "sensor9Condition1 = " + this.stringRepresentation(this.sensor9Condition1) + "\n";
            fOutput = fOutput + "sensor9Condition2 = " + this.stringRepresentation(this.sensor9Condition2) + "\n";
            fOutput = fOutput + "sensor9Condition3 = " + this.stringRepresentation(this.sensor9Condition3) + "\n";
            fOutput = fOutput + "sensor10Condition1 = " + this.stringRepresentation(this.sensor10Condition1) + "\n";
            fOutput = fOutput + "sensor10Condition2 = " + this.stringRepresentation(this.sensor10Condition2) + "\n";
            fOutput = fOutput + "sensor10Condition3 = " + this.stringRepresentation(this.sensor10Condition3) + "\n";
            fOutput = fOutput + "sensor11Condition1 = " + this.stringRepresentation(this.sensor11Condition1) + "\n";
            fOutput = fOutput + "sensor11Condition2 = " + this.stringRepresentation(this.sensor11Condition2) + "\n";
            fOutput = fOutput + "sensor11Condition3 = " + this.stringRepresentation(this.sensor11Condition3) + "\n";
            fOutput = fOutput + "sensor12Condition1 = " + this.stringRepresentation(this.sensor12Condition1) + "\n";
            fOutput = fOutput + "sensor12Condition2 = " + this.stringRepresentation(this.sensor12Condition2) + "\n";
            fOutput = fOutput + "sensor12Condition3 = " + this.stringRepresentation(this.sensor12Condition3) + "\n";
            fOutput = fOutput + "sensor13Condition1 = " + this.stringRepresentation(this.sensor13Condition1) + "\n";
            fOutput = fOutput + "sensor13Condition2 = " + this.stringRepresentation(this.sensor13Condition2) + "\n";
            fOutput = fOutput + "sensor13Condition3 = " + this.stringRepresentation(this.sensor13Condition3) + "\n";
            fOutput = fOutput + "sensor14Condition1 = " + this.stringRepresentation(this.sensor14Condition1) + "\n";
            fOutput = fOutput + "sensor14Condition2 = " + this.stringRepresentation(this.sensor14Condition2) + "\n";
            fOutput = fOutput + "sensor14Condition3 = " + this.stringRepresentation(this.sensor14Condition3) + "\n";
            fOutput = fOutput + "sensor15Condition1 = " + this.stringRepresentation(this.sensor15Condition1) + "\n";
            fOutput = fOutput + "sensor15Condition2 = " + this.stringRepresentation(this.sensor15Condition2) + "\n";
            fOutput = fOutput + "sensor15Condition3 = " + this.stringRepresentation(this.sensor15Condition3) + "\n";
            fOutput = fOutput + "sensor16Condition1 = " + this.stringRepresentation(this.sensor16Condition1) + "\n";
            fOutput = fOutput + "sensor16Condition2 = " + this.stringRepresentation(this.sensor16Condition2) + "\n";
            fOutput = fOutput + "sensor16Condition3 = " + this.stringRepresentation(this.sensor16Condition3) + "\n";
            fOutput = fOutput + "sensor1ResponseToWall1 = " + this.stringRepresentation(this.sensor1ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor1ResponseToWall2 = " + this.stringRepresentation(this.sensor1ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor1ResponseToWall3 = " + this.stringRepresentation(this.sensor1ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor1ResponseToTank1 = " + this.stringRepresentation(this.sensor1ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor1ResponseToTank2 = " + this.stringRepresentation(this.sensor1ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor1ResponseToTank3 = " + this.stringRepresentation(this.sensor1ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor1ResponseToMissile1 = " + this.stringRepresentation(this.sensor1ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor1ResponseToMissile2 = " + this.stringRepresentation(this.sensor1ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor1ResponseToMissile3 = " + this.stringRepresentation(this.sensor1ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor2ResponseToWall1 = " + this.stringRepresentation(this.sensor2ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor2ResponseToWall2 = " + this.stringRepresentation(this.sensor2ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor2ResponseToWall3 = " + this.stringRepresentation(this.sensor2ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor2ResponseToTank1 = " + this.stringRepresentation(this.sensor2ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor2ResponseToTank2 = " + this.stringRepresentation(this.sensor2ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor2ResponseToTank3 = " + this.stringRepresentation(this.sensor2ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor2ResponseToMissile1 = " + this.stringRepresentation(this.sensor2ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor2ResponseToMissile2 = " + this.stringRepresentation(this.sensor2ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor2ResponseToMissile3 = " + this.stringRepresentation(this.sensor2ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor3ResponseToWall1 = " + this.stringRepresentation(this.sensor3ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor3ResponseToWall2 = " + this.stringRepresentation(this.sensor3ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor3ResponseToWall3 = " + this.stringRepresentation(this.sensor3ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor3ResponseToTank1 = " + this.stringRepresentation(this.sensor3ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor3ResponseToTank2 = " + this.stringRepresentation(this.sensor3ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor3ResponseToTank3 = " + this.stringRepresentation(this.sensor3ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor3ResponseToMissile1 = " + this.stringRepresentation(this.sensor3ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor3ResponseToMissile2 = " + this.stringRepresentation(this.sensor3ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor3ResponseToMissile3 = " + this.stringRepresentation(this.sensor3ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor4ResponseToWall1 = " + this.stringRepresentation(this.sensor4ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor4ResponseToWall2 = " + this.stringRepresentation(this.sensor4ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor4ResponseToWall3 = " + this.stringRepresentation(this.sensor4ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor4ResponseToTank1 = " + this.stringRepresentation(this.sensor4ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor4ResponseToTank2 = " + this.stringRepresentation(this.sensor4ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor4ResponseToTank3 = " + this.stringRepresentation(this.sensor4ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor4ResponseToMissile1 = " + this.stringRepresentation(this.sensor4ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor4ResponseToMissile2 = " + this.stringRepresentation(this.sensor4ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor4ResponseToMissile3 = " + this.stringRepresentation(this.sensor4ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor5ResponseToWall1 = " + this.stringRepresentation(this.sensor5ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor5ResponseToWall2 = " + this.stringRepresentation(this.sensor5ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor5ResponseToWall3 = " + this.stringRepresentation(this.sensor5ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor5ResponseToTank1 = " + this.stringRepresentation(this.sensor5ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor5ResponseToTank2 = " + this.stringRepresentation(this.sensor5ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor5ResponseToTank3 = " + this.stringRepresentation(this.sensor5ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor5ResponseToMissile1 = " + this.stringRepresentation(this.sensor5ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor5ResponseToMissile2 = " + this.stringRepresentation(this.sensor5ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor5ResponseToMissile3 = " + this.stringRepresentation(this.sensor5ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor6ResponseToWall1 = " + this.stringRepresentation(this.sensor6ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor6ResponseToWall2 = " + this.stringRepresentation(this.sensor6ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor6ResponseToWall3 = " + this.stringRepresentation(this.sensor6ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor6ResponseToTank1 = " + this.stringRepresentation(this.sensor6ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor6ResponseToTank2 = " + this.stringRepresentation(this.sensor6ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor6ResponseToTank3 = " + this.stringRepresentation(this.sensor6ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor6ResponseToMissile1 = " + this.stringRepresentation(this.sensor6ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor6ResponseToMissile2 = " + this.stringRepresentation(this.sensor6ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor6ResponseToMissile3 = " + this.stringRepresentation(this.sensor6ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor7ResponseToWall1 = " + this.stringRepresentation(this.sensor7ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor7ResponseToWall2 = " + this.stringRepresentation(this.sensor7ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor7ResponseToWall3 = " + this.stringRepresentation(this.sensor7ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor7ResponseToTank1 = " + this.stringRepresentation(this.sensor7ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor7ResponseToTank2 = " + this.stringRepresentation(this.sensor7ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor7ResponseToTank3 = " + this.stringRepresentation(this.sensor7ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor7ResponseToMissile1 = " + this.stringRepresentation(this.sensor7ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor7ResponseToMissile2 = " + this.stringRepresentation(this.sensor7ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor7ResponseToMissile3 = " + this.stringRepresentation(this.sensor7ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor8ResponseToWall1 = " + this.stringRepresentation(this.sensor8ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor8ResponseToWall2 = " + this.stringRepresentation(this.sensor8ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor8ResponseToWall3 = " + this.stringRepresentation(this.sensor8ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor8ResponseToTank1 = " + this.stringRepresentation(this.sensor8ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor8ResponseToTank2 = " + this.stringRepresentation(this.sensor8ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor8ResponseToTank3 = " + this.stringRepresentation(this.sensor8ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor8ResponseToMissile1 = " + this.stringRepresentation(this.sensor8ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor8ResponseToMissile2 = " + this.stringRepresentation(this.sensor8ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor8ResponseToMissile3 = " + this.stringRepresentation(this.sensor8ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor9ResponseToWall1 = " + this.stringRepresentation(this.sensor9ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor9ResponseToWall2 = " + this.stringRepresentation(this.sensor9ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor9ResponseToWall3 = " + this.stringRepresentation(this.sensor9ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor9ResponseToTank1 = " + this.stringRepresentation(this.sensor9ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor9ResponseToTank2 = " + this.stringRepresentation(this.sensor9ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor9ResponseToTank3 = " + this.stringRepresentation(this.sensor9ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor9ResponseToMissile1 = " + this.stringRepresentation(this.sensor9ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor9ResponseToMissile2 = " + this.stringRepresentation(this.sensor9ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor9ResponseToMissile3 = " + this.stringRepresentation(this.sensor9ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor10ResponseToWall1 = " + this.stringRepresentation(this.sensor10ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor10ResponseToWall2 = " + this.stringRepresentation(this.sensor10ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor10ResponseToWall3 = " + this.stringRepresentation(this.sensor10ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor10ResponseToTank1 = " + this.stringRepresentation(this.sensor10ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor10ResponseToTank2 = " + this.stringRepresentation(this.sensor10ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor10ResponseToTank3 = " + this.stringRepresentation(this.sensor10ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor10ResponseToMissile1 = " + this.stringRepresentation(this.sensor10ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor10ResponseToMissile2 = " + this.stringRepresentation(this.sensor10ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor10ResponseToMissile3 = " + this.stringRepresentation(this.sensor10ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor11ResponseToWall1 = " + this.stringRepresentation(this.sensor11ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor11ResponseToWall2 = " + this.stringRepresentation(this.sensor11ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor11ResponseToWall3 = " + this.stringRepresentation(this.sensor11ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor11ResponseToTank1 = " + this.stringRepresentation(this.sensor11ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor11ResponseToTank2 = " + this.stringRepresentation(this.sensor11ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor11ResponseToTank3 = " + this.stringRepresentation(this.sensor11ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor11ResponseToMissile1 = " + this.stringRepresentation(this.sensor11ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor11ResponseToMissile2 = " + this.stringRepresentation(this.sensor11ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor11ResponseToMissile3 = " + this.stringRepresentation(this.sensor11ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor12ResponseToWall1 = " + this.stringRepresentation(this.sensor12ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor12ResponseToWall2 = " + this.stringRepresentation(this.sensor12ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor12ResponseToWall3 = " + this.stringRepresentation(this.sensor12ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor12ResponseToTank1 = " + this.stringRepresentation(this.sensor12ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor12ResponseToTank2 = " + this.stringRepresentation(this.sensor12ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor12ResponseToTank3 = " + this.stringRepresentation(this.sensor12ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor12ResponseToMissile1 = " + this.stringRepresentation(this.sensor12ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor12ResponseToMissile2 = " + this.stringRepresentation(this.sensor12ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor12ResponseToMissile3 = " + this.stringRepresentation(this.sensor12ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor13ResponseToWall1 = " + this.stringRepresentation(this.sensor13ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor13ResponseToWall2 = " + this.stringRepresentation(this.sensor13ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor13ResponseToWall3 = " + this.stringRepresentation(this.sensor13ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor13ResponseToTank1 = " + this.stringRepresentation(this.sensor13ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor13ResponseToTank2 = " + this.stringRepresentation(this.sensor13ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor13ResponseToTank3 = " + this.stringRepresentation(this.sensor13ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor13ResponseToMissile1 = " + this.stringRepresentation(this.sensor13ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor13ResponseToMissile2 = " + this.stringRepresentation(this.sensor13ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor13ResponseToMissile3 = " + this.stringRepresentation(this.sensor13ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor14ResponseToWall1 = " + this.stringRepresentation(this.sensor14ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor14ResponseToWall2 = " + this.stringRepresentation(this.sensor14ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor14ResponseToWall3 = " + this.stringRepresentation(this.sensor14ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor14ResponseToTank1 = " + this.stringRepresentation(this.sensor14ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor14ResponseToTank2 = " + this.stringRepresentation(this.sensor14ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor14ResponseToTank3 = " + this.stringRepresentation(this.sensor14ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor14ResponseToMissile1 = " + this.stringRepresentation(this.sensor14ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor14ResponseToMissile2 = " + this.stringRepresentation(this.sensor14ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor14ResponseToMissile3 = " + this.stringRepresentation(this.sensor14ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor15ResponseToWall1 = " + this.stringRepresentation(this.sensor15ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor15ResponseToWall2 = " + this.stringRepresentation(this.sensor15ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor15ResponseToWall3 = " + this.stringRepresentation(this.sensor15ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor15ResponseToTank1 = " + this.stringRepresentation(this.sensor15ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor15ResponseToTank2 = " + this.stringRepresentation(this.sensor15ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor15ResponseToTank3 = " + this.stringRepresentation(this.sensor15ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor15ResponseToMissile1 = " + this.stringRepresentation(this.sensor15ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor15ResponseToMissile2 = " + this.stringRepresentation(this.sensor15ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor15ResponseToMissile3 = " + this.stringRepresentation(this.sensor15ResponseToMissile3) + "\n";
            fOutput = fOutput + "sensor16ResponseToWall1 = " + this.stringRepresentation(this.sensor16ResponseToWall1) + "\n";
            fOutput = fOutput + "sensor16ResponseToWall2 = " + this.stringRepresentation(this.sensor16ResponseToWall2) + "\n";
            fOutput = fOutput + "sensor16ResponseToWall3 = " + this.stringRepresentation(this.sensor16ResponseToWall3) + "\n";
            fOutput = fOutput + "sensor16ResponseToTank1 = " + this.stringRepresentation(this.sensor16ResponseToTank1) + "\n";
            fOutput = fOutput + "sensor16ResponseToTank2 = " + this.stringRepresentation(this.sensor16ResponseToTank2) + "\n";
            fOutput = fOutput + "sensor16ResponseToTank3 = " + this.stringRepresentation(this.sensor16ResponseToTank3) + "\n";
            fOutput = fOutput + "sensor16ResponseToMissile1 = " + this.stringRepresentation(this.sensor16ResponseToMissile1) + "\n";
            fOutput = fOutput + "sensor16ResponseToMissile2 = " + this.stringRepresentation(this.sensor16ResponseToMissile2) + "\n";
            fOutput = fOutput + "sensor16ResponseToMissile3 = " + this.stringRepresentation(this.sensor16ResponseToMissile3) + "\n";
            fOutput = fOutput + "responseToMissileHit1 = " + this.stringRepresentation(this.responseToMissileHit1) + "\n";
            fOutput = fOutput + "responseToMissileHit2 = " + this.stringRepresentation(this.responseToMissileHit2) + "\n";
            fOutput = fOutput + "responseToMissileHit3 = " + this.stringRepresentation(this.responseToMissileHit3) + "\n";
            fOutput = fOutput + "responseToFacingTarget1 = " + this.stringRepresentation(this.responseToFacingTarget1) + "\n";
            fOutput = fOutput + "responseToFacingTarget2 = " + this.stringRepresentation(this.responseToFacingTarget2) + "\n";
            fOutput = fOutput + "responseToFacingTarget3 = " + this.stringRepresentation(this.responseToFacingTarget3) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite1 = " + this.stringRepresentation(this.weaponStrategyFavourite1) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite1 = " + this.stringRepresentation(this.weaponStrategySecondFavourite1) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite1 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite1) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite1 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite1) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite1 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite1) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite2 = " + this.stringRepresentation(this.weaponStrategyFavourite2) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite2 = " + this.stringRepresentation(this.weaponStrategySecondFavourite2) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite2 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite2) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite2 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite2) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite2 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite2) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite3 = " + this.stringRepresentation(this.weaponStrategyFavourite3) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite3 = " + this.stringRepresentation(this.weaponStrategySecondFavourite3) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite3 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite3) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite3 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite3) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite3 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite3) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite4 = " + this.stringRepresentation(this.weaponStrategyFavourite4) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite4 = " + this.stringRepresentation(this.weaponStrategySecondFavourite4) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite4 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite4) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite4 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite4) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite4 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite4) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite5 = " + this.stringRepresentation(this.weaponStrategyFavourite5) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite5 = " + this.stringRepresentation(this.weaponStrategySecondFavourite5) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite5 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite5) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite5 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite5) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite5 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite5) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite6 = " + this.stringRepresentation(this.weaponStrategyFavourite6) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite6 = " + this.stringRepresentation(this.weaponStrategySecondFavourite6) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite6 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite6) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite6 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite6) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite6 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite6) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite7 = " + this.stringRepresentation(this.weaponStrategyFavourite7) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite7 = " + this.stringRepresentation(this.weaponStrategySecondFavourite7) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite7 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite7) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite7 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite7) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite7 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite7) + "\n";
            fOutput = fOutput + "weaponStrategyFavourite8 = " + this.stringRepresentation(this.weaponStrategyFavourite8) + "\n";
            fOutput = fOutput + "weaponStrategySecondFavourite8 = " + this.stringRepresentation(this.weaponStrategySecondFavourite8) + "\n";
            fOutput = fOutput + "weaponStrategyThirdFavourite8 = " + this.stringRepresentation(this.weaponStrategyThirdFavourite8) + "\n";
            fOutput = fOutput + "weaponStrategyFourthFavourite8 = " + this.stringRepresentation(this.weaponStrategyFourthFavourite8) + "\n";
            fOutput = fOutput + "weaponStrategyFifthFavourite8 = " + this.stringRepresentation(this.weaponStrategyFifthFavourite8) + "\n";
            fOutput = fOutput + "weaponFuelRatio = " + this.weaponFuelRatio + "\n";
            fOutput = fOutput + "shoppingStrategyAction1 = " + this.stringRepresentation(this.shoppingStrategyAction1) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition1 = " + this.stringRepresentation(this.shoppingStrategyCondition1) + "\n";
            fOutput = fOutput + "shoppingStrategyAction2 = " + this.stringRepresentation(this.shoppingStrategyAction2) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition2 = " + this.stringRepresentation(this.shoppingStrategyCondition2) + "\n";
            fOutput = fOutput + "shoppingStrategyAction3 = " + this.stringRepresentation(this.shoppingStrategyAction3) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition3 = " + this.stringRepresentation(this.shoppingStrategyCondition3) + "\n";
            fOutput = fOutput + "shoppingStrategyAction4 = " + this.stringRepresentation(this.shoppingStrategyAction4) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition4 = " + this.stringRepresentation(this.shoppingStrategyCondition4) + "\n";
            fOutput = fOutput + "shoppingStrategyAction5 = " + this.stringRepresentation(this.shoppingStrategyAction5) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition5 = " + this.stringRepresentation(this.shoppingStrategyCondition5) + "\n";
            fOutput = fOutput + "shoppingStrategyAction6 = " + this.stringRepresentation(this.shoppingStrategyAction6) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition6 = " + this.stringRepresentation(this.shoppingStrategyCondition6) + "\n";
            fOutput = fOutput + "shoppingStrategyAction7 = " + this.stringRepresentation(this.shoppingStrategyAction7) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition7 = " + this.stringRepresentation(this.shoppingStrategyCondition7) + "\n";
            fOutput = fOutput + "shoppingStrategyAction8 = " + this.stringRepresentation(this.shoppingStrategyAction8) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition8 = " + this.stringRepresentation(this.shoppingStrategyCondition8) + "\n";
            fOutput = fOutput + "shoppingStrategyAction9 = " + this.stringRepresentation(this.shoppingStrategyAction9) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition9 = " + this.stringRepresentation(this.shoppingStrategyCondition9) + "\n";
            fOutput = fOutput + "shoppingStrategyAction10 = " + this.stringRepresentation(this.shoppingStrategyAction10) + "\n";
            fOutput = fOutput + "shoppingStrategyCondition10 = " + this.stringRepresentation(this.shoppingStrategyCondition10) + "\n";
            fOutput = fOutput + "shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = " + this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced + "\n";
            fOutput = fOutput + "shoppingStrategyMaximumFireUnitsThatBePurchased = " + this.shoppingStrategyMaximumFireUnitsThatBePurchased + "\n";
            CWSYSTEM.CWFileTools.outputFile("assets/robots/" + this.filename, fOutput);
        }

        loadFromFile() {
            let hashTable = new CWSYSTEM.CWHashtable(this.filename);
            if (hashTable.hashMap === null) {
                hashTable = robotAIcode.get(this.filename.substring(this.filename.lastIndexOf('/') + 1, this.filename.length));
            }
            this.name = this.getStringParameterValueFromFile(hashTable, "name");
            this.description = this.getStringParameterValueFromFile(hashTable, "description");
            this.viewSensors = this.getIntegerParameterValueFromFile(hashTable, "viewSensors");
            this.clock1Probability = this.getIntegerParameterValueFromFile(hashTable, "clock1Probability");
            this.clock2Probability = this.getIntegerParameterValueFromFile(hashTable, "clock2Probability");
            this.clock3Probability = this.getIntegerParameterValueFromFile(hashTable, "clock3Probability");
            this.clock4Probability = this.getIntegerParameterValueFromFile(hashTable, "clock4Probability");
            this.clock5Probability = this.getIntegerParameterValueFromFile(hashTable, "clock5Probability");
            this.clock6Probability = this.getIntegerParameterValueFromFile(hashTable, "clock6Probability");
            this.clock7Probability = this.getIntegerParameterValueFromFile(hashTable, "clock7Probability");
            this.clock8Probability = this.getIntegerParameterValueFromFile(hashTable, "clock8Probability");
            this.clock9Probability = this.getIntegerParameterValueFromFile(hashTable, "clock9Probability");
            this.clock10Probability = this.getIntegerParameterValueFromFile(hashTable, "clock10Probability");
            this.clock1Period = this.getIntegerParameterValueFromFile(hashTable, "clock1Period");
            this.clock2Period = this.getIntegerParameterValueFromFile(hashTable, "clock2Period");
            this.clock3Period = this.getIntegerParameterValueFromFile(hashTable, "clock3Period");
            this.clock4Period = this.getIntegerParameterValueFromFile(hashTable, "clock4Period");
            this.clock5Period = this.getIntegerParameterValueFromFile(hashTable, "clock5Period");
            this.clock6Period = this.getIntegerParameterValueFromFile(hashTable, "clock6Period");
            this.clock7Period = this.getIntegerParameterValueFromFile(hashTable, "clock7Period");
            this.clock8Period = this.getIntegerParameterValueFromFile(hashTable, "clock8Period");
            this.clock9Period = this.getIntegerParameterValueFromFile(hashTable, "clock9Period");
            this.clock10Period = this.getIntegerParameterValueFromFile(hashTable, "clock10Period");
            this.clock1Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock1Requirement1");
            this.clock1Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock1Requirement2");
            this.clock2Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock2Requirement1");
            this.clock2Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock2Requirement2");
            this.clock3Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock3Requirement1");
            this.clock3Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock3Requirement2");
            this.clock4Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock4Requirement1");
            this.clock4Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock4Requirement2");
            this.clock5Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock5Requirement1");
            this.clock5Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock5Requirement2");
            this.clock6Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock6Requirement1");
            this.clock6Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock6Requirement2");
            this.clock7Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock7Requirement1");
            this.clock7Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock7Requirement2");
            this.clock8Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock8Requirement1");
            this.clock8Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock8Requirement2");
            this.clock9Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock9Requirement1");
            this.clock9Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock9Requirement2");
            this.clock10Requirement1 = this.getCodeParameterValueFromFile(hashTable, "clock10Requirement1");
            this.clock10Requirement2 = this.getCodeParameterValueFromFile(hashTable, "clock10Requirement2");
            this.clock1Response1 = this.getCodeParameterValueFromFile(hashTable, "clock1Response1");
            this.clock1Response2 = this.getCodeParameterValueFromFile(hashTable, "clock1Response2");
            this.clock1Response3 = this.getCodeParameterValueFromFile(hashTable, "clock1Response3");
            this.clock2Response1 = this.getCodeParameterValueFromFile(hashTable, "clock2Response1");
            this.clock2Response2 = this.getCodeParameterValueFromFile(hashTable, "clock2Response2");
            this.clock2Response3 = this.getCodeParameterValueFromFile(hashTable, "clock2Response3");
            this.clock3Response1 = this.getCodeParameterValueFromFile(hashTable, "clock3Response1");
            this.clock3Response2 = this.getCodeParameterValueFromFile(hashTable, "clock3Response2");
            this.clock3Response3 = this.getCodeParameterValueFromFile(hashTable, "clock3Response3");
            this.clock4Response1 = this.getCodeParameterValueFromFile(hashTable, "clock4Response1");
            this.clock4Response2 = this.getCodeParameterValueFromFile(hashTable, "clock4Response2");
            this.clock4Response3 = this.getCodeParameterValueFromFile(hashTable, "clock4Response3");
            this.clock5Response1 = this.getCodeParameterValueFromFile(hashTable, "clock5Response1");
            this.clock5Response2 = this.getCodeParameterValueFromFile(hashTable, "clock5Response2");
            this.clock5Response3 = this.getCodeParameterValueFromFile(hashTable, "clock5Response3");
            this.clock6Response1 = this.getCodeParameterValueFromFile(hashTable, "clock6Response1");
            this.clock6Response2 = this.getCodeParameterValueFromFile(hashTable, "clock6Response2");
            this.clock6Response3 = this.getCodeParameterValueFromFile(hashTable, "clock6Response3");
            this.clock7Response1 = this.getCodeParameterValueFromFile(hashTable, "clock7Response1");
            this.clock7Response2 = this.getCodeParameterValueFromFile(hashTable, "clock7Response2");
            this.clock7Response3 = this.getCodeParameterValueFromFile(hashTable, "clock7Response3");
            this.clock8Response1 = this.getCodeParameterValueFromFile(hashTable, "clock8Response1");
            this.clock8Response2 = this.getCodeParameterValueFromFile(hashTable, "clock8Response2");
            this.clock8Response3 = this.getCodeParameterValueFromFile(hashTable, "clock8Response3");
            this.clock9Response1 = this.getCodeParameterValueFromFile(hashTable, "clock9Response1");
            this.clock9Response2 = this.getCodeParameterValueFromFile(hashTable, "clock9Response2");
            this.clock9Response3 = this.getCodeParameterValueFromFile(hashTable, "clock9Response3");
            this.clock10Response1 = this.getCodeParameterValueFromFile(hashTable, "clock10Response1");
            this.clock10Response2 = this.getCodeParameterValueFromFile(hashTable, "clock10Response2");
            this.clock10Response3 = this.getCodeParameterValueFromFile(hashTable, "clock10Response3");
            this.sensor1Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor1Angle");
            this.sensor2Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor2Angle");
            this.sensor3Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor3Angle");
            this.sensor4Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor4Angle");
            this.sensor5Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor5Angle");
            this.sensor6Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor6Angle");
            this.sensor7Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor7Angle");
            this.sensor8Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor8Angle");
            this.sensor9Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor9Angle");
            this.sensor10Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor10Angle");
            this.sensor11Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor11Angle");
            this.sensor12Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor12Angle");
            this.sensor13Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor13Angle");
            this.sensor14Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor14Angle");
            this.sensor15Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor15Angle");
            this.sensor16Angle = this.getIntegerParameterValueFromFile(hashTable, "sensor16Angle");
            this.sensor1Length = this.getIntegerParameterValueFromFile(hashTable, "sensor1Length");
            this.sensor2Length = this.getIntegerParameterValueFromFile(hashTable, "sensor2Length");
            this.sensor3Length = this.getIntegerParameterValueFromFile(hashTable, "sensor3Length");
            this.sensor4Length = this.getIntegerParameterValueFromFile(hashTable, "sensor4Length");
            this.sensor5Length = this.getIntegerParameterValueFromFile(hashTable, "sensor5Length");
            this.sensor6Length = this.getIntegerParameterValueFromFile(hashTable, "sensor6Length");
            this.sensor7Length = this.getIntegerParameterValueFromFile(hashTable, "sensor7Length");
            this.sensor8Length = this.getIntegerParameterValueFromFile(hashTable, "sensor8Length");
            this.sensor9Length = this.getIntegerParameterValueFromFile(hashTable, "sensor9Length");
            this.sensor10Length = this.getIntegerParameterValueFromFile(hashTable, "sensor10Length");
            this.sensor11Length = this.getIntegerParameterValueFromFile(hashTable, "sensor11Length");
            this.sensor12Length = this.getIntegerParameterValueFromFile(hashTable, "sensor12Length");
            this.sensor13Length = this.getIntegerParameterValueFromFile(hashTable, "sensor13Length");
            this.sensor14Length = this.getIntegerParameterValueFromFile(hashTable, "sensor14Length");
            this.sensor15Length = this.getIntegerParameterValueFromFile(hashTable, "sensor15Length");
            this.sensor16Length = this.getIntegerParameterValueFromFile(hashTable, "sensor16Length");
            this.sensor1Width = this.getIntegerParameterValueFromFile(hashTable, "sensor1Width");
            this.sensor2Width = this.getIntegerParameterValueFromFile(hashTable, "sensor2Width");
            this.sensor3Width = this.getIntegerParameterValueFromFile(hashTable, "sensor3Width");
            this.sensor4Width = this.getIntegerParameterValueFromFile(hashTable, "sensor4Width");
            this.sensor5Width = this.getIntegerParameterValueFromFile(hashTable, "sensor5Width");
            this.sensor6Width = this.getIntegerParameterValueFromFile(hashTable, "sensor6Width");
            this.sensor7Width = this.getIntegerParameterValueFromFile(hashTable, "sensor7Width");
            this.sensor8Width = this.getIntegerParameterValueFromFile(hashTable, "sensor8Width");
            this.sensor9Width = this.getIntegerParameterValueFromFile(hashTable, "sensor9Width");
            this.sensor10Width = this.getIntegerParameterValueFromFile(hashTable, "sensor10Width");
            this.sensor11Width = this.getIntegerParameterValueFromFile(hashTable, "sensor11Width");
            this.sensor12Width = this.getIntegerParameterValueFromFile(hashTable, "sensor12Width");
            this.sensor13Width = this.getIntegerParameterValueFromFile(hashTable, "sensor13Width");
            this.sensor14Width = this.getIntegerParameterValueFromFile(hashTable, "sensor14Width");
            this.sensor15Width = this.getIntegerParameterValueFromFile(hashTable, "sensor15Width");
            this.sensor16Width = this.getIntegerParameterValueFromFile(hashTable, "sensor16Width");
            this.sensor1Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor1Probability");
            this.sensor2Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor2Probability");
            this.sensor3Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor3Probability");
            this.sensor4Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor4Probability");
            this.sensor5Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor5Probability");
            this.sensor6Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor6Probability");
            this.sensor7Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor7Probability");
            this.sensor8Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor8Probability");
            this.sensor9Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor9Probability");
            this.sensor10Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor10Probability");
            this.sensor11Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor11Probability");
            this.sensor12Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor12Probability");
            this.sensor13Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor13Probability");
            this.sensor14Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor14Probability");
            this.sensor15Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor15Probability");
            this.sensor16Probability = this.getIntegerParameterValueFromFile(hashTable, "sensor16Probability");
            this.sensor1Period = this.getIntegerParameterValueFromFile(hashTable, "sensor1Period");
            this.sensor2Period = this.getIntegerParameterValueFromFile(hashTable, "sensor2Period");
            this.sensor3Period = this.getIntegerParameterValueFromFile(hashTable, "sensor3Period");
            this.sensor4Period = this.getIntegerParameterValueFromFile(hashTable, "sensor4Period");
            this.sensor5Period = this.getIntegerParameterValueFromFile(hashTable, "sensor5Period");
            this.sensor6Period = this.getIntegerParameterValueFromFile(hashTable, "sensor6Period");
            this.sensor7Period = this.getIntegerParameterValueFromFile(hashTable, "sensor7Period");
            this.sensor8Period = this.getIntegerParameterValueFromFile(hashTable, "sensor8Period");
            this.sensor9Period = this.getIntegerParameterValueFromFile(hashTable, "sensor9Period");
            this.sensor10Period = this.getIntegerParameterValueFromFile(hashTable, "sensor10Period");
            this.sensor11Period = this.getIntegerParameterValueFromFile(hashTable, "sensor11Period");
            this.sensor12Period = this.getIntegerParameterValueFromFile(hashTable, "sensor12Period");
            this.sensor13Period = this.getIntegerParameterValueFromFile(hashTable, "sensor13Period");
            this.sensor14Period = this.getIntegerParameterValueFromFile(hashTable, "sensor14Period");
            this.sensor15Period = this.getIntegerParameterValueFromFile(hashTable, "sensor15Period");
            this.sensor16Period = this.getIntegerParameterValueFromFile(hashTable, "sensor16Period");
            this.sensor1ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor1ParallelOffset");
            this.sensor2ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor2ParallelOffset");
            this.sensor3ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor3ParallelOffset");
            this.sensor4ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor4ParallelOffset");
            this.sensor5ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor5ParallelOffset");
            this.sensor6ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor6ParallelOffset");
            this.sensor7ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor7ParallelOffset");
            this.sensor8ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor8ParallelOffset");
            this.sensor9ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor9ParallelOffset");
            this.sensor10ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor10ParallelOffset");
            this.sensor11ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor11ParallelOffset");
            this.sensor12ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor12ParallelOffset");
            this.sensor13ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor13ParallelOffset");
            this.sensor14ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor14ParallelOffset");
            this.sensor15ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor15ParallelOffset");
            this.sensor16ParallelOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor16ParallelOffset");
            this.sensor1PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor1PerpendicularOffset");
            this.sensor2PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor2PerpendicularOffset");
            this.sensor3PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor3PerpendicularOffset");
            this.sensor4PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor4PerpendicularOffset");
            this.sensor5PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor5PerpendicularOffset");
            this.sensor6PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor6PerpendicularOffset");
            this.sensor7PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor7PerpendicularOffset");
            this.sensor8PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor8PerpendicularOffset");
            this.sensor9PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor9PerpendicularOffset");
            this.sensor10PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor10PerpendicularOffset");
            this.sensor11PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor11PerpendicularOffset");
            this.sensor12PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor12PerpendicularOffset");
            this.sensor13PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor13PerpendicularOffset");
            this.sensor14PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor14PerpendicularOffset");
            this.sensor15PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor15PerpendicularOffset");
            this.sensor16PerpendicularOffset = this.getIntegerParameterValueFromFile(hashTable, "sensor16PerpendicularOffset");
            this.sensor1Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor1Condition1");
            this.sensor1Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor1Condition2");
            this.sensor1Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor1Condition3");
            this.sensor2Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor2Condition1");
            this.sensor2Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor2Condition2");
            this.sensor2Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor2Condition3");
            this.sensor3Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor3Condition1");
            this.sensor3Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor3Condition2");
            this.sensor3Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor3Condition3");
            this.sensor4Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor4Condition1");
            this.sensor4Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor4Condition2");
            this.sensor4Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor4Condition3");
            this.sensor5Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor5Condition1");
            this.sensor5Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor5Condition2");
            this.sensor5Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor5Condition3");
            this.sensor6Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor6Condition1");
            this.sensor6Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor6Condition2");
            this.sensor6Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor6Condition3");
            this.sensor7Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor7Condition1");
            this.sensor7Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor7Condition2");
            this.sensor7Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor7Condition3");
            this.sensor8Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor8Condition1");
            this.sensor8Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor8Condition2");
            this.sensor8Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor8Condition3");
            this.sensor9Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor9Condition1");
            this.sensor9Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor9Condition2");
            this.sensor9Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor9Condition3");
            this.sensor10Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor10Condition1");
            this.sensor10Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor10Condition2");
            this.sensor10Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor10Condition3");
            this.sensor11Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor11Condition1");
            this.sensor11Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor11Condition2");
            this.sensor11Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor11Condition3");
            this.sensor12Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor12Condition1");
            this.sensor12Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor12Condition2");
            this.sensor12Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor12Condition3");
            this.sensor13Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor13Condition1");
            this.sensor13Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor13Condition2");
            this.sensor13Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor13Condition3");
            this.sensor14Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor14Condition1");
            this.sensor14Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor14Condition2");
            this.sensor14Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor14Condition3");
            this.sensor15Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor15Condition1");
            this.sensor15Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor15Condition2");
            this.sensor15Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor15Condition3");
            this.sensor16Condition1 = this.getCodeParameterValueFromFile(hashTable, "sensor16Condition1");
            this.sensor16Condition2 = this.getCodeParameterValueFromFile(hashTable, "sensor16Condition2");
            this.sensor16Condition3 = this.getCodeParameterValueFromFile(hashTable, "sensor16Condition3");
            this.sensor1ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToWall1");
            this.sensor1ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToWall2");
            this.sensor1ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToWall3");
            this.sensor1ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToTank1");
            this.sensor1ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToTank2");
            this.sensor1ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToTank3");
            this.sensor1ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToMissile1");
            this.sensor1ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToMissile2");
            this.sensor1ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToMissile3");
            this.sensor2ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToWall1");
            this.sensor2ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToWall2");
            this.sensor2ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToWall3");
            this.sensor2ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToTank1");
            this.sensor2ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToTank2");
            this.sensor2ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToTank3");
            this.sensor2ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToMissile1");
            this.sensor2ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToMissile2");
            this.sensor2ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor2ResponseToMissile3");
            this.sensor3ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToWall1");
            this.sensor3ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToWall2");
            this.sensor3ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToWall3");
            this.sensor3ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToTank1");
            this.sensor3ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToTank2");
            this.sensor3ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToTank3");
            this.sensor3ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToMissile1");
            this.sensor3ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToMissile2");
            this.sensor3ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor3ResponseToMissile3");
            this.sensor4ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToWall1");
            this.sensor4ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToWall2");
            this.sensor4ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToWall3");
            this.sensor4ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToTank1");
            this.sensor4ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToTank2");
            this.sensor4ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToTank3");
            this.sensor4ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToMissile1");
            this.sensor4ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToMissile2");
            this.sensor4ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor4ResponseToMissile3");
            this.sensor5ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToWall1");
            this.sensor5ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToWall2");
            this.sensor5ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToWall3");
            this.sensor5ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToTank1");
            this.sensor5ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToTank2");
            this.sensor5ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToTank3");
            this.sensor5ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToMissile1");
            this.sensor5ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor5ResponseToMissile2");
            this.sensor5ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor1ResponseToMissile3");
            this.sensor6ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToWall1");
            this.sensor6ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToWall2");
            this.sensor6ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToWall3");
            this.sensor6ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToTank1");
            this.sensor6ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToTank2");
            this.sensor6ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToTank3");
            this.sensor6ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToMissile1");
            this.sensor6ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToMissile2");
            this.sensor6ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor6ResponseToMissile3");
            this.sensor7ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToWall1");
            this.sensor7ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToWall2");
            this.sensor7ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToWall3");
            this.sensor7ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToTank1");
            this.sensor7ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToTank2");
            this.sensor7ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToTank3");
            this.sensor7ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToMissile1");
            this.sensor7ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToMissile2");
            this.sensor7ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor7ResponseToMissile3");
            this.sensor8ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToWall1");
            this.sensor8ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToWall2");
            this.sensor8ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToWall3");
            this.sensor8ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToTank1");
            this.sensor8ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToTank2");
            this.sensor8ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToTank3");
            this.sensor8ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToMissile1");
            this.sensor8ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToMissile2");
            this.sensor8ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor8ResponseToMissile3");
            this.sensor9ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToWall1");
            this.sensor9ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToWall2");
            this.sensor9ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToWall3");
            this.sensor9ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToTank1");
            this.sensor9ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToTank2");
            this.sensor9ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToTank3");
            this.sensor9ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToMissile1");
            this.sensor9ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToMissile2");
            this.sensor9ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor9ResponseToMissile3");
            this.sensor10ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToWall1");
            this.sensor10ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToWall2");
            this.sensor10ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToWall3");
            this.sensor10ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToTank1");
            this.sensor10ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToTank2");
            this.sensor10ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToTank3");
            this.sensor10ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToMissile1");
            this.sensor10ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToMissile2");
            this.sensor10ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor10ResponseToMissile3");
            this.sensor11ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToWall1");
            this.sensor11ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToWall2");
            this.sensor11ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToWall3");
            this.sensor11ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToTank1");
            this.sensor11ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToTank2");
            this.sensor11ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToTank3");
            this.sensor11ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToMissile1");
            this.sensor11ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToMissile2");
            this.sensor11ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor11ResponseToMissile3");
            this.sensor12ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToWall1");
            this.sensor12ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToWall2");
            this.sensor12ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToWall3");
            this.sensor12ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToTank1");
            this.sensor12ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToTank2");
            this.sensor12ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToTank3");
            this.sensor12ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToMissile1");
            this.sensor12ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToMissile2");
            this.sensor12ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor12ResponseToMissile3");
            this.sensor13ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToWall1");
            this.sensor13ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToWall2");
            this.sensor13ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToWall3");
            this.sensor13ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToTank1");
            this.sensor13ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToTank2");
            this.sensor13ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToTank3");
            this.sensor13ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToMissile1");
            this.sensor13ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToMissile2");
            this.sensor13ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor13ResponseToMissile3");
            this.sensor14ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToWall1");
            this.sensor14ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToWall2");
            this.sensor14ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToWall3");
            this.sensor14ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToTank1");
            this.sensor14ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToTank2");
            this.sensor14ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToTank3");
            this.sensor14ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToMissile1");
            this.sensor14ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToMissile2");
            this.sensor14ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor14ResponseToMissile3");
            this.sensor15ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToWall1");
            this.sensor15ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToWall2");
            this.sensor15ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToWall3");
            this.sensor15ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToTank1");
            this.sensor15ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToTank2");
            this.sensor15ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToTank3");
            this.sensor15ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToMissile1");
            this.sensor15ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToMissile2");
            this.sensor15ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor15ResponseToMissile3");
            this.sensor16ResponseToWall1 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToWall1");
            this.sensor16ResponseToWall2 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToWall2");
            this.sensor16ResponseToWall3 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToWall3");
            this.sensor16ResponseToTank1 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToTank1");
            this.sensor16ResponseToTank2 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToTank2");
            this.sensor16ResponseToTank3 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToTank3");
            this.sensor16ResponseToMissile1 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToMissile1");
            this.sensor16ResponseToMissile2 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToMissile2");
            this.sensor16ResponseToMissile3 = this.getCodeParameterValueFromFile(hashTable, "sensor16ResponseToMissile3");
            this.responseToMissileHit1 = this.getCodeParameterValueFromFile(hashTable, "responseToMissileHit1");
            this.responseToMissileHit2 = this.getCodeParameterValueFromFile(hashTable, "responseToMissileHit2");
            this.responseToMissileHit3 = this.getCodeParameterValueFromFile(hashTable, "responseToMissileHit3");
            this.responseToFacingTarget1 = this.getCodeParameterValueFromFile(hashTable, "responseToFacingTarget1");
            this.responseToFacingTarget2 = this.getCodeParameterValueFromFile(hashTable, "responseToFacingTarget2");
            this.responseToFacingTarget3 = this.getCodeParameterValueFromFile(hashTable, "responseToFacingTarget3");
            this.weaponStrategyFavourite1 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite1");
            this.weaponStrategySecondFavourite1 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite1");
            this.weaponStrategyThirdFavourite1 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite1");
            this.weaponStrategyFourthFavourite1 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite1");
            this.weaponStrategyFifthFavourite1 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite1");
            this.weaponStrategyFavourite2 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite2");
            this.weaponStrategySecondFavourite2 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite2");
            this.weaponStrategyThirdFavourite2 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite2");
            this.weaponStrategyFourthFavourite2 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite2");
            this.weaponStrategyFifthFavourite2 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite2");
            this.weaponStrategyFavourite3 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite3");
            this.weaponStrategySecondFavourite3 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite3");
            this.weaponStrategyThirdFavourite3 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite3");
            this.weaponStrategyFourthFavourite3 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite3");
            this.weaponStrategyFifthFavourite3 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite3");
            this.weaponStrategyFavourite4 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite4");
            this.weaponStrategySecondFavourite4 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite4");
            this.weaponStrategyThirdFavourite4 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite4");
            this.weaponStrategyFourthFavourite4 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite4");
            this.weaponStrategyFifthFavourite4 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite4");
            this.weaponStrategyFavourite5 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite5");
            this.weaponStrategySecondFavourite5 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite5");
            this.weaponStrategyThirdFavourite5 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite5");
            this.weaponStrategyFourthFavourite5 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite5");
            this.weaponStrategyFifthFavourite5 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite5");
            this.weaponStrategyFavourite6 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite6");
            this.weaponStrategySecondFavourite6 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite6");
            this.weaponStrategyThirdFavourite6 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite6");
            this.weaponStrategyFourthFavourite6 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite6");
            this.weaponStrategyFifthFavourite6 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite6");
            this.weaponStrategyFavourite7 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite7");
            this.weaponStrategySecondFavourite7 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite7");
            this.weaponStrategyThirdFavourite7 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite7");
            this.weaponStrategyFourthFavourite7 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite7");
            this.weaponStrategyFifthFavourite7 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite7");
            this.weaponStrategyFavourite8 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFavourite8");
            this.weaponStrategySecondFavourite8 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategySecondFavourite8");
            this.weaponStrategyThirdFavourite8 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyThirdFavourite8");
            this.weaponStrategyFourthFavourite8 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFourthFavourite8");
            this.weaponStrategyFifthFavourite8 = this.getCodeParameterValueFromFile(hashTable, "weaponStrategyFifthFavourite8");
            this.weaponFuelRatio = this.getIntegerParameterValueFromFile(hashTable, "weaponFuelRatio");
            this.shoppingStrategyAction1 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction1");
            this.shoppingStrategyCondition1 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition1");
            this.shoppingStrategyAction2 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction2");
            this.shoppingStrategyCondition2 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition2");
            this.shoppingStrategyAction3 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction3");
            this.shoppingStrategyCondition3 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition3");
            this.shoppingStrategyAction4 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction4");
            this.shoppingStrategyCondition4 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition4");
            this.shoppingStrategyAction5 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction5");
            this.shoppingStrategyCondition5 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition5");
            this.shoppingStrategyAction6 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction6");
            this.shoppingStrategyCondition6 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition6");
            this.shoppingStrategyAction7 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction7");
            this.shoppingStrategyCondition7 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition7");
            this.shoppingStrategyAction8 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction8");
            this.shoppingStrategyCondition8 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition8");
            this.shoppingStrategyAction9 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction9");
            this.shoppingStrategyCondition9 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition9");
            this.shoppingStrategyAction10 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyAction10");
            this.shoppingStrategyCondition10 = this.getCodeParameterValueFromFile(hashTable, "shoppingStrategyCondition10");
            this.shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced = this.getIntegerParameterValueFromFile(hashTable, "shoppingStrategyMaximumFireUnitExpenseWhenWeaponBeingReplaced");
            this.shoppingStrategyMaximumFireUnitsThatBePurchased = this.getIntegerParameterValueFromFile(hashTable, "shoppingStrategyMaximumFireUnitsThatBePurchased");
        }

        /** @private */ getStringParameterValueFromFile(hashtable, parameter) {
            let param = hashtable.get(parameter);
            if (param == null) {
                param = "UNDEFINED";
            }
            return param;
        }

        /** @private */ getCodeParameterValueFromFile(hashMap, value) {
            const param = hashMap.get(value);
            return param == null ? RobotSpecification.UNDEFINED : this.getCodeFromStringRepresentation(param);
        }

        /** @private */ getIntegerParameterValueFromFile(hashtable, name) {
            const name1 = hashtable.get(name);
            let io = RobotSpecification.UNDEFINED;
            if (name1 != null && !((o1, o2) => o1.toUpperCase() ===
                (o2 === null || o2 === undefined || o2 === "" ? o2 : o2.toUpperCase()))(name1, "UNDEFINED")) {
                try {
                    io = parseInt(name1);
                } catch (e) {
                    console.error(e.message, e);
                }
            }
            return io;
        }

        stringRepresentation(iDNumber) {
            RobotSpecification.initializeVariableStringRepresentations();
            let io = RobotSpecification.variablestringRepresentations.get(iDNumber);
            return io == null ? "UNDEFINED" : io;
        }

        getCodeFromStringRepresentation(string) {
            RobotSpecification.initializeVariableStringRepresentations();
            const df = RobotSpecification.variablestringRepresentations.keys();
            let i;
            let str;
            do {
                const item = df.next();
                if (item.done) {
                    return RobotSpecification.UNDEFINED;
                }
                i = item.value;
                str = RobotSpecification.variablestringRepresentations.get(i);
            } while (!(string === str));
            return i;
        }

        performAI(player) {
            this.respondToClocks(player);
            this.respondToSensors(player);
            player.brain.respondToGameTick();
        }

        /** @private */ respondToClocks(player) {
            const time = CWSYSTEM.Environment.currentTime();
            if (time - this.timeOfLastClock1Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock1Period)) {
                this.timeOfLastClock1Tick = time;
                if (this.acceptProbability(this.clock1Probability) && this.passRequirement(player, this.clock1Requirement1) && this.passRequirement(player, this.clock1Requirement2)) {
                    this.performAction(player, this.clock1Response1);
                    this.performAction(player, this.clock1Response2);
                    this.performAction(player, this.clock1Response3);
                }
            }
            if (time - this.timeOfLastClock2Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock2Period)) {
                this.timeOfLastClock2Tick = time;
                if (this.acceptProbability(this.clock2Probability) && this.passRequirement(player, this.clock2Requirement1) && this.passRequirement(player, this.clock2Requirement2)) {
                    this.performAction(player, this.clock2Response1);
                    this.performAction(player, this.clock2Response2);
                    this.performAction(player, this.clock2Response3);
                }
            }
            if (time - this.timeOfLastClock3Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock3Period)) {
                this.timeOfLastClock3Tick = time;
                if (this.acceptProbability(this.clock3Probability) && this.passRequirement(player, this.clock3Requirement1) && this.passRequirement(player, this.clock3Requirement2)) {
                    this.performAction(player, this.clock3Response1);
                    this.performAction(player, this.clock3Response2);
                    this.performAction(player, this.clock3Response3);
                }
            }
            if (time - this.timeOfLastClock4Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock4Period)) {
                this.timeOfLastClock4Tick = time;
                if (this.acceptProbability(this.clock4Probability) && this.passRequirement(player, this.clock4Requirement1) && this.passRequirement(player, this.clock4Requirement2)) {
                    this.performAction(player, this.clock4Response1);
                    this.performAction(player, this.clock4Response2);
                    this.performAction(player, this.clock4Response3);
                }
            }
            if (time - this.timeOfLastClock5Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock5Period)) {
                this.timeOfLastClock5Tick = time;
                if (this.acceptProbability(this.clock5Probability) && this.passRequirement(player, this.clock5Requirement1) && this.passRequirement(player, this.clock5Requirement2)) {
                    this.performAction(player, this.clock5Response1);
                    this.performAction(player, this.clock5Response2);
                    this.performAction(player, this.clock5Response3);
                }
            }
            if (time - this.timeOfLastClock6Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock6Period)) {
                this.timeOfLastClock6Tick = time;
                if (this.acceptProbability(this.clock6Probability) && this.passRequirement(player, this.clock6Requirement1) && this.passRequirement(player, this.clock6Requirement2)) {
                    this.performAction(player, this.clock6Response1);
                    this.performAction(player, this.clock6Response2);
                    this.performAction(player, this.clock6Response3);
                }
            }
            if (time - this.timeOfLastClock7Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock7Period)) {
                this.timeOfLastClock7Tick = time;
                if (this.acceptProbability(this.clock7Probability) && this.passRequirement(player, this.clock7Requirement1) && this.passRequirement(player, this.clock7Requirement2)) {
                    this.performAction(player, this.clock7Response1);
                    this.performAction(player, this.clock7Response2);
                    this.performAction(player, this.clock7Response3);
                }
            }
            if (time - this.timeOfLastClock8Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock8Period)) {
                this.timeOfLastClock8Tick = time;
                if (this.acceptProbability(this.clock8Probability) && this.passRequirement(player, this.clock8Requirement1) && this.passRequirement(player, this.clock8Requirement2)) {
                    this.performAction(player, this.clock8Response1);
                    this.performAction(player, this.clock8Response2);
                    this.performAction(player, this.clock8Response3);
                }
            }
            if (time - this.timeOfLastClock9Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock9Period)) {
                this.timeOfLastClock9Tick = time;
                if (this.acceptProbability(this.clock9Probability) && this.passRequirement(player, this.clock9Requirement1) && this.passRequirement(player, this.clock9Requirement2)) {
                    this.performAction(player, this.clock9Response1);
                    this.performAction(player, this.clock9Response2);
                    this.performAction(player, this.clock9Response3);
                }
            }
            if (time - this.timeOfLastClock10Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.clock10Period)) {
                this.timeOfLastClock10Tick = time;
                if (this.acceptProbability(this.clock10Probability) && this.passRequirement(player, this.clock10Requirement1) && this.passRequirement(player, this.clock10Requirement2)) {
                    this.performAction(player, this.clock10Response1);
                    this.performAction(player, this.clock10Response2);
                    this.performAction(player, this.clock10Response3);
                }
            }
        }

        /** @private */ respondToSensors(player) {
            const time = CWSYSTEM.Environment.currentTime();
            let value;
            if (time - this.timeOfLastSensor1Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor1Period)) {
                this.timeOfLastSensor1Tick = time;
                if (this.acceptProbability(this.sensor1Probability) && this.passRequirement(player, this.sensor1Condition1) && this.passRequirement(player, this.sensor1Condition2) && this.passRequirement(player, this.sensor1Condition3)) {
                    value = player.brain.sensorResponse(1);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor1ResponseToWall1);
                            this.performAction(player, this.sensor1ResponseToWall2);
                            this.performAction(player, this.sensor1ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor1ResponseToMissile1);
                            this.performAction(player, this.sensor1ResponseToMissile2);
                            this.performAction(player, this.sensor1ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor1ResponseToTank1);
                        this.performAction(player, this.sensor1ResponseToTank2);
                        this.performAction(player, this.sensor1ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor2Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor2Period)) {
                this.timeOfLastSensor2Tick = time;
                if (this.acceptProbability(this.sensor2Probability) && this.passRequirement(player, this.sensor2Condition1) && this.passRequirement(player, this.sensor2Condition2) && this.passRequirement(player, this.sensor2Condition3)) {
                    value = player.brain.sensorResponse(2);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor2ResponseToWall1);
                            this.performAction(player, this.sensor2ResponseToWall2);
                            this.performAction(player, this.sensor2ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor2ResponseToMissile1);
                            this.performAction(player, this.sensor2ResponseToMissile2);
                            this.performAction(player, this.sensor2ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor2ResponseToTank1);
                        this.performAction(player, this.sensor2ResponseToTank2);
                        this.performAction(player, this.sensor2ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor3Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor3Period)) {
                this.timeOfLastSensor3Tick = time;
                if (this.acceptProbability(this.sensor3Probability) && this.passRequirement(player, this.sensor3Condition1) && this.passRequirement(player, this.sensor3Condition2) && this.passRequirement(player, this.sensor3Condition3)) {
                    value = player.brain.sensorResponse(3);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor3ResponseToWall1);
                            this.performAction(player, this.sensor3ResponseToWall2);
                            this.performAction(player, this.sensor3ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor3ResponseToMissile1);
                            this.performAction(player, this.sensor3ResponseToMissile2);
                            this.performAction(player, this.sensor3ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor3ResponseToTank1);
                        this.performAction(player, this.sensor3ResponseToTank2);
                        this.performAction(player, this.sensor3ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor4Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor4Period)) {
                this.timeOfLastSensor4Tick = time;
                if (this.acceptProbability(this.sensor4Probability) && this.passRequirement(player, this.sensor4Condition1) && this.passRequirement(player, this.sensor4Condition2) && this.passRequirement(player, this.sensor4Condition3)) {
                    value = player.brain.sensorResponse(4);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor4ResponseToWall1);
                            this.performAction(player, this.sensor4ResponseToWall2);
                            this.performAction(player, this.sensor4ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor4ResponseToMissile1);
                            this.performAction(player, this.sensor4ResponseToMissile2);
                            this.performAction(player, this.sensor4ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor4ResponseToTank1);
                        this.performAction(player, this.sensor4ResponseToTank2);
                        this.performAction(player, this.sensor4ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor5Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor5Period)) {
                this.timeOfLastSensor5Tick = time;
                if (this.acceptProbability(this.sensor5Probability) && this.passRequirement(player, this.sensor5Condition1) && this.passRequirement(player, this.sensor5Condition2) && this.passRequirement(player, this.sensor5Condition3)) {
                    value = player.brain.sensorResponse(5);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor5ResponseToWall1);
                            this.performAction(player, this.sensor5ResponseToWall2);
                            this.performAction(player, this.sensor5ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor5ResponseToMissile1);
                            this.performAction(player, this.sensor5ResponseToMissile2);
                            this.performAction(player, this.sensor5ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor5ResponseToTank1);
                        this.performAction(player, this.sensor5ResponseToTank2);
                        this.performAction(player, this.sensor5ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor6Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor6Period)) {
                this.timeOfLastSensor6Tick = time;
                if (this.acceptProbability(this.sensor6Probability) && this.passRequirement(player, this.sensor6Condition1) && this.passRequirement(player, this.sensor6Condition2) && this.passRequirement(player, this.sensor6Condition3)) {
                    value = player.brain.sensorResponse(6);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor6ResponseToWall1);
                            this.performAction(player, this.sensor6ResponseToWall2);
                            this.performAction(player, this.sensor6ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor6ResponseToMissile1);
                            this.performAction(player, this.sensor6ResponseToMissile2);
                            this.performAction(player, this.sensor6ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor6ResponseToTank1);
                        this.performAction(player, this.sensor6ResponseToTank2);
                        this.performAction(player, this.sensor6ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor7Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor7Period)) {
                this.timeOfLastSensor7Tick = time;
                if (this.acceptProbability(this.sensor7Probability) && this.passRequirement(player, this.sensor7Condition1) && this.passRequirement(player, this.sensor7Condition2) && this.passRequirement(player, this.sensor7Condition3)) {
                    value = player.brain.sensorResponse(7);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor7ResponseToWall1);
                            this.performAction(player, this.sensor7ResponseToWall2);
                            this.performAction(player, this.sensor7ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor7ResponseToMissile1);
                            this.performAction(player, this.sensor7ResponseToMissile2);
                            this.performAction(player, this.sensor7ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor7ResponseToTank1);
                        this.performAction(player, this.sensor7ResponseToTank2);
                        this.performAction(player, this.sensor7ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor8Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor8Period)) {
                this.timeOfLastSensor8Tick = time;
                if (this.acceptProbability(this.sensor8Probability) && this.passRequirement(player, this.sensor8Condition1) && this.passRequirement(player, this.sensor8Condition2) && this.passRequirement(player, this.sensor8Condition3)) {
                    value = player.brain.sensorResponse(8);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor8ResponseToWall1);
                            this.performAction(player, this.sensor8ResponseToWall2);
                            this.performAction(player, this.sensor8ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor8ResponseToMissile1);
                            this.performAction(player, this.sensor8ResponseToMissile2);
                            this.performAction(player, this.sensor8ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor8ResponseToTank1);
                        this.performAction(player, this.sensor8ResponseToTank2);
                        this.performAction(player, this.sensor8ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor9Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor9Period)) {
                this.timeOfLastSensor9Tick = time;
                if (this.acceptProbability(this.sensor9Probability) && this.passRequirement(player, this.sensor9Condition1) && this.passRequirement(player, this.sensor9Condition2) && this.passRequirement(player, this.sensor9Condition3)) {
                    value = player.brain.sensorResponse(9);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor9ResponseToWall1);
                            this.performAction(player, this.sensor9ResponseToWall2);
                            this.performAction(player, this.sensor9ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor9ResponseToMissile1);
                            this.performAction(player, this.sensor9ResponseToMissile2);
                            this.performAction(player, this.sensor9ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor9ResponseToTank1);
                        this.performAction(player, this.sensor9ResponseToTank2);
                        this.performAction(player, this.sensor9ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor10Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor10Period)) {
                this.timeOfLastSensor10Tick = time;
                if (this.acceptProbability(this.sensor10Probability) && this.passRequirement(player, this.sensor10Condition1) && this.passRequirement(player, this.sensor10Condition2) && this.passRequirement(player, this.sensor10Condition3)) {
                    value = player.brain.sensorResponse(10);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor10ResponseToWall1);
                            this.performAction(player, this.sensor10ResponseToWall2);
                            this.performAction(player, this.sensor10ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor10ResponseToMissile1);
                            this.performAction(player, this.sensor10ResponseToMissile2);
                            this.performAction(player, this.sensor10ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor10ResponseToTank1);
                        this.performAction(player, this.sensor10ResponseToTank2);
                        this.performAction(player, this.sensor10ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor11Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor11Period)) {
                this.timeOfLastSensor11Tick = time;
                if (this.acceptProbability(this.sensor11Probability) && this.passRequirement(player, this.sensor11Condition1) && this.passRequirement(player, this.sensor11Condition2) && this.passRequirement(player, this.sensor11Condition3)) {
                    value = player.brain.sensorResponse(11);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor11ResponseToWall1);
                            this.performAction(player, this.sensor11ResponseToWall2);
                            this.performAction(player, this.sensor11ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor11ResponseToMissile1);
                            this.performAction(player, this.sensor11ResponseToMissile2);
                            this.performAction(player, this.sensor11ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor11ResponseToTank1);
                        this.performAction(player, this.sensor11ResponseToTank2);
                        this.performAction(player, this.sensor11ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor12Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor12Period)) {
                this.timeOfLastSensor12Tick = time;
                if (this.acceptProbability(this.sensor12Probability) && this.passRequirement(player, this.sensor12Condition1) && this.passRequirement(player, this.sensor12Condition2) && this.passRequirement(player, this.sensor12Condition3)) {
                    value = player.brain.sensorResponse(12);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor12ResponseToWall1);
                            this.performAction(player, this.sensor12ResponseToWall2);
                            this.performAction(player, this.sensor12ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor12ResponseToMissile1);
                            this.performAction(player, this.sensor12ResponseToMissile2);
                            this.performAction(player, this.sensor12ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor12ResponseToTank1);
                        this.performAction(player, this.sensor12ResponseToTank2);
                        this.performAction(player, this.sensor12ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor13Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor13Period)) {
                this.timeOfLastSensor13Tick = time;
                if (this.acceptProbability(this.sensor13Probability) && this.passRequirement(player, this.sensor13Condition1) && this.passRequirement(player, this.sensor13Condition2) && this.passRequirement(player, this.sensor13Condition3)) {
                    value = player.brain.sensorResponse(13);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor13ResponseToWall1);
                            this.performAction(player, this.sensor13ResponseToWall2);
                            this.performAction(player, this.sensor13ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor13ResponseToMissile1);
                            this.performAction(player, this.sensor13ResponseToMissile2);
                            this.performAction(player, this.sensor13ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor13ResponseToTank1);
                        this.performAction(player, this.sensor13ResponseToTank2);
                        this.performAction(player, this.sensor13ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor14Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor14Period)) {
                this.timeOfLastSensor14Tick = time;
                if (this.acceptProbability(this.sensor14Probability) && this.passRequirement(player, this.sensor14Condition1) && this.passRequirement(player, this.sensor14Condition2) && this.passRequirement(player, this.sensor14Condition3)) {
                    value = player.brain.sensorResponse(14);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor14ResponseToWall1);
                            this.performAction(player, this.sensor14ResponseToWall2);
                            this.performAction(player, this.sensor14ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor14ResponseToMissile1);
                            this.performAction(player, this.sensor14ResponseToMissile2);
                            this.performAction(player, this.sensor14ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor14ResponseToTank1);
                        this.performAction(player, this.sensor14ResponseToTank2);
                        this.performAction(player, this.sensor14ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor15Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor15Period)) {
                this.timeOfLastSensor15Tick = time;
                if (this.acceptProbability(this.sensor15Probability) && this.passRequirement(player, this.sensor15Condition1) && this.passRequirement(player, this.sensor15Condition2) && this.passRequirement(player, this.sensor15Condition3)) {
                    value = player.brain.sensorResponse(15);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor15ResponseToWall1);
                            this.performAction(player, this.sensor15ResponseToWall2);
                            this.performAction(player, this.sensor15ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor15ResponseToMissile1);
                            this.performAction(player, this.sensor15ResponseToMissile2);
                            this.performAction(player, this.sensor15ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor15ResponseToTank1);
                        this.performAction(player, this.sensor15ResponseToTank2);
                        this.performAction(player, this.sensor15ResponseToTank3);
                    }
                }
            }
            if (time - this.timeOfLastSensor16Tick >= (n => n < 0 ? Math.ceil(n) : Math.floor(n))(this.sensor16Period)) {
                this.timeOfLastSensor16Tick = time;
                if (this.acceptProbability(this.sensor16Probability) && this.passRequirement(player, this.sensor16Condition1) && this.passRequirement(player, this.sensor16Condition2) && this.passRequirement(player, this.sensor16Condition3)) {
                    value = player.brain.sensorResponse(16);
                    if (value !== dsector.DSecBrain.TANK && value !== dsector.DSecBrain.JEWEL) {
                        if (value === dsector.DSecBrain.WALL) {
                            this.performAction(player, this.sensor16ResponseToWall1);
                            this.performAction(player, this.sensor16ResponseToWall2);
                            this.performAction(player, this.sensor16ResponseToWall3);
                        } else if (value === dsector.DSecBrain.MISSILE) {
                            this.performAction(player, this.sensor16ResponseToMissile1);
                            this.performAction(player, this.sensor16ResponseToMissile2);
                            this.performAction(player, this.sensor16ResponseToMissile3);
                        }
                    } else {
                        this.performAction(player, this.sensor16ResponseToTank1);
                        this.performAction(player, this.sensor16ResponseToTank2);
                        this.performAction(player, this.sensor16ResponseToTank3);
                    }
                }
            }
        }

        acceptProbability(number) {
            return ((Math.random() * 100.0) | 0) < number;
        }

        /** @private */ passRequirement(player, mode) {
            const brain = player.brain;
            let option;
            switch ((mode)) {
                case 167 /* ANY_CONDITION */
                :
                    return true;
                case 168 /* DESTINATION_TANK_WITHIN_2_TANK_LENGTHS */
                :
                    return brain.destinationTankWithin(Math.fround(dsector.DSecBrain.tankLength * 2.0));
                case 169 /* DESTINATION_TANK_OR_JEWEL_WITHIN_2_TANK_LENGTHS */
                :
                    return brain.destinationTankOrJewelWithin(Math.fround(dsector.DSecBrain.tankLength * 2.0));
                case 170 /* DESTINATION_TANK_OR_JEWEL_WITHIN_5_TANK_LENGTHS */
                :
                    return brain.destinationTankOrJewelWithin(Math.fround(dsector.DSecBrain.tankLength * 5.0));
                case 171 /* DESTINATION_TANK_OR_JEWEL_WITHIN_10_TANK_LENGTHS */
                :
                    return brain.destinationTankOrJewelWithin(Math.fround(dsector.DSecBrain.tankLength * 10.0));
                case 172 /* ENEMY_MISSILE_WITHIN_1_TANK_LENGTH */
                :
                    return brain.enemyMissileWithin(Math.fround(dsector.DSecBrain.tankLength * 1.5), 3.0);
                case 173 /* ENEMY_MISSILE_WITHIN_2_TANK_LENGTHS */
                :
                    return brain.enemyMissileWithin(Math.fround(dsector.DSecBrain.tankLength * 2.0), 5.0);
                case 174 /* ENEMY_MISSILE_WITHIN_3_TANK_LENGTHS */
                :
                    return brain.enemyMissileWithin(Math.fround(dsector.DSecBrain.tankLength * 3.0), 3.0);
                case 175 /* ENEMY_MISSILE_WITHIN_4_TANK_LENGTHS */
                :
                    return brain.enemyMissileWithin(Math.fround(dsector.DSecBrain.tankLength * 4.0), 3.0);
                case 176 /* PROBABILITY_OF_1_PERCENT */
                :
                    return this.acceptProbability(1);
                case 177 /* PROBABILITY_OF_2_PERCENT */
                :
                    return this.acceptProbability(2);
                case 178 /* PROBABILITY_OF_5_PERCENT */
                :
                    return this.acceptProbability(5);
                case 179 /* PROBABILITY_OF_10_PERCENT */
                :
                    return this.acceptProbability(10);
                case 180 /* PROBABILITY_OF_25_PERCENT */
                :
                    return this.acceptProbability(25);
                case 181 /* PROBABILITY_OF_50_PERCENT */
                :
                    return this.acceptProbability(50);
                case 182 /* SENSOR_1_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(1);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 183 /* SENSOR_2_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(2);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 184 /* SENSOR_3_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(3);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 185 /* SENSOR_4_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(4);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 186 /* SENSOR_5_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(5);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 187 /* SENSOR_6_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(6);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 188 /* SENSOR_7_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(7);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 189 /* SENSOR_8_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(8);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 190 /* SENSOR_9_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(9);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 191 /* SENSOR_10_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(10);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 192 /* SENSOR_11_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(11);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 193 /* SENSOR_12_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(12);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 194 /* SENSOR_13_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(13);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 195 /* SENSOR_14_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(14);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 196 /* SENSOR_15_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(15);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 197 /* SENSOR_16_DETECTING_TANK_OR_JEWEL */
                :
                    option = player.brain.sensorResponse(16);
                    return option === dsector.DSecBrain.TANK || option === dsector.DSecBrain.JEWEL;
                case 199 /* NO_ENEMY_TANK_OR_JEWEL_NEAR */
                :
                    return brain.noEnemyTankOrJewelWithin(Math.fround(dsector.DSecBrain.tankLength * 2.0));
                case 200 /* WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL */
                :
                    return player.brain.withinOptimalZoneForFiringAtJewel();
                case 201 /* NOT_WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL */
                :
                    return !player.brain.withinOptimalZoneForFiringAtJewel();
                case 202 /* SENSOR_1_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(1) === dsector.DSecBrain.WALL;
                case 203 /* SENSOR_2_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(2) === dsector.DSecBrain.WALL;
                case 204 /* SENSOR_3_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(3) === dsector.DSecBrain.WALL;
                case 205 /* SENSOR_4_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(4) === dsector.DSecBrain.WALL;
                case 206 /* SENSOR_5_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(5) === dsector.DSecBrain.WALL;
                case 207 /* SENSOR_6_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(6) === dsector.DSecBrain.WALL;
                case 208 /* SENSOR_7_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(7) === dsector.DSecBrain.WALL;
                case 209 /* SENSOR_8_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(8) === dsector.DSecBrain.WALL;
                case 210 /* SENSOR_9_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(9) === dsector.DSecBrain.WALL;
                case 211 /* SENSOR_10_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(10) === dsector.DSecBrain.WALL;
                case 212 /* SENSOR_11_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(11) === dsector.DSecBrain.WALL;
                case 213 /* SENSOR_12_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(12) === dsector.DSecBrain.WALL;
                case 214 /* SENSOR_13_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(13) === dsector.DSecBrain.WALL;
                case 215 /* SENSOR_14_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(14) === dsector.DSecBrain.WALL;
                case 216 /* SENSOR_15_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(15) === dsector.DSecBrain.WALL;
                case 217 /* SENSOR_16_DETECTING_WALL */
                :
                    return player.brain.sensorResponse(16) === dsector.DSecBrain.WALL;
                case 218 /* NO_PLAYER_MOVED_FORWARD_FOR_2_SECONDS */
                :
                    return player.brain.noPlayerHasMovedSince(CWSYSTEM.Environment.currentTime() - 3000);
                case 219 /* ALL_ENEMIES_DESTROYED */
                :
                    return player.brain.numberOfEnemiesAlive() === RobotSpecification.FALSE;
                case 220 /* AT_LEAST_ONE_ENEMY_ALIVE */
                :
                    return player.brain.numberOfEnemiesAlive() > 0;
                case 198 /* ENEMY_TANK_OR_JEWEL_IN_LINE_OF_SIGHT_FROM_TURRET */
                :
                default:
                    return false;
            }
        }

        /** @private */ performAction(player, state) {
            switch ((state)) {
                case 100 /* NO_ACTION */
                :
                case 112 /* SET_TARGET_AS_ENEMY_JEWEL */
                :
                case 116 /* ROTATE_TO_CORRECT_DIRECTION_ALONG_SHORTEST_PATH_TO_TARGET */
                :
                case 138 /* ROTATE_TURRET_TO_TARGET */
                :
                case 139 /* POINT_TURRET_DIRECTLY_AT_TARGET */
                :
                default:
                    break;
                case 101 /* TURN_LEFT */
                :
                    player.acceptInstruction(dsector.DSecPlayer.TURN_CLOCKWISE);
                    break;
                case 102 /* TURN_LEFT_10_DEGREES */
                :
                    player.brain.turnLeftForGivenRadians(0.17453294);
                    break;
                case 103 /* TURN_LEFT_90_DEGREES */
                :
                    player.brain.turnLeftForGivenRadians(1.5707964);
                    break;
                case 104 /* TURN_LEFT_180_DEGREES */
                :
                    player.brain.turnLeftForGivenRadians(3.1415927);
                    break;
                case 105 /* TURN_RIGHT */
                :
                    player.acceptInstruction(dsector.DSecPlayer.TURN_ANTICLOCKWISE);
                    break;
                case 106 /* TURN_RIGHT_10_DEGREES */
                :
                    player.brain.turnRightForGivenRadians(0.17453294);
                    break;
                case 107 /* TURN_RIGHT_90_DEGREES */
                :
                    player.brain.turnRightForGivenRadians(1.5707964);
                    break;
                case 108 /* TURN_RIGHT_180_DEGREES */
                :
                    player.brain.turnRightForGivenRadians(3.1415927);
                    break;
                case 109 /* SET_TARGET_AS_TANK_LAST_DETECTED_WITH_SENSOR */
                :
                    player.brain.setTargetAsTankLastDetectedWithSensor();
                    break;
                case 110 /* SET_TARGET_AS_NEAREST_TANK */
                :
                    player.brain.setTargetAsNearestEnemyTank();
                    break;
                case 111 /* SET_TARGET_AS_NEAREST_ENEMY_TANK_OR_JEWEL */
                :
                    player.brain.setTargetAsNearestEnemyTankOrJewel();
                    break;
                case 113 /* SET_TARGET_AS_ENEMY_TANK_WITH_HIGHEST_SCORE */
                :
                    player.brain.setTargetAsTankWithHighestScore();
                    break;
                case 114 /* SET_TARGET_AS_ENEMY_TANK_WITH_LOWEST_SCORE */
                :
                    player.brain.setTargetAsTankWithLowestScore();
                    break;
                case 115 /* SET_TARGET_AS_TANK_LAST_TAKEN_HIT_FROM */
                :
                    player.brain.setTargetAsTankLastTakenHitFrom();
                    break;
                case 117 /* TURN_TOWARDS_TARGET */
                :
                    player.brain.turnTowardsTarget();
                    break;
                case 118 /* MOVE_FORWARDS */
                :
                    player.acceptInstruction(dsector.DSecPlayer.MOVE_FORWARDS);
                    break;
                case 119 /* MOVE_BACKWARDS */
                :
                    player.acceptInstruction(dsector.DSecPlayer.MOVE_BACKWARDS);
                    break;
                case 120 /* SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_1_SECOND */
                :
                    player.preventInstructionForMilliseconds(0, 1000);
                    player.preventInstructionForMilliseconds(1, 1000);
                    player.preventInstructionForMilliseconds(2, 1000);
                    break;
                case 121 /* SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_2_SECONDS */
                :
                    player.preventInstructionForMilliseconds(0, 2000);
                    player.preventInstructionForMilliseconds(1, 2000);
                    player.preventInstructionForMilliseconds(2, 2000);
                    break;
                case 122 /* SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_4_SECONDS */
                :
                    player.preventInstructionForMilliseconds(0, 4000);
                    player.preventInstructionForMilliseconds(1, 4000);
                    player.preventInstructionForMilliseconds(2, 4000);
                    break;
                case 123 /* SUPRESS_ROTATION_INSTRUCTIONS_FOR_1_SECOND */
                :
                    player.preventInstructionForMilliseconds(3, 1000);
                    player.preventInstructionForMilliseconds(4, 1000);
                    player.preventInstructionForMilliseconds(5, 1000);
                    break;
                case 124 /* SUPRESS_ROTATION_INSTRUCTIONS_FOR_2_SECONDS */
                :
                    player.preventInstructionForMilliseconds(3, 2000);
                    player.preventInstructionForMilliseconds(4, 2000);
                    player.preventInstructionForMilliseconds(5, 2000);
                    break;
                case 125 /* SUPRESS_ROTATION_INSTRUCTIONS_FOR_4_SECONDS */
                :
                    player.preventInstructionForMilliseconds(3, 4000);
                    player.preventInstructionForMilliseconds(4, 4000);
                    player.preventInstructionForMilliseconds(5, 4000);
                    break;
                case 126 /* STOP_MOVING */
                :
                    player.acceptInstruction(dsector.DSecPlayer.STOP_MOVING);
                    break;
                case 127 /* STOP_ROTATING */
                :
                    player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                    break;
                case 128 /* MOVE_RANDOM_DIRECTION */
                :
                    switch (((Math.random() * 3.0) | 0)) {
                        case 0:
                            player.acceptInstruction(dsector.DSecPlayer.MOVE_FORWARDS);
                            return;
                        case 1:
                            player.acceptInstruction(dsector.DSecPlayer.MOVE_BACKWARDS);
                            return;
                        case 2:
                            player.acceptInstruction(dsector.DSecPlayer.STOP_MOVING);
                            return;
                        default:
                            return;
                    }
                case 129 /* TURN_RANDOM_DIRECTION */
                :
                    switch ((((Math.random() * 3.0) | 0))) {
                        case 0:
                            player.brain.turnLeftForGivenRadians(1.2217306);
                            return;
                        case 1:
                            player.brain.turnRightForGivenRadians(1.2217306);
                            return;
                        case 2:
                            player.brain.resetAmountTurned();
                            player.acceptInstruction(dsector.DSecPlayer.STOP_TURNING);
                            return;
                        default:
                            return;
                    }
                case 130 /* FIRE_STRATEGY_1 */
                :
                    this.fireWeaponStrategy1(player);
                    break;
                case 131 /* FIRE_STRATEGY_2 */
                :
                    this.fireWeaponStrategy2(player);
                    break;
                case 132 /* FIRE_STRATEGY_3 */
                :
                    this.fireWeaponStrategy3(player);
                    break;
                case 133 /* FIRE_STRATEGY_4 */
                :
                    this.fireWeaponStrategy4(player);
                    break;
                case 134 /* FIRE_STRATEGY_5 */
                :
                    this.fireWeaponStrategy5(player);
                    break;
                case 135 /* FIRE_STRATEGY_6 */
                :
                    this.fireWeaponStrategy6(player);
                    break;
                case 136 /* FIRE_STRATEGY_7 */
                :
                    this.fireWeaponStrategy7(player);
                    break;
                case 137 /* FIRE_STRATEGY_8 */
                :
                    this.fireWeaponStrategy8(player);
                    break;
                case 140 /* TURN_ON_SHIELD */
                :
                    player.brain.attemptToTurnShieldOn();
            }
        }

        fireWeaponStrategy1(player) {
            let strat = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strat = this.weaponStrategyFavourite1;
                        break;
                    case 1:
                        strat = this.weaponStrategySecondFavourite1;
                        break;
                    case 2:
                        strat = this.weaponStrategyThirdFavourite1;
                        break;
                    case 3:
                        strat = this.weaponStrategyFourthFavourite1;
                        break;
                    case 4:
                        strat = this.weaponStrategyFifthFavourite1;
                }
                const portName = player.getPortNumberFromWeaponSpecificationID(strat);
                if (portName !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(portName)) {
                    player.selectPort(portName);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy2(player) {
            let strat = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch (i) {
                    case 0:
                        strat = this.weaponStrategyFavourite2;
                        break;
                    case 1:
                        strat = this.weaponStrategySecondFavourite2;
                        break;
                    case 2:
                        strat = this.weaponStrategyThirdFavourite2;
                        break;
                    case 3:
                        strat = this.weaponStrategyFourthFavourite2;
                        break;
                    case 4:
                        strat = this.weaponStrategyFifthFavourite2;
                }
                const portNumber = player.getPortNumberFromWeaponSpecificationID(strat);
                if (portNumber !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(portNumber)) {
                    player.selectPort(portNumber);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy3(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite3;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite3;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite3;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite3;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite3;
                }
                const portName = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (portName !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(portName)) {
                    player.selectPort(portName);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy4(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite4;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite4;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite4;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite4;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite4;
                }
                const portNum = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (portNum !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(portNum)) {
                    player.selectPort(portNum);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy5(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite5;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite5;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite5;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite5;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite5;
                }
                const port = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (port !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(port)) {
                    player.selectPort(port);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy6(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite6;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite6;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite6;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite6;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite6;
                }
                const port = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (port !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(port)) {
                    player.selectPort(port);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy7(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite7;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite7;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite7;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite7;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite7;
                }
                const port = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (port !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(port)) {
                    player.selectPort(port);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }

        fireWeaponStrategy8(player) {
            let strategy = RobotSpecification.UNDEFINED;
            for (let i = 0; i < 5; ++i) {
                switch ((i)) {
                    case 0:
                        strategy = this.weaponStrategyFavourite8;
                        break;
                    case 1:
                        strategy = this.weaponStrategySecondFavourite8;
                        break;
                    case 2:
                        strategy = this.weaponStrategyThirdFavourite8;
                        break;
                    case 3:
                        strategy = this.weaponStrategyFourthFavourite8;
                        break;
                    case 4:
                        strategy = this.weaponStrategyFifthFavourite8;
                }
                const port = player.getPortNumberFromWeaponSpecificationID(strategy);
                if (port !== RobotSpecification.UNDEFINED && player.hasWeaponInPort(port)) {
                    player.selectPort(port);
                    player.acceptInstruction(dsector.DSecPlayer.FIRE_WEAPON);
                    return;
                }
            }
        }
    }

    RobotSpecification.KEYBOARD1 = 0;
    RobotSpecification.KEYBOARD2 = 1;
    RobotSpecification.KEYBOARD3 = 2;
    RobotSpecification.KEYBOARD4 = 3;
    RobotSpecification.ROBOT = 4;
    RobotSpecification.JOYSTICK1 = 5;
    RobotSpecification.JOYSTICK2 = 6;
    RobotSpecification.UNDEFINED = -1;
    RobotSpecification.TRUE = 1;
    RobotSpecification.FALSE = 0;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_RANDOM_WEAPON_STRATEGY = 10;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_1 = 11;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_2 = 12;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_3 = 13;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_4 = 14;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_5 = 15;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_6 = 16;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_7 = 17;
    RobotSpecification.MOST_FAVORED_WEAPON_AFFORDABLE_FROM_WEAPON_STRATEGY_8 = 18;
    RobotSpecification.MOST_EXPENSIVE_TANK_WITHOUT_DOWNGRADING = 21;
    RobotSpecification.FUEL_UPGRADE = 22;
    RobotSpecification.METAL_UPGRADE = 23;
    RobotSpecification.TURN_UPGRADE = 24;
    RobotSpecification.SPEED_UPGRADE = 25;
    RobotSpecification.SHOPPING_CARD = 26;
    RobotSpecification.AS_MANY_SCORE_BRIBES_AS_AFFORDABLE = 27;
    RobotSpecification.SHOPPING_CONDITION_ALWAYS = 40;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_500_CREDITS = 41;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_1000_CREDITS = 42;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_2000_CREDITS = 43;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_3000_CREDITS = 44;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_4000_CREDITS = 45;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_6000_CREDITS = 46;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_8000_CREDITS = 47;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_10000_CREDITS = 48;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_15000_CREDITS = 49;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_20000_CREDITS = 50;
    RobotSpecification.SHOPPING_CONDITION_5_PERCENT = 51;
    RobotSpecification.SHOPPING_CONDITION_10_PERCENT = 52;
    RobotSpecification.SHOPPING_CONDITION_25_PERCENT = 53;
    RobotSpecification.SHOPPING_CONDITION_50_PERCENT = 54;
    RobotSpecification.SHOPPING_CONDITION_75_PERCENT = 55;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_25_ROUNDS_REMAINING = 56;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_50_ROUNDS_REMAINING = 57;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_100_ROUNDS_REMAINING = 58;
    RobotSpecification.SHOPPING_CONDITION_MORE_THAN_150_ROUNDS_REMAINING = 59;
    RobotSpecification.SHOPPING_CONDITION_3_ROUNDS_REMAINING = 60;
    RobotSpecification.SHOPPING_CONDITION_6_ROUNDS_REMAINING = 61;
    RobotSpecification.SHOPPING_CONDITION_9_ROUNDS_REMAINING = 62;
    RobotSpecification.SHOPPING_CONDITION_12_ROUNDS_REMAINING = 63;
    RobotSpecification.SHOPPING_CONDITION_15_ROUNDS_REMAINING = 64;
    RobotSpecification.SHOPPING_CONDITION_18_ROUNDS_REMAINING = 65;
    RobotSpecification.SHOPPING_CONDITION_PORT_1_EMPTY = 66;
    RobotSpecification.SHOPPING_CONDITION_PORT_2_EMPTY = 67;
    RobotSpecification.SHOPPING_CONDITION_PORT_3_EMPTY = 68;
    RobotSpecification.SHOPPING_CONDITION_PORT_4_EMPTY = 69;
    RobotSpecification.SHOPPING_CONDITION_PORT_5_EMPTY = 70;
    RobotSpecification.SHOPPING_CONDITION_PORT_6_EMPTY = 71;
    RobotSpecification.SHOPPING_CONDITION_PORT_1_BELOW_100_FIRE_UNITS = 72;
    RobotSpecification.SHOPPING_CONDITION_PORT_2_BELOW_100_FIRE_UNITS = 73;
    RobotSpecification.SHOPPING_CONDITION_PORT_3_BELOW_100_FIRE_UNITS = 74;
    RobotSpecification.SHOPPING_CONDITION_PORT_4_BELOW_100_FIRE_UNITS = 75;
    RobotSpecification.SHOPPING_CONDITION_PORT_5_BELOW_100_FIRE_UNITS = 76;
    RobotSpecification.SHOPPING_CONDITION_PORT_6_BELOW_100_FIRE_UNITS = 77;
    RobotSpecification.NO_ACTION = 100;
    RobotSpecification.TURN_LEFT = 101;
    RobotSpecification.TURN_LEFT_10_DEGREES = 102;
    RobotSpecification.TURN_LEFT_90_DEGREES = 103;
    RobotSpecification.TURN_LEFT_180_DEGREES = 104;
    RobotSpecification.TURN_RIGHT = 105;
    RobotSpecification.TURN_RIGHT_10_DEGREES = 106;
    RobotSpecification.TURN_RIGHT_90_DEGREES = 107;
    RobotSpecification.TURN_RIGHT_180_DEGREES = 108;
    RobotSpecification.SET_TARGET_AS_TANK_LAST_DETECTED_WITH_SENSOR = 109;
    RobotSpecification.SET_TARGET_AS_NEAREST_TANK = 110;
    RobotSpecification.SET_TARGET_AS_NEAREST_ENEMY_TANK_OR_JEWEL = 111;
    RobotSpecification.SET_TARGET_AS_ENEMY_JEWEL = 112;
    RobotSpecification.SET_TARGET_AS_ENEMY_TANK_WITH_HIGHEST_SCORE = 113;
    RobotSpecification.SET_TARGET_AS_ENEMY_TANK_WITH_LOWEST_SCORE = 114;
    RobotSpecification.SET_TARGET_AS_TANK_LAST_TAKEN_HIT_FROM = 115;
    RobotSpecification.ROTATE_TO_CORRECT_DIRECTION_ALONG_SHORTEST_PATH_TO_TARGET = 116;
    RobotSpecification.TURN_TOWARDS_TARGET = 117;
    RobotSpecification.MOVE_FORWARDS = 118;
    RobotSpecification.MOVE_BACKWARDS = 119;
    RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_1_SECOND = 120;
    RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_2_SECONDS = 121;
    RobotSpecification.SUPRESS_MOVEMENT_INSTRUCTIONS_FOR_4_SECONDS = 122;
    RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_1_SECOND = 123;
    RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_2_SECONDS = 124;
    RobotSpecification.SUPRESS_ROTATION_INSTRUCTIONS_FOR_4_SECONDS = 125;
    RobotSpecification.STOP_MOVING = 126;
    RobotSpecification.STOP_ROTATING = 127;
    RobotSpecification.MOVE_RANDOM_DIRECTION = 128;
    RobotSpecification.TURN_RANDOM_DIRECTION = 129;
    RobotSpecification.FIRE_STRATEGY_1 = 130;
    RobotSpecification.FIRE_STRATEGY_2 = 131;
    RobotSpecification.FIRE_STRATEGY_3 = 132;
    RobotSpecification.FIRE_STRATEGY_4 = 133;
    RobotSpecification.FIRE_STRATEGY_5 = 134;
    RobotSpecification.FIRE_STRATEGY_6 = 135;
    RobotSpecification.FIRE_STRATEGY_7 = 136;
    RobotSpecification.FIRE_STRATEGY_8 = 137;
    RobotSpecification.ROTATE_TURRET_TO_TARGET = 138;
    RobotSpecification.POINT_TURRET_DIRECTLY_AT_TARGET = 139;
    RobotSpecification.TURN_ON_SHIELD = 140;
    RobotSpecification.ANY_CONDITION = 167;
    RobotSpecification.DESTINATION_TANK_WITHIN_2_TANK_LENGTHS = 168;
    RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_2_TANK_LENGTHS = 169;
    RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_5_TANK_LENGTHS = 170;
    RobotSpecification.DESTINATION_TANK_OR_JEWEL_WITHIN_10_TANK_LENGTHS = 171;
    RobotSpecification.ENEMY_MISSILE_WITHIN_1_TANK_LENGTH = 172;
    RobotSpecification.ENEMY_MISSILE_WITHIN_2_TANK_LENGTHS = 173;
    RobotSpecification.ENEMY_MISSILE_WITHIN_3_TANK_LENGTHS = 174;
    RobotSpecification.ENEMY_MISSILE_WITHIN_4_TANK_LENGTHS = 175;
    RobotSpecification.PROBABILITY_OF_1_PERCENT = 176;
    RobotSpecification.PROBABILITY_OF_2_PERCENT = 177;
    RobotSpecification.PROBABILITY_OF_5_PERCENT = 178;
    RobotSpecification.PROBABILITY_OF_10_PERCENT = 179;
    RobotSpecification.PROBABILITY_OF_25_PERCENT = 180;
    RobotSpecification.PROBABILITY_OF_50_PERCENT = 181;
    RobotSpecification.SENSOR_1_DETECTING_TANK_OR_JEWEL = 182;
    RobotSpecification.SENSOR_2_DETECTING_TANK_OR_JEWEL = 183;
    RobotSpecification.SENSOR_3_DETECTING_TANK_OR_JEWEL = 184;
    RobotSpecification.SENSOR_4_DETECTING_TANK_OR_JEWEL = 185;
    RobotSpecification.SENSOR_5_DETECTING_TANK_OR_JEWEL = 186;
    RobotSpecification.SENSOR_6_DETECTING_TANK_OR_JEWEL = 187;
    RobotSpecification.SENSOR_7_DETECTING_TANK_OR_JEWEL = 188;
    RobotSpecification.SENSOR_8_DETECTING_TANK_OR_JEWEL = 189;
    RobotSpecification.SENSOR_9_DETECTING_TANK_OR_JEWEL = 190;
    RobotSpecification.SENSOR_10_DETECTING_TANK_OR_JEWEL = 191;
    RobotSpecification.SENSOR_11_DETECTING_TANK_OR_JEWEL = 192;
    RobotSpecification.SENSOR_12_DETECTING_TANK_OR_JEWEL = 193;
    RobotSpecification.SENSOR_13_DETECTING_TANK_OR_JEWEL = 194;
    RobotSpecification.SENSOR_14_DETECTING_TANK_OR_JEWEL = 195;
    RobotSpecification.SENSOR_15_DETECTING_TANK_OR_JEWEL = 196;
    RobotSpecification.SENSOR_16_DETECTING_TANK_OR_JEWEL = 197;
    RobotSpecification.ENEMY_TANK_OR_JEWEL_IN_LINE_OF_SIGHT_FROM_TURRET = 198;
    RobotSpecification.NO_ENEMY_TANK_OR_JEWEL_NEAR = 199;
    RobotSpecification.WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL = 200;
    RobotSpecification.NOT_WITHIN_OPTIMAL_ZONE_FOR_FIRING_AT_JEWEL = 201;
    RobotSpecification.SENSOR_1_DETECTING_WALL = 202;
    RobotSpecification.SENSOR_2_DETECTING_WALL = 203;
    RobotSpecification.SENSOR_3_DETECTING_WALL = 204;
    RobotSpecification.SENSOR_4_DETECTING_WALL = 205;
    RobotSpecification.SENSOR_5_DETECTING_WALL = 206;
    RobotSpecification.SENSOR_6_DETECTING_WALL = 207;
    RobotSpecification.SENSOR_7_DETECTING_WALL = 208;
    RobotSpecification.SENSOR_8_DETECTING_WALL = 209;
    RobotSpecification.SENSOR_9_DETECTING_WALL = 210;
    RobotSpecification.SENSOR_10_DETECTING_WALL = 211;
    RobotSpecification.SENSOR_11_DETECTING_WALL = 212;
    RobotSpecification.SENSOR_12_DETECTING_WALL = 213;
    RobotSpecification.SENSOR_13_DETECTING_WALL = 214;
    RobotSpecification.SENSOR_14_DETECTING_WALL = 215;
    RobotSpecification.SENSOR_15_DETECTING_WALL = 216;
    RobotSpecification.SENSOR_16_DETECTING_WALL = 217;
    RobotSpecification.NO_PLAYER_MOVED_FORWARD_FOR_2_SECONDS = 218;
    RobotSpecification.ALL_ENEMIES_DESTROYED = 219;
    RobotSpecification.AT_LEAST_ONE_ENEMY_ALIVE = 220;
    RobotSpecification.variablestringRepresentations = null;
    dsector.RobotSpecification = RobotSpecification;
    RobotSpecification["__class"] = "dsector.RobotSpecification";
})(dsector || (dsector = {}));
