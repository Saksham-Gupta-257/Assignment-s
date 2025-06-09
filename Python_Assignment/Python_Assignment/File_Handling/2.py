def count_words_in_file(filename):
    try:
        with open(filename, 'r') as f:
            return sum(len(line.split()) for line in f)
    except FileNotFoundError:
        print("File not found")
        return 0

print(count_words_in_file("sample.txt"))
