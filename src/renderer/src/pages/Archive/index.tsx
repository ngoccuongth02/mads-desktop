import ListArchive from '@renderer/pages/Archive/ListArchive';
import TestArchive from '@renderer/pages/Archive/TestArchive';
import { useSelector } from 'react-redux';
const Archive = () => {
    const { typePage } = useSelector((state: any) => state.archive);
    return typePage === 'list' ? <ListArchive /> : <TestArchive />;
};

export default Archive;
