def longest_palindrome(s):
    if not isinstance(s, str):
        raise ValueError("Input must be a string")
    n = len(s)
    if n == 0:
        return ""
    start, max_len = 0, 1
    for i in range(n):
        for j in range(i+1, n+1):
            if s[i:j] == s[i:j][::-1] and j - i > max_len:
                start, max_len = i, j - i
    return s[start:start+max_len]

print(longest_palindrome("babad"))
