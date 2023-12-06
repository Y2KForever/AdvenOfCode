package main

import (
	"aoc-2023/utils"
	"fmt"
	"math"
	"strconv"
	"strings"
)

func main() {
	input, _ := utils.ReadInput("input.txt")

	calc := func(time, dist []string) int {
		r := 1
		for i := range time {
			t, _ := strconv.ParseFloat(time[i], 64)
			d, _ := strconv.ParseFloat(dist[i], 64)
			b := math.Sqrt(math.Pow(t, 2) - 4*d)
			r *= int(math.Ceil((t+b)/2) - math.Floor((t-b)/2) - 1)
		}
		return r
	}

	fmt.Println(calc(strings.Fields(input[0])[1:], strings.Fields(input[1])[1:]))
	fmt.Println(calc(
		[]string{strings.Join(strings.Fields(input[0])[1:], "")},
		[]string{strings.Join(strings.Fields(input[1])[1:], "")},
	))
}
