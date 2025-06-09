def is_palindrome(lst):
    if not isinstance(lst, list):
        raise ValueError("Input must be a list")
    return lst == lst[::-1]

print(is_palindrome([1, 2, 3, 2, 1]))
print(is_palindrome([1, 2, 3]))
