package utils

import (
	"os"
	"runtime"
	"strings"
)

func ReadInput(input string) ([]string, error) {
	fileBytes, err := os.ReadFile(input)
	if err != nil {
		return nil, err
	}
	fileContent := strings.TrimRight(string(fileBytes), "\r\n")
	lineBreak := "\r\n"

	if runtime.GOOS != "windows" {
		lineBreak = "\n\n"
	}
	lines := strings.Split(fileContent, lineBreak)
	return lines, nil
}
