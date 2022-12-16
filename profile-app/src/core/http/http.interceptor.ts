import axios from 'axios';
import { StorageService } from '../../shared/services/storage.service';
import { StorageAPI } from '../constants/common.api';

function axiosInterceptor() {
    axios.interceptors.request.use(function (config) {
        let token = StorageService.getLocal(StorageAPI.Login_User_Token);
        if (config && config.headers) {
            config.headers['Content-Type'] = 'application/json';
        }
        if (token) {
            if (config && config.headers) {
                config.headers['x-auth-token'] = token;
            }
        }
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            return Promise.reject(error);
        }
    );
}

export default axiosInterceptor;
