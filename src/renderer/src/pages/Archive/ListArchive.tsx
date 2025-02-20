import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import GenerateIcon from '@renderer/components/icon/GenerateIcon';
import Loading from '@renderer/components/Loading';
import TitleComp from '@renderer/components/TitleComp';
import AccordionArchive from '@renderer/pages/Archive/AccordionArchive';
import { archiveActions, fetchListArchive } from '@renderer/store/archive/ArchiveSlice';
import { PARAMS_DEFAULT } from '@shared/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'rsuite';

const ListArchive = () => {
    const dispatch = useDispatch();
    const { listArchive, metaPage } = useSelector((state: any) => state.archive);
    const [activePage, setActivePage] = useState<any>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const [search, setSearch] = useState<string>('');

    const getDataArchive = async () => {
        setLoading(true);
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
        };
        await dispatch(fetchListArchive(params));
        setLoading(false);
    };

    const onChangePage = async (page: number) => {
        setLoading(true);
        setActivePage(page);
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
            page: page,
        };
        await dispatch(fetchListArchive(params));
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
            search: search,
        };
        await dispatch(fetchListArchive(params));
        setActivePage(1);
        setLoading(false);
    };

    useEffect(() => {
        getDataArchive();
    }, []);

    return (
        <div className="ui-archive bg-[#F4FBF7] h-full flex flex-col">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="Archive" />
                <div className="flex gap-[16px]">
                    <input type="text" className="input px-[32px]" placeholder="Enter your key" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <PrimaryButton active onClick={handleSearch}>
                        Search
                    </PrimaryButton>
                    <PrimaryButton className="!bg-[#FCCE3A] !text-white" onClick={() => dispatch(archiveActions.setTypePage('test'))}>
                        <GenerateIcon />
                        Generate
                    </PrimaryButton>
                </div>
            </div>
            <div className="relative h-[calc(100%-56px)] overflow-y-auto">
                <Loading isLoading={loading} />
                {listArchive?.length > 0 ? (
                    !loading && (
                        <>
                            <div className="text-[16px] leading-[14px] text-[#2C2C2C] mb-[20px]">
                                Total: <strong>{metaPage?.total} questions</strong>
                            </div>
                            {listArchive?.map((test: any, index: number) => <AccordionArchive key={index} {...test} />)}
                        </>
                    )
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-[#808080]">No data</p>
                    </div>
                )}
                <div className="flex justify-end mt-[20px]">
                    <Pagination
                        ellipsis
                        maxButtons={5}
                        total={metaPage?.total ? parseInt(metaPage?.total) : 0}
                        limit={metaPage?.limit ? parseInt(metaPage?.limit) : 10}
                        activePage={activePage}
                        onChangePage={onChangePage}
                        className="pagination-custom"
                        next
                        prev
                    />
                </div>
            </div>
        </div>
    );
};

export default ListArchive;
