import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';
import type { NextPage } from 'next';
const Run: NextPage = () => {
    return (
        <Layout title="実行">
            <DescribeH1 heading="複数回のグループ生成" />
            <p>実行ページ</p>
            <button id="fullScreenButton">全画面</button>
        </Layout>
    );
};

export default Run;
