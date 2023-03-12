import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { API } from '../../../core/constants/API';
import { StorageAPI } from '../../../core/constants/common.api';
import HTTP from '../../../core/http/http';
import { LoginCredentials, RegisterUser } from '../../../shared/modals/auth.modal';
import { StorageService } from '../../../shared/services/storage.service';
import { clearProfileAPI } from '../profile/profile';
import { setAlertAPI } from '../shared/alert';
import { AuthState } from './auth.state';

export const loginAPI = createAsyncThunk(
    'authLoginAPI',
    async (payload: LoginCredentials, thunkAPI) => {
        try {
            let data = await HTTP.post(API.LOGIN, {data: payload});

            return data.data;
        } catch (err: AxiosError | any) {
            let errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error: any) => {
                    thunkAPI.dispatch(setAlertAPI({message: error.msg}));
                });
            }
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const registerUserAPI = createAsyncThunk(
    'registerUserAPI',
    async (payload: RegisterUser, thunkAPI) => {
        try {
            let data = await HTTP.post(API.REGISTER_USER, {data: payload});

            return data.data;
        } catch (err: AxiosError | any) {
            let errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error: any) => {
                    thunkAPI.dispatch(setAlertAPI({message: error.msg}));
                });
            }
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getUserDetailsAPI = createAsyncThunk(
    'geUsersDetails',
    () => {
        return new Promise<any>((resolve, reject) => {
            let userData = StorageService.getLocal(StorageAPI.Login_User);
            if (userData) {
                resolve(userData);
            } else {
                reject({msg: 'User did not found'});
            }
        });
    }
)


export const logoutUserAPI = createAsyncThunk(
    'logoutUserAPI',
    (payload: void, thunkAPI) => {
        return new Promise<void>((resolve) => {
            StorageService.removeLocal(StorageAPI.Login_User);
            StorageService.removeLocal(StorageAPI.Login_User_Token);
            thunkAPI.dispatch(clearProfileAPI());
            resolve();
        })
    }
)

const authInitialState = {
    token: '',
    isLoading: false,
    isAuthenticated: false,
    user: null
};

const loginPending: any = loginAPI.pending;
const loginFulfilled: any = loginAPI.fulfilled;
const loginRejected: any = loginAPI.rejected;

const registerUserPending: any = registerUserAPI.pending;
const registerUserFulfilled: any = registerUserAPI.fulfilled;
const registerUserRejected: any = registerUserAPI.rejected;

const getUserDetailsFulfilled: any = getUserDetailsAPI.fulfilled;
const getUserDetailsRejected: any = getUserDetailsAPI.rejected;

const logoutUserFulfilled: any = logoutUserAPI.fulfilled;

const slices = createSlice({
    name: 'AuthAPISlice',
    initialState: authInitialState,
    reducers: {},
    extraReducers: {
        [loginPending]: (state: AuthState) => {
            state.isLoading = true;
            state.isAuthenticated = false;
        },
        [loginFulfilled]: (state: AuthState, action: any) => {
            StorageService.setLocal(StorageAPI.Login_User_Token, action.payload.token);
            StorageService.setLocal(StorageAPI.Login_User, action.payload.user);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        [loginRejected]: (state: AuthState, action: any) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
            state.user = null;
        },
        [registerUserPending]: (state: AuthState) => {
            state.isLoading = true;
            state.isAuthenticated = false;
        },
        [registerUserFulfilled]: (state: AuthState, action: any) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        [registerUserRejected]: (state: AuthState) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
        },
        [getUserDetailsFulfilled]: (state: AuthState, action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload ? true : false;
            state.token = StorageService.getLocal(StorageAPI.Login_User_Token);
            state.user = action.payload;
        },
        [getUserDetailsRejected]: (state: AuthState) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
            state.user = null;
        },
        [logoutUserFulfilled]: (state: AuthState) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
            state.user = null;
        }
    }
});

export default slices.reducer;
