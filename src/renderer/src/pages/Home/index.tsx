import NotiIcon from '@renderer/components/icon/NotiIcon';
import { Paths } from '@renderer/constants/paths';
import HeaderProfile from '@renderer/pages/Home/HeaderProfile';
import HomeService from '@renderer/pages/Home/HomeService';
import MissionUIHome from '@renderer/pages/Home/MissionUIHome';
import MyCourses from '@renderer/pages/Home/MyCourses';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as any));
    };

    return (
        <div className="uihome flex max-w-[1920px] gap-[22px] h-full">
            <div className="left w-[calc(100%-430px)] min-w-[720px] bg-[#F4FBF7] px-[30px] py-[24px] rounded-[20px] h-full">
                <div className="top flex justify-between">
                    <div className="top-left flex items-center gap-[10px]">
                        <img src="./images/hi.png" alt="" className="w-[36px]" />
                        <h4 className="text-[20px] text-[#3A7364] font-bold">Welcome to MADS Digital SAT</h4>
                    </div>
                    <div className="top-right w-[44px] h-[44px] flex-center bg-[#fff] rounded-[50%] cursor-pointer hover:bg-[#51F0BA] hover:text-[#fff]" onClick={() => changePath(Paths.NOTIFICATION)}>
                        <NotiIcon />
                    </div>
                </div>
                <div className="img w-[100%] my-[32px]">
                    <img src="./images/banner-1.png" alt="" className="w-[100%] rounded-[20px]" />
                </div>
                <HomeService />
                <MyCourses />
            </div>
            <div className="right w-[430px] pr-[30px] py-[30px]">
                <HeaderProfile />
                <MissionUIHome />
            </div>
        </div>
    );
};

export default Home;
