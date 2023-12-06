package main

import (
	"encoding/json"
	"fmt"
	"math"
	"os"
	"slices"
	"strings"
)

func main() {
	file, _ := os.ReadFile("input.txt") // Special case
	input := strings.Split(strings.TrimSpace(string(file)), "\n\n")

	var seeds []int
	json.Unmarshal([]byte("["+strings.Join(strings.Fields(strings.Split(input[0], ": ")[1]), ",")+"]"), &seeds)

	maps := [][][3]int{}
	for idx, row := range input[1:] {
		maps = append(maps, [][3]int{})

		for i, line := range strings.Split(strings.Split(row, ":\n")[1], "\n") {
			maps[idx] = append(maps[idx], [3]int{})
			fmt.Sscanf(line, "%d %d %d", &maps[idx][i][0], &maps[idx][i][1], &maps[idx][i][2])
		}
	}

	calc := func(seed int) int {
		for _, soil := range maps {
			for _, row := range soil {
				if seed >= row[1] && seed < row[1]+row[2] {
					seed = row[0] + seed - row[1]
					break
				}
			}
		}
		return seed
	}

	part1, part2 := math.MaxInt, math.MaxInt
	for i, seed := range seeds {
		part1 = slices.Min([]int{part1, calc(seed)})
		if i%2 == 0 {
			for s := seeds[i]; s < seeds[i]+seeds[i+1]; s++ {
				part2 = slices.Min([]int{part2, calc(s)})
			}
		}
	}
	fmt.Println("Sum of part1: ", part1)
	fmt.Println("Sum of part2: ", part2)
}
