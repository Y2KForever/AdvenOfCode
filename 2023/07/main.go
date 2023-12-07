package main

import (
	"aoc-2023/utils"
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

type Hand struct {
	Cards string
	Bid   int
}

func main() {
	input, _ := utils.ReadInput("input.txt")

	hands := []Hand{}
	for _, s := range input {
		h := Hand{}
		fmt.Sscanf(s, "%s %d", &h.Cards, &h.Bid)
		hands = append(hands, h)
	}

	winnings := func(jokers bool) (w int) {
		slices.SortFunc(hands, func(a, b Hand) int {
			return rank(a.Cards, jokers) - rank(b.Cards, jokers)
		})
		for i, h := range hands {
			w += (i + 1) * h.Bid
		}
		return
	}

	fmt.Println("Sum of part1: ", winnings(false))
	fmt.Println("Sum of part2: ", winnings(true))
}

func rank(cards string, jokers bool) int {
	j, r := "J", "2031425364758697T8J9QAKBAC"
	if jokers {
		j, r = "23456789TQKA", "J02132435465768798T9QAKBAC"
	}

	typ := 0
	for _, j := range strings.Split(j, "") {
		n, t := strings.ReplaceAll(cards, "J", j), 0
		for _, s := range n {
			t += strings.Count(n, string(s))
		}
		typ = slices.Max([]int{typ, t})
	}

	tie, _ := strconv.ParseInt(strings.NewReplacer(
		strings.Split(r, "")...,
	).Replace(cards), 13, strconv.IntSize)

	return int(math.Pow(13, float64(len(cards))))*typ + int(tie)
}
