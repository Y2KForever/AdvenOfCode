package main

import (
	"aoc-2023/utils"
	"fmt"
	"image"
	"math"
	"strings"
)

func main() {
	input, _ := utils.ReadInput("input.txt")

	run := func(expand int) (d int) {
		galax := map[image.Point]struct{}{}
		dy := 0
		for y, s := range input {
			if !strings.Contains(s, "#") {
				dy += expand - 1
			}

			dx := 0
			for x, r := range s {
				col := ""
				for _, s := range input {
					col += string(s[x])
				}
				if !strings.Contains(col, "#") {
					dx += expand - 1
				}

				if r == '#' {
					for g := range galax {
						d += int(math.Abs(float64(g.X-(x+dx))) + math.Abs(float64(g.Y-(y+dy))))
					}
					galax[image.Point{x + dx, y + dy}] = struct{}{}
				}
			}
		}
		return
	}

	fmt.Println("Sum of part 1:", run(2))
	fmt.Println("Sum of part 2:", run(1000000))
}
