import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import TitleComp from '@renderer/components/TitleComp';
import { LIST_TYPE_LEADERBOARD } from '@renderer/constants';
import LeaderboardContent from '@renderer/pages/Leaderboard/LeaderboardContent';
import { useState } from 'react';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState<any>(LIST_TYPE_LEADERBOARD[0].id);

    return (
        <div className="ui-leaderboard bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Leaderboard" />
                <div className="flex gap-2">
                    {LIST_TYPE_LEADERBOARD.map((item: any, index: number) => (
                        <PrimaryButton active={activeTab === item.id} onClick={() => setActiveTab(item.id)} key={item?.id || index}>
                            <p className="uppercase">{item.name}</p>
                        </PrimaryButton>
                    ))}
                </div>
            </div>
            <div className="bg-[#fff] p-[40px] rounded-[20px] h-[calc(100vh-130px)] min-w-[900px]">
                <LeaderboardContent activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Leaderboard;
