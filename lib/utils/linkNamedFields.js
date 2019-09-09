"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var metadataKeys_1 = require("../metadata/metadataKeys");
function linkNamedFields(newModel, originalModel) {
    var e_1, _a;
    var fields = Reflect.getMetadata(metadataKeys_1.MetadataKeys.Table_Fields, originalModel) || [];
    fields = fields.filter(function (f) { return f.linked; });
    var _loop_1 = function (field) {
        var entityDescriptor = Reflect.getOwnPropertyDescriptor(newModel, field.propertyName);
        Reflect.defineProperty(newModel, field.name, {
            writable: true,
            enumerable: false,
            value: Reflect.get(newModel, field.propertyName)
        });
        var modelDescriptor = Reflect.getOwnPropertyDescriptor(newModel, field.name);
        var modelSet = modelDescriptor.set;
        var entitySet = entityDescriptor.set;
        modelDescriptor.set = function (value) {
            var oldValue = Reflect.get(newModel, field.propertyName);
            if (oldValue != value) {
                Reflect.set(newModel, field.propertyName, value);
            }
            entitySet.call(newModel, value);
        };
        entityDescriptor.set = function (value) {
            var oldValue = Reflect.get(newModel, field.name);
            if (oldValue != value) {
                Reflect.set(newModel, field.name, value);
            }
            modelSet.call(newModel, value);
        };
    };
    try {
        for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
            var field = fields_1_1.value;
            _loop_1(field);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.linkNamedFields = linkNamedFields;
//# sourceMappingURL=linkNamedFields.js.map