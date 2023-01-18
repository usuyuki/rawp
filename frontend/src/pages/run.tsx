import { useEffect, useState } from 'react';

import FormCard from '@/components/uiGroup/Card/FormCard';
import ProgressElement from '@/components/uiGroup/Element/ProgressElement';
import ResultElement from '@/components/uiGroup/Element/ResultElement';
import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

// import { useModal } from 'react-hooks-use-modal';
import { resolve_by_sa } from '@/libs/rawpKernel/rawp_kernel.js';
// import { resolve_by_sa } from '@/libs/rawp_kernel_bg.wasm';//w型がなぜかぶっ壊れてるのでこの読み込みだと事故る issues→https://github.com/rustwasm/wasm-bindgen/issues/2117
type phaseType = 'waiting' | 'calculating' | 'finished';

const Run: NextPage = () => {
    //参加者名簿
    const [roster, setRoster] = useState<string[]>([]);
    //参加人数
    const [nOfPeople, setNOfPeople] = useState<number>(1);
    //グループ数
    const [nOfGroup, setNOfGroup] = useState<number>(1);
    //グループ分け回数
    const [nOfTimes, setnOfTimes] = useState<number>(1);
    //試行回数
    const [nOfAttempts, setNOfAttempts] = useState<number>(5000);
    //フェーズの管理
    const [nowPhase, setNowPhase] = useState<phaseType>('waiting');
    //グループ分け結果を格納する変数
    const [resultGrouping, setResultGrouping] = useState<string[][][]>([]);
    //バリデーションフラグ
    const [validate, setValidate] = useState<boolean>(false);

    useEffect(() => {
        setNOfPeople(roster.length);
        if (nOfGroup > nOfPeople) {
            setNOfGroup(nOfPeople);
        }

        /**
         * バリデーション
         * Rust側でu8にしている都合と現実的に計算できる数の都合で255まで
         * クライアント簡潔なので厳密なバリデーションは不要、ユーザーに不便ないレベルまでバリデーションはする
         */
        if (
            nOfPeople > 0 &&
            nOfPeople < 255 &&
            nOfGroup > 0 &&
            nOfGroup < nOfPeople &&
            nOfTimes > 0 &&
            nOfTimes < 255
        ) {
            setValidate(true);
        }
    }, [roster.length, nOfGroup, nOfPeople, nOfTimes, validate]);

    const updateRoster = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //改行ごとに配列に格納、この配列のlengthを利用して人数とtextareaの幅調整も行う大変にSDGsなやつ
        setRoster(e.target.value.split(/\r\n|\n/));
    };

    const updateNOfAttempts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNOfAttempts(Number(e.target.value));
    };

    const runCalculation = () => {
        if (validate) {
            setValidate(false);
            setNowPhase('calculating');

            //乱数用の時間生成
            const timeObj = new Date();
            const result: string = resolve_by_sa(
                nOfPeople,
                nOfGroup,
                nOfTimes,
                BigInt(timeObj.getTime()),
            );

            //文字列を配列に変換
            const rawArray: string[] = result.split(',');
            //1次元配列から本来の3次元配列に戻す
            const resultArray: string[][][] = [];
            let sliceCounter = 0;
            const perGroup: number = nOfPeople / nOfGroup;
            for (let i = 0; i < nOfTimes; i++) {
                const tmpArray: string[][] = [];
                for (let j = 0; j < nOfGroup; j++) {
                    tmpArray.push(rawArray.slice(sliceCounter, (sliceCounter += perGroup)));
                }
                resultArray.push(tmpArray);
            }
            //人物名配列への変換 配列にする前に最初変換する方式だったが、人物名に名前が入ると壊れるのでこの方式に変更
            resultArray.forEach((byCount, i) => {
                {
                    byCount.forEach((byGroup, j) => {
                        byGroup.forEach((byMember, k) => {
                            resultArray[i][j][k] = roster[Number(byMember)];
                        });
                    });
                }
            });

            setResultGrouping(resultArray);
            setNowPhase('finished');
        } else {
            //事前にバリデーションしてるので大丈夫だが、多重検証
            alert('入力値が不正です。');
        }
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
                        <p>※最大人数:255人</p>
                    </FormCard>
                    <FormCard heading="作成したいグループ数">
                        <div className="flex items-center justify-center">
                            <p className="mx-2 text-6xl ">{nOfGroup}</p>
                            <p className="text-2xl">グループ</p>
                        </div>
                        <p>
                            (1グループあたり
                            {nOfPeople === 0 || nOfGroup == 0
                                ? '-'
                                : Math.floor(nOfPeople / nOfGroup)}
                            人程度)
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="mx-4 my-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary pb-1 text-2xl text-white"
                                onClick={() => {
                                    if (nOfPeople > nOfGroup) {
                                        setNOfGroup(nOfGroup + 1);
                                    }
                                }}
                            >
                                +
                            </button>
                            <button
                                className="mx-4 my-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-white"
                                onClick={() => {
                                    if (nOfGroup > 1) {
                                        setNOfGroup(nOfGroup - 1);
                                    }
                                }}
                            >
                                <p>-</p>
                            </button>
                        </div>
                        <p className="mt-6">
                            実装が間に合わず、現在人数に過不足があると正しく動かない仕様となっております。割り切れるグループ数を選択肢てください
                        </p>
                    </FormCard>
                    <FormCard heading="グループ分けする回数">
                        <div className="flex items-center justify-center">
                            <p className="mx-2 text-6xl ">{nOfTimes}</p>
                            <p className="text-2xl">回</p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mx-4 my-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary pb-1 text-2xl text-white"
                                onClick={() => {
                                    setnOfTimes(nOfTimes + 1);
                                }}
                            >
                                +
                            </button>
                            <button
                                className="mx-4 my-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-white"
                                onClick={() => {
                                    if (nOfTimes > 1) {
                                        setnOfTimes(nOfTimes - 1);
                                    }
                                }}
                            >
                                <p>-</p>
                            </button>
                        </div>
                    </FormCard>
                    <div className="my-6 flex flex-col items-center justify-center">
                        {validate ? (
                            <p className="text-primary">バリデーションOK、実行できます！</p>
                        ) : (
                            <p className="text-tertiary">まだ実行できません。</p>
                        )}
                        <button
                            onClick={runCalculation}
                            className="bg-tertiary py-6 px-12 text-3xl text-white"
                            disabled={!validate}
                        >
                            演算開始
                        </button>
                    </div>
                </div>
            );
            break;
        case 'calculating':
            returnElement = (
                <ProgressElement
                    roster={roster}
                    nOfPeople={nOfPeople}
                    nOfGroups={nOfGroup}
                    nOfTimes={nOfTimes}
                    nOfAttempts={nOfAttempts}
                />
            );
            break;
        case 'finished':
            returnElement = <ResultElement resultGrouping={resultGrouping} />;
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
