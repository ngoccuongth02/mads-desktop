import { Paths } from '@renderer/constants/paths';
import { STORAGE } from '@renderer/constants/storage';
import { useNotification } from '@renderer/context/ProviderNotification';
import { quizzService } from '@renderer/services/quizz';
import { courseActions } from '@renderer/store/course/CourseSlice';
import { getListQuizz, getSubjectDetail } from '@renderer/store/home/HomeSlice';
import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch, useSelector } from 'react-redux';

const useSubject = () => {
    const dispatch = useDispatch();
    const { handleOpenNotification } = useNotification();
    const { dataBreadcrumb } = useSelector((state: any) => state.course);
    const fetchSubjectData = async (course: any) => {
        const _path = course?.displayType == 'card' ? Paths.COURSE_TYPE_IMAGE : Paths.COURSE;

        if (course?.sortOrder !== 9999) {
            const res = await dispatch(getSubjectDetail(course?.id));
            if (res?.payload?.data?.quizzes?.length > 0 || res?.payload?.data?.subjects?.length > 0) {
                dispatch(routerActions.changePath(_path as any));
                dispatch(courseActions.setDataBreadcrumb({ type: 'next', data: course }));
            } else {
                handleOpenNotification(res?.error?.message || 'No quizzes found');
            }
        } else {
            const res = await dispatch(getListQuizz(course?.id));
            if (res?.payload?.data?.quizzes?.length > 0) {
                dispatch(routerActions.changePath(Paths.COURSE_QUIZZ as any));
                dispatch(courseActions.setDataBreadcrumb({ type: 'next', data: course }));
            } else {
                handleOpenNotification(res?.error?.message || 'No quizzes found');
            }
        }
    };

    const fetchDataQuizz = async (course: any) => {
        const res = (await quizzService.getDataQuizzBySection(course?.slug)) as any;
        if (res?.statusCode == 200) {
            const _course = res?.data;
            const firstSectionId = _course.sections[0].id;

            dispatch(quizzActions.setCurrentIDSection(firstSectionId));
            dispatch(
                quizzActions.setDataCurrentCourse({
                    id: _course.id,
                    slug: _course.slug,
                    sections: _course.sections,
                    isRevise: _course.isRevise,
                }),
            );
            dispatch(quizzActions.setIndexSection(0));
            dispatch(routerActions.changePath(Paths.QUIZZ as any));
            localStorage.setItem(STORAGE.indexSection, JSON.stringify(0));
        }
    };

    const fetchDataBackToSubject = async (course: any) => {
        const _path = course?.displayType == 'card' ? Paths.COURSE_TYPE_IMAGE : Paths.COURSE;

        if (course?.sortOrder !== 9999) {
            await dispatch(getSubjectDetail(course?.id));
            dispatch(routerActions.changePath(_path as any));
        } else {
            const res = await dispatch(getListQuizz(course?.id));
            if (res?.payload?.data?.quizzes?.length > 0) {
                dispatch(routerActions.changePath(Paths.COURSE_QUIZZ as any));
            } else {
                handleOpenNotification(res?.error?.message || 'No quizzes found');
            }
        }
    };

    const backSubject = () => {
        if (dataBreadcrumb?.length > 1) {
            fetchDataBackToSubject(dataBreadcrumb?.[dataBreadcrumb?.length - 2]);
            dispatch(courseActions.setDataBreadcrumb({ type: 'prev' }));
        } else {
            dispatch(routerActions.changePath(Paths.HOME as any));
            dispatch(courseActions.resetDataBreadcrumb());
        }
    };
    return { fetchSubjectData, backSubject, fetchDataBackToSubject, fetchDataQuizz };
};

export default useSubject;
