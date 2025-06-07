List = ["apple", "banana", "apple", "orange", "banana", "apple"]
freq = {}
for w in List:
    freq[w] = freq.get(w, 0) + 1
print("Word Frequency Count:")
for word, count in freq.items():
    print(f"{word}: {count}")
