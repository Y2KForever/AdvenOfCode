package utils

import (
	"os"
	"strings"
)

func ReadInput(input string) ([]string, error) {
	linebreak := "\n"

	fileBytes, err := os.ReadFile(input)
	if err != nil {
		return nil, err
	}
	fileContent := strings.TrimRight(string(fileBytes), linebreak)
	lines := strings.Split(fileContent, linebreak)
	return lines, nil
}
