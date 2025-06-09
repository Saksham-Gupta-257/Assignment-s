def is_valid_ipv4(ip):
    return bool(re.fullmatch(r'((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)', ip))

print(is_valid_ipv4("192.168.1.1"))
