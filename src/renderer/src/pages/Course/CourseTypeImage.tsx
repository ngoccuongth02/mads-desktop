import Breadcrumb from '@renderer/components/Breadcrumb';
import TitleComp from '@renderer/components/TitleComp';
import CourseItemImage from '@renderer/pages/Course/CourseItemImage';

const mockData = [
    {
        name: 'Foundation',
        description: 'Math and English Exercises  for Foundation courses',
        imageBg: './images/subject-img-1.png',
    },
    {
        name: 'SPRINT',
        description: 'Math and English Test Preparation for Sptint courses',
        imageBg: './images/subject-img-2.png',
    },
    {
        name: 'Extra study',
        description: 'Math and English Test Preparation for Sptint courses',
        imageBg: './images/subject-img-3.png',
    },
];
const CourseTypeImage = () => {
    return (
        <div className="course-type-image">
            <Breadcrumb paths={['SAT Courses']} />
            <div className="mt-[32px] mb-[40px]">
                <TitleComp title="SAT Courses" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                {mockData.map((course, index) => (
                    <CourseItemImage key={index} name={course.name} description={course.description} imageBg={course.imageBg} />
                ))}
            </div>
        </div>
    );
};

export default CourseTypeImage;
