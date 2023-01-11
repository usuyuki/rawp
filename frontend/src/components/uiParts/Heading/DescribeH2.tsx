import type { NextPage } from 'next';

type Props = {
    heading: string;
    sub?: string;
};

const DescribeH2: NextPage<Props> = ({ heading, sub }) => {
    return (
        <div className="mt-16 flex flex-col items-center justify-center">
            <h2 className="border-b-2 border-primary pb-2 text-3xl drop-shadow md:text-4xl">
                {heading}
            </h2>
            {sub === null ? '' : <p className="mt-2 text-sm ">{sub}</p>}
        </div>
    );
};

export default DescribeH2;
