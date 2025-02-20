// src/renderer/src/pages/Course/CourseItem.tsx
import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import React from 'react';

interface CourseItemProps {
    name: string;
    description: string;
    imageIconMobile: string; // URL or path to the icon image
    onClick?: (course: any) => void;
}

const CourseItem: React.FC<CourseItemProps> = (props) => {
    const { name, description, imageIconMobile, onClick } = props;
    return (
        <div className="flex items-center bg-white rounded-[32px] px-[30px] py-[20px] cursor-pointer border border-[#fff] hover:border-[#51F0BA]" onClick={() => onClick?.(props)}>
            <div className="mr-[16px] rounded-[16px] overflow-hidden flex-shrink-0">
                <img src={imageIconMobile} alt="Course Icon" className="w-[90px] h-[90px] object-cover" />
            </div>
            <div className="flex-grow">
                <h3 className="text-[20px] font-bold text-[#3A7364]">{name}</h3>
                <p className="text-[16px] text-[#BCC9C9]">{description}</p>
            </div>
            <div>
                <ButtonIconCircle />
            </div>
        </div>
    );
};

export default CourseItem;
