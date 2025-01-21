import MissionItem from '@renderer/components/MissionItem';
import { useState } from 'react';
import { Calendar } from 'rsuite';

const mockDate = [
    {
        chapter: '1',
        type: 'warning',
    },
    {
        chapter: '2',
        type: 'available',
    },
    {
        chapter: '3',
        type: 'lock',
    },
];

const CalendarUI = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSelect = (date) => {
        setSelectedDate(date);
    };

    const renderCalendar = () => {
        // Placeholder for calendar days
        return (
            <div className="w-[430px]">
                <Calendar compact onSelect={handleSelect} />
            </div>
        );
    };

    return (
        <div className="flex gap-2 justify-between">
            <div className="left w-[50%] pr-[90px]">{renderCalendar()}</div>
            <div className="right w-[50%] pl-[90px] border-l border-[#A2C1C1]">
                <h4 className="text-[24px] text-[#3A7364] mb-[20px] font-bold">Mision</h4>
                <div className="listTag flex gap-[10px] items-center gap-[24px]">
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FF4C4C] rounded-full" />1 task
                    </div>
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FE7F42] rounded-full" />1 task
                    </div>
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FCCE3A] rounded-full" />1 task
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] mt-[20px]">
                    {mockDate.map((item) => (
                        <MissionItem key={item.chapter} chapter={item.chapter} type={item.type} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarUI;
