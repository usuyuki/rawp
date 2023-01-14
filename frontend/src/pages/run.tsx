import FormCard from '@/components/uiGroup/FormCard';
import ProgressCard from '@/components/uiGroup/ProgressCard';
import ResultCard from '@/components/uiGroup/ResultCard';
import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';
import { useEffect, useState } from 'react';
// import { useModal } from 'react-hooks-use-modal';

type phaseType = 'waiting' | 'calculating' | 'finished';

import type { NextPage } from 'next';
const Run: NextPage = () => {
    //参加者名簿
    const [roster, setRoster] = useState<string[]>([]);
    //参加人数
    const [nOfPeople, setNOfPeople] = useState<number>(1);
    //グループ数
    const [nOfGroup, setNOfGroup] = useState<number>(1);
    //グループ分け回数
    const [groupingTimes, setGroupingTimes] = useState<number>(1);
    //試行回数
    const [nOfAttempts, setNOfAttempts] = useState<number>(5000);
    //フェーズの管理
    const [nowPhase, setNowPhase] = useState<phaseType>('waiting');

    useEffect(() => {
        setNOfPeople(roster.length);
        if (nOfGroup > nOfPeople) {
            setNOfGroup(nOfPeople);
        }
    });

    const updateRoster = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //改行ごとに配列に格納、この配列のlengthを利用して人数とtextareaの幅調整も行う大変にSDGsなやつ
        setRoster(e.target.value.split(/\r\n|\n/));
    };

    const updateNOfAttempts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNOfAttempts(Number(e.target.value));
    };

    const runCalculation = () => {
        setNowPhase('calculating');
    };

    //モーダル表示用
    /** @todo React18だとuseEffectが2回呼ばれて消えてしまう(すでにライブラリにissueとPRも上がっているがマージされていない) */
    // https://github.com/microcmsio/react-hooks-use-modal/issues/70
    // const [ModalElement, openModal, closeModal, isOpenModal] = useModal('__next', {
    //     preventScroll: true,
    //     focusTrapOptions: {
    //         clickOutsideDeactivates: false,
    //     },
    // });
    let returnElement: JSX.Element = <></>;
    switch (nowPhase) {
        case 'waiting':
            returnElement = (
                <div className="counter-element">
                    <FormCard heading="参加者の名前">
                        <p className="mb-2">参加者名をお一人ずつ改行しながら入力してください</p>
                        <textarea onChange={updateRoster} rows={nOfPeople}></textarea>
                        <div>{nOfPeople}人</div>
                    </FormCard>
                    <FormCard heading="作成したいグループ数">
                        <div className="flex justify-center items-center">
                            <p className="text-6xl mx-2 ">{nOfGroup}</p>
                            <p className="text-2xl">グループ</p>
                        </div>
                        <p>(1グループあたり{Math.floor(nOfPeople / nOfGroup)}人程度)</p>
                        <div className="flex justify-center">
                            <button
                                className="mx-4 my-2 -pb-1 rounded-full bg-primary text-white w-12 h-12 text-2xl flex justify-center items-center"
                                onClick={() => {
                                    if (nOfPeople > nOfGroup) {
                                        setNOfGroup(nOfGroup + 1);
                                    }
                                }}
                            >
                                +
                            </button>
                            <button
                                className="mx-4 my-2 rounded-full bg-primary text-white w-12 h-12 text-2xl flex justify-center items-center"
                                onClick={() => {
                                    if (nOfGroup > 1) {
                                        setNOfGroup(nOfGroup - 1);
                                    }
                                }}
                            >
                                <p>-</p>
                            </button>
                        </div>
                        <p className="mt-6">人数に過不足がある時の挙動</p>
                        <label className="inline-flex items-center cursor-pointer mt-4 md:flex-row flex-col">
                            <input type="checkbox" value="" className="sr-only peer" />
                            {/* ↓トグルはメディアクエリでpeer-checked:after:translate-x-fullを指定できないため、断念 */}
                            {/* <div className="order-3 relative w-6 md:w-16 md:h-6 h-16 bg-black rounded-sm peer peer-checked:after:translate-y-full peer-checked:after:md:translate-x-full after:content-[''] after:absolute after:top-0 md:after:-top-1 after:-left-1 md:after:left-0 after:bg-primary after:h-8 after:w-8 after:transition-all "></div> */}
                            <span className="border peer-checked:border-dotted p-2 ml-3 text-sm text-primary peer-checked:text-black">
                                グループ数は変えずに1グループあたりの人数を増やす
                            </span>
                            <span className="border border-dotted peer-checked:border-solid p-2 ml-3 text-sm peer-checked:text-primary">
                                少ない人数で構成された グループを追加する
                            </span>
                        </label>
                    </FormCard>
                    <FormCard heading="グループ分けする回数">
                        <div className="flex justify-center items-center">
                            <p className="text-6xl mx-2 ">{groupingTimes}</p>
                            <p className="text-2xl">回</p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mx-4 my-2 -pb-1 rounded-full bg-primary text-white w-12 h-12 text-2xl flex justify-center items-center"
                                onClick={() => {
                                    setGroupingTimes(groupingTimes + 1);
                                }}
                            >
                                +
                            </button>
                            <button
                                className="mx-4 my-2 rounded-full bg-primary text-white w-12 h-12 text-2xl flex justify-center items-center"
                                onClick={() => {
                                    if (groupingTimes > 1) {
                                        setGroupingTimes(groupingTimes - 1);
                                    }
                                }}
                            >
                                <p>-</p>
                            </button>
                        </div>
                    </FormCard>
                    <FormCard heading="オプション">
                        <p>人数に過不足がある時</p>
                        <p>演算モード{nOfAttempts}</p>
                        <div className="grid grid-cols-5 grid-rows-3 md:gap-4 md:w-2/3">
                            {/* 1行目 */}
                            <p>精度</p>
                            <p>多少被りを許容する</p>
                            <p className="col-end-6 text-right">被りをできる限りなくす</p>
                            {/* 2行目 */}
                            <input
                                type="range"
                                min="1000"
                                max="1000000"
                                step="100"
                                value={nOfAttempts}
                                onChange={updateNOfAttempts}
                                className="col-start-2 col-end-6 h-4 bg-secondary rounded-lg appearance-none cursor-pointer"
                            />
                            {/* 3行目 */}
                            <p>計算時間</p>
                            <p>はやい</p>
                            <p className="col-end-6 text-right">おそい</p>
                        </div>
                    </FormCard>
                    <div className="flex justify-center my-6">
                        <button
                            onClick={runCalculation}
                            className="bg-tertiary py-6 px-12 text-3xl text-white"
                        >
                            演算開始
                        </button>
                    </div>
                </div>
            );
            break;
        case 'calculating':
            returnElement = (
                <ProgressCard
                    roster={roster}
                    nOfPeople={nOfPeople}
                    nOfGroups={nOfGroup}
                    groupingTimes={groupingTimes}
                    nOfAttempts={nOfAttempts}
                />
            );
            break;
        case 'finished':
            returnElement = <ResultCard />;
            break;
    }
    return (
        <Layout title="実行">
            <DescribeH1 heading="複数回のグループ生成" />
            {returnElement}
        </Layout>
    );
};

export default Run;
