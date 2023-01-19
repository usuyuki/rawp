import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import DescribeH2 from '@/components/uiParts/Heading/DescribeH2';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';
const DescriptionPage: NextPage = () => {
    return (
        <Layout title="仕組み">
            <DescribeH1 heading="仕組み" />
            <p className="my-12 mx-2 text-center text-2xl">🚧このページは建設途中です🏗️</p>
            <DescribeH2 heading="焼きなまし法" />
            <div className="flex flex-col items-center justify-center">
                <div>
                    <p>
                        RAWPでは焼きなまし法を用いることで、複数回の重複の少ないグループ分けを実現します。
                    </p>
                    <p>
                        焼きなましとは金属材料を熱した後で徐々に冷やし、結晶を成長させてその欠陥を減らす作業のことで、これをアルゴリズムとして再現したのが焼きなまし法になります。
                    </p>
                    <p>
                        単純に良い方向に進むだけでなく、たまには悪い方向にも進んでみようよって動きをするため、局所最適解に留まらず大域最適解を目指しやすくなります。
                    </p>
                </div>
            </div>
            <DescribeH2 heading="WebAssembly" />
            <div className="mb-20 flex flex-col items-center justify-center">
                <div>
                    <p>
                        WebAssemblyはモダンブラウザで動くパフォーマンスの高いアセンブリライクな言語です。
                    </p>
                    <p>
                        RAWPではJavaScriptと組み合わせてWebAssemblyを用いることで高いパフォーマンスを実現しています。
                    </p>
                    <p>
                        お使いのデバイスで演算を行うため、入力した情報をサーバー側に送信することなく、安全に素早く処理が行なえます。
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default DescriptionPage;
