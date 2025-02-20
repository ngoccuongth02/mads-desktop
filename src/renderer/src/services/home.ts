import axiosInstance from '@renderer/utils/axiosInstance';
import { BASE_URL } from '@shared/constants';

export const homeService = {
    getListDataBanner(): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/banners`);
    },
    getListSubject(): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/subjects`);
    },
    getSubjectDetail(id: string): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/subjects?parentID=${id}`);
    },
    getListQuizz(id: string): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/quizzes?subjectID=${id}`);
    },
    getDataMyCourse(): Promise<{ data: any }> {
        return axiosInstance.get(`${BASE_URL}/customer/my-courses`);
    },
};
