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
                本サービスでは、Googleによるアクセス解析ツール「GoogleAnalytics」を利用しています。このGoogleAnalyticsはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
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
                    大学の授業で何か作れば担任がもらえる(意訳)授業があったため、その一環で作成しました。
                    <br />
                    短期間の突貫工事であるため、クオリティや利便性が必ずしも満足行くものでない点ご了承下さい。
                </p>
            </div>
            <DescribeH3 heading="名前の由来" />
            <p className="flex justify-center">
                RAWPはRed And White Preventionの略から来ており、日本語にすると赤白防止です。
                <br />
                小さい頃に使った赤白帽子のように明確にグループ分けが見てわかることを願い、RAWPという名前にしました。
            </p>
            <Image
                className="mx-auto mt-4"
                src="/img/description/taiikuBoushiTate.png"
                alt="赤白帽子"
                width={200}
                height={200}
            />
        </Layout>
    );
};

export default AboutThisSite;
