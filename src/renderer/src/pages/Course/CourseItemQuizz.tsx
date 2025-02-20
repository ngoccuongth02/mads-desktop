// src/renderer/src/pages/Course/CourseItem.tsx
import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import TickIcon from '@renderer/components/icon/TickIcon';
import React from 'react';

const CourseItemQuizz: React.FC<any> = (props) => {
    const { approve, onClick, title, descriptionMobile, isVideo, hasCompleted } = props;
    const _imgUrl = isVideo ? './images/course-15.png' : approve ? './images/course-12.png' : './images/course-11.png';
    return (
        <div className="relative flex items-center gap-[6px] bg-white rounded-[22px] px-[20px] py-[20px] cursor-pointer border border-[#fff] hover:border-[#51F0BA]" onClick={() => onClick?.(props)}>
            {hasCompleted && (
                <div className="w-[20px] h-[20px] flex-center bg-[#51F0BA] rounded-full absolute top-[10px] right-[10px] text-[10px]">
                    <TickIcon />
                </div>
            )}
            <div className="mr-[10px] rounded-[16px] overflow-hidden flex-shrink-0">
                <img src={_imgUrl} alt="Course Icon" className="w-[90px] h-[90px] object-cover" />
            </div>
            <div className="flex-grow">
                <h3 className="text-[20px] font-bold leading-[28px] text-[#3A7364]">{title}</h3>
                <p className="text-[16px] text-[#BCC9C9]">{descriptionMobile}</p>
            </div>
            <div className="flex items-center gap-[2px]">
                <ButtonIconCircle />
            </div>
        </div>
    );
};

export default CourseItemQuizz;
