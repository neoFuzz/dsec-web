var CWSYSTEM;
(function (CWSYSTEM) {
    class VirtualScreen {
        constructor() {
            this.background = null;
            this.subFrame = null;
            this.actualScreen = null;
            this.subFrames = CWSYSTEM.Global.subFrames;
            this.leftScanLine = Array(5000).fill(0);
            this.rightScanLine = Array(5000).fill(0);
            this.subFrameCount = 0;
            this.defaultColor = 0;
            this.drawCompleteBackground = false;
            this.subFrameRefresh = false;
            this.serif8_font = new CWSYSTEM.CWFont("assets/fonts/serif8.jcf");
            this.serif11_font = new CWSYSTEM.CWFont("assets/fonts/serif11.jcf");
            this.jcsmallfixed_font = new CWSYSTEM.CWFont("assets/fonts/jcsmallfixed.jcf");
            this.physicalWidth = CWSYSTEM.Global.screenResolutionX_$LI$();
            this.physicalHeight = CWSYSTEM.Global.screenResolutionY_$LI$();
            this.topInset = 0;
            this.backgroundImage = "assets/images/background.jpg";
            this.backgroundFadeInProgress = false;
            this.fadeStartTime = 0;
            this.fadeEndTime = 0;
            this.virtualScreenInUse = false;
            this.cancelOption = false;
            this.pleaseWaitMessageFlashState = 3;
            this.__renderPleaseWaitMessage = false;

            CWSYSTEM.Debug.println("Initializing largeScreen");
            this.subFrame = Array(this.subFrames).fill(null).map((_, i) => {
                CWSYSTEM.Debug.println("Initializing actualScreenSubframe number " + i);
                return new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Subframe " + i);
            });

            CWSYSTEM.Debug.println("Initializing actualScreen and background");
            this.actualScreen = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Actual screen");
            this.background = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Background buffer");

            CWSYSTEM.Debug.println("Initializing polygon scan lines");

            CWSYSTEM.Debug.println("Utility initializing");
            CWSYSTEM.CWUtils.initialize();
            CWSYSTEM.FastColorUtilities.initializeGammaCorrectionLookupTable();

            this.resetVirtualScreen();
        }


        dereferenceLargeObjects() {
            this.subFrame = null;
            this.actualScreen = null;
            this.background = null;
        }

        initializeLargeObjects() {
            this.subFrame = Array(this.subFrames).fill(null).map((_, i) =>
                new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Subframe " + i));
            this.actualScreen = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Actual screen");
            this.background = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Background buffer");
            this.resetVirtualScreen();
        }

        setBackgroundImage(backgroundImage) {
            this.backgroundImage = backgroundImage;
            this.resetVirtualScreen();
        }

        resetVirtualScreen() {
            this.drawCompleteBackground = true;
            this.subFrameRefresh = true;
            let b = false;

            let canvas = document.getElementById("3dSpace");
            //let canvas = document.createElement('canvas', {willReadFrequently: true});
            if (canvas === null) {
                canvas = document.createElement('canvas');
                canvas.id = "3dSpace";
                document.body.appendChild(canvas);
                canvas.height = 600;
                canvas.width = 800;
            }
            canvas.width = CWSYSTEM.Global.screenResolutionX_$LI$();
            canvas.height = CWSYSTEM.Global.screenResolutionY_$LI$();
            let context = canvas.getContext('2d', {willReadFrequently: true, willWriteFrequently: true});
            let bufferedImage;
            let image = preImages.get(this.backgroundImage); // preloaded images
            image.height = canvas.height;
            image.width = canvas.width;

            try {
                context.drawImage(image, 0, 0);//image.height*/);
                bufferedImage = context.getImageData(0, 0, canvas.width, canvas.height);
            } catch (ex) {
                b = true;
                CWSYSTEM.Debug.error("General IO exception while reading image: " + this.backgroundImage);
            }
            const height = this.background.height;
            const width = this.background.width;
            if (b) {
                for (let y = 0; y < height; ++y) {
                    for (let x = 0; x < width; ++x) {
                        this.background.point[y][x] = CWSYSTEM.Global.environmentBackgroundColor_$LI$();
                    }
                }
            } else {
                const data = bufferedImage.data;
                const height2 = bufferedImage.height;
                const width2 = bufferedImage.width;
                let imageData = ([]);
                for (let i = 0; i < data.length; i += 4) {
                    //let r = data[i + 0];let g = data[i + 1];let b = data[i + 2];let a = data[i + 3];
                    //let pointColor = new CWSYSTEM.CWColor(r,g,b,a).color;
                    imageData.push(CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        data[i], data[i + 1], data[i + 2], data[i + 3]));
                }

                for (let v = 0; v < height; ++v) {
                    for (let u = 0; u < width; ++u) {
                        this.background.point[v][u] = imageData[v % height2 * width2 + u % width2];
                    }
                }
            }
        }

        fadeInBackgroundFromBlack(n) {
            this.fadeStartTime = CWSYSTEM.Environment.currentTime();
            this.fadeEndTime = this.fadeStartTime + n;
            this.backgroundFadeInProgress = true;
        }

        changeSubframes() {
            this.subFrames = CWSYSTEM.Global.subFrames;
            this.subFrame = Array.from({ length: this.subFrames }, () => null);
            for (let i = 0; i < this.subFrames; ++i) {
                CWSYSTEM.Debug.println("Initializing actualScreenSubframe number" + i);
                this.subFrame[i] = new CWSYSTEM.ScreenData(CWSYSTEM.Global.screenResolutionX_$LI$(),
                    CWSYSTEM.Global.screenResolutionY_$LI$(), "Subframe " + i);
            }
            CWSYSTEM.Debug.println("Initializing actualScreen and background (already initialized)");
            CWSYSTEM.Debug.println("Initializing polygon scan lines (already initialized)");
            this.drawCompleteBackground = true;
            this.subFrameRefresh = true;
            this.subFrameCount = 0;
        }

        update() {
            if (this.backgroundFadeInProgress || CWSYSTEM.Environment.screenHasChanged ||
                CWSYSTEM.Environment.furtherRendering > 0) {
                if (this.virtualScreenInUse) {
                    return;
                }
                if (!CWSYSTEM.Global.graphicsInitialized) {
                    return;
                }
                if (CWSYSTEM.Environment.furtherRendering > 0) {
                    --CWSYSTEM.Environment.furtherRendering;
                }
                this.virtualScreenInUse = true;
                this.createSubFrame(dsector.DSReference.gui);
                this.createActualScreen();
                if (this.subFrameCount === 0) {
                    this.updatePhysicalScreen(dsector.DSReference.dsMain.bi);
                }
                if (dsector.DSReference.virtualScreen.subFrameCount === 0) {
                    this.repaint();
                }
                this.virtualScreenInUse = false;
                CWSYSTEM.Environment.screenHasChanged = false;
            }
        }

        repaint() {
            let canvas = document.getElementById("3dSpace");
            let ctx = canvas.getContext("2d");
            ctx.putImageData(dsector.DSReference.dsMain.bi, 0, 0);
        }

        paint(graphics) {
            let canvas = document.getElementById("3dSpace");
            let ctx = canvas.getContext("2d");
            if (CWSYSTEM.Global.graphicsInitialized) {
                ctx.putImageData(graphics, 0, 0);
            }
        }

        repeatedUpdateThroughSubframes() {
            if (this.virtualScreenInUse) {
                return;
            }
            this.virtualScreenInUse = true;
            do {
                {
                    this.createSubFrame(dsector.DSReference.gui);
                    this.createActualScreen();
                }
            } while ((this.subFrameCount !== 0));
            this.updatePhysicalScreen(dsector.DSReference.dsMain.bi);
            this.virtualScreenInUse = false;
        }

        /** @private */
        createSubFrame(collection) {
            const width = this.actualScreen.width;
            const height = this.actualScreen.height;
            const screenData = this.subFrame[this.subFrameCount];
            if (this.subFrames > 0 && !this.subFrameRefresh && !this.backgroundFadeInProgress) {
                for (let i = 0; i < height; ++i) {
                    CWSYSTEM.CWUtils.copyArray(
                        this.subFrame[(this.subFrameCount + this.subFrames - 1) % this.subFrames].point[i],
                        0, this.subFrame[this.subFrameCount].point[i], 0, width);
                }
            }
            CWSYSTEM.CWUtils.resetMultiSegmentScanLine();
            if (this.subFrameRefresh) {
                this.subFrameRefresh = false;
                for (let j = 0; j < height; ++j) {
                    CWSYSTEM.CWUtils.addSegmentToScanLine(j, 0, width);
                }
            } else {
                for (let k = 0; k < collection.numberOfWindows(); ++k) {
                    const window = collection.getWindow$int(k);
                    if (window.renderingRequired || this.backgroundFadeInProgress) {
                        window.renderingRequired = false;
                        const bottomEdge = window.h + 2 * window.borderWidth + window.__titleHeight;
                        const leftEdge = window.xPosition - window.borderWidth;
                        const rightEdge = window.xPosition + window.w + window.borderWidth;
                        const topEdge = window.yPosition - window.borderWidth - window.__titleHeight;
                        for (let l = 0; l < bottomEdge; ++l) {
                            CWSYSTEM.CWUtils.addSegmentToScanLine(l + topEdge, leftEdge, rightEdge);
                        }
                        if (window.oldH !== window.h || window.oldW !== window.w || window.oldX !== window.xPosition ||
                            window.oldY !== window.yPosition || window.toBeDestroyed) {
                            const oldBottomEdge = window.oldH + 2 * window.borderWidth + window.__titleHeight;
                            const oldLeftEdge = window.oldX - window.borderWidth;
                            const oldRightEdge = window.oldX + window.oldW + window.borderWidth;
                            const oldTopEdge = window.oldY - window.borderWidth - window.__titleHeight;
                            for (let i = 0; i < oldBottomEdge; ++i) {
                                CWSYSTEM.CWUtils.addSegmentToScanLine(i + oldTopEdge, oldLeftEdge, oldRightEdge);
                            }
                            window.oldH = window.h;
                            window.oldW = window.w;
                            window.oldX = window.xPosition;
                            window.oldY = window.yPosition;
                        }
                    }
                }
            }
            this.backgroundFadeInProgress = false;
            if (CWSYSTEM.Environment.currentTime() > this.fadeStartTime &&
                CWSYSTEM.Environment.currentTime() < this.fadeEndTime) {
                this.backgroundFadeInProgress = true;
                this.subFrameRefresh = true;
                const fadeTime = Math.fround(Math.pow(
                    (CWSYSTEM.Environment.currentTime() - this.fadeStartTime) /
                    (this.fadeEndTime - this.fadeStartTime), 1.5));
                for (let i = 0; i < height; ++i) {
                    for (let x12 = 0; x12 < width; ++x12) {
                        const eColor = this.background.point[i][x12];
                        screenData.point[i][x12] = CWSYSTEM.FastColorUtilities.color$r$g$b$a((
                                Math.fround(CWSYSTEM.FastColorUtilities.red(eColor) * fadeTime) | 0),
                            (Math.fround(CWSYSTEM.FastColorUtilities.green(eColor) * fadeTime) | 0),
                            (Math.fround(CWSYSTEM.FastColorUtilities.blue(eColor) * fadeTime) | 0), 255);
                    }
                }
            } else if (this.drawCompleteBackground) {
                this.drawCompleteBackground = false;
                for (let y14 = 0; y14 < height; ++y14) {
                    CWSYSTEM.CWUtils.copyArray(this.background.point[y14], 0, screenData.point[y14], 0, width);
                }
            } else {
                for (let y15 = 0; y15 < height; ++y15) {
                    for (let x16 = 0; x16 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y15]; x16 += 2) {
                        const offset1 = CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y15][x16];
                        CWSYSTEM.CWUtils.copyArray(this.background.point[y15], offset1, screenData.point[y15], offset1,
                            CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y15][x16 + 1] - offset1);
                    }
                }
            }
            for (let j = 0; j < collection.depthSortedSequence.size(); ++j) {
                const currWindow = collection.getWindow$int(collection.depthSortedSequence.get(j));
                if (currWindow.windowVisible) {
                    if (!currWindow.toBeDestroyed) {
                        const borderWidth = currWindow.borderWidth;
                        const titleHeight = currWindow.__titleHeight;
                        const xPosition = currWindow.xPosition;
                        const yPosition = currWindow.yPosition;
                        const h = currWindow.h;
                        const subframes = currWindow.subframes;
                        if (currWindow.useAntiAliasedContent) {
                            let xPosition2 = currWindow.xPosition;
                            let yPosition2 = currWindow.yPosition;
                            const xPosition3 = currWindow.xPosition;
                            const windowXEnd = currWindow.xPosition + currWindow.w;
                            const antiAliasedLevel = currWindow.antiAliasedLevel;
                            const preAntiAliasedContent = currWindow.preAntiAliasedContent;
                            if (subframes >= 2) {
                                const screenData2 = currWindow.temporalSupersample[currWindow.subFrame];
                                const screenData3 =
                                    currWindow.temporalSupersample[(currWindow.subFrame - 1 + subframes) % subframes];
                                for (let k = 0; k < currWindow.h; ++k) {
                                    CWSYSTEM.CWUtils.copyArray(screenData3.point[k], 0,
                                        screenData2.point[k], 0, currWindow.w);
                                }
                                for (let y21 = yPosition2; y21 < yPosition2 + h; ++y21) {
                                    for (let x22 = 0; x22 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y21]; x22 += 2) {
                                        const max = Math.max(
                                            CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y21][x22], xPosition3);
                                        const min = Math.min(
                                            CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y21][x22 + 1], windowXEnd);
                                        switch (antiAliasedLevel) {
                                            case 1: {
                                                const yPos02 = y21 - yPosition2;
                                                for (let x24 = max; x24 < min; ++x24) {
                                                    const x25 = x24 - xPosition2;
                                                    const pointColor = preAntiAliasedContent.point[yPos02][x25];
                                                    screenData2.point[yPos02][x25] =
                                                        CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                                            CWSYSTEM.FastColorUtilities.red(pointColor),
                                                            CWSYSTEM.FastColorUtilities.green(pointColor),
                                                            CWSYSTEM.FastColorUtilities.blue(pointColor),
                                                            CWSYSTEM.FastColorUtilities.alpha(pointColor));
                                                }
                                                break;
                                            }
                                            case 2: {
                                                const y27 = y21 - yPosition2;
                                                for (let i = max; i < min; ++i) {
                                                    const xPos02 = i - xPosition2;
                                                    const pc1 = preAntiAliasedContent.point[y27 * 2][xPos02 * 2];
                                                    const pc2 = preAntiAliasedContent.point[y27 * 2][xPos02 * 2 + 1];
                                                    const pc3 = preAntiAliasedContent.point[y27 * 2 + 1][xPos02 * 2];
                                                    const pc4 = preAntiAliasedContent.point[y27 * 2 + 1][xPos02 * 2 + 1];
                                                    screenData2.point[y27][xPos02] =
                                                        CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                                            ((CWSYSTEM.FastColorUtilities.red(pc1) +
                                                                CWSYSTEM.FastColorUtilities.red(pc2) +
                                                                CWSYSTEM.FastColorUtilities.red(pc3) +
                                                                CWSYSTEM.FastColorUtilities.red(pc4)) / 4 | 0),
                                                            ((CWSYSTEM.FastColorUtilities.green(pc1) +
                                                                CWSYSTEM.FastColorUtilities.green(pc2) +
                                                                CWSYSTEM.FastColorUtilities.green(pc3) +
                                                                CWSYSTEM.FastColorUtilities.green(pc4)) / 4 | 0),
                                                            ((CWSYSTEM.FastColorUtilities.blue(pc1) +
                                                                CWSYSTEM.FastColorUtilities.blue(pc2) +
                                                                CWSYSTEM.FastColorUtilities.blue(pc3) +
                                                                CWSYSTEM.FastColorUtilities.blue(pc4)) / 4 | 0),
                                                            ((CWSYSTEM.FastColorUtilities.alpha(pc1) +
                                                                CWSYSTEM.FastColorUtilities.alpha(pc2) +
                                                                CWSYSTEM.FastColorUtilities.alpha(pc3) +
                                                                CWSYSTEM.FastColorUtilities.alpha(pc4)) / 4 | 0));
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                const temporalSupersample = currWindow.temporalSupersample;
                                if (currWindow.subFrame === currWindow.temporalSupersample.length - 1) {
                                    const h2 = currWindow.h;
                                    const xPosition4 = currWindow.xPosition;
                                    const yPosition3 = currWindow.yPosition;
                                    const xPosition5 = currWindow.xPosition;
                                    const b = currWindow.xPosition + currWindow.w;
                                    const rememberedPostTimeSupersampledScreenData =
                                        currWindow.rememberedPostTimeSupersampledScreenData;
                                    for (let yPos3 = yPosition3; yPos3 < yPosition3 + h2; ++yPos3) {
                                        for (let xPos3 = 0; xPos3 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[yPos3]; xPos3 += 2) {
                                            const max2 = Math.max(
                                                CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[yPos3][xPos3], xPosition5);
                                            const min2 = Math.min(
                                                CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[yPos3][xPos3 + 1], b);
                                            const y36 = yPos3 - yPosition3;
                                            for (let xa = max2; xa < min2; ++xa) {
                                                const x38 = xa - xPosition4;
                                                let red1 = 0;
                                                let blue1 = 0;
                                                let green1 = 0;
                                                let alpha1 = 0;
                                                for (let i = 0; i < subframes; ++i) {
                                                    red1 += CWSYSTEM.FastColorUtilities.red(
                                                        temporalSupersample[i].point[y36][x38]);
                                                    green1 += CWSYSTEM.FastColorUtilities.green(
                                                        temporalSupersample[i].point[y36][x38]);
                                                    blue1 += CWSYSTEM.FastColorUtilities.blue(
                                                        temporalSupersample[i].point[y36][x38]);
                                                    alpha1 += CWSYSTEM.FastColorUtilities.alpha(
                                                        temporalSupersample[i].point[y36][x38]);
                                                }
                                                rememberedPostTimeSupersampledScreenData.point[y36][x38] =
                                                    CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                                        (red1 / subframes | 0),
                                                        (green1 / subframes | 0),
                                                        (blue1 / subframes | 0),
                                                        (alpha1 / subframes | 0));
                                            }
                                        }
                                    }
                                } else {
                                    CWSYSTEM.Environment.screenHasChanged = true;
                                }
                                currWindow.subFrame = (currWindow.subFrame + 1) % currWindow.temporalSupersample.length;
                                const rememberedPostTimeSupersampledScreenData2 =
                                    currWindow.rememberedPostTimeSupersampledScreenData;
                                const h3 = currWindow.h;
                                xPosition2 = xPosition;
                                yPosition2 = yPosition;
                                const b2 = xPosition;
                                const b3 = xPosition + currWindow.w;
                                for (let y44 = yPosition2; y44 < yPosition2 + h3; ++y44) {
                                    for (let n45 = 0; n45 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y44]; n45 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparency(
                                            rememberedPostTimeSupersampledScreenData2, y44,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y44][n45], b2),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y44][n45 + 1], b3),
                                            xPosition2, yPosition2);
                                    }
                                }
                            } else {
                                const preAntiAliasedContent2 = currWindow.preAntiAliasedContent;
                                for (let y46 = yPosition2; y46 < yPosition2 + h; ++y46) {
                                    if (yPosition2 + h <= screenData.point.length) {
                                        for (let n47 = 0; n47 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y46]; n47 += 2) {
                                            const max3 = Math.max(
                                                CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y46][n47], xPosition3);
                                            const min3 = Math.min(
                                                CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y46][n47 + 1], windowXEnd);
                                            switch ((antiAliasedLevel)) {
                                                case 1: {
                                                    const y48 = y46 - yPosition2;
                                                    for (let x49 = max3; x49 < min3; ++x49) {
                                                        const x50 = x49 - xPosition2;
                                                        const alpha = CWSYSTEM.FastColorUtilities.alpha(preAntiAliasedContent2.point[y48][x50]);
                                                        const minAlpha = 255 - alpha;
                                                        screenData.point[y46][x49] =
                                                            CWSYSTEM.FastColorUtilities.color$r$g$b(
                                                                ((alpha * CWSYSTEM.FastColorUtilities.red(
                                                                        preAntiAliasedContent2.point[y48][x50]) + minAlpha *
                                                                    CWSYSTEM.FastColorUtilities.red(
                                                                        screenData.point[y46][x49])) / 256 | 0),
                                                                ((alpha * CWSYSTEM.FastColorUtilities.green(
                                                                        preAntiAliasedContent2.point[y48][x50]) + minAlpha *
                                                                    CWSYSTEM.FastColorUtilities.green(
                                                                        screenData.point[y46][x49])) / 256 | 0),
                                                                ((alpha * CWSYSTEM.FastColorUtilities.blue(
                                                                        preAntiAliasedContent2.point[y48][x50]) + minAlpha *
                                                                    CWSYSTEM.FastColorUtilities.blue(
                                                                        screenData.point[y46][x49])) / 256 | 0));
                                                    }
                                                    break;
                                                }
                                                case 2: {
                                                    const y52 = (y46 - yPosition2) * 2;
                                                    try {
                                                        for (let x53 = max3; x53 < min3; ++x53) {
                                                            const x54 = (x53 - xPosition2) * 2;
                                                            const color1 = preAntiAliasedContent2.point[y52][x54];
                                                            const color2 = preAntiAliasedContent2.point[y52][x54 + 1];
                                                            const color3 = preAntiAliasedContent2.point[y52 + 1][x54];
                                                            const color4 = preAntiAliasedContent2.point[y52 + 1][x54 + 1];
                                                            const rColor = ((CWSYSTEM.FastColorUtilities.alpha(color1) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color2) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color3) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color4)) / 4 | 0);
                                                            const n60 = 255 - rColor;
                                                            screenData.point[y46][x53] =
                                                                CWSYSTEM.FastColorUtilities.colorWithGammaAdjustment(
                                                                    (((rColor * (CWSYSTEM.FastColorUtilities.red(color1) +
                                                                            CWSYSTEM.FastColorUtilities.red(color2) +
                                                                            CWSYSTEM.FastColorUtilities.red(color3) +
                                                                            CWSYSTEM.FastColorUtilities.red(color4)) / 4 +
                                                                        n60 * CWSYSTEM.FastColorUtilities.red(
                                                                            screenData.point[y46][x53])) / 256) | 0),
                                                                    (((rColor * (CWSYSTEM.FastColorUtilities.green(color1) +
                                                                            CWSYSTEM.FastColorUtilities.green(color2) +
                                                                            CWSYSTEM.FastColorUtilities.green(color3) +
                                                                            CWSYSTEM.FastColorUtilities.green(color4)) / 4 +
                                                                        n60 * CWSYSTEM.FastColorUtilities.green(
                                                                            screenData.point[y46][x53])) / 256) | 0),
                                                                    (((rColor * (CWSYSTEM.FastColorUtilities.blue(color1) +
                                                                            CWSYSTEM.FastColorUtilities.blue(color2) +
                                                                            CWSYSTEM.FastColorUtilities.blue(color3) +
                                                                            CWSYSTEM.FastColorUtilities.blue(color4)) / 4 +
                                                                        n60 * CWSYSTEM.FastColorUtilities.blue(
                                                                            screenData.point[y46][x53])) / 256) | 0));
                                                        }
                                                    } catch (ex) {
                                                        console.error("Window " + currWindow.nameID +
                                                            " raised out of bounds error AT34E");
                                                    }
                                                    break;
                                                }
                                                case 3: {
                                                    const y61 = (y46 - yPosition2) * 3;
                                                    for (let x62 = max3; x62 < min3; ++x62) {
                                                        const x63 = (x62 - xPosition2) * 3;
                                                        const color1 = preAntiAliasedContent2.point[y61][x63];
                                                        const color2 = preAntiAliasedContent2.point[y61][x63 + 1];
                                                        const color3 = preAntiAliasedContent2.point[y61][x63 + 2];
                                                        const color4 = preAntiAliasedContent2.point[y61 + 1][x63];
                                                        const color5 = preAntiAliasedContent2.point[y61 + 1][x63 + 1];
                                                        const color6 = preAntiAliasedContent2.point[y61 + 1][x63 + 2];
                                                        const color7 = preAntiAliasedContent2.point[y61 + 2][x63];
                                                        const color8 = preAntiAliasedContent2.point[y61 + 2][x63 + 1];
                                                        const color9 = preAntiAliasedContent2.point[y61 + 2][x63 + 2];
                                                        const cColor =
                                                            ((CWSYSTEM.FastColorUtilities.alpha(color1) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color2) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color3) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color4) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color5) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color6) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color7) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color8) +
                                                                CWSYSTEM.FastColorUtilities.alpha(color9)) / 9 | 0);
                                                        const newColor = 255 - cColor;
                                                        screenData.point[y46][x62] =
                                                            CWSYSTEM.FastColorUtilities.color$r$g$b(
                                                                (((cColor * (CWSYSTEM.FastColorUtilities.red(color1) +
                                                                        CWSYSTEM.FastColorUtilities.red(color2) +
                                                                        CWSYSTEM.FastColorUtilities.red(color3) +
                                                                        CWSYSTEM.FastColorUtilities.red(color4) +
                                                                        CWSYSTEM.FastColorUtilities.red(color5) +
                                                                        CWSYSTEM.FastColorUtilities.red(color6) +
                                                                        CWSYSTEM.FastColorUtilities.red(color7) +
                                                                        CWSYSTEM.FastColorUtilities.red(color8) +
                                                                        CWSYSTEM.FastColorUtilities.red(color9)) / 9 | 0) +
                                                                    newColor * CWSYSTEM.FastColorUtilities.red(
                                                                        screenData.point[y46][x62])) / 256 | 0),
                                                                (((cColor * (CWSYSTEM.FastColorUtilities.green(color1) +
                                                                        CWSYSTEM.FastColorUtilities.green(color2) +
                                                                        CWSYSTEM.FastColorUtilities.green(color3) +
                                                                        CWSYSTEM.FastColorUtilities.green(color4) +
                                                                        CWSYSTEM.FastColorUtilities.green(color5) +
                                                                        CWSYSTEM.FastColorUtilities.green(color6) +
                                                                        CWSYSTEM.FastColorUtilities.green(color7) +
                                                                        CWSYSTEM.FastColorUtilities.green(color8) +
                                                                        CWSYSTEM.FastColorUtilities.green(color9)) / 9 | 0) +
                                                                    newColor * CWSYSTEM.FastColorUtilities.green(
                                                                        screenData.point[y46][x62])) / 256 | 0),
                                                                (((cColor * (CWSYSTEM.FastColorUtilities.blue(color1) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color2) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color3) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color4) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color5) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color6) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color7) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color8) +
                                                                        CWSYSTEM.FastColorUtilities.blue(color9)) / 9 | 0) +
                                                                    newColor * CWSYSTEM.FastColorUtilities.blue(
                                                                        screenData.point[y46][x62])) / 256 | 0));
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            currWindow.applySpecialEffects(screenData.point, xPosition2, yPosition2);
                            const window4 = currWindow.window;
                            const leftEdgeX = xPosition - borderWidth;
                            const upperEdge = yPosition - borderWidth - titleHeight;
                            const five = 5;
                            const xp = xPosition;
                            const winREdge = xPosition + currWindow.w;
                            for (let y80 = upperEdge; y80 < upperEdge + borderWidth + titleHeight + five; ++y80) {
                                for (let x81 = 0; x81 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y80]; x81 += 2) {
                                    this.copyHorizontalLineToSubframeWithAlphaTransparency(window4, y80,
                                        Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y80][x81], xp),
                                        Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y80][x81 + 1], winREdge),
                                        leftEdgeX, upperEdge);
                                }
                            }
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let y82 = yPosition + currWindow.h; y82 < yPosition + currWindow.h + borderWidth; ++y82) {
                                    for (let x83 = 0; x83 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y82]; x83 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparency(
                                            window4, y82, Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y82][x83], xp),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y82][x83 + 1], winREdge), leftEdgeX, upperEdge);
                                    }
                                }
                            }
                            const b4 = xPosition - currWindow.borderWidth;
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let y84 = upperEdge; y84 < yPosition + currWindow.h + borderWidth; ++y84) {
                                    for (let x85 = 0; x85 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y84]; x85 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparency(
                                            window4, y84, Math.max(
                                                CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y84][x85], b4),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y84][x85 + 1],
                                                xPosition), leftEdgeX, upperEdge);
                                    }
                                }
                            }
                            const b6 = currWindow.xPosition + currWindow.w;
                            const b7 = currWindow.xPosition + currWindow.w + currWindow.borderWidth;
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let y86 = upperEdge; y86 < yPosition + currWindow.h + borderWidth; ++y86) {
                                    for (let x87 = 0; x87 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y86]; x87 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparency(window4, y86,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y86][x87], b6),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y86][x87 + 1],
                                                b7), leftEdgeX, upperEdge);
                                    }
                                }
                            }
                        }
                        if (currWindow.hasInterfaceElements) {
                            const window5 = currWindow.window;
                            const maxH = currWindow.h + 2 * borderWidth + titleHeight;
                            const leftEdge = xPosition - borderWidth;
                            const topEdge = yPosition - borderWidth - titleHeight;
                            const b8 = xPosition - borderWidth;
                            const b9 = xPosition + currWindow.w + borderWidth;
                            try {
                                for (let y91 = topEdge; y91 < topEdge + maxH; ++y91) {
                                    for (let x92 = 0; x92 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[y91]; x92 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparency(window5, y91,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y91][x92], b8),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[y91][x92 + 1], b9),
                                            leftEdge, topEdge);
                                    }
                                }
                            } catch (ex2) {
                                console.error(ex2.message, ex2);
                            }
                        }
                    }
                }
            }
            dsector.DSReference.gui.destroyTerminallyIllWindows();
        }

        /** Copies a horizontal line from `screenData` to a subframe with alpha transparency.
         * @private
         * @param {ScreenData} screenData - The screen data object containing the source line.
         * @param {number} startY - The Y-coordinate of the target line in the subframe.
         * @param {number} x - The starting X-coordinate of the source line in `screenData`.
         * @param {number} right - The ending X-coordinate (exclusive) of the source line in `screenData`.
         * @param {number} left - The starting X-coordinate of the subframe in which the line will be copied.
         * @param {number} top - The starting Y-coordinate of the subframe in which the line will be copied.
         */
        copyHorizontalLineToSubframeWithAlphaTransparency(screenData, startY, x,
                                                          right, left, top) {
            const screenData2 = this.subFrame[this.subFrameCount];
            try {
                for (let i = x; i < right; ++i) {
                    const x6 = i - left;
                    const y7 = startY - top;
                    const alpha = CWSYSTEM.FastColorUtilities.alpha(screenData.point[y7][x6]);
                    const alphaCalc = 255 - alpha;
                    screenData2.point[startY][i] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                        ((alpha * CWSYSTEM.FastColorUtilities.red(screenData.point[y7][x6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.red(screenData2.point[startY][i])) / 256 | 0),
                        ((alpha * CWSYSTEM.FastColorUtilities.green(screenData.point[y7][x6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.green(screenData2.point[startY][i])) / 256 | 0),
                        ((alpha * CWSYSTEM.FastColorUtilities.blue(screenData.point[y7][x6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.blue(screenData2.point[startY][i])) / 256 | 0));
                }
            } catch (ex) {
                console.error(ex.message, ex);
            }
        }

        /** @private */
        createActualScreen() {
            ++this.subFrameCount;
            if (this.subFrameCount !== this.subFrames) {
                return false;
            }
            this.subFrameCount = 0;
            const width = this.actualScreen.width;
            const height = this.actualScreen.height;
            switch ((this.subFrames)) {
                case 1: {
                    for (let i = 0; i < height; ++i) {
                        CWSYSTEM.CWUtils.copyArray(this.subFrame[0].point[i],
                            0, this.actualScreen.point[i], 0, width);
                    }
                    break;
                }
                case 2: {
                    for (let j = 0; j < height; ++j) {
                        for (let k = 0; k < width; ++k) {
                            this.actualScreen.point[j][k] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[j][k]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[j][k])) / 2 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[j][k]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[j][k])) / 2 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[j][k]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[j][k])) / 2 | 0)
                            );
                        }
                    }
                    break;
                }
                case 3: {
                    for (let l = 0; l < height; ++l) {
                        for (let n = 0; n < width; ++n) {
                            this.actualScreen.point[l][n] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[l][n])) / 3 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[l][n])) / 3 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[l][n]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[l][n])) / 3 | 0));
                        }
                    }
                    break;
                }
                case 4: {
                    for (let y2 = 0; y2 < height; ++y2) {
                        for (let x3 = 0; x3 < width; ++x3) {
                            this.actualScreen.point[y2][x3] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[y2][x3])) / 4 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[y2][x3])) / 4 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[y2][x3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[y2][x3])) / 4 | 0));
                        }
                    }
                    break;
                }
                case 5: {
                    for (let y4 = 0; y4 < height; ++y4) {
                        for (let x5 = 0; x5 < width; ++x5) {
                            this.actualScreen.point[y4][x5] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[4].point[y4][x5])) / 5 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[4].point[y4][x5])) / 5 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[y4][x5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[4].point[y4][x5])) / 5 | 0));
                        }
                    }
                    break;
                }
                case 6: {
                    for (let y6 = 0; y6 < height; ++y6) {
                        for (let x7 = 0; x7 < width; ++x7) {
                            this.actualScreen.point[y6][x7] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[4].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[5].point[y6][x7])) / 6 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[4].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[5].point[y6][x7])) / 6 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[4].point[y6][x7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[5].point[y6][x7])) / 6 | 0));
                        }
                    }
                    break;
                }
                default: {
                    for (let y8 = 0; y8 < height; ++y8) {
                        for (let x9 = 0; x9 < width; ++x9) {
                            let red = 0;
                            let green = 0;
                            let blue = 0;
                            for (let i = 0; i < this.subFrames; ++i) {
                                red += CWSYSTEM.FastColorUtilities.red(this.subFrame[i].point[y8][x9]);
                                green += CWSYSTEM.FastColorUtilities.green(this.subFrame[i].point[y8][x9]);
                                blue += CWSYSTEM.FastColorUtilities.blue(this.subFrame[i].point[y8][x9]);
                            }
                            this.actualScreen.point[y8][x9] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                (red / this.subFrames | 0), (green / this.subFrames | 0), (blue / this.subFrames | 0));
                        }
                    }
                    break;
                }
            }
            return true;
        }

        /** @private */
        updatePhysicalScreen(bufferedImage) {
            if (CWSYSTEM.Environment.screenHasChanged) {
                CWSYSTEM.Environment.furtherRendering = this.subFrames;
            }
            const data = bufferedImage.data; // RGBA format
            const width2 = bufferedImage.width;
            const height2 = bufferedImage.height;

            let imageData = ([]);
            for (let i = 0; i < data.length; i += 4) {
                imageData.push(CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                    data[i], data[i + 1], data[i + 2], data[i + 3]));
            }

            let n = 0;
            for (let i = 0; i < height2; ++i) {
                for (let j = 0; j < width2; ++j) {
                    imageData[n++] = this.actualScreen.point[i][j];
                }
            }
            dsMain.bi = CWSYSTEM.CWGraphics.convertScreenDataToBufferedImage(this.actualScreen);
            if (this.__renderPleaseWaitMessage) {
                this.renderPleaseWaitMessage();
            }
        }

        /** @private */
        renderPleaseWaitMessage() {
            let spinner = document.getElementById('loading-spinner');
            spinner.hidden = false;
            this.repaint();
        }

        displayWaitPleaseWaitMessage() {
            this.__renderPleaseWaitMessage = true;
            this.renderPleaseWaitMessage();
        }

        removeWaitPleaseWaitMessage() {
            this.__renderPleaseWaitMessage = false;
            let spinner = document.getElementById('loading-spinner');
            spinner.hidden = true;
            this.updatePhysicalScreen(dsector.DSReference.dsMain.bi);
        }

        drawString$n$s$n2$n3(x, s, pad, y) {
            CWSYSTEM.Environment.screenHasChanged = true;
            return this.drawText(null, x, s, pad, y, false, true);
        }

        drawString$sd$n$s$n2$n3$b(screenData, x, text, padX, y, b) {
            this.drawText(screenData, x, text, padX, y, b, false);
        }

        drawString(screenData, x, s, padX, y, b) {
            if ((screenData instanceof CWSYSTEM.ScreenData || screenData === null) &&
                ((typeof x === 'number') || x === null) && ((typeof s === 'string') || s === null) &&
                ((typeof padX === 'number') || padX === null) && ((typeof y === 'number') || y === null) &&
                ((typeof b === 'boolean') || b === null)) {
                return this.drawString$sd$n$s$n2$n3$b(screenData, x, s, padX, y, b);
            } else if (((typeof screenData === 'number') || screenData === null) &&
                ((typeof x === 'string') || x === null) && ((typeof s === 'number') || s === null) &&
                ((typeof padX === 'number') || padX === null) && y === undefined && b === undefined) {
                return this.drawString$n$s$n2$n3(screenData, x, s, padX);
            } else throw new Error('invalid overload');
        }

        /** @private */
        drawText(screenData, len, text, x, y, mode1, mode2) {
            const spacing = 35;
            //const array = Array(spacing).fill(null);
            const charArray = (text).split('');
            const length = text.length;
            let yy5 = 0;
            let xx6 = 0;
            let z7 = 0;
            let selector;
            if (mode1) {
                selector = 2;
            } else {
                selector = 1;
            }
            //const s2 = "";
            for (let i = 0; i < length; ++i) {
                let c = charArray[i];
                if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '^'.charCodeAt(0)) {
                    xx6 = 0;
                    ++yy5;
                } else {
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '\\'.charCodeAt(0) &&
                        i + 1 < length) {
                        switch ((charArray[i + 1]).charCodeAt(0)) {
                            case 117: /* 'u' */
                            {
                                c = '\u0001';
                                ++i;
                                break;
                            }
                            case 100: /* 'd' */
                            {
                                c = '\u0002';
                                ++i;
                                break;
                            }
                            case 108: /* 'l' */
                            {
                                c = '\u0003';
                                ++i;
                                break;
                            }
                            case 114: /* 'r' */
                            {
                                c = '\u0004';
                                ++i;
                                break;
                            }
                            case 95: /* '_' */
                            {
                                c = '_';
                                xx6 -= 6 + selector - 1;
                                z7 = 1;
                                ++i;
                                break;
                            }
                        }
                    }
                    let yyy9 = 0;
                    if (z7 !== 0) {
                        yyy9 = 2;
                        z7 = 0;
                    }
                    if (!mode2) {
                        const character = CWSYSTEM.CWFont_SmallFont.getCharacter(c);
                        for (let j = 0; j < spacing; ++j) {
                            if ((c => c.charCodeAt === null ? c :
                                c.charCodeAt(0))(character.charAt(j)) === '1'.charCodeAt(0)) {
                                for (let k = 0; k < selector; ++k) {
                                    this.CWDrawPixelWithCropping(screenData, x + j % 5 + xx6 + k,
                                        y - 7 + (j / 5) + yy5 * 10 + yyy9);
                                }
                            }
                        }
                    }
                    xx6 += 6 + selector - 1;
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === ' '.charCodeAt(0)) {
                        let l;
                        for (l = i + 1; l < length; ++l) {
                            c = charArray[l];
                            if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === ' '.charCodeAt(0)) {
                                break;
                            }
                        }
                        if (xx6 + 6 * (l - (i + 2)) > len) {
                            xx6 = 0;
                            ++yy5;
                        }
                    }
                    if (((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '.'.charCodeAt(0) ||
                        (c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '-'.charCodeAt(0)) && xx6 > len) {
                        xx6 = 0;
                        ++yy5;
                    }
                }
            }
            return yy5;
        }

        drawStringDoubleSize(screenData, s, n, n2) {
            CWSYSTEM.Environment.screenHasChanged = true;
            const n3 = 35;
            const charArray = (s.toUpperCase()).split('');
            const length = s.length;
            const n4 = 0;
            let n5 = 0;
            const n6 = 1;
            for (let i = 0; i < length; ++i) {
                const character = CWSYSTEM.CWFont_SmallFont.getCharacter(charArray[i]);
                for (let j = 0; j < n3; ++j) {
                    if ((c => c.charCodeAt === null ? c :
                        c.charCodeAt(0))(character.charAt(j)) === '1'.charCodeAt(0)) {
                        for (let k = 0; k < n6; ++k) {
                            this.CWDrawRectangleWithCropping(screenData, n + (j % 5 + n5 + k) * 2,
                                n2 + (7 + (j / 5 | 0) + n4 * 10) * 2, 2, 2);
                        }
                    }
                }
                n5 += 6 + n6 - 1;
            }
        }

        setColorVS$r$g$b$a(red, green, blue, alpha) {
            this.defaultColor = CWSYSTEM.FastColorUtilities.color$r$g$b$a(red, green, blue, alpha);
        }
        
        /** Sets the color using the provided {@link CWColor} object.
         * @param {CWColor} cwColor - The {@link CWColor} object containing the color to set.
         * @returns {void} - Returns nothing.
         */
        setColor$intCWColor(cwColor) {
            this.defaultColor = cwColor.color;
        }

        setColor$int(defaultColor) {
            this.defaultColor = defaultColor;
        }

        CWDrawPixel(screenData, x, y) {
            screenData.point[y][x] = this.defaultColor;
        }

        CWDrawPixelWithCropping(screenData, x, y) {
            if (x >= 0 && y >= 0 && x < screenData.width && y < screenData.height) {
                screenData.point[y][x] = this.defaultColor;
            }
        }

        /**
         * Draws a horizontal line of a specified length and color on the screen.
         * @param {object} screenData - The screen data object containing the point array.
         * @param {number} x - The starting x-coordinate of the line.
         * @param {number} y - The y-coordinate of the line.
         * @param {number} length - The length of the line.
         * @param {string} color - The color of the line.
         * @returns {void}
         */
        fastHorizontalLine(screenData, x, y, length, color) {
            try {
                CWSYSTEM.CWUtils.fillArray(screenData.point[y], x, x + length, color)
            } catch (ex) {
                CWSYSTEM.Debug.println("Rendering out of range in fastHorizontalLine(): x=" + x + ", y=" + y +
                    ", length=" + length + ", data.point.length=" + screenData.point.length);
            }
        }

        verticalLine(screenData, x, j, length, n) {
            try {
                CWSYSTEM.Environment.screenHasChanged = true;
                let y = j;
                for (const n2 = j + length; y < n2; ++y) {
                    screenData.point[y][x] = n;
                }
            } catch (ex) {
                CWSYSTEM.Debug.println("Rendering out of range in verticalLine(): x=" + x + ", y=" + j +
                    ", length=" + length + ", datapoint.length=" + screenData.point.length);
            }
        }

        CWDrawFilledRectangle(screenData, width, height, x, y, color) {
            CWSYSTEM.Environment.screenHasChanged = true;
            if (width > screenData.width - 1) {
                width = screenData.width - 1;
            }
            if (height > screenData.height - 1) {
                height = screenData.height - 1;
            }
            for (let i = height; i < height + y; ++i) {
                this.fastHorizontalLine(screenData, width, i, x, color.color);
            }
        }

        /** Draws a filled rectangle on the screen with a gradient effect.
         *
         * @param {ScreenData} screenData - The screen data object.
         * @param {number} x - The x-coordinate of the top-left corner of the rectangle.
         * @param {number} y - The y-coordinate of the top-left corner of the rectangle.
         * @param {number} width - The width of the rectangle.
         * @param {number} height - The height of the rectangle.
         * @param {CWSYSTEM.CWColor} cwColor - The starting color of the gradient.
         * @param {CWSYSTEM.CWColor} cwColor2 - The ending color of the gradient.
         * @param {string} [gradientType='sine'] - The type of gradient. Valid values are 'sine' and 'linear'.
         *                                          Defaults to 'sine'.
         * @throws {Error} If an invalid gradient type is provided.
         */
        CWDrawFilledRectangleWithGradient(screenData, x, y, width, height,
                                          cwColor, cwColor2, gradientType = 'sine') {
            CWSYSTEM.Environment.screenHasChanged = true;
            if (x > screenData.width - 1) {
                x = screenData.width - 1;
            }
            if (y > screenData.height - 1) {
                y = screenData.height - 1;
            }
            const red = cwColor.red();
            const green = cwColor.green();
            const blue = cwColor.blue();
            const alpha = cwColor.alpha();
            const red2 = cwColor2.red();
            const green2 = cwColor2.green();
            const blue2 = cwColor2.blue();
            const alpha2 = cwColor2.alpha();
            if (gradientType === 'sine') {
                for (let i = y; i < y + height; ++i) {
                    const sin = Math.sin(3.141592653589793 * ((i - y) / height));
                    this.fastHorizontalLine(screenData, x, i, width, CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        ((red + (red2 - red) * sin) | 0), ((green + (green2 - green) * sin) | 0),
                        ((blue + (blue2 - blue) * sin) | 0), ((alpha + (alpha2 - alpha) * sin) | 0)));
                }
            } else if (gradientType === 'linear') {
                for (let i = y; i < y + height; ++i) {
                    this.fastHorizontalLine(screenData, x, i, width, CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        red2 + ((red - red2) * (i - y) / height | 0),
                        green2 + ((green - green2) * (i - y) / height | 0),
                        blue2 + ((blue - blue2) * (i - y) / height | 0),
                        alpha2 + ((alpha - alpha2) * (i - y) / height | 0)));
                }
            } else {
                throw new Error('Invalid gradient type');
            }
        }

        CWDrawRectangleWithCropping(screenData, x, y, width, length) {
            if (x >= 0 && y >= 0 && x + width < screenData.width && y + length < screenData.height) {
                this.CWDrawRectangle(screenData, x, y, width, length);
                return;
            }
            for (let i = 0; i < width; ++i) {
                this.CWDrawPixelWithCropping(screenData, x + i, y);
                this.CWDrawPixelWithCropping(screenData, x + i, y + length - 1);
            }
            for (let j = 1; j < length - 1; ++j) {
                this.CWDrawPixelWithCropping(screenData, x, y + j);
                this.CWDrawPixelWithCropping(screenData, x + width - 1, y + j);
            }
        }

        CWDrawRectangle(screenData, x, y, width, length) {
            this.verticalLine(screenData, x, y, length, this.defaultColor);
            this.verticalLine(screenData, x + width - 1, y, length, this.defaultColor);
            this.fastHorizontalLine(screenData, x + 1, y, width - 2, this.defaultColor);
            this.fastHorizontalLine(screenData, x + 1, y + length - 1, width - 2, this.defaultColor);
        }

