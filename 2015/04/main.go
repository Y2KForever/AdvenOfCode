package main

import (
	"aoc-2023/utils"
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strconv"
)

func findHash(input string, prefix string) int {
	for i := 1; i < 10000000; i++ {
		hasher := md5.New()
		hasher.Write([]byte(input + strconv.Itoa(i)))
		md5 := hex.EncodeToString(hasher.Sum(nil))

		if md5[:len(prefix)] == prefix {
			return i
		}
	}
	return -1
}

func main() {
	input, _ := utils.ReadInput("input.txt")

	part1 := findHash(input[0], "00000")
	fmt.Println("Part 1:", part1)

	part2 := findHash(input[0], "000000")
	fmt.Println("Part 2:", part2)
}
