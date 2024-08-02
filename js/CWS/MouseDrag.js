(function (CWSYSTEM) {
    /**
     * Class representing the mouse drag functionality.
     *
     * @property {number} mode - The current mode of the mouse drag operation.
     * @property {number} windowCornerBeingDragged - The corner of the window being dragged (if any).
     * @property {boolean} draging - Indicates whether a drag operation is in progress.
     * @property {number} windowDragged - The window being dragged (if any).
     * @property {number} windowResized - The window being resized (if any).
     * @property {CWSYSTEM.ScreenPosition} mouseDraggedStartPosition - The starting position of the mouse drag.
     * @property {CWSYSTEM.ScreenPosition} windowDraggedStartPosition - The starting position of the window drag.
     * @property {CWSYSTEM.ScreenPosition} windowResizedStartSize - The starting size of the window resize.
     * @property {number} xAnchor - The x-anchor value for the mouse drag operation.
     * @property {number} yAnchor - The y-anchor value for the mouse drag operation.
     * @property {CWSYSTEM.CWWindow} window - The window being manipulated.
     * @property {number} positionPercentStart - The starting position percentage for the mouse drag operation.
     * @property {number} guidelineAssignedToAxis - The guideline assigned to the axis for the mouse drag operation.
     * @property {number[]} locatorAxisToMove - The axis to move for the locator.
     * @property {CWSYSTEM.Vertex} copyOfSelectedVertex - The copy of the selected vertex for the mouse drag operation.
     *
     * @since    1.0.0
     * @access   public
     * @class
     *
     * @memberof CWSYSTEM
     *
     * @author   neoFuzz
     * @link     https://github.com/neoFuzz/dsec-web
     * @license  AGPLv3
     */
    class MouseDrag {
        /**
         * Constructs a new instance of the MouseDrag class, initializing the necessary data structures and properties.
         */
        constructor() {
            this.mode = MouseDrag.NOTHING_BEING_DRAGGED;
            this.windowCornerBeingDragged = 0;
            this.draging = false;
            this.windowDragged = -1;
            this.windowResized = -1;
            this.mouseDraggedStartPosition = new dsector.ScreenPosition();
            this.windowDraggedStartPosition = new dsector.ScreenPosition();
            this.windowResizedStartSize = new dsector.ScreenPosition();
            this.xAnchor = 0;
            this.yAnchor = 0;
            this.window = null;
            this.positionPercentStart = 0;
            this.guidelineAssignedToAxis = 0;
            this.locatorAxisToMove = [0, 0];
            this.copyOfSelectedVertex = null;
        }

        /**
         * Processes the mouse drag based on the current mode and the provided mouse coordinates.
         *
         * @param {number} mouseX - The x-coordinate of the mouse.
         * @param {number} mouseY - The y-coordinate of the mouse.
         */
        process(mouseX, mouseY) {
            CWSYSTEM.Environment.mouseX = mouseX;
            CWSYSTEM.Environment.mouseY = mouseY;
            switch (this.mode) {
                case 0: /* NOTHING_BEING_DRAGGED */
                    return;
                case 1: /* WINDOW_MOVE */
                    this.processWindowMoved(mouseX, mouseY);
                    return;
                case 2: /* WINDOW_RESIZE */
                    this.processWindowResized(mouseX, mouseY);
                    return;
                case 19: /* XY_ROTATION */
                case 20: /* XZ_ROTATION */
                case 21: /* YZ_ROTATION */
                    this.processRotation(mouseX, mouseY);
                    return;
                case 25: /* CAMERA_ROTATION */
                    this.processCameraRotation(mouseX, mouseY);
                    return;
                case 26: /* CAMERA_DIRECTION */
                    this.processCameraDirection(mouseX, mouseY);
                    return;
                case 27: /* CAMERA_POSITION */
                    this.processCameraPosition(mouseX, mouseY);
                    return;
                case 28: /* SLIDING_BAR */
                    this.processSlidingBarMove(mouseX, mouseY);
                    return;
                default:
            }
        }

        /**
         * Releases the mouse drag operation and performs any necessary cleanup.
         *
         * @param {number} x - The x-coordinate of the mouse release.
         * @param {number} y - The y-coordinate of the mouse release.
         */
        release(x, y) {
            if (this.mode === 9) {
                this.releaseRectangleSelect(x, y);
            }
            if (this.mode === MouseDrag.WINDOW_RESIZE) {
                const window1 = CWSYSTEM.CWSReference.gui.getWindow$int(this.windowResized);
                CWSYSTEM.Debug.println("Tried using " + window1.nameID);
            }
            this.mode = MouseDrag.NOTHING_BEING_DRAGGED;
        }

        /**
         * Processes the camera position based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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

        /**
         * Processes the camera direction based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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

        /**
         * Processes the camera rotation based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
        processCameraRotation(x, y) {
            const xDrag = x - this.mouseDraggedStartPosition.getX();
            this.mouseDraggedStartPosition.setPosition(x, y);
            let xDragFlt = xDrag;
            xDragFlt /= -100.0;
            dsector.DSReference.renderer.changeCameraHueDirectly(xDragFlt);
        }

        /**
         * Processes the rotation based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
        processRotation(x, y) {
            this.mouseDraggedStartPosition.setPosition(x, y);
            switch ((this.mode)) {
                case 19:
                case 20:
                    break;
                case 21:
            }
        }

        /**
         * Engages the sliding bar move mode for the specified window and mouse coordinates.
         *
         * @param {CWSYSTEM.CWWindow} window - The window being manipulated.
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         */
        engageSlidingBarMove(window, x, y) {
            this.xAnchor = x;
            this.yAnchor = y;
            this.window = window;
            this.positionPercentStart = window.scrollbar.positionPercent;
            this.mode = MouseDrag.SLIDING_BAR;
        }

        /**
         * Processes the sliding bar move based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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

        /**
         * Process the retangle select process.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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
            let color;
            if (CWSYSTEM.Environment.altKeyPressed) {
                color = new CWSYSTEM.CWColor(255, 75, 0, 30);
            } else {
                color = new CWSYSTEM.CWColor(75, 255, 0, 30);
            }
            vs.CWDrawFilledRectangle(this.window.window, xAnchor, yAnchor, xWidth - xAnchor, yWidth - yAnchor, color);
            this.window.renderingRequired = true;
        }

        /**
         * Releases the rectangle select operation and performs any necessary cleanup.
         *
         * @param {number} offsetX - The x-coordinate offset of the mouse release.
         * @param {number} offsetY - The y-coordinate offset of the mouse release.
         * @private
         */
        releaseRectangleSelect(offsetX, offsetY) {
            this.window.drawWindow();
            this.window.renderingRequired = true;
        }

        /**
         * Engages the window resize mode for the specified window, corner, and mouse coordinates.
         *
         * @param {number} windowResized - The index of the window being resized.
         * @param {number} windowCornerBeingDragged - The corner of the window being resized.
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         */
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

        /**
         * Engages the window move mode for the specified window and mouse coordinates.
         *
         * @param {number} windowDragged - The index of the window being moved.
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         */
        engageWindowMove(windowDragged, x, y) {
            this.mode = CWSYSTEM.MouseDrag.WINDOW_MOVE;//1;
            this.windowDragged = windowDragged;
            this.mouseDraggedStartPosition.setPosition(x, y);
            this.windowDraggedStartPosition.setPosition(dsector.DSReference.gui.getWindow$int(windowDragged).xPosition, dsector.DSReference.gui.getWindow$int(windowDragged).yPosition);
        }

        /**
         * Processes the window resize based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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

        /**
         * Processes the window resize based on the provided mouse coordinates.
         *
         * @param {number} x - The x-coordinate of the mouse.
         * @param {number} y - The y-coordinate of the mouse.
         * @private
         */
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

                if (window1.hasScrollbar()) {
                    window1.scrollbar.updateSliderSize();
                }
            }
        }
    }

    /** No dragging operation is currently active */
    MouseDrag.NOTHING_BEING_DRAGGED = 0;
    /** Dragging to move a window */
    MouseDrag.WINDOW_MOVE = 1;
    /** Dragging to resize a window */
    MouseDrag.WINDOW_RESIZE = 2;
    /** Dragging a vertex in the XY plane */
    MouseDrag.PAD_VERTEX_XY = 3;
    /** Dragging a vertex in the XZ plane */
    MouseDrag.PAD_VERTEX_XZ = 4;
    /** Dragging a vertex in the YZ plane */
    MouseDrag.PAD_VERTEX_YZ = 5;
    /** Dragging a transposed representation in the XY plane */
    MouseDrag.PAD_TRANSPOSED_REPR_XY = 6;
    /** Dragging a transposed representation in the XZ plane */
    MouseDrag.PAD_TRANSPOSED_REPR_XZ = 7;
    /** Dragging a transposed representation in the YZ plane */
    MouseDrag.PAD_TRANSPOSED_REPR_YZ = 8;
    /** Drawing a rectangle for selection */
    MouseDrag.DRAW_RECTANGLE_SELECT = 9;
    /** Adjusting the red component in a color picker */
    MouseDrag.RED_PAD = 10;
    /** Adjusting the green component in a color picker */
    MouseDrag.GREEN_PAD = 11;
    /** Adjusting the blue component in a color picker */
    MouseDrag.BLUE_PAD = 12;
    /** Adjusting the alpha (transparency) component in a color picker */
    MouseDrag.ALPHA_PAD = 13;
    /** Adjusting reflection properties */
    MouseDrag.REFLECTION_PAD = 14;
    /** Adjusting reflected shininess properties */
    MouseDrag.REFLECTED_SHININESS_PAD = 15;
    /** Adjusting dispersed shininess properties */
    MouseDrag.DISPERSED_SHININESS_PAD = 16;
    /** Moving a guideline */
    MouseDrag.GUIDELINE_MOVE = 17;
    /** Moving a locator */
    MouseDrag.LOCATOR_MOVE = 18;
    /** Rotating in the XY plane */
    MouseDrag.XY_ROTATION = 19;
    /** Rotating in the XZ plane */
    MouseDrag.XZ_ROTATION = 20;
    /** Rotating in the YZ plane */
    MouseDrag.YZ_ROTATION = 21;
    /** Adjusting offset in the XY plane */
    MouseDrag.XY_OFFSET_PAD = 22;
    /** Adjusting offset in the XZ plane */
    MouseDrag.XZ_OFFSET_PAD = 23;
    /** Adjusting offset in the YZ plane */
    MouseDrag.YZ_OFFSET_PAD = 24;
    /** Rotating the camera */
    MouseDrag.CAMERA_ROTATION = 25;
    /** Adjusting the camera direction */
    MouseDrag.CAMERA_DIRECTION = 26;
    /** Moving the camera position */
    MouseDrag.CAMERA_POSITION = 27;
    /** Dragging a sliding bar */
    MouseDrag.SLIDING_BAR = 28;
    CWSYSTEM.MouseDrag = MouseDrag;
    MouseDrag["__class"] = "CWSYSTEM.MouseDrag";
})(CWSYSTEM);