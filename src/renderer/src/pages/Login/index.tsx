import { Checkbox } from '@mui/material';
import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ButtonIcon from '@renderer/components/icon/ButtonIcon';
import { Paths } from '@renderer/constants/paths';
import { authActions } from '@renderer/store/auth/AuthSlice';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    const changePath = (path: string) => {
        dispatch(routerActions.changePath(path as never));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authActions.login({ name: 'test', email: 'test@gmail.com', password: '123456' } as any));
        changePath('/');
    };

    return (
        <div className="ui-login flex min-h-screen">
            <div className="left bg-[#F4FBF7] w-[50%] flex items-center justify-center">
                <div className="max-w-[400px] w-full px-8">
                    <div className="title-1 text-center mb-8">Log-in</div>
                    <form className="flex flex-col gap-[24px] font-regular">
                        <input type="email" placeholder="Email" className="input" />
                        <div className="relative">
                            <input type="password" placeholder="Password" className="input" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[10px]">
                                <Checkbox sx={{ color: '#1EC28B', padding: '0px', '&.Mui-checked': { color: '#1EC28B' } }} />
                                <p className="flex items-center text-[14px]">Remember me</p>
                            </div>
                            <p className="text-[14px] cursor-pointer hover:text-[#1EC28B]" onClick={() => changePath(Paths.FORGOT_PASSWORD)}>
                                Forgot Password?
                            </p>
                        </div>
                        <PrimaryButton type="submit" className="w-full mt-[40px]" onClick={handleLogin} active={true}>
                            <ButtonIcon /> LOG-IN
                        </PrimaryButton>
                    </form>
                    <div className="text-center mt-4 font-regular text-[14px]">
                        Haven't got an account yet?{' '}
                        <strong className="cursor-pointer hover:text-[#1EC28B]" onClick={() => changePath(Paths.REGISTER)}>
                            Register Now
                        </strong>
                    </div>
                </div>
            </div>
            <div className="right bg-[#FFFBF9] w-[50%] px-[60px] py-[20px] flex-center">
                <div className="flex-center max-w-[642px] mx-auto">
                    <img src={'./images/img-login.png'} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;
