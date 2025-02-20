import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ButtonIcon from '@renderer/components/icon/ButtonIcon';
import { Paths } from '@renderer/constants/paths';
import { useNotification } from '@renderer/context/ProviderNotification';
import { authService } from '@renderer/services/auth';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { handleOpenNotification, setTypeNotification } = useNotification();

    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as never));
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const res = (await authService.register(data)) as any;
        if (res?.data?.statusCode === 201) {
            setTypeNotification('success');
            handleOpenNotification(res?.data?.message || 'Register successfully');
            setTimeout(() => {
                dispatch(routerActions.changePath(Paths.LOGIN as never));
            }, 2000);
        } else {
            setTypeNotification('error');
            handleOpenNotification(res?.response?.data?.message || 'Register failed');
        }
        setIsLoading(false);
    };

    return (
        <div className="ui-register flex min-h-screen">
            <div className="left bg-[#F4FBF7] w-[50%] flex items-center justify-center">
                <div className="max-w-[400px] w-full px-8">
                    <div className="title-1 text-center mb-8">Register</div>
                    <form className="flex flex-col gap-[24px] font-regular" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input type="text" placeholder="First name" className="input" {...register('firstName', { required: 'First name is required' })} />
                            {errors.firstName && <span className="error">{errors.firstName.message as string}</span>}
                        </div>
                        <div>
                            <input type="text" placeholder="Last name" className="input" {...register('lastName', { required: 'Last name is required' })} />
                            {errors.lastName && <span className="error">{errors.lastName.message as string}</span>}
                        </div>
                        <div>
                            <input type="email" placeholder="Email" className="input" {...register('email', { required: 'Email is required' })} />
                            {errors.email && <span className="error">{errors.email.message as string}</span>}
                        </div>
                        <div>
                            <input type="password" placeholder="Password" className="input" {...register('password', { required: 'Password is required' })} />
                            {errors.password && <span className="error">{errors.password.message as string}</span>}
                        </div>
                        <PrimaryButton type="submit" className={`w-full relative mt-[40px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} active={true} disabled={isLoading}>
                            <>
                                REGISTER
                                <ButtonIcon />
                            </>
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
                    <img src={'./images/img-register.png'} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Register;
