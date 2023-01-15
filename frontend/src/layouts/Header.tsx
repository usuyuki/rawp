import Link from 'next/link';

import type { NextPage } from 'next';
const Header: NextPage = () => {
    return (
        <header className="sticky top-0 z-10 ">
            <div className="flex flex-wrap justify-around">
                <Link href="/" className="mx-2">
                    <p className="text-primary">トップ</p>
                </Link>
                <Link href="/run" className="mx-2">
                    <p className="text-primary">実行</p>
                </Link>
                <Link href="/description" className="mx-2">
                    <p className="text-primary">仕組み</p>
                </Link>
                <Link href="/aboutThisSite" className="mx-2">
                    <p className="text-primary">このサイトについて</p>
                </Link>
            </div>
        </header>
    );
};

export default Header;
