import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ThunkMiddleWare from 'redux-thunk';

import { RootStoreModel } from './store.model';
import authReducer from './slices/auth/auth';
import alertReducer from './slices/shared/alert';
import profileReducer from './slices/profile/profile';
import postReducer from './slices/post/post';

const reducers = combineReducers<RootStoreModel>({
    authReducer,
    alertReducer,
    profileReducer,
    postReducer
});

export  const store = configureStore({
    reducer: reducers,
    middleware: [ThunkMiddleWare]
});
