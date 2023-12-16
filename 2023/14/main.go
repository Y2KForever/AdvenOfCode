package main

import (
	"aoc-2023/utils"
	"fmt"
	"slices"
	"strings"
)

func main() {
	input, _ := utils.ReadInput("input.txt")
	dish := rotate(input)

	fmt.Println("Sum of part1:", load(tilt(dish)))

	cycles, seen := 1000000000, map[string]int{}
	for i := 0; i < cycles; i++ {
		if s, ok := seen[fmt.Sprint(dish)]; ok {
			i = cycles - (cycles-i)%(i-s)
		}
		seen[fmt.Sprint(dish)] = i
		for i := 0; i < 4; i++ {
			dish = rotate(tilt(dish))
		}
	}
	fmt.Println("Sum of part2:", load(dish))
}

func rotate(dish []string) []string {
	rot := make([]string, len(dish[0]))
	for r := range dish {
		for c := range dish[r] {
			rot[c] += string(dish[len(dish)-r-1][c])
		}
	}
	return rot
}

func tilt(dish []string) []string {
	dish = slices.Clone(dish)
	for i := range dish {
		for strings.Contains(dish[i], "O.") {
			dish[i] = strings.ReplaceAll(dish[i], "O.", ".O")
		}
	}
	return dish
}

func load(dish []string) (l int) {
	for i, s := range rotate(dish) {
		l += strings.Count(s, "O") * (i + 1)
	}
	return
}
