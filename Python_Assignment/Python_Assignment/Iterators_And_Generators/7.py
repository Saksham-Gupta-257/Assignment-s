words = ["madam", "hello", "noon", "world"]
palindromes = (word for word in words if word == word[::-1])

for p in palindromes:
    print(p)
