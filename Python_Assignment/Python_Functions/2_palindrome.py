def is_palindrome(str):
    rev_str = ""
    for char in str:
        rev_str = char + rev_str
    return str == rev_str

print("Enter a string:")
str = input()

if is_palindrome(str):
    print(f"{str} is a palindrome")
else:
    print(f"{str} is not a palindrome")
