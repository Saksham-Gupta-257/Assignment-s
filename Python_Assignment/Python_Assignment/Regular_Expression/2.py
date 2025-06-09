def is_valid_phone(phone):
    return bool(re.fullmatch(r'\d{3}-\d{3}-\d{4}', phone))

print(is_valid_phone("123-456-7890"))
