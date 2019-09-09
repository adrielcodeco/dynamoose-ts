"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadataKeys_1 = require("../metadata/metadataKeys");
function Field(nameOrOptions, options) {
    return function (target, propertyName, descriptor) {
        var fields = Reflect.getMetadata(metadataKeys_1.MetadataKeys.Table_Fields, target.constructor) || [];
        var name = propertyName;
        var linked = false;
        var schema = undefined;
        if (typeof nameOrOptions == 'string') {
            name = nameOrOptions;
            linked = true;
            if (options) {
                schema = options;
            }
            else {
                schema = {};
            }
        }
        else if (nameOrOptions) {
            schema = nameOrOptions;
        }
        else {
            schema = {};
        }
        if (!Reflect.has(schema, 'type')) {
            var type = Reflect.getMetadata('design:type', target, propertyName);
            Reflect.set(schema, 'type', type);
        }
        var field = { name: name, linked: linked, propertyName: propertyName, schema: schema };
        fields.push(field);
        Reflect.defineMetadata(metadataKeys_1.MetadataKeys.Table_Fields, fields, target.constructor);
    };
}
exports.Field = Field;
//# sourceMappingURL=field.js.map