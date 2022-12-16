
export interface ObjectKeyPair {
    [key: string]: any
}

export type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type ParamsData = Array<any> | Array<ParamsData>;
export type QueryParamsArray = [any, any];

export interface HTTPPayload {
    queryParams?: ObjectKeyPair;
    queryParamsArray?: QueryParamsArray[];
    paramsData?: ParamsData[];
    data?: any;
    baseURL?: string;
    [key: string]: any;
}
