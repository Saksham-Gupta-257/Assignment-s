def word_frequency(words):
    if not isinstance(words, list) or not all(isinstance(w, str) for w in words):
        raise ValueError("Input must be a list of strings")
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq

print(word_frequency(["apple", "banana", "apple", "orange", "banana"]))
