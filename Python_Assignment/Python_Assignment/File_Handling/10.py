def replace_words_in_file(filename, word_map):
    try:
        with open(filename, 'r') as f:
            text = f.read()
        for old, new in word_map.items():
            text = text.replace(old, new)
        with open(filename, 'w') as f:
            f.write(text)
    except FileNotFoundError:
        print("File not found")

replace_words_in_file("replace.txt", {"oldword": "newword", "test": "exam"})
