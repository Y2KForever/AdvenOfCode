package main

import (
	"aoc-2023/utils"
	"fmt"
	"regexp"
	"slices"
	"strconv"
)

func main() {
	lines, err := utils.ReadInput("input.txt")

	if err != nil {
		panic("Could not read input")
	}

	re := regexp.MustCompile(`(\d+) (\w+)`)

	part1, part2 := 0, 0
	for id, line := range lines {
		min := map[string]int{}

		for _, match := range re.FindAllStringSubmatch(line, -1) {
			n, _ := strconv.Atoi(match[1])
			min[match[2]] = slices.Max([]int{min[match[2]], n})
		}

		if min["red"] <= 12 && min["green"] <= 13 && min["blue"] <= 14 {
			part1 += id + 1
		}
		part2 += min["red"] * min["green"] * min["blue"]
	}

	fmt.Println("Sum part 1:", part1)
	fmt.Println("Sum part 2:", part2)
}
