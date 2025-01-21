import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ButtonIcon from '@renderer/components/icon/ButtonIcon';
import { Paths } from '@renderer/constants/paths';
import { authActions } from '@renderer/store/auth/AuthSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const dispatch = useDispatch();

    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as never));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Add registration logic here
        dispatch(authActions.login({ firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com', password: '123456' } as any));
        changePath('/');
    };

    return (
        <div className="ui-register flex min-h-screen">
            <div className="left bg-[#F4FBF7] w-[50%] flex items-center justify-center">
                <div className="max-w-[400px] w-full px-8">
                    <div className="title-1 text-center mb-8">Register</div>
                    <form className="flex flex-col gap-[24px] font-regular">
                        <input type="text" placeholder="First name" className="input" />
                        <input type="text" placeholder="Last name" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <PrimaryButton type="submit" className="w-full mt-[40px]" onClick={handleRegister} active={true}>
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
                    <img src={'./images/img-register.png'} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Register;
