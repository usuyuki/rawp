import Link from 'next/link';

import RawpConcept from '@/components/uiGroup/RawpConcept';
import DescribeH3 from '@/components/uiParts/Heading/DescribeH3';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';
const IndexPage: NextPage = () => {
    return (
        <Layout>
            <RawpConcept />
<DescribeH3 heading="ああああ" sub="いいい" icon="search"/>
            <Link href="description">
                <p>アルゴリズムについて</p>
            </Link>
        </Layout>
    );
};

export default IndexPage;
