import type { NextPage } from 'next';

type Props = {
    heading: string;
};

const DescribeH1: NextPage<Props> = ({ heading }) => {
    return (
        <div className="my-8 flex items-center justify-center">
            <div>
                <div className="relative mr-8 h-12 w-12 rounded-xl bg-primary">
                    <div className="absolute -top-4 -right-4 h-8 w-8 rounded-md bg-secondary"></div>
                </div>
            </div>
            <h1 className="pb-2 text-4xl drop-shadow md:text-4xl">{heading}</h1>
        </div>
    );
};

export default DescribeH1;
