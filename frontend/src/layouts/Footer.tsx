import Link from 'next/link';

import type { NextPage } from 'next';

const Footer: NextPage = () => {
    return (
        <footer>
            <div>
                <div className="mt-6 flex flex-wrap justify-around">
                    <Link href="/" className="mx-4">
                        <p className="text-primary">トップ</p>
                    </Link>
                    <Link href="/run" className="mx-4">
                        <p className="text-primary">実行</p>
                    </Link>
                    <Link href="/description" className="mx-4">
                        <p className="text-primary">仕組み</p>
                    </Link>
                    <Link href="/aboutThisSite" className="mx-4">
                        <p className="text-primary">このサイトについて</p>
                    </Link>
                </div>
                <div className="mt-6 flex flex-col justify-around">
                    <p className="m-2 text-center">copyright usuyuki</p>
                    <a
                        className="m-2 text-center text-sm"
                        href="https://github.com/usuyuki/rawp"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
