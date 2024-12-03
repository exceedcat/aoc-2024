#!/bin/bash

# Check if an argument is provided
if [ -z "$1" ]; then
    echo "Usage: ./create-data.sh <number>"
    exit 1
fi

# Pad the input number with a leading zero if necessary
folder_name=$(printf "%02d" "$1")

# Create the directory in ./src/data/
directory="./src/data/$folder_name"
mkdir -p "$directory"

# Create the two files in the newly created directory
file1="$directory/input.txt"
file2="$directory/input-test.txt"

touch "$file1" "$file2"
