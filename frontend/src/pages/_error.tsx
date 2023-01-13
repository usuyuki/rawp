import Layout from '@/layouts/Layout';
import { NextPage, NextPageContext } from 'next';
interface Props {
    statusCode: number;
}
const Error: NextPage<Props> = ({ statusCode }) => {
    return (
        <Layout>
            <h1 className="text-2xl text-center">{statusCode}エラーです！</h1>
        </Layout>
    );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
    return { statusCode };
};

export default Error;
