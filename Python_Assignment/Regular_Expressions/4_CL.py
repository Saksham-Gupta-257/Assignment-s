import re

text = "Saksham is learning Python by doing its Assignment"
capital_words = re.findall(r'\b[A-Z][a-z]*\b', text)
print(capital_words) 
