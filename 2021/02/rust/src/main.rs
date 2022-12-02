use std::fs;

fn part1() {
    const RADIX: u32 = 10;
    let contents = fs::read_to_string("../input.txt").expect("Something went wrong");
    let vec: Vec<&str> = contents.split("\n").collect();
    let mut horizontal = 0;
    let mut depth = 0;

    for x in 0..vec.len() {
        let value = vec[x].chars().last().unwrap().to_digit(RADIX).unwrap();
        if vec[x].contains("forward") {
            horizontal += value;
        } else if vec[x].contains("up") {
            depth -= value;
        } else if vec[x].contains("down") {
            depth += value;
        }
    }
    let answer = depth * horizontal;
    println!("Answer to part 1 is: {}", answer);
}

fn part2() {
    const RADIX: u32 = 10;
    let contents = fs::read_to_string("../input.txt").expect("Something went wrong");
    let vec: Vec<&str> = contents.split("\n").collect();
    let mut horizontal = 0;
    let mut depth = 0;
    let mut aim = 0;

    for x in 0..vec.len() {
        let value = vec[x].chars().last().unwrap().to_digit(RADIX).unwrap();
        if vec[x].contains("forward") {
            horizontal += value;
            depth += (value * aim);
        } else if vec[x].contains("up") {
            aim -= value;
        } else if vec[x].contains("down") {
            aim += value;
        }
    }
    let answer = depth * horizontal;
    println!("Answer to part 2 is: {}", answer);
}

fn main() {
    part1();
    part2();
}
