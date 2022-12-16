import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { AlertState } from "../states.model";

export const setAlertAPI = createAsyncThunk(
    'setAlertAPI',
    (payload: AlertState, thunkAPI) => {
        return new Promise<any>((resolve) => {
            let closeTime = payload.closeTime || 2000;
            let isAutoClose = ('isAutoClose' in payload) ? payload.isAutoClose : true;
            let id = v4();
            if (isAutoClose) {
                let t = setTimeout(async () => {
                    thunkAPI.dispatch(removeAlertAPI(id));
                    clearTimeout(t);
                }, closeTime);
            }
            resolve({message: 'Something went wrong. Please try again.', alertType: payload.alertType ? payload.alertType : 'danger', id, ...payload});
        });
    }
)

export const removeAlertAPI = createAsyncThunk(
    'removeAlertAPI',
    (payload: string) => {
        return new Promise<any>((resolve) => {
            resolve(payload);
        });
    }
)

const InitialState: AlertState[] = [];

const setAlertFulfilled: any = setAlertAPI.fulfilled;
const removeAlertFulfilled: any = removeAlertAPI.fulfilled;

const slices = createSlice({
    name: 'alertSlice',
    initialState: InitialState,
    reducers: {},
    extraReducers: {
        [setAlertFulfilled]: (state: any[], action) => {
            state.push(action.payload);
        },

        [removeAlertFulfilled]: (state: any[], action) => {
            state = state.filter(alert => { return alert.id !== action.payload; });
            return state;
        },
    }
});

export default slices.reducer;
