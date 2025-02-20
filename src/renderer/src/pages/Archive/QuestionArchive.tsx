import QuestionArchiveItem from '@renderer/pages/Archive/QuestionArchiveItem';
import { useDispatch, useSelector } from 'react-redux';

const QuestionArchive = () => {
    const dispatch = useDispatch();

    const { listQuestionArchive } = useSelector((state: any) => state.archive);

    return (
        <div className="contentQuizz mt-[140px] mb-[100px] w-full h-full px-[40px] overflow-y-auto max-w-[1000px] mx-auto">
            <div className="bg-[#fff] w-full pt-[20px] px-[40px] rounded-tl-[22px] rounded-tr-[22px] pb-[20px]">
                {listQuestionArchive?.map((it: any, index: number) => {
                    return <QuestionArchiveItem key={index} {...it} index={index} />;
                })}
            </div>
        </div>
    );
};

export default QuestionArchive;
