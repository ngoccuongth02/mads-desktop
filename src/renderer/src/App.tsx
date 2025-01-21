import '@renderer/languages/index';
import 'rsuite/dist/rsuite.css';

import MenuLayout from '@renderer/components/MenuLayout';
import { Paths } from '@renderer/constants/paths';
import { initLanguage } from '@renderer/languages';
import Course from '@renderer/pages/Course';
import CourseTypeImage from '@renderer/pages/Course/CourseTypeImage';
import ForgotPassword from '@renderer/pages/ForgotPassword';
import Home from '@renderer/pages/Home';
import Leaderboard from '@renderer/pages/Leaderboard';
import Login from '@renderer/pages/Login';
import Mission from '@renderer/pages/Mission';
import Notification from '@renderer/pages/Notification';
import Profile from '@renderer/pages/Profile';
import Register from '@renderer/pages/Register';
import Role from '@renderer/pages/Role';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

function App() {
    const { path } = useSelector((state: any) => state.router);
    const { user } = useSelector((state: any) => state.auth);

    useEffect(() => {
        initLanguage();
    }, []);

    const renderPage = useMemo(() => {
        switch (path) {
            case Paths.HOME:
                return <Home />;
            case Paths.MY_SCORE:
                return <>MY_SCORE</>;
            case Paths.ARCHIVE:
                return <>ARCHIVE</>;
            case Paths.CONTACT:
                return <>CONTACT</>;
            case Paths.PROFILE:
                return <Profile />;
            case Paths.LEADERBOARD:
                return <Leaderboard />;
            case Paths.MISSION:
                return <Mission />;
            case Paths.NOTIFICATION:
                return <Notification />;
            case Paths.COURSE:
                return <Course />;
            case Paths.COURSE_TYPE_IMAGE:
                return <CourseTypeImage />;

            default:
                return <Home />;
        }
    }, [path]);

    const renderPageNoLayout = useMemo(() => {
        switch (path) {
            case Paths.LOGIN:
                return <Login />;
            case Paths.REGISTER:
                return <Register />;
            case Paths.FORGOT_PASSWORD:
                return <ForgotPassword />;
            default:
                return <Role />;
        }
    }, [path]);

    // return user ? <MenuLayout>{renderPage}</MenuLayout> : <>{renderPageNoLayout}</>;
    return (
        <MenuLayout>
            <Home />
        </MenuLayout>
    );
}

export default App;
