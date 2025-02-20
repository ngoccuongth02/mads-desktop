import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import TitleComp from '@renderer/components/TitleComp';
import CalendarUI from '@renderer/pages/Mission/CalendarUI';
import ListMission from '@renderer/pages/Mission/ListMission';
import { useState } from 'react';

const Mission = () => {
    const [activeTab, setActiveTab] = useState('Deadline');

    return (
        <div className="ui-mission bg-[#F4FBF7] h-full flex flex-col">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Mission" />
                <div className="flex gap-[16px]">
                    <PrimaryButton active={activeTab === 'Deadline'} onClick={() => setActiveTab('Deadline')}>
                        Deadline
                    </PrimaryButton>
                    <PrimaryButton active={activeTab === 'Calendar'} onClick={() => setActiveTab('Calendar')}>
                        Calendar
                    </PrimaryButton>
                </div>
            </div>
            <div className="bg-[#fff] p-[20px] rounded-[20px] h-[calc(100%-70px)]">{activeTab === 'Deadline' ? <ListMission /> : <CalendarUI />}</div>
        </div>
    );
};

export default Mission;
