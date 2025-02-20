import Breadcrumb from '@renderer/components/Breadcrumb';
import TitleComp from '@renderer/components/TitleComp';
import useSubject from '@renderer/hooks/useSubject';
import CourseItemImage from '@renderer/pages/Course/CourseItemImage';
import { useSelector } from 'react-redux';

// const mockData = [
//     {
//         name: 'Foundation',
//         description: 'Math and English Exercises  for Foundation courses',
//         imageBg: './images/subject-img-1.png',
//     },
//     {
//         name: 'SPRINT',
//         description: 'Math and English Test Preparation for Sptint courses',
//         imageBg: './images/subject-img-2.png',
//     },
//     {
//         name: 'Extra study',
//         description: 'Math and English Test Preparation for Sptint courses',
//         imageBg: './images/subject-img-3.png',
//     },
// ];
const CourseTypeImage = () => {
    const { listSubjectDetail } = useSelector((state: any) => state.home);
    const { dataBreadcrumb } = useSelector((state: any) => state.course);
    const { fetchSubjectData, backSubject } = useSubject();
    const onClick = (course: any) => {
        fetchSubjectData(course);
    };

    return (
        <div className="course-type-image">
            <Breadcrumb paths={dataBreadcrumb || []} />
            <div className="mt-[32px] mb-[40px]">
                <TitleComp title="SAT Courses" onClick={backSubject} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {listSubjectDetail.map((course: any, index: number) => (
                    <CourseItemImage key={course?.id || index} {...course} onClick={onClick} />
                ))}
            </div>
        </div>
    );
};

export default CourseTypeImage;
