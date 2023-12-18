package main

import (
	"aoc-2023/utils"
	"fmt"
	"image"
	"slices"
)

type State struct {
	Pos image.Point
	Dir image.Point
}

var (
	U = image.Point{0, -1}
	R = image.Point{1, 0}
	D = image.Point{0, 1}
	L = image.Point{-1, 0}
)

func main() {
	input, _ := utils.ReadInput("input.txt")

	grid, border := map[image.Point]rune{}, []State{}
	for y, s := range input {
		border = append(border, State{image.Point{0, y}, R}, State{image.Point{len(s) - 1, y}, L})
		for x, r := range s {
			grid[image.Point{x, y}] = r
		}
	}
	for x := range input[0] {
		border = append(border, State{image.Point{x, 0}, D}, State{image.Point{x, len(input) - 1}, U})
	}

	bfs := func(start State) int {
		energized := map[image.Point]struct{}{}
		queue := []State{start}
		seen := map[State]struct{}{start: {}}

		for len(queue) > 0 {
			state := queue[0]
			queue = queue[1:]

			for _, d := range map[rune]map[image.Point][]image.Point{
				'.':  {U: {U}, R: {R}, D: {D}, L: {L}},
				'/':  {U: {R}, R: {U}, D: {L}, L: {D}},
				'\\': {U: {L}, R: {D}, D: {R}, L: {U}},
				'|':  {U: {U}, R: {U, D}, D: {D}, L: {U, D}},
				'-':  {U: {L, R}, R: {R}, D: {L, R}, L: {L}},
			}[grid[state.Pos]][state.Dir] {
				energized[state.Pos] = struct{}{}
				next := State{state.Pos.Add(d), d}

				if _, ok := seen[next]; !ok {
					seen[next] = struct{}{}
					queue = append(queue, next)
				}
			}
		}

		return len(energized)
	}

	fmt.Println("Sum of part1:", bfs(State{image.Point{0, 0}, R}))

	part2 := 0
	for _, s := range border {
		part2 = slices.Max([]int{part2, bfs(s)})
	}
	fmt.Println("Sum of part2:", part2)
}
