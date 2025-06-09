def capital_words(text):
    return re.findall(r'\b[A-Z][a-zA-Z]*\b', text)

print(capital_words("Today John and Alice went to Paris."))
