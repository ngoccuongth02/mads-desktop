import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import Loading from '@renderer/components/Loading';
import { Paths } from '@renderer/constants/paths';
import { STORAGE } from '@renderer/constants/storage';
import { useNotification } from '@renderer/context/ProviderNotification';
import useSubject from '@renderer/hooks/useSubject';
import ClockTime from '@renderer/pages/Quizz/ClockTime';
import ProgressBar from '@renderer/pages/Quizz/ProgressBar';
import { quizzService } from '@renderer/services/quizz';
import { fetchStartTime, quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Tooltip, Whisper } from 'rsuite';
const HeaderQuizz = ({ isTimeExceeded }: any) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataPerformance, setDataPerformance] = useState<any>({});

    const { handleOpenNotification } = useNotification();

    const { dataBreadcrumb } = useSelector((state: any) => state.course);
    const { fetchDataBackToSubject } = useSubject();

    //ModalDirection

    const { dataSections, dataRenderQuestion, currentQuestionNumber, dataStartTime, listDataAnswer, currentIDQuizz, indexSection, listIDQuizz, dataCurrentCourse, isCheckTime } = useSelector(
        (state: any) => state.quizz,
    );

    const [openModalFullScreen, setOpenModalFullScreen] = useState(false);

    const handleClearDataLocalStorage = () => {
        localStorage.removeItem(STORAGE.currentIDQuizz);
        localStorage.removeItem(STORAGE.listIDQuizz);
        localStorage.removeItem(STORAGE.indexSection);
        localStorage.removeItem(STORAGE.currentIDSection);
        localStorage.removeItem(STORAGE.dataCurrentCourse);
    };

    const handleFinish = async () => {
        setLoading(true);
        const _indexSection = parseInt(localStorage.getItem(STORAGE.indexSection) || indexSection || 0);
        const _dataUserAnswer = listDataAnswer
            .filter((it: any) => it.isChoose)
            ?.map((it: any) => ({ answerText: it.answerText || '', answers: it.answerChooseId ? [it.answerChooseId] : [], question: it.questionId, type: it.type }));

        const _dataAnswer = {
            answerQuestion: listDataAnswer,
            answers: _dataUserAnswer,
        } as any;

        if (dataCurrentCourse?.isRevise) {
            _dataAnswer.isRevise = true;
        }
        const res = await quizzService.submitAnswer(currentIDQuizz, _dataAnswer);

        // Check Revise case
        if (!res?.data?.isComplete) {
            dispatch(quizzActions.setDataSection(res?.data?.dataSection));
            setLoading(false);
            handleClose();
            handleOpenNotification('Your answers must be all correct before being able to check your score and move to the next lesson. Revise the wrong answer(s) now.');
            dispatch(quizzActions.setIsCheckTime(false));
            return;
        }

        // Check Submit case
        if ((res as any)?.statusCode === 200) {
            if (_indexSection < listIDQuizz?.length - 1) {
                localStorage.setItem(STORAGE.indexSection, (_indexSection + 1).toString());
                localStorage.setItem(STORAGE.currentIDQuizz, listIDQuizz[_indexSection + 1]);
                dispatch(fetchStartTime(listIDQuizz[_indexSection + 1]) as any);
                dispatch(quizzActions.setCurrentIDSection(dataCurrentCourse?.sections[_indexSection + 1]?.id));
                dispatch(quizzActions.setCurrentIDQuizz(listIDQuizz[_indexSection + 1]));
                dispatch(quizzActions.setIsCheckTime(true));
                setLoading(false);
                setOpen(false);

                return;
            }

            setOpenModalFullScreen(true);
            setLoading(false);
            setDataPerformance((res as any)?.data?.performance);
        }
        setLoading(false);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEndTime = () => {
        if (!isTimeExceeded) {
            handleFinish();
        }
    };

    const changeToMyScore = () => {
        handleClearDataLocalStorage();

        dispatch(routerActions.changePath(Paths.MY_SCORE as any));
    };
    const changeToHome = () => {
        handleClearDataLocalStorage();
        fetchDataBackToSubject(dataBreadcrumb?.[dataBreadcrumb?.length - 1]);
    };

    const tooltip = (
        <Tooltip>
            <div dangerouslySetInnerHTML={{ __html: dataSections?.direction }} />
        </Tooltip>
    );

    return (
        <>
            <Loading isLoading={loading} />
            <div className="fixed top-0 left-0 w-full py-[10px] px-[40px] bg-white h-[100px]">
                <div className="flex items-center justify-between relative w-full h-full">
                    <div className="flex items-center">
                        <span className="text-[#013237] font-medium text-[16px]">
                            Question {currentQuestionNumber + 1} of {dataRenderQuestion?.childSection?.length}
                        </span>
                    </div>

                    <div className="flex items-center flex-col">
                        {dataStartTime?.time && isCheckTime && <ClockTime time={dataStartTime?.time} startTime={dataStartTime?.startTime} onComplete={handleEndTime} />}

                        <div className="flex items-center text-[18px] gap-[10px]">
                            <span className="text-[#2C2C2C] text-[20px] font-medium">Section:</span>
                            <h4 className="text-[#3A7364] font-bold text-[20px]">{dataSections?.title}</h4>
                        </div>
                    </div>

                    <div className="right flex items-center gap-[40px]">
                        {dataSections?.direction && (
                            <div className="text-[#013237] text-[16px] font-medium cursor-pointer hover:text-[#3A7364]">
                                <Whisper placement="bottom" controlId="control-id-click" trigger="click" speaker={tooltip}>
                                    Direction
                                </Whisper>
                            </div>
                        )}
                        <PrimaryButton onClick={handleOpen} className="bg-[#F1FEFF] !text-[#3A7364] border-[#BCC9C9] border-[1px]">
                            Finish this section
                        </PrimaryButton>
                    </div>
                    <ProgressBar />
                </div>
            </div>
            <Modal open={open} onClose={handleClose} size="sm">
                <Modal.Header>
                    <Modal.Title className="text-[24px] mx-auto text-center text-[#2C2C2C] font-bold">Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '570px' }}>
                    <p className="text-[20px] text-[#2C2C2C] font-medium pb-[20px] text-center">
                        You are moving to the next section of the test. Please check this section carefully because you can not turn back.
                    </p>
                    <div className="flex justify-center">
                        <PrimaryButton active={true} onClick={handleFinish} className="bg-[#F1FEFF] !text-[#3A7364] border-[#BCC9C9] border-[1px]">
                            Submit
                        </PrimaryButton>
                    </div>
                </Modal.Body>
            </Modal>
            <div
                className={`fixed top-0 left-0 w-screen h-screen bg-[#fff] flex items-center justify-center z-[9999] duration-300 ${openModalFullScreen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="contentResult">
                    <p className="text-[#2C2C2C] text-center text-[20px] font-medium">You' ve completed</p>

                    <h4 className="text-[#3A7364] font-bold text-[20px] text-center">{dataSections?.title}</h4>

                    <div className="flex items-center justify-center my-[40px]">{dataPerformance?.image && <img src={dataPerformance?.image} alt="" className="w-[300px] h-[auto]" />}</div>
                    <p className="text-[#2C2C2C] text-center text-[20px] font-medium">You get</p>
                    <div className="box flex items-center gap-[10px] px-[24px] py-[12px] bg-[#F4FBF7] rounded-[40px] w-[100px] my-[20px] mx-auto">
                        <p className="text-[#3A7364] text-[16px] font-bold">{dataPerformance?.point || 0}</p>
                        <img src="./images/mit.png" alt="" className="w-[16px]" />
                    </div>
                    {/* <h4 className="text-[#3A7364] font-bold text-[20px] text-center">Correct Answers: </h4> */}

                    <div className="flex items-center justify-center gap-[10px]">
                        <PrimaryButton active={true} onClick={() => changeToMyScore()} className="bg-[#F1FEFF] !text-[#3A7364] border-[#BCC9C9] border-[1px]">
                            My score
                        </PrimaryButton>
                        <PrimaryButton onClick={() => changeToHome()} className="bg-[#F1FEFF] !text-[#3A7364] border-[#BCC9C9] border-[1px]">
                            Return to Quiz
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderQuizz;
