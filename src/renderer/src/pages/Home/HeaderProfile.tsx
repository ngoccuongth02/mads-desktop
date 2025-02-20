import { useSelector } from 'react-redux';

const HeaderProfile = () => {
    const { user } = useSelector((state: any) => state.auth);

    return (
        <div className="flex items-center justify-between mb-[40px]">
            <div className="boxLeft flex items-center gap-[10px]">
                <img src={user?.profileImage || './images/avt-2.png'} alt="" className="w-[44px] h-[44px] rounded-[50%]" />
                <div className="text flex flex-col">
                    <h4 className="title-2 text-[16px]">
                        {user?.firstName} {user?.lastName}
                    </h4>
                    <p className="text-[#9BA5B3] text-[12px]">Nickname: {user?.nickName || 'No Nickname'}</p>
                </div>
            </div>
            <div className="boxRight flex items-center gap-[10px]">
                <div className="box flex items-center gap-[10px] px-[24px] py-[12px] bg-[#F4FBF7] rounded-[40px]">
                    <p className="text-[#3A7364] text-[16px] font-bold">{user?.totalPoint || 0}</p>
                    <img src="./images/mit.png" alt="" className="w-[16px]" />
                </div>
            </div>
        </div>
    );
};

export default HeaderProfile;
