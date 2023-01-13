import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

const DescriptionPage: NextPage = () => {
    return (
        <Layout title="仕組み">
            <DescribeH1 heading="仕組み" />
            <p className="text-center">ここに仕組みの説明を入れる</p>
        </Layout>
    );
};

export default DescriptionPage;
