import PenIcon from '@renderer/components/icon/PenIcon';
import ScheduleIcon from '@renderer/components/icon/ScheduleIcon';
import WarningIcon from '@renderer/components/icon/WarningIcon';
import { TYPE_MISSION } from '@renderer/constants';
import { useNotification } from '@renderer/context/ProviderNotification';
import useSubject from '@renderer/hooks/useSubject';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { useMemo } from 'react';

const MissionItem = ({ ...props }: any) => {
    const { title, description, deadline, label, isVideo } = props;
    const { fetchDataQuizz } = useSubject();
    const { setUrlVideo } = useNotification();

    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            const end = dayjs(deadline);
            const diff = end.diff(now);

            if (diff <= 0) {
                setCountdown('Deadline passed');
                clearInterval(interval);
                return;
            }

            const duration = dayjs.duration(diff);
            const days = duration.days();
            const hours = String(duration.hours()).padStart(2, '0');
            const minutes = String(duration.minutes()).padStart(2, '0');
            const seconds = String(duration.seconds()).padStart(2, '0');
            const dayString = days > 0 ? `${days} day ` : '';
            setCountdown(`${dayString}${hours} : ${minutes} : ${seconds}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    const clickMission = () => {
        if (label === TYPE_MISSION.LOCK) {
            return;
        }
        if (isVideo) {
            setUrlVideo(props.video);
            return;
        }
        fetchDataQuizz(props);
    };

    const renderType = useMemo(() => {
        switch (label) {
            case TYPE_MISSION.URGENT:
                return (
                    <div className="bg-[#FF4C4C] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        <WarningIcon />
                        Urgent
                    </div>
                );
            case TYPE_MISSION.AVAILABLE:
                return (
                    <div className="bg-[#51F0BA] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        Available
                    </div>
                );
            case TYPE_MISSION.ONGOING:
                return (
                    <div className="bg-[#FE7F42] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        Ongoing
                    </div>
                );
            case TYPE_MISSION.LOCK:
                return (
                    <div className="bg-[#FCCE3A] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        Lock
                    </div>
                );
            default:
                return null;
        }
    }, [label]);

    return (
        <div
            className="bg-white px-[16px] pt-[30px] pb-[10px] gap-[16px] rounded-[30px] flex items-center shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] relative min-h-[120px]"
            onClick={() => clickMission()}
        >
            {label === TYPE_MISSION.LOCK ? (
                <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer flex-shrink-0">
                    <img src={'./images/course-11.png'} className="w-[60px] h-[60px] rounded-[10px] cursor-pointer" alt="lock" />
                </div>
            ) : (
                <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer flex-shrink-0">
                    {isVideo ? <img src={'./images/course-15.png'} className="w-[60px] h-[60px] rounded-[10px] cursor-pointer" alt="lock" /> : <PenIcon />}
                </div>
            )}
            <div>
                <div className="font-bold">{title}</div>
                <div className="text-[#BCC9C9] text-[16px] font-regular">{description}</div>
                {deadline && (
                    <div className="text-green-500 flex items-center mt-2">
                        <ScheduleIcon />
                        <span className="ml-[4px]">{countdown}</span>
                    </div>
                )}
            </div>
            {renderType}
        </div>
    );
};

export default MissionItem;
