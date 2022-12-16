import axios from 'axios';
import { HTTPMethods, HTTPPayload, ObjectKeyPair, QueryParamsArray } from "./http.model";


class HTTP {

    static apiBaseURL = 'http://localhost:2445/api/';

    static get(url: string, payload?: HTTPPayload) {
        return axios(this.payload('GET', url, payload));
    }

    static post(url: string, payload?: HTTPPayload) {
        return axios(this.payload('POST', url, payload));
    }

    static put(url: string, payload?: HTTPPayload) {
        return axios(this.payload('PUT', url, payload));
    }

    static delete(url: string, payload?: HTTPPayload) {
        return axios(this.payload('DELETE', url, payload));
    }

    static patch(url: string, payload?: HTTPPayload) {
        return axios(this.payload('PATCH', url, payload));
    }

    static payload(method: HTTPMethods, url: string, payLoadObj?: HTTPPayload) {
        const mapPayload = payLoadObj || {};
        const obj = {...mapPayload};

        const URI = this.buildURL(url, mapPayload);
        return {
            url: URI,
            method,
            ...obj
        };
    }

    static buildURL(url: string, payload: HTTPPayload): string {
        let URI = (payload.baseURL || this.apiBaseURL) + url;
        let params = URI;
        const payLoadObject = payload || {};
        if (payLoadObject.paramsData) {
            payLoadObject.paramsData?.forEach((ele: any[]) => {
                params = this.mapParams(params, ele[0], ele[1]);
            });
        }

        if (payLoadObject.queryParams) {
            params += this.buildQueryParams(payLoadObject.queryParams);
        }

        if (payLoadObject.queryParamsArray) {
            params += this.buildQueryParamsWithArray(payLoadObject.queryParamsArray);
        }

        return params;
    }

    static mapParams(url: string, str: string, val: string): string {
        return url.replace(str, val);
    }

    static buildQueryParams(queries: ObjectKeyPair) {
        let query = '?';
        for(let key in queries) {
            query += `${key}=${queries[key]}&`;
        }
        return query.slice(-1);
    }

    static buildQueryParamsWithArray(queries: QueryParamsArray[]): string {
        let query = '?';
        for(let ele of queries) {
            query += `${ele[0]}=${ele[1]}`;
        }
        return query.slice(-1);
    }
}

//Pp@#082022

export default HTTP;
