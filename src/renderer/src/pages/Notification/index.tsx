import PenIcon from '@renderer/components/icon/PenIcon';
import TitleComp from '@renderer/components/TitleComp';
import { fetchListNotification } from '@renderer/store/notification/NotificationSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = () => {
    const dispatch = useDispatch();
    const { listNotification } = useSelector((state: any) => state.notification);

    const getInitData = () => {
        dispatch(fetchListNotification({ page: 1, limit: 100 } as any) as any);
    };
    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div className="ui-notification bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Notification" />
            </div>
            <div className="mt-[25px]">
                {listNotification.map((item: any, index: number) => (
                    <div className="flex items-center mb-[20px] bg-[#fff] p-[20px] rounded-[20px]" key={item?.id || index}>
                        <div className="bocIcon rounded-[10px] overflow-hidden flex-shrink-0 w-[60px] h-[60px] flex-center bg-[#EFFDF6] pt-[6px] cursor-pointer hover:bg-[#1ec28b] transition-all duration-300">
                            {item?.image ? <img src={item?.image || item?.logo} alt="" className="w-full h-full object-cover" /> : <PenIcon />}
                        </div>
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">{item?.title}</h2>
                            <p className="text-[#BCC9C9] font-regular">{item?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
