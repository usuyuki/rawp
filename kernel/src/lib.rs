mod sa;

pub fn main() {
    //開発用のテスト代わり(個々の関数はRustのテスト使っているが、1つmainがないと怒られるので)
    let result: String = sa::resolve_by_sa(12, 3, 3, 111);
    print!("{:?}", result);
}
