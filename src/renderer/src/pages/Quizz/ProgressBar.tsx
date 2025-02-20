// Flow time line

// import { memo, useEffect, useState } from 'react';

// const TabTimeLine = ({ time, startTime }: any) => {
//     const [width, setWidth] = useState(100); // Start with full width (100%)
//     useEffect(() => {
//         const totalSeconds = time * 60; // Convert minutes to seconds

//         const startTimeMillis = new Date(startTime).getTime(); // Convert ISO 8601 to timestamp

//         const calculateElapsedTime = () => {
//             const now = new Date().getTime();
//             const elapsedTime = (now - startTimeMillis) / 1000; // Calculate elapsed time from startTime
//             return Math.min(elapsedTime, totalSeconds); // Ensure it doesn't exceed totalSeconds
//         };

//         const interval = setInterval(() => {
//             const elapsedTime = calculateElapsedTime();
//             const newWidth = 100 - (elapsedTime / totalSeconds) * 100;
//             setWidth(newWidth); // Update width based on elapsed time

//             if (newWidth <= 0) {
//                 clearInterval(interval); // Stop the interval when newWidth reaches 0
//             }
//         }, 1000); // Run every second

//         return () => clearInterval(interval); // Cleanup interval on component unmount
//     }, [time, startTime]); // Add startTime to dependencies

//     return (
//         <div className="tabLine absolute bottom-0 right-0 w-[100%] translate-y-[200%]">
//             <div className="line w-[100%] h-[12px] bg-[#BCC9C9] rounded-[100px] overflow-hidden">
//                 <div
//                     className="line h-[100%] rounded-[100px] transition-all duration-300"
//                     style={{ width: `${100 - width}%`, backgroundImage: "url('./images/bg-button.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
//                 ></div>
//             </div>
//         </div>
//     );
// };

// export default memo(TabTimeLine);

// New
import { memo } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
    // Start with full width (100%)

    const { listDataAnswer } = useSelector((state: any) => state.quizz);

    const numberChoose = listDataAnswer?.filter((it: any) => it.isChoose).length;

    const width = (numberChoose / listDataAnswer?.length) * 100;

    return (
        <div className="tabLine absolute bottom-0 right-0 w-[100%] translate-y-[200%]">
            <div className="line w-[100%] h-[12px] bg-[#BCC9C9] rounded-[100px] overflow-hidden">
                <div
                    className="line h-[100%] rounded-[100px] transition-all duration-300"
                    style={{ width: `${width}%`, backgroundImage: "url('./images/bg-button.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
            </div>
        </div>
    );
};
export default memo(ProgressBar);
