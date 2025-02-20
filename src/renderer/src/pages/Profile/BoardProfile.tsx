import { Box } from '@mui/material';
import CheckCircleIcon from '@renderer/components/icon/CheckCircleIcon';
import CrownIcon from '@renderer/components/icon/CrownIcon';
import MedalIcon from '@renderer/components/icon/MedalIcon';
import { handleGetDataRanking } from '@renderer/store/auth/AuthSlice';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectPicker } from 'rsuite';

const BoardProfile = () => {
    const { user, dataRanking } = useSelector((state: any) => state.auth);

    const [classId, setClassId] = useState<any>('');
    const dispatch = useDispatch();

    const changeClass = (value: any) => {
        setClassId(value);
        dispatch(handleGetDataRanking({ classId: value }));
    };

    const _dataOption = useMemo(() => {
        return user?.classes.map((item: any) => ({ label: item?.name, value: item?.id }));
    }, [user]);

    useEffect(() => {
        if (user?.classes?.length > 0) {
            changeClass(user?.classes?.[0]?.id);
        }
    }, [user]);

    return (
        <div className="BoardProfile space-y-[30px] h-full flex flex-col">
            <div className="topFilter">
                <div className="boxLeftTop mb-[30px]">
                    <SelectPicker data={_dataOption} searchable={false} style={{ width: '100%' }} placeholder="Select class" cleanable={false} onChange={changeClass} value={classId} />
                </div>
                <div className="flex justify-around items-center ">
                    <div className="flex flex-col items-center">
                        <Box className="text-[26px] mb-[10px]">
                            <CheckCircleIcon />
                        </Box>
                        <span className="text-white font-semibold text-[16px]">FINISHED TEST</span>
                        <span className="text-white text-[20px] font-bold">{dataRanking?.totalTest}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Box className="text-[30px] mb-[6px]">
                            <MedalIcon />
                        </Box>
                        <span className="text-white font-semibold text-[16px]">POINTS</span>
                        <span className="text-white text-[20px] font-bold">{dataRanking?.totalPoint || 0}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Box className="text-[30px] mb-[6px]">
                            <CrownIcon />
                        </Box>
                        <span className="text-white font-semibold text-[16px]">CLASS RANK</span>
                        <span className="text-white text-[20px] font-bold">#{dataRanking?.rank}</span>
                    </div>
                </div>
            </div>
            <div className="chartProfile bg-white rounded-[32px] p-[20px] flex-1">
                <div className="title-2 mb-[16px] text-center">Full Statistics</div>
                <div className="boxLeftTop mb-[30px]">
                    <SelectPicker
                        data={_dataOption}
                        searchable={false}
                        placeholder="Select class"
                        value={_dataOption?.[0]?.value}
                        cleanable={false}
                        style={{
                            color: '#333333',
                            width: '100%',
                        }}
                    />
                </div>
                <img src={'./images/chart.png'} alt="" className="w-full" />
                {/* <ChartProfile /> */}
            </div>
        </div>
    );
};

export default BoardProfile;
