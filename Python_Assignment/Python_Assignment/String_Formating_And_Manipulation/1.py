def capitalize_words(text):
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    return ' '.join(word.capitalize() for word in text.split())

print(capitalize_words("hello world from python"))
