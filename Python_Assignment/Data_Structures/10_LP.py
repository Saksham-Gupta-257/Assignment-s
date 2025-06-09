def is_palindrome(lst):
    return lst == lst[::-1]

print(is_palindrome([1, 2, 3, 2, 1]))
print(is_palindrome([1, 2, 3]))
