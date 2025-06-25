
export interface GetAllResponse<T> {
    status: boolean;
    data: {
        current_page: number;
        data: T;
    };
}
export interface GetOneResponse<T> {
    status: boolean;
    data: T
}
export interface CreateResponse<T> {
    status: number;
    response: string;
    data: T;
}
export interface UpdateResponse<T> {
    status: boolean;
    data: T;
}
export interface DeleteResponse {
    status: boolean;
    message: string;
}
export interface SimpleResponse {
    status: boolean;
    message: string;
}
export interface LoginResponse<T> {
    status: number;
    response: string;
    access_token: string;
    token_type: string;
    expires_in: number;
    user: T
}

