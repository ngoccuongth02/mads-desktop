import { twMerge } from 'tailwind-merge';

const PrimaryButton = ({ children, className, active, ...props }: any) => {
    return (
        <button
            {...props}
            className={twMerge('primary-button', className)}
            style={{
                background: active ? 'linear-gradient(145deg, #51F0BA, #1EC28B)' : '#fff',
                boxShadow: active ? '5px 5px 15px #d1f5e8, -5px -5px 15px #ffffff' : 'none',
                color: active ? '#fff' : '#A2C1C1',
            }}
        >
            <div className="relative z-10 flex items-center gap-[10px]">{children}</div>
        </button>
    );
};

export default PrimaryButton;
