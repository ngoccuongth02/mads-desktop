// import ClockIcon from '@renderer/components/icon/ClockIcon';
// import { memo, useEffect, useState } from 'react';

// const ClockTime = ({ startTime, time, endTime }: { startTime: string; time: number; endTime: () => void }) => {
//     const startTimeDate = new Date(startTime);
//     const endTimeDate = new Date(startTimeDate.getTime() + time * 60 * 1000); // Add time in milliseconds
//     const currentTime = new Date();

//     const initialCountdown = Math.max(0, Math.floor((endTimeDate.getTime() - currentTime.getTime()) / 1000));

//     const [countdown, setCountdown] = useState(initialCountdown);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCountdown((prevTime) => {
//                 if (prevTime <= 1) {
//                     clearInterval(interval);
//                     endTime(); // Call endTime function when countdown reaches 0
//                     return 0;
//                 }
//                 return prevTime - 1;
//             });
//         }, 1000); // 1000 ms = 1 second

//         return () => clearInterval(interval);
//     }, [endTime]);

//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//     };

//     console.log('🚀----> render', startTime);

//     return (
//         <span className="text-[#058A3A] font-semibold flex items-center px-[18px] py-[10px] bg-[#F1FEFF] rounded-[100px] text-[16px]">
//             <ClockIcon /> <span className="ml-[8px]">{formatTime(countdown)}</span>
//         </span>
//     );
// };

// export default memo(ClockTime);

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const ClockTime = ({ time, startTime, onComplete }: { time: number; startTime: string; onComplete: () => void }) => {
    const [dur, setDur] = useState(5);

    useEffect(() => {
        setDur(time);
    }, [time, startTime]);

    const _onComplete = () => {
        onComplete();
    };

    return (
        <div className="flex items-center justify-center">
            {startTime && dur > 0 && (
                <Countdown
                    daysInHours
                    className="text-[#058A3A] font-semibold flex items-center px-[18px] py-[10px] bg-[#F1FEFF] rounded-[100px] text-[16px]"
                    date={new Date(startTime).getTime() + dur * 60 * 1000}
                    onComplete={_onComplete}
                />
            )}
        </div>
    );
};

export default ClockTime;
