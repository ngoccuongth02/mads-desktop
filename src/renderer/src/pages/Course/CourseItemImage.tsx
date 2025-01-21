// src/renderer/src/pages/Course/CourseItemImage.tsx

import { Paths } from '@renderer/constants/paths';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const CourseItemImage = ({ name, description, imageBg }) => {
    const dispatch = useDispatch();

    const changePath = () => {
        dispatch(routerActions.changePath(Paths.COURSE as any));
    };
    return (
        <div
            className="px-[40px] py-[30px] rounded-[30px] aspect-[500/282] cursor-pointer hover:scale-105 transition-all duration-300"
            style={{ backgroundImage: `url(${imageBg})`, backgroundSize: 'cover' }}
            onClick={() => {
                changePath();
            }}
        >
            <div className="text-left max-w-[240px] opacity-0">
                <h2 className="text-[#3A7364] text-[24px] font-bold">{name}</h2>
                <p className="text-[#BCC9C9] text-[16px]">{description}</p>
            </div>
        </div>
    );
};

export default CourseItemImage;
