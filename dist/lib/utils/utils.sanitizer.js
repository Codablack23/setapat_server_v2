"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizerProvider = void 0;
class Sanitizer {
    sanitizeObject(obj, paths) {
        const result = structuredClone(obj);
        for (const path of paths) {
            this.deleteKeyPath(result, path);
        }
        return result;
    }
    deleteKeyPath(obj, path) {
        const keys = path.split(".");
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof current[keys[i]] !== "object" || current[keys[i]] === null) {
                return;
            }
            current = current[keys[i]];
        }
        delete current[keys[keys.length - 1]];
    }
    sanitizeEmptyObjectProp(obj) {
        const result = {};
        for (const key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key))
                continue;
            const value = obj[key];
            const isEmptyObject = typeof value === "object" &&
                value !== null &&
                !Array.isArray(value) &&
                Object.keys(value).length === 0;
            if (value !== undefined &&
                value !== null &&
                value !== "" &&
                !isEmptyObject) {
                result[key] = value;
            }
        }
        return result;
    }
    async sanitizeProperty(obj, key, serializer) {
        const result = { ...obj };
        if (key in result && typeof serializer === 'function') {
            result[key] = await serializer(result[key]);
        }
        return result;
    }
}
exports.SanitizerProvider = new Sanitizer();
//# sourceMappingURL=utils.sanitizer.js.map