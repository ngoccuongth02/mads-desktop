import ArrowIcon from '@renderer/components/icon/ArrowIcon';
import { Paths } from '@renderer/constants/paths';
import { routerActions } from '@renderer/store/routes/RouterSlice';
import { useDispatch } from 'react-redux';

const TitleComp = ({ title, onClick }: { title: string; onClick?: () => void }) => {
    const dispatch = useDispatch();

    const _onClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        } else {
            dispatch(routerActions.changePath(Paths.HOME as any));
        }
    };
    return (
        <div className="flex items-center gap-[16px]">
            <div className="w-[42px] h-[42px] hover:bg-[#1EC28B] rounded-full flex items-center justify-center bg-white hover:text-[#fff] cursor-pointer" onClick={_onClick}>
                <ArrowIcon />
            </div>
            <h2 className="font-bold text-[28px] leading-[36px] text-[#3A7364]">{title}</h2>
        </div>
    );
};

export default TitleComp;
