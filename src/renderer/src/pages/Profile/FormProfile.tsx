import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import { useNotification } from '@renderer/context/ProviderNotification';
import InputProfile from '@renderer/pages/Profile/InputProfile';
import { authService } from '@renderer/services/auth';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DateInput } from 'rsuite';

const FormProfile = () => {
    const { user } = useSelector((state: any) => state.auth);

    const { handleOpenNotification, setTypeNotification } = useNotification();

    const [birthday, setBirthday] = useState<any>();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            nickName: user?.nickName,
            school: user?.school,
            email: user?.email,
            aim: user?.aim,
        },
    });

    const onSubmit = async (data: any) => {
        const _birthday = dayjs(birthday).format('YYYY-MM-DD');
        const res = (await authService.updateProfile({ ...data, birthday: _birthday })) as any;
        if (res?.statusCode == 200) {
            handleOpenNotification('Update successfully');
            setTypeNotification('success');
        } else {
            handleOpenNotification('Fail');
            setTypeNotification('error');
        }
    };

    useEffect(() => {
        if (user?.birthday) {
            setBirthday(new Date(user?.birthday)); //
        }
    }, [user?.birthday]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] px-[20px]">
            <InputProfile label="First name" {...register('firstName')} disabled />
            <InputProfile label="Last name" {...register('lastName')} disabled />
            <InputProfile label="Nick name" {...register('nickName')} />
            <InputProfile label="School" {...register('school')} />
            <div className={`flex flex-col border-[1px] border-[#A2C1C1] rounded-[32px] px-[20px] py-[10px] w-[100%]`}>
                <label className="text-[12px] text-[#333333] mb-[4px]">Birthday</label>
                <DateInput
                    className="input-profile h-[24px] outline-none border-none text-[16px] font-bold px-0"
                    format="yyyy-MM-dd"
                    value={birthday}
                    onChange={(value) => setBirthday(value)}
                    placeholder="Birthday"
                />
            </div>
            <InputProfile label="Email" {...register('email')} disabled />
            <InputProfile label="Aim" {...register('aim')} />
            <PrimaryButton type="submit" active>
                Save
            </PrimaryButton>
        </form>
    );
};

export default FormProfile;
