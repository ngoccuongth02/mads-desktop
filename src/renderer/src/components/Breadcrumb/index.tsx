import BreadcrumbIcon from '@renderer/components/icon/BreadcrumbIcon';
import useSubject from '@renderer/hooks/useSubject';
import { courseActions } from '@renderer/store/course/CourseSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const Breadcrumb = ({ paths = [], activeIndex = paths.length - 1 }: any) => {
    const dispatch = useDispatch();
    const { fetchDataBackToSubject } = useSubject();
    const backToPathCourse = (_path: any, index: number) => {
        const _newData = paths.filter((_: any, _index: number) => _index <= index);
        dispatch(courseActions.setBreadcrumbByData(_newData));
        fetchDataBackToSubject(_path);
    };

    if (paths?.length == 0) {
        return <></>;
    }
    return (
        <div className="flex items-center text-[#BCC9C9] text-[16px]">
            {paths.map((path: any, index: number) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <span className="flex items-center pr-[10px]">
                            <BreadcrumbIcon />
                        </span>
                    )}
                    {index > 0 && <span className="mx-[8px]">{'>'}</span>}
                    <span className={`text-[16px] cursor-pointer ${index === activeIndex ? 'font-semibold pointer-events-none' : ''}`} onClick={() => backToPathCourse(path, index)}>
                        {path?.name}
                    </span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;
