import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileAPI } from "../api/profile.api";
import { buildMatcher } from "./controllers/slice.contrllers";

export const clearProfileAPI = createAsyncThunk(
    'clearProfileAPI',
    (payload: void, thunkAPI) => {
        return new Promise<any>((resolve) => {
            resolve(null);
        });
    }
);

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: false,
    error: {}
};

const ProfileSlices = createSlice({
    name: 'ProfileSliceAPI',
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(clearProfileAPI.fulfilled, (state) => {
            state.isLoading = false;
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        });
        buildMatcher(builder,'/api/profile', ProfileAPI, 'getProfileAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        }, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.profile = null;
            state.profiles = [];
            state.repos = [];
        }, true)();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'getProfilesAPI', (state, action) => {
            state.isLoading = false;
            state.profiles = action.payload;
        }, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.profiles = [];
        }, true, (state) => {
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        })();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'getProfileByUserId', (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
        }, (state,action) => {
            state.isLoading = false;
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        }, true)();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'getGitHubReposAPI', (state, action) => {
            state.isLoading = false;
            state.repos = action.payload;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.repos = [];
        }, true)();
        // buildMatcher(builder,'/api/profile', ProfileAPI, 'createProfileAPI', (state, action) => {
        //     state.isLoading = false;
        //     console.log('action :', action);
        // }, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // })();
        builder.addMatcher(ProfileAPI.endpoints.createProfileAPI.matchPending, (state, action) => {
            state.isLoading = true;
        });
        builder.addMatcher(ProfileAPI.endpoints.createProfileAPI.matchFulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addMatcher(ProfileAPI.endpoints.createProfileAPI.matchRejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || {};
        });
        buildMatcher(builder,'/api/profile', ProfileAPI, 'addEducationAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'addExperienceAPI', (state, action) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'deleteExperienceAPI', (state, action) => {
            state.isLoading = false;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }, true)();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'deleteEducationAPI', (state, action) => {
            state.isLoading = false;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }, true)();
        buildMatcher(builder,'/api/profile', ProfileAPI, 'deleteAccountAPI', (state, action) => {
            state.isLoading = false;
        }, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }, true)();
    }
});


// export const {clearProfileAPI} = ProfileSlices.actions;

export default ProfileSlices.reducer;
