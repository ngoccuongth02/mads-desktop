import AnswerRadioArchive from '@renderer/pages/Archive/AnswerRadioArchive';
import AnswerTextArchive from '@renderer/pages/Archive/AnswerTextArchive';
import { useSelector } from 'react-redux';

const QuestionArchiveItem = ({ question, index, description }: any) => {
    const { listDataAnswer, currentQuestionNumber } = useSelector((state: any) => state.archive);
    return (
        <div className={`overflow-auto ${currentQuestionNumber === index ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}>
            <div className="mb-6 content" dangerouslySetInnerHTML={{ __html: description }} />
            <div className="mb-6 content" dangerouslySetInnerHTML={{ __html: question?.description }} />
            {question?.answers?.length > 0 ? (
                <div className="answer space-y-[16px] w-full">
                    {question?.answers?.map((option: any, indexChild: number) => (
                        <AnswerRadioArchive key={option?._id} {...option} isActive={listDataAnswer[currentQuestionNumber]?.answers?.includes(option?._id)} index={indexChild} />
                    ))}
                </div>
            ) : (
                <AnswerTextArchive />
            )}
        </div>
    );
};

export default QuestionArchiveItem;
