use rand::{Rng, SeedableRng};
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

type MultipleTimesGroupVec = Vec<Vec<Vec<u8>>>; //分ける回数、グループ数、グループ人数 以後MTGと略す
type DuplicatinCountVec = Vec<Vec<u8>>; //人x人の配列

// 参加者名を直接使う必要はないので、数字で管理してJS側で参加者名と紐づける
// 必要な値は参加人数、グループ人数、分ける回数の3つで、u8とかで行ける(0~255)→JS側で255人以上は受け付けないようにする、実際200人超えは組み合わせの爆発の仕方的にも無理なので
// returnで配列を返したいが、vec型returnはWASMにできないらしいので、文字列に変換して返し、JSで戻す


#[wasm_bindgen]
pub fn resolve_by_sa(n_of_people: u8, n_of_group: u8, n_of_times: u8, seed: u64) -> String{
    let debug: bool = false; //デバッグ用

    //1グループあたりの人数(簡単に求められるがよく使うので変数に入れておく)
    // @todo 端数でたときどする問題対処
    let n_of_per_group: u8 = n_of_people / n_of_group;

    //このへんf64にしてるけど、パラメータゲーなので意外と精度使うので意図的にf64。決してメモリの無駄遣いではない
    //初期温度(今はあまり意味をなしてないが、結果出力で初期温度使いたい事例がありうるので変数で定義している)
    let initial_temp: f64 = 100.0;
    //終了温度
    let end_temp: f64 = 0.001;
    //冷却度
    let cooling_rate: f64 = 0.9999;

    //焼きなまし法関連 基本イミュータブルだが、初期温度などはconstでなく、引数ベースで入るようにする
    let mut temp: f64 = initial_temp;

    //重複度
    let mut best_multiplicity: f64 = 1000.0;
    let mut better_multiplicity: f64 = 1000.0;

    //グループ分けを格納する変数
    let mut better_mtg: MultipleTimesGroupVec =
        create_first_mtg(n_of_people, n_of_group, n_of_times);
    //グループ分けを格納する変数
    let mut best_mtg: MultipleTimesGroupVec = better_mtg.clone();

    //乱数シード設定 時刻ベースにしていたがSysteTimeからu64の変換ができず断念。JSから渡す
    let mut rng = rand_xoshiro::Xoshiro256StarStar::seed_from_u64(seed);

    // 試行回数
    let mut counter: u64 = 0;
    //焼きなまし遷移した回数
    let mut gump_sa: u64 = 0;
    //焼きなまし法のループ
    while temp > end_temp {
        if debug {
            println!(
                "試行回数:{}現在温度:{}最適重複度{}最善重複度:{}焼きなまし遷移回数:{}\n",
                counter, temp, better_multiplicity, best_multiplicity, gump_sa
            );
        }
        //2点をランダムに選ぶ
        // @todo これ外で変数宣言したほうがメモリに優しい？
        //n番目の回数を入れ変える
        let cn: u8 = rng.gen_range(0..n_of_times);
        //iグループ目の
        let ci: u8 = rng.gen_range(0..n_of_group);
        //jを
        let cj: u8 = rng.gen_range(0..n_of_per_group);
        //kグループ目の
        let ck: u8 = rng.gen_range(0..n_of_group);
        //lと入れ替える
        let cl: u8 = rng.gen_range(0..n_of_per_group);

        //入れ替える
        swap(
            &mut better_mtg[cn as usize],
            ci as usize,
            cj as usize,
            ck as usize,
            cl as usize,
        );
        //入れ替え後の重複度の計算
        if counter == 85 {
            println!("85");
        }
        let duplication = update_duplication_array(better_mtg.clone(), n_of_people);
        let after_multiplicity = calc_multiplicity(duplication.clone(), n_of_people);

        let diff = better_multiplicity - after_multiplicity;

        if diff > 0.0 {
            //重複度が下がったらこの更新を許可
            better_multiplicity = after_multiplicity;
            if best_multiplicity > after_multiplicity {
                //焼きなしでは下がっても最善とは限らないので、最善とチェックして良ければ更新する
                best_multiplicity = after_multiplicity.clone();
                best_mtg = better_mtg.clone();
            }
        } else if (rng.gen_range(0..1) as f64) <= (-diff / temp).exp() {
            //確率的に変更を許容する
            better_multiplicity = after_multiplicity;
            gump_sa += 1;
        } else {
            //悪くなっているので元に戻す
            swap(
                &mut better_mtg[cn as usize],
                ck as usize,
                cl as usize,
                ci as usize,
                cj as usize,
            );
        }

        //温度を下げる
        temp *= cooling_rate;
        counter += 1;
    }

    //文字列にしてお返ししてあげる
    return vec_to_string(best_mtg);
}

//初期グループ分け生成
fn create_first_mtg(n_of_people: u8, n_of_group: u8, n_of_times: u8) -> MultipleTimesGroupVec {
    //グループ分けを格納する変数
    let mut mtg: MultipleTimesGroupVec =
        vec![
            vec![vec![0; (n_of_people / n_of_group) as usize]; n_of_group as usize];
            n_of_times as usize
        ];

    let mut number: u8 = 0;
    //初期グループ分けを作成
    for i in 0..n_of_times {
        for j in 0..n_of_group {
            for k in 0..(n_of_people / n_of_group) {
                mtg[i as usize][j as usize][k as usize] = number;
                number += 1;
            }
        }
        number = 0;
    }
    return mtg;
}

