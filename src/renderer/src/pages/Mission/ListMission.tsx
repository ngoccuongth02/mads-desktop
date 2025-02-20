import Loading from '@renderer/components/Loading';
import MissionItem from '@renderer/components/MissionItem';
import { LIST_TYPE_MISSION } from '@renderer/constants';
import { getListMission, missionActions } from '@renderer/store/mission/MissionSlice';
import { PARAMS_DEFAULT } from '@shared/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ListMission = () => {
    const [activeTab, setActiveTab] = useState<any>(LIST_TYPE_MISSION[0].id);
    const [loadingMission, setLoadingMission] = useState(false);
    const tabs = LIST_TYPE_MISSION;
    const dispatch = useDispatch();

    const { listMission } = useSelector((state: any) => state.mission);

    const renderContent = () => {
        // Placeholder content for each tab
        return (
            <div className="grid grid-cols-2 gap-4">
                {listMission.length > 0 ? listMission.map((item: any, index: number) => <MissionItem key={index} {...item} />) : <div className="text-[16px] font-regular opacity-0">No data</div>}
            </div>
        );
    };

    const getInitData = async () => {
        await dispatch(getListMission({ ...PARAMS_DEFAULT, label: activeTab }));
        setLoadingMission(false);
    };

    const changeTab = async (id: any) => {
        dispatch(missionActions.setListMission([]));
        setLoadingMission(true);
        setActiveTab(id);
        await dispatch(getListMission({ ...PARAMS_DEFAULT, label: id }));
        setLoadingMission(false);
    };

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <>
            <div className="flex gap-[40px] mb-[10px]">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`cursor-pointer pb-[10px] ${activeTab === tab.id ? 'border-b-2 border-green-500 text-green-500' : 'text-[#BCC9C9]'}`}
                        onClick={() => changeTab(tab.id)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            <div className="pt-[20px] h-[calc(100%-50px)] overflow-y-auto relative">
                <Loading isLoading={loadingMission} />
                {renderContent()}
            </div>
        </>
    );
};

export default ListMission;
