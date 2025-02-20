import EditIcon from '@renderer/components/icon/EditIcon';
import { useNotification } from '@renderer/context/ProviderNotification';
import BoardProfile from '@renderer/pages/Profile/BoardProfile';
import FormProfile from '@renderer/pages/Profile/FormProfile';
import { authService } from '@renderer/services/auth';
import { authActions } from '@renderer/store/auth/AuthSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ContentProfile = () => {
    const { user } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const { handleOpenNotification, setTypeNotification } = useNotification();

    const [avatar, setAvatar] = useState<any>();

    const handleChangeAvatar = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            const fileExtension = file.name.split('.').pop(); // Get the file extension
            const customFileName = `avt.${fileExtension}`;
            formData.append('file', file, customFileName);
            const res = (await authService.updateProfileImage(formData)) as any;

            if (res?.statusCode == 201) {
                handleOpenNotification('Update successfully');
                setTypeNotification('success');
                dispatch(authActions.setUser(res?.data));
                const blobUrl = URL.createObjectURL(file);
                setAvatar(blobUrl); //
            } else {
                handleOpenNotification('Fail');
                setTypeNotification('error');
            }
        }
    };

    return (
        <div className="box flex gap-[20px]">
            <div className="left w-[400px] bg-[#fff] pb-[20px] rounded-[20px] min-h-[calc(100vh-130px)]">
                <div className="topContent p-[40px]">
                    <div className="avt w-[120px] h-[120px] mx-auto relative">
                        <input type="file" className="opacity-0 absolute top-0 left-0 w-[100%] h-[100%]" onChange={handleChangeAvatar} accept="image/*" />
                        <img src={avatar || user?.profileImage || './images/avt-1.png'} alt="" className="w-[100%] h-[100%] object-cover rounded-[50%]" />
                    </div>
                    <h4 className="text-[16px] text-[#3A7364] font-bold text-center mt-[20px] flex items-center justify-center gap-[10px]">
                        {user?.firstName} {user?.lastName}
                        <EditIcon />
                    </h4>
                </div>

                <FormProfile />
            </div>
            <div className="right w-[calc(100%-400px)] h-[calc(100vh-130px)]">
                <BoardProfile />
            </div>
        </div>
    );
};

export default ContentProfile;
