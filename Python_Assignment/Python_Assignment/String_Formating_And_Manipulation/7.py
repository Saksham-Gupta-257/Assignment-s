def caesar_cipher(text, shift):
    if not isinstance(text, str) or not isinstance(shift, int):
        raise ValueError("Invalid input types")
    result = ''
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result += chr((ord(c) - base + shift) % 26 + base)
        else:
            result += c
    return result

print(caesar_cipher("Hello, World!", 3))
