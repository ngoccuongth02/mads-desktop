import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const archiveService = {
    async getListArchive(params?: any) {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/customer-storages`, { params });
            return response;
        } catch (error) {
            console.log('🚀error---->', error);
            return error;
        }
    },
    async markArchive({ id, isMark }: { id: string; isMark: boolean }) {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/customer-storages/update-mark-review/${id}`, { isMark });
            return response;
        } catch (error) {
            return error;
        }
    },
    async getQuestionArchive() {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/customer-storages/random?limit=10`);
            return response;
        } catch (error) {
            return error;
        }
    },
    async postAnswerArchive(data: any) {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/customer-storages/submit`, data);
            return response;
        } catch (error) {
            return error;
        }
    },
};
