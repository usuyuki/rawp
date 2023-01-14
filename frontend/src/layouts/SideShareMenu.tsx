import Image from 'next/image';

import type { NextPage } from 'next';
const SideShareMenu: NextPage = () => {
    return (
        <div className="slide-share-element">
            <div className="flex flex-col items-center justify-center">
                <p>share</p>
                <div className="h-16 w-1 bg-black"></div>
                <a
                    href="http://twitter.com/share?url=rawp.usuyuki.net&text=複数回のグループ分けをいい感じにするツール「RAWP」&related=@usuyuki26"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                        <Image
                            src="/img/icon/TwitterLogoWhite.svg"
                            alt="Twitter"
                            width="0"
                            height="0"
                            sizes="100%"
                            className="w-1/2 h-auto"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default SideShareMenu;
