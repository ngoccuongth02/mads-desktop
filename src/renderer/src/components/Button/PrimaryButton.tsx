import { twMerge } from 'tailwind-merge';

const PrimaryButton = ({ children, className, active, ...props }: any) => {
    const styleButton = {};
    return (
        <button {...props} className={twMerge(`primary-button ${active ? 'active' : ''}`, className)} style={styleButton}>
            <div className="relative z-10 flex items-center gap-[10px]">{children}</div>
        </button>
    );
};

export default PrimaryButton;
