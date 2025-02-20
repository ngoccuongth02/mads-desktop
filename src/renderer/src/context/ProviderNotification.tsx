import { Snackbar } from '@mui/material';
import CloseIcon from '@renderer/components/icon/CloseIcon';
import Loading from '@renderer/components/Loading';
import { Paths } from '@renderer/constants/paths';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'rsuite';

export const NotificationContext = createContext<any>(null);

const ProviderNotification = (props: any) => {
    //
    const [openNotification, setOpenNotification] = useState(false);

    const [loadingPage, setLoadingPage] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');

    const [typeNotification, setTypeNotification] = useState<'error' | 'success'>('error');

    const dispatch = useDispatch();
    const { listSubjectDetail, listQuizz } = useSelector((state: any) => state.home);
    const { path } = useSelector((state: any) => state.router);

    const [textError, setTextError] = useState('');

    const handleClose = () => {
        setOpenNotification(false);
    };

    const handleOpenNotification = (text: string) => {
        setTextError(text);
        setOpenNotification(true);
    };

    const isPathCourse = useMemo(() => {
        return path?.includes(Paths.COURSE) || path?.includes(Paths.COURSE_TYPE_IMAGE) || path?.includes(Paths.COURSE_QUIZZ);
    }, [path]);

    useEffect(() => {
        if (listSubjectDetail?.length == 0 && listQuizz?.length == 0 && isPathCourse) {
            dispatch(routerActions.changePath(Paths.HOME as any));
        }
    }, [listSubjectDetail, listQuizz, isPathCourse]);

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1000);
    }, []);

    return (
        <NotificationContext.Provider value={{ handleOpenNotification, typeNotification, setTypeNotification, setUrlVideo }} {...props}>
            <Loading isLoading={loadingPage} />

            <Snackbar
                open={openNotification}
                autoHideDuration={3000}
                message={
                    <Message type={typeNotification} className="w-full" style={{ width: '100%' }}>
                        {textError}
                    </Message>
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}
                sx={{ '& .MuiPaper-root': { background: 'white', padding: '0px', boxShadow: 'none' } }}
            />
            {props.children}
            {urlVideo && (
                <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-[#000]">
                    <div
                        className="icon absolute top-[10px] right-[10px] cursor-pointer border border-white rounded-full p-[5px] w-[40px] h-[40px] flex items-center justify-center text-white z-[60]"
                        onClick={() => setUrlVideo('')}
                    >
                        <CloseIcon />
                    </div>
                    <video src={urlVideo} autoPlay controls className="w-full h-full" />
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export default memo(ProviderNotification);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification has to be used within <NotificationContext.Provider>');
    }
    return context;
};
