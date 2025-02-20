import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const notificationService = {
    getListNotification(params?: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/notifications`, { params });
    },
};
