import 'material-symbols';
import type { NextPage } from 'next';

type Props = {
    heading: string;
};

const DescribeH3: NextPage<Props> = ({ heading }) => {
    return (
        <div className="mt-12 flex flex-col items-center">
            <div className="flex items-center justify-center">
                <span className="mr-4 h-8 w-8 rounded-md bg-tertiary"></span>
                <h3 className="pb-2 text-2xl md:text-3xl ">{heading}</h3>
            </div>
        </div>
    );
};

export default DescribeH3;
