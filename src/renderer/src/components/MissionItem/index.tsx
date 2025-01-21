import PenIcon from '@renderer/components/icon/PenIcon';
import ScheduleIcon from '@renderer/components/icon/ScheduleIcon';
import WarningIcon from '@renderer/components/icon/WarningIcon';
import { useMemo } from 'react';

const MissionItem = ({ chapter, type, date }: any) => {
    const renderType = useMemo(() => {
        switch (type) {
            case 'warning':
                return (
                    <div className="bg-[#FF4C4C] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        <WarningIcon />
                        Warning
                    </div>
                );
            case 'available':
                return (
                    <div className="bg-[#FE7F42] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        Available
                    </div>
                );
            case 'lock':
                return (
                    <div className="bg-[#FCCE3A] text-white text-[12px] flex items-center absolute top-0 right-0 px-[4px] py-[4px] rounded-bl-[20px] rounded-tr-[20px] w-[106px] justify-center">
                        Lock
                    </div>
                );
        }
    }, [type]);

    return (
        <div key={chapter} className="bg-white px-[16px] pt-[30px] pb-[10px] gap-[16px] rounded-[30px] flex items-center shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] relative min-h-[120px]">
            <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer hover:bg-[#1ec28b] transition-all duration-300">
                <PenIcon />
            </div>
            <div>
                <div className="font-bold">Chapter {chapter}</div>
                <div className="text-[#BCC9C9] text-[16px] font-regular">System of Linear Equation</div>
                {date && (
                    <div className="text-green-500 flex items-center mt-2">
                        <ScheduleIcon />
                        <span className="ml-1">{date}</span>
                    </div>
                )}
            </div>
            {renderType}
        </div>
    );
};

export default MissionItem;
