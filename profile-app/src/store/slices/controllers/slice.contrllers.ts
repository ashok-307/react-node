import { ActionReducerMapBuilder, createAction } from "@reduxjs/toolkit"
import { LoaderService } from "../../../shared/services/Loader.service";
import { generateAction } from "./builder.action"


export const buildMatcher = function(
    builder: ActionReducerMapBuilder<any>, 
    apiUrl: string, 
    API: any, 
    apiName: string, 
    fulfilledCallBack?: (state:any, action: any) => any, 
    rejected?: (state:any, action: any) => any,
    isLoader?: boolean,
    pendingCallBack ?: (state:any, action: any) => any,
    ) {
    return () => {
        const matcher = generateAction(apiUrl, API, apiName);
        builder.addMatcher(matcher.pending || createAction(apiUrl), (state, action) => {
            state.isLoading = true;
            if (isLoader) {
                LoaderService.openModel(apiUrl);
            }
            pendingCallBack && pendingCallBack(state, action);
        });
        builder.addMatcher(matcher.fulfilled, (state, action) => {
            state.isLoading = false;
            if(fulfilledCallBack) {
                fulfilledCallBack(state, action);
            }
            if (isLoader) {
                LoaderService.closeModel(apiUrl);
            }
        });
        builder.addMatcher(matcher.rejected, (state, action) => {
            state.isLoading = false;
            rejected && rejected(state, action);
            if (isLoader) {
                LoaderService.closeModel(apiUrl);
            }
        });
    }
}