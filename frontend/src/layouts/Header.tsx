import Image from 'next/image';
import Link from 'next/link';

import type { NextPage } from 'next';
const Header: NextPage = () => {
    return (
        <header className="sticky top-0 z-10 ">
            <div className="flex flex-wrap justify-around">
                <Link href="/" className="mx-2 flex items-center justify-center">
                    <Image
                        src="/img/icon/rawpLogoLight.svg"
                        width={40}
                        height={40}
                        alt="RAWPロゴ"
                        className="mr-2"
                    />
                    <p className="text-2xl text-primary ">RAWP</p>
                </Link>
            </div>
        </header>
    );
};

export default Header;
