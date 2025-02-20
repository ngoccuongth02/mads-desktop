import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import QuestionItemCol2 from '@renderer/pages/Quizz/QuestionItemCol2';
import { useEffect, useState } from 'react';

const ContentQuizzCol2 = () => {
    const [selectedText, setSelectedText] = useState('');
    const { listDataAnswer } = useSelector((state: any) => state.quizz);
    const dispatch = useDispatch();
    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (selection) {
            setSelectedText(selection.toString());
        }
    };

    const { dataSections, dataRenderQuestion } = useSelector((state: any) => state.quizz);

    const convertData = async () => {
        const _child = dataSections?.childSection || [];

        const _lisDataMark = _child?.map((it: any, index: number) => {
            return {
                id: it?.questions?.id,
                isMark: false,
                questionNumber: index,
            };
        });

        const _listDataAnswer = _child?.map((it: any) => {
            return {
                answerChooseId: '',
                answerChooseIndex: '',
                questionId: it?.questions?.[0]?.id,
                isChoose: false,
                type: it?.questions?.[0]?.type,
            };
        });
        dispatch(quizzActions.setListDataMark(_lisDataMark));
        dispatch(quizzActions.setDataRenderQuestion({ contentChild: _child, ...dataSections }));
        dispatch(quizzActions.setListDataAnswer(_listDataAnswer));
        dispatch(quizzActions.setCurrentQuestionNumber(0));
    };

    useEffect(() => {
        if (!isEmpty(dataSections)) {
            //Case Convert data child section one col
            convertData();
        }
    }, [dataSections]);

    return (
        <div className="contentQuizz mt-[140px] mb-[100px] w-full h-full px-[40px] overflow-y-auto" onMouseUp={handleMouseUp}>
            <div className="bg-[#fff] w-full pt-[20px] px-[40px] rounded-tl-[22px] rounded-tr-[22px] pb-[20px] min-h-[100%]">
                {dataRenderQuestion?.contentChild?.length > 0 &&
                    dataRenderQuestion?.contentChild?.map((item: any, index: number) => <QuestionItemCol2 key={item?.id || index} {...item} index={index} />)}
            </div>
        </div>
    );
};

export default ContentQuizzCol2;
