package main

import (
	"aoc-2023/utils"
	"fmt"
)

const (
	openParen  = '('
	closeParen = ')'
)

func main() {
	input, _ := utils.ReadInput("input.txt")
	floor := 0

	for i, char := range input[0] {
		switch char {
		case openParen:
			floor++
		case closeParen:
			floor--
		}

		if floor == -1 {
			fmt.Println("Part 2:", i+1)
			return
		}
	}

	fmt.Println("Part 1:", floor)
}
