import { fetchListDataLeaderboard } from '@renderer/store/auth/AuthSlice';
import { PARAMS_DEFAULT } from '@shared/constants';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectPicker } from 'rsuite';

const LeaderboardContent = ({ activeTab }: any) => {
    const { user, dataLeaderboardUser, listDataLeaderboard } = useSelector((state: any) => state.auth);

    const [classId, setClassId] = useState<any>('');

    const dispatch = useDispatch();

    const changeClass = (value: any) => {
        setClassId(value);
        dispatch(fetchListDataLeaderboard({ ...PARAMS_DEFAULT, classId: value, type: activeTab }));
    };

    const _dataOption = useMemo(() => {
        return user?.classes.map((item: any) => ({ label: item?.name, value: item?.id }));
    }, [user]);

    useEffect(() => {
        if (user?.classes?.length > 0) {
            changeClass(user?.classes?.[0]?.id);
        }
    }, [user, activeTab]);

    const _top1 = listDataLeaderboard?.[0];
    const _top2 = listDataLeaderboard?.[1];
    const _top3 = listDataLeaderboard?.[2];

    return (
        <div className="ui-leaderboard-content flex gap-[65px] h-full overflow-hidden justify-between">
            <div className="boxLeft flex flex-col justify-between w-[50%]">
                <div className="boxLeftTop">
                    <SelectPicker data={_dataOption} searchable={false} style={{ width: '100%' }} placeholder="Select class" cleanable={false} onChange={changeClass} value={classId} />
                </div>

                <div className="boxLeftBottom flex relative items-end">
                    <div className="box-decor w-[100%] absolute top-0 left-0 translate-y-[-100%]">
                        <img src="./images/decor-bg.png" alt="" className="w-[100%] h-[100%] object-cover" />
                    </div>
                    <div className="box-1 w-[30%]">
                        <div className="w-[100%] h-auto aspect-[1/1] relative">
                            <img src={'./images/top-2.png'} alt="" className="w-[40px] absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-80%]" />
                            <div className="w-[100%] h-[100%] border-[4px] border-[#DFFCFC] rounded-full overflow-hidden">
                                <img src={_top2?.profileImage || './images/avt-1.png'} alt="avatar" className="w-[100%] h-[100%] rounded-full" />
                            </div>
                        </div>

                        <div className="box-color relative w-full z-0 py-[70px] mt-[20px]">
                            <img src={'./images/bg-top.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover rounded-tl-[20px] rounded-tr-[20px]" />
                            <div className="contentBox relative z-10 text-center px-[4px]">
                                <h4 className="font-bold leading-[24px] flex items-center justify-center text-[16px] text-[#fff] min-h-[68px]">{_top2?.fullname}</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">{_top2?.totalPoint}</div>
                            </div>
                        </div>
                    </div>
                    <div className="box-1 w-[40%]">
                        <div className="w-[100%] h-auto aspect-[1/1] relative">
                            <img src={'./images/top-1.png'} alt="" className="w-[40px] absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-80%]" />
                            <div className="w-[100%] h-[100%] border-[4px] border-[#FFC929] rounded-full overflow-hidden">
                                <img src={_top1?.profileImage || './images/avt-1.png'} alt="avatar" className="w-[100%] h-[100%] rounded-full" />
                            </div>
                        </div>
                        <div className="box-color relative w-full z-0 py-[120px] mt-[20px]">
                            <img src={'./images/bg-top-2.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover rounded-tl-[20px] rounded-tr-[20px]" />
                            <div className="contentBox relative z-10 text-center px-[4px]">
                                <h4 className="font-bold leading-[24px] flex items-center justify-center text-[16px] text-[#fff] min-h-[68px]">{_top1?.fullname}</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">{_top1?.totalPoint}</div>
                            </div>
                        </div>
                    </div>
                    <div className="box-1 w-[30%]">
                        <div className="w-[100%] h-auto aspect-[1/1] relative">
                            <img src={'./images/top-3.png'} alt="" className="w-[40px] absolute top-0 left-1/2 -translate-x-1/2 translate-y-[-80%]" />
                            <div className="w-[100%] h-[100%] border-[4px] border-[#DFFCFC] rounded-full overflow-hidden">
                                <img src={_top3?.profileImage || './images/avt-1.png'} alt="avatar" className="w-[100%] h-[100%] rounded-full" />
                            </div>
                        </div>
                        <div className="box-color relative w-full z-0 py-[70px] mt-[20px]">
                            <img src={'./images/bg-top.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover rounded-tl-[20px] rounded-tr-[20px]" />
                            <div className="contentBox relative z-10 text-center px-[4px]">
                                <h4 className="font-bold leading-[24px] flex items-center justify-center text-[16px] text-[#fff] min-h-[68px]">{_top3?.fullname}</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">{_top3?.totalPoint}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="boxRight w-[50%] overflow-y-auto">
                <div className="boxRight">
                    <div className="boxRightTop mb-[30px]">
                        <div className="current-rank bg-orange-200 rounded-full text-center px-[16px] py-[9px] relative z-10 overflow-hidden">
                            <img src="./images/bg-tag.png" alt="" className="w-[100%] h-[100%] absolute top-0 left-0 object-cover" />
                            <div className="text relative z-10 text-[#fff] flex justify-between items-center">
                                <div className="left flex items-center gap-[10px]">
                                    <div className="tag w-[38px] h-[38px] rounded-full bg-[#FA8443] flex items-center justify-center">
                                        <span className="text-[#fff] font-bold text-[16px]">{dataLeaderboardUser?.rank || 0}</span>
                                    </div>
                                    Your Current Rank
                                </div>
                                <div className="right text-[#fff] font-bold text-[16px]">{dataLeaderboardUser?.totalPoint || 0}</div>
                            </div>
                        </div>
                    </div>
                    <div className="boxRightBottom">
                        {listDataLeaderboard?.map((item: any, index: number) => (
                            <div key={item?.id || index} className="flex items-center justify-between mb-[30px]">
                                <div className="flex items-center">
                                    <div className="rank-circle bg-[#E7FCF7] rounded-full w-[36px] h-[36px] flex items-center justify-center mr-[20px] font-semibold text-[#000] text-[16px]">
                                        {item?.rank}
                                    </div>
                                    <img src={item?.profileImage || './images/avt.png'} alt="avatar" className="w-[36px] h-[36px] rounded-full mr-[20px]" />
                                    <span className="text-[#000] font-semibold">{item?.fullname}</span>
                                </div>
                                <span className="text-[#3A7364] font-bold">{item?.totalPoint}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardContent;
