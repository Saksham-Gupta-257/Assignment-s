import re

def is_strong_password(password):
    if not isinstance(password, str):
        raise ValueError("Password must be a string")
    if (len(password) >= 8 and re.search(r"[A-Z]", password) and
        re.search(r"[a-z]", password) and re.search(r"[0-9]", password) and
        re.search(r"[@#$%^&+=!]", password)):
        return True
    return False

print(is_strong_password("Strong@123"))
print(is_strong_password("weakpass"))
