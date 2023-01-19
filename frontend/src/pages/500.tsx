import { NextPage } from 'next';

import Layout from '@/layouts/Layout';
const ServerError: NextPage = () => {
    return (
        <Layout>
            <h1 className="text-center text-2xl">500 Error</h1>
            <p className="mt-20 text-center text-xl">サーバーエラーです。</p>
        </Layout>
    );
};

export default ServerError;
