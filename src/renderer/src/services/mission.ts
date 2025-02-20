import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const missionService = {
    async getListMission(params: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/missions/deadline`, { params });
    },
    async getDataEventCalendar(params: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/missions/calendar`, { params });
    },
};
