import 'material-symbols';
import type { NextPage } from 'next';
type props = {
    resultGrouping: string[][][];
};
const ResultElement: NextPage<props> = ({ resultGrouping }) => {
    return (
        <div className="flex flex-col justify-center">
            {/* 回数 */}
            <div className="result-element-heading">
                <p className="rounded-lg bg-black p-2 text-2xl text-white md:text-3xl">1回目</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dotted border-black px-4 py-6 ">
                {/* グループ */}
                <div className="result-element-heading">
                    <p className="rounded-lg bg-primary p-2 text-white md:text-xl">グループ1</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dotted border-primary px-4 py-6 ">
                    <div className="flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl">person</span>
                        <h3 className="pb-2 text-2xl md:text-3xl ">usuyukiさん</h3>
                    </div>
                </div>
                {/* グループここまで */}
            </div>
            {/* 回数ここまで */}
        </div>
    );
};

export default ResultElement;
