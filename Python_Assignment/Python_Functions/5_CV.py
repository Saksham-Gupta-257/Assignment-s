def count_vowels(str):
    count = 0
    for char in str:
        if char == 'a' or char == 'e' or char == 'i' or char == 'o' or char == 'u' or char == 'A' or char == 'E' or char == 'I' or char == 'O' or char == 'U':
            count += 1
    return count
print("Enter a string:")
str = input()
count = count_vowels(str)
print(f"The number of vowels in '{str}' is {count}")