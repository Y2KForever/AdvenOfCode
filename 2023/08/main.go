package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
	input, _ := os.ReadFile("input.txt")
	split := strings.Split(strings.TrimSpace(string(input)), "\n\n")
	re := regexp.MustCompile(`(.*) = \((.*), (.*)\)`)

	network := map[string]map[rune]string{}
	for _, m := range re.FindAllStringSubmatch(split[1], -1) {
		network[m[1]] = map[rune]string{'L': m[2], 'R': m[3]}
	}

	walk := func(start, end string) int {
		shortest := []int{}
		for n := range network {
			if !strings.HasSuffix(n, start) {
				continue
			}

			steps := 0
			for !strings.HasSuffix(n, end) {
				n = network[n][rune(split[0][steps%len(split[0])])]
				steps++
			}

			shortest = append(shortest, steps)
		}
		return lcm(shortest...)
	}

	fmt.Println("Sum of part 1: ", walk("AAA", "ZZZ"))
	fmt.Println("Sum of part 2: ", walk("A", "Z"))
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func lcm(x ...int) int {
	if len(x) == 1 {
		return x[0]
	} else if len(x) > 2 {
		return lcm(x[0], lcm(x[1:]...))
	}
	return x[0] * x[1] / gcd(x[0], x[1])
}
