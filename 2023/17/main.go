package main

import (
	"aoc-2023/utils"
	"container/heap"
	"fmt"
	"image"
)

type hqi[T any] struct {
	v T
	p int
}

type HeapQ[T any] []hqi[T]

func (q HeapQ[_]) Len() int           { return len(q) }
func (q HeapQ[_]) Less(i, j int) bool { return q[i].p < q[j].p }
func (q HeapQ[_]) Swap(i, j int)      { q[i], q[j] = q[j], q[i] }
func (q *HeapQ[T]) Push(x any)        { *q = append(*q, x.(hqi[T])) }
func (q *HeapQ[_]) Pop() (x any)      { x, *q = (*q)[len(*q)-1], (*q)[:len(*q)-1]; return x }
func (q *HeapQ[T]) GPush(v T, p int)  { heap.Push(q, hqi[T]{v, p}) }
func (q *HeapQ[T]) GPop() (T, int)    { x := heap.Pop(q).(hqi[T]); return x.v, x.p }

type State struct {
	Pos image.Point
	Dir image.Point
}

func main() {
	input, _ := utils.ReadInput("input.txt")

	grid, end := map[image.Point]int{}, image.Point{0, 0}
	for y, s := range input {
		for x, r := range s {
			grid[image.Point{x, y}] = int(r - '0')
			end = image.Point{x, y}
		}
	}

	run := func(min, max int) int {
		queue, seen := HeapQ[State]{}, map[State]struct{}{}
		queue.GPush(State{image.Point{0, 0}, image.Point{1, 0}}, 0)
		queue.GPush(State{image.Point{0, 0}, image.Point{0, 1}}, 0)

		for len(queue) > 0 {
			state, heat := queue.GPop()

			if state.Pos == end {
				return heat
			}
			if _, ok := seen[state]; ok {
				continue
			}
			seen[state] = struct{}{}

			for _, d := range []image.Point{
				{state.Dir.Y, state.Dir.X}, {-state.Dir.Y, -state.Dir.X},
			} {
				for i := min; i <= max; i++ {
					n := state.Pos.Add(d.Mul(i))
					if _, ok := grid[n]; ok {
						h := 0
						for j := 1; j <= i; j++ {
							h += grid[state.Pos.Add(d.Mul(j))]
						}
						queue.GPush(State{n, d}, heat+h)
					}
				}
			}
		}
		return -1
	}

	fmt.Println("Sum of part1:", run(1, 3))
	fmt.Println("Sum of part2:", run(4, 10))
}
