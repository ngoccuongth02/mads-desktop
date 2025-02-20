import Loading from '@renderer/components/Loading';
import FooterQuizzArchive from '@renderer/pages/Archive/FooterQuizzArchive';
import HeaderQuizzArchive from '@renderer/pages/Archive/HeaderQuizzArchive';
import QuestionArchive from '@renderer/pages/Archive/QuestionArchive';
import { archiveActions, fetchQuestionArchive } from '@renderer/store/archive/ArchiveSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const TestArchive = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const getInitData = async () => {
        await dispatch(fetchQuestionArchive());
        setLoading(false);
    };

    useEffect(() => {
        getInitData();
        return () => {
            dispatch(archiveActions.resetArchive());
        };
    }, []);
    return (
        <div className="quizz bg-[#F4FBF7] flex flex-col items-center justify-center h-full">
            <Loading isLoading={loading} />
            {!loading && (
                <>
                    <HeaderQuizzArchive />

                    <QuestionArchive />
                    <FooterQuizzArchive />
                </>
            )}
        </div>
    );
};

export default TestArchive;
