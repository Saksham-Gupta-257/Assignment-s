class InvalidAgeError(Exception):
    pass

def check_age(age):
    if age < 0:
        raise InvalidAgeError("Age cannot be negative")
    return "Valid age"

try:
    print("Enter age:")
    age = int(input())
    print(check_age(age))
except (ValueError, InvalidAgeError) as e:
    print(e)
