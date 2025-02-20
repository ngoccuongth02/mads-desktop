import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import TitleComp from '@renderer/components/TitleComp';

import Loading from '@renderer/components/Loading';
import { fetchListDataMyScore } from '@renderer/store/myScore/MyScoreSlice';
import { PARAMS_DEFAULT } from '@shared/constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'rsuite';
import Accordion from './Accordion';
const MyScore = () => {
    const [search, setSearch] = useState<any>('');
    const { listDataMyScore, metaPageMyScore } = useSelector((state: any) => state.myScore);

    const [loading, setLoading] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<any>(1);

    const dispatch = useDispatch();

    const getInitData = async () => {
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
        };
        await dispatch(fetchListDataMyScore(params) as any);
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
            search: search,
        };
        await dispatch(fetchListDataMyScore(params) as any);
        setLoading(false);
        setActivePage(1);
    };

    const onChangePage = async (page: number) => {
        setLoading(true);
        const params = {
            ...PARAMS_DEFAULT,
            limit: 10,
            page: page,
        } as any;
        if (search) {
            params.search = search;
        }
        await dispatch(fetchListDataMyScore(params) as any);
        setActivePage(page);
        setLoading(false);
    };

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div className="ui-my-score bg-[#F4FBF7] flex flex-col h-full">
            <div className="flex justify-between items-center mb-[20px]">
                <TitleComp title="My Scores" />
                <div className="flex gap-[16px]">
                    <input
                        type="text"
                        className="input px-[32px]"
                        placeholder="Enter your key"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <PrimaryButton active onClick={handleSearch}>
                        Search
                    </PrimaryButton>
                </div>
            </div>
            <div className="relative h-[calc(100%-100px)] overflow-y-auto">
                <Loading isLoading={loading} />
                <div className="h-full">
                    {listDataMyScore?.length > 0 ? !loading && listDataMyScore?.map((test: any, index: number) => <Accordion key={index} {...test} />) : ''}
                    <div className="flex justify-end mt-[20px]">
                        <Pagination
                            ellipsis
                            maxButtons={5}
                            total={metaPageMyScore?.total ? parseInt(metaPageMyScore?.total) : 0}
                            limit={metaPageMyScore?.limit ? parseInt(metaPageMyScore?.limit) : 10}
                            activePage={activePage}
                            onChangePage={onChangePage}
                            className="pagination-custom"
                            next
                            prev
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyScore;
