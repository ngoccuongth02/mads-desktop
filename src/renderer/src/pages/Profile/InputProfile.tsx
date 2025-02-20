import { forwardRef } from 'react';

const InputProfile = forwardRef<HTMLInputElement, any>(({ label, ...props }, ref) => {
    return (
        <div className={`flex flex-col border-[1px] border-[#A2C1C1] rounded-[32px] px-[20px] py-[10px] w-[100%] ${props.disabled ? 'opacity-50' : ''}`}>
            <label className="text-[12px] text-[#333333] mb-[4px]">{label}</label>
            <input type="text" className="outline-none border-none text-[#3A7364] text-[16px] font-bold" ref={ref} {...props} />
        </div>
    );
});

export default InputProfile;
