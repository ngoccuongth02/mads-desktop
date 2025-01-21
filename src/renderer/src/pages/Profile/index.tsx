import TitleComp from '@renderer/components/TitleComp';
import ContentProfile from '@renderer/pages/Profile/ContentProfile';

const Profile = () => {
    return (
        <div className="ui-Profile bg-[#F4FBF7]">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Profile" />
            </div>

            <ContentProfile />
        </div>
    );
};

export default Profile;
