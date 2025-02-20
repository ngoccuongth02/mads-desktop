import AnswerRadio from '@renderer/pages/Quizz/AnswerRadio';
import AnswerText from '@renderer/pages/Quizz/AnswerText';
import { useSelector } from 'react-redux';

const QuestionItemCol2 = ({ title, description, questions, index }: any) => {
    const { currentQuestionNumber, listDataAnswer } = useSelector((state: any) => state.quizz);
    return (
        <div className={`${currentQuestionNumber === index ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0'}`}>
            <div className="grid grid-cols-2 gap-[80px]">
                <div className="left">
                    <h2 className="text-lg font-bold mb-4">{title}</h2>
                    <div className="content" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className="right text-justify">
                    <h3 className="text-md font-semibold mb-[16px]">Which choice completes the text so that it conforms the conventions of Standard English?</h3>
                    <div className="answer space-y-[16px] w-full">
                        {questions?.length > 0 ? (
                            <>
                                {questions.map((item: any, index: number) => {
                                    return item.type === 1 ? (
                                        <div className="answer space-y-[16px] w-full" key={item?._id || index}>
                                            {item?.answers?.map((option: any, indexChild: number) => (
                                                <AnswerRadio
                                                    key={option?._id || indexChild}
                                                    {...option}
                                                    isActive={listDataAnswer[currentQuestionNumber]?.answerChooseId === option?._id}
                                                    index={indexChild}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <AnswerText key={index} />
                                    );
                                })}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionItemCol2;
