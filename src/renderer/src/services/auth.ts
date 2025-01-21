import { ILoginFormData, ILoginResponse } from '@/types/auth';
import axiosInstance from '@/utils/axiosInstance';

const basePath = '/user' as const;

export const authService = {
    login(payload: ILoginFormData): Promise<{ data: ILoginResponse }> {
        return axiosInstance.post(`${basePath}/login`, payload);
    },
    refresh(refreshToken: string): Promise<{ data: ILoginResponse }> {
        return axiosInstance.put(`${basePath}/refresh`, {
            refreshToken,
        });
    },
    getProfile(id: string): Promise<any> {
        return axiosInstance.get(`${basePath}/${id}`);
    },
};
