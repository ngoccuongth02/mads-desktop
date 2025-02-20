import Typography from '@mui/material/Typography';
import { Paths } from '@renderer/constants/paths';
import { courseActions } from '@renderer/store/course/CourseSlice';
import { getSubjectDetail } from '@renderer/store/home/HomeSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch, useSelector } from 'react-redux';

// const services = [
//     { imageIconMobile: './images/icon-service-1.png', name: 'SAT Course', path: Paths.COURSE },
//     { imageIconMobile: './images/icon-service-2.png', name: 'Lesson Record', path: Paths.COURSE_TYPE_IMAGE },
//     { imageIconMobile: './images/icon-service-3.png', name: 'Instructions', path: Paths.COURSE_TYPE_IMAGE },
//     { imageIconMobile: './images/icon-service-4.png', name: 'Vocabulary', path: Paths.COURSE_TYPE_IMAGE },
//     { imageIconMobile: './images/icon-service-5.png', name: 'Purpose Test', path: Paths.COURSE_TYPE_IMAGE },
//     { imageIconMobile: './images/icon-service-6.png', name: 'Trial Test', path: Paths.COURSE_TYPE_IMAGE },
// ];
const HomeService = () => {
    const { listSubject } = useSelector((state: any) => state.home);

    const dispatch = useDispatch();

    const changePath = async (service: any) => {
        const res = await dispatch(getSubjectDetail(service?.id, service?.displayType));

        dispatch(courseActions.setDataBreadcrumb({ type: 'next', data: service }));
        if (res?.payload?.data?.subjects) {
            if (service?.displayType == 'card') {
                dispatch(routerActions.changePath(Paths.COURSE_TYPE_IMAGE as any));
            } else {
                dispatch(routerActions.changePath(Paths.COURSE as any));
            }
        }
    };
    return (
        <div className="service mb-[20px]">
            <h4 className="title-2 mb-[20px]">Service</h4>
            <div className="list flex gap-[12px] justify-between">
                {listSubject?.map((service: any, index: number) => (
                    <div key={service?.id || index} className="item flex-center flex-col" onClick={() => changePath(service)}>
                        <div className="img w-[90px] h-[90px] flex-center bg-[#fff] rounded-[18px] flex-center cursor-pointer hover:scale-[1.1] transition-all duration-300 mb-[16px]">
                            <img src={service?.imageIconMobile || ''} alt="" />
                        </div>
                        <Typography className="text-[16px] text-center text-[#BCC9C9] h-[48px]">{service?.name || ''}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeService;
