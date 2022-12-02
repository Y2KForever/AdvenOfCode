use std::fs;

fn main() {
    let contents = fs::read_to_string("../../input.txt").expect("Something went wrong");
    let vec: Vec<i32> = contents
        .split_whitespace()
        .map(|s| s.parse().expect("parse error"))
        .collect();
    let mut answer = 0;

    for x in 1..vec.len() {
        if vec[x] > vec[x - 1] {
            answer += 1;
        }
    }
    println!("Answer is: {}", answer);

    part2();
}

fn part2() {
    let contents = fs::read_to_string("../../input.txt").expect("Something went wrong");
    let vec: Vec<i32> = contents
        .split_whitespace()
        .map(|s| s.parse().expect("parse error"))
        .collect();
    let mut answer = 0;

    for x in 3..vec.len() {
        let a = vec[x - 3] + vec[x - 2] + vec[x - 1];
        let b = vec[x] + vec[x - 1] + vec[x - 2];

        if b > a {
            answer += 1;
        }
    }

    println!("Answer is: {}", answer);
}
