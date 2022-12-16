import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../core/constants/API";
import HTTP from "../../../core/http/http";
import { setAlertAPI } from "../shared/alert";
import { PostState } from "./post.state";

export const getPostsAPI = createAsyncThunk(
    'getPostsAPI',
    async (payload: void, thunkAPI) => {
        try {
            let data = await HTTP.get(API.GET_POSTS);
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const getPostAPI = createAsyncThunk(
    'getPostAPI',
    async (postId: string, thunkAPI) => {
        try {
            let data = await HTTP.get(API.GET_POSTS + '/' + postId);
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const addPostAPI = createAsyncThunk(
    'addPostAPI',
    async (payload: any, thunkAPI) => {
        try {
            let data = await HTTP.post(API.GET_POSTS, { data: payload});
            thunkAPI.dispatch(setAlertAPI({message: 'Post added successfully.', alertType: 'success'}));
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const removePostAPI = createAsyncThunk(
    'removePostAPI',
    async (payload: string, thunkAPI) => {
        try {
            await HTTP.delete(API.GET_POSTS + '/' + payload);
            thunkAPI.dispatch(setAlertAPI({message: 'Post removed successfully.', alertType: 'success'}));
            return payload;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const updateLikeAPI = createAsyncThunk(
    'updateLikeAPI',
    async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.put(API.Add_Like + payload);
            return {data: data.data, postId: payload};
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const removeLikeAPI = createAsyncThunk(
    'updateLikeAPI',
    async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.put(API.Remove_Like + payload);
            return {data: data.data, postId: payload};
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const addCommentAPI = createAsyncThunk(
    'addCommentAPI',
    async (payload: { data: {text: string}, postId: string }, thunkAPI) => {
        try {
            let data = await HTTP.post(API.Post_Comment + payload.postId, {data: payload.data});
            thunkAPI.dispatch(setAlertAPI({message: 'Comment added successfully.', alertType: 'success'}));
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const removeCommentAPI = createAsyncThunk(
    'removeCommentAPI',
    async (payload: {postId: string, commentId: string}, thunkAPI) => {
        try {
            await HTTP.delete(API.Post_Comment + payload.postId + '/' + payload.commentId);
            thunkAPI.dispatch(setAlertAPI({message: 'Comment removed successfully.', alertType: 'success'}));
            return payload.commentId;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
)


const initialState = {
    post: null,
    posts: [],
    error: {},
    isLoading: false
}

const getPostsAPIPending: any = getPostsAPI.pending;
const getPostsAPIFulFilled: any = getPostsAPI.fulfilled;
const getPostsAPIRejected: any = getPostsAPI.rejected;

const getPostAPIPending: any = getPostAPI.pending;
const getPostAPIFulFilled: any = getPostAPI.fulfilled;
const getPostAPIRejected: any = getPostAPI.rejected;

const addPostAPIPending: any = addPostAPI.pending;
const addPostAPIFulFilled: any = addPostAPI.fulfilled;
const addPostAPIRejected: any = addPostAPI.rejected;

const updateLikeAPIPending: any = updateLikeAPI.pending;
const updateLikeAPIFulfilled: any = updateLikeAPI.fulfilled;
const updateLikeAPIRejected: any = updateLikeAPI.rejected;

const removeLikeAPIPending: any = removeLikeAPI.pending;
const removeLikeAPIFulfilled: any = removeLikeAPI.fulfilled;
const removeLikeAPIRejected: any = removeLikeAPI.rejected;

const removePostAPIPending: any = removePostAPI.pending;
const removePostAPIFulfilled: any = removePostAPI.fulfilled;
const removePostAPIRejected: any = removePostAPI.rejected;

const addCommentAPIAPIPending: any = addCommentAPI.pending;
const addCommentAPIFulfilled: any = addCommentAPI.fulfilled;
const addCommentAPIRejected: any = addCommentAPI.rejected;

const removeCommentAPIAPIPending: any = removeCommentAPI.pending;
const removeCommentAPIFulfilled: any = removeCommentAPI.fulfilled;
const removeCommentAPIRejected: any = removeCommentAPI.rejected;

function errorFunction(thunkAPI: any, err: any) {
    let errors= err.response.data.errors;
    if (errors) {
        errors.forEach((error: any) => {
            thunkAPI.dispatch(setAlertAPI({ message: error.msg }));
        });
    }
    return thunkAPI.rejectWithValue(err);
}

const postSlices = createSlice({
    name: 'postSlices',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getPostsAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [getPostsAPIFulFilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.posts = action.payload;
            state.post = null;
        },
        [getPostsAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
            state.posts = [];
            state.post = null;
        },
        [getPostAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [getPostAPIFulFilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.post = action.payload;
        },
        [getPostAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
            state.post = null;
        },
        [addPostAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [addPostAPIFulFilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.posts = [action.payload, ...state.posts];
        },
        [addPostAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [updateLikeAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [updateLikeAPIFulfilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.posts = state.posts.map((post: any) => post._id === action.payload.postId ? {...post, like: action.payload.data} : post);
        },
        [updateLikeAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [removeLikeAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [removeLikeAPIFulfilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.posts = state.posts.map((post: any) => post._id === action.payload.postId ? {...post, like: action.payload.data} : post);
        },
        [removeLikeAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [removePostAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [removePostAPIFulfilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            let finalPosts = state.posts.filter((post: any) => post._id !== action.payload);
            state.posts = finalPosts;
        },
        [removePostAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addCommentAPIAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [addCommentAPIFulfilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.post = {...state.post, comments: action.payload}
        },
        [addCommentAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [removeCommentAPIAPIPending]: (state: PostState) => {
            state.isLoading = true;
        },
        [removeCommentAPIFulfilled]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.post = {...state.post, comments: state.post.comments.filter((comment: any) => comment._id !== action.payload)}
        },
        [removeCommentAPIRejected]: (state: PostState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export default postSlices.reducer;
