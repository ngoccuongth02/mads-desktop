import useDebounce from '@renderer/hooks/useDebounce';
import { archiveActions } from '@renderer/store/archive/ArchiveSlice';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnswerTextArchive = () => {
    const { listDataAnswer, currentQuestionNumber } = useSelector((state: any) => state.archive);

    const [answerText, setAnswerText] = useState('');
    const dispatch = useDispatch();

    const handleChooseAnswer = () => {
        let _newList = [...listDataAnswer];
        let updatedAnswer = { ..._newList[currentQuestionNumber] };
        updatedAnswer.answerText = answerText;
        _newList[currentQuestionNumber] = updatedAnswer;
        dispatch(archiveActions.setListDataAnswer(_newList));
    };

    const debouncedHandleChooseAnswer = useDebounce(handleChooseAnswer, 500);

    useEffect(() => {
        if (answerText) {
            debouncedHandleChooseAnswer();
        }
    }, [answerText]);

    return (
        <div className="w-full">
            <div className="text-[16px] font-semibold mb-[10px]">Your answer is:</div>
            <input
                value={answerText}
                type="text"
                className="input border border-[#A2C1C1] rounded-[100px] px-[30px] py-[20px] text-[16px] font-medium"
                onChange={(e) => setAnswerText(e.target.value)}
            />
        </div>
    );
};

export default memo(AnswerTextArchive);
