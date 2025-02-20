import AccordionArchive from '@renderer/pages/Archive/AccordionArchive';
import { useSelector } from 'react-redux';

const ResultArchive = () => {
    const { listDataAnswer, listQuestionArchive } = useSelector((state: any) => state.archive);

    const listDataInCorrect =
        listQuestionArchive?.length > 0
            ? listQuestionArchive?.filter((it: any, index) => {
                  const type = it?.question?.type;
                  const idAns = it?.question?.answers?.find((itChild: any) => itChild.isCorrect)?._id;

                  const arrAns = listDataAnswer?.[index]?.answers?.includes(idAns);

                  const _answerText = it?.question?.answerText?.includes(listDataAnswer[index]?.answerText);

                  if (type == 1) {
                      return !arrAns;
                  }
                  if (type == 2) {
                      return !_answerText;
                  }
                  return false;
              })
            : [];

    const _listDataInCorrect = listDataInCorrect.map((it: any) => {
        const dataAns = listDataAnswer.find((itChild: any) => itChild.id == it?.id);
        return {
            ...it,
            customerAnswer: dataAns?.answers?.[0] ? [{ id: dataAns?.answers?.[0] }] : [],
            customerAnswerText: dataAns?.answerText || '',
        };
    });

    const _length = listQuestionArchive?.length || 0;
    const totalWrong = _listDataInCorrect?.length || 0;
    const totalRight = _length - totalWrong;

    return (
        <div className="font-sans leading-relaxed">
            <p>
                Total: <strong>{listQuestionArchive?.length} questions</strong>
            </p>
            <p>
                Total Right:{' '}
                <strong>
                    <span className="text-[#3A7364]">{totalRight}</span> / {_length} questions
                </strong>
            </p>
            <p>
                Total Wrong:{' '}
                <strong>
                    {' '}
                    <span className="error">{totalWrong}</span> / {_length} questions
                </strong>
            </p>
            <h3 className="text-[20px] font-semibold mb-[20px]">List wrong questions:</h3>
            {_listDataInCorrect?.map((test: any, index: number) => <AccordionArchive key={index} {...test} />)}
            {/* Add list of wrong questions here */}
        </div>
    );
};

export default ResultArchive;
