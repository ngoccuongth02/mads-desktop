import Breadcrumb from '@renderer/components/Breadcrumb';
import TitleComp from '@renderer/components/TitleComp';
import { Paths } from '@renderer/constants/paths';
import { STORAGE } from '@renderer/constants/storage';
import { useNotification } from '@renderer/context/ProviderNotification';
import useSubject from '@renderer/hooks/useSubject';
import CourseItemQuizz from '@renderer/pages/Course/CourseItemQuizz';
import { quizzService } from '@renderer/services/quizz';
import { quizzActions } from '@renderer/store/quizz/QuizzSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch, useSelector } from 'react-redux';

// const mockDataBasic = [
//     {
//         name: 'Daily Basic',
//         description: '20 task',
//         icon: './images/course-1.png',
//         type: 'basic',
//     },
//     {
//         name: 'Expanded English',
//         description: '20 task',
//         icon: './images/course-2.png',
//         type: 'basic',
//     },
//     {
//         name: 'Expanded Math',
//         description: '20 task',
//         icon: './images/course-3.png',
//         type: 'basic',
//     },
//     {
//         name: 'Homework Math',
//         description: '20 task',
//         icon: './images/course-4.png',
//         type: 'basic',
//     },
//     {
//         name: 'Homework Math 2',
//         description: '20 task',
//         icon: './images/course-5.png',
//         type: 'basic',
//     },
// ];

// const mockDataAdvanced = [
//     {
//         name: 'Chapter 1',
//         description: 'Linear Equation - Graph foundarion',
//         icon: './images/course-11.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 2',
//         description: '20 task',
//         icon: './images/course-12.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 3',
//         description: 'Linear Equation - Graph foundarion',
//         icon: './images/course-11.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 4',
//         description: 'Linear Equation - Graph foundarion',
//         icon: './images/course-11.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 5',
//         description: 'System of Linear Equation',
//         icon: './images/course-12.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 6',
//         description: 'System of Linear Equation',
//         icon: './images/course-12.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 7',
//         description: 'System of Linear Equation',
//         icon: './images/course-11.png',
//         type: 'advanced',
//     },
//     {
//         name: 'Chapter 8',
//         description: 'System of Linear Equation',
//         icon: './images/course-12.png',
//         type: 'advanced',
//     },
// ];

interface Course {
    id: string;
    slug: string;
    isVideo: boolean;
    sections: Section[];
    subject: { name: string };
    isRevise?: boolean;
    video?: string;
}

interface Section {
    id: string;
}

const CourseQuizz = () => {
    const { listQuizz } = useSelector((state: { home: { listQuizz: Course[] } }) => state.home);
    const { dataBreadcrumb } = useSelector((state: { course: { dataBreadcrumb: any[] } }) => state.course);
    const { backSubject } = useSubject();
    const dispatch = useDispatch();
    const { handleNotification, setTypeNotification, setUrlVideo } = useNotification();

    const handleClick = async (course: Course) => {
        if (course.isVideo) {
            // show video
            setUrlVideo(course.video);

            const res = await quizzService.getVideo(course.slug);
            if (res?.data?.video) {
                setUrlVideo(res?.data?.video);
            }
        } else if (course.sections.length > 0) {
            const firstSectionId = course.sections[0].id;
            dispatch(quizzActions.setCurrentIDSection(firstSectionId));
            dispatch(
                quizzActions.setDataCurrentCourse({
                    id: course.id,
                    slug: course.slug,
                    sections: course.sections,
                    isRevise: course.isRevise,
                }),
            );
            dispatch(quizzActions.setIndexSection(0));
            dispatch(routerActions.changePath(Paths.QUIZZ as any));
            localStorage.setItem(STORAGE.indexSection, JSON.stringify(0));
        } else {
            handleNotification('No quiz found');
            setTypeNotification('error');
        }
    };

    const parentName = listQuizz[0]?.subject?.name || '';

    return (
        <div className="course">
            <Breadcrumb paths={dataBreadcrumb || []} />
            <div className="mt-[32px] mb-[40px]">
                <TitleComp title={parentName} onClick={backSubject} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                {listQuizz.map((course, index) => (
                    <CourseItemQuizz key={course.id || index} {...course} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
};

export default CourseQuizz;
