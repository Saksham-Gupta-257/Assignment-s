def replace_vowels(s):
    if not isinstance(s, str):
        raise ValueError("Input must be a string")
    return ''.join('*' if c.lower() in 'aeiou' else c for c in s)

print(replace_vowels("Hello World"))
