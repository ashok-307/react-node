import { API } from "../../core/constants/API";
import { setAlertAPI } from "../slices/shared/alert";
import ReduxAPI from "./redux.api";

export const PostAPI = ReduxAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPostsAPI: builder.mutation({
            query: (payload: void) => {
                return {
                    url: API.GET_POSTS,
                    method: 'GET'
                }
            }
        }),
        getPostAPI: builder.mutation({
            query: (postId: any) => {
                return {
                    url: API.GET_POSTS + '/' + postId,
                    method: 'GET'
                }
            }
        }),
        addPostAPI: builder.mutation({
            query: (payload: any) => {
                return {
                    url: API.GET_POSTS,
                    method: 'POST',
                    body: payload
                }
            },
            onQueryStarted: (arg, api) =>{ 
                api.dispatch(setAlertAPI({message: 'Post added successfully.', alertType: 'success'}));
            }
        }),
        removePostAPI: builder.mutation({
            query: (postId: string) => {
                return {
                    url: API.GET_POSTS + '/' + postId,
                    method: 'DELETE'
                }
            },
            transformResponse: (response, meta, arg) => {
                return arg;
            },
            onQueryStarted: (arg, api) =>{ 
                api.dispatch(setAlertAPI({message: 'Post removed successfully.', alertType: 'success'}));
            }
        }),
        updateLikeAPI: builder.mutation({
            query: (postId: string) => {
                return {
                    url: API.Add_Like+postId,
                    method: 'PUT'
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    data: response,
                    postId: arg
                }
            }
        }),
        removeLikeAPI: builder.mutation({
            query: (postId: string) => {
                return {
                    url: API.Remove_Like+postId,
                    method: 'PUT'
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    data: response,
                    postId: arg
                }
            }
        }),
        addCommentAPI: builder.mutation({
            query: (payload: {data: {text: string}, postId: string}) => {
                return {
                    url: API.Post_Comment + payload.postId,
                    method: 'POST',
                    body: payload.data
                }
            },
            onQueryStarted: (arg, api) =>{ 
                api.dispatch(setAlertAPI({message: 'Comment added successfully.', alertType: 'success'}));
            }
        }),
        removeCommentAPI: builder.mutation({
            query: (payload: {commentId: string, postId: string}) => {
                return {
                    url: API.Post_Comment + payload.postId + '/' + payload.commentId,
                    method: 'DELETE'
                }
            },
            transformResponse: (response, meta, arg) => {
                return arg.commentId;
            },
            onQueryStarted: (arg, api) =>{ 
                api.dispatch(setAlertAPI({message: 'Comment removed successfully.', alertType: 'success'}));
            }
        }),
    })
})

export const  {
    useGetPostsAPIMutation,
    useGetPostAPIMutation,
    useAddPostAPIMutation,
    useRemovePostAPIMutation,
    useUpdateLikeAPIMutation,
    useRemoveLikeAPIMutation,
    useAddCommentAPIMutation,
    useRemoveCommentAPIMutation
} = PostAPI;
