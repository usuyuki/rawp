import type { NextPage } from 'next';

type Props = {
    roster: string[];
    nOfPeople: number;
    nOfGroups: number;
    groupingTimes: number;
    nOfAttempts: number;
    calcLog: string;
};
const ProgressElement: NextPage<Props> = ({
    roster,
    nOfPeople,
    nOfGroups,
    groupingTimes,
    nOfAttempts,
    calcLog,
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <p className="my-4 text-2xl">計算中</p>
            <p>試行回数：</p>
            <p className="mt-4">ログ</p>
            <p className="m-2 rounded-2xl border border-dotted border-primary p-4">{calcLog}</p>
        </div>
    );
};

export default ProgressElement;
