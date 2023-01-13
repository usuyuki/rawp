import type { NextPage } from 'next';

const SideShareMenu: NextPage = () => {
    return (
        <div className="slide-share-element">
            <div className="flex justify-center flex-col items-center">
                <p>share</p>
                <div className="w-2 h-20 bg-black"></div>
                <a
                    href="http://twitter.com/share?url=rawp.usuyuki.net&text=複数回のグループ分けをいい感じにするツール|RAWP&related=@usuyuki26"
                    target="_blank"
                >
                    Twitter share ボタン
                </a>
            </div>
        </div>
    );
};

export default SideShareMenu;
