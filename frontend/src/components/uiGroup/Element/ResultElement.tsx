import 'material-symbols';
import type { NextPage } from 'next';
type props = {
    resultGrouping: string[][][];
    readers: string[];
    runCalculationAgain: () => void;
};
const ResultElement: NextPage<props> = ({ resultGrouping, runCalculationAgain, readers }) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-tertiary">
                    大域最適解をできる限り求めていますが、重複が生じる場合もございます
                </p>
            </div>
            {resultGrouping.map((round, roundIndex) => (
                <div key={roundIndex}>
                    <div className="result-element-heading">
                        <p className="rounded-lg bg-black p-2 text-2xl text-white md:text-3xl">
                            {roundIndex + 1}回目
                        </p>
                    </div>
                    <div className="flex flex-col flex-wrap items-stretch rounded-xl border-2 border-dotted border-black px-4 py-6 md:flex-row ">
                        {round.map((group, groupIndex) => (
                            <div key={groupIndex} className="w-full md:w-1/2 md:px-2 md:py-0">
                                <div className="result-element-heading">
                                    <p className="rounded-lg bg-primary p-2 text-white md:text-xl">
                                        グループ{groupIndex + 1}
                                    </p>
                                </div>
                                <div className="flex flex-col flex-wrap items-center justify-center rounded-xl border-2 border-dotted border-primary px-4 py-6 md:flex-row ">
                                    {group.map((person, personIndex) => (
                                        <div
                                            key={personIndex}
                                            className="flex w-full items-center"
                                        >
                                            <span className={"material-symbols-outlined text-3xl "+(readers.includes(person) ? "text-primary":"")}>
                                                person
                                            </span>
                                            <h3 className={"px-4 pb-2 text-2xl md:text-xl "+(readers.includes(person) ? "text-primary":"")}>
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
            <div className="flex items-center justify-center">
                <button
                    className="m-4 rounded-xl border-2 border-primary  px-4 py-2 duration-500 hover:bg-primary hover:text-white"
                    onClick={runCalculationAgain}
                >
                    再計算する
                </button>
            </div>
        </div>
    );
};

export default ResultElement;
