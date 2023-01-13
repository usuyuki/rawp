import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import DescribeH2 from '@/components/uiParts/Heading/DescribeH2';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

const DescriptionPage: NextPage = () => {
    return (
        <Layout title="仕組み">
            <DescribeH1 heading="仕組み" />
            <DescribeH2 heading="GoogleAnalytics" />
            <p className="flex justify-center">
                複数回のグループ分けで重複を減らしながら行うのはNP困難と呼ばれます。
                <br />
                複数地点を最適に結ぶ経路を考えるセールスマン巡回問題と同じ最適化問題の一種です。
                <br />
                多くの組み合わせがある中で、そのすべてを検証するのはコンピュータでも天文学的な時間を要することが知られています。
                <br />
                そこですべてを検証して厳密でベストな結果を求めるのではなく、ある程度良いベターな結果を求めるのが一般的な手法です。
            </p>
            <DescribeH2 heading="焼きなまし法" />
            <p className="flex justify-center">
                RAWPでは焼きなまし法を用いることで、複数回の重複の少ないグループ分けを実現します。
                <br />
                焼きなましとは金属材料を熱した後で徐々に冷やし、結晶を成長させてその欠陥を減らす作業のことで、これをアルゴリズムとして再現したのが焼きなまし法になります。
            </p>
            <DescribeH2 heading="WebAssembly" />
            <p className="flex justify-center">
                WebAssemblyはモダンブラウザで動くパフォーマンスの高い言語です。
                <br />
                RAWPではJavaScriptと組み合わせてWebAssemblyを用いることで高いパフォーマンスを実現しています。
                <br />
                お使いのデバイスで演算を行うため、入力した情報をサーバー側に送信することなく処理が行なえます。
            </p>
        </Layout>
    );
};

export default DescriptionPage;
