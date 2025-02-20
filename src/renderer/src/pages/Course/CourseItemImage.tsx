// src/renderer/src/pages/Course/CourseItemImage.tsx

const CourseItemImage = (props: any) => {
    const { name, description, imageMobile, onClick } = props;

    return (
        <div
            className="px-[40px] py-[30px] rounded-[30px] aspect-[500/282] cursor-pointer relative overflow-hidden"
            onClick={() => {
                onClick(props);
            }}
        >
            <img src={imageMobile} alt="" className="w-[100%] h-[100%] object-cover object-top absolute top-0 left-0" />
            <div className="text-left max-w-[240px] z-10 relative">
                <h2 className="text-[#3A7364] text-[24px] font-bold">{name}</h2>
                <p className="text-[#BCC9C9] text-[16px]">{description}</p>
            </div>
        </div>
    );
};

export default CourseItemImage;
