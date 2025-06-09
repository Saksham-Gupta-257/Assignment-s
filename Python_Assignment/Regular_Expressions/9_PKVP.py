import re

str = "name=Saksham&age=20&city=Indore"
pairs = dict(re.findall(r'(\w+)=([\w\d]+)', str))
print(pairs)
