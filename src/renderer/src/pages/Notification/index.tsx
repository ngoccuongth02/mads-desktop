import PenIcon from '@renderer/components/icon/PenIcon';
import TitleComp from '@renderer/components/TitleComp';

const Notification = () => {
    return (
        <div className="ui-notification bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Notification" />
            </div>
            <div className="mt-[25px]">
                <div className="flex items-center mb-[20px] bg-[#fff] p-[20px] rounded-[20px]">
                    <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer hover:bg-[#1ec28b] transition-all duration-300">
                        <PenIcon />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">Title notification</h2>
                        <p className="text-[#BCC9C9] font-regular">Lorem ipsum dolor sit amet, coetur adipiscing elit Lorem ipsum dolo</p>
                    </div>
                </div>
                <div className="flex items-center mb-[20px] bg-[#fff] p-[20px] rounded-[20px]">
                    <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer hover:bg-[#1ec28b] transition-all duration-300">
                        <PenIcon />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">Title notification</h2>
                        <p className="text-[#BCC9C9] font-regular">Lorem ipsum dolor sit amet, coetur adipiscing elit Lorem ipsum dolo</p>
                    </div>
                </div>
                <div className="flex items-center mb-[20px] bg-[#fff] p-[20px] rounded-[20px]">
                    <div className="bocIcon w-[60px] h-[60px] flex-center bg-[#EFFDF6] rounded-[10px] pt-[6px] cursor-pointer hover:bg-[#1ec28b] transition-all duration-300">
                        <PenIcon />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-bold">Title notification</h2>
                        <p className="text-[#BCC9C9] font-regular">Lorem ipsum dolor sit amet, coetur adipiscing elit Lorem ipsum dolo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
