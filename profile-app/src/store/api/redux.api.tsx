import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageAPI } from '../../core/constants/common.api';
import { StorageService } from '../../shared/services/storage.service';

const ReduxAPI = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_API_DOMAIN,
      prepareHeaders: (headers) => {
        const token = StorageService.getLocal(StorageAPI.Login_User_Token);
    
        // If we have a token set in state, let's assume that we should be passing it.
        headers.set('Content-Type', 'application/json');
        if (token) {
          headers.set('x-auth-token', token);
        }
    
        return headers;
      }
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({})
});

export default ReduxAPI;
