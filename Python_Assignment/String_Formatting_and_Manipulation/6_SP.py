password = "Saksham@123"
has_upper = False
has_lower = False
has_digit = False
has_special = False

for c in password:
    if c.isupper():
        has_upper = True
    elif c.islower():
        has_lower = True
    elif c.isdigit():
        has_digit = True
    elif c in "!@#$%^&*_+":
        has_special = True

if len(password) >= 8 and has_upper and has_lower and has_digit and has_special:
    is_valid = True
else:
    is_valid = False

print("Is strong password?", is_valid)
