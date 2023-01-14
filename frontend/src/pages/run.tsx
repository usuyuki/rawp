import { useState } from 'react';

import FormCard from '@/components/uiGroup/FormCard';
import DescribeH1 from '@/components/uiParts/Heading/DescribeH1';
import Layout from '@/layouts/Layout';

import type { NextPage } from 'next';
const Run: NextPage = () => {
    const [Roster, setRoster] = useState<string[]>([]);

    const updateRoster = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRoster(e.target.value.split(/\r\n|\n/));
    };
    return (
        <Layout title="実行">
            <DescribeH1 heading="複数回のグループ生成" />
            <div className="counter-element">
                <FormCard heading="参加者の名前を入力してください">
                    <p>改行で参加者名をお一人ずつ入力してください</p>
                    <textarea onChange={updateRoster} rows={Roster.length}></textarea>
                    <div>{Roster.length}人</div>
                </FormCard>
                <FormCard heading="作成したいグループ数か1グループ当たりの人数どちらか入力してください">
                    <div className="flex justify-around">
                        <div>
                            <p>作成したいグループ数</p>
                            <input type="number" />
                        </div>
                        <p>or</p>
                        <div>
                            <p>1グループ当たりの人数</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <p>※片方入力すると自動でもう片方がもとまります。</p>
                        <p>
                            ※人数に過不足があるときのグループ分けは下にあるオプション選択より調整できます。
                        </p>
                    </div>
                </FormCard>
                <FormCard heading="グループ分けする回数を選択してください">
                    <p>グループ分けする回数</p>
                </FormCard>
                <FormCard heading="オプションを選択肢てください">
                    <p>人数に過不足がある時</p>
                    <p>演算モード</p>
                </FormCard>
                <button>演算開始</button>
            </div>
        </Layout>
    );
};

export default Run;
