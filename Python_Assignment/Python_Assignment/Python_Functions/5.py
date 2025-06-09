def count_vowels(s):
    if not isinstance(s, str):
        raise TypeError("Input must be a string.")
    return sum(1 for char in s.lower() if char in 'aeiou')
