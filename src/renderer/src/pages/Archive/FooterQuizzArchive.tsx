import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import AllQuestionIcon from '@renderer/components/icon/AllQuestionIcon';
import ArrowIcon from '@renderer/components/icon/ArrowIcon';
import CurrentPointIcon from '@renderer/components/icon/CurrentPointIcon';
import DemosIcon from '@renderer/components/icon/DemosIcon';
import MarkIcon from '@renderer/components/icon/MarkIcon';
import MarkIconActive from '@renderer/components/icon/MarkIconActive';
import { archiveActions } from '@renderer/store/archive/ArchiveSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'rsuite';

const FooterQuizzArchive = () => {
    const dispatch = useDispatch();
    const { listQuestionArchive, listDataMark, currentQuestionNumber, listDataAnswer } = useSelector((state: any) => state.archive);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleMark = () => {
        const _isCurrentQuestionMark = listDataMark?.[currentQuestionNumber]?.isMark;
        const _listDataMark = listDataMark.map((it: any) => {
            if (it.questionNumber === currentQuestionNumber) {
                return { ...it, isMark: !_isCurrentQuestionMark };
            }
            return it;
        });
        dispatch(archiveActions.setListDataMark(_listDataMark));
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white py-[30px] px-[40px] flex items-center">
                <div className="flex justify-between items-center w-full">
                    <div className="flex space-x-[20px]">
                        <div className="blockIcon flex items-center gap-[10px] cursor-pointer hover:text-[#1EC28B] text-[#BCC9C9] text-[16px]" onClick={handleMark}>
                            {listDataMark?.[currentQuestionNumber]?.isMark ? <MarkIconActive /> : <MarkIcon />}
                            <span>Mark for review</span>
                        </div>
                        <div className="blockIcon flex items-center gap-[10px] cursor-pointer hover:text-[#1EC28B] text-[#BCC9C9] text-[16px]">
                            <DemosIcon />
                            <span>Demos</span>
                        </div>
                        <div className="blockIcon flex items-center gap-[10px] cursor-pointer hover:text-[#1EC28B] text-[#BCC9C9] text-[16px]" onClick={handleOpen}>
                            <AllQuestionIcon />
                            <span>All Question</span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {currentQuestionNumber > 0 && (
                            <PrimaryButton className="border-[#BCC9C9] border-[1px]" onClick={() => dispatch(archiveActions.setCurrentQuestionNumber(currentQuestionNumber - 1))}>
                                <ArrowIcon /> Question {parseInt(currentQuestionNumber + 1) - 1}
                            </PrimaryButton>
                        )}
                        {currentQuestionNumber < listQuestionArchive?.length - 1 && (
                            <PrimaryButton className="border-[#BCC9C9] border-[1px]" onClick={() => dispatch(archiveActions.setCurrentQuestionNumber(currentQuestionNumber + 1))}>
                                Question {parseInt(currentQuestionNumber + 1) + 1}
                                <div className="rotate-180">
                                    <ArrowIcon />
                                </div>
                            </PrimaryButton>
                        )}
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title className="text-[20px] text-center text-[#2C2C2C] font-bold">All Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="boxInfo flex justify-center items-center gap-[60px] py-[22px] border-t-[1px] border-[#F1F1F1] border-b-[1px] w-fit mx-auto mb-[20px]">
                        <div className="info flex items-center gap-[10px]">
                            <CurrentPointIcon />
                            <span>Current Point</span>
                        </div>
                        <div className="info flex items-center gap-[10px]">
                            <div className="w-[24px] h-[24px] bg-[#EEFDF4] rounded-[4px]"></div>
                            <span>Unanswered</span>
                        </div>
                        <div className="info flex items-center gap-[10px]">
                            <MarkIconActive />
                            <span>For Review</span>
                        </div>
                    </div>
                    <div className="pb-[50px]">
                        <div className="mb-[32px]">
                            <p className="text-[16px] font-bold text-[#2C2C2C]">Section: {listQuestionArchive?.[currentQuestionNumber]?.section?.name}</p>
                        </div>
                        <div className="flex flex-wrap gap-[20px] justify-start">
                            {listQuestionArchive?.map((_: any, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        dispatch(archiveActions.setCurrentQuestionNumber(index));
                                        handleClose();
                                    }}
                                    className={`w-[80px] relative h-[80px] flex items-center justify-center rounded-[12px] text-[16px] font-bold text-[#2C2C2C] cursor-pointer ${listDataAnswer?.[index]?.answers?.length > 0 || listDataAnswer?.[index]?.answerText ? 'bg-[#51F0BA] text-[#fff]' : 'bg-[#EEFDF4]'}`}
                                >
                                    {index === currentQuestionNumber && (
                                        <div className="currentQuestion absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                            <CurrentPointIcon />
                                        </div>
                                    )}
                                    {listDataMark?.[index]?.isMark && (
                                        <div className="markForReview absolute top-0 right-0 translate-x-[50%] translate-y-[-50%]">
                                            <MarkIconActive />
                                        </div>
                                    )}
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FooterQuizzArchive;
