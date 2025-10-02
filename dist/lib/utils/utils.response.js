"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponse = void 0;
class AppResponse {
    static getResponse(status, apiResponse) {
        return {
            status,
            message: apiResponse.message ?? 'Action completed successfully',
            data: apiResponse.data,
        };
    }
    static getSuccessResponse(apiResponse) {
        return {
            status: 'success',
            message: apiResponse.message ?? 'Action completed successfully',
            data: apiResponse.data,
        };
    }
    static getFailedResponse(message) {
        return {
            status: 'failed',
            message,
        };
    }
}
exports.AppResponse = AppResponse;
//# sourceMappingURL=utils.response.js.map