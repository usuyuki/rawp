import type { NextPage } from 'next';

type props = {
    roster: string[];
    nOfPeople: number;
    nOfGroups: number;
    nOfTimes: number;
    nOfAttempts: number;
};
const ProgressElement: NextPage<props> = ({
    roster,
    nOfPeople,
    nOfGroups,
    nOfTimes,
    nOfAttempts,
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="my-4 text-2xl">計算中</p>
            <p>試行回数：</p>
            <p className="mt-4">ログ</p>
        </div>
    );
};

export default ProgressElement;
