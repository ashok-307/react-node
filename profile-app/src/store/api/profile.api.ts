import { API } from "../../core/constants/API";
import { clearProfileAPI } from "../slices/profileSlices";
import { setAlertAPI } from "../slices/shared/alert";
import ReduxAPI from "./redux.api";


export const ProfileAPI = ReduxAPI.injectEndpoints({
    endpoints: (builder) => ({
        getProfileAPI: builder.mutation({
            query: (payload: void) => {
                return {
                    url: API.GET_PROFILE,
                    method: 'GET'
                }
            }
        }),
        getProfilesAPI: builder.mutation({
            query: (payload: void) => {
                return {
                    url: API.GET_CREATE_DELETE_PROFILE,
                    method: 'GET'
                }
            }
        }),
        getProfileByUserId: builder.mutation({
            query: (userId: string) => {
                return {
                    url: API.PROFILE_BY_USER_ID + userId,
                    method: 'GET'
                }
            }
        }),
        getGitHubReposAPI: builder.mutation({
            query: (githubUserName: string) => {
                return {
                    url: API.GET_USER_REPOS+githubUserName,
                    method: 'GET'
                }
            }
        }),
        createProfileAPI: builder.mutation({
            query: (payload: {data: any, isEdit: boolean}) => {
                return {
                    url: API.GET_CREATE_DELETE_PROFILE,
                    method: 'POST',
                    body: payload.data
                }
            },
            onQueryStarted:(arg: any, api) => {
                api.dispatch(setAlertAPI({ message: arg.isEdit ? 'Profile Updated Successfully' : 'Profile Added Successfully', alertType: 'success' }));
            }
        }),
        addEducationAPI: builder.mutation({
            query: (payload: any) => {
                return {
                    url: API.ADD_EDUCATION,
                    method: 'PUT',
                    body: payload
                }
            },
            onQueryStarted:(arg, api) => {
                api.dispatch(setAlertAPI({ message: 'Education Added Successfully', alertType: 'success' }));
            }
        }),
        addExperienceAPI: builder.mutation({
            query: (payload: any) => {
                return {
                    url: API.ADD_EXPERIENCE,
                    method: 'PUT',
                    body: payload
                }
            },
            onQueryStarted:(arg, api) => {
                api.dispatch(setAlertAPI({ message: 'Experience Added Successfully', alertType: 'success' }));
            }
        }),
        deleteExperienceAPI: builder.mutation({
            query: (experience_id: string) => {
                return {
                    url: API.ADD_EXPERIENCE + '/' + experience_id,
                    method: 'DELETE',
                }
            },
            onQueryStarted:(arg, api) => {
                api.dispatch(setAlertAPI({ message: 'Experience Removed Successfully', alertType: 'success' }));
            }
        }),
        deleteEducationAPI: builder.mutation({
            query: (education_id: string) => {
                return {
                    url: API.ADD_EDUCATION + '/' + education_id,
                    method: 'DELETE',
                }
            },
            onQueryStarted:(arg, api) => {
                api.dispatch(setAlertAPI({ message: 'Education Removed Successfully', alertType: 'success' }));
            },
        }),
        deleteAccountAPI: builder.mutation({
            query: (payload: void) => {
                return {
                    url: API.GET_CREATE_DELETE_PROFILE,
                    method: 'DELETE',
                }
            },
            onQueryStarted:(arg, api) => {
                api.dispatch(setAlertAPI({ message: 'Account Removed Successfully', alertType: 'success' }));
                api.dispatch(clearProfileAPI());
            }
        })
    })
})


export const {
    useGetProfileAPIMutation,
    useGetProfilesAPIMutation,
    useGetProfileByUserIdMutation,
    useCreateProfileAPIMutation,
    useAddEducationAPIMutation,
    useAddExperienceAPIMutation,
    useDeleteAccountAPIMutation,
    useDeleteEducationAPIMutation,
    useDeleteExperienceAPIMutation,
    useGetGitHubReposAPIMutation
} = ProfileAPI;
