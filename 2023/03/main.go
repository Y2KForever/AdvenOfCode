package main

import (
	"fmt"
	"image"
	"os"
	"regexp"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input, err := os.ReadFile("input.txt")

	if err != nil {
		panic("Could not read input file")
	}

	grid := map[image.Point]rune{}
	for rowNum, row := range strings.Fields(string(input)) {
		for lineNum, line := range row {
			if line != '.' && !unicode.IsDigit(line) {
				grid[image.Point{lineNum, rowNum}] = line
			}
		}
	}

	parts := map[image.Point][]int{}
	for rowNum, row := range strings.Fields(string(input)) {
		for _, line := range regexp.MustCompile(`\d+`).FindAllStringIndex(row, -1) {
			bounds := map[image.Point]struct{}{}
			for match := line[0]; match < line[1]; match++ {
				for _, point := range []image.Point{
					{-1, -1}, {-1, 0}, {-1, 1}, {0, -1},
					{0, 1}, {1, -1}, {1, 0}, {1, 1},
				} {
					bounds[image.Point{match, rowNum}.Add(point)] = struct{}{}
				}
			}

			n, _ := strconv.Atoi(row[line[0]:line[1]])
			for bound := range bounds {
				if _, ok := grid[bound]; ok {
					parts[bound] = append(parts[bound], n)
				}
			}
		}
	}

	part1, part2 := 0, 0
	for p, ns := range parts {
		prod := 1
		for _, n := range ns {
			part1 += n
			prod *= n
		}
		if grid[p] == '*' && len(ns) == 2 {
			part2 += prod
		}
	}
	fmt.Println("Sum part 1: ", part1)
	fmt.Println("Sum part 2: ", part2)
}
