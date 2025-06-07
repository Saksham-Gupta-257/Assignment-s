from collections import Counter
with open("Python_Assignment/File_Handling/character.txt", "r") as file:
    text = file.read()
freq = Counter(text)
print("Character frequencies:")
for char, count in freq.items():
    print(f"{repr(char)}: {count}")
