import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const quizzService = {
    getDataQuizz(params?: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/quizzes`, { params });
    },
    getDataSections(id?: any): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/sections/${id}`);
    },
    startTest(params?: any): Promise<{ data: any }> {
        return axiosInstance.post(`${BASE_URL}/customer-answers/start-test`, params);
    },
    startTime(id?: any) {
        return axiosInstance.post(`${BASE_URL}/customer-answers/${id}/start-time`);
    },
    submitAnswer(id?: any, params?: any): Promise<{ data: any }> {
        return axiosInstance.post(`${BASE_URL}/customer-answers/${id}/submit`, params);
    },
    getVideo(slug?: any) {
        return axiosInstance.get(`${BASE_URL}/quizzes/${slug}`);
    },
    getDataQuizzBySection(slug?: any) {
        return axiosInstance.get(`${BASE_URL}/quizzes/${slug}`);
    },
};
