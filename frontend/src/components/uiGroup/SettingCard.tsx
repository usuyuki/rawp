import 'material-symbols';
import type { NextPage } from 'next';
const SettingCard: NextPage = () => {
    return (
        <div className="flex justify-center">
        - 分けたいグループの数orグループごとの人数
        - 人数不足or超過時の挙動設定
        - 選択
            - 人物名を入力
            - 自動採番
        - 探索モード選択
        </div>
    );
};

export default SettingCard;

