import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import TitleComp from '@renderer/components/TitleComp';
import LeaderboardContent from '@renderer/pages/Leaderboard/LeaderboardContent';
import { useState } from 'react';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('Deadline');

    return (
        <div className="ui-leaderboard bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Leaderboard" />
                <div className="flex gap-2">
                    <PrimaryButton active={activeTab === 'Foundation'} onClick={() => setActiveTab('Foundation')}>
                        Foundation
                    </PrimaryButton>
                    <PrimaryButton active={activeTab === 'Sprint'} onClick={() => setActiveTab('Sprint')}>
                        Sprint
                    </PrimaryButton>
                    <PrimaryButton active={activeTab === 'Extra'} onClick={() => setActiveTab('Extra')}>
                        Extra
                    </PrimaryButton>
                    <PrimaryButton active={activeTab === 'Other'} onClick={() => setActiveTab('Other')}>
                        Other
                    </PrimaryButton>
                </div>
            </div>
            <div className="bg-[#fff] p-[40px] rounded-[20px] h-[calc(100vh-130px)] min-w-[900px]">
                <LeaderboardContent />
            </div>
        </div>
    );
};

export default Leaderboard;
