import type { NextPage } from 'next';
import Link from 'next/link';
type Props = {
    title: string;
    url: string;
};

const PrimaryButton: NextPage<Props> = ({ title, url }) => {
    return (
        <Link
            href={url}
            className="mt-16 flex flex-col items-center justify-center border-2 border-primary p-4 m-4"
        >
            <p className="text-center">{title}</p>
        </Link>
    );
};

export default PrimaryButton;
