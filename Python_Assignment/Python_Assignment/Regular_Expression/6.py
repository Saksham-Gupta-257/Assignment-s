def is_strong_password(password):
    return bool(re.fullmatch(r'(?=.*\d)(?=.*[\W_]).{8,}', password))

print(is_strong_password("Pa$$w0rd123"))
