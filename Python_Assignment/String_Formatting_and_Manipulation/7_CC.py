text = "Saksham"
shift = 3
cipher = ''
for char in text:
    if char.isalpha():
        base = ord('A') if char.isupper() else ord('a')
        cipher += chr((ord(char) - base + shift) % 26 + base)
    else:
        cipher += char
print("Encoded text:", cipher)