/**
 * 重複を検知して配列に格納する
 * 重複度の計算は別で行う(部分更新できるように)
 * @todo この関数の効率悪すぎる。適切な探索アルゴリズムに変えたい。
 * @todo バクの温床なのでcalc_multiplicity関数と統合したいが、若干責務別けたい気持ちもある
 */
fn update_duplication_array(
    search_array: MultipleTimesGroupVec,
    n_of_people: u8,
) -> DuplicatinCountVec {
    let mut tmp: Vec<u8>;
    //重複回数保存用の配列
    let mut store_array: DuplicatinCountVec =
        vec![vec![0; n_of_people as usize]; n_of_people as usize];

    for i in search_array {
        for j in i {
            tmp = j.clone();
            for k in j {
                for &l in tmp.iter() {
                    store_array[k as usize][l as usize] += 1;
                }
            }
        }
    }
    return store_array;
}

/**
 * 重複度の計算 人数で割ることで人数の造花に依存しないようにしている
 * counterはu32としてて、4294967295までに収まると信じている
 * returnでf64もいらない気がするが、他もf64にしてるので贅沢にf64にする
 */
fn calc_multiplicity(duplication_array: DuplicatinCountVec, n_of_people: u8) -> f64 {
    let mut counter: u32 = 0;
    let mut person_number: u8 = 0; //同じ人同士の邂逅もカウントしているので、それを無視するための変数

    for i in duplication_array {
        for j in i {
            //自身同士の組み合わせは除く
            if person_number == j {
                //重複するごとによくないので、より大きくなるよう*2を入れる
                counter += (j as u32) * 2;
            }
        }
        person_number += 1;
    }

    return (counter as f64) / (n_of_people as f64);
}

/*
 * メンバーの入れ替え
 * 参考：https://qiita.com/tanakh/items/d70561f038a0ef4f0ff1#%E3%81%9D%E3%81%AE41-swap_remove%E3%82%92%E4%BD%BF%E3%81%86
 */
fn swap(v: &mut Vec<Vec<u8>>, i1: usize, j1: usize, i2: usize, j2: usize) {
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
fn vec_to_string(mut source_vec: MultipleTimesGroupVec) -> String {
    let mut return_string: String = String::from("");
    for i in source_vec.iter_mut() {
        for j in i.iter_mut() {
            for k in j.iter_mut() {
                return_string += &(k.to_string() + ",");
            }
        }
    }
    return return_string;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_first_mtg() {
        let test_array: MultipleTimesGroupVec = create_first_mtg(12, 3, 4);
        assert_eq!(
            vec![
                vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]],
                vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]],
                vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]],
                vec![vec![0, 1, 2, 3], vec![4, 5, 6, 7], vec![8, 9, 10, 11]]
            ],
            test_array
        );
    }

    #[test]
    fn test_update_duplication_array() {
        let n_of_people: u8 = 9;
        let test_search_array: MultipleTimesGroupVec = vec![
            vec![vec![0, 1, 2], vec![3, 4, 5], vec![6, 7, 8]],
            vec![vec![0, 1, 2], vec![3, 4, 5], vec![6, 7, 8]],
            vec![vec![0, 1, 2], vec![3, 4, 5], vec![6, 7, 8]],
        ];
        assert_eq!(
            vec![
                vec![3, 3, 3, 0, 0, 0, 0, 0, 0],
                vec![3, 3, 3, 0, 0, 0, 0, 0, 0],
                vec![3, 3, 3, 0, 0, 0, 0, 0, 0],
                vec![0, 0, 0, 3, 3, 3, 0, 0, 0],
                vec![0, 0, 0, 3, 3, 3, 0, 0, 0],
                vec![0, 0, 0, 3, 3, 3, 0, 0, 0],
                vec![0, 0, 0, 0, 0, 0, 3, 3, 3],
                vec![0, 0, 0, 0, 0, 0, 3, 3, 3],
                vec![0, 0, 0, 0, 0, 0, 3, 3, 3]
            ],
            update_duplication_array(test_search_array, n_of_people)
        );
    }

    #[test]
    fn test_swap() {
        let mut test_array: MultipleTimesGroupVec = vec![
            vec![vec![1, 2], vec![3, 4]],
            vec![vec![5, 6], vec![7, 8]],
            vec![vec![9, 10], vec![11, 12]],
        ];
        swap(&mut test_array[0], 0, 0, 1, 0);
        assert_eq!(
            vec![
                vec![vec![3, 2], vec![1, 4]],
                vec![vec![5, 6], vec![7, 8]],
                vec![vec![9, 10], vec![11, 12]]
            ],
            test_array
        );
    }

    #[test]
    fn test_vec_to_string() {
        let test_array: MultipleTimesGroupVec = vec![
            vec![vec![1, 2], vec![3, 4]],
            vec![vec![5, 6], vec![7, 8]],
            vec![vec![9, 10], vec![11, 12]],
        ];
        assert_eq!("1,2,3,4,5,6,7,8,9,10,11,12,", vec_to_string(test_array));
    }

    #[test]
    fn test_calc_multiplicity() {
        let test_array: DuplicatinCountVec = vec![vec![1, 4, 0], vec![1, 1, 0], vec![1, 1, 1]];
        assert_eq!(1.3333333333333333, calc_multiplicity(test_array, 3));
    }
}
