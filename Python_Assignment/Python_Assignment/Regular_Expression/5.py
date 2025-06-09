def replace_whitespace(text):
    return re.sub(r'\s+', '-', text.strip())

print(replace_whitespace("This is a sample   string"))
