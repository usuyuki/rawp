use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub fn sums(value: i32) -> i32 {
    let mut a: i32 = 0;
    for i in 1..value+1 {
        a += i;
    }
    a
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
