import PrimaryButton from '@/components/uiParts/Button/PrimaryButton';
import Layout from '@/layouts/Layout';
import type { NextPage } from 'next';
import Image from 'next/image';

const IndexPage: NextPage = () => {
    return (
        <Layout>
            <p className="text-center my-2 mx-2 text-2xl">RAWPへようこそ。</p>
            <p className="text-center my-2 mx-2">
                ここでは重複を減らした複数回のグループ分けを生成できます
            </p>
            <div className="flex items-center justify-centerq">
                <Image
                    src="img/icon/火星人のフリーイラスト2.svg"
                    alt="人物"
                    width={120}
                    height={120}
                />
                <p>
                    オンライン交流会でグループを作って交流を促したい！ <br />
                    でも被りなく複数回グループ分けするの難しい……
                </p>
            </div>
            <div className="flex justify-center">
                <PrimaryButton title="さっそく使ってみる" url="/run" />
                <PrimaryButton title="詳しい仕組みについて知る" url="/description" />
            </div>
        </Layout>
    );
};

export default IndexPage;
