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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dynamoose_1 = __importDefault(require("dynamoose"));
var metadataKeys_1 = require("../metadata/metadataKeys");
var applyMixins_1 = require("../utils/applyMixins");
var createFromTo_1 = require("../utils/createFromTo");
var linkNamedFields_1 = require("../utils/linkNamedFields");
var overwriteModel_1 = require("../utils/overwriteModel");
function Table(nameOroptions) {
    return function (constructor) {
        var e_1, _a;
        var name = constructor.name;
        if (nameOroptions) {
            if (typeof nameOroptions == 'string') {
                name = nameOroptions;
            }
            else if (nameOroptions.name) {
                name = nameOroptions.name;
            }
        }
        var schema = {};
        var fields = Reflect.getMetadata(metadataKeys_1.MetadataKeys.Table_Fields, constructor) || [];
        try {
            for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                schema[field.name] = field.schema;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var newModel = dynamoose_1.default.model(name, schema);
        applyMixins_1.applyMixins(newModel, [constructor]);
        var newConstructorFunction = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var model = new (newModel.bind.apply(newModel, __spread([void 0], args)))();
            linkNamedFields_1.linkNamedFields(model, constructor);
            this._model = model;
            return model;
        };
        newConstructorFunction.superConstructor = constructor;
        Object.defineProperty(newConstructorFunction, 'name', {
            writable: true,
            value: name
        });
        overwriteModel_1.overwriteModel(newConstructorFunction, newModel, createFromTo_1.createFromTo(constructor));
        return newConstructorFunction;
    };
}
exports.Table = Table;
//# sourceMappingURL=table.js.map