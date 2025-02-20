import Loading from '@renderer/components/Loading';
import { Paths } from '@renderer/constants/paths';
import { STORAGE } from '@renderer/constants/storage';
import { useNotification } from '@renderer/context/ProviderNotification';
import ContentQuizzCol1 from '@renderer/pages/Quizz/ContentQuizzCol1';
import ContentQuizzCol2 from '@renderer/pages/Quizz/ContentQuizzCol2';
import FooterQuizz from '@renderer/pages/Quizz/FooterQuizz';
import HeaderQuizz from '@renderer/pages/Quizz/HeaderQuizz';
import { quizzService } from '@renderer/services/quizz';
import { fetchDataSections, fetchStartTime, quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Quizz = () => {
    const [loading, setLoading] = useState(true);
    const { dataSections, dataCurrentCourse, listIDQuizz, indexSection, currentIDSection, dataStartTime } = useSelector((state: any) => state.quizz);
    const dispatch = useDispatch();
    const { handleOpenNotification } = useNotification();

    const getInitData = async () => {
        await dispatch(fetchDataSections(currentIDSection) as any);
        setLoading(false);
    };

    const updateLocalStorageAndStartTest = async () => {
        localStorage.setItem(STORAGE.dataCurrentCourse, JSON.stringify(dataCurrentCourse));
        try {
            const res = await quizzService.startTest({ quizID: dataCurrentCourse?.id });
            if ((res as any).statusCode === 200) {
                dispatch(quizzActions.setListIDQuizz(res?.data));
                dispatch(quizzActions.setCurrentIDQuizz(res?.data[0]));
                localStorage.setItem(STORAGE.listIDQuizz, JSON.stringify(res?.data));
                localStorage.setItem(STORAGE.currentIDQuizz, res?.data[0]);
            }
        } catch (error) {
            handleOpenNotification('Error start test');
            localStorage.removeItem(STORAGE.dataCurrentCourse);
            localStorage.removeItem(STORAGE.listIDQuizz);
            dispatch(routerActions.changePath(Paths.HOME as any));
        }
    };

    const handleCallStartTest = async () => {
        const _dataCurrentCourse = localStorage.getItem(STORAGE.dataCurrentCourse) as any;
        const _currentSlug = JSON.parse(_dataCurrentCourse || '{}')?.slug;
        if (!_currentSlug || (dataCurrentCourse?.slug && dataCurrentCourse?.slug !== _currentSlug)) {
            await updateLocalStorageAndStartTest();
        } else {
            const _listIDQuizz = localStorage.getItem(STORAGE.listIDQuizz) as any;
            if (_listIDQuizz) {
                const _indexSection = (localStorage.getItem(STORAGE.indexSection) as any) || indexSection;
                dispatch(quizzActions.setListIDQuizz(JSON.parse(_listIDQuizz)));
                dispatch(quizzActions.setCurrentIDQuizz(JSON.parse(_listIDQuizz)[_indexSection || 0]));
                dispatch(quizzActions.setDataCurrentCourse(JSON.parse(_dataCurrentCourse)));
            }
        }
    };

    useEffect(() => {
        if (currentIDSection) {
            getInitData();
        } else {
            const _currentIDSection = localStorage.getItem(STORAGE.currentIDSection);
            if (_currentIDSection) {
                dispatch(quizzActions.setCurrentIDSection(_currentIDSection));
            }
        }
    }, [currentIDSection]);

    useEffect(() => {
        handleCallStartTest();
    }, []);

    useEffect(() => {
        if (listIDQuizz?.length > 0) {
            const _indexSection = (localStorage.getItem(STORAGE.indexSection) as any) || indexSection;
            dispatch(fetchStartTime(listIDQuizz[_indexSection || 0]) as any);
        }
    }, [JSON.stringify(listIDQuizz)]);

    useEffect(() => {
        return () => {
            dispatch(quizzActions.resetDataQuizz());
        };
    }, []);

    const isTimeExceeded = () => {
        const currentTime = new Date().getTime();
        const startTime = new Date(dataStartTime.startTime).getTime();
        const timeLimitInMilliseconds = dataStartTime.time * 60 * 1000; // Convert minutes to milliseconds
        if (startTime + timeLimitInMilliseconds > currentTime) {
            // dispatch(quizzActions.setIsCheckTime(false));
        }
        return startTime + timeLimitInMilliseconds > currentTime ? false : true;
    };

    return (
        <div className="quizz relative bg-[#F4FBF7] flex flex-col items-center justify-center h-full">
            <Loading isLoading={loading} />
            {!loading && (
                <>
                    {!isEmpty(dataStartTime) && <HeaderQuizz isTimeExceeded={isTimeExceeded()} />}
                    {dataSections?.type === 1 ? <ContentQuizzCol1 /> : <ContentQuizzCol2 />}
                    <FooterQuizz />
                </>
            )}
        </div>
    );
};

export default Quizz;
