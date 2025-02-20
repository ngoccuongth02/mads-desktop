import useTaskCounts from '@renderer/hooks/useTaskCounts';
import { getDataEventCalendar, getListMissionByCalendar, missionActions } from '@renderer/store/mission/MissionSlice';
import { DATE_FROM, DATE_TO, PARAMS_DEFAULT } from '@shared/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useMissionCalendar = () => {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [loadingMission, setLoadingMission] = useState(true);

    const dispatch = useDispatch();
    const { listMissionByCalendar } = useSelector((state: any) => state.mission);
    const { numTaskUrgent, numTaskAvailable, numTaskOnGoing, numTaskLock } = useTaskCounts(listMissionByCalendar);

    const getInitData = async () => {
        await dispatch(getListMissionByCalendar({ ...PARAMS_DEFAULT, dateFrom: selectedDate, dateTo: selectedDate }));
        await dispatch(getDataEventCalendar({ ...PARAMS_DEFAULT, dateFrom: DATE_FROM, dateTo: DATE_TO }));
        setLoadingMission(false);
    };

    const handleSelect = async (date: any) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        setSelectedDate(date);
        setLoadingMission(true);
        dispatch(missionActions?.resetListMissionByCalendar());
        await dispatch(getListMissionByCalendar({ ...PARAMS_DEFAULT, dateFrom: startOfDay, dateTo: endOfDay }));
        setLoadingMission(false);
    };

    useEffect(() => {
        getInitData();
        return () => {
            dispatch(missionActions?.resetListMissionByCalendar());
        };
    }, []);

    return {
        selectedDate,
        handleSelect,
        listMissionByCalendar,
        numTaskUrgent,
        numTaskAvailable,
        numTaskOnGoing,
        numTaskLock,
        loadingMission,
    };
};

export default useMissionCalendar;
