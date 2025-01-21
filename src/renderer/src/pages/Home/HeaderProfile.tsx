const HeaderProfile = () => {
    return (
        <div className="flex items-center justify-between mb-[40px]">
            <div className="boxLeft flex items-center gap-[10px]">
                <img src="./images/avt-2.png" alt="" className="w-[44px] h-[44px] rounded-[50%]" />
                <div className="text flex flex-col">
                    <h4 className="title-2 text-[16px]">Kathryn Murphy</h4>
                    <p className="text-[#9BA5B3] text-[12px]">Nickname: Kat</p>
                </div>
            </div>
            <div className="boxRight flex items-center gap-[10px]">
                <div className="box flex items-center gap-[10px] px-[24px] py-[12px] bg-[#F4FBF7] rounded-[40px]">
                    <p className="text-[#3A7364] text-[16px] font-bold">190</p>
                    <img src="./images/mit.png" alt="" className="w-[16px]" />
                </div>
            </div>
        </div>
    );
};

export default HeaderProfile;
