import type { NextPage } from 'next';

type Props = {
    roster: string[];
    nOfPeople: number;
    nOfGroups: number;
    groupingTimes: number;
    nOfAttempts: number;
};
const ProgressCard: NextPage<Props> = ({
    roster,
    nOfPeople,
    nOfGroups,
    groupingTimes,
    nOfAttempts,
}) => {
    return (
        <div className="flex justify-center">
            <p>進捗の表示</p>
            <p>試行回数：</p>
        </div>
    );
};

export default ProgressCard;
