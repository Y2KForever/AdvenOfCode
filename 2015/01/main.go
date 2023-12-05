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
	input, _ := utils.ReadInput("")
	floor := 0

	for i, char := range input[0] {
		switch char {
		case openParen:
			floor++
		case closeParen:
			floor--
		}

		if floor == -1 {
			fmt.Println("Santa gets to the basement on floor:", i+1) // Adjust index to start from 1
			return
		}
	}

	fmt.Println("Santa ends up on floor:", floor)
}
