var CWSYSTEM;
(function (CWSYSTEM) {
    class MouseDrag {
        constructor() {
            this.mode = MouseDrag.NOTHING_BEING_DRAGGED;
            if (this.windowCornerBeingDragged === undefined) {
                this.windowCornerBeingDragged = 0;
            }
            this.draging = false;
            this.windowDragged = -1;
            this.windowResized = -1;
            this.mouseDraggedStartPosition = new dsector.ScreenPosition();
            this.windowDraggedStartPosition = new dsector.ScreenPosition();
            this.windowResizedStartSize = new dsector.ScreenPosition();
            if (this.xAnchor === undefined) {
                this.xAnchor = 0;
            }
            if (this.yAnchor === undefined) {
                this.yAnchor = 0;
            }
            if (this.window === undefined) {
                this.window = null;
            }
            if (this.positionPercentStart === undefined) {
                this.positionPercentStart = 0;
            }
            if (this.guidelineAssignedToAxis === undefined) {
                this.guidelineAssignedToAxis = 0;
            }
            this.locatorAxisToMove = [0, 0];
            if (this.copyOfSelectedVertex === undefined) {
                this.copyOfSelectedVertex = null;
            }
        }

        process(mouseX, mouseY) {
            CWSYSTEM.Environment.mouseX = mouseX;
            CWSYSTEM.Environment.mouseY = mouseY;
            switch (this.mode) {
                case 0 /* NOTHING_BEING_DRAGGED */
                :
                    return;
                case 1 /* WINDOW_MOVE */
                :
                    this.processWindowMoved(mouseX, mouseY);
                    return;
                case 2 /* WINDOW_RESIZE */
                :
                    this.processWindowResized(mouseX, mouseY);
                    return;
                case 3 /* PAD_VERTEX_XY */
                :
                    this.processSelectedVertexesPositionPad(2, mouseX, mouseY);
                    return;
                case 4 /* PAD_VERTEX_XZ */
                :
                    this.processSelectedVertexesPositionPad(1, mouseX, mouseY);
                    return;
                case 5 /* PAD_VERTEX_YZ */
                :
                    this.processSelectedVertexesPositionPad(0, mouseX, mouseY);
                    return;
                case 6 /* PAD_TRANSPOSED_REPR_XY */
                :
                    this.processTransposedRepresentationPositionPad(2, mouseX, mouseY);
                    return;
                case 7 /* PAD_TRANSPOSED_REPR_XZ */
                :
                    this.processTransposedRepresentationPositionPad(1, mouseX, mouseY);
                    return;
                case 8 /* PAD_TRANSPOSED_REPR_YZ */
                :
                    this.processTransposedRepresentationPositionPad(0, mouseX, mouseY);
                    return;
                case 9 /* DRAW_RECTANGLE_SELECT */
                :
                    this.processRectangleSelect(mouseX, mouseY);
                    return;
                case 10 /* RED_PAD */
                :
                    this.processColorPad(mouseX, mouseY, 0);
                    return;
                case 11 /* GREEN_PAD */
                :
                    this.processColorPad(mouseX, mouseY, 1);
                    return;
                case 12 /* BLUE_PAD */
                :
                    this.processColorPad(mouseX, mouseY, 2);
                    return;
                case 13 /* ALPHA_PAD */
                :
                    this.processColorPad(mouseX, mouseY, 3);
                    return;
                case 14 /* REFLECTION_PAD */
                :
                    this.processReflectionPad(mouseX, mouseY);
                    return;
                case 15 /* REFLECTED_SHININESS_PAD */
                :
                    this.processReflectedShininessPad(mouseX, mouseY);
                    return;
                case 16 /* DISPERSED_SHININESS_PAD */
                :
                    this.processDispersedShininessPad(mouseX, mouseY);
                    return;
                case 17 /* GUIDELINE_MOVE */
                :
                    this.processGuidelineMove(mouseX, mouseY);
                    return;
                case 18 /* LOCATOR_MOVE */
                :
                    this.processLocatorMove(mouseX, mouseY);
                    return;
                case 19 /* XY_ROTATION */
                :
                case 20 /* XZ_ROTATION */
                :
                case 21 /* YZ_ROTATION */
                :
                    this.processRotation(mouseX, mouseY);
                    return;
                case 22 /* XY_OFFSET_PAD */
                :
                case 23 /* XZ_OFFSET_PAD */
                :
                case 24 /* YZ_OFFSET_PAD */
                :
                    this.processOffsetPad(mouseX, mouseY);
                    return;
                case 25 /* CAMERA_ROTATION */
                :
                    this.processCameraRotation(mouseX, mouseY);
                    return;
                case 26 /* CAMERA_DIRECTION */
                :
                    this.processCameraDirection(mouseX, mouseY);
                    return;
                case 27 /* CAMERA_POSITION */
                :
                    this.processCameraPosition(mouseX, mouseY);
                    return;
                case 28 /* SLIDING_BAR */
                :
                    this.processSlidingBarMove(mouseX, mouseY);
                    return;
                default:
            }
        }

        release(x, y) {
            if (this.mode === 9) {
                this.releaseRectangleSelect(x, y);
            }
            if (this.mode === 17) {
                this.releaseGuidelineMove();
            }
            if (this.mode === MouseDrag.WINDOW_RESIZE) {
                const window1 = CWSYSTEM.CWSReference.gui.getWindow$int(this.windowResized);
                CWSYSTEM.Debug.println("Tried using " + window1.nameID);
            }
            this.mode = MouseDrag.NOTHING_BEING_DRAGGED;
        }

        /** @private */
        processColorPad(x, y, pad) {
            const padY = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
        }

        /** @private */
        processReflectionPad(x, y) {
            const dragStartY = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
        }

        /** @private */
        processDispersedShininessPad(x, y) {
            const dragY = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
        }

        /** @private */
        processReflectedShininessPad(x, y) {
            const dragY = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
        }

        /** @private */
        processSelectedVertexesPositionPad(mode, x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            const axisID = 0;
            const xAAScale = Math.fround((xDrag / dsector.Renderer.scale[axisID]) * this.window.antiAliasedLevel);
            const yAAScale = Math.fround((yDrag / dsector.Renderer.scale[axisID]) * this.window.antiAliasedLevel);

            for (let i = 0; i < this.copyOfSelectedVertex.length; ++i) {
                const selectedVertex = this.copyOfSelectedVertex[i];
                const vertex = new dsector.Vertex(0.0, 0.0, 0.0);
                switch ((axisID)) {
                    case 0:
                        vertex.y = Math.fround(selectedVertex.y + (xAAScale * CWSYSTEM.Environment.yAxisFlippedYZView_$LI$()));
                        vertex.z = Math.fround(selectedVertex.z + (yAAScale * CWSYSTEM.Environment.zAxisFlippedYZView_$LI$()));
                        break;
                    case 1:
                        vertex.x = Math.fround(selectedVertex.x + (xAAScale * CWSYSTEM.Environment.xAxisFlippedXZView_$LI$()));
                        vertex.z = Math.fround(selectedVertex.z + (yAAScale * CWSYSTEM.Environment.zAxisFlippedXZView_$LI$()));
                        break;
                    case 2:
                        vertex.x = Math.fround(selectedVertex.x + (xAAScale * CWSYSTEM.Environment.xAxisFlippedXYView_$LI$()));
                        vertex.y = Math.fround(selectedVertex.y + (yAAScale * CWSYSTEM.Environment.yAxisFlippedXYView_$LI$()));
                }
                const aaScale = Math.fround((4.0 / dsector.Renderer.scale[axisID]) * this.window.antiAliasedLevel);
            }
            CWSYSTEM.Environment.viewWindowsRequestedForUpdateNextCycle();
        }

        /** @private */
        processTransposedRepresentationPositionPad(pad, x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            const axisID = 0;
            const xAAScale = Math.fround((xDrag / dsector.Renderer.scale[axisID]) * this.window.antiAliasedLevel);
            const yAAScale = Math.fround((yDrag / dsector.Renderer.scale[axisID]) * this.window.antiAliasedLevel);
            let matrix4f = null;
            const polygonIterator = new dsector.PolygonIterator(dsector.DSReference.model3DMatrix, dsector.PolygonIterator.ALL_POLYGON_GROUPS);

            while (true) {
                const polygonGroup = polygonIterator.nextPolygonGroup();
                if (polygonGroup == null) {
                    this.mouseDraggedStartPosition.setPosition(x, y);
                    CWSYSTEM.Environment.viewWindowsRequestedForUpdateNextCycle();
                    return;
                }
                for (let i = 0; i < polygonGroup.transposedRepresentations.length; ++i) {
                    const pgr = polygonGroup.transposedRepresentations[i];
                    if (pgr.active) {
                        switch (axisID) {
                            case 0:
                                matrix4f = dsector.Matrix4f.translationMatrix(0.0,
                                    Math.fround(xAAScale * CWSYSTEM.Environment.xAxisFlippedXYView_$LI$()),
                                    Math.fround(yAAScale * CWSYSTEM.Environment.yAxisFlippedXYView_$LI$()));
                                break;
                            case 1:
                                matrix4f = dsector.Matrix4f.translationMatrix(
                                    Math.fround(xAAScale * CWSYSTEM.Environment.xAxisFlippedXYView_$LI$()),
                                    0.0, Math.fround(yAAScale * CWSYSTEM.Environment.yAxisFlippedXYView_$LI$()));
                                break;
                            case 2:
                                matrix4f = dsector.Matrix4f.translationMatrix(
                                    Math.fround(xAAScale * CWSYSTEM.Environment.xAxisFlippedXYView_$LI$()),
                                    Math.fround(yAAScale * CWSYSTEM.Environment.yAxisFlippedXYView_$LI$()), 0.0);
                        }
                        pgr.transformationMatrix.preMultiply(matrix4f);
                    }
                }

            }
        }

        /** @private */
        processCameraPosition(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
            let xDragFlt = xDrag;
            xDragFlt /= 10.0;
            let yDragFlt = yDrag;
            yDragFlt /= -10.0;
            dsector.DSReference.renderer.moveCameraDirectly(yDragFlt);
            dsector.DSReference.renderer.panCameraDirectly(xDragFlt);
        }

        /** @private */
        processCameraDirection(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
            let xDragFlt = xDrag;
            xDragFlt /= -100.0;
            let yDragFlt = yDrag;
            yDragFlt /= 100.0;
            dsector.DSReference.renderer.changeCameraVertDirectly(yDragFlt);
            dsector.DSReference.renderer.moveCameraPivotDirectly(xDragFlt);
        }

        /** @private */
        processCameraRotation(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
            let xDragFlt = xDrag;
            xDragFlt /= -100.0;
            dsector.DSReference.renderer.changeCameraHueDirectly(xDragFlt);
        }

        engageOffsetPad(x, y, window) {
            this.window = window;
            const axisID = 0;
            switch ((axisID)) {
                case 0:
                    this.mode = 24;
                    break;
                case 1:
                    this.mode = 23;
                    break;
                case 2:
                    this.mode = 22;
            }
            this.mouseDraggedStartPosition.setPosition(x, y);
        }

        /** @private */
        processOffsetPad(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
            const axisID = 0;
            const axisScale = dsector.Renderer.scale[axisID];
            let offset = dsector.Renderer.offsetX;
            offset[axisID] += Math.fround(5.0 * xDrag / axisScale);
            offset = dsector.Renderer.offsetY;
            offset[axisID] += Math.fround(5.0 * yDrag / axisScale);
        }

        /** @private */
        processRotation(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            const yDrag = y - this.mouseDraggedStartPosition.getY();
            this.mouseDraggedStartPosition.setPosition(x, y);
            let yDragFlt = yDrag;
            let xDragFlt = xDrag;
            switch ((this.mode)) {
                case 19:
                case 20:
                    break;
                case 21:
            }
        }

        engageLocatorMove(window, x, y, axisToMove) {
            this.window = window;
            this.mode = 18;
            this.mouseDraggedStartPosition.setPosition(x, y);
            this.locatorAxisToMove = axisToMove;
        }

        /** @private */
        processLocatorMove(x, y) {
            const axisMove1 = this.locatorAxisToMove[0];
            const axisMove2 = this.locatorAxisToMove[1];
            if (axisMove1 !== -1) {
                switch ((axisMove1)) {
                    case 0:
                    case 1:
                        break;
                    case 2:
                }
            }
            if (axisMove2 !== -1) {
                switch ((axisMove2)) {
                    case 0:
                    case 1:
                        break;
                    case 2:
                }
            }
            CWSYSTEM.Environment.viewWindowsRequestedForUpdateNextCycle();
        }

        /** @private */
        processGuidelineMove(x, y) {
            let dragPos;
            if (this.guidelineAssignedToAxis === 0) {
                dragPos = x - this.mouseDraggedStartPosition.getX();
            } else {
                dragPos = y - this.mouseDraggedStartPosition.getY();
            }
            const axisID = 0;
            const dragAALevel = Math.fround(dragPos / dsector.Renderer.scale[axisID] * this.window.antiAliasedLevel);
            this.mouseDraggedStartPosition.setPosition(x, y);
            const axisCheck = 0;
            let xFlipYZ = 0;
            let yFlipYZ = 0;
            let zFlipYZ = 0;
            switch ((axisID)) {
                case 0:
                    xFlipYZ = CWSYSTEM.Environment.xAxisFlippedYZView_$LI$();
                    yFlipYZ = CWSYSTEM.Environment.yAxisFlippedYZView_$LI$();
                    zFlipYZ = CWSYSTEM.Environment.zAxisFlippedYZView_$LI$();
                    break;
                case 1:
                    xFlipYZ = CWSYSTEM.Environment.xAxisFlippedXZView_$LI$();
                    yFlipYZ = CWSYSTEM.Environment.yAxisFlippedXZView_$LI$();
                    zFlipYZ = CWSYSTEM.Environment.zAxisFlippedXZView_$LI$();
                    break;
                case 2:
                    xFlipYZ = CWSYSTEM.Environment.xAxisFlippedXYView_$LI$();
                    yFlipYZ = CWSYSTEM.Environment.yAxisFlippedXYView_$LI$();
                    zFlipYZ = CWSYSTEM.Environment.zAxisFlippedXYView_$LI$();
            }
            CWSYSTEM.Environment.projectiveViewWindowsRequestedForUpdateNextCycle();
        }

        /** @private */
        releaseGuidelineMove() {
            const axisStr = ["x", "y", "z"];
        }

        engageSlidingBarMove(window, x, y) {
            this.xAnchor = x;
            this.yAnchor = y;
            this.window = window;
            this.positionPercentStart = window.scrollbar.positionPercent;
            this.mode = MouseDrag.SLIDING_BAR;
        }

        /** @private */
        processSlidingBarMove(x, y) {
            const scrollbar = this.window.scrollbar;
            const newY = y - this.yAnchor;
            const newH = this.window.h - 2 * 13;
            const newSize = newH - (((Math.fround(newH * scrollbar.sliderSize)) | 0));
            const position = Math.fround(newY / newSize);
            scrollbar.positionPercent = Math.fround(this.positionPercentStart + position);
            if (scrollbar.positionPercent > 1.0) {
                scrollbar.positionPercent = 1.0;
            }
            if (scrollbar.positionPercent < 0.0) {
                scrollbar.positionPercent = 0.0;
            }
            this.window.updated = false;
        }

        /** @private */
        engageRectangleSelect(window, x, y) {
            this.xAnchor = x;
            this.yAnchor = y;
            this.window = window;
            if (dsector.PolygonGroupRepresentation.activeRepresentationsHaveAtLeastOneDirectRepresentation()) {
                this.mode = 9;
            }
        }

        /** @private */
        processRectangleSelect(x, y) {
            const vs = dsector.DSReference.virtualScreen;
            this.window.drawWindow();
            let xAnchor = this.xAnchor - (this.window.xPosition - this.window.borderWidth);
            let yAnchor = this.yAnchor - (this.window.yPosition - this.window.borderWidth - this.window.__titleHeight);
            let xWidth = x - (this.window.xPosition - this.window.borderWidth);
            let yWidth = y - (this.window.yPosition - this.window.borderWidth - this.window.__titleHeight);
            let counter;
            if (xAnchor > xWidth) {
                counter = xWidth;
                xWidth = xAnchor;
                xAnchor = counter;
            }
            if (yAnchor > yWidth) {
                counter = yWidth;
                yWidth = yAnchor;
                yAnchor = counter;
            }
            if (xAnchor < this.window.borderWidth) {
                xAnchor = this.window.borderWidth;
            }
            if (yAnchor < this.window.borderWidth + this.window.__titleHeight) {
                yAnchor = this.window.borderWidth + this.window.__titleHeight;
            }
            if (xWidth > this.window.w + this.window.borderWidth) {
                xWidth = this.window.w + this.window.borderWidth;
            }
            if (yWidth > this.window.h + this.window.borderWidth + this.window.__titleHeight) {
                yWidth = this.window.h + this.window.borderWidth + this.window.__titleHeight;
            }
            let color = null;
            if (CWSYSTEM.Environment.altKeyPressed) {
                color = new CWSYSTEM.CWColor(255, 75, 0, 30);
            } else {
                color = new CWSYSTEM.CWColor(75, 255, 0, 30);
            }
            vs.CWDrawFilledRectangle(this.window.window, xAnchor, yAnchor, xWidth - xAnchor, yWidth - yAnchor, color);
            this.window.renderingRequired = true;
        }

        /** @private */
        releaseRectangleSelect(offsetX, offsetY) {
            //const virtualScreen = dsector.DSReference.virtualScreen;
            this.window.drawWindow();
            this.window.renderingRequired = true;
        }

        engageWindowResize(windowResized, windowCornerBeingDragged, x, y) {
            this.mode = CWSYSTEM.MouseDrag.WINDOW_RESIZE;//2;
            this.windowCornerBeingDragged = windowCornerBeingDragged;
            this.windowResized = windowResized;
            this.mouseDraggedStartPosition.setPosition(x, y);
            this.windowResizedStartSize.setPosition(dsector.DSReference.gui.getWindow$int(windowResized).w,
                dsector.DSReference.gui.getWindow$int(windowResized).h);
            this.windowDraggedStartPosition.setPosition(dsector.DSReference.gui.getWindow$int(windowResized).xPosition,
                dsector.DSReference.gui.getWindow$int(windowResized).yPosition);
        }

        engageWindowMove(windowDragged, x, y) {
            this.mode = CWSYSTEM.MouseDrag.WINDOW_MOVE;//1;
            this.windowDragged = windowDragged;
            this.mouseDraggedStartPosition.setPosition(x, y);
            this.windowDraggedStartPosition.setPosition(dsector.DSReference.gui.getWindow$int(windowDragged).xPosition, dsector.DSReference.gui.getWindow$int(windowDragged).yPosition);
        }

        /** @private */
        processWindowMoved(x, y) {
            const screenResolutionX = CWSYSTEM.Global.screenResolutionX_$LI$();
            const screenResolutionY = CWSYSTEM.Global.screenResolutionY_$LI$();
            const xDragStart = x - this.mouseDraggedStartPosition.getX();
            const yDragStart = y - this.mouseDraggedStartPosition.getY();
            const window1 = dsector.DSReference.gui.getWindow$int(this.windowDragged);
            CWSYSTEM.Environment.screenHasChanged = true;
            const borderWidth = window1.borderWidth;
            const titleHeight = window1.__titleHeight;
            const w = window1.w;
            const h = window1.h;
            let xDragOffset = this.windowDraggedStartPosition.getX() + xDragStart;
            let yDragOffset = this.windowDraggedStartPosition.getY() + yDragStart;
            if (xDragOffset - borderWidth < 1) {
                xDragOffset = 1 + borderWidth;
            }
            if (xDragOffset + w + borderWidth > screenResolutionX - 1) {
                xDragOffset = screenResolutionX - 1 - w - borderWidth;
            }
            if (yDragOffset + h + borderWidth > screenResolutionY - 1) {
                yDragOffset = screenResolutionY - 1 - borderWidth - h;
            }
            if (yDragOffset - titleHeight - borderWidth < 1 + dsector.DSReference.virtualScreen.topInset) {
                yDragOffset = 1 + titleHeight + borderWidth + dsector.DSReference.virtualScreen.topInset;
            }
            window1.xPosition = xDragOffset;
            window1.yPosition = yDragOffset;
            window1.renderingRequired = true;
        }

        /** @private */
        processWindowResized(x, y) {
            const screenResolutionX = CWSYSTEM.Global.screenResolutionX_$LI$();
            const screenResolutionY = CWSYSTEM.Global.screenResolutionY_$LI$();
            const xDragStart = x - this.mouseDraggedStartPosition.getX();
            const yDragStart = y - this.mouseDraggedStartPosition.getY();
            const window1 = dsector.DSReference.gui.getWindow$int(this.windowResized);
            if (window1.resizable) {
                CWSYSTEM.Environment.screenHasChanged = true;
                const borderWidth = window1.borderWidth;
                const titleHeight = window1.__titleHeight;
                //const w = window1.w;
                //const h = window1.h;
                const xPosition = window1.xPosition;
                const yPosition = window1.yPosition;
                let xPos;
                let yPos;
                let xDragOffset;
                let yDragOffset;
                switch (this.windowCornerBeingDragged) {
                    case 1:
                        xDragOffset = this.windowResizedStartSize.getX() + xDragStart;
                        yDragOffset = this.windowResizedStartSize.getY() + yDragStart;
                        xPos = xPosition;
                        yPos = yPosition;
                        break;
                    case 2:
                        xDragOffset = this.windowResizedStartSize.getX() + xDragStart;
                        yDragOffset = this.windowResizedStartSize.getY() - yDragStart;
                        xPos = xPosition;
                        yPos = this.windowDraggedStartPosition.getY() + yDragStart;
                        break;
                    case 3:
                        xDragOffset = this.windowResizedStartSize.getX() - xDragStart;
                        yDragOffset = this.windowResizedStartSize.getY() - yDragStart;
                        xPos = this.windowDraggedStartPosition.getX() + xDragStart;
                        yPos = this.windowDraggedStartPosition.getY() + yDragStart;
                        break;
                    case 4:
                        xDragOffset = this.windowResizedStartSize.getX() - xDragStart;
                        yDragOffset = this.windowResizedStartSize.getY() + yDragStart;
                        xPos = this.windowDraggedStartPosition.getX() + xDragStart;
                        yPos = yPosition;
                        break;
                    default:
                        xDragOffset = -1;
                        yDragOffset = -1;
                        xPos = -1;
                        yPos = -1;
                }
                let newBorderWidthX = xPos + xDragOffset + borderWidth;
                let newBorderWidthY = yPos + yDragOffset + borderWidth;
                let borderLoc = xPos - borderWidth;
                let newTitleLoc = yPos - borderWidth - titleHeight;
                const minWidth = window1.minWidth;
                const maxWidth = window1.maxWidth;
                const minHeight = window1.minHeight;
                const maxHeight = window1.maxHeight;
                if (newBorderWidthX - borderLoc - 2 * borderWidth < minWidth) {
                    switch (this.windowCornerBeingDragged) {
                        case 1:
                        case 2:
                            newBorderWidthX = borderLoc + 2 * borderWidth + minWidth;
                            break;
                        case 3:
                        case 4:
                            borderLoc = newBorderWidthX - 2 * borderWidth - minWidth;
                    }
                }
                if (newBorderWidthX - borderLoc - 2 * borderWidth > maxWidth) {
                    switch ((this.windowCornerBeingDragged)) {
                        case 1:
                        case 2:
                            newBorderWidthX = borderLoc + 2 * borderWidth + maxWidth;
                            break;
                        case 3:
                        case 4:
                            borderLoc = newBorderWidthX - 2 * borderWidth - maxWidth;
                    }
                }
                if (newBorderWidthY - newTitleLoc - 2 * borderWidth - titleHeight < minHeight) {
                    switch ((this.windowCornerBeingDragged)) {
                        case 1:
                        case 4:
                            newBorderWidthY = newTitleLoc + 2 * borderWidth + titleHeight + minHeight;
                            break;
                        case 2:
                        case 3:
                            newTitleLoc = newBorderWidthY - 2 * borderWidth - titleHeight - minHeight;
                    }
                }
                if (newBorderWidthY - newTitleLoc - 2 * borderWidth - titleHeight > maxHeight) {
                    switch ((this.windowCornerBeingDragged)) {
                        case 1:
                        case 4:
                            newBorderWidthY = newTitleLoc + 2 * borderWidth + titleHeight + maxHeight;
                            break;
                        case 2:
                        case 3:
                            newTitleLoc = newBorderWidthY - 2 * borderWidth - titleHeight - maxHeight;
                    }
                }
                if (borderLoc < 1) {
                    borderLoc = 1;
                }
                if (newTitleLoc < 1 + dsector.DSReference.virtualScreen.topInset) {
                    newTitleLoc = 1 + dsector.DSReference.virtualScreen.topInset;
                }
                if (newBorderWidthX > screenResolutionX - 1) {
                    newBorderWidthX = screenResolutionX - 1;
                }
                if (newBorderWidthY > screenResolutionY - 1) {
                    newBorderWidthY = screenResolutionY - 1;
                }
                window1.xPosition = borderLoc + borderWidth;
                window1.yPosition = newTitleLoc + borderWidth + titleHeight;
                window1.w = newBorderWidthX - borderLoc - 2 * borderWidth;
                window1.h = newBorderWidthY - newTitleLoc - 2 * borderWidth - titleHeight;
                window1.updated = false;
                const nameID = window1.nameID;
                if (nameID === ("X")) {
                    CWSYSTEM.Environment.oneProjectiveViewWindowRequestedForUpdateNextCycle(0);
                }
                if (nameID === ("Y")) {
                    CWSYSTEM.Environment.oneProjectiveViewWindowRequestedForUpdateNextCycle(1);
                }
                if (nameID === ("Z")) {
                    CWSYSTEM.Environment.oneProjectiveViewWindowRequestedForUpdateNextCycle(2);
                }
                if (nameID === ("PER")) {
                    CWSYSTEM.Environment.oneProjectiveViewWindowRequestedForUpdateNextCycle(3);
                }
                if (window1.hasScrollbar()) {
                    window1.scrollbar.updateSliderSize();
                }
            }
        }
    }

    MouseDrag.NOTHING_BEING_DRAGGED = 0;
    MouseDrag.WINDOW_MOVE = 1;
    MouseDrag.WINDOW_RESIZE = 2;
    MouseDrag.PAD_VERTEX_XY = 3;
    MouseDrag.PAD_VERTEX_XZ = 4;
    MouseDrag.PAD_VERTEX_YZ = 5;
    MouseDrag.PAD_TRANSPOSED_REPR_XY = 6;
    MouseDrag.PAD_TRANSPOSED_REPR_XZ = 7;
    MouseDrag.PAD_TRANSPOSED_REPR_YZ = 8;
    MouseDrag.DRAW_RECTANGLE_SELECT = 9;
    MouseDrag.RED_PAD = 10;
    MouseDrag.GREEN_PAD = 11;
    MouseDrag.BLUE_PAD = 12;
    MouseDrag.ALPHA_PAD = 13;
    MouseDrag.REFLECTION_PAD = 14;
    MouseDrag.REFLECTED_SHININESS_PAD = 15;
    MouseDrag.DISPERSED_SHININESS_PAD = 16;
    MouseDrag.GUIDELINE_MOVE = 17;
    MouseDrag.LOCATOR_MOVE = 18;
    MouseDrag.XY_ROTATION = 19;
    MouseDrag.XZ_ROTATION = 20;
    MouseDrag.YZ_ROTATION = 21;
    MouseDrag.XY_OFFSET_PAD = 22;
    MouseDrag.XZ_OFFSET_PAD = 23;
    MouseDrag.YZ_OFFSET_PAD = 24;
    MouseDrag.CAMERA_ROTATION = 25;
    MouseDrag.CAMERA_DIRECTION = 26;
    MouseDrag.CAMERA_POSITION = 27;
    MouseDrag.SLIDING_BAR = 28;
    CWSYSTEM.MouseDrag = MouseDrag;
    MouseDrag["__class"] = "CWSYSTEM.MouseDrag";
})(CWSYSTEM || (CWSYSTEM = {}));
