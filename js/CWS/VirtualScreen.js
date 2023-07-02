var CWSYSTEM;
(function (CWSYSTEM) {
    class VirtualScreen {
        constructor() {
            if (this.background === undefined) {
                this.background = null;
            }
            if (this.subFrame === undefined) {
                this.subFrame = null;
            }
            if (this.actualScreen === undefined) {
                this.actualScreen = null;
            }
            if (this.subFrames === undefined) {
                this.subFrames = 0;
            }
            if (this.leftScanLine === undefined) {
                this.leftScanLine = null;
            }
            if (this.rightScanLine === undefined) {
                this.rightScanLine = null;
            }
            if (this.subFrameCount === undefined) {
                this.subFrameCount = 0;
            }
            if (this.defaultColor === undefined) {
                this.defaultColor = 0;
            }
            if (this.drawCompleteBackground === undefined) {
                this.drawCompleteBackground = false;
            }
            if (this.subFrameRefresh === undefined) {
                this.subFrameRefresh = false;
            }
            if (this.serif8_font === undefined) {
                this.serif8_font = null;
            }
            if (this.serif11_font === undefined) {
                this.serif11_font = null;
            }
            if (this.jcsmallfixed_font === undefined) {
                this.jcsmallfixed_font = null;
            }
            if (this.physicalWidth === undefined) {
                this.physicalWidth = 0;
            }
            if (this.physicalHeight === undefined) {
                this.physicalHeight = 0;
            }
            if (this.topInset === undefined) {
                this.topInset = 0;
            }
            if (this.backgroundImage === undefined) {
                this.backgroundImage = "";
            }
            if (this.backgroundFadeInProgress === undefined) {
                this.backgroundFadeInProgress = false;
            }
            if (this.fadeStartTime === undefined) {
                this.fadeStartTime = 0;
            }
            if (this.fadeEndTime === undefined) {
                this.fadeEndTime = 0;
            }
            if (this.virtualScreenInUse === undefined) {
                this.virtualScreenInUse = false;
            }
            if (this.cancelOption === undefined) {
                this.cancelOption = false;
            }
            if (this.pleaseWaitMessageFlashState === undefined) {
                this.pleaseWaitMessageFlashState = 0;
            }
            if (this.__renderPleaseWaitMessage === undefined) {
                this.__renderPleaseWaitMessage = false;
            }
            this.subFrames = CWSYSTEM.Global.subFrames;
            this.backgroundImage = "assets/images/background.jpg";
            this.cancelOption = false;
            this.pleaseWaitMessageFlashState = 3;
            this.__renderPleaseWaitMessage = false;
            this.physicalWidth = CWSYSTEM.Global.screenResolutionX_$LI$();
            this.physicalHeight = CWSYSTEM.Global.screenResolutionY_$LI$();
            CWSYSTEM.Debug.println("Initializing largeScreen");
            this.subFrame = (s => {
                let a = [];
                while (s-- > 0) a.push(null);
                return a;
            })(this.subFrames);
            for (let i = 0; i < this.subFrames; ++i) {
                CWSYSTEM.Debug.println("Initializing actualScreenSubframe number" + i);
                this.subFrame[i] = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Subframe " + i);
            }
            CWSYSTEM.Debug.println("Initializing actualScreen and background");
            this.actualScreen = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Actual screen");
            this.background = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Background buffer");
            CWSYSTEM.Debug.println("Initializing polygon scan lines");
            this.rightScanLine = (s => {
                let a = [];
                while (s-- > 0) a.push(0);
                return a;
            })(5000);
            this.leftScanLine = (s => {
                let a = [];
                while (s-- > 0) a.push(0);
                return a;
            })(5000);
            this.subFrameCount = 0;
            this.defaultColor = 0;
            CWSYSTEM.Debug.println("Installing fonts");
            this.serif8_font = new CWSYSTEM.CWFont("assets/fonts/serif8.jcf");
            this.serif11_font = new CWSYSTEM.CWFont("assets/fonts/serif11.jcf");
            this.jcsmallfixed_font = new CWSYSTEM.CWFont("assets/fonts/jcsmallfixed.jcf");
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

        initalizeLargeObjects() {
            this.subFrame = (s => {
                let a = [];
                while (s-- > 0) a.push(null);
                return a;
            })(this.subFrames); // this.subFrame = new ScreenData[this.subFrames];
            for (let i = 0; i < this.subFrames; ++i) {
                this.subFrame[i] = new CWSYSTEM.ScreenData(this.physicalWidth, this.physicalHeight, "Subframe " + i);
            }
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
                context.drawImage(image, 0, 0);//, canvas.width /* image.width*/, canvas.height/*image.height*/);
                bufferedImage = context.getImageData(0, 0, canvas.width, canvas.height);
            } catch (ex) {
                b = true;
                CWSYSTEM.Debug.error("General IO exception while reading image: " + this.backgroundImage);
            }
            const height = this.background.height;
            const width = this.background.width;
            if (b) {
                for (let i = 0; i < height; ++i) {
                    for (let j = 0; j < width; ++j) {
                        this.background.point[i][j] = CWSYSTEM.Global.environmentBackgroundColor_$LI$();
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
                        data[i + 0], data[i + 1], data[i + 2], data[i + 3]));
                }

                for (let k = 0; k < height; ++k) {
                    for (let l = 0; l < width; ++l) {
                        this.background.point[k][l] = imageData[k % height2 * width2 + l % width2];
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
            this.subFrame = (s => {
                let a = [];
                while (s-- > 0) a.push(null);
                return a;
            })(this.subFrames);
            for (let i = 0; i < this.subFrames; ++i) {
                CWSYSTEM.Debug.println("Initializing actualScreenSubframe number" + i);
                this.subFrame[i] = new CWSYSTEM.ScreenData(CWSYSTEM.Global.screenResolutionX_$LI$(), CWSYSTEM.Global.screenResolutionY_$LI$(), "Subframe " + i);
            }
            CWSYSTEM.Debug.println("Initializing actualScreen and background (already initialized)");
            CWSYSTEM.Debug.println("Initializing polygon scan lines (already initialized)");
            this.drawCompleteBackground = true;
            this.subFrameRefresh = true;
            this.subFrameCount = 0;
        }

        update() {
            if (this.backgroundFadeInProgress || CWSYSTEM.Environment.screenHasChanged || CWSYSTEM.Environment.furtherRendering > 0) {
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
                    CWSYSTEM.CWUtils.copyArray(this.subFrame[(this.subFrameCount + this.subFrames - 1) % this.subFrames].point[i],
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
                        const n = window.h + 2 * window.borderWidth + window.__titleHeight;
                        const n2 = window.xPosition - window.borderWidth;
                        const n3 = window.xPosition + window.w + window.borderWidth;
                        const n4 = window.yPosition - window.borderWidth - window.__titleHeight;
                        for (let l = 0; l < n; ++l) {
                            CWSYSTEM.CWUtils.addSegmentToScanLine(l + n4, n2, n3);
                        }
                        if (window.oldH !== window.h || window.oldW !== window.w || window.oldX !== window.xPosition || window.oldY !== window.yPosition || window.toBeDestroyed) {
                            const n5 = window.oldH + 2 * window.borderWidth + window.__titleHeight;
                            const n6 = window.oldX - window.borderWidth;
                            const n7 = window.oldX + window.oldW + window.borderWidth;
                            const n8 = window.oldY - window.borderWidth - window.__titleHeight;
                            for (let n9 = 0; n9 < n5; ++n9) {
                                CWSYSTEM.CWUtils.addSegmentToScanLine(n9 + n8, n6, n7);
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
                const n10 = Math.fround(Math.pow(
                    (CWSYSTEM.Environment.currentTime() - this.fadeStartTime) / (this.fadeEndTime - this.fadeStartTime), 1.5));
                for (let n11 = 0; n11 < height; ++n11) {
                    for (let n12 = 0; n12 < width; ++n12) {
                        const n13 = this.background.point[n11][n12];
                        screenData.point[n11][n12] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(((
                                Math.fround(CWSYSTEM.FastColorUtilities.red(n13) * n10)) | 0),
                            ((Math.fround(CWSYSTEM.FastColorUtilities.green(n13) * n10)) | 0),
                            ((Math.fround(CWSYSTEM.FastColorUtilities.blue(n13) * n10)) | 0), 255);
                    }
                }
            } else if (this.drawCompleteBackground) {
                this.drawCompleteBackground = false;
                for (let n14 = 0; n14 < height; ++n14) {
                    CWSYSTEM.CWUtils.copyArray(this.background.point[n14], 0, screenData.point[n14], 0, width);
                }
            } else {
                for (let n15 = 0; n15 < height; ++n15) {
                    for (let n16 = 0; n16 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n15]; n16 += 2) {
                        const n17 = CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n15][n16];
                        CWSYSTEM.CWUtils.copyArray(this.background.point[n15], n17, screenData.point[n15], n17,
                            CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n15][n16 + 1] - n17);
                    }
                }
            }
            for (let n18 = 0; n18 < collection.depthSortedSequence.size(); ++n18) {
                const currWindow = collection.getWindow$int(collection.depthSortedSequence.get(n18));
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
                            const n19 = currWindow.xPosition + currWindow.w;
                            const antiAliasedLevel = currWindow.antiAliasedLevel;
                            const preAntiAliasedContent = currWindow.preAntiAliasedContent;
                            if (subframes >= 2) {
                                const screenData2 = currWindow.temporalSupersample[currWindow.subFrame];
                                const screenData3 =
                                    currWindow.temporalSupersample[(currWindow.subFrame - 1 + subframes) % subframes];
                                for (let n20 = 0; n20 < currWindow.h; ++n20) {
                                    CWSYSTEM.CWUtils.copyArray(screenData3.point[n20], 0,
                                        screenData2.point[n20], 0, currWindow.w);
                                }
                                for (let n21 = yPosition2; n21 < yPosition2 + h; ++n21) {
                                    for (let n22 = 0; n22 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n21]; n22 += 2) {
                                        const max = Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n21][n22], xPosition3);
                                        const min = Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n21][n22 + 1], n19);
                                        switch (antiAliasedLevel) {
                                            case 1: {
                                                const n23 = n21 - yPosition2;
                                                for (let n24 = max; n24 < min; ++n24) {
                                                    const n25 = n24 - xPosition2;
                                                    const n26 = preAntiAliasedContent.point[n23][n25];
                                                    screenData2.point[n23][n25] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                                        CWSYSTEM.FastColorUtilities.red(n26),
                                                        CWSYSTEM.FastColorUtilities.green(n26),
                                                        CWSYSTEM.FastColorUtilities.blue(n26),
                                                        CWSYSTEM.FastColorUtilities.alpha(n26));
                                                }
                                                break;
                                            }
                                            case 2: {
                                                const n27 = n21 - yPosition2;
                                                for (let n28 = max; n28 < min; ++n28) {
                                                    const n29 = n28 - xPosition2;
                                                    const n30 = preAntiAliasedContent.point[n27 * 2][n29 * 2];
                                                    const n31 = preAntiAliasedContent.point[n27 * 2][n29 * 2 + 1];
                                                    const n32 = preAntiAliasedContent.point[n27 * 2 + 1][n29 * 2];
                                                    const n33 = preAntiAliasedContent.point[n27 * 2 + 1][n29 * 2 + 1];
                                                    screenData2.point[n27][n29] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                                        ((CWSYSTEM.FastColorUtilities.red(n30) +
                                                            CWSYSTEM.FastColorUtilities.red(n31) +
                                                            CWSYSTEM.FastColorUtilities.red(n32) +
                                                            CWSYSTEM.FastColorUtilities.red(n33)) / 4 | 0),
                                                        ((CWSYSTEM.FastColorUtilities.green(n30) +
                                                            CWSYSTEM.FastColorUtilities.green(n31) +
                                                            CWSYSTEM.FastColorUtilities.green(n32) +
                                                            CWSYSTEM.FastColorUtilities.green(n33)) / 4 | 0),
                                                        ((CWSYSTEM.FastColorUtilities.blue(n30) +
                                                            CWSYSTEM.FastColorUtilities.blue(n31) +
                                                            CWSYSTEM.FastColorUtilities.blue(n32) +
                                                            CWSYSTEM.FastColorUtilities.blue(n33)) / 4 | 0),
                                                        ((CWSYSTEM.FastColorUtilities.alpha(n30) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n31) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n32) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n33)) / 4 | 0));
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
                                    const rememberedPostTimeSupersampledScreenData = currWindow.rememberedPostTimeSupersampledScreenData;
                                    for (let n34 = yPosition3; n34 < yPosition3 + h2; ++n34) {
                                        for (let n35 = 0; n35 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n34]; n35 += 2) {
                                            const max2 = Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n34][n35], xPosition5);
                                            const min2 = Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n34][n35 + 1], b);
                                            const n36 = n34 - yPosition3;
                                            for (let n37 = max2; n37 < min2; ++n37) {
                                                const n38 = n37 - xPosition4;
                                                let n39 = 0;
                                                let n40 = 0;
                                                let n41 = 0;
                                                let n42 = 0;
                                                for (let n43 = 0; n43 < subframes; ++n43) {
                                                    n39 += CWSYSTEM.FastColorUtilities.red(temporalSupersample[n43].point[n36][n38]);
                                                    n41 += CWSYSTEM.FastColorUtilities.green(temporalSupersample[n43].point[n36][n38]);
                                                    n40 += CWSYSTEM.FastColorUtilities.blue(temporalSupersample[n43].point[n36][n38]);
                                                    n42 += CWSYSTEM.FastColorUtilities.alpha(temporalSupersample[n43].point[n36][n38]);
                                                }
                                                rememberedPostTimeSupersampledScreenData.point[n36][n38] =
                                                    CWSYSTEM.FastColorUtilities.color$r$g$b$a((n39 / subframes | 0),
                                                        (n41 / subframes | 0), (n40 / subframes | 0),
                                                        (n42 / subframes | 0));
                                            }
                                        }
                                    }
                                } else {
                                    CWSYSTEM.Environment.screenHasChanged = true;
                                }
                                currWindow.subFrame = (currWindow.subFrame + 1) % currWindow.temporalSupersample.length;
                                const rememberedPostTimeSupersampledScreenData2 = currWindow.rememberedPostTimeSupersampledScreenData;
                                const h3 = currWindow.h;
                                xPosition2 = xPosition;
                                yPosition2 = yPosition;
                                const b2 = xPosition;
                                const b3 = xPosition + currWindow.w;
                                for (let n44 = yPosition2; n44 < yPosition2 + h3; ++n44) {
                                    for (let n45 = 0; n45 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n44]; n45 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparancy(
                                            rememberedPostTimeSupersampledScreenData2, n44,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n44][n45], b2),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n44][n45 + 1], b3),
                                            xPosition2, yPosition2);
                                    }
                                }
                            } else {
                                const preAntiAliasedContent2 = currWindow.preAntiAliasedContent;
                                for (let n46 = yPosition2; n46 < yPosition2 + h; ++n46) {
                                    if (yPosition2 + h <= screenData.point.length) {
                                        for (let n47 = 0; n47 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n46]; n47 += 2) {
                                            const max3 = Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n46][n47], xPosition3);
                                            const min3 = Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n46][n47 + 1], n19);
                                            switch ((antiAliasedLevel)) {
                                                case 1: {
                                                    const n48 = n46 - yPosition2;
                                                    for (let n49 = max3; n49 < min3; ++n49) {
                                                        const n50 = n49 - xPosition2;
                                                        const alpha = CWSYSTEM.FastColorUtilities.alpha(preAntiAliasedContent2.point[n48][n50]);
                                                        const n51 = 255 - alpha;
                                                        screenData.point[n46][n49] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                                            ((alpha * CWSYSTEM.FastColorUtilities.red(
                                                                    preAntiAliasedContent2.point[n48][n50]) + n51 *
                                                                CWSYSTEM.FastColorUtilities.red(screenData.point[n46][n49])) / 256 | 0),
                                                            ((alpha * CWSYSTEM.FastColorUtilities.green(
                                                                    preAntiAliasedContent2.point[n48][n50]) + n51 *
                                                                CWSYSTEM.FastColorUtilities.green(screenData.point[n46][n49])) / 256 | 0),
                                                            ((alpha * CWSYSTEM.FastColorUtilities.blue(
                                                                    preAntiAliasedContent2.point[n48][n50]) + n51 *
                                                                CWSYSTEM.FastColorUtilities.blue(screenData.point[n46][n49])) / 256 | 0));
                                                    }
                                                    break;
                                                }
                                                case 2: {
                                                    const n52 = (n46 - yPosition2) * 2;
                                                    try {
                                                        for (let n53 = max3; n53 < min3; ++n53) {
                                                            const n54 = (n53 - xPosition2) * 2;
                                                            const n55 = preAntiAliasedContent2.point[n52][n54];
                                                            const n56 = preAntiAliasedContent2.point[n52][n54 + 1];
                                                            const n57 = preAntiAliasedContent2.point[n52 + 1][n54];
                                                            const n58 = preAntiAliasedContent2.point[n52 + 1][n54 + 1];
                                                            const n59 = ((CWSYSTEM.FastColorUtilities.alpha(n55) +
                                                                CWSYSTEM.FastColorUtilities.alpha(n56) +
                                                                CWSYSTEM.FastColorUtilities.alpha(n57) +
                                                                CWSYSTEM.FastColorUtilities.alpha(n58)) / 4 | 0);
                                                            const n60 = 255 - n59;
                                                            screenData.point[n46][n53] = CWSYSTEM.FastColorUtilities.colorWithGammaAdjustment(
                                                                (((n59 * (CWSYSTEM.FastColorUtilities.red(n55) + CWSYSTEM.FastColorUtilities.red(n56) +
                                                                        CWSYSTEM.FastColorUtilities.red(n57) + CWSYSTEM.FastColorUtilities.red(n58)) / 4 +
                                                                    n60 * CWSYSTEM.FastColorUtilities.red(screenData.point[n46][n53])) / 256) | 0),
                                                                (((n59 * (CWSYSTEM.FastColorUtilities.green(n55) + CWSYSTEM.FastColorUtilities.green(n56) +
                                                                        CWSYSTEM.FastColorUtilities.green(n57) + CWSYSTEM.FastColorUtilities.green(n58)) / 4 +
                                                                    n60 * CWSYSTEM.FastColorUtilities.green(screenData.point[n46][n53])) / 256) | 0),
                                                                (((n59 * (CWSYSTEM.FastColorUtilities.blue(n55) + CWSYSTEM.FastColorUtilities.blue(n56) +
                                                                        CWSYSTEM.FastColorUtilities.blue(n57) + CWSYSTEM.FastColorUtilities.blue(n58)) / 4 +
                                                                    n60 * CWSYSTEM.FastColorUtilities.blue(screenData.point[n46][n53])) / 256) | 0));
                                                        }
                                                    } catch (ex) {
                                                        console.error("Window " + currWindow.nameID + " raised out of bounds error AT34E");
                                                    }
                                                    break;
                                                }
                                                case 3: {
                                                    const n61 = (n46 - yPosition2) * 3;
                                                    for (let n62 = max3; n62 < min3; ++n62) {
                                                        const n63 = (n62 - xPosition2) * 3;
                                                        const n64 = preAntiAliasedContent2.point[n61][n63];
                                                        const n65 = preAntiAliasedContent2.point[n61][n63 + 1];
                                                        const n66 = preAntiAliasedContent2.point[n61][n63 + 2];
                                                        const n67 = preAntiAliasedContent2.point[n61 + 1][n63];
                                                        const n68 = preAntiAliasedContent2.point[n61 + 1][n63 + 1];
                                                        const n69 = preAntiAliasedContent2.point[n61 + 1][n63 + 2];
                                                        const n70 = preAntiAliasedContent2.point[n61 + 2][n63];
                                                        const n71 = preAntiAliasedContent2.point[n61 + 2][n63 + 1];
                                                        const n72 = preAntiAliasedContent2.point[n61 + 2][n63 + 2];
                                                        const n73 = ((CWSYSTEM.FastColorUtilities.alpha(n64) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n65) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n66) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n67) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n68) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n69) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n70) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n71) +
                                                            CWSYSTEM.FastColorUtilities.alpha(n72)) / 9 | 0);
                                                        const n74 = 255 - n73;
                                                        screenData.point[n46][n62] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                                            (((n73 * (CWSYSTEM.FastColorUtilities.red(n64) +
                                                                    CWSYSTEM.FastColorUtilities.red(n65) +
                                                                    CWSYSTEM.FastColorUtilities.red(n66) +
                                                                    CWSYSTEM.FastColorUtilities.red(n67) +
                                                                    CWSYSTEM.FastColorUtilities.red(n68) +
                                                                    CWSYSTEM.FastColorUtilities.red(n69) +
                                                                    CWSYSTEM.FastColorUtilities.red(n70) +
                                                                    CWSYSTEM.FastColorUtilities.red(n71) +
                                                                    CWSYSTEM.FastColorUtilities.red(n72)) / 9 | 0) +
                                                                n74 * CWSYSTEM.FastColorUtilities.red(
                                                                    screenData.point[n46][n62])) / 256 | 0),
                                                            (((n73 * (CWSYSTEM.FastColorUtilities.green(n64) +
                                                                    CWSYSTEM.FastColorUtilities.green(n65) +
                                                                    CWSYSTEM.FastColorUtilities.green(n66) +
                                                                    CWSYSTEM.FastColorUtilities.green(n67) +
                                                                    CWSYSTEM.FastColorUtilities.green(n68) +
                                                                    CWSYSTEM.FastColorUtilities.green(n69) +
                                                                    CWSYSTEM.FastColorUtilities.green(n70) +
                                                                    CWSYSTEM.FastColorUtilities.green(n71) +
                                                                    CWSYSTEM.FastColorUtilities.green(n72)) / 9 | 0) +
                                                                n74 * CWSYSTEM.FastColorUtilities.green(
                                                                    screenData.point[n46][n62])) / 256 | 0),
                                                            (((n73 * (CWSYSTEM.FastColorUtilities.blue(n64) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n65) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n66) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n67) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n68) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n69) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n70) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n71) +
                                                                    CWSYSTEM.FastColorUtilities.blue(n72)) / 9 | 0) +
                                                                n74 * CWSYSTEM.FastColorUtilities.blue(
                                                                    screenData.point[n46][n62])) / 256 | 0));
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
                            const n75 = xPosition - borderWidth;
                            const n76 = yPosition - borderWidth - titleHeight;
                            const n77 = 5;
                            const n78 = xPosition;
                            const n79 = xPosition + currWindow.w;
                            for (let n80 = n76; n80 < n76 + borderWidth + titleHeight + n77; ++n80) {
                                for (let n81 = 0; n81 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n80]; n81 += 2) {
                                    this.copyHorizontalLineToSubframeWithAlphaTransparancy(window4, n80,
                                        Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n80][n81], n78),
                                        Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n80][n81 + 1], n79), n75, n76);
                                }
                            }
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let n82 = yPosition + currWindow.h; n82 < yPosition + currWindow.h + borderWidth; ++n82) {
                                    for (let n83 = 0; n83 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n82]; n83 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparancy(
                                            window4, n82, Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n82][n83], n78),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n82][n83 + 1], n79), n75, n76);
                                    }
                                }
                            }
                            const b4 = xPosition - currWindow.borderWidth;
                            const b5 = xPosition;
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let n84 = n76; n84 < yPosition + currWindow.h + borderWidth; ++n84) {
                                    for (let n85 = 0; n85 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n84]; n85 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparancy(
                                            window4, n84, Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n84][n85], b4),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n84][n85 + 1], b5), n75, n76);
                                    }
                                }
                            }
                            const b6 = currWindow.xPosition + currWindow.w;
                            const b7 = currWindow.xPosition + currWindow.w + currWindow.borderWidth;
                            if (yPosition + currWindow.h + borderWidth < CWSYSTEM.CWUtils.scanLineLength_$LI$().length) {
                                for (let n86 = n76; n86 < yPosition + currWindow.h + borderWidth; ++n86) {
                                    for (let n87 = 0; n87 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n86]; n87 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparancy(window4, n86,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n86][n87], b6),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n86][n87 + 1], b7), n75, n76);
                                    }
                                }
                            }
                        }
                        if (currWindow.hasInterfaceElements) {
                            const window5 = currWindow.window;
                            const n88 = currWindow.h + 2 * borderWidth + titleHeight;
                            const n89 = xPosition - borderWidth;
                            const n90 = yPosition - borderWidth - titleHeight;
                            const b8 = xPosition - borderWidth;
                            const b9 = xPosition + currWindow.w + borderWidth;
                            try {
                                for (let n91 = n90; n91 < n90 + n88; ++n91) {
                                    for (let n92 = 0; n92 < CWSYSTEM.CWUtils.scanLineLength_$LI$()[n91]; n92 += 2) {
                                        this.copyHorizontalLineToSubframeWithAlphaTransparancy(window5, n91,
                                            Math.max(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n91][n92], b8),
                                            Math.min(CWSYSTEM.CWUtils.multiSegmentScanLine_$LI$()[n91][n92 + 1], b9),
                                            n89, n90);
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

        /** @private */
        copyHorizontalLineToSubframeWithAlphaTransparancy(screenData, n, n2, n3, n4, n5) {
            const screenData2 = this.subFrame[this.subFrameCount];
            try {
                for (let i = n2; i < n3; ++i) {
                    const n6 = i - n4;
                    const n7 = n - n5;
                    const alpha = CWSYSTEM.FastColorUtilities.alpha(screenData.point[n7][n6]);
                    const alphaCalc = 255 - alpha;
                    screenData2.point[n][i] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                        ((alpha * CWSYSTEM.FastColorUtilities.red(screenData.point[n7][n6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.red(screenData2.point[n][i])) / 256 | 0),
                        ((alpha * CWSYSTEM.FastColorUtilities.green(screenData.point[n7][n6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.green(screenData2.point[n][i])) / 256 | 0),
                        ((alpha * CWSYSTEM.FastColorUtilities.blue(screenData.point[n7][n6]) + alphaCalc *
                            CWSYSTEM.FastColorUtilities.blue(screenData2.point[n][i])) / 256 | 0));
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
                        CWSYSTEM.CWUtils.copyArray(this.subFrame[0].point[i], 0, this.actualScreen.point[i], 0, width);
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
                    for (let n2 = 0; n2 < height; ++n2) {
                        for (let n3 = 0; n3 < width; ++n3) {
                            this.actualScreen.point[n2][n3] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[n2][n3])) / 4 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[n2][n3])) / 4 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[n2][n3]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[n2][n3])) / 4 | 0));
                        }
                    }
                    break;
                }
                case 5: {
                    for (let n4 = 0; n4 < height; ++n4) {
                        for (let n5 = 0; n5 < width; ++n5) {
                            this.actualScreen.point[n4][n5] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[4].point[n4][n5])) / 5 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[4].point[n4][n5])) / 5 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[n4][n5]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[4].point[n4][n5])) / 5 | 0));
                        }
                    }
                    break;
                }
                case 6: {
                    for (let n6 = 0; n6 < height; ++n6) {
                        for (let n7 = 0; n7 < width; ++n7) {
                            this.actualScreen.point[n6][n7] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                ((CWSYSTEM.FastColorUtilities.red(this.subFrame[0].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[1].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[2].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[3].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[4].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.red(this.subFrame[5].point[n6][n7])) / 6 | 0),
                                ((CWSYSTEM.FastColorUtilities.green(this.subFrame[0].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[1].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[2].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[3].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[4].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.green(this.subFrame[5].point[n6][n7])) / 6 | 0),
                                ((CWSYSTEM.FastColorUtilities.blue(this.subFrame[0].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[1].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[2].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[3].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[4].point[n6][n7]) +
                                    CWSYSTEM.FastColorUtilities.blue(this.subFrame[5].point[n6][n7])) / 6 | 0));
                        }
                    }
                    break;
                }
                default: {
                    for (let n8 = 0; n8 < height; ++n8) {
                        for (let n9 = 0; n9 < width; ++n9) {
                            let n10 = 0;
                            let n11 = 0;
                            let n12 = 0;
                            for (let n13 = 0; n13 < this.subFrames; ++n13) {
                                n10 += CWSYSTEM.FastColorUtilities.red(this.subFrame[n13].point[n8][n9]);
                                n11 += CWSYSTEM.FastColorUtilities.green(this.subFrame[n13].point[n8][n9]);
                                n12 += CWSYSTEM.FastColorUtilities.blue(this.subFrame[n13].point[n8][n9]);
                            }
                            this.actualScreen.point[n8][n9] = CWSYSTEM.FastColorUtilities.color$r$g$b(
                                (n10 / this.subFrames | 0), (n11 / this.subFrames | 0), (n12 / this.subFrames | 0));
                        }
                    }
                    break;
                }
            }
            return true;
        }

        /** @private */
        updatePhysicalScreen(bufferedImage) {
            const width = this.actualScreen.width;
            const height = this.actualScreen.height;
            if (CWSYSTEM.Environment.screenHasChanged) {
                CWSYSTEM.Environment.furtherRendering = this.subFrames;
            }
            const data = bufferedImage.data; // RGBA format
            const width2 = bufferedImage.width;
            const height2 = bufferedImage.height;

            let imageData = ([]);
            for (let i = 0; i < data.length; i += 4) {
                imageData.push(CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                    data[i + 0], data[i + 1], data[i + 2], data[i + 3]));
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

        drawString$n$s$n2$n3(n, s, n2, n3) {
            CWSYSTEM.Environment.screenHasChanged = true;
            return this.drawText(null, n, s, n2, n3, false, true);
        }

        drawString$sd$n$s$n2$n3$b(screenData, x, text, padX, y, b) {
            this.drawText(screenData, x, text, padX, y, b, false);
        }

        drawString(screenData, n, s, n2, n3, b) {
            if (((screenData != null && screenData instanceof CWSYSTEM.ScreenData) || screenData === null) &&
                ((typeof n === 'number') || n === null) && ((typeof s === 'string') || s === null) &&
                ((typeof n2 === 'number') || n2 === null) && ((typeof n3 === 'number') || n3 === null) &&
                ((typeof b === 'boolean') || b === null)) {
                return this.drawString$sd$n$s$n2$n3$b(screenData, n, s, n2, n3, b);
            } else if (((typeof screenData === 'number') || screenData === null) &&
                ((typeof n === 'string') || n === null) && ((typeof s === 'number') || s === null) &&
                ((typeof n2 === 'number') || n2 === null) && n3 === undefined && b === undefined) {
                return this.drawString$n$s$n2$n3(screenData, n, s, n2);
            } else throw new Error('invalid overload');
        }

        /** @private */
        drawText(screenData, n, text, n2, n3, mode1, mode2) {
            const spacing = 35;
            const array = (s => {
                let a = [];
                while (s-- > 0) a.push(null);
                return a;
            })(spacing);
            const charArray = (text).split('');
            const length = text.length;
            let n5 = 0;
            let n6 = 0;
            let n7 = 0;
            let n8;
            if (mode1) {
                n8 = 2;
            } else {
                n8 = 1;
            }
            const s2 = "";
            for (let i = 0; i < length; ++i) {
                let c = charArray[i];
                if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '^'.charCodeAt(0)) {
                    n6 = 0;
                    ++n5;
                } else {
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '\\'.charCodeAt(0) && i + 1 < length) {
                        switch ((charArray[i + 1]).charCodeAt(0)) {
                            case 117 /* 'u' */
                            : {
                                c = '\u0001';
                                ++i;
                                break;
                            }
                            case 100 /* 'd' */
                            : {
                                c = '\u0002';
                                ++i;
                                break;
                            }
                            case 108 /* 'l' */
                            : {
                                c = '\u0003';
                                ++i;
                                break;
                            }
                            case 114 /* 'r' */
                            : {
                                c = '\u0004';
                                ++i;
                                break;
                            }
                            case 95 /* '_' */
                            : {
                                c = '_';
                                n6 -= 6 + n8 - 1;
                                n7 = 1;
                                ++i;
                                break;
                            }
                        }
                    }
                    let n9 = 0;
                    if (n7 !== 0) {
                        n9 = 2;
                        n7 = 0;
                    }
                    if (!mode2) {
                        const character = CWSYSTEM.CWFont_SmallFont.getCharacter(c);
                        for (let j = 0; j < spacing; ++j) {
                            if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(character.charAt(j)) === '1'.charCodeAt(0)) {
                                for (let k = 0; k < n8; ++k) {
                                    this.CWDrawPixelWithCropping(screenData, n2 + j % 5 + n6 + k, n3 - 7 + (j / 5 | 0) + n5 * 10 + n9);
                                }
                            }
                        }
                    }
                    n6 += 6 + n8 - 1;
                    if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === ' '.charCodeAt(0)) {
                        let l;
                        for (l = i + 1; l < length; ++l) {
                            c = charArray[l];
                            if ((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === ' '.charCodeAt(0)) {
                                break;
                            }
                        }
                        if (n6 + 6 * (l - (i + 2)) > n) {
                            n6 = 0;
                            ++n5;
                        }
                    }
                    if (((c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '.'.charCodeAt(0) ||
                        (c => c.charCodeAt === null ? c : c.charCodeAt(0))(c) === '-'.charCodeAt(0)) && n6 > n) {
                        n6 = 0;
                        ++n5;
                    }
                }
            }
            return n5;
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

        /** Sets the color using the specified RGBA integer values or a {@link CWColor} number.
         * @param {number|CWColor.color} red - The red component of the color (0-255). Or, a {@link CWColor} number
         * @param {number|null} green - The green component of the color (0-255).
         * @param {number|null} blue - The blue component of the color (0-255).
         * @param {number|null} alpha - The alpha component of the color (0-255).
         * @returns {void} - Returns nothing.
         * @throws {Error} Throws an error if the provided arguments are of invalid types.
         */
        setColor(red, green, blue, alpha) {
            if (((typeof red === 'number') || red === null) && ((typeof green === 'number') || green === null) &&
                ((typeof blue === 'number') || blue === null) && ((typeof alpha === 'number') || alpha === null)) {
                return this.setColorVS$r$g$b$a(red, green, blue, alpha);
            } else if (((red != null && red instanceof CWSYSTEM.CWColor) || red === null) &&
                green === undefined && blue === undefined && alpha === undefined) {
                return this.setColor$intCWColor(red);
            } else if (((typeof red === 'number') || red === null) &&
                green === undefined && blue === undefined && alpha === undefined) {
                return this.setColor$int(red);
            } else throw new Error('invalid overload');
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

        CWDrawPixel(screenData, n, n2) {
            screenData.point[n2][n] = this.defaultColor;
        }

        CWDrawPixelWithCropping(screenData, n, n2) {
            if (n >= 0 && n2 >= 0 && n < screenData.width && n2 < screenData.height) {
                screenData.point[n2][n] = this.defaultColor;
            }
        }

        fastHorizontalLine(screenData, index, i, j, val) {
            try {
                CWSYSTEM.CWUtils.fillArray(screenData.point[i], index, index + j, val)
            } catch (ex) {
                CWSYSTEM.Debug.println("Rendering out of range in fastHorizontalLine(): x=" + index + ", y=" + i +
                    ", length=" + j + ", data.point.length=" + screenData.point.length);
            }
        }

        verticalLine(screenData, i, j, k, n) {
            try {
                CWSYSTEM.Environment.screenHasChanged = true;
                let l = j;
                for (const n2 = j + k; l < n2; ++l) {
                    screenData.point[l][i] = n;
                }
            } catch (ex) {
                CWSYSTEM.Debug.println("Rendering out of range in verticalLine(): x=" + i + ", y=" + j +
                    ", length=" + k + ", datapoint.length=" + screenData.point.length);
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
         * @param {number} n - The x-coordinate of the top-left corner of the rectangle.
         * @param {number} n2 - The y-coordinate of the top-left corner of the rectangle.
         * @param {number} n3 - The width of the rectangle.
         * @param {number} n4 - The height of the rectangle.
         * @param {CWSYSTEM.CWColor} cwColor - The starting color of the gradient.
         * @param {CWSYSTEM.CWColor} cwColor2 - The ending color of the gradient.
         * @param {string} [gradientType='sine'] - The type of gradient. Valid values are 'sine' and 'linear'.
         *                                          Defaults to 'sine'.
         * @throws {Error} If an invalid gradient type is provided.
         */
        CWDrawFilledRectangleWithGradient(screenData, n, n2, n3, n4,
                                          cwColor, cwColor2, gradientType = 'sine') {
            CWSYSTEM.Environment.screenHasChanged = true;
            if (n > screenData.width - 1) {
                n = screenData.width - 1;
            }
            if (n2 > screenData.height - 1) {
                n2 = screenData.height - 1;
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
                for (let i = n2; i < n2 + n4; ++i) {
                    const sin = Math.sin(3.141592653589793 * ((i - n2) / n4));
                    this.fastHorizontalLine(screenData, n, i, n3, CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        ((red + (red2 - red) * sin) | 0), ((green + (green2 - green) * sin) | 0),
                        ((blue + (blue2 - blue) * sin) | 0), ((alpha + (alpha2 - alpha) * sin) | 0)));
                }
            } else if (gradientType === 'linear') {
                for (let i = n2; i < n2 + n4; ++i) {
                    this.fastHorizontalLine(screenData, n, i, n3, CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                        red2 + ((red - red2) * (i - n2) / n4 | 0),
                        green2 + ((green - green2) * (i - n2) / n4 | 0),
                        blue2 + ((blue - blue2) * (i - n2) / n4 | 0),
                        alpha2 + ((alpha - alpha2) * (i - n2) / n4 | 0)));
                }
            } else {
                throw new Error('Invalid gradient type');
            }
        }

        CWDrawRectangleWithCropping(screenData, n, n2, n3, n4) {
            if (n >= 0 && n2 >= 0 && n + n3 < screenData.width && n2 + n4 < screenData.height) {
                this.CWDrawRectangle(screenData, n, n2, n3, n4);
                return;
            }
            for (let i = 0; i < n3; ++i) {
                this.CWDrawPixelWithCropping(screenData, n + i, n2);
                this.CWDrawPixelWithCropping(screenData, n + i, n2 + n4 - 1);
            }
            for (let j = 1; j < n4 - 1; ++j) {
                this.CWDrawPixelWithCropping(screenData, n, n2 + j);
                this.CWDrawPixelWithCropping(screenData, n + n3 - 1, n2 + j);
            }
        }

        CWDrawRectangle(screenData, n, n2, n3, n4) {
            this.verticalLine(screenData, n, n2, n4, this.defaultColor);
            this.verticalLine(screenData, n + n3 - 1, n2, n4, this.defaultColor);
            this.fastHorizontalLine(screenData, n + 1, n2, n3 - 2, this.defaultColor);
            this.fastHorizontalLine(screenData, n + 1, n2 + n4 - 1, n3 - 2, this.defaultColor);
        }

        renderPolygon(screenData, array, n, n2, n3, n4, n5, n6, n7, b, n8, n9, polygon, array2) {
            let n10 = screenData.height - 1;
            let n11 = 0;
            const n12 = n8 - 1;
            if ((n2 < 0.0 && n4 < 0.0 && n6 < 0.0) || (n3 < 0.0 && n5 < 0.0 && n7 < 0.0) ||
                (n2 > n8 && n4 > n8 && n6 > n8) || (n3 > n9 && n5 > n9 && n7 > n9)) {
                return;
            }
            CWSYSTEM.Environment.screenHasChanged = true;
            for (let i = 0; i < 3; ++i) {
                let b2 = false;
                let n13 = 0.0;
                let n14 = 0.0;
                let n15 = 0.0;
                let n16 = 0.0;
                let n17 = 0.0;
                let n18 = 0.0;
                switch ((i)) {
                    case 0: {
                        n13 = n6;
                        n14 = n7;
                        if (n3 === n5) {
                            continue;
                        }
                        if (n3 < n5) {
                            n15 = n2;
                            n16 = n3;
                            n17 = n4;
                            n18 = n5;
                            break;
                        }
                        n15 = n4;
                        n16 = n5;
                        n17 = n2;
                        n18 = n3;
                        break;
                    }
                    case 1: {
                        n13 = n2;
                        n14 = n3;
                        if (n5 === n7) {
                            continue;
                        }
                        if (n5 < n7) {
                            n15 = n4;
                            n16 = n5;
                            n17 = n6;
                            n18 = n7;
                            break;
                        }
                        n15 = n6;
                        n16 = n7;
                        n17 = n4;
                        n18 = n5;
                        break;
                    }
                    default: {
                        n13 = n4;
                        n14 = n5;
                        if (n3 === n7) {
                            continue;
                        }
                        if (n3 < n7) {
                            n15 = n2;
                            n16 = n3;
                            n17 = n6;
                            n18 = n7;
                            break;
                        }
                        n15 = n6;
                        n16 = n7;
                        n17 = n2;
                        n18 = n3;
                        break;
                    }
                }
                const n19 = Math.fround((Math.fround(n17 - n15)) / (Math.fround(n18 - n16)));
                let n20 = ((Math.fround(n16 + 1.0)) | 0);
                let n21;
                if (n20 < 0) {
                    n20 = 0;
                    n21 = Math.fround(n15 + Math.fround((Math.fround(0.0 - n16)) * n19));
                } else {
                    n21 = Math.fround(n15 + Math.fround((Math.fround(n20 - n16)) * n19));
                }
                let n22;
                if (n18 > n9 - 1) {
                    n22 = n9 - 1;
                } else {
                    n22 = (n18 | 0);
                }
                if (n22 > 0 || n20 > 0) {
                    if (n22 < n9 - 1 || n20 < n9 - 1) {
                        if (n20 < n10) {
                            n10 = n20;
                        }
                        if (n22 > n11) {
                            n11 = n22;
                        }
                        const n23 = Math.fround(n21 - Math.fround(n19 * (Math.fround(n20 - n14))));
                        if (Math.abs(Math.fround(n23 - n13)) < 1.0E-4) {
                            return;
                        }
                        if (n23 < n13) {
                            b2 = true;
                        } else if (n23 > n13) {
                            b2 = false;
                        }
                        let n24 = n21;
                        if (b2) {
                            for (let j = n20; j <= n22; ++j) {
                                this.leftScanLine[j] = ((Math.fround(n24 + 1.0)) | 0);
                                n24 += n19;
                            }
                        } else {
                            for (let k = n20; k <= n22; ++k) {
                                this.rightScanLine[k] = (n24 | 0);
                                n24 += n19;
                            }
                        }
                        if (b2) {
                            const n25 = this.leftScanLine[n20];
                            const n26 = this.leftScanLine[n22];
                            if (n26 >= 0.0 && n25 < 0.0) {
                                for (let l = n20; l <= n22; ++l) {
                                    if (this.leftScanLine[l] >= 0) {
                                        break;
                                    }
                                    this.leftScanLine[l] = 0;
                                }
                            } else if (n26 < 0.0 && n25 >= 0.0) {
                                for (let n27 = n22; n27 >= n20; --n27) {
                                    if (this.leftScanLine[n27] >= 0) {
                                        break;
                                    }
                                    this.leftScanLine[n27] = 0;
                                }
                            } else if (n25 < 0.0 && n26 < 0.0) {
                                for (let n28 = n20; n28 <= n22; ++n28) {
                                    this.leftScanLine[n28] = 0;
                                }
                            }
                        } else {
                            const n29 = this.rightScanLine[n20];
                            const n30 = this.rightScanLine[n22];
                            if (n30 <= n12 && n29 > n12) {
                                for (let n31 = n20; n31 <= n22; ++n31) {
                                    if (this.rightScanLine[n31] <= n12) {
                                        break;
                                    }
                                    this.rightScanLine[n31] = n12;
                                }
                            } else if (n30 > n12 && n29 <= n12) {
                                for (let n32 = n22; n32 >= n20; --n32) {
                                    if (this.rightScanLine[n32] <= n12) {
                                        break;
                                    }
                                    this.rightScanLine[n32] = n12;
                                }
                            } else if (n29 > n12 && n30 > n12) {
                                for (let n33 = n20; n33 <= n22; ++n33) {
                                    this.rightScanLine[n33] = n12;
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
                        for (let y34 = n10; y34 <= n11; ++y34) {
                            let x37 = this.leftScanLine[y34];
                            for (const n36 = this.rightScanLine[y34]; x37 <= n36; ++x37) {
                                if (array != null) {
                                    if (n < array[y34][x37]) {
                                        point[y34][x37] = this.defaultColor;
                                        array[y34][x37] = n;
                                    }
                                } else {
                                    point[y34][x37] = this.defaultColor;
                                }
                            }
                        }
                    } else if (array != null) {
                        for (let n38 = n10; n38 <= n11; ++n38) {
                            let n41 = this.leftScanLine[n38];
                            for (const n40 = this.rightScanLine[n38]; n41 <= n40; ++n41) {
                                if (n < array[n38][n41]) {
                                    const n42 = point[n38][n41];
                                    const n43 = 255 - alpha;
                                    point[n38][n41] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(
                                        ((alpha * CWSYSTEM.FastColorUtilities.red(this.defaultColor) + n43 *
                                            CWSYSTEM.FastColorUtilities.red(n42)) / 256 | 0),
                                        ((alpha * CWSYSTEM.FastColorUtilities.green(this.defaultColor) + n43 *
                                            CWSYSTEM.FastColorUtilities.green(n42)) / 256 | 0),
                                        ((alpha * CWSYSTEM.FastColorUtilities.blue(this.defaultColor) + n43 *
                                            CWSYSTEM.FastColorUtilities.blue(n42)) / 256 | 0), 255);
                                    array[n38][n41] = n;
                                }
                            }
                        }
                    } else {
                        for (let n44 = n10; n44 <= n11; ++n44) {
                            let n47 = this.leftScanLine[n44];
                            for (const n46 = this.rightScanLine[n44]; n47 <= n46; ++n47) {
                                const n48 = point[n44][n47];
                                const n49 = 255 - alpha;
                                point[n44][n47] = CWSYSTEM.FastColorUtilities.color$r$g$b$a(((alpha * CWSYSTEM.FastColorUtilities.red(this.defaultColor) + n49 * CWSYSTEM.FastColorUtilities.red(n48)) / 256 | 0), ((alpha * CWSYSTEM.FastColorUtilities.green(this.defaultColor) + n49 * CWSYSTEM.FastColorUtilities.green(n48)) / 256 | 0), ((alpha * CWSYSTEM.FastColorUtilities.blue(this.defaultColor) + n49 * CWSYSTEM.FastColorUtilities.blue(n48)) / 256 | 0), 255);
                            }
                        }
                    }
                } catch (ex) {
                    console.error(ex.message, ex);
                }
            } else {
                for (let n50 = n10; n50 <= n11; ++n50) {
                    const n51 = this.leftScanLine[n50];
                    const n52 = this.rightScanLine[n50];
                    if (n51 <= n52) {
                        for (let n53 = n51; n53 <= n52; ++n53) {
                            if (n < array[n50][n53]) {
                                array2[n50][n53] = polygon;
                                array[n50][n53] = n;
                            }
                        }
                    }
                }
            }
        }

        CWLine(screenData, x1, y1, x2, y2, b) {
            CWSYSTEM.Environment.screenHasChanged = true;
            if (x1 < 0 && x2 < 0) {
                return;
            }
            if (y1 < 0 && y2 < 0) {
                return;
            }
            if (x1 >= screenData.width && x2 >= screenData.width) {
                return;
            }
            if (y1 >= screenData.height && y2 >= screenData.height) {
                return;
            }
            const n5 = x2 - x1;
            const n6 = y2 - y1;
            if (n6 >= 0) {
                if (n5 > 0) {
                    if (n5 > n6) {
                        this.octant0(screenData, x1, y1, n5, n6, 1, 1);
                    } else {
                        this.octant1(screenData, x1, y1, n5, n6, 1, 1);
                    }
                } else {
                    const n7 = -n5;
                    if (n7 > n6) {
                        this.octant0(screenData, x1, y1, n7, n6, -1, 1);
                    } else {
                        this.octant1(screenData, x1, y1, n7, n6, -1, 1);
                    }
                }
            } else {
                const n8 = -n6;
                if (n5 > 0) {
                    if (n5 > n8) {
                        this.octant0(screenData, x1, y1, n5, n8, 1, -1);
                    } else {
                        this.octant1(screenData, x1, y1, n5, n8, 1, -1);
                    }
                } else {
                    const n9 = -n5;
                    if (n9 > n8) {
                        this.octant0(screenData, x1, y1, n9, n8, -1, -1);
                    } else {
                        this.octant1(screenData, x1, y1, n9, n8, -1, -1);
                    }
                }
            }
            if (b) {
                //CWSYSTEM.Debug.println("line true");
            }
        }

        /** @private */
        octant0(screenData, n, n2, n3, n4, n5, n6) {
            const n7 = n4 * 2;
            const n8 = n7 - n3 * 2;
            let n9 = n7 - n3;
            this.CWDrawPixelWithCropping(screenData, n, n2);
            while ((n3-- > 0)) {
                if (n9 >= 0) {
                    n2 += n6;
                    n9 += n8;
                } else {
                    n9 += n7;
                }
                n += n5;
                this.CWDrawPixelWithCropping(screenData, n, n2);
            }
        }

        /** @private */
        octant1(screenData, n, n2, n3, n4, n5, n6) {
            const n7 = n3 * 2;
            const n8 = n7 - n4 * 2;
            let n9 = n7 - n4;
            this.CWDrawPixelWithCropping(screenData, n, n2);
            while ((n4-- > 0)) {
                if (n9 >= 0) {
                    n += n5;
                    n9 += n8;
                } else {
                    n9 += n7;
                }
                n2 += n6;
                this.CWDrawPixelWithCropping(screenData, n, n2);
            }
        }

        JCCircle(screenData, n, n2, n3, color, b) {
            CWSYSTEM.Environment.screenHasChanged = true;
            let i = 0;
            let n4 = n3;
            let n5 = ((5 - n3 * 4) / 4 | 0);
            this.setColor$intCWColor(color);
            if (b) {
                this.circlePointsWithCropping(screenData, n, n2, i, n4);
            } else {
                this.circlePoints(screenData, n, n2, i, n4);
            }
            while ((i < n4)) {

                ++i;
                if (n5 < 0) {
                    n5 += 2 * i + 1;
                } else {
                    --n4;
                    n5 += 2 * (i - n4) + 1;
                }
                if (b) {
                    this.circlePointsWithCropping(screenData, n, n2, i, n4);
                } else {
                    this.circlePoints(screenData, n, n2, i, n4);
                }
            }
        }

        /** @private */
        circlePoints(screenData, n, n2, n3, n4) {
            if (n3 === 0) {
                this.CWDrawPixel(screenData, n, n2 + n4);
                this.CWDrawPixel(screenData, n, n2 - n4);
                this.CWDrawPixel(screenData, n + n4, n2);
                this.CWDrawPixel(screenData, n - n4, n2);
            } else if (n3 === n4) {
                this.CWDrawPixel(screenData, n + n3, n2 + n4);
                this.CWDrawPixel(screenData, n - n3, n2 + n4);
                this.CWDrawPixel(screenData, n + n3, n2 - n4);
                this.CWDrawPixel(screenData, n - n3, n2 - n4);
            } else if (n3 < n4) {
                this.CWDrawPixel(screenData, n + n3, n2 + n4);
                this.CWDrawPixel(screenData, n - n3, n2 + n4);
                this.CWDrawPixel(screenData, n + n3, n2 - n4);
                this.CWDrawPixel(screenData, n - n3, n2 - n4);
                this.CWDrawPixel(screenData, n + n4, n2 + n3);
                this.CWDrawPixel(screenData, n - n4, n2 + n3);
                this.CWDrawPixel(screenData, n + n4, n2 - n3);
                this.CWDrawPixel(screenData, n - n4, n2 - n3);
            }
        }

        /** @private */
        circlePointsWithCropping(screenData, n, n2, n3, n4) {
            if (n3 === 0) {
                this.CWDrawPixelWithCropping(screenData, n, n2 + n4);
                this.CWDrawPixelWithCropping(screenData, n, n2 - n4);
                this.CWDrawPixelWithCropping(screenData, n + n4, n2);
                this.CWDrawPixelWithCropping(screenData, n - n4, n2);
            } else if (n3 === n4) {
                this.CWDrawPixelWithCropping(screenData, n + n3, n2 + n4);
                this.CWDrawPixelWithCropping(screenData, n - n3, n2 + n4);
                this.CWDrawPixelWithCropping(screenData, n + n3, n2 - n4);
                this.CWDrawPixelWithCropping(screenData, n - n3, n2 - n4);
            } else if (n3 < n4) {
                this.CWDrawPixelWithCropping(screenData, n + n3, n2 + n4);
                this.CWDrawPixelWithCropping(screenData, n - n3, n2 + n4);
                this.CWDrawPixelWithCropping(screenData, n + n3, n2 - n4);
                this.CWDrawPixelWithCropping(screenData, n - n3, n2 - n4);
                this.CWDrawPixelWithCropping(screenData, n + n4, n2 + n3);
                this.CWDrawPixelWithCropping(screenData, n - n4, n2 + n3);
                this.CWDrawPixelWithCropping(screenData, n + n4, n2 - n3);
                this.CWDrawPixelWithCropping(screenData, n - n4, n2 - n3);
            }
        }
    }

    CWSYSTEM.VirtualScreen = VirtualScreen;
    VirtualScreen["__class"] = "CWSYSTEM.VirtualScreen";
})(CWSYSTEM || (CWSYSTEM = {}));
