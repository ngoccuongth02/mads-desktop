import { configureStore } from '@reduxjs/toolkit';
import ArchiveReducer from './archive/ArchiveSlice';
import AuthReducer from './auth/AuthSlice';
import CourseReducer from './course/CourseSlice';
import HomeReducer from './home/HomeSlice';
import MissionReducer from './mission/MissionSlice';
import MyScoreReducer from './myScore/MyScoreSlice';
import NotificationReducer from './notification/NotificationSlice';
import QuizzReducer from './quizz/QuizzSlice';
import RouterReducer from './routes/RouterSlice';

export const store = configureStore({
    reducer: {
        router: RouterReducer,
        auth: AuthReducer,
        home: HomeReducer,
        course: CourseReducer,
        mission: MissionReducer,
        notification: NotificationReducer,
        myScore: MyScoreReducer,
        quizz: QuizzReducer,
        archive: ArchiveReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
