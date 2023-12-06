package main

import (
	"fmt"
	"regexp"
	"strings"

	"aoc-2023/utils"
)

func main() {
	lines, _ := utils.ReadInput("input.txt")
	var niceCount int

	for _, line := range lines {
		vowelCount := 0
		for _, char := range line {
			if strings.ContainsRune("aeiou", char) {
				vowelCount++
			}
		}
		if vowelCount >= 3 {
			hasDoubleLetter := false
			for i := 1; i < len(line); i++ {
				if line[i] == line[i-1] {
					hasDoubleLetter = true
				}
			}
			if hasDoubleLetter {
				disallowPattern := regexp.MustCompile("(ab|cd|pq|xy)")
				if disallowPattern.MatchString(line) {
					continue
				} else {
					niceCount++
				}
			}
		}
	}

	fmt.Printf("Sum part 1: %d\n", niceCount)
}
