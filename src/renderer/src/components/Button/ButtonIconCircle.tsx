import ArrowIcon from '@renderer/components/icon/ArrowIcon';

const ButtonIconCircle = () => {
    return (
        <div className="btnCircle w-[38px] h-[38px] flex-center text-[#fff] text-[12px] relative cursor-pointer hover:scale-[1.1] transition-all duration-300 rotate-180">
            <img src="./images/bg-circle.png" alt="" className="w-full h-full object-cover absolute top-0 left-0" />
            <p className="relative z-[1]">
                <ArrowIcon />
            </p>
        </div>
    );
};

export default ButtonIconCircle;
