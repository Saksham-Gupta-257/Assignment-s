import re

text = "Saksham is learning Python from 20-05-2025 and doing its Assignment on 10-06-2025"
dates = re.findall(r'\b\d{2}-\d{2}-\d{4}\b', text)
print(dates)
