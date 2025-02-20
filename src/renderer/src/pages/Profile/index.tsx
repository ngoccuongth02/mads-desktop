import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import SettingIcon from '@renderer/components/icon/SettingIcon';
import TitleComp from '@renderer/components/TitleComp';
import ContentProfile from '@renderer/pages/Profile/ContentProfile';

const Profile = () => {
    return (
        <div className="ui-Profile bg-[#F4FBF7] max-w-[1649px]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Profile" />
                <div className="flex gap-2">
                    <PrimaryButton active>
                        <SettingIcon />
                        Setting
                    </PrimaryButton>
                </div>
            </div>

            <ContentProfile />
        </div>
    );
};

export default Profile;
