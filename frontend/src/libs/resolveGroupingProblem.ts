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
    isAddGroup: boolean,
    isExcessOrDeficiency: boolean,
): string[][][] => {
    //過不足調整処理
    let nOfPeopleForCalc = nOfPeople;
    let nOfGroupForCalc = nOfGroup;
    //過不足判定フラグ
    if (isExcessOrDeficiency) {
        if (isAddGroup) {
            nOfGroupForCalc += 1;
            nOfPeopleForCalc = Math.ceil(nOfPeople / nOfGroupForCalc) * nOfGroupForCalc;
        } else {
            //デフォルトでは過不足時には人数を足して最後に帳尻合わせる
            nOfPeopleForCalc = Math.ceil(nOfPeople / nOfGroup) * nOfGroup;
        }

        /**
         * rosterをいじっているが、constの変数を引数に渡しているものなので、呼び出し元は変わらない
         */
        for (let i = 0; i < nOfPeopleForCalc - nOfPeople; i++) {
            //空の要素を追加。textareaからの取得で空は除いているので、ユーザー入力と競合しない
            roster.push('');
        }
    }

    //乱数用の時間生成
    const timeObj = new Date();
    const result: string = resolve_by_sa(
        nOfPeopleForCalc,
        nOfGroupForCalc,
        nOfTimes,
        BigInt(timeObj.getTime()),
    );

    //文字列を配列に変換
    const rawArray: string[] = result.split(',');
    //1次元配列から本来の3次元配列に戻す
    const resultArray: string[][][] = [];
    let sliceCounter = 0;
    const perGroup: number = nOfPeopleForCalc / nOfGroupForCalc;
    for (let i = 0; i < nOfTimes; i++) {
        const tmpArray: string[][] = [];
        for (let j = 0; j < nOfGroupForCalc; j++) {
            tmpArray.push(rawArray.slice(sliceCounter, (sliceCounter += perGroup)));
        }
        resultArray.push(tmpArray);
    }
    //人物名配列への変換 配列にする前に最初変換する方式だったが、人物名に名前が入ると壊れるのでこの方式に変更
    resultArray.forEach((byCount, i) => {
        {
            byCount.forEach((byGroup, j) => {
                //数字→名前の変換
                byGroup.forEach((byMember, k) => {
                    resultArray[i][j][k] = roster[Number(byMember)];
                });
                //帳尻合わせした配列を治す(空要素を消す)
                console.log(resultArray[i][j]);
                if (isExcessOrDeficiency) {
                    resultArray[i][j] = resultArray[i][j].filter((byMember) => {
                        return byMember !== '';
                    });
                }
            });
        }
    });

    return resultArray;
};