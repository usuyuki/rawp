import Image from 'next/image';

import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import DescribeH2 from '@/components/uiParts/Heading/DescribeH2';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';
const DescriptionPage: NextPage = () => {
    return (
        <Layout title="仕組み">
            <DescribeH1 heading="仕組み" />
            <DescribeH2 heading="NP困難" />
            <div className="flex flex-col items-center justify-center">
                <div>
                    <p>複数回のグループ分けで重複を減らしながら行うのはNP困難と呼ばれます。</p>
                    <p>
                        例えば20人の参加者を5つのグループに分け、グループの中身を変えながら3回交流タイムを設けるとします。
                    </p>
                    <p>
                        1グループあたり4人のグループで、この時考えられるグループの組み合わせは積の法則を用いて
                    </p>
                    <Image
                        src="/img/description/calculation_of_group_combinations.svg"
                        width={600}
                        height={20}
                        className="mx-auto my-6 px-2"
                        alt="グループの組み合わせの計算数式"
                    />
                    <p>より305540235000通りの組み合わせが考えられます。</p>
                    <p>さらにここから重複が最小となる3つを選ぶ必要があるので、この選び方は</p>
                    <Image
                        src="/img/description/calculating_multiple_choices.svg"
                        width={300}
                        height={20}
                        className="mx-auto my-6 px-2"
                        alt="グループの選び方の計算数式"
                    />
                    <p>より約40溝(穣の後、澗の前の数の単位)の選び方が存在します。</p>
                    <p>
                        このパターンの中で最も重複の少ないものを選ぶ時、仮にすべてを比較した上で一番良い組み合わせを探していたら太陽系が先に寿命を迎えてしまいます。
                    </p>
                    <p className="mt-12">
                        「ZOOM新歓の交流会でまた同じ人と出会ったんだけど！！」と主催者に不満を言われるの辛くないですか？
                    </p>
                    <p>
                        量子コンピュータじゃないんですから、人力で被らないようにするのは無茶ですよって話です……
                    </p>

                    <p>
                        この問題は、複数地点を最適に結ぶ経路を考えるセールスマン巡回問題と同じ最適化問題の一種です。
                    </p>
                    <p>
                        多くの組み合わせがある中で、そのすべてを検証するのはコンピュータでも天文学的な時間を要することが知られています。
                    </p>
                    <p>
                        そこですべてを検証して厳密でベストな結果を求めるのではなく、ある程度良いベターな結果を求めるのが一般的な手法です。
                    </p>
                </div>
            </div>
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
                    <p>WebAssemblyはモダンブラウザで動くパフォーマンスの高い言語です。</p>
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
