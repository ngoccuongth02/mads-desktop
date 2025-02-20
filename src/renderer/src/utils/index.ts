import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC',
});

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms);

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args));
};

export const getTrueKeys = (obj: any) => {
    return Object.keys(obj).filter((key: any) => obj[key] === true);
};

export const checkBackgroundMission = (type: string) => {
    switch (type) {
        case 'urgent':
            return 'bg-[#FF4C4C]';
        case 'available':
            return 'bg-[#51F0BA]';
        case 'lock':
            return 'bg-[#FCCE3A]';
        case 'onGoing':
            return 'bg-[#FE7F42]';
        default:
            return 'bg-[#FF4C4C]';
    }
};

export const calculateTimeDifference = (start: string, end: string) => {
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const duration = dayjs.duration(endTime.diff(startTime));

    const minutes = String(duration.minutes()).padStart(2, '0');
    const seconds = String(duration.seconds()).padStart(2, '0');

    return `${minutes} : ${seconds}`;
};
