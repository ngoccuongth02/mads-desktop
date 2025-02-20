import { TYPE_MISSION } from '@renderer/constants';
import { useMemo } from 'react';

const useTaskCounts = (listMissionByCalendar: any[]) => {
    const numTaskUrgent = useMemo(() => {
        return listMissionByCalendar?.filter((item: any) => item?.label === TYPE_MISSION.URGENT).length;
    }, [listMissionByCalendar]);

    const numTaskAvailable = useMemo(() => {
        return listMissionByCalendar?.filter((item: any) => item?.label === TYPE_MISSION.AVAILABLE).length;
    }, [listMissionByCalendar]);

    const numTaskOnGoing = useMemo(() => {
        return listMissionByCalendar?.filter((item: any) => item?.label === TYPE_MISSION.ONGOING).length;
    }, [listMissionByCalendar]);

    const numTaskLock = useMemo(() => {
        return listMissionByCalendar?.filter((item: any) => item?.label === TYPE_MISSION.LOCK).length;
    }, [listMissionByCalendar]);

    return { numTaskUrgent, numTaskAvailable, numTaskOnGoing, numTaskLock };
};

export default useTaskCounts;
