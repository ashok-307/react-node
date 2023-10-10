import { configureStore } from "@reduxjs/toolkit"
import ReduxAPI from "../store/api/redux.api"
import ThunkMiddleWare from 'redux-thunk';
import alertReducer from '../store/slices/shared/alert';
// import profileReducer from './slices/profile/profile';
// import postReducer from './slices/post/post';
import AuthSlices from '../store/slices/authSlice';
import PostSlices from '../store/slices/postSlice';
import ProfileSlices from '../store/slices/profileSlices';

// export const setupStore = (preloadedState: any) => {
//     return ReduxAPI
// }

export const setupStore = (preloadedState: any) => {
    return configureStore({
      reducer: {
        alertReducer,
        postReducer: PostSlices,
        authReducer: AuthSlices,
        profileReducer: ProfileSlices,
        [ReduxAPI.reducerPath]: ReduxAPI.reducer,
      },
      preloadedState,
      middleware: getDefaultMiddleware => {
        return [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false, }), ReduxAPI.middleware, ThunkMiddleWare]
      },
    });
}
