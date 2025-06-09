import re
text = "#Saksham is learning #Python"
hashtags = re.findall(r'#\w+', text)
print(hashtags)
