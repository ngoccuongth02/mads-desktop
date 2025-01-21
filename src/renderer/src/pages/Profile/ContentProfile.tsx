import EditIcon from '@renderer/components/icon/EditIcon';

const ContentProfile = () => {
    return (
        <div className="box flex gap-[20px]">
            <div className="left w-[400px] bg-[#fff] p-[40px] rounded-[20px] h-[calc(100vh-130px)]">
                <div className="avt w-[120px] h-[120px] mx-auto">
                    <img src="./images/avt-1.png" alt="" className="w-[100%] h-[100%] object-cover" />
                </div>
                <h4 className="text-[16px] text-[#3A7364] font-bold text-center mt-[20px] flex items-center justify-center gap-[10px]">
                    Kathryn Murphy
                    <EditIcon />
                </h4>
            </div>
            <div className="right"></div>
        </div>
    );
};

export default ContentProfile;
