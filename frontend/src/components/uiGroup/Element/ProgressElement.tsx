import type { NextPage } from 'next';
const ProgressElement: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="my-4 text-2xl">計算中...</p>
            <div className="flex justify-center">
                <span className="animation-delay-250 ml-2 h-8 w-8 animate-spin rounded-xl bg-primary"></span>
                <span className="animation-delay-500 ml-2 h-8 w-8 animate-spin rounded-xl bg-primary"></span>
                <span className="animation-delay-750 ml-2 h-8 w-8 animate-spin rounded-xl bg-primary"></span>
            </div>
        </div>
    );
};

export default ProgressElement;
