import type { NextPage } from 'next';
import Link from 'next/link';
const Header: NextPage = () => {
    return (
        <header className="sticky top-0 z-10 flex justify-around">
            <Link href="/">
                <p className="text-primary">トップ</p>
            </Link>
            <Link href="/run">
                <p className="text-primary">実行</p>
            </Link>
            <Link href="/description">
                <p className="text-primary">仕組み</p>
            </Link>
            <Link href="/aboutThisSite">
                <p className="text-primary">このサイトについて</p>
            </Link>
        </header>
    );
};

export default Header;
