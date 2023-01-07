import DescribeH2 from '@/components/uiParts/DescribeH2';
import type { NextPage } from 'next';
const RawpConcept: NextPage = () => {
    return (
        <div className="flex justify-center">
            <DescribeH2 heading="RAWPのポイント" />
            <p>WASM で重複のない複数回グループ分けを素早く導き出すサービスです</p>
        </div>
    );
};

export default RawpConcept;
