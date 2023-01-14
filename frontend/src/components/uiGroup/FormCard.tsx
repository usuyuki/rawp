import { ReactNode } from 'react';

import type { NextPage } from 'next';

type Props = {
    heading: string;
    children: ReactNode;
};

const FormCard: NextPage<Props> = ({ heading, children }) => {
    return (
        <div className="m-4">
            <div className="form-card-heading">
                <p className="rounded-r-lg bg-primary p-2 md:text-xl text-white">{heading}</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-xl border-2 border-dotted border-primary px-4 py-6 ">
                {children}
            </div>
        </div>
    );
};

export default FormCard;
