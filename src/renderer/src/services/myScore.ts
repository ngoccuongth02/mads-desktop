import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const myScoreService = {
    getListDataMyScore(params?: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer-answers/history`, { params });
    },
};
