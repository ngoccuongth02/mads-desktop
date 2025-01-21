import BreadcrumbIcon from '@renderer/components/icon/BreadcrumbIcon';
import React from 'react';

const Breadcrumb = ({ paths = ['SAT Courses', 'Foundation'], activeIndex = paths.length - 1 }) => {
    return (
        <div className="flex items-center text-[#BCC9C9] text-[16px]">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <span className="flex items-center pr-[10px]">
                            <BreadcrumbIcon />
                        </span>
                    )}
                    {index > 0 && <span className="mx-[8px]">›</span>}
                    <span className={`text-[16px] cursor-pointer ${index === activeIndex ? 'font-semibold' : ''}`}>{path}</span>
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;
