def is_palindrome(s):
    if not isinstance(s, str):
        raise TypeError("Input must be a string.")
    clean = ''.join(s.lower().split())
    return clean == clean[::-1]
