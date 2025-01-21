import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import ArrowIcon from '@renderer/components/icon/ArrowIcon';
import Slider from 'react-slick';

const listCourse = [
    {
        id: 1,
        title: 'SAT Course',
        task: 20,
        img: './images/meo-1.png',
    },
    {
        id: 2,
        title: 'SAT Course',
        task: 20,
        img: './images/meo-2.png',
    },
    {
        id: 3,
        title: 'SAT Course',
        task: 20,
        img: './images/meo-3.png',
    },
    {
        id: 4,
        title: 'SAT Course',
        task: 20,
        img: './images/meo-2.png',
    },
];

const MyCourses = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplaySpeed: 2000,
    };
    return (
        <div className="my-courses">
            <div className="top flex justify-between items-center mb-[20px]">
                <h4 className="title-2">My Courses</h4>
                <div className="boxButton flex items-center gap-[10px]">
                    <div className="btnCircle w-[32px] h-[32px] flex-center bg-[#BCC9C9] rounded-[50%] cursor-pointer hover:bg-[#51F0BA] text-[#fff] text-[12px]">
                        <ArrowIcon />
                    </div>
                    <div className="btnCircle w-[32px] h-[32px] flex-center bg-[#BCC9C9] rounded-[50%] cursor-pointer hover:bg-[#51F0BA] text-[#fff] text-[12px] rotate-180">
                        <ArrowIcon />
                    </div>
                </div>
            </div>
            <div className="listSlider">
                <Slider {...settings}>
                    {listCourse.map((item: any, index: number) => (
                        <div key={index} className={'pr-[20px]'}>
                            <div className="item bg-[#fff] rounded-[18px] px-[30px] py-[25px] h-full">
                                <div className="img w-[100%] mb-[20px] aspect-[378/400] ">
                                    <img src={item.img} alt="" className="w-full h-full object-contain" />
                                </div>
                                <div className="bottom flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <h4 className="title-2 text-[16px]">{item.title}</h4>
                                        <p className="text-[12px] text-[#A2C1C1]">{item.task} task available</p>
                                    </div>
                                    <ButtonIconCircle />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MyCourses;
