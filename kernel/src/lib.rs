use wasm_bindgen::prelude::*;
type MultipleTimesGroupVec = Vec<Vec<Vec<u8>>>; //分ける回数、グループ数、グループ人数 以後MTGと略す
type duplicatinCountVec=Vec<Vec<u8>>;//人x人の配列

// 参加者名を直接使う必要はないので、数字で管理してJS側で参加者名と紐づける
// 必要な値は参加人数、グループ人数、分ける回数の3つで、u8とかで行ける(0~255)→JS側で255人以上は受け付けないようにする、実際200人超えは組み合わせの爆発の仕方的にも無理なので
// returnで配列を返したいが、vec型returnはWASMにできないらしいので、文字列に変換して返し、JSで戻す
#[wasm_bindgen]
pub fn resolve_by_sa(n_of_people:u8,n_of_group:u8,n_of_times:u8)->String{
    //焼きなまし法関連 基本イミュータブルだが、初期温度などはconstでなく、引数ベースで入るようにする
    let mut temp: f64 = 100.0;

    //このへんf64にしてるけど、パラメータゲーなので意外と精度使うので意図的にf64。決してメモリの無駄遣いではない
    //初期温度
    let initial_temp: f64 = 100.0;
    //終了温度
    let end_temp: f64 = 0.00009;
    //冷却度
    let cooling_rate: f64 = 0.00009;

    //重複回数保存用の配列
    let mut duplication:duplicatinCountVec  = vec![vec![0; n_of_people as usize]; n_of_people as usize];


    //グループ分けを格納する変数
    let mut better_mtg:MultipleTimesGroupVec= create_first_mtg(n_of_people, n_of_group, n_of_times);
    //グループ分けを格納する変数
    let mut best_mtg:MultipleTimesGroupVec =better_mtg;

    //焼きなまし法のループ
    while temp > end_temp{


        temp*=cooling_rate;
    }





    //文字列にしてお返ししてあげる
    return vec_to_string(best_mtg);
}

//初期グループ分け生成
fn create_first_mtg(n_of_people:u8, n_of_group:u8, n_of_times:u8)->MultipleTimesGroupVec{
    //グループ分けを格納する変数
    let mut mtg:MultipleTimesGroupVec= vec![vec![vec![0; (n_of_people/n_of_group) as usize]; n_of_group as usize]; n_of_times as usize];

    let mut number:u8=0;
    //初期グループ分けを作成
    for i in 0..n_of_times{
        for j in 0..n_of_group{
            for k in 0..(n_of_people/n_of_group){
                mtg[i as usize][j as usize][k as usize]  =number;
                number+=1;
            }
        }
        number=0;
    }
    return mtg;
}

/**
 * 重複度の計算 人数で割ることで人数の造花に依存しないようにしている
 * counterはu32としてて、4294967295までに収まると信じている
 * returnでf64もいらない気がするが、他もf64にしてるので贅沢にf64にする
 */
fn calc_multiplicity(duplication_array:duplicatinCountVec,n_of_people:u8)->f64{
    let mut counter:u32=0;

    for i in duplication_array{
        for j in i{
            counter+=j as u32;
        }
    }

    return (counter as f64)/(n_of_people as f64);
}

/*
 * メンバーの入れ替え
 * https://qiita.com/tanakh/items/d70561f038a0ef4f0ff1#%E3%81%9D%E3%81%AE41-swap_remove%E3%82%92%E4%BD%BF%E3%81%86
 */
fn swap<T>(v: &mut Vec<Vec<T>>, i1: usize, j1: usize, i2: usize, j2: usize) {
    if i1 == i2 {
        v[i1].swap(j1, j2);
        return;
    }
    let n = v[i1].len();
    let mut e1 = v[i1].swap_remove(j1);
    std::mem::swap(&mut v[i2][j2], &mut e1);
    v[i1].push(e1);
    v[i1].swap(j1, n - 1);
}

//vec型配列から文字列に変える(WASMで配列returnできないので)
fn vec_to_string(mut source_vec:MultipleTimesGroupVec)->String{
    let mut return_string:String=String::from("");
    for i in source_vec.iter_mut(){
        for j in i.iter_mut(){
            for k in j.iter_mut(){
                return_string += &(k.to_string()+",");
            }
        }
    }
    return return_string;
}




#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_first_mtg(){
        let test_array:MultipleTimesGroupVec = create_first_mtg(12, 3, 4);
        assert_eq!(vec![vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]], vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]], vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]], vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]]],test_array);
    }

    #[test]
    fn test_swap(){
        let mut test_array:MultipleTimesGroupVec = vec![vec![vec![1,2],vec![3,4]],vec![vec![5,6],vec![7,8]],vec![vec![9,10],vec![11,12]]];
        swap(&mut test_array[0],0,0,1,0);
        assert_eq!(vec![vec![vec![3,2],vec![1,4]],vec![vec![5,6],vec![7,8]],vec![vec![9,10],vec![11,12]]],test_array);

    }

    #[test]
    fn test_vec_to_string(){
        let test_array:MultipleTimesGroupVec = vec![vec![vec![1,2],vec![3,4]],vec![vec![5,6],vec![7,8]],vec![vec![9,10],vec![11,12]]];
        assert_eq!("1,2,3,4,5,6,7,8,9,10,11,12,",vec_to_string(test_array));
    }

    #[test]
    fn test_calc_multiplicity(){
        let test_array:duplicatinCountVec = vec![vec![1,4,0],vec![1,1,0],vec![1,1,1]];
        assert_eq!(3.3333333333333335, calc_multiplicity(test_array,3));
    }


    #[test]
    fn resolveBySA() {
        let result:String = resolve_by_sa(12,3,3);
        print!("{:?}",result);
        assert_eq!(12,result.chars().count());
    }
}
