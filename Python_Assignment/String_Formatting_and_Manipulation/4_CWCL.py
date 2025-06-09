sample = """Saksham is doing this assignment!
This is a program to count words, lines, and characters."""
words = sample.split()
lines = sample.split('\n')
characters = len(sample)
print("Words:", len(words))
print("Lines:", len(lines))
print("Characters:", characters)
