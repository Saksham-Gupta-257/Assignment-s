def print_file_with_line_numbers(filename):
    try:
        with open(filename, 'r') as f:
            for idx, line in enumerate(f, 1):
                print(f"{idx}: {line.strip()}")
    except FileNotFoundError:
        print("File not found")

print_file_with_line_numbers("sample.txt")
