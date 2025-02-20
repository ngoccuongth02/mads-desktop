import { ILoginResponse } from '@renderer/types/auth';
import axiosInstance from '@renderer/utils/axiosInstance';
import { localToken } from '@renderer/utils/token';
import { BASE_URL } from '@shared/constants';
import axios from 'axios';

export const authService = {
    async login(payload: any): Promise<{ data: any }> {
        const tokenInfo = await axios.post(`${BASE_URL}/customer/login`, payload);

        localToken.set({
            id: tokenInfo?.data?.data?.id,
            accessToken: tokenInfo?.data?.data?.token,
            refreshToken: tokenInfo?.data?.data?.refreshToken,
            countRefreshToken: 0,
        });
        const res = await axios.get(`${BASE_URL}/customer/profiles`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.data?.data?.token}`,
            },
        });
        return res;
    },
    async getProfile() {
        return axiosInstance.get(`${BASE_URL}/customer/profiles`);
    },
    async register(payload: any) {
        try {
            const res = await axios.post(`${BASE_URL}/customer/register`, payload);
            return res;
        } catch (error) {
            return error;
        }
    },
    async updateProfile(payload: any): Promise<{ data: any }> {
        return axiosInstance.put(`${BASE_URL}/customer/profiles`, payload);
    },
    refresh(refreshToken: string): Promise<{ data: ILoginResponse }> {
        return axiosInstance.put(`${BASE_URL}/customer/refresh`, {
            refreshToken,
        });
    },
    async getDataRanking(payload: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/class-metrics/${payload?.classId}`);
    },
    async getListDataLeaderboard(payload: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/awards/leader-board`, { params: payload });
    },
    async updateProfileImage(payload: any): Promise<{ data: any }> {
        return axiosInstance.patch(`${BASE_URL}/customer/update-avatar`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    async forgotPassword(payload: any): Promise<{ data: any }> {
        return axiosInstance.post(`${BASE_URL}/customer/forgot-password`, payload);
    },
};
