import Breadcrumb from '@renderer/components/Breadcrumb';
import TitleComp from '@renderer/components/TitleComp';
import CourseItem from '@renderer/pages/Course/CourseItem';

const mockData = [
    {
        name: 'Daily Basic',
        description: '20 task',
        icon: './images/course-1.png',
    },
    {
        name: 'Expanded English',
        description: '20 task',
        icon: './images/course-2.png',
    },
    {
        name: 'Expanded Math',
        description: '20 task',
        icon: './images/course-3.png',
    },
    {
        name: 'Homework Math',
        description: '20 task',
        icon: './images/course-4.png',
    },
    {
        name: 'Homework Math 2',
        description: '20 task',
        icon: './images/course-5.png',
    },
];
const Course = () => {
    return (
        <div className="course">
            <Breadcrumb paths={['SAT Courses', 'Foundation']} />
            <div className="mt-[32px] mb-[40px]">
                <TitleComp title="Foundation" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                {mockData.map((course, index) => (
                    <CourseItem key={index} name={course.name} description={course.description} icon={course.icon} />
                ))}
            </div>
        </div>
    );
};

export default Course;
