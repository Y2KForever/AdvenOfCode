package main

import (
	"aoc-2023/utils"
	"fmt"
	"regexp"
	"slices"
	"strings"
)

func main() {
	lines, err := utils.ReadInput("input.txt")

	if err != nil {
		fmt.Println(err)
	}
	nums := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9",
		"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

	calc := func(nums []string) (result int) {
		first := regexp.MustCompile(`(` + strings.Join(nums, "|") + `)`)
		last := regexp.MustCompile(`.*` + first.String())

		for _, v := range lines {
			result += 10 * (slices.Index(nums, first.FindStringSubmatch(v)[1])%9 + 1)
			result += slices.Index(nums, last.FindStringSubmatch(v)[1])%9 + 1
		}
		return result
	}

	fmt.Println("Sum part 1:", calc(nums[:9]))
	fmt.Println("Sum part 2:", calc(nums))
}
