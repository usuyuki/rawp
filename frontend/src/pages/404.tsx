import { NextPage } from 'next';

import Layout from '@/layouts/Layout';
const NotFound: NextPage = () => {
    return (
        <Layout>
            <h1 className="text-center text-2xl">404 Not Found</h1>
            <p className="mt-20 text-center text-xl">このページは存在しません!</p>
        </Layout>
    );
};

export default NotFound;
