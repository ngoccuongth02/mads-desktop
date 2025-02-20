import axios from 'axios';
import { localToken } from './token';

import { authService } from '@renderer/services/auth';

const BASE_URL = 'https://quiz-api.sattest.online/api/v1';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response?.data;
    },
    async (error) => {
        const originalRequest = error.config;

        // check refresh count
        let countRefreshToken = Number(localToken.get()?.countRefreshToken) || 0;
        if ((error.response?.status === 403 || error.response?.status === 401) && !!!originalRequest._retry && countRefreshToken <= 3 && localToken.get()) {
            originalRequest._retry = true;
            try {
                const res = await authService.refresh(localToken.get()?.refreshToken);
                countRefreshToken += 1;

                const { id, token } = res?.data || {};
                localToken.set({
                    id: id,
                    accessToken: token,
                    refreshToken: token,
                    countRefreshToken: countRefreshToken,
                });
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }

                return axiosInstance(originalRequest);
            } catch (error) {
                localToken.remove();
            }
        }
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localToken.get()?.accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;
