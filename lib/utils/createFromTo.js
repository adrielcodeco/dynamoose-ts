"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadataKeys_1 = require("../metadata/metadataKeys");
function createFromTo(originalModel) {
    var fields = Reflect.getMetadata(metadataKeys_1.MetadataKeys.Table_Fields, originalModel) || [];
    fields = fields.filter(function (f) { return f.linked; });
    return {
        from: function (value) {
            var stringReplace = function (value) {
                var field = fields.find(function (i) { return i.propertyName == value; });
                if (field) {
                    return field.name;
                }
                return value;
            };
            var objReplace = function (value) {
                fields.map(function (f) {
                    if (Reflect.has(value, f.propertyName)) {
                        value[f.name] = value[f.propertyName];
                        delete value[f.propertyName];
                    }
                });
                return value;
            };
            if (typeof value == 'string') {
                return stringReplace(value);
            }
            else if (value instanceof Array) {
                if (value.length) {
                    if (typeof value[0] == 'string') {
                        return value.map(function (i) { return stringReplace(i); });
                    }
                    else {
                        return value.map(function (i) { return objReplace(i); });
                    }
                }
                else {
                    return value;
                }
            }
            else {
                return objReplace(value);
            }
        },
        to: function (value) {
            var stringReplace = function (value) {
                var field = fields.find(function (i) { return i.name == value; });
                if (field) {
                    return field.propertyName;
                }
                return value;
            };
            var objReplace = function (value) {
                fields.map(function (f) {
                    if (Reflect.has(value, f.name)) {
                        value[f.propertyName] = value[f.name];
                        delete value[f.name];
                    }
                });
                return value;
            };
            if (typeof value == 'string') {
                return stringReplace(value);
            }
            else if (value instanceof Array) {
                if (value.length) {
                    if (typeof value[0] == 'string') {
                        return value.map(function (i) { return stringReplace(i); });
                    }
                    else {
                        return value.map(function (i) { return objReplace(i); });
                    }
                }
                else {
                    return value;
                }
            }
            else {
                return objReplace(value);
            }
        }
    };
}
exports.createFromTo = createFromTo;
//# sourceMappingURL=createFromTo.js.map