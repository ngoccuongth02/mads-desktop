import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ButtonIcon from '@renderer/components/icon/ButtonIcon';
import { Paths } from '@renderer/constants/paths';
import { useNotification } from '@renderer/context/ProviderNotification';
import { authService } from '@renderer/services/auth';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { handleOpenNotification, setTypeNotification } = useNotification();
    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as never));
    };

    const _handleForgotPassword = async (data: any) => {
        const res = (await authService.forgotPassword(data)) as any;
        if (res?.statusCode === 200) {
            setTypeNotification('success');
            handleOpenNotification('Forgot password successfully, Please check your email and reset password');
            changePath(Paths.LOGIN);
        } else {
            setTypeNotification('error');
            handleOpenNotification(res?.message || 'Forgot password failed');
        }
    };

    return (
        <div className="ui-forgot-password flex min-h-screen">
            <div className="left bg-[#F4FBF7] w-[50%] flex items-center justify-center">
                <div className="max-w-[400px] w-full px-8">
                    <div className="title-1 text-center mb-8">Forgot Password</div>
                    <form className="flex flex-col gap-[24px] font-regular" onSubmit={handleSubmit(_handleForgotPassword)}>
                        <input type="email" placeholder="Email" className="input" {...register('email', { required: 'Email is required' })} />
                        {errors.email && <p className="error">{errors.email.message as string}</p>}
                        <PrimaryButton type="submit" className="w-full mt-[40px]" active={true}>
                            <ButtonIcon /> REGISTER
                        </PrimaryButton>
                    </form>
                    <div className="text-center mt-4 font-regular text-[14px]">
                        Back to{' '}
                        <strong className="cursor-pointer hover:text-[#1EC28B]" onClick={() => changePath(Paths.LOGIN)}>
                            Log-in
                        </strong>
                    </div>
                </div>
            </div>
            <div className="right bg-[#FFFBF9] w-[50%] px-[60px] py-[20px] flex-center">
                <div className="flex-center max-w-[642px] mx-auto">
                    <img src={'./images/img-forgot-password.png'} alt="" />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
