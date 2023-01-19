/**
 * wasmの関数のラッパー
 * 帰ってきた文字列を配列に直したりする
 */

import { resolve_by_sa } from '@/wasm/rawpKernel/rawp_kernel.js';
export const resolveGroupingProblem = (
    nOfPeople: number,
    nOfGroup: number,
    nOfTimes: number,
    roster: string[],
): string[][][] => {
    //乱数用の時間生成
    const timeObj = new Date();
    const result: string = resolve_by_sa(nOfPeople, nOfGroup, nOfTimes, BigInt(timeObj.getTime()));

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
    return resultArray;
};
