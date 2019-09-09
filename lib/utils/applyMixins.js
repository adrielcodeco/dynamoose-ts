"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            var propertyDescriptor = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
            Object.defineProperty(derivedCtor.prototype, name, propertyDescriptor);
        });
    });
}
exports.applyMixins = applyMixins;
//# sourceMappingURL=applyMixins.js.map