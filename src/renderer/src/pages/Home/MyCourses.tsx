import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import ArrowIcon from '@renderer/components/icon/ArrowIcon';
import { Paths } from '@renderer/constants/paths';
import { getListQuizz } from '@renderer/store/home/HomeSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

// const listCourse = [
//     {
//         id: 1,
//         title: 'SAT Course',
//         task: 20,
//         img: './images/meo-1.png',
//     },
//     {
//         id: 2,
//         title: 'SAT Course',
//         task: 20,
//         img: './images/meo-2.png',
//     },
//     {
//         id: 3,
//         title: 'SAT Course',
//         task: 20,
//         img: './images/meo-3.png',
//     },
//     {
//         id: 4,
//         title: 'SAT Course',
//         task: 20,
//         img: './images/meo-2.png',
//     },
// ];

const MyCourses = () => {
    const { listMyCourse } = useSelector((state: any) => state.home);
    const dispatch = useDispatch();
    const ref = useRef<any>(null);

    const isMobile = window.innerWidth < 1440;
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isMobile ? 2.5 : 3.5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplaySpeed: 2000,
        draggable: false,
    };

    const next = () => {
        ref.current?.slickNext();
    };

    const prev = () => {
        ref.current?.slickPrev();
    };

    const moveToQuizz = async (course: any) => {
        await dispatch(getListQuizz(course?.id));
        dispatch(routerActions.changePath(Paths.COURSE_QUIZZ as any));
    };

    return (
        <div className="my-courses">
            <div className="top flex justify-between items-center mb-[20px]">
                <h4 className="title-2">My Courses</h4>
                <div className="boxButton flex items-center gap-[10px]">
                    <div className="btnCircle w-[32px] h-[32px] flex-center bg-[#BCC9C9] rounded-[50%] cursor-pointer hover:bg-[#51F0BA] text-[#fff] text-[12px]" onClick={prev}>
                        <ArrowIcon />
                    </div>
                    <div className="btnCircle w-[32px] h-[32px] flex-center bg-[#BCC9C9] rounded-[50%] cursor-pointer hover:bg-[#51F0BA] text-[#fff] text-[12px] rotate-180" onClick={next}>
                        <ArrowIcon />
                    </div>
                </div>
            </div>
            <div className="listSlider">
                {listMyCourse?.length > 0 ? (
                    <Slider {...settings} ref={ref}>
                        {listMyCourse?.map((item: any, index: number) => (
                            <div key={index} className={'pr-[20px] cursor-pointer'} onClick={() => moveToQuizz(item)}>
                                <div className="item bg-[#fff] rounded-[18px] px-[30px] py-[25px] h-full">
                                    <div className="img w-[100%] mb-[20px] aspect-[378/400] ">
                                        <img src={item.imageMyCourse || ''} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="bottom flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <h4 className="title-2 text-ellipsis line-clamp-1 capitalize text-[16px]">{item?.name?.toLowerCase()}</h4>
                                            <p className="text-[12px] text-ellipsis line-clamp-1 text-[#A2C1C1]">{item?.description}</p>
                                        </div>
                                        <div className="flexShrink-0">
                                            <ButtonIconCircle />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="w-full h-[200px] flex-center bg-[#fff] rounded-[18px] px-[30px] py-[25px]">
                        <h4 className="title-2 text-[16px]">No courses</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
