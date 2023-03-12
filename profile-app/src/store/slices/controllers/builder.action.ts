import { createAction, isAnyOf } from "@reduxjs/toolkit";


export const generateAction = function(actionName: string, API: any, apiName: string) {
    const loginAction = createAction(actionName);
    
    const actionPending = isAnyOf(loginAction, API.endpoints[apiName].matchPending);
    const actionFulFilled = isAnyOf(loginAction, API.endpoints[apiName].matchFulfilled);
    const actionRejected = isAnyOf(loginAction, API.endpoints[apiName].matchRejected);

    return {
        pending: actionPending,
        fulfilled: actionFulFilled,
        rejected: actionRejected
    }

}