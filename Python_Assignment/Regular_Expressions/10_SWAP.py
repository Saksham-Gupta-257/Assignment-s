import re

text = "Saksham is learning Python. He is a C++ developer!"
tokens = re.findall(r"\w+|[^\w\s]", text)
print(tokens)
