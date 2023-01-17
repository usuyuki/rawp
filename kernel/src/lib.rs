use wasm_bindgen::prelude::*;
type MultipleTimesGroup = Vec<Vec<Vec<u8>>>; //分ける回数、グループ数、グループ人数 以後MTGと略す

// 参加者名を直接使う必要はないので、数字で管理してJS側で参加者名と紐づける
// 必要な値は参加人数、グループ人数、分ける回数の3つで、u8とかで行ける(0~255)→JS側で255人以上は受け付けないようにする、実際200人超えは組み合わせの爆発の仕方的にも無理なので
// returnで配列を返したいが、vec型returnはWASMにできないらしいので、文字列に変換して返し、JSで戻す
#[wasm_bindgen]
pub fn resolve_by_sa()->String{
    //ここはあとで引数にする
    let n_of_people:u8 = 12;
    let n_of_group:u8 = 3;
    let n_of_times:u8 = 3;

    //焼きなまし法関連 基本イミュータブルだが、初期温度などはconstでなく、引数ベースで入るようにする
    let mut temp: f64 = 100.0;

    //初期温度
    let initial_temp: f64 = 100.0;
    //終了温度
    let end_temp: f64 = 0.00009;
    //冷却度
    let cooling_rate: f64 = 0.00009;

    //重複回数保存用の配列
    let mut duplication: Vec<Vec<u8>> = vec![vec![0; n_of_people as usize]; n_of_people as usize];


    //グループ分けを格納する変数
    let mut better_mtg:MultipleTimesGroup= vec![vec![vec![0; (n_of_people/n_of_group) as usize]; n_of_group as usize]; n_of_times as usize];
    //グループ分けを格納する変数
    let mut best_mtg:MultipleTimesGroup = vec![vec![vec![0; (n_of_people/n_of_group) as usize]; n_of_group as usize]; n_of_times as usize];


    //初期グループ分けを作成
    for i in 0..n_of_times{
        for j in 0..n_of_group{
            for k in 0..(n_of_people/n_of_group){
                better_mtg[i as usize][j as usize][k as usize] = (i*n_of_group*n_of_people/n_of_group + j*n_of_people/n_of_group + k) as u8;
            }
        }
    }
    vec_to_string(best_mtg)
}

//初期グループ分け生成
fn create_first_mtg<T:Clone>(better_mtg:&mut MultipleTimesGroup, n_of_people:u8, n_of_group:u8, n_of_times:u8){
    //グループ分けを格納する変数
    let mut better_mtg:MultipleTimesGroup= vec![vec![vec![0; (n_of_people/n_of_group) as usize]; n_of_group as usize]; n_of_times as usize];
    //グループ分けを格納する変数
    let mut best_mtg:MultipleTimesGroup = vec![vec![vec![0; (n_of_people/n_of_group) as usize]; n_of_group as usize]; n_of_times as usize];

    //初期グループ分けを作成
    for i in 0..n_of_times{
        for j in 0..n_of_group{
            for k in 0..(n_of_people/n_of_group){
                better_mtg[i as usize][j as usize][k as usize]  = (i*n_of_group*n_of_people/n_of_group + j*n_of_people/n_of_group + k) as u8;
            }
        }
    }
}

//重複度の計算
fn calcMultiplicity(){

}

//メンバーの入れ替え
fn swap(){

}

//vec型配列から文字列に変える(WASMで配列returnできないので)
fn vec_to_string(mut source_vec:MultipleTimesGroup)->String{
    let mut return_string:String=String::from("");
    for i in source_vec.iter_mut(){
        for j in i.iter_mut(){
            for k in j.iter_mut(){
                return_string += &(k.to_string()+",");
            }
        }
    }
    return_string
}




#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_first_mtg(){
        // createFirstMTG(better_mtg, n_of_people, n_of_group, n_of_times)
    }

    #[test]
    fn test_swap(){
        // swap()
    }

    #[test]
    fn test_vec_to_string(){
        let test_array:MultipleTimesGroup = vec![vec![vec![1,2],vec![3,4]],vec![vec![5,6],vec![7,8]],vec![vec![9,10],vec![11,12]]];
        assert_eq!("1,2,3,4,5,6,7,8,9,10,11,12,",vec_to_string(test_array));
    }


    // #[test]
    // fn resolveBySA() {
    //     let result = resolveBySA();
    //     assert_eq!(result, 45);
    // }
}