//CWSYSTEM.Environment.screenHasChanged = true;
        /**
         * Renders a polygon on the screen with the specified color.
         * @param {ScreenData} screenData - The screen data object containing the point array.
         * @param {Array|null} buffer - The buffer array to store color information.
         * @param {number} colorA - The color value to render the polygon with.
         * @param {number} v1x - The x-coordinate of vertex 1.
         * @param {number} v1y - The y-coordinate of vertex 1.
         * @param {number} v2x - The x-coordinate of vertex 2.
         * @param {number} v2y - The y-coordinate of vertex 2.
         * @param {number} v3x - The x-coordinate of vertex 3.
         * @param {number} v3y - The y-coordinate of vertex 3.
         * @param {boolean} bool
         * @param {number} w0 - The width of the screen.
         * @param {number} h0 - The height of the screen.
         * @param {number|Polygon|null} polygon - The polygon identifier.
         * @param {Array|null} array - The array to store polygon information.
         * @returns {void}
         */
        renderPolygon(screenData, buffer, colorA, v1x, v1y,
                      v2x, v2y, v3x, v3y, bool, w0, h0,
                      polygon, array) {
            let lastRow = screenData.height - 1;
            let decision = 0;
            const lastCol = w0 - 1;
            if ((v1x < 0.0 && v2x < 0.0 && v3x < 0.0) || (v1y < 0.0 && v2y < 0.0 && v3y < 0.0) ||
                (v1x > w0 && v2x > w0 && v3x > w0) || (v1y > h0 && v2y > h0 && v3y > h0)) {
                return;
            }
            CWSYSTEM.Environment.screenHasChanged = true;
            for (let i = 0; i < 3; ++i) {
                let b2 = false;
                let v5 = 0.0, v6 = 0.0, v1 = 0.0, v2 = 0.0, v3 = 0.0, v4 = 0.0;
                switch (i) {
                    case 0: {
                        v5 = v3x;
                        v6 = v3y;
                        if (v1y === v2y) {
                            continue;
                        }
                        if (v1y < v2y) {
                            v1 = v1x;
                            v2 = v1y;
                            v3 = v2x;
                            v4 = v2y;
                        } else {
                            v1 = v2x;
                            v2 = v2y;
                            v3 = v1x;
                            v4 = v1y;
                        }
                        break;
                    }
                    case 1: {
                        v5 = v1x;
                        v6 = v1y;
                        if (v2y === v3y) {
                            continue;
                        }
                        if (v2y < v3y) {
                            v1 = v2x;
                            v2 = v2y;
                            v3 = v3x;
                            v4 = v3y;
                        } else {
                            v1 = v3x;
                            v2 = v3y;
                            v3 = v2x;
                            v4 = v2y;
                        }
                        break;
                    }
                    default: {
                        v5 = v2x;
                        v6 = v2y;
                        if (v1y === v3y) {
                            continue;
                        }
                        if (v1y < v3y) {
                            v1 = v1x;
                            v2 = v1y;
                            v3 = v3x;
                            v4 = v3y;
                        } else {
                            v1 = v3x;
                            v2 = v3y;
                            v3 = v1x;
                            v4 = v1y;
                        }
                        break;
                    }
                }
                const diff1 = Math.fround((v3 - v1) / (v4 - v2));
                let y20 = ((Math.fround(v2 + 1.0)) | 0);
                let n21;
                if (y20 < 0) {
                    y20 = 0;
                    n21 = Math.fround(v1 + ((0.0 - v2) * diff1));
                } else {
                    n21 = Math.fround(v1 + ((y20 - v2) * diff1));
                }
                let y22 = v4 > h0 - 1 ? h0 - 1 : v4;

                if (y22 > 0 || y20 > 0) {
                    if (y22 < h0 - 1 || y20 < h0 - 1) {
                        if (y20 < lastRow) {
                            lastRow = y20;
                        }
                        if (y22 > decision) {
                            decision = y22;
                        }
                        const n23 = Math.fround(n21 - diff1 * (y20 - v6));
                        if (Math.abs((n23 - v5)) < 1.0E-4) {
                            return;
                        }
                        b2 = n23 < v5;

                        let n24 = n21;
                        if (b2) {
                            for (let j = y20; j <= y22; ++j) {
                                this.leftScanLine[j] = ((n24 + 1.0) | 0);
                                n24 += diff1;
                            }
                        } else {
                            for (let k = y20; k <= y22; ++k) {
                                this.rightScanLine[k] = (n24 | 0);
                                n24 += diff1;
                            }
                        }
                        if (b2) {
                            const lsl1 = this.leftScanLine[y20];
                            const lsl2 = this.leftScanLine[y22];
                            if (lsl2 >= 0.0 && lsl1 < 0.0) {
                                for (let l = y20; l <= y22; ++l) {
                                    if (this.leftScanLine[l] >= 0) {
                                        break;
                                    }
                                    this.leftScanLine[l] = 0;
                                }
                            } else if (lsl2 < 0.0 && lsl1 >= 0.0) {
                                for (let y27 = y22; y27 >= y20; --y27) {
                                    if (this.leftScanLine[y27] >= 0) {
                                        break;
                                    }
                                    this.leftScanLine[y27] = 0;
                                }
                            } else if (lsl1 < 0.0 && lsl2 < 0.0) {
                                for (let y28 = y20; y28 <= y22; ++y28) {
                                    this.leftScanLine[y28] = 0;
                                }
                            }
                        } else {
                            const rSL1 = this.rightScanLine[y20];
                            const rSL2 = this.rightScanLine[y22];
                            if (rSL2 <= lastCol && rSL1 > lastCol) {
                                for (let y31 = y20; y31 <= y22; ++y31) {
                                    if (this.rightScanLine[y31] <= lastCol) {
                                        break;
                                    }
                                    this.rightScanLine[y31] = lastCol;
                                }
                            } else if (rSL2 > lastCol && rSL1 <= lastCol) {
                                for (let y32 = y22; y32 >= y20; --y32) {
                                    if (this.rightScanLine[y32] <= lastCol) {
                                        break;
                                    }
                                    this.rightScanLine[y32] = lastCol;
                                }
                            } else if (rSL1 > lastCol && rSL2 > lastCol) {
                                for (let y33 = y20; y33 <= y22; ++y33) {
                                    this.rightScanLine[y33] = lastCol;
                                }
                            }
                        }
                    }
                }
            }
            const point = screenData.point;
            if (polygon == null) {
                try {
                    const alpha = CWSYSTEM.FastColorUtilities.alpha(this.defaultColor);
                    if (alpha === 255) {
                        for (let y34 = lastRow; y34 <= decision; ++y34) {
                            let x37 = this.leftScanLine[y34];
                            for (const n36 = this.rightScanLine[y34]; x37 <= n36; ++x37) {
                                if (buffer != null) {
                                    if (colorA < buffer[y34][x37]) {
                                        point[y34][x37] = this.defaultColor;
                                        buffer[y34][x37] = colorA;
                                    }
                                } else {
                                    point[y34][x37] = this.defaultColor;
                                }
                            }
                        }
                    } else if (buffer != null) {
                        for (let y38 = lastRow; y38 <= decision; ++y38) {
                            let x41 = this.leftScanLine[y38];
                            for (const n40 = this.rightScanLine[y38]; x41 <= n40; ++x41) {
                                if (colorA < buffer[y38][x41]) {
                                    const color = point[y38][x41];
                                    const alphaValue = 255 - alpha;
                                    point[y38][x41] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                        ((alpha * CWSYSTEM.FastColorUtilities.red(this.defaultColor) + alphaValue *
                                            CWSYSTEM.FastColorUtilities.red(color)) / 256 | 0),
                                        ((alpha * CWSYSTEM.FastColorUtilities.green(this.defaultColor) + alphaValue *
                                            CWSYSTEM.FastColorUtilities.green(color)) / 256 | 0),
                                        ((alpha * CWSYSTEM.FastColorUtilities.blue(this.defaultColor) + alphaValue *
                                            CWSYSTEM.FastColorUtilities.blue(color)) / 256 | 0), 255);
                                    buffer[y38][x41] = colorA;
                                }
                            }
                        }
                    } else {
                        for (let y44 = lastRow; y44 <= decision; ++y44) {
                            let x47 = this.leftScanLine[y44];
                            for (const n46 = this.rightScanLine[y44]; x47 <= n46; ++x47) {
                                const pColor = point[y44][x47];
                                const pAlpha = 255 - alpha;
                                point[y44][x47] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                    ((alpha * CWSYSTEM.FastColorUtilities.red(this.defaultColor) + pAlpha *
                                        CWSYSTEM.FastColorUtilities.red(pColor)) / 256 | 0),
                                    ((alpha * CWSYSTEM.FastColorUtilities.green(this.defaultColor) + pAlpha *
                                        CWSYSTEM.FastColorUtilities.green(pColor)) / 256 | 0),
                                    ((alpha * CWSYSTEM.FastColorUtilities.blue(this.defaultColor) + pAlpha *
                                        CWSYSTEM.FastColorUtilities.blue(pColor)) / 256 | 0), 255);
                            }
                        }
                    }
                } catch (ex) {
                    console.error(ex.message, ex);
                }
            } else {
                for (let y50 = lastRow; y50 <= decision; ++y50) {
                    const rsl1 = this.leftScanLine[y50];
                    const rsl2 = this.rightScanLine[y50];
                    if (rsl1 <= rsl2) {
                        for (let x53 = rsl1; x53 <= rsl2; ++x53) {
                            if (colorA < buffer[y50][x53]) {
                                array[y50][x53] = polygon;
                                buffer[y50][x53] = colorA;
                            }
                        }
                    }
                }
            }
        }

        CWLine(screenData, x1, y1, x2, y2, b) {
            CWSYSTEM.Environment.screenHasChanged = true;
            const width = screenData.width;
            const height = screenData.height;

            if (x1 < 0 && x2 < 0 || y1 < 0 && y2 < 0 || x1 >= width && x2 >= width || y1 >= height && y2 >= height) {
                return;
            }
            const subX = x2 - x1;
            const subY = y2 - y1;
            const absX = Math.abs(subX);
            const absY = Math.abs(subY);
            const xIncrement = subX > 0 ? 1 : -1;
            const yIncrement = subY > 0 ? 1 : -1;

            if (absY >= absX) {
                this.octant1(screenData, x1, y1, absY, absX, xIncrement, yIncrement);
            } else {
                this.octant0(screenData, x1, y1, absX, absY, xIncrement, yIncrement);
            }
            if (b) {
                //CWSYSTEM.Debug.println("line true");
            }
        }

        /** @private */
        octant0(screenData, x, y, remainingPoints, radius, xIncrement, yIncrement) {
            const diameter = radius * 2;
            const points = diameter - remainingPoints * 2;
            let decisionVariable = diameter - remainingPoints;
            this.CWDrawPixelWithCropping(screenData, x, y);
            while (remainingPoints-- > 0) {
                if (decisionVariable >= 0) {
                    y += yIncrement;
                    decisionVariable += points;
                } else {
                    decisionVariable += diameter;
                }
                x += xIncrement;
                this.CWDrawPixelWithCropping(screenData, x, y);
            }
        }

        /** @private */
        octant1(screenData, x, y, radius, abs, xIncrement, yIncrement) {
            const diameter = radius * 2;
            const points = diameter - abs * 2;
            let last = diameter - abs;
            this.CWDrawPixelWithCropping(screenData, x, y);
            while ((abs-- > 0)) {
                if (last >= 0) {
                    x += xIncrement;
                    last += points;
                } else {
                    last += diameter;
                }
                y += yIncrement;
                this.CWDrawPixelWithCropping(screenData, x, y);
            }
        }

        /**
         * Draws a circle on the screen using the midpoint circle algorithm.
         *
         * @param {ScreenData} screenData - The screen data object.
         * @param {number} x - The x-coordinate of the circle's center.
         * @param {number} y - The y-coordinate of the circle's center.
         * @param {number} radius - The radius of the circle.
         * @param {CWColor} color - The color of the circle.
         * @param {boolean} cropFlag - Flag indicating whether to apply cropping or not.
         */
        JCCircle(screenData, x, y, radius, color, cropFlag) {
            CWSYSTEM.Environment.screenHasChanged = true;
            this.setColor$intCWColor(color);

            let i = 0;
            let rad = radius;
            let quad = (5 - radius * 4) / 4 | 0;

            const drawCirclePoints = cropFlag ? this.circlePointsWithCropping : this.circlePoints;
            drawCirclePoints(screenData, x, y, i, rad);

            while (i < rad) {
                i++;
                if (quad < 0) {
                    quad += 2 * i + 1;
                } else {
                    rad--;
                    quad += 2 * (i - rad) + 1;
                }
                drawCirclePoints(screenData, x, y, i, rad);
            }
        }

        /**
         * Draws the specific points on a circle.
         *
         * @param {ScreenData} screenData - The screen data object.
         * @param {number} x - The x-coordinate of the circle's center.
         * @param {number} y - The y-coordinate of the circle's center.
         * @param {number} point - The current point on the circle.
         * @param {number} radius - The radius of the circle.
         * @private */
        circlePoints(screenData, x, y, point, radius) {
            const drawPixel = this.CWDrawPixel.bind(this, screenData);

            if (point === 0 || point === radius) {
                drawPixel(x, y + radius);
                drawPixel(x, y - radius);
                drawPixel(x + radius, y);
                drawPixel(x - radius, y);
            } else if (point < radius) {
                drawPixel(x + point, y + radius);
                drawPixel(x - point, y + radius);
                drawPixel(x + point, y - radius);
                drawPixel(x - point, y - radius);
                drawPixel(x + radius, y + point);
                drawPixel(x - radius, y + point);
                drawPixel(x + radius, y - point);
                drawPixel(x - radius, y - point);
            }
        }

        /** @private */
        circlePointsWithCropping(screenData, x, y, n3, n4) {
            if (n3 === 0) {
                this.CWDrawPixelWithCropping(screenData, x, y + n4);
                this.CWDrawPixelWithCropping(screenData, x, y - n4);
                this.CWDrawPixelWithCropping(screenData, x + n4, y);
                this.CWDrawPixelWithCropping(screenData, x - n4, y);
            } else { //else if (n3 === n4) 
                this.CWDrawPixelWithCropping(screenData, x + n3, y + n4);
                this.CWDrawPixelWithCropping(screenData, x - n3, y + n4);
                this.CWDrawPixelWithCropping(screenData, x + n3, y - n4);
                this.CWDrawPixelWithCropping(screenData, x - n3, y - n4);
            }
            if (n3 < n4) {
                this.CWDrawPixelWithCropping(screenData, x + n4, y + n3);
                this.CWDrawPixelWithCropping(screenData, x - n4, y + n3);
                this.CWDrawPixelWithCropping(screenData, x + n4, y - n3);
                this.CWDrawPixelWithCropping(screenData, x - n4, y - n3);
            }
        }
    }

    CWSYSTEM.VirtualScreen = VirtualScreen;
    VirtualScreen["__class"] = "CWSYSTEM.VirtualScreen";
})(CWSYSTEM || (CWSYSTEM = {}));
