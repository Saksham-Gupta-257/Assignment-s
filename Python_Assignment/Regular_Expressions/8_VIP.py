import re

ip = "192.168.1.255"
pattern = r'^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$'

if re.fullmatch(pattern, ip):
    print("Valid")
else:
    print("Invalid")

