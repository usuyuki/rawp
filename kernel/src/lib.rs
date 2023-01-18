mod sa;

pub fn main() {
    let result: String = sa::resolve_by_sa(12, 3, 3, 111);
    print!("{:?}", result);
}
