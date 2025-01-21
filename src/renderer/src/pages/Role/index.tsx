import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ButtonIcon from '@renderer/components/icon/ButtonIcon';
import { Paths } from '@renderer/constants/paths';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Role = () => {
    const dispatch = useDispatch();
    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as any));
    };

    const [role, setRole] = useState<string>('');
    return (
        <div className="ui-role bg-[#FFFBF9] pt-[62px]">
            <div className="flex content maw-w-[734px] mx-auto flex-col items-center justify-between h-full min-h-screen">
                <div className="flex flex-col items-center gap-[32px]">
                    <img src={'./images/hi.png'} alt="" className="w-[60px]" />
                    <div className="title-1 text-center">
                        Welcome to
                        <br />
                        Ms Ánh Dạy SAT 1600
                    </div>
                    <div className="box-role flex gap-[16px]">
                        <div className={`${role === 'parent' ? 'border-[#1EC28B]' : 'border-[#fff]'} box-role-item`} onClick={() => setRole('parent')}>
                            <img src={'./images/icon-parent.png'} className="w-[78px] h-[78px]" alt="" />
                        </div>
                        <div className={`${role === 'student' ? 'border-[#1EC28B]' : 'border-[#fff]'} box-role-item`} onClick={() => setRole('student')}>
                            <img src={'./images/icon-student.png'} className="w-[78px] h-[78px]" alt="" />
                        </div>
                    </div>
                    <PrimaryButton className="w-[310px] uppercase font-extraBold" active={true} onClick={() => changePath(Paths.LOGIN)}>
                        <ButtonIcon /> Get started!
                    </PrimaryButton>
                    <div className="text-center text-[#333333] text-[16px] font-light">
                        By continuing to use this app, you understand and accept our <strong className="font-regular text-[#000]">privacy policy</strong> and agree to our{' '}
                        <strong className="font-regular text-[#000]">Terms</strong>
                    </div>
                </div>
                <div className="img-box-role max-w-[544px]">
                    <img src={'./images/img-role.png'} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Role;
