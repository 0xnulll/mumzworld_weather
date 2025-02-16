export interface SuccessResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface ErrorResponse {
    success: boolean;
    error: string;
    statusCode: number;
} 

export type HttpApiResponse<T=any> = SuccessResponse<T> | ErrorResponse;