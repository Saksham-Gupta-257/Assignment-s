import re

text = "Saksham is learning Python by doing its Assignment"
new_text = re.sub(r'\s+', '-', text)
print(new_text)
