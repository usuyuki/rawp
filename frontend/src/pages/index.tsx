import Image from 'next/image';

import PrimaryButton from '@/components/uiParts/Button/PrimaryButton';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

const IndexPage: NextPage = () => {
    return (
        <Layout>
            <p className="m-2 text-center text-2xl">RAWPへようこそ！！</p>
            <p className="m-2 text-center">
                RAWPでは焼きなまし法を用いて、重複を減らした複数回のグループ分けのより良い組み合わせを求めます。
            </p>
            <div className="flex justify-center">
                <PrimaryButton title="さっそく使ってみる" url="/run" />
            </div>
            <div className="my-12 flex flex-col items-center justify-center">
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
        </Layout>
    );
};

export default IndexPage;
