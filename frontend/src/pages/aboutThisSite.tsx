import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

const AboutThisSite: NextPage = () => {
    return (
        <Layout title="このサイトについて">
            <DescribeH1 heading="このサイトについて" />
        </Layout>
    );
};

export default AboutThisSite;
