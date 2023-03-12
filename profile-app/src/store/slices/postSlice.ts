import { createSlice } from '@reduxjs/toolkit';
import { PostAPI } from '../api/post.api';
import { buildMatcher } from './controllers/slice.contrllers';


const postInitialState = {
    post: null,
    posts: [],
    error: {},
    isLoading: false
};

const PostSlices = createSlice({
    name: 'PostAPISlice',
    initialState: postInitialState,
    reducers: {},
    extraReducers(builder){
        buildMatcher(builder, '/api/post', PostAPI, 'getPostsAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.posts = action.payload;
            state.post = null;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.posts = [];
            state.post = null;
        }, true)();
        buildMatcher(builder, '/api/auth', PostAPI, 'getPostAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.post = action.payload;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.post = null;
        }, true)();
        buildMatcher(builder, '/api/auth', PostAPI, 'addPostAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.posts = [action.payload, ...state.posts];
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder, '/api/auth', PostAPI, 'removePostAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            let finalPosts = state.posts.filter((post: any) => post._id !== action.payload);
            state.posts = finalPosts;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder, '/api/auth', PostAPI, 'updateLikeAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.posts = state.posts.map((post: any) => post._id === action.payload.postId ? {...post, like: action.payload.data} : post);
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder, '/api/auth', PostAPI, 'removeLikeAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.posts = state.posts.map((post: any) => post._id === action.payload.postId ? {...post, like: action.payload.data} : post);
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder, '/api/auth', PostAPI, 'addCommentAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.post = {...state.post, comments: action.payload}
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder, '/api/auth', PostAPI, 'removeCommentAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.post = {...state.post, comments: state.post.comments.filter((comment: any) => comment._id !== action.payload)}
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
    }
});

export default PostSlices.reducer;
