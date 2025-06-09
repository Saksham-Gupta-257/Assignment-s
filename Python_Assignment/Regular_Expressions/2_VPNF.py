import re

number = "+91-123456789"
if re.fullmatch(r'^\+91-\d{9}$', number):
    print("Valid")
else:
    print("Invalid")
