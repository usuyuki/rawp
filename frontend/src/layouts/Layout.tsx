import Head from 'next/head';

import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import SideShareMenu from '@/layouts/SideShareMenu';

import type { NextPage } from 'next';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
};

const Layout: NextPage<Props> = ({ children, title, description }) => {
    const formedTitle = title ? `${title} | RAWP` : 'RAWP';
    const formedDescription =
        description ?? 'RAWPは重複のない複数回グループ分けを素早く導き出すサービスです';

    return (
        <>
            <Head>
                <meta httpEquiv="content-language" content="ja" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

                <meta name="description" content={formedDescription} />
                <title>{formedTitle}</title>
                {/* ogp */}
                <meta property="og:title" content={formedTitle} />
                <meta property="og:description" content={formedDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://rawp.usuyuki.net/" />
                <meta property="og:image" content="https://rawp.usuyuki.net/img/ogp.png" />
                {/* <meta property="fb:app_id"      content="" /> */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@usuyuki26" />
                <meta name="twitter:creator" content="@usuyuki26" />

                <link
                    rel="apple-touch-icon"
                    type="image/png"
                    href="/img/favicon/apple-touch-icon-180x180.png"
                />
                <link rel="icon" type="image/png" href="/img/favicon/icon-192x192.png" />
                {/* Google Analytics */}
                <>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=G-J7JHJXHKX3`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-J7JHJXHKX3', {
                                    page_path: window.location.pathname,
                                });
                                `,
                        }}
                    />
                </>
            </Head>
            <div className="absolute inset-y-0 right-4">
                <SideShareMenu />
            </div>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};
export default Layout;
