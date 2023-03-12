import { createSlice } from '@reduxjs/toolkit';
import { StorageAPI } from '../../core/constants/common.api';
import { StorageService } from '../../shared/services/storage.service';
import { AuthAPI } from '../api/auth.api';
import { buildMatcher } from './controllers/slice.contrllers';

// const loginAction = createAction('api/login');

// const loginAdapter = isAnyOf(loginAction, AuthAPI.endpoints.login.matchPending);
// const loginAdapter2 = isAnyOf(loginAction, AuthAPI.endpoints.login.matchFulfilled);
// const loginAdapter3 = isAnyOf(loginAction, AuthAPI.endpoints.login.matchRejected);

const authInitialState = {
    token: '',
    isLoading: false,
    isAuthenticated: false,
    user: null
};

const AuthSlices = createSlice({
    name: 'AuthAPISlice',
    initialState: authInitialState,
    reducers: {
        getToken: (state) => {
            let token = StorageService.getLocal(StorageAPI.Login_User_Token);
            let user = StorageService.getLocal(StorageAPI.Login_User);
            state.isLoading = false;
            state.isAuthenticated = token ? true : false;
            state.token = token;
            state.user = user;
        },
        logoutUser: (state) => {
            StorageService.removeLocal(StorageAPI.Login_User);
            StorageService.removeLocal(StorageAPI.Login_User_Token);
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
            state.user = null;
        }
    },
    extraReducers(builder){
        buildMatcher(builder, '/api/auth', AuthAPI, 'login', (state, action) => {
            StorageService.setLocal(StorageAPI.Login_User_Token, action.payload.token);
            StorageService.setLocal(StorageAPI.Login_User, action.payload.user);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoading = false
        }, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
            state.user = null;
        })();
        buildMatcher(builder, '/api/auth', AuthAPI, 'registerUser', (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
        }, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = '';
        })();
    }
});
export const {
    getToken,
    logoutUser
} = AuthSlices.actions;

export default AuthSlices.reducer;
