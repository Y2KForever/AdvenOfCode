package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile("input.txt")
	lines := strings.Split(string(input), "\n")
	wrappingPaper := 0
	ribbon := 0
	for _, line := range lines {
		row := strings.Split(line, "x")
		l, _ := strconv.Atoi(row[0])
		w, _ := strconv.Atoi(row[1])
		h, _ := strconv.Atoi(row[2])
		minimumWrapping := min(l*w, w*h, h*l)
		wrappingPaper += 2*(l*w) + 2*(w*h) + 2*(h*l) + minimumWrapping*1
		bow := w * l * h
		numbers := []int{w, l, h}
		sort.Ints(numbers)

		ribbon += numbers[0] + numbers[0] + numbers[1] + numbers[1] + bow
	}
	fmt.Println("They need: ", wrappingPaper)
	fmt.Println("They need: ", ribbon)
}
