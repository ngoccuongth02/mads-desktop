import CloseIcon from '@renderer/components/icon/CloseIcon';
import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnswerRadio = ({ title, content, isActive, _id, index }: any) => {
    const [isCrossOut, setIsCrossOut] = useState(false);
    const { listDataAnswer, currentQuestionNumber } = useSelector((state: any) => state.quizz);
    const dispatch = useDispatch();

    const handleChooseAnswer = () => {
        let _newList = [...listDataAnswer];
        let updatedAnswer = { ..._newList[currentQuestionNumber] };
        updatedAnswer.answerChooseId = _id;
        updatedAnswer.answerChooseIndex = index;
        updatedAnswer.isChoose = true;
        _newList[currentQuestionNumber] = updatedAnswer;
        dispatch(quizzActions.setListDataAnswer(_newList));
    };

    return (
        <div className="flex items-center gap-[20px] relative">
            <div
                className={`cursor-pointer hover:text-[#3A7364] ${isCrossOut ? 'text-[#3A7364]' : 'text-[#BCC9C9]'} ${isActive ? 'pointer-events-none' : ''}`}
                onClick={() => setIsCrossOut(!isCrossOut)}
            >
                <CloseIcon />
            </div>
            <div
                className={`flex w-full relative items-center px-[20px] py-[16px] rounded-[10px] cursor-pointer hover:bg-[#51F0BA] hover:text-[#fff] text-[#000000] ${isCrossOut ? 'opacity-50 pointer-events-none' : ''} ${isActive ? 'bg-[#51F0BA] text-[#fff]' : 'bg-[#F2FFF8] text-[#000000]'}`}
                onClick={handleChooseAnswer}
            >
                {isCrossOut && <div className="line absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-[1px] bg-[#BCC9C9] z-[10]"></div>}
                <span className="text-[24px] font-semibold mr-[20px]">{title}</span>
                <div className="text-[16px]" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default AnswerRadio;
