import re

str = "Saksham@gmail.com and Om0@gmail.com"
emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', str)
print(emails)  
