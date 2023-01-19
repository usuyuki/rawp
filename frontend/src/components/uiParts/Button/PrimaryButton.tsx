import Link from 'next/link';

import type { NextPage } from 'next';
type Props = {
    title: string;
    url: string;
};

const PrimaryButton: NextPage<Props> = ({ title, url }) => {
    return (
        <Link
            href={url}
            className="m-4 flex flex-col items-center justify-center border-2 border-primary p-4 duration-300 hover:bg-primary hover:text-white"
        >
            <p className="text-center">{title}</p>
        </Link>
    );
};

export default PrimaryButton;
