import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import TitleComp from '@renderer/components/TitleComp';
import CalendarUI from '@renderer/pages/Mission/CalendarUI';
import ListMission from '@renderer/pages/Mission/ListMission';
import { useState } from 'react';

const Mission = () => {
    const [activeTab, setActiveTab] = useState('Deadline');

    return (
        <div className="ui-mission bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Mission" />
                <div className="flex gap-2">
                    <PrimaryButton active={activeTab === 'Deadline'} onClick={() => setActiveTab('Deadline')}>
                        Deadline
                    </PrimaryButton>
                    <PrimaryButton active={activeTab === 'Calendar'} onClick={() => setActiveTab('Calendar')}>
                        Calendar
                    </PrimaryButton>
                </div>
            </div>
            <div className="bg-[#fff] p-[40px] rounded-[20px]">{activeTab === 'Deadline' ? <ListMission /> : <CalendarUI />}</div>
        </div>
    );
};

export default Mission;
