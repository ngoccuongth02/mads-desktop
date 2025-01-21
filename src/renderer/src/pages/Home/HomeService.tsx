import { Paths } from '@renderer/constants/paths';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const services = [
    { imgSrc: './images/icon-service-1.png', text: 'SAT Course', path: Paths.COURSE },
    { imgSrc: './images/icon-service-2.png', text: 'Lesson Record', path: Paths.COURSE_TYPE_IMAGE },
    { imgSrc: './images/icon-service-3.png', text: 'Instructions', path: Paths.COURSE_TYPE_IMAGE },
    { imgSrc: './images/icon-service-4.png', text: 'Vocabulary', path: Paths.COURSE_TYPE_IMAGE },
    { imgSrc: './images/icon-service-5.png', text: 'Purpose Test', path: Paths.COURSE_TYPE_IMAGE },
    { imgSrc: './images/icon-service-6.png', text: 'Trial Test', path: Paths.COURSE_TYPE_IMAGE },
];
const HomeService = () => {
    const dispatch = useDispatch();

    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as any));
    };

    return (
        <div className="service mb-[20px]">
            <h4 className="title-2 mb-[20px]">Service</h4>
            <div className="list flex gap-[12px] justify-between">
                {services.map((service, index) => (
                    <div key={index} className="item flex-center flex-col" onClick={() => changePath(service.path)}>
                        <div className="img w-[90px] h-[90px] flex-center bg-[#fff] rounded-[18px] flex-center cursor-pointer hover:scale-[1.1] transition-all duration-300 mb-[16px]">
                            <img src={service.imgSrc} alt="" />
                        </div>
                        <p className="text-[16px] text-[#BCC9C9]">{service.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeService;
