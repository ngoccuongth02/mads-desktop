import useDebounce from '@renderer/hooks/useDebounce';
import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AnswerText = () => {
    const { listDataAnswer, currentQuestionNumber, currentIDQuizz, dataSections } = useSelector((state: any) => state.quizz);

    const [answerText, setAnswerText] = useState('');
    const dispatch = useDispatch();

    const handleChooseAnswer = () => {
        let _newList = [...listDataAnswer];
        let updatedAnswer = { ..._newList[currentQuestionNumber] };
        updatedAnswer.answerText = answerText;
        updatedAnswer.answerTextRaw = answerText;
        updatedAnswer.isChoose = true;
        _newList[currentQuestionNumber] = updatedAnswer;
        dispatch(quizzActions.setListDataAnswer(_newList));
    };

    const debouncedHandleChooseAnswer = useDebounce(handleChooseAnswer, 500);

    useEffect(() => {
        if (answerText) {
            debouncedHandleChooseAnswer();
        }
    }, [answerText]);

    useEffect(() => {
        if (answerText) {
            setAnswerText('');
        }
    }, [currentIDQuizz, dataSections]);

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

export default memo(AnswerText);
