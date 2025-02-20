import Loading from '@renderer/components/Loading';
import MissionItem from '@renderer/components/MissionItem';
import useMissionCalendar from '@renderer/hooks/useMissionCalendar';
import { checkBackgroundMission, getTrueKeys } from '@renderer/utils';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { Calendar } from 'rsuite';
const CalendarUI = () => {
    const { handleSelect, listMissionByCalendar, numTaskUrgent, numTaskAvailable, numTaskOnGoing, numTaskLock, loadingMission } = useMissionCalendar();
    const { listEventCalendar } = useSelector((state: any) => state.mission);

    function renderCell(date: any) {
        const list = listEventCalendar.filter((item: any) => item.date == dayjs(date).format('YYYY-MM-DD') && (item.available || item.onGoing || item.urgent || item.lock));

        const _list = getTrueKeys(list?.[0] || {});

        if (list.length) {
            return (
                <div className="flex items-center gap-[4px] absolute bottom-[-4px] left-1/2 -translate-x-1/2">
                    {_list.map((item: any, index: number) => (
                        <div key={index} className={`w-[4px] h-[4px] rounded-full ${checkBackgroundMission(item)}`} />
                    ))}
                </div>
            );
        }
        return null;
    }
    return (
        <div className="flex gap-[30px] justify-between h-full">
            <div className="left w-[430px]">
                <Calendar compact onSelect={handleSelect} renderCell={renderCell} />
            </div>
            <div className="right w-[calc(100%-430px)] pl-[40px] border-l border-[#A2C1C1]">
                <h4 className="text-[24px] text-[#3A7364] mb-[20px] font-bold">Mission</h4>
                <div className="listTag flex items-center gap-[10px]">
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FF4C4C] rounded-full" />
                        {numTaskUrgent} task
                    </div>
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#51F0BA] rounded-full" />
                        {numTaskAvailable} task
                    </div>
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FCCE3A] rounded-full" />
                        {numTaskLock} task
                    </div>
                    <div className="tag w-fit flex items-center gap-[4px] px-[12px] py-[4px] rounded-[20px] cursor-pointer shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4FBF7]">
                        <span className="block w-[12px] h-[12px] bg-[#FE7F42] rounded-full" />
                        {numTaskOnGoing} task
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] mt-[20px] h-[calc(100%-85px)] overflow-y-auto pb-[20px] relative">
                    <Loading isLoading={loadingMission} />
                    {listMissionByCalendar?.length > 0 ? (
                        listMissionByCalendar.map((item: any, index: number) => <MissionItem key={index} {...item} />)
                    ) : (
                        <div className="text-[16px] font-regular opacity-0">No data</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarUI;
