import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { API } from "../../../core/constants/API";
import HTTP from "../../../core/http/http";
import { setAlertAPI } from "../shared/alert";
import { ProfileState } from "./profile.state";


export const getProfileAPI = createAsyncThunk(
    'getProfileAPI',
    async (payload: void, thunkAPI) => {
        try {
            let res = await HTTP.get(API.GET_PROFILE);

            return res.data;
        } catch (err: AxiosError | any) { return errorFunction(thunkAPI, err); }
    }
);

export const getProfilesAPI = createAsyncThunk(
    'getProfilesAPI',
    async (payload: void, thunkAPI) => {
        try {
            let data = await HTTP.get(API.GET_CREATE_DELETE_PROFILE);
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const getProfileByUserIdAPI = createAsyncThunk(
    'getProfileByUserIdAPI',
    async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.get(API.PROFILE_BY_USER_ID + payload);
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const getGitHubReposAPI = createAsyncThunk(
    'getGitHubReposAPI',
    async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.get(API.GET_USER_REPOS + payload);
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
    }
);

export const createProfileAPI = createAsyncThunk(
    'createProfileAPI',
    async (payload: any, thunkAPI) => {
        try {
            let data = await HTTP.post(API.GET_CREATE_DELETE_PROFILE, { data: payload.data });
            thunkAPI.dispatch(setAlertAPI({ message: payload.edit ? 'Profile Updated Successfully' : 'Profile Added Successfully', alertType: 'success' }));
            return data.data;
        } catch (err: AxiosError | any) { return errorFunction(thunkAPI, err); }
    }
)

export const addEducationAPI = createAsyncThunk(
    'addEducationAPI',
   async (payload: any, thunkAPI) => {
    try {
        let data = await HTTP.put(API.ADD_EDUCATION, { data: payload.data });
        thunkAPI.dispatch(setAlertAPI({ message: 'Education Added Successfully', alertType: 'success' }));
        return data.data;
    } catch (err: AxiosError | any) { return errorFunction(thunkAPI, err); }
   }
)

export const addExperienceAPI = createAsyncThunk(
    'addEducationAPI',
   async (payload: any, thunkAPI) => {
    try {
        let data = await HTTP.put(API.ADD_EXPERIENCE, { data: payload.data });
        thunkAPI.dispatch(setAlertAPI({ message: 'Experience Added Successfully', alertType: 'success' }));
        return data.data;
    } catch (err: AxiosError | any) { return errorFunction(thunkAPI, err); }
   }
)

export const deleteExperienceAPI = createAsyncThunk(
    'deleteExperienceAPI',
   async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.delete(API.DELETE_EXPERIENCE + payload);
            thunkAPI.dispatch(setAlertAPI({ message: 'Experience Removed Successfully', alertType: 'success' }));
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
   }
)

export const deleteEducationAPI = createAsyncThunk(
    'deleteEducationAPI',
   async (payload: string, thunkAPI) => {
        try {
            let data = await HTTP.delete(API.DELETE_EDUCATION + payload);
            thunkAPI.dispatch(setAlertAPI({ message: 'Education Removed Successfully', alertType: 'success' }));
            return data.data;
        } catch (err) { return errorFunction(thunkAPI, err); }
   }
)

export const deleteAccountAPI = createAsyncThunk(
    'deleteAccountAPI',
   async (payload: void, thunkAPI) => {
    try {
        let data = await HTTP.delete(API.GET_CREATE_DELETE_PROFILE);
        thunkAPI.dispatch(setAlertAPI({ message: 'Account Removed Successfully', alertType: 'success' }));
        thunkAPI.dispatch(clearProfileAPI());
        return data.data;
    } catch (err) { return errorFunction(thunkAPI, err); }
   }
)

export const clearProfileAPI = createAsyncThunk(
    'clearProfileAPI',
    (payload: void, thunkAPI) => {
        return new Promise<any>((resolve) => {
            resolve(null);
        });
    }
)

function errorFunction(thunkAPI: any, err: any) {
    let errors= err.response.data.errors;
    if (errors) {
        errors.forEach((error: any) => {
            thunkAPI.dispatch(setAlertAPI({ message: error.msg }));
        });
    }
    return thunkAPI.rejectWithValue(err);
}

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    isLoading: false,
    error: {}
};

const getProfilePending: any = getProfileAPI.pending;
const getProfileFulFilled: any = getProfileAPI.fulfilled;
const getProfileRejected: any = getProfileAPI.rejected;

const getProfilesPending: any = getProfilesAPI.pending;
const getProfilesFulFilled: any = getProfilesAPI.fulfilled;
const getProfilesRejected: any = getProfilesAPI.rejected;

const getProfileByUserIdPending: any = getProfileByUserIdAPI.pending;
const getProfileByUserIdFulFilled: any = getProfileByUserIdAPI.fulfilled;
const getProfileByUserIdRejected: any = getProfileByUserIdAPI.rejected;

const getUserReposPending: any = getGitHubReposAPI.pending;
const getUserReposFulFilled: any = getGitHubReposAPI.fulfilled;
const getUserReposRejected: any = getGitHubReposAPI.rejected;

const createProfilePending: any = createProfileAPI.pending;
const createProfileFulFilled: any = createProfileAPI.fulfilled;
const createProfileRejected: any = createProfileAPI.rejected;

const addEducationPending: any = addEducationAPI.pending;
const addEducationFulFilled: any = addEducationAPI.fulfilled;
const addEducationRejected: any = addEducationAPI.rejected;

const addExperiencePending: any = addExperienceAPI.pending;
const addExperienceFulFilled: any = addExperienceAPI.fulfilled;
const addExperienceRejected: any = addExperienceAPI.rejected;

const deleteExperiencePending: any = deleteExperienceAPI.pending;
const deleteExperienceFulFilled: any = deleteExperienceAPI.fulfilled;
const deleteExperienceRejected: any = deleteExperienceAPI.rejected;

const deleteEducationPending: any = deleteEducationAPI.pending;
const deleteEducationFulFilled: any = deleteEducationAPI.fulfilled;
const deleteEducationRejected: any = deleteEducationAPI.rejected;

const deleteAccountPending: any = deleteAccountAPI.pending;
const deleteAccountFulFilled: any = deleteAccountAPI.fulfilled;
const deleteAccountRejected: any = deleteAccountAPI.rejected;

const clearProfileAPIFulFilled: any = clearProfileAPI.fulfilled;

const slices = createSlice({
    name: 'getProfile',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getProfilePending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [getProfileFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        },
        [getProfileRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
            state.profile = null;
            state.profiles = [];
            state.repos = [];
        },
        [getProfilesPending]: (state: ProfileState) => {
            state.isLoading = true;
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        },
        [getProfilesFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.profiles = action.payload;
        },
        [getProfilesRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
            state.profiles = [];
        },
        [getProfileByUserIdPending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [getProfileByUserIdFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.profile = action.payload;
        },
        [getProfileByUserIdRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        },
        [getUserReposPending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [getUserReposFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.repos = action.payload;
        },
        [getUserReposRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
            state.repos = [];
        },
        [clearProfileAPIFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.profile = null;
            state.repos = [];
            state.profiles = [];
        },
        [createProfilePending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [createProfileFulFilled]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [createProfileRejected]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [addEducationPending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [addEducationFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        },
        [addEducationRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addExperiencePending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [addExperienceFulFilled]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        },
        [addExperienceRejected]: (state: ProfileState, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [deleteExperiencePending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [deleteExperienceFulFilled]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [deleteExperienceRejected]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [deleteAccountPending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [deleteAccountFulFilled]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [deleteAccountRejected]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [deleteEducationPending]: (state: ProfileState) => {
            state.isLoading = true;
        },
        [deleteEducationFulFilled]: (state: ProfileState) => {
            state.isLoading = false;
        },
        [deleteEducationRejected]: (state: ProfileState) => {
            state.isLoading = false;
        }
    }
});

export default slices.reducer;
