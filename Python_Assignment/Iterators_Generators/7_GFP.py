words = ["Saksham", "aba", "naan"]

palindromes = (word for word in words if word.lower() == word.lower()[::-1])

for word in palindromes:
    print(word)
