import DescribeH2 from '@/components/uiParts/Heading/DescribeH2';
import 'material-symbols';
import type { NextPage } from 'next';
const ProgressCard: NextPage = () => {
    return (
        <div className="flex justify-center">
            <p>進捗の表示</p>
            <p>試行回数：</p>
        </div>
    );
};

export default ProgressCard;
