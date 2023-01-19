import { useEffect, useState } from 'react';

import FormCard from '@/components/uiGroup/Card/FormCard';
import ProgressElement from '@/components/uiGroup/Element/ProgressElement';
import ResultElement from '@/components/uiGroup/Element/ResultElement';
import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';

import { resolveGroupingProblem } from '@/libs/resolveGroupingProblem';

// import { useModal } from 'react-hooks-use-modal';
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
    ///処理実行許可フラグ(useStateが即座に反映されないので、それをうまくするやつ)
    const [runFlag, setRunFlag] = useState<boolean>(false);

    /**
     * 参加者名簿から人数を更新
     */
    useEffect(() => {
        setNOfPeople(roster.length);
    }, [roster]);
    /**
     * グループ数が参加人数より多い場合はグループ数を参加人数に合わせる
     */
    useEffect(() => {
        if (nOfGroup > nOfPeople) {
            setNOfGroup(nOfPeople);
        }
    }, [nOfPeople, nOfGroup]);
    /**
     * バリデーション
     * Rust側でu8にしている都合と現実的に計算できる数の都合で255まで
     * クライアント簡潔なので厳密なバリデーションは不要、ユーザーに不便ないレベルまでバリデーションはする
     */
    useEffect(() => {
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
    }, [nOfGroup, nOfPeople, nOfTimes]);

    const updateRoster = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //改行ごとに配列に格納、この配列のlengthを利用して人数とtextareaの幅調整も行う大変にSDGsなやつ
        setRoster(e.target.value.split(/\r\n|\n/));
    };

    const updateNOfAttempts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNOfAttempts(Number(e.target.value));
    };
    /**
     * nowPhaseの変更
     * ↓
     * 再レンダリング→処理中表示
     * ↓
     * グループ分け処理の演算
     * ↓
     * 再レンダリング→結果表示
     *
     * の順にするための板挟み処理
     * ※これしないと1つめの再レンダリングがされなくなる
     */
    useEffect(() => {
        if (nowPhase === 'calculating') {
            setRunFlag(true);
        }
    }, [nowPhase]);
    /**
     * 一度runFlagを挟まないとuseEffectの処理待ちでcalculatingの再レンダリングが走らず
     */
    useEffect(() => {
        if (runFlag) {
            setResultGrouping(resolveGroupingProblem(nOfPeople, nOfGroup, nOfTimes, roster));
            setNowPhase('finished');
            setRunFlag(false);
            window.scrollTo(0, 0);
        }
    }, [runFlag]);

    //演算開始ボタン押下
    const runCalculation = () => {
        console.log('aaa');
        setNowPhase('calculating');
        window.scrollTo(0, 0);
    };

    //もう一度計算するボタン
    const runCalculationAgain = () => {
        setNowPhase('waiting');
        setResultGrouping([]);
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
                        {/* <p className="mt-6">人数に過不足がある時の挙動</p>
                        <label className="mt-4 inline-flex cursor-pointer flex-col items-center md:flex-row">
                            <input type="checkbox" value="" className="peer sr-only" />
                             ↓トグルはメディアクエリでpeer-checked:after:translate-x-fullを指定できないため、断念 
                             <div className="order-3 relative w-6 md:w-16 md:h-6 h-16 bg-black rounded-sm peer peer-checked:after:translate-y-full peer-checked:after:md:translate-x-full after:content-[''] after:absolute after:top-0 md:after:-top-1 after:-left-1 md:after:left-0 after:bg-primary after:h-8 after:w-8 after:transition-all "></div> 
                            <span className="ml-3 border p-2 text-sm text-primary peer-checked:border-dotted peer-checked:text-black">
                                グループ数は変えずに1グループあたりの人数を増やす
                            </span>
                            <span className="ml-3 border border-dotted p-2 text-sm peer-checked:border-solid peer-checked:text-primary">
                                少ない人数で構成された グループを追加する
                            </span>
                        </label> */}
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
                // roster={roster}
                // nOfPeople={nOfPeople}
                // nOfGroups={nOfGroup}
                // nOfTimes={nOfTimes}
                // nOfAttempts={nOfAttempts}
                />
            );
            console.log('ProgressElement');
            break;
        case 'finished':
            returnElement = (
                <ResultElement
                    resultGrouping={resultGrouping}
                    runCalculationAgain={runCalculationAgain}
                />
            );
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
