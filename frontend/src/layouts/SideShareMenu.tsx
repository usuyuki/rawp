import type { NextPage } from 'next';

const SideShareMenu: NextPage = () => {
    return (
        <div className="slide-share-element">
            <div className="flex flex-col items-center justify-center">
                <p>share</p>
                <div className="h-20 w-2 bg-black"></div>
                <a
                    href="http://twitter.com/share?url=rawp.usuyuki.net&text=複数回のグループ分けをいい感じにするツール|RAWP&related=@usuyuki26"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Twitter share ボタン
                </a>
            </div>
        </div>
    );
};

export default SideShareMenu;
