import { Content, RootLayout, Sidebar } from '@/components';
import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ArchiveIcon from '@renderer/components/icon/ArchiveIcon';
import HomeIcon from '@renderer/components/icon/HomeIcon';
import LeaderboardIcon from '@renderer/components/icon/LeaderboardIcon';
import LogoutIcon from '@renderer/components/icon/LogoutIcon';
import MissionIcon from '@renderer/components/icon/MissionIcon';
import MyScoreIcon from '@renderer/components/icon/MyScoreIcon';
import ProfileIcon from '@renderer/components/icon/ProfileIcon';
import { specialLayout } from '@renderer/constants';
import { Paths } from '@renderer/constants/paths';
import { authActions } from '@renderer/store/auth/AuthSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MenuLayout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { path } = useSelector((state: any) => state.router);
    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as any));
    };

    const isSpecialLayout = useMemo(() => {
        return specialLayout.includes(path);
    }, [path]);

    return isSpecialLayout ? (
        <>{children}</>
    ) : (
        <RootLayout>
            <Sidebar className="flex flex-col gap-[16px] items-start justify-between">
                <div className="flex flex-col gap-[16px]">
                    <div className="image-menu mb-[20px]">
                        <img className="w-full h-auto" src={'./images/logo-menu.png'} alt="" />
                    </div>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.HOME} onClick={() => changePath(Paths.HOME)}>
                        <HomeIcon /> Overview
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.ARCHIVE} onClick={() => changePath(Paths.ARCHIVE)}>
                        <ArchiveIcon /> Archive
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.MISSION} onClick={() => changePath(Paths.MISSION)}>
                        <MissionIcon /> Mission
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.MY_SCORE} onClick={() => changePath(Paths.MY_SCORE)}>
                        <MyScoreIcon /> My Scores
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.LEADERBOARD} onClick={() => changePath(Paths.LEADERBOARD)}>
                        <LeaderboardIcon /> Leaderboard
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.PROFILE} onClick={() => changePath(Paths.PROFILE)}>
                        <ProfileIcon /> Profile
                    </PrimaryButton>
                    {/* <PrimaryButton className="justify-start w-full" active={path === Paths.NOTIFICATION} onClick={() => changePath(Paths.NOTIFICATION)}>
                        Notification
                    </PrimaryButton> */}
                </div>
                <div className="flex flex-col gap-[16px]">
                    <img src={'./images/img-menu.png'} alt="" className="w-full h-auto rounded-[16px]" />
                    <PrimaryButton className="justify-start w-full" onClick={() => dispatch(authActions.logout())}>
                        <LogoutIcon /> Logout
                    </PrimaryButton>
                </div>
            </Sidebar>

            <Content className={path === Paths.HOME ? 'bg-[#ffffff] pl-[0px] pt-[0px] pb-[0px]' : 'bg-[#F4FBF7]'}>{children}</Content>
        </RootLayout>
    );
};

export default MenuLayout;
