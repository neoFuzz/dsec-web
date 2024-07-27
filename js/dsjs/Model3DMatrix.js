(function (dsector) {
    /**
     * Imports 3DMatrix XML model files. Re-written from Java.
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
    class Model3DMatrix {
        /**
         * Constructor for the Model3DMatrix class.
         *
         * @param {string} file - The file path to load the model from, or undefined to create a new model.
         */
        constructor(file) {
            this.totalPolygonAreaWhenModelLoaded = null;
            this.totalNumberOfPolygonsWhenModelLoaded = null;
            this.__maximumDistanceOfVertexToCenterWhenModelLoaded = 0;
            this.name = null;
            this.absoluteFilepath = null;
            this.rootFolder = null;
            this.XMLFormatError = null;

            if ((typeof file === 'string') || file === null) {
                this.resetModelLoadStatistics();
                this.createModelFromFile(file);
                this.activateFirstPolygonGroup();
            } else if (file === undefined) {
                this.resetModelLoadStatistics();
                this.createNewModel();
                this.activateFirstPolygonGroup();
            } else {
                throw new Error('invalid overload');
            }
        }

        /**
         * Get child nodes by tag name.
         *
         * @static
         * @param {Element} element1 - The parent element.
         * @param {string} name - The tag name to search for.
         * @returns {Element[]} An array of matching child elements.
         */
        static getChildNodesByTagName(element1, name) {
            const childNodes = element1.childNodes;
            const arrayList = ([]);
            for (let i = 0; i < childNodes.length; ++i) {
                let xmlelement = null;
                try {
                    xmlelement = childNodes;
                } catch (e) {
                    continue;
                }
                let tagName = xmlelement[i].nodeName;
                if (tagName.includes("#")) {
                    tagName = tagName.substring(1)
                }
                if (tagName != null && ((o1, o2) => o1.toUpperCase() === (
                    o2 === null ? o2 : o2.toUpperCase()))(tagName, name)) {
                    arrayList.push(xmlelement[i]);
                }
            }
            return arrayList;
        }

        /**
         * Calculate the area of a polygon.
         *
         * @static
         * @param {number} x2 - X coordinate of the second vertex.
         * @param {number} y2 - Y coordinate of the second vertex.
         * @param {number} z2 - Z coordinate of the second vertex.
         * @param {number} x1 - X coordinate of the first vertex.
         * @param {number} y1 - Y coordinate of the first vertex.
         * @param {number} z1 - Z coordinate of the first vertex.
         * @param {number} x3 - X coordinate of the third vertex.
         * @param {number} y3 - Y coordinate of the third vertex.
         * @param {number} z3 - Z coordinate of the third vertex.
         * @returns {number} The area of the polygon.
         */
        static polygonArea(x2, y2, z2, x1, y1, z1, x3, y3, z3) {
            const vectorInR3 = new dsector.VectorInR3(Math.fround(x1 - x2), Math.fround(y1 - y2),
                Math.fround(z1 - z2));
            const vectorInR31 = new dsector.VectorInR3(Math.fround(x3 - x2), Math.fround(y3 - y2),
                Math.fround(z3 - z2));
            vectorInR3.crossProduct(vectorInR31);
            const length = vectorInR3.length();
            return length / 2.0;
        }

        /**
         * Get the Detail Category number from the PolygonGroup's name.
         *
         * @static
         * @param {string} name - The name of the PolygonGroup.
         * @returns {number} The Detail Category number.
         */
        static getDetailCategoryFromPolygonGroupName(name) {
            let detail = 0;
            try {
                const map = CWSYSTEM.CWStringTools.getNameAndValueParametersFromLine(name, ' ', '=');
                if (map.get("detail") != null) {
                    detail = parseInt(("" + map.get("detail")));
                }
            } catch (e) {
                CWSYSTEM.Debug.println("Detail Category Error: " + e.message);
            }
            return detail;
        }

        /**
         * Calculate the average polygon area when the model was loaded.
         *
         * @param {number} model - The model index.
         * @returns {number} The average polygon area.
         */
        averagePolygonAreaWhenModelLoaded(model) {
            return this.totalNumberOfPolygonsWhenModelLoaded[model] === 0 ? -1.0 : Math.fround(
                (this.totalPolygonAreaWhenModelLoaded[model] / this.totalNumberOfPolygonsWhenModelLoaded[model]) / 3.0);
        }

        /**
         * Get the maximum distance of a vertex to the center when the model was loaded.
         *
         * @returns {number} The maximum distance.
         */
        maximumDistanceOfVertexToCenterWhenModelLoaded() {
            return this.__maximumDistanceOfVertexToCenterWhenModelLoaded;
        }

        /**
         * Reset model load statistics.
         *
         * @private
         */
        resetModelLoadStatistics() {
            this.__maximumDistanceOfVertexToCenterWhenModelLoaded = 0.0;
            this.totalPolygonAreaWhenModelLoaded = [0, 0, 0, 0, 0, 0];
            this.totalNumberOfPolygonsWhenModelLoaded = [0, 0, 0, 0, 0, 0];
        }

        /**
         * Create a model from a file.
         *
         * @private
         * @param {string} filePath - The path to the model file.
         */
        createModelFromFile(filePath) {
            let xmldoc;
            try { // Since XML processing is built in to Web browsers, we can just retrieve the XML file using the filePath
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", filePath, false);
                xmlHttp.send();
                xmldoc = xmlHttp.responseXML;
            } catch (e) {
                xmldoc = null;
            }
            if (xmldoc == null && filePath !== "") {
                // Display an error
                dsector.DSReference.alertManager.messageQueued("There was a problem trying to restore '" + filePath +
                    "'.\nError M3DM01:\n" + this.XMLFormatError);
                this.createNewModelWithLights();
            } else if (!this.build3DModelFromDocument(xmldoc)) {
                dsector.DSReference.alertManager.messageQueued('Invalid 3DMatrix XML file format with "' + filePath +
                    '".\nError M3DM02:\n' + this.XMLFormatError);
                this.createNewModelWithLights();
            } else {
                // Missing code from Java conversion, has to do with creating blank models.
                //const file = filePath;
                //File file = new File(filePath); this.name = file.getName();
                this.absoluteFilepath = filePath;
            }
            xmldoc = null;
            this.activateFirstPolygonGroup();
        }

        /**
         * Activate the first polygon group.
         */
        activateFirstPolygonGroup() {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            const polygonGroup = polygonIterator.nextPolygonGroup();
            if (polygonGroup != null) {
                polygonGroup.directRepresentation.active = true;
            }
        }

        /**
         * Create a new model.
         */
        createNewModel() {
            this.name = "Untitled";
            this.absoluteFilepath = null;
            this.rootFolder = new dsector.ModelFolder("Untitled", null);
            const polygonGroup = new dsector.PolygonGroup("Untitled Polygon Group",
                this.rootFolder, true, "Direct Representation", true,
                5, 30, 10);
            this.rootFolder.polygonGroups.push(polygonGroup);
        }

        /**
         * Create a new model with lights.
         */
        createNewModelWithLights() {
            this.createNewModel();
            let inbuiltLight;
            inbuiltLight = new dsector.InbuiltLight(this.rootFolder, "Untitled Light", true,
                -200.0, 200.0, 500.0, 40.0, 40.0, 40.0);
            this.rootFolder.inbuiltLights.push(inbuiltLight);
            inbuiltLight = new dsector.InbuiltLight(this.rootFolder, "Untitled Light", true,
                1000.0, -500.0, 100.0, 5.0, 20.0, 20.0);
            this.rootFolder.inbuiltLights.push(inbuiltLight);
            inbuiltLight = new dsector.InbuiltLight(this.rootFolder, "Untitled Light", true,
                100.0, 1000.0, -500.0, 5.0, 10.0, 30.0);
            this.rootFolder.inbuiltLights.push(inbuiltLight);
        }

        /**
         * Build a 3D model from an XML document.
         *
         * @param {Document} xdocument - The XML document.
         * @returns {boolean} True if the model was built successfully, false otherwise.
         */
        build3DModelFromDocument(xdocument) {
            this.XMLFormatError = "";
            const element = xdocument.firstChild; // seems to match Document.getDocumentElement() close enough
            if (element.tagName.toLowerCase() !== "model3DMatrix".toLowerCase()) {
                this.XMLFormatError =
                    "The tag <model3DMatrix name=\"Filename\"> was not found at the root level of the XML file. ";
                return false;
            } else {
                const arrayList1 = Model3DMatrix.getChildNodesByTagName(element, "folder");
                if (arrayList1.length === 0) {
                    this.XMLFormatError = "There were no <folder name=\"folderName\"> tags found under the model3DMatrix tag. ";
                    return false;
                } else if (arrayList1.length > 1) {
                    this.XMLFormatError = "There were " + arrayList1.length + " <folder name=\"folderName\"> tags " +
                        "found under the model3DMatrix tag. You can have any number of folders within folders however " +
                        "there must be only one root folder within the model3DMatrix tag. ";
                    return false;
                } else {
                    const element2 = arrayList1[0];
                    if (element2 == null) {
                        this.XMLFormatError = "The (root) folder tag within the model3DMatrix tag does not have a name attribute. ";
                        return false;
                    } else {
                        return this.build3DModelFromFolder(element, null);
                    }
                }
            }
        }

        /**
         * Build a 3D model from an XML folder element.
         *
         * @param {Element} element - The XML folder element.
         * @param {dsector.ModelFolder|null} modelFolder - The parent model folder.
         * @returns {boolean} True if the model was built successfully, false otherwise.
         */
        build3DModelFromFolder(element, modelFolder) {
            let arrayList;
            let i;
            let element1;
            let name1;
            let str;
            if (modelFolder != null) {
                arrayList = Model3DMatrix.getChildNodesByTagName(element, "polygonGroup");
                let attribute;
                let attrVis;
                let dLds;
                for (i = 0; i < arrayList.length; ++i) {
                    element1 = arrayList[i];
                    name1 = element1.getAttribute("name"); //name1 = element1.getAttribute("name");
                    if (name1 == null) {
                        this.XMLFormatError = "A \'polygonGroup\' tag in the folder \'" + element +
                            "\' is missing the \'name\' attribute. ";
                        return false;
                    }
                    const polygonGroupName = Model3DMatrix.getDetailCategoryFromPolygonGroupName(name1);
                    attribute = element1.getAttribute("visibility");
                    if (attribute === ("")) {
                        this.XMLFormatError = "The polygonGroup " + name1 + " in the polygonGroup \'" + name1 +
                            "\' does not have a valid \'visibility\' boolean attribute. ";
                        return false;
                    }
                    attrVis = CWSYSTEM.CWStringTools.stringToBoolean(attribute);
                    const reflection = element1.getAttribute("reflection");
                    let base = Model3DMatrix.maximumDetailCategoryValue;
                    try {
                        base = parseInt(reflection);
                    } catch (e) {
                        CWSYSTEM.Debug.println("parseInt error in Model3DMatrix");
                    }
                    const directionSensitivity = element1.getAttribute("dispersedLightDirectionSensitivity");
                    dLds = 10;
                    try {
                        dLds = parseInt(directionSensitivity);
                    } catch (e) {
                        CWSYSTEM.Debug.println("dLds parseInt error in Model3DMatrix");
                    }
                    const sensitivity = element1.getAttribute("reflectedLightDirectionSensitivity");
                    let rLds = 30;
                    try {
                        rLds = parseInt(sensitivity);
                    } catch (e) {
                        CWSYSTEM.Debug.println("sensitivity parseInt error in Model3DMatrix");
                    }
                    const dRVisibility = element1.getAttribute("directRepresentationVisibility");
                    if (dRVisibility === ("")) {
                        this.XMLFormatError = "The polygonGroup " + name1 + " in the polygonGroup \'" + name1 +
                            "\' does not have a valid \'directRepresentationVisibility\' boolean attribute. ";
                        return false;
                    }
                    const boolDRV = CWSYSTEM.CWStringTools.stringToBoolean(dRVisibility);
                    const polygonGroup = new dsector.PolygonGroup(name1, modelFolder,
                        attrVis, "Direct Representation", boolDRV, base, rLds, dLds);
                    modelFolder.polygonGroups.push(polygonGroup);
                    const alPolygon = Model3DMatrix.getChildNodesByTagName(element1, "polygon");
                    let y1;
                    let z1;
                    let x2;
                    let y2;
                    let z2;
                    let x3;
                    let y3;
                    let z3;
                    for (let j = 0; j < alPolygon.length; ++j) {
                        const element2 = alPolygon[j];
                        let x1 = 0.0;
                        y1 = 0.0;
                        z1 = 0.0;
                        x2 = 0.0;
                        y2 = 0.0;
                        z2 = 0.0;
                        x3 = 0.0;
                        y3 = 0.0;
                        z3 = 0.0;
                        try {
                            x1 = parseFloat(element2.getAttribute("x1"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'x1\' attribute. ";
                            return false;
                        }
                        try {
                            y1 = parseFloat(element2.getAttribute("y1"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'y1\' attribute. ";
                            return false;
                        }
                        try {
                            z1 = parseFloat(element2.getAttribute("z1"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'z1\' attribute. ";
                            return false;
                        }
                        try {
                            x2 = parseFloat(element2.getAttribute("x2"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'x2\' attribute. ";
                            return false;
                        }
                        try {
                            y2 = parseFloat(element2.getAttribute("y2"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'y2\' attribute. ";
                            return false;
                        }
                        try {
                            z2 = parseFloat(element2.getAttribute("z2"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'z2\' attribute. ";
                            return false;
                        }
                        try {
                            x3 = parseFloat(element2.getAttribute("x3"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'x3\' attribute. ";
                            return false;
                        }
                        try {
                            y3 = parseFloat(element2.getAttribute("y3"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'y3\' attribute. ";
                            return false;
                        }
                        try {
                            z3 = parseFloat(element2.getAttribute("z3"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'z3\' attribute. ";
                            return false;
                        }
                        let red;
                        try {
                            red = parseInt(element2.getAttribute("red"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'red\' attribute. ";
                            return false;
                        }
                        let green;
                        try {
                            green = parseInt(element2.getAttribute("green"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'green\' attribute. ";
                            return false;
                        }
                        let blue;
                        try {
                            blue = parseInt(element2.getAttribute("blue"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'blue\' attribute. ";
                            return false;
                        }
                        let alpha;
                        try {
                            alpha = parseInt(element2.getAttribute("alpha"));
                        } catch (e) {
                            this.XMLFormatError = "Polygon # " + (j + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'alpha\' attribute. ";
                            return false;
                        }
                        const polygon = new dsector.Polygon(new dsector.Vertex(x1, y1, z1),
                            new dsector.Vertex(x2, y2, z2), new dsector.Vertex(x3, y3, z3),
                            new CWSYSTEM.CWColor(red, green, blue, alpha));
                        this.addPolygon(polygonGroup, polygon, polygonGroupName);
                    }
                    const alRepresentation = Model3DMatrix.getChildNodesByTagName(element1, "representation");
                    for (let k = 0; k < alRepresentation.length; ++k) {
                        const element2 = alRepresentation[k];
                        y1 = 0.0;
                        z1 = 0.0;
                        x2 = 0.0;
                        y2 = 0.0;
                        z2 = 0.0;
                        x3 = 0.0;
                        y3 = 0.0;
                        z3 = 0.0;
                        let m20 = 0.0;
                        let m21 = 0.0;
                        let m22 = 0.0;
                        let m23 = 0.0;
                        let m30 = 0.0;
                        let m31 = 0.0;
                        let m32 = 0.0;
                        let m33 = 0.0;
                        try {
                            y1 = parseFloat(element2.getAttribute("m00"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m00\' attribute. ";
                            return false;
                        }
                        try {
                            z1 = parseFloat(element2.getAttribute("m01"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m01\' attribute. ";
                            return false;
                        }
                        try {
                            x2 = parseFloat(element2.getAttribute("m02"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m02\' attribute. ";
                            return false;
                        }
                        try {
                            y2 = parseFloat(element2.getAttribute("m03"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m03\' attribute. ";
                            return false;
                        }
                        try {
                            z2 = parseFloat(element2.getAttribute("m10"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m10\' attribute. ";
                            return false;
                        }
                        try {
                            x3 = parseFloat(element2.getAttribute("m11"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m11\' attribute. ";
                            return false;
                        }
                        try {
                            y3 = parseFloat(element2.getAttribute("m12"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m12\' attribute. ";
                            return false;
                        }
                        try {
                            z3 = parseFloat(element2.getAttribute("m13"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m13\' attribute. ";
                            return false;
                        }
                        try {
                            m20 = parseFloat(element2.getAttribute("m20"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m20\' attribute. ";
                            return false;
                        }
                        try {
                            m21 = parseFloat(element2.getAttribute("m21"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m21\' attribute. ";
                            return false;
                        }
                        try {
                            m22 = parseFloat(element2.getAttribute("m22"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m22\' attribute. ";
                            return false;
                        }
                        try {
                            m23 = parseFloat(element2.getAttribute("m23"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m23\' attribute. ";
                            return false;
                        }
                        try {
                            m30 = parseFloat(element2.getAttribute("m30"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m30\' attribute. ";
                            return false;
                        }
                        try {
                            m31 = parseFloat(element2.getAttribute("m31"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m31\' attribute. ";
                            return false;
                        }
                        try {
                            m32 = parseFloat(element2.getAttribute("m32"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m32\' attribute. ";
                            return false;
                        }
                        try {
                            m33 = parseFloat(element2.getAttribute("m33"));
                        } catch (e) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' has an invalid or missing \'m33\' attribute. ";
                            return false;
                        }
                        const nameElement = element2.getAttribute("name");
                        const visibility = element2.getAttribute("visibility");
                        if (visibility === ("")) {
                            this.XMLFormatError = "Representation # " + (k + 1) + " in the polygonGroup \'" + name1 +
                                "\' does not have a valid \'visibility\' boolean attribute. ";
                            return false;
                        }
                        const boolWord = CWSYSTEM.CWStringTools.stringToBoolean(visibility);
                        const pgr = new dsector.PolygonGroupRepresentation(polygonGroup,
                            nameElement, boolWord, y1, z1, x2, y2, z2, x3, y3, z3,
                            m20, m21, m22, m23, m30, m31, m32, m33);
                        polygonGroup.transposedRepresentations.push(pgr);
                    }
                }
                const alLight = Model3DMatrix.getChildNodesByTagName(element, "light");
                let fAxis1;
                let fAxis2;
                let fAxisZ;
                for (let l = 0; l < alLight.length; ++l) {
                    const element2 = alLight[l];
                    str = element2.getAttribute("name");
                    if (str === ("")) {
                        this.XMLFormatError = "A \'light\' tag under the parent \'" + element +
                            "\' is missing the \'name\' attribute. ";
                        return false;
                    }
                    const visibility = CWSYSTEM.CWStringTools.stringToBoolean(element2.getAttribute("visibility"));
                    let fltX = 0.0;
                    fAxis1 = 0.0;
                    fAxis2 = 0.0;
                    fAxisZ = 0.0;
                    let blue = 0.0;
                    let green = 0.0;
                    try {
                        fltX = parseFloat(element2.getAttribute("x"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'x\' attribute. ";
                        return false;
                    }
                    try {
                        fAxis1 = parseFloat(element2.getAttribute("y"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'y\' attribute. ";
                        return false;
                    }
                    try {
                        fAxis2 = parseFloat(element2.getAttribute("z"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'z\' attribute. ";
                        return false;
                    }
                    try {
                        fAxisZ = parseFloat(element2.getAttribute("red"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'red\' attribute. ";
                        return false;
                    }
                    try {
                        green = parseFloat(element2.getAttribute("green"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'green\' attribute. ";
                        return false;
                    }
                    try {
                        blue = parseFloat(element2.getAttribute("blue"));
                    } catch (e) {
                        this.XMLFormatError = "Light \'" + str + "\' in the folder \'" + modelFolder.name +
                            "\' has an invalid or missing \'blue\' attribute. ";
                        return false;
                    }
                    const inbuiltLight = new dsector.InbuiltLight(modelFolder, str, visibility, fltX,
                        fAxis1, fAxis2, fAxisZ, green, blue);
                    modelFolder.inbuiltLights.push(inbuiltLight);
                }
                const alSpecialPoint = Model3DMatrix.getChildNodesByTagName(element, "specialPoint");
                for (let m = 0; m < alSpecialPoint.length; ++m) {
                    const element2 = alSpecialPoint[m];
                    attribute = element2.getAttribute("name");
                    if (attribute === ("")) {
                        this.XMLFormatError = "A \'specialPoint\' tag under the parent \'" + element +
                            "\' is missing the \'name\' attribute. ";
                        return false;
                    }
                    attrVis = CWSYSTEM.CWStringTools.stringToBoolean(element2.getAttribute("visibility"));
                    fAxis1 = 0.0;
                    fAxis2 = 0.0;
                    fAxisZ = 0.0;
                    dLds = 255;
                    let green1 = 255;
                    const blue2 = 255;
                    try {
                        fAxis1 = parseFloat(element2.getAttribute("x"));
                    } catch (e) {
                        this.XMLFormatError = "SpecialPoint \'" + attribute + "\' in the folder \'" +
                            modelFolder.name + "\' has an invalid or missing \'x\' attribute. ";
                        return false;
                    }
                    try {
                        fAxis2 = parseFloat(element2.getAttribute("y"));
                    } catch (e) {
                        this.XMLFormatError = "SpecialPoint \'" + attribute + "\' in the folder \'" +
                            modelFolder.name + "\' has an invalid or missing \'y\' attribute. ";
                        return false;
                    }
                    try {
                        fAxisZ = parseFloat(element2.getAttribute("z"));
                    } catch (e) {
                        this.XMLFormatError = "SpecialPoint \'" + attribute + "\' in the folder \'" +
                            modelFolder.name + "\' has an invalid or missing \'z\' attribute. ";
                        return false;
                    }
                    try {
                        dLds = parseInt(element2.getAttribute("red"));
                    } catch (e) {
                    }
                    try {
                        green1 = parseInt(element2.getAttribute("green"));
                    } catch (e) {
                    }
                    try {
                        dLds = parseInt(element2.getAttribute("blue"));
                    } catch (e) {
                    }
                    const specialPoint = new dsector.SpecialPoint(modelFolder, attribute, attrVis,
                        fAxis1, fAxis2, fAxisZ, dLds, green1, blue2);
                    modelFolder.specialPoints.push(specialPoint);
                }
            }
            arrayList = Model3DMatrix.getChildNodesByTagName(element, "folder");
            for (i = 0; i < arrayList.length; ++i) {
                element1 = arrayList[i];
                name1 = null;
                let modelFolder1;
                if (modelFolder != null) {
                    str = element1.getAttribute("name");
                    if (str === ("")) {
                        this.XMLFormatError = "A folder under the parent \'" + element +
                            "\' is missing the \'name\' attribute. ";
                        return false;
                    }
                    modelFolder1 = new dsector.ModelFolder(str, modelFolder);
                    modelFolder.modelFolders.push(modelFolder1);
                } else {
                    modelFolder1 = new dsector.ModelFolder("Root", null);
                    this.rootFolder = modelFolder1;
                }
                const b = this.build3DModelFromFolder(element1, modelFolder1);
                if (!b) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Get a model folder by its ID.
         *
         * @param {number} folderId - The ID of the folder.
         * @returns {dsector.ModelFolder|null} The model folder, or null if not found.
         */
        getModelFolderFromID(folderId) {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            let modelFolder;
            do {
                {
                    modelFolder = polygonIterator.nextModelFolder();
                    if (modelFolder == null) {
                        return null;
                    }
                }
            } while ((modelFolder.id !== folderId));
            return modelFolder;
        }

        /**
         * Get a polygon group by its ID.
         *
         * @param {number} pgID - The ID of the polygon group.
         * @returns {dsector.PolygonGroup|null} The polygon group, or null if not found.
         */
        getPolygonGroupFromID(pgID) {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            let polygonGroup;
            do {
                polygonGroup = polygonIterator.nextPolygonGroup();
                if (polygonGroup == null) {
                    return null;
                }
            } while ((polygonGroup.id !== pgID));
            return polygonGroup;
        }

        /**
         * Get a polygon group representation by its ID.
         *
         * @param {number} pgrID - The ID of the polygon group representation.
         * @returns {dsector.PolygonGroupRepresentation|null} The polygon group representation, or null if not found.
         */
        getPolygonGroupRepresentationFromID(pgrID) {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const polygonGroup = polygonIterator.nextPolygonGroup();
                if (polygonGroup == null) {
                    return null;
                }
                for (let i = -1; i < polygonGroup.transposedRepresentations.length; ++i) {

                    let pgr = null;
                    if (i === -1) {
                        pgr = polygonGroup.directRepresentation;
                    } else {
                        pgr = polygonGroup.transposedRepresentations[i];
                    }
                    if (pgr.id === pgrID) {
                        return pgr;
                    }
                }
            }

        }

        /**
         * Get an inbuilt light by its ID.
         *
         * @param {number} inbuiltLightID - The ID of the inbuilt light.
         * @returns {InbuiltLight|null} The inbuilt light, or null if not found.
         */
        getInbuiltLightFromID(inbuiltLightID) {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const modelFolder = polygonIterator.nextModelFolder();
                if (modelFolder == null) {
                    return null;
                }
                for (let i = 0; i < modelFolder.inbuiltLights.length; ++i) {
                    const inbuiltLight = modelFolder.inbuiltLights[i];
                    if (inbuiltLight.id === inbuiltLightID) {
                        return inbuiltLight;
                    }
                }
            }
        }

        /**
         * Get a special point by its ID.
         *
         * @param {number} spid - The ID of the special point.
         * @returns {dsector.SpecialPoint|null} The special point, or null if not found
         */
        getSpecialPointFromID(spid) {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            while (true) {
                const modelFolder = polygonIterator.nextModelFolder();
                if (modelFolder == null) {
                    return null;
                }
                for (let i = 0; i < modelFolder.specialPoints.length; ++i) {
                    const specialPoint = modelFolder.specialPoints[i];
                    if (specialPoint.id === spid) {
                        return specialPoint;
                    }
                }
            }
        }

        /**
         * Get the total number of polygons in the model.
         *
         * @returns {number} The total number of polygons.
         */
        numberOfPolygons() {
            const polygonIterator = new dsector.PolygonIterator(this, dsector.PolygonIterator.ALL_POLYGON_GROUPS);
            let idy = 0;
            while (true) {
                const polygonGroup = polygonIterator.nextPolygonGroup();
                if (polygonGroup == null) {
                    return idy;
                }
                idy += polygonGroup.polygons.length;
            }
        }

        /**
         * Add a polygon to a polygon group.
         *
         * @param {dsector.PolygonGroup} pg - The polygon group to add the polygon to.
         * @param {dsector.Polygon} p - The polygon to add.
         * @param {number} id - The index of the polygon.
         */
        addPolygon(pg, p, id) {
            pg.polygons.push(p);
            const v1x = p.v1.x;
            const v1y = p.v1.y;
            const v1z = p.v1.z;
            const v2x = p.v2.x;
            const v2y = p.v2.y;
            const v2z = p.v2.z;
            const v3x = p.v3.x;
            const v3y = p.v3.y;
            const v3z = p.v3.z;
            let sqr = Math.fround(Math.sqrt(v1x * v1x + v1y * v1y + v1z * v1z));
            if (sqr > this.__maximumDistanceOfVertexToCenterWhenModelLoaded) {
                this.__maximumDistanceOfVertexToCenterWhenModelLoaded = sqr;
            }
            sqr = Math.fround(Math.sqrt(v2x * v2x + v2y * v2y + v2z * v2z));
            if (sqr > this.__maximumDistanceOfVertexToCenterWhenModelLoaded) {
                this.__maximumDistanceOfVertexToCenterWhenModelLoaded = sqr;
            }
            sqr = Math.fround(Math.sqrt(v3x * v3x + v3y * v3y + v3z * v3z));
            if (sqr > this.__maximumDistanceOfVertexToCenterWhenModelLoaded) {
                this.__maximumDistanceOfVertexToCenterWhenModelLoaded = sqr;
            }
            const totalArea = this.totalPolygonAreaWhenModelLoaded;
            totalArea[id] += Model3DMatrix.polygonArea(v1x, v1y, v1z, v2x, v2y, v2z, v3x, v3y, v3z);
        }

        /**
         * Convert the XML model to a JSON OBJ scene.
         *
         * @see https://threejs.org/docs/#api/en/loaders/BufferGeometryLoader
         * @returns {string} The JSON string representing the OBJ scene.
         */
        xmlToJsonOBJScene() {
            let jsonString = '{"metadata":{"version": 4,"type": "BufferGeometry",' +
                '"generator": "Model3DMatrix.xmlToJsonOBJScene"},"data":{"attributes":{';
            let posjson = '"position":{"itemSize":3,"type": "Float32Array","array":[';
            let normjson = '"normal":{"itemSize":3,"type":"Float32Array","array":[';
            let uvjson = '"uv":{"itemSize":2,"type":"Float32Array","array":[';
//            const guid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)).toUpperCase();
            this.rootFolder.polygonGroups[0].polygons.forEach(
                (item, index) => {
                    posjson += `${item.v1.x},${item.v1.y},${item.v1.z},${item.v2.x},${item.v2.y},${item.v2.z},${item.v3.x},${item.v3.y},${item.v3.z},`;
                    normjson += "0,0,1,";
                    uvjson += "0,1,";
                });

            posjson = posjson.substring(0, posjson.length - 1) + "]},";
            normjson = normjson.substring(0, normjson.length - 1) + "]},";
            uvjson = uvjson.substring(0, uvjson.length - 1) + "]}";
            jsonString += posjson + normjson + uvjson + "}}}";
            return jsonString;
        }
    }

    /**
     * The maximum detail category value.
     * @type {number}
     * @static
     * @default 5
     */
    Model3DMatrix.maximumDetailCategoryValue = 5;
    /**
     * Constant indicating to create a new model if the file is not found.
     * @type {number}
     * @static
     * @default 0
     */
    Model3DMatrix.CREATE_NEW_IF_FILE_NOT_FOUND = 0;
    dsector.Model3DMatrix = Model3DMatrix;
    Model3DMatrix["__class"] = "dsector.Model3DMatrix";
})(dsector || (dsector = {}));