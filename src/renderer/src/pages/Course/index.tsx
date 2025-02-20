import Breadcrumb from '@renderer/components/Breadcrumb';
import TitleComp from '@renderer/components/TitleComp';
import useSubject from '@renderer/hooks/useSubject';
import CourseItem from '@renderer/pages/Course/CourseItem';
import { useSelector } from 'react-redux';

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
const Course = () => {
    const { listSubjectDetail } = useSelector((state: any) => state.home);
    const { dataBreadcrumb } = useSelector((state: any) => state.course);
    const { fetchSubjectData, backSubject } = useSubject();

    const handleClick = async (course: any) => {
        fetchSubjectData(course);
    };

    const parentName = listSubjectDetail?.[0]?.parentID?.name || '';

    return (
        <div className="course">
            <Breadcrumb paths={dataBreadcrumb || []} />
            <div className="mt-[32px] mb-[40px]">
                <TitleComp title={parentName} onClick={backSubject} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                {listSubjectDetail.map((course: any, index: number) => (
                    <CourseItem key={course?.id || index} {...course} onClick={handleClick} />
                ))}
            </div>
        </div>
    );
};

export default Course;
