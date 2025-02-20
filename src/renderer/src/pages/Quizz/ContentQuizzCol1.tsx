import QuestionItem from '@renderer/pages/Quizz/QuestionItem';
import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ContentQuizzCol1 = () => {
    const dispatch = useDispatch();

    const { dataSections, dataRenderQuestion } = useSelector((state: any) => state.quizz);

    const convertData = async () => {
        const _child = dataSections?.childSection;
        if (_child?.length === 1 && _child?.[0]?.questions?.length > 0) {
            const newArray = _child?.[0]?.questions.map((it: any) => {
                const _data = _child?.[0] || {};
                return {
                    ..._data,
                    description: it?.description,
                    questions: it,
                };
            });
            const _section = {
                ...dataSections,
                childSection: newArray,
                contentChild: {
                    title: dataSections?.childSection?.[0]?.title,
                    description: dataSections?.childSection?.[0]?.description,
                    name: dataSections?.childSection?.[0]?.name,
                },
            };

            const _lisDataMark = _section?.childSection?.map((it: any, index: number) => {
                return {
                    id: it?.questions?.id,
                    isMark: false,
                    questionNumber: index,
                };
            });

            const _listDataAnswer = _section?.childSection?.map((it: any) => {
                return {
                    answerChooseId: '',
                    answerChooseIndex: '',
                    questionId: it?.questions?.id,
                    isChoose: false,
                    type: it?.questions?.type,
                };
            });
            dispatch(quizzActions.setListDataMark(_lisDataMark));
            dispatch(quizzActions.setDataRenderQuestion(_section));
            dispatch(quizzActions.setListDataAnswer(_listDataAnswer));
            dispatch(quizzActions.setCurrentQuestionNumber(0));
        }
    };

    useEffect(() => {
        if (!isEmpty(dataSections)) {
            //Case Convert data child section one col
            convertData();
        }
    }, [dataSections]);

    return (
        <div className="contentQuizz mt-[140px] mb-[100px] w-full h-full px-[40px] overflow-y-auto max-w-[1000px] mx-auto">
            <div className="bg-[#fff] w-full pt-[20px] px-[40px] rounded-tl-[22px] rounded-tr-[22px] pb-[20px] min-h-[100%]">
                <h2 className="text-lg font-bold mb-4">{dataRenderQuestion?.contentChild?.title}</h2>
                {dataRenderQuestion?.childSection?.map((it: any, index: number) => {
                    return <QuestionItem key={index} {...it} index={index} />;
                })}
            </div>
        </div>
    );
};

export default ContentQuizzCol1;
