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
import { languageOptions } from '@renderer/languages';
import { authActions } from '@renderer/store/auth/AuthSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const MenuLayout = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const { path, lang } = useSelector((state: any) => state.router);
    const { t } = useTranslation();

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
                        <img className="w-full h-auto mx-auto" src={'./images/newlogo.png'} alt="" />
                    </div>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.HOME} onClick={() => changePath(Paths.HOME)}>
                        <HomeIcon /> {t('home')}
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.ARCHIVE} onClick={() => changePath(Paths.ARCHIVE)}>
                        <ArchiveIcon /> {t('archive')}
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.MISSION} onClick={() => changePath(Paths.MISSION)}>
                        <MissionIcon /> {t('mission')}
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.MY_SCORE} onClick={() => changePath(Paths.MY_SCORE)}>
                        <MyScoreIcon /> {t('my_score')}
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.LEADERBOARD} onClick={() => changePath(Paths.LEADERBOARD)}>
                        <LeaderboardIcon /> {t('leaderboard')}
                    </PrimaryButton>
                    <PrimaryButton className="justify-start w-full" active={path === Paths.PROFILE} onClick={() => changePath(Paths.PROFILE)}>
                        <ProfileIcon /> {t('profile')}
                    </PrimaryButton>
                    {/* <PrimaryButton className="justify-start w-full" active={path === Paths.NOTIFICATION} onClick={() => changePath(Paths.NOTIFICATION)}>
                        Notification
                    </PrimaryButton> */}
                </div>
                <div className="flex flex-col gap-[16px]">
                    <img src={'./images/img-menu.png'} alt="" className="w-full h-auto rounded-[16px]" />

                    <div className="lang flex items-center gap-[8px]">
                        {languageOptions.map((item, index) => (
                            <Fragment key={item.value}>
                                <h4
                                    className={`text-[16px]  cursor-pointer hover:text-[#3A7364] transition-all duration-300 hover:font-bold
                            ${lang === item.value ? 'text-[#3A7364] font-bold' : 'text-[#A2C1C1] font-medium '}
                            `}
                                    onClick={() => dispatch(routerActions.changeLang(item.value as any))}
                                >
                                    {item.label}
                                </h4>
                                {index !== languageOptions.length - 1 && <span className="text-[#3A7364] text-[16px] font-medium translate-y-[-1px]">|</span>}
                            </Fragment>
                        ))}
                    </div>
                    <PrimaryButton className="justify-start w-full" onClick={() => dispatch(authActions.logout())}>
                        <LogoutIcon /> {t('logout')}
                    </PrimaryButton>
                </div>
            </Sidebar>

            <Content className={path === Paths.HOME ? 'bg-[#ffffff] pl-[0px] pt-[0px] pb-[0px]' : 'bg-[#F4FBF7]'}>{children}</Content>
        </RootLayout>
    );
};

export default MenuLayout;
