def capitalize_words(text):
    return ' '.join(word.capitalize() for word in text.split())

print(capitalize_words("saksham is doing this assignment!"))