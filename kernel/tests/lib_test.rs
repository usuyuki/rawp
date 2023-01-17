use lib::resolve_by_sa;

#[test]
fn test_resolve_by_sa() {
    let result: String = resolve_by_sa(12, 3, 3);
    print!("{:?}", result);
    assert_eq!(12, result.chars().count());
}
