from collections import Counter

def char_frequency(filename):
    try:
        with open(filename, 'r') as f:
            return dict(Counter(f.read()))
    except FileNotFoundError:
        print("File not found")
        return {}

print(char_frequency("sample.txt"))
