export interface APIResponse {
    status: number;
    error: boolean;
    message: {msg: string};
    data: any;
    isLoading: boolean;
}
