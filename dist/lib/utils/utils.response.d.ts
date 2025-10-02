interface ApiResponse<T> {
    message?: string;
    data?: T;
    errors?: any;
}
type StatusType = 'success' | 'failed';
export declare class AppResponse {
    static getResponse<T>(status: StatusType, apiResponse: ApiResponse<T>): {
        status: StatusType;
        message: string;
        data: T | undefined;
    };
    static getSuccessResponse<T>(apiResponse: ApiResponse<T>): {
        status: StatusType;
        message: string;
        data: T | undefined;
    };
    static getFailedResponse(message: string): {
        status: StatusType;
        message: string;
    };
}
export {};
