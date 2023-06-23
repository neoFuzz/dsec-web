/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
var dsector;
(function (dsector) {
    class ModelLoader {
        constructor() {
            this.loadedModels = ({});
        }
        getModel(fileName) {
            let model3DMatrix = ((m, k) => { if (m.entries == null)
                m.entries = []; for (let i = 0; i < m.entries.length; i++)
                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null &&
                    m.entries[i].key.equals(k) || m.entries[i].key === k) {
                    return m.entries[i].value;
                } return null; })(this.loadedModels, fileName);
            if (model3DMatrix == null) {
                model3DMatrix = new dsector.Model3DMatrix(fileName + ".xml");
                if (model3DMatrix == null) {
                    return null;
                }
                /* put */ ((m, k, v) => { if (m.entries == null)
                    m.entries = []; for (let i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.loadedModels, fileName, model3DMatrix);
            }
            return model3DMatrix;
        }
        dropModel(name) {
            /* remove */ ((m, k) => { if (m.entries == null)
                m.entries = []; for (let i = 0; i < m.entries.length; i++)
                if (m.entries[i].key == null && k == null || m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                    return m.entries.splice(i, 1)[0];
                } })(this.loadedModels, name);
        }
        dropAllUnusedModels() {
            CWSYSTEM.Debug.println("Dropped all unused Models");
        }
    }
    dsector.ModelLoader = ModelLoader;
    ModelLoader["__class"] = "dsector.ModelLoader";
})(dsector || (dsector = {}));
