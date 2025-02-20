import AnswerRadio from '@renderer/pages/Quizz/AnswerRadio';
import AnswerText from '@renderer/pages/Quizz/AnswerText';
import { useSelector } from 'react-redux';

const QuestionItem = ({ description, questions, index }: any) => {
    const { currentQuestionNumber, listDataAnswer } = useSelector((state: any) => state.quizz);
    return (
        <div className={`${currentQuestionNumber === index ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}>
            <div className="mb-6 content" dangerouslySetInnerHTML={{ __html: description }} />
            {questions?.answers?.length > 0 ? (
                <div className="answer space-y-[16px] w-full">
                    {questions?.answers?.map((option: any, indexChild: number) => (
                        <AnswerRadio key={option?._id} {...option} isActive={listDataAnswer[currentQuestionNumber]?.answerChooseId === option?._id} index={indexChild} />
                    ))}
                </div>
            ) : (
                <AnswerText />
            )}
        </div>
    );
};

export default QuestionItem;
