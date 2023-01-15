import type { NextPage } from 'next';
import Link from 'next/link';

const Footer: NextPage = () => {
    return (
        <footer>
            <div>
                <div className="flex flex-wrap justify-around mt-6">
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
                <div className="flex flex-col justify-around mt-6">
                    <p className="text-center m-2">copyright usuyuki</p>
                    <a
                        className="text-center text-sm m-2"
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
