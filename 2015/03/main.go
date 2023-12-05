package main

import (
	"aoc-2023/utils"
	"fmt"
	"strings"
)

func main() {
	lines, _ := utils.ReadInput("input.txt")
	input := strings.TrimSpace(lines[0])

	space := make(map[int]bool)
	santa := 0

	space[santa] = true

	for _, c := range input {
		switch c {
		case '^':
			santa += 1
		case 'v':
			santa -= 1
		case '<':
			santa -= len(input)
		case '>':
			santa += len(input)
		}
		space[santa] = true
	}
	count := 0
	for _, unique := range space {
		if unique {
			count++
		}
	}
	fmt.Println("Part 1:", count)
}
