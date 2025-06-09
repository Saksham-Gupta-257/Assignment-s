def remove_empty_lines(filename):
    try:
        with open(filename, 'r') as f:
            lines = [line for line in f if line.strip()]
        with open(filename, 'w') as f:
            f.writelines(lines)
    except FileNotFoundError:
        print("File not found")

remove_empty_lines("text.txt")
