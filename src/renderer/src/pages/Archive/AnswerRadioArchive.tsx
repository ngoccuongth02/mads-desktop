import CloseIcon from '@renderer/components/icon/CloseIcon';
import { archiveActions } from '@renderer/store/archive/ArchiveSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnswerRadioArchive = ({ title, content, isActive, _id }: any) => {
    const [isCrossOut, setIsCrossOut] = useState(false);
    const { currentQuestionNumber, listDataAnswer } = useSelector((state: any) => state.archive);
    const dispatch = useDispatch();

    const handleChooseAnswer = () => {
        let _newList = [...listDataAnswer];
        let updatedAnswer = { ..._newList[currentQuestionNumber] };
        updatedAnswer.answers = [_id];
        _newList[currentQuestionNumber] = updatedAnswer;
        dispatch(archiveActions.setListDataAnswer(_newList));
    };

    return (
        <div className="flex items-center gap-[20px]">
            <div
                className={`cursor-pointer hover:text-[#3A7364] ${isCrossOut ? 'text-[#3A7364]' : 'text-[#BCC9C9]'} ${isActive ? 'pointer-events-none' : ''}`}
                onClick={() => setIsCrossOut(!isCrossOut)}
            >
                <CloseIcon />
            </div>
            <div
                className={`flex w-full items-center px-[20px] py-[16px] rounded-[10px] cursor-pointer hover:bg-[#51F0BA] hover:text-[#fff] text-[#000000] ${isCrossOut ? 'opacity-50 pointer-events-none' : ''} ${isActive ? 'bg-[#51F0BA] text-[#fff] customContent' : 'bg-[#F2FFF8] text-[#000000]'}`}
                onClick={handleChooseAnswer}
            >
                <span className="text-[24px] font-semibold mr-[20px]">{title}</span>
                <div className="text-[16px]" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default AnswerRadioArchive;
