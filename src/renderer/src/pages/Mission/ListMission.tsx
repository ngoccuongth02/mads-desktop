import MissionItem from '@renderer/components/MissionItem';
import { useState } from 'react';

const mockDate = [
    {
        chapter: '1',
        type: 'warning',
        date: '10:30:56',
    },
    {
        chapter: '2',
        type: 'available',
        date: '10:30:56',
    },
    {
        chapter: '3',
        type: 'lock',
        date: '10:30:56',
    },
    {
        chapter: '4',
        type: 'available',
        date: '10:30:56',
    },
    {
        chapter: '5',
        type: 'available',
        date: '10:30:56',
    },
    {
        chapter: '6',
        type: 'lock',
        date: '10:30:56',
    },
];

const ListMission = () => {
    const [activeTab, setActiveTab] = useState('Urgent Test');

    const tabs = ['Urgent Test', 'On Going', 'Available', 'Lock'];

    const renderContent = () => {
        // Placeholder content for each tab
        return (
            <div className="grid grid-cols-2 gap-4">
                {mockDate.map((item) => (
                    <MissionItem key={item.chapter} chapter={item.chapter} type={item.type} date={item.date} />
                ))}
            </div>
        );
    };
    return (
        <>
            <div className="flex gap-[40px] mb-[10px]">
                {tabs.map((tab) => (
                    <div key={tab} className={`cursor-pointer pb-[10px] ${activeTab === tab ? 'border-b-2 border-green-500 text-green-500' : 'text-[#BCC9C9]'}`} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </div>
                ))}
            </div>
            <div className="pt-[20px]">{renderContent()}</div>
        </>
    );
};

export default ListMission;
