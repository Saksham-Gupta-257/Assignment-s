text = "Saksham is doing this assignment!"
vowels = "aeiouAEIOU"
replaced = ""

for char in text:
    if char in vowels:
        replaced += "*"
    else:
        replaced += char

print("Replaced vowels:", replaced)
