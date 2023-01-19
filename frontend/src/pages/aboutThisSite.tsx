import Image from 'next/image';

import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import DescribeH3 from '@/components/uiParts/Heading/DescribeH3';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

const AboutThisSite: NextPage = () => {
    return (
        <Layout title="このサイトについて">
            <DescribeH1 heading="このサイトについて" />
            <DescribeH3 heading="Google Analytics" />
            <p className="flex justify-center">
                本サービスでは、Googleによるアクセス解析ツール「Google
                Analytics」を利用しています。このGoogle
                Analyticsはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
            <DescribeH3 heading="ソースコード" />
            <div className="flex flex-col items-center justify-center">
                <p>ソースコードはGitHubにて公開しています。</p>
                <a href="https://github.com/usuyuki/rawp" target="_blank" rel="noreferrer noopener">
                    usuyuki/RAWP
                </a>
            </div>
            <DescribeH3 heading="構成" />
            <p className="flex justify-center">
                フロントエンドにはNext.jsを用いてSSGをしており、WASMはRustを用いて生成しています。
            </p>
            <Image
                className="mx-auto mt-4"
                src="/img/description/rawpDiagram.svg"
                alt="構成図"
                width={800}
                height={400}
            />
            <DescribeH3 heading="作者と開発経緯" />
            <div className="flex justify-center">
                <p>
                    作者の
                    <a
                        href="https://twitter.com/usuyuki26"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        うすゆき
                    </a>
                    と申します。
                    <br />
                    大学の授業にて、ものづくりで単位がもらえる授業があったため、その一環で作成しました。
                    <br />
                    短期間の突貫工事であるため、クオリティや利便性が必ずしも満足行くものでない点ご了承下さい。
                </p>
            </div>
            <DescribeH3 heading="名前の由来" />
            <p className="flex justify-center">
                サービス名「RAWP」は&quot;Red And White
                Prevention&quot;の略であり、日本語にすると赤白防止です。
                <br />
                人生においておそらく最初のグループ分けは幼稚園もしくは保育園の運動会であり、そこで用いられる赤白帽子に着想を得ました。
                <br />
                赤白帽子は便利である反面、被り方によっては赤なのか白なのか判別が付きにくいものです。
                <br />
                このような状態を防ぐ目的で赤白防止、つまりRed And White
                Prevention、RAWPと命名しました。
            </p>
            <Image
                className="mx-auto mt-4 mb-6"
                src="/img/description/taiikuBoushiTate.png"
                alt="赤白帽子"
                width={200}
                height={200}
            />
            <DescribeH3 heading="RAWPカラーパレット" />
            <div className="m-2 flex flex-wrap items-center justify-center">
                <div className="m-4 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-black"></div>
                    <p>Black</p>
                </div>
                <div className="m-4 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full border border-dotted border-black bg-white"></div>
                    <p>White</p>
                </div>
                <div className="m-4 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary"></div>
                    <p>Primary</p>
                </div>
                <div className="m-4 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-black"></div>
                    <p>Secondary</p>
                </div>
                <div className="m-4 flex flex-col items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-tertiary"></div>
                    <p>Tertiary</p>
                </div>
            </div>
            <p className="mt-2 flex justify-center pb-8">
                RAWPのカラーパレットは赤と白に加えて、青系統の色も織り交ぜることで全体の調和を整えました。
            </p>
            <DescribeH3 heading="RAWPロゴ" />
            <Image
                className="mx-auto mt-6 mb-4"
                src="/img/icon/rawpLogoLight.svg"
                alt="RAWPロゴ"
                width={100}
                height={100}
            />
            <p className="mt-2 mb-12 flex justify-center">
                RAWPのロゴは赤白帽子を元に、RAWPカラーパレットに基づいて作りました。
            </p>
        </Layout>
    );
};

export default AboutThisSite;
