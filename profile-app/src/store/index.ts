import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ThunkMiddleWare from 'redux-thunk';

// import { RootStoreModel } from './store.model';
// import authReducer from './slices/auth/auth';
import alertReducer from './slices/shared/alert';
// import profileReducer from './slices/profile/profile';
// import postReducer from './slices/post/post';
import AuthSlices from './slices/authSlice';
import PostSlices from './slices/postSlice';
import ProfileSlices from './slices/profileSlices';
import ReduxAPI from './api/redux.api';

// const reducers = combineReducers<RootStoreModel>({
//     authReducer,
//     alertReducer,
//     profileReducer,
//     postReducer,
//     authSlices,
//     [ReduxAPI.reducerPath]: ReduxAPI.reducer
// });

export  const store: any = configureStore({
    reducer: {
        // authReducer,
        alertReducer,
        postReducer: PostSlices,
        authReducer: AuthSlices,
        profileReducer: ProfileSlices,
        [ReduxAPI.reducerPath]: ReduxAPI.reducer
    },

    middleware: (getMiddleware) => {
        return [...getMiddleware(),ThunkMiddleWare, ReduxAPI.middleware]
    }
});
