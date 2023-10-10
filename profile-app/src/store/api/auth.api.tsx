import { API } from "../../core/constants/API";
import ReduxAPI from "./redux.api";

export const AuthAPI: any = ReduxAPI.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload: any) => {
                return {
                    url: API.LOGIN,
                    method: 'POST',
                    body: payload
                }
            },
            transformErrorResponse:(error: any) => {
                return error.data;
            }
        }),
        registerUser: builder.mutation({
            query: (payload: any) => {
                return {
                    url: API.REGISTER_USER,
                    method: 'POST',
                    body: payload
                }
            },
            transformErrorResponse:(error: any) => {
                return error.data;
            }
        })
    }),
})

export const {
    useLoginMutation,
    useRegisterUserMutation
} = AuthAPI;
