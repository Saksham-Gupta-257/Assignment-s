import re

password = "Strong#123"
pattern = r'^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Za-z]).{8,}$'

if re.match(pattern, password):
    print("Valid")
else:
    print("Invalid")
