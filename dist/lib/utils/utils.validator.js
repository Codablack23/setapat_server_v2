"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidationException = void 0;
const common_1 = require("@nestjs/common");
function extractErrors(errors, parentPath = '') {
    const result = {};
    for (const error of errors) {
        const path = parentPath ? `${parentPath}.${error.property}` : error.property;
        if (error.constraints) {
            const messages = Object.values(error.constraints);
            if (messages.length)
                result[path] = messages[0];
        }
        if (error.children && error.children.length > 0) {
            const childErrors = extractErrors(error.children, path);
            Object.assign(result, childErrors);
        }
    }
    return result;
}
const useValidationException = (validationErrors) => {
    const errors = extractErrors(validationErrors);
    return new common_1.BadRequestException({
        errors,
        status: "failed",
        message: Object.values(errors)[0] || "Validation failed",
        data: null,
    });
};
exports.useValidationException = useValidationException;
//# sourceMappingURL=utils.validator.js.map