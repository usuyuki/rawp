use wasm_bindgen::prelude::*;
type MultipleTimesGroup = Vec<Vec<Vec<u8>>>; //分ける回数、グループ数、グループ人数 以後MTGと略す

fn main(){
    println!("Hello, world!");
}

// 参加者名を直接使う必要はないので、数字で管理してJS側で参加者名と紐づける
// 必要な値は参加人数、グループ人数、分ける回数の3つで、u8とかで行ける(0~255)→JS側で255人以上は受け付けないようにする、実際200人超えは組み合わせの爆発の仕方的にも無理なので
#[wasm_bindgen]
pub fn resolveBySA() -> Vec<Vec<u8>> {
    //ここはあとで引数にする
    let nOfPeople:u8 = 12;
    let nOfGroup:u8 = 3;
    let nOfTimes:u8 = 3;

    //焼きなまし法関連 基本イミュータブルだが、初期温度などはconstでなく、引数ベースで入るようにする
    let mut temp: f64 = 100.0;

    //初期温度
    let initialTemp: f64 = 100.0;
    //終了温度
    let endTemp: f64 = 0.00009;
    //冷却度
    let coolingRate: f64 = 0.00009;

    //重複回数保存用の配列
    let mut duplication: Vec<Vec<u8>> = vec![vec![0; nOfPeople as usize]; nOfPeople as usize];


    //グループ分けを格納する変数
    let mut betterMTG:MultipleTimesGroup= vec![vec![vec![0; (nOfPeople/nOfGroup) as usize]; nOfGroup as usize]; nOfTimes];
    //グループ分けを格納する変数
    let mut bestMTG:MultipleTimesGroup = vec![vec![vec![0; (nOfPeople/nOfGroup) as usize]; nOfGroup as usize]; nOfTimes];


    //初期グループ分けを作成
    for i in 0..nOfTimes{
        for j in 0..nOfGroup{
            for k in 0..(nOfPeople/nOfGroup){
                betterMTG[i][j][k] = (i*nOfGroup*nOfPeople/nOfGroup + j*nOfPeople/nOfGroup + k) as u8;
            }
        }
    }
    bestMTG;
}

//初期グループ分け生成
fn createFirstMTG<T:Clone>(betterMTG:&mut MultipleTimesGroup, nOfPeople:u8, nOfGroup:u8, nOfTimes:u8){
    //グループ分けを格納する変数
    let mut betterMTG:MultipleTimesGroup= vec![vec![vec![0; (nOfPeople/nOfGroup) as usize]; nOfGroup as usize]; nOfTimes];
    //グループ分けを格納する変数
    let mut bestMTG:MultipleTimesGroup = vec![vec![vec![0; (nOfPeople/nOfGroup) as usize]; nOfGroup as usize]; nOfTimes];

    //初期グループ分けを作成
    for i in 0..nOfTimes{
        for j in 0..nOfGroup{
            for k in 0..(nOfPeople/nOfGroup){
                betterMTG[i][j][k] = (i*nOfGroup*nOfPeople/nOfGroup + j*nOfPeople/nOfGroup + k) as u8;
            }
        }
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = sums(9);
        assert_eq!(result, 45);
    }
}
