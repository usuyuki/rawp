import RawpConcept from '@/components/uiGroup/RawpConcept';
import Layout from '@/layouts/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';
const IndexPage: NextPage = () => {
    return (
        <Layout>
            <RawpConcept />

            <Link href="description">
                <p>アルゴリズムについて</p>
            </Link>
        </Layout>
    );
};

export default IndexPage;
