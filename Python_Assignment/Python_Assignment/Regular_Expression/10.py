def tokenize(text):
    return re.findall(r'\w+|[^\w\s]', text)

print(tokenize("Hello, world! This is regex-based tokenization."))
