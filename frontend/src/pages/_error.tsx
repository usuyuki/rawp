import { NextPage, NextPageContext } from 'next';

import Layout from '@/layouts/Layout';
interface Props {
    statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
    return (
        <Layout>
            <h1 className="text-center text-2xl">{statusCode}エラーです！</h1>
        </Layout>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
    return { statusCode };
};

export default Error;
