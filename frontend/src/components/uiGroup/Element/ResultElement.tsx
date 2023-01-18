import 'material-symbols';
import type { NextPage } from 'next';
type props = {
    resultGrouping: string[][][];
};
const ResultElement: NextPage<props> = ({ resultGrouping }) => {
    return (
        <div className="flex flex-col justify-center">
            {resultGrouping.map((round, roundIndex) => (
                <div key={roundIndex}>
                    <div className="result-element-heading">
                        <p className="rounded-lg bg-black p-2 text-2xl text-white md:text-3xl">
                            {roundIndex + 1}回目
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dotted border-black px-4 py-6 ">
                        {round.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <div className="result-element-heading">
                                    <p className="rounded-lg bg-primary p-2 text-white md:text-xl">
                                        グループ{groupIndex + 1}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center md:flex-row flex-col rounded-xl border-2 border-dotted border-primary px-4 py-6 ">
                                    {group.map((person, personIndex) => (
                                        <div
                                            key={personIndex}
                                            className="flex items-center justify-center"
                                        >
                                            <span className="material-symbols-outlined text-3xl">
                                                person
                                            </span>
                                            <h3 className="pb-2 text-2xl md:text-xl px-4 ">
                                                {person}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultElement;
