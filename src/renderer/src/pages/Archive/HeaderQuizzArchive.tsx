import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ResultArchive from '@renderer/pages/Archive/ResultArchive';
import { archiveService } from '@renderer/services/archive';
import { archiveActions } from '@renderer/store/archive/ArchiveSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'rsuite';
const HeaderQuizzArchive = ({}: any) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const [openModalFullScreen, setOpenModalFullScreen] = useState(false);
    const { listQuestionArchive, currentQuestionNumber, listDataAnswer } = useSelector((state: any) => state.archive);

    //ModalDirection
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleFinish = async () => {
        const res = (await archiveService.postAnswerArchive(listDataAnswer)) as any;
        if (res?.statusCode === 200) {
            setOpenModalFullScreen(true);
        }
    };

    const changeToList = () => {
        dispatch(archiveActions.setTypePage('list'));
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full py-[10px] px-[40px] bg-white h-[100px]">
                <div className="flex items-center justify-between relative w-full h-full">
                    <div className="flex items-center">
                        <span className="text-[#013237] font-medium text-[16px]">
                            Question {currentQuestionNumber + 1} of {listQuestionArchive?.length}
                        </span>
                    </div>

                    <div className="flex items-center flex-col">
                        <div className="flex items-center text-[18px] gap-[10px]">
                            <span className="text-[#2C2C2C] text-[20px] font-medium">Section:</span>
                            <h4 className="text-[#3A7364] font-bold text-[20px]">{listQuestionArchive?.[currentQuestionNumber]?.section?.name}</h4>
                        </div>
                    </div>

                    <div className="right flex items-center gap-[40px]">
                        <PrimaryButton onClick={handleOpen} className="bg-[#F1FEFF] !text-[#3A7364] border-[#BCC9C9] border-[1px]">
                            Finish this section
                        </PrimaryButton>
                    </div>
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
            <div className={`fixed top-0 p-[40px] left-0 w-screen h-screen overflow-y-auto bg-[#F4FBF7] z-[9999] duration-300 ${openModalFullScreen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex items-center justify-between mb-[20px]">
                    <h2 className="font-bold text-[28px] leading-[36px] text-[#3A7364]">Result</h2>

                    <PrimaryButton onClick={() => changeToList()} active={true}>
                        Back To List
                    </PrimaryButton>
                </div>
                <div className="contentResult">
                    <ResultArchive />
                </div>
            </div>
        </>
    );
};

export default HeaderQuizzArchive;
